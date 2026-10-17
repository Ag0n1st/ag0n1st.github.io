import {SPEEDRUN_PLAYLIST_ID,SPEEDRUN_VIDEO_LIMIT} from "../../data/endfield/speedrunPlaylist.mjs";
const validId=id=>/^(?:PL|UU|OLAK5uy_)[A-Za-z0-9_-]{8,}$/.test(id);
const decodeXml=value=>value.replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos);/gi, (match,n,s)=>{
  if(n){const code=Number(n[0].toLowerCase()==="x"?parseInt(n.slice(1),16):n);return Number.isFinite(code)&&code>0&&code<=0x10ffff?String.fromCodePoint(code):match;}
  return {amp:"&",lt:"<",gt:">",quot:'"',apos:"'"}[s.toLowerCase()]??match;
});
export function parseSpeedrunPlaylist(xml,limit=SPEEDRUN_VIDEO_LIMIT){
  const seen=new Set();
  return [...xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)]
    .map(([,entry])=>{
      const value=(tag)=>entry.match(new RegExp("<"+tag+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/"+tag+">"))?.[1]?.trim()??"";
      const id=value("yt:videoId"),title=decodeXml(value("title")),published=value("published");
      if(!/^[A-Za-z0-9_-]{11}$/.test(id)||!title||seen.has(id))return null;
      seen.add(id);
      return {id,title,published:/^\d{4}-\d\d-\d\dT/.test(published)?published:"",
        href:"https://www.youtube.com/watch?v="+id,
        thumbnail:"https://i.ytimg.com/vi/"+id+"/hqdefault.jpg"};
    }).filter(Boolean).slice(0,limit);
}

// Parse ONLY video lockups embedded in the supplied playlist page.
// Ignore unrelated sidebar recommendations and generalized watch-page videoRenderer entries.
export function parseSpeedrunPlaylistPage(html,limit=SPEEDRUN_VIDEO_LIMIT){
 const found=[],seen=new Set();
 for(const match of html.matchAll(/"lockupViewModel"\s*:\s*\{/g)){
  const begin=(match.index??0)+match[0].lastIndexOf("{");
  let depth=0,string=false,escape=false,end=-1;
  for(let i=begin;i<html.length;i++){
   const c=html[i];
   if(string){if(escape)escape=false;else if(c==="\\")escape=true;else if(c==='"')string=false;continue;}
   if(c==='"')string=true;
   else if(c==="{")depth++;
   else if(c==="}" && --depth===0){end=i+1;break;}
  }
  if(end<0)continue;
  let model;
  try{model=JSON.parse(html.slice(begin,end));}catch{continue;}
  const id=model.contentId;
  if(model.contentType!=="LOCKUP_CONTENT_TYPE_VIDEO"||typeof id!=="string"
     ||!/^[A-Za-z0-9_-]{11}$/.test(id)||seen.has(id))continue;
  const metadata=model.metadata?.lockupMetadataViewModel;
  const title=metadata?.title?.content??metadata?.title?.runs?.map(x=>x.text).join("");
  if(typeof title!=="string"||!title.trim())continue;
  const label=model.publishedTimeText?.simpleText??"";
  seen.add(id);
  found.push({id,title:title.trim(),published:"",publishedLabel:label,
    href:"https://www.youtube.com/watch?v="+id,
    thumbnail:"https://i.ytimg.com/vi/"+id+"/hqdefault.jpg"});
  if(found.length>=limit)break;
 }
 return found;
}
async function resolvePublishDate(video){
 // Playlist lockups normally omit upload date. Use the video's own public
 // publishDate; keep dates blank rather than guess if YouTube blocks the page.
 try{
  const response=await fetch(video.href,{
   headers:{"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stGuidePortal/1.0)"},
   signal:AbortSignal.timeout(6500)});
  if(!response.ok)return video;
  const html=await response.text();
  const date=html.match(/"publishDate"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] ??
   html.match(/"uploadDate"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] ??
   html.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  return date?{...video,published:date+"T12:00:00Z"}:video;
 }catch{return video;}
}

export async function getSpeedrunVideos(){
  const id=SPEEDRUN_PLAYLIST_ID.trim();
  if(!id)return {playlist:null,videos:[],status:"not-configured"};
  if(!validId(id))return {playlist:null,videos:[],status:"invalid-id"};
  const playlist="https://www.youtube.com/playlist?list="+encodeURIComponent(id);
  // First use YouTube RSS when available, then its PUBLIC playlist page.
  // YouTube currently returns HTTP 404 for this genuine, owner-provided playlist RSS.
  try{
    const rss=await fetch("https://www.youtube.com/feeds/videos.xml?playlist_id="+encodeURIComponent(id),{
      headers:{"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stGuidePortal/1.0)"},
      signal:AbortSignal.timeout(7000)});
    if(rss.ok){
      const videos=parseSpeedrunPlaylist(await rss.text());
      if(videos.length)return {playlist,videos,status:"ok"};
    }
  }catch(error){console.warn("Speedrun RSS unavailable; trying public playlist:",String(error));}
  try{
    const response=await fetch(playlist,{headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36","Accept-Language":"en-US,en;q=0.9"},signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw Error("Public playlist HTTP "+response.status);
    const html=await response.text();
    const videos=parseSpeedrunPlaylistPage(html);
    if(!videos.length)return {playlist,videos:[],status:"empty"};
    const enriched=await Promise.all(videos.map(resolvePublishDate));
    console.info("Verified speedrun playlist entries:",enriched.length,"with upload dates:",enriched.filter(video=>video.published).length);
    return {playlist,videos:enriched,status:"ok"};
  }catch(error){
    console.warn("Speedrun public playlist unavailable:",String(error));
    return {playlist,videos:[],status:"unavailable"};
  }
}
