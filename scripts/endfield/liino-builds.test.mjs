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
 assert.match(guide,/zweiten Ember/);
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
