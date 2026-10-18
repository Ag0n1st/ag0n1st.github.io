# Endfield: Editor-Handbuch für Spielterminologie (DE/EN)

**Stand:** 18.10.2026 · **Zentrale Datei:** `src/data/endfield/terminology.json`.

## Ziel

Alle **angezeigten Game-Daten-Bezeichnungen** (nicht die redaktionellen Fließtexte) werden aus dieser einen editierbaren JSON-Datei bezogen. Der Betreiber kann die Einträge `de` und `en` ändern, ohne die SKPORT-Importe, Guides oder UI-Komponenten anzupassen.

**Nicht ändern:** `en` bei den offiziellen Quellbezeichnungen nur dann, wenn die englische Website ausdrücklich umbenannt werden soll. IDs und Schlüssel (`id`, `liino`, `basic`) unbedingt beibehalten. Nur den Wert `de` bearbeiten, wenn ausschließlich die deutsche sichtbare Schreibweise anders werden soll.

Die vorhandenen DE-/EN-Namen sind **als vorläufige Werte vorausgefüllt**, keine neu erfundenen deutschen Übersetzungen. Insbesondere gelten bereits eingetragene deutsche Spielnamen (beispielsweise Si: `Schaffensdrang`) weiter.

## Aufbau

- `categories.classes`: alle sechs Operator-Klassen
- `categories.traits`: standardisierte Rollen/Traits
- `categories.attributes`: Strength, Agility, Intellect, Will
- `categories.elements`: Electric, Heat, Cryo, Nature etc.
- `categories.weaponTypes`: Sword, Greatsword, Polearm, Handcannon, Arts Unit
- `categories.standardTerms`: Basic Attack, Battle Skill, Combo Skill, Elite/Gearing, SP und weitere Mechanik-/UI-Bezeichnungen
- `categories.combatEffects`: Infliction, Bursts, Combustion, Corrosion, Lift, Shield, Hast etc.
- `operatorSkills.<operator-slug>.skills.<slot>`: pro Operator `basic`, `battle`, `combo`, `ultimate`. Beispiel: `operatorSkills.si.skills.battle.de`. Für die derzeit **nur drei vollständig importierten Operatoren** Liino, Si und Typhoeus sind die echten SKPORT-Namen vorausgefüllt. Für die übrigen katalogisierten Operatoren sind **bewusst leere Slots** vorhanden – deren offizielle Namen sind noch **nicht im lokalen Operator-Skill-Import vorhanden**. Neue Operator-Importe müssen die echten Namen (und ggf. Talente) ergänzen. Keine Skills aus der Charakterliste erraten!
- `operatorSkills.<operator-slug>.talents.<talent-id>`: importierte Talentnamen pro Operator, getrennt von ihren Beschreibungen
- `itemsById.<item-id>`: **alle derzeit katalogisierten** Waffen, Gearteile, Item Files, Valuables und v1.6-Preview-Gear (ID eindeutig, `category`, `en`, `de`). Editor kann jedes Item oder Gearteil einzeln umbenennen. **Die Source-Daten bleiben unverändert.**

## Beispiel

```json
"Supporter": { "en": "Supporter", "de": "Supporter" }
```

Änderung nur auf `"de": "Unterstützer"` aktualisiert den angezeigten deutschen Klassenbegriff in jeder datengetriebenen Operatoransicht, aber **nicht** deine redaktionellen Absätze, Skillbeschreibungen, Quellenzitate oder den englischen Guide.

Beispiel Skill:
```json
"si": {
  "operator": "Si",
  "source": "SKPORT imported operator snapshot",
  "skills": {
    "battle": {"en": "Brushwork Realm", "de": "Dimension der Pinselkunst"}
  }
}
```
Der JSON-Block oben zeigt nur die relevante Struktur, nicht alle vier Skills oder Talente. Ist ein `de`-Wert identisch mit dem ursprünglichen englischen Namen, bleibt – sofern verfügbar – die bisherige per-Operator-Lokalisierung als unveränderter Platzhalter erhalten, bis der zentrale Eintrag bewusst geändert wird.

## Welche UI-Flächen werden synchronisiert?

- Operator-Übersichtsindex: Klasse, Element und Waffentyp; Elementfarben sind **visuelle Regeln**, nicht die Übersetzung.
- Operator-Guide: Klassen, Elemente, Attributes, Traits, Kampffertigkeitskategorien, echte Skillnamen, Talentnamen, benötigte Items/Materialkosten und alle anhand ID aufgelösten Gear-/Waffennamen.
- Ausrüstungskarten/Meta Builds, Waffenempfehlungen, Teammitglieder-Waffen und -Gear, Item-Icons/Alt-Titel und Herstellungsrezepte: dieselben Item-IDs und Nachschlagewerte.
- Standardisierte **kurze UI-Spielbegriffe**, die exakt dem Spielterminologie-Schlüssel entsprechen, verwenden das gleiche zentrale Register.

**Absichtlich nicht betroffen:** zusammenhängende deutsch/englische Guide-Evaluationen, Stärken/Schwächen, Build-/Teams-Meinungen, Talenteffekte, vollständige offizielle Fertigkeitsbeschreibungen, ursprüngliche englische SKPORT-Felder, nicht-spielbezogene Site-Texte. Dafür gelten weiterhin `src/content/operator-guides/*.md`, `src/data/i18n/en-guide-content.json`, `src/lib/i18n/guideUi.ts` und bestehende Operator-Lokalisierungsdaten. **Keine Volltext-„Suchen/Ersetzen“-Logik.**

## Ergänzen und prüfen

1. JSON öffnen, Eintrag anhand **exaktem englischen Label, Operator-Slug oder Item-ID** suchen.
2. Gewünschtes `de`-Feld ändern; bei neuen Begriffsgruppen das exakte Schema `{ "en":"…", "de":"…" }` verwenden.
3. Keine Schlüssel verschieben, IDs ändern oder bereits verifizierte Werte stillschweigend umschreiben.
4. `npm run test:endfield` und `npm run build` ausführen; GitHub-PR und DE/EN-Browserchecks.
5. Für alle folgenden Guide-Integrationen **ausschließlich** `gameTerm`, `gameSkillName`, `gameTalentName` oder `gameItemName` aus `src/lib/endfield/terminology.ts` verwenden, statt neue fest kodierte deutsche Bezeichnungen zu erfinden. Das ursprüngliche englische SKPORT-Datum bleibt im Import unverändert.

**Grenze der jetzigen Datenbasis:** Der aktuelle offizielle lokale Vollimport existiert erst für Liino, Si und Typhoeus. `operatorSkills` kann daher zwar alle 35 derzeit vorhandenen Operatoren benennen, aber nur die bereits importierten realen Fertigkeiten ausfüllen. Für eine vollständige Namensliste der anderen 32 braucht es eine eigene Quellrecherche/Importprüfung, keine ausgedachten Skillnamen.

Weitere Entwicklungsentscheidungen und CI-Nachweise stehen in `ROADMAP.md`.
