import full from "../../data/i18n/en-guide-content.json";
import type { CollectionEntry } from "astro:content";

type Guide = CollectionEntry<"operator-guides">["data"];
type EnglishSnapshot = { guides:Record<string,Partial<Guide>> };
const snapshot=full as EnglishSnapshot;

/** Only prose changes by language; all layout data, numeric stats, IDs,
 * unlock conditions, build rankings, team composition and URLs remain
 * literally those of the original validated German guide.
 */
const PROSE_KEYS=new Set([
  "summary","strengths","weaknesses","accessibilityNote","playstyle",
  "basic","battle","combo","ultimate","evaluation","comparisonConditions",
  "generalNotes","title","metaSummary","storyUnlock","teamContext",
  "craftingNotes","setBonusNotes","note","introduction","explanation",
  "description","rotationAndTips","verdict","pullAdvice","closingNote",
  "recommendedFor","skipIf","sourceNote",
]);
function mergeEditorial(base:unknown,english:unknown,key:string,context:string):unknown {
  if(english===undefined)return base;
  if(typeof base==="string"){
    return PROSE_KEYS.has(key)&&typeof english==="string"?english:base;
  }
  if(Array.isArray(base)){
    if(!Array.isArray(english)||english.length!==base.length)
      throw new Error("EN translation changed guide structure: "+context);
    return base.map((item,index)=>mergeEditorial(item,english[index],key,context+"."+index));
  }
  if(base&&typeof base==="object"&&!Array.isArray(base)){
    if(!english||typeof english!=="object"||Array.isArray(english))
      throw new Error("Invalid EN guide section: "+context);
    const translated=english as Record<string,unknown>;
    return Object.fromEntries(
      Object.entries(base as Record<string,unknown>).map(([child,value])=>[
        child,mergeEditorial(value,translated[child],child,context+"."+child)
      ])
    );
  }
  return base;
}

export function localizeOperatorGuide(source:Guide,lang:"de"|"en"):Guide {
  if(lang==="de")return source;
  const overlay=snapshot.guides[source.operator];
  if(!overlay)throw new Error("Missing English guide content: "+source.operator);
  const result=structuredClone(source) as Record<string,unknown>;
  for(const section of ["overview","operatorKit","skills","weapons","equipment",
    "potentials","teams","gameplay","conclusion","guideVideo"] as const) {
    if(!overlay[section])throw new Error("Missing English section "+section+" / "+source.operator);
    result[section]=mergeEditorial(result[section],overlay[section],section,source.operator+"."+section);
  }
  // The original video is German, regardless of which article locale embeds it.
  const video=overlay.guideVideo?.title;
  if(typeof video==="string"&&video.trim())
    (result.guideVideo as Record<string,unknown>).title=video;
  return result as Guide;
}
