#!/usr/bin/env node
// One-time read-only SKPORT Si importer. Only public official sources; capped static WebP.
import {chromium} from "playwright";
import sharp from "sharp";
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {dirname} from "node:path";
import {importOperator} from "./import-operator.mjs";
const id="1278",day="2026-10-16",root="https://wiki.skport.com/endfield";
const capture={info:null,list:null,catalog:[]};
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
try{
 const page=await browser.newPage({locale:"en-US"});
 page.on("response",async r=>{
  try{
   const u=new URL(r.url());
   if(u.hostname!=="zonai.skport.com"||r.status()!==200)return;
   const d=await r.json().catch(()=>null);
   if(d?.code!==0)return;
   if(u.pathname==="/web/v1/wiki/item/info"&&u.searchParams.get("id")===id)capture.info=d;
   if(u.pathname==="/web/v1/wiki/item/list"&&d.data?.items)capture.list=d.data.items;
   if(u.pathname==="/web/v1/wiki/item/catalog"&&Array.isArray(d.data?.catalog))capture.catalog.push(d.data.catalog);
  }catch{}
 });
 for(const p of ["","/catalog?mainTypeId=1&subTypeId=1",
    "/detail?mainTypeId=1&subTypeId=1&gameEntryId=1278",
    "/catalog?mainTypeId=1&subTypeId=4"]){
  try{
   const r=await page.goto(root+p,{waitUntil:"domcontentloaded",timeout:45000});
   await page.waitForTimeout(3300);
   console.log("VISIT",p,r?.status(),!!capture.info,!!capture.list,capture.catalog.length);
  }catch(e){console.log("VISIT_ERR",p,String(e).slice(0,170));}
 }
}finally{await browser.close();}
if(!capture.info)throw Error("Official public SKPORT Si operator item 1278 not available");
const cat=capture.catalog.flat(2).flatMap(g=>g.typeSub??[])
 .filter(g=>["Gear","Weapons","Operators"].includes(g.name))
 .flatMap(g=>(g.items??[]).map(x=>({id:String(x.itemId),name:String(x.name??""),
  category:g.name,coverUrl:x.brief?.cover??null})));
const old=JSON.parse(await readFile("src/data/endfield/catalog/items.json","utf8"));
const idx=Object.fromEntries(old.items.map(x=>[x.id,{name:x.name}]));
for(const x of cat)if(x.id&&x.name)idx[x.id]={name:x.name};
if(capture.list)Object.assign(idx,capture.list);
console.log("CAPTURE",JSON.stringify({info:capture.info.data?.item?.name,
 hasList:!!capture.list,itemCount:Object.keys(idx).length,catalog:cat.length,
 newGear:cat.filter(x=>x.category==="Gear"&&!old.items.some(y=>y.id===x.id)).map(x=>({id:x.id,name:x.name})).slice(0,36)}));
const {main,extras}=importOperator(capture.info,idx,{itemId:id,slug:"si",snapshot:day});
// SKPORT public Si widget still uses placeholder tab title "Skill Name"; the same official text names it Brushwork Realm.
if(main.skills[1]?.name==="Skill Name" && /Artful Intent|Inksoul|Initial Stroke/.test(main.skills[1]?.description??"")) main.skills[1].name="Brushwork Realm";
if(main.skills[1]?.name!=="Brushwork Realm")throw Error("Battle Skill name/description needs manual source review");
if(main.operator.name!=="Si"||main.operator.id!==id||
 extras.attributes.mainAttribute!=="Intellect"||extras.attributes.secondaryAttribute!=="Strength")
 throw Error("Official data mismatch with Si identity/attributes");
await writeFile("src/data/endfield/operators/si.json",JSON.stringify(main,null,2)+"\n");
await writeFile("src/data/endfield/operators/si.extra.json",JSON.stringify(extras,null,2)+"\n");
console.log("IMPORTED_SI",JSON.stringify({operator:main.operator,skills:main.skills.map(x=>({slot:x.slot,name:x.name,metrics:x.metrics.length})),
 talents:extras.talents.map(x=>({id:x.id,name:x.name,category:x.category})),potentials:extras.potentials}));
async function optimized(url,w,h,max){
 if(!url)return null;
 const u=new URL(url);
 if(u.protocol!=="https:"||u.hostname!=="static.skport.com"||!u.pathname.startsWith("/image/"))
 throw Error("Bad official image origin "+url);
 const r=await fetch(u,{signal:AbortSignal.timeout(30000)});
 if(!r.ok||!/^image\/(png|webp|jpeg)/.test(r.headers.get("content-type")??""))
 throw Error("Official image response invalid "+r.status+" "+url);
 const raw=Buffer.from(await r.arrayBuffer());
 if(raw.length>10_000_000||raw.length<250)throw Error("Bad image size");
 for(const q of [78,68,58,48]){
  const out=await sharp(raw).resize({width:w,height:h,fit:"inside",withoutEnlargement:true})
   .webp({quality:q,effort:5}).toBuffer();
  if(out.length<=max)return out;
 }
 throw Error("Cannot fit static WebP budget "+url);
}
async function save(url,file,w,h,max){
 const buf=await optimized(url,w,h,max);if(!buf)return;
 await mkdir(dirname(file),{recursive:true});await writeFile(file,buf);
 console.log("WEBP",file,buf.length);
}
for(const [name,url,w,h,max] of [
 ["cover",main.operator.coverUrl,420,420,180000],
 ["illustration",main.operator.illustrationUrl,900,1125,550000],
 ...main.skills.map(x=>["skills/skill-"+x.slot,x.iconUrl,200,200,65000])])
 await save(url,"public/images/endfield/operators/si/"+name+".webp",w,h,max);
const fresh=cat.filter(x=>x.category==="Gear"&&
 /^(Type 50 Yinglung (Soft Armor|Gauntlets|Gloves T2|Beacon)|Eternal Xiranite (MOD Armor|Overalls|Channeling Gloves|Rangefinder))$/.test(x.name)&&!old.items.some(y=>y.id===x.id));
for(const x of fresh){
 await save(x.coverUrl,"public/images/endfield/gear/"+x.id+".webp",256,256,65000);
 old.items.push({id:x.id,name:x.name,categories:["Gear"],iconPath:"/images/endfield/gear/"+x.id+".webp",cacheStatus:"cached",coverUrl:x.coverUrl});
}
if(fresh.length){
 old.items.sort((a,b)=>Number(a.id)-Number(b.id));
 await writeFile("src/data/endfield/catalog/items.json",JSON.stringify(old,null,2)+"\n");
}
console.log("NEW_GEAR",JSON.stringify(fresh.map(x=>({id:x.id,name:x.name}))));
for(const n of [1,3,5])try{
 const r=await fetch("https://endfield.wiki.gg/wiki/Special:Redirect/file/Snapshot_Si_"+n+".png",
  {signal:AbortSignal.timeout(25000)});
 if(!r.ok||!/^image\/(png|webp|jpeg)/.test(r.headers.get("content-type")??""))
 throw Error("wiki response "+r.status);
 const raw=Buffer.from(await r.arrayBuffer());
 if(raw.length>9000000)throw Error("Oversize source");
 const meta=await sharp(raw).metadata();
 if(meta.width<700||meta.height<380)throw Error("Invalid snapshot");
 let out=null;
 for(const [w,q] of [[960,70],[840,63],[720,56],[640,48]]){
  const b=await sharp(raw).resize({width:w,withoutEnlargement:true}).webp({quality:q,effort:5}).toBuffer();
  if(b.length<=150000){out=b;break;}
 }
 if(!out)throw Error("WebP too large");
 const file="public/images/endfield/operators/si/potentials/potential-"+n+".webp";
 await mkdir(dirname(file),{recursive:true});await writeFile(file,out);
 console.log("POTENTIAL_WEBP",n,out.length);
}catch(e){console.log("POTENTIAL_UNAVAILABLE",n,String(e).slice(0,180));}
