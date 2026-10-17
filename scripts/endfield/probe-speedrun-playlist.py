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
    markers=[m.start() for m in re.finditer('lockupViewModel',data) if data[m.start()-1:m.start()+20].startswith('"lockupViewModel":{')]
    print("LOCKUP_OBJECTS",len(markers))
    for i,pos in enumerate(markers[:4]):print("LOCKUP_SAMPLE",i,data[pos:pos+2100])
    for token in ["lockupViewModel", "playlistVideoRenderer", "playlistPanelVideoRenderer", "publishedTimeText", "lockupMetadataViewModel", "videoInfo", "contentId", "dateText", "playlistHeaderRenderer"]:
     print("TOKEN",token,"COUNT",data.count(token),"SNIPPET",data[data.find(token)-110:data.find(token)+720] if token in data else "")
 except Exception as e:print({"url":url,"error":str(e)[:250]})


for video in ["qSIktISsLPQ","uixHyNlbwAQ","Zw8B2F2nJP8"]:
 for u in ["https://www.youtube.com/watch?v="+video,"https://www.youtube.com/results?search_query="+video]:
  try:
   with urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36","Accept-Language":"en-US,en;q=0.9"}),timeout=13) as h:
    text=h.read(2_500_000).decode("utf-8","replace")
    print("VIDEO_META",{"id":video,"url":u,"status":h.status,"length":len(text),"title":re.findall(r"<title>([^<]+)</title>",text)[:1],"publishDate":re.findall(r'"publishDate":"([^"]+)"',text)[:2],"datePublished":re.findall(r'"datePublished":"([^"]+)"',text)[:2],"uploadDate":re.findall(r'"uploadDate":"([^"]+)"',text)[:2],"publishedTimeTextCount":text.count("publishedTimeText"),"videoRendererCount":text.count("videoRenderer")})

    if "results?search_query=" in u:
     for match in list(re.finditer('"videoRenderer":{',text))[:35]:
      block=text[match.start():match.start()+5000]
      if video in block[:1800]:
       print("VIDEO_MATCH",video,{"start":match.start(),"timeText":re.findall(r'"publishedTimeText":\\{"simpleText":"([^"]+)"',block)[:2],"timeTextNearby":block.find("publishedTimeText"),"title":re.findall(r'"title":\\{"runs":\\[\\{"text":"([^"]+)"',block)[:2]})
  except Exception as e:print("VIDEO_META_ERROR",video,u,str(e)[:160])
