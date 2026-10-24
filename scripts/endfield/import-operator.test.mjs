import test from "node:test";
import assert from "node:assert/strict";
import { importOperator } from "./import-operator.mjs";

function text(value) {
  return {kind:"text",text:{inlineElements:[{kind:"text",text:{text:String(value)}}]}};
}
function tableDocument(data,intro) {
  const blockIds=[],blockMap={};
  if(intro){blockIds.push("intro");blockMap.intro=text(intro);}
  const rowIds=data.map((_,i)=>"r"+i),columnIds=data[0].map((_,i)=>"c"+i),cellMap={};
  data.forEach((row,r)=>row.forEach((value,c)=>{
    const id="b"+r+"_"+c;
    blockMap[id]={kind:"text",text:{inlineElements:Array.isArray(value)?
      value.map(([item,count])=>({kind:"entry",entry:{id:String(item),count:String(count)}})):
      [{kind:"text",text:{text:String(value)}}]}};
    cellMap["r"+r+"_c"+c]={childIds:[id]};
  }));
  blockIds.push("table");blockMap.table={kind:"table",table:{rowIds,columnIds,cellMap}};
  return {blockIds,blockMap};
}
function makeFixture() {
  const groups=[],widgetCommonMap={},documentMap={};
  let seq=0;
  const register=(title,widget)=>{
    const id="widget"+seq++;
    groups.push({title,widgets:[{id,title:"//"+title}]});
    widgetCommonMap[id]=widget;
  };
  const skillTabs=[],skillMap={};
  const ranks=[...Array.from({length:9},(_,i)=>"RANK "+(i+1)),"Mastery I","Mastery II","Mastery III"];
  const types=["Basic Attack","Battle Skill","Combo Skill","Ultimate"];
  for(const [i,type] of types.entries()){
    const tabId="dynamic-"+i,descriptionId="description-"+i,contentId="data-"+i;
    skillTabs.push({tabId,icon:"https://example.test/icon"+i+".png"});
    skillMap[tabId]={
      intro:{name:"Test Skill "+i,type,description:descriptionId},
      content:contentId
    };
    documentMap[descriptionId]={blockIds:["text"],blockMap:{text:text("Official description for skill "+i)}};
    const rows=[
      ["Metric",...ranks],
      ["Multiplier",...ranks.map((_,j)=>(i+j+1)+"%")],
      ["Cost",[],...ranks.slice(1).map(()=>[["109",4],["642",2000]])]
    ];
    documentMap[contentId]=tableDocument(rows);
  }
  register("Combat Skills",{tabList:skillTabs,tabDataMap:skillMap});
  register("Basic Information",{tableList:[{label:"Codename",value:"Alpha Operator"}]});
  const levelDoc="level0";
  documentMap[levelDoc]=tableDocument([
    ["","LV.1","LV.20","LV.40","LV.60","LV.80","LV.90"],
    ["Strength","1","2","3","4","5","6"],
    ["Agility (Main)","1","2","3","4","5","6"],
    ["Intellect","1","2","3","4","5","6"],
    ["Will (Secondary)","1","2","3","4","5","6"],
    ["Base ATK","1","2","3","4","5","6"],
    ["Base HP","1","2","3","4","5","6"],
    ["Cost",[],[["109",1]],[["109",2]],[["109",3]],[["109",4]],[["109",5]]]
  ]);
  register("Level Up",{tabList:[{tabId:"L0",title:"Overview"}],tabDataMap:{L0:{content:levelDoc}}});
  const talents=["Might","Instinct","Reserve","Engineering","Production"];
  const talentList=[],talentMap={};
  for(const [i,title] of talents.entries()){
    const id="t"+i,docId="talentDoc"+i;
    talentList.push({tabId:id});talentMap[id]={content:docId};
    documentMap[docId]=tableDocument([
      ["Talent","Effect","Prerequisite","Cost"],
      [title+" 1","An effect","E1",[["109",4]]]
    ],title);
    if(i===0){
      // The real Liino attribute talent contains a second one-row metadata table.
      const document=documentMap[docId];
      document.blockIds.push("metadata-table");
      document.blockMap["meta-value"]=text("Bonus");
      document.blockMap["metadata-table"]={kind:"table",table:{
        rowIds:["meta-row"],columnIds:["a","b"],
        cellMap:{
          "meta-row_a":{childIds:["meta-value"]},
          "meta-row_b":{text:{inlineElements:[{kind:"text",text:{text:"Additional attribute metadata"}}]}}
        }
      }};
    }
  }
  register("Talent Nodes",{tabList:talentList,tabDataMap:talentMap});
  const eliteList=[],eliteMap={};
  for(let i=0;i<7;i++){
    const id="e"+i,docId="elite"+i;
    eliteList.push({tabId:id});eliteMap[id]={content:docId};
    documentMap[docId]=tableDocument([
      ["Title","Effect","Requirement","Cost"],
      ["Promotion "+i,"Unlock "+i,"Level "+(i+20),[["109",2]]]
    ]);
  }
  register("Elite",{tabList:eliteList,tabDataMap:eliteMap});
  documentMap.potential=tableDocument(Array.from({length:5},(_,i)=>[
    "", "Passive "+i+"\nPOTENTIAL "+String(i+1).padStart(2,"0"), "Effect "+i
  ]));
  // Like Liino, this document may contain another table with non-potential metadata.
  documentMap.potential.blockIds.push("other-table");
  documentMap.potential.blockMap["other-table"]={kind:"table",table:{
    rowIds:["extra"],columnIds:["left","right"],cellMap:{
      "extra_left":{text:{inlineElements:[{kind:"text",text:{text:"Snapshot"}}]}},
      "extra_right":{text:{inlineElements:[{kind:"text",text:{text:"Image reward"}}]}}
    }
  }};
  register("Potential Phases",{tabList:[],tabDataMap:{default:{content:"potential"}}});

  const item={
    itemId:"987654",name:"Alpha Operator",lang:"en",
    brief:{cover:"https://example.test/cover.png",subTypeList:[
      {subTypeId:"10000",value:"r6"},
      {subTypeId:"10100",value:"nature"},
      {subTypeId:"10200",value:"striker"},
      {subTypeId:"10213",value:"sword"}
    ]},
    subType:{filterTagTree:[
      {id:"10000",children:[{id:"r6",name:"6★"}]},
      {id:"10100",children:[{id:"nature",name:"Nature"}]},
      {id:"10200",children:[{id:"striker",name:"Striker"}]},
      {id:"10213",children:[{id:"sword",name:"Sword"}]}
    ]},
    document:{chapterGroup:groups,widgetCommonMap,documentMap,extraInfo:{illustration:"https://example.test/character.png"}}
  };
  return {code:0,data:{item}};
}
const info={itemId:"987654",slug:"alpha-operator",snapshot:"2026-10-15"};
const items={"109":{name:"Protoprism"},"642":{name:"T-Creds"}};

test("parses entirely different operator ID and dynamic widget/tab IDs",()=>{
  const {main,extras}=importOperator(makeFixture(),items,info);
  assert.equal(main.operator.slug,"alpha-operator");
  assert.equal(main.operator.id,"987654");
  assert.equal(main.operator.name,"Alpha Operator");
  assert.equal(main.operator.rarity,6);
  assert.equal(main.operator.weaponType,"Sword");
  assert.equal(main.skills.length,4);
  assert.deepEqual(main.skills.map(s=>s.slot),["basic","battle","combo","ultimate"]);
  assert.equal(main.skills[2].description,"Official description for skill 2");
  assert.equal(main.skills[0].metrics[0].length,13);
  assert.equal(main.skills[0].upgradeCosts.length,12);
  assert.deepEqual(main.skills[0].upgradeCosts[1].items,[{id:"109",count:4},{id:"642",count:2000}]);
  assert.deepEqual(extras.attributes.levels,["LV.1","LV.20","LV.40","LV.60","LV.80","LV.90"]);
  assert.equal(extras.attributes.mainAttribute,"Agility");
  assert.equal(extras.talents.length,5);
  assert.deepEqual(extras.talents[0].supplementalTables[0][0],["Bonus","Additional attribute metadata"]);
  assert.equal(extras.promotions.length,7);
  assert.equal(extras.potentials.length,5);
  assert.deepEqual(extras.potentialSupplementalTables[0][0],["Snapshot","Image reward"]);
  assert.equal(extras.materials["109"].name,"Protoprism");
});

test("rejects wrong operator ID to prevent cross-character data assignments",()=>{
  assert.throws(()=>importOperator(makeFixture(),items,{...info,itemId:"1173"}),/Item-ID weicht ab/);
});

test("rejects missing item descriptions and cost names",()=>{
  const fixture=makeFixture();
  const skills=fixture.data.item.document.widgetCommonMap.widget0;
  delete skills.tabDataMap["dynamic-0"].intro.description;
  assert.throws(()=>importOperator(fixture,items,info),/Beschreibung fehlt/);
  assert.throws(()=>importOperator(makeFixture(),{"109":{name:"Protoprism"}},info),/Itemname für Material-ID 642 fehlt/);
});

test("rejects ambiguous skill slots and nonconforming level tables",()=>{
  const fixture=makeFixture();
  const skills=fixture.data.item.document.widgetCommonMap.widget0;
  skills.tabDataMap["dynamic-1"].intro.type="Basic Attack";
  assert.throws(()=>importOperator(fixture,items,info),/(doppelter Skilltyp|mindestens ein Skill jedes Typs nötig)/);
  const broken=makeFixture();
  delete broken.data.item.document.documentMap["data-3"];
  assert.throws(()=>importOperator(broken,items,info),/Dokument fehlt/);
});


test("accepts Yvonne's RANK1 spelling without relaxing other rank-order checks",()=>{
  const raw=makeFixture();
  raw.data.item.document.documentMap["data-3"].blockMap["b0_1"].text.inlineElements[0].text.text="RANK1";
  const {main}=importOperator(raw,items,info);
  assert.equal(main.skills[3].upgradeCosts.length,12);
});
test("records Endministrator's official undisclosed P4/P5 without inventing effects",()=>{
  const raw=makeFixture();
  for(const key of ["b3_2","b4_2"])
    raw.data.item.document.documentMap.potential.blockMap[key].text.inlineElements[0].text.text="";
  const {extras}=importOperator(raw,items,info);
  assert.equal(extras.potentials.length,5);
  assert.equal(extras.potentials[3].effect,"");
  assert.equal(extras.potentials[3].status,"undisclosed");
  assert.equal(extras.potentials[4].status,"undisclosed");
});
test("keeps both documented Arcane INT and WILL variants with all 12 ranks",()=>{
  const raw=makeFixture();
  const doc=raw.data.item.document;
  const def=doc.chapterGroup.flatMap(x=>x.widgets).find(w=>w.title==="//Combat Skills");
  const combat=doc.widgetCommonMap[def.id];
  for(let i=1;i<=3;i++){
    const existing=combat.tabDataMap["dynamic-"+i];
    existing.intro.name+=" (Array Arcana: INT)";
    const id="alt-"+i;
    combat.tabList.push({tabId:id,icon:"https://example.test/alt-"+i+".png"});
    combat.tabDataMap[id]={
      intro:{...existing.intro,name:"Test Skill "+i+" (Array Arcana: WILL)"},
      content:existing.content
    };
  }
  const {main,extras}=importOperator(raw,items,info);
  assert.equal(main.skills.length,4);
  assert.equal(main.skillVariants.will.length,3);
  assert.deepEqual(main.skillVariants.will.map(x=>x.slot),["battle","combo","ultimate"]);
  assert.ok(main.skillVariants.will.every(x=>x.upgradeCosts.length===12));
  assert.equal(extras.potentials.length,5);
});
