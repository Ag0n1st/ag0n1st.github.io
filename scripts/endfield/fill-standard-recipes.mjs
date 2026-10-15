#!/usr/bin/env node
/**
 * Enrich the validated local SKPORT gear snapshot with ONLY the official
 * default crafting recipe and literal blueprint acquisition notes.
 * Public anonymous pages; no alternate community recipes.
 */
import {chromium} from "playwright-core";
import {readFile,writeFile} from "node:fs/promises";
import {extractRenderedGearSource,standardRecipe,officialBlueprintAcquisition} from "./equipment-normalize.mjs";
const path="src/data/endfield/catalog/equipment-details.json";
const snapshot=JSON.parse(await readFile(path,"utf8"));
const manifest=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8"));
const catalog=manifest.items.map(x=>({id:x.id,name:x.name}));
if(snapshot.gear.length!==258||snapshot.weapons.length!==84)throw Error("Expected complete approved SKPORT base snapshot");
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const context=await browser.newContext({locale:"en-US",viewport:{width:1350,height:900}});
let index=0;const failures=[],needsReview=[];
let good=0,noHeading=0;
async function worker(){
 const page=await context.newPage();
 try{
 while(index<snapshot.gear.length){
  const record=snapshot.gear[index++];
  try{
    const url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+record.id;
    const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
    if(res?.status()!==200)throw Error("Wiki page returned "+res?.status());
    // SKPORT displays counts before asynchronously resolving material names.
    // Wait for the FIRST official item name next to its quantity, not only heading.
    try {
      await page.waitForFunction(()=>{
        const text=document.body?.innerText??"";
        const st=text.indexOf("Each gear piece costs");
        if(st<0)return false;
        const lines=text.slice(st+"Each gear piece costs".length)
          .split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
        return lines.length>=2 && !lines[0].startsWith("*") &&
          !lines[0].startsWith("//") && /^\*\s*\d/.test(lines[1]);
      },{timeout:6500});
    } catch {/* Some official pages have no default recipe. */ }
    const text=await page.locator("body").innerText();
    const panel=extractRenderedGearSource(text);
    const parsed=standardRecipe(panel,catalog);
    record.acquisitionNotes=officialBlueprintAcquisition(panel);
    if(parsed){
      record.standardRecipe=parsed;
      record.recipeStatus="verified";
      good++;
    }else if(panel.includes("Each gear piece costs")){
      record.standardRecipe=null;
      record.recipeStatus="needs-review";
      needsReview.push({id:record.id,name:record.name});
    }else{
      record.standardRecipe=null;
      record.recipeStatus="not-listed";
      noHeading++;
    }
  }catch(err){
    failures.push({id:record.id,name:record.name,error:String(err).slice(0,200)});
  }
  const done=good+noHeading+needsReview.length+failures.length;
  if(done%40===0)console.log("RECIPE_PROGRESS",done+"/"+snapshot.gear.length,
    "verified",good,"needs-review",needsReview.length,"not-listed",noHeading,"errors",failures.length);
 }
 }finally{await page.close();}
}
try{await Promise.all(Array.from({length:4},()=>worker()));}
finally{await browser.close();}
if(failures.length)throw Error("Official wiki retrieval failed: "+JSON.stringify(failures.slice(0,7)));
snapshot.coverage.incomplete=[...snapshot.weapons,...snapshot.gear].filter(x=>x.status!=="verified").length;
snapshot.coverage.standardRecipesVerified=good;
snapshot.coverage.recipeNeedsReview=needsReview.length;
snapshot.coverage.recipesNotListed=noHeading;
snapshot.coverage.errors=0;
snapshot.review=[
 ...snapshot.weapons.filter(x=>x.status!=="verified").map(x=>({id:x.id,name:x.name,reason:"incomplete-weapon-wiki"})),
 ...snapshot.gear.filter(x=>x.status!=="verified").map(x=>({id:x.id,name:x.name,reason:"incomplete-gear-wiki"})),
 ...needsReview.map(x=>({...x,reason:"recipe-materials-not-resolved"}))
];
await writeFile(path,JSON.stringify(snapshot,null,2)+"\n");
console.log("OFFICIAL_RECIPES",JSON.stringify({gearItems:snapshot.gear.length,verified:good,
 notListed:noHeading,needsReview:needsReview.length,errors:failures.length,
 examples:snapshot.gear.filter(x=>x.standardRecipe).slice(0,6).map(x=>({id:x.id,name:x.name,materials:x.standardRecipe.materials})),
 coverage:snapshot.coverage}));
