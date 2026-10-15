for(const url of [
 "https://r.jina.ai/https://endfieldhub.org/database/gears",
 "https://r.jina.ai/http://endfieldhub.org/database/gears",
 "https://endfieldhub.org/robots.txt"
]){
 try{
  const r=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0"} ,signal:AbortSignal.timeout(20000)});
  const body=await r.text();
  const match=body.match(/Pulser Labs Gloves[\s\S]{0,500}/i);
  console.log("MIRROR_PROBE",JSON.stringify({url,status:r.status,bytes:body.length,
    header:body.slice(0,700),example:match?.[0]?.slice(0,300)}));
 }catch(err){console.log("MIRROR_ERROR",JSON.stringify({url,error:String(err)}))}
}
