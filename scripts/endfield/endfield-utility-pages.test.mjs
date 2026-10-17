import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {CURRENT_VERSION} from "../../src/data/endfield/versionCountdown.mjs";
import {SPEEDRUN_PLAYLIST_ID} from "../../src/data/endfield/speedrunPlaylist.mjs";
import {parseSpeedrunPlaylist,parseSpeedrunPlaylistPage} from "../../src/lib/content/speedrunFeed.mjs";
const read=p=>readFileSync(p,"utf8");

test("manual 1.6 Protocol Pass cutoff has editor-friendly Markdown and Berlin midnight",()=>{
 const md=read("src/data/endfield/version-countdown.md");
 assert.match(md,/version: "1[.]6"/);
 assert.equal(CURRENT_VERSION.status,"estimated");
 assert.equal(new Date(CURRENT_VERSION.endsAt).toISOString(),"2026-11-25T23:00:00.000Z");
 assert.equal(new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Berlin",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(CURRENT_VERSION.endsAt)),"26/11/2026, 00:00");
 assert.match(CURRENT_VERSION.sourceLabelDe,/Protokoll-Pass/);
 assert.match(CURRENT_VERSION.sourceLabelEn,/Protocol Pass/);
 assert.doesNotMatch(read("src/components/endfield/VersionCountdown.astro"),/sourceUrl|Community-Versionskalender/);
});
test("shared countdown and speedrun components are used by BOTH languages",()=>{
  for(const area of ["countdown","speedruns"]){
    const de=read("src/pages/endfield/"+area+"/index.astro"),en=read("src/pages/en/endfield/"+area+"/index.astro");
    assert.match(de,area==="countdown"?/VersionCountdown/:/SpeedrunsPage/);
    assert.match(en,area==="countdown"?/VersionCountdown/:/SpeedrunsPage/);
    assert.match(de,/lang="de"/);assert.match(en,/lang="en"/);
  }
});
test("unfinished nav states and tierlist order match shared language data",()=>{
  const nav=read("src/components/EndfieldNav.astro");
  const keys=[...nav.matchAll(/key: "([^"]+)"/g)].map(x=>x[1]);
  assert.equal(keys[keys.indexOf("checklist")+1],"tierlist");
  assert.equal(keys[keys.indexOf("tierlist")+1],"countdown");
  for(const key of ["factory","recruitment","refinement","essences","checklist","tierlist"])
    assert.match(nav,new RegExp('upcoming=new Set\\(\\[[^\\]]*"'+key+'"'));
  assert.match(read("src/components/pages/EndfieldHome.astro"),/09 \/ TIERLIST/);
  assert.match(read("src/components/pages/EndfieldHome.astro"),/10 \/ PATCH-COUNTDOWN/);
});
test("YouTube playlist is not guessed and never invents speedruns",()=>{
  assert.equal(SPEEDRUN_PLAYLIST_ID,"PLVTPc82MPn3E");
  const feed='<feed><entry><yt:videoId>abcdefghijk</yt:videoId><title>Run &amp; Test</title><published>2026-10-01T12:00:00+00:00</published></entry><entry><yt:videoId>abcdefghijk</yt:videoId><title>Duplicate</title></entry></feed>';
  const parsed=parseSpeedrunPlaylist(feed);
  assert.equal(parsed.length,1);
  assert.equal(parsed[0].title,"Run & Test");
  assert.equal(parsed[0].href,"https://www.youtube.com/watch?v=abcdefghijk");
  const page=read("src/components/endfield/SpeedrunsPage.astro");
  assert.doesNotMatch(page,/data-relative-time|<time|function relative/);
  assert.doesNotMatch(read("src/lib/content/speedrunFeed.mjs"),/resolvePublishDate/);
});
test("latest guide backgrounds only use locally verified art in a specific operator folder",()=>{
 const component=read("src/components/GuideTeaserCard.astro");
 assert.match(component,/existsSync/);
 assert.match(component,/banner\.webp/);
 assert.match(component,/cover\.webp/);
 assert.match(component,/guide-teaser-art/);
});

test("updated guide visual design retains splash and uses approved image variants",()=>{
 assert.match(read("src/components/GuideTeaserCard.astro"),/guide-category-icon/);
 assert.match(read("src/components/operator/sections/OperatorOverview.astro"),/profileBanner/);
 assert.match(read("src/components/operator/sections/OperatorPotentials.astro"),/data-guide-disclosure="recruitment-splash"/);
 assert.match(read("src/lib/endfield/operatorGuideModel.ts"),/official-icon/);
 assert.match(read("src/components/pages/OperatorIndex.astro"),/official-portrait/);
 assert.match(read("src/components/EndfieldNav.astro"),/nav-upcoming-wrench/);
});

test("YouTube HTML fallback extracts only real playlist video lockups, not suggested videos",()=>{
 const entry=(id,title)=>JSON.stringify({lockupViewModel:{contentId:id,contentType:"LOCKUP_CONTENT_TYPE_VIDEO",metadata:{lockupMetadataViewModel:{title:{content:title}}}}});
 const html='<script>'+entry("qSIktISsLPQ","Official Speedrun")+'</script><script>'+entry("uixHyNlbwAQ","Second Run")+'</script>';
 const videos=parseSpeedrunPlaylistPage(html);
 assert.equal(videos.length,2);
 assert.deepEqual(videos.map(x=>x.id),["qSIktISsLPQ","uixHyNlbwAQ"]);
 assert.equal(videos[0].title,"Official Speedrun");
 assert.equal(parseSpeedrunPlaylistPage('{\"videoRenderer\":{\"videoId\":\"aaaaaaaaaaa\"}}').length,0);
});

test("partner artwork is always square, using locally cached 1:1 icon assets",()=>{
  const css=read("src/styles/operator-guides.css");
  assert.match(css,/\.op-quick-partners-card \.op-partner-art\s*\{/);
  assert.match(css,/aspect-ratio:1\/1/);
  assert.match(css,/max-height:none/);
});
