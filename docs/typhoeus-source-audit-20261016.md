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


## VI. Redaktionelle Nachprüfung 16.10.2026 – Nutzerkorrekturen und Datafield-Charakterprofil

Der Nutzer hat nach Sichtung der live veröffentlichten Typhoeus-Seite acht konkrete Änderungswünsche gemeldet (Terminologie, beide Ratings, Waffendaten, Potenzial-Daten, Source-of-Truth bei Team-Gear inklusive Waffen, Gameplay, Fazit). Diese Änderungen werden auf Branch `refine-typhoeus-ratings-datafield-teams-20261016` bearbeitet; dieser Nachtrag **ersetzt ältere Aussagen** im Dokument über "keine direkt verifizierbaren Datafield-Charakterprofilwerte" soweit unten belegt.

1. **Terminologie:** Spielattribut `Will` einheitlich **Wille** auf Deutsch, nicht "Willenskraft". Korrigierte Locale-Dateien für **Typhoeus und Liino**, ebenso redaktionelle Texte. Bereits vorhandene rohe englische SKPORT-Datensätze bleiben unverändert.
2. **Einordnung:** Schwierigkeit `5` (UI: Einsteigerfreundlichkeit `1/5`) und Flexibilität `1/5`. Dies ist ausdrücklich die aktuelle persönliche Einordnung des Nutzers: Typhoeus gehört für ihn zu den komplexesten Operatoren, benötigt Arcane oder Fluorite als Natur-Stack-Lieferanten; übrige Teamplätze sind stark eingeschränkt.
3. **Datafield direkt gelesen:** Die spezifische [Datafield-Typhoeus-Charakterseite](https://datafield.cc/characters/typhoeus) ist in der üblichen einfachen HTTP-Leseansicht JavaScript-gerendert (`Loading data...`), konnte aber über einen **read-only Chromium-GitHub-Actions-Audit** auf der **echten öffentlichen Seite** mit geladenem DOM ausgelesen werden, einschließlich explizitem Tab-Wechsel. [Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38884193767) und [Audit #2](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38884421853) dokumentieren die vor Ort tatsächlich gerenderten Zahlen am 16.10.2026.
4. **Waffen (Datafield, immer Profilseite, nicht Team-Hub):**
   - Reiter `Ardelia Arcane Liino`, Referenz **Umbra of Frigid Eventide R4 = 100,0 %**: Umbra R9 **124,7 %**, Umbra R4 **100,0 %**, Suffering's End R9 **84,3 %**, Detonation Unit R9 **78,1 %**, Suffering's End R4 **77,0 %**, Detonation Unit R4 **72,2 %**, Opus: Etch Figure R9 **69,0 %**, Opus R4 **66,3 %**.
   - Reiter `Non Liino Teams - LESS ATK -`, eigene Referenz **Umbra R4 = 100,0 %**: Umbra R9 **123,3 %**, Umbra R4 **100,0 %**, Suffering's End R9 **79,3 %**, Detonation Unit R9 **77,5 %**, Suffering's End R4 **73,7 %**. Weitere Werte in diesem Reiter **nicht** unabhängig erfasst und daher **nicht erfunden**.
   - Die Spalte `Waffe` kann auch die vierte rechenbare Alternative Opus: Etch Figure ID **65** enthalten, **ohne** sie in der redaktionellen empfohlenen Dreierliste als angeblich viertbeste Empfehlung anzuführen. Die drei empfohlenen Waffen-IDs bleiben 1175/1177/47.
   - Beide getrennten, als `sourcePageType: character-profile` deklarierten Szenarien sind analog zu Liino mit Pflicht-Referenz R4=100, Standdatum, Quelle als Klartext und Modellklausel in `weapons.comparisons[]` hinterlegt.
5. **Potenziale:** Datafield sagt ausdrücklich: **"Each % increase is relative to the previous potential."** Es sind also Zuwächse **zur direkten Vorstufe**, nicht kumulativ zu P0.
   - `Teams with energy needs`: P1 **+8,8 %**, P2 **+4,5 %**, P3 **+0,8 %**, P4 **+8,3 %**, P5 **+6,5 %**. Dies ist die Standardspalte in den bestehenden Potenzial-Cards.
   - `Teams without energy needs`: P1 **+6,6 %**, P2 **+4,3 %**, P3 **+1,0 %**, P4 **+0,0 %**, P5 **+5,2 %**. Als **benanntes zusätzliches Szenario** in `potentials.comparisons[]` hinterlegt; die Potenzialvergleichstabelle zeigt beide Spalten getrennt mit ihren offiziellen Effekten, Quellen-/Stichtagsangabe. Besonders P4 würde ohne diese Abgrenzung irreführend wirken.
   - Die im selben Datafield-Guide sichtbare Talent-Priorität entspricht deren eigenen Simulationsannahmen und überschreibt **nicht** die eigene Skript-Redaktion (Battle > Combo > Ultimate > Basic).
6. **Teams / eigene Mobalytics-Inhalte:** Nutzer verlangt **sein eigenes Mobalytics-PDF** als ausdrückliche Ausrüstungs- und Waffen-Redaktionsquelle, **nicht** die fremden Datafield-Beispiele. **Anhang am 16.10.2026 in der laufenden Nachricht nicht nachweisbar** (gemountete Dokumente: `AKEF Typhi Skript.pdf` und `Bisherige Website Konversation(1).pdf`; Suche unter Gesprächsdateien lieferte keinen Mobalytics-Export). Deshalb darf kein behaupteter Vollabgleich stattfinden. Konkrete ausdrückliche Nutzeranweisung, die schon sicher ist: Arcane in **allen** Typhoeus-Teams als `Eternal Xiranite Light Armor / Eternal Xiranite Hands / 2× Eternal Xiranite Bracing Slab` – IDs **1134/1138/1136/1136** – und `Wille`-orientiert. Dieser Build ist jetzt für beide Meta-Teams korrigiert. **Alle anderen noch aus fremden Datafield-Beispielen übernommenen Teamausrüstungswerte sind bis zum PDF-Abgleich ausdrücklich vorläufig; nicht als Empfehlungen des Autors bezeichnen.**
7. **Team-Template:** `memberGear[]` um optionale, aus dem PDF später zu füllende `weaponId` und `weaponRank` ergänzt. `TeamMemberGear.astro` rendert eine **separate Waffenkachel mit vorhandenem SKPORT-Item-Icon** direkt über den vier Rüstungsteilen; unbestätigte Waffen-IDs werden **nicht erraten** und die Waffenanzeige wird dann nicht vorgegaukelt. Schema lehnt einen Waffenrang ohne Waffe ab. Auch für weitere Operatoren verwendbar.
8. **Gameplay:** Das tatsächliche separate **P0 Nefarith No Food Speedrun**-Video ist `featured:true` und öffnet als großes Showcase; das separate Zeichen-Quiz ist aus der Liste entfernt. Die anderen Runs und die korrekten Kapitelzeiten bleiben unverändert.
9. **Fazit-Layout:** Das gemeinsame UI-Template zeigt nach dem ersten Leitparagraphen `closingNote`/Abschließende Einschätzung sowie beliebiges Zusatz-Markdown; danach **als allerletztes Element** die beiden Cards `Für wen lohnt es sich?` und `Wer kann verzichten?`, ohne dass diese Änderung Liinos Textinhalte verändert.

**Status:** Die nachweisbaren Punkte 1–5 und 8–9 sowie die infrastrukturelle Erweiterung zu Punkt 7 konnten implementiert werden. **Für die vollständige Ablösung aller externen Datafield-Teamausrüstungen und die tatsächliche Bestückung aller Team-Waffen bleibt das fehlende persönliche Mobalytics-PDF eine notwendige Quelle; nicht als erledigt deklarieren.** Die Quellendokumentation, dieser Branch und PR-Status sind in `ROADMAP.md` fortzuführen.


## VII. Eigener Mobalytics-Guide jetzt wirklich gelesen (PDF, 16.10.2026)

**Der zuvor ausstehende Anhang ist eingetroffen.** Datei des Nutzers: `Typhoeus Build Guide - Ag0n1st (Mobalytics).pdf`, ca. 12 PDF-Seiten einschließlich leerem Druckanhang, eigentliche Guide-Informationen auf den ersten zehn gedruckten Seiten; persönlicher Mobalytics-Stand **04.10.2026**. Diese PDF ist **jetzt die maßgebliche redaktionelle Quelle** für alle eigenen Waffen-/Ausrüstungsentscheidungen bei Typhoeus und ihren Teammitgliedern. Der ältere Hinweis in Abschnitt VI, das PDF sei nicht vorhanden, ist ein **historischer Zwischenstand und ab dieser Version überholt**. Die öffentliche Profil-URL kann weiterhin HTTP 403 liefern; dies behindert nicht den direkten, vom Nutzer bereitgestellten PDF-Abgleich. **Die private PDF selbst wird nicht im öffentlichen GitHub-Repository gespeichert.**

**Echte Item-IDs:** Alle unten genannten IDs wurden direkt mit `src/data/endfield/catalog/items.json` abgeglichen. Sie sind **offizielle SKPORT-Gegenstände**, keine aus Namen geratene Set-Ableitung. Varianten werden als optionale, begründete, kontextabhängige Vier-Teile-Loadouts unter dem jeweiligen Teammitglied angezeigt, nicht als zugleich aktivierbare Sets.

### Hauptfigur und Priorität (PDF-Seiten 1–2, 5 und 9)

- Hauptwaffe Typhoeus `Umbra of Frigid Eventide 1175`, Battle-Pass-Waffe `Suffering's End 1177`, ungünstige Notlösung `Detonation Unit 47`. Haupt-DPS-Waffen priorisieren, Alternativen nicht als BiS labeln.
- Standard vier Teile `Deep Rampart Armor 1239 / Gauntlets 1238 / Comms 1240 / LYNX Slab 365`, bleibt als Build A unverändert.
- **Ultimate-Energie-Variante:** Laut PDF **`LYNX Cuirass T1 1132 / Deep Rampart Gauntlets 1238 / Comms 1240 / Comms 1240`**. Der bisherige künstliche Build mit `Eternal Xiranite Bracing Slab T1 1236` war **nicht** die vom Nutzer beschriebene persönliche Variante und wurde vollständig ersetzt. Vier Teile und Herstellungsbedingungen bleiben im bestehenden Build-Finder.
- **Fertigkeiten:** PDF Seite 2 `BS > CS > BA = ULT`, Seite 9 `BS > CS > ULT = BA` – inhaltlich identischer Gleichstand von Basisangriff und Ultimate nach den beiden priorisierten Fähigkeiten. Das generische Guide-Schema unterstützt deshalb nun `=` als echtes Vergleichssymbol. Das bisherige künstliche `ULT > BA` wurde angepasst. Als explizite Upgrade-Ziele bleiben nur die PDF-gestützten `Battle M3 / Combo M3`; die nachrangigen Level 9/1 wurden **nicht** ohne eigene Bestätigung festgeschrieben.

### Meta-Kern und Waffen (PDF-Seiten 3, 6–8)

- Zwei vom Nutzer besonders hervorgehobene Teams: `Typhoeus / Arcane / Ardelia / Liino` (Ardelias Korrosion, mehrere Ziele, Liino-Combo-FP) und `Typhoeus / Arcane / Perlica / Liino` (Perlicas Elektrifikation und Single Target). Arcane immer Wille-Form, Ziel **mindestens 640 Wille**.
- **Arcane:** Hauptwaffe **Type 42: Solemn Phalanx `1045`**, Alternativen **Detonation Unit `47`** und **Junction Point `1043`**. Bevorzugte **Wille-/Eternal-Xiranite-Konfiguration**: **Light Armor `1134` / Wraps `1137` / Bracing Slab `1136` / Bracing Slab `1136`**. **WICHTIGE KORREKTUR:** Vormals `1138 Eternal Xiranite Hands` für Arcane war **falsch**, weil im PDF ausdrücklich **Wraps** genannt sind! `1138` gehört dagegen zu Liino. Seite 6 erwähnt als mögliche abweichende allgemeine Ultra-Energie-Variante den Auxiliary Arm anstelle einer Bracing Slab; der Nutzer hat aber danach ausdrücklich **für diese Typhoeus-Teamführung immer beide Bracing Slabs** vorgegeben. Deshalb bleibt in allen **acht** Teamkonfigurationen mit Arcane genau der bevorzugte Zwei-Slabs-Build aktiv, keine widersprüchliche alternative Arcane-Zeile.
- **Ardelia:** Signature **Dreams of the Starry Beach `49`**. Mit Arcane als Xiranit-Nutzer und **Liino im Team**: `Qingbo Light Armor 881 / Hot Work Hands PPE 1131 / Qingbo Cask 876 / Qingbo Cask 876`. **Ohne** anderen Xiranit-Nutzer: `Eternal Xiranite Light Armor 1134 / Gloves T1 332 / Auxiliary Arm 337 / Auxiliary Arm 337`. **Mit** Xiranit-Nutzer, aber **ohne** Liino: `Eternal Xiranite Armor 328 / Hot Work Gloves 775 / Power Cartridge 286 / Power Cartridge 286`. Hauptslot folgt dem tatsächlichen Team, die anderen sind sichtbar als bedingte weitere Setups benannt.
- **Liino:** Signature **Bedazzling Night Debut `1046`**, Alternative **Golden Age `1044`** (Battle Pass). **Mit** Xiranit-Arcane und zusätzlichem Ultimate-Energiebedarf: `Eternal Xiranite Light Armor 1134 / Hands 1138 / LYNX Slab 365 / LYNX Slab 365`. **Mit** Xiranit und **ohne** zusätzlichen Ultimate-Energiebedarf: `Rift Trekker Light Armor 1126 / Rift Trekker Hands 1129 / LYNX Slab 365 / LYNX Slab 365` (höchster Wille für Buff). **Ohne** separaten Xiranit-Nutzer: `Eternal Xiranite Light Armor 1134 / Hands 1138 / Auxiliary Arm 337 / LYNX Slab 365`. Der veraltete Misch-Build mit Gear `1132/1133/365/1236` ist ersetzt.
- **Perlica:** Hauptwaffe **Stanza of Memorials `94`**. Combo-Cooldown/Elektrifikation-Fokus: `Qingbo Light Armor 881 / Hot Work Gloves 775 / Qingbo Cask 876 / Qingbo Cask 876`. Variante mit mehr eigenem Schaden: `Pulser Labs Disruptor Suit 353 / Hot Work Gloves 775 / Calibrator 338 / Calibrator 338`. Die vorherige Quelle hatte andere Handschuh-IDs; diese wurden durch die eigenen PDF-Werte ersetzt.
- **Gilberta:** Hauptwaffe **Delivery Guaranteed `79`**, bedingte Alternative **Detonation Unit `47`** (anspruchsvollere Stacks). **Nuke-Taumelausrüstung** aus eigenem Rhodagn-Showcase: `Eternal Xiranite Armor 328 / Swordmancer TAC Gauntlets T1 874 / Swordmancer NAV Beacon 793 / Swordmancer NAV Beacon 793`. **Technik-Intensität**: `Armor 328 / Hot Work Gloves 775 / Power Cartridge 286 / Power Cartridge 286`. **Ohne weiteren Xiranit-Nutzer**: `Armor 328 / Gloves T1 332 / Auxiliary Arm 337 / Auxiliary Arm 337`. Bei den Metadaten im UI sind Alternativen nach Bedingung benannt, keine irreführende Empfehlung aller drei zugleich.

### Weitere Teams und Nuke (PDF-Seiten 4–5)

- Vom Mobalytics-Guide ausdrücklich als Meta-Alternativen genannt: Typhoeus + Arcane + **Ardelia/Perlica** + Gilberta. Beide Optionen im Bereich `teams.more[]` ergänzt und ihre passenden, bereits belegten Waffen-/Gear-ID-Kombinationen integriert. Die vorherigen fünf experimentellen/Video-Teamvarianten bleiben erhalten (gesamt **7 weitere Teams**). Wo der Mobalytics-PDF für Operatoren wie Xaihi, Antal, Fluorite oder Purrchena **keine persönlichen Waffen/Setups** dokumentiert, bleiben ihre Item-Slots bewusst unbesetzt; es werden keine Fremdlisten vorgetäuscht. Arcane ist auch bei diesen Teamvarianten konsequent identisch mit beiden Bracing Slabs eingetragen.
- **Rhodagn-Nuke** mit Arcane, Gilberta und Liino: Die Nuke-Notiz erklärt den eigenen Originalablauf (Liino Ultimate → Arcane Battle Skill verzögert auf Elektrifikation/Gilberta Combo treffen lassen → Arcane Combo zunächst zurückhalten → Typhis Final Strike → Typhi Ultimate → Gilberta Ultimate → Timing von Natur-Explosionen, Zeichen, Taumel- und Luftangriffen). Dazu Gilbertas belegte Swordmancer-Taumelausrüstung statt einer unmotivierten Datafield-Team-Tabelle.

### Template-Architektur und Schutz vor Fehlinterpretationen

- Generische **optionale Felder** pro `teams.meta[]` und `teams.more[]`: `memberGear[].weaponId`, `weaponRank` (nur bei wirklich belegtem Rang), `weaponAlternatives[]` sowie `alternatives[{title,items[4],note}]`. Schema verbietet doppelte Waffenempfehlungen und Waffentrang ohne Waffe. Nur echte SKPORT-ID, unveränderte Item-Icons/WebPs aus dem bereits vorhandenen lokalen Katalog, **keine neuen Bilder**.
- `TeamMemberGear.astro`: Standardwaffe als Icon+Name, optional belegte Alternativwaffen, dann der passende vierteilige Hauptbuild mit Icons; darunter ein **eigenes, standardmäßig eingeklapptes Details-Menü** pro Teammitglied für klar beschriftete Bedingungsvarianten. Dadurch bleiben große Meta-Teams optisch ruhig und trotzdem vollständig. Die generische Struktur ist für alle späteren Operatoren nutzbar.
- **Quellenhierarchie:** Der eigene PDF-Text regelt **Bewertungen, Team-Waffen und Team-Ausrüstung**; Datafield-Typhoeus-Charakterprofil liefert getrennt die durch Chromium validierten relativen Waffen-/Potenzialwerte; SKPORT liefert Item-IDs/Basiswerte. Unabhängige Datafield-Teamloadouts wurden, wo der PDF Werte nennt, **ersetzt**, nicht als persönliche Empfehlungen ausgegeben.
- **Wichtig:** Die echte Mobalytics-PDF ist privater Projektinput und wurde nicht ins Repo hochgeladen. Die exakten, vom Nutzer gelieferten Gear-/Waffenempfehlungen wurden als klar belegte redaktionelle Guide-Daten in `typhoeus.md` übernommen. Die veraltete HTTP-403-Blockade betraf nur die Website-Abrufschnittstelle, nicht mehr die PDF.

**Qualitätssicherung:** Regressionstest `scripts/endfield/typhoeus-feedback.test.mjs` validiert alle vier Slots pro Build und gegen den lokalen offiziellen Items-Katalog sowie sämtliche belegten Haupt-/Alternativwaffen; der echte Chromium-Test prüft Desktop 1440 / Mobil 390, zwei Meta-Teams, Wraps und beide Bracing Slabs bei Arcane, echte Waffenbilder und bedingte Varianten, alle Datafield-Szenarien, Skillgleichrang, Showcase-/Fazit-Layout, keine Seite mit Überlauf. CI-Prüfergebnisse, finalen Merge und Deployment separat in ROADMAP dokumentieren.
