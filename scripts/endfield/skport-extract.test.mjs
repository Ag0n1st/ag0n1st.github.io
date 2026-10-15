import test from "node:test";
import assert from "node:assert/strict";
import { inspectSkport, extractTable, extractDocument, selectWikiItem, TYPHOEUS } from "./skport-extract.mjs";

const rankColumns = Array.from({length:9},(_,i)=>"RANK "+(i+1)).concat(["Mastery I","Mastery II","Mastery III"]);

function textBlock(text) {
  return {kind:"text",text:{inlineElements:[{kind:"text",text:{text}}]}};
}
function levelDocument(seed) {
  const rowIds=["header","damage","cost"];
  const columnIds=["metric",...rankColumns.map((_,i)=>"c"+i)];
  const blockMap={};
  const cellMap={};
  rowIds.forEach((row,rowIndex) => columnIds.forEach((col,colIndex) => {
    const blockId="b"+rowIndex+"_"+colIndex;
    const value=rowIndex===0 ? (colIndex===0?"":rankColumns[colIndex-1]) :
      rowIndex===1 ? (colIndex===0?"Damage":(21+seed+colIndex)+"%") :
      colIndex===0 ? "Cost" : "";
    blockMap[blockId]=textBlock(value);
    if(rowIndex===2 && colIndex===12) {
      blockMap[blockId]={kind:"text",text:{inlineElements:[
        {kind:"entry",entry:{id:"110",count:"50"}},
        {kind:"entry",entry:{id:"642",count:"65000"}}
      ]}};
    }
    cellMap[row+"_"+col]={childIds:[blockId]};
  }));
  blockMap.tbl={
    kind:"table",
    table:{rowIds,columnIds,cellMap}
  };
  return {blockIds:["tbl"],blockMap};
}
function fixture() {
  const documentMap={};
  const tabDataMap={};
  const tabList=[];
  for(const [i,skill] of TYPHOEUS.expectedTabs.entries()){
    const tabId="tab_176505972"+(2556+i);
    tabList.push({tabId,icon:"https://example.test/skill-"+i+".png"});
    tabDataMap[tabId]={
      intro:{name:skill.name,type:skill.type,imgUrl:"https://example.test/"+i+".gif",description:skill.descriptionId},
      content:skill.contentId
    };
    documentMap[skill.descriptionId]={blockIds:["desc"],blockMap:{desc:textBlock("Description of "+skill.name)}};
    documentMap[skill.contentId]=levelDocument(i);
  }
  return {code:0,data:{item:{
    itemId:"1173",name:"Typhoeus",lang:"en",
    brief:{cover:"https://example.test/cover.webp",subTypeList:[{subTypeId:"10000",value:"10006"}]},
    subType:{filterTagTree:[{id:"10000",children:[{id:"10006",name:"6★",value:"rarity_6"}]}]},
    document:{documentMap,widgetCommonMap:{[TYPHOEUS.skillWidgetId]:{tabList,tabDataMap}},extraInfo:{illustration:"https://example.test/illustration.png"}}
  }}};
}

test("reads the actual SKPORT nested item document and both document references per skill",()=>{
  const output=inspectSkport(fixture());
  assert.deepEqual(output.diagnostics.issues,[]);
  assert.equal(output.status,"validated-structure");
  assert.equal(output.operatorInfo.name,"Typhoeus");
  assert.equal(output.operatorInfo.rarity.name,"6★");
  assert.equal(output.skills.length,4);
  for(const [i,skill] of output.skills.entries()){
    assert.equal(skill.name,TYPHOEUS.expectedTabs[i].name);
    assert.deepEqual(skill.descriptionIds,[TYPHOEUS.expectedTabs[i].descriptionId]);
    assert.deepEqual(skill.contentIds,[TYPHOEUS.expectedTabs[i].contentId]);
    assert.equal(skill.description,"Description of "+skill.name);
    assert.equal(skill.tables.length,1);
    assert.equal(skill.tables[0].rows.length,3);
    assert.equal(skill.levels.length,12);
    assert.equal(skill.metrics[0].values.length,12);
    assert.equal(skill.levels[0].rank,"RANK 1");
    assert.equal(skill.levels[11].rank,"Mastery III");
    assert.equal(skill.levels[0].stats[0].value,(22+i)+"%");
    assert.deepEqual(skill.levels[11].stats[1].entries,[{id:"110",count:"50"},{id:"642",count:"65000"}]);
  }
});

test("accepts network captures and ignores unrelated authentication responses entirely",()=>{
  const wrapped=[
    {url:"https://as.gryphline.com/user/oauth2/v2/grant",status:200,response:{privateToken:"SECRET_NOT_FOR_EXPORT"}},
    {url:"https://zonai.skport.com/web/v1/wiki/item/info?id=1173",status:200,response:fixture()}
  ];
  const output=inspectSkport(wrapped);
  assert.equal(output.status,"validated-structure");
  assert.ok(!JSON.stringify(output).includes("SECRET_NOT_FOR_EXPORT"));
  assert.deepEqual(selectWikiItem(wrapped),fixture().data.item);
});

test("rejects missing source references, rather than assigning another skill's table",()=>{
  const input=fixture();delete input.data.item.document.documentMap[TYPHOEUS.expectedTabs[0].descriptionId];
  const output=inspectSkport(input);
  assert.equal(output.status,"needs-review");
  assert.ok(output.diagnostics.issues.some(x=>x.includes("Beschreibungs-Dokument")));
});

test("rejects wrongly shared data sources across skills",()=>{
  const input=fixture();
  const tabIds=input.data.item.document.widgetCommonMap[TYPHOEUS.skillWidgetId].tabList.map(x=>x.tabId);
  input.data.item.document.widgetCommonMap[TYPHOEUS.skillWidgetId].tabDataMap[tabIds[1]].content=TYPHOEUS.expectedTabs[0].contentId;
  const output=inspectSkport(input);
  assert.equal(output.status,"needs-review");
  assert.ok(output.diagnostics.issues.some(x=>x.includes("mehreren Skills")));
});

test("rejects wrong schema, instead of silently approving incomplete data",()=>{
  const output=inspectSkport({code:0,data:{item:{itemId:"1173",document:{}}}});
  assert.equal(output.status,"needs-review");
  assert.equal(output.skills.length,0);
  assert.ok(output.diagnostics.issues.some(x=>x.includes("documentMap")));
});

test("rejects missing or duplicate item-info captures",()=>{
  assert.equal(inspectSkport([]).status,"needs-review");
  assert.equal(inspectSkport([{},{}]).status,"needs-review");
});

test("preserves material reference IDs and raw table dimensions",()=>{
  const data=fixture();
  const contentId=TYPHOEUS.expectedTabs[0].contentId;
  const document=data.data.item.document.documentMap[contentId];
  const table=extractDocument(contentId,document).sections[0].table;
  assert.equal(table.rows.length,3);
  assert.equal(table.columns.length,13);
  assert.ok(table.rows[2].cells[12].includes("[item:110 x50]"));
  assert.equal(extractTable({},{}).rows.length,0);
});
