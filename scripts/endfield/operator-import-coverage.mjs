import index from "../../src/data/endfield/catalog/operator-combat-reference.json" with {type:"json"};
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import {existsSync,readFileSync} from "node:fs";
import {resolve} from "node:path";

export function getOperatorImportCoverage(){
  const ids=new Set(index.operators.map(x=>x.id));
  const rows=roster.operators.map(op=>{
    const full=existsSync(resolve("src/data/endfield/operators",op.id+".json")) &&
               existsSync(resolve("src/data/endfield/operators",op.id+".extra.json"));
    const extra=full?JSON.parse(readFileSync(resolve("src/data/endfield/operators",op.id+".extra.json"),"utf8")):null;
    const reference=index.operators.find(x=>x.id===op.id);
    const skportCaptured=full&&extra?.source?.provider==="SKPORT Wiki";
    const hasUndisclosedPotentials=skportCaptured&&extra.potentials.some(p=>p.status==="undisclosed"||!p.effect?.trim());
    return {id:op.id,name:op.name,itemId:op.itemId,
      skportCaptured,skportFull:skportCaptured&&!hasUndisclosedPotentials,
      skportPartial:skportCaptured&&hasUndisclosedPotentials,
      communityCombatNames:ids.has(op.id),
      communityBaseSkills:Boolean(reference?.baseSkills?.length),
      hasIcon:Boolean(op.assets?.icon),hasPortrait:Boolean(op.assets?.portrait),
      hasBanner:Boolean(op.assets?.banner),hasSplash:Boolean(op.assets?.splash),
      availableFrom:op.availableFrom??null};
  });
  return {total:rows.length,
    skportCaptured:rows.filter(x=>x.skportCaptured).length,
    skportFull:rows.filter(x=>x.skportFull).length,
    skportPartial:rows.filter(x=>x.skportPartial).length,
    communityCombatNames:rows.filter(x=>x.communityCombatNames).length,
    communityBaseSkills:rows.filter(x=>x.communityBaseSkills).length,
    missingSkport:rows.filter(x=>!x.skportCaptured).map(x=>x.id),
    pendingDisclosure:rows.filter(x=>x.skportPartial).map(x=>x.id),
    rows};
}
