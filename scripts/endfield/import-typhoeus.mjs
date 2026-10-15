#!/usr/bin/env node
/**
 * Offline import for one saved PUBLIC SKPORT Typhoeus response and associated
 * public item-name lookup. Outputs versionable JSON without a database.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { inspectSkport, TYPHOEUS, selectWikiItem } from "./skport-extract.mjs";
import { extractExtras } from "./skport-extras.mjs";

const slots=["basic","battle","combo","ultimate"];

export function normalizeSkills(result,snapshot) {
  if(result.status!=="validated-structure")throw Error("Skill-Daten strukturell unvollständig: "+result.diagnostics.issues.join(" | "));
  const info=result.operatorInfo;
  const rarity=Number(String(info.rarity?.name??"").match(/[1-6]/)?.[0]);
  if(!rarity)throw Error("Seltenheit nicht eindeutig aus den SKPORT-Tags ableitbar.");
  const ordered=TYPHOEUS.expectedTabs.map(({name})=>result.skills.find(skill=>skill.name===name));
  if(ordered.some(skill=>!skill))throw Error("Mindestens eine erwartete Fertigkeit fehlt.");
  const ranks=ordered[0].levels.map(level=>level.rank);
  if(ranks.length!==12||ordered.some(skill=>skill.levels.length!==12))throw Error("Rang/Mastery-Tabelle unvollständig.");
  return {
    schemaVersion:1,
    source:{provider:"SKPORT Wiki",itemId:info.id,language:info.language,snapshot},
    operator:{
      id:info.id,slug:info.slug,name:info.name,rarity,
      element:info.element?.name??"",class:info.class?.name??"",
      weaponType:info.weaponType?.name??"",faction:info.faction?.name??"",
      coverUrl:info.coverUrl,illustrationUrl:info.illustrationUrl
    },
    ranks,
    skills:ordered.map((skill,i)=>({
      slot:slots[i],name:skill.name,type:skill.type,iconUrl:skill.iconUrl,
      description:skill.descriptionSections.map(s=>s.text).join("\n\n"),
      metrics:skill.metrics.map(metric=>[metric.name,...metric.values])
    }))
  };
}

function publicItemIndex(raw) {
  if(!Array.isArray(raw))throw Error("Netzwerkmitschnitt als JSON-Array benötigt.");
  const records=raw.filter(r=>r.status===200 && typeof r.url==="string" &&
    /\/web\/v1\/wiki\/item\/list(?:\?|$)/.test(r.url));
  if(records.length!==1)throw Error("Genau eine öffentliche SKPORT-Itemliste erforderlich.");
  const entries=records[0].response?.data?.items;
  if(!entries||typeof entries!=="object")throw Error("Leere SKPORT-Itemliste.");
  return entries;
}

export function buildOperatorExports(raw,snapshot) {
  const item=selectWikiItem(raw);
  const skills=inspectSkport(item);
  const main=normalizeSkills(skills,snapshot);
  const extras=extractExtras(item,publicItemIndex(raw),snapshot);
  if(main.operator.id!==extras.source.itemId || main.operator.slug!==extras.operator){
    throw Error("Operator-ID zwischen Skill- und Progressionsdaten unterscheidet sich.");
  }
  return {main,extras};
}

async function main(){
  const args=process.argv.slice(2);
  const arg=k=>args.includes(k)?args[args.indexOf(k)+1]:undefined;
  const input=arg("--input"),snapshot=arg("--snapshot"),outDir=arg("--out-dir");
  if(!input||!outDir||!snapshot||!/^\d{4}-\d{2}-\d{2}$/.test(snapshot)){
    throw Error("Usage: node scripts/endfield/import-typhoeus.mjs --input local-data/skport/snapshot.json --snapshot YYYY-MM-DD --out-dir src/data/endfield/operators");
  }
  const raw=JSON.parse(await readFile(resolve(input),"utf8"));
  const {main,extras}=buildOperatorExports(raw,snapshot);
  await mkdir(resolve(outDir),{recursive:true});
  for(const [name,value] of [
    ["typhoeus.json",main],["typhoeus.extra.json",extras]
  ]){
    await writeFile(join(resolve(outDir),name),JSON.stringify(value,null,2)+"\n");
    console.log("Exportiert:",name);
  }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  main().catch(error=>{console.error(error.message);process.exitCode=1;});
}
