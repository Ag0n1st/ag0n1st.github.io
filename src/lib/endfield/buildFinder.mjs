import {createGearAccessRequirement,evaluateBuildStoryAccess} from "./buildStoryProgress.mjs";
/**
 * Shared Endfield factory-component progression for the Build-Finder and
 * future equipment/factory tools. Grade order/levels are editorial requirements;
 * item IDs and STANDARD crafting recipes are from the official SKPORT snapshot.
 * Story/facility unlocks must be verified separately.
 */
export const FACTORY_COMPONENT_STAGES=Object.freeze([
  {id:"amethyst",itemId:"525",label:"Amethyst-Komponente",levels:[20,28],phase:"Early-Game"},
  {id:"ferrium",itemId:"526",label:"Ferrium-Komponente",levels:[36],phase:"Early-Game"},
  {id:"cryston",itemId:"527",label:"Cryston-Komponente",levels:[50],phase:"Early-Game"},
  {id:"xiranite",itemId:"528",label:"Xiranit-Komponente",levels:[60,70],phase:"Mid-Game"},
  {id:"cuprium",itemId:"747",label:"Cuprium-Komponente",levels:[70],phase:"Mid-Game"},
  {id:"hetonite",itemId:"844",label:"Hetonit-Komponente",levels:[70],phase:"End-Game"},
  {id:"pyrrolite",itemId:"1067",label:"Pyrrolit-Komponente",levels:[70],phase:"End-Game"}
]);
export const DEFAULT_FACTORY_COMPONENT="pyrrolite";
export const FACTORY_STAGES=FACTORY_COMPONENT_STAGES.map(stage=>stage.id);
export const FACTORY_LABELS=Object.fromEntries(FACTORY_COMPONENT_STAGES.map(stage=>[stage.id,stage.label]));
const indexByComponent=new Map(FACTORY_COMPONENT_STAGES.map((stage,i)=>[stage.itemId,i]));
const currencyIds=new Set(["601","602"]); // Valley Stock Bill, Wuling Stock Bill
const basicMaterialIds=new Set(["493","475"]); // Origocrust and Wood (four Lv10 items)

/**
 * Highest official component used by one standard recipe.
 * "starter" means only Origocrust/Wood (before Amethyst);
 * null means missing or unrecognized ingredients.
 */
export function componentRequirementForRecipe(recipe){
  if(!Array.isArray(recipe?.materials)||!recipe.materials.length)return null;
  let max=-1,hasBasic=false;
  for(const material of recipe.materials){
    const id=String(material?.id??"");
    if(!Number.isSafeInteger(material?.count)||material.count<=0)return null;
    if(indexByComponent.has(id))max=Math.max(max,indexByComponent.get(id));
    else if(basicMaterialIds.has(id))hasBasic=true;
    else if(!currencyIds.has(id))return null;
  }
  if(max>=0)return FACTORY_COMPONENT_STAGES[max].id;
  return hasBasic?"starter":null;
}
/**
 * Derive a four-piece build's minimum level and factory-component tier from
 * official SKPORT gear entries, not manually invented stages.
 */
export function getBuildRequirements(details,{availableFromLevel,storyUnlock,locations=[],preview=false}={}){
  const records=Array.isArray(details)?details:[];
  const levels=records.map(record=>record?.level);
  const components=records.map(record=>record?.recipeStatus==="verified"
    ?componentRequirementForRecipe(record.standardRecipe):null);
  const allPartsVerified=records.length===4&&records.every((record,i)=>
    record?.status==="verified" && Number.isSafeInteger(levels[i]) &&
    levels[i]>0 && components[i]!==null);
  const requiredLevel=allPartsVerified
    ?Math.max(availableFromLevel??0,...levels):null;
  const maxIndex=allPartsVerified
    ?Math.max(-1,...components.map(id=>id==="starter"?-1:FACTORY_STAGES.indexOf(id))):null;
  const requiredComponent=allPartsVerified
    ?maxIndex===-1?"starter":FACTORY_STAGES[maxIndex]:null;
  // Freeform editorial commentary NEVER proves a facility, area or a blueprint.
  const gearAccess=records.map((record,i)=>createGearAccessRequirement(record,locations[i]));
  return {partCount:records.length,allPartsVerified,requiredLevel,requiredComponent,
    gearAccess,hasStoryEvidence:typeof storyUnlock==="string"&&storyUnlock.trim().length>0,
    preview:Boolean(preview)};
}
/**
 * Available requires: validated data, sufficient gear level, adequate component
 * grade AND a separate manually checked story/blueprint/facility unlock.
 */
export function evaluateBuildAvailability(req,selected){
  const level=Number(req?.requiredLevel);
  if(req?.preview===true||req?.partCount!==4||req?.allPartsVerified!==true||
      req?.requiredLevel==null||!Number.isSafeInteger(level)||level<=0||
      !["starter",...FACTORY_STAGES].includes(req?.requiredComponent))
    return {status:"unverified",reason:"Offizielle Ausrüstungsdaten oder Rezeptzuordnung ungeklärt"};
  if(!Number.isSafeInteger(Number(selected?.level))||
      !FACTORY_STAGES.includes(selected?.factoryComponent))
    return {status:"unverified",reason:"Ungültige Fortschrittsauswahl"};
  if(Number(selected.level)<level)
    return {status:"level-locked",reason:"Benötigt Ausrüstungslevel "+level};
  if(req.requiredComponent!=="starter" &&
      FACTORY_STAGES.indexOf(selected.factoryComponent)<FACTORY_STAGES.indexOf(req.requiredComponent))
    return {status:"component-locked",reason:"Benötigt "+FACTORY_LABELS[req.requiredComponent]};
  return evaluateBuildStoryAccess(req.gearAccess,selected.storyProgress);
}
