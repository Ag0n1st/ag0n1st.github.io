import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync,statSync} from "node:fs";
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import manifest from "../../src/data/endfield/catalog/operator-official-artwork.json" with {type:"json"};
import report from "../../src/data/endfield/catalog/operator-public-import-report.json" with {type:"json"};

const json=path=>JSON.parse(readFileSync(path,"utf8"));
const fresh=roster.operators.filter(x=>x.id!=="argent-flow");
const source=slug=>"src/data/endfield/operators/"+slug;
const asset=path=>"public"+path;
test("33 SKPORT item/info capture pairs, preserving release gate on Argent Flow",()=>{
 assert.equal(roster.operators.length,34);
 assert.equal(fresh.length,33);
 for(const op of fresh){
  const main=json(source(op.id)+".json"),extra=json(source(op.id)+".extra.json");
  assert.equal(main.source.provider,"SKPORT Wiki",op.id);
  assert.equal(extra.source.provider,"SKPORT Wiki",op.id);
  assert.equal(main.operator.id,op.itemId,op.id);
  assert.equal(main.operator.slug,op.id,op.id);
  assert.equal(extra.operator,op.id,op.id);
  assert.deepEqual(main.skills.map(x=>x.slot),["basic","battle","combo","ultimate"],op.id);
  assert.ok(main.skills.every(x=>x.upgradeCosts.length===12),op.id);
  assert.ok(Array.isArray(extra.talents)&&extra.talents.length>0,op.id);
  assert.ok(Array.isArray(extra.promotions)&&extra.promotions.length>0,op.id);
  assert.equal(extra.potentials.length,5,op.id);
  assert.ok(Object.keys(extra.materials).length>0,op.id);
  if(op.id!=="endministrator")
    assert.ok(extra.potentials.every(x=>x.name&&x.effect?.trim()),op.id);
 }
 assert.equal(roster.operators.find(x=>x.id==="argent-flow").availableFrom,"2026-11-05");
 assert.ok(!existsSync(source("argent-flow")+".json"));
});
test("Endministrator undisclosed potentials are not inferred; Arcane preserves both official spell arrays",()=>{
 const endmin=json(source("endministrator")+".extra.json");
 assert.deepEqual(endmin.potentials.slice(3).map(x=>[x.name,x.effect,x.status]),
   [["???","","undisclosed"],["???","","undisclosed"]]);
 const arcane=json(source("arcane")+".json");
 assert.equal(arcane.skills.length,4);
 assert.deepEqual(arcane.skillVariants.will.map(x=>x.slot),["battle","combo","ultimate"]);
 assert.ok(arcane.skillVariants.will.every(x=>x.upgradeCosts.length===12));
});
test("33 real public SKPORT illustrations and covers registered in the same official art manifest",()=>{
 let refs=0;
 for(const op of fresh){
  const official=manifest.items.find(x=>x.slug===op.id)||(op.id==="endministrator"
    ?manifest.items.find(x=>x.slug==="endministrator-2"):null);
  assert.ok(official,op.id);
  for(const [key,expected] of [["cover","cover.webp"],["splash","illustration.webp"]]){
   const url="/images/endfield/operators/"+op.id+"/"+expected;
   assert.equal(op.assets[key],url,op.id);
   const stats=statSync(asset(url));
   const original=["liino","typhoeus","si"].includes(op.id);
   assert.ok(stats.size>100&&stats.size<(original?1_000_000:600000),op.id+":"+key);
  }
  for(const key of ["skport-cover","skport-illustration",
    "skport-skill-basic","skport-skill-battle","skport-skill-combo","skport-skill-ultimate"]){
    const record=official.assets[key];
    assert.ok(record,op.id+":"+key);
    assert.equal(record.status,"cached");
    assert.ok(record.sourcePage?.includes("wiki.skport.com/endfield/detail"));
    assert.ok(record.sourceRecord?.endsWith(op.id+".json"));
    assert.ok(existsSync(asset(record.path)),record.path);
    assert.equal(statSync(asset(record.path)).size,record.bytes);
    refs++;
  }
 }
 assert.equal(refs,198);
 const arcane=manifest.items.find(x=>x.slug==="arcane");
 for(const slot of ["battle","combo","ultimate"]){
  const record=arcane.assets["skport-skill-"+slot+"-will"];
  assert.ok(record,"Arcane WILL icon "+slot);
  assert.equal(record.status,"cached");
  assert.equal(record.sourceField,"skillVariants.will."+slot+".iconUrl");
  assert.ok(existsSync(asset(record.path)));
  assert.ok(statSync(asset(record.path)).size>100);
 }
});
test("consolidated public import report is complete, additive and independently reproducible",()=>{
 assert.equal(report.provider,"SKPORT Wiki");
 assert.equal(report.catalogueOperators,34);
 assert.deepEqual(report.priorOfficialImports.sort(),["liino","si","typhoeus"]);
 assert.equal(report.newOfficialCaptures,30);
 assert.equal(report.currentOfficialCaptures,33);
 assert.equal(report.results.length,30);
 assert.equal(new Set(report.results.map(x=>x.slug)).size,30);
 assert.equal(report.results.flatMap(x=>x.images).filter(x=>x.status==="saved").length,180);
 assert.deepEqual(report.runHistory.map(x=>[x.imported,x.attempted]),[[27,30],[3,3],[0,0]]);
 assert.equal(report.newOptimizedWebPs,183);
 assert.equal(report.additionalOfficialVariantAssets.length,3);
 assert.deepEqual(report.unreleasedNotImported.map(x=>x.slug),["argent-flow"]);
 assert.deepEqual(report.sourceLimitations.map(x=>x.slug),["endministrator"]);
 for(const x of report.results)assert.ok(!report.priorOfficialImports.includes(x.slug));
});
