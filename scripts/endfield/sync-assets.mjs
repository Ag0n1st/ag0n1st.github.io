#!/usr/bin/env node
/**
 * Cache only the public, static SKPORT PNG/JPEG/WebP operator artwork and
 * skill icons already referenced by the normalized repository JSON.
 * No GIFs, animations, videos, cookies or private API calls.
 *
 * Run manually to keep build/deploy independent from the SKPORT CDN.
 */
import { readFile, readdir, mkdir, writeFile, rename, stat } from "node:fs/promises";
import { resolve, join, extname } from "node:path";

const root=resolve("src/data/endfield/operators");
const targetRoot=resolve("public/images/endfield/operators");
const allowedHost="static.skport.com";
const types={".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp"};
const maxBytes=6*1024*1024;

function imageSource(link){
  const u=new URL(link);
  if(u.protocol!=="https:" || u.hostname!==allowedHost || !u.pathname.startsWith("/image/")){
    throw Error("Bild-URL ist nicht von der zugelassenen SKPORT-CDN: "+link);
  }
  const ext=extname(u.pathname).toLowerCase();
  if(!(ext in types))throw Error("Nicht unterstützter Bildtyp: "+ext);
  return {url:u.href,ext,mime:types[ext]};
}
async function download(link,target){
  const asset=imageSource(link);
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),25000);
  let response;
  try {response=await fetch(asset.url,{signal:controller.signal,headers:{"User-Agent":"Ag0n1st-Endfield-Guide/1.0"}});}
  finally {clearTimeout(timer);}
  if(!response.ok)throw Error("CDN HTTP "+response.status+": "+asset.url);
  if(!(response.headers.get("content-type")??"").toLowerCase().includes(asset.mime)){
    throw Error("Falscher CDN Content-Type: "+response.headers.get("content-type"));
  }
  const body=new Uint8Array(await response.arrayBuffer());
  if(body.length<100||body.length>maxBytes)throw Error("Unerwartete Assetgröße: "+body.length);
  await mkdir(resolve(target,".."),{recursive:true});
  const temp=target+".tmp";
  await writeFile(temp,body);
  await rename(temp,target);
  return body.length;
}
async function main(){
  const args=process.argv.slice(2);
  const slugs=args.includes("--slug")?[args[args.indexOf("--slug")+1]]:null;
  const files=(await readdir(root)).filter(f=>f.endsWith(".json")&&!f.endsWith(".extra.json"));
  let total=0;
  for(const file of files){
    const data=JSON.parse(await readFile(join(root,file),"utf8"));
    const slug=data.operator?.slug;
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error("Ungültiger Operator-Slug");
    if(slugs && !slugs.includes(slug))continue;
    const targets=[
      ["cover",data.operator.coverUrl],
      ["illustration",data.operator.illustrationUrl],
      ...(data.skills??[]).map(skill=>["skill-"+skill.slot,skill.iconUrl])
    ];
    for(const [stem,link] of targets){
      if(!link)continue;
      const {ext}=imageSource(link);
      const folder=stem.startsWith("skill-")?join(targetRoot,slug,"skills"):join(targetRoot,slug);
      const target=join(folder,stem+ext);
      // Optimized WebP satisfies the same asset and must not trigger a new download.
      const optimized=join(folder,stem+".webp");
      try {
        await stat(optimized);
        console.log("Optimiertes Asset vorhanden: "+optimized);
        continue;
      } catch(error) {
        if(error.code!=="ENOENT")throw error;
      }
      try{
        await stat(target);console.log("Bereits vorhanden: "+target);
      }catch(error){
        if(error.code!=="ENOENT")throw error;
        const size=await download(link,target);total+=size;
        console.log("SKPORT-Bild gesichert:",slug,stem,size+" Bytes");
      }
    }
  }
  console.log("Asset-Synchronisierung abgeschlossen. Neue Bytes: "+total);
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
