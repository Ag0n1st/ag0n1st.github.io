import {classifyOfficialGearAcquisition} from "./storyAreas.mjs";
/**
 * Manual editorial overrides must identify exact SKPORT gear ID AND map marker.
 * Community candidate area hints remain in a separate nonauthoritative file.
 */
export function validateBlueprintConfirmations(overrides,officialMap,officialGear){
 if(overrides?.schemaVersion!==1||!Array.isArray(overrides.confirmedLinks))
   throw Error("Invalid manual blueprint confirmations");
 const byMarker=new Map(officialMap.markers.map(x=>[x.markerId,x]));
 const byGear=new Map(officialGear.map(x=>[String(x.id),x]));
 const pairIds=new Set();
 for(const link of overrides.confirmedLinks){
   const gear=byGear.get(String(link.gearId)),marker=byMarker.get(link.markerId);
   if(!gear||!marker)throw Error("Unrecognized official Gear / map marker ID");
   if(classifyOfficialGearAcquisition(gear).kind!=="template-crate")
     throw Error("Cannot mark a non-crate gear item as a crate reward");
   if(!link.evidenceNotes?.trim()||
      !["in-game","video","screenshot"].includes(link.evidenceType)||
      !/^\d{4}-\d{2}-\d{2}$/.test(link.checkedOn)||
      !link.reviewedBy?.trim())throw Error("Missing specific blueprint confirmation evidence");
   const key=link.gearId+"/"+link.markerId;
   if(pairIds.has(key))throw Error("Duplicate Gear-to-crate manual confirmation");
   pairIds.add(key);
 }
 return true;
}
export function getVerifiedBlueprintLink(overrides,gearId,officialMap){
 const rows=overrides?.confirmedLinks?.filter(x=>String(x.gearId)===String(gearId))??[];
 return rows.map(x=>({...x,areaId:officialMap.markers.find(y=>y.markerId===x.markerId)?.areaId??null}));
}
