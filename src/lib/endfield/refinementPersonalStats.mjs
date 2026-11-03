/** Operator forecast uses one 6-, 12- and 20-pity attribute per gear piece.
 * Each historical successful refinement contributes its recorded catalyst attempts;
 * the pooled estimate weights Good/Standard samples by successful refinements.
 */
export function calculateRefinementPersonalStats(source){
  if(!Number.isInteger(source.gearPieces)||source.gearPieces<=0)throw Error("Invalid gear count");
  if(!Array.isArray(source.stages)||source.stages.length!==3||
    source.stages.map(x=>x.pity).join(",")!=="6,12,20")throw Error("Expected three 6/12/20-pity stages");
  const average=sample=>{
    if(!Number.isInteger(sample.attempts)||!Number.isInteger(sample.successes)||
      sample.attempts<=0||sample.successes<=0||sample.successes>sample.attempts)throw Error("Invalid refinement sample");
    return sample.attempts/sample.successes;
  };
  const stages=source.stages.map(stage=>{
    const good={...stage.good,average:average(stage.good)};
    const standard={...stage.standard,average:average(stage.standard)};
    const pooled={attempts:good.attempts+standard.attempts,
      successes:good.successes+standard.successes};
    pooled.average=average(pooled);
    return {level:stage.level,pity:stage.pity,good,standard,pooled};
  });
  const sum=key=>source.gearPieces*stages.reduce((total,stage)=>total+stage[key].average,0);
  // The pity threshold still requires one final catalyst for the guaranteed success.
  const worstCaseStages=stages.map(stage=>({pity:stage.pity,catalysts:stage.pity+1}));
  const worstCasePerPiece=worstCaseStages.reduce((total,stage)=>total+stage.catalysts,0);
  return {
    stages,gearPieces:source.gearPieces,attributesPerPiece:stages.length,
    totalAttempts:stages.reduce((sum,stage)=>sum+stage.pooled.attempts,0),
    totalSuccesses:stages.reduce((sum,stage)=>sum+stage.pooled.successes,0),
    perOperator:{pooled:sum("pooled"),good:sum("good"),standard:sum("standard")},
    worstCase:{stages:worstCaseStages,perPiece:worstCasePerPiece,perOperator:source.gearPieces*worstCasePerPiece}
  };
}
