#!/usr/bin/env node
/** Apply all 18 source-verified recipe references; never touch stats or builds. */
import {readFileSync,writeFileSync} from "node:fs";
const load=p=>JSON.parse(readFileSync(p,"utf8"));
const root="src/data/endfield/catalog/";
const evidence=load(root+"v16-structured-recipes.json");
const details=load(root+"equipment-details.json");
const report=load(root+"v16-skport-import.json");
const official=load(root+"items.json");
const known=new Set(official.items.map(item=>String(item.id)));
const ids=Array.from({length:18},(_,i)=>String(1380+i));
if(evidence.provider!=="SKPORT Wiki"||evidence.schemaVersion!==1||
   !new RegExp("^20[0-9]{2}-[0-9]{2}-[0-9]{2}$").test(evidence.snapshot) ||
   evidence.recipes?.length!==18||report.entries?.length!==18 ||
   details.gear?.length!==276)throw Error("Unexpected official baseline");
const recipeMap=new Map(evidence.recipes.map(row=>[String(row.id),row]));
if(recipeMap.size!==18||ids.some(id=>!recipeMap.has(id)))throw Error("Incomplete/duplicate recipe evidence");
const gearMap=new Map(details.gear.map(row=>[String(row.id),row]));
const reportMap=new Map(report.entries.map(row=>[String(row.id),row]));
const materialsMap=new Map();
for(const id of ids){
 const record=recipeMap.get(id),gear=gearMap.get(id),entry=reportMap.get(id);
 if(!gear||!entry||gear.name!==entry.name||!record.sourceItemUrl?.endsWith("gameEntryId="+id) ||
   gear.source?.itemId!==id||gear.source?.provider!=="SKPORT Wiki"||
   gear.kind!=="gear"||entry.artificingStatus!==gear.artificingStatus)
   throw Error("Official v1.6 identity mismatch "+id);
 const materials=record.materials;
 if(!Array.isArray(materials)||materials.length<2||materials.length>8 ||
   new Set(materials.map(m=>m.id)).size!==materials.length ||
   materials.some(m=>!known.has(m.id)||!Number.isSafeInteger(m.count)||m.count<1))
   throw Error("Invalid official recipe materials "+id);
 if(gear.standardRecipe && JSON.stringify(gear.standardRecipe.materials)!==JSON.stringify(materials))
   throw Error("New source contradicts earlier verified recipe "+id);
 materialsMap.set(id,materials);
}
for(const id of ids){
 const gear=gearMap.get(id),entry=reportMap.get(id);
 gear.standardRecipe={id:"official-standard",materials:materialsMap.get(id),source:"SKPORT Wiki / Source"};
 gear.recipeStatus="verified";
 gear.recipeVerifiedAt=evidence.snapshot;
 entry.recipeStatus="verified";
}
details.coverage.standardRecipesVerified=details.gear.filter(x=>x.recipeStatus==="verified").length;
details.coverage.recipeNeedsReview=details.gear.filter(x=>x.recipeStatus==="needs-review").length;
details.coverage.recipesNotListed=details.gear.filter(x=>x.recipeStatus==="not-listed").length;
report.recipeVerification={snapshot:evidence.snapshot,provider:evidence.provider,
  evidenceFile:"src/data/endfield/catalog/v16-structured-recipes.json",
  method:"public Source widget material entry IDs and quantities",
  verified:18,needsReview:0};
writeFileSync(root+"equipment-details.json",JSON.stringify(details,null,2)+"\n");
writeFileSync(root+"v16-skport-import.json",JSON.stringify(report,null,2)+"\n");
console.log("V16_RECIPE_APPLY_COMPLETE",JSON.stringify({count:18,coverage:details.coverage,
 sample:ids.map(id=>({id,materials:materialsMap.get(id)}))}));
