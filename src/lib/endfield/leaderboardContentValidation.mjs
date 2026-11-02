import {parseIngameTime} from "./leaderboardRanking.mjs";

const normalisedPath=value=>String(value??"").replace(/\\/g,"/").replace(/\.md$/i,"").toLowerCase();
const youtubeHost=url=>{
  try{
    const parsed=new URL(url);
    return parsed.protocol==="https:" &&
      ["youtu.be","www.youtube.com","youtube.com","m.youtube.com"].includes(parsed.hostname) &&
      Boolean(parsed.pathname.replace(/\//g,""));
  }catch{return false;}
};
const validDate=value=>{
  if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const time=Date.parse(value+"T00:00:00Z");
  return Number.isFinite(time)&&new Date(time).toISOString().startsWith(value);
};

/**
 * Pure, Node-testable validation for manually edited Astro Markdown entries.
 * Throws before a malformed/unapproved run could appear on either locale.
 * Incoming entries: {slug, ...frontmatter}.
 */
export function validateLeaderboardEntries({events,runs,bossSlugs,operatorSlugs}){
  const errors=[];
  const eventById=new Map();
  const knownBosses=new Set(bossSlugs);
  const knownOperators=new Set(operatorSlugs);
  const seenRunIds=new Set();
  const fail=(context,message)=>errors.push(context+": "+message);
  for(const event of events){
    const context="Event "+(event.eventId??"?");
    if(eventById.has(event.eventId))fail(context,"duplicate event ID");
    eventById.set(event.eventId,event);
    const kind=event.kind??"boss";
    if(!["boss","contingency-contract"].includes(kind))fail(context,"unknown event kind");
    if(kind==="boss"&&!knownBosses.has(event.boss))fail(context,"unknown boss "+event.boss);
    if(kind==="contingency-contract"&&event.boss!==undefined)fail(context,"Contingency Contract must not define a boss");
    if(kind==="contingency-contract"&&event.demoRun){
      if(!Number.isSafeInteger(event.demoRun.points)||event.demoRun.points<0)fail(context,"invalid demo score");
      if(parseIngameTime(event.demoRun.time)===null)fail(context,"invalid demo time");
      if(event.demoRun.team?.length!==4)fail(context,"demo requires four operators");
      else for(const member of event.demoRun.team){
        if(!knownOperators.has(member.slug))fail(context,"unknown demo operator "+member.slug);
        if(!Number.isInteger(member.potential)||member.potential<0||member.potential>5)fail(context,"invalid demo potential");
      }
    }
    if(!validDate(event.startsOn)||!validDate(event.endsOn)||event.startsOn>event.endsOn)fail(context,"invalid event period");
    if(!normalisedPath(event.slug).endsWith(event.eventId))fail(context,"filename must match eventId");
    const ruleIds=new Set();
    for(const rule of event.rules){
      if(ruleIds.has(rule.id))fail(context,"duplicate rule "+rule.id);
      ruleIds.add(rule.id);
    }
  }
  for(const run of runs){
    const context="Run "+(run.runId??"?");
    if(seenRunIds.has(run.runId))fail(context,"duplicate run ID");
    seenRunIds.add(run.runId);
    if(!run.eventId && !knownBosses.has(run.boss))fail(context,"unknown boss "+run.boss);
    if(parseIngameTime(run.time)===null)fail(context,"invalid MM:SS time");
    if(!youtubeHost(run.video))fail(context,"expected public YouTube video URL");
    if(!Array.isArray(run.team)||run.team.length!==4)fail(context,"exactly four operators required");
    else {
      const members=new Set();
      for(const member of run.team){
        if(!knownOperators.has(member.slug))fail(context,"unknown operator "+member.slug);
        if(members.has(member.slug))fail(context,"duplicate team member "+member.slug);
        members.add(member.slug);
        if(!Number.isInteger(member.potential)||member.potential<0||member.potential>5)fail(context,"potential outside P0–P5");
      }
    }
    const slug=normalisedPath(run.slug);
    if(run.eventId){
      const event=eventById.get(run.eventId);
      if(!event)fail(context,"unknown event "+run.eventId);
      else {
        const kind=event.kind??"boss";
        if(event.version!==run.version)fail(context,"version differs from event");
        if(kind==="boss"){
          if(event.boss!==run.boss)fail(context,"boss differs from event");
          if(run.points!==undefined)fail(context,"boss run must not include points");
        }else if(kind==="contingency-contract"){
          if(run.boss!==undefined)fail(context,"Contingency Contract run must not define boss");
          if(!Number.isSafeInteger(run.points)||run.points<0)fail(context,"invalid points");
          if(run.eligibleForCommunity)fail(context,"score runs are not eligible for Community Boss Leaderboard");
        }
      }
      if(!slug.startsWith("events/"+run.eventId+"/"))fail(context,"event run must be inside events/<eventId>/");
    }else{
      if(run.eligibleForCommunity)fail(context,"eligibleForCommunity is only for event runs");
      if(run.points!==undefined)fail(context,"general boss runs must not include points");
      if(!slug.startsWith("general/"+run.boss+"/"))fail(context,"general run must be inside general/<boss>/");
    }
    if(run.countryCode && !/^[A-Z]{2,3}$/.test(run.countryCode))fail(context,"invalid country code");
  }
  if(errors.length)throw new Error("Leaderboard Markdown validation failed:\n"+errors.join("\n"));
}
