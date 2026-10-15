export interface OperatorLocale {
  operator: string;
  locale: string;
  sourceLanguage: string;
  sourceSnapshot: string;
  status: string;
  terminologyNote: string;
  operatorTerms: Record<string,string>;
  skills: Record<string,{name:string;description:string}>;
  metricLabels: Record<string,string>;
  potentials: Record<string,{name:string;effect:string}>;
  talents: Record<string,{name:string;levelEffects:string[]}>;
  requirementLabels: Record<string,string>;
  promotions: Record<string,{name:string;effect:string}>;
  materials: Record<string,string>;
}
const modules = import.meta.glob("../../data/endfield/locales/de/*.json", {
  eager: true, import: "default"
}) as Record<string,OperatorLocale>;
const locales=new Map<string,OperatorLocale>();
for(const loc of Object.values(modules)) {
  if(!loc?.operator || loc.locale!=="de")throw Error("Ungültige Operator-Lokalisierung.");
  if(locales.has(loc.operator))throw Error("Mehrfach definierte Übersetzung: "+loc.operator);
  if(["basic","battle","combo","ultimate"].some(slot=>!loc.skills?.[slot]?.description)){
    throw Error("Unvollständige deutsche Skilltexte für "+loc.operator);
  }
  locales.set(loc.operator,loc);
}
export function getOperatorLocale(slug:string, sourceSnapshot?:string):OperatorLocale|undefined {
  const loc=locales.get(slug);
  // Out-of-date translated text must not silently replace changed official data.
  if(sourceSnapshot && loc && loc.sourceSnapshot!==sourceSnapshot) return undefined;
  return loc;
}
