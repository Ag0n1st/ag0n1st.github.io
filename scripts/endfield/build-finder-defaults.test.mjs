import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getMaxBuildFinderPreset} from "../../src/lib/endfield/buildFinderDefaults.mjs";
import {getBuildRequirements,evaluateBuildAvailability} from "../../src/lib/endfield/buildFinder.mjs";
import {normalizeOfficialGearSlot} from "../../src/lib/endfield/gearSlotCorrections.mjs";
import {MAX_AUTHORITY_LEVEL} from "../../src/lib/endfield/buildStoryProgress.mjs";

const areas=JSON.parse(readFileSync("src/data/endfield/progression/story-areas.json","utf8"));
const gear=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8")).gear;
const byId=new Map(gear.map(item=>[item.id,item]));
const officialLiinoBuilds=[
 ["1134","1138","1236","365"],
 ["1134","1133","365","365"],
 ["1126","1129","365","365"],
 ["1117","1123","1120","1120"],
 ["279","331","335","335"],
 ["274","278","284","284"]
];
const allBuildGearIds=officialLiinoBuilds.flat();
const preset=()=>getMaxBuildFinderPreset({
 regionIds:areas.regions.map(x=>x.id),
 areaIds:areas.areas.map(x=>x.id),
 blueprintIds:allBuildGearIds,
 stockLevels:[0,1,2,3]
});

test("new visitor gets maximum region, all areas, Authority 60, stock 3, level 70 and Pyrrolite",()=>{
 const p=preset();
 assert.equal(p.level,70);
 assert.equal(p.factoryComponent,"pyrrolite");
 assert.equal(p.storyProgress.regionId,"wuling");
 assert.equal(p.storyProgress.authorityLevel,MAX_AUTHORITY_LEVEL);
 assert.equal(p.storyProgress.stockRedistributionLevel,3);
 assert.deepEqual(p.storyProgress.unlockedAreaIds,areas.areas.map(x=>x.id));
 assert.equal(new Set(p.storyProgress.acquiredGearBlueprintIds).size,p.storyProgress.acquiredGearBlueprintIds.length);
 assert.deepEqual(new Set(p.storyProgress.acquiredGearBlueprintIds),new Set(allBuildGearIds));
});

test("default assumed max progress makes all six creator Liino builds selectable without manual ticking",()=>{
 const p=preset();
 for(const [i,ids] of officialLiinoBuilds.entries()){
   const rows=ids.map(id=>normalizeOfficialGearSlot(byId.get(id)));
   const requirement=getBuildRequirements(rows);
   assert.equal(requirement.allPartsVerified,true,"Creator build "+String.fromCharCode(65+i));
   assert.equal(evaluateBuildAvailability(requirement,{
      level:p.level,factoryComponent:p.factoryComponent,storyProgress:p.storyProgress
   }).status,"available","Creator build "+String.fromCharCode(65+i));
 }
});

test("player can restrict default setup and get real level/factory/blueprint locks",()=>{
 const p=preset();
 const req=getBuildRequirements(officialLiinoBuilds[0].map(id=>normalizeOfficialGearSlot(byId.get(id))));
 assert.equal(evaluateBuildAvailability(req,{level:36,
    factoryComponent:p.factoryComponent,storyProgress:p.storyProgress}).status,"level-locked");
 assert.equal(evaluateBuildAvailability(req,{level:70,
    factoryComponent:"cryston",storyProgress:p.storyProgress}).status,"component-locked");
 const deselected={...p.storyProgress,
    acquiredGearBlueprintIds:p.storyProgress.acquiredGearBlueprintIds.filter(id=>id!=="1134")};
 assert.notEqual(evaluateBuildAvailability(req,{level:70,
    factoryComponent:"pyrrolite",storyProgress:deselected}).status,"available");
});

test("preset uses only passed valid Gear IDs and never invents empty/unknown selections",()=>{
 const p=getMaxBuildFinderPreset({
  regionIds:["valley-iv","wuling"],
  areaIds:["the-hub","the-hub","snowy-forest"],
  blueprintIds:["1134","1134","nan","not-an-id","", "1138"],
  stockLevels:[0,2,3]
 });
 assert.deepEqual(p.storyProgress.acquiredGearBlueprintIds,["1134","1138"]);
 assert.deepEqual(p.storyProgress.unlockedAreaIds,["the-hub","snowy-forest"]);
 const empty=getMaxBuildFinderPreset();
 assert.equal(empty.storyProgress.regionId,"");
 assert.equal(empty.storyProgress.stockRedistributionLevel,null);
 assert.deepEqual(empty.storyProgress.acquiredGearBlueprintIds,[]);
});

test("equipment uses a CLOSED native disclosure for all heavy filters and detail builds",()=>{
 const equipment=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
 const start=equipment.indexOf('<details class="op-divided op-build-finder-accordion" id="build-finder">');
 const meta=equipment.indexOf(">Meta Builds</h3>");
 const filters=equipment.indexOf('id="op-level"');
 const details=equipment.indexOf(">Empfohlene Ausrüstung</h3>");
 const progression=equipment.indexOf(">Ausrüstungsprogression</h3>");
 const end=equipment.indexOf("</details>\n      </section>",start);
 assert.ok(meta>=0&&meta<start);
 assert.ok(start>=0&&start<filters&&filters<details&&details<progression&&progression<end);
 assert.doesNotMatch(equipment.slice(start,start+110),/\sopen(?:\s|>)/);
 assert.match(equipment.slice(start,start+400),/<summary class="op-build-finder-toggle">/);
 assert.match(equipment,/id="op-progress-reset">Maximal-Vorauswahl wiederherstellen/);
 assert.match(equipment,/Blaupausen-Auswahl \(standardmäßig alle aktiv\)/);
 assert.match(equipment,/kein automatischer Abgleich mit deinem Spielkonto/);
});

test("cards or team links reveal collapsed Finder and activate selected real build",()=>{
 const controller=readFileSync("src/components/operator/OperatorGuide.astro","utf8");
 const css=readFileSync("src/styles/operator-guides.css","utf8");
 assert.match(controller,/querySelector<HTMLDetailsElement>\("#build-finder"\)/);
 assert.match(controller,/if\(finder&&!finder\.open\)finder\.open=true/);
 assert.match(controller,/showBuild\(id\)/);
 assert.match(css,/\.op-build-finder-toggle:focus-visible/);
 assert.match(css,/\.op-build-finder-accordion\[open\]/);
});

test("local v2 stores explicit deselections and persists player level/factory; legacy v1 remains readable",()=>{
 const controller=readFileSync("src/components/operator/OperatorGuide.astro","utf8");
 assert.match(controller,/ag0n1st:endfield:build-story-progress:v2/);
 assert.match(controller,/legacySavedKey="ag0n1st:endfield:build-story-progress:v1"/);
 assert.match(controller,/version:2,/);
 assert.match(controller,/unselectedGearBlueprintIds:\[\.\.\.unselectedBlueprintIds\]/);
 assert.match(controller,/lockedAreaIds:\[\.\.\.lockedAreaIds\]/);
 assert.match(controller,/\[1,2\]\.includes\(saved\.version\)/);
 assert.match(controller,/applyMaxPreset\(\);\s*try\{/);
 assert.match(controller,/level\?\.addEventListener\("change",\(\)=>\{saveStoryProgress\(\);updateConfig\(\);\}\)/);
 assert.match(controller,/factory\?\.addEventListener\("change",\(\)=>\{saveStoryProgress\(\);updateConfig\(\);\}\)/);
 assert.match(controller,/resetProgress\?\.addEventListener\("click",\(\)=>\{[\s\S]*?applyMaxPreset\(\)/);
 assert.match(controller,/if\(!unselectedBlueprintIds\.has\(id\)\)ownedBlueprintIds\.add\(id\)/);
});
