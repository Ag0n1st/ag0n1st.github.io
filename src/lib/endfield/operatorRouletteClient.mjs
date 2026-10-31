import roster from "../../data/endfield/endfieldle-roster.json";
import tierlist from "../../data/endfield/tierlists/2026-08-23.json";
import overrides from "../../data/endfield/operator-roulette-overrides.json";
import {getRoulettePools,remainingOperators,randomIndex,winnerRotation,portraitInwardRotation,berlinDay,ROULETTE_TEAM_SIZE} from "./operatorRouletteGame.mjs";

const root=document.querySelector("[data-operator-roulette]");
if(root){
 const en=root.dataset.lang==="en";
 const l=(de,english)=>en?english:de;
 const poolDate=berlinDay();
 const pools=getRoulettePools(tierlist,roster,overrides,poolDate);
 const tabs=[...root.querySelectorAll("[data-roulette-role]")];
 const wheel=root.querySelector("[data-roulette-wheel]");
 const spinButton=root.querySelector("[data-roulette-spin]");
 const hubButton=root.querySelector("[data-roulette-hub]");
 const resetButton=root.querySelector("[data-roulette-reset]");
 const shortMotion=root.querySelector("[data-roulette-short-motion]");
 const availableLabel=root.querySelector("[data-roulette-available]");
 const status=root.querySelector("[data-roulette-status]");
 const slots=[...root.querySelectorAll("[data-roulette-slot]")];
 const roleLabel={"all":l("Alle","All"),"damage-dealer":"Damage Dealer",
  enabler:"Enabler",buffer:"Buffer"};
 let category="all",team=[],rotation=0,spinning=false;
 // CSS transitions are forcibly reduced to .01ms!important by the shared site
 // stylesheet when the browser reports reduced motion. Explicit rAF timing here
 // makes the default 14-second spin reliable in every browser configuration.
 const SPIN_DURATION_MS=5000;
 const SHORT_DURATION_MS=350;
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
  hubButton.disabled=spinButton.disabled;
  resetButton.disabled=spinning||team.length===0;
  shortMotion.disabled=spinning;
  availableLabel.textContent=l("Im Rad: ","On wheel: ")+wheelItems().length;
  root.querySelector("[data-roulette-wheel-panel]").setAttribute("aria-labelledby","or-tab-"+category);
 }
 function renderWheel(){
  const items=wheelItems(),n=items.length;
  wheel.replaceChildren();
  // Preserve the stopped angle across category changes; only a new team resets it.
  wheel.style.transition="none";
  wheel.style.transform="rotate("+rotation+"deg)";
  delete wheel.dataset.result;
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
   const portrait=img(op,"or-wheel-icon");
   portrait.style.setProperty("--or-portrait-inward",portraitInwardRotation(i,n)+"deg");
   sector.append(portrait);
   wheel.append(sector);
  });
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
  // The previous winner remains displayed until the next deliberate spin.
  // Only now remove drawn operators from the physical wheel.
  if(wheel.dataset.result)renderWheel();
  const index=randomIndex(pool.length),selected=pool[index];
  spinning=true;setControls();
  message(l("Das Roulette dreht sich …","Spinning the wheel …"));
  // Explicit choice, never an implicit system media-query override.
  // A user who wants the full spin gets all 5 seconds even when the OS reports
  // prefers-reduced-motion:reduce. A short, accessible option remains available.
  const duration=shortMotion.checked?SHORT_DURATION_MS:SPIN_DURATION_MS;
  const startAngle=rotation;
  const target=winnerRotation(startAngle,index,pool.length,4);
  wheel.dataset.spinDuration=String(duration);
  // No CSS transition: global reduced-motion CSS uses !important and would
  // otherwise complete the wheel rotation immediately.
  wheel.style.transition="none";
  const complete=()=>{
   if(!spinning)return;
   spinning=false;
   rotation=target;
   wheel.style.transform="rotate("+target+"deg)";
   wheel.dataset.result=selected.id;
   delete wheel.dataset.spinDuration;
   wheel.querySelectorAll(".or-wheel-segment").forEach(segment=>{
    segment.classList.toggle("is-winner",segment.dataset.operator===selected.id);
   });
   team.push({...selected,drawCategory:category});
   renderTeam();setControls();
   message(team.length===ROULETTE_TEAM_SIZE
    ?l("Team komplett: "+team.map(x=>x.name).join(", ")+"!","Team complete: "+team.map(x=>x.name).join(", ")+"!")
    :l(selected.name+" ist im Team! Du kannst nun die Kategorie wechseln.",
       selected.name+" joined the team! You can switch categories before the next spin."));
  };
  let startedAt=null;
  const animate=(timestamp)=>{
   if(!spinning)return;
   if(startedAt===null)startedAt=timestamp;
   const progress=Math.min(1,(timestamp-startedAt)/duration);
   // Ease-in/out keeps the wheel visible, then gradually slows to the winner.
   const eased=(1-Math.cos(Math.PI*progress))/2;
   const degrees=startAngle+(target-startAngle)*eased;
   wheel.style.transform="rotate("+degrees+"deg)";
   if(progress<1)window.requestAnimationFrame(animate);
   else complete();
  };
  window.requestAnimationFrame(animate); }
 spinButton.addEventListener("click",spin);
 hubButton.addEventListener("click",spin);
 resetButton.addEventListener("click",()=>{
  if(spinning)return;
  team=[];category="all";rotation=0;renderTeam();renderWheel();
  message(l("Neues Team gestartet. Wähle deine Kategorie und drehe!","New team started. Choose a category and spin!"));
 });
 renderTeam();renderWheel();
 message(l("Wähle eine Kategorie und drehe. Vier unterschiedliche Operatoren bilden dein Team.",
  "Choose a category and spin. Four unique operators form your team."));
}