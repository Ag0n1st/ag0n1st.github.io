#!/usr/bin/env node
/**
 * Discover details only for 84 weapon and 258 gear IDs ALREADY verified by
 * our official SKPORT catalogue. Fresh unsigned-in Chrome; no account/HAR.
 *
 * --limit N : safe early validation of N items per category
 * --all     : whole catalogue, saves one versioned JSON snapshot
 * --out FILE: default untracked local-data/endfield-equipment.json
 */
import { chromium } from "playwright-core";
import { readFile,mkdir,writeFile } from "node:fs/promises";
import { resolve,dirname } from "node:path";
import {normalizeEquipment,extractRenderedGearSource} from "./equipment-normalize.mjs";
const args=process.argv.slice(2);
const flag=name=>args.includes(name);
const option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const limit=Number(option("--limit",flag("--all")?"1000":"3"));
const out=resolve(option("--out","local-data/endfield-equipment.json"));
if(!Number.isSafeInteger(limit)||limit<1||limit>1000)throw Error("Invalid --limit");
const listing=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8"));
const selection=["Weapons","Gear"].map(category=>({
  category,items:listing.items.filter(x=>x.categories.includes(category)).slice(0,limit)
}));
const catalog=listing.items.map(x=>({id:x.id,name:x.name}));
const browserInstance=await chromium.launch({channel:"chrome",headless:true,
  args:["--no-sandbox","--disable-dev-shm-usage"]});
const context=await browserInstance.newContext({locale:"en-US",viewport:{width:1350,height:900}});
const outputs=[],errors=[],unverified=[];
const all=selection.flatMap(x=>x.items.map(item=>({...item,category:x.category})));
let index=0;
async function worker(){
  const page=await context.newPage();
  try{
    while(index<all.length){
      const expected=all[index++];
      const id=expected.id;
      const sub=expected.category==="Weapons"?"2":"4";
      let record=null;
      for(let attempt=1;attempt<=2;attempt++){
        try{
          const responseWait=page.waitForResponse(r=>{
            try{let u=new URL(r.url());return u.hostname==="zonai.skport.com"&&
              u.pathname==="/web/v1/wiki/item/info"&&u.searchParams.get("id")===id&&r.status()===200;}
            catch{return false;}
          },{timeout:25000});
          const url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId="+sub+"&gameEntryId="+id;
          const [res,api]=await Promise.all([page.goto(url,{waitUntil:"domcontentloaded",timeout:45000}),responseWait]);
          if(res?.status()!==200)throw Error("Wiki page returned HTTP "+res?.status());
          const json=await api.json();
          if(json?.code!==0||!json?.data?.item)throw Error("Public Wiki returned no item");
          let panel="";
          if(expected.category==="Gear"){
            try {
              await page.waitForFunction(()=>{
                const text=document.body?.innerText??"";
                const st=text.indexOf("Each gear piece costs");
                if(st<0)return false;
                const lines=text.slice(st+"Each gear piece costs".length)
                  .split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
                return lines.length>=2&&!lines[0].startsWith("*")&&/^\*\s*\d/.test(lines[1]);
              },null,{timeout:6500});
            }catch{/* some gear has no listed default recipe */}
            const body=await page.locator("body").innerText().catch(()=>"");
            panel=extractRenderedGearSource(body);
          }
          record=normalizeEquipment(json.data.item,expected,new Date().toISOString().slice(0,10),
            {sourcePanel:panel,catalog});
          break;
        }catch(e){
          if(attempt===2)errors.push({id,name:expected.name,category:expected.category,message:String(e).slice(0,190)});
          else await page.waitForTimeout(400);
        }
      }
      if(record){
        outputs.push(record);
        if(record.status!=="verified"||(record.kind==="gear"&&record.recipeStatus==="needs-review"))
          unverified.push({id,name:expected.name,kind:record.kind,status:record.status,
            recipeStatus:record.kind==="gear"?record.recipeStatus:undefined});
      }
      const total=outputs.length+errors.length;
      if(total%40===0)console.log("DETAIL_PROGRESS",total+"/"+all.length,
        "verified",outputs.filter(x=>x.status==="verified").length,
        "incomplete",unverified.length,"errors",errors.length);
    }
  }finally{await page.close();}
}
try{await Promise.all(Array.from({length:4},()=>worker()));}
finally{await browserInstance.close();}
outputs.sort((a,b)=>Number(a.id)-Number(b.id));
const results={schemaVersion:1,source:{provider:"SKPORT Wiki",snapshot:new Date().toISOString().slice(0,10),
  description:"Official public item/info widgets + rendered default gear Source"},
  coverage:{requested:all.length,parsed:outputs.length,verified:outputs.filter(x=>x.status==="verified").length,
    incomplete:outputs.filter(x=>x.status!=="verified").length,
    recipeNeedsReview:outputs.filter(x=>x.kind==="gear"&&x.recipeStatus==="needs-review").length,
    errors:errors.length,weaponCount:outputs.filter(x=>x.kind==="weapon").length,
    gearCount:outputs.filter(x=>x.kind==="gear").length},
  weapons:outputs.filter(x=>x.kind==="weapon"),
  gear:outputs.filter(x=>x.kind==="gear"),
  review:unverified,
  failures:errors
};
await mkdir(dirname(out),{recursive:true});
await writeFile(out,JSON.stringify(results,null,2)+"\n");
console.log("DETAIL_SUMMARY",JSON.stringify({coverage:results.coverage,
  missing:unverified.slice(0,25),failures:errors.slice(0,20),bytes:JSON.stringify(results).length}));
if(errors.length)process.exitCode=2;
