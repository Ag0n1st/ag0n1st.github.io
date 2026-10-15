import test from "node:test";
import assert from "node:assert/strict";
import { parseStandardGearRecipe, getPublicGearSourcePanel } from "./gear-recipe.mjs";

const source60 = [
  "//Source","","Gear Assembly","","Each gear piece costs",
  "Wuling Stock Bill","*3000","and","Xiranite Component","*20",
  "*Gear assembled with older techniques can be switched to newer ones to receive a discount in stock bills and components required.",
  "Gear Template Acquisition Method:","Version Update",
  "//Stats","Level","60"
].join("\n");
const source70=source60.replace("*3000","*8000").replace("*20","*50");

test("reads SKPORT Level 60 standard recipe without importing adjacent stats",()=>{
  const actual=parseStandardGearRecipe(getPublicGearSourcePanel(source60),{
    gearId:"1246",gearName:"AIC Fieldwork Medic Armor",snapshot:"2026-10-15",
    itemsByName:{"Wuling Stock Bill":"1154","Xiranite Component":"1155"}
  });
  assert.equal(actual.gear.id,"1246");
  assert.deepEqual(actual.recipes[0].materials,[
    {itemId:"1154",name:"Wuling Stock Bill",count:3000},
    {itemId:"1155",name:"Xiranite Component",count:20}
  ]);
  assert.equal(actual.alternateRecipesStatus,"not-verified");
  assert.equal(actual.recipes.length,1);
});

test("reads SKPORT Level 70 standard recipe and does not guess missing item IDs",()=>{
  const actual=parseStandardGearRecipe(getPublicGearSourcePanel(source70),{
    gearId:"341",gearName:"Pulser Labs Gloves",snapshot:"2026-10-15"
  });
  assert.deepEqual(actual.recipes[0].materials,[
    {name:"Wuling Stock Bill",count:8000},
    {name:"Xiranite Component",count:50}
  ]);
});

test("rejects missing and malformed costs rather than publishing invented values",()=>{
  const options={gearId:"341",gearName:"Pulser Labs Gloves",snapshot:"2026-10-15"};
  assert.throws(()=>getPublicGearSourcePanel("Source: Cost 8000"),/boundaries missing/);
  assert.throws(()=>parseStandardGearRecipe("Each gear piece costs\nWuling Stock Bill\n*8000",options),/missing component/);
  assert.throws(()=>parseStandardGearRecipe("Each gear piece costs\nWuling Stock Bill\n*x\nXiranite Component\n*20",options),/missing component/);
  assert.throws(()=>parseStandardGearRecipe(getPublicGearSourcePanel(source60),{...options,gearId:"../../fake"}),/item ID/);
  assert.throws(()=>parseStandardGearRecipe(getPublicGearSourcePanel(source60),{...options,itemsByName:{"Wuling Stock Bill":"bad"}}),/mapped item ID/);
});
