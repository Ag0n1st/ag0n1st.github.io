import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {compilePreciseGearEvidence,matchHubLandmarkToLogicalCrate}
  from "../../src/lib/endfield/preciseBlueprints.mjs";
const r=p=>JSON.parse(readFileSync(p,"utf8"));
const gear=r("src/data/endfield/catalog/equipment-details.json").gear;
const hub=r("src/data/endfield/progression/gear-piece-acquisition-sources.json");
const wiki=r("src/data/endfield/progression/blueprint-wiki-crate-contents.json");
const claims=r("src/data/endfield/progression/blueprint-community-claims.json");
const saved=r("src/data/endfield/progression/blueprint-precise-gear-index.json");
test("24 community crates list individual linked Gear IDs, with no fabricated official SKPORT marker",()=>{
 assert.equal(wiki.crates.length,24);
 assert.equal(wiki.coverage.links,113);
 assert.equal(wiki.coverage.uniqueGearIds,112);
 assert.equal(wiki.coverage.unresolvedNames,0);
 assert.equal(wiki.coverage.duplicatedGearIds,1);
 assert.equal(wiki.coverage.officialAcquisitionConflicts,3);
 assert.ok(wiki.pieceLinks.every(x=>x.officialMarkerId===null));
});
test("reconciled individual crate assignments are deterministic and never grant unlocks",()=>{
 assert.deepEqual(saved,compilePreciseGearEvidence(gear,hub,wiki,claims));
 assert.equal(saved.coverage.total,258);
 assert.equal(saved.coverage.officialCrateGear,125);
 assert.ok(saved.entries.every(x=>x.officialMarkerId===null));
 assert.ok(saved.entries.every(x=>x.unlockImplication==="none"));
 assert.ok(saved.entries.every(x=>x.blueprintOwned===false));
});
test("exact duplicates, source contradictions and inventory source conflicts stay exposed",()=>{
 const duplicate=saved.entries.find(x=>x.gearId==="271");
 assert.equal(duplicate.status,"source-conflict");
 assert.equal(duplicate.conflictingEvidence.includes("same-piece-in-several-wiki-crates"),true);
 const setOnly=saved.entries.filter(x=>x.exactLogicalCrateId!==null);
 assert.ok(setOnly.every(x=>x.officialAcquisitionKind==="template-crate"));
 assert.ok(setOnly.every(x=>x.status==="wiki-exact-piece"||
   x.status==="two-source-exact-piece"||x.status==="hub-exact-piece"));
});
test("secondary item source matches a SINGLE landmark, not a whole gear set",()=>{
 assert.equal(matchHubLandmarkToLogicalCrate({
   areaId:"wuling-city",landmark:"Monitoring Center"}),"wuling-city-4");
 assert.equal(matchHubLandmarkToLogicalCrate({
   areaId:"qingbo-stockade",landmark:"Main Fort"}),"qingbo-stockade-1");
 assert.equal(matchHubLandmarkToLogicalCrate({
   areaId:"yinglung-pass",landmark:"unverified"}),null);
});
test("new version's crates without explicit sources remain unresolved",()=>{
 const areas=claims.claims.filter(x=>x.areaId==="sis-painting");
 assert.equal(areas.length,2);
 assert.ok(!wiki.crates.some(x=>x.areaId==="sis-painting"));
});
