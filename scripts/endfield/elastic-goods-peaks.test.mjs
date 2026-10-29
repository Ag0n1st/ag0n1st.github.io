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
 assert.equal((feature.match(/<strong class="eg-range" data-eg-range/g)||[]).length,1);
 // No currencies inserted in TL;DR, per owner approval.
 assert.ok(feature.indexOf('data-eg-currency={origin.id}')>feature.indexOf('<div class="eg-peak-heading">'));
 assert.ok(feature.indexOf('data-eg-currency={origin.id}')>feature.indexOf('</div>\n\n  <div class="eg-region-tabs"'));
});

test("Peak tiers explicitly describe each good's attainable maximum, not a universal three-step ladder",()=>{
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 const peaks=elasticPeakRanges;
 const map=new Map(peaks.map(x=>[x.id,x]));
 for(const peak of ["low","mid","high"]){
   const x=map.get(peak);
   assert.ok(x?.descriptionDe&&x?.descriptionEn);
   assert.match(x.descriptionDe,/Höchster Peak dieser Waren/);
   assert.match(x.descriptionEn,/These goods peak at/);
 }
 assert.match(map.get("low").descriptionDe,/keinen Mid- oder High-Peak/);
 assert.match(map.get("low").descriptionEn,/cannot reach a Mid or High Peak/);
 assert.match(map.get("mid").descriptionDe,/niedrigere Peaks möglich/);
 assert.match(map.get("high").descriptionDe,/Low- oder Mid-Peaks/);
 assert.match(map.get("high").descriptionEn,/Low or Mid Peaks/);
 assert.match(feature,/Low ist bereits ihr eigener höchster Peak/);
 assert.match(feature,/Low is already their own highest peak/);
 assert.match(feature,/Die Preisbereiche basieren auf Beobachtungen der Community und zeigen den höchsten Peak der jeweiligen Waren\./);
 assert.match(feature,/The price ranges are based on community observations and show the highest peak of each good\./);
 assert.doesNotMatch(feature,/nicht ihren aktuellen Preis|not its current price|niedrigere Zwischenpeaks möglich/);
 assert.match(feature,/Nicht jede Ware kann 5\.500 erreichen/);
 assert.match(feature,/Not every good can reach 5,500/);
 assert.match(feature,/individuelle Peak der Ware/);
});

test("Wuling/Valley tabs are origin-tinted when inactive and stronger when selected, with 130%-size currency icons",()=>{
 const css=read("src/styles/endfield-elastic-goods.css");
 assert.match(css,/\.eg-currency-icon\{display:block;flex:none;width:clamp\(30px,3\.51vw,42px\)/);
 assert.match(css,/\.eg-region-tab\{[^\n]*background:color-mix\(in srgb,var\(--eg-accent\) 24%,#171c26\)/);
 assert.match(css,/\.eg-region-tab:hover\{[^\n]*background:color-mix\(in srgb,var\(--eg-accent\) 32%,#171c26\)/);
 assert.match(css,/\.eg-region-tab\[aria-selected="true"\]\{[^\n]*background:color-mix\(in srgb,var\(--eg-accent\) 45%,#171c26\)/);
 assert.match(css,/\.eg-valley\{--eg-accent:#e0ed48/);
 assert.match(css,/\.eg-wuling\{--eg-accent:#4cdbd5/);
});

test("High Peak has a Wuling-only observed ceiling, with Valley IV and both other tiers unchanged",()=>{
 const prices=elasticPeakRanges;
 assert.equal(prices.length,3);
 assert.deepEqual(prices.map(x=>x.regionOverrides),[[],[],[{region:"wuling",de:"5.100–5.400",en:"5,100–5,400"}]]);
 assert.equal(prices[2].valueDe,"5.100–5.500");
 assert.equal(prices[2].valueEn,"5,100–5,500");
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 assert.match(feature,/const peakValue=/);
 assert.match(feature,/peak\.regionOverrides\.find\(entry=>entry\.region===origin\)/);
 assert.match(feature,/data-eg-range-values=\{JSON\.stringify\(Object\.fromEntries\(origins\.map\(origin=>\[origin\.id,peakValue\(peak,origin\.id\)\]\)\)\)\}/);
 assert.match(feature,/\{peakValue\(peak,defaultOrigin\)\}/);
 assert.match(feature,/priceRanges\.forEach\(range=>\{/);
 assert.match(feature,/if\(values\[region\]\)range\.textContent=values\[region\]/);
 assert.match(feature,/Die Preisbereiche basieren auf Beobachtungen der Community/);
 assert.match(feature,/The price ranges are based on community observations/);
});
test("Region tab CSS does not shadow the colours with a later neutral custom property",()=>{
 const css=read("src/styles/endfield-elastic-goods.css");
 const neutral=css.match(/\.eg-region-tab\{([^}]+)\}/)?.[1];
 assert.ok(neutral);
 assert.doesNotMatch(neutral,/--eg-accent:/);
 assert.match(css,/\.eg-region-tab\.eg-wuling\{--eg-accent:#4cdbd5\}/);
 assert.match(css,/\.eg-region-tab\.eg-valley\{--eg-accent:#e0ed48\}/);
});

test("the supplied Stock Redistribution icon is a local subtle grey decoration at the top right",()=>{
 const feature=read("src/components/pages/ElasticGoodsPeaks.astro");
 const css=read("src/styles/endfield-elastic-goods.css");
 const path="public/images/endfield/cheatsheets/stock-redistribution.webp";
 assert.ok(existsSync(path),"Missing source-derived redistribution icon");
 const bytes=readFileSync(path);
 assert.equal(bytes.toString("ascii",0,4),"RIFF");
 assert.equal(bytes.toString("ascii",8,12),"WEBP");
 assert.ok(bytes.byteLength<5000,"The decorative WebP must stay tiny");
 assert.match(feature,/class="eg-stock-redistribution-art" src="\/images\/endfield\/cheatsheets\/stock-redistribution\.webp" alt="" aria-hidden="true" width="118" height="118"/);
 assert.match(css,/\.eg-heading\{position:relative;min-height:87px;padding-right:110px\}/);
 assert.match(css,/\.eg-stock-redistribution-art\{position:absolute;right:0;top:-13px;display:block;width:100px;height:100px;object-fit:contain;opacity:\.22;filter:grayscale\(1\) brightness\(\.8\)/);
 assert.match(css,/@media\(max-width:760px\)\{\.eg-heading\{min-height:70px;padding-right:72px\}\.eg-stock-redistribution-art\{width:63px;height:63px;top:0\}\}/);
});
