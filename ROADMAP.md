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

## 5. ARCHITEKTUR: CODE-, DATEN- UND VERANTWORTUNGSSCHICHTEN

### 5.1 Architekturgrundsatz: vier getrennte Datenebenen

1. **Offizielle objektive Spieldaten**: SKPORT-Snapshots (IDs, Seltenheit, Element, Skills, Stats, Materialkosten, Standardrezepte, offizielle Erwerbsweg-Texte). **Dürfen** durch überprüfbare Imports neu erzeugt werden.
2. **Community-Recherche und Quellenbelege**: mögliche konkrete Kistenstandorte, Inhaltslisten, individuell berichtete Fundorte und Story-Hinweise. **Müssen** Quellenqualität, Konflikte und Prüfstatus behalten; dürfen offizielle Daten nicht still überschreiben.
3. **Redaktionelle Creator-Ebene**: eigene Empfehlungen, Einschätzungen, Skill-/Team-/Build-Prioritäten, Videolinks, Prozentvergleiche mit Vergleichsbedingungen. **Darf nicht** beim automatischen Spieldatenimport verändert werden.
4. **Lokaler persönlicher Fortschritt des Besuchers**: Storyregion, freigeschaltete Gebiete, bestätigter Blaupausenbesitz und optionale Stufen im `localStorage`. **Darf nicht** als offizielle Tatsache über Spielmechaniken gespeichert/veröffentlicht werden.

**Abhängigkeit:** Objektive Daten + redaktionelle Einträge + optionale Community-Fundortbelege → Astro-Seite; lokale Fortschrittsauswahl → clientseitige Filterentscheidung. Keine öffentliche, persistente Multiplayer-/Nutzer-Datenbank.

### 5.2 Wichtigster Verzeichnisplan (tatsächlich vorhanden)

~~~text
/
├── ROADMAP.md                              # diese Datei, zentrale Übergabe
├── README.md                               # kurzer Setup-Einstieg
├── astro.config.mjs                       # Astro-site/base
├── package.json / package-lock.json
├── .gitignore                              # local-data ausgeschlossen
├── .github/workflows/
│   ├── deploy.yml                         # main -> GitHub Pages
│   ├── validate-astro.yml                 # PR-Tests
│   ├── import-endfield-catalog-assets.yml # manueller Katalogbildimport
│   ├── import-endfield-equipment.yml      # manueller Waffen-/Gearimport
│   ├── import-official-gear-map.yml       # offizieller Kartensnapshot
│   ├── probe-liino-wiki.yml               # vorhandene Probe-Action, prüfen vor Nutzung
│   └── sync-endfield-assets.yml           # WebP-Synchronisierung
├── docs/
│   ├── operator-guide-workflow.md
│   ├── endfield-story-progression.md
│   ├── endfield-story-build-filter.md
│   ├── endfield-blueprint-research.md
│   └── endfield-blueprint-piece-audit.md
├── src/
│   ├── pages/
│   │   ├── index.astro                    # Homepage
│   │   ├── endfield.astro                 # Endfield-Übersicht
│   │   ├── nte.astro                      # NTE-Platzhalter
│   │   ├── about.astro                    # About-Platzhalter
│   │   ├── posts/[slug].astro
│   │   └── endfield/
│   │       ├── operatoren/index.astro
│   │       ├── operatoren/[slug].astro
│   │       ├── charaktere/...             # alte Redirect-Routen
│   │       ├── fabrik/index.astro
│   │       ├── rekrutierung/index.astro
│   │       ├── veredelung/index.astro
│   │       ├── essenzen/index.astro
│   │       ├── speedruns/index.astro
│   │       ├── checkliste/index.astro
│   │       └── countdown/index.astro
│   ├── components/
│   │   ├── EndfieldNav.astro
│   │   ├── endfield/ItemIcon.astro
│   │   ├── endfield/MaterialCosts.astro
│   │   └── operator/
│   │       ├── OperatorGuide.astro
│   │       └── sections/
│   │           ├── OperatorOverview.astro
│   │           ├── OperatorKit.astro
│   │           ├── OperatorSkills.astro
│   │           ├── OperatorWeapons.astro
│   │           ├── OperatorEquipment.astro
│   │           ├── OperatorPotentials.astro
│   │           ├── OperatorTeams.astro
│   │           ├── OperatorGameplay.astro
│   │           └── OperatorConclusion.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── operatorGuideSchema.ts
│   │   └── operator-guides/
│   │       ├── _template.md
│   │       ├── liino.md
│   │       └── typhoeus.md
│   ├── data/endfield/
│   │   ├── catalog/items.json
│   │   ├── catalog/equipment-details.json
│   │   ├── operators/{liino,typhoeus}.json
│   │   ├── operators/{liino,typhoeus}.extra.json
│   │   ├── locales/de/{liino,typhoeus}.json
│   │   └── progression/
│   │       ├── story-areas.json
│   │       ├── gear-template-crates.json
│   │       ├── blueprint-community-claims.json
│   │       ├── blueprint-research-index.json
│   │       ├── blueprint-wiki-crate-contents.json
│   │       ├── gear-piece-acquisition-sources.json
│   │       ├── blueprint-precise-gear-index.json
│   │       └── blueprint-confirmations.json
│   ├── lib/endfield/
│   │   ├── operatorData.ts / operatorLocale.ts
│   │   ├── operatorAssets.ts / operatorGuideModel.ts
│   │   ├── itemCatalog.ts / equipmentDetails.ts
│   │   ├── blueprintResearch.mjs / preciseBlueprints.mjs
│   │   ├── gearBlueprintResearch.ts / blueprintConfirmations.mjs
│   │   ├── storyAreas.mjs
│   │   ├── buildFinder.mjs
│   │   └── buildStoryProgress.mjs
│   └── styles/
│       ├── global.css
│       └── operator-guides.css
├── public/images/endfield/
│   ├── operators/                       # Operator-Cover und icons/
│   ├── weapons/                         # Waffen-Icons
│   ├── gear/                            # konkrete Ausrüstungsteil-Icons
│   ├── materials/                       # Item Files / Materialien
│   └── valuables/                       # Valuables Stash
└── scripts/endfield/
    ├── README.md                        # umfangreiches Importer-Handbuch
    ├── import-operator.mjs
    ├── import-equipment.mjs
    ├── sync-assets.mjs
    ├── catalog-assets.mjs
    ├── equipment-normalize.mjs
    ├── import-gear-piece-sources.mjs
    ├── import-wiki-crate-contents.mjs
    ├── build-blueprint-index.mjs
    ├── build-precise-blueprints.mjs
    ├── import-official-gear-map.mjs
    ├── check-budget.mjs
    └── *.test.mjs
~~~

Der Baum ist eine **Orientierung**, keine Garantie, dass jede Datei in allen künftigen Commits unverändert existiert. Vor Bearbeitung Dateipfad prüfen.

### 5.3 Fachliche Modulverantwortlichkeiten

| Datei / Modul | Verbindliche Aufgabe |
| --- | --- |
| `src/lib/endfield/operatorData.ts` | Lokale Operator-/Extra-JSON-Dateien entdecken, validieren, abrufen. |
| `src/lib/endfield/operatorLocale.ts` | Deutschsprachige, snapshotgebundene Übersetzungen laden; veraltete Übersetzung nicht still auf neue Rohdaten anwenden. |
| `src/lib/endfield/operatorGuideModel.ts` | Importierte Spielwerte und redaktionelles Markdown für neun Guide-Abschnitte aufbereiten. |
| `src/lib/endfield/operatorAssets.ts` | Lokale Artworks/Icons und Fallbacks referenzieren. |
| `src/lib/endfield/itemCatalog.ts` | Offizielle Item-ID/Slug/Name und passenden lokalen Bildpfad auflösen. |
| `src/lib/endfield/equipmentDetails.ts` | Detaildatensätze für Waffen und Gear mit offiziellen Stats/Materialien bereitstellen. |
| `src/lib/endfield/storyAreas.mjs` | Offizielle Erwerbswege, 19 Gebiete, Belegstatus, Gebietszugang/Eligibility; keine erfundenen Quests. |
| `src/lib/endfield/blueprintResearch.mjs` | Historisch grobe Community-Kandidaten und Set-Vermutungen als Fallback. |
| `src/lib/endfield/preciseBlueprints.mjs` | Konkrete Wiki-Kisteninhalte + zweite Einzelteilquelle gegen offizielle Gear-IDs abgleichen; Widersprüche protokollieren. |
| `src/lib/endfield/gearBlueprintResearch.ts` | Für die UI belastbarste verfügbare Quellenebene bereitstellen (manuell bestätigt > konkretes Einzelteil > grobes Set). |
| `src/lib/endfield/blueprintConfirmations.mjs` | Persönlich geprüfte exakte Gear-ID/Marker-ID-Verbindungen validieren. |
| `src/lib/endfield/buildFinder.mjs` | Offizielle Standardrezept-Zutaten → höchste Fabrikkomponente; Level-/Vier-Teile-Check. |
| `src/lib/endfield/buildStoryProgress.mjs` | Storyregion, Gebiet, Erwerbsart, Autoritätslevel, Warenumverteilung und tatsächlichen Vorlagenbesitz auswerten. |
| `src/components/operator/OperatorGuide.astro` | Neun Guide-Abschnitte einbinden, Browser-Interaktionen, Inhaltsnavigation, lokale Nutzereingaben. |
| `src/components/operator/sections/OperatorEquipment.astro` | Level-/Fabrik-/Gebiets-/Besitz-Auswahl, Build-Karten und individuelle Quelleninformationen anzeigen. |
| `src/content/operatorGuideSchema.ts` | Redaktionelle YAML-Validierung, Feldregeln, Beziehungen zwischen Teams/Builds/Operatoren. |

---

## 6. OPERATOR-GUIDES: INHALT, TEMPLATE, IMPORT UND REDAKTION

### 6.1 Status [TEILWEISE]

- Die generische Route `/endfield/operatoren/[slug]/` und das Operatoren-Kartenraster sind implementiert.
- Guides erscheinen aus der Astro-Collection: `draft` unsichtbar, `preview` öffentlich klar als Vorschau gekennzeichnet, `published` regulär veröffentlicht.
- **Typhoeus** und **Liino** sind aktuell beide `preview` und haben noch keine selbst gepflegten Gear-Builds.
- Objektive SKPORT-Snapshots sind für beide Operatoren vorhanden. Eigene Skillbewertungen, Pros/Cons, Gear-/Waffenranking, Pullberatung, Teams und Videos dürfen nicht dazuerfunden werden.
- **Operator-IDs/Quellen:** Typhoeus SKPORT-Item-ID **1173**, Liino **1041**. Die generischen Dateien liegen in `src/data/endfield/operators/`.
- Für Liino dokumentiert: 6★, Electric Supporter, Polearm, TGCC; Talent-/Promotion-/Potenzial-/Skillinformationen wurden in der Importerentwicklung gegen den echten Wiki-Export abgeglichen.
- Die Darstellung ist auf **neun wiederverwendbare Komponenten** statt separater, kopierter Seiten aufgebaut.

### 6.2 Das neunteilige Guide-Framework

1. **Übersicht / Charakterprofil** – Desktop 50/50 zwischen Operator-Profil und Video, mobil oben Profil und darunter Video. Bild, Name, Seltenheit/Sterne, Klasse, Element, Waffentyp, ggf. Traits sowie Haupt-/Sekundärattribut; **Stärken / Schwächen** und kompakter **Build auf einen Blick** (Waffen-, Gear-, Skill-Icons und Prioritätszeichen). Einordnung über **Schwierigkeit, Flexibilität, Zugänglichkeit**, je 1–5. Keine redundante riesige Investitionsübersicht.
2. **Operator Kit** – verständliche Kernmechaniken, Rolle, wichtige Talente, Spielweise, Ressourcen-/Fortschrittshinweise. Spieldaten aus Import, eigene Erklärungen aus Markdown.
3. **Fertigkeiten** – Basic/Battle/Combo/Ultimate, Skillwerte über Ränge und Masteries, Materialkosten, interaktiver Rangwechsel; redaktionelle Priorität (vier Skills, drei Vergleichszeichen) nur nach Bewertung.
4. **Waffen** – konkrete Empfehlungen über offizielle `weaponId`, Kategorien BiS/BP/F2P/Alternative, exakte Stats/Tuning/Potenziale, Begründungen. Prozentvergleiche nur mit tatsächlichem Testaufbau.
5. **Ausrüstung** – **vier Gear-IDs pro Build**, Level-/Komponenten-/Story-/Gebiets-/Vorlagenprüfung, konkrete Stats, Seteffekte, Materialkosten, freie Anzahl situativer Builds, Progression und Quellen-/Freischaltinformationen.
6. **Potenziale** – P1 bis P5, Effekte und Creator-Bewertung, ggf. belegbare Zuwächse gegenüber Vorgängerstufe und P0; konsistenter Hinweis zur eigenständigen Pullentscheidung.
7. **Teams** – Teambauprinzip, Meta-Teams und weitere Varianten, jeweils vier **unterschiedliche** Operatoren einschließlich des besprochenen Operators; optional Link auf `equipment.builds[].id`.
8. **Gameplay** – Showcases, Bosskämpfe/Speedruns, Rotationen/Tips, Videoeinbindung und optionale spezielle Deep-Dives.
9. **Fazit** – Gesamtbewertung, Eignung für Spielertypen, empfehlenswert/bedingt/optional und Pull-/Ressourcenhinweise.

**Designanforderungen:** Inhaltsverzeichnis beim Scrollen erreichbar und aktiver Abschnitt subtil hervorgehoben; mobile Lesbarkeit; große Bilddateien nicht unnötig vervielfältigen; Datenkarten mit kurzen klaren Labels; bei fehlenden Daten keine falschen Zahlen oder erfundenen Charakterdetails.

### 6.3 Ein neues Guide-Dokument anlegen

~~~text
1. src/content/operator-guides/_template.md kopieren
2. Nach <operator-slug>.md umbenennen
3. operator: <operator-slug>, status: draft
4. Objektive SKPORT-Operator-/Gear-IDs recherchieren und ggf. importieren
5. Eigene Texte/Builds/Waffen/Teams in YAML eintragen
6. npm run test:endfield / npm run build
7. Preview (status: preview) oder echte Veröffentlichung (status: published)
8. Pull Request -> CI -> Merge -> Deploy -> Browserprüfung
9. ROADMAP.md: Status, konkrete Quellen, nächste Schritte aktualisieren
~~~

**Schemaregeln:** IDs Kleinbuchstaben/Zahlen/Bindestriche; genau vier Gear-IDs je Ausrüstungs-Build; genau vier unterschiedliche Teammitglieder inklusive Guide-Operator; Team-`buildId` muss auf existierenden Build zeigen; nur ein „featured“ Gameplay-Showcase; bei `published` Kurzbeschreibung und Fazit zwingend; Prozentvergleiche nur mit dokumentierten Bedingungen.

**Editorielle Arbeitsdateien:** `liino.md` und `typhoeus.md` nicht als Import-Ausgaben behandeln. Die Markdown-Dateien sind die editierbaren Quelldokumente für persönliche Inhalte; importierte JSON-Dateien dagegen reproduzierbare Spielwerte.

### 6.4 SKPORT-Operator-Importer [FERTIG für zwei bestätigte Beispiele / TEILWEISE generisch]

- Fachliche Dokumentation: [`scripts/endfield/README.md`](scripts/endfield/README.md).
- Generischer Parser: `scripts/endfield/import-operator.mjs`.
- Rohdaten: **öffentliche** `/web/v1/wiki/item/info?id=...` und öffentlicher Itemindex `/web/v1/wiki/item/list`; bei notwendigen Netzwerkcapturen keine Credentials verwenden.
- Benötigte lokale Eingaben nach `local-data/skport/` (nicht committen), inklusive Item-JSON und öffentlichem Items-Index.
- Beispiel für eine noch zu prüfende Operator-ID:

~~~bash
node scripts/endfield/import-operator.mjs \
  --input local-data/skport/new-operator.json \
  --items local-data/skport/public-items-index.json \
  --id 1234 \
  --slug neuer-operator \
  --snapshot 2026-10-15 \
  --out-dir src/data/endfield/operators
~~~

**`1234` ist nur eine Platzhalter-ID, kein realer Operator.**

- Der Parser identifiziert Widgets/Abschnitte und validiert verschachtelte Referenz-IDs, Fertigkeiten, Rangtabellen, Materialien, Talente, Promotions und Potenziale. Bei Schema-Abweichungen anhalten und Parser/Tests erweitern.
- Liino hatte zusätzliche Metadaten neben den eigentlichen Skill-/Potenzialtabellen; diese nicht blind als Effektwerte interpretieren.
- Die Extra-Dateien (`<slug>.extra.json`) enthalten u. a. Attribute, Talente, Promotions und Potenziale.
- Separate deutsche Übersetzung unter `src/data/endfield/locales/de/`. **Snapshotbindung** schützt vor alten Übersetzungen nach einem Spielpatch.
- **Noch nicht umgesetzt:** Vollständig autonomer, fehlerfrei für alle Operatoren laufender Massenimport samt deutscher Qualitätssicherung. Nicht behaupten, dass „alle Operatoren“ bereits im Katalog der detaillierten Guide-Seiten existieren.

### 6.5 Operator-Guides: konkrete nächste Arbeiten

| Schritt | Status | Definition of Done |
| --- | --- | --- |
| Offizielle Liino-/Typhoeus-JSON und Cover | [FERTIG] | Aktuelle lokale Daten validieren und auf Guide-Seiten laden. |
| Liino-Guide redaktionell füllen | **[NÄCHSTER INHALTSSCHRITT]** | Erst echte freigegebene Builds, dann Bewertungen, Skill-Prio, Teamvorschläge, Videolink. |
| Typhoeus-Guide vervollständigen | [GEPLANT] | Gleiches Framework, Video und Fortschrittsvarianten aus echten Creator-Inhalten. |
| Build-Kurzüberblick in Sektion 1 befüllen | [TEILWEISE] | Nur aus tatsächlich angelegtem, referenziertem Build. |
| Weitere Operatoren importieren | [GEPLANT] | Je Operator offizielle Item-ID, normalisierte Daten, lokale WebPs, DE-Locale, Guide-Datei. |
| Guide-/Datenschema langfristig erweitern | [GEPLANT] | Nur bei belegter notwendiger Strukturabweichung; Rückwärtskompatibilität prüfen. |
| Daten-Diff nach Versionen | [GEPLANT] | Offizielle Änderungen sichtbar, manuelle Empfehlungen nie überschreiben. |

---

## 7. OFFIZIELLER END­FIELD-KATALOG, BILDER UND HERSTELLUNG

### 7.1 Offizielle Katalogbasis [FERTIG für Snapshot 15.10.2026]

Die öffentliche offizielle **SKPORT-Wiki** ist der Primärbeleg für objektive Item-Informationen. Der ursprüngliche Item-Snapshot enthält:

| Kategorie | Offizielle Einträge | Lokaler Ordner |
| --- | ---: | --- |
| Operatoren | **35** | `public/images/endfield/operators/icons/` und `operators/<slug>/` für zusätzliche Artworks |
| Waffen | **84** | `public/images/endfield/weapons/` |
| Ausrüstungsteile / Gear | **258** | `public/images/endfield/gear/` |
| Item Files / Materialien | **340** | `public/images/endfield/materials/` |
| Valuables Stash | **223** | `public/images/endfield/valuables/` |
| **Gesamt** | **940** | Lokale WebP-Bibliothek |

Die Bilddateien in `public/images/endfield/` sind mehr als 940, weil die Operator-Cover/Skills zusätzlich existieren. Unterscheidung zwischen **Katalog-Icons** und **extra Operator-Artworks** beibehalten.

- Manifest: `src/data/endfield/catalog/items.json`. Offizielle numerische Item-ID als Dateiname `<id>.webp` und Datenbankschlüssel.
- Bei Materialien etc. Symbole aus bestehender Katalogbibliothek verwenden statt kopieren; `ItemIcon.astro` und `MaterialCosts.astro`.
- Die Bilder wurden aus größeren Originaldateien als WebP komprimiert; keine zweite PNG-/JPEG-Bibliothek nebenbei erzeugen.
- Fehlerhafte/fehlende Dateien nicht auf ein fremdes Item umbiegen; wenn verfügbar, mit neutralem Text-Platzhalter und Fehlerhinweis arbeiten.
- Die Trennung in `gear/`, `materials/`, `weapons/`, `valuables/` und `operators/` ist eine bewusste Entscheidung aus PR #8.

### 7.2 Waffen und Gear-Details [FERTIG mit offenen Wiki-Lücken]

`src/data/endfield/catalog/equipment-details.json` enthält **84 Waffen** und **258 Ausrüstungsteile** mit geprüften offizielle Metadaten.

- **80 Waffen** besitzen die erwarteten Detail-Widgets; **4 neuere Waffen** (SKPORT-IDs 1280–1283) hatten beim Import keine vollständigen Details und bleiben bewusst `incomplete`.
- **258/258 Gear** haben ein offizielles Stats-Widget und einen eindeutig zugeordneten **Standard-Herstellungsweg**.
- Für **167/258 Gear** gibt es ein Artificing-/Veredelungswidget; bei anderen `not-listed`, ohne offizielle Grundwerte fälschlich als unvollständig zu markieren.
- Import-/Normalisierungs-Skripte: `scripts/endfield/import-equipment.mjs` und `equipment-normalize.mjs`.
- Offizielle SKPORT-`acquisitionNotes` beschreiben Erwerbswege, nicht automatisch eine individuelle Kartenposition.
- Bei fehlenden Widgets/Schemata: `incomplete`/`needs-review` statt eigener statischer Zahlen.

### 7.3 Ausrüstung darf nicht nur nach Rüstungs-Level sortiert werden

Die folgenden sieben Komponentenstufen sind eine redaktionell definierte Reihenfolge, **unterlegt mit offiziellen Komponenten-Item-IDs und Standardrezepten**. Siehe `src/lib/endfield/buildFinder.mjs`.

| Reihenfolge | Komponente | Item-ID | Typische Gear-Level im aktuellen Modell | Phase |
| ---: | --- | ---: | --- | --- |
| 1 | Amethyst | 525 | 20 / 28 | Early |
| 2 | Ferrium | 526 | 36 | Early |
| 3 | Cryston | 527 | 50 | Early |
| 4 | Xiranit | 528 | 60 / 70 | Mid |
| 5 | Cuprium | 747 | 70 | Mid |
| 6 | Hetonit | 844 | 70 | End |
| 7 | Pyrrolit | 1067 | 70 | End |

**Wichtig:** Allein Level 70 erlaubt *nicht* den Schluss, Pyrrolit-Verarbeitung oder entsprechende Blaupausen seien freigeschaltet. Das benötigte Tier eines Builds wird aus der **höchsten Komponente der vier offiziellen Standardrezepte** berechnet. Komponenten darf der Nutzer separat wählen.

**Default im Finder:** Spieler-Level **70** und Fabrikkomponente **Pyrrolit** (bewusst gewünscht). Das sind Eingabe-Defaults, **kein Beweis tatsächlicher Freischaltung**.

### 7.4 Offizielle Erwerbsarten: 258 Gear-IDs

| SKPORT-Erwerbsweg | Gear-Einträge |
| --- | ---: |
| `Gear Template Crate` | **125** |
| `Authority Level ... Reward` | **86** |
| `Wuling Stock Redistribution Level ...` | **20** |
| `Game progress reaches the [Wuling] region` | **15** |
| Nicht ausreichend bestimmbar | **12** |
| **Gesamt** | **258** |

Diese Unterscheidung ist implementiert in `src/lib/endfield/storyAreas.mjs`. Der Erwerbsweg ersetzt weder einen Story-Meilenstein noch den tatsächlichen Besitz der Vorlage. Insbesondere ist „Autoritätslevel erfüllt“ nicht gleich „Belohnung abgeholt“.

---
