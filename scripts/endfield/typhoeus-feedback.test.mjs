import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const guide=readFileSync("src/content/operator-guides/typhoeus.md","utf8");
const schema=readFileSync("src/content/operatorGuideSchema.ts","utf8");
const source=readFileSync("docs/typhoeus-source-audit-20261016.md","utf8");
const kit=readFileSync("src/components/operator/sections/TeamMemberGear.astro","utf8");

test("Typhoeus personal 1/5 ratings and preferred Nefarith main gameplay",()=>{
  assert.match(guide,/^    difficulty: 5$/m); // UI inverted => 1/5
  assert.match(guide,/^    flexibility: 1$/m);
  assert.match(guide,/    - id: nefarith-p0[\s\S]*?      featured: true/);
  assert.doesNotMatch(guide,/quiz-zeichen/);
  assert.equal((guide.match(/      featured: true/g)||[]).length,1);
});

test("German Will attribute is Wille, not Willenskraft in guides and locale",()=>{
  for(const file of [
    "src/content/operator-guides/typhoeus.md",
    "src/content/operator-guides/liino.md",
    "src/data/endfield/locales/de/typhoeus.json",
    "src/data/endfield/locales/de/liino.json"
  ]){
    const data=readFileSync(file,"utf8");
    assert.doesNotMatch(data,/Willenskraft/);
  }
  const ty=JSON.parse(readFileSync("src/data/endfield/locales/de/typhoeus.json","utf8"));
  const liino=JSON.parse(readFileSync("src/data/endfield/locales/de/liino.json","utf8"));
  assert.equal(ty.operatorTerms.Will,"Wille");
  assert.equal(liino.operatorTerms.Will,"Wille");
});

test("source-distinct Datafield weapon and potential profile models have their real baselines",()=>{
  assert.equal((guide.match(/sourcePageType: character-profile/g)||[]).length,2);
  assert.match(guide,/id: ardelia-arcane-liino[\s\S]*?weaponId: "1175", rank: 9, performancePercent: 124\.7/);
  assert.match(guide,/id: no-liino-less-atk[\s\S]*?weaponId: "1175", rank: 9, performancePercent: 123\.3/);
  assert.match(guide,/id: no-extra-ultimate-energy[\s\S]*?level: 4, increaseOverPreviousPercent: 0\.0/);
  assert.match(guide,/^      increaseOverPreviousPercent: 8\.3$/m);
  assert.match(source,/https:\/\/datafield\.cc\/characters\/typhoeus/);
  assert.match(schema,/comparisons: z\.array\(z\.object\(\{/);
});

test("team loadouts expose only explicitly sourced weapon IDs",()=>{
  assert.match(schema,/weaponId: identifier\.optional\(\)/);
  assert.match(schema,/weaponRank: z\.number\(\)\.int\(\)\.min\(1\)\.max\(9\)\.optional\(\)/);
  assert.match(kit,/row\.weaponId &&/);
  assert.match(kit,/resolveOfficialItem\(row\.weaponId,"Weapons"\)/);
  const armors=(guide.match(/items: \["1134", "1138", "1136", "1136"\]/g)||[]);
  assert.equal(armors.length,2,"both Meta Arcane examples must use Eternal Xiranite x2 Bracing Slab");
});
