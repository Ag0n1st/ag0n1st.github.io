/** Conservative Endfield Build-Finder: factory stages are editorial, not SKPORT IDs. */
export const FACTORY_STAGES=["einstieg","fortgeschritten","maximal"];
export const FACTORY_LABELS={
 einstieg:"Einstieg",fortgeschritten:"Fortgeschritten",maximal:"Vollständig ausgebaut"
};
/** Returns status with source-aware explanations, never infers story unlocks. */
export function evaluateBuildAvailability(req,selected){
 const level=Number(req?.requiredLevel);
 if(req?.preview || req?.partCount!==4 || req?.allPartsVerified!==true ||
   req?.requiredLevel==null || !Number.isSafeInteger(level) || level<=0 ||
   !FACTORY_STAGES.includes(req?.factoryStage) || req?.hasFactoryEvidence!==true)
   return {status:"unverified",reason:"Freischaltung noch nicht geprüft"};
 if(!Number.isSafeInteger(Number(selected?.level))||!FACTORY_STAGES.includes(selected?.factoryStage))
   return {status:"unverified",reason:"Ungültige Fortschrittsauswahl"};
 if(Number(selected.level)<level)
   return {status:"level-locked",reason:"Benötigt mindestens Level "+level};
 if(FACTORY_STAGES.indexOf(selected.factoryStage)<FACTORY_STAGES.indexOf(req.factoryStage))
   return {status:"factory-locked",reason:"Benötigt Fabrikstand "+FACTORY_LABELS[req.factoryStage]};
 return {status:"available",reason:"Freischaltung für diese Auswahl dokumentiert"};
}
