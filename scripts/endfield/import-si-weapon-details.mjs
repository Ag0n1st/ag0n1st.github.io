#!/usr/bin/env node
// One-time authenticated-free importer for official Si release weapons only.
import {chromium} from "playwright";
import {readFile,writeFile} from "node:fs/promises";
import {normalizeEquipment} from "./equipment-normalize.mjs";
const out="src/data/endfield/catalog/equipment-details.json";
const all=JSON.parse(await readFile(out,"utf8"));
const catalog=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8"));
const list=catalog.items.map(x=>({id:x.id,name:x.name}));
const pending=["1280","1281"].filter(id=>!all.weapons.some(w=>w.id===id&&w.status==="verified"));
console.log("SI_WEAPONS_MISSING",pending);
if(pending.length){
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  const page=await browser.newPage({locale:"en-US"});
  for(const id of pending){
   const wanted=catalog.items.find(x=>x.id===id);
   if(!wanted?.categories.includes("Weapons"))throw Error("No official weapon catalog entry "+id);
   const match=page.waitForResponse(r=>{
    try{const u=new URL(r.url());return u.hostname==="zonai.skport.com"&&u.pathname==="/web/v1/wiki/item/info"&&
       u.searchParams.get("id")===id&&r.status()===200}catch{return false}
   },{timeout:30000});
   await page.goto("https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=2&gameEntryId="+id,
    {waitUntil:"domcontentloaded",timeout:50000});
   const response=await match;
   const json=await response.json();
   if(json?.code!==0||!json.data?.item)throw Error("Unverified public SKPORT weapon "+id);
   const detail=normalizeEquipment(json.data.item,{...wanted,category:"Weapons"},
     "2026-10-16",{sourcePanel:"",catalog:list});
   if(detail.status!=="verified")throw Error("Weapon details not verified: "+id+" "+JSON.stringify(detail).slice(0,600));
   all.weapons=all.weapons.filter(w=>w.id!==id);
   all.weapons.push(detail);
   console.log("NEW_SI_WEAPON",JSON.stringify({id,name:detail.name,tuning:detail.tuning.length,attributes:detail.attributes.length}));
  }
 }finally{await browser.close()}
 all.weapons.sort((a,b)=>Number(a.id)-Number(b.id));
 all.source.snapshot="2026-10-16";
 all.coverage={...all.coverage,parsed:all.weapons.length+all.gear.length,
  verified:[...all.weapons,...all.gear].filter(x=>x.status==="verified").length,
  weaponCount:all.weapons.length};
 await writeFile(out,JSON.stringify(all,null,2)+"\n");
}
