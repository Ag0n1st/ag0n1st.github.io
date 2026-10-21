// UI filter controls for the static, file-backed Community Leaderboard.
// The server pre-renders every boss/version view, so no external API is needed.
const root=document.querySelector<HTMLElement>("[data-community-leaderboard]");
if(root){
  const bossSelect=root.querySelector<HTMLSelectElement>("[data-boss-select]");
  const versionSelect=root.querySelector<HTMLSelectElement>("[data-version-select]");
  const cards=[...root.querySelectorAll<HTMLButtonElement>("[data-boss-choice]")];
  const panels=[...root.querySelectorAll<HTMLElement>("[data-leaderboard-boss]")];
  function select(boss:string,version:string,updateUrl=true){
    if(!bossSelect||!versionSelect)return;
    if(![...bossSelect.options].some(o=>o.value===boss))boss=bossSelect.value;
    if(![...versionSelect.options].some(o=>o.value===version))version=versionSelect.value;
    bossSelect.value=boss;
    versionSelect.value=version;
    for(const card of cards)card.setAttribute("aria-pressed",String(card.dataset.bossChoice===boss));
    for(const panel of panels)panel.hidden=panel.dataset.leaderboardBoss!==boss||panel.dataset.leaderboardVersion!==version;
    if(updateUrl){
      const url=new URL(location.href);
      if(boss==="si")url.searchParams.delete("boss");
      else url.searchParams.set("boss",boss);
      if(version==="all-time")url.searchParams.delete("version");
      else url.searchParams.set("version",version);
      history.replaceState(null,"",url.pathname+url.search+url.hash);
    }
  }
  bossSelect?.addEventListener("change",()=>select(bossSelect.value,versionSelect?.value??"all-time"));
  versionSelect?.addEventListener("change",()=>select(bossSelect?.value??"si",versionSelect.value));
  cards.forEach(card=>card.addEventListener("click",()=>select(card.dataset.bossChoice??"si",versionSelect?.value??"all-time")));
  const params=new URLSearchParams(location.search);
  const requestedBoss=params.get("boss")??"si";
  const requestedVersion=params.get("version")??"all-time";
  select(requestedBoss,requestedVersion,false);
}
