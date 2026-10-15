const urls=[
"https://r.jina.ai/https://endfield.wiki.gg/wiki/Gear",
"https://r.jina.ai/https://endfield.wiki.gg/wiki/Artificing",
"https://r.jina.ai/https://game8.co/games/Arknights-Endfield/archives/577443",
"https://r.jina.ai/https://endfieldhub.org/database/gears"
];
for(const url of urls){
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(25000)});
  const body=await r.text();
  const idx=body.indexOf("Gear Template Crate");
  console.log("SECONDARY_WIKI_MIRROR",JSON.stringify({url,status:r.status,bytes:body.length,
    gearTable:idx>=0?body.slice(idx,idx+1700):null,
    head:body.slice(0,250)}));
 }catch(err){console.log("SECONDARY_WIKI_MIRROR_ERROR",JSON.stringify({url,error:String(err)}))}
}
