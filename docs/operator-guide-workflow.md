# Operator-Guides selbst bearbeiten

**Namenskonvention:** Im gesamten Endfield-Bereich heißen die Spielfiguren **Operatoren**. Die kanonischen URLs sind `/endfield/operatoren/` und `/endfield/operatoren/<slug>/`. Alte `/endfield/charaktere/`-Links bleiben nur als Weiterleitungen erhalten.

**Komponentenstruktur:** Die zentrale `OperatorGuide.astro` setzt neun eigenständige Abschnittskomponenten aus `src/components/operator/sections/` zusammen. Der gemeinsame Aufbereitungs-Code befindet sich in `src/lib/endfield/operatorGuideModel.ts`. Änderungen an einzelnen Abschnitten benötigen daher keine Kopie der übrigen Guide-Vorlage.

**Datenstand (15.10.2026):** Die offiziellen Traits sind im aktuellen SKPORT-Snapshot nicht vollständig strukturiert und dürfen nicht erfunden werden. Der Waffen- und Ausrüstungskatalog ist inzwischen importiert (84 Waffen, 258 Gear-Teile), einschließlich offizieller Standardrezepte. Liino enthält bereits sechs redaktionell bestätigte Ausrüstungs-Builds (A–F), während andere Guide-Bereiche noch `preview` sind; Typhoeus und weitere Operatoren erhalten Meta-Einstufungen ausschließlich durch redaktionelle Freigabe.


Dieses Verzeichnis gehört zur redaktionellen Ebene der **Arknights: Endfield**-Guides.

## Status der Implementierung

- Das Schema (`src/content/operatorGuideSchema.ts`) und die Astro Content Collection sind eingerichtet.
- `src/content/operator-guides/_template.md` ist deine **kopierbare Vorlage**. Durch den führenden Unterstrich wird sie von der Collection ignoriert.
- `src/content/operator-guides/typhoeus.md` und `liino.md` sind derzeit **sichtbare Layout-Vorschauen** mit dem Status `preview`. Die persönlichen Guide-Bewertungen sind noch nicht vollständig eingetragen.
- Die Webseite verwendet jetzt `src/pages/endfield/operatoren/[slug].astro` und die gemeinsame Komponente `src/components/operator/OperatorGuide.astro`. **Alle veröffentlichten Guides** werden anhand der Markdown-Dateien automatisch erzeugt. Noch nicht importierte offizielle Spieldaten sind als Platzhalter gekennzeichnet.

## Neuen Guide vorbereiten

1. `src/content/operator-guides/_template.md` kopieren.
2. Neue Datei nach dem Slug benennen, etwa `si.md` oder `operator-name.md`.
3. Ganz oben `operator: neuer-operator` auf denselben Slug wie den Dateinamen ändern und optional `displayName: Anzeigename` eintragen.
4. Texte und Referenzen eintragen. Anfangs `status: draft` beibehalten.
5. `npm install` (einmalig) und `npm run build` ausführen. Astro prüft das YAML mithilfe unseres Schemas und zeigt ungültige Felder oder fehlende Pflichtfelder an.
6. Datei über GitHub Desktop oder per Commit ins Repository übernehmen.
7. Zur Veröffentlichung `status: published` setzen und nach `main` pushen. Der nächste Build erstellt die Guide-Seite unter `/endfield/operatoren/<operator>/` und fügt sie automatisch ins Operatoren-Grid ein. Die drei Statuswerte: **`draft`** (nicht sichtbar), **`preview`** (öffentlich sichtbare, deutlich gekennzeichnete Vorschau) und **`published`** (fertiger Guide). Für `published` verlangt das Schema eine Kurzbeschreibung und ein Fazit.

## Was muss ich selbst eingeben?

Die eigenen Bewertungen und Kommentare gehören in die Markdown-Datei:

- **1. Übersicht:** Kurzfazit, Stärken, Schwächen, Ratings (1–5), Partners und bevorzugter Build.
- **2. Operator Kit:** Verständliche Spielweise sowie Hinweise zu Ressourcen und Fortschritt.
- **3. Fertigkeiten:** Vier Slots in Prioritätsreihenfolge, drei Zeichen `>` oder `>=`, gewünschte Ziellevel sowie eigene Bewertungen.
- **4. Waffen:** Empfohlene Waffen via `weaponId`, Kategorie (`bis`, `bp`, `f2p`, `alternative`) und Bewertung. Prozentwerte nur mit Vergleichsbedingungen.
- **5. Ausrüstung:** Beliebig viele Builds, pro Build **genau vier** Items (1× Rüstung, 1× Handschuhe, 2× Kits). `meta: true` markiert einzelne Builds für die **Meta Builds**-Übersicht vor dem Finder; `metaSummary` ist dann als kurze Card-Beschreibung **erforderlich** (maximal 280 Zeichen). Andere Builds bleiben im Finder. Level-/Fabrik-/Gebiets-/Besitzprüfung und Detailbewertungen erfolgen ausschließlich dort.
- **6. Potenziale:** P1 bis P5, Einschätzungen und optional belegbare Prozentvergleiche.
- **7. Teams:** Einige ausführlichere Meta-Teams plus beliebig viele Inspirationen. Je Team **exakt vier unterschiedliche Operatoren, einschließlich des Guide-Operators**. `buildId` verweist auf `equipment.builds[].id`.
- **8. Gameplay:** Beliebig viele Showcases, optional Video-Link, Kurztext sowie Rotation/Tipps.
- **9. Fazit:** Gesamtbewertung, Pull-Empfehlung und Entscheidungshilfen.

Offizielle Operatorwerte, Skillbeschreibungen, Levelwerte, Materialien und Icons werden bereits für Typhoeus und Liino aus den importierten Spieldaten geladen. Die offiziellen Ausrüstungs- und Waffendetails liegen separat im Katalog; eigene Bewertungen gehören ausschliesslich in die Guide-Dateien. Sie werden nicht in den Guide-Textdateien dupliziert.

## IDs und Verknüpfungen

IDs verwenden nur Kleinbuchstaben, Ziffern und Bindestriche, z.B. `typhoeus`, `build-main-dps` oder `waffe-123`.

Beispiel für die Verknüpfung eines Teams mit seinem Ausrüstungsset:

```yaml
equipment:
  builds:
    - id: build-main-dps
      title: "Main DPS"
      role: main-dps
      items: [ausruestung-1, ausruestung-2, ausruestung-3, ausruestung-4]
      availableFromLevel: 70
      evaluation: |
        Dieses Set erhöht den eigenen Schaden.

teams:
  meta:
    - id: team-1
      title: "Beispiel-Team"
      role: main-dps
      members: [typhoeus, operator-b, operator-c, operator-d]
      buildId: build-main-dps
      evaluation: |
        Dieses Team unterstützt den Hauptschadensausteiler.
```

**Hinweis:** Die Werte in diesem Beispiel sind Platzhalter und keine korrekten Endfield-Gamedaten. Die referenzierten Ausrüstungs- und Operator-IDs müssen später im automatisch importierten Datensatz existieren. Das jetzt eingerichtete Schema prüft interne Guide-Verknüpfungen, noch nicht die Existenz in der künftigen Spieldatenbank.

## Meta Builds im gemeinsamen Operator-Guide-Framework

**Anordnung im Abschnitt Ausrüstung:** Bei mindestens einem `meta: true` erscheinen zuerst die **Meta Builds** als kompakte, auf Desktop mehrspaltige und auf Mobilgeräten einspaltige Cards. Jede Card enthält Titel, Level, vier Ausrüstungssymbole samt offiziellen Namen und eine kurze redaktionelle Beschreibung. Der Verweis **„Details im Build-Finder ansehen“** führt zum bereits vorhandenen Build-Finder und aktiviert genau den betreffenden Build. Unter den Cards steht ein Hinweis auf alle Details und weitere Progressionsvarianten.

Die Cards werden **aus denselben `equipment.builds[]`-Datensätzen** wie der Finder erzeugt; kein zweiter Eintragsordner, keine separaten Gear-IDs, keine kopierte externe Item-Tabelle. Die bereits bestehenden `.op-divided`-Trennlinien teilen Meta Builds und Finder visuell. Wenn `meta: true` fehlt, ist der Meta-Bereich **vollständig verborgen** (keine Platzhalter für Operatoren ohne freigegebene Meta-Setups). `meta: false` ist der Standard.

```yaml
equipment:
  builds:
    - id: ultimate-fokus
      title: "Build A – Ultimate-Fokus"
      role: support
      meta: true
      metaSummary: "Viel Ultimate-Energiegewinn mit Eternal-Xiranite-Teamverstärkung."
      items: ["1134", "1138", "1236", "365"]
      availableFromLevel: 70
      evaluation: >-
        Detailbewertung erscheint im Build-Finder, nicht in der Meta-Card.
```

Dieser Auszug ist ein **strukturelles Beispiel** aus dem redaktionell bestätigten Liino-Build; bei anderen Operatoren müssen echte Ausrüstung und Meta-Status neu geprüft werden. Der `metaSummary`-Text bleibt kurz und kann unabhängig von der ausführlichen `evaluation` gepflegt werden. Meta-Markierung ist keine automatische Aussage, dass ein ungeprüfter Charakter-Build empfohlen wird.

**Liino, Stand 16.10.2026:** A (**Ultimate-Fokus**), B (**Balanced**), C (**Will-Fokus**) sind Meta-Builds; D (60), E (50), F (36) sind Progressionsvarianten im Finder. Details: [`liino-approved-builds-20261016.md`](liino-approved-builds-20261016.md).

## Build-Finder: eingeklappt und standardmäßig maximal freigeschaltet (16.10.2026)

**Aktuelles verbindliches Layout für alle Operator-Guides:** Die kompakten **Meta Builds** stehen unmittelbar sichtbar oben. Der große Bereich **Build-Finder** einschließlich Filter, detaillierter Ausrüstung und Ausrüstungsprogression ist ein `<details>`-Bereich, der **bei jedem Seitenaufruf geschlossen** startet. Nutzer öffnen ihn über die native Schaltfläche **„Build-Finder – Ausführliche Builds, Filter und Herstellung anzeigen“**. Klicks auf **„Details im Build-Finder ansehen“** in einer Meta-Card sowie auf bestehende Team-Build-Links öffnen den Bereich automatisch und wählen die richtige Build-ID; sie müssen nicht erst von Hand aufklappen.

**Optionaler Minimal-Start (Creator-Entscheidung 16.10.2026):** Direkt neben dem bisherigen Button **„Maximal-Vorauswahl wiederherstellen (Anpassungen löschen)“** befindet sich jetzt **„Minimal-Vorauswahl einstellen (für neue Spieler)“**. Die **Standardauswahl beim ersten Besuch bleibt unverändert maximal**; der Minimal-Button ist eine freiwillige Abkürzung für Einsteiger.

Die Minimal-Vorauswahl setzt **Level 10** (niedrigste Leveloption), **Amethyst** als niedrigste *angebotene* Fabrikkomponente, **keine ausgewählte Storyregion**, **alle Gebiets- und Blaupausen-Checkboxen aus**, **keinen Autoritätslevel** und **keine Warenumverteilungsstufe**. Die niedrigste Fabrikkomponente ist im UI Amethyst, weil die Fabrik-Auswahl derzeit keine separate Stufe „vor Amethyst“ anbietet; Level 10 bleibt trotzdem auswählbar. Der Spieler kann nun genau die eigenen Freischaltungen anklicken.

**Speicherung beider Varianten über alle Operator-Guides:** `localStorage v2` bleibt erhalten und bekommt zusätzlich `selectionMode: "max" | "min"`. Bereits gespeicherte v1/v2-Einträge **ohne** `selectionMode` werden **wie bisher** interpretiert (Maximalprofil beziehungsweise früher gespeicherte Abwahlen). Im Minimal-Modus speichern `selectedAreaIds` und `selectedGearBlueprintIds` **ausdrücklich angekreuzte** Auswahl-IDs, auch solche aus anderen Operator-Guides. Dadurch bleiben **neue, bisher unbekannte Blaupausen in anderen Guides zunächst aus**, und man verliert bei einem Guide-Wechsel nicht die ausdrücklich aktivierten Blaupausen. Im Maximal-Modus speichern `lockedAreaIds` und `unselectedGearBlueprintIds` weiterhin die **abgewählten** IDs; neue IDs bleiben standardmäßig an. Der existierende Max-Button löscht beide Browser-Speicherstände und stellt die übliche Maximal-Voreinstellung wieder her, der Minimal-Button speichert den leeren Starterzustand. Das ist **ausschließlich ein lokaler Vergleichszustand, kein tatsächlicher Ingame-Besitznachweis**.

**Neue Startauswahl für neue Besucher (Maximal-Voreinstellung):**
- Spieler-/Gear-Level **70**, höchste Fabrikkomponente **Pyrrolit**, Region **Wuling**.
- **Alle** momentan im Guide-Register verfügbaren Tal4-/Wuling-Gebiete standardmäßig ausgewählt (nicht nur Gebiete des gewählten Region-Tabs).
- **Autoritätslevel 60** (geltendes Maximum) und **Wuling-Warenumverteilung Stufe 3**.
- **Alle** im gerade geöffneten Guide tatsächlich angebotenen **und offiziellen** Gear-Blaupausen sind aktiviert; doppelte Item-IDs werden wie bisher gemeinsam geschaltet.
- Die Voreinstellung ist **eine Annahme für die schnelle Build-Evaluation**, kein tatsächlicher Besitz-/Quest-/SKPORT-Kontozugriff. **Eine voreingestellte Blaupause ist kein verifiziertes Ingame-Inventar**; das muss in der UI ausdrücklich so erklärt werden.
- Spieler mit weniger Fortschritt schränken Region, Einzelgebiete, Autorität, Redistribution, Gear-Level, höchste Fabrikkomponente und fehlende Blueprint-IDs selbst ein. Eine manuell angewählte Blaupause bleibt unabhängig von Region/Authority ein „als vorhanden markiertes“ Teil – wer auf einem neuen Account spielt, sollte auch die nicht besessenen Blueprints deaktivieren. Die alte Engine-Entscheidung „Gebiet ≠ Bauplanbesitz“ bleibt erhalten.

**Persistenz (Maximalprofil und ältere v2-Einstellungen):** Browser `localStorage`, **ohne Login und ohne serverseitige Speicherung**. Der aktuelle Datensatz `ag0n1st:endfield:build-story-progress:v2` speichert absichtlich die **abgewählten** Gebiet- und Gear-IDs (`lockedAreaIds`, `unselectedGearBlueprintIds`), außerdem explizite Region, Autorität, Warenumverteilung, Level und Fabrikkomponente. Dadurch sind neue IDs auf anderen Operatoren oder aus neuen Versionen zunächst **eingeschaltet**, explizite Abwahlen bleiben aber über alle Guides und Reloads erhalten. Frühere gültige `v1`-Browserauswahlen werden beim Öffnen gelesen und bei einer Änderung nach `v2` übertragen. Eine bereits individuell gespeicherte Auswahl hat Vorrang vor der neuen Maximal-Voreinstellung, auch wenn sie niedriger ist.

Der Button **„Maximal-Vorauswahl wiederherstellen (Anpassungen löschen)“** löscht beide Speicherstände `v1/v2`, wählt maximale Einstellungen erneut und aktualisiert direkt das Ergebnis. Er löscht **keine** echten Spielkontodaten – solche Daten werden nie ausgelesen.

**Fachlicher Unterschied zum früheren Verhalten:** Früher war beim ersten Besuch der Großteil der Story- und Blaupausenfelder **leer** und der Finder komplett **ausgeklappt**. Der Wechsel zur Maximal-Voreinstellung und dem geschlossenen Finder wurde nach tatsächlicher Designprüfung des Creators ausdrücklich entschieden. Die eigentliche unabhängige Story-/Blueprint-Prüflogik und alle sechs freigegebenen Liino-Builds bleiben technisch unverändert.

**Qualitätssicherung:** `scripts/endfield/build-finder-defaults.test.mjs` prüft Maximallevel/-Komponente/-Area/-Authority/-Redistribution, alle sechs Liino-Builds ohne Klicks sofort als passend, Einschränkungen durch Level/Fabrik/abgewählte Blaupause, das geschlossene HTML-`details`, Meta→Finder-Link, v2-Opt-out-Speicherung, Migration und Reset. Ergänzend sind **echte Browser-/Mobile-Tests** weiter nötig.

## Übersicht: automatische Meta-Zugänglichkeit und echte Item-Icons (Creator-Designbeschluss 16.10.2026)

- **„Build auf einen Blick“** zieht Waffen- und Gear-Icons und **echte offizielle Namen** aus dem importierten SKPORT-Item-Katalog; keine rohe Gear-ID oder `[Icon]`-Platzhalter, wenn der Eintrag bekannt ist. Die Ausrüstung stammt aus `overview.featuredBuildId`, Waffen aus den vom Creator festgelegten Empfehlungen; kein zweiter Datenpflegeort.
- **Spielschwierigkeit** und **Flexibilität** sind weiterhin redaktionelle 1–5-Werte (Liino: **1/5** und **4/5**). **Zugänglichkeit** wird dagegen **automatisch ausschließlich aus als `meta: true` gekennzeichneten Ausrüstungs-Builds** abgeleitet; **D–F-Progressions-Builds zählen NICHT**, ebenso wenig erfundene Demo-Builds. Das Ergebnis ist bei Liino **1/5**, weil selbst der früheste voll validierte Meta-Build die Endgame-Komponente **Pyrrolit** benötigt.
- **Standardisierte 1–5-Skala (5 = einfacher zugänglich):** 5: bis Lv36/Amethyst/Ferrium (Early); 4: Lv50/Cryston; 3: Lv60/Xiranit (Mid); 2: Lv70, aber noch Mid-Komponente (Xiranit/Cuprium); 1: Endgame-Komponenten **Hetonit/Pyrrolit**. Pro Meta-Build zählt die **strengere Anforderung** aus offizieller Gear-Mindeststufe und höchster SKPORT-Standardrezept-Komponente; keine geschätzten Quest-Bedingungen.
- **Aggregation:** Als Zugänglichkeit des Operators gilt die **beste (früheste) vollständig verifizierte Meta-Option**, weil damit bereits ein realer Meta-Build spielbar/herstellbar wird. Andere Meta-Builds können anspruchsvoller sein. Hat ein Guide **keine** Metabuilds, bleibt die automatisierte Einordnung **offen** (kein pauschaler Score). Sobald auch nur ein Meta-Build **unklare Rezepte/Gear-Slots** aufweist, wird kein automatisch berechneter Ratingwert behauptet. Tatsächlicher **Story-/Gebietszugang und Blaupausenbesitz bleiben davon unabhängig** und werden weiterhin nur im Build-Finder geprüft.
- Implementierung: `src/lib/endfield/metaAccessibility.mjs`, `operatorGuideModel.ts` und `OperatorOverview.astro`. Ein Wert `overview.ratings.accessibility` wird für Meta-Guides **nicht manuell gepflegt oder überschrieben**. Neue frühere Metabuilds können automatisch die Einordnung verbessern, verifizierte Endgame-Meta-Setups senken den Score.

## Datafield-Charakterprofil: kompakte Vergleiche und dezente Quellenangaben

**Verbindlich für Liino und alle folgenden Operatoren:** Quantitative Waffen- und Potenzialvergleiche werden von der **Datafield-Charakterseite** des jeweiligen Operators übernommen (**`datafield.cc/characters/<slug>`**, **NICHT** der separate Datafield-Team-Hub). Der Playwright-Exporter `scripts/endfield/datafield_rendered_export.py` kann das nach JavaScript-Rendering geladene HTML lesen, alle `Show More Weapons` ausklappen und **jedes dort vorhandene Team-Szenario separat** auswerten. Jeder Vergleich wird auf der Website mit „**Quelle: Datafield**“ **als Klartext ohne anklickbaren Link** gekennzeichnet.

**Für Waffen zwei unabhängige Inhaltsebenen pflegen:**
1. `weapons.recommendations[]`: die vom Creator ausgewählten **Waffen und Kategorien** (`bis`, `bp`, `alternative`, `f2p`). **Jede Waffe steht genau einmal; keine Waffenränge hier anzeigen.** Die Einordnung ist redaktionell und darf von der Datafield-Waffenrangliste abweichen.
2. `weapons.comparisons[]`: ein eigener Block **pro Team-Tab des Datafield-Charakterprofils** mit `id`, `title`, `sourcePageType: character-profile`, `sourceNote: "Datafield"`, `snapshotDate` (als **YAML-String**), `referenceWeaponId`, `referenceRank`, `comparisonConditions` und `entries`. Jedes Element in `entries` enthält die **offizielle SKPORT-Waffen-ID**, den getesteten Waffenrang `rank` und den Datafield-Wert `performancePercent`. **Mindestens eine Tabellenzeile muss genau den markierten 100-%-Referenzwaffenrang enthalten**; das Schema überprüft dies und verhindert doppelte Waffen/Ränge innerhalb eines Szenarios.
3. **Vollständige Werte pro Team unabhängig rendern** (kein Vermischen; ein Team kann mehr Waffenränge als das andere besitzen). Übersichtscards bleiben kompakt; Prozentwerte ausschließlich unter „Waffenvergleich“, in einzelnen Tabellen mit Teamtitel, Rang, Prozentwert und Quellenvermerk. Detaillierte Annahmen können in einer aufklappbaren „Vergleichsbedingungen“-Zeile stehen. Bei ungeprüften Modellparametern dies ehrlich als Unsicherheit dokumentieren.

**Für Potenziale:** Die Datafield-Charakterseite schreibt bei Liino `Each % increase is relative to the previous potential.`. Deshalb ausschließlich `potentials.entries[].increaseOverPreviousPercent` für die fünf Werte verwenden. **Das Feld `increaseOverP0Percent` wurde aus dem Framework entfernt**; keine kumulative P0-Spalte, keine Addition. In der Potenzialübersicht steht nur der Zusatzgewinn zur unmittelbar vorherigen Stufe. `comparisonConditions` und `sourceNote: "Datafield"` bleiben im YAML für interne Nachvollziehbarkeit; nur **eine kleine Quellenfußnote** folgt unter der gesamten Tabelle. Der eigene Unterabschnitt `Pull-Empfehlung` bei Potenzialen ist **entfallen**. Die persönliche Pull-Empfehlung gehört ausschließlich ins abschließende `conclusion.pullAdvice`.

**Kompakte Quellenpräsentation (Creator-Designbeschluss 16.10.2026):** Die bisherigen großen Disclaimer, einleitenden Wiederholungen, aufklappbaren `Vergleichsbedingungen` und Quellen-Spalten **sind im Frontend entfernt**. Im Waffenvergleich steht der jeweilige **Teamname mit 100-%-Referenz** und darunter die Rang-/Prozenttabelle, anschließend klein `Quelle: Datafield` (ohne Link). Im Potenzialvergleich **eine** kleine Fußnote `Quelle: Datafield` direkt unter der Tabelle. Die genauen `comparisonConditions` und Datenstände bleiben im redaktionellen YAML und in der Projektdokumentation **erhalten**, um keine Belege zu verlieren; sie sind nur nicht mehr als umfangreiche Zusatztexte im UI sichtbar. Waffeneinordnungen in Empfehlungen und Details sind **eigene Aussagen des Creators**, **ohne Datafield-Quellenhinweis**. Der kurze allgemeine Hinweis zur Freiwilligkeit von Potenzialen bleibt, aber ein eigener Pull-Empfehlungs-Unterabschnitt existiert nicht mehr.

**Liino als freigegebenes Beispiel:** Der Creator hat explizit **Bedazzling Night Debut (`1046`) BiS**, **Golden Age (`1044`) BP**, **JET (`75`) Alternative**, **Cohesive Traction (`97`) F2P** bestimmt. Die Waffenübersicht zeigt **keine R4/R9-Kategorisierung**. Die aus der Liino-Charakterseite ausgelesenen zwei Szenarien heißen **Zhuang Perlica Arclight Team** (7 Waffenrangwerte) und **Arcane TT Xaihi Team** (6 Werte); in beiden ist Bedazzling Night Debut **R4 = 100,0 %**. Potenzial-Zusatzgewinne P1–P5 sind **3,2 / 0,7 / 0,8 / 0,0 / 4,7 %**, jeweils gegenüber der vorherigen Stufe. Quelle als **`Datafield`** ohne Link. Baseline/Teamtexte und Unsicherheiten: `src/content/operator-guides/liino.md`, Forschungsnachweis `docs/datafield-rendered-extraction-20261016.md`. **Liinos Gear-Builds A–F und die Skill-Priorität sind unberührt.**

## Verbindliche Quellenkonvention: Datafield (Creator-Beschluss 16.10.2026)

**Regel für alle weiteren Operator-Guides:** Bei der Recherche zu Ausrüstungs-/Waffen-/Potenzial-Meta und insbesondere **berechneten relativen Waffen-Prozenten und Potenzial-DPS-Prozenten** dient **Datafield** als **bevorzugte Quelle**. Der Creator orientiert sich für seine eigenen Aussagen an deren laufend gepflegten Analysen und den zugehörigen Tabellen/Rotationen. Bei anderen redaktionellen Ausrüstungsempfehlungen behält der Creator die letzte Entscheidung; **Datafield-Gear-Setups dürfen niemals automatisch seine Gear-Auswahl ersetzen** (z. B. die bestätigten Liino-Builds A/B/C).

**Quellenhierarchie:**
1. **Offizielle SKPORT-Spieldaten** für tatsächliche Namen, unveränderliche Item-IDs, Skill-Metriken, Potenzialeffekte, standardmäßige Herstellungskosten und Quest-/Item-Daten. Diese Rohdaten werden nicht aus Datafield überschrieben.
2. **Datafield** für die bevorzugten **quantitativen, simulations- bzw. rotationsabhängigen Vergleiche** sowie als wichtiges externes Hilfsmittel für Waffenshortlists und Teams. Daten aus den Original-Excel-Dateien und der konkreten Operatorseite hinsichtlich Rotation, Teamzusammensetzung, Level/Rang/Veredelung/Potenzial und relativer Baseline unterscheiden. Bei sich unterscheidenden Szenarien keine universelle Rangfolge aus nur einem Wert ableiten.
3. **Creator** für Bewertungen, endgültige Reihenfolge, Gameplay, Ressourcenpriorität, situative Gear-Builds und freizugebende Guide-Texte. Andere Guides (Prydwen, Mobalytics usw.) allenfalls ergänzend bei Lücken/Abweichungen, nicht als stiller Ersatz für Datafield.

**Darstellung bei Zahlen:** `sourceNote: "Datafield"` und `comparisonConditions` bleiben bei Waffen-`performancePercent` und Potenzial-`increaseOverPreviousPercent` **Pflicht im redaktionellen Datenmodell**. Auf der Website erscheint **nur eine dezente kleine Fußnote „Quelle: Datafield“** unter jedem Waffen-Szenario bzw. einmal unter der Potenzialvergleichstabelle, ohne anklickbare Links oder Quellen-Spalte. Andere Quellen-/Modellinformationen verbleiben im YAML und in den Forschungsdokumenten.

**Semantik besonders bei Potenzialen:** Das aktuelle Framework verwendet ausschließlich **`increaseOverPreviousPercent`** für den laut Datafield gegenüber der Vorstufe ausgewiesenen Gewinn; **keine kumulativen P0-Felder oder -Anzeige**. Eine mögliche Berechnung eines Gesamteffekts aus anderen Quellen gehört nicht in das redaktionelle Guide-Framework. Bei Waffen bezeichnet 100 % die Referenzwaffe und deren Rang im **konkreten Teammodell**, nicht einen universellen Wert. Team-Szenarien deshalb separat halten.

**Vermeidung falscher Präzision:** Wenn die Webseite nur „Loading data…“ liefert, eine Excel-Basisreferenz/Teamrotation fehlt oder Werte nicht eindeutig extrahierbar sind, Prozentfelder **leer lassen** und Quelle/Zugriffslimit dokumentieren – keinesfalls Werte aus Erinnerungen, Sekundärseiten oder vergangenen Patchdaten als Datafield-Ergebnis ausgeben. Datenfeld-URL für interne künftige Recherche als **nicht verlinkter** technischer Vermerk: `https://datafield.cc/characters/liino`. **Auf der öffentlichen Website keinen Link zur Datenquelle anzeigen**, nur den Namen `Datafield`. Bei Websiteupdates Datenstand/Snapshot des Vergleichs neu prüfen.

**Unabhängige rote Linie:** Eine von Datafield empfohlene Skill-Priorität überschreibt **nie** die bereits vom Creator festgelegten Operator-Skill-Level oder von ihm bestätigten Builds. Beispiele für Liino siehe `src/content/operator-guides/liino.md` und Abschnitt §P2 der `ROADMAP.md`.

## Kompaktregeln für YAML

- Einrückung mit **Leerzeichen**, nicht Tabulatoren.
- Texte mit Doppelpunkt oder Sonderzeichen bei Unsicherheit in Anführungszeichen setzen.
- Längere Beschreibungen mit `|` schreiben und die Folgezeilen einrücken.
- Eine leere Liste ist `[]`.
- URLs als vollständige `https://...`-Links hinterlegen.
- Prozentwerte nur eintragen, wenn sie aus einem validen Test stammen.
- Felder weglassen oder leer lassen, solange ein Guide nur Entwurf ist.
- Fehlermeldungen im Astro-Build beachten und vor dem Commit korrigieren.

## Nächste technische Schritte

1. Die sechs vorhandenen, vom Creator festgelegten Liino-Builds A–F erhalten; A/B/C als Meta darstellen. Noch offene Liino-Texte, Teams und Videoguide später redaktionell ergänzen.
2. Bei künftigen Operatoren jede neue Build-ID, Gear-Slot-Aufteilung und Meta-Einstufung anhand der offiziellen Gear-Details und der Creator-Freigabe prüfen.
3. Mit echten vierteiligen Builds den Browser-Finder (Level, Fabrikkomponente, Region, Gebiet und vier Blaupausen) testen.
4. Den generischen SKPORT-Importer auf weitere Operatoren erweitern. Das Guide-Template ist bereits in neun Abschnittskomponenten aufgeteilt.

So entsteht später der gewünschte Ablauf: Datei kopieren → bearbeiten → GitHub-Push → automatischer Build → neue Guide-Seite.

## Historischer Übergabepunkt für den ersten Liino-Build (15.10.2026) – inzwischen umgesetzt

**Historischer Ausgangsstand am 15.10.2026 (heute überholt):** Damals enthielt `src/content/operator-guides/liino.md` noch `equipment.builds: []`. Seit PR #16 liegen sechs bestätigte Builds vor; die nachstehende Checkliste bleibt als allgemeine technische Abnahmehilfe erhalten. Für den Build-Finder existieren belastbare Tests der technischen Filter, aber noch kein von Ag0n1st bestätigter vierteiliger Liino-Build im öffentlichen Guide. `status: preview` bleibt erhalten, bis der gesamte Guide freigegeben wird.

**Benötigte redaktionelle Angaben je Build:**

1. Eindeutige Build-ID (`id`), öffentlicher Titel (`title`) und Rolle (`role`).
2. Vier **konkrete offizielle Gear-Item-IDs** in `items` (nicht bloss Setnamen oder Kistennamen). Im Katalog `src/data/endfield/catalog/equipment-details.json` gegenprüfen.
3. Optional `availableFromLevel` (10/20/28/36/50/60/70) sowie nachvollziehbare `evaluation`, `teamContext`, `craftingNotes`, `setBonusNotes`.
4. `storyUnlock` ist nur redaktioneller Hinweis. Die tatsächliche Berechtigung ergibt sich aus den separaten Level-, Komponenten-, Gebiets- und Besitzprüfungen; niemals aus diesem Freitext.

**Technische Abnahme nach Einpflege:**

- `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build` ausführen.
- Auf `/endfield/operatoren/liino/` mindestens einen realen vierteiligen Build anzeigen und jeden der vier Gear-IDs, Rezepte und Komponentenstufen kontrollieren.
- Bei zu niedrigem Level `level-locked`; bei unzureichender Fabrikkomponente `component-locked` prüfen.
- Region und einzelne Gebiete getrennt prüfen. Nur wirklich verfügbare Gebiete aktivieren; keine automatische Kapitel- oder Patchfreigabe annehmen.
- Browser-Maximal-Vorauswahl prüfen: Alle relevanten Blaupausen sind zunächst **als Annahme vorausgewählt**, keine tatsächliche Besitzbestätigung. Bei expliziter Abwahl einer benötigten Blueprint-ID darf der Build nicht als `available` erscheinen. Bestätigte/ausgewählte vier IDs, Level und Komponenten führen (bei verifiziertem Build) zu `available`; die UI muss transparent auf die Annahme hinweisen.
- `localStorage`-Persistenz `v2` (Opt-outs + Level/Fabrik), Migration bestehender `v1`-Auswahlen, Browser-Reload und Reset auf **Maximal-Vorauswahl** bei Liino **und** Typhoeus prüfen. Finder muss geschlossen starten und durch Meta-/Teamlinks automatisch öffnen.
- Community-Kistenorte mit unklarer/widersprüchlicher Beleglage als `unverified` beziehungsweise `disputed` belassen. Unbestätigte Vorschläge nicht als offizielle Empfehlungen veröffentlichen.

Für Architektur, genaue Quellenhierarchie und den nächsten Projektstand immer auch die zentrale [`ROADMAP.md`](../ROADMAP.md) lesen.
