// The Package catalogue is intentionally separate from official SKPORT numeric item IDs.
// Names are approved in-game translations; peak ranges/tiers are editorial.
import packageCatalog from "./catalog/packages.json" with {type:"json"};
export const elasticGoodsSource = {
 primary: "Elastic Goods + Price Peaks reference image provided in chat",
 community: "Community-maintained observed-maxima image provided in chat",
 verifiedOfficialItemIds: false,
 packagesWiki: packageCatalog.source.url
};
export const elasticPeakRanges = [
 {id:"low",label:"LOW PEAK",valueDe:"4.600–4.800",valueEn:"4,600–4,800",
  descriptionDe:"Höchster Peak dieser Waren: Low. Sie erreichen keinen Mid- oder High-Peak.",
  descriptionEn:"These goods peak at Low. They cannot reach a Mid or High Peak."},
 {id:"mid",label:"MID PEAK",valueDe:"4.800–5.100",valueEn:"4,800–5,100",
  descriptionDe:"Höchster Peak dieser Waren: Mid. Davor sind auch niedrigere Peaks möglich.",
  descriptionEn:"These goods peak at Mid. Lower peaks are also possible along the way."},
 {id:"high",label:"HIGH PEAK",valueDe:"5.100–5.500",valueEn:"5,100–5,500",
  descriptionDe:"Höchster Peak dieser Waren: High. Sie können zuvor auch Low- oder Mid-Peaks erreichen.",
  descriptionEn:"These goods peak at High. They can also reach Low or Mid Peaks first."}
];
export const elasticGoods = packageCatalog.items.map(x=>({
 id:x.id,de:x.nameDe,en:x.nameEn,peak:x.peak,region:x.region,
 evidence:x.evidence,iconPath:x.iconPath,cacheStatus:x.cacheStatus
}));
