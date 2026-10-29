#!/usr/bin/env node
/**
 * One-time, fail-closed cache for editor-approved Elastic Goods package icons.
 * Source: Endfield Talos Wiki (endfield.wiki.gg), namespace File:.
 * The wiki is unofficial; do NOT mutate the official SKPORT items.json.
 * This script downloads no unrelated wiki pages and stores only 128x128 WebPs.
 */
import sharp from "sharp";
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {dirname} from "node:path";
import {endfieldBudget} from "./check-budget.mjs";
const manifestPath="src/data/endfield/catalog/packages.json";
const catalog=JSON.parse(await readFile(manifestPath,"utf8"));
const ROOT="https://endfield.wiki.gg";
const allowedMediaHost=host=>host==="endfield.wiki.gg" || host.endsWith(".wiki.gg");
const headers={"User-Agent":"Mozilla/5.0 (compatible; Ag0n1st-Website-Package-Icon-Import/1.0; +https://ag0n1st.com/)","Accept":"application/json,image/png,image/webp,image/jpeg,*/*","Referer":"https://endfield.wiki.gg/"};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function request(url){
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),20000);
 try{return await fetch(url,{headers,signal:ctrl.signal,redirect:"follow"});}
 finally{clearTimeout(timer);}
}
async function candidates(filename){
 const title="File:"+filename;
 const api=ROOT+"/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles="+encodeURIComponent(title);
 const urls=[];
 try{
  const r=await request(api);
  console.log("WIKIGG_API",filename,r.status);
  if(r.ok&&r.headers.get("content-type")?.includes("json")){
   const j=await r.json();
   for(const page of Object.values(j.query?.pages??{}))
    for(const data of (page.imageinfo??[]))if(data.url)urls.push(data.url);
  }
 }catch(e){console.warn("WIKIGG_API_ERR",filename,String(e).slice(0,160));}
 urls.push(ROOT+"/wiki/Special:Redirect/file/"+encodeURIComponent(filename));
 urls.push(ROOT+"/wiki/Special:FilePath/"+encodeURIComponent(filename));
 return urls;
}
async function fetchImage(filename){
 const errors=[];
 for(const url of await candidates(filename)){
  try{
   if(new URL(url).protocol!=="https:"||!allowedMediaHost(new URL(url).hostname))throw Error("untrusted source host");
   const r=await request(url),source=new URL(r.url);
   if(!r.ok)throw Error("HTTP "+r.status);
   if(!allowedMediaHost(source.hostname))throw Error("image redirect to external host: "+source.hostname);
   const mime=(r.headers.get("content-type")??"").toLowerCase();
   if(!/^image\/(png|webp|jpeg)/.test(mime))throw Error("unexpected MIME "+mime);
   const buf=Buffer.from(await r.arrayBuffer());
   if(buf.length<300||buf.length>3_000_000)throw Error("unexpected source bytes "+buf.length);
   const meta=await sharp(buf,{limitInputPixels:4_000_000}).metadata();
   if(meta.width<40||meta.height<40)throw Error("image too small");
   const webp=await sharp(buf,{limitInputPixels:4_000_000}).resize(128,128,{fit:"inside",withoutEnlargement:true}).webp({quality:78,effort:5}).toBuffer();
   if(webp.length<300||webp.length>120_000)throw Error("unexpected WebP bytes "+webp.length);
   return {webp,source:source.href,width:meta.width,height:meta.height,rawBytes:buf.length};
  }catch(e){errors.push(String(e).slice(0,140));}
 }
 throw Error(filename+" : "+errors.join("; "));
}
if(catalog.category!=="Packages"||catalog.parentCategory!=="Item Files"||catalog.items.length!==25)
 throw Error("Unexpected package manifest");
const captured=[];
const failures=[];
for(const pkg of catalog.items){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pkg.id)||!pkg.wikiTitle?.endsWith(".png")&& !pkg.wikiTitle?.endsWith("(pkg)"))
  throw Error("Invalid package id/wikiTitle "+pkg.id);
 const filename=pkg.wikiTitle.endsWith(".png")?pkg.wikiTitle:pkg.wikiTitle+".png";
 try{
  const result=await fetchImage(filename);
  captured.push({pkg,...result});
  console.log("PACKAGE_ASSET",pkg.id,result.webp.length,"bytes from",result.source);
 }catch(err){failures.push(String(err));console.error("PACKAGE_ASSET_FAILED",String(err));}
 await sleep(120);
}
if(failures.length)throw Error("No partial publication: "+captured.length+"/25 icons obtained. Failures: "+failures.join(" | "));
for(const entry of captured){
 const file="public/images/endfield/packages/"+entry.pkg.id+".webp";
 await mkdir(dirname(file),{recursive:true});
 await writeFile(file,entry.webp);
 const item=catalog.items.find(x=>x.id===entry.pkg.id);
 item.iconPath="/images/endfield/packages/"+item.id+".webp";
 item.cacheStatus="cached";
 item.imageSourceUrl=entry.source;
 item.iconBytes=entry.webp.length;
}
const budget=await endfieldBudget();
if(budget.bytes>100_000_000)throw Error("Endfield 100 MB budget exceeded");
await writeFile(manifestPath,JSON.stringify(catalog,null,2)+"\n");
console.log("WIKIGG_PACKAGE_IMPORT_OK",JSON.stringify({downloaded:captured.length,bytes:captured.reduce((n,e)=>n+e.webp.length,0),endfieldBytes:budget.bytes}));
