import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FACTORY_COMPONENT_STAGES,DEFAULT_FACTORY_COMPONENT,FACTORY_STAGES,
  componentRequirementForRecipe,getBuildRequirements,evaluateBuildAvailability
} from "../../src/lib/endfield/buildFinder.mjs";
const standard=id=>({materials:[{id:"602",count:8000},{id,count:50}]});
const gear=(id,level=70)=>({status:"verified",level,recipeStatus:"verified",standardRecipe:standard(id)});
const select=(factoryComponent="pyrrolite",level=70)=>({factoryComponent,level});

test("the seven ordered components use official Wiki item IDs and user-defined level ranges",()=>{
  assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.itemId),["525","526","527","528","747","844","1067"]);
  assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.levels),[[20,28],[36],[50],[60,70],[70],[70],[70]]);
  assert.deepEqual(FACTORY_COMPONENT_STAGES.map(x=>x.phase),
    ["Early-Game","Early-Game","Early-Game","Mid-Game","Mid-Game","End-Game","End-Game"]);
  assert.equal(DEFAULT_FACTORY_COMPONENT,"pyrrolite");
});
test("compute a build's highest official component and level across four pieces",()=>{
  const req=getBuildRequirements([gear("525",20),gear("528",60),gear("747"),gear("1067")],
    {storyUnlock:"Confirmed story prerequisite"});
  assert.equal(req.requiredLevel,70);
  assert.equal(req.requiredComponent,"pyrrolite");
  assert.equal(evaluateBuildAvailability(req,select("hetonite")).status,"component-locked");
  assert.equal(evaluateBuildAvailability(req,select()).status,"available");
  assert.equal(evaluateBuildAvailability(req,select("pyrrolite",60)).status,"level-locked");
});
test("Cuprium, Hetonite and Pyrrolite stay distinct even at the same gear level",()=>{
  assert.deepEqual(["747","844","1067"].map(id=>getBuildRequirements(
    Array.from({length:4},()=>gear(id)),{storyUnlock:"Checked"}
  ).requiredComponent),["cuprium","hetonite","pyrrolite"]);
});
test("four official Basic Lv10 recipes fit below the first Amethyst level",()=>{
  const basic={status:"verified",level:10,recipeStatus:"verified",
    standardRecipe:{materials:[{id:"493",count:10},{id:"475",count:2}]}};
  const req=getBuildRequirements(Array.from({length:4},()=>basic),{storyUnlock:"Checked"});
  assert.equal(req.requiredComponent,"starter");
  assert.equal(evaluateBuildAvailability(req,select("amethyst",20)).status,"available");
});
test("unknown/missing recipes and story requirements never create an available build",()=>{
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
    getBuildRequirements(parts,{storyUnlock:"Checked"}),select()
  ).status,"unverified");
  const noStory=getBuildRequirements(Array.from({length:4},()=>gear("528")));
  assert.equal(evaluateBuildAvailability(noStory,select()).status,"story-unverified");
  const preview=getBuildRequirements(Array.from({length:4},()=>gear("528")),
    {storyUnlock:"Checked",preview:true});
  assert.equal(evaluateBuildAvailability(preview,select()).status,"unverified");
  assert.equal(evaluateBuildAvailability(getBuildRequirements(
    Array.from({length:4},()=>gear("528")),{storyUnlock:"Checked"}
  ),{level:70,factoryComponent:"maximal"}).status,"unverified");
});
test("all official 258 gear recipes map to an approved component or starter recipe",()=>{
  const snapshot=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
  assert.equal(snapshot.gear.length,258);
  const totals={starter:0};
  for(const row of snapshot.gear){
    const tier=componentRequirementForRecipe(row.standardRecipe);
    assert.ok(tier,"Unmapped official recipe: "+row.id+" "+row.name);
    assert.equal(row.recipeStatus,"verified");
    totals[tier]=(totals[tier]||0)+1;
  }
  assert.equal(totals.starter,4);
  for(const tier of FACTORY_STAGES)assert.ok(totals[tier]>0,"No recipe at component tier "+tier);
});
