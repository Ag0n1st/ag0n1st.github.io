// Editorial reference from the two owner-provided Price Peaks charts (28 Oct 2026).
// These Elastic Goods packages are NOT in the existing SKPORT items.json snapshot.
// Avoid assigning fictional SKPORT IDs or borrowing unrelated icons.
// Peaks classify goods by their observed price tier, not by a universal exact sell threshold.
export const elasticGoodsSource = {
  primary: "Elastic Goods + Price Peaks reference image provided in chat",
  community: "Community-maintained observed-maxima image provided in chat",
  verifiedOfficialItemIds: false
};

export const elasticPeakRanges = [
  {
    id: "low",
    label: "LOW PEAK",
    valueDe: "ca. 4.600–4.800",
    valueEn: "approx. 4,600–4,800",
    descriptionDe: "Auch hier lohnt sich der Verkauf bereits. Ein niedrigerer Peak ist kein Fehlverkauf.",
    descriptionEn: "A valid selling point already. A lower peak does not mean a bad sale."
  },
  {
    id: "mid",
    label: "MID PEAK",
    valueDe: "ca. 4.900–5.100",
    valueEn: "approx. 4,900–5,100",
    descriptionDe: "Höheres Verkaufspotenzial. Wer warten möchte, kann gezielt nach diesen Waren schauen.",
    descriptionEn: "Higher potential sale value. A good option when you want to hold goods longer."
  },
  {
    id: "high",
    label: "HIGH PEAK",
    valueDe: "ca. 5.100–5.500+",
    valueEn: "approx. 5,100–5,500+",
    descriptionDe: "Die höheren beobachteten Spitzen. Am längsten zu halten ist eine Option, keine Pflicht.",
    descriptionEn: "The higher observed peaks. Holding for these is optional, never mandatory."
  }
];

// Names in the original reference are kept in English when there is no
// verified German in-game label. German names in the community sheet are
// transcribed; English equivalents are editorial translations only.
// Previous reference names (Movies, Tincture, Pears, Nymphsprout, etc.)
// are consolidated with their corresponding newer community examples.
export const elasticGoods = [
  {id:"kitchenware", de:"Kitchenware", en:"Kitchenware", peak:"low", region:"valley", evidence:"reference"},
  {id:"dangles", de:"Dangles", en:"Dangles", peak:"low", region:"valley", evidence:"reference"},
  {id:"drill", de:"Drill", en:"Drill", peak:"low", region:"valley", evidence:"reference"},
  {id:"war-tins", de:"War Tins", en:"War Tins", peak:"low", region:"valley", evidence:"reference"},
  {id:"wuxia-movies", de:"Wuxia-Filme [Paket]", en:"Wuxia Movies [Pack]", peak:"low", region:"wuling", evidence:"community"},
  {id:"eureka-tincture", de:"Eureka-Anti-Rauch-Tinktur [Paket]", en:"Eureka Anti-Smoke Tincture [Pack]", peak:"low", region:"wuling", evidence:"community"},
  {id:"wuling-peas", de:"Wuling-Tiefkühlerbsen [Paket]", en:"Wuling Frozen Peas [Pack]", peak:"low", region:"wuling", evidence:"community"},
  {id:"nymphsprout", de:"Nymphenspross [Paket]", en:"Nymphsprout [Pack]", peak:"low", region:"wuling", evidence:"community"},
  {id:"fillets", de:"Fillets", en:"Fillets", peak:"mid", region:"valley", evidence:"reference"},
  {id:"syrup", de:"Syrup", en:"Syrup", peak:"mid", region:"valley", evidence:"reference"},
  {id:"knucklebones", de:"Knucklebones", en:"Knucklebones", peak:"mid", region:"valley", evidence:"reference"},
  {id:"crystals", de:"Crystals", en:"Crystals", peak:"mid", region:"valley", evidence:"reference"},
  {id:"xiranite-filter-cores", de:"Xiranit-Filterkerne [Paket]", en:"Xiranite Filter Cores [Pack]", peak:"mid", region:"wuling", evidence:"community"},
  {id:"aero-receiver", de:"Aero-Empfänger [Paket]", en:"Aero Receiver [Pack]", peak:"mid", region:"wuling", evidence:"community"},
  {id:"qingbo-rafts", de:"Qingbo-Flöße [Paket]", en:"Qingbo Rafts [Pack]", peak:"mid", region:"wuling", evidence:"community"},
  {id:"xiranite-fireworks", de:"Xiranit-farbene Feuerwerkskörper [Paket]", en:"Xiranite-Coloured Fireworks [Pack]", peak:"mid", region:"wuling", evidence:"community"},
  {id:"chubby-lung-tianshi", de:"Chubby-Lung-Tianshi [Paket]", en:"Chubby-Lung Tianshi [Pack]", peak:"mid", region:"wuling", evidence:"community"},
  {id:"saplings", de:"Saplings", en:"Saplings", peak:"high", region:"valley", evidence:"reference"},
  {id:"pickaxes", de:"Pickaxes", en:"Pickaxes", peak:"high", region:"valley", evidence:"reference"},
  {id:"helmets", de:"Helmets", en:"Helmets", peak:"high", region:"valley", evidence:"reference"},
  {id:"toy-blocks", de:"Toy Blocks", en:"Toy Blocks", peak:"high", region:"valley", evidence:"reference"},
  {id:"xiranite-bridge", de:"Xiranit-Brücke [Paket]", en:"Xiranite Bridge [Pack]", peak:"high", region:"wuling", evidence:"community"},
  {id:"swordmancer-forge", de:"Schwertkämpferschmiede [Paket]", en:"Swordmancer Forge [Pack]", peak:"high", region:"wuling", evidence:"community"},
  {id:"borderstone-stopper", de:"Grenzstein-Stopper [Paket]", en:"Borderstone Stopper [Pack]", peak:"high", region:"wuling", evidence:"community"},
  {id:"chubby-lung-balloon", de:"Chubby-Lung-Wetterballon [Paket]", en:"Chubby-Lung Weather Balloon [Pack]", peak:"high", region:"wuling", evidence:"community"}
];
