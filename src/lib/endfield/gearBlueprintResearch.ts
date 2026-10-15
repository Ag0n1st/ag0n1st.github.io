import researchIndex from "../../data/endfield/progression/blueprint-research-index.json";
import preciseIndex from "../../data/endfield/progression/blueprint-precise-gear-index.json";
import officialAreas from "../../data/endfield/progression/story-areas.json";
import communityClaims from "../../data/endfield/progression/blueprint-community-claims.json";
import confirmed from "../../data/endfield/progression/blueprint-confirmations.json";
import officialCrates from "../../data/endfield/progression/gear-template-crates.json";
import {getVerifiedBlueprintLink} from "./blueprintConfirmations.mjs";

const legacy=new Map(researchIndex.gearHints.map(x=>[x.gearId,x]));
const details=new Map(preciseIndex.entries.map(x=>[x.gearId,x]));
const areaNames=new Map(officialAreas.areas.map(x=>[x.id,x.displayNameDe]));
const sources=new Map(communityClaims.sources.map(x=>[x.id,x]));
const claimsById=new Map(communityClaims.claims.map(x=>[x.id,x]));
const sourceWiki={id:"talos-wiki-specific",
 title:"Talos Wiki – konkrete Teile je Blaupausenkiste",url:"https://endfield.wiki.gg/wiki/Gear"};
const sourceHub={id:"endfield-hub-specific",
 title:"Endfield Hub – Fundort des einzelnen Ausrüstungsteils",url:"https://endfieldhub.org/database/gears"};
const area=(id:string)=>({id,name:areaNames.get(id)??id});

/**
 * Prefer personally confirmed marker > exact item evidence (with conflicts
 * visible) > previous broad set-family candidate hints.
 * None of these community hints automatically grants a blueprint or a build.
 */
export function getGearBlueprintResearch(id:string|number){
 const key=String(id);
 const fallback=legacy.get(key);
 const exact=details.get(key);
 if(!fallback)return null;
 const actual=getVerifiedBlueprintLink(confirmed,key,officialCrates);
 if(actual.length){
  return {status:"owner-confirmed",kind:fallback.officialAcquisitionKind,
   areas:[...new Set(actual.map(x=>x.areaId).filter((x):x is string=>Boolean(x)))].map(area),
   sources:[] as {id:string;title:string;url:string}[],
   claims:[] as {id:string;landmark:string}[],
   confirmedMarkerIds:actual.map(x=>x.markerId),
   precision:"verified",note:"Die Zuordnung wurde persönlich mit der offiziellen SKPORT-Kisten-ID überprüft.",
   evidenceDetails:[] as string[]};
 }
 if(exact && ["two-source-exact-piece","wiki-exact-piece","hub-exact-piece",
   "source-conflict","acquisition-conflict"].includes(exact.status)){
  const matchedAreas=[...new Set([
   ...(exact.exactAreaId?[exact.exactAreaId]:[]),
   ...exact.wikiItemLinks.map(x=>x.areaId),
   ...(exact.hubItemLink?.areaId?[exact.hubItemLink.areaId]:[])
  ])];
  const citations=[
    ...(exact.wikiItemLinks.length?[sourceWiki]:[]),
    ...(exact.hubItemLink?[sourceHub]:[])
  ];
  const wikiClaims=exact.wikiItemLinks.map(x=>({
    id:x.claimId,
    landmark:"Talos Wiki: "+(claimsById.get(x.claimId)?.landmark??x.landmark??x.claimId)
  }));
  const hubClaims=exact.hubItemLink?.landmark?[{
    id:exact.hubItemLink.claimId??"hub-specific",
    landmark:"Endfield Hub: "+exact.hubItemLink.landmark
  }]:[];
  const status=exact.status;
  const disagrees=status==="source-conflict"||status==="acquisition-conflict";
  const note=disagrees
    ?"Quellenwiderspruch: Einzelteil, Kiste oder Erwerbsart sind unterschiedlich angegeben. Bitte die Originalquellen vergleichen."
    :status==="two-source-exact-piece"
      ?"Beide Quellen nennen dieses konkrete Ausrüstungsteil für denselben recherchierten Fundort."
      :"Der konkrete Einzelteil-Fundort stammt aus einer Community-Quelle; der offizielle SKPORT-Kistenmarker ist noch nicht zugeordnet.";
  return {status,kind:fallback.officialAcquisitionKind,
   areas:matchedAreas.map(area),sources:citations,
   claims:[...wikiClaims,...hubClaims],confirmedMarkerIds:[] as string[],
   precision:disagrees?"disputed":"specific-item",note,
   evidenceDetails:[...exact.conflictingEvidence]};
 }
 const hints=fallback.candidateLinks
   .map(link=>claimsById.get(link.claimId)).filter(x=>Boolean(x));
 const refs=[...new Set(hints.flatMap(x=>x!.sourceIds))]
   .map(id=>sources.get(id))
   .filter(x=>x?.tier!=="official"&&Boolean(x?.url))
   .map(x=>({id:x!.id,title:x!.title,url:x!.url}));
 return {status:fallback.status,kind:fallback.officialAcquisitionKind,
   areas:fallback.candidateAreas.map(area),sources:refs.slice(0,5),
   claims:hints.map(x=>({id:x!.id,landmark:x!.landmark})),
   confirmedMarkerIds:[] as string[],
   precision:"set-family" as const,
   note:"Nur Set-Hinweis; die konkrete Ausrüstungsvariante ist noch nicht zugeordnet.",
   evidenceDetails:[] as string[]};
}
