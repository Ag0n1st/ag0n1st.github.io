import rawCatalog from "../../data/endfield/catalog/items.json";
import legacyV16 from "../../data/endfield/catalog/v16-gear.json";
import verifiedAliases from "../../data/endfield/catalog/v16-official-gear-aliases.json";
import { normalizeOfficialGearSlot } from "./gearSlotCorrections.mjs";
// The detailed data file is optional until a verified official import exists.
// Vite/Astro discovers it at build time, not by making runtime SKPORT requests.
const snapshotFiles=import.meta.glob("../../data/endfield/catalog/equipment-details.json",{
  eager:true,import:"default"
}) as Record<string,OfficialEquipmentSnapshot>;
export interface DetailTable { columns:string[]; rows:{cells:string[];costs:{id:string;count:number}[]}[] }
export interface DetailTab {tab:string;introName:string;tables:DetailTable[];texts:string[]}
interface OfficialBase {
 id:string;name:string;iconPath:string|null;rarity:string|null;
 status:"verified"|"incomplete";
 source:{provider:string;itemId:string;language:string;snapshot:string}
}
export interface OfficialWeapon extends OfficialBase {
 kind:"weapon";category:"Weapons";weaponType:string|null;
 attributes:DetailTab[];tuning:DetailTab[];details:DetailTab[];potentials:DetailTab[]
}
export interface OfficialGear extends OfficialBase {
 kind:"gear";category:"Gear";gearSlot:string|null;setName:string|null;level:number|null;
 stats:DetailTab[];artificing:DetailTab[];setEffect:string|null;
 standardRecipe:{id:string;materials:{id:string;count:number}[];source:string}|null;
 recipeStatus:"verified"|"not-listed"|"needs-review";
 artificingStatus?:"available"|"not-listed";
 acquisitionNotes?:string[]
}
export interface OfficialEquipmentSnapshot {
 schemaVersion:number;source:{provider:string;snapshot:string};
 coverage:{requested:number;parsed:number;verified:number;incomplete:number;errors:number;
   weaponCount:number;gearCount:number};
 weapons:OfficialWeapon[];gear:OfficialGear[];
 review:{id:string;name:string}[];failures:{id:string;message:string}[]
}
const snapshot=Object.values(snapshotFiles)[0];
const weaponIndex=new Map(snapshot?.weapons.map(x=>[x.id,x])??[]);
const gearIndex=new Map(snapshot?.gear.map(x=>[x.id,x])??[]);
// Resolve earlier v1.6 guide references to individually verified numeric SKPORT
// data. Do not overwrite published build IDs, icons, or the older Gloves (411).
const legacyIndex=new Map(legacyV16.items.map(x=>[x.id,x]));
const v16OfficialAliases=new Map<string,string>(Object.entries(verifiedAliases.aliases));
if(verifiedAliases.schemaVersion!==1||v16OfficialAliases.size!==18||
   new Set(v16OfficialAliases.values()).size!==18||
   v16OfficialAliases.get("type-50-yinglung-gloves-v16")!=="1381"||
   v16OfficialAliases.has("type-50-yinglung-gauntlets"))
  throw Error("Invalid v1.6 official Gear alias manifest");
for(const [legacyId,officialId] of v16OfficialAliases){
  const preview=legacyIndex.get(legacyId);
  const record=gearIndex.get(officialId);
  if(!preview||!record||!/^13(?:8[0-9]|9[0-7])$/.test(officialId)||
     record.status!=="verified"||record.source.itemId!==officialId||
     record.name!==preview.name.replace(" (v1.6)","")||
     record.gearSlot!==preview.slot)
    throw Error("v1.6 Gear alias lacks matching official SKPORT data: "+legacyId);
}
export function getOfficialWeapon(id:string):OfficialWeapon|undefined{return weaponIndex.get(id);}
export function getOfficialGear(id:string):OfficialGear|undefined{
  const original=gearIndex.get(v16OfficialAliases.get(id)??id);
  return original ? normalizeOfficialGearSlot(original) as OfficialGear : undefined;
}
export function equipmentDataCoverage(){return snapshot?.coverage??null;}
