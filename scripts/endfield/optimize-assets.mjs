#!/usr/bin/env node
/** Convert already downloaded static operator PNG/JPEG images to WebP.
 * Keep the original if the compressed variant is not smaller.
 * Never touches GIFs, videos or unreferenced external files.
 */
import sharp from "sharp";
import { readdir, stat, unlink, rename, rm } from "node:fs/promises";
import { join, extname } from "node:path";
const root="public/images/endfield/operators";
const inputTypes=new Set([".png",".jpg",".jpeg"]);
let saved=0,converted=0;
async function walk(dir){
  let list;
  try {list=await readdir(dir,{withFileTypes:true});}
  catch(e){if(e.code==="ENOENT")return;throw e;}
  for(const item of list){
    const file=join(dir,item.name);
    if(item.isDirectory()){await walk(file);continue;}
    if(!item.isFile()||!inputTypes.has(extname(item.name).toLowerCase()))continue;
    const oldSize=(await stat(file)).size;
    const newFile=file.slice(0,-extname(file).length)+".webp";
    const tmp=newFile+".tmp";
    try{
      await sharp(file).webp({quality:84,effort:5}).toFile(tmp);
      const newSize=(await stat(tmp)).size;
      if(newSize<oldSize){
        await rename(tmp,newFile);
        await unlink(file);
        saved+=oldSize-newSize;
        converted++;
        console.log("Optimiert:",file,"→",newFile,Math.round(newSize/1024)+" KiB");
      }else await rm(tmp,{force:true});
    }catch(error){
      await rm(tmp,{force:true});
      throw error;
    }
  }
}
await walk(root);
console.log("WebP konvertiert:",converted,"Einsparung:",(saved/1048576).toFixed(2),"MiB");
