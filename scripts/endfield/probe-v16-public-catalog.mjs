#!/usr/bin/env node
// Read-only, public SKPORT catalogue inspection. No login, cookies or signed API replay.
import {chromium} from "playwright";
import catalog from "../../src/data/endfield/catalog/items.json" with {type:"json"};
const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const responses=[];
try{
 const page=await browser.newPage({locale:"en-US",viewport:{width:1440,height:900}});
 page.on("response",async res=>{
  try{
   const u=new URL(res.url());
   if(u.hostname!=="zonai.skport.com"||!u.pathname.startsWith("/web/v1/wiki/item/")||res.status()!==200)return;
   const d=await res.json().catch(()=>null);
   if(d?.code!==0)return;
   if(["/web/v1/wiki/item/catalog","/web/v1/wiki/item/list"].includes(u.pathname))
    responses.push({path:u.pathname,params:u.search,keys:Object.keys(d.data||{}),data:d.data});
  }catch{}
 });
 for(const url of ["https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=4","https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=4&header=0"]){
  try{const r=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});console.log("CATALOG_PAGE",r?.status());await page.waitForTimeout(4800)}
  catch(e){console.log("CATALOG_VISIT_WARNING",String(e.message).slice(0,180))}
 }
 const old=new Set(catalog.items.map(x=>x.id));
 const records=new Map();
 const seen=new Set();
 function visit(node,depth=0){
  if(depth>11||!node||typeof node!=="object"||seen.has(node))return;
  seen.add(node);
  if(Array.isArray(node)){for(const x of node)visit(x,depth+1);return}
  if(/^\d+$/.test(String(node.itemId??""))&&typeof node.name==="string"){
   const id=String(node.itemId);
   records.set(id,{id,name:node.name,new:!old.has(id),keys:Object.keys(node).slice(0,12)});
  }
  for(const v of Object.values(node))visit(v,depth+1);
 }
 for(const r of responses)if(r.path.endsWith("/catalog"))visit(r.data);
 console.log("PUBLIC_GEAR_CATALOGUE_SUMMARY",JSON.stringify({captures:responses.map(x=>({path:x.path,params:x.params,keys:x.keys})),catalogueRecords:records.size,oldItems:old.size,unseen: [...records.values()].filter(x=>x.new).length}));
 const hints=/pulser|xiranite|rift trekker|yinglung|fieldwork/i;
 console.log("PUBLIC_GEAR_CANDIDATES",JSON.stringify([...records.values()].filter(x=>hints.test(x.name)).slice(0,100)));
 console.log("PUBLIC_GEAR_NEW_SAMPLE",JSON.stringify([...records.values()].filter(x=>x.new).slice(0,100)));
 if(!records.size)process.exitCode=2;
}finally{await browser.close()}
