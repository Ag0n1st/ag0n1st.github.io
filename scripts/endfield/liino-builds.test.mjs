import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {normalizeOfficialGearSlot} from "../../src/lib/endfield/gearSlotCorrections.mjs";
import {getBuildRequirements,evaluateBuildAvailability} from "../../src/lib/endfield/buildFinder.mjs";

const guide=readFileSync("src/content/operator-guides/liino.md","utf8");
const catalog=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
const gearById=new Map(catalog.gear.map(gear=>[gear.id,gear]));

const expected=[
 {id:"ultimate-fokus",title:"Build A – Ultimate-Fokus",items:["1134","1138","1236","365"],level:70,component:"pyrrolite"},
 {id:"balanced",title:"Build B – Balanced",items:["1134","1133","365","365"],level:70,component:"pyrrolite"},
 {id:"will-fokus",title:"Build C – Will-Fokus",items:["1126","1129","365","365"],level:70,component:"pyrrolite"},
 {id:"level-60",title:"Build D – Level 60",items:["1117","1123","1120","1120"],level:60,component:"xiranite"},
 {id:"level-50",title:"Build E – Level 50",items:["279","331","335","335"],level:50,component:"cryston"},
 {id:"level-36",title:"Build F – Level 36",items:["274","278","284","284"],level:36,component:"ferrium"}
];

// Read exactly the equipment.builds block from the creator-owned frontmatter;
// the snapshot JSON supplies names/slots/recipes rather than copied YAML names.
function declaredLiinoBuilds(){
 const section=guide.match(/^equipment:\n  builds:\n([\s\S]*?)(?=^  progression:)/m);
 assert.ok(section,"Liino must have an equipment.builds section");
 return [...section[1].matchAll(/^    - id: ([a-z0-9-]+)\n([\s\S]*?)(?=^    - id:|$(?![\s\S]))/gm)]
   .map((match)=>{
    const block=match[2];
    const title=block.match(/^      title: "([^"]+)"/m);
    const items=block.match(/^      items: \[(.+)\]/m);
    const level=block.match(/^      availableFromLevel: (\d+)/m);
    assert.ok(title&&items&&level,"Incomplete editorial build "+match[1]);
    return {id:match[1],title:title[1],
      items:[...items[1].matchAll(/"([0-9]+)"/g)].map(x=>x[1]),
      level:Number(level[1])};
   });
}

test("creator-approved Liino guide keeps all six exact combinations, names and level labels",()=>{
 const actual=declaredLiinoBuilds();
 assert.equal(actual.length,6);
 assert.deepEqual(actual,expected.map(({id,title,items,level})=>({id,title,items,level})));
 assert.match(guide,/^status: preview$/m,"Unfinished other guide sections stay preview");
 assert.match(guide,/^  featuredBuildId: ultimate-fokus$/m);
 assert.match(guide,/keine zweite Ultimate/i);
 assert.match(guide,/zweite(?:r|n)? Ember/);
});

test("all six builds have verified official parts, correct slot layout and recipe-derived components",()=>{
 for(const build of expected){
  const records=build.items.map(id=>{
   const original=gearById.get(id);
   assert.ok(original,"Missing official gear ID "+id+" in "+build.id);
   assert.equal(original.status,"verified",build.id+" "+id);
   assert.equal(original.recipeStatus,"verified",build.id+" "+id);
   return normalizeOfficialGearSlot(original);
  });
  assert.deepEqual(records.map(x=>x.gearSlot),["Armor","Gloves","Kit","Kit"],build.id);
  const requirements=getBuildRequirements(records,{availableFromLevel:build.level});
  assert.equal(requirements.allPartsVerified,true,build.id);
  assert.equal(requirements.requiredLevel,build.level,build.id);
  assert.equal(requirements.requiredComponent,build.component,build.id);
  const uniqueBlueprints=[...new Set(build.items)];
  const progress={regionId:"wuling",unlockedAreaIds:[],
   authorityLevel:60,stockRedistributionLevel:3,
   acquiredGearBlueprintIds:uniqueBlueprints};
  const choice={level:build.level,factoryComponent:build.component,storyProgress:progress};
  assert.equal(evaluateBuildAvailability(requirements,choice).status,"available",build.id);
  const missingLast={...progress,acquiredGearBlueprintIds:uniqueBlueprints.slice(0,-1)};
  assert.notEqual(evaluateBuildAvailability(requirements,{...choice,storyProgress:missingLast}).status,
    "available","Never claim access before all individual blueprints: "+build.id);
  if(build.level>36)
   assert.equal(evaluateBuildAvailability(requirements,{...choice,level:build.level===50?36:50}).status,
      "level-locked",build.id);
 }
});

test("the verified item 1138 correction is surgical and preserves imported raw data",()=>{
 const original=gearById.get("1138");
 assert.equal(original.name,"Eternal Xiranite Hands");
 assert.equal(original.gearSlot,"Kit","Detected raw 2026-10-15 snapshot mismatch");
 assert.equal(normalizeOfficialGearSlot(original).gearSlot,"Gloves");
 assert.equal(original.gearSlot,"Kit","Do not mutate import snapshot");
 const unrelated=gearById.get("1133");
 assert.strictEqual(normalizeOfficialGearSlot(unrelated),unrelated);
 assert.equal(normalizeOfficialGearSlot(null),null);
});

test("duplicate kits mean two crafted units but only one unique blueprint",()=>{
 for(const id of ["balanced","will-fokus","level-60","level-50","level-36"]){
  const build=expected.find(x=>x.id===id);
  assert.equal(build.items[2],build.items[3],id);
  assert.equal(new Set(build.items).size,3,id);
 }
 assert.notEqual(expected[0].items[2],expected[0].items[3]);
});

test("real builds in an unfinished preview guide must not use demo preview mode",()=>{
 const component=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
 assert.match(component,/preview:\s*preview\s*&&\s*guide\.equipment\.builds\.length===0/);
});

test("only creator-selected Liino builds A, B and C are featured as Meta Builds",()=>{
  const raw=guide.match(/^equipment:\n  builds:\n([\s\S]*?)(?=^  progression:)/m)?.[1]??"";
  const entries=[...(raw+"  progression:\n").matchAll(/^    - id: ([a-z0-9-]+)\n([\s\S]*?)(?=^    - id:|^  progression:)/gm)];
  assert.equal(entries.length,6,"Each creator build must be recorded exactly once");
  const meta=entries.filter(([full,id,body])=>/^      meta: true$/m.test(body));
  assert.deepEqual(meta.map(match=>match[1]),["ultimate-fokus","balanced","will-fokus"]);
  for(const [,id,body] of meta){
    const summary=body.match(/^      metaSummary: "([^"]+)"$/m)?.[1];
    assert.ok(summary,id+" needs a short self-contained Meta Builds description");
    assert.ok(summary.length<=280,id+" metaSummary must be concise");
  }
  for(const [,id,body] of entries.slice(3)){
    assert.doesNotMatch(body,/^      meta: true$/m,id+" is progression, not Meta");
  }
});

test("the shared equipment framework places responsive Meta Builds before the Finder",()=>{
  const section=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
  const styles=readFileSync("src/styles/operator-guides.css","utf8");
  const schema=readFileSync("src/content/operatorGuideSchema.ts","utf8");
  const template=readFileSync("src/content/operator-guides/_template.md","utf8");
  const controller=readFileSync("src/components/operator/OperatorGuide.astro","utf8");
  assert.match(schema,/meta: z\.boolean\(\)\.default\(false\)/);
  assert.match(schema,/metaSummary: z\.string\(\)\.trim\(\)\.max\(280\)/);
  assert.match(schema,/Meta-Builds benötigen eine kurze Beschreibung/);
  assert.match(section,/const metaBuilds=officialBuilds\.filter\(build=>build\.meta===true\)/);
  assert.ok(section.indexOf(">Meta Builds</h3>")>=0 &&
    section.indexOf(">Meta Builds</h3>") <
    section.indexOf('<details class="op-divided op-build-finder-accordion" id="build-finder">'),
    "Meta overview must appear above the closed detailed finder");
  assert.ok(section.includes('<summary class="op-build-finder-toggle">') &&
    section.includes("<strong>Build-Finder</strong>"),
    "Finder title must be the native disclosure summary");
  assert.match(section,/href="#build-finder" data-select-build=\{build\.id\}/,
    "Card CTA must select the corresponding real finder build");
  assert.match(section,/metaBuilds\.map\(build=>/);
  assert.match(section,/build\.metaSummary/);
  assert.match(section,/part\.catalog\?\.name\?\?part\.reference/,
    "Gear labels must be official names and not numeric IDs only");
  assert.match(controller,/\[data-select-build\]/,
    "Shared build selector must respond to Meta card links");
  assert.match(styles,/\.op-meta-build-grid\{display:grid/);
  assert.match(styles,/@media\(max-width:680px\)[\s\S]*?\.op-meta-build-grid\{grid-template-columns:1fr\}/);
  assert.match(template,/meta: true/);
  assert.match(template,/metaSummary:/);
});

test("Meta tags only come from authored guides; other operators are never forced",()=>{
 const typhoeus=readFileSync("src/content/operator-guides/typhoeus.md","utf8");
 // Since the October 2026 Typhoeus guide was authored, its two Meta builds
 // must stay real editorial entries; this old test must not require a prototype.
 assert.equal((typhoeus.match(/^      meta: true$/gm)||[]).length,2);
 assert.equal((typhoeus.match(/^      metaSummary:/gm)||[]).length,2);
 const template=readFileSync("src/content/operator-guides/_template.md","utf8");
 assert.match(template,/meta: true/,"the template merely explains the optional tag");
 const model=readFileSync("src/lib/endfield/operatorGuideModel.ts","utf8");
 assert.match(model,/meta:false,metaSummary:""/,
   "the demo build is never falsely marked as Meta");
});

test("creator-approved Liino skill priority uses the exact four level targets and comparisons",()=>{
 const text=readFileSync("src/content/operator-guides/liino.md","utf8");
 assert.match(text,/^  priority:\n    order: \[ultimate, battle, combo, basic\]\n    comparisons: \[">", ">=", ">"\]\n    targetLevels:\n      ultimate: "M3"\n      battle: "M3"\n      combo: "M3"\n      basic: "1"$/m);
 assert.match(text,/^    battle: >-\n[\s\S]*?10 % ANG-Bonus/m);
 assert.match(text,/^    combo: >-\n[\s\S]*?10 auf 8 Sekunden/m);
 assert.match(text,/Die FP stammen aus dem Talent, nicht unmittelbar aus der Kombo selbst/);
 assert.match(text,/^    basic: >-\n      Auf Stufe 1 belassen\./m);
 assert.match(text,/^status: preview$/m,"Other P2 areas must remain in preview");
});

test("SKPORT Liino data supports the creator-approved battle and combo M3 reasoning",()=>{
 const imported=JSON.parse(readFileSync("src/data/endfield/operators/liino.json","utf8"));
 const battle=imported.skills.find(skill=>skill.slot==="battle");
 const combo=imported.skills.find(skill=>skill.slot==="combo");
 const ultimate=imported.skills.find(skill=>skill.slot==="ultimate");
 const metric=(skill,name)=>skill.metrics.find(row=>row[0]===name);
 assert.equal(metric(battle,"ATK Boost").at(-1),"10%");
 assert.equal(metric(battle,"ATK Boost")[1],"6%");
 assert.equal(metric(combo,"Cooldown")[1],"10s");
 assert.equal(metric(combo,"Cooldown").at(-1),"8s");
 assert.equal(metric(combo,"Ultimate Energy Gain")[1],"20");
 assert.equal(metric(combo,"Ultimate Energy Gain").at(-1),"20");
 assert.equal(metric(ultimate,"Amp Increase per Will").at(-1),"0.04%");
 assert.equal(metric(ultimate,"MAX Amp from Will").at(-1),"60%");
});

test("percentage source attribution remains mandatory in schema, but public UI is unobtrusive",()=>{
 const schema=readFileSync("src/content/operatorGuideSchema.ts","utf8");
 const tpl=readFileSync("src/content/operator-guides/_template.md","utf8");
 const weaponUi=readFileSync("src/components/operator/sections/OperatorWeapons.astro","utf8");
 const potentialUi=readFileSync("src/components/operator/sections/OperatorPotentials.astro","utf8");
 const workflow=readFileSync("docs/operator-guide-workflow.md","utf8");
 assert.match(schema,/Waffen-Prozentvergleiche benötigen eine benannte Quelle, z\. B\. Datafield/);
 assert.match(schema,/Potenzial-Prozentvergleiche benötigen eine benannte Quelle, z\. B\. Datafield/);
 assert.match(schema,/Potenzial-Prozentvergleiche benötigen ihre Vergleichsbedingungen/);
 assert.match(weaponUi,/<small class="op-data-source-note">Quelle: \{scenario\.sourceNote\}<\/small>/);
 assert.match(potentialUi,/<small class="op-data-source-note">Quelle:/);
 assert.match(tpl,/sourceNote: "Datafield"/);
 assert.match(workflow,/keinen Link zur Datenquelle anzeigen/);
 assert.match(guide,/^weapons:\n  recommendations:\n    - weaponId: "1046"$/m);
 assert.match(guide,/^potentials:\n  entries:\n    - level: 1$/m);
 assert.match(guide,/sourcePageType: character-profile/);
 assert.doesNotMatch(guide,/^  disclaimer:/m);
});
