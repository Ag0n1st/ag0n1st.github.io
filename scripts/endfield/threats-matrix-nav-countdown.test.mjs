import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {CURRENT_VERSION,parseVersionCountdownMarkdown} from "../../src/data/endfield/versionCountdown.mjs";
const read=path=>readFileSync(path,"utf8");
const threats=JSON.parse(read("src/data/endfield/catalog/threats.json"));

test("official SKPORT Threats catalog includes all 85 IDs and WebP covers",()=>{
 assert.equal(threats.schemaVersion,1);
 assert.equal(threats.source.provider,"SKPORT Wiki");
 assert.equal(threats.source.category.mainTypeId,"1");
 assert.equal(threats.source.category.subTypeId,"3");
 assert.equal(threats.source.importMode,"public-browser-response");
 assert.equal(threats.source.isComplete,true);
 assert.equal(threats.items.length,85);
 const ids=new Set();
 for(const item of threats.items){
  assert.match(item.id,/^\d+$/);
  assert.ok(!ids.has(item.id),"duplicate Threat ID "+item.id);
  ids.add(item.id);
  assert.ok(item.name&&item.source==="skport-official-wiki");
  assert.equal(item.iconPath,`/images/endfield/threats/${item.id}.webp`);
  const file="public"+item.iconPath;
  assert.ok(existsSync(file),file);
  const image=readFileSync(file);
  assert.equal(image.toString("ascii",0,4),"RIFF");
  assert.equal(image.toString("ascii",8,12),"WEBP");
 }
});
test("speedrun Bosses preserve SKPORT variants and Si is not invented as an official record",()=>{
 assert.deepEqual(threats.bosses.map(x=>x.slug),[
  "rhodagn","triaggelos","marble-aggelomoirai","ruan-yi","nefarith","alleikhreos","si"
 ]);
 const byId=new Map(threats.items.map(x=>[x.id,x]));
 for(const boss of threats.bosses){
  if(boss.slug==="si"){
   assert.equal(boss.provisional,true);
   assert.deepEqual(boss.threatIds,[]);
   assert.equal(boss.portraitPath,"/images/endfield/operators/si/official-portrait.webp");
   assert.ok(existsSync("public"+boss.portraitPath));
  }else{
   assert.equal(boss.provisional,false);
   assert.ok(boss.threatIds.length>=1);
   for(const id of boss.threatIds)assert.ok(byId.has(id),"missing "+id);
  }
 }
 assert.equal(threats.bosses.find(x=>x.slug==="nefarith").threatIds.length,2);
 assert.equal(threats.bosses.find(x=>x.slug==="marble-aggelomoirai").threatIds.length,2);
 const code=read("scripts/endfield/import-threats-wiki.py");
 assert.match(code,/playwright/);
 assert.match(code,/official|SKPORT/i);
});
test("localized nav contains both new unfinished subsections, URLs and stacked labels",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 const i18n=read("src/lib/i18n/site.mjs");
 for(const key of ["leaderboard","cheatsheets"]){
  assert.ok(nav.includes('key: "'+key+'"'));
  assert.match(nav,new RegExp('"'+key+'"'));
  assert.ok(i18n.includes('/endfield/'+key+'/'));
  assert.ok(existsSync("src/pages/endfield/"+key+"/index.astro"));
  assert.ok(existsSync("src/pages/en/endfield/"+key+"/index.astro"));
 }
 assert.match(nav,/item\.key==="leaderboard"/);
 assert.match(nav,/item\.key==="cheatsheets"/);
 assert.doesNotMatch(nav,/upcoming=new Set\(\[[^\]]*"leaderboard"/);
 assert.doesNotMatch(nav,/upcoming=new Set\(\[[^\]]*"cheatsheets"/);
 const cheat=read("src/components/pages/EndfieldCheatSheets.astro");
 assert.ok(cheat.includes("#Bufffood"));
 assert.ok(read("src/components/pages/ElasticGoodsPeaks.astro").includes("ELASTIC GOODS · PRICE PEAKS"));
 assert.match(cheat,/<ElasticGoodsPeaks lang=\{lang\}/);
 assert.match(read("src/components/pages/RefinementMatrix.astro"),/id="artificing"/);
 const leader=read("src/components/pages/EndfieldLeaderboard.astro");
 assert.match(leader,/bosses\.map/);
 assert.match(leader,/featuredBosses/);
 assert.match(leader,/cl-boss-choice/);
 assert.match(leader,/discord\.gg\/v2h9KKT/);
});
test("latest released operator only gets one NEW label, not the latest edit",()=>{
 const p=read("src/components/pages/OperatorIndex.astro");
 const feed=read("src/lib/content/guideFeed.ts");
 assert.match(p,/isNew: index===0/);
 assert.match(p,/operator\.isNew && <span class="op-card-new"/);
 assert.match(feed,/getOperatorsByRelease/);
 assert.match(feed,/listing\?\.releaseDate\.getTime/);
 const css=read("src/styles/operator-guides.css");
 assert.match(css,/op-card-new/);
 assert.match(css,/data-element="electric"/);
 assert.match(css,/color:#ffe985/);
 assert.match(css,/data-element="heat"/);
 assert.match(css,/color:#ff9a9f/);
 assert.match(css,/\.op-card-new\{[^}]*visibility:visible/);
 assert.doesNotMatch(css,/^\/\/ /m,"Raw JS-style comments must not swallow CSS rules");
 const overview=read("src/components/operator/sections/OperatorOverview.astro");
 assert.match(overview,/op-chip op-element-chip" data-element=\{gameData\?\.operator\.element\?\.toLowerCase\(\)\}/);
});
test("optional closed Gear Matrix lives after Build Finder, Si & Liino enabled, others hidden",()=>{
 const component=read("src/components/operator/sections/OperatorEquipment.astro");
 const schema=read("src/content/operatorGuideSchema.ts");
 assert.match(schema,/matrix: z\.object/);
 assert.match(schema,/variants: z\.array/);
 assert.match(component,/data-matrix-tab/);
 assert.match(component,/data-matrix-panel/);
 assert.match(schema,/enabled: z\.boolean\(\)\.default\(false\)/);
 assert.match(component,/matrix\?\.enabled && <details/);
 assert.match(component,/data-guide-disclosure="equipment-matrix"/);
 assert.ok(component.indexOf('id="equipment-matrix"')>component.indexOf('id="build-finder"'));
 assert.match(component,/view\.metrics\.map/);
 assert.match(component,/view\.rows\.map/);
 assert.match(component,/view\.rows\.length===0/);
 assert.match(component,/data-matrix-expand/);
 assert.match(component,/<dialog class="op-matrix-dialog"/);
 assert.match(component,/data-matrix-dialog-content/);
 const sharedGuide=read("src/components/operator/OperatorGuide.astro");
 assert.match(sharedGuide,/\.showModal\(\)/);
 assert.match(sharedGuide,/original\.cloneNode\(true\)/);
 const css=read("src/styles/operator-guides.css");
 assert.match(css,/\.op-matrix-dialog::backdrop/);
 assert.match(css,/\.op-matrix-dialog-scroll\{[^}]*overflow:auto/);
 assert.match(css,/\.op-matrix-dialog-scroll \.op-equipment-matrix\{width:max-content/);
 for(const slug of ["si","liino"]){
  const text=read("src/content/operator-guides/"+slug+".md");
  assert.match(text,/equipment:\n  builds:/);
  assert.match(text,/  matrix:\n    enabled: true/);
  if(slug==="liino"){
    assert.match(text,/    rows:\n      - id: signature-p0-max-will/);
    assert.match(text,/will: "1320 WILL", ult-gain: "\+0%", amp-bonus: "52\.8%"/);
    assert.match(text,/      - id: bp-p5-xiranite/);
    assert.match(text,/weaponPotential: "P5"/);
    assert.match(text,/weaponTuning: "9\/9\/9"/);
  }else{
    assert.match(text,/    variants:\n      - id: dps/);
    assert.match(text,/      - id: support/);
    assert.match(text,/values: \{atk: "6526", cs-dmg: "\+125.6%", ult-gain: "\+0%"\}/);
  }
 }
 assert.doesNotMatch(read("src/content/operator-guides/typhoeus.md"),/  matrix:\n    enabled: true/);
 assert.match(read("src/content/operator-guides/_template.md"),/  matrix:\n    enabled: false/);
 for(const name of ["weapons","armor","gloves","kit"]){
  const file="public/images/endfield/ui/matrix-"+name+".webp";
  assert.ok(existsSync(file));
  const binary=readFileSync(file);
  assert.equal(binary.toString("ascii",0,4),"RIFF");
  assert.equal(binary.toString("ascii",8,12),"WEBP");
 }
});
test("26 November 2026 00:00 at fixed UTC+2 is 22:00Z, independent of Berlin winter time",()=>{
 assert.equal(CURRENT_VERSION.endsAt,"2026-11-26T00:00:00+02:00");
 assert.equal(CURRENT_VERSION.timeZone,"Etc/GMT-2");
 assert.equal(CURRENT_VERSION.displayZoneDe,"MESZ (UTC+2)");
 assert.equal(CURRENT_VERSION.displayZoneEn,"CEST (UTC+2)");
 assert.equal(CURRENT_VERSION.endsAtUtc,"2026-11-25T22:00:00.000Z");
 assert.equal(CURRENT_VERSION.endTimestamp,Date.UTC(2026,10,25,22));
 assert.equal((CURRENT_VERSION.endTimestamp-Date.parse("2026-11-25T21:00:00Z"))/3600000,1);
 assert.equal((CURRENT_VERSION.endTimestamp-Date.parse("2026-11-25T22:00:00Z"))/3600000,0);
 assert.throws(()=>parseVersionCountdownMarkdown(read("src/data/endfield/version-countdown.md")
     .replace("2026-11-26T00:00:00+02:00","2026-11-26T00:00:00+01:00")),/offset does not match/);
 const timer=read("src/components/endfield/VersionCountdown.astro");
 assert.match(timer,/data-ends-at=\{patch\.endsAtUtc\}/);
 assert.match(timer,/data-ends-local=\{patch\.endsAt\}/);
 assert.match(timer,/l\(patch\.displayZoneDe,patch\.displayZoneEn\)/);
});
