# Liino – historische Build-Recherche (durch Creator-Entscheidung überholt)

> **Archivstand / nicht mehr aktuell als Build-Freigabe (16.10.2026):** Der Betreiber hat anschließend alle sechs Builds **konkret angepasst und freigegeben**. Verbindliche Namen, vier IDs pro Build, Prioritäten und Einsatzbedingungen stehen nun in **[docs/liino-approved-builds-20261016.md](liino-approved-builds-20261016.md)** und `src/content/operator-guides/liino.md`. Die untenstehenden früheren Namen „Standard-Support“, „Ultimate-Fokus“, „LYNX-Sustain“ sowie der zusätzliche vierte Eternal-Xiranite-Build, die 60er Power Bank und die alte C-Kombination sind **historische Vorschläge, nicht mehr die aktuelle Auswahl**. Nur als Forschungs- und Quellenarchiv verwenden.


**Stand:** 16.10.2026  
**Status:** [RECHERCHE – ZUR CREATOR-FREIGABE]; **nicht** als offizielle Ag0n1st-Builds veröffentlichen.  
**Zielphase:** ROADMAP P1, erster echter Operator-Ausrüstungs-Build mit korrekten vier Item-IDs, nachvollziehbarer Progression und funktionierender Freischaltprüfung.  
**Gültigkeit:** Offizieller, lokal gespeicherter SKPORT-Snapshot vom **15.10.2026**; Community-Builds zuletzt zwischen August und Oktober 2026 bewertet. Nach neuem Patch neu prüfen.  
**Redaktionsschutz:** `src/content/operator-guides/liino.md` bleibt unverändert (`status: preview`, `equipment.builds: []`) bis die konkreten Vorschläge vom Creator freigegeben sind.

## 1. Quellensystem, Vertrauensgrenzen und Verfahren

**A – Offizieller Spieldaten-Snapshot (objektive Informationen, lokal gespeichert):**
- [Liino-Kit, SKPORT Item-ID 1041](../src/data/endfield/operators/liino.json), [Attribute und Talente](../src/data/endfield/operators/liino.extra.json), [DE-Übersetzung](../src/data/endfield/locales/de/liino.json).
- [Equipment-Katalog](../src/data/endfield/catalog/equipment-details.json): 258 Gear- und 84 Waffen-Einträge, Gear-Slots/Attribute/Standardrezepte und offizielle Erwerbsnotizen; Rohdatensatz kann auch **Import-/Normalisierungsfehler** enthalten.
- [Einzelteilgenaue Fundortrecherche](../src/data/endfield/progression/blueprint-precise-gear-index.json): Community-Nachweise pro offizieller Gear-ID; Aussagen **nicht** automatisch offizielle Map-Marker oder Besitzerwerb.
- [Build-Finder](../src/lib/endfield/buildFinder.mjs) und [Story-/Blaupausen-Engine](../src/lib/endfield/buildStoryProgress.mjs).

**B – Externe Build-Interpretation (nicht offiziell, kein Ersatz für eigene Freigabe):**
- [Prydwen – Liino](https://www.prydwen.gg/arknights-endfield/characters/liino) (letzte große Review-/Berechnungsaktualisierung: Patch 1.4, 02.09.2026): konkrete vierteilige Endgame-Sets mit energieabhängigen Varianten, mechanische Begründung, praktische Energie-Breakpoints.
- [Mobalytics – Liino](https://mobalytics.gg/arknights-endfield/characters/liino-build-guide) (aktualisiert 12.08.2026): unabhängige Unterstützung für Kernset und 3+1-Setup.
- [EnfieldBuild – Liino](https://www.enfieldbuild.com/characters/liino) (20.09.2026): zusammenfassendes Sekundärprofil, verweist bei Ranking teils auf Prydwen; **nicht als weitere unabhängige Bestätigung zählen**.
- [Icy Veins – Liino](https://www.icy-veins.com/arknights-endfield/liino-guide-best-builds) (29.09.2026): Endgame-/Frühspiel-Vorschläge, aber gleichzeitig noch erkennbar veraltete Vorrelease-Aussagen. Nur einzelne Item-Verknüpfungen berücksichtigen, nicht blind Rangfolge übernehmen.
- [Endfield HQ](https://www.hq1.pro/en/endfield/update/v1-4/liino-gear-build-skill-priority) und weitere Blogs: ergänzende Einordnung, keine alleinige Quelle für Freigabe.

**C – Redaktionelle Interpretation dieses Dokuments:** Alle Bezeichnungen „Vorschlag“, „empfohlen“, „sinnvoller Einsatz“ und jede Rangfolge sind **vorläufige Analyse**. Es wurden **keine eigenen Ingame-Tests, Schadenssimulationen oder geprüfte DPS-Prozentvergleiche** durchgeführt. Set-Effekte, Slots und Rezepte sind vom lokalen SKPORT-Snapshot; Verfügbarkeit von Kisten ist nur bis zur dokumentierten Community-Evidenz belegt.

## 2. Warum Liino welche Werte benötigt

Liino ist **6★ Elektro / Supporter / Stangenwaffe**, **Willenskraft** als Haupt- und **Beweglichkeit** als Sekundärattribut.

- **Kampffertigkeit – Dazzling Focus:** 25 SP, wechselt bis zu 60 Sekunden in die Vocalist Stance und gibt dem Team einen ANG-Bonus; die Heilpulse erfolgen im Bereich. Auf M3: **10 % Team-ANG**, 3-Sekunden-Heilintervall; Heilwert verbessert sich mit **Beweglichkeit**.
- **Kombofertigkeit – Delightful Harmonics:** nur während Vocalist Stance bei Anwendung/Verbrauch einer Arts-Reaktion; verleiht zusätzlich **20 Ultimate-Energie** bei einer maximal ausgebauten Fertigkeit (auch niedrigere Ränge haben laut Snapshot 20, vor Veröffentlichung prüfen), verkürzt den Weg zu ihrem Ultimate. Das zweite Kampftalent kann nach ihrer Kombo eine Elektro-/Natur-Kampffertigkeit um **10 SP** erstatten (höchster Talentstand).
- **Ultimate – Dawnstar Concerto:** benötigt **160 Ultimate-Energie**; bietet den wichtigsten Teamnutzen für Elektro-/Natur-Teams durch beide **Amps**, 10 % ANG und Heilung. Auf M3: Zuwachs **0,04 % Amp je Willenskraft-Punkt**, dokumentierte Höchstangabe **60 % aus Will**; die tatsächliche erreichbare Höhe und das Verhältnis von Wirkstufen/zusätzlichen Boni **nicht** ohne Ingame-Formel als festen praktischen Stat-Cap vermarkten. Die Haltung dauert 15 Sekunden.
- **Daraus abgeleitete Priorität:** (1) genug **Ultimate-Energiegewinn** für die tatsächlich gespielte Rotation, (2) **Willenskraft** und sinnvoller Hauptattributbonus für Amps, (3) **Beweglichkeit/Heilung** für Sustain. Der beste Build hängt besonders davon ab, **wie viele Liino-Kombofertigkeiten pro Ultimate-Rotation** tatsächlich möglich sind.
- **Eternal Xiranite 3er-Bonus:** 1.000 LP für Träger; nach gewirkter Amp/Protected/Susceptibility/Weakness erhalten andere Teammitglieder **+16 % verursachten Schaden für 15 Sekunden**, nicht stapelbar. Bei Liino ist **das Ultimate der verlässliche Auslöser**; der ANG-Bonus ihrer normalen Haltung allein ist kein Amp-Trigger.
- **LYNX 3er-Bonus:** +20 % Heilungseffizienz; behandelte Teammitglieder bekommen 15 % Schadensreduktion für 10 Sekunden, bei Überheilung 30 % (gleiche Effekte nicht stapelbar). Relevant, wenn Eternal Xiranite bereits anderweitig belegt ist oder Überleben Priorität hat.

**Externe, kontextabhängige Energie-Richtwerte:** Prydwen zeigt anhand einer Modellrotation mit **600 SP**: Bei **5** Liino-Kombos sind rund **16,5 % UGE** nötig, bei **4** rund **35,6 %**, bei **3** rund **62,2 %**, bei **2** rund **101,7 %**. Diese Zahlen sind **keine garantierten allgemeinen Breakpoints**; Team-SP-Rückgabe, Potenziale, Gegnerreaktionen, Waffeneffekt und tatsächliche Zeitfenster verändern die Rechnung. Die nachstehenden UGE-Zahlen der Gear-Items sind reine Snapshot-Grundwerte und ignorieren Veredelung und andere Modifikatoren.

## 3. Sechs vollständige vierteilige Vorschläge (IDs gegen offiziellen Katalog kontrolliert)

### Lesbare Schnellübersicht – Name und ID immer gemeinsam

Die Item-ID ist ein technischer Identifikator und ersetzt **nie** die lesbare Bezeichnung. Die Reihenfolge ist jeweils **Rüstung / Handschuhe / Kit 1 / Kit 2**. Bei doppeltem Kit werden **zwei Exemplare** desselben Teils benötigt. **ID 1138** ist wegen der noch zu prüfenden Import-Slot-Zuordnung vorläufig mit Stern markiert.

| Build / Ziel | Rüstung | Handschuhe | Kit 1 | Kit 2 |
| --- | --- | --- | --- | --- |
| A – Lv. 70, Standard-Support | Eternal Xiranite Light Armor (ID 1134) | Eternal Xiranite Hands (ID 1138)* | Eternal Xiranite Bracing Slab T1 (ID 1236) | LYNX Slab (ID 365) |
| B – Lv. 70, Ultimate-Fokus | Eternal Xiranite Light Armor (ID 1134) | Eternal Xiranite Hands (ID 1138)* | Eternal Xiranite Bracing Slab T1 (ID 1236) | Eternal Xiranite Bracing Slab T1 (ID 1236) |
| C – Lv. 70, LYNX-Support | Eternal Xiranite Light Armor (ID 1134) | LYNX Gauntlets T1 (ID 1133) | LYNX Slab (ID 365) | LYNX Slab (ID 365) |
| D – Lv. 60, Wuling | AIC Fieldwork Plate (ID 1117) | AIC Fieldwork Hands (ID 1123) | AIC Fieldwork Ember (ID 1120) | AIC Fieldwork Power Bank (ID 1241) |
| E – Lv. 50, Midgame | Aburrey Light Armor T1 (ID 279) | Mordvolt Resistant Gloves T1 (ID 331) | Mordvolt Resistant Battery T1 (ID 335) | Mordvolt Resistant Battery T1 (ID 335) |
| F – Lv. 36, Early Game | Mordvolt Resistant Vest (ID 274) | Mordvolt Resistant Gloves (ID 278) | Mordvolt Resistant Battery (ID 284) | Mordvolt Resistant Battery (ID 284) |



**Slotregel:** Eine Rüstung (**Armor**) + ein Handschuh (**Gloves**) + **zwei Kits**. Doppelte Kits benötigen zwei hergestellte Exemplare, aber nicht zwei unterschiedliche Blaupausen. Alle Einzelteile sind im offiziellen lokalen Snapshot als `verified` mit `recipeStatus: verified` geführt. **Ausnahme zur Slot-Qualität: ID 1138 siehe Blocker Abschnitt 6.**

### L70-A – Standard-Support, Eternal Xiranite 3+1 (bevorzugter P0-Freigabekandidat)

| Slot | Offizielle ID | Offizieller Name | Relevante Grundwerte |
| --- | --- | --- | --- |
| Rüstung | **1134** | Eternal Xiranite Light Armor | Will +110; UGE +12,3 % |
| Handschuhe | **1138** | Eternal Xiranite Hands | Will +65; Beweglichkeit +43; UGE +20,5 % |
| Kit 1 | **1236** | Eternal Xiranite Bracing Slab T1 | Will +32; Beweglichkeit +21; UGE +24,6 % |
| Kit 2 | **365** | LYNX Slab | Will +32; Intellekt +21; Hauptattribut +20,7 % |

- **Drei Eternal-Xiranite-Teile** aktivieren den +16-%-Schadensbonus, **LYNX Slab** ist der stärkende Off-Piece-Kandidat. UGE vor zusätzlichen Modifikationen: **57,4 %**; bei nur drei erreichbaren Combos kann dies laut Prydwen-Modell **unter dem angenommenen Energiebedarf** liegen. Bei zu wenig Energie statt blindem „BiS“ erst Alternative L70-B oder optimierte Veredelung prüfen.
- **Offizielle Standardkosten für vier Teile:** **150 Pyrrolit (ID 1067)**, **50 Xiranit (ID 528)**, **9.080 Wuling Stock Bills (ID 602)**. **Höchste Komponente: Pyrrolit; Gear-Level: 70.**
- **Community-Fundortstand:** ID 1134 + 1138 → Yinglung Pass / Pass-Side Canal (nur Wiki-Einzelteil); ID 1236 → Snowy Forest / Hoarfrost Woods (Wiki-Einzelteil); ID 365 → Wuling City / Institute of Materials Science (zwei gleichgerichtete Community-Einzelteilquellen). **Kein offizieller Marker-zu-ID-Beweis; Besitz muss bestätigt werden.**
- **Begründung:** Starkes universelles Team-Buffing bei regelmäßiger Ultimate-Anwendung und ausreichender Ultimate-Energie. **Vorläufiger Favorit**, kein vom Creator freigegebenes BiS.
- **Blockiert:** Ein Import-Slot von **ID 1138** ist inkonsistent (siehe Abschnitt 6).

### L70-B – Energielastige Rotation, vollständiges Eternal Xiranite

| Slot | ID | Teil |
| --- | --- | --- |
| Rüstung | **1134** | Eternal Xiranite Light Armor |
| Handschuhe | **1138** | Eternal Xiranite Hands |
| Kit 1 | **1236** | Eternal Xiranite Bracing Slab T1 |
| Kit 2 | **1236** | Eternal Xiranite Bracing Slab T1 (**zweites Exemplar**) |

- **Vier Teile** desselben Sets aktivieren den 3er-Bonus **nur einmal**, sind aber durch die zusätzliche UGE aus dem zweiten Slab T1 bei ungünstigem Kombo-Timing interessant. UGE ohne andere Modifikationen: **82,0 %**, dafür entfällt der Hauptattributbonus des LYNX Slab.
- **Offizielle Standardkosten:** **200 Pyrrolit**, **1.440 Wuling Stock Bills**; **Level 70**, höchste Komponente **Pyrrolit**. Die günstiger wirkenden Währungskosten sind **offizielle Rezeptwerte**, kein universeller wirtschaftlicher Vergleich mit den übrigen Ressourcen.
- **Fundorte:** ID 1134+1138 Yinglung Pass und ID 1236 Snowy Forest (Community-Belege wie oben). Zwei Kits erfordern zwei Exemplare, **kein doppeltes Blaupausen-Häkchen**.
- **Einsatz:** Alternative, falls die reale Rotation nicht zuverlässig genügend Combos für L70-A erzeugt. **Nicht** als automatisch besserer Damage-Build deklarieren. Wie L70-A durch ID-1138-Slotfehler blockiert.

### L70-C – LYNX-Sustain, wenn Eternal Xiranite bereits im Team genutzt wird

| Slot | ID | Teil |
| --- | --- | --- |
| Rüstung (Off-Piece) | **1134** | Eternal Xiranite Light Armor |
| Handschuhe | **1133** | LYNX Gauntlets T1 |
| Kit 1 | **365** | LYNX Slab |
| Kit 2 | **365** | LYNX Slab (**zweites Exemplar**) |

- **Drei LYNX-Teile** → Sustain-/Schadensreduktionsbonus, doppelte LYNX Slab → **zweimal Hauptattribut +20,7 %** als jeweiliger Item-Stat (tatsächlichen finalen Stat im Spiel verifizieren); UGE-Grundwerte **32,8 %**. Ausrüstungsstück ID 1134 als Off-Piece bringt zusätzlich Will und UGE.
- **Offizielle Standardkosten:** **100 Pyrrolit**, **100 Xiranit**, **16.720 Wuling Stock Bills**, **Level 70**, höchste Komponente **Pyrrolit**.
- **Fundorte:** ID 1134 Yinglung Pass, ID 1133 Yinglung Pass / Stonepond Cliff (jeweils ein Community-Wiki-Nachweis); ID 365 Wuling City / Institute of Materials Science (zwei Community-Quellen). **Blaupausen nicht automatisch im Besitz.**
- **Wichtiger Zielkonflikt:** Niedrige UGE relativ zu L70-A/B; für rotationssichere 160 Ultimate-Energie zusätzliche Quellen nötig. Die Alternative ist **situativ**, besonders wenn ein anderer Support Eternal Xiranite auslöst, dessen Schadensbonus nicht stapelbar ist.

### L60-A – Wuling-Einstieg, AIC Fieldwork

| Slot | ID | Teil |
| --- | --- | --- |
| Rüstung | **1117** | AIC Fieldwork Plate |
| Handschuhe | **1123** | AIC Fieldwork Hands |
| Kit 1 | **1120** | AIC Fieldwork Ember |
| Kit 2 | **1241** | AIC Fieldwork Power Bank |

- **Vier AIC-Fieldwork-Teile**: 3er-Bonus laut SKPORT **+20 % verursachter Schaden, 10 % Schadensreduktion und +10 % Ultimate Gain Efficiency** beim Träger. Snapshot-Grundwerte der Teile zusätzlich **10,5 % + 17,6 % + 21,1 % UGE**, also **59,2 % inklusive 3er-Bonus** (ohne Veredelung). `Power Bank` ergänzt **Treatment Bonus +17,7 %**.
- `Main Attribute`/`Secondary Attribute` des Sets werden dynamisch auf Liinos **Will/Agility** bezogen, nicht als festes Will-Wording im Rohdatensatz gespeichert.
- **Offizielle Standardkosten:** **80 Xiranit**, **12.000 Wuling Stock Bills**; höchste Komponente **Xiranit**, **Gear-Level 60**.
- **Erwerbsweg:** Offizieller Wiki-Text „Game progress reaches the [Wuling] region“; ID 1241 zusätzlich als Inhalt einer Versionserweiterung markiert. **Wuling erreicht bedeutet nicht, dass jedes Teil tatsächlich erhalten ist.** Für konkrete Baubarkeit weiter Nutzer-Besitz und Fabrikkomponente prüfen.
- **Einsatz:** Übergangsset für Spieler mit Wuling-Fortschritt, aber noch ohne volle Endgame-Blueprints. **Eigene redaktionelle Wahl** aus offiziellen Attributen; kein extern bestätigter, separat durchgetesteter BiS-60-Build.
- **Option für mehr UGE:** Statt `1241` ein zweites `1120` (zusätzlich +21,1 % UGE, aber weniger Heilbonus); erst nach Rotationscheck entscheiden.

### L50-A – Cryston-Progression, Mordvolt Resistant 3+1

| Slot | ID | Teil |
| --- | --- | --- |
| Rüstung (Off-Piece) | **279** | Aburrey Light Armor T1 |
| Handschuhe | **331** | Mordvolt Resistant Gloves T1 |
| Kit 1 | **335** | Mordvolt Resistant Battery T1 |
| Kit 2 | **335** | Mordvolt Resistant Battery T1 (**zweites Exemplar**) |

- **Drei Mordvolt-Resistant-Teile**: **Will +50** durch 3er-Bonus; nur **wenn Liinos LP unter 50 %** fallen, greift der zusätzliche +30-%-Heileffekt. Letzteres ist kein dauerhaft aktiver Heilbonus. Das Off-Piece bringt **Will +61, Agility +41**, passend zu ihren Skalierungen; Handschuhe/Power Banks sorgen für weiteres Will, Agility und Behandlung.
- **Offizielle Standardkosten:** **200 Cryston**, **38.400 Valley Stock Bills (ID 601)**; **Gear-Level 50**, höchste Komponente **Cryston**.
- **Offizielle Autoritätsbelohnungen:** ID 279 ab **Autoritätslevel 28**, 331 ab **33**, 335 ab **38**; **Maximalvoraussetzung für die Baupläne in dieser Kombination 38**, tatsächliche Abholung separat bestätigen. Zwei Exemplare Kit 335 aus derselben freigeschalteten Vorlage.
- **Einsatz:** Sinnvoller Übergang mit Will für Ultimate-Amps und Behandlung. **Community-Kombinationsanregung**, aus dem offiziellen Katalog gegenüber älteren Set-Zusammenstellungen exakten IDs nachgebildet.

### L36-A – Ferrium-Early-Game, Mordvolt Resistant

| Slot | ID | Teil |
| --- | --- | --- |
| Rüstung | **274** | Mordvolt Resistant Vest |
| Handschuhe | **278** | Mordvolt Resistant Gloves |
| Kit 1 | **284** | Mordvolt Resistant Battery |
| Kit 2 | **284** | Mordvolt Resistant Battery (**zweites Exemplar**) |

- **Vier Mordvolt-Resistant-Teile**: 3er-Bonus **Will +50** plus bedingte Behandlung bei unter 50 % LP; zweites Kit ermöglicht nützliche individuelle Will-/Treatment-Stats, obwohl ein viertes gleiches Set-Teil **keinen zweiten 3er-Seteffekt** erzeugt.
- **Offizielle Standardkosten:** **200 Ferrium**, **4.800 Valley Stock Bills**, **Gear-Level 36**, höchste Komponente **Ferrium**.
- **Offizielle Autoritätsbelohnungen:** ID 274 ab Autoritätslevel **17**, ID 278 ab **19**, ID 284 ab **23**; Besitzerwerb auch hier unabhängig von Authority-Auswahl.
- **Einsatz:** Frühe Liino-Support-Progression ohne vorausgesetzte Wuling-Freischaltung.

## 4. Priorisierung und mögliche redaktionelle Struktur nach Freigabe

| Priorität | Vorschlag | Zweck | Vertrauen / offene Voraussetzung |
| --- | --- | --- | --- |
| 1 | **L70-A** | Allgemeines Support-Endgame | **Hohe externe Übereinstimmung**, jedoch Energierotation und Item-1138-Slot-Import prüfen |
| 2 | **L70-B** | Wenige Combos / UGE | **Nachvollziehbar aus offiziellen Stats + Prydwen**, Effekt auf reale Rotation überprüfen |
| 3 | **L70-C** | Ein anderer Operator trägt Eternal Xiranite | **Prydwen-gestützte situative Alternative**, End-UGE im konkreten Team verifizieren |
| 4 | **L60-A** | Frühe Wuling-/Xiranit-Phase | **Eigens aus offiziellem Katalog abgeleiteter Vorschlag**; noch kein echter Performancevergleich |
| 5 | **L50-A** | Cryston / Authority bis 38 | **Offizielle Komponenten/Attribute + Community-Setanregung**, noch kein Creator-Test |
| 6 | **L36-A** | Ferrium / Authority bis 23 | **Aus offizieller Datenlage abgeleitet**, kein Creator-Test |

**Wichtig für P1:** Nicht alle sechs auf einmal veröffentlichen müssen. Nach Freigabe zunächst **L70-A**, danach optional L70-B/L70-C und Progressionsstufen; bei Bedarf die Reihenfolge an deine tatsächlichen Erfahrungen anpassen. `equipment.builds[]` bleibt bis zur Freigabe leer.

## 5. Zusätzliche Waffenbeobachtungen (noch NICHT Teil der P1-Buildfreigabe)

- **Bedazzling Night Debut – SKPORT-ID 1046:** Signatur-Stangenwaffe, passender Will-/Treatment-Wert und persönlicher Hauptattributbonus, zusätzlich stapelbare Team-ANG-Erhöhung über Behandlung. Von Prydwen/Mobalytics als erste Wahl gewertet; **nicht** ungeprüft Prozent-Leistungswerte übernehmen.
- **Golden Age – SKPORT-ID 1044:** Battle-/Protocol-Pass-Stangenwaffe, ebenfalls Will und Treatment; alternativer Arts-Damage-Buff, bei hohen Stufen anders zu bewerten als bei P0. **Nicht pauschal F2P nennen**, da BP-Zugang eine eigene Erwerbsbedingung ist.
- Waffenrangliste, Potenziale und Skill-Prio sollen in P2 redaktionell gesondert bestätigt werden.

## 6. Vor tatsächlicher Integration entdeckte technische Blocker

### B1 – ID 1138 ist im lokalen Gear-Katalog scheinbar falsch als Kit eingeordnet

`equipment-details.json` hat für **Eternal Xiranite Hands, Gear-ID 1138**: `gearSlot: "Kit"`, obwohl Bezeichnung, Verteidigungswert **+42** und externe konkrete Slotlisten (Prydwen/Mobalytics/EnfieldBuild) es als **Gloves** führen. Dadurch erscheinen die Vorschläge L70-A und L70-B nach aktuellem Datenmodell als **1× Armor, 0× Gloves, 3× Kit**, obwohl die beabsichtigte reale Kombination 1/1/2 lautet.

- **Abnahme vor Veröffentlichung:** Tatsächliche offizielle Gear-Typ-/Slot-Quelle prüfen; Import-/Normalisierungspfad samt Regressionstest korrigieren, **nicht lediglich den Anzeigenamen überschreiben**. Erst dann die geforderten 1/1/2-Slots maschinell bestätigen.
- Nicht alle `Hands`-Einträge global anhand des Namens uminterpretieren; die Korrektur muss **itemgenau und quellenbelegt** sein.

### B2 – Ein echter Build wird derzeit pauschal durch `status: preview` blockiert

`src/components/operator/sections/OperatorEquipment.astro` übergibt an `getBuildRequirements(..., { preview })` immer das **Statuskennzeichen des ganzen Guides**. In `src/lib/endfield/buildFinder.mjs` erzwingt `evaluateBuildAvailability` bei `req.preview === true` stets `unverified`. Das führt dazu, dass auch mit **vier echten freigegebenen Item-IDs, Fabrik, Level, Gebieten und bestätigtem Vorlagenbesitz** der Build weiter „ungeprüft“ bleibt, solange `liino.md` selbst `preview` ist.

- **Korrekturvorschlag nach Freigabe:** Vorschau-Blockade nur auf die generierten Demo-Builds anwenden (z. B. `preview && guide.equipment.builds.length === 0`), **nicht** auf valide redaktionelle Einträge. Den gesamten Guide **nicht vorschnell** auf `published` umstellen.
- Regressionstests: Demo-Vorschau bleibt `unverified`; echter Vier-Teile-Build darf bei nachgewiesenen Voraussetzungen `available` werden, obwohl übrige Guide-Sektionen in `preview` bleiben.

### B3 – Slot- und Stückzahlprüfung vor künftiger Veröffentlichung

Das Guide-Schema garantiert **vier Item-IDs**, kontrolliert aber noch nicht zuverlässig die echte Inventar-Slot-Belegung **1× Armor, 1× Gloves, 2× Kit** gegen den offiziellen Katalog. Diese Prüfung ergänzt P1 sinnvoll, sobald B1 korrigiert wurde. Doppelte Kit-Item-IDs sind grundsätzlich vorgesehen, benötigen aber zwei gefertigte Exemplare. Keine deduplizierte Vier-Teile-Anzahl als „vollständig“ darstellen.

### B4 – Keine behauptete automatische Gebietsfreischaltung

`blueprint-precise-gear-index.json` enthält für L70-A konkrete Community-Gebietshinweise, jedoch **keine offiziell verifizierten Marker-ID→Gear-ID-Paare**. Gebiet „erreichbar“ ist nicht gleich „Blueprint im Inventar“. Die bestehende Freischaltung trennt diese Konzepte und muss beibehalten werden. 
Außerdem enthält `localStorage` die Besitzangaben, aber keine Synchronisation zwischen Browsern.

## 7. Konkreter Freigabeauftrag / nächste Arbeit

**Bitte vor P1-Implementierung bestätigen oder korrigieren:**

1. Sollen **L70-A** als Standard, **L70-B** für energiekritische Rotationen und **L70-C** als LYNX-Sustain-Alternative angeboten werden?
2. Sollen die drei Level-36/50/60-Vorschläge übernommen werden? Gerade für 60 ist dies eine Katalog-Hypothese, kein durchgetesteter „bester“ Build.
3. Hast du Erkenntnisse, welche Liino-Rotationen typischerweise **2/3/4/5 Combos** erreichen und ob sie in deinen Teams üblicherweise auf **P0** gespielt wird?
4. Nach Freigabe technische **B1/B2/B3** lösen, alle Teil-IDs und Quellen-/Materialdaten aus offiziellem Snapshot erneut prüfen, in `liino.md` mit redaktionell bestätigten Texten eintragen, `test:endfield`, **100-MB-Budget**, `build`, echte Browser-Kontrolle auf Liino und Typhoeus, CI/Merge/Deploy, `ROADMAP.md` aktualisieren.

**Transparenz:** Dieses Dokument ist ein **Arbeitsvorschlag zur Freigabe**, kein öffentlich als von Ag0n1st empfohlenes Meta-Handbuch. Aussagen zu Gear-Slots/Status/Fundorten haben unterschiedliche Belegstufen. Kein Liino-Guide-Inhalt wurde während dieser Recherche veröffentlicht.
