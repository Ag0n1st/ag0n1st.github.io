import roster from "../../data/endfield/endfieldle-roster.json";
import plan from "../../data/endfield/endfieldle-schedule.json";
import {dailyKey,previousDay,nextBerlinReset,compareOperator,FIELDS,nameKey,getStreakStatistics} from "./endfieldleGame.mjs";

const root=document.querySelector("[data-endfieldle]");
if(root){
 const en=root.dataset.lang==="en";
 const l=(de,english)=>en?english:de;
 const byId=new Map(roster.operators.map(o=>[o.id,o]));
 const keys=new Map(roster.operators.map(o=>[nameKey(o.name),o]));
 keys.set("wulfguard",byId.get("wulfgard"));
 keys.set("endministratorm",byId.get("endministrator"));
 keys.set("endministratorf",byId.get("endministrator"));
 const node=sel=>root.querySelector(sel);
 const form=node("[data-guess-form]"),input=node("[data-guess-input]");
 const suggestions=node("[data-suggestions]"),tbody=node("[data-results]");
 const feedback=node("[data-feedback]"),winner=node("[data-winner]");
 const STORAGE="endfieldle:v1";
 function saved(){
  try{
   const value=JSON.parse(localStorage.getItem(STORAGE)??'{"days":{}}');
   return value&&typeof value==="object"&&value.days&&typeof value.days==="object"?value:{days:{}};
  }catch{return {days:{}}}
 }
 const memory=saved();
 const persist=()=>{try{localStorage.setItem(STORAGE,JSON.stringify(memory))}catch{/* Storage disabled: game remains playable in this tab. */}};
 let today="",solution=null,record=null,resetTime=0,selected=0,visible=[];
 function el(tag,klass,content){
  const n=document.createElement(tag);
  if(klass)n.className=klass;
  if(content!==undefined)n.textContent=String(content);
  return n;
 }
 const genders={Male:l("Männlich","Male"),Female:l("Weiblich","Female"),Variable:l("Variabel","Variable")};
 const classes={Guard:l("Wächter","Guard"),Striker:l("Stürmer","Striker"),Defender:l("Verteidiger","Defender"),Vanguard:l("Vorhut","Vanguard"),Supporter:l("Unterstützer","Supporter"),Caster:l("Caster","Caster")};
 const elements={Physical:l("Physisch","Physical"),Heat:l("Hitze","Heat"),Cryo:l("Kryo","Cryo"),Electric:l("Elektro","Electric"),Nature:l("Natur","Nature")};
 const weaponNames={Greatsword:l("Großschwert","Greatsword"),Sword:l("Schwert","Sword"),Polearm:l("Stangenwaffe","Polearm"),Handcannon:l("Handkanone","Handcannon"),"Arts Unit":l("Arts-Einheit","Arts Unit")};
 const factions={endfield:"Endfield",has:"HAS",rhodes:"Rhodes Island",tgcc:"TGCC",steel:l("Stahleid","Steel Oath"),sesqa:"Seš'qa",hannabit:"Hannabit",cabal:l("Tranquility","Tranquility"),united:l("Gewerkschaften","Workers' Unions")};
 function valueText(o,k){
  if(k==="gender")return genders[o.gender]??o.gender;
  if(k==="element")return elements[o.element]??o.element;
  if(k==="class")return classes[o.class]??o.class;
  if(k==="weaponType")return weaponNames[o.weaponType]??o.weaponType;
  if(k==="faction")return factions[o.factionCode]??o.faction;
  if(k==="race"&&o.race==="Undisclosed")return l("Unbekannt","Undisclosed");
  return o[k]??"–";
 }
 function image(src,alt,klass){
  const x=el("img",klass);x.src=src;x.alt=alt;x.loading="lazy";x.decoding="async";return x;
 }
 function status(message,error=false){
  feedback.textContent=message;feedback.classList.toggle("is-error",error);
 }
 function renderSuggestions(){
  const term=nameKey(input.value);
  suggestions.replaceChildren();
  visible=term&&!record?.solved?roster.operators.filter(o=>nameKey(o.name).includes(term)&&!record?.guesses?.includes(o.id)).slice(0,9):[];
  if(selected>=visible.length)selected=0;
  visible.forEach((o,index)=>{
   const button=el("button","efdl-option");button.type="button";
   button.setAttribute("role","option");button.setAttribute("aria-selected",String(index===selected));
   button.id="efdl-option-"+index;
   button.append(image(o.assets.icon,""),el("span","",o.name));
   button.addEventListener("mousedown",e=>e.preventDefault());
   button.addEventListener("click",()=>submitGuess(o));
   suggestions.append(button);
  });
  suggestions.hidden=visible.length===0;
  input.setAttribute("aria-expanded",String(!suggestions.hidden));
  input.setAttribute("aria-activedescendant",!suggestions.hidden?"efdl-option-"+selected:"");
 }
 function renderRows(){
  tbody.replaceChildren();
  const total=record?.guesses?.length??0;
  for(const id of [...(record?.guesses??[])].reverse()){
   const o=byId.get(id);if(!o)continue;
   const tr=el("tr");
   const name=el("th");name.scope="row";
   const cell=el("span","efdl-guess-name");
   cell.append(image(o.assets.icon,""),el("span","",o.name));
   name.append(cell);tr.append(name);
   const matched=compareOperator(o,solution);
   for(const field of FIELDS){
    const score=matched[field];
    const td=el("td");
    const tile=el("span","efdl-cell is-"+(score.kind==="match"?"match":score.kind==="unknown"?"unknown":"miss"),valueText(o,field));
    if(score.direction){
     const arrow=el("span","efdl-arrow",score.direction==="higher"?"↑":"↓");
     arrow.setAttribute("aria-label",score.direction==="higher"?l("Der gesuchte Operator erschien später","Target released later"):l("Der gesuchte Operator erschien früher","Target released earlier"));
     tile.append(arrow);
    }
    td.append(tile);tr.append(td);
   }
   tbody.append(tr);
  }
  node("[data-attempts]").textContent=total?l(total+" Versuch"+(total===1?"":"e"),total+" guess"+(total===1?"":"es")):l("Noch keine Versuche.","No guesses yet.");
 }
 function renderWin(){
  winner.hidden=!record?.solved;
  input.disabled=Boolean(record?.solved);
  node("[data-submit]").disabled=Boolean(record?.solved);
  if(record?.solved){
   const portrait=node("[data-winner-portrait]");portrait.src=solution.assets.portrait;portrait.alt=solution.name;
   node("[data-winner-name]").textContent=solution.name;
   const n=record.guesses.length;
   node("[data-winner-summary]").textContent=l("Richtig erraten in "+n+" Versuch"+(n===1?"":"en")+"! Morgen wartet ein neuer Operator.","Solved in "+n+" guess"+(n===1?"":"es")+"! A new operator awaits tomorrow.");
  }
 }
 function renderStats(){
  const stats=getStreakStatistics(memory.days,today);
  node("[data-streak]").textContent=stats.streak;
  node("[data-stat-best]").textContent=stats.best;
  node("[data-stat-played]").textContent=stats.played;
  node("[data-stat-solved]").textContent=stats.solved;
 }
 function renderYesterday(){
  const id=plan.days[previousDay(today)],operator=byId.get(id),wrap=node("[data-yesterday]");
  wrap.replaceChildren();
  if(!operator){wrap.append(el("p","",l("Noch kein gestriges Rätsel vorhanden.","No previous puzzle available.")));return}
  const details=el("div");
  details.append(el("strong","",operator.name),el("small","",operator.releaseVersion+" · "+valueText(operator,"element")));
  wrap.append(image(operator.assets.portrait,operator.name),details);
 }
 function refresh(day){
  today=day;
  const id=plan.days[day];solution=byId.get(id);
  const entries=Object.keys(plan.days);
  node("[data-puzzle-number]").textContent=plan.days[day]?entries.indexOf(day)+1:"–";
  if(!solution){
    form.hidden=true;status(l("Für diesen Tag ist noch kein Rätsel hinterlegt. Der Tagesplan muss erweitert werden.","No puzzle is available for this date. The daily schedule needs updating."),true);
    return;
  }
  form.hidden=false;
  const stored=memory.days[day];
  record=stored&&typeof stored==="object"?stored:{guesses:[],solved:false};
  if(!Array.isArray(record.guesses))record.guesses=[];
  record.guesses=record.guesses.filter((x,i,a)=>byId.has(x)&&a.indexOf(x)===i);
  record.solved=record.guesses.includes(solution.id);
  input.value="";selected=0;renderSuggestions();
  status(record.solved?l("Heutiges Rätsel abgeschlossen!","Today's puzzle complete!"):"");
  renderRows();renderWin();renderYesterday();renderStats();
  resetTime=nextBerlinReset();
 }
 function submitGuess(operator){
  if(!solution||record.solved)return;
  const choice=operator??keys.get(nameKey(input.value));
  if(!choice){status(l("Bitte einen gültigen Operator aus der Liste auswählen.","Select a valid operator from the list."),true);return}
  if(record.guesses.includes(choice.id)){status(l("Diesen Operator hast du bereits versucht.","You've already guessed that operator."),true);return}
  record.guesses.push(choice.id);
  if(choice.id===solution.id)record.solved=true;
  memory.days[today]=record;persist();
  input.value="";selected=0;renderSuggestions();renderRows();renderWin();renderStats();
  status(record.solved?l("Richtig! Heute war "+solution.name+" gesucht.","Correct! Today's operator was "+solution.name+"."):l("Noch nicht richtig – nutze die Hinweise!","Not yet – use the clues!"));
  if(!record.solved)input.focus();
 }
 form.addEventListener("submit",e=>{e.preventDefault();submitGuess(visible[selected]&&nameKey(visible[selected].name)===nameKey(input.value)?visible[selected]:null)});
 input.addEventListener("input",()=>{selected=0;renderSuggestions()});
 input.addEventListener("keydown",e=>{
  if(e.key==="Escape"){suggestions.hidden=true;input.setAttribute("aria-expanded","false");return}
  if(!visible.length)return;
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){
   e.preventDefault();selected=(selected+(e.key==="ArrowDown"?1:-1)+visible.length)%visible.length;renderSuggestions();
  }else if(e.key==="Enter"&&!suggestions.hidden){
   e.preventDefault();submitGuess(visible[selected]);
  }
 });
 input.addEventListener("blur",event=>{
  // Mobile suggestions participate in form layout. Do not collapse them on
  // pointer-down focus transfer to Submit or the button shifts before click.
  if(event.relatedTarget===node("[data-submit]"))return;
  suggestions.hidden=true;input.setAttribute("aria-expanded","false");
});
 node("[data-share]").addEventListener("click",async()=>{
  const result="Endfieldle #"+node("[data-puzzle-number]").textContent+" "+record.guesses.length+"/34 "+(record.solved?"✅":"")+"\n"+(record.guesses.map(id=>FIELDS.map(field=>{
   const score=compareOperator(byId.get(id),solution)[field];
   return score.kind==="match"?"🟩":score.kind==="unknown"?"⬜":"🟥";
  }).join("")).join("\n"))+"\nhttps://ag0n1st.com/"+(en?"en/":"")+"endfield/endfieldle/";
  try{
   await navigator.clipboard.writeText(result);
   status(l("Ergebnis kopiert!","Result copied!"));
  }catch{status(l("Teilen ist in diesem Browser nicht verfügbar.","Sharing is not available in this browser."),true)}
 });
 refresh(dailyKey());
 function clock(){
  const now=new Date(),date=dailyKey(now);
  if(date!==today){refresh(date);return}
  if(!resetTime)return;
  const seconds=Math.max(0,Math.ceil((resetTime-now.getTime())/1000));
  const pad=n=>String(n).padStart(2,"0");
  node("[data-reset]").textContent=pad(Math.floor(seconds/3600))+":"+pad(Math.floor(seconds%3600/60))+":"+pad(seconds%60);
 }
 clock();setInterval(clock,1000);
}
