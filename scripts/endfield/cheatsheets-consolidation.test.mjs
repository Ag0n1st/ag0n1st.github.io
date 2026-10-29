import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

test("Endfield nav has ten entries, excludes three former game-system links and keeps Cheat Sheets in both languages",()=>{
 const nav=read("src/components/EndfieldNav.astro");
 assert.equal((nav.match(/\{ label: "/g)||[]).length,10);
 for(const term of ["key: \"recruitment\"","key: \"refinement\"","key: \"essences\"",
                    'href: "/endfield/rekrutierung/"','href: "/endfield/veredelung/"','href: "/endfield/essenzen/"',
                    'recruitment:"/en/endfield/recruitment/"','refinement:"/en/endfield/refinement/"'])
    assert.ok(!nav.includes(term),"removed stand-alone navigation: "+term);
 assert.match(nav,/key: "cheatsheets"/);
 assert.match(nav,/cheatsheets:"\/en\/endfield\/cheatsheets\/"/);
 assert.match(nav,/new Set\(\["factory","checklist"\]\)/);
});
test("Cheat Sheets has three migrated systems and retains three existing references in DE and EN",()=>{
 const page=read("src/components/pages/EndfieldCheatSheets.astro");
 for(const anchor of ["recruitment","essences","bufffood"])
   assert.ok(page.includes('id:"'+anchor+'"'),"missing placeholder anchor "+anchor);
 assert.match(page,/<ElasticGoodsPeaks lang=\{lang\}/);
 assert.match(read("src/components/pages/ElasticGoodsPeaks.astro"),/id="elasticgoods"/);
 assert.match(page,/data-cheatsheets-group="systems"/);
 assert.match(page,/data-cheatsheets-group="references"/);
 assert.match(page,/Spielsysteme","Game systems"/);
 assert.match(page,/Referenzen & Matrizen","References & matrices"/);
 assert.match(page,/<RefinementMatrix lang=\{lang\}/);
 const ref=read("src/components/pages/RefinementMatrix.astro");
 assert.match(ref,/id="refinement"/);
 assert.match(ref,/id="artificing"/);
 assert.match(ref,/Veredelungs-Matrix/);
 assert.match(ref,/Artificing Matrix/);
 assert.match(page,/Die Veredelungs-Matrix und Elastische Waren – Preis Peaks sind verfügbar/);
 assert.match(page,/The refinement matrix and Elastic Goods – Price Peaks are available/);
 assert.match(page,/In Vorbereitung","Coming soon"/);
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
