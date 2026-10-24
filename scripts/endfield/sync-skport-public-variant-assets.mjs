#!/usr/bin/env node
/**
 * Use ONLY already-normalized, public SKPORT item/info source references to
 * add previously unrecorded official variant icons, without duplicating art.
 */
import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {pathToFileURL} from "node:url";
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import {saveImages} from "./import-public-skport-all.mjs";

async function main(){
 const args=process.argv.slice(2);
 if(args.length!==2||args[0]!=="--slug")throw Error("Usage: --slug <existing-operator-id>");
 const op=roster.operators.find(x=>x.id===args[1]);
 if(!op)throw Error("Unknown operator");
 const main=JSON.parse(await readFile(resolve("src/data/endfield/operators/"+op.id+".json"),"utf8"));
 if(main.source?.provider!=="SKPORT Wiki"||main.operator.id!==op.itemId)
   throw Error("No verified, matching public SKPORT data");
 const variants=main.skillVariants??{};
 const expected=Object.entries(variants).flatMap(([name,skills])=>
   skills.map(skill=>"skills/skill-"+skill.slot+"-"+name+".webp"));
 if(!expected.length)throw Error("No additional public skill variant graphics registered");
 const assets=await saveImages(op,{main});
 const byPath=new Map(assets.map(x=>[x.type,x]));
 for(const name of expected){
   if(!["saved","already-cached"].includes(byPath.get(name)?.status))
     throw Error("Official variant graphic missing: "+name+" "+(byPath.get(name)?.reason??""));
 }
 console.log("SKPORT_PUBLIC_VARIANT_ASSETS",JSON.stringify({
   slug:op.id,expected:expected.length,results:expected.map(name=>byPath.get(name))
 }));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)
 main().catch(error=>{console.error(error.message);process.exitCode=2});
