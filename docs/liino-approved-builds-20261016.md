# Liino – von Ag0n1st freigegebene Ausrüstungs-Builds

**Entscheidung:** 16.10.2026.  
**Status:** [REDAKTIONELLE AUSWAHL BESTÄTIGT]; sechs Varianten in `src/content/operator-guides/liino.md` eingetragen; Gesamtguide bleibt **`preview`**, da Waffen, Skillbewertungen, Teams und Fazit noch ausstehen.  
**Datenstand:** offizieller lokaler SKPORT-Gear-Snapshot 2026-10-15; Item-IDs sind maßgeblich, Namen stehen für Menschen direkt daneben.  
**Frühere Recherche:** [Liino-Build-Vorschläge](liino-build-proposals-20261016.md) sind *historisch*; die hier dokumentierte Entscheidung des Creators **ersetzt** frühere Namenszuordnungen, Gear-Kombinationen und Gewichtungen. Keine alten Varianten automatisch wiederverwenden.

## Finale, namentlich lesbare Schnellübersicht

| Build | Rüstung | Handschuhe | Kit 1 | Kit 2 | Empfohlene Phase |
| --- | --- | --- | --- | --- | --- |
| **A – Ultimate-Fokus** | Eternal Xiranite Light Armor (`1134`) | Eternal Xiranite Hands (`1138`) | Eternal Xiranite Bracing Slab T1 (`1236`) | LYNX Slab (`365`) | Lv. 70 / Pyrrolit |
| **B – Balanced** | Eternal Xiranite Light Armor (`1134`) | LYNX Gauntlets T1 (`1133`) | LYNX Slab (`365`) | LYNX Slab (`365`) | Lv. 70 / Pyrrolit |
| **C – Will-Fokus** | Rift Trekker Light Armor (`1126`) | Rift Trekker Hands (`1129`) | LYNX Slab (`365`) | LYNX Slab (`365`) | Lv. 70 / Pyrrolit |
| **D – Level 60** | AIC Fieldwork Plate (`1117`) | AIC Fieldwork Hands (`1123`) | AIC Fieldwork Ember (`1120`) | AIC Fieldwork Ember (`1120`) | Lv. 60 / Xiranit |
| **E – Level 50** | Aburrey Light Armor T1 (`279`) | Mordvolt Resistant Gloves T1 (`331`) | Mordvolt Resistant Battery T1 (`335`) | Mordvolt Resistant Battery T1 (`335`) | Lv. 50 / Cryston |
| **F – Level 36** | Mordvolt Resistant Vest (`274`) | Mordvolt Resistant Gloves (`278`) | Mordvolt Resistant Battery (`284`) | Mordvolt Resistant Battery (`284`) | Lv. 36 / Ferrium |

**Bewusste Dopplung:** Zwei gleiche Kits bedeuten **zwei gefertigte Stücke** und **eine einzige freigeschaltete Blaupause** pro unterschiedlicher Gear-ID. Die ermittelten Fabrikstufen ergeben sich aus den **vier offiziellen Standardrezepten**. Die Besitzbestätigung in `localStorage` wird nicht durch Story-/Autoritäts- oder Gebietszugang ersetzt.

## Redaktionelle Entscheidungen und Begründungen

**A – Ultimate-Fokus:** Die vom Betreiber gewählte Standard-Ultimate-Variante liefert drei Eternal-Xiranite-Teile und damit einen über Liinos Ultimate aktivierbaren Schadensbonus für andere Teammitglieder. Liino benötigt genügend ULT-Aufladung für die beabsichtigten Teamrotationen; Gear-Grundwerte summieren sich auf **57,4 % Ultimate Gain Efficiency vor Veredelung/anderen Buffs**. Diese Variante wurde **bewusst Ultimate-Fokus genannt**, nicht „Standard-Support“, und die frühere, vier Eternal-Xiranite-Teile umfassende Alternative wurde **nicht** ausgewählt.

**B – Balanced:** Drei LYNX-Teile liefern den Heilungs-/Schadensreduktions-Setbonus und zwei LYNX Slabs stärken das Hauptattribut, während das einzelne Eternal Xiranite Light Armor Willenskraft und ULT-Energiegewinn beiträgt. In den Daten stehen **32,8 % UGE vor Modifikatoren** durch Armor/Gloves. Die persönliche redaktionelle Bezeichnung lautet ausdrücklich **Balanced**, nicht „LYNX-Sustain“.

**C – Will-Fokus:** **Rift Trekker Light Armor (ID 1126)**, **Rift Trekker Hands (ID 1129)** und **zweimal LYNX Slab (ID 365)**. Dies ist eine **situative Willenskraft-Maximierung** zur Steigerung von Liinos Will-skaliertem Elektro-/Natur-Amp auf dem Ultimate. Besonders sinnvoll, **wenn ein Kampf mit bereits aufgeladener Ultimate beginnt und keine zweite Ultimate in der Rotation vorgesehen ist**. Die zwei Rift-Trekker-Teile sind setfrei und zwei LYNX-Teile aktivieren **keinen 3er-LYNX-Setbonus**. Die direkte UGE dieses Sets ist niedrig; dieser Trade-off ist *bewusst* und kein universeller Endgame-BiS-Anspruch.

**D – Level 60:** AIC Fieldwork Plate, Hands und **zweimal AIC Fieldwork Ember**. Der Betreiber legt ausdrücklich mehr Wert auf **Ultimate-Energiegewinn** als auf einen zusätzlichen Heilungs-Kit; `Power Bank (1241)` aus dem vorläufigen Vorschlag ist **ersetzt**, nicht automatisch als alternative Empfehlung beibehalten. Die zweite Ember muss separat gefertigt werden.

**E – Level 50:** Vorläufige Kombination aus der Freigabe **unverändert** übernommen: Rüstung Aburrey `279`, Handschuhe Mordvolt `331`, zweimal Kit Mordvolt `335`. Offizielle Standardvorlagen sind an Autoritätsbelohnungen bis Level **38** geknüpft.

**F – Level 36:** Vorläufige Kombination aus der Freigabe **unverändert** übernommen: Rüstung Mordvolt `274`, Handschuhe Mordvolt `278`, zweimal Kit Mordvolt `284`. Offizielle Standardvorlagen sind an Autoritätsbelohnungen bis Level **23** geknüpft.

Alle anderen Behauptungen zu Rotations-Schadenswerten, BiS-Waffen, genauem Will-Cap oder konkreten Storyquests bleiben außerhalb der Creator-Freigabe; keine Werte daraus improvisieren.

## Offizielle Standard-Herstellungskosten (alle vier Teile, vor Veredelung)

| Build | Fabrikkomponenten | Währung |
| --- | --- | --- |
| A | 150 Pyrrolit (`1067`), 50 Xiranit (`528`) | 9.080 Wuling Stock Bills (`602`) |
| B | 100 Pyrrolit (`1067`), 100 Xiranit (`528`) | 16.720 Wuling Stock Bills (`602`) |
| C | 100 Pyrrolit (`1067`), 100 Xiranit (`528`) | 16.720 Wuling Stock Bills (`602`) |
| D | 80 Xiranit (`528`) | 12.000 Wuling Stock Bills (`602`) |
| E | 200 Cryston (`527`) | 38.400 Valley Stock Bills (`601`) |
| F | 200 Ferrium (`526`) | 4.800 Valley Stock Bills (`601`) |

Diese Kosten stammen **allein aus den importierten SKPORT-Standardrezepten**; sie sind nicht als zusätzliche redaktionelle Werte in `liino.md` dupliziert. Das Gear-Level/der Herstellungs-Tier sind unabhängige Gates.

## Technische Integration und Quellenprüfung

1. **Gear-Slot ID 1138:** Der alte SKPORT-Snapshot nennt fälschlich `gearSlot: "Kit"`, obwohl einzeln benannte externe Itemquellen **Gloves** belegen:
   - https://endfield.wiki.gg/wiki/Eternal_Xiranite_Hands
   - https://www.prydwen.gg/arknights-endfield/gear
   - https://endfieldhub.org/database/gears

   **Umsetzung:** `src/lib/endfield/gearSlotCorrections.mjs` ist eine exakte, quellenkommentierte ID-/Namen-basierte Korrektur am gemeinsamen Datenzugriff (`equipmentDetails.ts`); das originale Import-JSON bleibt **unverändert**. Dies verhindert, dass eine spätere erneute SKPORT-Importversion oder fremde Gear-Einträge pauschal umetikettiert werden. Upstream-/Importer-Reparatur bleibt bei Patchpflege sinnvoll.

2. **Genau vier korrekte Slots:** `src/lib/endfield/buildFinder.mjs` validiert **1 Armor, 1 Gloves und 2 Kit**; jede abweichende Kombination wird *nicht* als verifizierter Build markiert. Zwei gleiche Kits sind zugelassen.

3. **Guide-`preview` vs. echte Builds:** `src/components/operator/sections/OperatorEquipment.astro` blockiert per `preview` nur die Demo-Fälle ohne echte `equipment.builds`. Reale vom Creator festgelegte vierteilige Builds können bei bestätigter Progression verfügbar sein, **ohne** den gesamten noch unfertigen Guide auf `published` zu setzen.

4. **Ausrüstungs-UI:** Baut die Namen über offizielle Gear-IDs auf, statt jedes Mal händisch Name oder Set-Stats im Markdown zu speichern. Spieler müssen die Blaupause jeder **unterschiedlichen ID** selbst bestätigen.

5. **Tests:** `scripts/endfield/build-finder.test.mjs` deckt Slot-Konsistenz und doppelte Kits ab. `scripts/endfield/liino-builds.test.mjs` kontrolliert alle sechs ID-Kombinationen, Offiziell-Katalog-Namen/Slots/Rezepte/Tier/Level, Einzelteilbesitz und den isolierten #1138-Override.

6. **Versions- und Quellen-Hinweis:** Beim nächsten Katalogimport den alten Snapshot-Korrekturfall neu abgleichen; eine Community-Bauplan-Kistenzuordnung ist **keine** offizielle SKPORT-Marker-ID. Ggf. Goldstandard: in Spiel/UI visuell bestätigen.

## Noch offene Aufgaben der Phase P1

- [ ] PR-Checks (Node-Tests, Astro-Build, Datenbudget) nachweisbar erfolgreich.
- [ ] Merge nach `main` und Pages-Deploy **getrennt prüfen**; kein Erfolg behaupten ohne Nachweis.
- [ ] Im echten Browser Liino-Guide (Desktop/mobil) mit allen sechs Varianten prüfen; `available` erst bei ausreichendem Level, Komponenten-Tier, Gebiet/Authority/Region und manuellem Blaupausenbesitz.
- [ ] Alle 4 Gear-Positionen prüfen, insbesondere ID 1138 als Handschuh sowie zweite Kit-Kopie.
- [ ] Bestehenden Typhoeus-Guide ohne Regression testen.
- [ ] Weiterhin übrige Liino-Sektionen P2 (Waffen/Skills/Teams/Potenziale/Gameplay/Fazit) redaktionell ausarbeiten; Gesamtstatus `preview` nicht als fertig umdeuten.

**Arbeitsregel:** Nach jedem Entwicklungsschritt `ROADMAP.md` nachführen, ggf. zusätzlich dieses Dokument. Die Entscheidungen des Nutzers in diesem Dokument haben Vorrang vor der alten Forschungs-Shortlist.
