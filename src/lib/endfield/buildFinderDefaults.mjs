import {DEFAULT_FACTORY_COMPONENT, FACTORY_COMPONENT_STAGES} from "./buildFinder.mjs";
import {MAX_AUTHORITY_LEVEL} from "./buildStoryProgress.mjs";

/**
 * Convenience preset, NOT an official player-inventory or quest claim.
 * Only includes selectable regions, area IDs and Gear IDs actually supplied
 * by the guide UI; changing a player's saved progress never calls this.
 */
export function getMaxBuildFinderPreset({regionIds=[],areaIds=[],blueprintIds=[],stockLevels=[]}={}){
 const distinct = values=>[...new Set(values.filter(v=>typeof v==="string"&&v.length>0))];
 const regions=distinct(regionIds);
 const regionsMax=regions.includes("wuling")?"wuling":regions.at(-1)??"";
 const validBlueprints=distinct(blueprintIds.filter(id=>/^\d+$/.test(id)));
 const validStages=stockLevels.map(Number).filter(n=>Number.isSafeInteger(n)&&n>=0);
 return {
   level:Math.max(...FACTORY_COMPONENT_STAGES.flatMap(stage=>stage.levels)),
   factoryComponent:DEFAULT_FACTORY_COMPONENT,
   storyProgress:{
     regionId:regionsMax,
     unlockedAreaIds:distinct(areaIds),
     acquiredGearBlueprintIds:validBlueprints,
     authorityLevel:MAX_AUTHORITY_LEVEL,
     stockRedistributionLevel:validStages.length?Math.max(...validStages):null
   }
 };
}
