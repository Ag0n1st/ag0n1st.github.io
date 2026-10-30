import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>JSON.parse(readFileSync(path,"utf8"));
const root="src/data/endfield/catalog/";
const evidence=read(root+"v16-structured-recipes.json");
const report=read(root+"v16-skport-import.json");
const details=read(root+"equipment-details.json");
const items=read(root+"items.json");

test("all 18 v1.6 recipes are independently backed by official structured SKPORT Source entries",()=>{
 const ids=Array.from({length:18},(_,i)=>String(1380+i));
 const byRecipe=new Map(evidence.recipes.map(x=>[x.id,x]));
 const byDetail=new Map(details.gear.map(x=>[x.id,x]));
 const byReport=new Map(report.entries.map(x=>[x.id,x]));
 const known=new Map(items.items.map(x=>[x.id,x]));
 assert.equal(evidence.schemaVersion,1);
 assert.equal(evidence.provider,"SKPORT Wiki");
 assert.match(evidence.evidence,/anonymous public .*Source widget documentMap entry IDs and counts/);
 assert.match(evidence.snapshot,/^20\d{2}-\d{2}-\d{2}$/);
 assert.equal(evidence.recipes.length,18);
 assert.equal(byRecipe.size,18);
 assert.equal(byReport.size,18);
 assert.equal(details.gear.length,276);
 assert.equal(report.latestGearCount,276);
 assert.equal(report.count,18);
 for(const id of ids){
  const r=byRecipe.get(id),g=byDetail.get(id),e=byReport.get(id);
  assert.ok(r&&g&&e,"Missing official v1.6 ID "+id);
  assert.equal(g.name,e.name);
  assert.equal(g.source.itemId,id);
  assert.equal(g.source.provider,"SKPORT Wiki");
  assert.equal(g.kind,"gear");
  assert.equal(g.status,"verified");
  assert.equal(g.recipeStatus,"verified");
  assert.equal(e.recipeStatus,"verified");
  assert.equal(g.recipeVerifiedAt,evidence.snapshot);
  assert.equal(g.standardRecipe?.source,"SKPORT Wiki / Source");
  assert.equal(r.sourceItemUrl,"https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id);
  assert.deepEqual(g.standardRecipe.materials,r.materials);
  const expected=Number(id)<=1394
   ?[{id:"602",count:360},{id:"1067",count:50}]
   :[{id:"602",count:3000},{id:"528",count:20}];
  assert.deepEqual(r.materials,expected);
  assert.equal(g.level,Number(id)<=1394?70:60);
  assert.equal(new Set(r.materials.map(m=>m.id)).size,r.materials.length);
  for(const material of r.materials){
   assert.ok(known.has(material.id),"Official material missing "+material.id);
   assert.ok(Number.isSafeInteger(material.count)&&material.count>0);
  }
 }
 assert.equal(known.get("602").name,"Wuling Stock Bill");
 assert.equal(known.get("1067").name,"Pyrrolite Component");
 assert.equal(known.get("528").name,"Xiranite Component");
 assert.equal(known.get("411").name,"Type 50 Yinglung Gloves");
 assert.equal(known.get("1381").name,"Type 50 Yinglung Gloves");
 assert.notEqual(known.get("411").id,known.get("1381").id);
});

test("the v1.6 import report and normalized catalogue have no stale recipe review status",()=>{
 const statuses=Object.groupBy(report.entries,x=>x.recipeStatus);
 assert.equal(statuses.verified?.length,18);
 assert.equal(statuses["needs-review"]?.length??0,0);
 assert.deepEqual(report.recipeVerification,{
  snapshot:evidence.snapshot,provider:"SKPORT Wiki",
  evidenceFile:"src/data/endfield/catalog/v16-structured-recipes.json",
  method:"public Source widget material entry IDs and quantities",
  verified:18,needsReview:0
 });
 const gear=details.gear;
 assert.equal(details.coverage.gearCount,276);
 assert.equal(details.coverage.standardRecipesVerified,gear.filter(x=>x.recipeStatus==="verified").length);
 assert.equal(details.coverage.recipeNeedsReview,gear.filter(x=>x.recipeStatus==="needs-review").length);
 assert.equal(details.coverage.recipesNotListed,gear.filter(x=>x.recipeStatus==="not-listed").length);
 assert.equal(details.coverage.standardRecipesVerified,276);
 assert.equal(details.coverage.recipeNeedsReview,0);
 assert.equal(details.coverage.recipesNotListed,0);
 assert.ok(gear.every(x=>x.standardRecipe?.materials?.length>=2));
});
