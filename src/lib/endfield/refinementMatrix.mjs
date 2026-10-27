/**
 * Read-only attribute winners from verified official SKPORT Artificing tables.
 * No user-visible numbers are inferred from third-party preview gear stats.
 */
export const REFINEMENT_ATTRIBUTES=Object.freeze([
 {key:"agi",group:"primary",de:"Beweglichkeit",en:"Agility",aliases:["Agility"]},
 {key:"int",group:"primary",de:"Intellekt",en:"Intellect",aliases:["Intellect"]},
 {key:"str",group:"primary",de:"Stärke",en:"Strength",aliases:["Strength"]},
 {key:"will",group:"primary",de:"Wille",en:"Will",aliases:["Will"]},
 {key:"basic",group:"damage",de:"SDN-Bonus: Standardangriff",en:"Basic Attack DMG Bonus",aliases:["Basic Attack DMG Bonus","Basic ATK DMG Bonus"]},
 {key:"battle",group:"damage",de:"SDN-Bonus: Kampffertigkeit",en:"Battle Skill DMG Bonus",aliases:["Battle Skill DMG Bonus"]},
 {key:"combo",group:"damage",de:"SDN-Bonus: Kombofertigkeit",en:"Combo Skill DMG Bonus",aliases:["Combo Skill DMG Bonus","Combo Skill DMG Bonues"]},
 {key:"ultimate",group:"damage",de:"SDN-Bonus: Ultimative Fertigkeit",en:"Ultimate DMG Bonus",aliases:["Ultimate DMG Bonus"]},
 {key:"physical",group:"damage",de:"SDN-Bonus: Physisch",en:"Physical DMG Bonus",aliases:["Physical DMG Bonus"]},
 {key:"all",group:"damage",de:"Sämtlicher Fertigkeits-SDN",en:"All Skill DMG",aliases:["All Skill DMG Dealt Bonus","All skill DMG Bonus Dealt","All Skill DMG Dealth Bonus","All Skill DMG"]},
 {key:"cryo",group:"damage",de:"Kryo- & Elektrischer SDN",en:"Cryo and Electric DMG",aliases:["Cryo and Electric DMG Dealt Bonus","Cry and Electric DMG Dealt Bonus","Cryo & Electric DMG"]},
 {key:"heat",group:"damage",de:"Hitze- & Natur SDN",en:"Heat and Nature DMG",aliases:["Heat and Nature DMG Dealt Bonus","Heat & Nature DMG"]},
 {key:"stagger",group:"damage",de:"SDN vs. Taumelnd-Bonus",en:"DMG vs. Staggered Bonus",aliases:["DMG Bonus vs. Staggered"]},
 {key:"crit",group:"utility",de:"Kritische Rate",en:"Critical Rate",aliases:["Critical Rate"]},
 {key:"ult-ef",group:"utility",de:"ULT-Effizienz",en:"ULT Efficiency",aliases:["Ultimate Gain Efficiency","ULT Efficiency"]},
 {key:"arts",group:"utility",de:"Technik-Intensität",en:"Arts Intensity",aliases:["Arts Intensity"]},
 {key:"main",group:"utility",de:"Hauptattribut",en:"Main Attribute",aliases:["Main Attribute"]},
 {key:"secondary",group:"utility",de:"Sekundärattribut",en:"Secondary Attribute",aliases:["Secondary Attribute"]},
 {key:"reduction",group:"utility",de:"Finaler-SDN-Reduzierung",en:"Final DMG Reduction",aliases:["Final DMG Reduction"]},
 {key:"treatment",group:"utility",de:"Behandlungsbonus",en:"Treatment Bonus",aliases:["Treatment Bonus"]},
 {key:"hp",group:"utility",de:"LP",en:"HP",aliases:["HP"]},
 {key:"atk",group:"utility",de:"ANG",en:"ATK",aliases:["Attack","ATK"]}
]);
export const REFINEMENT_SLOTS=Object.freeze(["Armor","Gloves","Kit"]);
const canonical=s=>String(s??"").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g,"");
const attributeByName=new Map();
for(const a of REFINEMENT_ATTRIBUTES)for(const name of a.aliases){
 const key=canonical(name);
 if(attributeByName.has(key))throw Error("Duplicate refinement alias "+name);
 attributeByName.set(key,a.key);
}
export const refinementAttributeFor=(name)=>attributeByName.get(canonical(name))??null;

export function refinementNumber(text){
 const s=String(text??"").trim().replace(/,/g,"");
 // Numeric value only: no comparisons using unknown, ranges or descriptive text.
 const match=s.match(/^[+]?(-?\d+(?:\.\d+)?)(%)?$/);
 return match?Number(match[1]):null;
}
export function refinementVariantTag(name){
 return String(name??"").match(/(?:^|\s)([TS][1-9])(?:\s|$)/i)?.[1]?.toUpperCase()??null;
}
export function deriveRefinementMatrix(gear){
 if(!Array.isArray(gear))throw Error("Official Gear snapshot required");
 const pool=new Map();
 const used=new Set();
 for(const piece of gear){
  if(piece?.kind!=="gear"||piece.status!=="verified"||
     !REFINEMENT_SLOTS.includes(piece.gearSlot)||!/^\d+$/.test(String(piece.id)))continue;
  if(used.has(piece.id))throw Error("Duplicate official Gear ID "+piece.id);
  used.add(piece.id);
  for(const tab of piece.artificing??[])for(const table of tab.tables??[]) {
   const defaultIndex=table.columns.findIndex(name=>canonical(name)==="default");
   if(defaultIndex<1)continue;
   for(const row of table.rows??[]){
    const key=refinementAttributeFor(row.cells?.[0]);
    if(!key)continue;
    const base=refinementNumber(row.cells[defaultIndex]);
    if(base===null||base<=0)continue;
    const id=key+"|"+piece.gearSlot,old=pool.get(id)??[];
    if(old.some(x=>x.id===piece.id))continue;
    old.push({id:String(piece.id),name:piece.name,slot:piece.gearSlot,attribute:key,
     value:base,raw:String(row.cells[defaultIndex]).trim(),level:Number(piece.level)||0,
     tag:refinementVariantTag(piece.name)});
    pool.set(id,old);
   }
  }
 }
 const result=REFINEMENT_ATTRIBUTES.map(a=>{
  const candidates=REFINEMENT_SLOTS.map(slot=>{
   const list=(pool.get(a.key+"|"+slot)??[]).sort((x,y)=>
    y.value-x.value||y.level-x.level||x.name.localeCompare(y.name)||Number(x.id)-Number(y.id));
   const best=list[0]??null;
   return {slot,best,tied:list.filter(x=>x.value===best?.value).length,available:list.length};
  });
  const globalMax=Math.max(0,...candidates.map(c=>c.best?.value??0));
  return {...a,slots:candidates.map(c=>({...c,
   goodMatch:!!c.best&&c.best.value===globalMax,
   // Every slot has its own best candidate; the glow marks the highest
   // verified default value across the three selected classes.
   }))};
 });
 return result;
}
