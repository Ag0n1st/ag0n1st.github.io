#!/usr/bin/env node
/** Probe public community Wiki Gear table; no copying of images/media. */
import {chromium} from "playwright-core";
const browser=await chromium.launch({channel:"chrome",headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 const page=await browser.newPage({locale:"en-US"});
 for(const url of [
   "https://endfield.wiki.gg/wiki/Gear",
   "https://endfield.wiki.gg/api.php?action=parse&page=Gear&prop=wikitext&format=json"
 ]){
   try{
     const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
     await page.waitForTimeout(1500);
     const title=await page.title();
     const body=(await page.locator("body").innerText()).slice(0,600);
     const tables=await page.locator("table").count();
     const rows=await page.locator("table tr").evaluateAll(elements=>
       elements.filter(el=>/Jingyu Valley|Marker Stone|Sword Vault Dale|Yinglung Pass|Snowy Forest|Si's Painting/.test(el.textContent??""))
         .slice(0,35).map(el=>({text:(el.textContent??"").trim().slice(0,350),
            imageAlts:Array.from(el.querySelectorAll("img")).map(x=>x.alt).filter(Boolean).slice(0,30),
            links:Array.from(el.querySelectorAll("a")).map(x=>x.title||x.textContent).filter(Boolean).slice(0,30)})));
     console.log("COMMUNITY_WIKI_GEAR_TABLE",JSON.stringify({url,status:res?.status(),title,body,tables,rows}));
   }catch(err){console.log("COMMUNITY_WIKI_GEAR_ERROR",JSON.stringify({url,error:String(err)}));}
 }
}finally{await browser.close();}
