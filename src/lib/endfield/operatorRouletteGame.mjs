import {getCommunityTierlist,COMMUNITY_TIERLIST_ROLES} from "./communityTierlist.mjs";

export const ROULETTE_CATEGORIES=Object.freeze(["all",...COMMUNITY_TIERLIST_ROLES]);
export const ROULETTE_TEAM_SIZE=4;

/** Owner-approved tierlist roles + explicit additive overrides. The Tier List itself stays frozen. */
export function getRoulettePools(snapshot,roster,overrides,asOf){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(asOf??""))throw Error("Date required");
 if(overrides?.schemaVersion!==1||overrides.tierlistId!==snapshot.id)throw Error("Invalid Roulette overrides");
 const tierlist=getCommunityTierlist(snapshot,roster);
 const rosterMap=new Map(roster.operators.map(op=>[op.id,op]));
 const available=roster.operators.filter(op=>
  !op.availableFrom||op.availableFrom<=asOf);
 const released=new Set(available.map(op=>op.id));
 if(available.length<ROULETTE_TEAM_SIZE)throw Error("Insufficient released operators");
 const pools={all:[...available]};
 for(const role of COMMUNITY_TIERLIST_ROLES){
  const chosen=tierlist.roles.find(row=>row.id===role);
  if(!chosen)throw Error("Tierlist role missing: "+role);
  pools[role]=chosen.tiers.flatMap(t=>t.operators).map(item=>rosterMap.get(item.id))
   .filter(op=>released.has(op.id));
 }
 for(const [slug,roles] of Object.entries(overrides.roles??{})){
  const op=rosterMap.get(slug);
  if(!op||!Array.isArray(roles)||roles.length===0||
     new Set(roles).size!==roles.length||
     roles.some(role=>!COMMUNITY_TIERLIST_ROLES.includes(role)))
   throw Error("Invalid manually assigned Roulette role: "+slug);
  if(!released.has(slug))continue;
  for(const role of roles)
   if(!pools[role].some(member=>member.id===slug))pools[role].push(op);
 }
 for(const category of ROULETTE_CATEGORIES){
  const ids=new Set();
  for(const op of pools[category]){
   if(ids.has(op.id)||!op.assets?.icon?.startsWith("/images/endfield/operators/"))
    throw Error("Missing icon or duplicate Roulette operator: "+op.id);
   ids.add(op.id);
  }
  if(!pools[category].length)throw Error("Empty Roulette category: "+category);
 }
 return pools;
}

/** Selection is unique across all category switches, not just within each wheel. */
export function remainingOperators(pools,category,team){
 if(!ROULETTE_CATEGORIES.includes(category))throw Error("Invalid Roulette category");
 const chosen=new Set(team.map(x=>x.id));
 return pools[category].filter(op=>!chosen.has(op.id));
}

/** Exact rejection sampling prevents modulo bias for wheels with uneven segment counts. */
export function randomIndex(length,randomUint32){
 if(!Number.isSafeInteger(length)||length<1||length>0x100000000)throw Error("Invalid wheel size");
 const draw=randomUint32??(()=>{
  if(globalThis.crypto?.getRandomValues){
   const value=new Uint32Array(1);globalThis.crypto.getRandomValues(value);return value[0];
  }
  return Math.floor(Math.random()*0x100000000);
 });
 const limit=Math.floor(0x100000000/length)*length;
 for(let attempts=0;attempts<10000;attempts++){
  const n=draw();
  if(!Number.isInteger(n)||n<0||n>=0x100000000)throw Error("Invalid random value");
  if(n<limit)return n%length;
 }
 throw Error("Random source did not return an acceptable value");
}

/** One full sector of the CSS conic wheel begins at 12 o'clock. */
export function winnerRotation(previous,index,total,revolutions=6){
 if(!Number.isInteger(index)||index<0||index>=total||!Number.isFinite(previous)||
    !Number.isInteger(revolutions)||revolutions<1)
  throw Error("Invalid spin target");
 const target=(360-(index+.5)*360/total)%360;
 const offset=((target-((previous%360)+360)%360)+360)%360;
 return previous+revolutions*360+offset;
}

/** Berlin calendar day, not local-browser timezone and not tomorrow's unreleased operator. */
export function berlinDay(now=new Date()){
 const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Berlin",
  year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
 const part=type=>parts.find(x=>x.type===type)?.value;
 return part("year")+"-"+part("month")+"-"+part("day");
}