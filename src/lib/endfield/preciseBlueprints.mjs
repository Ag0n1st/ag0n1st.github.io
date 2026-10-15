/**
 * Evidence-based crate resolution, by OFFICIAL SKPORT gear ID.
 * The Wiki's explicit icon list is tied to a researched logical crate,
 * while Endfield Hub offers a second independent piece-level source.
 *
 * NEVER turn candidates into ownership, story access or an official SKPORT
 * marker-id association. Conflicts are preserved, not silently reconciled.
 */
const normalize=s=>String(s??"").toLowerCase().normalize("NFKD")
 .replace(/\u00e6/g,"ae").replace(/[\u0300-\u036f]/g,"")
 .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
const hubPatterns=[
 ["wuling-city",[
  ["monitoring center","wuling-city-4"],
  ["field logistics depot","wuling-city-6"],
  ["riverbank grotto","wuling-city-5"],
  ["institute of materials science","wuling-city-7"],
  ["chenshan way","wuling-city-1"],
  ["bureau of swordmancers","wuling-city-2"],
  ["residential area","wuling-city-3"],
  ["citizen square","wuling-city-8"],
 ]],
 ["jingyu-valley",[["stragglers ford","jingyu-valley-2"],["sky king flats","jingyu-valley-3"],
  ["ecological research station","jingyu-valley-4"],["gloomvale","jingyu-valley-1"]]],
 ["qingbo-stockade",[["main fort","qingbo-stockade-1"],["nw of bladewoods","qingbo-stockade-2"],
  ["bladewoods","qingbo-stockade-3"]]]
];
export function matchHubLandmarkToLogicalCrate(source){
 if(!source?.areaId||!source.landmark)return null;
 const pairs=hubPatterns.find(([area])=>area===source.areaId)?.[1]??[];
 const text=normalize(source.landmark);
 return pairs.find(([fragment])=>text.includes(fragment))?.[1]??null;
}
export function compilePreciseGearEvidence(officialGear,hubSnapshot,wikiSnapshot,claims){
 const byHub=new Map(hubSnapshot.entries.map(x=>[String(x.gearId),x]));
 const wikiByGear=new Map();
 const byClaim=new Map(claims.claims.map(x=>[x.id,x]));
 for(const link of wikiSnapshot.pieceLinks){
   const list=wikiByGear.get(link.gearId)??[];
   list.push(link);wikiByGear.set(link.gearId,list);
 }
 const records=officialGear.map(gear=>{
   const id=String(gear.id),hub=byHub.get(id),wiki=wikiByGear.get(id)??[];
   const officialKind=hub?.officialAcquisitionKind??"unknown";
   const wikiSource="https://endfield.wiki.gg/wiki/Gear";
   const hubSource="https://endfieldhub.org/database/gears";
   const wikiLinks=wiki.map(x=>({
     claimId:x.claimId,areaId:x.areaId,
     landmark:byClaim.get(x.claimId)?.landmark??null,
     gearItemName:x.gearName,source:wikiSource,
     markerId:null,officialAcquisitionAgrees:x.agreesWithOfficialAcquisition
   }));
   const hubClaimId=matchHubLandmarkToLogicalCrate(hub);
   const hubLink=hub?.source==="missing" ? null:
     hub?.communitySource?.sourceText?
       {areaId:hub.areaId,landmark:hub.landmark,claimId:hubClaimId,
        itemName:hub.communitySource.originalName,
        sourceText:hub.communitySource.sourceText,source:hubSource,
        officialAcquisitionAgrees:hub.acquisition===officialKind}
       :null;
   const problems=[];
   if(wikiLinks.some(x=>!x.officialAcquisitionAgrees))
     problems.push("wiki-vs-official-acquisition");
   if(wikiLinks.length>1)problems.push("same-piece-in-several-wiki-crates");
   if(hubLink&&!hubLink.officialAcquisitionAgrees)
     problems.push("hub-vs-official-acquisition");
   if(wikiLinks.length===1&&hubLink?.areaId&&hubLink.claimId&&
      wikiLinks[0].claimId!==hubLink.claimId)
     problems.push("hub-vs-wiki-specific-crate");
   let status;
   if(officialKind!=="template-crate"){
     status=problems.length?"acquisition-conflict":"not-a-template-crate";
   }else if(problems.length){
     status="source-conflict";
   }else if(wikiLinks.length===1&&hubLink?.areaId &&
         wikiLinks[0].claimId===hubLink.claimId){
     status="two-source-exact-piece";
   }else if(wikiLinks.length===1){
     status="wiki-exact-piece";
   }else if(hubLink?.areaId){
     status="hub-exact-piece";
   }else status="unresolved";
   const preferred=(status==="two-source-exact-piece"||status==="wiki-exact-piece")
     ?wikiLinks[0]
     :status==="hub-exact-piece"?hubLink:null;
   return {gearId:id,name:gear.name,officialAcquisitionKind:officialKind,status,
     exactLogicalCrateId:preferred?.claimId??null,
     exactAreaId:preferred?.areaId??null,
     locality:preferred?.landmark??null,
     wikiItemLinks:wikiLinks,hubItemLink:hubLink,
     conflictingEvidence:problems,
     officialMarkerId:null,blueprintOwned:false,
     unlockImplication:"none",
     citationUrls:[
       ...(wikiLinks.length?[wikiSource]:[]),
       ...(hubLink?[hubSource]:[])
     ]};
 });
 const counts={};for(const x of records)counts[x.status]=(counts[x.status]??0)+1;
 const officialCrates=records.filter(x=>x.officialAcquisitionKind==="template-crate");
 return {schemaVersion:1,snapshot:"2026-10-15",
  sourceMetadata:{officialGear:"SKPORT Wiki",
    exactIconLinks:wikiSnapshot.source,
    perPieceLabels:hubSnapshot.provenance,
    statusPolicy:"Item-specific community evidence, not proof of official SKPORT marker or actual collection"},
  coverage:{total:records.length,officialCrateGear:officialCrates.length,
   ...counts,withLogicalCrate:officialCrates.filter(x=>x.exactLogicalCrateId!==null).length,
   unresolvedCrates:officialCrates.filter(x=>x.status==="unresolved").length,
   disputedCrates:officialCrates.filter(x=>x.status==="source-conflict").length},
  entries:records};
}
