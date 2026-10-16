import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const version=read("src/data/endfield/catalog/v16-gear.json");
const legacy=read("src/data/endfield/catalog/si-release-gear.json");
const official=read("src/data/endfield/catalog/items.json");
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").trim();

test("Version 1.6 complete release inventory has exactly 18 unique gear records across five documented groups",()=>{
  assert.equal(version.version,"1.6");
  assert.equal(version.items.length,18);
  const groups=Object.fromEntries([...new Set(version.items.map(x=>x.gearSet))].map(set=>[
    set,version.items.filter(x=>x.gearSet===set).length
  ]));
  assert.deepEqual(groups,{"Pulser Labs":3,"Eternal Xiranite":4,"Rift Trekker":5,"Type 50 Yinglung":3,"AIC Fieldwork":3});
  const ids=version.items.map(x=>x.id);
  assert.equal(new Set(ids).size,18);
  for(const row of version.items){
    assert.match(row.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(row.officialNumericId,null);
    assert.equal(row.identityStatus,"official-numeric-id-unverified");
    assert.deepEqual(row.categories,["Gear"]);
    assert.ok(["Armor","Gloves","Kit"].includes(row.slot));
    assert.ok(row.sourcePage.startsWith("https://endfield.wiki.gg/wiki/"));
    if(row.iconPath){
      assert.match(row.iconPath,/^\/images\/endfield\/gear\/releases\/(?:si|v16)\/[a-z0-9-]+\.webp$/);
      assert.ok(existsSync("public"+row.iconPath),"Missing cached icon for "+row.name);
    }
  }
});

test("The existing six Si v1.6 references remain source-consistent and use no fake numeric IDs",()=>{
  assert.equal(legacy.items.length,6);
  const byId=new Map(version.items.map(x=>[x.id,x]));
  for(const original of legacy.items){
    assert.equal(byId.get(original.id)?.name,original.name);
    assert.equal(byId.get(original.id)?.gearSet.startsWith("Type 50")||byId.get(original.id)?.gearSet==="Eternal Xiranite",true);
  }
  const resolver=readFileSync("src/lib/endfield/itemCatalog.ts","utf8");
  assert.match(resolver,/v16-gear\.json/);
  assert.match(resolver,/v16Gear\.items\.length!==18/);
  assert.match(resolver,/an unverified community alias must NEVER replace an official numeric match/);
});

test("Community v1.6 attributes remain separate from official SKPORT detail tables",()=>{
  const populated=version.items.filter(x=>x.communityBaseStats);
  assert.equal(populated.length,17);
  const unknown=version.items.filter(x=>!x.communityBaseStats);
  assert.deepEqual(unknown.map(x=>x.name),["Type 50 Yinglung Gauntlets"]);
  for(const row of populated){
    const s=row.communityBaseStats;
    assert.equal(s.source,"https://endfieldhub.org/database/gears");
    assert.ok(Number.isFinite(s.def) && s.def>0);
    assert.ok(Number.isFinite(s.effectPercent) && s.effectPercent>0);
    assert.ok(typeof s.effect==="string" && s.effect.length>4);
    for(const key of ["str","agi","int","will"])assert.ok(s[key]===null||Number.isFinite(s[key]));
    assert.equal(row.communityStatStatus,"cross-referenced-external-v1.6-table-not-official");
  }
  assert.equal(official.source.snapshot,"2026-10-15");
  assert.equal(official.items.length,940);
  assert.equal(official.items.filter(x=>x.categories.includes("Gear")).length,258);
  const known=new Set(official.items.filter(x=>x.categories.includes("Gear")).map(x=>norm(x.name)));
  assert.ok(version.items.every(x=>!known.has(norm(x.name))),
    "New SKPORT items need a separately verified official migration, not silent alias substitution");
});

test("The read-only SKPORT audit and official scope have no implicit numeric mapping",()=>{
  const script=readFileSync("scripts/endfield/probe-v16-skport.mjs","utf8");
  assert.match(script,/V16_OFFICIAL_CATALOG_AUDIT/);
  assert.match(script,/exact-name-match-only/);
  assert.doesNotMatch(script,/git push|workflow_dispatch|process\.env\.GITHUB_TOKEN/);
});
