import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const guide=readFileSync("src/content/operator-guides/si.md","utf8");
const main=JSON.parse(readFileSync("src/data/endfield/operators/si.json","utf8"));
const extra=JSON.parse(readFileSync("src/data/endfield/operators/si.extra.json","utf8"));
const de=JSON.parse(readFileSync("src/data/endfield/locales/de/si.json","utf8"));
const official=JSON.parse(readFileSync("src/data/endfield/catalog/items.json","utf8"));
const release=JSON.parse(readFileSync("src/data/endfield/catalog/si-release-gear.json","utf8"));
const tokens=(text)=>[...text.matchAll(/^\s+- id:/gm)].length;

test("Si is a verified SKPORT 6-star Cryo Supporter with complete 12-rank skill/extra records",()=>{
  assert.equal(main.operator.id,"1278");
  assert.equal(main.operator.slug,"si");
  assert.equal(main.operator.rarity,6);
  assert.equal(main.operator.element,"Cryo");
  assert.equal(main.operator.class,"Supporter");
  assert.equal(main.operator.weaponType,"Greatsword");
  assert.equal(extra.attributes.mainAttribute,"Intellect");
  assert.equal(extra.attributes.secondaryAttribute,"Strength");
  assert.deepEqual(main.skills.map(x=>x.name),
    ["Artistic Urge","Brushwork Realm","Fully Envisioned","No One Spoils the Fun"]);
  assert.equal(main.ranks.length,12);
  for(const s of main.skills)
    for(const row of s.metrics)assert.equal(row.length,13,"one metric plus all 12 game ranks");
  assert.equal(extra.potentials.length,5);
  assert.equal(extra.promotions.length,7);
  assert.equal(extra.talents.filter(x=>x.category==="combat").length,2);
  assert.equal(extra.talents.filter(x=>x.category==="ship").length,2);
});

test("Si German descriptions come from author's in-game text rather than inferred translation",()=>{
  assert.equal(de.status,"spieltext-aus-mobalytics-pdf-direkt-vom-user");
  assert.equal(de.sourceSnapshot,main.source.snapshot);
  assert.equal(de.operatorTerms.Intellect,"Intellekt");
  assert.equal(de.operatorTerms.Strength,"Stärke");
  assert.match(de.skills.basic.description,/STANDARDANGRIFF:[\s\S]*18 Taumeln/);
  assert.match(de.skills.battle.description,/Erster Pinselstrich: Kostet 15 FP/);
  assert.match(de.skills.battle.description,/Letzter Pinselstrich: Kostet keine FP/);
  assert.match(de.skills.combo.description,/Kryo- oder Hitzekumulierung/);
  assert.match(de.skills.ultimate.description,/verleiht dem gesamten Team vorübergehend Kryo-Verstärkung und Hitze-Verstärkung/);
});

test("Si's editorial 6 Meta and 37 additional teams match the author's theorycraft PDF",()=>{
  assert.match(guide,/^status: "published"$/m);
  assert.match(guide,/difficulty: 3/);
  assert.match(guide,/flexibility: 5/);
  for(const trait of ["Amp","Damage Dealer","Cryo Infliction"])assert.ok(guide.includes('"'+trait+'"'));
  const teamStart=guide.indexOf("\nteams:\n");
  const gameStart=guide.indexOf("\ngameplay:\n",teamStart);
  assert.ok(teamStart>=0 && gameStart>teamStart);
  const teamText=guide.slice(teamStart,gameStart);
  const meta=teamText.slice(teamText.indexOf("  meta:"),teamText.indexOf("  more:"));
  const more=teamText.slice(teamText.indexOf("  more:"));
  assert.equal(tokens(meta),6);
  assert.equal(tokens(more),37);
  for(const required of ["yvonne","last-rite","laevatain","rossi","si"])
    assert.ok(meta.includes('"'+required+'"'),"Meta partners must include "+required);
  assert.equal((meta.match(/evaluation:/g)||[]).length,6);
  assert.match(guide,/featuredBuildId: "si-main"/);
});

test("Si official weapons and Datafield relative reference are well sourced",()=>{
  const byId=new Map(official.items.map(x=>[x.id,x]));
  for(const id of ["1280","1281","70"]){
    assert.ok(byId.get(id)?.categories.includes("Weapons"));
    assert.ok(existsSync("public"+byId.get(id).iconPath));
  }
  assert.match(guide,/sourcePageType: "character-profile"/);
  assert.match(guide,/referenceWeaponId: "1280"/);
  for(const value of ["114.5","100","96.1","91","90.5","86.8"])
    assert.match(guide,new RegExp("performancePercent: "+value+"(?:\\n|$)"));
  assert.equal((guide.match(/increaseOverPreviousPercent:/g)||[]).length,5);
});

test("new 1.6 Si gear keeps source-tagged nonnumeric IDs and must not fake SKPORT blueprints",()=>{
  assert.equal(official.items.length,940,"never silently insert new wiki names into original SKPORT snapshot");
  assert.equal(release.items.length,6);
  const ids=new Set(release.items.map(x=>x.id));
  for(const row of release.items){
    assert.ok(!/^\d+$/.test(row.id));
    assert.ok(row.sourcePage.startsWith("https://endfield.wiki.gg/wiki/"));
    if(row.iconPath)assert.ok(existsSync("public"+row.iconPath),row.iconPath);
  }
  for(const id of ["type-50-yinglung-soft-armor","type-50-yinglung-gauntlets","type-50-yinglung-beacon"])
    assert.ok(ids.has(id));
  assert.match(guide,/^    - id: "si-main"$/m);
  assert.match(guide,/^ +items: \["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "365"\]/m);
  const equipment=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
  assert.match(equipment,/!part\.detail\s*\|\| part\.detail\.status!==["']verified["']/);
  assert.match(equipment,/disabled=\{!part\.catalog \|\| !part\.detail/);
});

test("Si's game content includes text-based rotation and defers ONLY nonexistent videos",()=>{
  assert.match(guide,/pending: true/);
  assert.match(guide,/explanation:/);
  assert.match(guide,/Tintenseele/);
  const component=readFileSync("src/components/operator/sections/OperatorGameplay.astro","utf8");
  assert.match(component,/guide\.gameplay\.explanation/);
  assert.equal((guide.match(/featured: true/g)||[]).length,0);
  for(const image of ["cover.webp","illustration.webp",
    "skills/skill-basic.webp","skills/skill-battle.webp",
    "skills/skill-combo.webp","skills/skill-ultimate.webp",
    "potentials/potential-1.webp","potentials/potential-3.webp","potentials/potential-5.webp"]){
    assert.ok(existsSync("public/images/endfield/operators/si/"+image),image);
  }
});
