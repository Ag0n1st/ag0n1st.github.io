#!/usr/bin/env node
/**
 * Item-level public community Gear acquisition table (Endfield Hub).
 *
 * Official SKPORT Gear IDs, acquisition types and local icon paths are NEVER
 * replaced. We only add independently attributed and explicitly provisional
 * single-piece acquisition location hints from the community source.
 *
 * Jina AI reader is a public accessibility text mirror; we retain original
 * publisher URL and access provenance. No accounts, cookies, media or assets.
 */
import {readFileSync,writeFileSync} from "node:fs";
import {classifyOfficialGearAcquisition} from "../../src/lib/endfield/storyAreas.mjs";

const SOURCE_URL="https://endfieldhub.org/database/gears";
const READER_URL="https://r.jina.ai/https://endfieldhub.org/database/gears";
const DATE="2026-10-15";
const outfile="src/data/endfield/progression/gear-piece-acquisition-sources.json";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const official=read("src/data/endfield/catalog/equipment-details.json").gear;
const claims=read("src/data/endfield/progression/blueprint-community-claims.json").claims;
const normalize=v=>String(v??"").toLowerCase().normalize("NFKD")
 .replace(/\u00e6/g,"ae").replace(/[\u0300-\u036f]/g,"")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");

export function parsePieceSources(markdown){
  const lines=markdown.split(/\r?\n/),rows=[],invalid=[];
  for(const line of lines){
    let value=line;
    if(value.startsWith("![")){
      const image=/^!\[Image\s+\d+:\s*[^\]]+\]\([^)]+\)/.exec(value);
      if(!image)continue;
      value=value.slice(image[0].length);
    }else if(!/\b(Armor|Gloves|Kit)[★☆]{5}/.test(value))continue;
    const parts=/^(.+?)\s+(Armor|Gloves|Kit)[★☆]{5}/.exec(value);
    const version=/\bv(\d+\.\d+)\s*(.*)$/.exec(value);
    if(!parts||!version){invalid.push(line.slice(0,200));continue;}
    rows.push({name:parts[1].trim(),slot:parts[2],version:"v"+version[1],
      source:version[2].trim()});
  }
  if(rows.length!==261||invalid.length)throw Error("Unrecognized Endfield Hub format: "+rows.length+" rows, "+invalid.length+" malformed");
  const unique=new Set(rows.map(x=>normalize(x.name)));
  if(unique.size!==261)throw Error("Duplicated item names in public table");
  return rows;
}

const AREA_SOURCES=[
 ["Jingyu Valley","jingyu-valley"],
 ["Wuling City","wuling-city"],
 ["Qingbo Stockade","qingbo-stockade"],
 ["Marker Stone Interiors","marker-stone-interiors"],
 ["Marker Stone","marker-stone"],
 ["Sword Vault Dale","sword-vault-dale"],
 ["Yinglung Pass","yinglung-pass"],
 ["Snowy Forest","snowy-forest"],
 ["Si's Painting","sis-painting"]
];
function classifyExternal(source){
 for(const [prefix,areaId] of AREA_SOURCES){
   if(source===prefix||source.startsWith(prefix+" - "))
     return {acquisition:"template-crate",areaId,
       landmark:source.slice(prefix.length).replace(/^\s*-\s*/,"").trim()||null};
 }
 if(/^Purchase: Wuling Stock Redistribution|^Wuling Stock Redistribution/.test(source))
   return {acquisition:"regional-stock-redistribution",areaId:null,landmark:null};
 if(/^Authority Level-Up Reward/.test(source))
   return {acquisition:"authority-level-reward",areaId:null,landmark:null};
 return {acquisition:"unknown",areaId:null,landmark:null};
}
const reader=await fetch(READER_URL,{signal:AbortSignal.timeout(55000)});
if(reader.status!==200)throw Error("Public reader HTTP "+reader.status);
const markdown=await reader.text();
const rows=parsePieceSources(markdown);
const byName=new Map(rows.map(row=>[normalize(row.name),row]));
const matched=new Set(),results=[],unexpected=[];
for(const entry of official){
  const row=byName.get(normalize(entry.name));
  const officialKind=classifyOfficialGearAcquisition(entry).kind;
  if(!row){
    results.push({gearId:String(entry.id),name:entry.name,status:"not-covered",
      officialAcquisitionKind:officialKind});continue;
  }
  matched.add(normalize(row.name));
  const source=classifyExternal(row.source);
  const contradiction=source.acquisition!=="unknown"&&
    source.acquisition!==officialKind;
  // A specifically named single-item reward in a DIFFERENT area is
  // a reason for manual review, even if both community pages look credible.
  const competing=claims.flatMap(claim=>claim.rewards
   .filter(r=>r.type==="piece"&&normalize(r.name)===normalize(entry.name)
     &&claim.areaId!==source.areaId)
   .map(()=>({claimId:claim.id,areaId:claim.areaId})));
  const status=!row.source?"unavailable-in-source":
    contradiction?"source-conflict":
    source.acquisition==="template-crate"&&competing.length?"conflicting-community-sources":
    source.acquisition==="template-crate"?"piece-specific-location":
    "individually-listed-non-crate";
  results.push({gearId:String(entry.id),name:entry.name,
    officialAcquisitionKind:officialKind,status,
    communitySource:{provider:"Endfield Hub",url:SOURCE_URL,version:row.version,
      originalName:row.name,sourceText:row.source},
    acquisition:source.acquisition,areaId:source.areaId,landmark:source.landmark,
    itemNameMatch:"exact-normalized",
    conflictsWithNamedPieceClaims:competing,
    verifiedOfficialMarkerId:null,actualBlueprintPossession:"unknown"});
}
for(const row of rows)if(!matched.has(normalize(row.name)))unexpected.push(row);
const aggregate={};
for(const row of results)aggregate[row.status]=(aggregate[row.status]||0)+1;
const snapshot={
 schemaVersion:1,snapshot:DATE,
 provenance:{source:SOURCE_URL,accessMethod:"Public third-party text mirror r.jina.ai",
  reason:"Primary site challenges scripted access; mirror transcribes public per-item source table.",
  label:"Item-spezifischer Community-Nachweis, nicht offiziell bestätigter Kisteninhalt",
  originalPublicRows:rows.length,
  officialGearRecords:official.length,
  noUnprovenMarkerClaims:true,
  downloadedImages:0},
 coverage:{...aggregate,
  individuallyNamedTemplateLocations:results.filter(x=>x.status==="piece-specific-location").length,
  conflicts:results.filter(x=>x.status==="source-conflict"||x.status==="conflicting-community-sources").length,
  missingCommunitySource:results.filter(x=>x.status==="unavailable-in-source"||x.status==="not-covered").length},
 entries:results,
 unmatchedCommunityRows:unexpected.map(x=>({name:x.name,version:x.version,source:x.source}))
};
if(snapshot.entries.length!==258||snapshot.coverage.individuallyNamedTemplateLocations<45)
 throw Error("Detailed source coverage unexpectedly low: "+JSON.stringify(snapshot.coverage));
writeFileSync(outfile,JSON.stringify(snapshot,null,2)+"\n");
const locations={};
for(const row of results){
 if(row.status==="piece-specific-location")
   locations[row.areaId]=(locations[row.areaId]||0)+1;
}
console.log("EXACT_GEAR_LOCATION_IMPORT",JSON.stringify({
 coverage:snapshot.coverage,areas:locations,unmatched:unexpected,
 conflicting:results.filter(x=>x.status==="source-conflict"||
   x.status==="conflicting-community-sources").map(x=>({id:x.gearId,name:x.name,
   official:x.officialAcquisitionKind,community:x.communitySource?.sourceText,
   conflict:x.conflictsWithNamedPieceClaims})).slice(0,35),
 samples:results.filter(x=>x.status==="piece-specific-location").slice(0,16)
 .map(x=>({id:x.gearId,name:x.name,area:x.areaId,landmark:x.landmark}))}));
