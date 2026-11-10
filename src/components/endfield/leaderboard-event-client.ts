// Pre-rendered Event Leaderboard: quick buttons for concurrent events, archived select below.
const root=document.querySelector<HTMLElement>("[data-event-leaderboard]");
if(root){
  const choices=[...root.querySelectorAll<HTMLButtonElement>("[data-event-choice]")];
  const archive=root.querySelector<HTMLSelectElement>("[data-archive-select]");
  const archiveDetails=root.querySelector<HTMLDetailsElement>("[data-event-archive]");
  const panels=[...root.querySelectorAll<HTMLElement>("[data-event-panel]")];
  const achievementBadges=[...root.querySelectorAll<HTMLElement>("[data-event-achievement]")];
  const activePanels=panels.filter(panel=>panel.dataset.eventArchived==="false");
  const archivedPanels=panels.filter(panel=>panel.dataset.eventArchived==="true");
  const defaultId=activePanels[0]?.dataset.eventPanel;
  function show(id:string,archived:boolean){
    const subset=archived?archivedPanels:activePanels;
    if(!subset.some(panel=>panel.dataset.eventPanel===id))return false;
    for(const panel of subset)panel.hidden=panel.dataset.eventPanel!==id;
    if(archived){
      if(archive)archive.value=id;
    }else{
      for(const choice of choices)choice.setAttribute("aria-pressed",String(choice.dataset.eventChoice===id));
      for(const badge of achievementBadges)badge.hidden=badge.dataset.eventAchievement!==id;
      const image=activePanels.find(panel=>panel.dataset.eventPanel===id)?.dataset.eventBackground??"";
      root!.style.setProperty("--cl-event-background",image?'url("'+image+'")':"none");
    }
    return true;
  }
  function setUrl(id:string,archived:boolean){
    const url=new URL(location.href);
    if(!archived&&id===defaultId)url.searchParams.delete("event");
    else url.searchParams.set("event",id);
    history.replaceState(null,"",url.pathname+url.search+url.hash);
  }
  for(const choice of choices){
    choice.addEventListener("click",()=>{
      const id=choice.dataset.eventChoice;
      if(id&&show(id,false)){
        if(archiveDetails)archiveDetails.open=false;
        setUrl(id,false);
      }
    });
  }
  archive?.addEventListener("change",()=>{
    if(show(archive.value,true))setUrl(archive.value,true);
  });
  function restore(){
    const requested=new URLSearchParams(location.search).get("event");
    if(requested&&show(requested,true)){
      if(archiveDetails)archiveDetails.open=true;
    }else if(requested&&show(requested,false)){
      if(archiveDetails)archiveDetails.open=false;
    }else if(defaultId){
      show(defaultId,false);
      if(archiveDetails)archiveDetails.open=false;
    }else if(archive&&archivedPanels.length){
      show(archive.value,true);
    }
  }
  for(const panel of panels){
    const trigger=panel.querySelector<HTMLButtonElement>("[data-rule-explanation-open]");
    const dialog=panel.querySelector<HTMLDialogElement>("[data-rule-explanation-dialog]");
    if(!trigger||!dialog)continue;
    trigger.addEventListener("click",()=>{if(!dialog.open)dialog.showModal();});
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener("close",()=>{if(!panel.hidden)trigger.focus();});
  }
  // Date gating uses Berlin editorial calendar, not the viewer's local timezone.
  // Week 1 is immutable: Week 2 shows week-1 submissions plus newer best scores.
  const todayBerlin=()=>{
    const parts=Object.fromEntries(new Intl.DateTimeFormat("en-GB",{
      timeZone:"Europe/Berlin",year:"numeric",month:"2-digit",day:"2-digit"
    }).formatToParts(new Date()).filter(part=>part.type!=="literal").map(part=>[part.type,part.value]));
    return parts.year+"-"+parts.month+"-"+parts.day;
  };
  for(const switcher of root.querySelectorAll<HTMLElement>("[data-cc-week-switch]")){
    const choices=[...switcher.querySelectorAll<HTMLButtonElement>("[data-cc-week-choice]")];
    const result=switcher.closest<HTMLElement>(".cl-event-results");
    const weeks=[...result?.querySelectorAll<HTMLTableSectionElement>("[data-cc-week-rows]")??[]];
    const weekTwo=choices.find(choice=>choice.dataset.ccWeekChoice==="2");
    const available=Boolean(switcher.dataset.weekTwoStart&&todayBerlin()>=switcher.dataset.weekTwoStart);
    if(weekTwo)weekTwo.disabled=!available;
    const choose=(week:1|2)=>{
      if(week===2&&!available)return;
      for(const choice of choices)choice.setAttribute("aria-pressed",String(Number(choice.dataset.ccWeekChoice)===week));
      for(const section of weeks)section.hidden=Number(section.dataset.ccWeekRows)!==week;
    };
    for(const choice of choices)choice.addEventListener("click",()=>{
      const week=Number(choice.dataset.ccWeekChoice);
      if(week===1||week===2)choose(week);
    });
    choose(available?2:1);
  }
  addEventListener("popstate",restore);
  restore();
}
