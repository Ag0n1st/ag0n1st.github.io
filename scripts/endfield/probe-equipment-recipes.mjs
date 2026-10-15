import { chromium } from "playwright-core";
import {readFile} from "node:fs/promises";
import {extractRenderedGearSource,standardRecipe} from "./equipment-normalize.mjs";

const manifest=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8"));
const catalog=manifest.items.map(i=>({id:i.id,name:i.name}));
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
const page=await browser.newPage({locale:"en-US"});
for(const id of ["1246","341","206"]){
 const url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id;
 await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
 try { await page.getByText("Each gear piece costs",{exact:true}).first().waitFor({timeout:5000}); } catch {}
 await page.waitForTimeout(3800);
 const text=await page.locator("body").innerText();
 const section=extractRenderedGearSource(text);
 const lines=section.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
 const i=lines.indexOf("Each gear piece costs");
 const next=lines.slice(i+1,i+13);
 const pairs=next.map(s=>({name:s,id:catalog.find(x=>x.name===s)?.id??null}));
 console.log("RECIPE_DIAG",JSON.stringify({id,at:i,lines:next,matches:pairs,
  parsed:standardRecipe(section,catalog),htmlHeader:section.slice(0,650)}));
}
}finally{await browser.close();}
