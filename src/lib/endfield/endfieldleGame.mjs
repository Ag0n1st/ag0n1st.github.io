import {berlinDayKey} from "./eventLifecycle.mjs";

export const FIELDS=Object.freeze(["gender","race","faction","element","class","weaponType","releaseVersion"]);
export const CATEGORY_LABELS={
 gender:{de:"Geschlecht",en:"Gender"},
 race:{de:"Spezies",en:"Species"},
 faction:{de:"Fraktion",en:"Faction"},
 element:{de:"Element",en:"Element"},
 class:{de:"Klasse",en:"Class"},
 weaponType:{de:"Waffentyp",en:"Weapon"},
 releaseVersion:{de:"Release-Version",en:"Release version"}
};
const isMissing=v=>!v||["Undisclosed","Unknown","Variable"].includes(v);
export const nameKey=v=>String(v??"").normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"");
export const versionValue=v=>{
 const found=/^v(\d+)\.(\d+)$/.exec(v??"");
 return found?Number(found[1])*1000+Number(found[2]):null;
};
export function compareOperator(guess,answer){
 if(!guess||!answer)throw Error("Both operators are required");
 return Object.fromEntries(FIELDS.map(key=>{
  const a=answer[key],g=guess[key];
  if(isMissing(a)||isMissing(g))return [key,{kind:"unknown",value:g,direction:null}];
  if(a===g)return [key,{kind:"match",value:g,direction:null}];
  if(key==="releaseVersion"){
   const aa=versionValue(a),gg=versionValue(g);
   if(aa===null||gg===null)throw Error("Invalid release version");
   return [key,{kind:"miss",value:g,direction:aa>gg?"higher":"lower"}];
  }
  return [key,{kind:"miss",value:g,direction:null}];
 }));
}
export function dailyKey(now=new Date()){return berlinDayKey(now);}
export function previousDay(day){
 const dt=new Date(day+"T12:00:00Z");
 if(!Number.isFinite(dt.getTime()))throw Error("Invalid day");
 dt.setUTCDate(dt.getUTCDate()-1);
 return dt.toISOString().slice(0,10);
}
export function nextDay(day){
 const dt=new Date(day+"T12:00:00Z");
 if(!Number.isFinite(dt.getTime()))throw Error("Invalid day");
 dt.setUTCDate(dt.getUTCDate()+1);
 return dt.toISOString().slice(0,10);
}
export function nextBerlinReset(now=new Date()){
 const today=dailyKey(now),start=now.getTime();
 let low=start,high=start+28*60*60*1000;
 if(dailyKey(new Date(high))===today)throw Error("Unresolved next Berlin midnight");
 while(high-low>1000){
  const mid=Math.floor((high+low)/2000)*1000;
  if(dailyKey(new Date(mid))===today)low=mid;
  else high=mid;
 }
 return high;
}
export function validateRosterAndSchedule(operators,schedule,{firstDay,lastDay,excludedPreviousDays=3}){
 const ids=new Set(),names=new Set(),errors=[];
 const allowedElements=new Set(["Physical","Heat","Cryo","Electric","Nature"]);
 const allowedClasses=new Set(["Guard","Striker","Vanguard","Defender","Caster","Supporter"]);
 const allowedWeapons=new Set(["Sword","Greatsword","Polearm","Handcannon","Arts Unit"]);
 const allowedGenders=new Set(["Male","Female","Variable"]);
 const knownRaces=new Set(["Undisclosed","Liberi","Sarkaz","Vouivre","Vulpo","Sankta","Anasa","Caprinae","Kuranta","Cautus","Ursus","Lung","Lupo","Anaty","Perro","Feline","Phidia","Savra","Kylin"]);
 for(const row of operators){
  if(!row.id||ids.has(row.id))errors.push("Duplicate/missing operator id: "+row.id);
  ids.add(row.id);
  if(names.has(nameKey(row.name)))errors.push("Duplicate operator name: "+row.name);
  names.add(nameKey(row.name));
  for(const [field,set] of [["element",allowedElements],["class",allowedClasses],["weaponType",allowedWeapons],["gender",allowedGenders],["race",knownRaces]])
   if(!set.has(row[field]))errors.push(row.id+" invalid "+field+" "+row[field]);
  if(!row.faction||!row.factionCode)errors.push(row.id+" missing faction");
  if(row.availableFrom && !/^\d{4}-\d{2}-\d{2}$/.test(row.availableFrom))errors.push(row.id+" invalid release availability date");
  if(versionValue(row.releaseVersion)===null)errors.push(row.id+" missing release version");
  if(!row.assets?.icon?.endsWith(".webp")||!row.assets?.portrait?.endsWith(".webp"))
    errors.push(row.id+" has missing local artwork");
 }
 const expectedCount=Math.round((new Date(lastDay+"T00:00:00Z")-new Date(firstDay+"T00:00:00Z"))/86400000)+1;
 if(Object.keys(schedule).length!==expectedCount)errors.push("Daily schedule has missing/extraneous days");
 const last=[];
 for(let day=firstDay,step=0;step<expectedCount;day=nextDay(day),step++){
  const id=schedule[day];
  if(!ids.has(id))errors.push(day+" unknown puzzle identity "+id);
  const chosen=operators.find(row=>row.id===id);
  if(chosen?.availableFrom && day<chosen.availableFrom)errors.push(day+" selects "+id+" before official release "+chosen.availableFrom);
  if(last.includes(id))errors.push(day+" repeats an operator among previous "+excludedPreviousDays+" days: "+id);
  last.push(id);
  if(last.length>excludedPreviousDays)last.shift();
 }
 if(errors.length)throw Error("Invalid Endfieldle content:\n"+errors.slice(0,20).join("\n"));
 return true;
}
export function getStreakStatistics(days,today){
 const success=new Set(Object.entries(days??{}).filter(([day,row])=>/^\d{4}-\d{2}-\d{2}$/.test(day)&&row?.solved===true).map(([day])=>day));
 const currentStart=success.has(today)?today:previousDay(today);
 let streak=0,at=currentStart;
 while(success.has(at)){streak++;at=previousDay(at)}
 let best=0,count=0,last="";
 for(const date of [...success].sort()){
  if(last&&previousDay(date)===last)count++;
  else count=1;
  best=Math.max(best,count);
  last=date;
 }
 return {streak,best,solved:success.size,played:Object.keys(days??{}).filter(day=>/^\d{4}-\d{2}-\d{2}$/.test(day)).length};
}
