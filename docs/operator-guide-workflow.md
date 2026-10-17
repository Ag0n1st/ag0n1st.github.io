## Verbindlich: immer Deutsch UND Englisch

**Keine Website-Änderung ausschließlich in einer Sprache veröffentlichen.** Neue oder angepasste Guides, Cards, Layouts, Datenzeilen, Texte, Placeholder, Navigation und neue URLs müssen in **DE und EN gleichzeitig** erscheinen. Falls nötig, in den gemeinsamen Astro-Komponenten mit `lang` übersetzen. Die neun OperatorGuide-Sektionen behalten in beiden Sprachfassungen identische Layouts und Funktionen. DE in `src/content/operator-guides/{slug}.md`, die zugehörige EN-Redaktion in `src/data/i18n/en-guide-content.json`. `src/lib/i18n/operatorGuide.ts` übernimmt ausschließlich Textfelder; numerische Spielwerte, Item- und Team-IDs werden aus der geprüften deutschen Quelle übernommen. Im Englischen heißt der Rüstungsbereich **Gear**; deutsch weiterhin **Ausrüstung**.

## Neue Guides automatisch in „Letzte Beiträge“ und der Endfield-Übersicht

Die Datenquelle ist `src/lib/content/guideFeed.ts`; die Card `src/components/GuideTeaserCard.astro` wird auf **beiden Homepages und beiden Endfield-Übersichten** wiederverwendet. Die Startseite zeigt die **drei neuesten registrierten Guides aller unterstützten Spiele/Kategorien**, der Endfield-Hub die **drei neuesten Endfield-Einträge**. Kategorie: **Charakter** (DE) / **Character** (EN), später auch `gameplay`, `factory`, `systems`, `news`. Das Kategorie-Label befindet sich in einer quadratischen Card oben rechts. Jede Card führt direkt zum Guide in der aktuell gewählten Sprache; kein Zwischenartikel und keine deutsche Seite unter englischem Pfad.

**Operator-Guide nach Fertigstellung veröffentlichen:**
1. `src/content/operator-guides/{slug}.md` inhaltlich auf DE freigeben (`published`; explizit gewünschte Vorschauen dürfen weiterhin `preview` bleiben), die **vollständige** englische Fassung in `src/data/i18n/en-guide-content.json` auf gleichem Stand halten.
2. Im selben Guide unter `listing`: den tatsächlichen **`releaseDate`** des Charakters (für die Release-Reihenfolge aller Operator-Cards), **`listedAt`** (einmaliges Aufnahmedatum in den Beitrags-Feed, nach späteren Updates **nicht** verändern), `category: character`, `summaryDe`, `summaryEn`, `visible: true` ergänzen. Es werden **keine** neuen Datumsschätzungen erfunden; Release-Quelle recherchieren und intern dokumentieren. Ohne vollständig gepflegte `listing`-Metadaten erscheint ein Guide weiter auf seiner Detailseite und in der Operatorenübersicht, nicht aber in den automatischen Teasern.
3. Beide Slug-URLs tatsächlich erzeugen und in `src/lib/i18n/site.mjs` paaren, falls der neue Operator-Slug dort noch fehlt. Um keine nicht existierenden hreflang-Sprachalternativen zu erzeugen, beide Pfade und die gemeinsame Guide-Komponente im Build prüfen.
4. Kein zusätzlicher redaktioneller `posts/*.md`-Duplikatartikel erforderlich. Das neue `listing` reicht, um den Guide beim nächsten Astro-Build automatisch in beide Teaserlisten aufzunehmen, wenn er unter den drei neuesten ist. Ein vorhandener Guide, der mehrfach überarbeitet wird, verdrängt dadurch nicht automatisch wirklich neu hinzugekommene Guides.
5. Für **andere** Guide-Kategorien/-Seiten können neue nicht-draft `src/content/posts/*.md`-Einträge optional `feed`-Metadaten mit `category`, `titleEn`, `summaryEn`, `hrefDe`, `hrefEn`, `listedAt`, `game` tragen. Die beiden **realen** sprachlichen Landing-/Guide-Zielseiten müssen vorher existieren. Die angegebenen `hrefDe`/`hrefEn` verlinken auf die tatsächlichen Guides; niemals einer EN-Card nur eine DE-URL geben. Auch diese Cards gehen ohne Layoutänderung automatisch in das gemeinsame Feed ein.
6. `npm run test:endfield`, `npm run build`, Budget-Endfield ≤100 MB, Pages `dist/` ≤1 GB und Chromium-Smoketests in 1440/390px auf **beide Sprachen** sind zwingende Merge-Gates. In der Roadmap den neuen Guide und alle beteiligten Routen dokumentieren.

**Release-/Listungsstand zu Beginn:** Si (Charakterdebüt 15.10.2026), Typhoeus (02.09.2026), Liino (09.08.2026); alle drei wurden am 17.10.2026 ins neue Kartenverzeichnis aufgenommen. Die Datumsfelder sind unabhängig von `updatedAt`, Guide-Releases und Content-Updates. Quellen: GRYPHLINE Versionsupdate *Sanctuary of Ink*, GRYPHLINE *Dreamscape of Wind and Snow*, Endfield Build Banner-Archiv (Liino).

---
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
- **2. Operator Kit:** Eigener Fließtext ausschließlich zur Spielweise und den Kernmechaniken (`operatorKit.playstyle`). Aufstiegs-, Attribut- und Materialkosten stehen bereits in den offiziellen Tabellen; kein doppelter Fließtext. Der Abschnitt „Ressourcen & Verfügbarkeit“ ist aus allen Guides entfernt – tatsächliche Blaupausen-/Gebiets-/Fabrik-Zugänglichkeit gehört ausschließlich zum bestehenden Ausrüstungs-Build-Finder.
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

## Neu seit Si v1.6: Rollenprioritäten, Meta-Tags und vorläufige Zugänglichkeit

- `skills.priority` bezeichnet die primäre Skill-Reihenfolge des Operators und wird in **Übersicht** sowie unter **Fertigkeiten** angezeigt. Nur bei eigenständig bestätigter zweiter Rolle `skills.supportPriority` mit derselben Struktur ergänzen: `order` (vier einzigartige Slots), `comparisons` (drei `>`/`>=`/`=`) und `targetLevels`. Dann erscheinen unter Fertigkeiten **DPS** und **Support** nebeneinander/untereinander, während die Quick-Card die primäre DPS-Reihenfolge beschriftet. Liino und Typhoeus behalten ihre bisherige eine Priorität.
- `equipment.builds[].metaTag` ist optional und nur bei `meta: true` zulässig: `balanced` = **Balanced** (Cyan), `max-dmg` = **Max. DMG** (Magenta), `max-buffs` = **Max. Buffs** (neutral), `early-access` = **Early Access** (dezentes Warmgold). Die Reihenfolge der `meta: true`-Builds in YAML ist die sichtbare Reihenfolge der Cards; `overview.featuredBuildId` steuert weiterhin die tatsächliche Quick-Card, **nicht** ein implizit überschriebenes `si-main`.
- Neue Meta-Gear-Teile ohne offizielle numerische SKPORT-Item-IDs bleiben im Finder **ungeprüft**. Wenn `metaAccessibilityFromRequirements` deshalb keinen berechenbaren Wert liefert, ist eine explizit freigegebene `overview.ratings.accessibility` (1–5) samt `overview.accessibilityNote` als vorläufige Einordnung erlaubt. Sobald **alle** Meta-Teile offiziell identifiziert und verifiziert sind, hat die automatische Bewertung Vorrang. Freischaltung/Blueprintbesitz werden nie aus dem manuellen Rating abgeleitet.
- Teamkarten verwenden dieselben lokalen Operator-Cover/Icons wie die Partnerübersicht, mit Initialen als Fallback. Für `role: main-dps` erhält das Rollenlabel in Meta-Teams einen Magenta-Akzent; `meta` selbst bleibt als eigener Chip sichtbar.
- Der SKPORT-Hinweis über allen Guides zeigt nur **`SKPORT-Datenstand: YYYY-MM-DD`**. Herkunfts-/PDF-/Übersetzungsprotokolle bleiben in internen Dokumentationsdateien und dürfen nicht als Erzählung über eine dritte Autorenschaft in den Guide gelangen.

**Globale Card-Akzente:** Die beiden Stärken-/Schwächen-Cards der Operator-Übersicht besitzen gemeinsame CSS-Klassen `op-strengths-card` (dezentes Grün) und `op-weaknesses-card` (dezentes Rot), unabhängig vom Charakter und ohne separate Redaktionsdaten. Fließtext bleibt kontrastreich und lesbar.

**Grid:** Meta-Card-Übersicht verwendet **maximal zwei Spalten auf Desktop/Tablet**, bei max. 680 px eine Spalte. Beispiel Si: vier aktive Meta-Cards ergeben 2 × 2, der Build-Finder selbst bleibt unverändert.

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

## Guide- statt Wiki-Layout: Progressive Disclosure (Creator-Revision 16.10.2026)

**Gemeinsame, wiederverwendbare Regel:** Der erste Blick auf einen Operator-Guide zeigt Empfehlungen und redaktionelle Aussagen, **nicht** sämtliche SKPORT-Rohdaten. Unterhalb der Primärinhalte stehen echte native `<details>`-Elemente **ohne `open`-Attribut**, mit fokussierbarem `<summary>`, aussagekräftigem Titel, Chevron und sichtbarem Tastatur-Fokus. Details sind absichtlich auf jeder neu geladenen Seite wieder geschlossen; es gibt **keinen zustandsbehafteten LocalStorage für diese UI-Disclosure**. Ausnahme: Der bestehende Ausrüstungs-Build-Finder hat weiter seine eigenen persistierten **Filterwerte**, bleibt selbst aber initial geschlossen.

**Genau sieben neue, default-closed Ansichten:**
1. **`OperatorKit.astro`**: `Operator-Profil & Spielweise` bleibt sichtbar. `Attributentwicklung` (inklusive Materialkosten-Unterdetails) und `Operator-Aufstieg & Freischaltungen` jeweils in **eigene** `op-guide-accordion`-Karten; der redundante Ressourcen-/Verfügbarkeitsblock ist aus UI/Schema/Template entfernt.
2. **`OperatorSkills.astro`**: `Skill-Priorität` immer sichtbar; **sämtliche** Kampffertigkeits-Cards, Rank-Selector, Stufen-Matrix, Materialkosten sowie Attribut-/Combat-/Schiffs-/sonstige Talente gemeinsam unter `Fertigkeiten & Talente` standardmäßig eingeklappt. Die bestehenden internen Skill-/Talent-`details` bleiben unverändert funktionsfähig nach dem Öffnen der äußeren Karte.
3. **`OperatorWeapons.astro`**: Liinos vier bestätigte Waffenempfehlungen bleiben unmittelbar sichtbar; `Waffendetails` und `Waffenvergleich` bleiben **zwei unabhängige** default-closed Bereiche. Für Waffendetails werden offizielle SKPORT-Vorschauwerte in eine **Attribut/Start/Max-Tabelle** aufgeteilt, die langen Waffeneffekte in lesbaren Start-/Max-Blöcken präsentiert und die sechs Tuning-Stufen in **eine** normalisierte Tabelle mit direkt verknüpften Material-Icons und Mengen über `MaterialCosts.astro` gebracht. Rank-/Potenzialtabellen haben beschriftete Spalten; die ursprünglichen `[item:ID xN]`-Roh-Strings werden nie direkt angezeigt. Datafield-Prozente und Redaktionstexte nicht verändern.
4. **`OperatorPotentials.astro`**: `Potenzialübersicht` bleibt sichtbar, `Potenzialvergleich` samt Datafield-Fußnote standardmäßig eingeklappt.
5. **`OperatorTeams.astro`**: `Empfohlene Meta-Teams` sofort sichtbar. Jede Metacard hat nun **zwei** Chips: *`Meta`* **farbig akzentuiert** und *`Support`/jeweilige Rolle* als **neutrale** Chipfarbe, genau wie die weiteren Teams. `Weitere Teamoptionen` als default-closed `<details>`, dessen Toggle die Anzahl anzeigt, während Teamdaten und Filter weiterhin funktionsfähig sind.

**Fazit (`OperatorConclusion.astro`):** Kein separater `Gesamturteil`-Card-Block, kein duplizierter `Pull-Empfehlung`-Card-Block mehr. Stattdessen **eine** Fazit-Überschrift mit `✓ Empfehlung`-Plakette auf **derselben Header-Ebene** (bei `recommendation:recommended`), darunter **nur ein** zusammenhängender Fazit-Subtext. Bevorzugt stammt er aus `conclusion.verdict`; `conclusion.pullAdvice` dient lediglich als Fallback, wenn noch kein Gesamtfazit vorliegt. Bei Liino wurden die bisherigen zwei inhaltlich überlappenden Texte ausdrücklich zu **einem** redaktionellen Fazit zusammengezogen. Die beiden bestehenden Audience-Cards `Für wen lohnt es sich?` und `Wer kann verzichten?` bleiben sichtbar und unverändert. Andere Empfehlungsstufen nutzen ihr bisheriges neutraleres Label.

**Navigation (`OperatorGuide.astro`):** Behobener Randfall für kurze Gameplay-Sektionen nahe dem Dokumentende: Der Browser kann den Anker wegen fehlender nachfolgender Scrollhöhe nicht immer unter dem sticky Header positionieren. Vorher markierte die ScrollSpy-Logik nach TOC-Klick fälschlich **Teams**, obwohl `#gameplay` angewählt war. Der neue Link-Handler nutzt `destination.scrollIntoView({behavior:"auto",block:"start"})`, übernimmt den URL-Hash und hält den bewusst angeklickten Abschnitt als `aria-current="location"` aktiv, **solange er tatsächlich im Viewport sichtbar** ist. Erst bei tatsächlicher weiterer Nutzerinteraktion (Scroll-/Pointer-/Tastaturereignis) fällt die automatische ScrollSpy-Auswahl wieder an. Einheiten-/Sticky-Offsets bleiben in CSS. Kein falscher oder umgeleiteter `#gameplay`-Link.

**Tests/Qualitätsgate:** `scripts/endfield/operator-guide-disclosure-layout.test.mjs` prüft die sieben `details` ohne `open`, die **sichtbaren** Primärsektionen, geteilten Meta/Support-Badges, Fazit ohne doppelte Cards, Gameplay-Ankerverhalten und Fokus-CSS. Alte Liino-Snapshot-Tests auf die neue Beschriftung aktualisiert. Vor Merge GitHub CI `Validate Astro and operator guides` (Node-Tests, 100-MB-Budget, Astro-Produktions-Build). **Vollständiger Live-Browser-/Responsive-/Tastatur-/ScrollSpy-Test auf Desktop + Mobilgeräten ist separat und nicht durch CI alleine nachgewiesen.**

## Redaktionelle Stimme, Meta-Partner und Videoguide (Creatorbeschluss 16.10.2026)

**Öffentlich sichtbare Aussagen gehören in die Stimme des Guides.** Nicht schreiben „vom Creator empfohlen“, „vom Creator eingeordnet“, „auf Wunsch des Creators“, „meine Einordnung stammt vom Creator“ oder vergleichbare Zuschreibungen. Stattdessen **direkte redaktionelle Formulierungen** („Cohesive Traction ist die F2P-Option“, „Dieser Build maximiert Willenskraft“, „Die Balanced-Variante kombiniert …“). Redaktionelles Ausgangsmaterial des Streamers weiterhin sprachlich verbessern und bei Bedarf ergänzen, ohne den Text wie einen von Dritten verfassten Bericht über den Autor klingen zu lassen. Interne Roadmap-, PR- und Code-Kommentare dürfen weiterhin Creator-Freigaben als Provenienz dokumentieren; diese erscheinen nicht im HTML.

**Partner-Standardregel – automatisch aus Meta-Teams:** `Build auf einen Blick > Partners` zeigt **jeden eindeutigen anderen Operator**, der in **einem oder mehreren `teams.meta[]`-Mitgliedersätzen** steht, in erster Auftretensreihenfolge. `guide.operator` selbst ausschließen; mehrfache Mitglieder nur einmal. `teams.more[]` **nicht** in der kompakten Partnerübersicht aufzählen; dafür kleine Fußnote „Weitere Partner und Teamkombinationen findest du unter Teams“ mit `#teams`-Link. Quelldatei der Wahrheit ist immer **die Teamliste**, keine separat manuell zu synchronisierende `overview.partners[]`. Ist `teams.meta[]` noch leer, dient der bestehende manuelle Array-Wert optional als Übergangs-Fallback für unreife Guides. Die Ableitung ist in `src/lib/endfield/metaPartners.mjs` implementiert und in `operatorGuideModel.ts` mit Anzeigenamen, verfügbarem Cover-Asset und Initialen-Fallback verbunden. **Liino**: genau **Zhuang Fangyi, Perlica, Arclight, Arcane, Tangtang, Xaihi**; **Snowshine und Estella** erscheinen nur bei weiteren Teamoptionen.

**Meta-Team-Karten:** Farbiger `Meta`-Chip und neutraler `Support`-/Rollen-Chip bleiben **zwei eigenständige Labels**, sind aber in der CSS-Flexgruppe `op-meta-team-labels` **rechtsbündig direkt nebeneinander**. Gilt für Meta-Teams aller Guides, auch andere Rollen.

**Videoguide im Profil:** Bestehendes `guideVideo.title` und `guideVideo.url` nutzen (keine neue Videokomponente nötig). `OperatorOverview.astro` bettet gültige YouTube-Links bereits über die bestehende datenschutzfreundliche `youtube-nocookie.com/embed/`-URL ein, lädt das Iframe verzögert und bietet einen externen YouTube-Link. **Liino**: `https://www.youtube.com/watch?v=F1sx8IuOIK4` als persönlicher Hauptguide, UI-Titel zunächst `Liino Guide`. **Davon unabhängig** bleibt `gameplay.pending:true` für eigenständige zusätzliche Run-/Showcase-Clips bis zu ihrer Bereitstellung.

## Liino-P2: Traits, Stärken/Schwächen, reine Support-Teams und Fazit (Creator-Freigabe 16.10.2026)

**Allgemeines Autorenschema ab sofort:**
- `overview.traits[]`: manuell bestätigte Begriffe als kleine Profil-Chips, vorerst **EN** lassen; kein automatisches Übersetzen, wenn der Creator die Begriffe exakt vorgibt. Leere Liste zeigt nur in Vorschau-Modus noch den Platzhalter. **Liino: `HP Treatment`, `Amp`.**
- `overview.strengths[]` / `weaknesses[]` werden **wortgetreu dem Creator-Standpunkt folgend redaktionell** gepflegt. Liino **vier Stärken** (starke Buffs, FP, vielseitige lange BS, einfache Bedienung) und **zwei Schwächen** (Abhängigkeit Signature, Golden Age als teurere/schwächere BP-Alternative) – nicht mit fremden Guides überschreiben.
- `teams.meta[]` und `teams.more[]` sind **jeweils unabhängig von Rollen-Splits** nutzbar. Ein Support-Operator kann **zwei Meta-Teams und weitere Teams** vorsehen. Das Schema verlangt vier einzigartige Operator-Slugs inklusive des Guide-Operators; die zugrundeliegende redaktionelle Rolle bleibt `role: support` für **alle** Liino-Teams. Teamkarten zeigen verständlich formatierte Operator-Namen statt nur Roh-Slugs; Meta-Cards tragen `Meta · Support`. **Keine** erzwungenen „Main DPS Team“ / „Support Team“ Kategorien und keine frei erfundenen Gearbuild-/Rotationsempfehlungen je Team.
- **Liino zwei Meta-Teams:** `zhuang-fangyi/perlica/arclight/liino` sowie `arcane/tangtang/xaihi/liino`. **Drei weitere Optionen:** `zhuang-fangyi/perlica/arcane/liino`, `arcane/snowshine/xaihi/liino` und `arcane/estella/xaihi/liino`. Diese Zuordnung (META nur beim ersten und dritten der fünf vorgegebenen Reihenfolgen) ist **exklusiv vom Creator bestätigt**. Alle fünf Teamrollen = Support für Liino; keine zusätzlichen Zwangs-Empfehlungen an Waffen- oder Gear-Build pro Team.
- `gameplay.pending: true` ist ein **absichtliches „Folgt“** für einen Guide, dessen Videoclips noch fehlen. Das gemeinsame Framework zeigt oben links ein dezentes **FOLGT**-Label, einen kurzen Ausblick und **keine fiktiven Demo-Showcases**; erst nach Anlegen echter Video-URLs die Markierung entfernen. Für andere Guides ist der Default `false`, bestehende Showcase-Funktionalität bleibt erhalten.
- `conclusion.recommendation: recommended` erzeugt eine **fertige Empfehlungsplakette mit Häkchen „✓ Empfehlung“** (kein `[Empfehlung]`-Platzhalter). `conclusion.verdict`, `pullAdvice`, `recommendedFor[]`, `skipIf[]` bleiben eigene redaktionelle Felder. Liino ist vom Creator **grundsätzlich für jeden Account empfohlen**, gerade Elektro-/Natur-Teams profitieren vom Ultimate, **der allgemein gültige lange ANG-Buff der BS ermöglicht weitere Teams**. Die Skillaktivierung kann ohne komplizierte Abstimmung weitgehend passiv laufen. Verzicht ist **eine individuelle Frage, ob sie sinnvoll in die konkreten eigenen Teams passt**, keine pauschale Verbotsliste. Persönliche Pull-Empfehlung wie vereinbart **nur im Fazit**, nicht noch einmal bei Potenzialen.
- **Redaktionelle Freigabe ersetzt nicht den Guide-Status**: `status: preview` für Liino bis Operator-Kit, Videos/sonstige Inhalte vollständig geprüft sind. Die existierenden sechs Gear-Builds, Skill-Priorität und Datafield-Berechnungen bleiben unangetastet.

## Layout-/Kit-Konvention nach Liino-Freigabe (16.10.2026)

- **Ein Operator-Kit-Text:** `operatorKit.playstyle` für die Kernmechaniken. `progressionNotes` und `resourceNotes` wurden aus dem Content-Schema, aus der kopierbaren Vorlage und aus der sichtbaren Oberfläche entfernt. Die **bestehenden** standardmäßig geschlossenen SKPORT-Tabellen `Attributentwicklung` und `Operator-Aufstieg & Freischaltungen` bleiben bestehen; ihre Daten nicht in Redaktionsprosa duplizieren.
- **Overview-Video ohne Höhe-Stretching:** `op-profile-grid` nutzt `align-items:start`, damit die 16:9-YouTube-Karte nur den benötigten Raum einnimmt, statt künstlich auf die höhere Operatorprofil-Karte gestreckt zu werden. 16:9 nicht verzerren.
- **Build auf einen Blick (aktualisiert nach Freigabe):** Alle empfohlenen Waffen stehen **gemeinsam in genau einer Card**, analog zu Partners; darin je eine **unberandete** Waffenposition mit Icon, Kategorie und Name, responsives 4→2-Spalten-Grid. Ausrüstung und Skill-Priorität bleiben zwei eigenständige nicht gestreckte Cards. Partners ist eine separate, durch `teams.meta[]` gespeiste Card. Die Zahl der Waffeneinträge ist dynamisch; die aktuelle Viererzahl stammt von Liinos bestehenden vier Empfehlungen.
- **Einordnung:** Öffentliches UI-Label `Einsteigerfreundlichkeit`: fünf Balken stehen für **sehr leicht spielbar**. Redaktioneller Rohwert `overview.ratings.difficulty` bleibt **1 = leicht, 5 = schwer**; nur die Anzeige invertiert ihn mit `6 - difficulty`, sodass bestehende Guides und Vorlagenwerte nicht umetikettiert werden. Andere Bewertungsfaktoren behalten ihre ansteigende positive Richtung.
- **Liino-Potenzial-Snapshots:** P1/P3/P5 als **lokale 960×540-WebP** unter `public/images/endfield/operators/liino/potentials/potential-{1,3,5}.webp`; externe Endfield-Talos-Wiki-Quelle nur für die einmalige Asset-Beschaffung sowie sichtbare Quellenbenennung. Originale jeweils 1920×1080 und 2,35/1,85/2,01 MB, komprimiert auf 64.600/67.890/63.216 Byte (Summe **195.706 Byte**). Weitere Operatoren dürfen nur eigene bestätigte Snapshot-URLs nutzen; `getOperatorImageUrl` zeigt Bilder optional bei nachweislich vorhandenen lokalen Dateien. Fehlt eine Datei, kein generisches falsches Bild. Keine externe Laufzeitabhängigkeit vom Wiki/CDN.
- **Erweitertes Browser-QA:** PR-Workflow kontrolliert responsive **gemeinsame Waffen-Card** mit vier unberandeten Einträgen, positiven Rating-Score, reduzierte Kartenhöhe, fehlenden Ressourcenblock und echte lokal geladene WebP-Assets in P1/P3/P5 bei Desktop und Mobil. Zudem die geöffneten Waffendetails **aller vier Waffen** auf korrekt benannte Attributspalten, vollständige Tuning-Stufen, lokale Materialien-Icons, saubere Tabellen und fehlende `[item:…]`-Rohplatzhalter prüfen.

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


## Verbindlicher Team-Waffen- und Ausrüstungsstandard (Typhoeus-Abnahme, 16.10.2026)

1. **Redaktion vor Datenaggregator:** Waffen, vier Ausrüstungsteile und alternative Team-Builds stammen vorrangig aus dem **eigenen Script/Textguide**, wenn bereitgestellt. Externe Datafield-Teamloadouts dürfen eigene Vorgaben nicht stillschweigend ersetzen. Datafield character-profile bleibt dagegen erste Quelle der **quantitativen** Waffen-/Potenzialvergleiche; offizielle Item-IDs und Gear-Icons immer aus lokalem SKPORT-Katalog.
2. **Eindeutige Basisausrüstung plus konditionale Varianten:** `teams.meta[]` und `teams.more[]` erlauben optional `memberGear[]`; pro Teammitglied nur ein Eintrag. `member` ist der Operator-Slug, `items` enthält **vier** Gear-IDs, `weaponId` die wirklich empfohlene Weapon-ID, `weaponAlternatives[]` weitere **belegte** Alternativen. Waffenrang `weaponRank` nur bei einer nachgewiesenen Rangempfehlung angeben. `alternatives[]` ist eine Liste aus eindeutigem `title`, 4 Gear-IDs und Quellen-/Einsatznotiz. Beispielsweise unterscheidet Ardelia ihre Qingbo-Variante mit Arcane+Liino von Hot Work ohne Liino; Liino unterscheidet Ultimate-Energie- und Max-Wille-Varianten.
3. **Frontend:** In `TeamMemberGear.astro` zeigt das erste aufklappbare Team-Details-Menü pro Mitglied Hauptwaffe, optional alternative Waffen, vier primäre Rüstungssymbole und danach eine **weitere separat aufklappbare Liste von bedingten Varianten**. Diese alternative Rüstung ist **nicht** als zugleich getragene Hauptausrüstung zu präsentieren. Namen und Bilder direkt aus SKPORT über `ItemIcon.astro`, keine Videodateien/externen Bildquellen zur Laufzeit.
4. **Vollständigkeit ohne Erfindungen:** Die Dokumentation listet echte IDs und alle belegten Varianten aus dem erhaltenen Guide. Für Operatoren ohne Originalquelle keine aus fremden Teamlisten ausgedachten Waffen. Die Typhoeus-Abnahme dokumentiert alle verfügbaren Mobalytics-PDF-Waffen für Arcane (`1045/47/1043`), Ardelia (`49`), Liino (`1046/1044`), Perlica (`94`), Gilberta (`79/47`), und deren vierteilige Gear-Varianten. **Arcane-Wille-Form für alle acht Typhoeus-Teamkonfigurationen mit Arcane: `1134/1137/1136/1136`** (Wraps statt Hands, 2× Bracing Slabs).
5. **SKPORT Validierung und Budgets:** Das Guide-Schema prüft IDs strukturell, ein gezielter Node-Test verifiziert **jede verwendete Vierer-Kombination und alle Weapon-IDs gegen den lokalen offiziellen `items.json`-Katalog**, auch für optionale Teamausrüstungsvarianten. Browser-Tests prüfen Meta- und bedingte Settings auf 1440/390 px. 100 MB Endfield und 1 GB buildbares `dist/` bleiben unverändert.
6. **Skillprioritäten mit Gleichstand:** Für nachweislich gleichrangige Skills lässt `skills.priority.comparisons[]` neben `>` und `>=` nun auch `=` zu. Bei Typhoeus laut eigenem Mobalytics-Guide **Battle > Combo > Ultimate = Basic**; ohne gesonderte Begründung keine widersprüchlichen numerischen Upgrade-Ziele für die beiden gleichrangigen Schluss-Skills erfinden. Die eigene PDF wird **nicht** ins öffentliche Repository hochgeladen.
