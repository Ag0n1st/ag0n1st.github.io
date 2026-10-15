#!/usr/bin/env node
/**
 * Read ONLY official, anonymously accessible SKPORT Endfield catalogues.
 * Cache ONE 256px/384px static WebP icon per official item ID, across categories.
 * Never save a browser profile, HAR, cookies or unrelated network responses.
 * The script is manually operated: no automatic daily updates.
 */
import { chromium } from "playwright-core";
import sharp from "sharp";
import { readFile, writeFile, mkdir, stat, readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { endfieldBudget } from "./check-budget.mjs";

const ROOT=resolve("public/images/endfield/items");
const MANIFEST=resolve("src/data/endfield/catalog/items.json");
const LABELS=["Operators","Weapons","Gear","Item Files","Valuables Stash"];
const IMAGE_HOST="static.skport.com";
const SAFE_ID=/^\d+$/;
const CDN_MAX_BYTES=10*1024*1024;
const captures=[];
const today=new Date().toISOString().slice(0,10);

function verifiedCover(url){
  if(!url)return null;
  try{
    const u=new URL(url);
    if(u.protocol!=="https:"||u.hostname!==IMAGE_HOST||
      !u.pathname.startsWith("/image/")||
      !/\.(png|jpe?g|webp)$/i.test(u.pathname))return null;
    return u.href;
  }catch{return null;}
}
function parseEntries(group,label){
  const rows=group?.items;
  if(!Array.isArray(rows)||!rows.length)throw Error("Official category empty: "+label);
  return rows.map(row=>{
    const id=String(row.itemId??"");
    if(!SAFE_ID.test(id)||!String(row.name??"").trim())
      throw Error("Incomplete official item ID/name in "+label);
    return {id,name:String(row.name).trim(),category:label,
      wikiSubTypeId:String(group.id),coverUrl:verifiedCover(row.brief?.cover)};
  });
}
async function visit(page,url){
  const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
  if(!res||res.status()!==200)throw Error("Wiki catalogue load: "+url+" HTTP "+res?.status());
  await page.waitForTimeout(3200);
}
async function loadCatalogue(){
  const browser=await chromium.launch({channel:"chrome",headless:true,
    args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    const context=await browser.newContext({locale:"en-US",viewport:{width:1280,height:900}});
    const page=await context.newPage();
    page.on("response",async response=>{
      try{
        const u=new URL(response.url());
        if(u.hostname!=="zonai.skport.com" || u.pathname!=="/web/v1/wiki/item/catalog"||
          response.status()!==200)return;
        const json=await response.json().catch(()=>null);
        if(json?.code===0 && Array.isArray(json.data?.catalog))
          captures.push({query:Object.fromEntries(u.searchParams),catalog:json.data.catalog});
      }catch{/* only public whitelisted data; skip unrelated network responses */}
    });
    await visit(page,"https://wiki.skport.com/endfield");
    await visit(page,"https://wiki.skport.com/endfield/catalog?typeMainId=1&typeSubId=1");
    const mainGroup=()=>captures.flatMap(c=>c.catalog).find(g=>
      String(g.id)==="1"&&(g.typeSub??[]).some(x=>x.name==="Operators"&&x.name));
    const groups=mainGroup()?.typeSub??[];
    const ids=new Map(groups.map(group=>[group.name,String(group.id)]));
    for(const label of LABELS)
      if(!ids.get(label)||!SAFE_ID.test(ids.get(label)))throw Error("Official category not found: "+label+" (available: "+[...ids.keys()].join(", ")+")");
    const results=[];
    for(const label of LABELS){
      const subId=ids.get(label);
      await visit(page,"https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId="+subId);
      // Request scoped catalogue takes precedence over cached full metadata.
      const matched=captures.filter(c=>
        String(c.query.typeMainId)==="1" && String(c.query.typeSubId)===subId)
        .flatMap(c=>c.catalog).flatMap(g=>g.typeSub??[])
        .find(g=>String(g.id)===subId && g.items?.length);
      if(!matched)throw Error("No complete official public items list for "+label);
      results.push({label,subId,items:parseEntries(matched,label)});
      console.log("OFFICIAL_CATEGORY",JSON.stringify({
        name:label,id:subId,items:results.at(-1).items.length,
        withCover:results.at(-1).items.filter(x=>x.coverUrl).length,
        example:results.at(-1).items.slice(0,2).map(x=>({id:x.id,name:x.name}))
      }));
    }
    return results;
  }finally{await browser.close();}
}

async function existingOperatorPortraits(){
  const matches=new Map();
  const fs=await readdir(resolve("src/data/endfield/operators"));
  for(const file of fs.filter(x=>x.endsWith(".json")&&!x.endsWith(".extra.json"))){
    const value=JSON.parse(await readFile(resolve("src/data/endfield/operators",file),"utf8"));
    if(value.operator?.id && value.operator?.slug) {
      const path=resolve("public/images/endfield/operators",value.operator.slug,"cover.webp");
      try{await stat(path);matches.set(value.operator.id,
        "/images/endfield/operators/"+value.operator.slug+"/cover.webp");}
      catch(e){if(e.code!=="ENOENT")throw e;}
    }
  }
  return matches;
}
async function obtainAsset(item){
  if(!item.coverUrl)return {type:"no-cover"};
  const file=resolve(ROOT,item.id+".webp");
  try{
    const prev=await stat(file);
    if(prev.size>0)return {type:"existing",bytes:prev.size,path:"/images/endfield/items/"+item.id+".webp"};
  }catch(e){if(e.code!=="ENOENT")throw e;}
  const source=new URL(item.coverUrl);
  if(source.hostname!==IMAGE_HOST||source.protocol!=="https:")
    throw Error("Untrusted public image origin");
  const ctl=new AbortController();
  const timer=setTimeout(()=>ctl.abort(),30000);
  let response;
  try {response=await fetch(source,{signal:ctl.signal,headers:{"User-Agent":"Ag0n1st-Endfield-Wiki-Public-Asset/1.0"}});}
  finally {clearTimeout(timer);}
  if(!response.ok)throw Error("Official CDN HTTP "+response.status());
  const mimetype=(response.headers.get("content-type")??"").toLowerCase();
  if(!/^image\/(png|jpeg|webp)/.test(mimetype))throw Error("Unexpected CDN media type "+mimetype);
  const raw=Buffer.from(await response.arrayBuffer());
  if(raw.length<100||raw.length>CDN_MAX_BYTES)throw Error("CDN image size outside safe bounds: "+raw.length);
  const maxDim=item.category==="Operators"?384:256;
  // Resize without enlarging original images, convert everything to WebP.
  const encoded=await sharp(raw,{limitInputPixels:45_000_000})
    .resize({width:maxDim,height:maxDim,fit:"inside",withoutEnlargement:true})
    .webp({quality:78,effort:4}).toBuffer();
  if(encoded.length<100 || encoded.length>2_000_000)
    throw Error("Implausible optimized WebP size "+encoded.length);
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,encoded);
  return {type:"downloaded",bytes:encoded.length,rawBytes:raw.length,
    path:"/images/endfield/items/"+item.id+".webp"};
}
async function main(){
  const groups=await loadCatalogue();
  const operatorCovers=await existingOperatorPortraits();
  const unique=new Map();
  const conflicts=[];
  for(const category of groups) for(const item of category.items){
    const old=unique.get(item.id);
    if(old && old.name!==item.name) conflicts.push({id:item.id,old:old.name,new:item.name});
    if(!old)unique.set(item.id,{...item,categories:[category.label]});
    else{old.categories.push(category.label);if(!old.coverUrl&&item.coverUrl)old.coverUrl=item.coverUrl;}
  }
  if(conflicts.length)throw Error("Conflicting official IDs: "+JSON.stringify(conflicts.slice(0,6)));
  let completed=0,rawBytes=0,optimizedNewBytes=0,skipped=0,cached=0;
  const errors=[];
  const items=[...unique.values()];
  const queue=[...items];
  async function worker(){
    while(queue.length){
      const item=queue.shift();
      if(operatorCovers.has(item.id)){
        item.iconPath=operatorCovers.get(item.id);
        item.cacheStatus="existing-operator";cached++;completed++;continue;
      }
      try{
        const value=await obtainAsset(item);
        item.iconPath=value.path??null;
        item.cacheStatus=value.type==="no-cover"?"no-cover":"cached";
        if(value.type==="downloaded"){rawBytes+=value.rawBytes;optimizedNewBytes+=value.bytes;}
        if(value.type==="existing")cached++;
        if(value.type==="no-cover")skipped++;
      }catch(error){
        item.iconPath=null;item.cacheStatus="unavailable";
        errors.push({id:item.id,name:item.name,reason:String(error).slice(0,125)});
      }
      completed++;
      if(completed%100===0)console.log("ASSET_PROGRESS",completed+"/"+items.length);
    }
  }
  await Promise.all(Array.from({length:9},()=>worker()));
  const budget=await endfieldBudget();
  // Fail closed even on a single bad directory growth; nothing may be committed.
  if(budget.remainingBytes<0)throw Error("Endfield budget exceeded before committing asset library: "+budget.bytes);
  items.sort((a,b)=>Number(a.id)-Number(b.id));
  const record={
    schemaVersion:1,source:{provider:"SKPORT Wiki",language:"en",snapshot:today},
    categories:groups.map(g=>({name:g.label,officialId:g.subId,count:g.items.length})),
    items:items.map(({id,name,categories,coverUrl,iconPath,cacheStatus})=>
      ({id,name,categories,iconPath,cacheStatus,coverUrl}))
  };
  await mkdir(dirname(MANIFEST),{recursive:true});
  await writeFile(MANIFEST,JSON.stringify(record,null,2)+"\n");
  const final=await endfieldBudget();
  if(final.remainingBytes<0)throw Error("Endfield budget exceeded by manifest.");
  console.log("ASSET_SUMMARY",JSON.stringify({
    uniqueItems:items.length,categoryEntries:groups.reduce((n,g)=>n+g.items.length,0),
    cachedExisting:cached,downloaded:items.length-cached-skipped-errors.length,
    noCover:skipped,errors:errors.slice(0,30),errorCount:errors.length,
    rawDownloadedBytes:rawBytes,optimizedNewBytes,savingsBytes:rawBytes-optimizedNewBytes,
    budget:final
  }));
  if(errors.length) {
    // An incomplete CDN cache may be retried; manifest retains unresolved IDs,
    // but we reject permanent publication of partial source coverage.
    throw Error(errors.length+" official CDN icons could not be cached; retry before publication.");
  }
}
main().catch(error=>{console.error("CATALOG_IMPORT_FAILED",String(error));process.exitCode=1;});
