#!/usr/bin/env node
/**
 * One-time image ingestion for Liino's P1/P3/P5 unlockable Operator Snapshots.
 * Source: Endfield Talos Wiki file redirects, which identify the three
 * screenshots by the exact official snapshot names.
 *
 * This script is for manual / temporary GitHub Actions import only.
 * Production builds never contact this wiki. No videos, GIFs or full PNGs
 * are committed: just small locally cached, validated WebP images.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const images=[1,3,5];
const allowedHost="endfield.wiki.gg";
const maxDownload=10*1024*1024;
const maxWebP=150_000;

async function fetchWikiImage(level){
  const u=new URL("https://endfield.wiki.gg/wiki/Special:Redirect/file/Snapshot_Liino_"+level+".png");
  if(u.hostname!==allowedHost)throw Error("Untrusted wiki source");
  const response=await fetch(u,{redirect:"follow",signal:AbortSignal.timeout(30000),headers:{
    "User-Agent":"Ag0n1st-Endfield-Static-Asset-Importer/1.0 (contact through ag0n1st.com)",
    "Accept":"image/png,image/webp,image/jpeg,*/*;q=0.1"
  }});
  if(!response.ok)throw Error("P"+level+" wiki response HTTP "+response.status+" ("+response.url+")");
  if(!["image/png","image/jpeg","image/webp"].some(s=>response.headers.get("content-type")?.startsWith(s)))
    throw Error("P"+level+" wiki returned non-image type: "+response.headers.get("content-type")+" ("+response.url+")");
  const buffer=Buffer.from(await response.arrayBuffer());
  if(buffer.byteLength<1000||buffer.byteLength>maxDownload)throw Error("P"+level+" unexpected download size "+buffer.byteLength);
  return buffer;
}
async function optimize(buffer,level){
  const metadata=await sharp(buffer).metadata();
  if(metadata.width<900 || metadata.height<500 || Math.abs(metadata.width/metadata.height-16/9)>0.12)
    throw Error("P"+level+" invalid original resolution/aspect "+metadata.width+"x"+metadata.height);
  for(const [width,quality] of [[960,70],[840,66],[720,60],[640,56]]){
    const compressed=await sharp(buffer).rotate().resize({width,withoutEnlargement:true}).webp({quality,effort:6}).toBuffer();
    if(compressed.length<=maxWebP)return {compressed,width,quality,original:metadata.width+"x"+metadata.height};
  }
  throw Error("P"+level+" could not fit under "+maxWebP+" bytes");
}
const folder=resolve("public/images/endfield/operators/liino/potentials");
await mkdir(folder,{recursive:true});
for(const level of images){
  const original=await fetchWikiImage(level);
  const result=await optimize(original,level);
  await writeFile(resolve(folder,"potential-"+level+".webp"),result.compressed);
  console.log("IMPORTED_POTENTIAL",JSON.stringify({
    level,originalBytes:original.length,originalSize:result.original,
    webpBytes:result.compressed.length,width:result.width,quality:result.quality
  }));
}
console.log("Liino P1/P3/P5 snapshots optimized locally. No other images changed.");
