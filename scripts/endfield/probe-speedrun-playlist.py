#!/usr/bin/env python3
import re,urllib.request
id="PLVTPc82MPn3E"
urls=[
 "https://www.youtube.com/playlist?list="+id,
 "https://www.youtube.com/feeds/videos.xml?playlist_id="+id,
 "https://music.youtube.com/playlist?list="+id,
]
for url in urls:
 try:
  req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36","Accept-Language":"en-US,en;q=0.9"})
  with urllib.request.urlopen(req,timeout=15) as response:
   data=response.read(3_500_000).decode("utf-8","replace")
   print({"url":url,"status":response.status,"finalUrl":response.url,"bytes":len(data),"playlistVideoRenderer":data.count("playlistVideoRenderer"),"videoRenderer":data.count("videoRenderer"),"lockupViewModel":data.count("lockupViewModel"),"ytInitialData":data.count("ytInitialData"),"playlistId":data.count(id),"videoIdFields":data.count('"videoId"'),"htmlTitle":re.findall(r"<title>([^<]+)</title>",data)[:1]})
   if "www.youtube.com/playlist" in url:
    markers=[x.start() for x in re.finditer(r'"lockupViewModel"\\s*:\\s*\\{',data)]
    print("LOCKUP_OBJECTS",len(markers))
    for i,pos in enumerate(markers[:4]):print("LOCKUP_SAMPLE",i,data[pos:pos+2100])
    for token in ["lockupViewModel", "playlistVideoRenderer", "playlistPanelVideoRenderer", "publishedTimeText", "lockupMetadataViewModel", "videoInfo", "contentId", "dateText", "playlistHeaderRenderer"]:
     print("TOKEN",token,"COUNT",data.count(token),"SNIPPET",data[data.find(token)-110:data.find(token)+720] if token in data else "")
 except Exception as e:print({"url":url,"error":str(e)[:250]})
