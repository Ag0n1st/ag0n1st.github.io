import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FACTORY_COMPONENT_STAGES,DEFAULT_FACTORY_COMPONENT,FACTORY_STAGES,
  componentRequirementForRecipe,getBuildRequirements,hasValidBuildSlots,evaluateBuildAvailability
} from "../../src/lib/endfield/buildFinder.mjs";
const standard=id=>({materials:[{id:"602",count:8000},{id,count:50}]});
const gear=(component,level=70,id=component)=>({
 id:String(id),name:"Gear "+id,status:"verified",level,recipeStatus:"verified",
 standardRecipe:standard(component),acquisitionNotes:["Gear Template Crate"]
});
// Existing scenario fixtures test level/story/recipe gating, not equipment slots.
// Give them one armor, one pair of gloves and two kits so the shared
// production slot validation is exercised without weakening earlier tests.
const mockedRequirements=(parts,options)=>getBuildRequirements(
 parts.map((piece,i)=>({...piece,gearSlot:["Armor","Gloves","Kit","Kit"][i]??"Kit"})),
 options
);
const ownedProgress=(ids=[])=>({regionId:"wuling",unlockedAreaIds:[],
 acquiredGearBlueprintIds:ids,authorityLevel:null,stockRedistributionLevel:null});
const select=(factoryComponent="pyrrolite",level=70,storyProgress)=>({
 factoryComponent,level,storyProgress
});
const prepare=(components,storyUnlock="Editorial hint")=>
  mockedRequirements(components.map(([id,lv])=>gear(id,lv)),{storyUnlock});

test("seven factory components use official Wiki item IDs and user-defined level ranges",()=>{
 assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.itemId),["525","526","527","528","747","844","1067"]);
 assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.levels),[[20,28],[36],[50],[60,70],[70],[70],[70]]);
 assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.phase),
   ["Early-Game","Early-Game","Early-Game","Mid-Game","Mid-Game","End-Game","End-Game"]);
 assert.equal(DEFAULT_FACTORY_COMPONENT,"pyrrolite");
});
test("four validated pieces require both correct gear level and factory component before story",()=>{
 const req=prepare([["525",20],["528",60],["747",70],["1067",70]]);
 const owned=ownedProgress(["525","528","747","1067"]);
 assert.equal(req.requiredLevel,70);
 assert.equal(req.requiredComponent,"pyrrolite");
 assert.equal(req.gearAccess.length,4);
 assert.equal(evaluateBuildAvailability(req,select("hetonite",70,owned)).status,"component-locked");
 assert.equal(evaluateBuildAvailability(req,select("pyrrolite",60,owned)).status,"level-locked");
 assert.equal(evaluateBuildAvailability(req,select("pyrrolite",70,owned)).status,"available");
});
test("Cuprium, Hetonite and Pyrrolite retain distinct levels of factory unlock",()=>{
 assert.deepEqual(["747","844","1067"].map(id=>mockedRequirements(
  Array.from({length:4},(_,i)=>gear(id,70,String(i+400))),
  {storyUnlock:"Prose alone is NOT proof"}
 ).requiredComponent),["cuprium","hetonite","pyrrolite"]);
});
test("basic official Lv10 recipes use only starter materials",()=>{
 const basic={id:"206",name:"Basic Armor",status:"verified",level:10,recipeStatus:"verified",
  standardRecipe:{materials:[{id:"493",count:10},{id:"475",count:2}]},
  acquisitionNotes:[]};
 const req=mockedRequirements(Array.from({length:4},()=>basic));
 assert.equal(req.requiredComponent,"starter");
 assert.equal(evaluateBuildAvailability(req,select("amethyst",20,ownedProgress(["206"]))).status,"available");
});
test("freeform story prose NEVER unlocks Gear or overrides missing story input",()=>{
 const pieces=Array.from({length:4},(_,i)=>gear("528",70,String(i+100)));
 const req=mockedRequirements(pieces,{storyUnlock:"Already checked"});
 assert.equal(req.hasStoryEvidence,true);
 assert.equal(evaluateBuildAvailability(req,select()).status,"story-unverified");
 assert.equal(evaluateBuildAvailability(req,select("pyrrolite",70,ownedProgress())).status,"story-unverified");
 assert.equal(evaluateBuildAvailability(req,select("pyrrolite",70,
   ownedProgress(["100","101","102","103"]))).status,"available");
});
test("incomplete details, unrecognized recipes and editor preview never unlock builds",()=>{
 assert.equal(componentRequirementForRecipe({materials:[{id:"99999",count:2}]}),null);
 assert.equal(componentRequirementForRecipe({materials:[{id:"528",count:0}]}),null);
 assert.equal(componentRequirementForRecipe({materials:[{id:"602",count:50}]}),null);
 assert.equal(componentRequirementForRecipe(null),null);
 for(const parts of [
  Array.from({length:3},()=>gear("528")),
  [gear("528"),gear("528"),gear("528"),{...gear("528"),recipeStatus:"needs-review"}],
  [gear("528"),gear("528"),gear("528"),{...gear("528"),status:"incomplete"}],
  [gear("528"),gear("528"),gear("528"),{...gear("528"),level:null}]
 ])assert.equal(evaluateBuildAvailability(
   mockedRequirements(parts,{storyUnlock:"Prose"}),select()
 ).status,"unverified");
 const preview=mockedRequirements(Array.from({length:4},()=>gear("528")),
   {storyUnlock:"Prose",preview:true});
 assert.equal(evaluateBuildAvailability(preview,select()).status,"unverified");
 assert.equal(evaluateBuildAvailability(mockedRequirements(
   Array.from({length:4},()=>gear("528"))),
   {level:70,factoryComponent:"maximal",storyProgress:ownedProgress(["528"])}).status,"unverified");
});
test("original 258 official Gear recipes stay verified; new review recipes never grant unlocks",()=>{
 const snapshot=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
 assert.ok(snapshot.gear.length===258||snapshot.gear.length===276);
 const totals={starter:0};
 for(const row of snapshot.gear){
   const tier=componentRequirementForRecipe(row.standardRecipe);
   assert.ok(tier,"Unmapped official recipe: "+row.id+" "+row.name);
   assert.equal(row.recipeStatus,"verified");
   totals[tier]=(totals[tier]||0)+1;
 }
 assert.equal(totals.starter,4);
 for(const tier of FACTORY_STAGES)assert.ok(totals[tier]>0,"Missing component tier "+tier);
});

test("a four-piece build requires exactly one armor, gloves and two kits",()=>{
 const set=["Armor","Gloves","Kit","Kit"].map((slot,i)=>({
   ...gear("528",70,String(i+200)),gearSlot:slot
 }));
 assert.equal(hasValidBuildSlots(set),true);
 assert.equal(hasValidBuildSlots([set[0],set[0],set[2],set[3]]),false);
 assert.equal(hasValidBuildSlots([set[0],set[1],set[1],set[3]]),false);
 assert.equal(hasValidBuildSlots([set[0],set[1],set[2]]),false);
 assert.equal(getBuildRequirements([set[0],set[0],set[2],set[3]]).allPartsVerified,false);
 assert.equal(getBuildRequirements(set).allPartsVerified,true);
});

test("two copies of the same kit are valid but only one owned blueprint is needed",()=>{
 const rows=[
  {...gear("528",70,"201"),gearSlot:"Armor"},
  {...gear("528",70,"202"),gearSlot:"Gloves"},
  {...gear("528",70,"203"),gearSlot:"Kit"},
  {...gear("528",70,"203"),gearSlot:"Kit"}
 ];
 const req=getBuildRequirements(rows);
 assert.equal(req.allPartsVerified,true);
 assert.equal(evaluateBuildAvailability(req,select("xiranite",70,
  ownedProgress(["201","202","203"]))).status,"available");
});
