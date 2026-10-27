import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {getCommunityTierlist,COMMUNITY_TIERLIST_ROLES,COMMUNITY_TIERLIST_RANKS} from "../../src/lib/endfield/communityTierlist.mjs";

const read=path=>readFileSync(path,"utf8");
const snapshot=JSON.parse(read("src/data/endfield/tierlists/2026-08-23.json"));
const roster=JSON.parse(read("src/data/endfield/endfieldle-roster.json"));
const expected={
 "damage-dealer":{
  S:["zhuang-fangyi","rossi","arcane"],
  A:["yvonne","laevatain","mi-fu"],B:["last-rite","tangtang"],
  C:["endministrator","avywenna"],D:["da-pan"],F:[]},
 enabler:{
  S:["arcane","camille","tangtang","pogranichnik"],
  A:["arclight","alesh","chen-qianyu","perlica"],
  B:["lifeng","wulfgard","fluorite"],C:["snowshine","ember"],
  D:["antal","akekuri"],F:[]},
 buffer:{
  S:["liino","gilberta","xaihi"],A:["ardelia","perlica","antal"],
  B:["camille","lifeng","akekuri"],C:["pogranichnik"],D:[],F:[]}
};

test("August 23 community rankings preserve every explicitly supplied role, tier and operator",()=>{
 assert.equal(snapshot.date,"2026-08-23");
 assert.equal(snapshot.schemaVersion,1);
 assert.deepEqual(COMMUNITY_TIERLIST_ROLES,["damage-dealer","enabler","buffer"]);
 assert.deepEqual(COMMUNITY_TIERLIST_RANKS,["S","A","B","C","D","F"]);
 assert.deepEqual(snapshot.roles,expected);
 const rows=getCommunityTierlist(snapshot,roster);
 assert.equal(rows.roles.length,3);
 assert.deepEqual(rows.roles.map(r=>r.tiers.map(t=>t.operators.length)),[
  [3,3,2,2,1,0],[4,4,3,2,2,0],[3,3,3,1,0,0]
 ]);
 assert.equal(rows.roles.reduce((n,r)=>n+r.tiers.reduce((m,t)=>m+t.operators.length,0),0),36);
 assert.deepEqual(rows.roles.find(r=>r.id==="buffer").tiers.filter(t=>t.rank==="D"||t.rank==="F").map(t=>t.operators.length),[0,0]);
});

test("all placements reference existing offline operator images and use canonical operator names",()=>{
 const x=getCommunityTierlist(snapshot,roster);
 for(const role of x.roles){
  const slugs=new Set();
  for(const tier of role.tiers)for(const op of tier.operators){
   assert.ok(!slugs.has(op.id),role.id+" duplicate "+op.id);
   slugs.add(op.id);
   assert.ok(op.name,op.id+" missing official name");
   assert.match(op.icon,/^\/images\/endfield\/operators\/[-\w]+\/official-icon\.webp$/);
   assert.ok(existsSync("public"+op.icon),"missing static icon: "+op.icon);
  }
 }
 assert.equal(x.roles.find(x=>x.id==="damage-dealer").tiers.find(t=>t.rank==="S").operators[0].name,"Zhuang Fangyi");
 assert.equal(x.roles.find(x=>x.id==="enabler").tiers.find(t=>t.rank==="A").operators[2].name,"Chen Qianyu");
});

test("future community snapshots fail closed for invented slugs, duplicate placements and altered ranks",()=>{
 const clone=()=>structuredClone(snapshot);
 const unknown=clone();unknown.roles.buffer.S[0]="made-up";
 assert.throws(()=>getCommunityTierlist(unknown,roster),/Missing official operator icon/);
 const duplicate=clone();duplicate.roles.buffer.C[0]="liino";
 assert.throws(()=>getCommunityTierlist(duplicate,roster),/Duplicate\/invalid/);
 const extra=clone();extra.roles.enabler.SS=[];
 assert.throws(()=>getCommunityTierlist(extra,roster),/ranks missing or unexpected/);
});

test("both tierlist routes use the same dated card, responsive CSS, tab keyboard nav and no generated images",()=>{
 const de=read("src/pages/endfield/tierlist/index.astro");
 const en=read("src/pages/en/endfield/tierlist/index.astro");
 assert.match(de,/<EndfieldTierlist lang="de"\s*\/>/);
 assert.match(en,/<EndfieldTierlist lang="en"\s*\/>/);
 const page=read("src/components/pages/EndfieldTierlist.astro");
 const css=read("src/styles/endfield-tierlist.css");
 const nav=read("src/components/EndfieldNav.astro");
 assert.match(page,/getCommunityTierlist\(snapshot,roster\)/);
 assert.match(page,/data-community-tierlist/);
 assert.match(page,/data-tierlist-tab/);
 assert.match(page,/role="tabpanel"/);
 assert.match(page,/ArrowRight/);
 assert.match(page,/ArrowLeft/);
 assert.match(page,/aria-selected/);
 assert.match(page,/tier\.operators\.map/);
 assert.match(page,/src=\{op.icon\}/);
 assert.match(page,/new Intl.DateTimeFormat/);
 assert.match(page,/class="tierlist-disclaimer" role="note"/);
 assert.match(page,/Stand:/);
 assert.match(page,/Die Tierlist wird immer zusammen mit der Community Live im Stream erstellt und spiegelt die Meinung der Allgemeinheit wieder/);
 assert.match(page,/The tier list is always created live on stream together with the community/);
 assert.equal((page.match(/<time datetime=\{tierlist.date\}>\{date\}<\/time>/g)||[]).length,1,"exactly one visible date");
 assert.doesNotMatch(page,/tierlist-caption|tierlist-date|tierlist-lead|endfield-stacked-title/);
 assert.match(page,/class="tierlist-title-end"/);
 assert.match(css,/\.tierlist-disclaimer\{border-left:3px solid var\(--cyan\)/);
 assert.match(css,/\.tierlist-page h1 \.tierlist-title-end\{white-space:nowrap/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/grid-template-columns:48px minmax\(0,1fr\)/);
 assert.match(nav,/new Set\(\["factory","checklist"\]\)/);
 assert.doesNotMatch(nav,/new Set\([^\n]*"tierlist"/);
 const cheats=read("src/components/pages/EndfieldCheatSheets.astro");
 assert.match(cheats,/<h1 class="endfield-cheatsheets-title">Cheat Sheets<span class="title-period">\.<\/span><\/h1>/);
 assert.match(cheats,/h1\.endfield-cheatsheets-title\{white-space:nowrap/);
 assert.doesNotMatch(cheats,/<h1 class="endfield-stacked-title"/);
 assert.ok(!page.includes("image-gen"));
});
