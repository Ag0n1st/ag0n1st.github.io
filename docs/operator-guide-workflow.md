# Operator-Guides selbst bearbeiten

**Namenskonvention:** Im gesamten Endfield-Bereich heißen die Spielfiguren **Operatoren**. Die kanonischen URLs sind `/endfield/operatoren/` und `/endfield/operatoren/<slug>/`. Alte `/endfield/charaktere/`-Links bleiben nur als Weiterleitungen erhalten.

**Komponentenstruktur:** Die zentrale `OperatorGuide.astro` setzt neun eigenständige Abschnittskomponenten aus `src/components/operator/sections/` zusammen. Der gemeinsame Aufbereitungs-Code befindet sich in `src/lib/endfield/operatorGuideModel.ts`. Änderungen an einzelnen Abschnitten benötigen daher keine Kopie der übrigen Guide-Vorlage.

**Datenlücken:** Die offiziellen Traits sind im aktuellen SKPORT-Snapshot noch nicht als strukturierte Felder verfügbar und werden deshalb in fertigen Guides nicht durch erfundene Platzhalter ersetzt. Waffen- und Ausrüstungsdetails benötigen weiterhin eigene Importdaten (nächster Arbeitsschritt).


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
- **5. Ausrüstung:** Beliebig viele Builds, pro Build **genau vier** Items. Optional Freischaltungslevel 50/60/70, Fabrikfortschritt, Set-Bewertung und Progression.
- **6. Potenziale:** P1 bis P5, Einschätzungen und optional belegbare Prozentvergleiche.
- **7. Teams:** Einige ausführlichere Meta-Teams plus beliebig viele Inspirationen. Je Team **exakt vier unterschiedliche Operatoren, einschließlich des Guide-Operators**. `buildId` verweist auf `equipment.builds[].id`.
- **8. Gameplay:** Beliebig viele Showcases, optional Video-Link, Kurztext sowie Rotation/Tipps.
- **9. Fazit:** Gesamtbewertung, Pull-Empfehlung und Entscheidungshilfen.

Offizielle Operatorwerte, Skillbeschreibungen, Levelwerte, Materialien und Icons werden bereits für Typhoeus und Liino aus den importierten Spieldaten geladen. Weitere Datenkategorien wie Waffenstats und Ausrüstungs-Seteffekte folgen. Sie werden nicht in den Guide-Textdateien dupliziert.

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

1. Redaktionelle Liino-Bewertungen, Builds, Teams und Videoguide ergänzen, sobald sie vorliegen.
2. Den generischen SKPORT-Importer nach den echten Typhoeus-/Liino-Tests auf weitere Operatoren erweitern.
3. Bei Bedarf das universelle Operator-Template in kleinere Abschnittskomponenten zerlegen.
4. Waffen-/Ausrüstungsdaten aus strukturierten offiziellen Datensätzen ergänzen und Guide-IDs dagegen validieren.

So entsteht später der gewünschte Ablauf: Datei kopieren → bearbeiten → GitHub-Push → automatischer Build → neue Guide-Seite.
