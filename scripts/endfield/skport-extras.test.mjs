import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { extractExtras } from "./skport-extras.mjs";

function makeDoc(lines,tableRows,includeTitle=false) {
  const blockMap={};const blockIds=[];
  if(includeTitle){
    blockIds.push("title");
    blockMap.title={kind:"text",text:{inlineElements:[{kind:"text",text:{text:lines}}]}};
  }
  const rowIds=tableRows.map((_,i)=>"r"+i);
  const columnIds=(tableRows[0]??[]).map((_,i)=>"c"+i);
  const cellMap={};
  tableRows.forEach((row,ri)=>row.forEach((value,ci)=>{
    const id="b"+ri+"_"+ci;
    const material=Array.isArray(value);
    blockMap[id]={kind:"text",text:{inlineElements:material?
      value.map(([item,count])=>({kind:"entry",entry:{id:String(item),count:String(count)}})):
      [{kind:"text",text:{text:String(value)}}]}};
    cellMap["r"+ri+"_c"+ci]={childIds:[id]};
  }));
  blockIds.push("tab");
  blockMap.tab={kind:"table",table:{rowIds,columnIds,cellMap}};
  return {blockIds,blockMap};
}
function fixture(){
  const chapterGroup=[];const widgetCommonMap={};const documentMap={};let widgetNum=0;let documentNum=0;
  function section(title,tabDefinitions,tableWidget=false) {
    const id="w"+widgetNum++;
    chapterGroup.push({widgets:[{title:"//"+title,id}]});
    const tabList=[];const tabDataMap={};
    for(const [tabName,doc] of tabDefinitions){
      const tabId="tab_"+documentNum;const documentId="d"+documentNum++;
      tabList.push({tabId,title:tabName});tabDataMap[tabId]={content:documentId};documentMap[documentId]=doc;
    }
    widgetCommonMap[id]=tableWidget?{tableList:[{label:"Codename",value:"Typhoeus"}]}:{tabList,tabDataMap};
  }
  section("Basic Information",[],true);
  const rankLabels=["","LV.1","LV.20","LV.40","LV.60","LV.80","LV.90"];
  const rows=[rankLabels];
  for(const label of ["Strength","Agility (Main)","Intellect","Will (Secondary)","Base ATK","Base HP"]){
    rows.push([label,...Array.from({length:6},(_,i)=>String(i+2))]);
  }
  rows.push(["Cost",[],[["100",5]],[["100",10]],[["100",20]],[["100",30]],[["100",40]]]);
  section("Level Up",[["Overview",makeDoc(null,rows)]]);
  const names=["Skirmisher","Prey Checklist","Huntress's Focus","Lithic Murmurs","Life in the Spores"];
  section("Talent Nodes",names.map(name=>["",makeDoc(name,[
    ["", "Talent Effect", "Requirements", "Cost"],
    [name+" 1", "Official effect", "Promote to E1", [["109",5]]]
  ],true)]));
  const promotions=["Promotion I","Outfitting I","Promotion II","Outfitting II","Promotion III","Outfitting III","Promotion IV"];
  section("Elite",promotions.map(name=>["",makeDoc(null,[
    ["","After Activation","Requirements","Cost"],
    [name,"Unlock","Operator Lv.20",[["107",8]]]
  ])]));
  const potentialRows=Array.from({length:5},(_,i)=>[
    "", "Potential "+(i+1)+"\nPOTENTIAL "+String(i+1).padStart(2,"0"), "Effect "+(i+1)
  ]);
  section("Potential Phases",[["",makeDoc(null,potentialRows)]]);
  // SKPORT uses "default" rather than tab ID for a no-tab common widget.
  const potentialWidget=Object.values(widgetCommonMap).at(-1);
  potentialWidget.tabDataMap.default=potentialWidget.tabDataMap[potentialWidget.tabList[0].tabId];
  return {code:0,data:{item:{itemId:"1173",name:"Typhoeus",lang:"en",document:{chapterGroup,widgetCommonMap,documentMap}}}};
}

test("parses source-linked progression, talent nodes, promotions and potentials",()=>{
  const source=fixture();
  const materials={"100":{name:"Elementary Combat Record"},"107":{name:"Protodisk"},"109":{name:"Protoprism"}};
  const out=extractExtras(source,materials,"2026-10-12");
  assert.equal(out.operator,"typhoeus");
  assert.equal(out.attributes.metrics.length,6);
  assert.equal(out.attributes.mainAttribute,"Agility");
  assert.equal(out.attributes.secondaryAttribute,"Will");
  assert.deepEqual(out.attributes.levelCosts[1].items,[{id:"100",count:5}]);
  assert.equal(out.talents.length,5);
  assert.deepEqual(out.talents.map(t=>t.category),["attribute","combat","combat","ship","ship"]);
  assert.equal(out.talents[0].levels[0].effect,"Official effect");
  assert.equal(out.promotions.length,7);
  assert.deepEqual(out.promotions[0].cost,[{id:"107",count:8}]);
  assert.deepEqual(out.potentials.map(p=>p.level),[1,2,3,4,5]);
  assert.equal(out.potentials[3].name,"Potential 4");
  assert.equal(out.materials["109"].name,"Protoprism");
});

test("rejects missing item names before writing incomplete material references",()=>{
  assert.throws(()=>extractExtras(fixture(),{"100":{name:"XP"},"107":{name:"Protodisk"}}),/Unknown material ID: 109/);
});

test("versioned Typhoeus public export remains structurally complete",async()=>{
  const path=new URL("../../src/data/endfield/operators/typhoeus.extra.json",import.meta.url);
  const out=JSON.parse(await readFile(path,"utf8"));
  assert.equal(out.operator,"typhoeus");
  assert.equal(out.source.itemId,"1173");
  assert.equal(out.attributes.metrics.length,6);
  assert.equal(out.attributes.levelCosts.length,6);
  assert.equal(out.talents.length,5);
  assert.equal(out.promotions.length,7);
  assert.equal(out.potentials.length,5);
  assert.equal(out.materials["642"].name,"T-Creds");
  for(const metric of out.attributes.metrics)assert.equal(metric.values.length,6);
  for(const tal of out.talents)assert.ok(tal.levels.length>0);
  for(const level of out.attributes.levelCosts)for(const item of level.items)assert.ok(out.materials[item.id]);
});
