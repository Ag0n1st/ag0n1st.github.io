#!/usr/bin/env node
/**
 * Retry 4 low-level SKPORT gear details for which the CDN item name was late.
 * No invented values: must read a genuine name/count pair in official Source.
 */
import {chromium} from "playwright-core";
import {readFile,writeFile} from "node:fs/promises";
import {standardRecipe,extractRenderedGearSource,officialBlueprintAcquisition} from "./equipment-normalize.mjs";
const path="src/data/endfield/catalog/equipment-details.json";
const source=JSON.parse(await readFile(path,"utf8"));
const catalog=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8")).items
 .map(x=>({id:x.id,name:x.name}));
const ids=["206","208","211","213"];
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try {
 const page=await browser.newPage({locale:"en-US"});
 for(const id of ids){
   const gear=source.gear.find(x=>x.id===id);
   if(!gear)throw Error("Expected official basic gear "+id);
   let parsed=null,panel="";
   for(let attempt=1;attempt<=3;attempt++){
     const response=await page.goto(
       "https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id,
       {waitUntil:"domcontentloaded",timeout:45000});
     if(response?.status()!==200)throw Error("Official Wiki HTTP "+response?.status());
     // In early-gear detail pages, two icon captions often resolve separately.
     await page.waitForTimeout(4700);
     panel=extractRenderedGearSource(await page.locator("body").innerText());
     parsed=standardRecipe(panel,catalog);
     if(parsed)break;
     console.log("BASIC_RECIPE_RETRY",id,attempt,
       panel.split("\n").map(s=>s.trim()).filter(Boolean).slice(0,12));
   }
   if(!parsed)throw Error("Missing verifiable official standard recipe for "+gear.name);
   gear.standardRecipe=parsed;
   gear.recipeStatus="verified";
   gear.acquisitionNotes=officialBlueprintAcquisition(panel);
   console.log("VERIFIED_BASIC_RECIPE",JSON.stringify({id,name:gear.name,materials:parsed.materials}));
 }
}finally{await browser.close();}
source.coverage.standardRecipesVerified=source.gear.filter(x=>x.recipeStatus==="verified").length;
source.coverage.recipeNeedsReview=source.gear.filter(x=>x.recipeStatus==="needs-review").length;
source.coverage.recipesNotListed=source.gear.filter(x=>x.recipeStatus==="not-listed").length;
source.review=source.review.filter(x=>x.reason!=="official-recipe-needs-review");
if(source.coverage.standardRecipesVerified!==258||source.coverage.recipeNeedsReview!==0||
  source.coverage.recipesNotListed!==0)throw Error("Expected every official basic gear recipe to be verified");
await writeFile(path,JSON.stringify(source,null,2)+"\n");
console.log("ALL_OFFICIAL_GEAR_RECIPES_VERIFIED",source.coverage.standardRecipesVerified);
