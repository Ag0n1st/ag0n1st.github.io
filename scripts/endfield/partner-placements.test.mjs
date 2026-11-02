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
test("All existing page families include the same Footer component; only homepage has cards",()=>{
  const home=read("src/components/pages/HomePage.astro");
  const endfield=read("src/layouts/EndfieldPlaceholder.astro");
  assert.match(home,/<PartnerShowcase lang=\{lang\} \/>/);
  assert.match(home,/<PartnerFooter lang=\{lang\} \/>/);
  assert.match(endfield,/<PartnerFooter lang=\{lang\} \/>/);
  for(const [path,lang] of [
    ["src/pages/about.astro","de"],["src/pages/nte.astro","de"],
    ["src/pages/en/about/index.astro","en"],["src/pages/en/nte/index.astro","en"]]){
    assert.match(read(path),new RegExp('<PartnerFooter lang="'+lang+'"\\s*/>'));
  }
});
test("Cards and footer mark every affiliate link as sponsored with direct disclosure",()=>{
  const a=read("src/components/partners/PartnerShowcase.astro");
  const b=read("src/components/partners/PartnerFooter.astro");
  assert.match(a,/partner\.affiliateUrl/);
  assert.match(b,/partner\.affiliateUrl/);
  for(const html of [a,b]){
    assert.match(html,/rel="sponsored noopener noreferrer"/);
    assert.match(html,/target="_blank"/);
    assert.match(html,/Werbung/);
    assert.match(html,/Advertisement/);
    assert.match(html,/Affiliate-Links/);
    assert.match(html,/Affiliate links/);
    assert.doesNotMatch(html,/script src=|onclick=|data-track/);
  }
  assert.match(a,/partner\.discount/);
  assert.match(a,/partner\.noteDe/);
});
