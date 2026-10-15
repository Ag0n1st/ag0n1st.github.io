#!/usr/bin/env node
import {readFileSync,writeFileSync} from "node:fs";
import {compilePreciseGearEvidence} from "../../src/lib/endfield/preciseBlueprints.mjs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const docs=read("src/data/endfield/catalog/equipment-details.json").gear;
const hub=read("src/data/endfield/progression/gear-piece-acquisition-sources.json");
const wiki=read("src/data/endfield/progression/blueprint-wiki-crate-contents.json");
const community=read("src/data/endfield/progression/blueprint-community-claims.json");
const result=compilePreciseGearEvidence(docs,hub,wiki,community);
if(result.coverage.total!==258||result.coverage.officialCrateGear!==125||
  result.coverage.withLogicalCrate<70)
  throw Error("Official coverage did not meet reviewed precision criteria "+JSON.stringify(result.coverage));
const out="src/data/endfield/progression/blueprint-precise-gear-index.json";
writeFileSync(out,JSON.stringify(result,null,2)+"\n");
console.log("PRECISE_BLUEPRINT_COVERAGE",JSON.stringify({
  coverage:result.coverage,
  conflicted:result.entries.filter(x=>x.status==="source-conflict").map(x=>({
    id:x.gearId,name:x.name,conflicts:x.conflictingEvidence,
    wikiCrates:x.wikiItemLinks.map(w=>w.claimId),hubCrate:x.hubItemLink?.claimId
  })),
  examples:result.entries.filter(x=>x.status==="two-source-exact-piece").slice(0,14)
    .map(x=>({id:x.gearId,name:x.name,crate:x.exactLogicalCrateId}))}));
