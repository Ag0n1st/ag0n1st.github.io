import test from "node:test";
import assert from "node:assert/strict";
import {berlinDayKey,eventState,partitionLeaderboardEvents} from "../../src/lib/endfield/eventLifecycle.mjs";
import {rankVerifiedRuns} from "../../src/lib/endfield/leaderboardRanking.mjs";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const duality={id:"duality",startsOn:"2026-10-15",endsOn:"2026-11-25",version:"v1.6",boss:"si"};
test("Duality is active through the full final 25 Nov Berlin calendar day",()=>{
  for(const date of ["2026-10-15","2026-10-24","2026-11-25"])
    assert.equal(eventState(duality,date),"active");
  assert.equal(eventState(duality,"2026-10-14"),"upcoming");
  assert.equal(eventState(duality,"2026-11-26"),"archived");
});
test("Berlin editorial date handles winter-time boundary regardless of client timezone",()=>{
  assert.equal(berlinDayKey(new Date("2026-11-25T22:59:59Z")),"2026-11-25");
  assert.equal(berlinDayKey(new Date("2026-11-25T23:00:00Z")),"2026-11-26");
  assert.equal(berlinDayKey(new Date("2026-10-25T00:30:00Z")),"2026-10-25");
  assert.equal(berlinDayKey(new Date("2026-07-01T21:59:00Z")),"2026-07-01");
  assert.equal(berlinDayKey(new Date("2026-07-01T22:00:00Z")),"2026-07-02");
});
test("only finished events enter archive; newest finished first and future events do not appear active",()=>{
  const another={id:"old",startsOn:"2026-08-01",endsOn:"2026-08-30"};
  const next={id:"next",startsOn:"2026-12-01",endsOn:"2026-12-24"};
  const before=partitionLeaderboardEvents([duality,next,another],"2026-10-24");
  assert.deepEqual(before.active.map(x=>x.id),["duality"]);
  assert.deepEqual(before.archived.map(x=>x.id),["old"]);
  assert.deepEqual(before.upcoming.map(x=>x.id),["next"]);
  const after=partitionLeaderboardEvents([next,another,duality],"2026-11-26");
  assert.deepEqual(after.active,[]);
  assert.deepEqual(after.archived.map(x=>x.id),["duality","old"]);
  assert.deepEqual(after.upcoming.map(x=>x.id),["next"]);
});
test("archived leaderboard reuses actual verified runs and never promotes demos",()=>{
  const verified=[{id:"krombi",eventId:"duality",status:"verified",playerId:"krombi",boss:"si",version:"v1.6",time:"01:29"}];
  const demo=[{id:"demo",eventId:"duality",status:"demo",playerId:"fake",boss:"si",version:"v1.6",time:"00:01"}];
  assert.deepEqual(rankVerifiedRuns([...verified,...demo],{boss:"si",version:"v1.6"}).map(r=>[r.playerId,r.rank,r.time]),[["krombi",1,"01:29"]]);
  const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
  assert.match(panel,/archived\?undefined:leaderboard\.demoRuns/);
  assert.match(panel,/verifiedRuns\.filter\(run=>run\.eventId===event\.id\)/);
});
test("archive is native details, shareable query and same source panel/rules in both locales",()=>{
  const component=read("src/components/endfield/LeaderboardEvent.astro");
  const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
  const script=read("src/components/endfield/leaderboard-event-client.ts");
  const css=read("src/styles/endfield-leaderboard.css");
  const workflow=read(".github/workflows/deploy.yml");
  assert.match(component,/partitionLeaderboardEvents\(eventData\.events\)/);
  assert.match(component,/<details class="cl-event-archive" data-event-archive>/);
  assert.match(component,/Event-Archiv","Event archive"/);
  assert.match(component,/cl-archive-empty/);
  assert.match(component,/data-archive-select/);
  assert.match(component,/data-event-select/);
  assert.match(component,/LeaderboardEventPanel/);
  assert.match(panel,/cl-event-rules/);
  assert.match(panel,/cl-event-banner/);
  assert.match(panel,/cl-event-results/);
  assert.match(panel,/data-event-archived/);
  assert.match(script,/searchParams\.set\("event",id\)/);
  assert.match(script,/searchParams\.delete\("event"\)/);
  assert.match(script,/addEventListener\("popstate",restore\)/);
  assert.match(script,/archiveDetails\.open=true/);
  assert.match(css,/\.cl-event-archive-panel::before\{[^\n]*opacity:\.05/);
  assert.match(workflow,/cron: "17 \*\/6 \* \* \*"/);
});
