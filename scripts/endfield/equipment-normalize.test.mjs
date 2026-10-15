import test from "node:test";
import assert from "node:assert/strict";
import {normalizeEquipment,standardRecipe,extractRenderedGearSource} from "./equipment-normalize.mjs";
const docWith=(widgets,documents)=>({
  chapterGroup:[{widgets:Object.keys(widgets).map((key,i)=>({id:"widget"+i,title:"//"+key}))}],
  widgetCommonMap:Object.fromEntries(Object.keys(widgets).map((key,i)=>["widget"+i,
    {tabDataMap:{default:{content:widgets[key]}}}])),
  documentMap:documents
});
const table=(headers,rows)=>({blockIds:["t"],blockMap:{t:{table:{rowIds:["h",...rows.map((_,i)=>"r"+i)],
  columnIds:headers.map((_,i)=>"c"+i),
  cellMap:Object.fromEntries([headers,...rows].flatMap((row,r)=>row.map((cell,c)=>[
    (r===0?"h":"r"+(r-1))+"_c"+c,{text:{inlineElements:[{kind:"text",text:{text:String(cell)}}]}}])) )
}}}});
const catalog=[{id:"602",name:"Wuling Stock Bill"},{id:"528",name:"Xiranite Component"}];
test("official standard materials are mapped by exact catalog item names",()=>{
  const panel=extractRenderedGearSource("//Source\nGear Assembly\nEach gear piece costs\nWuling Stock Bill\n*3000\nand\nXiranite Component\n*20\n//Stats");
  assert.deepEqual(standardRecipe(panel,catalog).materials,[{id:"602",count:3000},{id:"528",count:20}]);
  assert.equal(standardRecipe(panel,[]),null);
});
test("a new weapon lacking widgets stays incomplete, never invented",()=>{
  const expected={id:"1283",name:"Lunar Calling",category:"Weapons",iconPath:"/images/endfield/items/1283.webp"};
  const actual=normalizeEquipment({itemId:"1283",name:"Lunar Calling",lang:"en",document:docWith({},{} )},expected,"2026-10-15");
  assert.equal(actual.status,"incomplete");
  assert.equal(actual.attributes.length,0);
  assert.equal(actual.iconPath,expected.iconPath);
});
test("gear stats and level use only the official table",()=>{
  const doc=docWith({Stats:"a",Artificing:"b"},{a:table(["Level","60"],[["Defense","+48"],["Main Attribute","+74"]]),
    b:table(["Stats","Default","Level 1"],[["Main Attribute","+74","+81"]])});
  const expected={id:"1246",name:"AIC Fieldwork Medic Armor",category:"Gear",iconPath:"/images/endfield/items/1246.webp"};
  const source="Each gear piece costs\nWuling Stock Bill\n*3000\nand\nXiranite Component\n*20";
  const gear=normalizeEquipment({itemId:"1246",name:expected.name,document:doc},expected,"2026-10-15",{sourcePanel:source,catalog});
  assert.equal(gear.status,"verified");
  assert.equal(gear.level,60);
  assert.equal(gear.standardRecipe.materials[0].count,3000);
});
test("official Stats remain valid when low-tier gear has no Artificing widget",()=>{
  const d=docWith({Stats:"a"},{a:table(["Level","10"],[["Defense","+4"]])});
  const gear=normalizeEquipment({itemId:"206",name:"Basic Armor",document:d},
    {id:"206",name:"Basic Armor",category:"Gear",iconPath:"/images/endfield/items/206.webp"},
    "2026-10-15");
  assert.equal(gear.status,"verified");
  assert.equal(gear.artificingStatus,"not-listed");
  assert.equal(gear.level,10);
});
test("unknown or mismatched official IDs are rejected",()=>{
  assert.throws(()=>normalizeEquipment({itemId:"123",name:"test",document:{}},{id:"124",name:"test",category:"Weapons"},"2026-10-15"),/ID/);
});
