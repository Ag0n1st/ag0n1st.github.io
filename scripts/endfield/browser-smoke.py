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
        "/en/endfield/recruitment/","/en/endfield/refinement/",
        "/en/endfield/essences/","/en/endfield/speedruns/",
        "/en/endfield/checklist/","/en/endfield/countdown/",
        "/en/endfield/tierlist/",
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
    verify(len(nav_paths)==12 and all(p.startswith("/en/") for p in nav_paths),
           label+": all twelve Endfield tabs remain English, no DE fallback")
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
           "Coming soon" in page.locator("main").inner_text(),
           label+": English Tierlist is a true translated placeholder")
    page.goto(base_url+"/endfield/tierlist/")
    verify(page.locator("html").get_attribute("lang")=="de" and
           "Diese Seite entsteht" in page.locator("main").inner_text(),
           label+": German Tierlist placeholder matches")
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
        verify(len(flat)==12 and
               flat.index("Tierlist" if lang=="de" else "Tier List") == flat.index("Checkliste" if lang=="de" else "Checklist")+1 and
               flat.index("Countdown") == flat.index("Tierlist" if lang=="de" else "Tier List")+1,
               label+": "+lang+" Tierlist appears after Checklist and before Countdown")
        verify(page.locator('a.endfield-nav-link[href="'+("/endfield/leaderboard/" if lang=="de" else "/en/endfield/leaderboard/")+'"] .nav-upcoming-wrench').count()==1 and
               page.locator('a.endfield-nav-link[href="'+("/endfield/cheatsheets/" if lang=="de" else "/en/endfield/cheatsheets/")+'"] .nav-upcoming-wrench').count()==1,
               label+": "+lang+" new unfinished navigation tabs show their wrench icons")
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
            verify(details.get_attribute("open") is not None and
                   details.locator(".op-equipment-matrix thead th img").count()==6 and
                   details.locator(".op-equipment-matrix tbody tr").count()==(2 if slug=="si" else 3) and
                   details.locator(".op-matrix-empty-row").count()==0,
                   label+": "+lang+" "+slug+" matrix shows guide-approved setups and all five gear slots")
            cells=details.locator(".op-equipment-matrix tbody tr:first-child td:not(.op-matrix-gear-cell)").all_text_contents()
            verify(len(cells)==5 and all(cell.strip()=="—" for cell in cells),
                   label+": "+lang+" "+slug+" unverified matrix percentages remain blank")
            gear_cell=details.locator(".op-matrix-scroller .op-matrix-gear-cell").nth(1)
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
            details.locator("[data-matrix-expand]").click()
            dialog=details.locator("[data-matrix-dialog]")
            dialog.wait_for(state="visible")
            verify(dialog.evaluate("(el)=>el.open") and
                   dialog.locator(".op-matrix-dialog-scroll .op-equipment-matrix tbody tr").count()==(2 if slug=="si" else 3),
                   label+": "+lang+" "+slug+" complete matrix is shown in fullscreen dialog")
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
            check_overflow(page,label+" "+lang+" "+slug+" after matrix dialog")
        page.goto(base_url+prefix+("/endfield/operatoren/typhoeus/" if lang=="de" else "/endfield/operators/typhoeus/"))
        verify(page.locator('[data-guide-disclosure="equipment-matrix"]').count()==0,
               label+": "+lang+" other operators do not render the optional matrix")
        page.goto(base_url+prefix+"/endfield/leaderboard/")
        verify(page.locator(".endfield-boss-grid .endfield-boss-card").count()==7 and
               page.locator(".endfield-stacked-title > span").count()==2,
               label+": "+lang+" Community Leaderboard has 7 future boss rankings")
        verify(page.locator('.endfield-boss-card img[src="/images/endfield/operators/si/official-portrait.webp"]').count()==1,
               label+": "+lang+" provisional Si Boss uses existing official operator portrait")
        check_overflow(page,label+" "+lang+" leaderboard")
        page.goto(base_url+prefix+"/endfield/cheatsheets/")
        verify(page.locator(".endfield-coming-card").count()==3 and
               all(page.locator("#"+x).count()==1 for x in ("elasticgoods","artificing","bufffood")),
               label+": "+lang+" three Cheat Sheets topics have cards")
        check_overflow(page,label+" "+lang+" cheatsheets")
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
