import {SPEEDRUN_PLAYLIST_ID,SPEEDRUN_VIDEO_LIMIT} from "../../data/endfield/speedrunPlaylist.mjs";
const validId=id=>/^(?:PL|UU|OLAK5uy_)[A-Za-z0-9_-]{12,}$/.test(id);
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
export async function getSpeedrunVideos(){
  const id=SPEEDRUN_PLAYLIST_ID.trim();
  if(!id)return {playlist:null,videos:[],status:"not-configured"};
  if(!validId(id))return {playlist:null,videos:[],status:"invalid-id"};
  const playlist="https://www.youtube.com/playlist?list="+encodeURIComponent(id);
  try{
    const response=await fetch("https://www.youtube.com/feeds/videos.xml?playlist_id="+encodeURIComponent(id),{
      headers:{"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stGuidePortal/1.0)"},
      signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw Error("HTTP "+response.status);
    const videos=parseSpeedrunPlaylist(await response.text());
    return {playlist,videos,status:videos.length?"ok":"empty"};
  }catch(error){console.warn("Speedrun playlist feed unavailable:",String(error));return {playlist,videos:[],status:"unavailable"};}
}
