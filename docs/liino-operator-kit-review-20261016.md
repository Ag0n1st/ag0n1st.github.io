# Liino – Operator-Kit: redaktioneller Freigabeentwurf

**Stand:** 16.10.2026
**Status:** ZUR REDAKTIONELLEN FREIGABE – **nicht im öffentlich sichtbaren Liino-Guide veröffentlicht**
**Ausgangspunkt:** main `eeb7915cf4f8e2b3d6108d692b7ef22487c521a5`; das bereits eingeführte Operator-Guide-Framework und die bestätigten Liino-Builds bleiben unangetastet.
**Ziel:** Die noch leeren Felder `operatorKit.playstyle`, `operatorKit.progressionNotes` und `operatorKit.resourceNotes` für eine spätere, ausdrücklich bestätigte Übernahme vorbereiten. Vor Zustimmung **keine** Änderungen an `src/content/operator-guides/liino.md`.

## A. Einsetzbarer YAML-Entwurf (noch nicht freigegeben)

Die Form entspricht exakt dem vorhandenen Guide-Schema. Die drei Texte sind bewusst **in direkter Guide-Eigenstimme** geschrieben – nicht als Bericht eines Dritten über den Autor.

~~~yaml
operatorKit:
  playstyle: >-
    Liino unterstützt ihr Team über zwei aufeinander aufbauende Haltungen.
    Mit ihrer Kampffertigkeit Dazzling Focus (25 FP) aktiviert sie für bis
    zu 60 Sekunden die Vocalist Stance. Währenddessen erhält das gesamte
    Team einen ANG-Bonus (auf M3 10 %); Operatoren in Reichweite werden
    im Kampf regelmäßig geheilt. Befinden sich Gegner in der Nähe,
    verursacht Liino außerdem in festen Abständen zusätzlichen
    Elektroschaden. Wird während dieser Haltung eine Arts-Reaktion auf
    einen Gegner aufgetragen oder verbraucht, kann Liino mit Delightful
    Harmonics ihre Kombofertigkeit einsetzen: Sie heilt den aktuell
    gesteuerten Operator, gewinnt 20 Ultimate-Energie und behält ihre
    Vocalist Stance bei. Nach der Kombo kann über das Kampftalent
    Starry Boost of 1st Magnitude die nächste Elektro- oder
    Natur-Kampffertigkeit innerhalb von 30 Sekunden auf höchster
    Talentstufe bis zu 10 FP zurückerhalten. Für 160 Ultimate-Energie
    aktiviert Dawnstar Concerto für 15 Sekunden die stärkere Cosmovoice
    Stance: Das Team erhält einen ANG-Bonus sowie Elektro- und
    Naturverstärkung, die zusätzlich mit Liinos Willenskraft skaliert.
    Gleichzeitig heilt Liino Verbündete im Wirkungsbereich und greift
    Gegner mit Elektroschaden an. Das Ultimate erzwingt zudem
    Elektrifizierung in einem großen Bereich. Setze dieses Zeitfenster
    möglichst dann ein, wenn dein Team seinen entscheidenden Schaden
    verursacht. Wichtig: Eine erneute Kampffertigkeit beendet die
    aktive Haltung vorzeitig. Bei der Cosmovoice Stance entfällt
    dadurch auch der reguläre Abschluss mit dreifachem Beat-Schaden
    und dreifacher Beat-Heilung.

  progressionNotes: >-
    Die Aufstiege I bis IV erhöhen Liinos Levelobergrenze nach
    Operator-Level 20, 40, 60 beziehungsweise 80 auf Level 40, 60,
    80 beziehungsweise 90. Die Freischaltung neuer Ausrüstungsqualitäten
    ist davon getrennt: Nach Aufstieg I kann blaue, nach Aufstieg II
    violette und nach Aufstieg III goldene Ausrüstung gesondert
    freigeschaltet werden. Ihre Kampftalente entwickeln sich ebenfalls
    stufenweise: Idol Zone wird nach Aufstieg I und II ausgebaut,
    Starry Boost of 1st Magnitude nach Aufstieg II und III.
    Die Voraussetzungen und Materialkosten sind in der Tabelle aufgeführt.

  resourceNotes: >-
    Plane die Materialien und T-Creds für Operator-Aufstiege,
    Ausrüstungsfreischaltungen und Talente getrennt ein.
    Die Ausrüstungsfreischaltungen benötigen zusätzliche T-Creds
    und erfolgen nicht allein durch das Erreichen des passenden Levels.
    Liinos Willenskraft-Talent Stalwart hat außerdem eigene
    Voraussetzungen: Neben den jeweiligen Aufstiegen sind dafür
    Vertrauensstufen von 20 %, 50 % und 100 % erforderlich.
    Konkrete Fundorte der Materialien und eine aktuelle
    Rekrutierungsverfügbarkeit sind im verwendeten offiziellen
    Datenstand nicht ausgewiesen; dazu werden hier keine
    unbestätigten Angaben gemacht.
~~~

### Redaktioneller Zuschnitt

- Das sichtbare **Operator-Profil & Spielweise** enthält die zusammenhängende Erklärung statt einer bloßen Wiederholung aller vier Skills.
- **Attributentwicklung** und **Operator-Aufstieg & Freischaltungen** bleiben wie beschlossen als zwei unabhängig geschlossene Bereiche im gemeinsamen Framework. Die bestehenden offiziellen Tabellen bleiben Datenquelle; keine manuell kopierten Materiallisten in YAML.
- **Ressourcen & Verfügbarkeit** benennt die nötigen Freischaltungen und die Grenzen der bekannten Daten, ohne nicht belegte Bannertermine oder Farmrouten zu erfinden.
- Die definitive Skill-Priorität **ULT M3 > BS M3 ≥ CS M3 > BATK 1** bleibt im separaten Fertigkeitenabschnitt, die sechs A–F-Gear-Builds bleiben in Ausrüstung. Das Operator-Kit bewertet diese nicht erneut.
- „FP“ entspricht hier den in den bestehenden deutschen Guide-Texten bereits verwendeten Fertigkeitspunkten; im englischen SKPORT-Snapshot lautet die Metrik „SP“. Falls die UI genau eine Schreibweise verlangt, diese mit dem Nutzer abstimmen, statt die Daten unbemerkt umzuetikettieren.

## B. Prüfung jeder numerischen und mechanischen Aussage

Primärquelle für sämtliche konkreten Werte: lokaler offizieller **SKPORT-Wiki-Snapshot 15.10.2026**, Operator-ID 1041, gespeichert in `src/data/endfield/operators/liino.json` und `src/data/endfield/operators/liino.extra.json`; deutsche Begriffebene in `src/data/endfield/locales/de/liino.json`.

| Aussage im Entwurf | Quellstelle / verifizierter Wert | Einordnung |
| --- | --- | --- |
| Battle Skill 25 FP, Vocalist bis 60 s, ANG auf M3 10 %, Zusatzangriffe bei Gegnernähe | `liino.json` → `skills[slot=battle].description/metrics` (25 SP; 60 s; 10 %; Additional ATK Interval 10 s) | Offiziell, Werte/Trigger im Snapshot |
| Vocalist: Team-ANG und Heilung in Reichweite | `liino.json` → `skills[slot=battle].description` | Offiziell; Heilung nicht pauschal weltweit |
| Combo bei Auftragen/Verbrauchen einer Arts-Reaktion während Vocalist; 20 Ultimate-Energie; Haltung bleibt | `liino.json` → `skills[slot=combo].description/metrics` | Offiziell; 20 Energie je erfolgreichem Einsatz, kein garantierter Trigger |
| Talent 30 s, nächste Elektro-/Natur-Kampffertigkeit 5/10 FP, nicht stapelbar | `liino.extra.json` → `talents[id=starry-boost-of-1st-magnitude].levels` | Offiziell; 10 FP setzt zweite Talentstufe nach Aufstieg III voraus |
| Ultimate 160 Energie, 15 s Cosmovoice, Elektro-/Natur-Amp + Team-ANG | `liino.json` → `skills[slot=ultimate].description/metrics` | Offiziell; Amp skaliert mit Will; Maximalbeitrag auf M3 60 % aus Will **nicht automatisch erreicht** |
| Elektrifizierung in großer AoE; Beat-Schaden/Heilung, regulärer Schlusspuls x3; entfällt bei vorzeitigem Ende | `liino.json` → `skills[slot=ultimate].description` | Offiziell; nicht als garantiertes Timing für einen zweiten Ultimate auslegen |
| Levelobergrenzen 40/60/80/90 bei Aufstiegen I–IV | `liino.extra.json` → `promotions[Promotion I–IV]` (Operator Lv.20/40/60/80) | Offiziell |
| Blau/violett/gold getrennt nach E1/E2/E3 freischalten | `liino.extra.json` → `promotions[Outfitting I–III]` | Offiziell; benötigt jeweils eigenen Eintrag/Kosten |
| Idol Zone erste/zweite Talentstufe E1/E2 | `liino.extra.json` → `talents[id=idol-zone].levels[].requirements` | Offiziell |
| Starry Boost erste/zweite Talentstufe E2/E3 | `liino.extra.json` → `talents[id=starry-boost-of-1st-magnitude].levels[].requirements` | Offiziell |
| Stalwart: Vertrauen 20 %, 50 %, 100 %; Aufstieg E1–E4 | `liino.extra.json` → `talents[id=stalwart].levels[].requirements` | Offiziell; 100 % gilt für Stufen 3 **und** 4 |
| Ressourcen-Kosten je Freischaltung | `liino.extra.json` → `promotions[].cost` und `talents[].levels[].cost` | Offiziell; automatische Website-Tabelle statt händischer Zahlenkopie |

## C. Getrennte redaktionelle Ableitungen und Grenzen

1. **Zeitpunkt des Ultimate-Bufffensters:** „Setze dieses Zeitfenster möglichst dann ein, wenn dein Team seinen entscheidenden Schaden verursacht“ ist eine naheliegende **Spielweise-Empfehlung**, kein wörtlicher SKPORT-Wert. Zur Freigabe vorlegen.
2. **Verschiedene Builds / Anzahl Ultimates:** Die offiziellen 20 Energie je Kombo erlauben keine pauschale Behauptung, dass in jeder Rotation eine zweite Ultimate möglich ist. Daher dazu kein pauschaler Satz im öffentlichen Entwurf.
3. **Talent-FP:** Die Kombofertigkeit gewährt laut SKPORT selbst 20 **Ultimate-Energie**; bis zu 10 **FP/SP** stammen *ausschließlich* aus Starry Boost nach Auslösung der nächsten passenden Kampffertigkeit, nicht direkt aus der Combo.
4. **Verfügbarkeit:** Der Snapshot liefert keine belastbare aktuelle Liino-Rekrutierungs-/Bannerverfügbarkeit. Auch keine konkreten Fundorte sämtlicher benötigter Aufstiegsmaterialien. Diese Informationen nicht ersetzen oder aus zufälligen Drittlisten übernehmen.
5. **Maße der Effekte:** Ultimate-Amp nicht aus 0,04 % pro Willenskraft und maximalem 60-%-Will-Beitrag zu einem pauschalen Team-DPS-Wert umrechnen. Datafield-Prozenttabellen und sechs Gear-Builds bleiben unverändert.
6. **Doppelte Ressourceninformationen vermeiden:** Der Detailabschnitt nutzt bereits MaterialCosts-Tabellen und lokalisierte Textdaten; nur Hinweise zur Einordnung ergänzen.

## D. Zur Freigabe

- **F1 – Spielweise:** Ton, Ausführlichkeit und der Rat, das Ultimate gezielt mit dem Hauptschaden abzustimmen: so übernehmen oder ändern?
- **F2 – Progression:** Level-/Qualitätsmeilensteine und Talentschaltung sinnvoll oder kürzer?
- **F3 – Ressourcen:** Soll der Hinweis zu bisher ungeklärten Beschaffungsorten/Rekrutierungszeiten öffentlich stehen, oder soll dies zunächst nur eine interne Freigabe-Notiz bleiben?

**Wichtig:** Erst nach expliziter Bestätigung freigegebene Formulierungen nach `src/content/operator-guides/liino.md` übernehmen, CI-Checks (`npm run test:endfield`, 100-MB-Endfield-Budget, Astro-Build, 1-GB-Pages-Budget, Chromium-Guide-Smoketest) und Pull Request durchführen. Guide weiter `status: preview`; Gameplay-Einzelclips bleiben `pending: true`, solange keine echten URLs vorliegen.
