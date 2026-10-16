/**
 * Audited source-data correction for a specific SKPORT item.
 *
 * The 2026-10-15 equipment-details.json snapshot assigns Gear 1138
 * (Eternal Xiranite Hands) to "Kit", while the individually named
 * Gloves slot is established by the Talos Wiki, Prydwen and Endfield Hub.
 * Keep the original imported JSON immutable; apply the explicit correction
 * at the shared accessor boundary until the upstream import is repaired.
 *
 * References:
 * https://endfield.wiki.gg/wiki/Eternal_Xiranite_Hands
 * https://www.prydwen.gg/arknights-endfield/gear
 * https://endfieldhub.org/database/gears
 */
export function normalizeOfficialGearSlot(record) {
  if (record?.id === "1138" &&
      record.name === "Eternal Xiranite Hands" &&
      record.gearSlot === "Kit") {
    return {...record, gearSlot: "Gloves"};
  }
  return record;
}
