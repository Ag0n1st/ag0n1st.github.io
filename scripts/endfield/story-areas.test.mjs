import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {classifyOfficialGearAcquisition,validateStoryAreaRegistry,
  evaluateAreaAccess,getVerifiedBlueprintArea,evaluateGearAcquisition} from "../../src/lib/endfield/storyAreas.mjs";
const registry=JSON.parse(readFileSync("src/data/endfield/progression/story-areas.json","utf8"));
const gearData=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
test("verified official Tal4/Wuling register uses stable IDs, no invented area gates",()=>{
  assert.equal(validateStoryAreaRegistry(registry),true);
  assert.deepEqual(registry.regions.map(x=>x.id),["valley-iv","wuling"]);
  assert.deepEqual(registry.areas.filter(x=>x.regionId==="wuling").map(x=>x.id),["jingyu-valley","wuling-city","qingbo-stockade","marker-stone","marker-stone-interiors","test-area","sword-vault-dale","yinglung-pass","north-wuling-exclusion-zone","snowy-forest","suiming","sis-painting","main-pillar-office"]);
  assert.equal(registry.blueprintAreaLinks.length,0);
  assert.equal(registry.storyMilestones.find(x=>x.id==="chapter-2-process-8").releaseState,"available-in-version");
});
test("new Si's Painting map is not automatically unlocked by knowing chapter VIII",()=>{
  assert.deepEqual(evaluateAreaAccess(registry,"sis-painting",{completedMissionIds:["chapter-2-process-8"]}).status,"unknown");
  assert.equal(evaluateAreaAccess(registry,"sis-painting",{unlockedAreaIds:["sis-painting"]}).status,"confirmed");
  assert.deepEqual(getVerifiedBlueprintArea(registry,"1246"),[]);
});
test("classify every official SKPORT gear acquisition without assigning invented area IDs",()=>{
 const totals={};
 for(const item of gearData.gear){
   const source=classifyOfficialGearAcquisition(item);
   totals[source.kind]=(totals[source.kind]??0)+1;
   assert.equal(source.areaId,null,"False blueprint location for "+item.id);
   assert.equal(source.blueprintLocationStatus,"unverified");
 }
 assert.equal(gearData.gear.length,258);
 assert.deepEqual(totals,{
   unknown:12,"authority-level-reward":86,"template-crate":125,
   "regional-stock-redistribution":20,"region-story-progress":15
 });
});
test("distinct acquisition methods stay distinct from geographic blueprint pickup",()=>{
  assert.equal(classifyOfficialGearAcquisition({id:"123",acquisitionNotes:["Wuling Stock Redistribution Level 3"]}).kind,"regional-stock-redistribution");
  assert.equal(classifyOfficialGearAcquisition({id:"1246",acquisitionNotes:["[Dreamscape of Wind and Snow] Version Update","Game progress reaches the [Wuling] region"]}).regionId,"wuling");
  assert.equal(classifyOfficialGearAcquisition({id:"777",acquisitionNotes:["A special location, not yet verified"]}).kind,"unknown");
});
test("reject unverified gear-to-area claims and undocumented missions",()=>{
  const copy=structuredClone(registry);
  copy.blueprintAreaLinks=[{gearId:"1246",areaId:"sis-painting",verification:"suspected",sourceId:"official-version-20261015"}];
  assert.throws(()=>validateStoryAreaRegistry(copy),/Unverified/);
  const changed=structuredClone(registry);
  changed.areas[1].unlock.requiredMissionIds=["chapter-2-process-8"];
  assert.throws(()=>validateStoryAreaRegistry(changed),/Cannot claim/);
});


test("area publication order does not grant blueprint locations or mission unlocks",()=>{
  assert.equal(registry.areas.length,19);
  assert.ok(registry.areas.every(area=>area.unlock.status==="unverified"));
  assert.ok(registry.areas.every(area=>area.blueprintGearIds.length===0));
  assert.equal(new Set(registry.areas.map(x=>x.officialMapLevelId)).size,19);
  assert.equal(registry.areas.filter(x=>x.regionId==="valley-iv").length,6);
  assert.equal(registry.versionNotices[0].addedGearSetPieces.length,5);
  assert.equal(registry.regionAccessNotes[0].requiresAcceptingMission,true);
});
test("different official acquisition paths distinguish eligible from actually acquired",()=>{
 const find=kind=>gearData.gear.find(g=>classifyOfficialGearAcquisition(g).kind===kind);
 const authority=find("authority-level-reward");
 const minimum=classifyOfficialGearAcquisition(authority).authorityLevel;
 assert.equal(evaluateGearAcquisition(authority,{authorityLevel:minimum-1}).status,"locked");
 assert.equal(evaluateGearAcquisition(authority,{authorityLevel:minimum}).status,"eligible");
 const shop=find("regional-stock-redistribution");
 const shopMinimum=classifyOfficialGearAcquisition(shop).stockRedistributionLevel;
 assert.equal(evaluateGearAcquisition(shop,{stockRedistributionLevels:{wuling:shopMinimum-1}}).status,"locked");
 assert.equal(evaluateGearAcquisition(shop,{stockRedistributionLevels:{wuling:shopMinimum}}).status,"eligible");
 const region=find("region-story-progress");
 assert.equal(evaluateGearAcquisition(region,{unlockedRegionIds:["wuling"]}).status,"eligible");
 assert.equal(evaluateGearAcquisition(region,{}).status,"unverified");
 const crate=find("template-crate");
 assert.equal(evaluateGearAcquisition(crate,{unlockedRegionIds:["wuling"]}).status,"unverified");
 assert.equal(evaluateGearAcquisition(crate,{acquiredGearBlueprintIds:[crate.id]}).status,"acquired");
 assert.equal(evaluateGearAcquisition(find("unknown"),{}).status,"unverified");
});
