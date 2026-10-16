# Typhoeus: Quellenprotokoll, Redaktion und Grenzen

**Stand:** 16. Oktober 2026 · Charakter **Typhoeus**, offizieller SKPORT-Operator **1173**.
**Guide:** `src/content/operator-guides/typhoeus.md`
**Ziel:** Vollständiger deutscher Guide über dieselben neun Abschnitte wie Liino, inklusive realer Videos, Bildern, SKPORT-Daten und redaktioneller Anmerkungen zur Teamausrüstung.
**Redaktionelle Freigabe:** Durch den Nutzer vorab erteilt. Bestehende Liino-Guideinhalte nicht ändern.

## I. Eigene redaktionelle Hauptgrundlage

**Vom Nutzer am 16.10.2026 bereitgestellt:** `AKEF Typhi Skript.pdf` (16 Seiten, nicht ins öffentliche GitHub-Repository hochladen). Zusätzlich nennt der Nutzer seinen eigenen, besonders ausführlichen Mobalytics-Textguide:
<https://mobalytics.gg/arknights-endfield/profile/ag0n1st-aodh5g/characters/197f5164-a4a3-4870-9450-37497ae0a819>.

**Transparenz zum zweiten Primärbeleg:** Diese spezifische Mobalytics-Profilseite konnte **nicht direkt gelesen werden**. Die öffentliche Web-Abfrage war gesperrt; ein vollständig anonym ausgeführter, nur lesender HTTP-Aufruf in GitHub Actions [Research Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875402723) lieferte **HTTP 403**. Deshalb wird **keine** Aussage auf unzugänglichen persönlichen Mobalytics-Text gestützt. Allgemeine Mobalytics-Seiten anderer Autoren sind im Abschnitt II nur eigenständige externe Kontrollquellen, nicht der Text des Website-Betreibers. Falls später ein Export des persönlichen Guides vorliegt, kann die Teamausrüstung im Typhoeus-Guide abschnittsweise kontrolliert ersetzt/ergänzt werden.

**Genau aus dem hochgeladenen Skript abgeleitete Prioritäten/Empfehlungen:**
- **Seiten 2–8:** Typhi = Nature Striker Main DPS, Beweglichkeit + Willenskraft; Begriffe Battle Skill / Combo Skill / Final Strike / Natur-Stack; `Zeichen → Jagdpfeile → Energieschüsse → Natur-Explosionen → Zeichen`. Max. 4 Jagdpfeile, 8 Zeichen; 2:1 Konversion; im voll ausgebauten Talent anfänglich 4 Zeichen. Battle Skill kostet 100 FP; Luftangriffe verbrauchen Nature-Inflictions, je 12 Ultimate-Energie; 5. Air Attack zählt als Power Shot ohne Pfeilverbrauch. Combo-Feld verstärkt Nature Bursts, reset. Ultimate kostet 200, bietet 2 Pfeile + Reset, nicht im Zentrum jedes Schadensfensters. Schutzbarriere bricht bei Treffern. Skill-Priorität als Overlay auf Seite 7: **BS > CS > ULT > BA**; Ziele M3/M3/9/1 sind redaktionelle Umsetzungsziele für das neue Template, nicht direkt im Skript genannte konkrete Ziellevel.
- **Seite 8:** Signature Umbra of Frigid Eventide, BP Suffering's End, dritte bloße Notfallalternative `Detonation Unit` (im Skript „Zünder“). Kein vierter künstlicher F2P-Waffeneintrag.
- **Seiten 9–10:** `Deep Rampart` (Tiefer Wall) mit `LYNX Slab` (Luchsplatte) als Standard; zweites Deep-Rampart-Comms erhöht Explosion-Schwerpunkte; allgemeiner Gesamtschaden mit LYNX etwas breiter; UE-Alternative nur bei konkreter Rotation. Kein absoluter DPS-Prozentwert, da der PDF-Schadensvergleich keinen reproduzierbaren Datafield-Vergleich liefert.
- **Seiten 10–11:** P1 und P5 hervorheben; Potenziale bleiben optionale Investition.
- **Seite 11:** Arcane in **Willenskraft-Konfiguration, im Skript Ziel ≥640 Will**, Fluorite als Nature-Stack-Alternative, Ardelia/Perlica für Reaktions-Trigger zu Liino, Gilberta, Xaihi, Purrchena sowie Antal als situative Partner. Meta-Kern Typhoeus+Arcane+Ardelia+Liino und Alternative mit Perlica statt Ardelia.
- **Seiten 12–15:** Eigene reale Trial-/Echos-/Nefarith-Demonstrationen, Dodge Cancels nach Final Strike und Landung, Battle Skill unmittelbar vor Ultimate für den Signature-Waffenbuff, Nefarith-Interrupt und situationsbedingte Krits. Quiz 2 Natur-Stacks + 4 Jagdpfeile + ein Zeichen → acht Zeichen nach Schlussangriff.
- **Seite 16:** Typhi macht Spaß, ist aber ein anspruchsvoller Main DPS und bei einem Account mit mehreren bestehenden DPS **optional** statt verpflichtend. Die damals hypothetische künftige Si-Veröffentlichung nicht als im Oktober 2026 noch bevorstehenden Termin übernehmen.

**Bestätigtes eigenes YouTube-Video** über öffentliche, metadata-only YouTube-Suche [Video Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875911263):
- Hauptguide des Kanals Ag0n1st: [29:01-Video, ID wNVJkGzkfMg](https://www.youtube.com/watch?v=wNVJkGzkfMg).
- [P0 Nefarith 0:39 No Food](https://www.youtube.com/watch?v=Zw8B2F2nJP8).
- [P0 Rhodagn 0:23 GMS Food](https://www.youtube.com/watch?v=uixHyNlbwAQ).
- Guide-Kapitel exakt aus dem beigefügten PDF: Trial **16:14 = 974 s**, Echos **20:18 = 1218 s**, Nefarith **22:18 = 1338 s**, Quiz **25:26 = 1526 s**. `youtubeEmbed` übernimmt ausschließlich eine validierte numerische Startzeit als `?start=N`, niemals Autoplay oder fremde Query-Parameter. Das sind echte Ausschnitte **aus demselben Hauptguide**, keine vorgetäuschten Einzelvideos.

## II. Objektive Spielwerte und unabhängige Kontrollquellen

**Primärbeleg für alle mechanischen Zahlen:** lokale offizielle, versionierte SKPORT-Wiki-Snapshots
`src/data/endfield/operators/typhoeus.json`,
`src/data/endfield/operators/typhoeus.extra.json`,
`src/data/endfield/locales/de/typhoeus.json`; letztere ist eine gekennzeichnete deutsche redaktionelle Übersetzung. 4 Skills, 5 Potenziale, 2 Kampftalente, 2 Schiffstalente, 4 Aufstiege und Tabellen inklusive benötigter Material-IDs liegen bereits vollständig vor und bleiben **unverändert**.

**Weitere tatsächlich konsultierte Webseiten** (als **Kreuzcheck**, nicht als Betreiber-Text):
- [Endfield Talos Wiki / Typhoeus](https://endfield.wiki.gg/wiki/Typhoeus) – Charakterdaten, Klassen, Profile, Ausrüstungsempfehlungen, Galeriebezüge.
- [Prydwen – Typhoeus v1.5](https://www.prydwen.gg/arknights-endfield/characters/typhoeus) – Skill-, Gear-, Waffen- und Team-Synergien; eigene Rechenwerte dort sind **keine** Datafield-Charakterprofilwerte.
- [Mobalytics allgemeiner Typhoeus-Guide von okMuzzy](https://mobalytics.gg/arknights-endfield/characters/typhoeus-build-guide) – unabhängige Kontrollquelle zur Dreierwaffenliste, Deep Rampart + LYNX und Teamideen, **nicht** die vom Nutzer verlangte persönliche Profilseite.
- [Icy Veins – Typhoeus Builds](https://www.icy-veins.com/arknights-endfield/typhoeus-guide-best-builds), [Teams](https://www.icy-veins.com/arknights-endfield/typhoeus-teams) – unabhängig datierte Bestätigung von Nature-Stack-Enablern.
- [Datafield.cc Teamübersicht (Typhoeus/Fluorite/Xaihi/Arcane)](https://datafield.cc/teams?include=Typhoeus%2CFluorite%2CXaihi%2CArcane) – öffentliche indizierte Teamrotationen inkl. P0/R4-Parameter und Team-DPS. Die direkt geöffnete Live-Seite liefert teilweise nur JavaScript `Loading data...`.
- [Öffentliches Datafield-Team-Szenario-Spiegelbild](https://arknightsendfield.gg/character/typhoeus-build/) – konkrete, **teamabhängige** Item-IDs für Perlica, Arcane, Ardelia und Liino in zwei gezeigten Typhoeus/Arcane/Support-Konfigurationen. Die Website bezeichnet diese ausdrücklich als `Source: Datafield`, sie wurden aber **nicht unabhängig aus Datafields dynamischer Originalmatrix repliziert**.
- [Endfield Hub / Typhoeus](https://endfieldhub.org/characters/typhoeus) – zusätzliche Mechanik-Plausibilisierung mit offen dokumentierten Rechenannahmen.

**Absichtlich nicht übernommen:**
- **Waffenvergleiche als Prozente** im `weapons.comparisons[]`-Framework: Der Pflichttyp erlaubt nur *direkt* belegte **Datafield character-profile**-Szenarien. Fremde Prydwen-Solo/Team-Prozente oder DPS-Werte aus einem **Datafield Team Hub** ohne gleiche Referenz-/Team- und Rangbedingungen sind dafür ungeeignet. `comparisons: []`; UI verweist neutral auf ausstehende belastbare Zahlen.
- **Potenzial-DPS-Prozente:** Einzelne externe Seiten zeigen uneinheitlich kumulative vs. inkrementelle Werte (oder P3 als `N/A`). Unsere UI erwartet ausschließlich den **Zuwachs gegenüber der vorherigen Stufe**. Diese Werte bleiben `undefined`, offiziell belegte Effekte und redaktionelle Bewertung erscheinen dennoch für alle fünf P-Stufen.
- Widersprüchliche Drittseiten mit offensichtlich unpassenden Typhoeus-Waffen/Gear/Skills als Faktenquelle. Kein neuer Banner-/Release-Termin aus September-Vermutungen.

## III. Vollständige Builds und Teamausrüstung

**SKPORT-Ausrüstungskatalog** (`src/data/endfield/catalog/items.json` und `equipment-details.json`) über [official audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875402723) und [progression audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38876229826) geprüft:

- Endgame Deep Rampart Standard: `1239` Armor / `1238` Gauntlets / `1240` Comms / `365` LYNX Slab. Alle SKPORT `verified`, Level 70. Die beiden begründeten Varianten: `1240` zweifach für die Explosion und `1236` Eternal Xiranite Bracing Slab T1 für situativen UE-Schwerpunkt.
- Level 60: `1244` Fieldwork Assault Armor, `1243` Assault Gloves, `1242` Assault Push Knife, `1120` Ember (vier `verified`-Items, Level 60, Hauptattribut/Arts-Intensität/UE).
- Level 50: Roving MSGR `316 / 317 / 319 / 320` (Level 50, Beweglichkeit).
- Level 36: Roving MSGR `247 / 248 / 249 / 251` (Level 36, Beweglichkeit).
- Keine falsche Gleichsetzung von Gear-Level mit tatsächlicher Blaupausenfreischaltung. Bei allen sechsen gelten die vorhandenen unabhängigen Story-/Region-/Komponenten-/Blueprint-Prüfungen des Build-Finders.
- Teamausrüstung wird unter `teams.meta[].memberGear` **optional** strukturiert als vier Item-IDs je anderem Teammitglied gespeichert; eine eigene, native `<details>`-Anzeige zeigt lokale Item-Icons und eindeutige Namen. Die genau genannten Set-Kombinationen stammen aus **öffentlichen Datafield-Teambeispielen** auf arknightsendfield.gg, nicht aus einer direkten Wiedergabe des 403-blockierten persönlichen Mobalytics-Textes. Als **anpassbares Beispiel** neben den aus dem PDF redaktionell abgeleiteten Meta-Teams kennzeichnen, nicht als zwingenden oder einzig richtigen Build. Liino bleibt unverändert und kann diese optionale Struktur selbst künftig verwenden.

## IV. Statische Bilder (keine Runtime-Netzwerkanfragen)

Bestehende Typhoeus-Assets bereits vorhanden: `public/images/endfield/operators/typhoeus/{cover,illustration}.webp` und alle vier `skills/skill-*.webp`, dazu Waffen-/Rüstungs-/Materialkatalog und Operator-Portraits anderer vorhandener Datensätze.

**Drei echte Typhoeus Operator Snapshots** aus Endfield Talos Wiki per streng limitiertem [einmaligem Import #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875752256) in `public/images/endfield/operators/typhoeus/potentials/`:
- P1 49.798 Byte (PNG 2.134.322)
- P3 118.712 Byte (PNG 3.126.699)
- P5 83.994 Byte (PNG 1.976.584)
- **Summe 252.504 Byte WebP**, Auflösung 960×540, ohne Original-PNG im GitHub-Repository. Quelle jeder Grafik verweist auf die **Typhoeus**- statt Liino-Galerie. Generischer bestehender Assetresolver `getOperatorImageUrl` wird wiederverwendet.

**Drei echte eigene Video-Thumbnails** aus öffentlichen YouTube-Vorschaubildern per [einmaligem Import #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38876122327) als lokale 320×180-WebPs `public/images/endfield/video-thumbnails/<id>.webp`: Hauptguide 18.370 Byte, Nefarith 20.592 Byte, Rhodagn 17.870 Byte (**56.832 Byte zusammen**). Die Gesamtsumme **309.336 neue Bildbytes** schont das für Endfield selbstgesetzte **100.000.000-Byte**-Budget und das gesamte deployte Pages-`dist`-Limit **1.000.000.000 Byte**. Keine Video-Downloads, GIFs oder serverseitigen Calls bei normalem Build/Seitenabruf.

**Einmalige GitHub-Actions-Audit- und Import-Workflows wurden nach erfolgreicher Nutzung aus dem Feature-Branch gelöscht**, damit der Standard-CI-/Deployprozess unabhängig von Drittseiten bleibt. Kleine manuell wiederholbare Importerskripte verbleiben im Repo.

## V. Abnahme und weitere Versionen

1. `typhoeus.md` ist mit allen neun Rubriken **`published`** und echten, verifizierten Videos statt `pending`. Keine inhaltslosen Demo-Datensätze aus dem alten Prototype.
2. Source-Zahlen nur aus SKPORT, redaktionelle Entscheidungen aus User-Skript, externe Team-Gear-Beispiele ausdrücklich aus dokumentierten öffentlichen Team-Quellen.
3. CI: 109+ Endfield-Tests, Astro-Build, 100-MB-Endfield-Gate, 1-GB-Pages-`dist`-Gate und realer Chromium-Smoketest für beide Guide-Seiten bei Desktop 1440 / Mobil 390, inklusive Typhoeus-Bilder, Card-/Build-Anzahl, Meta-Team-Partnerausrüstung, Video-Startmarken und Quiz.
4. Aktuellen genauen Budgetwert, PR, Merge-SHA, Pages-Deploy und Bugs/Behebungen in `ROADMAP.md` dokumentieren. `Liino` nicht anfassen.
5. Bei Mobalytics-Profilfreigabe/Export eine **separate Quellen-Reconciliation** für alle Team-Gear-Konfigurationen durchführen, ohne blind andere Autoren als persönliche Redaktion zu übernehmen.
