#!/usr/bin/env node
/**
 * Read-only audit of the complete v1.6 gear inventory against the latest
 * ANONYMOUS SKPORT snapshot. Uses only our own normalized local manifest.
 * Never infers official IDs from internal item_equip_* names or matching icons.
 */
import {readFileSync} from "node:fs";
const manifest=JSON.parse(readFileSync("src/data/endfield/catalog/v16-gear.json","utf8"));
const official=JSON.parse(readFileSync("src/data/endfield/catalog/items.json","utf8"));
if(manifest.version!=="1.6"||manifest.items.length!==18)throw Error("Expected 18 version 1.6 items");
const norm=s=>String(s).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const gear=official.items.filter(row=>row.categories.includes("Gear"));
const ids=new Map();
for(const item of gear){
 const key=norm(item.name);
 const rows=ids.get(key)||[];rows.push(item);ids.set(key,rows);
}
const entries=manifest.items.map(item=>{
 const found=ids.get(norm(item.name))||[];
 return {slug:item.id,name:item.name,set:item.gearSet,slot:item.slot,
  skport:found.length===1?{id:found[0].id,name:found[0].name,iconPath:found[0].iconPath}:null,
  status:found.length===1?"exact-name-match-only":found.length>1?"ambiguous":"not-found",
  matches:found.length};
});
if(new Set(manifest.items.map(i=>i.id)).size!==18)throw Error("Duplicate v1.6 release slug");
for(const item of manifest.items){
 if(!item.name||!item.sourcePage||!item.gearSet||!["Armor","Gloves","Kit"].includes(item.slot))
   throw Error("Incomplete 1.6 entry "+item.id);
}
console.log("V16_OFFICIAL_CATALOG_AUDIT",JSON.stringify({
 officialSnapshot:official.source.snapshot,totalOfficialItems:official.items.length,
 gearItems:gear.length,releaseItems:entries.length,
 exactNames:entries.filter(x=>x.status==="exact-name-match-only").length,
 ambiguous:entries.filter(x=>x.status==="ambiguous").length,
 missing:entries.filter(x=>x.status==="not-found").length,entries}));
