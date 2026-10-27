#!/usr/bin/env node
// Read-only public SKPORT catalog probe. Never saves cookies, tokens or raw responses.
import {readFileSync} from "node:fs";
const {chromium}=await import("playwright");
const local=JSON.parse(readFileSync("src/data/endfield/catalog/items.json","utf8"));
const existing=new Set(local.items.filter(row=>row.categories.includes("Gear")).map(row=>String(row.id)));
const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 const page=await browser.newPage({locale:"en-US",viewport:{width:1400,height:900}});
 const seen=[];
 page.on("response",async response=>{
  try{
   const u=new URL(response.url());
   if(u.hostname!=="zonai.skport.com"||response.status()!==200||!u.pathname.startsWith("/web/v1/wiki/item/"))return;
   const data=await response.json().catch(()=>null);
   if(data?.code!==0)return;
   const kind=u.pathname.replace("/web/v1/wiki/item/","");
   const body=data.data??{};
   const summary={endpoint:kind,keys:Object.keys(body)};
   if(kind==="catalog"){
    const root=body.catalog;
    summary.catalogEntries=Array.isArray(root)?root.length:0;
    summary.catalogShape=JSON.stringify(root)?.slice(0,1300)??null;
   }
   if(kind==="list"){
    summary.itemCount=Object.keys(body.items??{}).length;
    summary.itemSample=JSON.stringify(Object.entries(body.items??{}).slice(0,2)).slice(0,900);
   }
   seen.push(summary);
  }catch(e){console.log("PROBE_RESPONSE_ERROR",String(e).slice(0,150))}
 });
 const urls=[
  "https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=4&filterIds=&header=0",
  "https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=4"
 ];
 for(const url of urls){
  const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
  await page.waitForTimeout(6500);
  console.log("PROBE_PAGE",JSON.stringify({url,status:response?.status(),title:await page.title()}));
 }
 console.log("PROBE_EXISTING_GEAR",existing.size);
 for(const r of seen)console.log("PROBE_PUBLIC_API",JSON.stringify(r));
 if(!seen.some(row=>row.endpoint==="catalog"))process.exitCode=2;
}finally{await browser.close()}
