"""Chromium smoke: bilingual recruitment guide at 1440/390 px, no external services."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

DIST=Path(__file__).resolve().parents[2]/"dist"

def verify(ok,message):
    if not ok: raise AssertionError(message)
    print("PASS:",message,flush=True)

def smoke(page,base,lang,width):
    prefix="/en" if lang=="en" else ""
    slug="recruitment" if lang=="en" else "rekrutierung"
    page.goto(base+prefix+"/endfield/cheatsheets/"+slug+"/")
    root=page.locator("[data-rc-guide]")
    event=root.locator('[data-rc-panel="event"]')
    verify(root.count()==1 and page.locator("html").get_attribute("lang")==lang and
           root.locator('[data-rc-tab]').count()==3 and event.is_visible() and
           event.locator('[data-rc-pity] progress').count()==3 and
           event.locator('.rc-icon-list [data-operator]').count()==7,
           str(width)+lang+": event tracks and seven alternatives")
    a=event.locator('[data-rc-example="70"]')
    b=event.locator('[data-rc-example="10"]')
    verify(a.get_attribute("open") is None and b.get_attribute("open") is None,
           str(width)+lang+": examples collapsed by default")
    a.locator("summary").click()
    verify(a.get_attribute("open") is not None and
           a.locator('progress[max="240"]').get_attribute("value")=="70" and
           "170" in a.inner_text(),str(width)+lang+": 70/240 leaves 170")
    a.locator("summary").focus()
    a.locator("summary").press("Enter")
    b.locator("summary").click()
    verify(a.get_attribute("open") is None and b.get_attribute("open") is not None and
           b.locator('progress[max="240"]').get_attribute("value")=="10" and "230" in b.inner_text(),
           str(width)+lang+": 10/240 leaves 230")
    event_tab=root.locator('[data-rc-tab="event"]')
    event_tab.focus()
    event_tab.press("ArrowRight")
    rerun=root.locator('[data-rc-panel="rerun"]')
    verify(rerun.is_visible() and event.is_hidden() and
           root.locator('[data-rc-tab="rerun"]').get_attribute("aria-selected")=="true" and
           rerun.locator('[data-operator="tangtang"] progress').get_attribute("value")=="95" and
           rerun.locator('[data-operator="rossi"] progress').get_attribute("value")=="0",
           str(width)+lang+": RE-Factor operator-specific token progress")
    root.locator('[data-rc-tab="standard"]').click()
    standard=root.locator('[data-rc-panel="standard"]')
    verify(standard.is_visible() and
           standard.locator('[data-rc-pity="80"]').count()==1 and
           standard.locator('.rc-standard-list [data-operator]').count()==5,
           str(width)+lang+": Standard 80 and five icons")
    for img in standard.locator(".rc-standard-list img").all():
        img.scroll_into_view_if_needed()
    verify(standard.locator(".rc-standard-list img").evaluate_all(
           "(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth>0)"),
           str(width)+lang+": locally cached operator artwork loads")
    verify(page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"),
           str(width)+lang+": no horizontal overflow")

def main():
    server=ThreadingHTTPServer(("127.0.0.1",0),partial(SimpleHTTPRequestHandler,directory=str(DIST)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser=pw.chromium.launch(headless=True)
            for width in (1440,390):
                for lang in ("de","en"):
                    context=browser.new_context(viewport={"width":width,"height":900},reduced_motion="reduce")
                    try: smoke(context.new_page(),"http://127.0.0.1:"+str(server.server_port),lang,width)
                    finally: context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    print("Recruitment DE/EN desktop/mobile smoke passed.",flush=True)
if __name__=="__main__": main()
