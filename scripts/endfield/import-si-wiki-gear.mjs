#!/usr/bin/env node
// Static community-wiki gear cache for newly released 1.6 items absent from
// today's numeric SKPORT catalogue. Names are real, IDs are explicitly NOT numeric SKPORT IDs.
// Fail closed if a real name/source image cannot be retrieved. Run once, never at build time.
import sharp from "sharp";
import {mkdir,writeFile} from "node:fs/promises";
import {dirname} from "node:path";
const items=[
 ["type-50-yinglung-soft-armor","Type 50 Yinglung Soft Armor"],
 ["type-50-yinglung-gauntlets","Type 50 Yinglung Gauntlets"],
 ["type-50-yinglung-beacon","Type 50 Yinglung Beacon"],
 ["eternal-xiranite-overalls","Eternal Xiranite Overalls"],
 ["eternal-xiranite-channeling-gloves","Eternal Xiranite Channeling Gloves"],
 ["eternal-xiranite-rangefinder","Eternal Xiranite Rangefinder"]
];
const output=[];
for(const [id,name] of items){
 const source="https://endfield.wiki.gg/wiki/Special:Redirect/file/"+name.replaceAll(" ","_")+".png";
 const response=await fetch(source,{redirect:"follow",signal:AbortSignal.timeout(30000)});
 if(!response.ok||!/^image\/(png|jpeg|webp)/i.test(response.headers.get("content-type")??"")){
   console.log("RELEASE_GEAR_NO_IMAGE",id,response.status,response.headers.get("content-type"));
   output.push({id,name,categories:["Gear"],iconPath:null,cacheStatus:"wiki-listed-image-pending",coverUrl:null,
    sourcePage:"https://endfield.wiki.gg/wiki/"+name.replaceAll(" ","_")});continue;
 }
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length<1000||bytes.length>6_000_000)throw Error("Unexpected image bytes "+id);
 const out=await sharp(bytes).resize({width:240,height:240,fit:"inside",withoutEnlargement:true})
  .webp({quality:76,effort:5}).toBuffer();
 if(out.length>95000)throw Error("Wiki image too large for static cache "+id);
 const file="public/images/endfield/gear/releases/si/"+id+".webp";
 await mkdir(dirname(file),{recursive:true});await writeFile(file,out);
 output.push({id,name,categories:["Gear"],iconPath:"/images/endfield/gear/releases/si/"+id+".webp",
  cacheStatus:"community-wiki-verified-numeric-id-pending",coverUrl:null,
  sourcePage:"https://endfield.wiki.gg/wiki/"+name.replaceAll(" ","_")});
 console.log("RELEASE_GEAR_WEBP",id,out.length);
}
await writeFile("src/data/endfield/catalog/si-release-gear.json",JSON.stringify({
 source:{provider:"Endfield Talos Wiki",snapshot:"2026-10-16",
  note:"Named 1.6 items unavailable from the numeric SKPORT item catalogue. Not verified blueprint records."},
 items:output},null,2)+"\n");
console.log("RELEASE_GEAR_MANIFEST",output.map(x=>({id:x.id,name:x.name,hasImage:!!x.iconPath})));
