import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {rankContingencyContractRuns,rankContingencyContractWeek,rankVerifiedRuns} from "../../src/lib/endfield/leaderboardRanking.mjs";
import {validateLeaderboardEntries} from "../../src/lib/endfield/leaderboardContentValidation.mjs";
const read=path=>readFileSync(path,"utf8");
const event={eventId:"cc-test",kind:"contingency-contract",slug:"cc-test",version:"v1.6",startsOn:"2026-11-05",weekTwoStartsOn:"2026-11-15",endsOn:"2026-11-25",rules:[{id:"ingame"}]};
const run=(id,player,points,time,other={})=>({runId:id,id,slug:"events/cc-test/"+id,eventId:"cc-test",status:"verified",playerId:player,
 discordName:player,points,time,ccWeek:1,version:"v1.6",video:"https://youtu.be/SDqsynAplyI",
 eligibleForCommunity:false,team:[{slug:"si",potential:0},{slug:"arcane",potential:0},{slug:"tangtang",potential:0},{slug:"gilberta",potential:0}],...other});
test("Score first, time breaks score ties, one best run per player",()=>{
  const runs=[run("a1","A",40,"02:00"),run("a2","A",45,"05:10"),run("b","B",45,"04:45"),run("c","C",43,"00:59"),
   run("d","D",45,"04:45"),run("draft","X",999,"00:01",{status:"draft"})];
  const results=rankContingencyContractRuns(runs,{eventId:"cc-test",version:"v1.6"});
  assert.deepEqual(results.map(r=>[r.playerId,r.rank]),[["B",1],["D",1],["A",3],["C",4]]);
  assert.equal(rankVerifiedRuns(runs,{boss:"si",version:"v1.6"}).length,0);
});
test("CC entries reject unknown bosses, missing score and global leaderboard leakage",()=>{
  const base=run("valid","A",45,"04:45");
  assert.doesNotThrow(()=>validateLeaderboardEntries({events:[event],runs:[base],bossSlugs:["si"],operatorSlugs:["si","arcane","tangtang","gilberta"]}));
  for(const override of [{points:undefined},{boss:"si"},{eligibleForCommunity:true}]){
    assert.throws(()=>validateLeaderboardEntries({events:[event],runs:[{...base,...override}],bossSlugs:["si"],operatorSlugs:["si","arcane","tangtang","gilberta"]}));
  }
});
test("Shared panel supports CC point column and does not alter boss table",()=>{
  const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
  const eventUI=read("src/components/endfield/LeaderboardEvent.astro");
  const client=read("src/components/endfield/leaderboard-event-client.ts");
  assert.match(panel,/rankContingencyContractWeek/);
  assert.match(panel,/isContract&&<th scope="col">/);
  assert.match(panel,/cl-run-points/);
  assert.match(panel,/class="cl-cc-score"/);
  assert.match(panel,/class="cl-cc-score-mark"/);
  assert.match(panel,/aria-label=\{l\(/);
  const css=read("src/styles/endfield-leaderboard.css");
  assert.match(css,/contingency-contract-score-symbol\.webp/);
  const thumbnail=readFileSync("public/images/endfield/leaderboard/contingency-contract-v16.webp");
  const emblem=readFileSync("public/images/endfield/leaderboard/contingency-contract-score-symbol.webp");
  assert.equal(thumbnail.toString("ascii",0,4),"RIFF");
  assert.equal(emblem.toString("ascii",0,4),"RIFF");
  assert.ok(thumbnail.length>100000,"full-fidelity banner must not be aggressively recompressed");

  assert.match(panel,/<\/dialog>\}\s*<div class="cl-event-results">/);
  assert.match(eventUI,/selectable.length>1/);
  assert.match(client,/data-event-choice/);
  assert.match(client,/dataset\.eventBackground/);
  assert.match(client,/data-event-achievement/);
});

test("Event quick buttons do not duplicate the upcoming date",()=>{
  const ui=read("src/components/endfield/LeaderboardEvent.astro");
  const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
  assert.doesNotMatch(ui,/cl-event-choice-upcoming/);
  assert.match(ui,/\{selectable\.map\(\(event,index\)=>/);
  assert.match(panel,/cl-event-upcoming-notice/);
  assert.match(panel,/event\.startsOn\.slice\(0,4\)/);
});

test("CC score label shrinks approximately 30 percent across desktop and mobile without affecting ranking",()=>{
  const css=read("src/styles/endfield-leaderboard.css");
  assert.match(css,/\.cl-cc-score\{[^\n]*min-width:64px;height:27px/);
  assert.match(css,/\.cl-cc-score-value\{[^\n]*font-size:15px/);
  assert.match(css,/\.cl-cc-score-mark\{[^\n]*width:21px;height:21px/);
  assert.match(css,/@media\(max-width:460px\)\{\.cl-cc-score\{min-width:54px;height:24px/);
  assert.match(css,/@media\(max-width:460px\)\{[^\n]*\.cl-cc-score-value\{font-size:13px/);
  assert.match(css,/@media\(max-width:460px\)\{[^\n]*\.cl-cc-score-mark\{width:18px;height:18px/);
});

test("CC week 1 stays frozen; week 2 inherits entries and upgrades each player's best run",()=>{
 const list=[
  run("a-w1","Ag0n1st",48,"06:14",{ccWeek:1}),
  run("b-w1","B",46,"05:00",{ccWeek:1}),
  run("a-w2","Ag0n1st",54,"08:00",{ccWeek:2}),
  run("b-w2","B",45,"04:00",{ccWeek:2}),
  run("c-w2","C",54,"07:59",{ccWeek:2})
 ];
 assert.deepEqual(rankContingencyContractWeek(list,{eventId:"cc-test",week:1}).map(r=>[r.playerId,r.points,r.time,r.rank]),
   [["Ag0n1st",48,"06:14",1],["B",46,"05:00",2]]);
 assert.deepEqual(rankContingencyContractWeek(list,{eventId:"cc-test",week:2}).map(r=>[r.playerId,r.points,r.time,r.rank]),
   [["C",54,"07:59",1],["Ag0n1st",54,"08:00",2],["B",46,"05:00",3]]);
 assert.equal(rankContingencyContractWeek(list,{eventId:"cc-test",week:2}).filter(r=>r.playerId==="Ag0n1st").length,1);
 assert.deepEqual(rankContingencyContractWeek(list,{eventId:"cc-test",week:1})[0].id,"a-w1");
 assert.throws(()=>rankContingencyContractWeek(list,{eventId:"cc-test",week:3}),/CC week/);
});
test("Weekly CC Markdown is validated and may not leak to boss rankings",()=>{
 const base=run("valid-week","A",48,"06:14");
 for(const override of [{ccWeek:undefined},{ccWeek:0},{ccWeek:3}])
   assert.throws(()=>validateLeaderboardEntries({events:[event],runs:[{...base,...override}],bossSlugs:["si"],operatorSlugs:["si","arcane","tangtang","gilberta"]}),/CC week/);
 const badEvent={...event,weekTwoStartsOn:"2026-11-26"};
 assert.throws(()=>validateLeaderboardEntries({events:[badEvent],runs:[base],bossSlugs:["si"],operatorSlugs:["si","arcane","tangtang","gilberta"]}),/CC week 2 start/);
});
test("CC v1.6 contains week 2 date and both week selectors with disabled future state",()=>{
 const eventMd=read("src/content/leaderboard-events/contingency-contract-v16.md");
 const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
 const client=read("src/components/endfield/leaderboard-event-client.ts");
 const css=read("src/styles/endfield-leaderboard.css");
 const schema=read("src/content/config.ts");
 assert.match(eventMd,/weekTwoStartsOn: "2026-11-15"/);
 assert.match(schema,/ccWeek:z\.number\(\)\.int\(\)\.min\(1\)\.max\(2\)\.optional\(\)/);
 assert.match(schema,/weekTwoStartsOn:z\.string\(\)/);
 assert.match(panel,/rankContingencyContractWeek/);
 assert.match(panel,/berlinDayKey\(\)>=event\.weekTwoStartsOn!/);
 assert.match(panel,/data-cc-week-switch/);
 assert.match(panel,/data-cc-week-choice="1"/);
 assert.match(panel,/data-cc-week-choice="2"/);
 assert.match(panel,/disabled=\{!weekTwoAvailable\}/);
 assert.match(panel,/data-cc-week-rows/);
 assert.match(client,/timeZone:"Europe\/Berlin"/);
 assert.match(client,/choose\(available\?2:1\)/);
 assert.match(css,/\.cl-cc-week-choice:disabled/);
 assert.match(css,/\.cl-contract-table \[data-cc-week-rows\]\[hidden\]\{display:none!important\}/);
});
