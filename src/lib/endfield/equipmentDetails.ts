import rawCatalog from "../../data/endfield/catalog/items.json";
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
export function getOfficialWeapon(id:string):OfficialWeapon|undefined{return weaponIndex.get(id);}
export function getOfficialGear(id:string):OfficialGear|undefined{return gearIndex.get(id);}
export function equipmentDataCoverage(){return snapshot?.coverage??null;}
