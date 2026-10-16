# Datafield – reproduzierbarer Browser-DOM-Export und Liino-Probe

**Datum:** 16.10.2026  
**Technischer Status:** [ECHT GETESTET; VIA PR #22 AUF `main` GEMERGT, CI #95 GRÜN]. `scripts/endfield/datafield_rendered_export.py` konnte im GitHub-Actions-Chromium-Run **#87** auf `https://datafield.cc/characters/liino` nach vollständigem Laden **5 Potenziale und 7 Waffenvergleichswerte** aus dem gerenderten HTML-DOM lesen. JSON-Ausgabe lag als kurzlebiges Workflow-Artefakt `datafield-liino-rendered` vor. **Keine Veröffentlichung im Liino-Guide in diesem Untersuchungsschritt.**

**GitHub-Nachweis:** [PR #22](https://github.com/Ag0n1st/ag0n1st.github.io/pull/22), Merge-Commit `c30057ae86c88be79d151c02ecfe059d2335dba4`. Chromium-Liveproben GitHub CI #87 und #91 bestätigten die Rohdaten; normaler Build-/Testlauf #95 erfolgreich. Manual-`workflow_dispatch`-UI selbst noch nicht getestet.

## Warum die alte Recherche fälschlich `Loading data...` sah

Ein HTTP-/Textcrawler empfängt die beim Seitenstart ausgelieferte Shell (z. B. `Arknights: Endfield Tools / Loading data...`), nicht zwingend den **nach JavaScript-Hydratation** gefüllten DOM. Datafield enthält nach dem Rendern tatsächlich `Potentials (DPS Increase)`, `Recommended Weapons`, `Recommended Gear Sets`, Empfehlungen, Vergleichstags und Berechnungssheet-Links.

Der erste Headless-Browser-Versuch stieß auf einen überlagernden `#app-preloader`, der den Maus-Klick auf `Show 2 More Weapons` verhinderte – obwohl die Datentabelle bereits geladen war. Das Problem wurde **ohne Entfernen von Site-Elementen** behoben, indem die Klickaktion über das echte Button-DOM-Ereignis `element.click()` ausgeführt wird. **Danach: 5/5 Potenziale und 7 Waffenvarianten**, keine erdachten Werte.

## Direkte Datenprobe: Liino (Datafield, 16.10.2026)

### Potenziale

Datafield schreibt unmittelbar über den Werten: **`Each % increase is relative to the previous potential.`**. Daher Werte **nicht** als kumulativ `vs. P0` deuten, sondern als relative Steigerung der **jeweils vorherigen** Stufe:

| Potenzial | Direkter Datafield-Wert vs. vorherige Stufe |
| --- | ---: |
| P1 | +3,2 % |
| P2 | +0,7 % |
| P3 | +0,8 % |
| P4 | +0,0 % |
| P5 | +4,7 % |

Auf der öffentlichen Website wären dies die **`increaseOverPreviousPercent`**-Felder; die **`increaseOverP0Percent`**-Felder bleiben **leer**, solange ein expliziter Gesamtvergleich bzw. eine freigegebene Umrechnung nicht dokumentiert ist. Quelle immer **`Datafield`** (Klartext, nicht verlinkt).

### Waffenergebnisse der beim Export angezeigten Vergleichsvariante

Das gerenderte DOM zeigt **zwei unabhängig anwählbare Team-Szenarien**, beide sind nun im **Chromium-CI-Run #91** maschinell ausgelesen. Die standardmäßig aktive Registerkarte war laut `button.char-tab.active` eindeutig **`Zhuang Perlica Arclight Team`**; die zweite Registerkarte heißt **`Arcane TT Xaihi Team`**. Die Prozentwerte sind **nicht universal**, sondern nach Teams getrennt. In **beiden** Vergleichsszenarien beträgt **Bedazzling Night Debut R4 100,0 %**.

| Waffe aus Datafield | Offizielle SKPORT-ID | Rang | Wert in dieser Datafield-Ansicht |
| --- | --- | ---: | ---: |
| Bedazzling Night Debut | `1046` | R9 | 112,1 % |
| Bedazzling Night Debut | `1046` | R4 | 100,0 % |
| Golden Age | `1044` | R9 | 85,0 % |
| JET | `75` | R9 | 84,7 % |
| JET | `75` | R4 | 83,5 % |
| Golden Age | `1044` | R4 | 83,4 % |
| Cohesive Traction | `97` | R9 | 81,3 % |

### Zweite Datafield-Team-Variante (ebenfalls direkt gerenderter DOM, Run #91)

| Waffe / ID | Rang | Arcane TT Xaihi Team |
| --- | ---: | ---: |
| Bedazzling Night Debut (`1046`) | R9 | **110,3 %** |
| Bedazzling Night Debut (`1046`) | R4 | **100,0 %** |
| Golden Age (`1044`) | R9 | **91,6 %** |
| Golden Age (`1044`) | R4 | **89,5 %** |
| JET (`75`) | R9 | **89,0 %** |
| Cohesive Traction (`97`) | R9 | **81,3 %** |

**Direkter Beweis für Szenarioabhängigkeit:** Golden Age R9 liegt in der Zhuang-Variante bei **85,0 %**, in der Arcane-Variante bei **91,6 %**. Beide Werte stammen aus derselben Datafield-Liino-Seite mit unterschiedlichem aktiven Tab und sollen später **nicht** zu einer einzigen generischen Waffen-Prozentliste vermischt werden.

Wichtig: Diese Datafield-Waffenliste und die experimentellen **Waffenränge** sind nicht eins zu eins identisch mit dem früheren Prydwen-Vorschlag. Datafield gibt konkrete Modellwerte, keine universellen „jede Rotation“-Garantien. Die einzelne 100-%-Referenz (BND R4) ist direkt aus der Rangliste ersichtlich; **genaue Team-/Ausrüstungs-/Potential-/Rotationsannahmen sind anhand der aktiven Registerkarte und des verlinkten Originalsheets weiter zu belegen**.

**Originalquelle der Berechnung:** Datafield bindet auf Liinos Charakterseite die öffentlich bezeichnete `Calculations`-Tabelle an. Export erfasste die Google-Sheets-Dokument-ID `18cQzmKEwZP8vOFqb1EaXkRx8qSK5Nj18hbfbuw4BPhY` und Tab-ID `1186926692`. Dies ist nur eine **interne Forschungsreferenz**. Laut Creator-Konvention ist die auf unserer Website sichtbare Quellenangabe **`Quelle: Datafield` ohne Link**.

## Dauerhafter Importweg für künftige Operatoren

**Reproduzierbarer, optionaler lokaler Lauf mit Windows/Python:**

```powershell
py -m pip install playwright
py -m playwright install chromium
py scripts/endfield/datafield_rendered_export.py liino --output liino-datafield.json
```

Der Exporter:
1. akzeptiert nur sichere lowercase Operator-Slugs und öffnet **eine** öffentliche Charakterseite pro Aufruf (kein Massencrawler);
2. wartet auf tatsächlich geladene DOM-Überschriften statt auf rohe HTML-Antworten;
3. klickt UI-interne `Show N More Weapons`-Buttons über deren eigenes DOM-Ereignis (funktioniert trotz `app-preloader`-Overlay);
4. sammelt nachgeladenen Text sowie `alt`-Beschriftungen, fünf Potenzial-Zeilen, **alle anwählbaren Waffen-Team-Tabs mit jeweils eigener Rangfolge**, relative Prozentwerte, Überschriften, die ausgewählte Default-Registerkarte und Spreadsheet-Links;
5. schreibt eine JSON-Datei **mit Zeitstempel** und roh lesbaren Diagnosedaten für spätere Auditierung;
6. gibt **Exit-Code 2** für nicht ladbare Daten und **3** für unvollständige Extraktion aus; bei solchen Ergebnissen niemals Prozentwerte veröffentlichen;
7. hält die **Waffen-/Potenzial-Baselines standardmäßig ausdrücklich auf `UNVERIFIED`**, bis sie mit der jeweiligen Datafield-Erklärung und dem Originalsheet abgeglichen sind.

**GitHub Actions:** Die separate, manuell startbare Workflow-Datei `.github/workflows/datafield-probe.yml` ist für denselben Browser-Export vorgesehen. Ein Aufruf verarbeitet nur einen Operator-Slug und lädt die Ausgabe als Workflow-Artefakt hoch. Sie ist **nicht** Teil des GitHub-Pages- oder Astro-Builds, damit die Veröffentlichung unabhängig von Datafields momentaner Erreichbarkeit bleibt.

**Framework- und Quellenregel:** Offizielle Item-/Skill-/Gearwerte bleiben SKPORT-Rohdaten; Datafield wird für rotierende numerische **Waffen-/Potenzialvergleiche** genutzt; finale redaktionelle Gear-/Meta-Auswahl bleibt beim Creator. Datafield-Prozentwerte bei Waffen benötigen `sourceNote: "Datafield"` plus `comparisonConditions`, einschließlich Team, Rang, P-Stand, Rotation, Bezugsreferenz. Datafield-Potenzialwerte nur als `increaseOverPreviousPercent`, wenn dies das tatsächliche Datafield-Label aussagt.

## Nächste Qualitätschecks

- [x] JavaScript-gerenderte Liino-Daten per Chromium direkt abgerufen.
- [x] 5 Potenzial-Werte samt *„relative to previous potential“*-Definition überprüft.
- [x] 7 Waffen-Rangvarianten samt BND R4 100,0 % überprüft.
- [x] Datafield-`Calculations`-Link im gerenderten DOM nachgewiesen.
- [x] **Beide Team-Tabs** samt aktiver `char-tab.active`-Kennzeichnung und Waffenwerten maschinell getrennt erfasst (Run #91: 7 Zhuang-Varianten und 6 Arcane-Varianten).
- [ ] Exaktes Team, Potential, Gear, Rotation und Waffenrang-Baseline aus Datafields Spreadsheet dokumentieren, insbesondere Unterschied zwischen Liino als Support und Team-DPS.
- [x] Unterschiedliche Liino-Waffenprozente für zwei Datafield-Teams **belegt** (z. B. Golden Age R9 85,0 % vs. 91,6 %). Website-Datenmodell für ggf. getrennte Szenarien bei künftiger redaktioneller Umsetzung prüfen.
- [ ] Erst danach die erlaubten Zahlen unter `weapons.recommendations[]`/`potentials.entries[]` in `liino.md` mit Klartextquelle und Vergleichsbedingungen integrieren. Getestete vierteilige Gear-Builds des Creators dabei **nicht überschreiben**.

Dieser Stand ist die erste **erfolgreiche direkte Datafield-Liino-Extraktion** des Projekts und ersetzt ausdrücklich die ältere Notiz „Liino-Werte wären nicht auslesbar“. Ein Browser-Test und ein offizieller Quellen-Snapshot sind zwei verschiedene Abnahme-Ebenen.
