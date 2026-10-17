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
  assert.match(guide,/featuredBuildId: "si-balanced"/);
  for(const title of ["Yvonne Main DPS","Last Rite Main DPS","Laevatain Main DPS","Rossi Main DPS","Si Main DPS","Si Main DPS (2)"])
    assert.ok(meta.includes('title: "'+title+'"'),title);
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
  assert.match(guide,/^    - id: "si-balanced"$/m);
  assert.match(guide,/^ +items: \["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "349"\]/m);
  assert.match(guide,/^    - id: "si-main"$/m);
  assert.match(guide,/metaTag: "balanced"/);
  assert.match(guide,/metaTag: "max-dmg"/);
  assert.match(guide,/metaTag: "max-buffs"/);
  assert.match(guide,/metaTag: "early-access"/);
  assert.match(guide,/items: \["796", "411", "342", "342"\]/);
  assert.match(guide,/^ +items: \["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "365"\]/m);
  const equipment=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
  assert.match(equipment,/!part\.detail\s*\|\| part\.detail\.status!==["']verified["']/);
  assert.match(equipment,/disabled=\{!part\.catalog \|\| !part\.detail/);
});

test("Si keeps gameplay pending without premature written rotation or fabricated videos",()=>{
  assert.match(guide,/pending: true/);
  assert.doesNotMatch(guide,/gameplay:\n  explanation:/);
  assert.match(guide,/Tintenseele/);
  assert.match(guide,/accessibility: 1/);
  assert.match(guide,/accessibilityNote:/);
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

test("Si has two independently ordered skill priorities and clear level targets",()=>{
  assert.match(guide,/order: \["combo", "battle", "basic", "ultimate"\]/);
  assert.match(guide,/comparisons: \[">", ">", ">="\]/);
  assert.match(guide,/supportPriority:/);
  assert.match(guide,/order: \["battle", "ultimate", "combo", "basic"\]/);
  assert.match(guide,/Lv 1–9 \(optional\)/);
  const model=readFileSync("src/lib/endfield/operatorGuideModel.ts","utf8");
  const section=readFileSync("src/components/operator/sections/OperatorSkills.astro","utf8");
  assert.match(model,/supportPriority/);
  assert.match(section,/prioritySets/);
});
test("Si early builds, main meta labels and direct editorial voice stay consistent",()=>{
  const byId=new Map(official.items.map(i=>[i.id,i]));
  for(const row of [
    ["349","Redeemer Seal"],["796","Redeemer Armor"],["411","Type 50 Yinglung Gloves"],["342","Type 50 Yinglung Knife T1"],["322","Mordvolt Insulation Vest T1"],
    ["323","Mordvolt Insulation Gloves T1"],["327","Mordvolt Insulation Battery T1"],
    ["291","Aburrey Flashlight"],["256","Mordvolt Insulation Vest"],
    ["259","Mordvolt Insulation Gloves"],["266","Mordvolt Insulation Wrench T1"],
    ["262","Mordvolt Insulation Wrench"]
  ])assert.equal(byId.get(row[0])?.name,row[1]);
  for(const id of ["si-balanced","si-main","si-support-xiranite","si-early-access","si-level36","si-level50"])
    assert.ok(guide.includes('id: "'+id+'"'),id);
  assert.match(guide,/items: \["322", "323", "327", "291"\]/);
  assert.match(guide,/items: \["256", "259", "266", "262"\]/);
  assert.match(guide,/Type-50-Yinglung-Set ist Sis Go-to-Set/);
  assert.doesNotMatch(guide,/Pre-Guide|Mobalytics|eigenen Pre-Guides|aus dem PDF/);
  assert.doesNotMatch(guide,/  closingNote:/);
  assert.match(guide,/Du hast keine Nutzung für Kryo-\/Hitze-Verstärkung/);
  const op=readFileSync("src/components/operator/OperatorGuide.astro","utf8");
  assert.match(op,/\{translateUi\("SKPORT-Datenstand:"\)\} \{localized.sourceSnapshot\}/);
  assert.doesNotMatch(op,/localized.terminologyNote/);
  const teams=readFileSync("src/components/operator/sections/OperatorTeams.astro","utf8");
  assert.match(teams,/teamMemberCard\(member\)/);
  assert.match(teams,/op-si-main-team":guide.operator==="si"&&team.role==="main-dps"/);
  const css=readFileSync("src/styles/operator-guides.css","utf8");
  assert.match(css,/\.op-si-main-team \.op-meta-team-labels \.op-chip:last-child/);
});

test("Si Early Access uses four official SKPORT pieces and three Type-50 set pieces",()=>{
  const byId=new Map(official.items.map(item=>[item.id,item]));
  for(const id of ["796","411","342"]){
    assert.ok(byId.has(id));
    assert.ok(byId.get(id).categories.includes("Gear"));
    assert.ok(existsSync("public"+byId.get(id).iconPath));
  }
  const early=guide.slice(guide.indexOf('    - id: "si-early-access"'),guide.indexOf('    - id: "si-level60"'));
  assert.match(early,/meta: true/);
  assert.match(early,/metaTag: "early-access"/);
  assert.match(early,/availableFromLevel: 70/);
  assert.match(early,/items: \["796", "411", "342", "342"\]/);
  assert.doesNotMatch(early,/type-50-yinglung-gauntlets|SKPORT-ID.*erfunden/);
  const schema=readFileSync("src/content/operatorGuideSchema.ts","utf8");
  assert.match(schema,/max-buffs", "early-access"/);
});
test("All operator overview strengths and weaknesses use subtle shared accent cards",()=>{
  const overview=readFileSync("src/components/operator/sections/OperatorOverview.astro","utf8");
  const css=readFileSync("src/styles/operator-guides.css","utf8");
  assert.match(overview,/op-cardlet op-strengths-card/);
  assert.match(overview,/op-cardlet op-weaknesses-card/);
  assert.match(css,/\.op-strengths-card\{/);
  assert.match(css,/\.op-weaknesses-card\{/);
  assert.match(css,/\.op-meta-build-grid\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  const buildView=readFileSync("src/components/operator/sections/OperatorEquipment.astro","utf8");
  assert.match(buildView,/Early Access/);
  assert.match(css,/\.op-meta-build-tags \.op-chip\.is-early/);
});
