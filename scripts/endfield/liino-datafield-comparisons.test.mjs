import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const guide=readFileSync("src/content/operator-guides/liino.md","utf8");
const schema=readFileSync("src/content/operatorGuideSchema.ts","utf8");
const weaponsUi=readFileSync("src/components/operator/sections/OperatorWeapons.astro","utf8");
const potentialsUi=readFileSync("src/components/operator/sections/OperatorPotentials.astro","utf8");
const workflow=readFileSync("src/content/operator-guides/_template.md","utf8");
const catalog=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
const officialWeapons=new Map(catalog.weapons.map(weapon=>[weapon.id,weapon.name]));
const weaponsYaml=guide.match(/^weapons:\n([\s\S]*?)(?=^equipment:)/m)?.[1];
const potentialsYaml=guide.match(/^potentials:\n([\s\S]*?)(?=^teams:)/m)?.[1];
assert.ok(weaponsYaml&&potentialsYaml,"Liino must have populated weapon and potential sections");

const expected=[
 {id:"zhuang-perlica-arclight",title:"Zhuang Perlica Arclight Team",rows:[
 ["1046",9,112.1],["1046",4,100],["1044",9,85],["75",9,84.7],
 ["75",4,83.5],["1044",4,83.4],["97",9,81.3]]},
 {id:"arcane-tt-xaihi",title:"Arcane TT Xaihi Team",rows:[
 ["1046",9,110.3],["1046",4,100],["1044",9,91.6],
 ["1044",4,89.5],["75",9,89],["97",9,81.3]]}
];

function namedScenarioBlocks(){
 const raw=weaponsYaml.match(/  comparisons:\n([\s\S]*?)(?=^  disclaimer:)/m)?.[1];
 assert.ok(raw,"Comparisons need a separate scenario section");
 return raw.split("    - id: ").slice(1).map(s=>({
  id:s.split("\n",1)[0],
  title:s.match(/^      title: "([^"]+)"/m)?.[1],
  sourcePageType:s.match(/^      sourcePageType: (.+)$/m)?.[1],
  sourceNote:s.match(/^      sourceNote: "([^"]+)"/m)?.[1],
  date:s.match(/^      snapshotDate: "([^"]+)"/m)?.[1],
  baseline:s.match(/^      referenceWeaponId: "([^"]+)"\n      referenceRank: (\d+)/m)?.slice(1),
  context:s.includes("nicht unabhängig mit dem Berechnungssheet abgeglichen"),
  rows:[...s.matchAll(/- \{ weaponId: "(\d+)", rank: (\d+), performancePercent: ([\d.]+) \}/g)]
    .map(m=>[m[1],Number(m[2]),Number(m[3])])
 }));
}

test("Liino has four independent, UNRANKED creator weapon recommendations in required category order",()=>{
 const recommendations=weaponsYaml.match(/  recommendations:\n([\s\S]*?)(?=^  comparisons:)/m)?.[1]??"";
 const rows=[...recommendations.matchAll(/^    - weaponId: "(\d+)"\n      category: ([a-z0-9-]+)/gm)]
   .map(x=>({id:x[1],category:x[2]}));
 assert.deepEqual(rows,[
  {id:"1046",category:"bis"},
  {id:"1044",category:"bp"},
  {id:"75",category:"alternative"},
  {id:"97",category:"f2p"}
 ]);
 assert.equal(officialWeapons.get("1046"),"Bedazzling Night Debut");
 assert.equal(officialWeapons.get("1044"),"Golden Age");
 assert.equal(officialWeapons.get("75"),"JET");
 assert.equal(officialWeapons.get("97"),"Cohesive Traction");
 assert.equal((recommendations.match(/performancePercent:|rank:/g)||[]).length,0);
});

test("Liino weapon percentage tables mirror BOTH team tabs from the Datafield CHARACTER page, not Team Hub",()=>{
 const actual=namedScenarioBlocks();
 assert.equal(actual.length,2);
 for(let i=0;i<expected.length;i++){
  const a=actual[i],e=expected[i];
  assert.equal(a.id,e.id);
  assert.equal(a.title,e.title);
  assert.equal(a.sourcePageType,"character-profile");
  assert.equal(a.sourceNote,"Datafield");
  assert.equal(a.date,"2026-10-16");
  assert.deepEqual(a.baseline,["1046","4"]);
  assert.equal(a.context,true);
  assert.deepEqual(a.rows,e.rows);
  assert.equal(a.rows.filter(x=>x[0]==="1046"&&x[1]===4&&x[2]===100).length,1);
  for(const row of a.rows)assert.ok(officialWeapons.has(row[0]),"No unverified Gear ID");
 }
 assert.equal(actual[0].rows.find(r=>r[0]==="1044"&&r[1]===9)[2],85);
 assert.equal(actual[1].rows.find(r=>r[0]==="1044"&&r[1]===9)[2],91.6);
 assert.match(weaponsYaml,/aus dem\s+Datafield-Charakterprofil von Liino, nicht aus dem Team-Hub/);
 assert.match(weaponsYaml,/keine allgemeingültige Garantie/);
});

test("Liino five potential gains are incremental, NEVER mislabeled as gains versus P0",()=>{
 const entries=potentialsYaml.split("    - level: ").slice(1);
 assert.equal(entries.length,5);
 const expectedGains=[3.2,0.7,0.8,0,4.7];
 for(const [i,entry] of entries.entries()){
  assert.equal(Number(entry.split("\n",1)[0]),i+1);
  assert.equal(Number(entry.match(/^      increaseOverPreviousPercent: ([\d.]+)$/m)?.[1]),expectedGains[i]);
  assert.match(entry,/^      sourceNote: "Datafield"$/m);
  assert.match(entry,/nicht unabhängig abgeglichen|nicht\s+unabhängig mit dem Original-Spreadsheet abgeglichen/);
  assert.doesNotMatch(entry,/^      increaseOverP0Percent:/m,
   "Datafield character page gives Pn vs P(n-1), not cumulative Pn vs P0");
 }
 assert.match(potentialsYaml,/NICHT um kumulative Werte gegenüber\s+P0/);
 assert.match(potentialsYaml,/nicht aus\s+dem Team-Hub/);
 assert.match(potentialsYaml,/keine Pull-Empfehlung oder Garantie/);
});

test("shared guide framework renders two separate team tables with rank, baseline, source and disclaimer",()=>{
 assert.match(schema,/const weaponComparisonScenario = z\.object/);
 assert.match(schema,/sourcePageType: z\.literal\("character-profile"\)/);
 assert.match(schema,/performancePercent: z\.number\(\)\.finite\(\)\.nonnegative\(\)/);
 assert.match(schema,/referen(?:ceWeaponId|ceRank)/);
 assert.match(schema,/scenario\.referenceRank && item\.performancePercent===100/);
 assert.ok(schema.includes('disclaimer: text.default("")'));
 assert.match(weaponsUi,/guide\.weapons\.comparisons\.map\(scenario=>/);
 assert.match(weaponsUi,/scenario\.entries\.map\(entry=>/);
 assert.match(weaponsUi,/R\{entry\.rank\}/);
 assert.match(weaponsUi,/Quelle: \{scenario\.sourceNote\} · Charakterprofil/);
 assert.match(weaponsUi,/guide\.weapons\.disclaimer/);
 assert.match(weaponsUi,/Quelle der Einordnung/);
 assert.match(potentialsUi,/Zusatzgewinn zur Vorstufe/);
 assert.match(potentialsUi,/increaseOverPreviousPercent/);
 assert.match(potentialsUi,/Gesamtgewinn vs\. P0/);
 assert.match(potentialsUi,/guide\.potentials\.disclaimer/);
 assert.match(workflow,/sourcePageType: character-profile/);
 assert.match(workflow,/KEINE Prozentwerte ungeprüft als kumulative vs\. P0/);
});
