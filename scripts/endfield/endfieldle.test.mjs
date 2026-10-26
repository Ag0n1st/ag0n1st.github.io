import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {FIELDS,compareOperator,versionValue,dailyKey,previousDay,nextBerlinReset,getStreakStatistics,validateRosterAndSchedule} from "../../src/lib/endfield/endfieldleGame.mjs";
const read=p=>readFileSync(p,"utf8");
const roster=JSON.parse(read("src/data/endfield/endfieldle-roster.json"));
const schedule=JSON.parse(read("src/data/endfield/endfieldle-schedule.json"));
const items=JSON.parse(read("src/data/endfield/catalog/items.json"));
const artwork=JSON.parse(read("src/data/endfield/catalog/operator-official-artwork.json"));

test("exactly seven approved Endfieldle trivia categories, no rarity or traits",()=>{
 assert.deepEqual(FIELDS,["gender","race","faction","element","class","weaponType","releaseVersion"]);
});
test("full 34-operator named roster matches official source identities and local images",()=>{
 const approvedIds=new Set(items.items.filter(x=>x.categories.includes("Operators")).map(x=>x.id));
 assert.equal(roster.operators.length,34);
 assert.equal(artwork.items.length,35);
 assert.equal(roster.operators.filter(x=>x.name==="Endministrator").length,1);
 assert.deepEqual(roster.operators.filter(x=>x.sourceQuality==="skport-import").map(x=>x.id).sort(),["liino","si","typhoeus"]);
 for(const row of roster.operators){
  assert.ok(approvedIds.has(row.itemId),row.name+" missing official catalog identity");
  for(const field of ["icon","portrait"])assert.ok(existsSync("public"+row.assets[field]),row.name+" missing "+field);
  if(row.assets.banner)assert.ok(existsSync("public"+row.assets.banner),row.name+" missing banner");
 }
 assert.equal(roster.operators.filter(x=>x.assets.banner).length,33);
 assert.equal(roster.operators.filter(x=>x.assets.splash).length,33);
 assert.deepEqual(roster.operators.filter(x=>x.assets.splash).map(x=>x.id).sort(),roster.operators.filter(x=>x.id!=="argent-flow").map(x=>x.id).sort());
 for(const row of roster.operators)if(row.assets.splash){
   assert.ok(existsSync("public"+row.assets.splash),row.id+" missing SKPORT illustration");
   assert.ok(existsSync("public"+row.assets.cover),row.id+" missing SKPORT cover");
 }
});
test("every owner-approved release version for all 34 operators is present",()=>{
 const groups={
 "v1.0":"Endministrator;Laevatain;Yvonne;Gilberta;Ember;Last Rite;Lifeng;Pogranichnik;Ardelia;Perlica;Arclight;Avywenna;Da Pan;Chen Qianyu;Wulfgard;Xaihi;Snowshine;Alesh;Akekuri;Catcher;Estella;Fluorite;Antal",
 "v1.1":"Tangtang;Rossi",
 "v1.2":"Zhuang Fangyi",
 "v1.3":"Mi Fu;Camille",
 "v1.4":"Arcane;Liino",
 "v1.5":"Typhoeus;Purrchena",
 "v1.6":"Si;Argent Flow"
 };
 for(const [v,names] of Object.entries(groups))assert.deepEqual(roster.operators.filter(x=>x.releaseVersion===v).map(x=>x.name).sort(),names.split(";").sort());
});
test("release version arrows point from guess to answer, unknown values remain neutral",()=>{
 const si=roster.operators.find(x=>x.id==="si");
 const liino=roster.operators.find(x=>x.id==="liino");
 assert.deepEqual(compareOperator(liino,si).releaseVersion,{kind:"miss",value:"v1.4",direction:"higher"});
 assert.deepEqual(compareOperator(si,liino).releaseVersion,{kind:"miss",value:"v1.6",direction:"lower"});
 assert.equal(compareOperator(si,si).releaseVersion.kind,"match");
 assert.ok(versionValue("v1.10")>versionValue("v1.9"));
 assert.equal(compareOperator({...si,gender:"Variable"},si).gender.kind,"unknown");
 assert.equal(compareOperator(si,{...si,race:"Undisclosed"}).race.kind,"unknown");
});
test("Camille's gender matches the official SKPORT Basic Information in both locales",()=>{
 const camille=roster.operators.find(op=>op.id==="camille");
 const official=JSON.parse(read("src/data/endfield/operators/camille.extra.json"));
 assert.equal(official.profile?.Gender,"Male");
 assert.equal(camille.gender,official.profile.Gender);
 assert.equal(camille.releaseVersion,"v1.3");
 assert.equal(compareOperator({...camille,gender:"Female"},camille).gender.kind,"miss");
 assert.equal(compareOperator({...camille,gender:"Male"},camille).gender.kind,"match");
 // DE and EN render the same shared roster. Never create locale-only gender facts.
 const component=read("src/components/pages/EndfieldlePage.astro");
 assert.match(component,/import roster from "..\/..\/data\/endfield\/endfieldle-roster\.json"/);
 assert.match(component,/data-lang=\{lang\}/);
});

test("fixed global schedule includes one operator per day and excludes previous three",()=>{
 assert.equal(schedule.timeZone,"Europe/Berlin");
 assert.equal(schedule.excludedPreviousDays,3);
 assert.equal(schedule.firstDay,"2026-10-23");
 assert.equal(schedule.lastDay,"2030-12-31");
 assert.doesNotThrow(()=>validateRosterAndSchedule(roster.operators,schedule.days,schedule));
 assert.notEqual(schedule.days["2026-10-23"],schedule.days["2026-10-24"]);
 const argent=roster.operators.find(o=>o.id==="argent-flow");
 assert.equal(argent.releaseVersion,"v1.6");
 assert.equal(argent.availableFrom,"2026-11-05");
 assert.equal(schedule.days["2026-10-31"],"gilberta");
 assert.equal(schedule.days["2026-11-05"],"argent-flow");
 const before={...schedule.days,["2026-10-31"]:"argent-flow",["2026-11-05"]:"gilberta"};
 assert.throws(()=>validateRosterAndSchedule(roster.operators,before,schedule),/before official release/);
 assert.ok(schedule.days[previousDay("2026-10-24")]);
});
test("Berlin DST and resets are not tied to viewer's local timezone",()=>{
 assert.equal(dailyKey(new Date("2026-10-24T22:01:00Z")),"2026-10-25");
 assert.equal(dailyKey(new Date("2026-11-25T22:59:00Z")),"2026-11-25");
 assert.equal(dailyKey(new Date("2026-11-25T23:00:00Z")),"2026-11-26");
 assert.equal(new Date(nextBerlinReset(new Date("2026-10-24T10:00:00Z"))).toISOString().slice(0,16),"2026-10-24T22:00");
 assert.equal(new Date(nextBerlinReset(new Date("2026-10-25T12:00:00Z"))).toISOString().slice(0,16),"2026-10-25T23:00");
 assert.equal(new Date(nextBerlinReset(new Date("2026-03-28T12:00:00Z"))).toISOString().slice(0,16),"2026-03-28T23:00");
 assert.equal(new Date(nextBerlinReset(new Date("2026-03-29T12:00:00Z"))).toISOString().slice(0,16),"2026-03-29T22:00");
});
test("browser-only streak computation handles consecutive wins and missed days",()=>{
 const today="2026-10-24";
 const days={"2026-10-22":{solved:true},"2026-10-23":{solved:true},"2026-10-24":{solved:true}};
 assert.deepEqual(getStreakStatistics(days,today),{streak:3,best:3,solved:3,played:3});
 assert.equal(getStreakStatistics({...days,"2026-10-24":{solved:false}},today).streak,2);
 assert.equal(getStreakStatistics({"2026-10-22":{solved:true},"2026-10-24":{solved:true}},today).streak,1);
});
test("DE/EN locale routes, nav order, SEO sitemap and no global backend",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 const keys=[...nav.matchAll(/key: "([^"]+)"/g)].map(x=>x[1]);
 assert.equal(keys.length,10);
 assert.deepEqual(keys.slice(-3),["tierlist","endfieldle","countdown"]);
 assert.match(nav,/endfieldle:"\/en\/endfield\/endfieldle\/"/);
 assert.match(read("src/lib/i18n/site.mjs"),/endfieldle\/":"\/en\/endfield\/endfieldle\//);
 assert.match(read("src/pages/sitemap.xml.ts"),/"\/endfield\/endfieldle\/"/);
 for(const lang of ["de","en"]){
  const route=lang==="de"?"src/pages/endfield/endfieldle/index.astro":"src/pages/en/endfield/endfieldle/index.astro";
  assert.match(read(route),new RegExp('lang="'+lang+'"'));
 }
 const page=read("src/components/pages/EndfieldlePage.astro");
 const client=read("src/lib/endfield/endfieldleClient.mjs");
 for(const name of ["data-guess-form","data-yesterday","data-results-table","data-winner"])assert.ok(page.includes(name));
 assert.match(client,/localStorage\.setItem/);
 assert.match(client,/localStorage\.getItem/);
 assert.match(client,/compareOperator/);
 assert.doesNotMatch(client,/cloudflare|firebase|worker\.dev|fetch\(/i);
});
test("SKPORT anonymous public batch import and remaining unreleased operator are accurately documented",()=>{
 const doc=read("docs/endfield-endfieldle.md");
 assert.match(doc,/SKPORT-Abgrenzung/);
 assert.match(doc,/33\/34/);
 assert.match(doc,/anonym/);
 assert.match(doc,/Argent Flow/);
});
