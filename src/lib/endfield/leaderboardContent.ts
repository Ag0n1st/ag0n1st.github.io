import {getCollection} from "astro:content";
import {featuredBosses} from "./threatCatalog";
import operatorArtwork from "../../data/endfield/catalog/operator-official-artwork.json";
import {validateLeaderboardEntries} from "./leaderboardContentValidation.mjs";

export async function loadLeaderboardContent(){
  const [eventEntries,runEntries]=await Promise.all([
    getCollection("leaderboard-events"),
    getCollection("leaderboard-runs")
  ]);
  const events=eventEntries.map(entry=>({
    ...entry.data,
    id:entry.data.eventId,
    slug:entry.slug
  }));
  const runs=runEntries.map(entry=>({
    ...entry.data,
    id:entry.data.runId,
    link:entry.data.video,
    linkKind:"video" as const,
    slug:entry.slug
  }));
  validateLeaderboardEntries({
    events,runs,
    bossSlugs:featuredBosses.map(boss=>boss.slug),
    operatorSlugs:operatorArtwork.items.map(item=>item.slug)
  });
  // Drafts are valid editable files, never public rankings.
  const verifiedRuns=runs
    .filter(run=>run.status==="verified")
    .map(({slug,video,runId,...run})=>run);
  const publishedEvents=events
    .map(({slug,eventId,...event})=>event)
    .sort((a,b)=>b.startsOn.localeCompare(a.startsOn)||a.id.localeCompare(b.id));
  return {events:publishedEvents,verifiedRuns};
}
