/**
 * Event periods are inclusive local calendar dates for the site's Europe/Berlin
 * editorial timezone, independent of the viewer's timezone or DST offset.
 */
export function berlinDayKey(instant=new Date()){
  const fields=Object.fromEntries(new Intl.DateTimeFormat("en-GB",{
    timeZone:"Europe/Berlin",year:"numeric",month:"2-digit",day:"2-digit"
  }).formatToParts(instant).filter(part=>part.type!=="literal").map(part=>[part.type,part.value]));
  return fields.year+"-"+fields.month+"-"+fields.day;
}
export function eventState(event,today=berlinDayKey()){
  if(event.endsOn<today)return "archived";
  if(event.startsOn>today)return "upcoming";
  return "active";
}
export function partitionLeaderboardEvents(events,today=berlinDayKey()){
  const active=[],archived=[],upcoming=[];
  for(const event of events){
    const state=eventState(event,today);
    if(state==="active")active.push(event);
    else if(state==="archived")archived.push(event);
    else upcoming.push(event);
  }
  active.sort((a,b)=>b.startsOn.localeCompare(a.startsOn)||a.id.localeCompare(b.id));
  archived.sort((a,b)=>b.endsOn.localeCompare(a.endsOn)||a.id.localeCompare(b.id));
  upcoming.sort((a,b)=>a.startsOn.localeCompare(b.startsOn)||a.id.localeCompare(b.id));
  return {active,archived,upcoming};
}
