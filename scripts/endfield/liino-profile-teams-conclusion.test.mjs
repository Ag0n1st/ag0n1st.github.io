import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");
const guide=read("src/content/operator-guides/liino.md");
const schema=read("src/content/operatorGuideSchema.ts");
const profile=read("src/components/operator/sections/OperatorOverview.astro");
const teamsView=read("src/components/operator/sections/OperatorTeams.astro");
const gameplayView=read("src/components/operator/sections/OperatorGameplay.astro");
const conclusionView=read("src/components/operator/sections/OperatorConclusion.astro");
const model=read("src/lib/endfield/operatorGuideModel.ts");
const css=read("src/styles/operator-guides.css");
const template=read("src/content/operator-guides/_template.md");

function yamlSection(start,end){
 const i=guide.indexOf("\n"+start+":\n");
 const j=guide.indexOf("\n"+end+":\n",i+1);
 assert.ok(i>=0&&j>i, "Expected "+start+" section");
 return guide.slice(i+1,j);
}

test("Liino profile has exact English trait terms, four strengths and two creator weaknesses",()=>{
 const overview=yamlSection("overview","operatorKit");
 assert.match(overview,/traits: \["HP Treatment", "Amp"\]/);
 const strength=overview.split("  strengths:\n")[1]?.split("  weaknesses:\n")[0];
 const weakness=overview.split("  weaknesses:\n")[1]?.split("  partners:")[0];
 assert.equal((strength.match(/^    - /gm)||[]).length,4);
 assert.equal((weakness.match(/^    - /gm)||[]).length,2);
 for(const word of ["Verstärkungseffekte","FP-Generierung","Vielseitig","Einfach"])assert.ok(strength.includes(word));
 assert.match(weakness,/Signature-Waffe/);
 assert.match(weakness,/Golden Age \(BP\)/);
 assert.match(schema,/traits: z\.array\(/);
 assert.match(profile,/guide\.overview\.traits\.map\(trait=>/);
 assert.match(profile,/\{trait\}/);
});

test("two showcased meta teams and three additional teams, all with Liino as support",()=>{
 const section=yamlSection("teams","gameplay");
 assert.match(section,/roles: \[support\]/);
 const meta=section.split("  meta:\n")[1]?.split("  more:\n")[0]??"";
 const more=section.split("  more:\n")[1]??"";
 assert.equal((meta.match(/^    - id: /gm)||[]).length,2);
 assert.equal((more.match(/^    - id: /gm)||[]).length,3);
 assert.deepEqual([...meta.matchAll(/members: \[([^\]]+)\]/g)].map(m=>m[1].split(", ").join("|")),[
  "zhuang-fangyi|perlica|arclight|liino",
  "arcane|tangtang|xaihi|liino"
 ]);
 assert.deepEqual([...more.matchAll(/members: \[([^\]]+)\]/g)].map(m=>m[1].split(", ").join("|")),[
  "zhuang-fangyi|perlica|arcane|liino",
  "arcane|snowshine|xaihi|liino",
  "arcane|estella|xaihi|liino"
 ]);
 assert.equal((section.match(/^      role: support$/gm)||[]).length,5);
 assert.doesNotMatch(section,/role: main-dps|role: hybrid|roles: \[main-dps/);
 assert.match(model,/const displayTeamMember = \(slug:string\)/);
 assert.match(model,/getImportedOperator\(slug\)\?\.operator\.name/);
 assert.match(teamsView,/<span class="op-chip is-accent">Meta<\/span><span class="op-chip">\{roleLabels\[team\.role\]\}<\/span>/);
 assert.equal((teamsView.match(/displayTeamMember\(member\)/g)||[]).length,2);
});

test("Gameplay is explicitly pending without fictional preview videos",()=>{
 const gameplay=yamlSection("gameplay","conclusion");
 assert.match(gameplay,/pending: true/);
 assert.match(gameplay,/showcases: \[\]/);
 assert.match(schema,/pending: z\.boolean\(\)\.default\(false\)/);
 assert.match(model,/guide\.gameplay\.pending \? \[\] :/);
 assert.match(gameplayView,/guide\.gameplay\.pending \? <>/);
 assert.match(gameplayView,/op-gameplay-pending-label/);
 assert.match(gameplayView,/>FOLGT<\/span>/);
 assert.match(css,/\.op-gameplay-pending-label\{/);
 assert.match(template,/pending: false/);
});

test("conclusion gives a finalized recommendation and keeps skip criteria personal",()=>{
 const conclusion=guide.split("\nconclusion:\n")[1].split("\n---")[0];
 assert.match(conclusion,/recommendation: recommended/);
 assert.match(conclusion,/verdict: >-/);
 assert.match(conclusion,/pullAdvice: >-/);
 assert.match(conclusion,/Elektro- und Natur/);
 assert.match(conclusion,/ANG/);
 assert.match(conclusion,/passiv/);
 assert.equal((conclusion.split("  recommendedFor:\n")[1].split("  skipIf:\n")[0].match(/^    - /gm)||[]).length,3);
 assert.equal((conclusion.split("  skipIf:\n")[1].match(/^    - /gm)||[]).length,1);
 assert.match(conclusion,/Prüfe deine vorhandenen Teams/);
 assert.match(conclusionView,/op-pull-recommendation-badge/);
 assert.match(conclusionView,/✓<\/span> Empfehlung/);
 assert.match(css,/\.op-pull-recommendation-badge/);
 assert.doesNotMatch(read("src/components/operator/sections/OperatorPotentials.astro"),/>Pull-Empfehlung<\/h3>/);
});

test("editorial changes do not alter approved builds, skill priority, Datafield models or preview status",()=>{
 assert.match(guide,/^status: preview$/m);
 assert.match(guide,/order: \[ultimate, battle, combo, basic\]/);
 assert.match(guide,/comparisons: \[">", ">=", ">"\]/);
 for(const label of ["ultimate-fokus","balanced","will-fokus","level-60","level-50","level-36"])
  assert.match(guide,new RegExp("^    - id: "+label+"$","m"));
 assert.equal((guide.match(/^      meta: true$/gm)||[]).length,3);
 assert.equal((guide.match(/^    - level: [1-5]$/gm)||[]).length,5);
 for(const id of ["zhuang-perlica-arclight","arcane-tt-xaihi"])
  assert.match(guide,new RegExp("^    - id: "+id+"$","m"));
});
