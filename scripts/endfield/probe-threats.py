#!/usr/bin/env python3
"""Temporary public-only SKPORT Threats catalogue probe. No credentials saved."""
import asyncio, base64, json, gzip
from playwright.async_api import async_playwright
async def main():
    results=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=['--no-sandbox'])
        page=await browser.new_page(locale='en-US')
        async def capture(response):
            if '/web/v1/wiki/item/catalog' not in response.url or response.status!=200:return
            try:
                payload=await response.json()
                if payload.get('code')==0 and isinstance(payload.get('data',{}).get('catalog'),list):
                    results.append({'url':response.url,'catalog':payload['data']['catalog']})
            except Exception as exc:print('CAPTURE_ERROR',str(exc)[:120])
        page.on('response',capture)
        for url in [
          'https://wiki.skport.com/endfield',
          'https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=3&filterIds=&header=0',
          'https://wiki.skport.com/endfield/catalog?typeMainId=1&typeSubId=3'
        ]:
            try:
                r=await page.goto(url,wait_until='domcontentloaded',timeout=45000)
                print('VISIT',url,'STATUS',r.status if r else 'NONE')
                await page.wait_for_timeout(3000)
            except Exception as exc:print('NAV_ERROR',url,str(exc)[:250])
        await browser.close()
    print('RESULTS',len(results))
    for item in results:
        for group in item['catalog']:
            print('CATALOG_GROUP',group.get('id'),[(s.get('id'),s.get('name'),len(s.get('items',[]))) for s in group.get('typeSub',[])])
    if results:
        data=json.dumps(results,ensure_ascii=False,separators=(',',':')).encode()
        payload=base64.b64encode(gzip.compress(data,mtime=0)).decode('ascii')
        print('PUBLIC_CATALOG_ENCODED_BYTES',len(payload))
        for i in range(0,len(payload),1500):print('CATALOG_PART',i//1500,payload[i:i+1500])
asyncio.run(main())
