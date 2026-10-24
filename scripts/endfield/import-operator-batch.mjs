#!/usr/bin/env node
/**
 * Batch-import PUBLIC, sanitized SKPORT /web/v1/wiki/item/info captures.
 *
 * Does not generate signatures, authenticate, scrape accounts or call the
 * network. Never commit raw captures, cookies, cred, salt or session headers.
 *
 * Usage:
 * node scripts/endfield/import-operator-batch.mjs \
 *  --capture-dir /private/public-skport-items \
 *  --items /private/public-item-index.json \
 *  --snapshot 2026-10-24 \
 *  --out-dir src/data/endfield/operators [--dry-run]
 *
 * Capture filenames are the official numeric IDs, e.g. 1.json, 615.json.
 * The existing single-operator importer remains the source of truth.
 */
import {readdir,readFile,stat,mkdir,writeFile} from "node:fs/promises";
import {join,resolve} from "node:path";
import {pathToFileURL} from "node:url";
import {importOperator} from "./import-operator.mjs";
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};

const clean=s=>String(s??"");
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&
  !Number.isNaN(Date.parse(s+"T00:00:00Z")) &&
  new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
export function batchCandidates(operators,files,snapshot){
  const available=new Set(files);
  return operators
    .filter(op=>!op.availableFrom||op.availableFrom<=snapshot)
    .filter(op=>available.has(op.itemId+".json"))
    .map(op=>({id:op.itemId,slug:op.id,file:op.itemId+".json"}));
}
async function run(){
  const argv=process.argv.slice(2), flag=name=>argv.includes(name)?argv[argv.indexOf(name)+1]:undefined;
  const captureDir=flag("--capture-dir"),itemsFile=flag("--items"),
    snapshot=flag("--snapshot"),out=flag("--out-dir");
  const dryRun=argv.includes("--dry-run");
  if(!captureDir||!itemsFile||!validDate(snapshot)||!out)
    throw Error("Provide --capture-dir, --items, --snapshot YYYY-MM-DD and --out-dir. Optional --dry-run.");
  const inDir=resolve(captureDir), outDir=resolve(out);
  if(inDir===outDir)throw Error("Input captures and public output must be separate directories");
  const itemIndex=JSON.parse(await readFile(resolve(itemsFile),"utf8"));
  // Source index is publicly accessible; do not accept login/cookie-shaped exports.
  if(!itemIndex||typeof itemIndex!=="object"||Array.isArray(itemIndex))
    throw Error("Items index must be a public item-ID lookup map");
  const existing=await readdir(outDir).catch(error=>error.code==="ENOENT"?[]:Promise.reject(error));
  const captured=await readdir(inDir);
  const byId=new Set(roster.operators.map(op=>op.itemId+".json"));
  for(const file of captured.filter(f=>f.endsWith(".json")))
    if(!byId.has(file))throw Error("Unexpected operator capture; compare public item ID: "+file);
  const allowed=batchCandidates(roster.operators,captured,snapshot);
  if(!allowed.length)throw Error("No released-operator public item/info captures found; nothing imported");
  const staged=[];
  for(const {id,slug,file} of allowed){
    if(existing.includes(slug+".json")||existing.includes(slug+".extra.json"))
      throw Error("Refusing to overwrite an existing official import for "+slug);
    const src=join(inDir,file);
    const stats=await stat(src);
    if(!stats.isFile()||stats.size>3_000_000)throw Error("Invalid or oversized capture "+file);
    const text=await readFile(src,"utf8");
    // Avoid accidental secrets in project inputs. Raw captures never written to repo.
    if(/"(?:cookie|authorization|account_token|cred|salt|accessToken)"\s*:/i.test(text))
      throw Error("Secret/header field detected in "+file+"; provide only public item/info response");
    const data=JSON.parse(text);
    const result=importOperator(data,itemIndex,{itemId:id,slug,snapshot});
    if(result.main.operator.slug!==slug||result.extras.operator!==slug)
      throw Error("Import ID/slug mismatch for "+file);
    staged.push({slug,main:result.main,extras:result.extras});
  }
  const notCaptured=roster.operators.filter(op=>
    !existing.includes(op.id+".json") &&
    !staged.some(x=>x.slug===op.id) &&
    (!op.availableFrom||op.availableFrom<=snapshot)).map(x=>x.id);
  console.log(JSON.stringify({dryRun,ready:staged.map(x=>x.slug),missing:notCaptured,alreadyImported:existing.filter(x=>x.endsWith(".extra.json")).length},null,2));
  if(dryRun)return;
  // All captured sources validated in-memory BEFORE writing any normalized pair.
  await mkdir(outDir,{recursive:true});
  for(const {slug,main,extras} of staged){
    await writeFile(join(outDir,slug+".json"),JSON.stringify(main,null,2)+"\n",{flag:"wx"});
    await writeFile(join(outDir,slug+".extra.json"),JSON.stringify(extras,null,2)+"\n",{flag:"wx"});
  }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)
  run().catch(e=>{console.error(e.message);process.exitCode=1;});
