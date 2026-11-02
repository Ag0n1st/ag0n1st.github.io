import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {rankContingencyContractRuns,rankVerifiedRuns} from "../../src/lib/endfield/leaderboardRanking.mjs";
import {validateLeaderboardEntries} from "../../src/lib/endfield/leaderboardContentValidation.mjs";
const read=path=>readFileSync(path,"utf8");
const event={eventId:"cc-test",kind:"contingency-contract",slug:"cc-test",version:"v1.6",startsOn:"2026-11-05",endsOn:"2026-11-25",rules:[{id:"ingame"}]};
const run=(id,player,points,time,other={})=>({runId:id,id,slug:"events/cc-test/"+id,eventId:"cc-test",status:"verified",playerId:player,
 discordName:player,points,time,version:"v1.6",video:"https://youtu.be/SDqsynAplyI",
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
  assert.match(panel,/rankContingencyContractRuns/);
  assert.match(panel,/isContract&&<th scope="col">/);
  assert.match(panel,/cl-run-points/);
  assert.match(eventUI,/selectable.length>1/);
  assert.match(client,/data-event-choice/);
  assert.match(client,/dataset\.eventBackground/);
  assert.match(client,/data-event-achievement/);
});
