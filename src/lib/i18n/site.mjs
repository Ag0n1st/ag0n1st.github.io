/** Static, mutually verified translations. Do not add hreflang to absent pages. */
export const SITE_ORIGIN="https://ag0n1st.com";
export const EN_PAGES=Object.freeze({
  "/":"/en/",
  "/about/":"/en/about/",
  "/nte/":"/en/nte/",
  "/endfield/":"/en/endfield/",
  "/endfield/operatoren/":"/en/endfield/operators/",
  "/endfield/operatoren/si/":"/en/endfield/operators/si/",
  "/endfield/operatoren/typhoeus/":"/en/endfield/operators/typhoeus/",
  "/endfield/operatoren/liino/":"/en/endfield/operators/liino/",
});
const pair=Object.entries(EN_PAGES);
export const normalizePath=path=>{
  if(!path||!path.startsWith("/")||path.startsWith("//"))throw Error("Invalid localized route");
  return path.endsWith("/")?path:path+"/";
};
export const englishPath=path=>EN_PAGES[normalizePath(path)]??null;
export const germanPath=path=>pair.find(([,en])=>en===normalizePath(path))?.[0]??null;
export const availableCounterpart=(path,locale)=>locale==="en"?germanPath(path):englishPath(path);
export function localizedUrl(path){
  const canonical=normalizePath(path);
  return SITE_ORIGIN+canonical;
}
export function alternateLinks(path){
 const current=normalizePath(path);
 const counterpart=englishPath(current)||germanPath(current);
 if(!counterpart)return [];
 const de=germanPath(current)??current;
 const en=englishPath(current)??current;
 return [{lang:"de",href:localizedUrl(de)},{lang:"en",href:localizedUrl(en)},{lang:"x-default",href:localizedUrl(de)}];
}
