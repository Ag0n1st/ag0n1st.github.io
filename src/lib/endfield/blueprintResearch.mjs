import {classifyOfficialGearAcquisition} from "./storyAreas.mjs";
/**
 * Join unofficial *candidate* crate rewards with official Gear IDs and
 * official SKPORT map AREAS. Exact crate->gear links stay unverified.
 */
const normalized=v=>String(v??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
  .replace(/æ/gi,"ae").replace(/[^a-z0-9]+/gi," ").toLowerCase().trim().replace(/\s+/g," ");
export function matchCommunityClaimToGear(claim,gear){
 if(classifyOfficialGearAcquisition(gear).kind!=="template-crate")return null;
 for(const r of claim.rewards??[]){
   if(r.type==="piece"&&normalized(r.name)===normalized(gear.name))
     return {kind:"named-piece",reward:r.name};
 }
 for(const r of claim.rewards??[]){
   if(r.type!=="set")continue;
   const n=normalized(r.name),set=normalized(gear.setName),name=normalized(gear.name);
   const prefix=n==="mi security t1"?"mi security":n;
   if((set===prefix||(set===""&&name.startsWith(prefix+" ")))&&
     (!n.endsWith(" t1")||/\bt1\b/i.test(gear.name)))
       return {kind:"set-family",reward:r.name};
 }
 return null;
}
export function validateCommunityClaims(research,registry,crates){
 if(research?.schemaVersion!==1||!Array.isArray(research.claims)||!Array.isArray(research.sources))
   throw Error("Unsupported blueprint research");
 const areaIds=new Set(registry.areas.map(x=>x.id));
 const sourceIds=new Set(research.sources.map(x=>x.id));
 const ids=new Set();
 for(const claim of research.claims){
   if(ids.has(claim.id)||!areaIds.has(claim.areaId))throw Error("Unknown/duplicate claim "+claim.id);
   if(claim.officialMarkerId!==null||claim.markerMatching!=="not-verified")
     throw Error("Unverified exact crate association "+claim.id);
   if(!claim.sourceIds?.length||claim.sourceIds.some(s=>!sourceIds.has(s)))
     throw Error("Missing community source "+claim.id);
   if(!crates.markers.some(x=>x.areaId===claim.areaId))
     throw Error("No official template crate marker in "+claim.areaId);
   ids.add(claim.id);
 }
 if(ids.size!==27||crates.markers.length!==27)
   throw Error("Unexpected crate/claim count; review required");
 return true;
}
export function createBlueprintResearchIndex(research,registry,crates,gearList){
 validateCommunityClaims(research,registry,crates);
 const markersByArea=new Map();
 for(const marker of crates.markers){
   const arr=markersByArea.get(marker.areaId)??[];
   arr.push(marker.markerId);markersByArea.set(marker.areaId,arr);
 }
 const claims=research.claims.map(x=>({
   claimId:x.id,areaId:x.areaId,landmark:x.landmark,sourceIds:x.sourceIds,
   confidence:x.confidence,rewardHints:x.rewards,
   exactMarkerId:null,possibleMarkerIds:markersByArea.get(x.areaId)??[],
   gearIdsVerified:false
 }));
 const gearHints=gearList.map(g=>{
  const officialKind=classifyOfficialGearAcquisition(g).kind;
  const links=research.claims.flatMap(c=>{
   const hit=matchCommunityClaimToGear(c,g);
   return hit?[{claimId:c.id,areaId:c.areaId,matchKind:hit.kind,rewardHint:hit.reward,
     sourceIds:c.sourceIds,confidence:c.confidence,exactMarkerId:null,verified:false}]:[];
  });
  const areas=[...new Set(links.map(x=>x.areaId))];
  return {gearId:String(g.id),gearName:g.name,setName:g.setName??null,
   officialAcquisitionKind:officialKind,
   status:!links.length?"unverified":areas.length>1?"ambiguous-community-candidates":"community-area-candidate",
   candidateAreas:areas,candidateLinks:links,
   verifiedCrateMarkerId:null,manualReviewNeeded:true};
 });
 return {schemaVersion:1,snapshot:research.snapshot,
  provenance:"Community-derived candidate links, not official proof of a specific Gear Template Crate reward.",
  accessPolicy:"Never mark a blueprint acquired or a build accessible using this research alone.",
  coverage:{gear:gearHints.length,templateCrateGear:gearHints.filter(x=>x.officialAcquisitionKind==="template-crate").length,
    withCandidate:gearHints.filter(x=>x.candidateLinks.length).length,
    ambiguous:gearHints.filter(x=>x.candidateAreas.length>1).length,
    unmatchedTemplateGear:gearHints.filter(x=>x.officialAcquisitionKind==="template-crate"&&!x.candidateLinks.length).length,
    totalClaims:claims.length,rewardClaims:claims.filter(x=>x.rewardHints.length).length,markers:crates.markers.length},
  claims,gearHints};
}
export function findBlueprintCandidates(index,gearId){
 return index?.gearHints?.find(g=>g.gearId===String(gearId))??null;
}
