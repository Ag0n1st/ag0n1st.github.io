# Operator-Guides selbst bearbeiten

Dieses Verzeichnis gehört zur redaktionellen Ebene der **Arknights: Endfield**-Guides.

## Status der Implementierung

- Das Schema (`src/content/operatorGuideSchema.ts`) und die Astro Content Collection sind eingerichtet.
- `src/content/operator-guides/_template.md` ist deine **kopierbare Vorlage**. Durch den führenden Unterstrich wird sie von der Collection ignoriert.
- `src/content/operator-guides/typhoeus.md` ist ein **sichtbarer Layout-Prototyp** mit dem Status `draft`. Dies ist die einzige bewusst freigeschaltete Entwurfsseite.
- Die Webseite verwendet jetzt `src/pages/endfield/operatoren/[slug].astro` und die gemeinsame Komponente `src/components/operator/OperatorGuide.astro`. **Alle veröffentlichten Guides** werden anhand der Markdown-Dateien automatisch erzeugt. Noch nicht importierte offizielle Spieldaten sind als Platzhalter gekennzeichnet.

## Neuen Guide vorbereiten

1. `src/content/operator-guides/_template.md` kopieren.
2. Neue Datei nach dem Slug benennen, etwa `si.md` oder `operator-name.md`.
3. Ganz oben `operator: neuer-operator` auf denselben Slug wie den Dateinamen ändern und optional `displayName: Anzeigename` eintragen.
4. Texte und Referenzen eintragen. Anfangs `status: draft` beibehalten.
5. `npm install` (einmalig) und `npm run build` ausführen. Astro prüft das YAML mithilfe unseres Schemas und zeigt ungültige Felder oder fehlende Pflichtfelder an.
6. Datei über GitHub Desktop oder per Commit ins Repository übernehmen.
7. Sobald der Guide inhaltlich bereit ist, `status: published` setzen und nach `main` pushen. Der nächste Build erstellt die Guide-Seite unter `/endfield/operatoren/<operator>/` und fügt die Card automatisch im Operatoren-Grid hinzu. `status: draft` hält andere Guides vollständig verborgen. **Typhoeus ist die einzige bewusst sichtbare Ausnahme.**

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

Die offiziellen Operatorwerte, Skillbeschreibungen, Levelwerte, Waffenstats, Materialkosten, Seteffekte und Icons sollen später **ausschließlich aus den importierten Spieldaten** kommen. Sie werden nicht im Guide dupliziert.

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

1. Die automatisch importierten Spieldaten unter stabilen IDs strukturieren.
2. Den universalisierten Operator-Guide bei Bedarf in kleinere Abschnittskomponenten aufteilen.
3. Das Operatoren-Grid und Guide-Template um importierte Spieldaten sowie optimierte Bilder/Icons erweitern.
4. Zusätzliche Validierung gegen IDs der importierten Spiele-Datensätze einrichten.

So entsteht später der gewünschte Ablauf: Datei kopieren → bearbeiten → GitHub-Push → automatischer Build → neue Guide-Seite.
