import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {expectedInfoResponse,publicIndex} from "./probe-public-operator.mjs";
import {validateNormalized} from "./import-public-skport-all.mjs";
const si=JSON.parse(readFileSync("src/data/endfield/operators/si.json","utf8"));
const extra=JSON.parse(readFileSync("src/data/endfield/operators/si.extra.json","utf8"));
test("only the exact public SKPORT item/info response is accepted",()=>{
 const url="https://zonai.skport.com/web/v1/wiki/item/info?id=1174";
 const valid={code:0,data:{item:{itemId:1174,document:{chapterGroup:[]}}}};
 assert.equal(expectedInfoResponse(url,200,valid,"1174"),true);
 for(const [u,status,payload,id] of [
   ["https://not-skport.com/web/v1/wiki/item/info?id=1174",200,valid,"1174"],
   [url,403,valid,"1174"],[url,200,{...valid,code:1},"1174"],
   [url,200,valid,"1173"],[url,200,{...valid,data:{item:{itemId:1174}}},"1174"],
   ["http://zonai.skport.com/web/v1/wiki/item/info?id=1174",200,valid,"1174"]
 ])assert.equal(expectedInfoResponse(u,status,payload,id),false);
});
test("public wiki items index is limited to numeric IDs and sanitised names",()=>{
 const index=publicIndex({"123":{name:"Test Item"},"bad":{name:"Not a game item"},
   "1":{name:"Perlica"}});
 assert.equal(index["123"].name,"Test Item");
 assert.equal(index["1"].name,"Perlica");
 assert.equal(index.bad,undefined);
 assert.ok(Object.keys(index).length>=900);
});
test("bulk source normalisation checks a real previously approved SKPORT import",()=>{
 const op={id:"si",itemId:"1278"};
 assert.doesNotThrow(()=>validateNormalized(op,{main:si,extras:extra}));
 assert.throws(()=>validateNormalized({...op,itemId:"1"},{main:si,extras:extra}),/mismatch/);
 assert.throws(()=>validateNormalized(op,{main:{...si,skills:si.skills.slice(0,3)},extras:extra}),
  /Incomplete four-skills/);
 assert.throws(()=>validateNormalized(op,{main:si,extras:{...extra,potentials:[]}}),/potential/);
});
test("browser importer never serialises raw captures, headers or credentials",()=>{
 const script=readFileSync("scripts/endfield/import-public-skport-all.mjs","utf8");
 const workflow=readFileSync(".github/workflows/import-skport-public-operators.yml","utf8");
 assert.match(script,/expectedInfoResponse/);
 assert.match(script,/importOperator\(/);
 assert.match(script,/static\.skport\.com/);
 assert.match(script,/flag:"wx"/);
 assert.doesNotMatch(script,/cookie\s*=|authorization\s*:/i);
 assert.match(workflow,/Enforce 100 MB Endfield limit/);
 assert.match(workflow,/Validate imported data and Astro build/);
});
