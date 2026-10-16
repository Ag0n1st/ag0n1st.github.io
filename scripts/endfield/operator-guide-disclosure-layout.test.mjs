import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const file=(name)=>readFileSync(name,"utf8");
const base="src/components/operator/sections/";
const sections={
  kit:file(base+"OperatorKit.astro"),
  skills:file(base+"OperatorSkills.astro"),
  weapons:file(base+"OperatorWeapons.astro"),
  potentials:file(base+"OperatorPotentials.astro"),
  teams:file(base+"OperatorTeams.astro"),
  conclusion:file(base+"OperatorConclusion.astro"),
};
const toc=file("src/components/operator/OperatorGuide.astro");
const css=file("src/styles/operator-guides.css");

function disclosure(source,id){
  const token='data-guide-disclosure="'+id+'"';
  const where=source.indexOf(token);
  assert.ok(where>=0,"Disclosure missing: "+id);
  const opening=source.lastIndexOf("<details",where);
  const tag=source.slice(opening,source.indexOf(">",where)+1);
  assert.match(tag,/class="op-divided op-guide-accordion"/);
  assert.doesNotMatch(tag,/\bopen(?:=|\s|>)/,"Disclosure must be CLOSED by default: "+id);
  const nearby=source.slice(where,where+310);
  assert.match(nearby,/<summary class="op-guide-accordion-summary">/);
  assert.match(nearby,/op-guide-accordion-hint/);
}

test("all seven sections use native, initially collapsed guide detail panels",()=>{
  for(const [section,id] of [
    ["teams","team-options"],["potentials","potential-comparison"],
    ["weapons","weapon-details"],["weapons","weapon-comparison"],
    ["skills","skill-details"],["kit","attribute-progression"],["kit","operator-promotions"]
  ])disclosure(sections[section],id);
  assert.match(css,/\.op-guide-accordion>\.op-guide-accordion-summary:focus-visible/);
  assert.match(css,/\.op-guide-accordion\[open\]>/);
});

test("important at-a-glance content remains outside secondary disclosures",()=>{
  assert.ok(sections.skills.indexOf("<h3>Skill-Priorität</h3>")<sections.skills.indexOf('data-guide-disclosure="skill-details"'));
  assert.ok(sections.kit.indexOf("<h3>Operator-Profil & Spielweise</h3>")<sections.kit.indexOf('data-guide-disclosure="attribute-progression"'));
  assert.ok(sections.weapons.indexOf("<h3>Waffenempfehlungen</h3>")<sections.weapons.indexOf('data-guide-disclosure="weapon-details"'));
  assert.ok(sections.teams.indexOf("Empfohlene Meta-Teams")<sections.teams.indexOf('data-guide-disclosure="team-options"'));
  assert.ok(sections.potentials.indexOf("Potenzialübersicht")<sections.potentials.indexOf('data-guide-disclosure="potential-comparison"'));
  assert.match(sections.skills,/data-skill-rank=\{key\}/);
  assert.match(sections.weapons,/data-weapon-button=\{w\.id\}/);
  assert.match(sections.potentials,/data-potential-button=\{n\}/);
});

test("meta team labels are separate pills and only Meta is accented",()=>{
  assert.match(sections.teams,/<span class="op-chip is-accent">Meta<\/span><span class="op-chip">\{roleLabels\[team\.role\]\}<\/span>/);
  assert.doesNotMatch(sections.teams,/Meta · \{roleLabels/);
  assert.match(sections.teams,/data-team-role=\{team\.role\}/);
  assert.match(sections.teams,/data-team-filter="all"/);
});

test("Fazit has one lead, badge aligned to headline and two audience cards",()=>{
  const s=sections.conclusion;
  assert.equal((s.match(/<h2>Fazit<\/h2>/g)||[]).length,1);
  assert.match(s,/class="op-conclusion-header"/);
  assert.match(s,/class="op-pull-recommendation-badge"/);
  assert.match(s,/class="op-conclusion-lead"/);
  assert.equal((s.match(/<p class="op-conclusion-lead">/g)||[]).length,1);
  assert.doesNotMatch(s,/op-conclusion-detail/);
  assert.match(s,/class="op-two op-conclusion-audiences"/);
  assert.match(s,/Für wen lohnt es sich\?/);
  assert.match(s,/Wer kann verzichten\?/);
  assert.doesNotMatch(s,/<h3>Pull-Empfehlung<\/h3>/);
  assert.doesNotMatch(s,/>Gesamturteil<\/span>/);
  assert.match(s,/guide\.conclusion\.verdict \|\| guide\.conclusion\.pullAdvice/);
});

test("TOC explicit Gameplay navigation is preserved against bottom-of-document scroll clamp",()=>{
  assert.match(toc,/\["gameplay","8\. Gameplay"\]/);
  assert.match(toc,/let selectedByClick: string \| null = null/);
  assert.match(toc,/selectedByClick = id/);
  assert.match(toc,/destination\.scrollIntoView\(\{ behavior: "auto", block: "start" \}\)/);
  assert.match(toc,/window\.history\.pushState\(null, "", link\.hash\)/);
  assert.match(toc,/currentId = selectedByClick/);
  assert.match(toc,/bounds\.top < window\.innerHeight/);
  assert.match(toc,/setGuideLocation\(id\)/);
  assert.match(file(base+"OperatorGameplay.astro"),/id="gameplay"/);
  assert.match(css,/\.op-section\{scroll-margin-top:158px/);
});
