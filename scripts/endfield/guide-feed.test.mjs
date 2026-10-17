import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("all published character guides provide bilingual teasers and real release dates",()=>{
 const guides=[
  ["si","2026-10-15"],
  ["typhoeus","2026-09-02"],
  ["liino","2026-08-09"]
 ];
 for(const [slug,release] of guides){
  const src=read("src/content/operator-guides/"+slug+".md");
  assert.match(src,new RegExp("releaseDate: "+release));
  assert.match(src,/listedAt: 2026-10-17/);
  assert.match(src,/category: character/);
  assert.match(src,/summaryDe: ".{15,}/);
  assert.match(src,/summaryEn: ".{15,}/);
 }
 const feed=read("src/lib/content/guideFeed.ts");
 assert.ok(feed.includes('getCollection("operator-guides"'));
 assert.ok(feed.includes('getCollection("posts"'));
 assert.ok(feed.includes("b.data.listing?.releaseDate.getTime()"));
 assert.ok(feed.includes("b.listedAt.getTime()-a.listedAt.getTime()"));
 assert.ok(feed.includes('character:{de:"Charakter",en:"Character"}'));
});

test("both landing pages use exactly one locale-aware shared teaser component",()=>{
 const card=read("src/components/GuideTeaserCard.astro");
 const home=read("src/components/pages/HomePage.astro");
 const endfield=read("src/components/pages/EndfieldHome.astro");
 const index=read("src/components/pages/OperatorIndex.astro");
 assert.ok(card.includes('guideHref(guide,lang)'));
 assert.ok(card.includes("guide-teaser-category"));
 assert.ok(home.includes("getGuideFeed({limit:3})"));
 assert.ok(home.includes('<GuideTeaserCard guide={guide} lang={lang} />'));
 assert.ok(endfield.includes('getGuideFeed({limit:3,game:"endfield"})'));
 assert.ok(endfield.includes('<GuideTeaserCard guide={guide} lang={lang} compact />'));
 assert.ok(index.includes("getOperatorsByRelease()"));
 assert.ok(!index.includes("name.localeCompare"));
});

test("Tierlist page is navigable and localized in both directions",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 const routes=read("src/lib/i18n/site.mjs");
 const site=read("src/pages/sitemap.xml.ts");
 const home=read("src/components/pages/EndfieldHome.astro");
 assert.ok(existsSync("src/pages/endfield/tierlist/index.astro"));
 assert.ok(existsSync("src/pages/en/endfield/tierlist/index.astro"));
 assert.ok(nav.includes('key: "tierlist"'));
 assert.ok(nav.includes('tierlist:"/en/endfield/tierlist/"'));
 assert.ok(routes.includes('"/endfield/tierlist/":"/en/endfield/tierlist/"'));
 assert.ok(site.includes('"/endfield/tierlist/"'));
 assert.ok(home.includes('href("/endfield/tierlist/")'));
});

test("Si Gear displays no backend naming/ID provenance but keeps real build availability",()=>{
 const si=read("src/content/operator-guides/si.md");
 const en=JSON.parse(read("src/data/i18n/en-guide-content.json")).guides.si;
 const section=read("src/components/operator/sections/OperatorEquipment.astro");
 const ui=read("src/lib/i18n/guideUi.ts");
 const toc=read("src/components/operator/OperatorGuide.astro");
 assert.doesNotMatch(si,/\bcraftingNotes:|^  generalNotes:/m);
 assert.ok(!en.equipment.generalNotes);
 assert.ok(en.equipment.builds.every(b=>!b.craftingNotes));
 assert.doesNotMatch(section,/Neue Ausrüstung: Gegenstände und Bilder vorläufig/);
 assert.ok(section.includes('part.detail.status!=="verified"'));
 assert.ok(ui.includes('"Ausrüstung": "Gear"'));
 assert.ok(toc.includes('isEnglish?"5. Gear"'));
});

test("Guide publication template explicitly enforces future DE/EN parity",()=>{
 const guide=read("src/content/operator-guides/_template.md");
 const post=read("src/content/posts/_vorlage.md");
 const docs=read("docs/operator-guide-workflow.md");
 for(const term of ["releaseDate","listedAt","summaryDe","summaryEn","category"])
   assert.ok(guide.includes(term),"Missing listing template metadata "+term);
 for(const term of ["feed:","titleEn:","hrefDe:","hrefEn:","category: gameplay"])
   assert.ok(post.includes(term),"Missing future content template metadata "+term);
 assert.ok(docs.includes("immer Deutsch UND Englisch"));
 assert.ok(docs.includes("getGuideFeed"));
});
