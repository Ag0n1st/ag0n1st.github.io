import {getCollection} from "astro:content";
import {SITE_ORIGIN,EN_PAGES,localizedUrl} from "../lib/i18n/site.mjs";
const routes=[
 "/","/about/","/nte/","/endfield/","/endfield/operatoren/",
 "/endfield/tierlist/","/endfield/operator-roulette/","/endfield/fabrik/","/endfield/cheatsheets/",
 "/endfield/speedruns/","/endfield/checkliste/","/endfield/endfieldle/","/endfield/countdown/"
];
const escapeXml=(x:string)=>x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
export async function GET(){
 const guides=await getCollection("operator-guides",({data})=>data.status==="published");
 const published=new Set(guides.map(x=>x.data.operator));
 for(const guide of guides)routes.push(`/endfield/operatoren/${guide.data.operator}/`);
 // Preview guides deliberately excluded from the sitemap, in BOTH languages.
 const posts=await getCollection("posts",({data})=>!data.draft);
 for(const post of posts)routes.push("/posts/"+post.id.replace(/\.md$/i,"")+"/");
 const all=new Set(routes);
 for(const [de,en] of Object.entries(EN_PAGES)){
   if(!all.has(de))continue;
   const matched=/^\/endfield\/operatoren\/([^/]+)\/$/.exec(de);
   if(matched && !published.has(matched[1]))continue;
   all.add(en);
 }
 const body='<?xml version="1.0" encoding="UTF-8"?>\n'
  +'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  +[...all].sort().map(path=>`  <url><loc>${escapeXml(localizedUrl(path))}</loc></url>`).join("\n")
  +"\n</urlset>\n";
 return new Response(body,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=86400"}});
}
