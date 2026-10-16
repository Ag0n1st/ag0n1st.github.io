#!/usr/bin/env node
/**
 * Cache ONLY the eighteen publicly listed version-1.6 gear icons.
 * Never fetch accounts, wiki sessions, formula/blueprint IDs or game clients.
 * Source images are converted to small local WebPs at authoring time.
 */
import sharp from "sharp";
import {readFile,writeFile,mkdir,access} from "node:fs/promises";
import {dirname} from "node:path";
const sourcePath="src/data/endfield/catalog/v16-gear.json";
const data=JSON.parse(await readFile(sourcePath,"utf8"));
if(data.version!=="1.6"||data.items.length!==18)throw Error("Unexpected version 1.6 gear manifest");
const SAFE=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sourceHost="https://endfield.wiki.gg/wiki/";
let existing=0,downloaded=0,notFound=0;
const report=[];
for(const row of data.items){
 if(!SAFE.test(row.id)||!row.sourcePage.startsWith(sourceHost)
    ||!row.name||!row.categories?.includes("Gear"))
   throw Error("Unrecognized static gear source "+row.id);
 if(row.iconPath){
   try{await access("public"+row.iconPath);existing++;continue;}
   catch{throw Error("Release icon missing on disk: "+row.iconPath);}
 }
 const remote=sourceHost+"Special:Redirect/file/"+encodeURIComponent(row.name.replaceAll(" ","_")+".png");
 let response;
 try{response=await fetch(remote,{redirect:"follow",signal:AbortSignal.timeout(20000)});}
 catch(error){notFound++;report.push({id:row.id,reason:String(error).slice(0,115)});continue;}
 const type=response.headers.get("content-type")??"";
 if(!response.ok||!/^image\/(?:png|jpeg|webp)(?:;|$)/i.test(type)){
   notFound++;report.push({id:row.id,http:response.status,contentType:type.slice(0,50)});continue;
 }
 const raw=Buffer.from(await response.arrayBuffer());
 if(raw.length<800||raw.length>5_000_000){notFound++;report.push({id:row.id,reason:"image-size-invalid"});continue;}
 const icon=await sharp(raw,{limitInputPixels:18_000_000})
  .resize({width:240,height:240,fit:"inside",withoutEnlargement:true})
  .webp({quality:76,effort:5}).toBuffer();
 if(icon.length>95_000){notFound++;report.push({id:row.id,reason:"webp-size-exceeds-95kb"});continue;}
 const local="public/images/endfield/gear/releases/v16/"+row.id+".webp";
 await mkdir(dirname(local),{recursive:true});
 await writeFile(local,icon);
 row.iconPath="/images/endfield/gear/releases/v16/"+row.id+".webp";
 row.cacheStatus="community-wiki-verified-numeric-id-pending";
 downloaded++;
 console.log("V16_ICON_CACHED",JSON.stringify({id:row.id,bytes:icon.length}));
}
await writeFile(sourcePath,JSON.stringify(data,null,2)+"\n");
console.log("V16_ICON_AUDIT",JSON.stringify({expected:18,existing,downloaded,notFound,issues:report}));
