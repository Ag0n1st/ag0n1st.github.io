/** Arknights: Endfield recruitment counters. */
export const SIX_STAR_PITY=80;
export const FEATURED_PITY=120;
export const TOKEN_PITY=240;
export const STANDARD_IDS=['last-rite','lifeng','pogranichnik','ardelia','ember'];
export const SI_LOSS_POOL=[...STANDARD_IDS,'typhoeus','liino'];
export function sixStarChance(pull){return pull>=80?100:Math.min(100,0.8+Math.max(0,pull-65)*5);}
export function featuredExample(pull){return {pity80:0,guarantee120Used:true,token240:pull,remainingToken240:240-pull};}
