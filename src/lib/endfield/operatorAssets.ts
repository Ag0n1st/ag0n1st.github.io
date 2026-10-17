import { existsSync } from "node:fs";
import { join } from "node:path";

// Use repository assets when available. A CDN URL is only a transitional
// fallback; all published HTML remains fully static and requires no database.
export function getOperatorImageUrl(
  slug: string,
  asset: "cover" | "illustration" | "banner" | "official-portrait" | "official-icon" | "skill-basic" | "skill-battle" | "skill-combo" | "skill-ultimate" | "potential-1" | "potential-3" | "potential-5",
  publicRemoteUrl?: string
): string | undefined {
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return publicRemoteUrl;
  const location=asset.startsWith("skill-")?"skills/"+asset
    :asset.startsWith("potential-")?"potentials/"+asset:asset;
  const base="/images/endfield/operators/"+slug+"/"+location;
  for(const ext of [".png",".webp",".jpg",".jpeg"]){
    if(existsSync(join(process.cwd(),"public",base.slice(1)+ext))){
      return base+ext;
    }
  }
  return publicRemoteUrl;
}

/** Public YouTube video thumb -> optional local cached 320x180 WebP.
 * Never request a remote image while building or rendering a static page.
 */
export function getGuideThumbnailUrl(videoUrl?:string):string|undefined{
  if(!videoUrl)return undefined;
  let id:string|undefined;
  try{
    const url=new URL(videoUrl);
    const host=url.hostname.toLowerCase();
    if(host==="youtu.be")id=url.pathname.split("/")[1];
    else if(["youtube.com","www.youtube.com","m.youtube.com"].includes(host)){
      if(url.pathname==="/watch")id=url.searchParams.get("v")??undefined;
      else if(url.pathname.startsWith("/embed/"))id=url.pathname.split("/")[2];
    }
  }catch{return undefined;}
  if(!id||!/^[A-Za-z0-9_-]{11}$/.test(id))return undefined;
  const name=id+".webp",root="public/images/endfield/video-thumbnails";
  return existsSync(join(process.cwd(),root,name))
    ?"/images/endfield/video-thumbnails/"+name:undefined;
}
