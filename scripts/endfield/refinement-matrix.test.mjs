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
 assert.equal(REFINEMENT_ATTRIBUTES.find(x=>x.key==="main").de,"Hauptattribut %");
 assert.equal(REFINEMENT_ATTRIBUTES.find(x=>x.key==="main").en,"Main Attribute %");
 assert.equal(REFINEMENT_ATTRIBUTES.find(x=>x.key==="secondary").de,"Sekundärattribut %");
 assert.equal(REFINEMENT_ATTRIBUTES.find(x=>x.key==="secondary").en,"Secondary Attribute %");
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

const piece=(id,name,slot,label,value,level=70,setName="Regular Set")=>({
 id,name,kind:"gear",status:"verified",gearSlot:slot,level,setName,
 artificing:[{tables:[{columns:["Stats","Default","Level 1"],rows:[
  {cells:[label,String(value),String(value)]},{cells:["Artificing Progress","None","6"]}]}]}]
});
test("ordinary maxima remain visible; glow only for exceptional Redeemer/Rift Trekker above regular sets",()=>{
 const rows=deriveRefinementMatrix([
  piece("1","Armor T1","Armor","Strength","+100"),
  piece("2","Armor T2","Armor","Strength","+100"),
  piece("3","Gloves T1","Gloves","Strength","+80"),
  piece("4","Test Kit","Kit","Intellect","+50"),
  piece("7","Redeemer Plates","Armor","Agility","+115",70,"Non-Set"),
  piece("8","Regular Armor","Armor","Agility","+87"),
  piece("9","Rift Trekker Hands","Gloves","Will","+86",70,"Non-Set"),
  piece("10","Regular Gloves","Gloves","Will","+65"),
  piece("11","Redeemer Tag","Kit","Strength","+43",70,"Non-Set"),
  piece("12","Regular Kit","Kit","Strength","+41"),
  piece("13","Rift Trekker Light Armor","Armor","Will","+110",70,"Non-Set"),
  piece("14","Regular Will Armor","Armor","Will","+110"),
  piece("15","Redeemer Armor","Armor","Intellect","+115",70,"Non-Set"),
  {...piece("5","External Preview","Armor","Strength","+900"),status:"incomplete"},
  {...piece("6","Fake Future","Armor","Strength","+900"),kind:"weapon"},
 ]);
 const strength=rows.find(x=>x.key==="str");
 assert.equal(strength.slots[0].best.id,"1");
 assert.equal(strength.slots[0].tied,2);
 assert.equal(strength.slots[0].goodMatch,false,"regular best is not a Good Match highlight");
 assert.equal(strength.slots[1].goodMatch,false);
 assert.equal(strength.slots[2].best.id,"11");
 assert.equal(strength.slots[2].goodMatch,true,"standout Redeemer Kit should glow");
 assert.equal(rows.find(x=>x.key==="agi").slots[0].best.id,"7");
 assert.equal(rows.find(x=>x.key==="agi").slots[0].goodMatch,true);
 assert.equal(rows.find(x=>x.key==="will").slots[0].goodMatch,false,"equal default to regular set is not outstanding");
 assert.equal(rows.find(x=>x.key==="will").slots[1].goodMatch,true);
 assert.equal(rows.find(x=>x.key==="int").slots[2].best.id,"4");
 assert.equal(rows.find(x=>x.key==="int").slots[2].goodMatch,false);
 assert.equal(rows.find(x=>x.key==="int").slots[0].goodMatch,false,"no ordinary baseline is not a proven standout");
 assert.ok(rows.find(x=>x.key==="atk").slots.every(x=>!x.best&&!x.goodMatch));
});

test("only level 70 gear contributes to any category; main/secondary attribute require percentage effects",()=>{
 const examples=[
  piece("61","AIC Fieldwork Armor","Armor","Main Attribute","+74",60),
  piece("62","AIC Fieldwork Vest","Armor","Secondary Attribute","+8.9%",60),
  piece("63","AIC Fieldwork Gloves","Gloves","Strength","+900",60),
  piece("70","Regular Armor","Armor","Strength","+87"),
  piece("71","LYNX Slab","Kit","Main Attribute","+20.7%"),
  piece("72","Frontiers Extra O2 Tube","Kit","Secondary Attribute","+20.7%"),
  piece("73","Fake Level 70 Flat Armor","Armor","Main Attribute","+99"),
  piece("74","Fake Level 70 Flat Gloves","Gloves","Secondary Attribute","+99"),
  piece("75","Percent Secondary Armor","Armor","Secondary Attribute","+10.4%"),
  {...piece("76","Unknown-Level Armor","Armor","Strength","+999"),level:null},
 ];
 const matrix=deriveRefinementMatrix(examples);
 const find=(attr,slot)=>matrix.find(x=>x.key===attr).slots.find(x=>x.slot===slot);
 assert.equal(find("str","Armor").best?.id,"70");
 assert.equal(find("str","Gloves").best,null);
 assert.equal(find("main","Kit").best?.id,"71");
 assert.equal(find("main","Armor").best,null);
 assert.equal(find("main","Gloves").best,null);
 assert.equal(find("secondary","Kit").best?.id,"72");
 assert.equal(find("secondary","Armor").best?.id,"75");
 assert.equal(find("secondary","Gloves").best,null);
 for(const attr of ["main","secondary"])for(const cell of matrix.find(x=>x.key===attr).slots)
  if(cell.best)assert.match(cell.best.raw,/^\\+?[\\d.]+%$/,"percent effect required");
});

test("actual snapshot contains only level 70 displayed entries and genuine % gear effects",()=>{
 const matrix=deriveRefinementMatrix(equipment.gear);
 const sourceById=new Map(equipment.gear.map(x=>[x.id,x]));
 let shown=0;
 for(const row of matrix)for(const cell of row.slots){
  if(!cell.best)continue;
  shown++;
  const gear=sourceById.get(cell.best.id);
  assert.equal(gear?.level,70,row.key+"/"+cell.slot+" item must be level 70");
  assert.doesNotMatch(gear.name,/^AIC Fieldwork\\b/);
  if(["main","secondary"].includes(row.key))
    assert.match(cell.best.raw,/^\\+?[\\d.]+%$/,"main/secondary must have % effects");
 }
 assert.ok(shown>30);
 const main=matrix.find(x=>x.key==="main");
 const secondary=matrix.find(x=>x.key==="secondary");
 assert.equal(main.slots.find(x=>x.slot==="Kit").best?.id,"365","LYNX Slab is the main-stat percent kit");
 assert.equal(main.slots.find(x=>x.slot==="Armor").best,null);
 assert.equal(main.slots.find(x=>x.slot==="Gloves").best,null);
 assert.equal(secondary.slots.find(x=>x.slot==="Kit").best?.id,"1127","Rift Trekker Slab is the strongest % secondary kit");
 assert.ok(["306","1135"].includes(secondary.slots.find(x=>x.slot==="Armor").best?.id));
 assert.equal(secondary.slots.find(x=>x.slot==="Gloves").best,null);
});

test("real imported Gear 1138 remains Gloves rather than leaking into Agility/Will Kits",()=>{
 const matrix=deriveRefinementMatrix(equipment.gear);
 const agi=matrix.find(x=>x.key==="agi");
 const will=matrix.find(x=>x.key==="will");
 const agiKit=agi.slots.find(x=>x.slot==="Kit");
 const willKit=will.slots.find(x=>x.slot==="Kit");
 assert.equal(agiKit.best?.id,"350","real Agility Kit must be Redeemer Tag T1");
 assert.equal(willKit.best?.id,"348","real Will Kit must be Redeemer Seal T1");
 for(const row of matrix)for(const cell of row.slots)if(cell.slot==="Kit"){
  assert.notEqual(cell.best?.id,"1138","mislabelled Eternal Xiranite Hands must never be a Kit");
  assert.doesNotMatch(cell.best?.name??"",/\b(?:gloves|gauntlets|hands|wraps)\b/i);
 }
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
  if(cell.goodMatch){
   const recorded=equipment.gear.find(x=>x.id===cell.best.id);
   assert.match(cell.best.name,/^(?:Redeemer|Rift Trekker)\b/);
   assert.equal(recorded?.setName,"Non-Set");
  }
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
 assert.doesNotMatch(matrix,/Die Werte stammen aus den offiziellen SKPORT|Values come from official SKPORT/);
 assert.match(matrix,/Quelle: SKPORT Wiki/);
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
