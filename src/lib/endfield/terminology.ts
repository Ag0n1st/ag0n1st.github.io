import source from "../../data/endfield/terminology.json";
export type GameLocale="de"|"en";
type Definition={en:string;de:string};
type OperatorSkill={en:string;de:string};
const data=source as unknown as {
 schemaVersion:number;
 categories:Record<string,Record<string,Definition>>;
 operatorSkills:Record<string,{operator:string;skills:Record<string,OperatorSkill>;talents:Record<string,OperatorSkill>}>;
 itemsById:Record<string,Definition & {category:string}>;
};
if(data.schemaVersion!==1)throw Error("Unsupported Endfield terminology schema");
const exact=new Map<string,Definition>();
for(const category of Object.values(data.categories)){
 for(const [key,row] of Object.entries(category)){
  exact.set(key,row);if(!exact.has(row.en))exact.set(row.en,row);if(!exact.has(row.de))exact.set(row.de,row);
 }
}
/** Exact game labels only: never replace words embedded in creator prose. */
export function gameTerm(input:string|undefined,lang:GameLocale,fallback?:string):string{
 if(!input)return fallback??"";
 const row=exact.get(input);
 if(!row)return fallback??input;
 // Unchanged DE=EN entries remain placeholders; preserve legacy per-operator
 // localized terminology until the editor explicitly modifies this row.
 if(lang==="de"&&row.de===row.en&&fallback)return fallback;
 return row[lang]||fallback||input;
}
export function gameItemName(id:string|number,lang:GameLocale,fallback?:string):string{
 const row=data.itemsById[String(id)];
 if(!row)return fallback??String(id);
 if(lang==="de"&&row.de===row.en&&fallback)return fallback;
 return row[lang]||fallback||row.en;
}
export function gameSkillName(slug:string,slot:string,lang:GameLocale,fallback?:string):string{
 const row=data.operatorSkills[slug]?.skills[slot];
 return row?.en?(row[lang]||fallback||row.en):(fallback??"");
}
export function gameTalentName(slug:string,id:string,lang:GameLocale,fallback?:string):string{
 const row=data.operatorSkills[slug]?.talents[id];
 return row?.en?(row[lang]||fallback||row.en):(fallback??"");
}
export function terminologyIndex(){return data;}
