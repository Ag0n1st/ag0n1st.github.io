# Arknights: Endfield – Fabrikbereich: Recherchearchiv und Konzeptstand

> **Stand: 17.10.2026 · Status: KONZEPT ARCHIVIERT / ARBEIT PAUSIERT.**
>
> **Verbindliche Entscheidung des Website-Betreibers:** Die Fabrik der Website wird **primär als geführter, spielstandsabhängiger Fortschritts-Guide** aufgebaut. Eine Blueprint-Bibliothek ist **Teil dieses Lern-/Fortschrittsweges und optionaler Schnellzugriff**, nicht die primäre Seitenlogik.
>
> **Ebenso verbindlich:** Die praktische Konzeption und Implementierung werden auf einen vom Betreiber später bestimmten Zeitpunkt **verschoben**. Keine Änderungen an `/endfield/fabrik/`, `/en/endfield/factory/`, den Daten oder der Navigation, bis die Diskussion explizit wieder aufgenommen und der Umsetzungsumfang freigegeben ist.
>
> **Einordnung der Aussagen:** **[ENTSCHEIDUNG]** vom Betreiber ausdrücklich festgelegt; **[BESTAND]** aus bestehendem Repository/dokumentierter Vorarbeit; **[RECHERCHE]** in bisherigen Gesprächen ermittelter und mit URL überlieferter Ansatz, vor produktiver Verwendung **erneut zu verifizieren**; **[VORSCHLAG]** noch nicht verabschiedete konzeptionelle Empfehlung; **[OFFEN]** Frage oder Nachweis noch ausstehend. Diese Kennzeichnungen verhindern, dass künftige KI-Chats Entwürfe versehentlich als fertige Spielmechaniken oder als vom Betreiber freigegebene Inhalte behandeln.

---

## A. Wie dieses Dokument beim nächsten Mal verwendet wird

1. `ROADMAP.md` insbesondere **Phase P5** und den neuesten Fabrik-Entscheidungsabschnitt lesen; danach **dieses gesamte Dokument** lesen.
2. Tatsächlichen Projektstand im Repository kontrollieren: Website-Placeholder, vorhandene `src/data/endfield/`-Daten, `src/lib/endfield/`-Module und Build-/CI-Skripte.
3. Die beiden **verbindlichen Entscheidungen** oben beachten: **progressiver Guide als Primärstruktur**, **Umsetzung aufgeschoben**.
4. Bei Wiederaufnahme zuerst *inhaltliche* Progressionsstufen, Produktionsziele und freigeschaltete Systeme gemeinsam festlegen; erst danach Layouts, Datenmodelle, Importer, Blueprint-Codes und tatsächliche Webpages implementieren.
5. Aus externen Quellen referenzierte Spielwerte jeweils mit aktuellem Patch, Tests und vorzugsweise offiziellen Daten überprüfen. Ein Vorschlag oder Vergleich mit Communityseiten ist **keine Freigabe für veröffentlichte Produktionszahlen/Blueprints**.
6. Entwicklung wie gewohnt **gleichzeitig DE + EN**, `ROADMAP.md` nach jedem Schritt, Budget Endfield **100.000.000 B**, Pages-`dist/` **1.000.000.000 B**, Tests und GitHub Actions. Kommunikation **textbasiert**.

## B. Auftrag und Produktvision

### B1. Welches Nutzerproblem soll die Seite lösen?

**[BESTAND – älterer Produktwunsch]:** Für Tal4 und Wuling existieren bislang geplante vollständige Fabrik-Videoguides; der Betreiber möchte einen **„ultimativen Fabrik-Guide“** für die deutschsprachige Community, der **selbst Spielern ohne Fabrik-Affinität** verständlich erklärt, was warum gebaut wird. Er soll **jeden Spieler unabhängig vom Story-/Fabrikfortschritt** abholen und **Plug-&-Play-Blueprints** bereitstellen, falls jemand ausschließlich eine funktionierende Vorlage benötigt.

**[ENTSCHEIDUNG vom 17.10.2026]:** Der Website-Bereich erhält **eine geführte Progression als Leitstruktur**. Nutzer sollen erfahren, **welcher Ausbau zum jetzigen Zeitpunkt sinnvoll ist**, statt am Eingang nur eine Liste komplexer fertiger Blueprints zu sehen.

Die Nutzergruppen und ihre primären Ziele:

| Nutzerfall | Erwartetes Ergebnis | Rolle des Guides |
| --- | --- | --- |
| Absoluter Einsteiger | Verstehen, wie PAC/AIC, Rohstoffe, Strom und eine erste Linie funktionieren | Schrittweiser Einstieg ohne fortgeschrittene Abhängigkeiten |
| Früher oder mittlerer Spielfortschritt | Nächstes lohnendes Upgrade passend zu tatsächlich freigeschalteten Systemen | Progressionspfad mit überprüften Voraussetzungen |
| Wuling-Umsteiger | Welche Tal4-Produktion weiterlaufen lassen, was in Wuling zuerst einrichten | Übergang von zwei Regionalguides aktiv erklären |
| Fortgeschrittener Spieler | Engpässe finden, Linien erweitern, Spezialmechaniken nutzen | Vertiefungen und Nachschlageabschnitte |
| „Ich will nur Copy & Paste“ | Sofort verwendbarer Code plus genaue Einrichtung | Direktzugang zum passenden, getesteten Blueprint |
| Spieler mit kaputter Fabrik | Schnell identifizieren, warum eine Linie steht | Separate kurze Diagnose/Fehlerhilfe |

### B2. Didaktische Grundprinzipien

**[VORSCHLAG]**

- Ein Anfänger soll **nicht erst einen Endgame-Blueprint verstehen müssen**, um seinen ersten Fortschritt zu machen.
- Auf jeder Stufe: **Ausgangslage → Ziel → konkret benötigte Freischaltungen → Bau/Blueprint → Anschluss und Inbetriebnahme → erwartete Produktion → typische Fehler → nächster Schritt**.
- Jeweils **eine Mechanik pro Lerneinheit**, mit nachvollziehbarem Beispiel und direkter Anwendung in einem passenden Blueprint.
- Nicht nur zeigen, *was* zu bauen ist, sondern verständlich machen, **warum** (z. B. Rohstoff-/Durchsatzlimit, Stromdefizit, Transferbedarf).
- Bestehende funktionierende Anlagen sollen **möglichst lange weiterverwendbar bleiben**. Umbauten nur empfehlen, wenn der Spieler einen verifizierten Grund dafür hat.
- **Zeit sparen** und **Lernen** sind keine widersprüchlichen Angebote: auf denselben Daten basierende Progressionsschritte, kurze Erklärungen und fertige Blueprints.
- Platzierung eines Blueprints ≠ funktionsfähige Anlage: deutlich erklären, **welche Leitungen, Förderbänder, Rezepte, Pflanzen, Depots, Exporte und Inputs anschließend noch fehlen können**.
- Keine leeren scheinpräzisen Zahlen oder suggerierten Verfügbarkeiten.

## C. Entscheidung zur Informationsarchitektur

### C1. Vorgeschlagene fünf Hauptbereiche (NOCH NICHT FREIGEGEBEN)

**[VORSCHLAG]** Innerhalb des bestehenden Fabrik-Tabs (kein neuer globaler Navigationspunkt):

1. **Fabrik-Übersicht:** Einstieg, Fortschrittsfrage, letzter/nächster sinnvoller Schritt, Einstieg als Anfänger oder direkter Blueprint-Zugriff.
2. **Tal4 – geführter Fabrikfortschritt:** PAC-Grundlagen, Ausbau und Übergangsvorbereitung, jeweils mit kleinem nachbaubarem Ergebnis.
3. **Wuling – geführter Fabrikfortschritt:** Regionale Unterschiede, Ressourcen, Flüssigkeits-/Gasprozesse, fortgeschrittene industrielle Versorgung, spätere Systeme.
4. **Blueprint-Bibliothek:** Ergänzender Schnellzugriff, durchsuchbar/filterbar nach Region, Stufe, Produktionsziel und Freischaltungen. Keine ungetesteten Codes als garantiert funktionsfähig.
5. **Fabrik-Wissen / Fehlersuche:** Einzelfragen, Definitionen, Engpässe, wiederkehrende Bedienungsfehler, entsprechende Build-Anleitungen.

**[ENTSCHEIDUNG]:** Nicht fünf gleichberechtigte Kataloge bauen, sondern die **geführte Progressionsreise sichtbar in den Vordergrund** stellen. Die genaue Aufteilung, Subnavigation und Frage, ob Wissensbereich/Blueprints eigene Routen oder Unterseiten werden, ist **[OFFEN]**.

### C2. Zwei sinnvolle Einstiege

**[VORSCHLAG]** Direkter Einstieg **„Führe mich durch meine Fabrik“** (prominent) und ergänzend **„Blueprint finden“** (sekundär). Eine erklärende Seite kann die passenden Codes direkt anbieten; eine Blueprint-Detailseite kann zurück zum Lernschritt führen, an dem die Vorlage thematisch eingeordnet ist.

Mögliche Breadcrumbs (erst nach Konzeptfreigabe): Fabrik → Tal4/Wuling → Fortschrittsstufe → Produktionsaufgabe → getestete Vorlage.

## D. Fortgeschrittene Spielstandserkennung / Progressionsassistent

**[VORSCHLAG; nicht implementiert]**

Ein **möglichst kleiner** optionaler Fragenpfad: zunächst Region **Tal4 / Wuling**, tatsächliche AIC-/Forschungs- bzw. Gebäude-Freischaltung, gewünschtes Produktionsziel. Zusätzliche Fragen **nur bei Bedarf**, etwa Stromnetz/Leistungsreserve, verfügbare Rohstoffquelle, Region-/Gebietszugang, Anlagen, regionaler Entwicklungsstatus, Outpost-/Transferzugriff oder Gas-/Flüssigkeitssysteme.

Daraus **nicht** automatisch schließen, dass eine Blaupause vorhanden oder ein Gerät gebaut ist. Mögliche separate Zustände:
- `unbekannt / nicht bestätigt`;
- `durch Forschung/Story technisch zugänglich`;
- `bereits installiert/eingerichtet`;
- `Ressourcen tatsächlich verfügbar`;
- `Blueprint-Code technisch kompatibel/getestet`.

**[BESTAND]:** Das Repository enthält bereits konservative Gear-Build-Finder-Prüfungen. **Storyfortschritt, Gebietsfreischaltung, Blaupausenbesitz und Herstellungsanforderungen** sind dort ausdrücklich voneinander getrennt. Fabrik-Story-/Forschungsvoraussetzungen benötigen gegebenenfalls **eigene**, neu verifizierte Verknüpfungen; sie dürfen **nicht** aus einem Gear-Level oder einer Regions-ID erfunden werden.

**[OFFEN]:** Wollen wir Fortschritt nur pro Besuch ohne Anmeldung abfragen und in `localStorage` speichern (entspricht der bisherigen Website-Philosophie), oder zunächst rein navigierbare, stufenbezogene Einzelseiten ohne gespeicherten Assistenten anbieten? Genaue Eingabefelder erst bei späterer Diskussion festlegen.

## E. Redaktionelle Progression Tal4 und Wuling – ARBEITSHYPOTHESE

**Achtung:** Diese Tabelle beschreibt **Lern-/Produktionsziele**, keine offiziell bestätigte Reihenfolge einzelner Anlagen, Missionen, Forschungsknoten oder Output-Raten. Exakte Gates müssen neu recherchiert und im Spiel geprüft werden.

| Region / vorgeschlagene Etappe | Schwerpunkt | Möglicher Abschluss/Blueprint-Aufgabe |
| --- | --- | --- |
| **Tal4 – Grundlagen** | AIC/PAC, Rohstoffquelle, Förderband, erste Produktion und Lager | Erste nachvollziehbare Materialkette |
| **Tal4 – Automatisieren** | Mehrere zusammenhängende Anlagen, einfache Veredelung, Pflanzenkreisläufe, Heilmittel | Reproduzierbare, kontinuierlich versorgte Linie |
| **Tal4 – Strom und Logistik** | Energie, Batterien, Anschluss an Depots, störungsfreie Nachversorgung | Einfache Batterie-/Versorgungskette |
| **Tal4 – Erweiterung** | Ferrium und weitere Komponenten, komplexere Produktionsketten | Skalierung und mögliche zweite Rohstoffzufuhr |
| **Tal4 – Wuling-Vorbereitung** | Welche Produktion weiterlaufen soll, regionale Transfers, Ausbaufreigaben | Praktische Übergabe-/Transfer-Checkliste |
| **Wuling – Ankommen** | Lokale Stromversorgung, neue Ressourcen, Infrastruktur, frühe Xiranit-Aufgaben | Erste stabile regionale Produktion |
| **Wuling – Flüssigkeiten / Industrie** | Wasser, Flüssigkeitsanschlüsse, Cuprium, Nebenprodukte/Abwasser und Durchsatz | Verifizierte Flüssigkeitslinie |
| **Wuling – spätere Industrie** | Fortgeschrittene Komponenten wie Hetonit, regionale Versorgung, Netz-/Outpost-Logik | Mehrere abgestimmte Produktionsketten |
| **Wuling – fortgeschrittene Systeme** | Gas-/Spezialressourcen, spätere Materialien wie Pyrrolit und Produktionsoptimierung | Optionale, getestete Hochstufen-Vorlagen |

**[BESTAND]:** Die Komponentendaten des Gear-Build-Finders (unten G) lauten Amethyst, Ferrium, Cryston, Xiranit, Cuprium, Hetonit und Pyrrolit. Diese sind **ein hilfreiches Merkmal zur Sortierung von Ausrüstungsvoraussetzungen**, nicht automatisch ein offizieller AIC-Bau- oder Forschungsbaum.

**[RECHERCHE]:** In früherer Recherche wurden Tal4-/Wuling-Regionen mit Depottransfers und Batterien im regionalen Produktionskontext sowie spätere Flüssigkeits-, Gas- und Farmmechaniken als wichtige zusätzliche Themen identifiziert. In Dokument und späteren Guides nicht ohne Detailnachweis behaupten, ein konkretes System werde nach einer bestimmten Mission oder Version zwingend freigeschaltet.

### E1. Regionale Wechselwirkung als eigenes Kernthema

**[VORSCHLAG]** Die zwei Guides trotz eigener Progression ausdrücklich verknüpfen:
- Was in Tal4 **weiterlaufen** sollte, nachdem Wuling beginnt;
- welche Rohstoffe/Produkte von welcher Region geliefert werden können und **unter welchen echten Freischaltbedingungen**;
- ob eine Batterie-/Strom-/Transferlösung aus Tal4 kurzfristig den Wuling-Einstieg erleichtert;
- wie sich Depotgröße, Versorgung und Standortwahl auf tatsächliche Durchsatzengpässe auswirken;
- welche Anlagen erst nach regionalen Verbesserungen sinnvoll werden.

**[RECHERCHE]** Diese Probleme wurden in Gesprächen als wiederkehrende Spielerfragen und Community-Diskussionen festgestellt, jedoch **nicht** als getestete mathematische Transport- oder Batterie-Bilanz dokumentiert.

## F. Blueprint-Bibliothek als sekundäre, aber wesentliche Funktion

**[VORSCHLAG; KEINE Codes freigegeben]** Für **jede redaktionell geprüfte Vorlage**:

| Feld | Anforderung |
| --- | --- |
| ID / Titel / Region | Stabile redaktionelle ID, Name, Tal4 oder Wuling |
| Fortschrittsstufe | Welchem Guide-Schritt zugeordnet; für welche Spieler geeignet |
| Zielprodukt und Output | Produkte und **nachgemessene** Einheiten pro Minute |
| Input | Vorprodukte, Ressourcen, laufender Verbrauch, Versorgungslücken |
| Technik/Unlocks | AIC-Forschung, benötigte Anlagen/Gebiete, zwingende Voraussetzungen – nur nach Test |
| Versorgung | Strombedarf/Reservemarge, Rohstoffanschlüsse, Leitungen, Förderbänder, Ports |
| Maße | Realer Flächenbedarf, PAC-/Sub-PAC-/sonstige Platzierungsbedingungen |
| Region-/Server-Code | Tatsächlich getestete und getrennte, **sofern nötig** serverregionale Codes; nichts automatisch als übertragbar behaupten |
| Aufbauanleitung | Was nach Einfügen verbunden, konfiguriert, befüllt oder eingeschaltet werden muss |
| Upgrade-Pfad | Woraus die Vorlage später erweitert/recycelt werden kann |
| Qualität | `tested / needs-review / outdated`, eigene Validierung, Version, Änderungsnotiz |
| Medien / Nachweis | Eigene Screenshots oder Videos später nur wenn gewünscht, optional Creator-Videokapitel, Quellenhinweise |
| Fehlersuche | Typische Probleme und schnelle Gegenmaßnahmen |

**Kritisch:** Serverregion-Codes waren in der Vorrecherche ein Thema. Vor der Implementierung **tatsächliche Serverregion-Trennung, Codeformat, Versionsgültigkeit und notwendige Anzahl Varianten direkt im Spiel / aus bestätigten Quellen überprüfen**. Nicht pauschal EU/NA/Asia-Codes simulieren.

**[OFFEN]:** Welche Blueprints von Ag0n1st selbst stammen, welche Community-Vorlagen nach eigener Prüfung übernommen werden dürfen, und wie Quellen bzw. Credits angezeigt werden. Fremde Produktionsraten oder Codes dürfen nicht allein aufgrund des Vorhandenseins in einer Communitybibliothek „verifiziert“ heißen.

**[VORSCHLAG]** Kategorie/Filter zuerst nach **„Was möchte ich herstellen?“** und **„Was ist bereits freigeschaltet?“**, daneben Region, benötigtem Fabrikplatz, Strom, Inputart, Stufe und möglichen Umbaupfaden. Schnellzugriff muss jederzeit zur geführten Erklärung zurückverlinken.

## G. Existierende Projekt-Daten und Grenzen

### G1. Technischer und fachlicher Bestand vom 17.10.2026

- **Live-Status:** DE `src/pages/endfield/fabrik/index.astro` und EN `src/pages/en/endfield/factory/index.astro` sind **Platzhalter**. Kein Fabrik-Progressionsassistent, keine Bibliothek und kein Produktionssimulator implementiert.
- **Komponentenmodell:** `src/lib/endfield/buildFinder.mjs` enthält `FACTORY_COMPONENT_STAGES`, derzeit:
  - Amethyst ID **525** (Gear-Levels 20/28)
  - Ferrium ID **526** (Level 36)
  - Cryston ID **527** (Level 50)
  - Xiranit ID **528** (60/70)
  - Cuprium ID **747** (70)
  - Hetonit ID **844** (70)
  - Pyrrolit ID **1067** (70)
- **Abgrenzung:** Obige Zuordnung ist die **Gear-Rezept-/Level-Sicht**, **kein** bestätigter AIC-Fortschrittsbaum. Der vorhandene Build-Finder lässt kein ungeprüftes Story-Freischalten zu.
- **Ausrüstungsdaten:** `src/data/endfield/catalog/equipment-details.json` und `src/data/endfield/catalog/items.json` enthalten offizielle Item-/Gear-Snapshots. Sie sind **kein kompletter Fabrikmaschinen-/Rezept-/Ausbaudatensatz**. Ohne Vollständigkeitsprüfung nicht als Fabrik-Produktionsengine verwenden.
- **Geografie:** `src/data/endfield/progression/story-areas.json` dokumentiert Stand 15.10.2026 die **19 offiziell bezeichneten Kartenebenen** (**Tal4 6, Wuling 13**), mehrere Missionsdaten und *separat* einen Satz offizieller Karteneinträge. Diese sind **Kartengebiete**, nicht automatisch eigene Fabrik-Ausbaustufen.
- **Gear-Kistenmarker:** `src/data/endfield/progression/gear-template-crates.json` enthält 27 Wuling-Gear-Kistenpunkte, aber die Marker sind **keine** Fabrik-Blueprint-Codes. Weder konkrete Kisteninhalte noch Fabriktechnik-Freischaltungen erfinden.
- **Quellen-/Verifikationstrennung:** `src/lib/endfield/storyAreas.mjs`, `docs/endfield-story-progression.md`, `docs/endfield-blueprint-piece-audit.md` und `docs/endfield-blueprint-research.md` enthalten vorsichtige **Ausrüstungs-/Gebiets-/Blaupausenzuordnungen**. „Gear Template Blueprint“ ist **nicht automatisch** eine importierbare AIC-Fabrikvorlage.
- **Stack:** Astro 5 + GitHub Pages, lokale strukturierte Daten und Markdown-Redaktion, kein Login nötig. DE und EN stets parallel. Zielbudgets **100 MB für Endfield-Inhalte, 1 GB Pages-Ausgabe**.

### G2. Datenquellen, die bei neuer Forschung noch fehlen

**[OFFEN]** Eigenständiger verlässlicher Katalog für:
- AIC-Forschungsgruppen, tatsächliche Prerequisite-Edges und Kosten;
- Maschinen/Anlagen, Baukosten, Energieverbrauch und Standorte;
- vollständige **Fabrikrezepte**, Durchsatz pro Maschine, Flüssigkeit/Gas, Inputs/Outputs, eventuell Fertigungszeiten;
- Minen/Rohstoffknoten, erneuerbare Quellen, begrenzte Fördermengen, Lagerkapazität und Transfers;
- PAC-/Sub-PAC-Mechanik, echte Beschränkungen sowie relevante Technologiegates;
- importierbare **Fabrik-Blueprint-Codes** und Kompatibilität;
- überprüfte Produktionsraten im Spiel, Version/Testumgebung.

Das bestehende Datenmodell darf erst um solche Inhalte erweitert werden, nachdem die Quellen und tatsächlichen Terminologien geprüft sind.

## H. Fabrik-Wissen und Troubleshooting

**[VORSCHLAG]** Nicht lange allgemeine Artikel als einzige Hilfe, sondern problembezogene Seiten, die kurz erklären und dann zu einem Bau-/Blueprint-Schritt verlinken. Erste Themenliste:

1. PAC/Sub-PAC, Platzierung, verfügbare Fläche und Stromversorgung;
2. Förderbänder, Ports, Input und Output, blockierte Ausgänge;
3. Lager/Depot, Import-/Export-/Transfer-Logik und volle Puffer;
4. Rohstoffknappheit, maximale Förderrate, Mindestinput und Produktionsengpässe;
5. Energiequellen, Batterien, Grundlast, Leistungsspitzen und Unterversorgung;
6. Pflanzen/Farming, eigene vs. fremde Ressourcen, Ernte/Verarbeitung und Nachschub;
7. Flüssigkeiten/Wasser, Richtungen und Nebenprodukte;
8. Gase und deren spätere Verarbeitung;
9. Blueprint importiert, aber Maschinen laufen nicht: Inbetriebnahme-Check;
10. Veraltete Rezepte, fehlende Forschung oder unzureichender Regionszugang.

**Didaktischer Standard pro Modul:** *Problem/Ziel → kurze Erklärung → Praxisbeispiel → Erkennungszeichen bei Fehler → konkrete Behebung → verlinkter Lernschritt/Blueprint.* Beispiele von echten Spielerfragen sammeln, ihre Verbreitung nicht ohne Belege quantifizieren.

## I. Was zunächst ausdrücklich NICHT gebaut werden soll

**[VORSCHLAG]**

- **Kein** eigener vollständiger WYSIWYG-Fabrikeditor oder visueller Blueprint-Designer als erste Ausbaustufe;
- **kein** komplexer Produktionsrechner als Einstiegsfeature; würde lückenlose Rezept-, Maschinen- und Ratenpflege und mehr Tests erfordern;
- **kein** Login, zentrale Nutzerkonten- oder Backend-Datenbank als Voraussetzung;
- **keine** pauschal als nutzbar markierten ungeprüften Community-Blueprints;
- **keine** Fabrik-Story-/Anlagen-Freischaltungen aus Gear-Level-Labels extrapolieren;
- **keine** automatisierten Fabrik-Veränderungen, solange die gemeinsame Konzeptphase pausiert.

**[OFFEN für später]** Ein kleiner bedarfsorientierter Fertigungsrechner kann nach Fertigstellung einer soliden Datenbasis sinnvoll sein, eventuell mit Rückverweis aus dem Operator-Gear-Build-Finder. Vergleichsprodukte aus der Vorrecherche: Endfield Calculator und EnKAD-AIC-Editor (siehe Quellen).

## J. Zusammenhang mit den geplanten zwei YouTube-Guides

**[BESTAND]** Zuvor wurden **zwei große deutschsprachige Fabrikvideos** diskutiert: eines für **Tal4**, eines für **Wuling**. Im früheren Video-Konzept sollte **Wuling zuerst** behandelt werden. Diese frühere *Video-Produktionsreihenfolge* ist **keine verbindliche Reihenfolge der Website-Implementierung**; der aktuelle Nutzerentscheid priorisiert die **geführte Progression** als Produktstruktur.

**[VORSCHLAG]** Website bleibt auch nach Patches als redigierbarer Wissens-/Blueprint-Katalog aktuell, während Videos die langen Zusammenhänge und Live-Demonstrationen zeigen. Eine Web-Etappe verlinkt optional auf genau das passende Videokapitel, und ein Videokapitel auf einen passenden Schritt/Code. Alles erst nach Freigabe der konkreten Video- und Blueprint-Inhalte.

## K. Quellenregister der vorherigen Recherche (zur späteren Wiederaufnahme)

**Wichtig:** Dies ist ein **konserviertes Link-/Ideenregister**, **keine aktuelle Echtzeit-Verifizierung** jedes Absatzes und keine Freigabe der darin enthaltenen Zahlen. Offizielle Patchnotes und SKPORT erhalten gegenüber Wiki-/Communityinfos Vorrang. Fachlich strittige Details erneut aufrufen und mit Spieltest belegen.

| Quelle | URL | Bisheriger Nutzen / was später zu prüfen ist |
| --- | --- | --- |
| GRYPHLINE, Regionen/AIC (offiziell) | https://endfield.gryphline.com/en-us/news/1340 | Tal4/Wuling, Infrastruktur und Regionentrennung; konkrete AIC-Mechaniken prüfen |
| GRYPHLINE, AIC-/Regionserweiterungen (offiziell) | https://endfield.gryphline.com/en-us/news/5200 | Früher Wuling-Zugang und spätere Industrie-/Gasmechaniken; exakte Voraussetzungen nachlesen |
| GRYPHLINE, Developer Communication 2026-10-07 (offiziell) | https://endfield.gryphline.com/en-us/news/7014 | v1.6-Fabrik-/Farm- und Lebensqualitätsänderungen; echte Maschinen-/Forschungsdetails prüfen |
| GRYPHLINE, v1.6 Release Notes (offiziell) | https://endfield.gryphline.com/en-us/news/9560 | Aktuellster Stand zu v1.6; keine Freischaltkette allein aus Veröffentlichungsdatum ableiten |
| Offiziell verlinkte SKPORT Map Tools | https://game.skport.com/map/endfield | Regionen/Standorte, aber nicht AIC-Maschinen- oder Fabrikcode-Liste |
| Community-Wiki, AIC Factory Plan | https://endfield.wiki.gg/wiki/AIC_Factory_Plan | Mögliche Forschungsplan-/Abhängigkeitsgliederung; gegen Spiel prüfen |
| Community-Wiki, Simulation | https://endfield.wiki.gg/wiki/Simulation | Verfügbare Spielübungen/Tutorials recherchieren, für Lernpfade auswerten |
| Mobalytics, Fabrikblueprints | https://mobalytics.gg/arknights-endfield/bases/blueprints | Vergleich von Progressions- und Blueprint-Darstellung; keine ungeprüften Codes übernehmen |
| Mobalytics, weiterführende Fabrik-Anleitungen | https://mobalytics.gg/arknights-endfield/ | Lernbeispiele zu Engpässen/Produktionslinien; genaue Artikel später neu heraussuchen |
| Endfield Calculator | https://www.endfieldcalculator.com/ | Funktionsvergleich Produktionsrechner, Datenpflegeaufwand beurteilen |
| EnKAD AIC | https://beta.enka.network/endfield/aic/ | Vergleich visueller Fabrik-/Blueprinteditoren; bewusst nicht Startumfang |
| Communitydiskussionen | https://www.reddit.com/r/ArknightsEndfield/ | Häufige Praxisfehler, Wuling-Transfers, Strom und unerklärte Stopps; Einzelfragen anhand konkreter Threads nachprüfen |

**Beobachtungen aus voriger Recherche, die noch keinen exakten Quellenbeleg pro Einzelsatz haben:** Spieler empfinden die Komplexität/Spielerklärung teilweise als Hürde; fortgeschrittene Blueprints setzen zu viel Forschung voraus; typische Probleme mit Strom, Bandanschlüssen, Depots, Wasser/Gas und Übergang nach Wuling. Dies sind **Themenhypothesen für UX und Recherche**, keine quantitativen Befunde und keine verbindlichen Spielregeln.

## L. Entscheidungsprotokoll – klar trennen

| Thema | Stand 17.10.2026 |
| --- | --- |
| **Grundform des Website-Bereichs** | **[ENTSCHEIDUNG] Geführter, fortschrittsabhängiger Fabrik-Guide als Primärangebot.** |
| Alternative Blueprint-Bibliothek | **[VORSCHLAG] Ergänzender direkt erreichbarer Katalog, eingebettet in Lernpfad.** |
| Regionaler Split | **[BESTAND/PRODUKTWUNSCH] Tal4 und Wuling getrennt erklären, zusammenhängend behandeln.** |
| Plug-&-Play | **[BESTAND/PRODUKTWUNSCH] Testbare leicht kopierbare Blueprints für Menschen ohne vertiefte AIC-Kenntnisse.** |
| Fünf Unterbereiche | **[VORSCHLAG] Noch keine Layout-/Routing-Freigabe.** |
| Selbstdiagnose/Frageassistent | **[VORSCHLAG] Noch keine Daten-/UI-Entscheidung.** |
| Exakte Progressionsstufen | **[OFFEN] Forschungs-/Storygates und Rezeptwerte erst verifizieren.** |
| Eigene oder Community-Blueprints | **[OFFEN] Redaktionelle Prüf-/Credit-Regeln und Tests festlegen.** |
| Eigenständiger grafischer Fabrikplaner | **[VORSCHLAG] Nicht Bestandteil der ersten Umsetzungsphase.** |
| Erste Video-Umsetzung | **[BESTAND aus früherem Video-Konzept] Wuling war als erstes Video vorgesehen; noch nicht neu bestätigt.** |
| **Zeitpunkt der weiteren Bearbeitung** | **[ENTSCHEIDUNG] Auf unbestimmte Zeit verschoben. Erst nach neuem Auftrag weiter planen/implementieren.** |

## M. Wiedereinstieg: offene Diskussion – KEIN Arbeitsauftrag für jetzt

Wenn der Betreiber die Fabrik später wieder aufgreift, sollte die nächste Unterhaltung mit dem **inhaltlichen Modell der Spielerreise** beginnen, nicht sofort mit Code.

Empfohlene Reihenfolge der Gespräche (nur Vorschlag):

1. **Spielerreise/Regionen**: Ab welchem tatsächlichen Story-/AIC-Stand können Spieler Tal4 und Wuling sinnvoll beginnen? An welcher Stelle verzweigen?
2. **Produktionsziele**: Welche praktischen Outputs haben pro freigeschalteter Stufe Vorrang (z. B. Strom, Heilmittel, Komponenten, regionale Exporte)? Redaktionell mit Betreiber entscheiden.
3. **Technik-Freischaltungen**: Welche Maschinen, Forschungsknoten, Rechenwerte, Ressourcen und Fabrikbauteile sind zu welchem Moment **wirklich** verfügbar? Beleg- und Testmatrix aufbauen.
4. **Blueprint-Paket**: Für jede Etappe wirklich nachbaubaren Betreiber-Blueprint oder unabhängig getestete Community-Vorlage samt Setup, Servercode und gemessenen Raten auswählen.
5. **Lernabschnitte und Troubleshooting**: Nutzerfragen, fachliche Erklärungen und Video-Bezüge sortieren.
6. **Information Architecture & UI**: Erst dann genauen Aufbau von Übersicht, Guide, Lernkapiteln, Bibliothek und ggf. Status-Picker gemeinsam absegnen.
7. **Späterer Projektstart nach ausdrücklichem Go:** Konkrete Dateischemata, Datenvalidatoren, DE/EN-Gleichheit, mobile QA, Budgetberechnung, Roadmap-/CI-/Deployment-Protokoll.

**Stop-Signal:** Dieses Archiv ist lediglich eine **Konservierung aller bisher besprochenen Recherchen, Produktideen, Architekturoptionen und bekannten Quell-Lücken**. Bis zur Wiederaufnahme **keine weiteren Änderungen am Fabrik-Webbereich veranlassen und keinen Freigabestatus fingieren**.
