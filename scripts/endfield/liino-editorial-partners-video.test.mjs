import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getMetaPartnerIds } from "../../src/lib/endfield/metaPartners.mjs";

const read = file => readFileSync(file, "utf8");
const guide = read("src/content/operator-guides/liino.md");
const model = read("src/lib/endfield/operatorGuideModel.ts");
const overview = read("src/components/operator/sections/OperatorOverview.astro");
const teamsView = read("src/components/operator/sections/OperatorTeams.astro");
const template = read("src/content/operator-guides/_template.md");
const css = read("src/styles/operator-guides.css");
const teams = guide.split("\nteams:\n")[1].split("\ngameplay:\n")[0];
const metaTeams = teams.split("  meta:\n")[1].split("  more:\n")[0];
const otherTeams = teams.split("  more:\n")[1];

function membersOf(block) {
  return [...block.matchAll(/^\s+members: \[([^\]]+)\]$/gm)]
    .map(match => ({members: match[1].split(", ")}));
}

test("Liino partners use the six unique non-Liino members of ONLY the two Meta teams", () => {
  const imported = membersOf(metaTeams);
  assert.equal(imported.length, 2);
  const ids = getMetaPartnerIds(imported, "liino");
  assert.deepEqual(ids, [
    "zhuang-fangyi", "perlica", "arclight",
    "arcane", "tangtang", "xaihi"
  ]);
  assert.equal(new Set(ids).size, 6);
  assert.ok(!ids.includes("liino"));
  for (const slug of ["snowshine", "estella"]) {
    assert.match(otherTeams, new RegExp(slug));
    assert.ok(!ids.includes(slug), slug + " should only appear in extended team options");
  }
});

test("Partner collection deduplicates, preserves order, and reacts to changes in Meta lineups", () => {
  assert.deepEqual(getMetaPartnerIds([], "liino"), []);
  assert.deepEqual(getMetaPartnerIds([
    { members: ["liino", "alpha", "beta", "alpha"] },
    { members: ["gamma", "liino", "beta", "delta"] }
  ], "liino"), ["alpha", "beta", "gamma", "delta"]);
  assert.deepEqual(getMetaPartnerIds([
    {members:["liino", "new-partner", "beta", "alpha"]}
  ], "liino"), ["new-partner", "beta", "alpha"]);
});

test("Overview automatically displays readable partners and links to further Teams", () => {
  assert.match(model, /getMetaPartnerIds\(guide\.teams\.meta, guide\.operator\)/);
  assert.match(model, /const profilePartners = partnerIds\.map\(slug=>/);
  assert.match(model, /getOperatorImageUrl\(slug,"cover",official\?\.operator\.coverUrl\)/);
  assert.match(model, /profilePartners, demoShowcases/);
  assert.match(overview, /profilePartners\.map\(partner=>/);
  assert.match(overview, /\{partner\.name\}/);
  assert.match(overview, /\{partner\.initials\}/);
  assert.match(overview, /href="#teams">Teams<\/a>/);
  assert.doesNotMatch(overview, /guide\.overview\.partners\.map/);
  assert.doesNotMatch(overview, /\[Op\]/);
  assert.match(css, /\.op-partners-grid\{/);
  assert.match(template, /Partners werden automatisch aus den Meta-Teams/);
});

test("Meta and neutral role chips align together on the right, not separated", () => {
  assert.match(teamsView, /<div class="op-subtitle op-meta-team-heading">/);
  assert.match(teamsView, /<div class="op-meta-team-labels"><span class="op-chip is-accent">Meta<\/span><span class="op-chip">\{roleLabels\[team\.role\]\}<\/span><\/div>/);
  assert.match(css, /\.op-meta-team-labels\{[^\n]*margin-left:auto/);
});

test("Liino's actual YouTube guide is embedded in overview without changing pending gameplay", () => {
  assert.match(guide, /^guideVideo:\n  title: "Liino Guide"\n  url: "https:\/\/www\.youtube\.com\/watch\?v=F1sx8IuOIK4"$/m);
  assert.match(overview, /src=\{videoEmbed\}/);
  assert.match(overview, /allowfullscreen/);
  assert.match(model, /https:\/\/www\.youtube-nocookie\.com\/embed\//);
  assert.match(guide, /^gameplay:\n[\s\S]*?  pending: true\n  showcases: \[\]/m);
  assert.match(guide, /^status: preview$/m);
});

test("Published editorial prose never refers to its author in the third person", () => {
  const withoutComments = guide
    .replace(/<!--[^]*?-->/g, "")
    .split("\n").filter(line => !/^\s*#/.test(line)).join("\n");
  assert.doesNotMatch(withoutComments, /vom Creator|des Creators|auf Wunsch des Creators|vom Verfasser|vom Autor|von der Redaktion/i);
  assert.match(guide, /Cohesive Traction ist die F2P-Option/);
  assert.doesNotMatch(guide, /^  generalNotes: >-\n    Die Einordnung der vier empfohlenen Waffen stammt/m);
  assert.match(guide, /Die Balanced-Variante kombiniert drei LYNX-Teile/);
  assert.match(guide, /Dieser Build maximiert Liinos Wille/);
});
