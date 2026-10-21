import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {parseIngameTime,rankVerifiedRuns,displayLeaderboardRows,flagForCountry} from "../../src/lib/endfield/leaderboardRanking.mjs";

const read=path=>readFileSync(path,"utf8");
const data=JSON.parse(read("src/data/endfield/community-leaderboard.json"));
const threats=JSON.parse(read("src/data/endfield/catalog/threats.json"));
const art=JSON.parse(read("src/data/endfield/catalog/operator-official-artwork.json"));
const page=read("src/components/pages/EndfieldLeaderboard.astro");
const css=read("src/styles/endfield-leaderboard.css");
const client=read("src/components/endfield/leaderboard-client.ts");

test("Boss quick cards reverse the seven source-backed SKPORT boss identities; Si is the new default",()=>{
 const original=threats.bosses.map(b=>b.slug);
 assert.deepEqual(original,["rhodagn","triaggelos","marble-aggelomoirai","ruan-yi","nefarith","alleikhreos","si"]);
 assert.deepEqual([...original].reverse(),["si","alleikhreos","nefarith","ruan-yi","marble-aggelomoirai","triaggelos","rhodagn"]);
 assert.match(page,/const bosses=\[\.\.\.featuredBosses\]\.reverse\(\)/);
 assert.match(page,/const defaultBoss="si"/);
 assert.match(page,/data-boss-choice/);
 assert.match(page,/data-boss-select/);
 assert.match(page,/data-version-select/);
 assert.match(page,/data-leaderboard-boss/);
 assert.match(client,/history\.replaceState/);
 assert.match(client,/URLSearchParams/);
 assert.match(client,/aria-pressed/);
});
test("Duality Event appears above the general ranking section",()=>{
 assert.match(page,/LeaderboardEvent/);
 assert.match(page,/cl-main-container/);
 assert.ok(page.indexOf("LeaderboardEvent lang")<page.indexOf("cl-main-container"));
 assert.match(read("src/components/endfield/LeaderboardEvent.astro"),/Event Leaderboard/);
 assert.match(page,/Community Leaderboard/);
 assert.match(page,/Top 10 – \{boss\.label\}/);
 assert.match(page,/data-leaderboard-version/);
 assert.match(page,/all-time/);
 assert.deepEqual(data.versions,["v1.6"]);
 assert.equal(data.firstVersion,"v1.6");
 assert.doesNotMatch(page,/00:42\.35/);
 assert.match(page,/Ingame-Zeit \(MM:SS\)/);
 assert.match(page,/Identische Zeiten teilen sich die Platzierung/);
});
test("Owner demo displays Placeholder beside name, against Si, never as a verified record",()=>{
 assert.equal(data.verifiedRuns.length,0);
 assert.equal(data.demoRuns.length,1);
 const example=data.demoRuns[0];
 assert.deepEqual([example.status,example.boss,example.discordName,example.countryCode,example.time,example.version],
                  ["demo","si","Ag0n1st","DEU","02:05","v1.6"]);
 assert.equal(example.link,"https://www.youtube.com/@Ag0n1st");
 assert.equal(example.linkKind,"channel");
 assert.equal(flagForCountry(example.countryCode),"🇩🇪");
 assert.equal(flagForCountry(""),"🌐");
 assert.deepEqual(example.team.map(x=>[x.slug,x.potential]),[["si",0],["arcane",0],["tangtang",0],["xaihi",5]]);
 for(const member of example.team){
   const operator=art.items.find(item=>item.slug===member.slug);
   assert.ok(operator,member.slug+" must have official artwork");
   assert.ok(existsSync("public"+operator.assets["official-icon"].path));
 }
 const allTime=displayLeaderboardRows(data,"si","all-time");
 assert.equal(allTime.length,1);
 assert.equal(allTime[0].rank,1);
 assert.equal(allTime[0].status,"demo");
 assert.equal(displayLeaderboardRows(data,"si","v1.6").length,1);
 assert.deepEqual(displayLeaderboardRows(data,"rhodagn","all-time"),[]);
 assert.deepEqual(rankVerifiedRuns(data.demoRuns,{boss:"si",version:"all-time"}),[]);
 assert.match(page,/cl-placeholder-label/);
 assert.match(page,/l\("Platzhalter","Placeholder"\)/);
 assert.doesNotMatch(page,/cl-test-label/);
 assert.match(page,/cl-flag-de/);
 assert.match(css,/\.cl-flag-de\{background:linear-gradient/);
 assert.match(css,/\.cl-operator-potential\.is-p5\{color:#ffe985/);
 assert.match(page,/cl-demo-disclaimer/);
 assert.match(page,/run\.status==="demo"/);
 assert.match(page,/cl-operator-potential/);
 assert.match(css,/\.cl-operator-potential\{position:absolute/);
 assert.match(css,/right:1px;bottom:1px/);
});
test("Official time is MM:SS with no hidden fractions or subsecond tiebreak",()=>{
 assert.equal(parseIngameTime("00:00"),0);
 assert.equal(parseIngameTime("02:05"),125);
 assert.equal(parseIngameTime("11:59"),719);
 assert.equal(parseIngameTime("100:02"),6002);
 for(const invalid of ["0:59","00:60","00:42.35","1:05.1","00:5","00:-1","text",null,undefined])
   assert.equal(parseIngameTime(invalid),null,String(invalid));
});
test("Best eligible verified run per player and boss; patch versions stay independent",()=>{
 const r=(id,player,seconds,version="v1.6",boss="rhodagn",status="verified")=>({
   id,playerId:player,discordName:player,boss,version,time:seconds,status,team:[],link:"https://www.youtube.com/watch?v=abcdefghijk"
 });
 const runs=[
   r("a1","alpha","00:44"),r("a2","alpha","00:36","v1.7"),
   r("a3","alpha","00:40"),r("b1","beta","00:40"),
   r("c1","gamma","00:40"),r("d1","delta","00:49"),
   r("x1","zulu","00:01","v1.6","si"),
   r("x2","hacker","00:01","v1.6","rhodagn","demo"),
   r("x3","empty","00:42.35"),
   r("x4","beta","00:39","v1.7")
 ];
 const all=rankVerifiedRuns(runs,{boss:"rhodagn",version:"all-time"});
 assert.deepEqual(all.map(x=>[x.playerId,x.time,x.rank]),[
   ["alpha","00:36",1],["beta","00:39",2],["gamma","00:40",3],["delta","00:49",4]
 ]);
 const old=rankVerifiedRuns(runs,{boss:"rhodagn",version:"v1.6"});
 assert.equal(old.find(x=>x.playerId==="alpha").time,"00:40");
 assert.deepEqual(old.slice(0,3).map(x=>x.rank),[1,1,1]);
 assert.equal(old[3].rank,4);
 assert.equal(rankVerifiedRuns(runs,{boss:"si",version:"v1.6"}).length,1);
});
test("Tied official #10 ranks can display more than ten entries, without inventing decimal precision",()=>{
 const runs=[];
 for(let i=0;i<9;i++)runs.push({id:String(i),status:"verified",boss:"rhodagn",version:"v1.6",playerId:"u"+i,time:"00:"+String(i).padStart(2,"0")});
 for(let i=9;i<15;i++)runs.push({id:String(i),status:"verified",boss:"rhodagn",version:"v1.6",playerId:"u"+i,time:"00:09"});
 const result=rankVerifiedRuns(runs,{boss:"rhodagn",version:"all-time",limit:10});
 assert.equal(result.length,15);
 assert.deepEqual(result.slice(9).map(r=>r.rank),[10,10,10,10,10,10]);
});
test("Responsive tabletop leaderboard keeps six data fields, native select and unobstructed operator labels",()=>{
 for(const tag of ["cl-player","cl-country","cl-team","cl-run-time","cl-run-version","cl-rank-number"])
   assert.match(page,new RegExp(tag));
 assert.match(css,/grid-template-areas:"rank name country time" ". team team version"/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/overflow-x:auto/);
 assert.match(css,/\.cl-team-operator\{position:relative/);
 assert.match(css,/pointer-events:none/);
 assert.match(page,/discord\.gg\/v2h9KKT/);
 const nav=read("src/components/EndfieldNav.astro");
 assert.doesNotMatch(nav,/upcoming=new Set\(\[[^\]]*"leaderboard"/);
 for(const lang of ["de","en"]){
   const route="src/pages/"+(lang==="de"?"":"en/")+"endfield/leaderboard/index.astro";
   assert.match(read(route),new RegExp('lang="'+lang+'"'));
 }
});

test("Duality event matches the approved Discord announcement and starts with no fabricated results",()=>{
 const eventData=JSON.parse(read("src/data/endfield/community-events.json"));
 const component=read("src/components/endfield/LeaderboardEvent.astro");
 assert.equal(eventData.schemaVersion,1);
 assert.equal(eventData.events.length,1);
 assert.equal(eventData.verifiedRuns.length,0);
 assert.equal(eventData.events[0].demoRunId,"demo-ag0n1st-si-v16");
 assert.equal(eventData.events[0].backgroundImage,"/images/endfield/leaderboard/duality-background.webp");
 const event=eventData.events[0];
 assert.deepEqual([event.id,event.title,event.boss,event.version,event.startsOn,event.endsOn],
   ["duality","Duality","si","v1.6","2026-10-15","2026-11-25"]);
 assert.equal(event.image,"/images/endfield/leaderboard/duality.webp");
 assert.ok(existsSync("public"+event.image));
 const raw=readFileSync("public"+event.image);
 assert.equal(raw.toString("ascii",0,4),"RIFF");
 assert.equal(raw.toString("ascii",8,12),"WEBP");
 assert.ok(raw.length<250000,"Full-resolution WebP should stay below 250 KB");
 const background=readFileSync("public"+event.backgroundImage);
 assert.equal(background.toString("ascii",0,4),"RIFF");
 assert.equal(background.toString("ascii",8,12),"WEBP");
 assert.ok(background.length<500000,"Background WebP should stay below 500 KB");
 assert.deepEqual(event.rules.map(x=>x.id),[
   "boss","required-operator","damage-dealer","consumables","potentials","submission"
 ]);
 assert.match(event.rules[0].de,/Si \(RE-Krise\)/);
 assert.match(event.rules[1].de,/Si muss/);
 assert.match(event.rules[2].de,/einzige Operator/);
 assert.match(event.rules[2].en,/Damage Dealer/);
 assert.match(event.rules[3].de,/Kein Buff-Food/);
 assert.match(event.rules[4].de,/Keine Potenzialbeschränkung/);
 assert.match(event.rules[5].de,/Regelwerk §4/);
 assert.equal(event.rulebookUrl,"https://bit.ly/3WEuGwD");
 assert.match(component,/data-event-select/);
 assert.match(component,/data-event-panel/);
 assert.match(component,/cl-event-banner/);
 assert.match(component,/<details class="cl-event-rules" data-event-rules>/);
 assert.match(component,/<summary class="cl-event-rules-toggle">/);
 assert.match(component,/cl-event-date/);
 assert.match(component,/data-event-background/);
 assert.match(component,/--cl-event-background/);
 assert.match(component,/demoOnly/);
 assert.match(component,/cl-placeholder-label/);
 assert.match(component,/cl-demo-disclaimer/);
 assert.doesNotMatch(component,/Mit Duality startet unsere erste Speedrun-Challenge/);
 assert.match(css,/\.cl-event-container::before\{[^\n]*background-image:var\(--cl-event-background\);background-size:cover;background-position:center center[^\n]*opacity:\.05/);
 assert.match(component,/cl-event-rule/);
 assert.match(component,/Top 10 – \{event.title\}/);
 assert.match(component,/Noch keine verifizierten Duality-Runs/);
 assert.match(component,/No verified Duality runs/);
 assert.match(css,/\.cl-event-head h2\{font-size:clamp\(27px,3.5vw,42px\)/);
});
