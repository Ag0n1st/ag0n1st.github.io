#!/usr/bin/env node
import {readFileSync,writeFileSync} from "node:fs";
import {createBlueprintResearchIndex} from "../../src/lib/endfield/blueprintResearch.mjs";
const r=p=>JSON.parse(readFileSync(p,"utf8"));
const obj=createBlueprintResearchIndex(
  r("src/data/endfield/progression/blueprint-community-claims.json"),
  r("src/data/endfield/progression/story-areas.json"),
  r("src/data/endfield/progression/gear-template-crates.json"),
  r("src/data/endfield/catalog/equipment-details.json").gear);
writeFileSync("src/data/endfield/progression/blueprint-research-index.json",JSON.stringify(obj,null,2)+"\n");
const matches=obj.gearHints.filter(x=>x.candidateLinks.length);
const counts={};
for(const x of matches)for(const area of x.candidateAreas)counts[area]=(counts[area]??0)+1;
console.log("BLUEPRINT_RESEARCH_COVERAGE",JSON.stringify({coverage:obj.coverage,byArea:counts,
  matches:matches.slice(0,30).map(x=>({id:x.gearId,name:x.gearName,set:x.setName,areas:x.candidateAreas}))}));
