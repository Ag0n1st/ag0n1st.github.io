import roster from "../../data/endfield/endfieldle-roster.json";
import tierlist from "../../data/endfield/tierlists/2026-08-23.json";
import overrides from "../../data/endfield/operator-roulette-overrides.json";
import {getRoulettePools,remainingOperators,randomIndex,winnerRotation,berlinDay,ROULETTE_TEAM_SIZE} from "./operatorRouletteGame.mjs";

const root=document.querySelector("[data-operator-roulette]");
if(root){
 const en=root.dataset.lang==="en";
 const l=(de,english)=>en?english:de;
 const poolDate=berlinDay();
 const pools=getRoulettePools(tierlist,roster,overrides,poolDate);
 const tabs=[...root.querySelectorAll("[data-roulette-role]")];
 const wheel=root.querySelector("[data-roulette-wheel]");
 const spinButton=root.querySelector("[data-roulette-spin]");
 const resetButton=root.querySelector("[data-roulette-reset]");
 const availableLabel=root.querySelector("[data-roulette-available]");
 const status=root.querySelector("[data-roulette-status]");
 const slots=[...root.querySelectorAll("[data-roulette-slot]")];
 const roleLabel={"all":l("Alle","All"),"damage-dealer":"Damage Dealer",
  enabler:"Enabler",buffer:"Buffer"};
 let category="all",team=[],rotation=0,spinning=false;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 const img=(op,className)=>{
  const node=document.createElement("img");
  node.className=className;
  node.src=op.assets.icon;node.alt="";node.decoding="async";node.loading="eager";
  return node;
 };
 function wheelItems(){
  return remainingOperators(pools,category,team);
 }
 function message(value){status.textContent=value;}
 function renderTeam(){
  slots.forEach((slot,i)=>{
   const op=team[i];slot.replaceChildren();
   slot.classList.toggle("is-filled",Boolean(op));
   if(!op){
    const placeholder=document.createElement("span");
    placeholder.className="or-team-placeholder";
    placeholder.textContent=String(i+1).padStart(2,"0");
    const text=document.createElement("span");
    text.className="or-team-empty";text.textContent=l("Freier Platz","Empty slot");
    slot.append(placeholder,text);
   }else{
    slot.append(img(op,"or-team-avatar"));
    const text=document.createElement("span");text.className="or-team-info";
    const name=document.createElement("strong");name.textContent=op.name;
    const role=document.createElement("small");role.textContent=roleLabel[op.drawCategory];
    text.append(name,role);slot.append(text);
   }
  });
  root.querySelector("[data-roulette-progress]").textContent=team.length+" / "+ROULETTE_TEAM_SIZE;
 }
 function setControls(){
  tabs.forEach(tab=>{
   const role=tab.dataset.rouletteRole;
   tab.setAttribute("aria-selected",String(role===category));
   tab.tabIndex=role===category?0:-1;
   tab.disabled=spinning;
   tab.querySelector("[data-roulette-count]").textContent=String(remainingOperators(pools,role,team).length);
  });
  spinButton.disabled=spinning||team.length>=ROULETTE_TEAM_SIZE||wheelItems().length===0;
  resetButton.disabled=spinning||team.length===0;
  availableLabel.textContent=l("Im Rad: ","On wheel: ")+wheelItems().length;
  root.querySelector("[data-roulette-wheel-panel]").setAttribute("aria-labelledby","or-tab-"+category);
 }
 function renderWheel(){
  const items=wheelItems(),n=items.length;
  wheel.replaceChildren();
  wheel.style.transition="none";wheel.style.transform="rotate(0deg)";
  rotation=0;
  const colors=["#31566a","#65304e","#304353","#663956"];
  wheel.style.background=n
   ? "conic-gradient("+items.map((_,i)=>{
       const a=(i*360/n).toFixed(5),b=((i+1)*360/n).toFixed(5);
       return colors[i%colors.length]+" "+a+"deg "+b+"deg";
     }).join(",")+")"
   : "conic-gradient(#292d35 0deg 360deg)";
  items.forEach((op,i)=>{
   const sector=document.createElement("span");
   sector.className="or-wheel-segment";
   sector.dataset.operator=op.id;
   sector.title=op.name;
   const rad=(i+.5)*2*Math.PI/n;
   const radius=n>24?.402:n>13?.38:.34;
   sector.style.left=(50+Math.sin(rad)*radius*100).toFixed(4)+"%";
   sector.style.top=(50-Math.cos(rad)*radius*100).toFixed(4)+"%";
   sector.append(img(op,"or-wheel-icon"));
   wheel.append(sector);
  });
  const hub=document.createElement("span");hub.className="or-wheel-hub";
  hub.setAttribute("aria-hidden","true");hub.textContent="AG";
  wheel.append(hub);
  setControls();
 }
 function activate(role,focus=false){
  if(spinning||!(role in pools))return;
  category=role;renderWheel();
  if(focus)root.querySelector('[data-roulette-role="'+role+'"]').focus();
  message(team.length===ROULETTE_TEAM_SIZE
   ?l("Team vollständig! Erstelle ein neues Team.","Team complete! Start a new team.")
   :wheelItems().length===0
     ?l("Hier sind keine weiteren Operatoren verfügbar. Wähle eine andere Kategorie.","No operators remain here. Choose another category.")
     :l("Kategorie wählen und drehen – bereits gezogene Operatoren bleiben im Team.","Choose a category and spin – your existing team stays in place."));
 }
 tabs.forEach((tab,index)=>{
  tab.addEventListener("click",()=>activate(tab.dataset.rouletteRole));
  tab.addEventListener("keydown",event=>{
   let idx=index;
   if(event.key==="ArrowRight")idx=(index+1)%tabs.length;
   else if(event.key==="ArrowLeft")idx=(index-1+tabs.length)%tabs.length;
   else if(event.key==="Home")idx=0;
   else if(event.key==="End")idx=tabs.length-1;
   else return;
   event.preventDefault();activate(tabs[idx].dataset.rouletteRole,true);
  });
 });
 function spin(){
  if(spinning||team.length===ROULETTE_TEAM_SIZE)return;
  const pool=wheelItems();
  if(!pool.length){setControls();return;}
  const index=randomIndex(pool.length),selected=pool[index];
  spinning=true;setControls();
  message(l("Das Roulette dreht sich …","Spinning the wheel …"));
  const duration=reduced.matches?70:4600;
  const target=winnerRotation(rotation,index,pool.length,5+randomIndex(3));
  const complete=()=>{
   if(!spinning)return;
   spinning=false;
   rotation=target;
   team.push({...selected,drawCategory:category});
   renderTeam();renderWheel();
   message(team.length===ROULETTE_TEAM_SIZE
    ?l("Team komplett: "+team.map(x=>x.name).join(", ")+"!","Team complete: "+team.map(x=>x.name).join(", ")+"!")
    :l(selected.name+" ist im Team! Du kannst nun die Kategorie wechseln.",
       selected.name+" joined the team! You can switch categories before the next spin."));
  };
  let fallback;
  const done=event=>{
   if(event?.target!==wheel||event?.propertyName!=="transform")return;
   wheel.removeEventListener("transitionend",done);
   window.clearTimeout(fallback);complete();
  };
  wheel.addEventListener("transitionend",done);
  // Double frame ensures the conic wheel's initial transform has a layout frame.
  window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>{
   wheel.style.transition="transform "+duration+"ms cubic-bezier(.12,.79,.16,1)";
   rotation=target;wheel.style.transform="rotate("+target+"deg)";
  }));
  fallback=window.setTimeout(()=>{wheel.removeEventListener("transitionend",done);complete();},duration+900);
 }
 spinButton.addEventListener("click",spin);
 resetButton.addEventListener("click",()=>{
  if(spinning)return;
  team=[];category="all";renderTeam();renderWheel();
  message(l("Neues Team gestartet. Wähle deine Kategorie und drehe!","New team started. Choose a category and spin!"));
 });
 renderTeam();renderWheel();
 message(l("Wähle eine Kategorie und drehe. Vier unterschiedliche Operatoren bilden dein Team.",
  "Choose a category and spin. Four unique operators form your team."));
}