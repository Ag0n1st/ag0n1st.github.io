#!/usr/bin/env node
/**
 * Reclassify historic gear WITH official Stats and WITHOUT Artificing as valid.
 * No network, no invented effects, no editing personal guide opinions.
 */
import {readFile,writeFile} from "node:fs/promises";
const path="src/data/endfield/catalog/equipment-details.json";
const data=JSON.parse(await readFile(path,"utf8"));
if(data.weapons.length!==84||data.gear.length!==258)throw Error("Unexpected SKPORT catalogue coverage");
const failures=[];
for(const gear of data.gear){
  const hasStats=gear.stats?.some(t=>t.tables?.some(v=>v.rows?.length));
  const hasArtificing=gear.artificing?.some(t=>t.tables?.some(v=>v.rows?.length));
  gear.status=hasStats?"verified":"incomplete";
  gear.artificingStatus=hasArtificing?"available":"not-listed";
  if(!hasStats)failures.push({id:gear.id,name:gear.name});
}
data.coverage.verified=[...data.weapons,...data.gear].filter(x=>x.status==="verified").length;
data.coverage.incomplete=[...data.weapons,...data.gear].filter(x=>x.status!=="verified").length;
data.review=[
  ...data.weapons.filter(x=>x.status!=="verified").map(x=>({id:x.id,name:x.name,reason:"wiki-detail-unavailable"})),
  ...failures.map(x=>({...x,reason:"gear-stats-unavailable"})),
  ...data.gear.filter(x=>x.recipeStatus==="needs-review").map(x=>({id:x.id,name:x.name,reason:"official-recipe-needs-review"}))
];
if(data.coverage.incomplete!==4||data.coverage.verified!==338||
  data.coverage.standardRecipesVerified<250||data.coverage.recipeNeedsReview>6)
  throw Error("Official data coverage differs from reviewed source");
console.log("OFFICIAL_FINAL_AUDIT",JSON.stringify({
  verified:data.coverage.verified,unavailable:data.coverage.incomplete,
  recipesVerified:data.coverage.standardRecipesVerified,
  needsReview:data.gear.filter(x=>x.recipeStatus==="needs-review").map(x=>({id:x.id,name:x.name})),
  noRecipe:data.gear.filter(x=>x.recipeStatus==="not-listed").map(x=>({id:x.id,name:x.name})),
  snapshotDate:data.source.snapshot
}));
await writeFile(path,JSON.stringify(data,null,2)+"\n");
