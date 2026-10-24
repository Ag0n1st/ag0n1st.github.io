import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {validateLeaderboardEntries} from "../../src/lib/endfield/leaderboardContentValidation.mjs";
const goodEvent={
 eventId:"duality",slug:"duality",boss:"si",version:"v1.6",
 startsOn:"2026-10-15",endsOn:"2026-11-25",
 rules:[{id:"boss",de:"Boss Si",en:"Boss Si"}]
};
const goodRun={
 runId:"krombi",slug:"events/duality/krombi-0129",playerId:"krombi",
 status:"verified",boss:"si",version:"v1.6",time:"01:29",
 video:"https://youtu.be/24_sKEqnCm0",eventId:"duality",
 eligibleForCommunity:true,team:[
  {slug:"si",potential:4},{slug:"arcane",potential:3},
  {slug:"tangtang",potential:4},{slug:"gilberta",potential:2}
 ]
};
const args={events:[goodEvent],runs:[goodRun],bossSlugs:["si","rhodagn"],operatorSlugs:["si","arcane","tangtang","gilberta"]};
const check=(change,match)=>assert.throws(()=>validateLeaderboardEntries({...args,...change}),match);
test("one verified event Markdown record can feed event and global rankings",()=>{
 assert.doesNotThrow(()=>validateLeaderboardEntries(args));
 const publicRuns=args.runs.filter(x=>x.status==="verified");
 assert.equal(publicRuns.filter(x=>x.eventId==="duality").length,1);
 assert.equal(publicRuns.filter(x=>x.eligibleForCommunity===true).length,1);
});
test("reject duplicate identities, broken links, unknown games, and malformed teams",()=>{
 check({runs:[goodRun,goodRun]},/duplicate run ID/);
 check({events:[goodEvent,goodEvent]},/duplicate event ID/);
 check({runs:[{...goodRun,boss:"other"}]},/unknown boss/);
 check({runs:[{...goodRun,time:"01:29.33"}]},/invalid MM:SS/);
 check({runs:[{...goodRun,video:"https://example.com/watch"}]},/YouTube/);
 check({runs:[{...goodRun,team:[goodRun.team[0]]}]},/exactly four/);
 check({runs:[{...goodRun,team:[...goodRun.team.slice(0,3),{slug:"invalid",potential:0}]}]},/unknown operator/);
 check({runs:[{...goodRun,team:[...goodRun.team.slice(0,3),{slug:"si",potential:6}]}]},/duplicate team member|potential outside/);
 check({runs:[{...goodRun,team:[...goodRun.team.slice(0,3),{slug:"si",potential:1}]}]},/duplicate team member/);
 check({runs:[{...goodRun,eventId:"unknown"}]},/unknown event/);
 check({runs:[{...goodRun,version:"v1.7"}]},/differs from event/);
 check({runs:[{...goodRun,slug:"general/si/krombi"}]},/event run must be inside/);
 check({runs:[{...goodRun,eventId:undefined,slug:"events/duality/krombi-0129",eligibleForCommunity:false}]},/general run must be inside/);
 check({runs:[{...goodRun,eventId:undefined,eligibleForCommunity:true}]},/eligibleForCommunity is only/);
});
test("reject wrong event dates or file names",()=>{
 check({events:[{...goodEvent,startsOn:"2026-02-30"}]},/invalid event period/);
 check({events:[{...goodEvent,endsOn:"2026-10-01"}]},/invalid event period/);
 check({events:[{...goodEvent,slug:"wrong"}]},/filename must match/);
 check({events:[{...goodEvent,rules:[{id:"x",de:"a",en:"a"},{id:"x",de:"b",en:"b"}]}]},/duplicate rule/);
});
test("Markdown templates remain drafts and official record stays single-source",()=>{
 const paths=[
 "src/content/leaderboard-runs/general/_regular-run-template.md",
 "src/content/leaderboard-runs/events/_event-run-template.md"
 ];
 for(const file of paths)assert.match(readFileSync(file,"utf8"),/status: draft/);
 const run=readFileSync("src/content/leaderboard-runs/events/duality/krombi-0129.md","utf8");
 assert.match(run,/eligibleForCommunity: true/);
 assert.match(run,/status: verified/);
});
