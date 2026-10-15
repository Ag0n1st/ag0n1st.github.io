#!/usr/bin/env node
/**
 * Hard limit on Endfield's tracked project files (not only images).
 * Decimal 100 MB = 100,000,000 bytes.
 * Git history, third-party tooling and GitHub Pages infrastructure
 * are outside the scope of a working-tree filesystem budget.
 */
import { readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
const MAX_BYTES = 100_000_000;
const folders = [
  "public/images/endfield",
  "src/data/endfield",
  "src/content/operator-guides",
  "src/pages/endfield",
  "src/components/operator",
  "src/components/endfield",
  "src/lib/endfield",
  "scripts/endfield",
];
const files = ["src/styles/operator-guides.css","src/components/EndfieldNav.astro"];
async function sizeOf(path) {
  let info;
  try { info=await stat(path); }
  catch(error) { if(error.code==="ENOENT")return {size:0,count:0};throw error; }
  if(info.isFile())return {size:info.size,count:1};
  if(!info.isDirectory())return {size:0,count:0};
  let size=0,count=0;
  for (const entry of await readdir(path)) {
    const child=await sizeOf(join(path,entry));
    size+=child.size;count+=child.count;
  }
  return {size,count};
}
export async function endfieldBudget() {
  const groups={};
  let total=0,filesCount=0;
  for(const path of [...folders,...files]){
    const value=await sizeOf(resolve(path));
    groups[path]=value;
    total+=value.size;filesCount+=value.count;
  }
  return {limitBytes:MAX_BYTES,bytes:total,files:filesCount,remainingBytes:MAX_BYTES-total,
    percent:Math.round(total/MAX_BYTES*10000)/100,groups};
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  const result=await endfieldBudget();
  console.log("ENDFIELD_BUDGET",JSON.stringify(result));
  if(result.bytes>MAX_BYTES){
    console.error("Endfield 100 MB budget exceeded. No publication permitted.");
    process.exitCode=1;
  }
}
