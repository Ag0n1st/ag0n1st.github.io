import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {getOperatorImportCoverage} from "./operator-import-coverage.mjs";

const readJson=path=>JSON.parse(readFileSync(path,"utf8"));
const roster=readJson("src/data/endfield/endfieldle-roster.json");
const report=readJson("src/data/endfield/catalog/operator-public-import-report.json");
const artwork=readJson("src/data/endfield/catalog/operator-official-artwork.json");
const artworkBySlug=new Map(artwork.items.map(entry=>[entry.slug,entry]));
const officialTypes=[
 "skport-cover","skport-illustration","skport-skill-basic",
 "skport-skill-battle","skport-skill-combo","skport-skill-ultimate"
];

test("current 34-identity roster, official 33-profile import report and source coverage agree",()=>{
 const coverage=getOperatorImportCoverage();
 assert.equal(roster.operators.length,34);
 assert.equal(coverage.total,34);
 assert.equal(coverage.skportCaptured,33);
 assert.equal(coverage.skportFull,32);
 assert.equal(coverage.skportPartial,1);
 assert.deepEqual(coverage.missingSkport,["argent-flow"]);
 assert.deepEqual(coverage.pendingDisclosure,["endministrator"]);
 assert.deepEqual(report.priorOfficialImports.slice().sort(),["liino","si","typhoeus"].sort());
 assert.equal(report.newOfficialCaptures,30);
 assert.equal(report.currentOfficialCaptures,33);
 assert.equal(report.catalogueOperators,34);
 assert.equal(report.newOptimizedWebPs,183);
 assert.equal(report.results.length,30);
 assert.equal(new Set(report.results.map(row=>row.slug)).size,30);
 assert.deepEqual(report.results.map(row=>row.slug).sort(),
  coverage.rows.filter(row=>row.skportCaptured&&!report.priorOfficialImports.includes(row.id)).map(row=>row.id).sort());
 assert.ok(report.results.every(row=>row.status==="imported"),"Only confirmed captures belong in the report");
});

test("every published SKPORT profile is paired with its official record and local image manifest",()=>{
 const captured=getOperatorImportCoverage().rows.filter(row=>row.skportCaptured);
 for(const row of captured){
  const base="src/data/endfield/operators/"+row.id;
  const main=readJson(base+".json"),extra=readJson(base+".extra.json");
  assert.equal(main.source.provider,"SKPORT Wiki",row.id+" main source");
  assert.equal(extra.source.provider,"SKPORT Wiki",row.id+" extra source");
  assert.equal(String(main.source.itemId),row.itemId,row.id+" main item ID");
  assert.equal(String(extra.source.itemId),row.itemId,row.id+" extra item ID");
  assert.equal(String(main.operator.id),row.itemId,row.id+" operator ID");
  assert.equal(main.skills.length,4,row.id+" four skill slots");
  assert.equal(main.ranks.length,12,row.id+" twelve ranks");
  assert.equal(extra.potentials.length,5,row.id+" five documented potential entries");

  const op=roster.operators.find(value=>value.id===row.id);
  const manifestKey=row.id==="endministrator"?"endministrator-2":row.id;
  const item=artworkBySlug.get(manifestKey);
  assert.ok(item,row.id+" missing manifest entry");
  for(const type of officialTypes){
   const asset=item.assets[type];
   assert.ok(asset?.path,row.id+" missing "+type+" path");
   assert.equal(asset.sourceRecord,base+".json",row.id+" source attribution for "+type);
   assert.ok(existsSync("public"+asset.path),row.id+" missing local "+type);
  }
  assert.equal(op.assets.cover,item.assets["skport-cover"].path,row.id+" cover mismatch");
  assert.equal(op.assets.splash,item.assets["skport-illustration"].path,row.id+" illustration mismatch");
 }
 assert.equal(captured.length,33);
});

test("unreleased operator and undisclosed official values remain explicitly unknown",()=>{
 const argent=roster.operators.find(row=>row.id==="argent-flow");
 assert.equal(argent.availableFrom,"2026-11-05");
 assert.equal(argent.assets.cover,undefined);
 assert.equal(argent.assets.splash,undefined);
 assert.equal(existsSync("src/data/endfield/operators/argent-flow.json"),false);
 assert.equal(existsSync("src/data/endfield/operators/argent-flow.extra.json"),false);
 const end=readJson("src/data/endfield/operators/endministrator.extra.json");
 assert.deepEqual(end.potentials.slice(3).map(row=>row.status),["undisclosed","undisclosed"]);
 assert.deepEqual(end.potentials.slice(3).map(row=>row.effect),["",""]);
 const arcane=readJson("src/data/endfield/operators/arcane.json");
 assert.deepEqual(arcane.skillVariants.will.map(value=>value.slot),["battle","combo","ultimate"]);
 const asset=artworkBySlug.get("arcane").assets;
 for(const slot of ["battle","combo","ultimate"]){
  const variant=asset["skport-skill-"+slot+"-will"];
  assert.ok(variant?.path&&existsSync("public"+variant.path),"Arcane "+slot+" WILL asset missing");
  assert.notEqual(variant.path,asset["skport-skill-"+slot].path,"Distinct Arcane WILL icon expected");
 }
});

test("roster notes correctly distinguish official profile coverage from curated trivia provenance",()=>{
 assert.match(roster.notes,/33\/34/);
 assert.match(roster.notes,/30 additional/);
 assert.match(roster.notes,/sourceQuality/);
 assert.doesNotMatch(roster.notes,/Three complete SKPORT imports are authoritative/);
 assert.doesNotMatch(roster.notes,/only for Liino, Typhoeus and Si/);
 assert.doesNotMatch(roster.notes,/until signed SKPORT/);
});
