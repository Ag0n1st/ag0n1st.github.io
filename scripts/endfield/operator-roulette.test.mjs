import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {getRoulettePools,remainingOperators,randomIndex,winnerRotation,berlinDay,ROULETTE_TEAM_SIZE,ROULETTE_CATEGORIES} from "../../src/lib/endfield/operatorRouletteGame.mjs";

const read=p=>readFileSync(p,"utf8");
const roster=JSON.parse(read("src/data/endfield/endfieldle-roster.json"));
const snapshot=JSON.parse(read("src/data/endfield/tierlists/2026-08-23.json"));
const manual=JSON.parse(read("src/data/endfield/operator-roulette-overrides.json"));
const pools=getRoulettePools(snapshot,roster,manual,"2026-10-30");

test("All wheel has 33 published operators and reuses exact local official icons",()=>{
 assert.deepEqual(ROULETTE_CATEGORIES,["all","damage-dealer","enabler","buffer"]);
 assert.equal(ROULETTE_TEAM_SIZE,4);
 assert.equal(pools.all.length,33);
 assert.equal(new Set(pools.all.map(x=>x.id)).size,33);
 assert.ok(!pools.all.some(o=>o.id==="argent-flow"));
 assert.ok(pools.all.some(o=>o.id==="typhoeus"));
 for(const op of pools.all){
  assert.ok(op.assets.icon.startsWith("/images/endfield/operators/"));
  assert.ok(existsSync("public"+op.assets.icon),op.id+" cached icon missing");
 }
 const released=getRoulettePools(snapshot,roster,manual,"2026-11-05");
 assert.equal(released.all.length,34);
 assert.ok(released.all.some(o=>o.id==="argent-flow"));
});

test("role wheel pools exactly follow the August 23 community tiers plus only two owner exceptions",()=>{
 assert.equal(manual.tierlistId,snapshot.id);
 assert.deepEqual(manual.roles,{si:["damage-dealer","buffer"],purrchena:["enabler"]});
 const expected=Object.fromEntries(Object.entries(snapshot.roles).map(([role,tiers])=>[role,
  [...new Set(Object.values(tiers).flat())]]));
 assert.deepEqual(pools["damage-dealer"].map(x=>x.id),[...expected["damage-dealer"],"si"]);
 assert.deepEqual(pools.enabler.map(x=>x.id),[...expected.enabler,"purrchena"]);
 assert.deepEqual(pools.buffer.map(x=>x.id),[...expected.buffer,"si"]);
 assert.equal(pools["damage-dealer"].length,12);
 assert.equal(pools.enabler.length,16);
 assert.equal(pools.buffer.length,11);
 assert.ok(!pools.enabler.some(x=>x.id==="si"));
 assert.ok(!pools["damage-dealer"].some(x=>x.id==="purrchena"));
 assert.equal(pools.buffer.filter(x=>x.id==="si").length,1);
 assert.deepEqual(snapshot.roles["damage-dealer"].S,["zhuang-fangyi","rossi","arcane"]);
 const wrong=structuredClone(manual);wrong.roles.si.push("unknown");
 assert.throws(()=>getRoulettePools(snapshot,roster,wrong,"2026-10-30"),/Invalid manually assigned/);
 const duplicate=structuredClone(manual);duplicate.roles.si.push("buffer");
 assert.throws(()=>getRoulettePools(snapshot,roster,duplicate,"2026-10-30"),/Invalid manually assigned/);
});

test("four picks across All/Dealer/Enabler/Buffer cannot duplicate any operator",()=>{
 const team=[];
 for(const category of ROULETTE_CATEGORIES){
  const eligible=remainingOperators(pools,category,team);
  assert.ok(eligible.length>0);
  assert.ok(eligible.every(x=>!team.some(op=>op.id===x.id)));
  team.push(eligible[0]);
 }
 assert.equal(team.length,4);
 assert.equal(new Set(team.map(x=>x.id)).size,4);
 for(const category of ROULETTE_CATEGORIES)
  assert.ok(remainingOperators(pools,category,team).every(op=>!team.some(x=>x.id===op.id)));
 const si=pools["damage-dealer"].find(x=>x.id==="si");
 assert.ok(!remainingOperators(pools,"buffer",[si]).some(op=>op.id==="si"));
 assert.throws(()=>remainingOperators(pools,"made-up",[]),/Invalid Roulette category/);
});

test("unbiased 32-bit draws reject modulo tails and final rotation puts winner's sector under top pointer",()=>{
 assert.equal(randomIndex(4,()=>0),0);
 assert.equal(randomIndex(4,()=>3),3);
 assert.equal(randomIndex(5,()=>7),2);
 let count=0;
 assert.equal(randomIndex(5,()=>++count===1?0xffffffff:8),3);
 assert.equal(count,2);
 for(const n of [1,4,10,33]){
  for(let i=0;i<n;i++){
   const angle=winnerRotation(67,i,n,6);
   assert.ok(angle>67+5*360);
   const top=(angle+(i+.5)*360/n)%360;
   assert.ok(Math.min(top,360-top)<1e-7,"selected icon stops at 12 o'clock");
  }
 }
 assert.throws(()=>randomIndex(0),/Invalid wheel size/);
 assert.throws(()=>winnerRotation(0,5,4),/Invalid spin target/);
});

test("Berlin release-day boundary accounts for winter time",()=>{
 assert.equal(berlinDay(new Date("2026-10-30T22:59:00Z")),"2026-10-30");
 assert.equal(berlinDay(new Date("2026-10-30T23:01:00Z")),"2026-10-31");
});

test("bilingual routes, navigation order, community disclaimer, animation, accessible reset and circular icons",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 const page=read("src/components/pages/OperatorRoulettePage.astro");
 const css=read("src/styles/operator-roulette.css");
 const client=read("src/lib/endfield/operatorRouletteClient.mjs");
 const de=read("src/pages/endfield/operator-roulette/index.astro");
 const en=read("src/pages/en/endfield/operator-roulette/index.astro");
 assert.ok(nav.indexOf('key: "roulette"')<nav.indexOf('key: "tierlist"'));
 assert.ok(nav.indexOf('key: "tierlist"')<nav.indexOf('key: "checklist"'));
 assert.match(nav,/roulette:"\/en\/endfield\/operator-roulette\/"/);
 assert.match(nav,/new Set\(\["factory","checklist"\]\)/);
 assert.match(de,/<OperatorRoulettePage lang="de"\s*\/>/);
 assert.match(en,/<OperatorRoulettePage lang="en"\s*\/>/);
 assert.match(page,/active="roulette"/);
 assert.match(page,/data-roulette-wheel/);
 assert.match(page,/data-roulette-team/);
 assert.match(page,/data-roulette-reset/);
 assert.match(page,/role="tablist"/);
 assert.match(page,/aria-live="polite"/);
 assert.match(page,/23\.08\.2026/);
 assert.match(page,/Si als Damage Dealer und Buffer; Purrchena als Enabler/);
 assert.match(page,/Si as Damage Dealer and Buffer; Purrchena as Enabler/);
 assert.match(css,/\.or-wheel-icon\{[^}]*border-radius:50%/);
 assert.match(css,/\.or-wheel\{[^}]*border-radius:50%/);
 assert.match(css,/@media\(max-width:600px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(client,/conic-gradient/);
 assert.match(client,/winnerRotation/);
 assert.match(client,/transitionend/);
 assert.match(client,/requestAnimationFrame/);
 assert.match(client,/remainingOperators\(pools,category,team\)/);
 assert.match(client,/randomIndex\(pool.length\)/);
 assert.match(client,/ROULETTE_TEAM_SIZE/);
 assert.match(client,/team=\[\];category="all"/);
 assert.match(client,/prefers-reduced-motion: reduce/);
 assert.doesNotMatch(client,/localStorage|fetch\(|XMLHttpRequest/);
 assert.match(page,/Array\.from\(\{length:4\}/);
});