/**
 * Partners on an operator's overview are the unique OTHER operators from
 * editorially published Meta team lineups. Transition/alternate teams do not
 * enter the quick overview; the full Teams section lists those options.
 * Preserve first-appearance order. Never list the guide operator itself.
 */
export function getMetaPartnerIds(metaTeams, operatorSlug) {
  const known = new Set();
  const result = [];
  for (const team of metaTeams ?? []) {
    for (const slug of team?.members ?? []) {
      if (typeof slug !== "string" || slug === operatorSlug || known.has(slug))
        continue;
      known.add(slug);
      result.push(slug);
    }
  }
  return result;
}
