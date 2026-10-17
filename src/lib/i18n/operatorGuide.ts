import full from "../../data/i18n/en-guide-content.json";
import type {CollectionEntry} from "astro:content";

/**
 * Share EXACT guide schema, IDs, artwork, sections and filter logic across DE/EN.
 * Only separately stored editorial strings are replaced for English.
 * Never regenerate official SKPORT data, item IDs, teams or calculations.
 */
type Guide = CollectionEntry<"operator-guides">["data"];
type EnglishSnapshot = {guides:Record<string,Partial<Guide>>};
const snapshot=full as EnglishSnapshot;

export function localizeOperatorGuide(source:Guide,lang:"de"|"en"):Guide{
 if(lang==="de")return source;
 const overlay=snapshot.guides[source.operator];
 if(!overlay)throw new Error("Missing complete English guide content: "+source.operator);
 const guide=structuredClone(source);
 for(const section of ["overview","operatorKit","skills","weapons","equipment","potentials","teams","gameplay","conclusion","guideVideo"] as const){
   const value=overlay[section];
   if(!value)throw new Error("Missing English guide section: "+section+" / "+source.operator);
   (guide as Record<string,unknown>)[section]=value;
 }
 // Assert structure/links never drift across languages.
 const ids=(entries:{id:string}[])=>entries.map(item=>item.id).join("|");
 if(ids(guide.equipment.builds)!==ids(source.equipment.builds))throw new Error("Translated builds changed IDs/order");
 if(ids(guide.teams.meta)!==ids(source.teams.meta)||ids(guide.teams.more)!==ids(source.teams.more))
   throw new Error("Translated teams changed IDs/order");
 for(let i=0;i<guide.equipment.builds.length;i++){
   if(guide.equipment.builds[i].items.join("|")!==source.equipment.builds[i].items.join("|"))
     throw new Error("Translated build modified gear IDs");
 }
 return guide;
}
