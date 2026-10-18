import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const dict=JSON.parse(read("src/data/endfield/terminology.json"));

test("editor terminology is complete and each entry stays bilingual",()=>{
 assert.equal(dict.schemaVersion,1);
 for(const cls of ["Guard","Caster","Striker","Vanguard","Defender","Supporter"])
   assert.equal(typeof dict.categories.classes[cls].de,"string");
 for(const attr of ["Strength","Agility","Intellect","Will"])
   assert.ok(dict.categories.attributes[attr]);
 for(const weapon of ["Sword","Greatsword","Polearm","Handcannon","Arts Unit"])
   assert.ok(dict.categories.weaponTypes[weapon]);
 for(const trait of ["Amp","Damage Dealer","Cryo Infliction","Nature Infliction","Heat Infliction","Electro Infliction","Corrode","Crowd Control","Arts Susc.","HP Treatment","Arts Burst","Crush","PHY Susc.","Electrify","Lift","Crit","Susceptibility","Solidify","Combust","SP Recovery","Stagger","Breach","Protect","Link","Knock Down","Shield","Weakness"])
   assert.ok(dict.categories.traits[trait],trait);
 for(const group of Object.values(dict.categories))
   for(const row of Object.values(group))
     assert.ok(typeof row.en==="string"&&row.en&&typeof row.de==="string"&&row.de);
});

test("all 35 current catalog operator names have owner-editable slots; only imported skills are filled",()=>{
 assert.equal(Object.keys(dict.operatorSkills).length,35);
 const catalog=JSON.parse(read("src/data/endfield/catalog/items.json"));
 for(const slug of Object.keys(dict.operatorSkills)){
   assert.ok(dict.operatorSkills[slug].operator);
   assert.deepEqual(Object.keys(dict.operatorSkills[slug].skills).sort(),["basic","battle","combo","ultimate"].sort());
 }
 for(const slug of ["liino","si","typhoeus"]){
   const imported=JSON.parse(read("src/data/endfield/operators/"+slug+".json"));
   const localized=JSON.parse(read("src/data/endfield/locales/de/"+slug+".json"));
   for(const skill of imported.skills){
    const row=dict.operatorSkills[slug].skills[skill.slot];
    assert.equal(row.en,skill.name);
    assert.equal(row.de,localized.skills[skill.slot].name);
   }
 }
 assert.ok(catalog.items.some(x=>x.categories.includes("Operators")));
 assert.equal(dict.operatorSkills.si.skills.basic.de,"Schaffensdrang");
});

test("all official weapons gear materials and valuables and preview gear are indexed by stable ID",()=>{
 const catalog=JSON.parse(read("src/data/endfield/catalog/items.json"));
 const scoped=catalog.items.filter(item=>item.categories.some(c=>["Weapons","Gear","Item Files","Valuables Stash"].includes(c)));
 const v16=JSON.parse(read("src/data/endfield/catalog/v16-gear.json")).items;
 for(const item of [...scoped,...v16]){
  const row=dict.itemsById[item.id];
  assert.ok(row,item.id);
  assert.equal(row.en,item.name);
  assert.equal(typeof row.de,"string");
 }
 assert.equal(Object.keys(dict.itemsById).length,scoped.length+v16.length);
});

test("central translations are referenced in all relevant UI data paths without modifying editorial prose",()=>{
 const shared=read("src/lib/endfield/terminology.ts");
 assert.match(shared,/gameTerm/);
 assert.match(shared,/gameItemName/);
 assert.match(shared,/gameSkillName/);
 assert.match(shared,/gameTalentName/);
 for(const path of [
  "src/components/operator/sections/OperatorOverview.astro",
  "src/components/operator/sections/OperatorSkills.astro",
  "src/components/operator/sections/OperatorEquipment.astro",
  "src/components/operator/sections/OperatorWeapons.astro",
  "src/components/operator/sections/TeamMemberGear.astro",
  "src/components/operator/sections/OperatorKit.astro"
 ])assert.match(read(path),/trItemName|trTerm|trSkillName|trTalentName|gameItemName|ItemIcon|MaterialCosts/,path);
 assert.match(read("src/lib/endfield/operatorGuideModel.ts"),/gameSkillName/);
 assert.match(read("src/components/endfield/ItemIcon.astro"),/gameItemName/);
 assert.match(read("src/components/endfield/MaterialCosts.astro"),/gameItemName/);
 assert.match(read("src/lib/i18n/guideUi.ts"),/gameTerm\(de,lang,current\)/);
 assert.doesNotMatch(read("src/lib/i18n/operatorGuide.ts"),/gameTerm|gameSkillName|gameItemName/);
});

test("five-part global rating gradient stays fixed and elements have dedicated chips",()=>{
 const overview=read("src/components/operator/sections/OperatorOverview.astro");
 const css=read("src/styles/operator-guides.css");
 assert.match(overview,/--meter-step/);
 assert.match(css,/background-size:calc\(500% \+ 16px\)/);
 assert.match(css,/background-position:calc\(\(var\(--meter-step\) - 1\) \* 25%\)/);
 for(const element of ["electric","cryo","heat","nature"])assert.match(css,new RegExp('data-element="'+element+'"'));
 assert.match(read("src/components/pages/OperatorIndex.astro"),/op-element-chip/);
});

test("all footers use exactly one shared set of six social logos and ordered user URLs",()=>{
 const component=read("src/components/SocialLinks.astro");
 const ordered=["https://www.twitch.tv/ag0n1st","https://www.youtube.com/@Ag0n1st","https://www.tiktok.com/@ag0n1st","https://www.instagram.com/ag0n1st/","https://x.com/Ag0n1st","https://discord.gg/v2h9KKT"];
 let last=-1;
 for(const url of ordered){const index=component.indexOf(url);assert.ok(index>last,url);last=index;}
 assert.equal((component.match(/\{name:/g)||[]).length,6);
 for(const layout of ["src/components/pages/HomePage.astro","src/layouts/EndfieldPlaceholder.astro"]){
  const content=read(layout);
  assert.match(content,/<SocialLinks \/>/);
  assert.doesNotMatch(content,/linktr\.ee\/Ag0n1st/);
 }
});
