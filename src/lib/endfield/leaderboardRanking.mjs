/**
 * Permanent Endfield boss leaderboard. A run's official result is the in-game
 * MM:SS timer; there is no hidden hundredths-of-seconds tiebreaker.
 * Verified results and demonstrations are stored separately.
 */
export const TIME_PATTERN=/^\d{2,}:[0-5]\d$/;
export function parseIngameTime(value){
  if(typeof value!=="string"||!TIME_PATTERN.test(value))return null;
  const [minutes,seconds]=value.split(":").map(Number);
  const total=minutes*60+seconds;
  return Number.isSafeInteger(total)?total:null;
}
export function rankVerifiedRuns(runs,{boss,version="all-time",limit=10}={}){
  const bestByPlayer=new Map();
  for(const run of runs){
    if(run?.status!=="verified"||run.boss!==boss)continue;
    if(version!=="all-time"&&run.version!==version)continue;
    const seconds=parseIngameTime(run.time);
    if(seconds===null||typeof run.playerId!=="string"||!run.playerId.trim())continue;
    const key=run.playerId.trim().toLowerCase();
    const previous=bestByPlayer.get(key);
    if(!previous||seconds<previous.seconds||
       (seconds===previous.seconds&&String(run.id).localeCompare(String(previous.run.id))<0)){
      bestByPlayer.set(key,{run,seconds});
    }
  }
  const sorted=[...bestByPlayer.values()].sort((a,b)=>a.seconds-b.seconds||
    String(a.run.playerId).localeCompare(String(b.run.playerId))||
    String(a.run.id).localeCompare(String(b.run.id)));
  let previousTime=null;
  let rank=0;
  const result=[];
  for(let i=0;i<sorted.length;i++){
    if(sorted[i].seconds!==previousTime){rank=i+1;previousTime=sorted[i].seconds;}
    if(rank>limit)break; // Include all ties at the last featured place.
    result.push({...sorted[i].run,rank});
  }
  return result;
}
export function displayLeaderboardRows(data,boss,version="all-time"){
  const verified=rankVerifiedRuns(data.verifiedRuns||[],{boss,version});
  if(verified.length)return verified;
  // Explicitly non-competitive owner demo for the default Rhodagn view only.
  const examples=(data.demoRuns||[]).filter(run=>
    run.status==="demo" && run.boss==="rhodagn" && run.boss===boss &&
    (version==="all-time"||run.version===version));
  return examples.map((run,i)=>({...run,rank:i+1}));
}
export function flagForCountry(code){
  if(typeof code!=="string"||!code)return "🌐";
  const alpha2=code.toUpperCase()==="DEU"?"DE":code.toUpperCase();
  if(!/^[A-Z]{2}$/.test(alpha2))return "🌐";
  return [...alpha2].map(letter=>String.fromCodePoint(0x1f1e6+letter.charCodeAt(0)-65)).join("");
}
