// Both lists are statically pre-rendered. Preserve normal boss/version URL filters.
// Only archive already-ended events at build time, never on the player's timezone.
const root=document.querySelector<HTMLElement>("[data-event-leaderboard]");
if(root){
  const current=root.querySelector<HTMLSelectElement>("[data-event-select]");
  const archive=root.querySelector<HTMLSelectElement>("[data-archive-select]");
  const archiveDetails=root.querySelector<HTMLDetailsElement>("[data-event-archive]");
  const panels=[...root.querySelectorAll<HTMLElement>("[data-event-panel]")];
  function show(select:HTMLSelectElement|undefined,archived:boolean,id:string){
    if(!select||![...select.options].some(option=>option.value===id))return false;
    select.value=id;
    for(const panel of panels){
      if((panel.dataset.eventArchived==="true")===archived)
        panel.hidden=panel.dataset.eventPanel!==id;
    }
    if(!archived){
      const active=panels.find(panel=>panel.dataset.eventArchived==="false"&&panel.dataset.eventPanel===id);
      const image=active?.dataset.eventBackground??"";
      root!.style.setProperty("--cl-event-background",image?'url("'+image+'")':"none");
    }
    return true;
  }
  function setUrl(id:string,archived:boolean){
    const url=new URL(location.href);
    if(!archived&&id===current?.options[0]?.value)url.searchParams.delete("event");
    else url.searchParams.set("event",id);
    history.replaceState(null,"",url.pathname+url.search+url.hash);
  }
  current?.addEventListener("change",()=>{
    if(show(current,false,current.value)){
      if(archiveDetails)archiveDetails.open=false;
      setUrl(current.value,false);
    }
  });
  archive?.addEventListener("change",()=>{
    if(show(archive,true,archive.value))setUrl(archive.value,true);
  });
  function restore(){
    const requested=new URLSearchParams(location.search).get("event");
    if(requested&&archive&&show(archive,true,requested)){
      if(archiveDetails)archiveDetails.open=true;
    }else if(requested&&current&&show(current,false,requested)){
      // Bookmark to an active event, even if it was formerly archived.
    }else if(current){
      show(current,false,current.value);
    }else if(archive){
      show(archive,true,archive.value);
    }
  }
  addEventListener("popstate",restore);
  restore();
}
