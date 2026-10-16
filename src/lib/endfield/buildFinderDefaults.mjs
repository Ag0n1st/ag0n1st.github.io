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

/**
 * Opt-in starter preset for players who want to mark progress individually.
 * None of these values claim that a blueprint or a location is unlocked.
 * A factory's lowest currently selectable tier is Amethyst; earlier stages
 * can still be represented by setting a low operator level.
 */
export function getMinBuildFinderPreset({levelOptions=[]}={}){
 const validLevels=levelOptions.map(Number).filter(n=>Number.isSafeInteger(n)&&n>0);
 return {
   level:validLevels.length?Math.min(...validLevels):10,
   factoryComponent:FACTORY_COMPONENT_STAGES[0].id,
   storyProgress:{
     regionId:"",
     unlockedAreaIds:[],
     acquiredGearBlueprintIds:[],
     authorityLevel:null,
     stockRedistributionLevel:null
   }
 };
}
