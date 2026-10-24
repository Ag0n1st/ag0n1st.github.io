import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import index from "../../src/data/endfield/catalog/operator-combat-reference.json" with {type:"json"};
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import {batchCandidates} from "./import-operator-batch.mjs";
import {getOperatorImportCoverage} from "./operator-import-coverage.mjs";
test("source-labelled combat reference covers exactly 30 known distinct operators",()=>{
 assert.equal(index.schemaVersion,1);
 assert.equal(index.coverage.roster,34);
 assert.equal(index.coverage.withCombatNames,30);
 assert.equal(index.coverage.withBaseSkills,29);
 assert.deepEqual(index.coverage.missingCombat,["typhoeus","purrchena","si","argent-flow"]);
 const slugs=new Set(roster.operators.map(x=>x.id));
 const seen=new Set();
 for(const op of index.operators){
  assert.ok(slugs.has(op.id),"extra source row "+op.id);
  assert.ok(!seen.has(op.id),"duplicate source row "+op.id);seen.add(op.id);
  const variants=op.variants?Object.values(op.variants):[op.skills];
  assert.ok(variants.length>=1);
  for(const skills of variants){
    assert.deepEqual(Object.keys(skills),["basic","battle","combo","ultimate"]);
    for(const value of Object.values(skills)){
      assert.ok(value.name.trim(),"blank skill name for "+op.id);
      assert.equal(value.description,undefined,"long third-party prose is not copied");
      for(const kind of ["inTriggers","outTriggers"])
       if(value[kind])assert.ok(value[kind].every(x=>typeof x==="string"&&x.length));
    }
  }
 }
 assert.equal(seen.size,30);
 assert.deepEqual(Object.keys(index.operators.find(x=>x.id==="arcane").variants),["intellect","will"]);
 assert.match(index.source.provenance,/not SKPORT official item\/info/);
});
test("base skill tiers are numeric reference data with truthful provenance",()=>{
 for(const row of index.operators){
  for(const bs of row.baseSkills??[]){
   assert.ok(bs.name&&bs.room);
   assert.ok(bs.tierValues.every(x=>Number.isFinite(x)));
   assert.equal(bs.texts,undefined,"third-party description not duplicated");
  }
 }
});
test("official full-import coverage is kept separate; 31 still missing",()=>{
 const c=getOperatorImportCoverage();
 assert.equal(c.total,34);assert.equal(c.skportFull,3);
 assert.equal(c.communityCombatNames,30);assert.equal(c.communityBaseSkills,29);
 assert.equal(c.missingSkport.length,31);
 assert.equal(c.rows.filter(x=>x.hasIcon&&x.hasPortrait).length,34);
 assert.equal(c.rows.filter(x=>x.hasBanner).length,33);
 assert.equal(c.rows.filter(x=>x.hasSplash).length,3);
 for(const slug of ["si","typhoeus","liino"])
  assert.ok(c.rows.find(x=>x.id===slug)?.skportFull);
 for(const slug of c.missingSkport)
  assert.ok(!existsSync("src/data/endfield/operators/"+slug+".extra.json"));
});
test("batch import only maps public IDs, filters unreleased, never overwrites source",()=>{
 const all=roster.operators;
 const captures=["1279.json","615.json","1041.json","not-an-operator.txt"];
 const before=batchCandidates(all,captures,"2026-10-24");
 assert.deepEqual(before.map(x=>x.slug),["rossi","liino"]);
 const after=batchCandidates(all,captures,"2026-11-06");
 assert.deepEqual(after.map(x=>x.slug),["rossi","liino","argent-flow"]);
 const src=readFileSync("scripts/endfield/import-operator-batch.mjs","utf8");
 for(const part of ["importOperator(data,itemIndex","--dry-run","flag:\"wx\"","Refusing to overwrite",
                   "All captured sources validated in-memory","Secret/header field detected"])
   assert.ok(src.includes(part),part);
});
