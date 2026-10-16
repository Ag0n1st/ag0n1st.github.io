# Si v1.6 – Nachprüfung neuer Gear-Identitäten und Übergabe

**Stand:** 16.10.2026. **Basis:** `main` `f5d7ccf4f650817e7f7059ac4e05a2d8b551990c`; Si-Guide aus PR #34 live.  
**Status:** Community-Metadaten als Recherchehinweis, **keine verifizierten numerischen SKPORT-IDs/Blueprint-Freischaltungen**. Kein Import in den offiziellen 940-Item-Katalog.

## 1. Neue Hinweise aus öffentlich einsehbaren Community-Datensätzen

Für fünf der sechs bereits im lokalen Release-Manifest eingetragenen Gegenstände lassen sich die folgenden **internen Namen** zuordnen. Sie sind **nicht identisch mit** den numerischen SKPORT-Wiki-Item-IDs und dürfen weder als solche gespeichert noch zur automatischen Freischaltung im Build-Finder verwendet werden.

| Release-Slug (`si-release-gear.json`) | Community-interner Name | Community-Seite |
| --- | --- | --- |
| `type-50-yinglung-soft-armor` | `item_equip_t4_suit_atk02_body_05` | [Type 50 Yinglung Soft Armor](https://endfield.wiki.gg/wiki/Type_50_Yinglung_Soft_Armor) |
| `type-50-yinglung-beacon` | `item_equip_t4_suit_atk02_edc_06` | [Type 50 Yinglung Beacon](https://endfield.wiki.gg/wiki/Type_50_Yinglung_Beacon) |
| `eternal-xiranite-overalls` | `item_equip_t4_suit_usp02_body_05` | [Eternal Xiranite Overalls](https://endfield.wiki.gg/wiki/Eternal_Xiranite_Overalls) |
| `eternal-xiranite-channeling-gloves` | `item_equip_t4_suit_usp02_hand_05` | [Eternal Xiranite Channeling Gloves](https://endfield.wiki.gg/wiki/Eternal_Xiranite_Channeling_Gloves) |
| `eternal-xiranite-rangefinder` | `item_equip_t4_suit_usp02_edc_07` | [Eternal Xiranite Rangefinder](https://endfield.wiki.gg/wiki/Eternal_Xiranite_Rangefinder) |

### Kritischer Sonderfall: Type 50 Yinglung Gauntlets

Der Release-Datensatz enthält `type-50-yinglung-gauntlets`, für das bereits vorher **kein belegbares Bild** verfügbar war. Unter ähnlichen Namen findet man eine **alte** [Type 50 Yinglung Gloves](https://endfield.wiki.gg/wiki/Type_50_Yinglung_Gloves) (`item_equip_t4_suit_atk02_hand_01`) und eine [Type 50 Yinglung Gloves (03)](https://endfield.wiki.gg/wiki/Type_50_Yinglung_Gloves_%2803%29) (`item_equip_t4_suit_atk02_hand_03`). Letztere wird als INT/STR/Combo-Skill-Variante geführt. **Keine der beiden Identitäten ist bisher ausreichend mit dem vorhandenen Release-Slug und einem offiziellen numerischen SKPORT-Datensatz abgeglichen.**

**Verbotene Abkürzung:** Nicht einfach `hand_01` oder `hand_03` übernehmen, damit ein Icon, Rezept oder Status angezeigt wird. Bis zur eindeutigen Zuordnung bleiben die aktuelle Textfallback-Grafik und der Status `unverified` erhalten.

### Rezepte und Blaupausen

- Die Community-Wiki zeigt bei Type 50 Yinglung Soft Armor und Beacon jeweils **360 Wuling Stock Bills + 50 Pyrrolite Components**. Das sind Community-Angaben, **keine durch den offiziellen SKPORT-Importer bestätigten Rezeptdatensätze**.
- Die Wiki führt für verschiedene 1.6-Gear-Teile zusätzlich eigenständige `item_formu_…`-Bezeichner. Diese sind nicht dieselbe ID wie `item_equip_…` und erst recht keine automatisch bestätigte Blaupausen-Fundstelle.
- Die konkrete Story-/Gebiets-/Kisten-Freischaltung für diese sechs Teile ist weiterhin nicht hinreichend verifiziert. Der bestehende Build-Finder muss hier weiter konservativ `unverified` und keine automatische Blaupausenfreischaltung anzeigen.

## 2. Offizielle Abnahme vor Aufnahme in den Katalog

1. **Offiziellen anonymen SKPORT-Snapshot erneut importieren**, ohne Login/Cookies. Numerische IDs und Namen anhand von Slot, Attributen und (soweit verfügbar) interner Kennung eindeutig zuordnen.
2. Für neue Gear-IDs gesondert `item/info` einschließlich vollständiger Material-/Rezepttabellen validieren. Ungültige oder leere offizielle Detail-Responses dürfen nicht als `verified` gelten.
3. Wiki-interne Namen nur als **Recherche-Joins** verwenden; offizielle IDs bleiben die Schlüssel für `items.json`, `equipment-details.json` und Progressionsindizes.
4. Bei eindeutigen offiziellen Belegen den Austausch der temporären Slugs inklusive Si-Guide-Referenzen und Filtertests in einem Feature-PR durchführen. Bei widersprüchlichen Namens-/Slot-Zuordnungen **nicht stillschweigend migrieren**.
5. Vor Merge `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build`, `node scripts/check-pages-budget.mjs` und Chromium-QA auf 1440/390 px; anschließend Pages-Deploy.
6. Redaktionelle Si-Build-Entscheidungen und die sechs Meta-/37 weiteren Teams **nicht** allein wegen abweichender Community-Theorycrafting-Artikel umschreiben. Änderungen am Guide erst nach Sichtung/Freigabe.

## 3. Aktuelle Abnahme-/PR-Lage

- **PR #34** Si v1.6 ist auf `main` gemergt; der ergänzende Roadmap-Commit `f5d7ccf` wurde in [Pages #278](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38898689708) und [Pages #279](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38904475834) erfolgreich gebaut und deployed. Beide Budget-Gates waren erfolgreich.
- **Endfield-Istgröße aus aktuellem Git-Tree:** **21.979.256 / 100.000.000 Byte**, 1.086 gezählte Quelldateien; 78.020.744 Byte Rest. Das ist **keine** Größe der generierten Website.
- **Zuletzt belegter Pages-`dist/`-Snapshot:** **18.906.777 / 1.000.000.000 Byte** aus Si-CI #156. In Pages #279 hat das 1-GB-Gate bestanden; eine neue exakte `dist/`-Größe wurde bei der Repository-Metadatenprüfung nicht ausgelesen.
- **Offener PR #3** ist weiterhin ein älterer **Draft** zur read-only-Wiki-Recherche; gegenüber `main` bei Prüfung 13 Commits voraus und 60 hinterher (`diverged`). Keinesfalls unkontrolliert in `main` mergen; nach Nutzerentscheidung archivieren/schließen oder gezielte noch relevante Teile neu übernehmen.
- **Nutzerabnahme von Si** steht weiterhin aus; neue Charakter-Guides erst nach Rückmeldung. Eigene Si-Gameplay-Videos weiterhin `pending`.

## 4. Texte und Reproduzierbarkeit

**Öffentliche redaktionelle Texte:** direkte Guide-Stimme, keine Konstruktionen wie „vom Creator empfohlen“, „vom Autor bewertet“ oder eine Drittautor-Perspektive. Interne Provenienz in Roadmap/Quellprotokollen ist davon unabhängig und bleibt notwendig. Neuer statischer Regressionstest: `scripts/endfield/editorial-voice.test.mjs` für die öffentlichen Guide-Dateien, Astro-Operator-Komponenten und deutschsprachige Anzeige-Lokalisierung; interne YAML-Kommentare und nicht angezeigte Provenienzmetadaten sind bewusst ausgenommen.

**Nächster fachlicher Übergabepunkt:** Nutzer prüft [Si live](https://ag0n1st.com/endfield/operatoren/si/). Danach erneuter offizieller SKPORT-Abgleich für noch fehlende numerische v1.6-IDs/Rezepte; ohne eindeutige Fachdaten bleibt der Build-Finder bewusst vorsichtig. Kein neuer Guide ohne inhaltliche Freigabe.
