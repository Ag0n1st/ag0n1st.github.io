import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const partners=JSON.parse(read("src/data/partners.json")).partners;
const expected={
  gamersupps:"https://gamersupps.gg/agon",
  razer:"https://razer.a9yw.net/ag0n1st",
  "instant-gaming":"https://www.instant-gaming.com/?igr=ag0n1st",
  lootbar:"https://www.lootbar.com/a/k9cA3m"
};
test("One bilingual source preserves four user-supplied live affiliate links",()=>{
  assert.equal(partners.length,4);
  assert.deepEqual(Object.fromEntries(partners.map(x=>[x.id,x.affiliateUrl])),expected);
  assert.equal(partners.filter(x=>x.active).length,4);
  const gs=partners.find(x=>x.id==="gamersupps");
  assert.deepEqual([gs.discount.code,gs.discount.percent],["AGON",10]);
  for(const p of partners){
    for(const field of ["name","titleDe","titleEn","descriptionDe","descriptionEn","logoFull","logoIcon","accent"])
      assert.ok(p[field],p.id+" missing "+field);
    assert.match(p.accent,/^#[a-fA-F0-9]{6}$/);
    assert.ok(!p.affiliateUrl.includes("#"));
    if(p.id!=="gamersupps")assert.equal(p.discount,undefined,"No invented discount");
  }
  assert.equal(partners.find(x=>x.id==="lootbar").accent,"#ffcb2e");
});
test("Nine source logos stored as real optimized WebP files including Lootbar brand colour",()=>{
  const imgs=new Set();
  for(const p of partners){imgs.add(p.logoFull);imgs.add(p.logoIcon);if(p.logoColorReference)imgs.add(p.logoColorReference)}
  assert.equal(imgs.size,9);
  let bytes=0;
  for(const img of imgs){
    assert.match(img,/^\/images\/partners\/[a-z0-9_\-]+\.webp$/);
    const path="public"+img;
    const binary=readFileSync(path);
    assert.equal(binary.toString("ascii",0,4),"RIFF",img);
    assert.equal(binary.toString("ascii",8,12),"WEBP",img);
    assert.ok(binary.length>300 && binary.length<350000,"Large/invalid image "+img);
    bytes+=binary.length;
  }
  assert.ok(bytes<150000,"No large assets or PNG duplicates");
});
test("Site footer is globally shared with centred logo, year 2026 and six social icons",()=>{
 const footer=read("src/components/SiteFooter.astro");
 const css=read("src/styles/footer.css");
 const links=read("src/components/partners/PartnerFooter.astro");
 assert.match(footer,/<SocialLinks \/>/);
 assert.match(footer,/<PartnerFooter lang=\{lang\}\/>/);
 assert.match(footer,/© 2026 Ag0n1st/);
 assert.match(footer,/footer-brand-center/);
 assert.match(css,/grid-template-columns:minmax\(0,1fr\) 32px minmax\(0,1fr\)/);
 assert.match(css,/\.footer-brand-center \.copyright\{position:absolute/);
 assert.match(css,/@media\(max-width:720px\)/);
 const paths=[
   "src/components/pages/HomePage.astro","src/components/pages/EndfieldHome.astro",
   "src/layouts/EndfieldPlaceholder.astro","src/pages/about.astro",
   "src/pages/nte.astro","src/pages/en/about/index.astro",
   "src/pages/en/nte/index.astro","src/pages/posts/[slug].astro"
 ];
 for(const path of paths){
   const s=read(path);
   assert.match(s,/<SiteFooter lang=/,path);
   assert.doesNotMatch(s,/<footer class="site-footer">/,path+" still has old footer");
 }
 assert.match(links,/class="partner-footer-icon"/);
 assert.doesNotMatch(links,/partner-footer-disclosure|partner-footer-topline/);
 assert.match(links,/Werbung · Affiliate-Links/);
 assert.match(links,/Advertisement · Affiliate links/);
});
test("All affiliate links remain visibly marked, star disclosures and Lootbar ToS are bilingual",()=>{
 const cards=read("src/components/partners/PartnerShowcase.astro");
 const links=read("src/components/partners/PartnerFooter.astro");
 for(const source of [cards,links]){
   assert.match(source,/partner\.affiliateUrl/);
   assert.match(source,/rel="sponsored noopener noreferrer"/);
   assert.match(source,/target="_blank"/);
   assert.match(source,/Werbung/);
   assert.match(source,/Advertisement/);
   assert.doesNotMatch(source,/script src=|onclick=|data-track/);
 }
 assert.match(cards,/Zum Partner\*/);
 assert.match(cards,/Visit partner\*/);
 assert.match(cards,/\*Affiliate-Links:/);
 assert.match(cards,/\*Affiliate links:/);
 assert.match(cards,/data-partner-disclaimer/);
 assert.match(cards,/<u>/);
 const loot=partners.find(p=>p.id==="lootbar");
 assert.equal(loot.descriptionDe,"Guthaben und Top-Ups für verschiedene Spiele.");
 assert.equal(loot.descriptionEn,"Game credit and top-ups for various games.");
 assert.equal(loot.noteDe,undefined);
 assert.match(loot.disclaimer.deBefore,/Disclaimer: Vor dem Kauf/);
 assert.match(loot.disclaimer.deUnderline,/nicht pauschal verboten/);
 assert.equal(loot.disclaimer.deAfter,".");
 assert.doesNotMatch(JSON.stringify(loot.disclaimer),/Einzelne Spiele untersagen/);
 assert.match(loot.disclaimer.enUnderline,/not universally prohibited/);
 assert.equal(loot.disclaimer.enAfter,".");
 assert.doesNotMatch(JSON.stringify(loot.disclaimer),/Some games explicitly prohibit/);
 assert.equal(partners.find(p=>p.id==="gamersupps").discount.code,"AGON");
});

test("GamerSupps discount row matches card title font size in desktop and mobile",()=>{
 const css=read("src/styles/partners.css");
 assert.match(css,/\.partner-card-body h3\{font-size:15px/);
 assert.match(css,/\.partner-card\[data-partner-id="gamersupps"\] \.partner-promo\{font-size:15px\}/);
 const loot=partners.find(x=>x.id==="lootbar");
 assert.equal(loot.disclaimer.deAfter,".");
 assert.equal(loot.disclaimer.enAfter,".");
});
