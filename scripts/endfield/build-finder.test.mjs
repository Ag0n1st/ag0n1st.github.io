import test from "node:test";
import assert from "node:assert/strict";
import {evaluateBuildAvailability as check} from "../../src/lib/endfield/buildFinder.mjs";
const confirmed={requiredLevel:60,partCount:4,allPartsVerified:true,
  factoryStage:"fortgeschritten",hasFactoryEvidence:true,preview:false};
test("filters by the required official gear level and checked editorial factory stage",()=>{
 assert.equal(check(confirmed,{level:70,factoryStage:"fortgeschritten"}).status,"available");
 assert.equal(check(confirmed,{level:50,factoryStage:"maximal"}).status,"level-locked");
 assert.equal(check(confirmed,{level:70,factoryStage:"einstieg"}).status,"factory-locked");
 assert.equal(check(confirmed,{level:70,factoryStage:"maximal"}).status,"available");
});
test("never marks missing parts, uncertain factory data, or preview cards as available",()=>{
 for(const patch of [{partCount:3},{allPartsVerified:false},{requiredLevel:null},
   {factoryStage:null},{hasFactoryEvidence:false},{preview:true},
   {factoryStage:"unofficial"}]){
   assert.equal(check({...confirmed,...patch},{level:70,factoryStage:"maximal"}).status,"unverified");
 }
 assert.equal(check(confirmed,{level:70,factoryStage:"invalid"}).status,"unverified");
});
