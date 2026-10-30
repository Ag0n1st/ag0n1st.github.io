#!/usr/bin/env python3
"""Chromium smoke QA for built Astro operator guides.

Run after npm run build. No screenshots or videos are produced.
External YouTube playback is not tested, only the embedded URL.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

DIST = Path(__file__).resolve().parents[2] / "dist"
PARTNERS = ["Zhuang Fangyi", "Perlica", "Arclight",
            "Arcane", "Tangtang", "Xaihi"]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def verify(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS:", message, flush=True)


def guide(page, base_url, slug):
    response = page.goto(base_url + "/endfield/operatoren/" + slug + "/",
                         wait_until="domcontentloaded")
    verify(response is not None and response.status == 200,
           slug + ": guide route serves HTTP 200")
    page.locator("#op-level").wait_for(state="attached")
    page.wait_for_function(
        "() => !document.querySelector('#op-build-results').textContent.includes('Prüfe vorhandene')"
    )


def check_overflow(page, label):
    metrics = page.evaluate(
        "() => ({viewport: innerWidth, document: document.documentElement.scrollWidth})"
    )
    verify(metrics["document"] <= metrics["viewport"] + 2,
           label + ": no page-wide horizontal overflow " + str(metrics))


def smoke(page, base_url, width):
    label = str(width) + "px"
    guide(page, base_url, "liino")
    check_overflow(page, label)
    verify(page.locator("#build-finder").get_attribute("open") is None,
           label + ": Build-Finder initially collapsed")
    verify(page.locator("#op-level").input_value() == "70",
           label + ": maximum profile level for first visit")

    names = [x.strip() for x in page.locator(
        ".op-partners-grid .op-gear-part small").all_text_contents()]
    verify(names == PARTNERS, label + ": all six distinct Meta partners")
    video_src = page.locator(
        "#uebersicht iframe.op-video-embed").first.get_attribute("src") or ""
    verify("youtube-nocookie.com/embed/F1sx8IuOIK4" in video_src
           and "autoplay=1" not in video_src,
           label + ": correct privacy-enhanced guide embed, no autoplay")

    verify(page.locator("#uebersicht .op-quick-weapons-card").count() == 1,
           label + ": one shared overview weapon card, matching Partners")
    verify(page.locator("#uebersicht .op-quick-weapons-card .op-quick-weapon-item").count() == 4,
           label + ": all four weapons stay inside the shared card")
    verify(page.locator("#uebersicht .op-quick-weapons-card .op-quick-weapon-item.op-cardlet").count() == 0,
           label + ": no redundant nested individual weapon card borders")
    verify(page.locator("#uebersicht .op-rating").first.locator(".op-rating-header").inner_text().startswith("Einsteigerfreundlichkeit"),
           label + ": positive ease rating replaces negative difficulty heading")
    verify(page.locator("#uebersicht .op-rating").first.locator(".op-meter i.active").count() == 5,
           label + ": Liino difficulty 1 renders five beginner-friendliness bars")
    gradient = page.locator("#uebersicht .op-rating").first.locator(".op-meter i.active").evaluate_all(
        "(bars)=>bars.map(el=>({image:getComputedStyle(el).backgroundImage,position:getComputedStyle(el).backgroundPositionX}))"
    )
    verify(len(gradient)==5 and all("gradient" in g["image"] for g in gradient)
           and gradient[0]["position"] != gradient[4]["position"],
           label+": each rating bar reveals a fixed position of ONE magenta-to-cyan scale")

    verify(page.locator("#operator-kit").get_by_text("Ressourcen & Verfügbarkeit").count() == 0,
           label + ": obsolete resources block removed")
    verify(page.locator("#operator-kit").get_by_text("Liino unterstützt ihr Team").count() == 1,
           label + ": approved Liino Kit playstyle is displayed")
    if width > 1000:
        video = page.locator("#uebersicht .op-video-card").bounding_box()
        profile = page.locator("#uebersicht .op-profile-card").bounding_box()
        verify(video is not None and profile is not None
               and video["height"] < profile["height"],
               label + ": video card no longer stretches to profile height")
        verify(page.locator("#uebersicht .op-quick-stats").evaluate(
            "(el) => getComputedStyle(el).alignItems") == "start",
               label + ": gear and skill quick cards do not stretch")
    for n in (1, 3, 5):
        page.locator('[data-potential-button="' + str(n) + '"]').click()
        img = page.locator('[data-potential-panel="' + str(n) +
                           '"] .op-potential-snapshot img')
        img.wait_for(state="visible")
        verify(img.count() == 1 and img.get_attribute("src").endswith(
            "/images/endfield/operators/liino/potentials/potential-" + str(n) + ".webp"),
               label + ": Liino P" + str(n) + " uses local WebP snapshot")
        page.wait_for_function(
            "(el) => el.complete && el.naturalWidth > 100", arg=img.element_handle())
        verify(img.evaluate("(el) => el.complete && el.naturalWidth > 100"),
               label + ": Liino P" + str(n) + " WebP loads in Chromium")

    weapon_section = page.locator('#waffen details[data-guide-disclosure="weapon-details"]')
    weapon_section.evaluate("el => el.open = true")
    buttons = page.locator('#waffen [data-weapon-button]')
    verify(buttons.count() == 4, label + ": all four weapon detail tabs present")
    for button in buttons.all():
        weapon_id = button.get_attribute("data-weapon-button")
        button.click()
        panel = page.locator('[data-weapon-panel="' + weapon_id + '"]')
        verify(not panel.is_hidden(),
               label + ": selected weapon detail panel visible, " + weapon_id)
        verify(panel.locator(".op-weapon-attributes-table tbody tr").count() == 3,
               label + ": SKPORT weapon attributes rendered with aligned columns, " + weapon_id)
        panel.locator(".op-weapon-detailed-stats").evaluate("el => el.open = true")
        tuning = panel.locator(".op-weapon-tuning-table")
        verify(tuning.locator("tbody tr").count() >= 5,
               label + ": tuning stage table rendered compactly, " + weapon_id)
        icons = panel.locator(".op-weapon-material-cell .op-resource img")
        verify(icons.count() >= 3,
               label + ": SKPORT tuning material costs use local item icons, " + weapon_id)
        icon = icons.first
        page.wait_for_function(
            "(el) => el.complete && el.naturalWidth > 10", arg=icon.element_handle())
        verify(icon.evaluate("(el) => el.complete && el.naturalWidth > 10"),
               label + ": first SKPORT tuning material icon loads, " + weapon_id)
        text = panel.inner_text()
        verify("[item:" not in text and "[Icon]" not in text and
               "[Bewertung folgt]" not in text,
               label + ": no raw wiki material tokens or editorial placeholders, " + weapon_id)
    check_overflow(page, label + " weapon tables")

    verify(page.locator(".op-meta-build-card").count() == 3,
           label + ": exactly three visible Meta equipment builds")
    labels = page.locator("#teams .op-meta-team-labels")
    verify(labels.count() == 2, label + ": two Meta team headings")
    for entry in labels.all():
        chips = entry.locator(".op-chip")
        verify(chips.count() == 2, label + ": distinct Meta and Support chips")
        if width > 1000:
            first, second = chips.nth(0).bounding_box(), chips.nth(1).bounding_box()
            verify(first is not None and second is not None
                   and 0 <= second["x"] - first["x"] - first["width"] <= 12,
                   "desktop: Meta and Support labels remain adjacent")

    link = page.locator(".op-meta-build-card [data-select-build]").first
    build_id = link.get_attribute("data-select-build")
    link.click()
    verify(page.locator("#build-finder").get_attribute("open") is not None,
           label + ": Meta link opens build finder")
    verify(page.locator('[data-build-button="' + build_id +
                        '"]').get_attribute("aria-pressed") == "true",
           label + ": Meta link selects its build")

    page.locator("#op-progress-min").click()
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimal preset sets level 10")
    verify(page.locator("#op-story-region").input_value() == "",
           label + ": minimal preset clears region")
    verify(page.locator("[data-story-area]:checked").count() == 0,
           label + ": minimal preset clears areas")
    verify(page.locator("[data-blueprint-owned]:checked").count() == 0,
           label + ": minimal preset clears blueprint ownership assumptions")

    blueprint = page.locator("[data-blueprint-owned]:not([disabled])").first
    gear_id = blueprint.get_attribute("data-blueprint-owned")
    blueprint.evaluate(
        "el => {el.checked = true; el.dispatchEvent(new Event('change', {bubbles:true}));}")
    mode = page.evaluate(
        "() => JSON.parse(localStorage.getItem('ag0n1st:endfield:build-story-progress:v2')).selectionMode"
    )
    verify(mode == "min", label + ": minimal mode saved as localStorage v2")

    page.reload(wait_until="domcontentloaded")
    page.locator("#op-level").wait_for(state="attached")
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimum survives reload")
    verify(page.locator('[data-blueprint-owned="' + gear_id +
                        '"]:checked').count() >= 1,
           label + ": selected blueprint survives reload")

    guide(page, base_url, "typhoeus")
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimum carries across operator guides")
    guide(page, base_url, "liino")
    verify(page.locator('[data-blueprint-owned="' + gear_id +
                        '"]:checked').count() >= 1,
           label + ": blueprint selection survives guide switch")

    page.locator("#build-finder").evaluate("el => el.open = true")
    page.locator("#op-progress-reset").click()
    verify(page.locator("#op-level").input_value() == "70",
           label + ": maximum reset restores level 70")
    verify(page.locator("[data-blueprint-owned]:not([disabled]):not(:checked)").count() == 0,
           label + ": maximum reset enables all available blueprints")
    page.locator(".op-story-extra").evaluate("el => el.open = true")
    authority = page.locator("#op-authority-level")
    authority.fill("200")
    authority.press("Tab")
    verify(authority.input_value() == "60",
           label + ": authority input clamps to 60")

    gameplay = page.locator('.op-guide-toc-links a[href="#gameplay"]')
    gameplay.click()
    page.wait_for_timeout(80)
    verify(gameplay.get_attribute("aria-current") == "location",
           label + ": Gameplay TOC active on anchor navigation")
    check_overflow(page, label)


def smoke_typhoeus(page, base_url, width):
    label = str(width) + "px Typhoeus"
    guide(page, base_url, "typhoeus")
    check_overflow(page, label)
    verify(page.locator(".op-preview-banner").count() == 0,
           label + ": complete editorial guide is not marked as placeholder")
    verify(page.locator("#uebersicht .op-quick-weapons-card .op-quick-weapon-item").count() == 3,
           label + ": three confirmed Typhoeus weapon recommendations in one card")
    verify(page.locator("#uebersicht .op-quick-partners-card .op-gear-part").count() == 4,
           label + ": all four unique partners from creator-approved Meta team core")
    verify("wNVJkGzkfMg" in (page.locator(
        "#uebersicht iframe.op-video-embed").first.get_attribute("src") or ""),
           label + ": real 29-minute Ag0n1st guide video is embedded")

    verify(page.locator("#ausruestung .op-meta-build-card").count() == 2,
           label + ": both core endgame builds have concise Meta cards")
    verify(page.locator("#ausruestung [data-build-button]").count() == 6,
           label + ": three endgame and three progression builds (36/50/60)")
    verify(page.locator("#teams .op-meta-team-heading").count() == 2,
           label + ": two Meta teams and their distinct operator roles")
    ratings = page.locator("#uebersicht .op-rating").all()
    verify(len(ratings) >= 2 and "1 / 5" in ratings[0].inner_text()
           and "1 / 5" in ratings[1].inner_text(),
           label + ": creator-defined 1/5 beginner friendliness and flexibility")
    meta_gear = page.locator("#teams .op-two .op-team-gear")
    verify(meta_gear.count() == 2,
           label + ": both Meta team loadouts contain author's weapons and gear")
    for team_gear in meta_gear.all():
        team_gear.evaluate("el => el.open = true")
        verify(team_gear.locator(".op-team-gear-entry").count() == 3,
               label + ": each Meta team has three additional operator loadouts")
        verify(team_gear.locator(".op-team-gear-entry > .op-team-gear-parts .op-team-gear-part img").count() == 12,
               label + ": twelve main SKPORT Gear WebP icons per Meta lineup")
        verify(team_gear.locator(".op-team-member-weapon img").count() == 3,
               label + ": three sourced teammate weapon icon cards per Meta lineup")
        verify(team_gear.locator(".op-team-gear-variants").count() == 2,
               label + ": contextual team member loadouts stay collapsed by default")
        variants=team_gear.locator(".op-team-gear-variants").first
        variants.evaluate("el=>el.open=true")
        verify(variants.locator(".op-team-gear-variant .op-team-gear-parts img").count() >= 4,
               label + ": PDF-sourced alternative setups have four real item icons")
        img = team_gear.locator(".op-team-gear-entry > .op-team-gear-parts .op-team-gear-part img").first
        img.scroll_into_view_if_needed()
        page.wait_for_function(
            "(el) => el.complete && el.naturalWidth > 10", arg=img.element_handle())
    for team_gear in meta_gear.all():
        slabs = team_gear.locator(".op-team-gear-entry:first-child > .op-team-gear-parts img[src$='/images/endfield/gear/1136.webp']")
        wraps = team_gear.locator(".op-team-gear-entry:first-child > .op-team-gear-parts img[src$='/images/endfield/gear/1137.webp']")
        verify(slabs.count() == 2 and wraps.count() == 1,
               label + ": author's Arcane build has 2 Slabs plus Wraps, not Hands")
        verify(team_gear.locator(".op-team-gear-entry:first-child .op-team-member-weapon img[src$='/images/endfield/weapons/1045.webp']").count() == 1,
               label + ": Arcane Type 42: Solemn Phalanx sourced from author's PDF")
    verify(page.locator("#teams [data-team-role]").count() == 7,
           label + ": seven editorial team options including PDF Gilberta alternatives")

    skill_priorities = page.locator("#uebersicht .op-priority-skill small").all_text_contents()
    verify(len(skill_priorities) == 4 and skill_priorities[0] == "Kampffertigkeit"
           and skill_priorities[1] == "Kombofertigkeit",
           label + ": Battle > Combo skill priority from authored script")
    priorities=page.locator("#uebersicht .op-priority-symbol").all_text_contents()
    verify(priorities == [">", ">", "="],
           label + ": source-correct Battle > Combo > Ultimate = Basic")
    verify(page.locator("#ausruestung [data-build-button='deep-rampart-ultimate']").count() == 1,
           label + ": special Ultimate-energy build is present")

    verify(page.locator("#waffen [data-weapon-button]").count() == 3,
           label + ": signature, Battle Pass and conditional alternate weapon")
    weapon_details = page.locator('#waffen details[data-guide-disclosure="weapon-details"]')
    weapon_details.evaluate("el => el.open = true")
    for button in page.locator("#waffen [data-weapon-button]").all():
        wid = button.get_attribute("data-weapon-button")
        button.click()
        panel = page.locator('[data-weapon-panel="' + wid + '"]')
        verify(panel.locator(".op-weapon-attributes-table tbody tr").count() == 3,
               label + ": full verified SKPORT weapon attributes " + wid)
        panel.locator(".op-weapon-detailed-stats").evaluate("el => el.open = true")
        verify(panel.locator(".op-weapon-tuning-table tbody tr").count() == 6,
               label + ": six original weapon tuning stages " + wid)
        verify(panel.locator(".op-weapon-material-cell img").count() >= 3,
               label + ": weapon tuning costs use cached item icons " + wid)

    comparison = page.locator('#waffen details[data-guide-disclosure="weapon-comparison"]')
    comparison.evaluate("el => el.open = true")
    scenarios = page.locator("#waffen .op-comparison-scenario")
    verify(scenarios.count() == 2,
           label + ": both Datafield character-profile weapon scenarios are shown")
    verify("124,7 %" in scenarios.first.inner_text() and
           "84,3 %" in scenarios.first.inner_text(),
           label + ": actual Ardelia/Arcane/Liino ranking includes R9 and R4")
    verify("123,3 %" in scenarios.nth(1).inner_text(),
           label + ": No-Liino lower-ATK scenario stays separate")

    pot_comparison = page.locator('#potenziale details[data-guide-disclosure="potential-comparison"]')
    pot_comparison.evaluate("el => el.open = true")
    verify(page.locator("#potenziale .op-potential-comparison-table tbody tr").count() == 5,
           label + ": five potential ranks with source-specific comparisons")
    potential_text = page.locator("#potenziale .op-potential-comparison-table").inner_text()
    verify("8,8 %" in potential_text and "6,6 %" in potential_text and
           "8,3 %" in potential_text and "0,0 %" in potential_text,
           label + ": separate Datafield Ultimate-energy vs no-extra-energy P gains")

    for n in (1, 3, 5):
        page.locator('[data-potential-button="' + str(n) + '"]').click()
        pot = page.locator('[data-potential-panel="' + str(n) +
                           '"] .op-potential-snapshot img')
        pot.wait_for(state="visible")
        verify(pot.count() == 1 and pot.get_attribute("src").endswith(
            "/images/endfield/operators/typhoeus/potentials/potential-" + str(n) + ".webp"),
               label + ": specific P" + str(n) + " static potential snapshot")
        page.wait_for_function(
            "(el) => el.complete && el.naturalWidth > 100", arg=pot.element_handle())
    gallery = page.locator("#potenziale .op-potential-snapshot a").first.get_attribute("href")
    verify("Typhoeus/Gallery" in gallery,
           label + ": potential images link to Typhoeus gallery, not Liino")

    showcase = page.locator("#gameplay [data-showcase-panel]")
    verify(showcase.count() == 5,
           label + ": five real gameplay videos/chapters; quiz removed")
    verify(page.locator('[data-showcase-panel="nefarith-p0"]').is_visible(),
           label + ": Nefarith P0 No Food is the featured large showcase")
    verify(page.locator('[data-showcase-panel="quiz-zeichen"]').count() == 0,
           label + ": quiz entry no longer present")
    verify(page.locator("#gameplay .op-gameplay-pending-label").count() == 0,
           label + ": real gameplay section, no FUTURE placeholder")
    verify("start=974" in (page.locator(
        '[data-showcase-panel="trial-erlaeutert"] iframe').get_attribute("src") or ""),
           label + ": trial video starts at documented guide chapter")
    verify("start=1218" in (page.locator(
        '[data-showcase-panel="echos-zwei-gegner"] iframe').get_attribute("src") or ""),
           label + ": Echoes chapter start preserved in embedded video")
    verify(page.locator("#gameplay .op-showcase-button .op-faux-thumb img").count() == 5,
           label + ": all five showcase tiles use real local WebP thumbnails")
    thumb = page.locator("#gameplay .op-showcase-button .op-faux-thumb img").first
    thumb.scroll_into_view_if_needed()
    page.wait_for_function(
        "(el) => el.complete && el.naturalWidth > 100", arg=thumb.element_handle())
    verify(page.locator("#fazit").evaluate("(el)=>el.lastElementChild?.classList.contains('op-conclusion-audiences')") is True,
           label + ": last section ends in exactly the two audience cards")
    check_overflow(page, label + " all sections")


def smoke_si(page, base_url, width):
    label=str(width)+"px Si"
    guide(page,base_url,"si")
    check_overflow(page,label)
    verify(page.locator(".op-preview-banner").count()==0,
           label+": published guide must not be marked preview")
    ratings=page.locator("#uebersicht .op-rating").all()
    verify(len(ratings)>=2 and "3 / 5" in ratings[0].inner_text()
           and "5 / 5" in ratings[1].inner_text(),
           label+": 3/5 beginner-friendly and 5/5 flexible")
    traits=page.locator("#uebersicht .op-profile-card .op-chip").all_text_contents()
    for term in ["Amp","Damage Dealer","Cryo Infliction"]:
        verify(term in traits,label+": exact author trait "+term)
    for term in ["Intellekt","Stärke"]:
        verify(term in page.locator("#uebersicht .op-profile-card").inner_text(),
               label+": official main/secondary localized attribute "+term)
    verify(page.locator("#uebersicht .op-profile-art img").count()==1,
           label+": local Si banner artwork")
    verify(page.locator("#uebersicht .op-profile-art img").get_attribute("src")=="/images/endfield/operators/si/banner.webp",
           label+": horizontal banner replaces the recruitment splash in Si overview")
    splash=page.locator("#potenziale details[data-guide-disclosure='recruitment-splash']")
    verify(splash.count()==1 and not splash.evaluate("(el)=>el.open"),
           label+": recruitment splash disclosure starts closed")
    splash.locator("summary").click()
    verify(splash.locator("img.op-recruitment-splash").count()==1 and
           "/illustration.webp" in (splash.locator("img").get_attribute("src") or ""),
           label+": recruitment splash preserved at full width in the potentials section")
    partner_icons=page.locator("#uebersicht .op-quick-partners-card .op-partner-art")
    verify(partner_icons.count()>=3,label+": profile has visible Meta partner portraits")
    for icon in partner_icons.all()[:5]:
        dimensions=icon.evaluate("(el)=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})")
        verify(abs(dimensions["w"]-dimensions["h"])<1.5,
               label+": partner icon stays square (1:1), not rectangular")
    mainart=page.locator("#uebersicht .op-profile-art img")
    page.wait_for_function("(el)=>el.complete && el.naturalWidth>100",arg=mainart.element_handle())
    verify(page.locator("#uebersicht .op-quick-weapons-card .op-quick-weapon-item").count()==3,
           label+": Jade Vessel + Long Heritage + verified Khravengger")
    verify(page.locator("#uebersicht .op-quick-partners-card img").count()>=9,
           label+": official cached portraits for diverse Meta partners")
    verify(page.locator("#uebersicht .op-video-placeholder").count()==1,
           label+": no invented Si YouTube guide embedded")

    verify("SKPORT-Datenstand: 2026-10-16" in page.locator(".op-locale-note").inner_text() and
           "PDF" not in page.locator(".op-locale-note").inner_text(),
           label+": concise SKPORT heading without internal provenance")
    verify(len(ratings)>=3 and "1 / 5" in ratings[2].inner_text(),
           label+": Si provisional 1/5 Endgame accessibility")
    verify("Redeemer Seal" in page.locator("#uebersicht .op-quick-stats").inner_text(),
           label+": Balanced Redeemer Seal is the featured quick build")
    cards=page.locator("#ausruestung .op-meta-build-card")
    verify(cards.count()==4,label+": Balanced, Max DMG, Max Buffs and Early Access meta builds")
    for i,(tag,style) in enumerate([("Balanced","is-accent"),("Max. DMG","is-pink"),("Max. Buffs",None),("Early Access","is-early")]):
        chip=cards.nth(i).locator(".op-meta-build-tags .op-chip").first
        verify(tag in chip.inner_text() and (style is None or style in (chip.get_attribute("class") or "")),
               label+": distinct Meta build label "+tag)
    verify(page.locator("#ausruestung [data-build-button]").count()==9,
           label+": four Meta and five alternative/progression builds")
    actual_columns=cards.first.evaluate(
        "(el)=>getComputedStyle(el.parentElement).gridTemplateColumns.split(' ').length")
    verify(actual_columns==(1 if width==390 else 2),
           label+": Meta cards have "+("one mobile column" if width==390 else "two desktop columns"))
    verify(page.locator("#uebersicht .op-strengths-card").count()==1 and
           page.locator("#uebersicht .op-weaknesses-card").count()==1,
           label+": shared strength and weakness accent cards")
    verify(page.locator("#ausruestung [data-build-button='si-balanced']").count()==1,
           label+": Balanced meta build exists")
    verify(page.locator("#ausruestung [data-build-button='si-early-access']").count()==1,
           label+": 70-level Early Access build exists")
    verify(page.locator("#ausruestung [data-build-button='si-main']").count()==1,
           label+": original LYNX maximal damage build remains available")
    verify(page.locator("#ausruestung [data-build-button='si-level50']").count()==1 and
           page.locator("#ausruestung [data-build-button='si-level36']").count()==1,
           label+": independently chosen level 36/50 progression available")
    finder=page.locator("#build-finder")
    verify(finder.get_attribute("open") is None,
           label+": Si build finder initially collapsed")
    finder.evaluate("el=>el.open=true")
    page.locator('[data-build-button="si-balanced"]').click()
    panel=page.locator('[data-build-panel="si-balanced"]')
    verify(panel.locator(".op-gear-part").count()==4 and
           panel.locator("img[src$='/images/endfield/gear/349.webp']").count()==1,
           label+": Balanced includes Type 50 pieces and real Redeemer Seal icon")
    verify("ungeprüft" in panel.inner_text().lower() or
           "nicht zugeordnet" in panel.inner_text().lower() or
           "ungeklärt" in panel.inner_text().lower(),
           label+": new gear remains unverified without fake SKPORT blueprints")
    verify(panel.locator('input[data-blueprint-owned]:not([disabled])').count()<4,
           label+": unverified 1.6 blueprints cannot be claimed owned")
    page.locator('[data-build-button="si-early-access"]').click()
    early=page.locator('[data-build-panel="si-early-access"]')
    verify(early.locator("img[src$='/images/endfield/gear/796.webp']").count()==1 and
           early.locator("img[src$='/images/endfield/gear/411.webp']").count()==1 and
           early.locator("img[src$='/images/endfield/gear/342.webp']").count()==2,
           label+": Early Access has Redeemer Armor, old Gloves and two Knife T1 pieces")
    page.locator('[data-build-button="si-main"]').click()
    verify(page.locator('[data-build-panel="si-main"] img[src$="/images/endfield/gear/365.webp"]').count()==1,
           label+": Max. DMG still has the original LYNX Slab")

    verify(page.locator("#teams .op-meta-team-heading").count()==6,
           label+": all six existing Meta teams")
    verify(page.locator("#teams .op-si-main-team .op-meta-team-labels .op-chip").count()==4 and
           page.locator("#teams .op-si-main-team").count()==2,
           label+": both Si main DPS role labels have magenta accents")
    verify(page.locator("#teams .op-meta-team-heading").first.inner_text().startswith("Yvonne Main DPS"),
           label+": first team renamed to Yvonne Main DPS")
    verify(page.locator("#teams .op-meta-team-heading").last.inner_text().startswith("Si Main DPS (2)"),
           label+": last team renamed to Si Main DPS (2)")
    verify(page.locator("#teams .op-meta-team-heading").count()==6 and
           page.locator("#teams .op-two .op-team-art img").count()>=20,
           label+": team mini cards use cached operator portraits")
    more=page.locator('#teams details[data-guide-disclosure="team-options"]')
    more.evaluate("el=>el.open=true")
    verify(page.locator("#teams [data-team-role]").count()==37,
           label+": all 37 other exact PDF lineups are in the overview")
    verify(page.locator("#teams .op-meta-team-heading").first.inner_text().find("Meta")>=0,
           label+": author's Meta designation remains visible")
    verify(page.locator("#uebersicht .op-priority-symbol").all_text_contents()==[">",">",">="],
           label+": main DPS skill priority ends with Basic >= Ultimate")
    priorities=page.locator("#fertigkeiten .op-priority-variant")
    verify(priorities.count()==2,label+": DPS and Support each have an individual priority")
    verify(priorities.first.locator(".op-priority-symbol").all_text_contents()==[">",">",">="] and
           priorities.last.locator(".op-priority-symbol").all_text_contents()==[">",">",">"],
           label+": both priority comparisons are correct")
    verify("Lv 1–9 (optional)" in priorities.last.inner_text(),
           label+": optional Support basic-attack target level")
    skills=page.locator('#fertigkeiten details[data-guide-disclosure="skill-details"]')
    skills.evaluate("el=>el.open=true")
    for key,de in [("basic","Schaffensdrang"),("battle","Dimension der Pinselkunst"),
                   ("combo","Vision vor Auge"),("ultimate","Spielverderber verboten")]:
        card=page.locator("#fertigkeiten .op-skill-description").nth(["basic","battle","combo","ultimate"].index(key))
        verify(len(card.inner_text())>=70,
               label+": full in-game German original description for "+de)
    verify("Erster Pinselstrich: Kostet 15 FP" in page.locator(
        "#fertigkeiten .op-skill-description").nth(1).inner_text(),
           label+": verbatim authoritative German 15 FP description")
    verify(page.locator("#potenziale [data-potential-button]").count()==5,
           label+": all five SKPORT potentials and personal appraisal")
    for n in (1,3,5):
        page.locator('[data-potential-button="'+str(n)+'"]').click()
        img=page.locator('[data-potential-panel="'+str(n)+'"] .op-potential-snapshot img')
        img.wait_for(state="visible")
        verify(img.get_attribute("src").endswith("/images/endfield/operators/si/potentials/potential-"+str(n)+".webp"),
               label+": exact official snapshot P"+str(n))
        page.wait_for_function("(el)=>el.complete && el.naturalWidth>100",arg=img.element_handle())
    pot=page.locator('#potenziale details[data-guide-disclosure="potential-comparison"]')
    pot.evaluate("el=>el.open=true")
    val=pot.inner_text()
    verify("5,6 %" in val and "9,3 %" in val,
           label+": Datafield incremental P1 and P5 (DPS model only)")
    cmp=page.locator('#waffen details[data-guide-disclosure="weapon-comparison"]')
    cmp.evaluate("el=>el.open=true")
    val=cmp.inner_text()
    verify("114,5 %" in val and "90,5 %" in val and "86,8 %" in val,
           label+": Datafield Jade Vessel and Long Heritage rank metrics")
    verify(page.locator("#gameplay .op-gameplay-pending-label").count()==1,
           label+": nonexistent Si video is marked as future")
    verify(page.locator("#gameplay .op-divided").count()==0 and
           "15 FP" not in page.locator("#gameplay").inner_text(),
           label+": Si Gameplay is an empty pending section without written rotation")
    verify(page.locator("#fazit .op-conclusion-audiences .op-cardlet").first.locator("p").count()==3 and
           page.locator("#fazit .op-conclusion-audiences .op-cardlet").last.locator("p").count()==1,
           label+": concise suitability criteria without redundant points")
    verify(page.locator("#fazit").evaluate(
        "(el)=>el.lastElementChild?.classList.contains('op-conclusion-audiences')") is True,
           label+": conclusion still ends with two audience cards")
    check_overflow(page,label+" all sections")



def smoke_i18n(page, base_url, width):
    label=str(width)+"px EN parity"
    en_routes=[
        "/en/","/en/about/","/en/nte/","/en/endfield/",
        "/en/endfield/operators/","/en/endfield/factory/",
        "/en/endfield/cheatsheets/","/en/endfield/speedruns/",
        "/en/endfield/checklist/","/en/endfield/countdown/",
        "/en/endfield/tierlist/","/en/endfield/operator-roulette/",
    ]
    for route in en_routes:
        r=page.goto(base_url+route,wait_until="domcontentloaded")
        verify(r and r.status==200,label+": translated route "+route)
        verify(page.locator("html").get_attribute("lang")=="en",label+": html lang=en "+route)
        verify(page.locator('link[rel="canonical"]').get_attribute("href")=="https://ag0n1st.com"+route,
               label+": canonical "+route)
        verify(page.locator('link[hreflang="de"]').count()==1,
               label+": reciprocal DE alternate "+route)
        nav=page.locator(".language-switch")
        verify(nav.count()==1,label+": language control exists "+route)
        if width<=760 and nav.first.is_hidden():
            page.locator(".menu-toggle").click()
            verify(page.locator(".main-nav").is_visible(),
                   label+": mobile menu opens to reveal the compact language selector")
        height=nav.first.evaluate("(el)=>el.getBoundingClientRect().height")
        verify(27<=height<=37,label+": language control compact button height "+str(height)+" "+route)
        verify(page.locator('.language-switch a[lang="de"]').count()==1,
               label+": German counterpart exists "+route)
        check_overflow(page,label+" "+route)
    page.goto(base_url+"/en/endfield/")
    nav_paths=page.locator(".endfield-nav a").evaluate_all("(a)=>a.map(x=>new URL(x.href).pathname)")
    verify(len(nav_paths)==11 and all(p.startswith("/en/") for p in nav_paths),
           label+": all eleven Endfield tabs are English, no DE fallback")
    verify(page.locator(".endfield-section").count()==9,
           label+": identical nine-section Endfield homepage layout")
    page.locator('.endfield-nav a[href="/en/endfield/factory/"]').click()
    verify(page.url.endswith("/en/endfield/factory/") and
           page.locator("html").get_attribute("lang")=="en",
           label+": tab click keeps the selected language")
    page.goto(base_url+"/en/")
    verify(page.locator(".hero-card").count()==2 and
           page.locator(".stream-card").count()==1 and
           page.locator("#videos").count()==1,
           label+": original hero / Twitch / YouTube card layout preserved")
    check_overflow(page,label+" homepage")
    slug="si"
    page.goto(base_url+"/en/endfield/operators/"+slug+"/")
    verify(page.locator('meta[property="og:image"]').get_attribute("content")==
           "https://ag0n1st.com/images/endfield/operators/si/cover.webp",
           label+": official local Si share preview preserved")
    section_ids=["uebersicht","operator-kit","fertigkeiten","waffen","ausruestung",
                 "potenziale","teams","gameplay","fazit"]
    verify(all(page.locator("#"+sid).count()==1 for sid in section_ids),
           label+": same nine guide components and section anchors as German")
    verify(page.locator(".op-guide-toc").count()==1 and
           page.locator(".op-profile-grid").count()==1,
           label+": same TOC and profile card layout")
    verify(page.locator("#ausruestung .op-meta-build-grid .op-meta-build-card").count()==4,
           label+": four original Si meta build cards")
    verify(page.locator("#ausruestung [data-build-button]").count()==9,
           label+": nine original Si equipment builds including progression")
    verify(page.locator("#teams .op-meta-team-heading").count()==6,
           label+": six original Si meta teams")
    more=page.locator('#teams details[data-guide-disclosure="team-options"]')
    more.evaluate("el=>el.open=true")
    verify(page.locator("#teams [data-team-role]").count()==37,
           label+": all 37 original Si additional teams")
    skill=page.locator('#fertigkeiten details[data-guide-disclosure="skill-details"]')
    skill.evaluate("el=>el.open=true")
    verify("Brushwork Realm" in page.locator("#fertigkeiten").inner_text() and
           "Fully Envisioned" in page.locator("#fertigkeiten").inner_text(),
           label+": original English SKPORT skill names")
    verify(page.locator("#fertigkeiten .op-skill-description").count()==4,
           label+": all four official English skill descriptions")
    finder=page.locator("#build-finder")
    verify(finder.get_attribute("open") is None,label+": same initially closed Build Finder")
    finder.evaluate("el=>el.open=true")
    verify(page.locator("#op-level").input_value()=="70",
           label+": same functional default max-level preset")
    page.locator('#ausruestung [data-build-button="si-early-access"]').click()
    verify(page.locator('[data-build-panel="si-early-access"]').is_visible(),
           label+": selecting translated equipment build works")
    verify("Available" in page.locator("#op-build-results").inner_text() or
           "available" in page.locator("#op-build-results").inner_text() or
           "locked" in page.locator("#op-build-results").inner_text(),
           label+": dynamic Build Finder status is English")
    check_overflow(page,label+" Si all sections")
    verify(page.locator('.language-switch a[lang="de"]').get_attribute("href")==
           "/endfield/operatoren/si/",
           label+": Si language switch preserves operator")
    page.goto(base_url+"/endfield/operatoren/si/")
    verify(page.locator('.language-switch a[lang="en"]').get_attribute("href")==
           "/en/endfield/operators/si/",
           label+": German original links to identical English guide")
    # New shared guide feed is created from actual editorial guide data.
    for locale,prefix in [("de",""),("en","/en")]:
        home=prefix+"/"
        page.goto(base_url+home)
        social_links=page.locator("footer .social-links a").evaluate_all(
            "(els)=>els.map(el=>({name:el.getAttribute('aria-label'),href:el.getAttribute('href'),hasIcon:!!el.querySelector('svg path')}))"
        )
        expected_socials=[
            ("Twitch","https://www.twitch.tv/ag0n1st"),
            ("YouTube","https://www.youtube.com/@Ag0n1st"),
            ("TikTok","https://www.tiktok.com/@ag0n1st"),
            ("Instagram","https://www.instagram.com/ag0n1st/"),
            ("X","https://x.com/Ag0n1st"),
            ("Discord","https://discord.gg/v2h9KKT")
        ]
        verify([(x["name"],x["href"]) for x in social_links]==expected_socials
               and all(x["hasIcon"] for x in social_links),
               label+": "+locale+" global footer contains six correct social logos in owner order")
        check_overflow(page,label+" "+locale+" homepage with six footer icons")
        cards=page.locator("#beitraege .guide-teaser-card")
        verify(cards.count()==3,label+": "+locale+" homepage contains three newest guides")
        hrefs=cards.locator("a.guide-teaser-link").evaluate_all("(els)=>els.map(el=>new URL(el.href).pathname)")
        expected=([prefix+"/endfield/operatoren/" if locale=="de" else prefix+"/endfield/operators/"])
        expected=[expected[0]+slug+"/" for slug in ["si","typhoeus","liino"]]
        verify(hrefs==expected,label+": "+locale+" latest guides in order with direct localized links")
        verify(cards.locator(".guide-teaser-category").count()==3,
               label+": every latest guide has right-side category tile")
        first=cards.first.locator(".guide-teaser-category")
        square=first.evaluate("(el)=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})")
        verify(abs(square["w"]-square["h"])<1,label+": category badge is square in "+locale)
        verify(first.locator("svg.guide-category-icon").count()==1 and
               ("Charakter" if locale=="de" else "Character") in (first.get_attribute("aria-label") or ""),
               label+": category uses Character naming in "+locale)
        page.goto(base_url+("/en/endfield/operators/" if locale=="en" else "/endfield/operatoren/"))
        elements=page.locator(".op-grid .op-element-chip")
        verify(elements.count()>=3 and elements.first.get_attribute("data-element") in ("cryo","electric","nature"),
               label+": "+locale+" operator index elements have source-keyed colored chips")
        verify("rgb" in elements.first.evaluate("(el)=>getComputedStyle(el).color"),
               label+": "+locale+" element colors are applied through the shared stylesheet")
        page.goto(base_url+prefix+"/endfield/")
        guide_cards=page.locator(".endfield-guide-teasers .guide-teaser-card")
        verify(guide_cards.count()==3,label+": "+locale+" Endfield overview lists three guides")
        verify(guide_cards.locator("a").first.get_attribute("href")==expected[0],
               label+": "+locale+" Endfield overview Si card opens same-locale guide")
        page.goto(base_url+expected[0])
        verify(page.locator("#ausruestung h2").first.inner_text()==
               ("Ausrüstung" if locale=="de" else "Gear"),
               label+": "+locale+" equipment/gear title matches terminology")
        verify("SKPORT-Item-IDs" not in page.locator("#ausruestung").inner_text(),
               label+": "+locale+" Si gear contains no internal numeric item ID caveats")
        check_overflow(page,label+" "+locale+" Si after guide feed changes")
    page.goto(base_url+"/en/endfield/tierlist/")
    verify(page.locator("html").get_attribute("lang")=="en" and
           "Community Tier List" in page.locator("main").inner_text() and
           page.locator('[data-community-tierlist] [data-tierlist-tab]').count()==3 and
           page.locator("main .placeholder-card").count()==0,
           label+": English Tierlist is a published translated community ranking")
    page.goto(base_url+"/endfield/tierlist/")
    verify(page.locator("html").get_attribute("lang")=="de" and
           "Community-Tierlist" in page.locator("main").inner_text() and
           page.locator('[data-community-tierlist] [data-tierlist-tab]').count()==3 and
           page.locator("main .placeholder-card").count()==0,
           label+": German Tierlist published with role tabs")
    page.goto(base_url+"/en/endfield/operators/typhoeus/")
    verify(page.locator("#fertigkeiten").count()==1 and
           page.locator("#ausruestung").count()==1 and
           page.locator("#potenziale").count()==1,
           label+": complete Typhoeus nine-section guide parity")
    check_overflow(page,label+" Typhoeus")
    page.goto(base_url+"/en/endfield/operators/liino/")
    verify(page.locator('meta[name="robots"][content*="noindex"]').count()==0,
           label+": editor-approved published Liino is indexable")
    verify(page.locator("#build-finder").count()==1,
           label+": published Liino retains full native Build Finder")
    check_overflow(page,label+" Liino")
    # Global language preference survives new navigation and direct DE URL visits.
    page.goto(base_url+"/en/endfield/factory/")
    page.evaluate("() => localStorage.setItem('ag0n1st:site-language','en')")
    page.goto(base_url+"/endfield/fabrik/",wait_until="domcontentloaded")
    page.wait_for_url("**/en/endfield/factory/")
    verify(page.locator("html").get_attribute("lang")=="en",
           label+": global English preference persists across a direct German URL")
    if width<=760:
        page.locator(".menu-toggle").click()
    page.locator('.language-switch a[lang="de"]').click()
    page.wait_for_url("**/endfield/fabrik/")
    verify(page.locator("html").get_attribute("lang")=="de" and
           page.evaluate("() => localStorage.getItem('ag0n1st:site-language')")=="de",
           label+": manually returning to German updates saved language preference")
    page.goto(base_url+"/endfield/fabrik/")
    verify(page.url.endswith("/endfield/fabrik/"),
           label+": German language selection remains stable after navigation")
    page.evaluate("() => localStorage.removeItem('ag0n1st:site-language')")
    # The two new utility pages must preserve parity, scroll safety and exact digit structure.
    for lang, route in (("de","/endfield/countdown/"),("en","/en/endfield/countdown/")):
        page.goto(base_url+route)
        verify(page.locator("html").get_attribute("lang")==lang and
               page.locator("[data-version-countdown] .countdown-digit").count()==6,
               label+": "+lang+" six-digit current-version countdown uses the shared layout")
        verify(page.locator("[data-countdown-ended][hidden]").count()==1 and
               ("Protokoll-Pass" if lang=="de" else "Protocol Pass") in page.locator(".countdown-source").inner_text(),
               label+": "+lang+" has a non-expired Protocol Pass comparison")
        check_overflow(page,label+" "+lang+" countdown")
        links=page.locator(".endfield-nav-link").all_text_contents()
        flat=[x.strip().replace("·","") for x in links]
        verify(len(flat)==11 and
               flat.index("Operator Roulette")+1==flat.index("Tierlist" if lang=="de" else "Tier List") and
               flat.index("Checkliste" if lang=="de" else "Checklist")==flat.index("Tierlist" if lang=="de" else "Tier List")+1 and
               flat.index("Endfieldle")==flat.index("Checkliste" if lang=="de" else "Checklist")+1 and
               flat.index("Countdown") == flat.index("Endfieldle")+1,
               label+": "+lang+" Roulette before Tierlist, Checklist after Tierlist and before Countdown")
        verify(all(not any(name in x for name in ("Rekrutierung","Veredelung","Essenzen","Recruitment","Refinement","Essences")) for x in flat) and
               all("Cheat" not in x or "Sheets" in x for x in flat),
               label+": "+lang+" removed three former standalone system links from Endfield nav")
        verify(page.locator(".endfield-nav-link").count()==11 and
               page.locator('a.endfield-nav-link[href="'+("/endfield/cheatsheets/" if lang=="de" else "/en/endfield/cheatsheets/")+'"]').count()==1,
               label+": "+lang+" eleven nav links include the single Cheat Sheets entry")
        verify(page.locator('a.endfield-nav-link[href="'+("/endfield/leaderboard/" if lang=="de" else "/en/endfield/leaderboard/")+'"] .nav-upcoming-wrench').count()==0 and
               page.locator('a.endfield-nav-link[href="'+("/endfield/cheatsheets/" if lang=="de" else "/en/endfield/cheatsheets/")+'"] .nav-upcoming-wrench').count()==0,
               label+": "+lang+" completed Leaderboard and live Cheat Sheets have no wrench")
        check=page.locator("[data-version-countdown]").evaluate(
            "(el)=>({utc:new Date(el.dataset.endsAt).toISOString(),local:el.dataset.endsLocal,hours:(Date.parse(el.dataset.endsAt)-Date.parse('2026-11-25T21:00:00Z'))/3600000})")
        verify(check["utc"]=="2026-11-25T22:00:00.000Z" and
               check["local"]=="2026-11-26T00:00:00+02:00" and check["hours"]==1 and
               ("MESZ (UTC+2)" if lang=="de" else "CEST (UTC+2)") in page.locator(".countdown-ends").inner_text(),
               label+": "+lang+" countdown deadline equals 00:00 at fixed UTC+2")
    for lang,route in (("de","/endfield/speedruns/"),("en","/en/endfield/speedruns/")):
        page.goto(base_url+route)
        verify(page.locator("html").get_attribute("lang")==lang and
               page.locator("main.endfield-utility-page").count()==1 and
               page.locator("a[href*='playlist?list=PLVTPc82MPn3E']").count()==1 and
               page.locator(".videos-grid .video-card").count()>=3,
               label+": "+lang+" speedrun area shows three verified owner playlist videos")
        for card in page.locator(".videos-grid .video-card").all():
            verify("youtube.com/watch?v=" in (card.get_attribute("href") or "") and
                   len(card.locator(".video-meta h3").inner_text().strip())>2,
                   label+": "+lang+" speedrun card has a real YouTube video and title")
        verify(page.locator(".videos-grid .video-card time").count()==0 and
               page.locator(".videos-grid [data-relative-time]").count()==0,
               label+": "+lang+" speedrun cards intentionally omit release timestamps")
        check_overflow(page,label+" "+lang+" speedruns")
    for lang,prefix in (("de",""),("en","/en")):
        page.goto(base_url+prefix+("/endfield/operatoren/" if lang=="de" else "/endfield/operators/"))
        badges=page.locator(".op-grid .op-card-new")
        verify(badges.count()==1 and badges.first.inner_text()=="NEW" and
               page.locator(".op-grid .op-card").first.locator(".op-card-new").count()==1,
               label+": "+lang+" latest released operator is uniquely marked NEW")
        verify(badges.first.is_visible() and badges.first.evaluate(
            "(el)=>({opacity:getComputedStyle(el).opacity,visibility:getComputedStyle(el).visibility})")=={"opacity":"1","visibility":"visible"},
            label+": "+lang+" NEW badge must be visible without hover")
        colors=page.locator(".op-grid .op-element-chip").evaluate_all(
            "(els)=>Object.fromEntries(els.filter(el=>['electric','electro','heat'].includes(el.dataset.element)).map(el=>[el.dataset.element,getComputedStyle(el).color]))")
        # The current three published guides have no Heat operator. Probe its style
        # with a temporary chip, rather than fabricating an operator in the index.
        heat_color=page.evaluate("""() => {
            const chip=document.createElement('span');
            chip.className='op-chip op-element-chip';chip.dataset.element='heat';
            document.body.appendChild(chip);
            const color=getComputedStyle(chip).color;chip.remove();return color;
        }""")
        verify(colors.get("electric",colors.get("electro"))=="rgb(255, 233, 133)" and heat_color=="rgb(255, 154, 159)",
               label+": "+lang+" Electro yellow and Heat red before hover")
        check_overflow(page,label+" "+lang+" operator index")
        for slug in ("si","liino"):
            route=prefix+("/endfield/operatoren/" if lang=="de" else "/endfield/operators/")+slug+"/"
            page.goto(base_url+route)
            details=page.locator('[data-guide-disclosure="equipment-matrix"]')
            verify(details.count()==1 and details.get_attribute("open") is None,
                   label+": "+lang+" "+slug+" matrix is enabled and initially collapsed")
            details.locator("summary").click()
            active=details.locator('[data-matrix-panel]:not([hidden])')
            verify(details.get_attribute("open") is not None and
                   active.locator(".op-equipment-matrix thead th img").count()==6 and
                   active.locator(".op-equipment-matrix tbody tr").count()==(5 if slug=="si" else 9) and
                   active.locator(".op-matrix-empty-row").count()==0,
                   label+": "+lang+" "+slug+" matrix shows guide-approved setups and all five gear slots")
            if slug=="si":
                # All six featured Type 50 and Xiranite v1.6 slugs now display official
                # tables and standard recipes, instead of the old placeholder.
                for legacy in ("eternal-xiranite-overalls",
                               "eternal-xiranite-channeling-gloves",
                               "eternal-xiranite-rangefinder",
                               "type-50-yinglung-soft-armor",
                               "type-50-yinglung-gloves-v16",
                               "type-50-yinglung-beacon"):
                    trigger=page.locator('#ausruestung .op-meta-build-parts [data-endfield-item-id="'+legacy+'"]').first
                    verify(trigger.count()==1,label+": "+lang+" Si "+legacy+" keeps original guide icon")
                    # Focus exercises the same shared popup without the next
                    # long tooltip intercepting Playwright's pointer during scroll.
                    trigger.focus()
                    popup=page.locator(".op-item-hover-panel:popover-open")
                    popup.wait_for(state="visible")
                    verify(popup.locator(".op-item-detail-table-scroll").count()>=2 and
                           popup.locator(".op-item-detail-section").count()>=3 and
                           popup.locator(".op-resource").count()==2 and
                           popup.locator(".op-item-detail-source").count()==1 and
                           popup.locator(".op-item-detail-empty").count()==0 and
                           [v.strip() for v in popup.locator(".op-resource-count").all_text_contents()]==["×360","×50"],
                           label+": "+lang+" Si "+legacy+" shows SKPORT stats, refining and recipe")
                    page.keyboard.press("Escape")
                    verify(not popup.is_visible(),label+": "+lang+" Si "+legacy+" tooltip closes normally")
                dps_names=[t.strip() for t in active.locator(".op-equipment-matrix tbody th[scope='row']").all_text_contents()]
                verify(dps_names==["MAIN-DPS-0","MAIN-DPS-1","MAIN-DPS-2","MAIN-DPS-3","MAIN-DPS-4"],
                       label+": "+lang+" Si DPS tab contains MAIN-DPS-0 through MAIN-DPS-4")
            cells=active.locator(".op-equipment-matrix tbody tr:first-child td:not(.op-matrix-gear-cell)").all_text_contents()
            verify(([x.strip() for x in cells]==["6526","+125.6%","+0%"] if slug=="si" else
                    [x.strip() for x in cells[:3]]==["1320 WILL","+0%","52.8%"] and len(cells)==5),
                   label+": "+lang+" "+slug+" DPS CSV numbers or Liino unverified cells remain exact")
            matrix_weapons=active.locator("[data-matrix-weapon-potential]")
            verify(matrix_weapons.count()==(5 if slug=="si" else 9) and
                   matrix_weapons.first.get_attribute("data-matrix-weapon-potential")=="P0" and
                   matrix_weapons.first.get_attribute("data-matrix-weapon-tuning")=="9/9/4" and
                   matrix_weapons.first.locator(".op-matrix-weapon-potential").inner_text()=="P0" and
                   matrix_weapons.first.locator(".op-matrix-weapon-tuning").inner_text()=="9/9/4",
                   label+": "+lang+" "+slug+" P0 and 9/9/4 badges overlay the correct weapon cell")
            note=active.locator(".op-matrix-source-note").inner_text()
            verify(("P0" in note) and
                   (("Jade Vessel" in note) if slug=="si" else ("P5" in note)),
                   label+": "+lang+" "+slug+" potential assumptions are explained below the matrix")
            if slug=="liino":
                p5=active.locator('[data-matrix-weapon-potential="P5"]')
                verify(p5.count()==3 and all(x=="9/9/9" for x in
                       p5.locator(".op-matrix-weapon-tuning").all_text_contents()),
                       label+": "+lang+" Liino P5 Golden Age rows show 9/9/9")
                verify(all("ffe985" in badge.evaluate("(el)=>getComputedStyle(el).color") or
                           badge.evaluate("(el)=>getComputedStyle(el).color")=="rgb(255, 233, 133)"
                           for badge in p5.locator(".op-matrix-weapon-label.is-p5").all()),
                       label+": "+lang+" P5 badges use yellow emphasis")
                verify(active.locator(".op-equipment-matrix tbody tr").nth(8).locator("td:not(.op-matrix-gear-cell)").first.inner_text().strip()=="—",
                       label+": "+lang+" unknown BP P5 metrics are omitted, not invented")
            gear_cell=active.locator(".op-matrix-scroller .op-matrix-gear-cell").nth(1)
            gear_icon=gear_cell.locator("[data-endfield-item-hover]")
            verify(gear_icon.count()==1 and gear_icon.get_attribute("tabindex")=="0",
                   label+": "+lang+" "+slug+" gear icon exposes details on focus")
            icon_alignment=gear_cell.evaluate("""cell=>{
                const td=cell.getBoundingClientRect();
                const trigger=cell.querySelector('[data-endfield-item-hover]').getBoundingClientRect();
                return Math.abs((td.left+td.right)/2-(trigger.left+trigger.right)/2);
            }""")
            verify(icon_alignment<4,label+": "+lang+" "+slug+" gear icons are horizontally centered in their own cells")
            gear_icon.hover()
            hover=page.locator(".op-item-hover-panel")
            hover.wait_for(state="visible")
            verify(hover.locator(".op-item-detail-header strong").count()==1 and
                   hover.locator(".op-item-detail-section h4").count()>=0 and
                   (("Mindestmaterialien" in hover.inner_text()) or ("Minimum crafting" in hover.inner_text()) or
                    ("keine vollständig geprüften" in hover.inner_text()) or ("Fully verified" in hover.inner_text())),
                   label+": "+lang+" "+slug+" gear preview reveals official details or clear unverified status")
            page.keyboard.press("Escape")
            verify(not hover.is_visible(),label+": "+lang+" "+slug+" Escape closes hover popup")
            gear_icon.focus()
            hover.wait_for(state="visible")
            page.keyboard.press("Escape")
            verify(not hover.is_visible(),label+": "+lang+" "+slug+" keyboard focus supports preview")
            check_overflow(page,label+" "+lang+" "+slug+" matrix")
            verify(page.locator("#uebersicht .op-element-chip").count()==1,
                   label+": "+lang+" "+slug+" guide profile has element-coloured chip")
            source_note=page.locator(".op-locale-note-bottom")
            verify(source_note.count()==1 and source_note.is_visible() and
                   source_note.evaluate("(el)=>el.previousElementSibling?.id==='fazit'"),
                   label+": "+lang+" "+slug+" SKPORT source snapshot comes after Fazit")
            active.locator("[data-matrix-expand]").click()
            dialog=details.locator("[data-matrix-dialog]")
            dialog.wait_for(state="visible")
            verify(dialog.evaluate("(el)=>el.open") and
                   dialog.locator(".op-matrix-dialog-scroll .op-equipment-matrix tbody tr").count()==(5 if slug=="si" else 9),
                   label+": "+lang+" "+slug+" complete matrix is shown in fullscreen dialog")
            verify(dialog.locator(".op-matrix-weapon-tile").count()==(5 if slug=="si" else 9) and
                   dialog.locator(".op-matrix-weapon-tuning").first.inner_text()=="9/9/4",
                   label+": "+lang+" "+slug+" weapon badges survive large-view cloning")
            bounds=dialog.evaluate("(el)=>({width:el.getBoundingClientRect().width,viewport:innerWidth,scroll:el.querySelector('[data-matrix-dialog-content]').scrollWidth,client:el.querySelector('[data-matrix-dialog-content]').clientWidth})")
            verify(bounds["width"]<=bounds["viewport"]+1 and bounds["client"]>0 and bounds["scroll"]>=bounds["client"],
                   label+": "+lang+" "+slug+" dialog remains inside viewport; table scrolls when needed")
            modal_icon=dialog.locator(".op-matrix-dialog-scroll .op-matrix-gear-cell [data-endfield-item-hover]").first
            modal_icon.hover()
            hover.wait_for(state="visible")
            verify(dialog.locator(".op-item-hover-panel").count()==1 and
                   hover.locator(".op-item-detail-header strong").count()==1,
                   label+": "+lang+" "+slug+" weapon hover preview opens above modal matrix without being clipped")
            page.keyboard.press("Escape")
            verify(dialog.evaluate("(el)=>el.open") and not hover.is_visible(),
                   label+": "+lang+" "+slug+" Escape first dismisses popover, not the matrix dialog")
            page.keyboard.press("Escape")
            verify(not dialog.evaluate("(el)=>el.open"),label+": "+lang+" "+slug+" Escape closes matrix")
            if slug=="si":
                tabs=details.locator('[data-matrix-tab]')
                verify(tabs.count()==2 and tabs.nth(0).inner_text().strip()=="DPS" and
                       tabs.nth(1).inner_text().strip()=="SUPPORT",
                       label+": "+lang+" Si has exactly the two requested DPS/SUPPORT tabs")
                verify(details.locator('[data-matrix-panel="dps"]').is_visible() and
                       not details.locator('[data-matrix-panel="support"]').is_visible(),
                       label+": "+lang+" Si starts with DPS only")
                tabs.nth(1).click()
                support=details.locator('[data-matrix-panel="support"]')
                verify(support.is_visible() and not details.locator('[data-matrix-panel="dps"]').is_visible() and
                       tabs.nth(1).get_attribute("aria-selected")=="true" and
                       support.locator(".op-equipment-matrix tbody tr").count()==14,
                       label+": "+lang+" switching to SUPPORT shows 14 distinct setups")
                support_names=[t.strip() for t in support.locator(".op-equipment-matrix tbody th[scope='row']").all_text_contents()]
                verify(support_names[:5]==["SUPPORT-DPS-0","SUPPORT-DPS-1","SUPPORT-DPS-2","SUPPORT-DPS-3","SUPPORT-DPS-4"],
                       label+": "+lang+" Si SUPPORT tab retains original SUPPORT-DPS-0 through SUPPORT-DPS-4")
                mix_names=[t.strip() for t in support.locator(".op-equipment-matrix tbody th[scope='row']").all_text_contents() if t.strip().startswith("SUPPORT-MIX-")]
                verify(mix_names==["SUPPORT-MIX-1","SUPPORT-MIX-2","SUPPORT-MIX-3","SUPPORT-MIX-4"],
                       label+": "+lang+" four uniquely ordered SUPPORT-MIX builds")
                mix_new=support.locator(".op-equipment-matrix tbody tr").nth(6)
                verify([x.strip() for x in mix_new.locator("td:not(.op-matrix-gear-cell)").all_text_contents()]==["5068","+98.7%","+49.4%"] and
                       mix_new.locator(".op-matrix-weapon-potential").inner_text().strip()=="P0" and
                       mix_new.locator(".op-matrix-gear-cell").count()==5,
                       label+": "+lang+" new SUPPORT-MIX-2 preserves CSV bonuses, five item slots and P0 weapon label")
                support_first=support.locator(".op-equipment-matrix tbody tr").first
                verify([x.strip() for x in support_first.locator("td:not(.op-matrix-gear-cell)").all_text_contents()]==["5830","+125.6%","+0%"],
                       label+": "+lang+" SUPPORT matrix uses original CSV data")
                verify([x.strip() for x in support.locator(".op-equipment-matrix tbody tr").nth(12).locator("td:not(.op-matrix-gear-cell)").all_text_contents()]==["5068","+0%","+108.1%"],
                       label+": "+lang+" SUPPORT ULT-4 now has explicit +108.1% rather than a missing value")
                support_last=support.locator(".op-equipment-matrix tbody tr").nth(13)
                verify("SUPPORT-ULT-5" in support_last.locator('th[scope="row"]').inner_text() and
                       [x.strip() for x in support_last.locator("td:not(.op-matrix-gear-cell)").all_text_contents()]==["5077","+0%","+107.9%"],
                       label+": "+lang+" final SUPPORT-ULT-5 is distinct, with signed CSV bonuses")
                support.locator("[data-matrix-expand]").click()
                dialog.wait_for(state="visible")
                verify(dialog.locator(".op-equipment-matrix tbody tr").count()==14 and
                       "SUPPORT" in dialog.locator("[data-matrix-dialog-variant]").inner_text(),
                       label+": "+lang+" large matrix follows selected SUPPORT tab")
                page.keyboard.press("Escape")
                verify(not dialog.evaluate("(el)=>el.open"),
                       label+": "+lang+" SUPPORT large view closes normally")
                tabs.nth(0).focus()
                page.keyboard.press("ArrowRight")
                verify(tabs.nth(1).get_attribute("aria-selected")=="true",
                       label+": "+lang+" tabs support keyboard arrow navigation")
                tabs.nth(0).click()
                verify(details.locator('[data-matrix-panel="dps"]').is_visible(),
                       label+": "+lang+" Si DPS setup restored")
            check_overflow(page,label+" "+lang+" "+slug+" after matrix dialog")
        page.goto(base_url+prefix+("/endfield/operatoren/typhoeus/" if lang=="de" else "/endfield/operators/typhoeus/"))
        verify(page.locator('[data-guide-disclosure="equipment-matrix"]').count()==0,
               label+": "+lang+" other operators do not render the optional matrix")
        page.goto(base_url+prefix+"/endfield/leaderboard/")
        root=page.locator("[data-community-leaderboard]")
        event=root.locator("[data-event-leaderboard]")
        verify(root.count()==1 and root.locator(".cl-container").count()==2 and
               event.count()==1 and root.locator(".cl-main-container").count()==1,
               label+": "+lang+" Duality event is shown above general leaderboard")
        badge=event.locator('[data-event-achievement="duality"]')
        verify(badge.count()==1 and badge.is_visible() and
               badge.locator('img[src="/images/endfield/leaderboard/duality-achievement.webp"]').count()==1 and
               badge.locator("img").evaluate("(im)=>im.complete && im.naturalWidth===160 && im.naturalHeight===160") and
               ("Discord-Achievement „Duality“" if lang=="de" else "Discord achievement ‘Duality’") in badge.get_attribute("aria-label") and
               badge.get_attribute("data-achievement-tooltip")==badge.get_attribute("aria-label"),
               label+": "+lang+" the approved Duality badge is loaded and locally labelled")
        headbox=event.locator(".cl-event-head").bounding_box()
        imagebox=badge.bounding_box()
        titlebox=event.locator(".cl-event-head h2").bounding_box()
        verify(abs(headbox["x"]+headbox["width"]-imagebox["x"]-imagebox["width"])<2 and
               titlebox["x"]+titlebox["width"] <= imagebox["x"]+2 and
               imagebox["width"]==(63 if page.evaluate("innerWidth")<=760 else 100),
               label+": "+lang+" event badge aligns at the trophy's top-right position without title overlap")
        badge.focus()
        page.wait_for_timeout(180)  # Allow the subtle tooltip opacity transition to settle.
        tooltip_state=badge.evaluate("""el=>({focused:document.activeElement===el,visible:getComputedStyle(el,'::after').visibility==='visible',opacity:parseFloat(getComputedStyle(el,'::after').opacity)})""")
        verify(tooltip_state["focused"] and tooltip_state["visible"] and tooltip_state["opacity"]>0.95,
               label+": "+lang+" achievement hint is accessible with keyboard focus: "+str(tooltip_state))
        event.locator("#cl-event-title").click()
        archive=event.locator("[data-event-archive]")
        verify(archive.count()==1 and
               not archive.evaluate("(el)=>el.open") and
               event.locator(".cl-event-archive-count").inner_text().strip()=="0" and
               event.locator("[data-no-current-event]").count()==0,
               label+": "+lang+" archive is collapsed and Duality is not prematurely archived")
        archive.locator("summary").click()
        verify(archive.evaluate("(el)=>el.open") and
               ("Noch keine" if lang=="de" else "No completed") in archive.locator(".cl-archive-empty").inner_text() and
               archive.locator(".cl-rank-row").count()==0,
               label+": "+lang+" empty archive has no fabricated results")
        archive.locator("summary").click()
        verify(not archive.evaluate("(el)=>el.open"),label+": "+lang+" archive closes again")
        event_select=event.locator("[data-event-select]")
        event_panel=event.locator('[data-event-panel="duality"]')
        details=event_panel.locator("[data-event-rules]")
        verify(event_select.input_value()=="duality" and
               event_panel.is_visible() and
               details.count()==1 and not details.evaluate("(el)=>el.open") and
               not details.locator(".cl-event-rule").first.is_visible() and
               event_panel.locator(".cl-event-rule").count()==6 and
               "Top 10 – Duality" in event_panel.locator(".cl-event-results h3").inner_text(),
               label+": "+lang+" Duality event selection and initially collapsed six rules")
        banner=event.locator('.cl-event-banner[src="/images/endfield/leaderboard/duality.webp"]')
        verify(banner.count()==1 and
               banner.evaluate("(el)=>el.complete&&el.naturalWidth===800&&el.naturalHeight===320") and
               banner.evaluate("(el)=>getComputedStyle(el).objectFit==='contain'"),
               label+": "+lang+" uploaded Duality banner remains full-res 800x320")
        bg=event.evaluate("""el=>{
            const st=getComputedStyle(el,'::before');
            return {image:st.backgroundImage,size:st.backgroundSize,position:st.backgroundPosition,opacity:st.opacity,
                    w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height};
        }""")
        verify("duality-background.webp" in bg["image"] and
               bg["size"]=="cover" and bg["position"]=="50% 50%" and
               bg["opacity"]=="0.05" and bg["w"]>0 and bg["h"]>0 and
               "/images/endfield/leaderboard/duality-background.webp" in event_panel.get_attribute("data-event-background"),
               label+": "+lang+" centered event-dependent 5-percent background uses cover")
        rule_summary=details.locator("summary")
        date=rule_summary.locator(".cl-event-date")
        verify(date.is_visible() and "15.10." in date.inner_text() and "25.11." in date.inner_text() and
               date.bounding_box()["x"]>rule_summary.locator(".cl-event-rules-title").bounding_box()["x"] and
               details.locator(".cl-event-rules-grid").is_visible()==False,
               label+": "+lang+" closed rules show only right-aligned event period")
        verify(event_panel.locator(".cl-event-description").count()==0,
               label+": "+lang+" redundant Duality intro text has been removed")
        rule_summary.click()
        verify(details.evaluate("(el)=>el.open") and details.locator(".cl-event-rule").first.is_visible(),
               label+": "+lang+" native rules details expand on click")
        texts=details.locator(".cl-event-rule").all_text_contents()
        verify(len(texts)==6 and
               ("RE-Krise" if lang=="de" else "RE-Crisis") in texts[0] and
               "Si" in texts[1] and "Damage Dealer" in texts[2] and
               ("Buff-Food" if lang=="de" else "buff food") in texts[3] and
               ("Potenzialbeschränkung" if lang=="de" else "potential restrictions").lower() in texts[4].lower(),
               label+": "+lang+" all six Duality rule cards expand and contain original rules")
        explanation_trigger=details.locator('[data-event-rule="damage-dealer"] [data-rule-explanation-open]')
        explanation_dialog=event_panel.locator("[data-rule-explanation-dialog]")
        verify(explanation_trigger.count()==1 and explanation_dialog.count()==1 and
               explanation_trigger.inner_text().strip()==("Erklärung" if lang=="de" else "Explanation") and
               not explanation_dialog.evaluate("(el)=>el.open"),
               label+": "+lang+" rule 3 offers a language-matched modal button")
        explanation_trigger.click()
        verify(explanation_dialog.evaluate("(el)=>el.open") and explanation_dialog.is_visible() and
               explanation_dialog.locator(".cl-rule-explanation-allowed .cl-rule-explanation-example").count()==2 and
               explanation_dialog.locator(".cl-rule-explanation-forbidden .cl-rule-explanation-example").count()==1 and
               explanation_dialog.locator("img").count()==3 and
               explanation_dialog.locator("img").evaluate_all("(items)=>items.every(x=>x.complete && x.naturalWidth>=349 && x.naturalHeight>=153)"),
               label+": "+lang+" rule 3 dialog opens with all three converted WebP examples")
        modal_layout=explanation_dialog.evaluate("""el=>{
            const a=el.querySelector(".cl-rule-explanation-allowed").getBoundingClientRect();
            const f=el.querySelector(".cl-rule-explanation-forbidden").getBoundingClientRect();
            return {ax:a.x,ay:a.y,fx:f.x,fy:f.y,scroll:el.scrollWidth,client:el.clientWidth};
        }""")
        verify((modal_layout["fx"]>modal_layout["ax"] if page.evaluate("window.innerWidth")>700 else modal_layout["fy"]>modal_layout["ay"]) and
               modal_layout["scroll"]<=modal_layout["client"]+1,
               label+": "+lang+" modal has side-by-side desktop or stacked mobile cards without horizontal overflow")
        page.keyboard.press("Escape")
        verify(not explanation_dialog.evaluate("(el)=>el.open") and explanation_trigger.evaluate("(el)=>document.activeElement===el"),
               label+": "+lang+" Escape closes modal and restores keyboard focus")
        verify(details.locator('[data-event-rule="submission"] a[href="https://bit.ly/3WEuGwD"]').count()==1,
               label+": "+lang+" rules link still points to Discord announcement reference")
        rule_summary.click()
        verify(not details.evaluate("(el)=>el.open") and not details.locator(".cl-event-rule").first.is_visible(),
               label+": "+lang+" rules collapse again without affecting event results")
        event_run=event_panel.locator(".cl-event-results .cl-rank-row")
        verify(event_run.count()==1 and event_run.get_attribute("data-run-status")=="verified" and
               event_run.locator(".cl-player").inner_text()=="Krombi" and
               event_run.locator(".cl-placeholder-label").count()==0 and
               event_run.locator(".cl-rank-number").inner_text().strip()=="1" and
               event_run.locator(".cl-run-time a").inner_text().strip().startswith("01:29") and
               event_run.locator(".cl-run-time a").get_attribute("href")=="https://youtu.be/24_sKEqnCm0" and
               event_run.locator(".cl-run-version").inner_text()=="v1.6" and
               event_panel.locator(".cl-event-results .cl-empty-row").count()==0 and
               event_panel.locator(".cl-demo-disclaimer").count()==0,
               label+": "+lang+" Krombi is first verified Duality run with no placeholder label")
        verify([x.strip() for x in event_run.locator(".cl-operator-potential").all_text_contents()]==["P4","P3","P4","P2"] and
               [x.get_attribute("src") for x in event_run.locator(".cl-team-operator img").all()]==[
                  "/images/endfield/operators/si/official-icon.webp",
                  "/images/endfield/operators/arcane/official-icon.webp",
                  "/images/endfield/operators/tangtang/official-icon.webp",
                  "/images/endfield/operators/gilberta/official-icon.webp"] and
               event_run.locator(".cl-operator-potential.is-p5").count()==0 and
               event_run.locator(".cl-country-flag.cl-flag-de").count()==1 and
               event_run.locator(".cl-country-flag.cl-flag-de").get_attribute("aria-label")==("Deutschland" if lang=="de" else "Germany"),
               label+": "+lang+" real DE flag and Si P4 / Arcane P3 / Tangtang P4 / Gilberta P2 icons")
        headings=page.evaluate("""() => ({
          event:getComputedStyle(document.querySelector('.cl-event-head h2')).fontSize,
          community:getComputedStyle(document.querySelector('.cl-community-head h1')).fontSize
        })""")
        verify(headings["event"]==headings["community"],
               label+": "+lang+" Event and Community title font sizes are equal")
        boss_cards=root.locator("[data-boss-choice]")
        boss_order=[b.get_attribute("data-boss-choice") for b in boss_cards.all()]
        verify(boss_order==["si","alleikhreos","nefarith","ruan-yi","marble-aggelomoirai","triaggelos","rhodagn"] and
               boss_cards.count()==7 and
               root.locator('[data-boss-choice="si"] img[src="/images/endfield/operators/si/official-portrait.webp"]').count()==1,
               label+": "+lang+" seven verified boss images retain reverse order")
        boss_select=root.locator("[data-boss-select]")
        version_select=root.locator("[data-version-select]")
        verify(boss_select.input_value()=="si" and version_select.input_value()=="all-time" and
               version_select.locator("option").all_text_contents()==["All-Time","v1.6"] and
               root.locator('[data-boss-choice="si"]').get_attribute("aria-pressed")=="true",
               label+": "+lang+" Si is selected in both boss selectors by default")
        active=root.locator(".cl-results-panel:not([hidden])")
        verify(active.count()==1 and "Si" in active.locator("h3").inner_text() and
               active.locator(".cl-rank-row").count()==1 and
               active.locator(".cl-rank-number").inner_text().strip()=="1",
               label+": "+lang+" global Si All-Time shows the verified Krombi result")
        row=active.locator(".cl-rank-row")
        verify(row.get_attribute("data-run-status")=="verified" and
               row.locator(".cl-player").inner_text()=="Krombi" and
               row.locator(".cl-placeholder-label").count()==0 and
               row.locator(".cl-run-time a").inner_text().startswith("01:29") and
               row.locator(".cl-run-time a").get_attribute("href")=="https://youtu.be/24_sKEqnCm0" and
               row.locator(".cl-run-version").inner_text()=="v1.6" and
               row.locator(".cl-team-operator").count()==4 and
               active.locator(".cl-demo-disclaimer").count()==0,
               label+": "+lang+" community Si leaderboard hides former demo and links real 01:29 record")
        flag=row.locator(".cl-country .cl-flag-de")
        verify(flag.count()==1 and
               flag.get_attribute("aria-label")==("Deutschland" if lang=="de" else "Germany") and
               "linear-gradient" in flag.evaluate("(el)=>getComputedStyle(el).backgroundImage"),
               label+": "+lang+" DE country code renders as a CSS German tricolor")
        icons=row.locator(".cl-team-operator")
        verify(icons.count()==4 and
               [x.strip() for x in row.locator(".cl-operator-potential").all_text_contents()]==["P4","P3","P4","P2"] and
               [x.get_attribute("src") for x in icons.locator("img").all()]==[
                 "/images/endfield/operators/si/official-icon.webp",
                 "/images/endfield/operators/arcane/official-icon.webp",
                 "/images/endfield/operators/tangtang/official-icon.webp",
                 "/images/endfield/operators/gilberta/official-icon.webp"] and
               row.locator(".cl-operator-potential.is-p5").count()==0,
               label+": "+lang+" the global result uses the exact same four operators and potentials")
        notice=root.locator(".cl-update-notice")
        verify(notice.count()==1 and
               ("am Ende der Woche" if lang=="de" else "at the end of the week") in notice.inner_text() and
               notice.evaluate("(el)=>getComputedStyle(el).borderLeftWidth")=="3px" and
               notice.evaluate("(el)=>getComputedStyle(el).borderLeftColor")=="rgb(101, 232, 242)",
               label+": "+lang+" guide-style weekly update disclaimer is visible above both leaderboards")
        boss_cards.last.click()
        verify(boss_select.input_value()=="rhodagn" and
               root.locator('[data-boss-choice="rhodagn"]').get_attribute("aria-pressed")=="true" and
               root.locator(".cl-results-panel:not([hidden]) .cl-empty-row").count()==1 and
               "boss=rhodagn" in page.url,
               label+": "+lang+" other boss has empty ranks, dropdown synced and link restored")
        boss_select.select_option("si")
        version_select.select_option("v1.6")
        verify(root.locator(".cl-results-panel:not([hidden]) .cl-rank-row").count()==1 and
               "version=v1.6" in page.url and
               root.locator(".cl-results-panel:not([hidden]) .cl-player").inner_text()=="Krombi",
               label+": "+lang+" v1.6 patch ranking uses the verified Krombi run")
        page.reload()
        root=page.locator("[data-community-leaderboard]")
        verify(root.locator("[data-boss-select]").input_value()=="si" and
               root.locator("[data-version-select]").input_value()=="v1.6" and
               root.locator(".cl-results-panel:not([hidden]) .cl-rank-row").count()==1 and
               root.locator('[data-event-panel="duality"]').is_visible(),
               label+": "+lang+" query and Duality event survive reload")
        check_overflow(page,label+" "+lang+" leaderboard")
        page.goto(base_url+prefix+"/endfield/cheatsheets/")
        cheats_title=page.locator("main h1.endfield-cheatsheets-title")
        verify(cheats_title.count()==1 and
               cheats_title.inner_text()=="Cheat Sheets." and
               cheats_title.evaluate("(el)=>({height:el.getBoundingClientRect().height,line:parseFloat(getComputedStyle(el).lineHeight),nowrap:getComputedStyle(el).whiteSpace})")["nowrap"]=="nowrap" and
               cheats_title.locator(".title-period").count()==1,
               label+": "+lang+" Cheat Sheets title stays on one line with inline period")
        verify(page.locator("#refinement").count()==1 and
               page.locator("#artificing").count()==1 and
               page.locator(".endfield-coming-card").count()==3 and
               all(page.locator("#"+x).count()==1 for x in ("recruitment","refinement","essences","elasticgoods","artificing","bufffood")) and
               page.locator(".endfield-cheatsheets-upcoming .endfield-coming-card").count()==3 and
               page.locator("[data-cheatsheets-group]").count()==0 and
               page.locator("#elasticgoods").evaluate("(el)=>el.compareDocumentPosition(document.querySelector('#refinement')) & Node.DOCUMENT_POSITION_FOLLOWING")!=0,
               label+": "+lang+" Elastic Goods comes first, Refinement second, then three ungrouped placeholders")
        verify(page.locator("#cheatsheets-systems-heading").count()==0 and
               page.locator("#cheatsheets-reference-heading").count()==0 and
               page.locator("#refinement-panel-primary:not([hidden]) .refinement-attribute-card").count()==4 and
               page.locator("#refinement-panel-primary:not([hidden]) .refinement-mini-card").count()==12 and
               page.locator("#refinement-panel-primary:not([hidden]) .refinement-good-match").count()>0 and
               page.locator("#refinement-panel-primary:not([hidden]) .op-item-hover-trigger").count()>0 and
               page.locator('[data-refinement-attribute="agi"][data-refinement-slot="Kit"]').get_attribute("data-refinement-item-id")=="350" and
               page.locator('[data-refinement-attribute="will"][data-refinement-slot="Kit"]').get_attribute("data-refinement-item-id")=="348",
               label+": "+lang+" four official primary attribute cards with real gear and highlighted matches")
        eg=page.locator("[data-elastic-goods]")
        verify(eg.count()==1 and eg.locator("#eg-title").inner_text()==("Elastische Waren - Preis Peaks" if lang=="de" else "Elastic Goods – Price Peaks") and
               eg.locator('[data-peak="low"]').count()==1 and
               eg.locator('[data-peak="mid"]').count()==1 and
               eg.locator('[data-peak="high"]').count()==1 and
               eg.locator('[data-elastic-good]').count()==25 and
               eg.locator('[data-origin="valley"]').count()==3 and
               eg.locator('[data-origin="wuling"]').count()==3 and
               eg.locator('[data-elastic-good="chubby-lung-balloon"]').count()==1 and
               eg.locator('[data-elastic-good="wuxia-movies"]').count()==1,
               label+": "+lang+" 25 Elastic Goods cards grouped in three peaks and two origins")
        verify(("< 1.000" if lang=="de" else "< 1,000") in eg.locator(".eg-buy").inner_text() or
               "< 1.000" in eg.locator(".eg-buy").inner_text(),
               label+": "+lang+" buy-below-1000 guidance is visible")
        tabs=eg.locator('[data-eg-region-tab]')
        wuling=eg.locator('[data-eg-region-tab="wuling"]')
        valley=eg.locator('[data-eg-region-tab="valley"]')
        verify(("Wichtig" if lang=="de" else "Important") in eg.locator(".eg-key-takeaway").text_content() and
               tabs.count()==2 and wuling.get_attribute("aria-selected")=="true" and
               valley.get_attribute("aria-selected")=="false" and
               wuling.inner_text().strip()=="Wuling" and
               valley.inner_text().strip()==("Tal IV" if lang=="de" else "Valley IV") and
               eg.locator('[data-origin="wuling"]:visible').count()==3 and
               eg.locator('[data-origin="valley"]:visible').count()==0 and
               eg.locator('.eg-item:visible').count()==13 and
               eg.locator(".eg-tips").get_attribute("open") is None and
               eg.locator(".eg-region-panel").count()==0 and
               eg.locator('[data-eg-region-panel]').get_attribute("aria-labelledby")=="eg-region-tab-wuling",
               label+": "+lang+" Wuling preselected and future-ready region selector shows only its 13 items")
        for icon in eg.locator('[data-origin="wuling"] img.eg-item-icon').all():
            icon.scroll_into_view_if_needed()
        verify(eg.locator('[data-origin="wuling"] img.eg-item-icon').evaluate_all("(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth===128&&im.naturalHeight===128)") and
               eg.locator(".eg-item img.eg-item-icon").count()==25 and
               eg.locator(".eg-legend").count()==0 and
               eg.locator(".eg-source").count()==0 and
               eg.locator(".eg-item-icon-pending").count()==0 and
               eg.evaluate("(el)=>el.scrollWidth<=el.clientWidth+1"),
               label+": "+lang+" 25 correct local Package WebPs load without placeholder assets or overflow")
        redistribution=eg.locator(".eg-stock-redistribution-art")
        verify(redistribution.count()==1 and
               redistribution.get_attribute("alt")=="" and redistribution.get_attribute("aria-hidden")=="true" and
               redistribution.evaluate("(img)=>img.complete&&img.naturalWidth===118&&img.naturalHeight===118&&getComputedStyle(img).opacity==='0.22'&&getComputedStyle(img).filter.includes('grayscale(1)')") and
               redistribution.evaluate("(img)=>Math.abs(img.getBoundingClientRect().right-img.parentElement.getBoundingClientRect().right)<1.5") and
               redistribution.evaluate("(img)=>Math.abs(img.getBoundingClientRect().width-(innerWidth>760?100:63))<1.5"),
               label+": "+lang+" subtle grey Stock Redistribution decoration aligns with card heading top right")
        curr=eg.locator(".eg-currency-icon")
        verify(eg.locator("[data-eg-price]").count()==3 and curr.count()==6 and
               eg.locator('[data-eg-currency="wuling"]:visible').count()==3 and
               eg.locator('[data-eg-currency="valley"]:visible').count()==0 and
               eg.locator('[data-eg-currency="wuling"]:visible').evaluate_all(
                   "(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth===56&&im.naturalHeight===36)") and
               all(("Wuling-Währung" if lang=="de" else "Wuling currency") == image.get_attribute("alt")
                   for image in eg.locator('[data-eg-currency="wuling"]').all()) and
               all(eg.locator('[data-peak="'+peak+'"] [data-eg-currency="wuling"]:visible').count()==1
                   for peak in ("low","mid","high")),
               label+": "+lang+" all three peak ranges show the correct local Wuling currency symbol")
        verify(("Höchster Peak dieser Waren" if lang=="de" else "These goods peak at") in eg.locator('[data-peak="low"] .eg-peak-heading p').inner_text() and
               ("keinen Mid- oder High-Peak" if lang=="de" else "cannot reach a Mid or High Peak") in eg.locator('[data-peak="low"] .eg-peak-heading p').inner_text() and
               ("Low- oder Mid-Peaks" if lang=="de" else "Low or Mid Peaks") in eg.locator('[data-peak="high"] .eg-peak-heading p').inner_text() and
               eg.locator(".eg-peaks-note").inner_text().strip()==("Die Preisbereiche basieren auf Beobachtungen der Community und zeigen den höchsten Peak der jeweiligen Waren." if lang=="de" else "The price ranges are based on community observations and show the highest peak of each good."),
               label+": "+lang+" peak tiers explain maximum attainable values and lower interim peaks")
        currency_width=eg.locator('[data-eg-currency="wuling"]:visible').first.evaluate("(el)=>el.getBoundingClientRect().width")
        verify(abs(currency_width-(42 if page.evaluate("innerWidth")>1185 else 30))<1.1 and
               eg.locator('[data-eg-currency="wuling"]:visible').first.evaluate(
                 "(img)=>img.getBoundingClientRect().height < parseFloat(getComputedStyle(img.parentElement.querySelector('.eg-range')).fontSize)") and
               eg.locator(".eg-price").first.evaluate("(el)=>el.scrollWidth<=el.clientWidth+1"),
               label+": "+lang+" currency symbol is 130% of original size yet shorter than price numbers")
        styles=eg.locator(".eg-region-tab").evaluate_all(
          "(tabs)=>tabs.map(el=>({id:el.dataset.egRegionTab,selected:el.getAttribute('aria-selected'),color:getComputedStyle(el).backgroundColor,accent:getComputedStyle(el).getPropertyValue('--eg-accent').trim()}))")
        verify(len(styles)==2 and
               styles[0]["color"]!=styles[1]["color"] and
               styles[0]["color"]!="rgb(27, 28, 39)" and
               styles[1]["color"]!="rgb(27, 28, 39)" and
               styles[0]["accent"]=="#4cdbd5" and styles[1]["accent"]=="#e0ed48",
               label+": "+lang+" Wuling and Valley IV tabs have distinct origin-colored backgrounds")
        verify(eg.locator('[data-peak="low"] .eg-range').inner_text()==("4.600–4.800" if lang=="de" else "4,600–4,800") and
               eg.locator('[data-peak="mid"] .eg-range').inner_text()==("4.800–5.100" if lang=="de" else "4,800–5,100") and
               eg.locator('[data-peak="high"] .eg-range').inner_text()==("5.100–5.400" if lang=="de" else "5,100–5,400") and
               eg.locator(".eg-range").first.evaluate("(el)=>getComputedStyle(el).fontSize")==
                  eg.locator(".eg-trade-step strong").first.evaluate("(el)=>getComputedStyle(el).fontSize") and
               eg.locator(".eg-peak-low").evaluate("(el)=>getComputedStyle(el).getPropertyValue('--eg-peak-accent').trim()")=="#efa251",
               label+": "+lang+" approved price bands, enlarged ranges and orange Low Peak")
        visible_grid=eg.locator('[data-peak="mid"] [data-origin="wuling"] .eg-item-grid')
        verify(visible_grid.evaluate("(el)=>getComputedStyle(el).gridTemplateColumns.split(' ').length")==(5 if page.evaluate("innerWidth")>960 else (4 if page.evaluate("innerWidth")>680 else 2)),
               label+": "+lang+" active goods fill five desktop columns or two mobile columns")
        verify(eg.locator(".eg-tips:not([open])").count()==1 and
               eg.locator(".eg-region-tab[aria-selected='true']").count()==1 and
               eg.locator('[data-origin="valley"] img.eg-item-icon').count()==12,
               label+": "+lang+" optional tips and all 12 Valley IV assets are preserved")
        valley.click()
        verify(eg.locator('[data-peak="high"] .eg-range').inner_text()==("5.100–5.500" if lang=="de" else "5,100–5,500") and
               eg.locator('[data-peak="low"] .eg-range').inner_text()==("4.600–4.800" if lang=="de" else "4,600–4,800") and
               eg.locator('[data-peak="mid"] .eg-range').inner_text()==("4.800–5.100" if lang=="de" else "4,800–5,100"),
               label+": "+lang+" Valley IV reaches 5500 while Low/Mid remain unchanged")
        verify(eg.locator('[data-eg-region-tab="valley"]').evaluate(
                    "(el)=>getComputedStyle(el).backgroundColor")!=
               eg.locator('[data-eg-region-tab="wuling"]').evaluate(
                    "(el)=>getComputedStyle(el).backgroundColor"),
               label+": "+lang+" selected Valley IV has a distinct lime-colored tab background")
        verify(eg.locator('[data-eg-currency="valley"]:visible').count()==3 and
               eg.locator('[data-eg-currency="wuling"]:visible').count()==0 and
               eg.locator('[data-eg-currency="valley"]:visible').evaluate_all(
                 "(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth===56&&im.naturalHeight===36)") and
               all(("Tal-IV-Währung" if lang=="de" else "Valley IV currency") == image.get_attribute("alt")
                   for image in eg.locator('[data-eg-currency="valley"]').all()),
               label+": "+lang+" all three price ranges switch to the Valley IV currency icon")
        verify(valley.get_attribute("aria-selected")=="true" and wuling.get_attribute("aria-selected")=="false" and
               eg.locator('[data-origin="wuling"]:visible').count()==0 and
               eg.locator('[data-origin="valley"]:visible').count()==3 and
               eg.locator(".eg-item:visible").count()==12 and
               eg.locator('[data-eg-region-panel]').get_attribute("aria-labelledby")=="eg-region-tab-valley",
               label+": "+lang+" Valley IV tab shows all 12 correct assets, hides Wuling")
        for icon in eg.locator('[data-origin="valley"] img.eg-item-icon').all():
            icon.scroll_into_view_if_needed()
        verify(eg.locator('[data-origin="valley"] img.eg-item-icon').evaluate_all("(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth===128&&im.naturalHeight===128)"),
               label+": "+lang+" Valley IV pictures finish loading on demand")
        valley.focus()
        valley.press("ArrowLeft")
        verify(wuling.get_attribute("aria-selected")=="true" and
               wuling.evaluate("(el)=>document.activeElement===el") and
               eg.locator(".eg-item:visible").count()==13,
               label+": "+lang+" Left Arrow selects Wuling and restores tab focus")
        wuling.press("End")
        verify(valley.get_attribute("aria-selected")=="true" and
               valley.evaluate("(el)=>document.activeElement===el"),
               label+": "+lang+" End selects last region with accessible keyboard controls")
        valley.press("Home")
        verify(eg.locator('[data-peak="high"] .eg-range').inner_text()==("5.100–5.400" if lang=="de" else "5,100–5,400") and
               eg.locator('[data-eg-currency="wuling"]:visible').count()==3 and
               eg.locator('[data-eg-currency="valley"]:visible').count()==0,
               label+": "+lang+" keyboard region selection also restores Wuling currency icons")
        verify(wuling.get_attribute("aria-selected")=="true" and eg.locator(".eg-item:visible").count()==13,
               label+": "+lang+" Home restores first region Wuling")
        eg.locator(".eg-tips summary").click()
        verify(eg.locator(".eg-tips").get_attribute("open") is not None,
               label+": "+lang+" educational extra tips can expand on demand")
        verify(("Ankhor-Küchenzubehör" if lang=="de" else "Ankhorilling Kitchenware") in
               eg.locator('[data-elastic-good="kitchenware"]').text_content() and
               ("Aero-Empfänger" if lang=="de" else "Aerial Receptionists") in
               eg.locator('[data-elastic-good="aero-receiver"]').text_content() and
               ("Chubby-Lung-Wetterbalon" if lang=="de" else "Chubby Lung Blimp") in
               eg.locator('[data-elastic-good="chubby-lung-balloon"]').text_content(),
               label+": "+lang+" operator-approved item names are rendered")
        page.locator('[data-refinement-tab="damage"]').click()
        verify(page.locator('#refinement-panel-damage:visible .refinement-attribute-card').count()==9 and
               page.locator('#refinement-panel-primary:visible').count()==0 and
               page.locator('#refinement-panel-damage [data-refinement-attribute="physical"].refinement-good-match').count()==0,
               label+": "+lang+" switching to nine damage attributes does not mix panels")
        page.locator('[data-refinement-tab="utility"]').click()
        verify(page.locator('#refinement-panel-utility:visible .refinement-attribute-card').count()==9 and
               page.locator('[data-refinement-attribute="atk"].refinement-empty').count()==3 and
               page.locator('[data-refinement-attribute="main"][data-refinement-slot="Kit"]').get_attribute("data-refinement-item-id")=="365" and
               page.locator('[data-refinement-attribute="secondary"][data-refinement-slot="Kit"]').get_attribute("data-refinement-item-id")=="1127" and
               page.locator('[data-refinement-attribute="main"].refinement-empty').count()==2 and
               page.locator('[data-refinement-attribute="secondary"].refinement-empty').count()==1 and
               all("%" in value for value in page.locator('#refinement-panel-utility [data-refinement-attribute="main"] .refinement-number').all_inner_texts()) and
               all("%" in value for value in page.locator('#refinement-panel-utility [data-refinement-attribute="secondary"] .refinement-number').all_inner_texts()),
               label+": "+lang+" nine utility attributes and missing ATK source kept explicit")
        page.locator('[data-refinement-tab="primary"]').click()
        trigger=page.locator("#refinement-panel-primary .op-item-hover-trigger").first
        trigger.hover()
        verify(page.locator(".op-item-hover-panel:popover-open").count()==1,
               label+": "+lang+" official mini-card icon uses shared popup with full item stats")
        for old,anchor in (("rekrutierung" if lang=="de" else "recruitment","recruitment"),
                           ("veredelung" if lang=="de" else "refinement","refinement"),
                           ("essenzen" if lang=="de" else "essences","essences")):
            old_path=base_url+prefix+"/endfield/"+old+"/"
            old_response=page.request.get(old_path)
            dest=prefix+"/endfield/cheatsheets/#"+anchor
            verify(old_response.status==200 and
                   'http-equiv="refresh"' in old_response.text() and
                   dest in old_response.text() and
                   'noindex,follow' in old_response.text(),
                   label+": "+lang+" previous "+old+" link forwards to the correct Cheat Sheets section")
        check_overflow(page,label+" "+lang+" cheatsheets")

        # Community tier list: archived August placements with all three roles,
        # real offline operator icons and responsive, keyboard-operable tabs.
        page.goto(base_url+prefix+"/endfield/tierlist/")
        board=page.locator("[data-community-tierlist]")
        notice=page.locator(".tierlist-card .tierlist-disclaimer")
        heading=page.locator(".tierlist-page h1")
        expected_date="23/08/2026" if lang=="en" else "23.08.2026"
        verify(notice.count()==1 and
               notice.locator('time[datetime="2026-08-23"]').count()==1 and
               page.locator("main time").count()==1 and
               expected_date in notice.inner_text() and
               ("Die Tierlist wird immer zusammen mit der Community Live im Stream erstellt" if lang=="de" else
                "The tier list is always created live on stream together with the community") in notice.inner_text() and
               page.locator(".tierlist-date, .tierlist-caption, .tierlist-lead").count()==0,
               label+": "+lang+" one dated disclaimer directly under card heading; no redundant caption")
        title_end=heading.locator(".tierlist-title-end")
        dot=title_end.locator(".title-period")
        verify(heading.count()==1 and dot.count()==1 and
               dot.evaluate("(el)=>Math.abs(el.getBoundingClientRect().top-el.parentElement.getBoundingClientRect().top)<3") and
               "nowrap"==title_end.evaluate("(el)=>getComputedStyle(el).whiteSpace") and
               heading.inner_text().endswith("."),
               label+": "+lang+" tierlist period stays attached to title")
        verify(board.count()==1 and
               board.get_attribute("data-tierlist-date")=="2026-08-23" and
               page.locator('[data-tierlist-tab]').count()==3 and
               page.locator('[data-tierlist-panel]').count()==3 and
               page.locator('[data-tierlist-panel="damage-dealer"]:visible').count()==1 and
               page.locator('[data-tierlist-panel="damage-dealer"] [data-tierlist-rank="S"] [data-operator]').count()==3 and
               page.locator('[data-tierlist-panel="damage-dealer"] [data-tierlist-rank="D"] [data-operator="da-pan"]').count()==1 and
               page.locator('[data-tierlist-panel="damage-dealer"] [data-tierlist-rank="F"] [data-operator]').count()==0,
               label+": "+lang+" August community Damage Dealer tiers and date")
        verify(page.locator('[data-tierlist-panel="damage-dealer"] img[src^="/images/endfield/operators/"]').count()==11 and
               page.locator('[data-tierlist-tab="damage-dealer"]').get_attribute("aria-selected")=="true" and
               page.locator('a.endfield-nav-link[href="'+prefix+'/endfield/tierlist/"]').get_attribute("title") is None,
               label+": "+lang+" local operator icons and published tierlist navigation")
        page.locator('[data-tierlist-tab="enabler"]').click()
        verify(page.locator('[data-tierlist-panel="enabler"]:visible [data-tierlist-rank="S"] [data-operator]').count()==4 and
               page.locator('[data-tierlist-panel="enabler"]:visible [data-tierlist-rank="A"] [data-operator="chen-qianyu"]').count()==1 and
               page.locator('[data-tierlist-panel="damage-dealer"]:visible').count()==0 and
               page.locator('[data-tierlist-tab="enabler"]').get_attribute("aria-selected")=="true",
               label+": "+lang+" Enabler tab isolates correct stream rankings")
        page.locator('[data-tierlist-tab="enabler"]').press("ArrowRight")
        verify(page.locator('[data-tierlist-tab="buffer"]').get_attribute("aria-selected")=="true" and
               page.locator('[data-tierlist-panel="buffer"]:visible [data-tierlist-rank="S"] [data-operator]').count()==3 and
               page.locator('[data-tierlist-panel="buffer"]:visible [data-tierlist-rank="C"] [data-operator="pogranichnik"]').count()==1 and
               page.locator('[data-tierlist-panel="buffer"]:visible [data-tierlist-rank="D"] [data-operator]').count()==0 and
               page.locator('[data-tierlist-panel="buffer"]:visible [data-tierlist-rank="F"] [data-operator]').count()==0,
               label+": "+lang+" keyboard tabs and only supplied Buffer placements")
        check_overflow(page,label+" "+lang+" community tierlist")
        page.locator('[data-tierlist-tab="buffer"]').press("Home")
        verify(page.locator('[data-tierlist-tab="damage-dealer"]').get_attribute("aria-selected")=="true",
               label+": "+lang+" tierlist Home key returns to first role")

        # The same four team slots survive spins across different categories.
        page.goto(base_url+prefix+"/endfield/operator-roulette/")
        roulette=page.locator("[data-operator-roulette]")
        roulette.locator(".or-wheel-icon").first.wait_for(state="attached")
        links=[a.get_attribute("href") for a in page.locator(".endfield-nav-link").all()]
        wheel_href=prefix+"/endfield/operator-roulette/"
        list_href=prefix+"/endfield/tierlist/"
        check_href=prefix+("/endfield/checklist/" if lang=="en" else "/endfield/checkliste/")
        verify(links.index(wheel_href)+1==links.index(list_href) and
               links.index(list_href)+1==links.index(check_href) and
               page.locator('a.endfield-nav-link[href="'+wheel_href+'"][aria-current="page"]').count()==1,
               label+": "+lang+" Roulette > Tierlist > Checklist navbar order")
        note=roulette.locator(".or-source").inner_text()
        verify(("23.08.2026" if lang=="de" else "23 August 2026") in note and
               "Si" in note and "Purrchena" in note,
               label+": "+lang+" source disclosure and manually added roles")
        verify(roulette.locator(".or-wheel-icon").count()==33 and
               roulette.locator(".or-wheel-icon").first.evaluate(
                 "(im)=>im.complete&&im.naturalWidth>0&&getComputedStyle(im).borderRadius==='50%'") and
               roulette.locator(".or-wheel-segment").evaluate_all("""segments=>segments.every(el=>{
                   const point=el.getBoundingClientRect(),img=el.querySelector('img').getBoundingClientRect();
                   return Math.abs(point.x-(img.x+img.width/2))<2 &&
                          Math.abs(point.y-(img.y+img.height/2))<2;
                 })"""),
               label+": "+lang+" 33 local circular operator portraits on the wheel")
        verify([roulette.locator('[data-roulette-role="'+role+'"] [data-roulette-count]').inner_text()
                 for role in ("damage-dealer","enabler","buffer")]==["12","16","11"],
               label+": "+lang+" exact community roles with Si and Purrchena")
        hub=roulette.locator("[data-roulette-hub]")
        wheel=roulette.locator("[data-roulette-wheel]")
        verify(hub.count()==1 and hub.get_attribute("type")=="button" and
               hub.locator('img[src="/images/ag0n1st-logo.svg"]').count()==1 and
               hub.is_enabled() and
               ("drehen" if lang=="de" else "Spin") in hub.get_attribute("aria-label"),
               label+": "+lang+" existing Ag0n1st logo is accessible central spin button")

        if width==1440 and lang=="de":
            # Test real full-duration animation, not just the reduced-motion
            # 350 ms fast path used by the normal 4 x 2 locale smoke suite.
            page.emulate_media(reduced_motion="no-preference")
            initial=wheel.evaluate("(el)=>getComputedStyle(el).transform")
            hub.click()
            verify(hub.is_disabled() and roulette.locator("[data-roulette-spin]").is_disabled() and
                   roulette.locator("[data-roulette-progress]").inner_text().strip()=="0 / 4",
                   label+": "+lang+" logo click starts spin and disables both triggers")
            page.wait_for_timeout(1100)
            motion=wheel.evaluate("(el)=>({transform:getComputedStyle(el).transform,duration:getComputedStyle(el).transitionDuration})")
            verify(motion["duration"]=="14s" and motion["transform"]!=initial and
                   roulette.locator("[data-roulette-progress]").inner_text().strip()=="0 / 4",
                   label+": "+lang+" roulette visibly rotates and still has no winner mid-14s animation")
            page.wait_for_function(
               "()=>document.querySelector('[data-roulette-progress]').textContent.trim()==='1 / 4'",
               timeout=16500)
            result=wheel.get_attribute("data-result")
            rotation_after=wheel.evaluate("(el)=>el.style.transform")
            pointer_alignment=wheel.evaluate("""el=>{
              const win=el.querySelector('.or-wheel-segment.is-winner .or-wheel-icon');
              if(!win)return null;
              const wheel=el.getBoundingClientRect(),icon=win.getBoundingClientRect();
              return {dx:Math.abs(icon.x+icon.width/2-(wheel.x+wheel.width/2)),
                      y:icon.y+icon.height/2,wheelCentreY:wheel.y+wheel.height/2};
            }""")
            verify(bool(result) and wheel.locator('.or-wheel-segment.is-winner[data-operator="'+result+'"]').count()==1 and
                   wheel.locator(".or-wheel-segment").count()==33 and
                   pointer_alignment and pointer_alignment["dx"]<4 and
                   pointer_alignment["y"]<pointer_alignment["wheelCentreY"],
                   label+": "+lang+" winning portrait remains on physical wheel precisely below top marker")
            page.wait_for_timeout(550)
            verify(wheel.get_attribute("data-result")==result and
                   wheel.evaluate("(el)=>el.style.transform")==rotation_after and
                   hub.is_enabled(),
                   label+": "+lang+" winning wheel angle stays frozen instead of snapping to zero")
            roulette.locator("[data-roulette-reset]").click()
            verify(wheel.get_attribute("data-result") is None and
                   roulette.locator("[data-roulette-progress]").inner_text().strip()=="0 / 4",
                   label+": "+lang+" explicit new-team action removes held result")
            page.emulate_media(reduced_motion="reduce")

        team=[]
        for i,role in enumerate(("all","damage-dealer","enabler","buffer"),start=1):
            tab=roulette.locator('[data-roulette-role="'+role+'"]')
            tab.click()
            verify(tab.get_attribute("aria-selected")=="true",
                   label+": "+lang+" tab "+role+" can be selected before spin")
            (hub if i==1 else roulette.locator("[data-roulette-spin]")).click()
            page.wait_for_function(
              "(n)=>document.querySelector('[data-roulette-progress]').textContent.trim()===n",
              arg=str(i)+" / 4",timeout=5500)
            result_id=wheel.get_attribute("data-result")
            verify(roulette.locator(".or-team-slot.is-filled").count()==i and
                   bool(result_id) and
                   wheel.locator('.or-wheel-segment.is-winner[data-operator="'+result_id+'"]').count()==1 and
                   wheel.evaluate("(el)=>el.style.transform")!="rotate(0deg)" and
                   hub.is_enabled()==(i<4),
                   label+": "+lang+" held winning position and team slot "+str(i)+" across role changes")
            team.append(roulette.locator(".or-team-slot.is-filled").last.locator("strong").inner_text())
        verify(len(set(team))==4 and roulette.locator("[data-roulette-spin]").is_disabled() and
               roulette.locator(".or-wheel-segment[data-operator='argent-flow']").count()==0,
               label+": "+lang+" team has four distinct released operators, spin disabled")
        roulette.locator("[data-roulette-reset]").click()
        verify(roulette.locator("[data-roulette-progress]").inner_text().strip()=="0 / 4" and
               roulette.locator(".or-team-slot.is-filled").count()==0 and
               roulette.locator('[data-roulette-role="all"][aria-selected="true"]').count()==1 and
               roulette.locator("[data-roulette-spin]").is_enabled() and hub.is_enabled() and
               wheel.get_attribute("data-result") is None,
               label+": "+lang+" new team resets all four slots, held winner and both triggers")
        check_overflow(page,label+" "+lang+" Roulette")

        page.goto(base_url+prefix+"/endfield/endfieldle/")
        game=page.locator("[data-endfieldle]")
        game_diag={"main":game.count(),
                   "html_lang":page.locator("html").get_attribute("lang"),
                   "active_nav":page.locator('a.endfield-nav-link[href="'+prefix+'/endfield/endfieldle/"][aria-current="page"]').count(),
                   "table_headers":page.locator(".efdl-table thead th").count(),
                   "url":page.url}
        verify(game_diag["main"]==1 and game_diag["html_lang"]==lang and
               game_diag["active_nav"]==1 and game_diag["table_headers"]==8,
               label+": "+lang+" Endfieldle page, seven categories and active menu "+str(game_diag))
        page.evaluate("localStorage.removeItem('endfieldle:v1')")
        page.reload()
        page.locator("[data-yesterday] img").wait_for(state="attached")
        verify(page.locator("[data-guess-input]").is_enabled() and
               page.locator("[data-streak]").inner_text()=="0" and
               page.locator("[data-yesterday] img").count()==1 and
               page.locator("[data-reset]").inner_text().count(":")==2,
               label+": "+lang+" shared daily date, yesterday's portrait and live countdown")
        import json as _json
        from datetime import datetime as _datetime
        from zoneinfo import ZoneInfo as _ZoneInfo
        data_root=Path(__file__).resolve().parents[2] / "src/data/endfield"
        with open(data_root/"endfieldle-schedule.json",encoding="utf8") as handle:
            schedule=_json.load(handle)["days"]
        with open(data_root/"endfieldle-roster.json",encoding="utf8") as handle:
            roster=_json.load(handle)["operators"]
        now=_datetime.now(_ZoneInfo("Europe/Berlin")).strftime("%Y-%m-%d")
        answer=schedule[now]
        target_name=next(o["name"] for o in roster if o["id"]==answer)
        wrong_name=next(o["name"] for o in roster if o["id"]!=answer)
        guess_input=page.locator("[data-guess-input]")
        guess_input.fill(wrong_name)
        verify(page.locator("[data-suggestions] .efdl-option").count()>=1,
               label+": "+lang+" autocomplete shows valid operator choices")
        page.locator("[data-submit]").click()
        guess_debug={"rows":page.locator("[data-results] tr").count(),
                     "cells":page.locator("[data-results] tr").first.locator(".efdl-cell").count(),
                     "feedback":page.locator("[data-feedback]").inner_text(),
                     "input":guess_input.input_value(),
                     "suggestions":page.locator("[data-suggestions] .efdl-option").count(),
                     "won":page.locator("[data-winner]").is_visible()}
        verify(guess_debug["rows"]==1 and guess_debug["cells"]==7,
               label+": "+lang+" wrong guess creates all seven trivia comparisons "+str(guess_debug))
        guess_input.fill(target_name)
        page.locator("[data-submit]").click()
        verify(page.locator("[data-winner]").is_visible() and
               page.locator("[data-winner-name]").inner_text()==target_name and
               page.locator("[data-results] tr").count()==2 and
               page.locator("[data-streak]").inner_text()=="1" and
               not guess_input.is_enabled(),
               label+": "+lang+" winning answer adds local streak and ends today's puzzle")
        page.reload()
        page.locator("[data-winner]").wait_for(state="visible")
        verify(page.locator("[data-results] tr").count()==2 and
               page.locator("[data-winner-name]").inner_text()==target_name and
               page.locator("[data-streak]").inner_text()=="1",
               label+": "+lang+" browser-local guesses and win survive a reload")
        check_overflow(page,label+" "+lang+" Endfieldle")

    sitemap=page.request.get(base_url+"/sitemap.xml")
    verify(sitemap.status==200 and
           "<loc>https://ag0n1st.com/en/endfield/operators/si/</loc>" in sitemap.text() and
           "<loc>https://ag0n1st.com/en/endfield/operators/liino/</loc>" in sitemap.text(),
           label+": correct sitemap with newly published Liino")


def main():
    if not (DIST / "index.html").is_file():
        raise SystemExit("Missing dist; run npm run build first")
    server = ThreadingHTTPServer(("127.0.0.1", 0),
                                 partial(QuietHandler, directory=str(DIST)))
    Thread(target=server.serve_forever, daemon=True).start()
    base_url = "http://127.0.0.1:" + str(server.server_port)
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                for width in (1440, 390):
                    context = browser.new_context(
                        viewport={"width": width, "height": 900},
                        reduced_motion="reduce")
                    try:
                        page = context.new_page()
                        smoke(page, base_url, width)
                        smoke_typhoeus(page, base_url, width)
                        smoke_si(page, base_url, width)
                        smoke_i18n(page, base_url, width)
                    finally:
                        context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
    print("Desktop and mobile Chromium smoke checks passed.", flush=True)


if __name__ == "__main__":
    main()
