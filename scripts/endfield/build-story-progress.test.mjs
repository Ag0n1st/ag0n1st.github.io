import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createGearAccessRequirement,evaluateGearStoryAccess,evaluateBuildStoryAccess, MAX_AUTHORITY_LEVEL, validAuthorityLevel}
 from "../../src/lib/endfield/buildStoryProgress.mjs";
import {getBuildRequirements,evaluateBuildAvailability} from "../../src/lib/endfield/buildFinder.mjs";
const data=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8")).gear;
const precise=JSON.parse(readFileSync("src/data/endfield/progression/blueprint-precise-gear-index.json","utf8")).entries;
const registry=JSON.parse(readFileSync("src/data/endfield/progression/story-areas.json","utf8"));
const reported=x=>precise.find(v=>v.gearId===String(x.id));
function locationOf(row){
 const target=reported(row);
 if(!target)return null;
 return {
   precision:["wiki-exact-piece","two-source-exact-piece","hub-exact-piece"].includes(target.status)
    ?"specific-item":target.status==="source-conflict"?"disputed":"set-family",
   areas:target.exactAreaId?[{id:target.exactAreaId}]:[]
 };
}
function partById(id){
 const item=data.find(x=>x.id===String(id));
 assert.ok(item,"Unknown official Gear "+id);
 return createGearAccessRequirement(item,locationOf(item));
}
const progress=(regionId="wuling",areas=[],owned=[],authority=null,stock=null)=>({
 regionId,unlockedAreaIds:areas,acquiredGearBlueprintIds:owned,
 authorityLevel:authority,stockRedistributionLevel:stock
});
const four=()=>Array.from({length:4},()=>partById("341"));
test("source-backed Gear ID 341 Pulser Labs Gloves requires actual Wuling area selection",()=>{
 const p=partById("341");
 assert.equal(p.kind,"template-crate");
 assert.deepEqual(p.areaIds,["wuling-city"]);
 assert.equal(evaluateGearStoryAccess(p,progress()).status,"area-unconfirmed");
 assert.equal(evaluateGearStoryAccess(p,progress("valley-iv")).status,"region-locked");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",["wuling-city"])).status,"blueprint-unconfirmed");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",["wuling-city"],["341"])).status,"available");
 assert.equal(evaluateGearStoryAccess(p,progress("valley-iv",[],["341"])).status,"available");
});
test("unverified or disputed Gear source never becomes an invented area gate",()=>{
 const disputed=partById("271"); // MI Security Gloves in two community crate lists
 assert.equal(disputed.hasConflictingSources,true);
 assert.deepEqual(disputed.areaIds,[]);
 assert.equal(evaluateGearStoryAccess(disputed,progress("wuling",["wuling-city"])).status,"story-unverified");
 assert.equal(evaluateGearStoryAccess(disputed,progress("wuling",[],["271"])).status,"available");
});
test("Wuling region selection alone never unlocks parallel/side-quest areas",()=>{
 assert.ok(registry.areas.length>=19);
 const p=partById("341");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling")).status,"area-unconfirmed");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",["sis-painting"])).status,"area-unconfirmed");
});
test("source-reported stage is insufficient for claimed Authority and Stock rewards",()=>{
 const authority=data.find(x=>x.acquisitionNotes?.some(s=>/^Authority Level \d+ Reward$/.test(s)));
 const p=createGearAccessRequirement(authority,null);
 assert.equal(evaluateGearStoryAccess(p,progress()).status,"story-unverified");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",[],[],0)).status,"acquisition-locked");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",[],[],p.authorityLevel)).status,"blueprint-unconfirmed");
 assert.equal(evaluateGearStoryAccess(p,progress("wuling",[],[p.gearId])).status,"available");
 const stockGear=data.find(x=>x.acquisitionNotes?.some(s=>/^Wuling Stock Redistribution Level \d+$/.test(s)));
 const q=createGearAccessRequirement(stockGear,null);
 assert.equal(evaluateGearStoryAccess(q,progress("wuling",[],[],null,0)).status,"acquisition-locked");
 assert.equal(evaluateGearStoryAccess(q,progress("wuling",[],[],null,q.stockRedistributionLevel)).status,"blueprint-unconfirmed");
});
test("four pieces must all be confirmed before the story gate can return available",()=>{
 const items=[partById("341"),partById("341"),partById("341"),partById("341")];
 assert.equal(evaluateBuildStoryAccess(items,progress("wuling",["wuling-city"],[])).status,"blueprint-unconfirmed");
 assert.equal(evaluateBuildStoryAccess(items,progress("wuling",["wuling-city"],["341"])).status,"available");
 assert.equal(evaluateBuildStoryAccess(items,null).status,"story-unverified");
 assert.equal(evaluateBuildStoryAccess(items.slice(0,3),progress()).status,"story-unverified");
});
test("level + factory + area plus all owned blueprints produces a valid fully available build",()=>{
 const ids=["341","338","353","371"];
 const rows=ids.map(id=>data.find(x=>x.id===id));
 const req=getBuildRequirements(rows,{storyUnlock:"Redaktionell geprüft",
  locations:rows.map(locationOf)});
 assert.equal(req.allPartsVerified,true);
 const result=evaluateBuildAvailability(req,{level:70,factoryComponent:"pyrrolite",
  storyProgress:progress("wuling",["wuling-city"],ids)});
 assert.equal(result.status,"available");
 const uncertain=evaluateBuildAvailability(req,{level:70,factoryComponent:"pyrrolite",
  storyProgress:progress("wuling",["wuling-city"],ids.slice(0,3))});
 assert.notEqual(uncertain.status,"available");
});
test("all 258 SKPORT records yield reproducible provenance-aware access requirements",()=>{
 for(const gear of data){
   const p=createGearAccessRequirement(gear,locationOf(gear));
   assert.equal(p.gearId,gear.id);
   assert.ok(["template-crate","region-story-progress","authority-level-reward",
     "regional-stock-redistribution","unknown"].includes(p.kind));
   if(p.areaIds.length){
     assert.equal(p.kind,"template-crate");
     assert.ok(p.areaIds.every(id=>registry.areas.some(a=>a.id===id)));
   }
 }
});

test("authority level is strictly capped to current in-game maximum 60",()=>{
 assert.equal(MAX_AUTHORITY_LEVEL,60);
 assert.equal(validAuthorityLevel(0),true);
 assert.equal(validAuthorityLevel(60),true);
 for(const value of [-1,60.1,61,200,NaN,null,undefined,"60"])
   assert.equal(validAuthorityLevel(value),false,"Invalid Authority value "+String(value));
 const gear=data.find(x=>x.acquisitionNotes?.includes("Authority Level 60 Reward")) ??
  data.find(x=>x.acquisitionNotes?.some(v=>/^Authority Level \\d+ Reward$/.test(v)));
 const requirement=createGearAccessRequirement(gear,null);
 assert.equal(evaluateGearStoryAccess(requirement,progress("wuling",[],[],200)).status,"story-unverified");
 assert.equal(evaluateGearStoryAccess(requirement,progress("wuling",[],[],60)).status,"blueprint-unconfirmed");
});
