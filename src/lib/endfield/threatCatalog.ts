import snapshot from "../../data/endfield/catalog/threats.json";

/** Official SKPORT Threats catalog snapshot, no runtime API calls or invented boss IDs. */
export const allThreats=snapshot.items;
export const threatMeta=snapshot.source;
const byId=new Map(allThreats.map(item=>[item.id,item]));
export const getThreatById=(id:string)=>byId.get(id);
export const featuredBosses=snapshot.bosses.map(boss=>{
 const variants=boss.threatIds.map(id=>byId.get(id)).filter((item):item is typeof allThreats[number]=>Boolean(item));
 return {
  ...boss,
  variants,
  image:boss.portraitPath??variants[0]?.iconPath??undefined
 };
});
