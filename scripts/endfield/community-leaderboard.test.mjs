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
 assert.match(page,/eventData\.events\.map\(event=>event\.version\)/);
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
 assert.equal(example.link,"https://youtu.be/SDqsynAplyI");
 assert.equal(example.linkKind,"video");
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
test("Duality damage-dealer rule has an accessible bilingual modal with local WebP examples",()=>{
 const panel=read("src/components/endfield/LeaderboardEventPanel.astro");
 const modalClient=read("src/components/endfield/leaderboard-event-client.ts");
 const event=read("src/content/leaderboard-events/duality.md");
 assert.match(panel,/event.id==="duality"&&rule.id==="damage-dealer"/);
 assert.match(panel,/data-rule-explanation-open aria-haspopup="dialog"/);
 assert.match(panel,/<dialog class="cl-rule-explanation-dialog"/);
 assert.match(panel,/data-rule-explanation-dialog aria-labelledby=/);
 assert.match(panel,/Erklärung","Explanation"/);
 assert.match(panel,/Erlaubt","✓ Allowed"/);
 assert.match(panel,/Verboten","✕ Forbidden"/);
 assert.match(panel,/Schadensverurs\./);
 assert.match(modalClient,/dialog\.showModal\(\)/);
 assert.match(modalClient,/dialog\.close\(\)/);
 assert.match(modalClient,/trigger\.focus\(\)/);
 assert.match(css,/\.cl-rule-explanation-columns\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(css,/@media\(max-width:700px\)\{\.cl-rule-explanation-columns\{grid-template-columns:1fr/);
 for(const [slug,width,height] of [["si",350,153],["arcane",349,156],["yvonne",351,158]]){
   const path="public/images/endfield/leaderboard/duality-rule-"+slug+".webp";
   assert.ok(existsSync(path),path);
   const bytes=readFileSync(path);
   assert.equal(bytes.toString("ascii",0,4),"RIFF");
   assert.equal(bytes.toString("ascii",8,12),"WEBP");
   assert.match(panel,new RegExp('src="/images/endfield/leaderboard/duality-rule-'+slug+'\\.webp" width="'+width+'" height="'+height+'"'));
 }
 assert.match(event,/- id: damage-dealer\s+de: "Si ist der einzige Operator im Team/);
 assert.equal((event.match(/^  - id: /gm)||[]).length,6);
});
test("Optional Duality Discord achievement badge follows selected event and stays bilingual",()=>{
 const component=read("src/components/endfield/LeaderboardEvent.astro");
 const client=read("src/components/endfield/leaderboard-event-client.ts");
 const schema=read("src/content/config.ts");
 const event=read("src/content/leaderboard-events/duality.md");
 assert.match(schema,/achievement:z\.object\(\{/);
 assert.match(schema,/tooltipDe:z\.string\(\)\.min\(1\)/);
 assert.match(schema,/tooltipEn:z\.string\(\)\.min\(1\)/);
 assert.match(event,/achievement:\s+image: "\/images\/endfield\/leaderboard\/duality-achievement\.webp"/);
 assert.match(event,/tooltipDe: "Discord-Achievement „Duality“/);
 assert.match(event,/tooltipEn: "Discord achievement ‘Duality’/);
 assert.match(component,/active\.map\(\(event,index\)=>event\.achievement&&/);
 assert.match(component,/data-event-achievement=\{event\.id\}/);
 assert.match(component,/data-achievement-tooltip=\{l\(event\.achievement\.tooltipDe,event\.achievement\.tooltipEn\)\}/);
 assert.match(component,/role="img"/);
 assert.match(component,/tabindex="0"/);
 assert.match(component,/hidden=\{index!==0\}/);
 assert.match(client,/badge\.hidden=archived\|\|badge\.dataset\.eventAchievement!==id/);
 assert.match(css,/\.cl-event-achievement\{position:absolute;right:0;top:-13px/);
 assert.match(css,/\.cl-event-achievement\[hidden\]\{display:none!important\}/);
 assert.match(css,/\.cl-event-achievement:hover::after,\.cl-event-achievement:focus-visible::after/);
 assert.match(css,/@media\(max-width:760px\)\{\.cl-event-head\{min-height:70px;padding-right:72px\}/);
 const path="public/images/endfield/leaderboard/duality-achievement.webp";
 assert.ok(existsSync(path));
 const bytes=readFileSync(path);
 assert.equal(bytes.toString("ascii",0,4),"RIFF");
 assert.equal(bytes.toString("ascii",8,12),"WEBP");
 assert.ok(bytes.byteLength<25000,"badge must be optimized");
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

test("Duality Markdown source keeps the owner-approved run and two-language rules",()=>{
 const event=read("src/content/leaderboard-events/duality.md");
 const run=read("src/content/leaderboard-runs/events/duality/krombi-0129.md");
 const component=read("src/components/endfield/LeaderboardEvent.astro");
 const eventPanel=read("src/components/endfield/LeaderboardEventPanel.astro");
 const loader=read("src/lib/endfield/leaderboardContent.ts");
 const config=read("src/content/config.ts");
 assert.match(config,/"leaderboard-runs":leaderboardRuns/);
 assert.match(config,/"leaderboard-events":leaderboardEvents/);
 for(const [field,value] of [
   ["runId","duality-v16-si-krombi-0129"],["discordName","Krombi"],
   ["playerId","krombi"],["countryCode","DE"],["time",'"01:29"'],
   ["video",'"https://youtu.be/24_sKEqnCm0"'],["eventId","duality"],
   ["eligibleForCommunity","true"],["status","verified"]
 ])assert.ok(run.includes(field+": "+value),field);
 for(const [slug,p] of [["si",4],["arcane",3],["tangtang",4],["gilberta",2]])
   assert.match(run,new RegExp("slug: "+slug+", potential: "+p));
 for(const member of ["si","arcane","tangtang","gilberta"]){
   const op=art.items.find(x=>x.slug===member);
   assert.ok(existsSync("public"+op.assets["official-icon"].path));
 }
 for(const str of ["eventId: duality","title: Duality","boss: si","version: v1.6",
                   'startsOn: "2026-10-15"','endsOn: "2026-11-25"',
                   'image: "/images/endfield/leaderboard/duality.webp"',
                   'backgroundImage: "/images/endfield/leaderboard/duality-background.webp"',
                   'rulebookUrl: "https://bit.ly/3WEuGwD"'])
   assert.ok(event.includes(str),str);
 assert.equal((event.match(/^  - id: /gm)||[]).length,6);
 for(const id of ["boss","required-operator","damage-dealer","consumables","potentials","submission"])
   assert.ok(event.includes("- id: "+id));
 assert.match(event,/de: "Boss Si \(RE-Krise\)"/);
 assert.match(event,/en: "Boss Si \(RE-Crisis\)"/);
 assert.match(loader,/getCollection\("leaderboard-runs"\)/);
 assert.match(loader,/getCollection\("leaderboard-events"\)/);
 assert.match(loader,/run.status==="verified"/);
 assert.match(page,/run.eventId&&run.eligibleForCommunity===true/);
 assert.match(eventPanel,/Top 10 – \{event.title\}/);
 assert.match(eventPanel,/<details class="cl-event-rules" data-event-rules>/);
 assert.match(eventPanel,/data-event-background/);
 assert.match(eventPanel,/Noch keine verifizierten Runs für dieses Event/);
 assert.match(eventPanel,/No verified runs have been submitted for this event/);
 assert.match(eventPanel,/demoOnly/);
 assert.match(css,/\.cl-event-container::before\{[^\n]*background-image:var\(--cl-event-background\);background-size:cover;background-position:center center[^\n]*opacity:\.05/);
 assert.ok(existsSync("public/images/endfield/leaderboard/duality.webp"));
 assert.ok(existsSync("public/images/endfield/leaderboard/duality-background.webp"));
 assert.match(page,/Das Community Leaderboard und das Event Leaderboard werden einmal pro Woche am Ende der Woche aktualisiert/);
 assert.match(page,/The Community Leaderboard and Event Leaderboard are updated once a week at the end of the week/);
});
