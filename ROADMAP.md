# AG0N1ST.COM – PROJEKT-ROADMAP, ENTWICKLUNGSSTAND & KI-ÜBERGABE

> **Zentrale Projektdokumentation / Single Point of Entry.**  
> **Stand:** 15. Oktober 2026 (Europe/Berlin).  
> **Projekt:** Ag0n1st – deutschsprachiges Gaming-/Guide-Portal.  
> **Repository:** https://github.com/Ag0n1st/ag0n1st.github.io  
> **Produktionswebsite:** https://ag0n1st.com (eigene Domain), alternativ https://ag0n1st.github.io  
> **Hauptbranch:** `main`. Die zuletzt vor dieser Roadmap integrierte Funktion ist der Story-/Gebietsfilter aus **PR #12**, Merge-Commit `631980a`.  
> **Zuletzt zusätzlich beauftragt:** Autoritätslevel maximal **60** und diese Übergabe-/Roadmap-Datei.  
> **Wichtig:** Bei jeder folgenden Entwicklungsphase diese Datei und das tatsächliche Repository **gemeinsam** prüfen. GitHub-Code und erfolgreiche CI-Läufe sind der Nachweis für Implementierungen; die Roadmap ist die verbindliche Sammlung von Anforderungen, Entscheidungen, Aufgaben und Übergabehinweisen.

## 0. SOFORTSTART: NEUER CHAT / ANDERE KI

### 0.1 Startanweisung, die kopiert werden kann

> Wir entwickeln meine Website **Ag0n1st** weiter: Astro auf GitHub Pages, Repository `Ag0n1st/ag0n1st.github.io`, Branch `main`, Website `ag0n1st.com`. Bitte öffne zuerst die **aktuelle `ROADMAP.md` im Repository**, lies zusätzlich die darin verlinkten Fachdokumente für die konkret nächste Aufgabe, prüfe den GitHub-`main`-Stand sowie offene Pull Requests und setze bei „Aktueller Übergabepunkt“ fort. Halte dich an die dokumentierten Architektur-, Quellen- und Designregeln. **Nichts nur aufgrund der Roadmap als implementiert annehmen, sondern im Code verifizieren.** Arbeite für größere Änderungen mit Branch → Tests → Pull Request → Merge → erfolgreicher Pages-Deploy. Aktualisiere am Ende die Roadmap einschließlich neuer Entscheidungen, Dateien, Testergebnisse und nächster Schritte. Keine unbestätigten Gamedaten oder redaktionellen Builds erfinden.

### 0.2 Schnellorientierung in unter fünf Minuten

| Frage | Antwort / maßgebliche Stelle |
| --- | --- |
| Was ist das Produkt? | Deutsches Creator-Portal mit Anleitungen, Spiele-Nachschlagewerken, interaktiven Tools, Streams und Videos. |
| Was ist aktuell der Schwerpunkt? | **Arknights: Endfield** → Operator-Guides, SKPORT-Daten, Ausrüstung und Build-Finder. |
| Wo liegt die Arbeit? | Öffentliches GitHub-Repo `Ag0n1st/ag0n1st.github.io`; lokales Arbeiten mit VS Code und GitHub Desktop möglich. |
| Welcher Branch? | Normalerweise `main`; komplexe Änderungen zuerst in einem Feature-Branch, danach Merge. |
| Welche Technologie? | Astro 5, HTML/CSS, wenig clientseitiges TypeScript/JavaScript; GitHub Pages per Actions. |
| Was ist tatsächlich funktional? | Landing, Endfield-Übersicht, Operatoren-Karten & neunteiliges Guide-Framework, lokale SKPORT-Daten, Build-Finder-Level/Fabrik/Region/Gebiete/Blaupausen. |
| Was ist inhaltlich noch leer? | Echte redaktionelle Builds/Teams/Wertungen der Operatoren; mehrere Endfield-Toolseiten; Neverness to Everness; About. |
| Was nicht verändern? | Öffentlich sichtbare Texte nicht aus Fantasie erstellen; kein Pflicht-Login; keine externe Datenbank zur normalen Anzeige; 100-MB-Endfield-Dateibudget. |
| Wo liegen die Endfield-Spieldaten? | `src/data/endfield/`; offizielle Daten in `catalog/`, `operators/`; explizit recherchierte Community-Daten in `progression/`. |
| Wo liegen persönliche Guide-Texte? | `src/content/operator-guides/<slug>.md`; Vorlage `_template.md`. |
| Wie heißt der zentrale UI-Bereich? | `src/components/operator/sections/OperatorEquipment.astro`; Browserinteraktionen in `src/components/operator/OperatorGuide.astro`. |
| Welche Tests? | `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build`. |
| Was ist aktuell als Nächstes sinnvoll? | **Erste redaktionelle, vom Creator bestätigte Liino-Builds** und deren Funktionsprüfung im neuen Finder; danach Story-/Blaupausen-Feinheiten und weitere Operator-Guides. |
| Stand Authority? | Obergrenze **60**, inklusive HTML-Feld, gespeicherten Eingaben und Auswertelogik; bei künftiger Erhöhung zentral anpassen. |

**Diese Datei ist kein Ersatz für die Dateien im Repository.** Wo der Code und die Roadmap abweichen, nicht stillschweigend „korrigieren“: Diskrepanz feststellen, Ursache prüfen, dem Nutzer erläutern, dann dokumentiert ändern.

### 0.3 Status-Vokabular für diese Datei

- **[FERTIG]**: im Repository implementiert und in `main`; mindestens Build-/Testprüfung absolviert.
- **[TEILWEISE]**: technische Basis existiert, aber Inhalt, Daten oder Funktionen fehlen.
- **[RECHERCHE]**: Hinweise/Datensätze sind vorhanden, aber bewusst nicht vollständig verifiziert.
- **[GEPLANT]**: Nutzerwunsch oder aus der Architektur abgeleiteter Arbeitspunkt; noch keine vollständige Implementierung.
- **[OFFEN / PRÜFEN]**: konkrete Unsicherheit, Fehlergefahr oder notwendige Entscheidung.
- **[NICHT GEPLANT]**: bewusster Ausschluss, außer der Nutzer revidiert die Entscheidung.

Die Kennzeichnungen beziehen sich auf den **Stand vom 15.10.2026**. Alte Abschnitte werden bei Änderungen nicht ungeprüft weiterkopiert.

---

## 1. VISION, ZIELGRUPPE UND NICHT VERHANDELBARE VORGABEN

### 1.1 Produktidee

Die Website ist die langfristige, auffindbare Wissensplattform rund um die Streams, YouTube-Guides, Showcases und das Theorycrafting von **Ag0n1st**. Der Content ist **Deutsch zuerst**, richtet sich insbesondere an deutschsprachige Spieler von Gacha-/Anime-Action-RPGs und soll mehr leisten als eine Link-Sammlung:

1. **Praxistaugliches Nachschlagewerk**: Mechaniken, Fertigkeiten, Builds, Sets, Teams, Fortschritt, passende Videos.
2. **Fortschrittsorientierte Hilfen**: Empfehlungen müssen zu Level, Fabrikausbau, Story und tatsächlich verfügbaren Ressourcen passen.
3. **Transparente Herkunft von Informationen**: Offizielle Spieldaten vs. Community-Recherche vs. subjektive Creator-Bewertung sichtbar trennen.
4. **Leicht eigenständig redigierbar**: neue Guides und Empfehlungen mittels Markdown/YAML/JSON und Dateikopie; kein CMS-Login nur für den Betreiber.
5. **Geringe Betriebs-/Abhängigkeitkosten**: statisch ausgelieferte Seiten, GitHub Pages, kein Laufzeit-Backend für Guides oder Nutzerkonten.
6. **Content-Verbindung**: Texte dienen als eigenständige Nachschlagewerke; Twitch/YouTube als ergänzende Live-/Video-Kanäle, nicht als einzige Informationsquelle.

### 1.2 Priorität der Spiele und Website-Bereiche

1. **Arknights: Endfield**: aktueller Hauptschwerpunkt und zuerst tief ausbauen.
2. **Neverness to Everness (NTE)**: eigener Website-Bereich und später vergleichbares, aber spielangepasstes System.
3. **Startseite/Branding**: stabile zentrale Navigation, Twitch/YouTube, redaktionelle Highlights.
4. **About Me / Kooperationen**: Creator-Profil und professionelle Anlaufstelle, später ergänzen.
5. **Weitere Spiele**: erst nach konkreter Nutzerentscheidung, nicht automatisch neue Rubriken eröffnen.

### 1.3 Verbindliche Produkt-/Designpräferenzen

- **Deutsch** als Primärsprache; Mehrsprachigkeit langfristig vorbereiten, nicht automatisch undurchsichtig übersetzen.
- **Dark-Gaming-Portal** mit **Magenta/Pink und Cyan** als CI-Akzenten; **Geist 400/700**.
- Gleiche visuelle Grundsprache über alle Spiele hinweg; **spielspezifische Akzente** möglich.
- Navigation: Logo/Wordmark links; Hauptlinks **Arknights: Endfield**, **Neverness to Everness**, **About Me**; Endfield-Zweitnavigation unter dem Hauptheader.
- Responsive Desktop/Mobile, auf kleinen Displays keine abgeschnittenen Texte/Karten, lesbare Formularbeschriftungen, Tastaturbedienung und sinnvolle Fokuszustände.
- Im Chat zur Websiteentwicklung **Text, Code und Links**, keine automatisch erstellten Bilder oder Assets. Neue Bilder nur auf ausdrücklichen Auftrag; bis dahin Platzhalter nutzen.
- Keine ungefragten neuen Logos/Texte/Branding-Elemente.
- Spielerorientierte Begriffe: **Operatoren** (nicht mehr „Charaktere“ in der Endfield-Navigation); offizielle IDs als Schlüssel, nicht künstlich umbenannte Übersetzungs-IDs.
- Echte Quellenbelege vor Annahmen. Wenn etwas unsicher ist, im Datensatz kenntlich machen.
- Persönliche Bewertungen, Teambuilds, Skill-Prioritäten, Prozentvergleiche, Pull-Empfehlungen **nur redaktionell vom Creator oder auf ausdrücklich gewünschter, nachvollziehbarer Analysebasis**. Keine erfundenen Beispiel-Meta-Builds veröffentlichen.
- Spielwerte und Herstellungskosten dürfen durch neue Imports aktualisiert werden; **niemals eigene redaktionelle Texte dabei überschreiben**.

### 1.4 Klare Ausschlüsse / bevorzugte Lösungen

| Thema | Vorgabe |
| --- | --- |
| Webseiten-CMS | **Kein eigener Admin-Login** nur zum Einpflegen; Git/VS Code + Markdown/YAML/JSON genügt. |
| Nutzerfortschritt | Vorzugsweise **lokaler Browser-`localStorage`**, ohne Konto; Transparenz über Gerätebindung. |
| Speedruns | **Eigene Runs/YouTube-Playlist**, keine offene Community-Rangliste. |
| Assets | Statische WebP-Icons und ausgewählte Operator-Cover; keine GIF-/Videodateien in Endfield importieren. |
| Abhängigkeit der Website | Kein benötigter SKPORT-API-Call im Browser zur Laufzeit; Snapshots bei Build/Import versionieren. |
| Gamedaten | **Offizielle SKPORT-Wiki** als Quelle für objektive Stammdaten und Rezepte; Community für begründete, getrennt gekennzeichnete Fundorthinweise. |
| Unsicherheit | Unbekannte Daten bleiben `unknown`/`unverified`/`incomplete`; nicht implizit als freigeschaltet interpretieren. |
| Datenbudget | Endfield-bezogene **tracked working-tree Dateien ≤ 100.000.000 Byte**; Test vor jedem Merge/Deploy. |

---

## 2. REPOSITORY, DOMAIN, INFRASTRUKTUR UND WORKFLOWS

### 2.1 Technischer Stand [FERTIG]

- **Repository:** https://github.com/Ag0n1st/ag0n1st.github.io (öffentlich).
- **Primärbranch:** `main`, PR-basierte Änderungen; GitHub Desktop für Pull/Commit/Push möglich.
- **Astro:** Paket aus `package.json`, aktuell Major-Version **5**, bundler-/buildbasiert; Seite ohne serverseitige Sessions.
- **Konfiguration:** `astro.config.mjs` → aktuell `site: "https://ag0n1st.github.io"` und `base: "/"`. **Achtung:** Bei SEO-/Canonical-Arbeit eigene Domain und diese Einstellung gemeinsam prüfen.
- **Hosting:** GitHub Pages mit GitHub Actions als Veröffentlichungsquelle. Workflow `.github/workflows/deploy.yml` (bei Push auf `main`, manuell und zusätzlich Zeitplan alle sechs Stunden).
- **PR-Prüfung:** `.github/workflows/validate-astro.yml`; `npm ci`, Endfield-Tests, 100-MB-Kontrolle, Astro-Build.
- **Vorschau lokal:** `npm run dev`. Statische Produktionsansicht via `npm run build` und `npm run preview`.
- **Schreibplattform:** Windows 11, Visual Studio Code und GitHub Desktop; in früheren lokalen Sitzungen konnte `npm.ps1` durch PowerShell ExecutionPolicy blockiert sein (dann CMD oder eine zulässige lokale Lösung nutzen).
- **Offizielle Domain:** `ag0n1st.com` über Cloudflare Registrar. Custom-Domain/DNS/HTTPS wurden im Projektverlauf eingerichtet. Bei Änderungen in DNS oder Pages immer **GitHub Settings → Pages** und den Live-HTTPS-Endpunkt verifizieren, nicht nur frühere Aussagen zitieren.
- **Keine Laufzeitdatenbank**, keine Nutzerauthentifizierung für den normalen Sitebetrieb.

### 2.2 Entwicklungsbefehle

~~~bash
npm ci
npm run dev

npm run test:endfield
node scripts/endfield/check-budget.mjs
npm run build
npm run preview
~~~

`npm run test:endfield` führt alle `scripts/endfield/*.test.mjs` per Node-Test-Runner aus. Änderungen an der Datenstruktur, an Importern, am Build-Finder und an der Quelle-zu-ID-Zuordnung benötigen Regressionstests.

### 2.3 Grenzen und Speicherberechnung

- **Verbindliches eigenes Endfield-Budget:** **100 MB dezimal = 100.000.000 Byte**.
- Prüfung in `scripts/endfield/check-budget.mjs` zählt definierte Endfield-Verzeichnisse plus einzelne Style-/Nav-Dateien.
- **Nicht dasselbe wie:** Größe der gesamten Repository-Git-Historie, Gesamtgröße von GitHub Pages, Git-LFS-Quota oder eine angebliche feste Dateianzahlbegrenzung.
- Ein Datei-Umzug ohne Duplikation vergrößert den **aktuellen Arbeitsbaum** nicht wesentlich, kann aber zusätzliche Git-History-Objekte erzeugen. Alte Commits sind nicht in der 100-MB-Anzeige des Prüfscripts enthalten.
- Snapshot vor dieser Roadmap: Bilddateien unter `public/images/endfield/` insgesamt **950 Dateien**, rund **16,54 MB** reine Bilder. Der zuletzt vor diesem Task geprüfte vollständige Endfield-Bereich lag bei etwa **20,29 MB/100 MB**; bei jedem Build die **neue exakte Messung** heranziehen.
- Große Bilder weiterhin komprimieren und nicht unnötig erneut committen. Cache-/Import-Actions dürfen keine undokumentierten Massen-Downloads ins Repo schreiben.

### 2.4 Sicherheits-/Datenschutzgrundsätze

- Repository ist **öffentlich**. Keine Passwörter, Cookies, Auth-Header, Token, privaten Browser-HARs, Kontodaten, Kontaktinformationen Dritter oder sonstige Geheimnisse committen.
- `local-data/` ist in `.gitignore` ausgeschlossen und für öffentliche Roh-Responses/Kontrollimporte gedacht.
- Für offizielle SKPORT-Quellen **nur öffentliche/anonyme** Endpunkte; keinen Login automatisieren.
- Browser-`localStorage` enthält Fortschrittsauswahl ausschließlich **lokal pro Browser/Gerät**; keine Kontensynchronisation behaupten.
- Drittquellen verlinken statt fremde Screenshots/Bilder oder komplette Texte ungeprüft zu vervielfältigen.
- Preview-/Diagnostics-/Research-Actions bei Bedarf temporär auf separatem Branch ausführen und nach Übernahme der belegten Daten entfernen.

### 2.5 Wichtige Dateien außerhalb Endfield

| Ort | Rolle | Status |
| --- | --- | --- |
| `src/pages/index.astro` | Landingpage, Header, Hero, Twitch, Beiträge, letzte YouTube-Videos | [FERTIG als Grundversion] |
| `src/pages/endfield.astro` | Endfield-Landing/Teaser | [FERTIG als Grundversion] |
| `src/pages/nte.astro` | NTE-Platzhalter | [TEILWEISE] |
| `src/pages/about.astro` | About-Platzhalter | [TEILWEISE] |
| `src/pages/posts/[slug].astro` | Einzelne Beiträge aus der Posts-Collection | [TEILWEISE] |
| `src/content/config.ts` | Astro-Collections `posts` und `operator-guides` | [FERTIG] |
| `src/styles/global.css` | Gemeinsame Farb-/Typo-/Header-Stile | [FERTIG als Grundlage] |
| `src/components/EndfieldNav.astro` | 9 Reiter im Endfield-Bereich | [FERTIG] |
| `public/images/` | Brand-/Portalassets und kategorisierte Endfield-Bilder | [TEILWEISE, laufend erweiterbar] |

**Wichtig für neue KIs:** Im Repository existieren außerdem ältere Root-Dateien (`index.html`, `css/` etc.). Für die aktuelle Astro-Website primär `src/pages/`, `src/components/` und `src/styles/` bearbeiten. Ältere Dateien nur ändern, wenn tatsächlich noch ein Build-/Deploy-Pfad davon abhängt.

---

## 3. HISTORIE / TATSÄCHLICH DURCHGEFÜHRTE ARBEIT

Die folgende Tabelle ist die bisherige belegte PR-/Commit-Kette. Sie dient dazu, ursprüngliche Motive, Umbauten und bereits gelöste Probleme nachzuschlagen. **Nicht alle experimentellen Branches wurden gemergt.**

| PR | Was geleistet wurde | Status |
| --- | --- | --- |
| [#1](https://github.com/Ag0n1st/ag0n1st.github.io/pull/1) | Landingpage als Astro-Grundgerüst mit Portalnavigation erneuert. | [FERTIG, merged 10.10.2026] |
| [#2](https://github.com/Ag0n1st/ag0n1st.github.io/pull/2) | Modulare neun Abschnitte umfassende Operator-Guide-Vorlage; konsistente Namenskonvention. | [FERTIG, merged 15.10.2026] |
| [#3](https://github.com/Ag0n1st/ag0n1st.github.io/pull/3) | Recherche zu öffentlichem SKPORT-Waffen-/Ausrüstungskatalog. | **[OFFEN, nicht merged]**; prüfen, ob obsolet, bevor fortgeführt. |
| [#4](https://github.com/Ag0n1st/ag0n1st.github.io/pull/4) | 940 offizielle Item-IDs, WebP-Bibliothek und 100-MB-Grenze. | [FERTIG, merged] |
| [#5](https://github.com/Ag0n1st/ag0n1st.github.io/pull/5) | Offizielle Waffen-/Ausrüstungsdetails und Herstellungskosten importiert. | [FERTIG, merged] |
| [#6](https://github.com/Ag0n1st/ag0n1st.github.io/pull/6) | Ursprünglicher Level-/Fabrikfilter. | [FERTIG, später fachlich erweitert] |
| [#7](https://github.com/Ag0n1st/ag0n1st.github.io/pull/7) | Ersetzt grobe Fabrikabstufung durch sieben Komponenten. | [FERTIG, merged] |
| [#8](https://github.com/Ag0n1st/ag0n1st.github.io/pull/8) | Bilder von Sammelordner nach Operatoren/Waffen/Gear/Materialien/Valuables sortiert, ohne Duplikat-Bilder. | [FERTIG, merged] |
| [#9](https://github.com/Ag0n1st/ag0n1st.github.io/pull/9) | Offizielle 19 Kartenebenen, 27 Wuling-Kistenmarker und Erwerbsartregister. | [FERTIG, merged] |
| [#10](https://github.com/Ag0n1st/ag0n1st.github.io/pull/10) | Community-Kisten-/Set-Recherche, 100 grobe Kandidaten. | [FERTIG als historischer Fallback] |
| [#11](https://github.com/Ag0n1st/ag0n1st.github.io/pull/11) | Konkrete Einzelteile aus Kisten-Iconlinks, Abgleich mit zweiter Datenbank und Konfliktberichten. | [FERTIG, merged] |
| [#12](https://github.com/Ag0n1st/ag0n1st.github.io/pull/12) | Tatsächlicher Story-/Gebiets-/Blaupausen-Filter inklusive `localStorage`. | [FERTIG, merged] |
| **Roadmap + Authority max. 60** | Zentrale KI-Übergabe, Dokumentationsprozess, strikte 60er-Grenze. | **Diese aktuelle Entwicklungsphase**; Commit-/PR-Nummer nach Merge im Übergabepunkt ergänzen. |

### 3.1 Frühe Produktentscheidungen, die erhalten bleiben sollen

- Von generischen Website-Buildern auf **Astro + GitHub Pages** gewechselt, damit flexible, vollständig kontrollierbare Guides und Tools möglich sind.
- Content aus Text-/Datendateien statt nur in einer grafischen Website-Oberfläche pflegen.
- **Operatoren-Kartenraster** als Einstieg, nicht primär eine reine Tabellenliste.
- Guide als **Wissensportal** mit neun wiederverwendbaren Sektionen, nicht nur eingebettetes YouTube-Video.
- **Komplexe Spiel-Datenstruktur** von redaktioneller Beurteilung entkoppeln; Importer frühzeitig auf zwei echte Operatoren testen.
- **Mobile-first-Korrektheit** bei wichtigen Profil-/Video-Sektionen: Desktop 50/50, Mobil Profil vor Video.
- Kein erfundenes Endgame-„bestes Set“, wenn dafür Quellen, Tests oder Creator-Entscheidungen fehlen.
- Bei Ausrüstung Nicht-Spielstand-abhängige Empfehlungen vermeiden: Story und tatsächlicher Fabrikausbau müssen berücksichtigt werden.
- Früheres allgemeines `items/`-Bildverzeichnis wurde nach userseitigem Hinweis **kategorisiert**. Keine erneute Sammlung unterschiedlicher Bildtypen in einem unklaren Ordner.

---

## 4. AKTUELLER PRODUKTSTATUS JE NAVIGATIONSSEITE

| Website-Bereich / Route | Implementierungsstatus | Konkret vorhanden | Was fehlt / nächste Maßnahme |
| --- | --- | --- | --- |
| **Startseite** `/` | [FERTIG als erste Version] | Hero, Twitch-Integration/Offline-Container, letzte Videos, Beitragskarten, Hauptnavigation, Footer. | Crossbrowser-Checks Live/Autoplay/Audio, SEO-Feinschliff, echte Beiträge, Änderungsmanagement. |
| **Endfield-Übersicht** `/endfield/` | [FERTIG als Grundversion] | Landing-Texte, Links zu Guide- und Tool-Bereichen; Zweitnavigation. | Mit echten fertigen Guides und Tools inhaltlich aktualisieren. |
| **Operatoren** `/endfield/operatoren/` | [FERTIG als Framework] | Kartenraster, lokales Cover, Klasse/Element/Seltenheit/Waffentyp, Preview-Kennzeichen. | Weitere Operatoren importieren, echte Guides ausbauen. |
| **Operator-Guide** `/endfield/operatoren/<slug>/` | [TEILWEISE] | 9-Abschnitte-Modell, offizielle Werte für Liino/Typhoeus, Source-/Material-/Stats-Anzeigen, Build-Finder. | Eigene Wertungen/Teams/Builds, weitere Operatoren, UI-/A11y-Feinschliff. |
| **Fabrik** `/endfield/fabrik/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Vollständige Tal4-/Wuling-Guides, Fortschrittsstufen, Plug-&-Play-Blueprints. |
| **Rekrutierung** `/endfield/rekrutierung/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Systemerklärung, Quoten/Fälle nur mit belastbaren Daten, Video-Integration. |
| **Veredelung** `/endfield/veredelung/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Werte, Schritte, Materialien, Anwendungsfälle und Fehlervermeidung. |
| **Essenzen** `/endfield/essenzen/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Erwerb, Werte, Zuordnung, Such-/Filterhilfen. |
| **Speedruns** `/endfield/speedruns/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Eigene Bossruns, Zeiten, Regeln, Filter und YouTube-Links. |
| **Checkliste** `/endfield/checkliste/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Daily-/Weekly-Aufgaben, lokale Speicherung, Reset-Regeln. |
| **Countdown** `/endfield/countdown/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Offiziell belegbare Patchzeitpunkte, Zeitzone, UTC-/Sommerzeit-Logik. |
| **NTE** `/nte/` | [TEILWEISE/PLATZHALTER] | Eigene Seite, Navigation, Grundstil. | Eigene inhaltliche Informationsarchitektur, Guide-/Story-/Progressionssysteme. |
| **About** `/about/` | [TEILWEISE/PLATZHALTER] | Eigenständige Seite im CI-Stil. | Creator-Profil, Kooperationen und Kontaktinformationen nach Freigabe. |
| **Beiträge** `/posts/<slug>/` | [TEILWEISE] | Collection und Seitenroute. | Redaktionelle Beiträge, Teaser, SEO/Struktur. |

**Es sind aktuell keine redaktionellen Ausrüstungs-Builds in `liino.md` und `typhoeus.md` eingetragen** (`equipment.builds: []`). Deshalb lassen sich in der Live-Oberfläche noch keine echten vollständigen Buildvorschläge demonstrieren; die Filterlogik wurde mit Tests und einer temporären Browserprüfung validiert. Diesen Sachverhalt in neuen Chats nicht übersehen.

---
