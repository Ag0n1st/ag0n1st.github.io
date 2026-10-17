#!/usr/bin/env python3
"""Read-only, anonymous probe. No images downloaded/committed. Do not log account/session data."""
import asyncio, hashlib, json, re
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from playwright.async_api import async_playwright

OPERATORS = ["Si","Argent Flow","Endministrator","Perlica","Chen Qianyu","Typhoeus",
 "Purrchena","Arcane","Liino","Mi Fu","Camille","Zhuang Fangyi","Tangtang","Rossi",
 "Laevatain","Yvonne","Gilberta","Ardelia","Ember","Last Rite","Lifeng","Pogranichnik",
 "Alesh","Arclight","Avywenna","Da Pan","Snowshine","Wulfgard","Xaihi","Akekuri",
 "Antal","Catcher","Estella","Fluorite"]

def sample_http(url):
 try:
  with urlopen(Request(url, headers={"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stFanSite/1.0)"}),timeout=15) as resp:
   body=resp.read(256)
   return {"status":resp.status,"type":resp.headers.get("content-type"),"length":resp.headers.get("content-length"),"prefix":body[:50].decode("ascii","replace") if "text" in str(resp.headers.get("content-type")) else ""}
 except HTTPError as e:return {"status":e.code,"error":"HTTP"}
 except (URLError,TimeoutError) as e:return {"error":type(e).__name__}

async def main():
 print("WIKI_HTTP_SAMPLES")
 for person in ["Si","Liino","Typhoeus","Ember","Argent Flow","Endministrator","Tangtang"]:
  target="https://endfield.wiki.gg/wiki/"+person
  try:
   with urlopen(Request(target,headers={"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stGuidePortal/1.0)"}),timeout=22) as reply:html=reply.read().decode("utf-8","replace")
   meta=re.findall(r'<meta[^>]*(?:og:image|twitter:image)[^>]*>',html,re.I)[:3]
   infobox=re.findall(r'<img[^>]*>',html)
   infobox=[tag[:420] for tag in infobox if ('/'+person.lower() in tag.lower() or person.lower() in tag.lower() or "infobox" in tag.lower())][:10]
   print("WIKI_PAGE_IMAGES",json.dumps({"person":person,"htmlChars":len(html),"meta":meta,"images":infobox},ensure_ascii=False))
  except Exception as e:print("WIKI_PAGE_IMAGES_ERROR",person,type(e).__name__)

 with urlopen(Request("https://endfield.gryphline.com/en-us/operator",headers={"User-Agent":"Mozilla/5.0"}),timeout=30) as resp:
  raw=resp.read().decode("utf-8","replace")
 print("OFFICIAL_RAW_HTML",json.dumps({"length":len(raw),"jsspsi":raw.count("jsspsi"),"media":raw.count("_next/static/media/"),"samples":re.findall(r".{0,100}jsspsi.{0,160}",raw)[:6]},ensure_ascii=False))
 for f in ["Ember.png","Ember Splash Art.png"]:
  canon=f.replace(" ","_")
  md5=hashlib.md5(canon.encode()).hexdigest()
  paths=[f"https://endfield.wiki.gg/wiki/Special:Redirect/file/{canon}",
         f"https://endfield.wiki.gg/images/{md5[0]}/{md5[:2]}/{canon}"]
  for u in paths:print(json.dumps({"url":u,**sample_http(u)}))
 for u in ["https://endfield.wiki.gg/wiki/Ember","https://endfield.wiki.gg/api.php?action=parse&page=Ember&prop=text&format=json"]:
  print(json.dumps({"url":u,**sample_http(u)}))
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  page=await browser.new_page(viewport={"width":1440,"height":900})
  await page.goto("https://endfield.gryphline.com/en-us/operator",wait_until="domcontentloaded",timeout=90000)
  await page.wait_for_timeout(3500)
  data=await page.evaluate("""(names)=>{
    const nameSet=new Set(names);const result=[];
    const images=[...document.querySelectorAll('img')];
    for(const img of images){
      let context='',depth=0;
      for(let node=img.parentElement;node && depth<9;node=node.parentElement,depth++){
        const txt=(node.innerText||'').trim().replace(/\\s+/g,' ');
        const matches=names.filter(n=> new RegExp('(^|[^\\p{L}])'+n.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g,'\\\\$&')+'([^\\p{L}]|$)','iu').test(txt));
        if(matches.length===1){context=matches[0];break;}
      }
      const raw=img.currentSrc||img.getAttribute('src')||'';
      const srcset=img.getAttribute('srcset')||'';
      result.push({operator:context,src:raw.slice(0,240),srcset:srcset.slice(0,180),
        alt:(img.alt||'').slice(0,80),width:img.naturalWidth,height:img.naturalHeight,
        lazy:img.loading,section:(img.closest('section')?.className||'').toString().slice(0,80)});
    }
    return {title:document.title,images:result,operatorsPresent:names.filter(x=>document.body.innerText.includes(x))};
  }""",OPERATORS)
  from collections import Counter
  print("OFFICIAL_PAGE_SUMMARY",json.dumps({"title":data["title"],"images":len(data["images"]),"names":len(data["operatorsPresent"]),"matched":dict(Counter(x["operator"] for x in data["images"] if x["operator"]))}))
  print("OFFICIAL_PAGE_IMAGE_SAMPLES",json.dumps(data["images"][:70],ensure_ascii=False))
  styles=await page.evaluate("""(names)=>{
    let all=[...document.querySelectorAll('*')],results=[];
    for(const el of all){
      const computed=getComputedStyle(el);
      const urls=[computed.backgroundImage,el.getAttribute('style')||'',el.getAttribute('data-src')||''];
      for(const url of urls){
        if(url && (url.includes('media/') || url.includes('.png') || url.includes('.webp'))){
          const txt=(el.innerText||'').replace(/\\s+/g,' ').slice(0,150);
          const self=(el.outerHTML||'').slice(0,240);
          results.push({tag:el.tagName,cls:String(el.className||'').slice(0,90),txt,url:url.slice(0,270),self});
          break;
        }
      }
      if(results.length>=125)break;
    }
    return {elements:all.length,results};
  }""",OPERATORS)
  print("OFFICIAL_COMPUTED_STYLES",json.dumps(styles,ensure_ascii=False)[:18500])
  card_info=await page.evaluate("""()=>{
    return [...document.querySelectorAll('[class*="OperatorItem_operatorItem__"]')].map((card,i)=>({
      i,label:(card.innerText||'').replace(/\\s+/g,' ').slice(0,90),
      key:card.querySelector('[class*="OperatorItem_image__"]')?.getAttribute("data-key"),
      url:card.querySelector('[class*="OperatorItem_image__"]')?.style.backgroundImage
    }));
  }""")
  print("OFFICIAL_ALL_CARDS",json.dumps(card_info,ensure_ascii=False))
  await page.evaluate("""()=>document.querySelector('[class*="OperatorItem_operatorItem__"]')?.click()""")
  await page.wait_for_timeout(1000)
  detail=await page.evaluate("""()=>{
    const result=[];
    for(const e of document.querySelectorAll('*')){
      const style=getComputedStyle(e).backgroundImage;
      const attr=e.getAttribute('style')||'';
      for(const s of [style,attr]){
        if(s.includes('jsspsi')&&s.includes('png')){
          result.push({cls:String(e.className||'').slice(0,120),url:s.slice(0,320),
            text:(e.parentElement?.innerText||'').slice(0,120)});
          break;
        }
      }
    }
    return result;
  }""")
  print("OFFICIAL_SI_AFTER_CLICK",json.dumps(detail,ensure_ascii=False))
  await browser.close()
asyncio.run(main())
