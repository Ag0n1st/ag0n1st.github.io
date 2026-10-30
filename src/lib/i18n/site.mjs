/** Every public page has an equivalent language route; no language reset on navigation. */
export const SITE_ORIGIN="https://ag0n1st.com";
export const EN_PAGES=Object.freeze({
  "/":"/en/",
  "/about/":"/en/about/",
  "/nte/":"/en/nte/",
  "/endfield/":"/en/endfield/",
  "/endfield/operatoren/":"/en/endfield/operators/",
  "/endfield/tierlist/":"/en/endfield/tierlist/",
  "/endfield/operator-roulette/":"/en/endfield/operator-roulette/",
  "/endfield/fabrik/":"/en/endfield/factory/",
  "/endfield/rekrutierung/":"/en/endfield/recruitment/",
  "/endfield/veredelung/":"/en/endfield/refinement/",
  "/endfield/essenzen/":"/en/endfield/essences/",
  "/endfield/speedruns/":"/en/endfield/speedruns/",
  "/endfield/leaderboard/":"/en/endfield/leaderboard/",
  "/endfield/cheatsheets/":"/en/endfield/cheatsheets/",
  "/endfield/checkliste/":"/en/endfield/checklist/",
  "/endfield/endfieldle/":"/en/endfield/endfieldle/",
  "/endfield/countdown/":"/en/endfield/countdown/",
  "/endfield/operatoren/si/":"/en/endfield/operators/si/",
  "/endfield/operatoren/typhoeus/":"/en/endfield/operators/typhoeus/",
  "/endfield/operatoren/liino/":"/en/endfield/operators/liino/"
});
const reverse=new Map(Object.entries(EN_PAGES).map(([de,en])=>[en,de]));
export const normalizePath=path=>{
 if(!path||!path.startsWith("/")||path.startsWith("//"))throw Error("Invalid localized route");
 return path.endsWith("/")?path:path+"/";
};
export const englishPath=path=>{
 const full=normalizePath(path);
 return EN_PAGES[full] ?? (full.startsWith("/posts/")?"/en"+full:null);
};
export const germanPath=path=>{
 const full=normalizePath(path);
 return reverse.get(full)??(full.startsWith("/en/posts/")?full.slice(3):null);
};
export const availableCounterpart=(path,locale)=>locale==="en"?germanPath(path):englishPath(path);
export const localizedUrl=path=>SITE_ORIGIN+normalizePath(path);
export function alternateLinks(path){
 const current=normalizePath(path);
 const counterpart=englishPath(current)||germanPath(current);
 if(!counterpart)return [];
 const de=germanPath(current)??current;
 const en=englishPath(current)??current;
 return [{lang:"de",href:localizedUrl(de)},{lang:"en",href:localizedUrl(en)},{lang:"x-default",href:localizedUrl(de)}];
}
