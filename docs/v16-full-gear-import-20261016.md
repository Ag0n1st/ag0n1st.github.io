# Vollständiger Ausrüstungsimport für Endfield v1.6 – offizieller Abgleich und Community-Staging

**Stand 16.10.2026.** Beschlossen: **alle 18** neuen Gear-Teile, nicht nur Sis sechs. Quelle für die tatsächlich **versionsbezogene** Inventarliste: [Endfield Talos Wiki: Version 1.6 „Sanctuary of Ink“](https://endfield.wiki.gg/wiki/Sanctuary_of_Ink), Abschnitt *New Additions → Gears*. Gegenprobe für **17** Basiseigenschaften aus [Endfield Hub Gear Database](https://endfieldhub.org/database/gears), Datenstand dort 15.10.2026. Beide sind Community-Datenquellen, **keine offiziellen SKPORT-Antworten**.

## Nachprüfbare Vollständigkeit

| Set / Gruppe | Soll 1.6 | Enthalten |
| --- | ---: | ---: |
| Pulser Labs | 3 | 3 |
| Eternal Xiranite | 4 | 4 |
| Rift Trekker (einzelne Teile, **keinen Setbonus unterstellen**) | 5 | 5 |
| Type 50 Yinglung | 3 | 3 |
| AIC Fieldwork | 3 | 3 |
| **Gesamt** | **18** | **18** |

Alle 18 Namen, Kategorien/Slots, Quellartikel, unbestätigten v1.6-Kennungen und 17 externen Basiswertedatensätze sind separat als lesbares, bearbeitbares JSON in `src/data/endfield/catalog/v16-gear.json` gepflegt. Bestehende Si-Guide-Slugs funktionieren weiterhin. Community-Werte werden **nicht in `equipment-details.json` kopiert**, und aus `sourcePage`/internem `item_equip_*` folgt keine offizielle numerische ID. Stattdessen wird jeder neue Datensatz explizit mit `officialNumericId: null` und `identityStatus: official-numeric-id-unverified` geführt.

### Alle 18 Teile

Die hier gezeigten Werte gelten, sofern vorhanden, für **Community-Basiswerte ohne Artifice-Erhöhungen**. Ein leeres Attribut ist kein belegter negativer Wert. Es werden **keine** gesicherten Herstellungsrezepte, Blaupausen oder automatischen Freischaltvoraussetzungen behauptet.

| Ausrüstung | Slot | Community-Basiswerte | Offizielle numerische SKPORT-ID |
| --- | --- | --- | --- |
| Pulser Labs Light Armor | Armor | DEF 56; STR 58; WILL 87; Cryo and Electric DMG Dealt Bonus +11.5 % | offen |
| Pulser Labs Light Gauntlets | Gloves | DEF 42; STR 43; WILL 65; Cryo and Electric DMG Dealt Bonus +19.2 % | offen |
| Pulser Labs Armor Slab | Kit | DEF 21; STR 21; WILL 32; Ultimate Gain Efficiency +24.6 % | offen |
| Eternal Xiranite MOD Armor | Armor | DEF 56; STR 58; INT 87; Combo Skill DMG Bonus +20.7 % | offen |
| Eternal Xiranite Overalls | Armor | DEF 56; STR 58; INT 87; Ultimate Gain Efficiency +12.3 % | offen |
| Eternal Xiranite Channeling Gloves | Gloves | DEF 42; STR 43; INT 65; Combo Skill DMG Bonus +34.5 % | offen |
| Eternal Xiranite Rangefinder | Kit | DEF 21; STR 21; INT 32; Combo Skill DMG Bonus +41.4 % | offen |
| Rift Trekker Steel Armor | Armor | DEF 56; AGI 115; Combo Skill DMG Bonus +21.6 % | offen |
| Rift Trekker Overalls | Armor | DEF 56; INT 115; Heat and Nature DMG Dealt Bonus +12 % | offen |
| Rift Trekker Wraps | Gloves | DEF 42; WILL 86; Cryo and Electric DMG Dealt Bonus +20 % | offen |
| Rift Trekker Gauntlets | Gloves | DEF 42; STR 86; Basic Attack DMG Bonus +24 % | offen |
| Rift Trekker Silver Blade | Kit | DEF 21; AGI 43; Ultimate Gain Efficiency +25.7 % | offen |
| Type 50 Yinglung Soft Armor | Armor | DEF 56; STR 58; INT 87; Combo Skill DMG Bonus +20.7 % | offen |
| Type 50 Yinglung Gauntlets | Gloves | Nicht eindeutig zugeordnet | offen |
| Type 50 Yinglung Beacon | Kit | DEF 21; STR 21; INT 32; Combo Skill DMG Bonus +41.4 % | offen |
| AIC Fieldwork CQB Armor | Armor | DEF 48; Physical DMG Bonus +9.8 % | offen |
| AIC Fieldwork CQB Gloves | Gloves | DEF 36; Physical DMG Bonus +16.4 % | offen |
| AIC Fieldwork CQB Hacksaw | Kit | DEF 18; Physical DMG Bonus +19.7 % | offen |

**Offene Identität:** „Type 50 Yinglung Gauntlets“ fehlt als **exakte Bezeichnung** in der Community-Statistiktabelle des Endfield Hub. Die gleichfalls existierende Community-Seite „Type 50 Yinglung Gloves (03)“ besitzt nach eigener Darstellung `item_equip_t4_suit_atk02_hand_03`, was für Sis Build plausibel, **aber nicht bewiesen identisch** ist. Die ältere im offiziellen lokalen Bestand enthaltene „Type 50 Yinglung Gloves“ hat numerische SKPORT-ID **411** und ist deshalb nicht ersatzweise auf den neuen Slug zu legen.

**Rift Trekker:** Der Versionsartikel nennt alle fünf Gear-Templates bei **Talosite Exchange**. Dies ist ein Community-Hinweis und muss gegen aktuelle offizielle Fundort-/Shop-/Kaufvoraussetzungen verifiziert werden. Der Endfield Hub listet für Rift Trekker in der Set-Spalte keinen Setbonus; deshalb keinen solchen erfinden.

## Echter Live-Abgleich der anonymen offiziellen SKPORT-Daten

[GitHub Actions: Probe „Read-only v1.6 SKPORT gear catalogue probe“ #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38948911401) am 16.10.2026, Chromium via `https://wiki.skport.com/endfield`, öffentliches API `/web/v1/wiki/item/catalog`, **ohne Cookies/Account oder Schreibzugriff**, normalisiert über das bewährte Skript `scripts/endfield/catalog-assets.mjs`. Der neue unabhängige Abgleich `scripts/endfield/probe-v16-skport.mjs` prüft genau 18 IDs/Versionen mit eindeutigen Namen. Ergebnisse:

- Live-Stand SKPORT-Wiki-Snapshot **2026-10-16**, 940 offizielle Katalog-Items insgesamt, **258 offizielle Gear-Items**, **keines der 18 neuen v1.6-Teile exakt im Gear-Katalog gefunden**.
- Der Abruf war **erfolgreich** (alle fünf Kategorien mit Items, null Importfehler, Cache-Prüfung erfolgreich); keine der fehlenden offiziellen IDs darf daher als „nachgewiesen“ ausgegeben werden.
- Der Katalog enthält bereits andere 1.6-Daten, etwa Operator Si / Argent Flow und die neuen Waffen. **Deshalb ist die fehlende Gear-Erweiterung ein echter Unterschied der aktuell veröffentlichten SKPORT-Kategorien**, nicht automatisch ein auf gesamter Seite veralteter Snapshot.
- Keine 18 Community-IDs auf offizielle numerische IDs hochstufen; zunächst den jetzigen Zustand sauber persistieren.

## Lokal verfügbare v1.6-Ausrüstungssymbole und Bildkontingente

Die 18 v1.6-Artikel werden über den allgemeinen `itemCatalog.ts` anhand eines eindeutigen temporären Namens/Slugs aufgelöst. Die fünf schon für Si archivierten Symbole bleiben an ihrem Ursprungsort; sechs neue WebP-Bilddateien wurden über [GitHub Actions: „Cache all version 1.6 community gear icons“ #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38949465060) nach `public/images/endfield/gear/releases/v16/` geschrieben. Der Aufruf ergab **5 bereits vorhandene + 6 neu gespeicherte + 7 fehlende = 18** Bilder. Die sieben fehlenden Symbole wurden nach **HTTP 429 (Rate Limit)** bewusst nicht aggressiv erneut abgefragt. Für sie bleibt ein Text-/Icon-Platzhalter; die Daten stehen trotzdem im Manifest. Keine nicht belegten Bilder aus ähnlich benannten älteren Gear-Varianten werden verwendet.

Das Cache-Skript `scripts/endfield/cache-v16-gear-icons.mjs` beschränkt sich auf das Community-Wiki-Quellverzeichnis, erlaubt nur PNG/JPEG/WebP und maximal 5 MB Eingangsbild/95 KB Ausgabedatei; Konvertierung zu lokalen WebPs 240 × 240; Speicherung ausschließlich im Branch, nicht zur Laufzeit der Website. GitHub Actions #1 beendete die Tests mit **131/131 erfolgreich** und lag bei **22.096.296 B / 100.000.000 B** Endfield-Projektgröße (vor eventuellen späteren Dokumentationsänderungen). Die bei künftiger Bearbeitung aktualisierte Galerie bleibt unabhängig von den offiziell verifizierten Spielwerten.

Eine neue `workflow_dispatch`-Option im read-only Workflow `.github/workflows/probe-v16-skport.yml` lässt sich künftig über GitHub Actions manuell ausführen, sobald der SKPORT-Katalog erweitert wird. Dabei wird **nichts nach main gepusht**, nur der anonyme öffentliche Katalog geprüft und eine normalisierte JSON-Datei als zweitägiges temporäres Workflow-Artefakt bereitgestellt.

## Sicherer technischer Übergang zur vollständigen offiziellen Integration

1. Das `v16-gear.json` bleibt ein vollständiger, versionierter **Preview-Katalog** (nicht dieselbe Klasse wie offiziell verifizierte `items.json` / `equipment-details.json`). Die (ItemCatalog)-Auflösung bevorzugt offizielle numerische Records bei exakter Namensgleichheit. Bestehende Si-Slugs bleiben weiterhin nutzbar.
2. Nach offizieller Veröffentlichung erneut den öffentlichen Gear-Katalog abfragen. Streng: `name + slot + attribute + icon` und bei Handschuhen zusätzlich interne Variantenbezeichnung vergleichen; Namensgleichheit allein genügt nicht für eine stille Migration.
3. Pro bestätigter numerischer ID einen offiziellen `item/info`-Eintrag und normalisierte `equipment-details`-Daten importieren: Attribute, Set-/Tier-Zuordnung, Artifice-Ränge und Materialkosten. Nur belegte `status: verified` dürfen den Build-Finder als sicher verfügbare Ausrüstung beeinflussen.
4. Blaupausen/Fundorte separat anhand offizieller Karte, regionalem Shop, Story-Fortschritt und eindeutig itembezogener Nachweise bestätigen. Insbesondere bei Rift Trekker den Talosite-Exchange-Bezug nicht automatisch als tatsächlichen Besitz einer Vorlage werten.
5. Erst nach vollständigem offiziellen Audit temporäre Release-Slugs ersetzen oder durch bestätigte numerische IDs aliasieren. Dabei Si-Builds und andere redaktionell abgenommene Guides **nicht heimlich ändern**.
6. Bei jedem PR komplettes Node-Testset, Astro-Build, Endfield-100-MB, Pages-`dist/`-1-GB und Desktop/Mobil-Chromium prüfen.

**Fortsetzungspunkt:** Die 18 community-dokumentierten v1.6-Gear-Daten sind importiert; **offizielle ID-/Rezept-/Fundort-Daten bleiben offen, weil der öffentliche SKPORT-Katalog sie noch nicht enthält**. Bei nächster Verfügbarkeit den oben beschriebenen Live-Abgleich erneut ausführen. Kein Datenupdate über Spekulation.
