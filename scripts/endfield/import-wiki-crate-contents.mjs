#!/usr/bin/env node
/**
 * Parse Gear Template Crate table icon links on the public Endfield Talos Wiki.
 * Rows list the exact piece names within each crate; hidden to plain-text
 * readers because they are represented by linked item ICONS.
 *
 * Never create a fake official SKPORT marker ID. Match to our previously
 * researched logical crate CLAIM ID only when area and landmark match.
 */
import {readFileSync,writeFileSync} from "node:fs";
import {classifyOfficialGearAcquisition} from "../../src/lib/endfield/storyAreas.mjs";
const WIKI="https://endfield.wiki.gg/wiki/Gear";
const MIRROR="https://r.jina.ai/https://endfield.wiki.gg/wiki/Gear";
const OUT="src/data/endfield/progression/blueprint-wiki-crate-contents.json";
const official=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8")).gear;
const claims=JSON.parse(readFileSync("src/data/endfield/progression/blueprint-community-claims.json","utf8")).claims;
const normalized=x=>String(x??"").toLowerCase().normalize("NFKD")
 .replace(/\u00e6/g,"ae").replace(/[\u0300-\u036f]/g,"")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
const byName=new Map(official.map(x=>[normalized(x.name),x]));
// The wiki's geographical rows currently represent 24 of the 27 official
// Wuling markers. These stable CLAIM IDs were researched earlier.
// Both area and a recognisable exact location fragment are checked.
const EXPECTED=[
 ["jingyu-valley-1","Stragglers Grove"],
 ["jingyu-valley-3","Sky King Flats"],
 ["jingyu-valley-4","Ecological Research Station"],
 ["jingyu-valley-2","Stragglers Ford"],
 ["wuling-city-5","Riverbank Grotto"],
 ["wuling-city-6","Field Logistics Depot"],
 ["wuling-city-7","Institute of Material"],
 ["wuling-city-8","Tianshi Bureau Academy"],
 ["wuling-city-1","Chenshan Way"],
 ["wuling-city-2","Bureau of Swordmancers"],
 ["wuling-city-3","Residential Area"],
 ["wuling-city-4","Monitoring Center"],
 ["qingbo-stockade-2","Causeway Trail"],
 ["qingbo-stockade-3","Bladewoods"],
 ["qingbo-stockade-1","Main Fort"],
 ["marker-stone-1","Watchtower Reservoir Station B1"],
 ["marker-stone-2","Watchtower Reservoir Station B1"],
 ["marker-stone-3","Marker Stone Interiors"],
 ["sword-vault-dale-1","South Gorge Rampart"],
 ["sword-vault-dale-2","North Gorge Crag"],
 ["yinglung-pass-1","Pass-Side Canal"],
 ["yinglung-pass-2","Stonepond Cliff"],
 ["snowy-forest-1","Hoarfrost Woods"],
 ["snowy-forest-2","Snowpriestess"]
];
const res=await fetch(MIRROR,{signal:AbortSignal.timeout(55000)});
if(!res.ok)throw Error("Wiki accessibility mirror HTTP "+res.status);
const text=await res.text();
const at=text.indexOf("## Gear Template Crate\n");
if(at<0)throw Error("Official Gear Template Crate heading not found in wiki");
const section=text.slice(at);
const lines=section.split(/\r?\n/).filter(x=>x.startsWith("| [![Image "));
if(lines.length!==24)throw Error("Gear Template Crate page structure changed: "+lines.length);
const crateRecords=[],pieceLinks=[];
for(let i=0;i<lines.length;i++){
 const parts=lines[i].split("|").slice(1,-1).map(s=>s.trim());
 if(parts.length!==3)throw Error("Gear template row has "+parts.length+" columns at "+i);
 const [gearCell,locationCell,materialCell]=parts;
 const [claimId,locationNeedle]=EXPECTED[i];
 const claim=claims.find(x=>x.id===claimId);
 if(!claim)throw Error("Missing previously referenced landmark claim "+claimId);
 if(!normalized(locationCell).includes(normalized(locationNeedle)))
   throw Error("Wiki row "+i+" location changed: "+locationCell+" expected "+locationNeedle);
 if(!normalized(locationCell).includes(normalized(claim.areaId.replaceAll("-"," ")).split(" ")[0]) &&
    !locationCell.includes("Qingbo Stockade")){/* area checked through locked table order + known unique landmark */}
 const names=[...gearCell.matchAll(/!\[Image\s+\d+:\s*([^\]]+)\]/g)]
   .map(x=>x[1].replace(/\.(png|jpg|webp)$/i,"").trim());
 if(!names.length||names.length>10)throw Error("Unexpected wiki icon gear count for "+claimId);
 const componentImage=[...materialCell.matchAll(/!\[Image\s+\d+:\s*([^\]]+)\]/g)]
   .map(x=>x[1].replace(/\.(png|jpg|webp)$/i,"").trim());
 const unresolved=[];
 const verifiedIds=[];
 for(const name of names){
   const g=byName.get(normalized(name));
   if(!g){unresolved.push(name);continue;}
   const kind=classifyOfficialGearAcquisition(g).kind;
   pieceLinks.push({gearId:String(g.id),gearName:g.name,claimId,areaId:claim.areaId,
     sourceName:name,sourceUrl:WIKI,
     sourceGearPage:"https://endfield.wiki.gg/wiki/"+encodeURIComponent(name.replaceAll(" ","_")),
     officialAcquisitionKind:kind,
     sourceKind:"community-wiki-explicit-piece-in-crate",
     agreesWithOfficialAcquisition:kind==="template-crate",
     officialMarkerId:null,
     evidence:"Explicit icon link in wiki row's Gears column, not a set-family guess"});
   verifiedIds.push(String(g.id));
 }
 crateRecords.push({claimId,areaId:claim.areaId,wikiLocation:locationCell,
   componentHints:componentImage,
   gearNames:names,gearIds:verifiedIds,
   unmatchedGearNames:unresolved,sourceUrl:WIKI,
   officialMarkerId:null,gearContentsSource:"community-wiki-linked-images"});
}
const collisions={};
for(const l of pieceLinks){const a=collisions[l.gearId]??=[];a.push(l.claimId);collisions[l.gearId]=a;}
const duplicates=Object.entries(collisions).filter(([,v])=>v.length>1).map(([gearId,crates])=>({gearId,crates}));
const snap={schemaVersion:1,snapshot:"2026-10-15",
 source:{site:"Endfield Talos Wiki",url:WIKI,retrieval:"Public r.jina.ai reader of icon-linked wiki table",
   accuracy:"Community-curated explicit item-icon links, not an official SKPORT loot manifest."},
 caution:"Do not infer an official SKPORT marker ID. Contents refer to logical researched crate landmarks; some Wiki item names may be duplicated or disagree with SKPORT/other community databases.",
 coverage:{rows:crateRecords.length,uniqueGearIds:new Set(pieceLinks.map(x=>x.gearId)).size,
   links:pieceLinks.length,matchedOfficialCrateLinks:pieceLinks.filter(x=>x.agreesWithOfficialAcquisition).length,
   officialAcquisitionConflicts:pieceLinks.filter(x=>!x.agreesWithOfficialAcquisition).length,
   duplicatedGearIds:duplicates.length,
   unresolvedNames:crateRecords.reduce((n,r)=>n+r.unmatchedGearNames.length,0)},
 crates:crateRecords,pieceLinks,duplicateItemConflicts:duplicates};
 if(snap.coverage.uniqueGearIds<65)throw Error("Wiki crate contents did not resolve to sufficient official IDs");
 writeFileSync(OUT,JSON.stringify(snap,null,2)+"\n");
 const byArea={};for(const c of crateRecords)byArea[c.areaId]=(byArea[c.areaId]||0)+1;
 console.log("WIKI_EXACT_CRATE_CONTENTS",JSON.stringify({coverage:snap.coverage,byArea,
 duplicates,unknown:crateRecords.filter(x=>x.unmatchedGearNames.length).map(x=>({claim:x.claimId,names:x.unmatchedGearNames})),
 officialAcquisitionConflicts:pieceLinks.filter(x=>!x.agreesWithOfficialAcquisition).slice(0,30).map(x=>({id:x.gearId,name:x.gearName,kind:x.officialAcquisitionKind,claim:x.claimId})),
 exampleCrates:crateRecords.slice(0,4).map(x=>({id:x.claimId,location:x.wikiLocation,names:x.gearNames}))}));
