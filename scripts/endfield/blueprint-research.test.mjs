import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createBlueprintResearchIndex,validateCommunityClaims,
  matchCommunityClaimToGear,findBlueprintCandidates} from "../../src/lib/endfield/blueprintResearch.mjs";
const r=p=>JSON.parse(readFileSync(p,"utf8"));
const research=r("src/data/endfield/progression/blueprint-community-claims.json");
const areas=r("src/data/endfield/progression/story-areas.json");
const map=r("src/data/endfield/progression/gear-template-crates.json");
const gear=r("src/data/endfield/catalog/equipment-details.json").gear;
const saved=r("src/data/endfield/progression/blueprint-research-index.json");
test("all 27 sourced claims retain unknown exact marker IDs",()=>{
 assert.equal(validateCommunityClaims(research,areas,map),true);
 assert.equal(saved.coverage.totalClaims,27);
 assert.equal(saved.coverage.rewardClaims,15);
 assert.ok(saved.claims.every(x=>x.exactMarkerId===null&&x.possibleMarkerIds.length>0));
});
test("full official gear index is deterministic and recommendations stay provisional",()=>{
 assert.deepEqual(saved,createBlueprintResearchIndex(research,areas,map,gear));
 assert.equal(saved.coverage.gear,258);
 assert.ok(saved.gearHints.every(x=>x.verifiedCrateMarkerId===null&&x.manualReviewNeeded));
 assert.ok(saved.gearHints.every(x=>x.candidateLinks.every(y=>y.verified===false)));
});
test("a set clue never overrides an official non-crate acquisition kind",()=>{
 const claim=research.claims.find(x=>x.id==="wuling-city-6");
 const g={id:"99",name:"Pulser Labs Gloves",setName:"Pulser Labs",
   acquisitionNotes:["Game progress reaches the [Wuling] region"]};
 assert.equal(matchCommunityClaimToGear(claim,g),null);
 g.acquisitionNotes=["Gear Template Crate"];
 assert.equal(matchCommunityClaimToGear(claim,g)?.kind,"set-family");
});
test("official map crate contents stay unverified even with community candidates",()=>{
 assert.equal(areas.blueprintAreaLinks.length,0);
 assert.ok(map.markers.every(x=>x.containedGearIds.length===0));
 const candidate=saved.gearHints.find(g=>g.candidateLinks.length);
 if(candidate)assert.equal(findBlueprintCandidates(saved,candidate.gearId).status.startsWith("community")||
   findBlueprintCandidates(saved,candidate.gearId).status.startsWith("ambiguous"),true);
});
