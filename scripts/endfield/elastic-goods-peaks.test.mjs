import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {elasticGoods,elasticPeakRanges,elasticGoodsSource} from "../../src/data/endfield/elasticGoodsPeaks.mjs";
const read=path=>readFileSync(path,"utf8");
const catalog=JSON.parse(read("src/data/endfield/catalog/packages.json"));

test("wiki.gg Packages catalogue extends Item Files separately from official SKPORT entries",()=>{
 assert.equal(catalog.schemaVersion,1);
 assert.equal(catalog.category,"Packages");
 assert.equal(catalog.parentCategory,"Item Files");
 assert.match(catalog.source.url,/^https:\/\/endfield\.wiki\.gg\/wiki\/Category:Packages$/);
 assert.equal(elasticGoodsSource.verifiedOfficialItemIds,false);
 assert.equal(catalog.items.length,25);
 assert.equal(elasticGoods.length,25);
 assert.equal(new Set(elasticGoods.map(x=>x.id)).size,25);
 assert.equal(elasticGoods.filter(x=>x.region==="valley").length,12);
 assert.equal(elasticGoods.filter(x=>x.region==="wuling").length,13);
 assert.deepEqual(["low","mid","high"].map(peak=>elasticGoods.filter(x=>x.peak===peak).length),[8,9,8]);
 const official=JSON.parse(read("src/data/endfield/catalog/items.json"));
 assert.equal(official.source.provider,"SKPORT Wiki");
 assert.ok(official.items.every(x=>x.categories.indexOf("Packages")===-1));
 const itemResolver=read("src/lib/endfield/itemCatalog.ts");
 assert.match(itemResolver,/import packageCatalog from "\.\.\/\.\.\/data\/endfield\/catalog\/packages\.json"/);
 assert.match(itemResolver,/export function getEndfieldPackage/);
 assert.match(itemResolver,/export const endfieldPackageCatalogMeta=/);
});

test("every approved package has the exact DE/EN in-game name, the expected peak and origin",()=>{
 const expected=[
 ["kitchenware","Ankhor-Küchenzubehör","Ankhorilling Kitchenware","low","valley"],
 ["dangles","Meusbiest-Schnitzerei-Anhänger","Musbeast Scrimshaw Dangles","low","valley"],
 ["drill","Zauber-Abbaubohrer","Witchcraft Mining Drill","low","valley"],
 ["war-tins","Dosen aus dem Aggeloi-Krieg","Aggeloi War Tins","low","valley"],
 ["wuxia-movies","Wuxia-Filme","Wuxia Movies","low","wuling"],
 ["eureka-tincture","Eureka-Anti-Rauch-Tinktur","Eureka Anti-smog Tincture","low","wuling"],
 ["wuling-peas","Wuling-Tiefkühlerbsen","Wuling Frozen Pears","low","wuling"],
 ["nymphsprout","Nymphenspross","Nymphsprout","low","wuling"],
 ["fillets","Hydrokultur-Filet aus dem Tal","Valley Hydroculture Fillets","mid","valley"],
 ["syrup","Einheitssirup","Unity Syrup","mid","valley"],
 ["knucklebones","Ses'qarier-Knöchel","Ses'qamam Knucklebones","mid","valley"],
 ["crystals","Astarron-Kristalle","Astarron Crystals","mid","valley"],
 ["chubby-lung-tianshi","Chubby-Lung-Tianshi","Chubby Lung Tianshi","mid","wuling"],
 ["xiranite-filter-cores","Xiranit-Filterkerne","Xiranite Filter Cores","mid","wuling"],
 ["qingbo-rafts","Qingbo-Flöße","Qingbo Rafts","mid","wuling"],
 ["aero-receiver","Aero-Empfänger","Aerial Receptionists","mid","wuling"],
 ["xiranite-fireworks","Xiranit-farbene Feuerwerkskörper","Xiran-Hue Fireworks","mid","wuling"],
 ["saplings","Originum-Setzlinge","Originum Saplings","high","valley"],
 ["pickaxes","Bürgerwehr-Spitzhacken","Vigilant Pickaxes","high","valley"],
 ["helmets","Dickschädel-Helme","Hard Noggin Helmets","high","valley"],
 ["toy-blocks","Ausrangierte Bauklötze","Scrap Toy Blocks","high","valley"],
 ["xiranite-bridge","Xiranit-Brücke","Xiranite Bridge","high","wuling"],
 ["swordmancer-forge","Schwertkämpferschmiede","Swordmancer Forge","high","wuling"],
 ["borderstone-stopper","Grenzstein-Stopper","Marker Stone Lock","high","wuling"],
 ["chubby-lung-balloon","Chubby-Lung-Wetterbalon","Chubby Lung Blimp","high","wuling"]
 ];
 assert.deepEqual(catalog.items.map(x=>[x.id,x.nameDe,x.nameEn,x.peak,x.region]),expected);
 assert.deepEqual(elasticGoods.map(x=>[x.id,x.de,x.en,x.peak,x.region]),expected);
 assert.deepEqual(elasticPeakRanges.map(x=>[x.valueDe,x.valueEn]),[
 ["4.600–4.800","4,600–4,800"],
 ["4.800–5.100","4,800–5,100"],
 ["5.100–5.500","5,100–5,500"]
 ]);
 assert.ok(elasticPeakRanges.every(x=>!x.valueDe.includes("+")&&!x.valueEn.includes("+")));
});

test("all 25 item mini-cards receive a verified 128px local WebP from wiki.gg",()=>{
 for(const x of catalog.items){
  assert.match(x.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(x.iconPath,`/images/endfield/packages/${x.id}.webp`);
  assert.equal(x.cacheStatus,"cached");
  assert.match(x.wikiTitle,/\(pkg\)$/);
  assert.match(x.imageSourceUrl,/^https:\/\/endfield\.wiki\.gg\/images\//);
  const file="public"+x.iconPath;
  assert.ok(existsSync(file),file);
  const bytes=readFileSync(file);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.equal(x.iconBytes,bytes.byteLength);
  assert.ok(bytes.byteLength>=1000&&bytes.byteLength<=120000,file);
 }
 assert.ok(catalog.items.reduce((n,x)=>n+x.iconBytes,0)<250000);
});

test("the bilingual Cheat Sheet uses image mini cards, removes repeated legend/source and enlarges orange Low Peak",()=>{
 const page=read("src/components/pages/EndfieldCheatSheets.astro");
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 const css=read("src/styles/endfield-elastic-goods.css");
 assert.match(page,/<ElasticGoodsPeaks lang=\{lang\} \/>/);
 assert.match(page,/Elastische Waren – Preis Peaks und die Veredelungs-Matrix sind verfügbar/);
 assert.match(feature,/Elastische Waren - Preis Peaks/);
 assert.match(feature,/Elastic Goods – Price Peaks/);
 assert.match(feature,/labelDe:"Tal IV"/);
 assert.match(feature,/labelEn:"Valley IV"/);
 assert.match(feature,/data-elastic-good=\{good\.id\}/);
 assert.match(feature,/<img class="eg-item-icon" src=\{good\.iconPath\}/);
 assert.match(feature,/&lt; \{l\("1\.000","1,000"\)\}/);
 assert.doesNotMatch(feature,/class="eg-legend"|class="eg-source"/);
 assert.match(css,/\.eg-peak-low\{--eg-peak-accent:#efa251\}/);
 assert.match(css,/\.eg-range\{[^\n]*font-size:clamp\(22px,3\.1vw,36px\)/);
 assert.match(css,/\.eg-trade-step strong\{font-size:clamp\(22px,3\.1vw,36px\)/);
 assert.match(css,/\.eg-item-icon\{display:block/);
 assert.match(feature,/role="tablist"/);
 assert.match(feature,/role="tab"/);
 assert.match(feature,/role="tabpanel"/);
 assert.match(feature,/data-eg-region-tabs/);
 assert.match(feature,/data-eg-region-panel/);
 assert.match(feature,/hidden=\{origin.id!==defaultOrigin\}/);
 assert.match(feature,/data-eg-region-tab=\{origin.id\}/);
 assert.match(feature,/aria-selected=\{index===0\?"true":"false"\}/);
 assert.match(feature,/group.hidden=group.dataset.origin!==region/);
 assert.match(feature,/event.key==="ArrowRight"/);
 assert.match(feature,/event.key==="Home"/);
 assert.match(feature,/<details class="eg-tips">/);
 assert.doesNotMatch(feature,/eg-origin-group h6|eg-section-intro/);
 assert.match(css,/\.eg-origin-group\[hidden\]\{display:none!important\}/);
 assert.match(css,/\.eg-item-grid\{display:grid;grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
 assert.match(css,/@media\(max-width:680px\).*?\.eg-item-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(css,/@media\(max-width:680px\)/);
 assert.match(css,/\.eg-valley\{--eg-accent:#e0ed48/);
 assert.match(css,/\.eg-wuling\{--eg-accent:#4cdbd5/);
});

test("Regional currency icons are source-derived local transparent WebPs with accessible DE/EN labelling",()=>{
 const official=JSON.parse(read("src/data/endfield/catalog/items.json"));
 const assets=[
  {region:"wuling",id:"602",name:"Wuling Stock Bill",size:982},
  {region:"valley",id:"601",name:"Valley Stock Bill",size:844}
 ];
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 const styles=read("src/styles/endfield-elastic-goods.css");
 for(const x of assets){
  assert.equal(official.items.find(item=>item.id===x.id)?.name,x.name,"Source asset exists in official SKPORT catalogue");
  const path="public/images/endfield/currency/"+x.region+".webp";
  const bytes=readFileSync(path);
  assert.ok(existsSync(path),"Missing currency icon "+x.region);
  assert.equal(bytes.toString("ascii",0,4),"RIFF");
  assert.equal(bytes.toString("ascii",8,12),"WEBP");
  assert.equal(bytes.length,x.size);
  assert.match(feature,new RegExp('currencyIcon:"/images/endfield/currency/'+x.region+'\\.webp"'));
 }
 assert.match(feature,/data-eg-currency=\{origin\.id\}/);
 assert.match(feature,/alt=\{en\?origin\.currencyAltEn:origin\.currencyAltDe\}/);
 assert.match(feature,/currencyIcons\.forEach\(icon=>\{icon\.hidden=icon\.dataset\.egCurrency!==region;\}\)/);
 assert.match(feature,/class="eg-price" data-eg-price/);
 assert.match(feature,/hidden=\{origin\.id!==defaultOrigin\}/);
 assert.match(styles,/\.eg-currency-icon\[hidden\]\{display:none!important\}/);
 assert.match(styles,/\.eg-price\{display:inline-flex;align-items:center;justify-self:end;gap:6px/);
 assert.match(styles,/@media\(max-width:800px\).*?\.eg-price\{grid-column:2;justify-self:start\}/);
 assert.equal((feature.match(/<strong class="eg-range">/g)||[]).length,1);
 // No currencies inserted in TL;DR, per owner approval.
 assert.ok(feature.indexOf('data-eg-currency={origin.id}')>feature.indexOf('<div class="eg-peak-heading">'));
 assert.ok(feature.indexOf('data-eg-currency={origin.id}')>feature.indexOf('</div>\n\n  <div class="eg-region-tabs"'));
});
