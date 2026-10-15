# Endfield-Wiki: Herstellungsmaterialien – geprüfte Erkenntnisse

Stand der anonymen Abfrage: 2026-10-15. Diese Untersuchung findet
auf einem separaten Branch statt. Es wurde keine Änderung an der
öffentlichen Operator-Guide-Darstellung veröffentlicht.

## Öffentliche SKPORT-Kategorien

- Endfield-Datenbank (mainType 1), Waffen (subType 2): 84 Einträge im Katalog.
- Endfield-Datenbank (mainType 1), Ausrüstung / Gear (subType 4): 258 Einträge.
- Katalog und Details über die öffentlichen Wiki-Endpoints
  `/web/v1/wiki/item/catalog` und `/web/v1/wiki/item/info`.
- Referenznamen und Material-IDs aus `/web/v1/wiki/item/list`.

## Wichtige Besonderheit: Kosten stehen in der gerenderten Source-Sektion

Die offiziellen Ausrüstungsdetails enthalten die Widgets `//Source`,
`//Stats`, `//Artificing` und `//Gear Pack`. Die Standard-Rezeptkosten
werden in der sichtbaren `//Source`-Sektion angezeigt, sind aber bei
den geprüften Beispielen **nicht als Tabelle im zugehörigen
documentMap-Source-Dokument** enthalten. Das Source-Dokument enthält
dort nur einen Hinweis auf alternative Herstellungstechniken.

Darum liest `scripts/endfield/gear-recipe.mjs` ausschließlich
die gerenderte öffentliche Source-Sektion aus und prüft die erwartete
Struktur streng. Die übrigen Ausrüstungsdaten verwenden die
strukturierten offiziellen Wiki-Dokumente. Der Parser ist reine
Datenaufbereitung ohne Netzwerkschnittstelle.

## Zwei mit realer öffentlicher SKPORT-Seite geprüfte Standardrezepte

| Ausrüstung | Wiki-ID | Offizielle Standard-Herstellungskosten |
| --- | --- | --- |
| AIC Fieldwork Medic Armor (Lv. 60) | 1246 | Xiranite Component ×20 (Item-ID 528), Wuling Stock Bill ×3000 (Item-ID 602) |
| Pulser Labs Gloves (Lv. 70) | 341 | Xiranite Component ×50 (ID 528), Wuling Stock Bill ×8000 (ID 602) |

Die Item-IDs wurden durch die öffentliche `wiki/item/list`-Antwort
abgeglichen. Beide Ausrüstungsrezepte wurden im GitHub-Actions-Test
`Probe SKPORT weapons and gear catalogue` als
`VERIFIED_STANDARD_RECIPE` ausgegeben. Der Parser wurde darüber
hinaus über `npm run test:endfield` geprüft.

## Grenzen und Anforderungen für den produktiven Import

1. **Nur Standardrezept bestätigt:** Die öffentliche Source-Sektion
   zeigt in diesen Beispielen ein Default-Rezept. Laut Wiki sind neuere
   Herstellungstechniken für ältere Ausrüstung nutzbar, aber die
   vollständigen Alternativrezepte sind damit nicht als offizielle
   strukturierte Daten verifiziert.
2. **Mehrere Rezepte unterstützen:** Künftiges Datenmodell soll pro
   Ausrüstung eine Liste von Rezepten mit eindeutigem Herstellungsverfahren,
   Material-IDs, Mengen und Quellenstatus vorsehen.
3. **Unvollständige Einträge abfangen:** Fehlende Source-Blöcke,
   leere Item-Details und unbekannte Mengenformate dürfen nicht als
   gültige Daten veröffentlicht werden.
4. **Statische Snapshots:** Geprüfte Daten gehören in versionskontrollierte
   JSON-Dateien. Die fertige Website soll keine Live-Anfragen an SKPORT
   benötigen.
5. **Redaktionelle Trennung:** Empfehlungen, bewertete Alternativen
   und die sinnvolle Herstellungsprogression werden separat gepflegt;
   Herstellungsrezepte sind reine Spieldaten.
6. **Ausweitungsprüfung:** Bisher sind zwei konkrete Wuling-Rezepte
   mit echten öffentlichen Webseiten geprüft. Vor einem Sammelimport
   müssen weitere Level, Regionen und Materialklassen getestet werden.

## Nächste Schritte

- Extraktion bei zusätzlichen Ausrüstungsklassen/Regionen validieren.
- Standardrezepte für geprüfte Gegenstände als JSON-Snapshots schreiben.
- Verfügbarkeit und Provenienz alternativer Techniken separat klären,
  ohne externe Community-Werte als offizielle SKPORT-Daten auszugeben.
- Danach `OperatorEquipment.astro` und den Build-Finder mit den
  tatsächlich geprüften Daten anbinden.
