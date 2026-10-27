/**
 * Stream-specific editorial placements; IDs and art come from the existing
 * Endfield operator roster. Do not infer rankings, roles or patch updates.
 */
export const COMMUNITY_TIERLIST_ROLES=Object.freeze(["damage-dealer","enabler","buffer"]);
export const COMMUNITY_TIERLIST_RANKS=Object.freeze(["S","A","B","C","D","F"]);
export const COMMUNITY_TIERLIST_ROLE_LABELS=Object.freeze({
 "damage-dealer":"Damage Dealer",enabler:"Enabler",buffer:"Buffer"
});

export function getCommunityTierlist(snapshot,roster){
 if(!snapshot||snapshot.schemaVersion!==1||!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.date??""))
  throw Error("Invalid community tierlist snapshot");
 if(!Array.isArray(roster?.operators))throw Error("Operator roster required");
 const operators=new Map(roster.operators.map(row=>[row.id,row]));
 if(operators.size!==roster.operators.length)throw Error("Duplicate operator roster slugs");
 if(JSON.stringify(Object.keys(snapshot.roles??{}).sort())!==
    JSON.stringify([...COMMUNITY_TIERLIST_ROLES].sort()))
  throw Error("Community tierlist roles mismatch");
 return {
  id:snapshot.id,date:snapshot.date,
  roles:COMMUNITY_TIERLIST_ROLES.map(role=>{
   const ranks=snapshot.roles[role];
   if(JSON.stringify(Object.keys(ranks??{}).sort())!==JSON.stringify([...COMMUNITY_TIERLIST_RANKS].sort()))
    throw Error("Tierlist ranks missing or unexpected for "+role);
   const seen=new Set();
   return {id:role,label:COMMUNITY_TIERLIST_ROLE_LABELS[role],
    tiers:COMMUNITY_TIERLIST_RANKS.map(rank=>{
     const slugs=ranks[rank];
     if(!Array.isArray(slugs))throw Error("Invalid "+role+"/"+rank);
     return {rank,operators:slugs.map(slug=>{
      if(typeof slug!=="string"||seen.has(slug))
       throw Error("Duplicate/invalid tierlist operator "+role+"/"+slug);
      seen.add(slug);
      const op=operators.get(slug);
      if(!op||!op.assets?.icon?.startsWith("/images/endfield/operators/"))
       throw Error("Missing official operator icon for "+slug);
      return {id:slug,name:op.name,icon:op.assets.icon};
     })};
    })};
  })
 };
}
