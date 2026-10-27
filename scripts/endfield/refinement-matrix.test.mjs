import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {deriveRefinementMatrix,REFINEMENT_ATTRIBUTES,REFINEMENT_SLOTS,
 refinementAttributeFor,refinementNumber,refinementVariantTag} from "../../src/lib/endfield/refinementMatrix.mjs";
const read=p=>readFileSync(p,"utf8");
const equipment=JSON.parse(read("src/data/endfield/catalog/equipment-details.json"));
const catalog=JSON.parse(read("src/data/endfield/catalog/items.json"));
const official=new Map(catalog.items.filter(x=>x.categories.includes("Gear")).map(row=>[row.id,row]));

test("all 22 requested official DE/EN attribute categories occur exactly once",()=>{
 assert.equal(REFINEMENT_ATTRIBUTES.length,22);
 assert.deepEqual(REFINEMENT_SLOTS,["Armor","Gloves","Kit"]);
 assert.deepEqual(REFINEMENT_ATTRIBUTES.map(row=>row.group==="primary"?"primary":row.group==="damage"?"damage":"utility").reduce((acc,x)=>(acc[x]=(acc[x]||0)+1,acc),{}),
 {primary:4,damage:9,utility:9});
 assert.equal(new Set(REFINEMENT_ATTRIBUTES.map(x=>x.key)).size,22);
 assert.equal(refinementAttributeFor("Combo Skill DMG Bonues"),"combo");
 assert.equal(refinementAttributeFor("Basic ATK DMG Bonus"),"basic");
 assert.equal(refinementAttributeFor("Cryo & Electric DMG"),"cryo");
 assert.equal(refinementAttributeFor("ULT Efficiency"),"ult-ef");
 assert.equal(refinementAttributeFor("All Skill DMG Dealth Bonus"),"all");
 assert.equal(refinementAttributeFor("Special Artificing Progress"),null);
 for(const row of REFINEMENT_ATTRIBUTES)assert.ok(row.de&&row.en&&row.aliases.length);
});

test("default artificing numeric parser rejects invented or ambiguous values",()=>{
 assert.equal(refinementNumber("+115"),115);
 assert.equal(refinementNumber("11.5%"),11.5);
 assert.equal(refinementNumber("+43.2%"),43.2);
 assert.equal(refinementNumber("N/A"),null);
 assert.equal(refinementNumber("1/3"),null);
 assert.equal(refinementVariantTag("Type 50 Yinglung Radar T2"),"T2");
 assert.equal(refinementVariantTag("Test Gloves S1"),"S1");
 assert.equal(refinementVariantTag("Rift Trekker Gloves"),null);
});

const piece=(id,name,slot,label,value,level=70)=>({
 id,name,kind:"gear",status:"verified",gearSlot:slot,level,
 artificing:[{tables:[{columns:["Stats","Default","Level 1"],rows:[
  {cells:[label,String(value),String(value)]},{cells:["Artificing Progress","None","6"]}]}]}]
});
test("one top verified candidate per slot, shared max glows, ties deterministic and kit can be empty",()=>{
 const rows=deriveRefinementMatrix([
  piece("1","Armor T1","Armor","Strength","+100"),
  piece("2","Armor T2","Armor","Strength","+100"),
  piece("3","Gloves T1","Gloves","Strength","+80"),
  piece("4","Test Kit","Kit","Intellect","+50"),
  {...piece("5","External Preview","Armor","Strength","+900"),status:"incomplete"},
  {...piece("6","Fake Future","Armor","Strength","+900"),kind:"weapon"},
 ]);
 const strength=rows.find(x=>x.key==="str");
 assert.equal(strength.slots[0].best.id,"1");
 assert.equal(strength.slots[0].tied,2);
 assert.equal(strength.slots[0].goodMatch,true);
 assert.equal(strength.slots[1].goodMatch,false);
 assert.equal(strength.slots[2].best,null);
 assert.equal(rows.find(x=>x.key==="int").slots[2].best.id,"4");
 assert.ok(rows.find(x=>x.key==="atk").slots.every(x=>!x.best&&!x.goodMatch));
});

test("matrix only renders verifiable official IDs, Artificing defaults and local assets",()=>{
 const matrix=deriveRefinementMatrix(equipment.gear);
 assert.equal(matrix.length,22);
 assert.ok(matrix.filter(row=>row.slots.some(x=>x.best)).length>=20);
 for(const row of matrix)for(const cell of row.slots){
  if(!cell.best)continue;
  assert.ok(official.has(cell.best.id),"Not in official catalog "+cell.best.id);
  const item=official.get(cell.best.id);
  assert.ok(item.iconPath?.startsWith("/images/endfield/gear/"),cell.best.id);
  assert.ok(Number.isFinite(cell.best.value)&&cell.best.value>0);
  assert.equal(cell.slot,cell.best.slot);
  assert.equal(cell.best.tag,refinementVariantTag(item.name));
 }
 assert.ok(matrix.find(x=>x.key==="atk").slots.every(x=>!x.best),"No fictional ATK refinement item");
});

test("Cheat Sheets start with the full bilingual matrix, retain old links, no client-side SKPORT",()=>{
 const component=read("src/components/pages/EndfieldCheatSheets.astro");
 const matrix=read("src/components/pages/RefinementMatrix.astro");
 const css=read("src/styles/endfield-refinement.css");
 const nav=read("src/components/EndfieldNav.astro");
 assert.ok(component.indexOf("<RefinementMatrix lang={lang}")<component.indexOf('data-cheatsheets-group="systems"'));
 assert.match(matrix,/id="refinement"/);
 assert.match(matrix,/id="artificing"/);
 assert.match(matrix,/ItemIcon id=\{cell.best.id\} lang=\{lang\}/);
 assert.match(matrix,/data-refinement-tab/);
 assert.match(matrix,/data-refinement-panel/);
 assert.match(matrix,/data-good-match/);
 assert.match(matrix,/refinement-variant-tag/);
 assert.match(css,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
 assert.match(css,/@media\(max-width:650px\)/);
 assert.match(nav,/new Set\(\["factory","checklist","tierlist"\]\)/);
 assert.ok(!read("src/lib/endfield/refinementMatrix.mjs").includes("fetch("));
});

test("source-backed v1.6 import delta is complete when publication report exists",()=>{
 const path="src/data/endfield/catalog/v16-skport-import.json";
 if(!existsSync(path))return; // Before the standalone source capture completes.
 const report=JSON.parse(read(path));
 assert.equal(report.count,18);
 assert.equal(report.originalGearCount,258);
 assert.equal(report.latestGearCount,276);
 assert.equal(report.entries.length,18);
 const unique=new Set(report.entries.map(x=>x.id));
 assert.equal(unique.size,18);
 for(let id=1380;id<=1397;id++)assert.ok(unique.has(String(id)),"Missing official v1.6 gear ID "+id);
 assert.equal(catalog.categories.find(x=>x.name==="Gear").count,276);
 assert.equal(equipment.gear.length,276);
 assert.equal(equipment.coverage.gearCount,276);
 for(const x of report.entries){
  assert.ok(official.has(x.id));
  assert.ok(equipment.gear.some(row=>row.id===x.id&&row.status==="verified"));
  assert.ok(existsSync("public"+x.image),"Missing cached official WebP "+x.id);
 }
 assert.equal(catalog.items.find(x=>x.id==="411").name,"Type 50 Yinglung Gloves");
 assert.equal(catalog.items.find(x=>x.id==="1381").name,"Type 50 Yinglung Gloves");
});
