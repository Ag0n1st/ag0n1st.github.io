import { FACTORY_STAGES } from "./buildFinder.mjs";

/**
 * Editorial, deterministic 1–5 accessibility rubric for META builds only.
 * 5: early game (<=Lv36, Amethyst/Ferrium/starter)
 * 4: Lv50/Cryston
 * 3: Lv60/Xiranite
 * 2: Lv70 mid-game materials (Xiranite/Cuprium)
 * 1: End-game Hetonite/Pyrrolite.
 *
 * A guide becomes Meta-accessible when its EASIEST verified meta setup is
 * craftable. Story quests, facilities and *actual blueprint possession*
 * remain independent and are NOT inferred here.
 */
const COMPONENT_SCORES=Object.freeze({
  starter:5,amethyst:5,ferrium:5,cryston:4,xiranite:3,
  cuprium:2,hetonite:1,pyrrolite:1,
});
export const ACCESSIBILITY_SCALE=Object.freeze([
  {score:5,label:"Early Game · bis Level 36 / Ferrium"},
  {score:4,label:"Early Game · Level 50 / Cryston"},
  {score:3,label:"Mid Game · Level 60 / Xiranit"},
  {score:2,label:"Mid Game · Level 70 / Cuprium"},
  {score:1,label:"Endgame · Hetonit / Pyrrolit"},
]);

export function accessibilityForRequirement(requirement){
  if(!requirement?.allPartsVerified || requirement.requiredLevel==null)return null;
  const component=requirement.requiredComponent;
  if(!Object.hasOwn(COMPONENT_SCORES,component))return null;
  const level=Number(requirement.requiredLevel);
  if(!Number.isSafeInteger(level) || level<=0)return null;
  const levelScore=level<=36?5:level<=50?4:level<=60?3:level<=70?2:1;
  const score=Math.min(levelScore,COMPONENT_SCORES[component]);
  return {
    score,requiredLevel:level,requiredComponent:component,
    phase:ACCESSIBILITY_SCALE.find(stage=>stage.score===score)?.label??"",
  };
}
export function metaAccessibilityFromRequirements(builds){
  if(!Array.isArray(builds)||!builds.length)return null;
  const meta=builds.filter(build=>build?.meta===true);
  if(!meta.length)return null;
  // A partial meta inventory is insufficient for a reproducible score.
  const evaluations=meta.map(build=>({
    id:build.id,
    result:accessibilityForRequirement(build.requirements),
  }));
  if(evaluations.some(row=>!row.result))return null;
  // Accessibility = earliest complete Meta option, not average of all setups.
  const easiest=evaluations.reduce((best,row)=>
    row.result.score>best.result.score?row:best);
  return {...easiest.result,buildId:easiest.id,metaBuildCount:meta.length};
}
