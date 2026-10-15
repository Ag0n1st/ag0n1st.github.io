import {chromium} from "playwright-core";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const TEMPLATE="fc5fdd8cc5b2b77f9a1fdf1c94d5f738";
let tree=null,marks=null;
try{
 const context=await browser.newContext({locale:"en-US",viewport:{width:1350,height:900}});
 const page=await context.newPage();
 page.on("response",async response=>{
   try{
     const u=new URL(response.url()),p=u.pathname;
     if(u.hostname!=="zonai.skport.com"||response.status()!==200)return;
     if(p==="/web/v1/game/endfield/map/tree")tree=(await response.json()).data;
     if(p==="/web/v1/game/endfield/map/mark/list"&&u.searchParams.get("mapId")==="map02"&&!u.searchParams.has("levelId"))
       marks=(await response.json()).data;
   }catch{}
 });
 await page.goto("https://game.skport.com/map/endfield",{waitUntil:"domcontentloaded",timeout:50000});
 await page.waitForTimeout(9000);
 if(!tree||!marks)throw Error("Official anonymous SKPORT map/tree or map02 mark list unavailable");
 const worlds=tree.maps.map(map=>({mapId:map.id,name:map.name,
   levels:map.levels.map(level=>({id:level.id,name:level.name,subLevels:(level.subLevels??[]).map(sub=>({id:sub.id,name:sub.name}))}))}));
 const crates=marks.marks.filter(mark=>mark.templateId===TEMPLATE);
 console.log("OFFICIAL_MAP_WORLD_LEVELS",JSON.stringify(worlds));
 console.log("OFFICIAL_BLUEPRINT_CRATE_MARKERS",JSON.stringify({count:crates.length,
  keys:Object.keys(crates[0]||{}),crates:crates.map(mark=>({id:mark.id,
   levelId:mark.levelId,regionId:mark.regionId,pos:mark.pos}))}));
 for(const sample of crates.slice(0,3)){
   for(const query of [
     "?id="+sample.id,
     "?markId="+sample.id,
     "?mapId=map02&markId="+sample.id
   ]){
    const uri="https://zonai.skport.com/web/v1/game/endfield/map/mark/info"+query;
    const value=await page.evaluate(async url=>{
      try{
        const response=await fetch(url,{credentials:"omit",headers:{"sk-language":"en"}});
        const result=await response.json().catch(()=>null);
        return {status:response.status,code:result?.code,message:String(result?.msg??result?.message??"").slice(0,100),
          data:JSON.stringify(result?.data??null).slice(0,2200)};
      }catch(error){return {error:String(error)}}
    },uri);
    console.log("OFFICIAL_BLUEPRINT_MARK_INFO",JSON.stringify({id:sample.id,query,result:value}));
   }
 }
}finally{await browser.close()}
