import {readFileSync} from "node:fs";

/** Edit the owner-maintained src/data/endfield/version-countdown.md, not this loader. */
export function parseVersionCountdownMarkdown(source){
 const frontmatter=source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
 if(!frontmatter)throw Error("Missing version countdown Markdown frontmatter");
 const config={};
 for(const line of frontmatter.split(/\r?\n/)){
  if(!line.trim()||line.trim().startsWith("#"))continue;
  const match=line.match(/^([a-zA-Z][\w]*):\s*(?:"([^"]*)"|'([^']*)'|([^#\s]+))\s*$/);
  if(!match)throw Error("Invalid countdown metadata: "+line);
  config[match[1]]=match[2]??match[3]??match[4];
 }
 for(const key of ["version","name","endsAt","timeZone","status","sourceLabelDe","sourceLabelEn"]){
  if(!config[key])throw Error("Missing countdown metadata: "+key);
 }
 if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/.test(config.endsAt)
   ||!Number.isFinite(Date.parse(config.endsAt)))throw Error("Invalid ISO-8601 countdown date with UTC offset");
 try{new Intl.DateTimeFormat("de-DE",{timeZone:config.timeZone}).format(new Date(config.endsAt));}
 catch{throw Error("Invalid countdown IANA time zone");}
 if(!["estimated","confirmed"].includes(config.status))throw Error("Invalid countdown status");
 const zoneCheck=new Intl.DateTimeFormat("en-CA",{timeZone:config.timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date(config.endsAt));
 if(!zoneCheck)throw Error("Invalid local countdown time");
 return Object.freeze({...config,zone:config.timeZone});
}
export const CURRENT_VERSION=parseVersionCountdownMarkdown(
 readFileSync(new URL("./version-countdown.md",import.meta.url),"utf8")
);
