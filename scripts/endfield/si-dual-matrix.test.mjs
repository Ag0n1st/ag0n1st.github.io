import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");
const guide=read("src/content/operator-guides/si.md");
const start=guide.indexOf("  matrix:\n",guide.indexOf("\nequipment:\n"));
const end=guide.indexOf("\npotentials:\n",start);
assert.ok(start>0&&end>start);
const matrix=guide.slice(start,end);
const component=read("src/components/operator/sections/OperatorEquipment.astro");
const script=read("src/components/operator/OperatorGuide.astro");
const schema=read("src/content/operatorGuideSchema.ts");
const catalog=JSON.parse(read("src/data/endfield/catalog/v16-gear.json"));
function rows(id){
  const part=matrix.split("      - id: "+id+"\n")[1]?.split(/\n      - id: /)[0]??"";
  return [...part.matchAll(/^          - id: ([\w-]+)\n            label: "([^"]+)"\n            values: \{([^\n]*)\}\n            weaponId: "([^"]+)"\n            weaponPotential: "P0"\n            weaponTuning: "9\/9\/4"\n            armorId: "([^"]+)"\n            glovesId: "([^"]+)"\n            kit1Id: "([^"]+)"\n            kit2Id: "([^"]+)"/gm)].map(x=>({
    id:x[1],label:x[2],values:x[3],weapon:x[4],armor:x[5],gloves:x[6],kit1:x[7],kit2:x[8]
  }));
}
const dps=rows("dps"),support=rows("support");
const expectedDps=[
 ["MAIN-DPS-0","6526","+125.6%","+0%","type-50-yinglung-soft-armor","type-50-yinglung-gloves-v16","type-50-yinglung-beacon","365"],
 ["MAIN-DPS-1","5655","+179.4%","+0%","type-50-yinglung-soft-armor","type-50-yinglung-gloves-v16","type-50-yinglung-beacon","type-50-yinglung-beacon"],
 ["MAIN-DPS-2","5673","+125.6%","+33.4%","type-50-yinglung-soft-armor","type-50-yinglung-gloves-v16","type-50-yinglung-beacon","349"],
 ["MAIN-DPS-3","5683","+134.6%","+27.9%","type-50-yinglung-soft-armor","1128","type-50-yinglung-beacon","type-50-yinglung-beacon"],
 ["MAIN-DPS-4","5689","+152.5%","+16.7%","796","type-50-yinglung-gloves-v16","type-50-yinglung-beacon","type-50-yinglung-beacon"]
];
const expectedSupport=[
 ["SUPPORT-DPS-0","5830","+125.6%","+0%","eternal-xiranite-mod-armor","eternal-xiranite-channeling-gloves","eternal-xiranite-rangefinder","365"],
 ["SUPPORT-DPS-1","5068","+179.4%","+0%","eternal-xiranite-mod-armor","eternal-xiranite-channeling-gloves","eternal-xiranite-rangefinder","eternal-xiranite-rangefinder"],
 ["SUPPORT-DPS-2","5068","+125.6%","+33.4%","eternal-xiranite-mod-armor","eternal-xiranite-channeling-gloves","eternal-xiranite-rangefinder","349"],
 ["SUPPORT-DPS-3","5077","+134.6%","+27.9%","eternal-xiranite-mod-armor","1128","eternal-xiranite-rangefinder","eternal-xiranite-rangefinder"],
 ["SUPPORT-DPS-4","5082","+152.5%","+16.7%","796","eternal-xiranite-channeling-gloves","eternal-xiranite-rangefinder","eternal-xiranite-rangefinder"],
 ["SUPPORT-MIX-1","5077","+80.7%","+59.9%","eternal-xiranite-mod-armor","1128","eternal-xiranite-rangefinder","334"],
 ["SUPPORT-MIX-2","5077","+107.6%","+43.9%","eternal-xiranite-overalls","1128","eternal-xiranite-rangefinder","eternal-xiranite-rangefinder"],
 ["SUPPORT-MIX-3","5082","+107.6%","+43.7%","796","330","eternal-xiranite-rangefinder","eternal-xiranite-rangefinder"],
 ["SUPPORT-ULT-1","5077","+53.8%","+75.9%","eternal-xiranite-overalls","1128","eternal-xiranite-rangefinder","334"],
 ["SUPPORT-ULT-2","5082","+53.8%","+75.4%","796","330","eternal-xiranite-rangefinder","334"],
 ["SUPPORT-ULT-3","5082","+0%","+107.4%","796","330","334","334"],
 ["SUPPORT-ULT-4","5068","+0%","+108.1%","eternal-xiranite-overalls","330","334","349"],
 ["SUPPORT-ULT-5","5077","+0%","+107.9%","eternal-xiranite-overalls","1128","334","334"]
];
test("Si ships exactly two independent and accessible matrices",()=>{
 assert.match(schema,/variants: z\.array/);
 assert.match(matrix,/    variants:\n      - id: dps/);
 assert.match(matrix,/      - id: support/);
 assert.deepEqual([dps.length,support.length],[5,13]);
 assert.deepEqual(dps.map(row=>row.label),["MAIN-DPS-0","MAIN-DPS-1","MAIN-DPS-2","MAIN-DPS-3","MAIN-DPS-4"]);
 assert.deepEqual(support.slice(0,5).map(row=>row.label),["SUPPORT-DPS-0","SUPPORT-DPS-1","SUPPORT-DPS-2","SUPPORT-DPS-3","SUPPORT-DPS-4"]);
 for(const m of ["ATK","CS.DMG","ULT.gain"])assert.match(matrix,new RegExp('labelEn: "'+m.replace(".","\\.")+'"'));
 for(const label of ["DPS","SUPPORT"])assert.match(component,new RegExp("op-matrix-tab"));
 assert.match(component,/data-matrix-panel/);
 assert.match(component,/data-matrix-dialog-variant/,"Large dialog variant heading must be present");
 assert.match(script,/selectMatrixTab/);
 assert.match(script,/ArrowRight/);
 assert.match(script,/current\?\.querySelector<HTMLTableElement>/);
 const liino=read("src/content/operator-guides/liino.md");
 assert.doesNotMatch(liino,/    variants:/);
});
test("every Si spreadsheet row and exact column value matches imported setup",()=>{
 for(const [found,expected] of [[dps,expectedDps],[support,expectedSupport]]){
   for(let i=0;i<expected.length;i++){
     const row=found[i],e=expected[i];
     assert.equal(row.label,e[0]);
     assert.match(row.values,new RegExp('atk: "'+e[1]+'"'));
     assert.ok(row.values.includes('cs-dmg: "'+e[2]+'"'),"CS.DMG bonus mismatch for "+row.label);
     assert.ok(row.values.includes('ult-gain: "'+e[3]+'"'),"ULT.gain bonus mismatch for "+row.label);
     assert.deepEqual([row.weapon,row.armor,row.gloves,row.kit1,row.kit2],["1280",e[4],e[5],e[6],e[7]]);
   }
 }
 assert.equal(support.filter(r=>r.label==="SUPPORT-ULT-4").length,1,"Final CSV labels are unique");
 assert.equal(support.filter(r=>!r.values.includes("ult-gain:")).length,0);
 assert.equal(support.filter(r=>r.label==="SUPPORT-ULT-5").length,1);
 for(const row of [...dps,...support]){
   assert.match(row.values,/cs-dmg: "\+\d+(?:\.\d+)?%"/);
   assert.match(row.values,/ult-gain: "\+\d+(?:\.\d+)?%"/);
   assert.doesNotMatch(row.values,/atk: "\+/);
 }
});
test("owner supplied v1.6 Type 50 Yinglung Gloves icon stays distinct from old official 411",()=>{
 const gloves=catalog.items.find(x=>x.id==="type-50-yinglung-gloves-v16");
 assert.ok(gloves);
 assert.equal(gloves.officialNumericId,null);
 assert.equal(gloves.identityStatus,"official-numeric-id-unverified");
 assert.equal(gloves.iconPath,"/images/endfield/gear/releases/si/type-50-yinglung-gloves-v16.webp");
 assert.ok(existsSync("public"+gloves.iconPath));
 const bytes=readFileSync("public"+gloves.iconPath);
 assert.equal(bytes.toString("ascii",0,4),"RIFF");
 assert.equal(bytes.toString("ascii",8,12),"WEBP");
 assert.ok(bytes.length<15000);
 assert.ok(guide.includes('"type-50-yinglung-gloves-v16"'));
 assert.ok(!guide.includes('"type-50-yinglung-gauntlets"'));
 const old=JSON.parse(read("src/data/endfield/catalog/items.json")).items.find(x=>x.id==="411");
 assert.equal(old.name,"Type 50 Yinglung Gloves");
 assert.equal(old.iconPath,"/images/endfield/gear/411.webp");
});
