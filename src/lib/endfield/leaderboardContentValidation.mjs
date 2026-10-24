import {parseIngameTime} from "./leaderboardRanking.mjs";

const normalisedPath=value=>String(value??"").replace(/\\/g,"/").replace(/\\.md$/i,"").toLowerCase();
const youtubeHost=url=>{
  try{
    const parsed=new URL(url);
    return parsed.protocol==="https:" &&
      ["youtu.be","www.youtube.com","youtube.com","m.youtube.com"].includes(parsed.hostname) &&
      Boolean(parsed.pathname.replace(/\\//g,""));
  }catch{return false;}
};
const validDate=value=>{
  if(typeof value!=="string"||!/^\\d{4}-\\d{2}-\\d{2}$/.test(value))return false;
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
    if(!knownBosses.has(event.boss))fail(context,"unknown boss "+event.boss);
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
    if(!knownBosses.has(run.boss))fail(context,"unknown boss "+run.boss);
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
      else if(event.boss!==run.boss||event.version!==run.version)fail(context,"boss/version differs from event");
      if(!slug.startsWith("events/"+run.eventId+"/"))fail(context,"event run must be inside events/<eventId>/");
    }else{
      if(run.eligibleForCommunity)fail(context,"eligibleForCommunity is only for event runs");
      if(!slug.startsWith("general/"+run.boss+"/"))fail(context,"general run must be inside general/<boss>/");
    }
    if(run.countryCode && !/^[A-Z]{2,3}$/.test(run.countryCode))fail(context,"invalid country code");
  }
  if(errors.length)throw new Error("Leaderboard Markdown validation failed:\\n"+errors.join("\\n"));
}
