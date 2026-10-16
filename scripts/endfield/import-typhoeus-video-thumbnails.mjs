#!/usr/bin/env node
/** One-time bounded WebP caching for public YouTube guide thumbnails.
 * Do not download video/media or fetch thumbnails at website build time.
 */
import sharp from "sharp";
import {mkdir,writeFile} from "node:fs/promises";
import {resolve} from "node:path";
const ids=["wNVJkGzkfMg","Zw8B2F2nJP8","uixHyNlbwAQ"];
const folder=resolve("public/images/endfield/video-thumbnails");
await mkdir(folder,{recursive:true});
for(const id of ids){
  if(!/^[A-Za-z0-9_-]{11}$/.test(id))throw Error("Unsafe ID");
  const url="https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";
  const r=await fetch(url,{signal:AbortSignal.timeout(25000)});
  if(!r.ok || !r.headers.get("content-type")?.toLowerCase().startsWith("image/jpeg"))
    throw Error("YouTube thumbnail could not be verified for "+id+": "+r.status);
  const input=Buffer.from(await r.arrayBuffer());
  if(input.length<1000||input.length>2_000_000)throw Error("Unexpected image size");
  const meta=await sharp(input).metadata();
  if(meta.width<320||meta.height<170)throw Error("Thumbnail resolution too small: "+id);
  const output=await sharp(input).resize(320,180,{fit:"cover"}).webp({quality:70,effort:6}).toBuffer();
  if(output.length>75_000)throw Error("Thumbnail exceeds 75 KB");
  await writeFile(resolve(folder,id+".webp"),output);
  console.log("THUMB_WEBP",JSON.stringify({id,originalBytes:input.length,webpBytes:output.length,width:320,height:180}));
}
