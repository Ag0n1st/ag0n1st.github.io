import { getCollection } from "astro:content";

export type GuideCategory="character"|"gameplay"|"factory"|"systems"|"news";
export type GuideFeedItem={
  id:string;
  game:string;
  category:GuideCategory;
  name:string;
  titleDe:string;titleEn:string;
  summaryDe:string;summaryEn:string;
  hrefDe:string;hrefEn:string;
  listedAt:Date;
  releaseDate:Date;
  preview:boolean;
};

const categoryLabels:Record<GuideCategory,{de:string;en:string}>={
  character:{de:"Charakter",en:"Character"},
  gameplay:{de:"Gameplay",en:"Gameplay"},
  factory:{de:"Fabrik",en:"Factory"},
  systems:{de:"Systeme",en:"Systems"},
  news:{de:"News",en:"News"},
};
export const categoryLabel=(category:GuideCategory,lang:"de"|"en")=>categoryLabels[category][lang];

export const guideHref=(guide:GuideFeedItem,lang:"de"|"en")=>
  lang==="en"?guide.hrefEn:guide.hrefDe;
export const guideTitle=(guide:GuideFeedItem,lang:"de"|"en")=>
  lang==="en"?guide.titleEn:guide.titleDe;
export const guideSummary=(guide:GuideFeedItem,lang:"de"|"en")=>
  lang==="en"?guide.summaryEn:guide.summaryDe;

/**
 * All pages share the exact same feed. Guides are included automatically as
 * soon as the author gives their markdown file bilingual listing metadata.
 * Edits to a guide don't change its initial feed appearance or operator
 * release date. Only real public EN/DE URLs may appear.
 */
export async function getGuideFeed(options:{limit?:number;game?:string}={}):Promise<GuideFeedItem[]> {
  const [guides,posts]=await Promise.all([
    getCollection("operator-guides",({data})=>
      (data.status==="published"||data.status==="preview") &&
      data.listing?.visible===true),
    getCollection("posts",({data})=>!data.draft&&!!data.feed)
  ]);
  const fromGuides:GuideFeedItem[]=guides.map(({data})=>{
    const listing=data.listing!;
    const display=data.displayName??data.operator;
    return {
      id:"operator-"+data.operator,game:"endfield",name:display,
      category:listing.category,
      titleDe:display+" Guide",titleEn:display+" Guide",
      summaryDe:listing.summaryDe,summaryEn:listing.summaryEn,
      hrefDe:`/endfield/operatoren/${data.operator}/`,
      hrefEn:`/en/endfield/operators/${data.operator}/`,
      listedAt:listing.listedAt,releaseDate:listing.releaseDate,
      preview:data.status==="preview"
    };
  });
  const fromPosts:GuideFeedItem[]=posts.filter(post=>post.data.feed).map(post=>{
    const d=post.data,f=d.feed!;
    return {
      id:"post-"+post.id,game:f.game,name:d.title,category:f.category,
      titleDe:d.title,titleEn:f.titleEn,
      summaryDe:d.description,summaryEn:f.summaryEn,
      hrefDe:f.hrefDe,hrefEn:f.hrefEn,
      listedAt:f.listedAt,releaseDate:f.listedAt,preview:false
    };
  });
  return [...fromGuides,...fromPosts]
    .filter(item=>!options.game||item.game===options.game)
    .sort((a,b)=>b.listedAt.getTime()-a.listedAt.getTime()
       ||b.releaseDate.getTime()-a.releaseDate.getTime()
       ||a.name.localeCompare(b.name,"de"))
    .slice(0,options.limit??Number.POSITIVE_INFINITY);
}

/** Directory order follows actual *game* release dates, not edit timestamps. */
export async function getOperatorsByRelease(){
  const entries=await getCollection("operator-guides",({data})=>
    data.status==="published"||data.status==="preview");
  return entries.sort((a,b)=>
    (b.data.listing?.releaseDate.getTime()??0)-(a.data.listing?.releaseDate.getTime()??0)
      ||a.data.operator.localeCompare(b.data.operator,"de"));
}
