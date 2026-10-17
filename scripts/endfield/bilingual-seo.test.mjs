import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {EN_PAGES,SITE_ORIGIN,localizedUrl,alternateLinks,availableCounterpart,germanPath,englishPath} from "../../src/lib/i18n/site.mjs";
const read=p=>readFileSync(p,"utf8");
test("English language uses the public domain and stable, paired URLs without altering German originals",()=>{
 assert.equal(SITE_ORIGIN,"https://ag0n1st.com");
 assert.equal(localizedUrl("/endfield/operatoren/si/"),"https://ag0n1st.com/endfield/operatoren/si/");
 assert.equal(englishPath("/endfield/operatoren/si/"),"/en/endfield/operators/si/");
 assert.equal(germanPath("/en/endfield/operators/si/"),"/endfield/operatoren/si/");
 assert.equal(availableCounterpart("/en/endfield/operators/si/","en"),"/endfield/operatoren/si/");
 assert.equal(englishPath("/endfield/fabrik/"),"/en/endfield/factory/","Every tab needs its own EN page");
 for(const [de,en] of Object.entries(EN_PAGES)){
  const a=alternateLinks(de),b=alternateLinks(en);
  assert.deepEqual(a,b,"hreflang must be reciprocal");
  assert.equal(a.length,3);
  assert.deepEqual(a.map(x=>x.lang),["de","en","x-default"]);
  assert.equal(a[0].href,localizedUrl(de));
  assert.equal(a[1].href,localizedUrl(en));
  assert.equal(a[2].href,localizedUrl(de));
 }
 assert.match(read("astro.config.mjs"),/ag0n1st\.com/);
});
test("All three English editorial guides are real English content keyed to the original operator roster",()=>{
 const en=JSON.parse(read("src/data/i18n/en-guides.json"));
 for(const slug of ["si","typhoeus","liino"]){
  const x=en[slug];
  assert.ok(x.seoDescription.length>80&&x.seoDescription.length<200);
  assert.ok(x.intro.length>140);
  assert.ok(x.strengths.length>=3&&x.weaknesses.length>=2);
  assert.ok(x.mechanics.length>=2&&x.faq.length>=1);
  assert.ok(x.conclusion.length>=120);
  assert.ok(Object.keys(x.builds).length>=2);
  assert.ok(existsSync("src/data/endfield/operators/"+slug+".json"));
 }
 assert.match(en.si.priority.support,/Battle Skill > Ultimate > Combo Skill/);
 assert.match(JSON.stringify(en.si.mechanics),/Initial Stroke \(15 SP\)/);
 assert.match(JSON.stringify(en.si.mechanics),/Final Stroke/);
 assert.match(JSON.stringify(en.si.mechanics),/Inksoul/);
 assert.doesNotMatch(JSON.stringify(en),/First Brushstroke|Last Brushstroke|\\bFP\\b/);
 assert.match(en.si.builds["si-early-access"].text,/older Type 50 Yinglung Gloves/);
 assert.match(en.typhoeus.intro,/Nature/);
 assert.match(en.liino.intro,/Electric/);
});
test("Indexing respects true English editorial content and German preview status",()=>{
 const es=read("src/pages/en/endfield/operators/[slug].astro");
 const idx=read("src/pages/en/endfield/operators/index.astro");
 const map=read("src/pages/sitemap.xml.ts");
 assert.match(es,/OperatorGuide/);
 assert.match(es,/localizeOperatorGuide/);
 assert.match(es,/noindex=\\{preview\\}/);
 assert.doesNotMatch(es,/en-guide-build-grid|en-guide-team-grid|en-guide-skill/);
 const shared=read("src/components/operator/OperatorGuide.astro");
 for(const section of ["Overview","Kit","Skills","Weapons","Equipment","Potentials","Teams","Gameplay","Conclusion"]){
   assert.ok(shared.includes("Operator"+section),section+" is rendered by both languages");
 }
 const data=JSON.parse(read("src/data/i18n/en-guide-content.json"));
 const originals={"si":{meta:6,extra:37},"typhoeus":{meta:4,extra:5},"liino":{meta:2,extra:3}};
 for(const slug of ["si","typhoeus","liino"]){
   const g=data.guides[slug];
   assert.ok(g.operatorKit.playstyle.length>250);
   assert.equal(g.skills.active.basic.length>40,true);
   assert.ok(g.equipment.builds.length>=6);
   assert.ok(g.teams.meta.length>=2);
   assert.ok(g.conclusion.verdict.length>90);
   assert.ok(g.overview.summary.length>100);
 }
 for(const file of ["factory","recruitment","refinement","essences","speedruns","checklist","countdown","characters"]){
   assert.ok(existsSync("src/pages/en/endfield/"+file+"/index.astro"));
 }
 assert.match(map,/published/);
 assert.match(map,/!published\\.has/);
 assert.match(idx,/href=\\{\\`\\/en\\/endfield\\/operators/);
 assert.match(read("src/layouts/EndfieldPlaceholder.astro"),/<SeoHead/);
 assert.match(read("public/robots.txt"),/https:\\/\\/ag0n1st\\.com\\/sitemap\\.xml/);

});
