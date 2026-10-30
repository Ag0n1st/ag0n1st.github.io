import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(path,"utf8");
const icon=read("src/components/endfield/ItemIcon.astro");
const tooltip=read("src/components/endfield/ItemDetailPopup.astro");
const client=read("src/lib/endfield/itemTooltipClient.ts");
const css=read("src/styles/operator-guides.css");

test("every official Gear and Weapon ItemIcon shares one bilingual item-detail preview",()=>{
  assert.match(icon,/category==="Gear"\|\|category==="Weapons"/);
  assert.match(icon,/data-endfield-item-hover/);
  assert.match(icon,/data-item-popup-template/);
  assert.match(icon,/ItemDetailPopup id=\{String\(id\)\} lang=\{lang\}/);
  assert.match(icon,/import "\.\.\/\.\.\/lib\/endfield\/itemTooltipClient"/);
  for(const p of [
    "src/components/operator/sections/OperatorOverview.astro",
    "src/components/operator/sections/OperatorWeapons.astro",
    "src/components/operator/sections/OperatorEquipment.astro",
    "src/components/operator/sections/TeamMemberGear.astro",
  ])assert.match(read(p),/<ItemIcon id=/,"Shared ItemIcon missing from "+p);
});

test("only verified official SKPORT stats, full refining tables and base recipes are displayed",()=>{
  assert.match(tooltip,/getOfficialGear\(id\)/);
  assert.match(tooltip,/getOfficialWeapon\(id\)/);
  assert.match(tooltip,/isVerified/);
  assert.match(tooltip,/gear\?\.stats\.flatMap/);
  assert.match(tooltip,/gear\?\.artificing\.flatMap/);
  assert.match(tooltip,/gear\.setEffect/);
  assert.match(tooltip,/gear\.standardRecipe\?\.materials/);
  assert.match(tooltip,/gear\.recipeStatus==="verified"/);
  assert.match(tooltip,/MaterialCosts items=\{gear\.standardRecipe\.materials\} lang=\{lang\}/);
  assert.match(tooltip,/weapon\?\.attributes\.flatMap/);
  assert.match(tooltip,/weapon\?\.details\.flatMap/);
  assert.match(tooltip,/weapon\?\.tuning\.flatMap/);
  assert.match(tooltip,/Waffenrang x1 \/ x2 \/ x3 und Effekte/);
  assert.match(tooltip,/Weapon ranks x1 \/ x2 \/ x3 and effects/);
  assert.match(tooltip,/Nicht bestätigte Werte werden nicht angezeigt/);
});

test("popover is a single browser top-layer preview that works in the large matrix dialog",()=>{
  assert.match(client,/popover","manual"/);
  assert.match(client,/popup\.showPopover\(\)/);
  assert.match(client,/template\.content\.cloneNode\(true\)/);
  assert.match(client,/trigger\.closest<HTMLDialogElement>\("dialog\[open\]"\)\?\?document\.body/);
  assert.match(client,/pointerover/);
  assert.match(client,/focusin/);
  assert.match(client,/Escape/);
  assert.match(client,/dismissedByEscape=active/);
  assert.match(client,/if\(dismissedByEscape===trigger\)return/);
  assert.match(client,/window\.addEventListener\("resize",closePopup/);
  assert.match(css,/\.op-equipment-matrix \.op-matrix-gear-cell\{text-align:center\}/);
  assert.match(css,/\.op-equipment-matrix \.op-matrix-gear-cell \.op-item-hover-trigger\{margin-inline:auto\}/);
  assert.match(css,/\.op-item-hover-panel\{[^}]*position:fixed/);
  assert.match(css,/max-height:min\(76dvh,740px\)/);
  const matrix=read("src/components/operator/sections/OperatorEquipment.astro");
  assert.match(matrix,/data-matrix-dialog-content/);
  assert.match(read("src/components/operator/OperatorGuide.astro"),/destination\.replaceChildren/);
});

test("NEW badge remains on newest release until replaced, no timed expiry",()=>{
 const index=read("src/components/pages/OperatorIndex.astro");
 assert.match(index,/isNew: index===0/);
 assert.match(index,/operator\.isNew && <span class="op-card-new"/);
 assert.doesNotMatch(index,/Date\.now\(\)|\bexpiresAt\b|\bnewBadgeDays\b/);
});

test("18 official v1.6 Gear records power all pre-release item hover menus while preserving guide art",()=>{
 const manifest=JSON.parse(read("src/data/endfield/catalog/v16-official-gear-aliases.json"));
 const preview=JSON.parse(read("src/data/endfield/catalog/v16-gear.json"));
 const report=JSON.parse(read("src/data/endfield/catalog/v16-skport-import.json"));
 const detail=JSON.parse(read("src/data/endfield/catalog/equipment-details.json"));
 const official=JSON.parse(read("src/data/endfield/catalog/items.json"));
 const old=new Map(preview.items.map(x=>[x.id,x]));
 const summary=new Map(report.entries.map(x=>[x.id,x]));
 const gear=new Map(detail.gear.map(x=>[x.id,x]));
 const item=new Map(official.items.map(x=>[x.id,x]));
 const aliases=Object.entries(manifest.aliases);
 assert.equal(manifest.schemaVersion,1);
 assert.match(manifest.source,/SKPORT Wiki/);
 assert.equal(aliases.length,18);
 assert.equal(new Set(aliases.map(([,id])=>id)).size,18);
 for(const [slug,id] of aliases){
  const legacy=old.get(slug),record=summary.get(id),entry=gear.get(id),catalog=item.get(id);
  assert.ok(legacy&&record&&entry&&catalog,slug);
  assert.equal(legacy.name.replace(" (v1.6)",""),record.name,slug);
  assert.equal(legacy.slot,record.slot);
  assert.equal(entry.gearSlot,record.slot);
  assert.equal(entry.name,record.name);
  assert.equal(entry.source.itemId,id);
  assert.equal(entry.status,"verified");
  assert.equal(entry.artificingStatus,"available");
  assert.ok(entry.stats.some(tab=>tab.tables.length>0));
  assert.ok(entry.artificing.some(tab=>tab.tables.length>0));
  assert.equal(entry.recipeStatus,"verified");
  assert.equal(entry.standardRecipe.materials.length,2);
  assert.equal(catalog.iconPath,"/images/endfield/gear/"+id+".webp");
  assert.equal(legacy.officialNumericId,null,"original preview identity remains untouched");
  assert.equal(legacy.identityStatus,"official-numeric-id-unverified");
 }
 assert.equal(manifest.aliases["type-50-yinglung-gloves-v16"],"1381");
 assert.equal(item.get("411").name,item.get("1381").name);
 assert.equal(Object.hasOwn(manifest.aliases,"type-50-yinglung-gauntlets"),false);
 const lookup=read("src/lib/endfield/equipmentDetails.ts");
 assert.match(lookup,/gearIndex\.get\(id\)/,"Build-Finder must keep its original data semantics");
 assert.doesNotMatch(lookup,/v16OfficialAliases/,"No guide-rating or build-filter side effects");
 const popup=read("src/components/endfield/ItemDetailPopup.astro");
 assert.match(popup,/verifiedReleaseAliases\.aliases\[id as keyof typeof verifiedReleaseAliases\.aliases\]/);
 assert.match(popup,/getOfficialGear\(id\)/);
 assert.match(popup,/getOfficialGear\(legacyMatch\)/);
 assert.match(popup,/verifiedLegacyGear\.name===\(catalog\?\.name\?\?""\)\.replace/);
 assert.match(popup,/gear\.standardRecipe\?\.materials/);
});
