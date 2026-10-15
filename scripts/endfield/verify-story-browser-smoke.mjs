import assert from "node:assert/strict";
import {chromium} from "playwright-core";

const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try {
 const page=await browser.newPage();
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 const origin="http://127.0.0.1:4321";
 const res=await page.goto(origin+"/endfield/operatoren/liino/",{waitUntil:"domcontentloaded"});
 assert.equal(res?.status(),200);
 await page.waitForFunction(()=>document.querySelector("#op-build-config")?.textContent?.includes("Pyrrolit"));
 assert.equal(await page.locator("#op-factory").inputValue(),"pyrrolite");
 assert.equal(await page.locator("[data-story-area]").count(),19);
 await page.locator("#op-story-region").selectOption("wuling");
 await page.locator("#op-story-areas-panel summary").click();
 await page.locator('[data-story-area="wuling-city"]').check();
 await page.locator("#op-authority-level").fill("12");
 await page.locator("#op-authority-level").dispatchEvent("change");
 const b=await page.goto(origin+"/endfield/operatoren/typhoeus/",{waitUntil:"domcontentloaded"});
 assert.equal(b?.status(),200);
 await page.waitForFunction(()=>document.querySelector("#op-story-region")?.value==="wuling");
 assert.equal(await page.locator('[data-story-area="wuling-city"]').isChecked(),true);
 assert.equal(await page.locator("#op-authority-level").inputValue(),"12");
 await page.locator("#op-progress-reset").click();
 assert.equal(await page.locator("#op-story-region").inputValue(),"");
 assert.equal(await page.evaluate(()=>localStorage.getItem("ag0n1st:endfield:build-story-progress:v1")),null);
 assert.deepEqual(errors,[]);
 console.log("STORY_BROWSER_SMOKE_OK",JSON.stringify({pages:2,areas:19,storageAcrossGuides:true,reset:true,factoryDefault:"pyrrolite"}));
}finally{await browser.close();}
