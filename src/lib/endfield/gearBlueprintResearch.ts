import researchIndex from "../../data/endfield/progression/blueprint-research-index.json";
import officialAreas from "../../data/endfield/progression/story-areas.json";
import communityClaims from "../../data/endfield/progression/blueprint-community-claims.json";
import confirmed from "../../data/endfield/progression/blueprint-confirmations.json";
import officialCrates from "../../data/endfield/progression/gear-template-crates.json";
import {getVerifiedBlueprintLink} from "./blueprintConfirmations.mjs";

const index=new Map(researchIndex.gearHints.map(x=>[x.gearId,x]));
const areaNames=new Map(officialAreas.areas.map(x=>[x.id,x.displayNameDe]));
const sources=new Map(communityClaims.sources.map(x=>[x.id,x]));
const claimsById=new Map(communityClaims.claims.map(x=>[x.id,x]));
export function getGearBlueprintResearch(id:string|number){
 const record=index.get(String(id));
 if(!record)return null;
 const actual=getVerifiedBlueprintLink(confirmed,String(id),officialCrates);
 if(actual.length){
  return {status:"owner-confirmed" as const,kind:record.officialAcquisitionKind,
   areas:[...new Set(actual.map(x=>x.areaId).filter(Boolean))].map(a=>({id:a,name:areaNames.get(a)||a})),
   sources:[],claims:[],confirmedMarkerIds:actual.map(x=>x.markerId)};
 }
 const links=record.candidateLinks;
 const info=links.map(x=>claimsById.get(x.claimId)).filter(Boolean);
 const src=[...new Set(info.flatMap(x=>x.sourceIds))]
   .map(id=>sources.get(id)).filter(x=>x?.tier!=="official"&&Boolean(x?.url))
   .map(x=>({id:x!.id,title:x!.title,url:x!.url}));
 return {status:record.status,kind:record.officialAcquisitionKind,
   areas:record.candidateAreas.map(id=>({id,name:areaNames.get(id)||id})),
   sources:src.slice(0,5),
   claims:info.map(x=>({id:x!.id,landmark:x!.landmark})),
   confirmedMarkerIds:[] as string[]};
}
