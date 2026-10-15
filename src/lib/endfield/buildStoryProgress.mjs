import {classifyOfficialGearAcquisition} from "./storyAreas.mjs";

/**
 * Shared (SSR + browser) typed access requirements for a single Gear item.
 * Community map/gear correlations must NEVER pretend to be official markers.
 * Editorial storyUnlock strings are prose, not an automatic permission.
 */
export function createGearAccessRequirement(gear,research){
 const official=classifyOfficialGearAcquisition(gear);
 const trust=research?.precision??"unverified";
 const areaIds=["specific-item","verified"].includes(trust)
   ?[...new Set((research?.areas??[]).map(a=>a?.id).filter(Boolean))]
   :[];
 return {
   gearId:String(gear?.id??""),name:String(gear?.name??"Unbekanntes Ausrüstungsteil"),
   kind:official.kind,regionId:official.regionId??null,
   authorityLevel:official.authorityLevel??null,
   stockRedistributionLevel:official.stockRedistributionLevel??null,
   areaIds,locationEvidence:trust,
   hasConflictingSources:trust==="disputed"
 };
}

export const STORY_BUILD_STATUSES=Object.freeze({
  available:"Passend",
  "region-locked":"Region fehlt",
  "area-unconfirmed":"Gebiet nicht bestätigt",
  "acquisition-locked":"Freischaltung fehlt",
  "blueprint-unconfirmed":"Blaupause nicht bestätigt",
  "story-unverified":"Story/Fundort ungeklärt"
});

/**
 * Story/area selection is NOT a linear rank. Areas are individually confirmed
 * by the user; a published version, later mission or region selection cannot
 * silently unlock all of its areas (side missions and parallel paths exist).
 *
 * Explicitly acquired blueprints take precedence: a player may already own a
 * Gear template even if they no longer remember where it was obtained.
 */
export function evaluateGearStoryAccess(item,progress={}){
 const name=String(item?.name??"Ausrüstungsteil");
 if(!item?.gearId)return {status:"story-unverified",reason:"Ausrüstungs-ID unbekannt"};
 const acquired=new Set(progress.acquiredGearBlueprintIds??[]);
 if(acquired.has(String(item.gearId)))return {
   status:"available",reason:name+": Blaupause vom Spieler als erhalten bestätigt"
 };
 if(item.kind==="authority-level-reward"){
   const level=progress.authorityLevel;
   if(!Number.isSafeInteger(level)||level<0)return {
     status:"story-unverified",reason:name+": Autoritätslevel nicht angegeben"};
   if(level<item.authorityLevel)return {
     status:"acquisition-locked",reason:name+": benötigt Autoritätslevel "+item.authorityLevel};
   return {status:"blueprint-unconfirmed",reason:name+": Autoritätsbelohnung noch nicht als erhalten bestätigt"};
 }
 if(item.kind==="regional-stock-redistribution"){
   const stage=progress.stockRedistributionLevel;
   if(!Number.isSafeInteger(stage)||stage<0)return {
     status:"story-unverified",reason:name+": Wuling-Warenumverteilung nicht angegeben"};
   if(stage<item.stockRedistributionLevel)return {
     status:"acquisition-locked",reason:name+": benötigt Wuling-Warenumverteilung Stufe "+item.stockRedistributionLevel};
   return {status:"blueprint-unconfirmed",reason:name+": Einkauf der Vorlage noch nicht bestätigt"};
 }
 if(item.kind==="region-story-progress"){
   if(!progress.regionId)return {
     status:"story-unverified",reason:name+": Storyregion noch nicht ausgewählt"};
   if(progress.regionId!=="wuling")return {
     status:"region-locked",reason:name+": benötigt Zugang zur Region Wuling"};
   return {status:"blueprint-unconfirmed",reason:name+": Region Wuling erreicht; Blaupause noch nicht bestätigt"};
 }
 if(item.kind==="template-crate"){
   if(item.hasConflictingSources)return {
     status:"story-unverified",reason:name+": Kisten-Fundort hat widersprüchliche Quellen"};
   if(item.areaIds?.length!==1)return {
     status:"story-unverified",reason:name+": Kisten-Gebiet nicht eindeutig belegt"};
   if(!progress.regionId)return {
     status:"story-unverified",reason:name+": Storyregion noch nicht ausgewählt"};
   if(progress.regionId!=="wuling")return {
     status:"region-locked",reason:name+": benötigt Zugang zur Region Wuling"};
   const requiredArea=item.areaIds[0];
   if(!(progress.unlockedAreaIds??[]).includes(requiredArea))return {
     status:"area-unconfirmed",reason:name+": Gebiet noch nicht als freigeschaltet markiert ("+requiredArea+")"};
   return {status:"blueprint-unconfirmed",reason:name+": Gebiet erreichbar, aber Blaupausenbesitz noch offen"};
 }
 return {status:"story-unverified",reason:name+": Freischaltweg nicht verifiziert"};
}

const PRIORITY=[
 "region-locked","area-unconfirmed","acquisition-locked",
 "story-unverified","blueprint-unconfirmed"
];
export function evaluateBuildStoryAccess(items,progress){
 if(!Array.isArray(items)||items.length!==4||
   items.some(x=>!x?.gearId || !/^\d+$/.test(String(x.gearId))))return {
   status:"story-unverified",reason:"Keine vier eindeutigen offiziellen Gear-IDs hinterlegt",parts:[]};
 }
 const unique=new Set(items.map(x=>String(x.gearId)));
 if(unique.size>4)throw Error("Unreachable");
 if(progress==null || typeof progress!=="object")return {
   status:"story-unverified",reason:"Story-/Gebietsfortschritt noch nicht angegeben",parts:[]};
 }
 const parts=items.map(item=>({gearId:item.gearId,
   ...evaluateGearStoryAccess(item,progress)}));
 for(const status of PRIORITY){
   const first=parts.find(x=>x.status===status);
   if(first)return {status,reason:first.reason,parts};
 }
 return {status:"available",reason:"Level, Komponenten und alle vier Blaupausen sind bestätigt",parts};
}
