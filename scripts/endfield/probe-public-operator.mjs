#!/usr/bin/env node
// Read-only probe. Reuses the anonymous SKPORT browser workflow of Liino / Si.
// No session data, signatures, login, raw JSON artifacts or network replay.
import {pathToFileURL} from "node:url";
import {resolve} from "node:path";
import {importOperator} from "./import-operator.mjs";
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import catalog from "../../src/data/endfield/catalog/items.json" with {type:"json"};

export function expectedInfoResponse(url,status,data,id){
  try{
    const u=new URL(url);
    return u.protocol==="https:" && u.hostname==="zonai.skport.com" &&
      u.pathname==="/web/v1/wiki/item/info" && u.searchParams.get("id")===id &&
      status===200 && data?.code===0 && String(data.data?.item?.itemId)===id &&
      !!data.data?.item?.document;
  }catch{return false}
}
export function publicIndex(extra){
  const entries=Object.fromEntries(catalog.items.map(x=>[String(x.id),{name:x.name}]));
  if(extra && typeof extra==="object" && !Array.isArray(extra))
    for(const [id,record] of Object.entries(extra))
      if(/^\d+$/.test(id) && typeof record?.name==="string" && record.name.trim())
        entries[id]={name:record.name};
  return entries;
}
export async function probeOperator(op,options={}){
  const {chromium}=await import("playwright");
  const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  let received=[],items=null,events=[];
  try{
    const page=await browser.newPage({locale:"en-US",viewport:{width:1440,height:900}});
    page.on("response",async res=>{
      try{
        const u=new URL(res.url());
        if(u.hostname!=="zonai.skport.com"||!u.pathname.startsWith("/web/v1/wiki/item/"))return;
        const data=await res.json().catch(()=>null);
        if(u.pathname==="/web/v1/wiki/item/list" && res.status()===200 &&
           data?.code===0 && data?.data?.items)items=data.data.items;
        if(u.pathname==="/web/v1/wiki/item/info"&&u.searchParams.get("id")===op.itemId){
          events.push({http:res.status(),code:data?.code??null,document:!!data?.data?.item?.document});
          if(expectedInfoResponse(res.url(),res.status(),data,op.itemId))received.push(data);
        }
      }catch{}
    });
    const root="https://wiki.skport.com/endfield";
    const urls=[
      root+"/catalog?mainTypeId=1&subTypeId=1",
      root+"/detail?mainTypeId=1&subTypeId=1&gameEntryId="+op.itemId,
      root+"/detail?mainTypeId=1&subTypeId=1&gameEntryId="+op.itemId+"&header=0"
    ];
    for(const url of urls){
      try{
        const nav=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
        await page.waitForTimeout(options.waitMs??4700);
        console.log("PUBLIC_SKPORT_VISIT",JSON.stringify({path:new URL(url).pathname,status:nav?.status(),capture:received.length}));
      }catch(error){
        console.log("PUBLIC_SKPORT_NAV_ERROR",String(error.message).slice(0,180));
      }
      if(received.length)break;
    }
    if(!received.length)return {id:op.itemId,slug:op.id,status:"no-public-detail",events};
    const imported=importOperator(received.at(-1),publicIndex(items),
      {itemId:op.itemId,slug:op.id,snapshot:new Date().toISOString().slice(0,10)});
    return {id:op.itemId,slug:op.id,status:"validated",events,
      name:imported.main.operator.name,
      skills:imported.main.skills.map(x=>({slot:x.slot,name:x.name,ranks:x.upgradeCosts.length})),
      potentials:imported.extras.potentials.length,
      promotions:imported.extras.promotions.length,
      talents:imported.extras.talents.length,
      materialNames:Object.keys(imported.extras.materials).length};
  }finally{await browser.close()}
}
async function main(){
  const slug=process.argv[2]??"purrchena";
  const op=roster.operators.find(x=>x.id===slug);
  if(!op)throw Error("Unknown operator slug "+slug);
  if(op.availableFrom && op.availableFrom>new Date().toISOString().slice(0,10))
    throw Error("Operator not released");
  const result=await probeOperator(op);
  console.log("PUBLIC_SKPORT_PROBE_RESULT",JSON.stringify(result));
  if(result.status!=="validated")process.exitCode=2;
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href)
  main().catch(error=>{console.error("PUBLIC_SKPORT_PROBE_ERROR",String(error.message).slice(0,600));process.exitCode=2});
