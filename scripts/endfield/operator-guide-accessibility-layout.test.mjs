import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getBuildRequirements} from "../../src/lib/endfield/buildFinder.mjs";
import {normalizeOfficialGearSlot} from "../../src/lib/endfield/gearSlotCorrections.mjs";
import {accessibilityForRequirement,metaAccessibilityFromRequirements} from "../../src/lib/endfield/metaAccessibility.mjs";

const read=path=>readFileSync(path,"utf8");
const guide=read("src/content/operator-guides/liino.md");
const overview=read("src/components/operator/sections/OperatorOverview.astro");
const model=read("src/lib/endfield/operatorGuideModel.ts");
const weapons=read("src/components/operator/sections/OperatorWeapons.astro");
const potential=read("src/components/operator/sections/OperatorPotentials.astro");
const schema=read("src/content/operatorGuideSchema.ts");
const template=read("src/content/operator-guides/_template.md");
const catalog=JSON.parse(read("src/data/endfield/catalog/equipment-details.json"));
const allGear=new Map(catalog.gear.map(x=>[x.id,x]));

test("five-tier accessibility is governed by both validated Meta gear level and factory component",()=>{
 const cases=[
  [36,"ferrium",5],
  [50,"cryston",4],
  [60,"xiranite",3],
  [70,"xiranite",2],
  [70,"cuprium",2],
  [70,"hetonite",1],
  [70,"pyrrolite",1],
  [50,"pyrrolite",1],
  [36,"pyrrolite",1],
  [70,"amethyst",2],
 ];
 for(const [level,component,expected] of cases){
  assert.equal(accessibilityForRequirement({
   allPartsVerified:true,requiredLevel:level,requiredComponent:component
  }).score,expected,"Lv"+level+"/"+component);
 }
 for(const invalid of [
  {allPartsVerified:false,requiredLevel:70,requiredComponent:"pyrrolite"},
  {allPartsVerified:true,requiredLevel:70,requiredComponent:"unknown"},
  {allPartsVerified:true,requiredLevel:null,requiredComponent:"pyrrolite"},
 ])assert.equal(accessibilityForRequirement(invalid),null);
});

test("meta accessibility uses EASIEST fully verified meta build, never progression builds",()=>{
 const mk=(id,meta,level,tier)=>({id,meta,requirements:{
  allPartsVerified:true,requiredLevel:level,requiredComponent:tier
 }});
 const mixed=[
  mk("late-meta",true,70,"pyrrolite"),
  mk("mid-meta",true,60,"xiranite"),
  mk("early-progression",false,36,"ferrium"),
 ];
 const result=metaAccessibilityFromRequirements(mixed);
 assert.equal(result.score,3);
 assert.equal(result.buildId,"mid-meta");
 assert.equal(result.metaBuildCount,2);
 assert.equal(metaAccessibilityFromRequirements([mk("progression",false,36,"ferrium")]),null);
 assert.equal(metaAccessibilityFromRequirements([]),null);
 assert.equal(metaAccessibilityFromRequirements([...mixed,{
  id:"unverified-meta",meta:true,requirements:{
   allPartsVerified:false,requiredLevel:null,requiredComponent:null
  }
 }]),null);
});

test("creator Liino Meta A/B/C are all official Pyrrolite endgame builds => accessibility 1/5",()=>{
 const ids=[
  ["1134","1138","1236","365"],
  ["1134","1133","365","365"],
  ["1126","1129","365","365"]
 ];
 const requirements=ids.map((items,i)=>({
  id:["ultimate-fokus","balanced","will-fokus"][i],meta:true,
  requirements:getBuildRequirements(items.map(id=>normalizeOfficialGearSlot(allGear.get(id))),{
   availableFromLevel:70
  })
 }));
 for(const b of requirements){
  assert.equal(b.requirements.allPartsVerified,true);
  assert.equal(b.requirements.requiredLevel,70);
  assert.equal(b.requirements.requiredComponent,"pyrrolite");
 }
 const result=metaAccessibilityFromRequirements(requirements);
 assert.equal(result.score,1);
 assert.equal(result.metaBuildCount,3);
 assert.match(guide,/^  ratings:\n    difficulty: 1\n    flexibility: 4$/m);
 assert.doesNotMatch(guide,/^    accessibility:/m);
 assert.match(model,/realMetaBuilds=guide\.equipment\.builds\.filter\(build=>build\.meta===true\)/);
 assert.match(model,/getOfficialGear\(official\.id\)/);
 assert.match(model,/metaAccessibilityFromRequirements\(verifiedMetaRequirements\)/);
 assert.match(model,/ratingValues=\{/);
 assert.match(overview,/const score=ratingValues\[key\]/);
});

test("overview uses actual ItemIcon and resolved SKPORT names in weapons AND four featured gear slots",()=>{
 assert.match(overview,/resolveOfficialItem\(w\.name,"Weapons"\)/);
 assert.match(overview,/resolveOfficialItem\(reference,"Gear"\)/);
 assert.match(overview,/<ItemIcon id=\{w\.official\.id\}\/>/);
 assert.match(overview,/<ItemIcon id=\{part\.official\?\.id\?\?part\.reference\} \//);
 assert.match(overview,/\{w\.official\?\.name\?\?w\.name\}/);
 assert.match(overview,/\{part\.official\?\.name\?\?part\.reference\}/);
 assert.doesNotMatch(overview,/\{featuredBuild\.items\.map\(item=/);
});

test("Datafield sources appear ONLY as subtle per-scenario and table footnotes",()=>{
 const css=read("src/styles/operator-guides.css");
 assert.match(weapons,/<small class="op-data-source-note">Quelle: \{scenario\.sourceNote\}<\/small>/);
 assert.match(weapons,/<h4>\{scenario\.title\}<\/h4>/);
 assert.match(weapons,/Referenz: \{resolveOfficialItem/);
 assert.doesNotMatch(weapons,/Vergleichsbedingungen<\/summary>/);
 assert.doesNotMatch(weapons,/guide\.weapons\.disclaimer/);
 assert.doesNotMatch(weapons,/Quelle der Einordnung/);
 assert.doesNotMatch(weapons,/Relative Berechnungswerte aus der jeweiligen Datafield/);
 assert.match(potential,/<small class="op-data-source-note">Quelle:/);
 assert.doesNotMatch(potential,/Gesamtgewinn vs\. P0/);
 assert.doesNotMatch(potential,/Vergleichsbedingungen:/);
 assert.doesNotMatch(potential,/guide\.potentials\.disclaimer/);
 assert.doesNotMatch(potential,/Pull-Empfehlung/);
 assert.doesNotMatch(potential,/<th>Quelle<\/th>/);
 assert.match(css,/\.op-data-source-note\{display:block;margin-top:8px;font-size:10px/);
});

test("no cumulative potential metric, no standalone pull subsection in schema or template",()=>{
 assert.match(schema,/increaseOverPreviousPercent: z\.number/);
 assert.doesNotMatch(schema,/increaseOverP0Percent/);
 const potentialsSchema=schema.slice(schema.indexOf("  potentials: z.object({"),schema.indexOf("  teams: z.object({"));
 assert.doesNotMatch(potentialsSchema,/pullAdvice/);
 assert.doesNotMatch(template,/increaseOverP0Percent:\s*\d/);
 assert.match(template,/conclusion\.pullAdvice/);
 assert.match(schema,/conclusion: z\.object/);
 assert.match(guide,/^status: preview$/m);
});
