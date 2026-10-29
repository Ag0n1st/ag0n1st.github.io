import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {elasticGoods,elasticPeakRanges,elasticGoodsSource} from "../../src/data/endfield/elasticGoodsPeaks.mjs";
const read=path=>readFileSync(path,"utf8");

test("Elastic Goods tiers represent both user-supplied charts without fabricating official item IDs",()=>{
 assert.equal(elasticGoodsSource.verifiedOfficialItemIds,false);
 assert.equal(elasticGoods.length,25);
 assert.equal(new Set(elasticGoods.map(good=>good.id)).size,25);
 assert.deepEqual(elasticPeakRanges.map(peak=>peak.id),["low","mid","high"]);
 assert.deepEqual(["low","mid","high"].map(peak=>elasticGoods.filter(g=>g.peak===peak).length),[8,9,8]);
 assert.deepEqual(["low","mid","high"].map(peak=>elasticGoods.filter(g=>g.peak===peak&&g.evidence==="community").length),[4,5,4]);
 assert.equal(elasticGoods.filter(g=>g.evidence==="community").length,13);
 assert.equal(elasticGoods.filter(g=>g.evidence==="reference").length,12);
 for(const good of elasticGoods){
  assert.match(good.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(good.de.length>2&&good.en.length>2);
  assert.ok(["low","mid","high"].includes(good.peak));
  assert.ok(["valley","wuling"].includes(good.region));
  assert.ok(["reference","community"].includes(good.evidence));
  assert.equal("officialId" in good,false);
  assert.equal("icon" in good,false);
 }
 for(const good of elasticGoods.filter(g=>g.evidence==="community"))
  assert.equal(good.region,"wuling");
 assert.deepEqual(elasticGoods.filter(g=>g.region==="valley").length,12);
 assert.equal(elasticGoods.filter(g=>g.region==="wuling").length,13);
});

test("New community-sourced price tiers preserve peak colouring from the screenshot rather than arbitrary price cutoffs",()=>{
 const get=id=>elasticGoods.find(good=>good.id===id);
 for(const id of ["wuxia-movies","eureka-tincture","wuling-peas","nymphsprout"])
  assert.equal(get(id)?.peak,"low",id);
 for(const id of ["xiranite-filter-cores","aero-receiver","qingbo-rafts","xiranite-fireworks","chubby-lung-tianshi"])
  assert.equal(get(id)?.peak,"mid",id);
 for(const id of ["xiranite-bridge","swordmancer-forge","borderstone-stopper","chubby-lung-balloon"])
  assert.equal(get(id)?.peak,"high",id);
 for(const peak of elasticPeakRanges){
  assert.ok(peak.valueDe.startsWith("ca."),peak.id);
  assert.ok(peak.valueEn.startsWith("approx."),peak.id);
  assert.ok(peak.descriptionDe&&peak.descriptionEn);
 }
});

test("Elastic Goods has a bilingual, responsive standalone cheat-sheet card and no ghost official icons",()=>{
 const page=read("src/components/pages/EndfieldCheatSheets.astro");
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 const css=read("src/styles/endfield-elastic-goods.css");
 assert.match(page,/import ElasticGoodsPeaks from "\.\/ElasticGoodsPeaks\.astro"/);
 assert.match(page,/<ElasticGoodsPeaks lang=\{lang\} \/>/);
 assert.match(feature,/id="elasticgoods" class="op-cardlet eg-feature"/);
 assert.match(feature,/data-elastic-goods/);
 assert.match(feature,/const goodsFor=/);
 assert.match(feature,/\{elasticPeakRanges\.map/);
 assert.match(feature,/origins\.map/);
 assert.match(feature,/data-elastic-good=\{good\.id\}/);
 assert.match(feature,/&lt; \{l\("1\.000","1,000"\)\}/);
 assert.match(feature,/Low Peak/);
 assert.match(feature,/High Peak/);
 assert.match(feature,/Tal-IV/);
 assert.match(feature,/Valley-IV/);
 assert.match(feature,/Wuling/);
 assert.match(feature,/SKPORT-Itemkatalog/);
 assert.doesNotMatch(feature,/<ItemIcon|<img\s|iconPath/);
 assert.match(css,/\.eg-origin-columns\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(css,/@media\(max-width:680px\)\{\.eg-feature/);
 assert.match(css,/\.eg-valley\{--eg-accent:#e0ed48/);
 assert.match(css,/\.eg-wuling\{--eg-accent:#4cdbd5/);
 assert.match(page,/id:"bufffood"/);
});
