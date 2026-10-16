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
- Besitz-Checkboxen für alle vier Blaupausen einzeln prüfen: Ohne Bestätigung kein vollständiges `available`, mit bestätigten vier IDs und ausreichendem Fortschritt `available` (sofern das Build verifiziert ist).
- `localStorage`-Persistenz, Browser-Reload und Zurücksetzen auf Liino **und** Typhoeus prüfen.
- Community-Kistenorte mit unklarer/widersprüchlicher Beleglage als `unverified` beziehungsweise `disputed` belassen. Unbestätigte Vorschläge nicht als offizielle Empfehlungen veröffentlichen.

Für Architektur, genaue Quellenhierarchie und den nächsten Projektstand immer auch die zentrale [`ROADMAP.md`](../ROADMAP.md) lesen.
