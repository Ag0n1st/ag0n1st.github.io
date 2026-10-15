/**
 * Analyze only PUBLIC anonymous SKPORT Map Tools metadata.
 * All public maps and marker endpoints come directly from game.skport.com.
 * Logs avoid cookies, accounts and user data.
 */
import {chromium} from "playwright-core";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
let tree=null,catalog=null,lists=new Map();
const keys=new Set(["name","title","label","description","desc","id","templateId","regionId","levelId","mapId"]);
const flatNames=(value,max=4000)=>{
 const output=[];function walk(x,path=[],depth=0){
  if(depth>7||output.length>max)return;
  if(Array.isArray(x)){for(const q of x.slice(0,150))walk(q,path,depth+1);return;}
  if(x && typeof x==="object"){
   for(const [k,v] of Object.entries(x)){
     if(typeof v==="string"&&(keys.has(k)||/(gear|crate|blueprint|template)/i.test(v)))output.push({path:[...path,k].join("."),text:v.slice(0,180)});
     else if(typeof v==="object")walk(v,[...path,k],depth+1);
   }
  }
 }walk(value);return output;
};
try{
 const context=await browser.newContext({locale:"en-US",viewport:{width:1350,height:900}});
 const page=await context.newPage();
 page.on("response",async r=>{
   try{
    const u=new URL(r.url()),p=u.pathname;
    if(u.hostname!=="zonai.skport.com"||!p.startsWith("/web/v1/game/endfield/map/")||r.status()!==200)return;
    const v=await r.json().catch(()=>null);
    if(v?.code!==0||!v?.data)return;
    if(p.endsWith("/tree"))tree=v.data;
    if(p.endsWith("/catalog"))catalog=v.data;
    if(p.endsWith("/mark/list")&&!u.searchParams.get("levelId")){
      lists.set(u.searchParams.get("mapId"),v.data);
    }
   }catch{}
 });
 await page.goto("https://game.skport.com/map/endfield",{waitUntil:"domcontentloaded",timeout:45000});
 await page.waitForTimeout(8000);
 console.log("MAP_STATUS",JSON.stringify({tree:!!tree,catalog:!!catalog,lists:[...lists.keys()]}));
 console.log("MAP_TREE_NAMES",JSON.stringify(flatNames(tree,800).filter(x=>x.text.length>0).slice(0,300)));
 const catalogNames=flatNames(catalog,1200).filter(x=>/crate|template|blueprint|gear|box|chest/i.test(x.text));
 console.log("MAP_CATALOG_GEAR_TYPES",JSON.stringify(catalogNames.slice(0,110)));
 for(const [mapId,data] of lists){
  const templates=data.markTemplates??[];
  const marks=data.marks??[];
  const groups=new Map();
  for(const m of marks){
    const key=String(m.templateId);
    groups.set(key,(groups.get(key)||0)+1);
  }
  const selected=templates.map(t=>({...t,count:groups.get(String(t.id))||0}))
    .filter(t=>/gear|template|blueprint|chest|crate|equipment|craft/i.test([t.name,t.desc].join(" ")));
  console.log("MAP_GEAR_MARK_TYPES",JSON.stringify({mapId,totalMarks:marks.length,
    totalTemplates:templates.length,matches:selected.slice(0,50).map(t=>({
     id:t.id,name:t.name,desc:String(t.desc??"").slice(0,250),count:t.count
    }))}));
  for(const template of selected.filter(t=>t.count>0).slice(0,8)){
   const hits=marks.filter(m=>String(m.templateId)===String(template.id));
   console.log("MAP_GEAR_MARK_EXAMPLES",JSON.stringify({mapId,templateId:template.id,
     name:template.name,markCount:hits.length,examples:hits.slice(0,6).map(m=>({
       id:m.id,regionId:m.regionId,levelId:m.levelId,
       coordinates:Array.isArray(m.pos)?m.pos:(typeof m.pos==="object"?m.pos:null)
     }))}));
  }
 }
}finally{await browser.close();}
