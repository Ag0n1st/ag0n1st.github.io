import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("Endfield nav has eleven entries after Roulette launch, excludes three former game-system links and keeps Cheat Sheets in both languages",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 assert.equal((nav.match(/\{ label: "/g)||[]).length,11);
 for(const term of ["key: \"recruitment\"","key: \"refinement\"","key: \"essences\"",
                    'href: "/endfield/rekrutierung/"','href: "/endfield/veredelung/"','href: "/endfield/essenzen/"',
                    'recruitment:"/en/endfield/recruitment/"','refinement:"/en/endfield/refinement/"'])
    assert.ok(!nav.includes(term),"removed stand-alone navigation: "+term);
 assert.match(nav,/key: "cheatsheets"/);
 assert.match(nav,/cheatsheets:"\/en\/endfield\/cheatsheets\/"/);
 assert.match(nav,/new Set\(\["factory","checklist"\]\)/);
});
test("Cheat Sheets integrates Gacha System after Refinement while keeping other references bilingual",()=>{
 const page=read("src/components/pages/EndfieldCheatSheets.astro");
 for(const anchor of ["essences","bufffood"])
   assert.ok(page.includes('id:"'+anchor+'"'),"missing placeholder anchor "+anchor);
 assert.match(page,/<EndfieldRecruitment lang=\{lang\}/);
 assert.ok(page.indexOf("<RefinementMatrix lang={lang}")<page.indexOf("<EndfieldRecruitment lang={lang}"));
 assert.match(page,/<ElasticGoodsPeaks lang=\{lang\}/);
 assert.match(read("src/components/pages/ElasticGoodsPeaks.astro"),/id="elasticgoods"/);
 assert.doesNotMatch(page,/data-cheatsheets-group=|cheatsheets-systems-heading|cheatsheets-reference-heading/);
 assert.doesNotMatch(page,/Spielsysteme","Game systems"|Referenzen & Matrizen","References & matrices"/);
 assert.ok(page.indexOf("<ElasticGoodsPeaks lang={lang}")<page.indexOf("<RefinementMatrix lang={lang}"),"Elastic Goods must be first");
 assert.match(page,/<RefinementMatrix lang=\{lang\}/);
 const ref=read("src/components/pages/RefinementMatrix.astro");
 assert.match(ref,/id="refinement"/);
 assert.match(ref,/id="artificing"/);
 assert.match(ref,/Veredelungs-Matrix/);
 assert.match(ref,/Artificing Matrix/);
 assert.match(page,/Elastische Waren, Veredelung und Rekrutierung sind verfügbar/);
 assert.match(page,/Elastic Goods, the refinement matrix and recruitment are available/);
 assert.match(page,/In Vorbereitung","Coming soon"/);
 assert.match(page,/\[\.\.\.systems,\.\.\.categories\]\.map/);
 assert.match(page,/class="endfield-coming-cards endfield-cheatsheets-upcoming"/);
});
test("All six old DE and EN system routes redirect to canonical Cheat Sheet section anchors",()=>{
 const paths={
  "src/pages/endfield/rekrutierung/index.astro":["de","recruitment"],
  "src/pages/endfield/veredelung/index.astro":["de","refinement"],
  "src/pages/endfield/essenzen/index.astro":["de","essences"],
  "src/pages/en/endfield/recruitment/index.astro":["en","recruitment"],
  "src/pages/en/endfield/refinement/index.astro":["en","refinement"],
  "src/pages/en/endfield/essences/index.astro":["en","essences"]
 };
 for(const [file,[locale,anchor]]of Object.entries(paths)){
   const route=read(file);
   assert.ok(route.includes('lang="'+locale+'"'),file);
   assert.ok(route.includes('section="'+anchor+'"'),file);
 }
 const alias=read("src/components/pages/EndfieldCheatSheetsRedirect.astro");
 assert.match(alias,/http-equiv="refresh"/);
 assert.match(alias,/noindex,follow/);
 assert.match(alias,/rel="canonical"/);
 assert.match(alias,/\+"\/endfield\/cheatsheets\/#"\+section/);
 assert.match(alias,/href=\{target\}/);
});
test("Sitemap advertises Cheat Sheets, not six retired standalone URLs",()=>{
 const sitemap=read("src/pages/sitemap.xml.ts");
 assert.match(sitemap,/"\/endfield\/cheatsheets\/"/);
 for(const s of ["rekrutierung","veredelung","essenzen"])assert.ok(!sitemap.includes('"/endfield/'+s+'/"'));
});


test("Gacha System integrates recruitment, bonus milestones, tokens and RE-Factor issues within Cheat Sheets",async()=>{
 const {sixStarChance,featuredExample,STANDARD_IDS,SI_LOSS_POOL}=await import("../../src/lib/endfield/recruitment.mjs");
 assert.equal(sixStarChance(1),0.8);
 assert.equal(sixStarChance(65),0.8);
 assert.equal(sixStarChance(66),5.8);
 assert.equal(sixStarChance(67),10.8);
 assert.equal(sixStarChance(70),25.8);
 assert.equal(sixStarChance(80),100);
 assert.deepEqual(featuredExample(70),{pity80:0,guarantee120Used:true,token240:70,remainingToken240:170});
 assert.deepEqual(featuredExample(10),{pity80:0,guarantee120Used:true,token240:10,remainingToken240:230});
 assert.deepEqual(STANDARD_IDS,["last-rite","lifeng","pogranichnik","ardelia","ember"]);
 assert.deepEqual(SI_LOSS_POOL.slice(5),["typhoeus","liino"]);
 const guide=read("src/components/pages/EndfieldRecruitment.astro");
 const event=read("src/components/pages/RecruitmentEvent.astro");
 const rerun=read("src/components/pages/RecruitmentRerun.astro");
 const standard=read("src/components/pages/RecruitmentStandard.astro");
 const meters=read("src/components/pages/RecruitmentMeters.astro");
 const ui=read("src/styles/endfield-recruitment.css");
 const routes=["src/pages/endfield/cheatsheets/rekrutierung/index.astro","src/pages/en/endfield/cheatsheets/recruitment/index.astro"];
 for(const path of routes)assert.ok(read(path).includes("EndfieldCheatSheetsRedirect"));
 assert.match(read("src/lib/i18n/site.mjs"),/cheatsheets\/rekrutierung\/":\"\/en\/endfield\/cheatsheets\/recruitment/);
 assert.ok(!read("src/pages/sitemap.xml.ts").includes('"/endfield/cheatsheets/rekrutierung/"'));
 assert.match(guide,/id="recruitment"/);
 assert.match(guide,/Gacha System/);
 assert.match(guide,/Operator Rekrutierung/);
 assert.match(guide,/Weapon Issue/);
 assert.match(guide,/data-rc-mode-tab/);
 assert.match(guide,/data-rc-mode-panel/);
 assert.match(guide,/role="tablist"/);
 assert.match(guide,/data-rc-tab=/);
 assert.match(guide,/ArrowRight/);
 for(const kind of ["event","rerun","standard"])assert.ok(guide.includes('id:"'+kind+'"'));
 assert.match(meters,/<progress/);
 assert.match(meters,/data-rc-pity=/);
 assert.match(meters,/rc-meter-explanation/);
 assert.match(meters,/rc-token-icon/);
 assert.equal((event.match(/data-rc-example="/g)||[]).length,2);
 assert.match(event,/70\/240/);
 assert.match(event,/170/);
 assert.match(event,/230/);
 assert.doesNotMatch(event,/nicht 140|not 140/);
 assert.match(event,/REKRUTIERUNG: PRIORISIERT/);
 assert.match(event,/rc-title-aside/);
 assert.match(event,/rc-pool-previous/);
 assert.match(event,/Oroberyls nicht verschwenden/);
 assert.match(event,/rc-milestone-note/);
 assert.doesNotMatch(event,/rc-milestone-grid/);
 assert.match(event,/Bonusrekrutierung/);
 assert.match(event,/Rekrutierungs-Dossier/);
 assert.match(event,/data-rc-advanced/);
 assert.match(event,/EXTREM FORTGESCHRITTEN/);
 assert.match(event,/161 Pulls/);
 assert.match(event,/rc-strategy-outcomes/);
 assert.match(event,/SI_LOSS_POOL\.map/);
 assert.match(event,/Bonusrekrutierung/);
 assert.match(rerun,/69\/240/);
 assert.match(rerun,/RE-FAKTOR-REKRUTIERUNG/);
 assert.doesNotMatch(rerun,/OFFIZIELL:/);
 assert.match(rerun,/data-rc-rerun-cycle/);
 assert.match(rerun,/data-rc-cycle-guarantee/);
 assert.match(rerun,/data-rc-issue/);
 assert.match(rerun,/data-rc-re-milestone/);
 assert.match(rerun,/Bonusrekrutierung/);
 assert.match(rerun,/tangtang-token.webp/);
 assert.match(standard,/STANDARD_IDS/);
 assert.match(ui,/@media\(max-width:600px\)/);
 const hub=read("src/components/pages/EndfieldCheatSheets.astro");
 assert.match(hub,/<EndfieldRecruitment lang=\{lang\}/);
 assert.doesNotMatch(hub,/Rekrutierungs-Guide öffnen/);
 assert.match(event,/si-token.webp/);
});


// New assets are compressed copies of the two supplied token images.
test("Both token assets exist without exceeding the site's file budget",async()=>{
 const {existsSync,statSync}=await import("node:fs");
 for(const op of ["si","tangtang"]){
  const path="public/images/endfield/cheatsheets/"+op+"-token.webp";
  assert.ok(existsSync(path),path);
  assert.ok(statSync(path).size<10000,path+" should stay compact");
 }
});


test("All five Cheat Sheet cards collapse and legacy anchors reopen the matching card",()=>{
 const hub=read("src/components/pages/EndfieldCheatSheets.astro");
 assert.equal((hub.match(/class="cheatsheet-entry"/g)||[]).length,3);
 assert.match(hub,/class="cheatsheet-entry cheatsheet-entry-upcoming"/);
 for(const name of ["elasticgoods","refinement","recruitment"])assert.ok(hub.includes('data-cheatsheet-entry="'+name+'"'));
 assert.match(hub,/data-cheatsheet-accordion/);
 assert.match(hub,/hashchange/);
 assert.match(hub,/artificing:"refinement"/);
 assert.match(hub,/wrapper\.open=true/);
 assert.match(hub,/Good Matches/);
 assert.match(hub,/Gacha System/);
});

test("Gacha refinement has bilingual Headhunting art, milestone notes and consistent Tangtang 69/90 progress",()=>{
 const guide=read("src/components/pages/EndfieldRecruitment.astro");
 const event=read("src/components/pages/RecruitmentEvent.astro");
 const rerun=read("src/components/pages/RecruitmentRerun.astro");
 const css=read("src/styles/endfield-recruitment.css");
 assert.ok(guide.includes("headhun"+"ting.webp"));
 assert.match(guide,/Alle Banner im Überblick/);
 assert.match(guide,/All banners at a glance/);
 assert.match(guide,/REKRUTIERUNG · CHEAT SHEET/);
 assert.match(event,/rc-milestone-note/);
 assert.doesNotMatch(event,/rc-milestone-grid/);
 assert.match(event,/Jeder weitere Pull auf demselben Banner, nach verbrauchter 120er Garantie, ist verschwendet!/);
 assert.match(event,/genügend Pull-Währung zur Verfügung hast/);
 assert.match(event,/aktiv Pulls verlieren kannst/);
 assert.match(event,/Fall 2 · Worst Case/);
 assert.match(rerun,/Tangtang als Beispiel/);
 assert.match(rerun,/69.*\/ 120/);
 assert.match(rerun,/rc-bonus-progress/);
 assert.match(rerun,/data-rc-bonus-state/);
 assert.doesNotMatch(rerun,/95\s*\/\s*240/);
 assert.match(css,/--rc-strategy:#82e3eb/);
 assert.match(css,/--rc-strategy:#ee99d5/);
 assert.match(css,/rc-bonus-segment progress/);

});
