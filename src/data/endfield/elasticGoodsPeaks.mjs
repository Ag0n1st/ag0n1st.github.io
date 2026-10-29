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
  descriptionDe:"Auch ein Low Peak ist ein sinnvoller Verkaufszeitpunkt. Ein höherer Peak ist keine Pflicht.",
  descriptionEn:"Low Peak is already a valid time to sell. Waiting for a higher peak is optional."},
 {id:"mid",label:"MID PEAK",valueDe:"4.800–5.100",valueEn:"4,800–5,100",
  descriptionDe:"Mehr Verkaufspotenzial für Waren dieser Kategorie, wenn du geduldig bleiben möchtest.",
  descriptionEn:"More sale potential for goods in this tier if you choose to hold."},
 {id:"high",label:"HIGH PEAK",valueDe:"5.100–5.500",valueEn:"5,100–5,500",
  descriptionDe:"Die höchsten Peak-Bereiche im Vergleich. Ansparen lohnt sich, ist aber kein Muss.",
  descriptionEn:"The highest peak tier. Saving these goods for later is worthwhile, but optional."}
];
export const elasticGoods = packageCatalog.items.map(x=>({
 id:x.id,de:x.nameDe,en:x.nameEn,peak:x.peak,region:x.region,
 evidence:x.evidence,iconPath:x.iconPath,cacheStatus:x.cacheStatus
}));
