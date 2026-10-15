import { existsSync } from "node:fs";
import { join } from "node:path";

// Use repository assets when available. A CDN URL is only a transitional
// fallback; all published HTML remains fully static and requires no database.
export function getOperatorImageUrl(
  slug: string,
  asset: "cover" | "illustration" | "skill-basic" | "skill-battle" | "skill-combo" | "skill-ultimate",
  publicRemoteUrl?: string
): string | undefined {
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return publicRemoteUrl;
  const location=asset.startsWith("skill-")?"skills/"+asset:asset;
  const base="/images/endfield/operators/"+slug+"/"+location;
  for(const ext of [".png",".webp",".jpg",".jpeg"]){
    if(existsSync(join(process.cwd(),"public",base.slice(1)+ext))){
      return base+ext;
    }
  }
  return publicRemoteUrl;
}
