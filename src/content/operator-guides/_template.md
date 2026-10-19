---
# GUIDE-TEMPLATE: Diese Datei wird von Astro wegen des führenden "_" ignoriert.
# Neuen Guide anlegen: _template.md kopieren, z.B. nach si.md, operator ändern.
# Der Operator-Slug muss zur Datei und später zum Import-Datensatz passen.
operator: neuer-operator
# displayName: "Angezeigter Operatorname" # optional bis Spieldaten-Import
status: draft # draft = verborgen; preview = sichtbare Vorschau; published = fertiger Guide
# updatedAt: 2026-10-15
# Release and featured-guide metadata (add when this guide is ready to appear
# on both homepages; its first listing date must remain stable on future edits).
# Example for a released character; no fabricated dates:
# listing:
#   releaseDate: 2026-10-15 # actual in-game character debut date
#   listedAt: 2026-10-17 # day first added to "Latest Posts" on this website
#   category: character  # other categories: gameplay, factory, systems, news
#   summaryDe: "Eine kurze deutsche Beschreibung, mindestens 15 Zeichen."
#   summaryEn: "A short English description of at least 15 characters."
#   visible: true # false keeps the complete guide public but off both teaser feeds


# 1. ÜBERSICHT
# Stärken/Schwächen erhalten in allen Guides automatisch dezente grüne/rote
# Akzent-Cards; keine Farben oder HTML in den Inhaltstexten notwendig.
# Offizielle Klasse, Element, Waffentyp, Sterne, Skilltexte und Bilder NICHT
# doppelt eintragen – sie werden künftig aus den automatischen Spieldaten geladen.
guideVideo:
  title: ""
  # url: "https://www.youtube.com/watch?v=VIDEO_ID"

overview:
  summary: "" # vor Veröffentlichung ausfüllen
  traits: [] # vorläufig offiziell englische Trait-Labels, z. B. ["HP Treatment", "Amp"]; Übersetzung separat
  strengths: []
  weaknesses: []
  ratings:
    # Skala jeweils 1 bis 5. Weglassen, solange keine Bewertung vorliegt.
    # difficulty: 3 # gespeichert: 1 = leicht, 5 = schwer; UI zeigt Einsteigerfreundlichkeit = 6 - difficulty
    # flexibility: 4
    # accessibility: 1 # nur bei ausdrücklicher, vorläufiger redaktioneller Freigabe solange neue Meta-Teile noch ungeprüft sind
  # accessibilityNote: "Warum der Score trotz fehlender offizieller neuer Rezepte vorläufig gilt."
  # Bei vollständig validierten Meta-Builds wird der Score wieder automatisch ermittelt.
  # featuredBuildId: standard
  # Partners werden automatisch aus den Meta-Teams errechnet (ohne den Guide-Operator).
  # Einträge nur als Rückfall verwenden, solange keine Meta-Teams vorhanden sind.
  # Die Profilkarte verweist für zusätzliche Teamoptionen auf den Teams-Abschnitt.
  partners: []

# 2. OPERATOR KIT
operatorKit:
  playstyle: "" # Rolle, Kernmechaniken, Spielweise (Aufstiegsdetails stehen bereits in offiziellen Tabellen)

# 3. FERTIGKEITEN
skills:
  # Später die wirkliche Priorität einstellen.
  # Vier Slots, genau drei Vergleichszeichen (">" oder ">=").
  # priority:
  #   order: [battle, combo, ultimate, basic]
  #   comparisons: [">", ">=", ">"]
  #   targetLevels:
  #     basic: "9"
  #     battle: "M3"
  #     combo: "9"
  #     ultimate: "M1"
  # supportPriority: # Optional: eigenständige Priorität für Support-Rolle, gleiche Feldstruktur wie priority.
  #   order: [battle, ultimate, combo, basic]
  #   comparisons: [">", ">", ">"]
  #   targetLevels: {basic: "Lv 1–9 (optional)", battle: "M3", combo: "M3", ultimate: "M3"}
  # Dies sind nur STRUKTURBEISPIELE, KEINE tatsächlichen Skill-Prioritäten.
  active:
    basic: ""
    battle: ""
    combo: ""
    ultimate: ""
  combatTalents: []
  # - talentId: talent-id
  #   evaluation: |
  #     Eigene Bewertung dieses Talents.
  shipTalents: []

# 4. WAFFEN
weapons:
  # Kategorien: bis, bp, f2p, alternative
  recommendations: []
  # - weaponId: "1046" # offizielle SKPORT-Item-ID oder Slug wie bedazzling-night-debut
  #   category: bis
  #   evaluation: |
  #     Wieso ist diese Waffe hier sinnvoll?
  #   sourceNote: "Datafield" # Als Klartext anzeigen, KEIN Link
  #   performancePercent: 100  # Nur aus nachvollziehbarer Datafield-Berechnung oder eigenem Vergleich
  #   comparisonConditions: "Exakte Datafield-Baseline, Team/Rotation, Waffenrang und Potenziale ..."
  # Mehrere Teamvergleiche NUR aus dem Datafield-CHARAKTERPROFIL (nicht Team-Hub).
  # Die allgemeine Waffenempfehlung oben bleibt EIN Eintrag pro Waffe ohne Rang.
  # comparisons:
  #   - id: beispiel-team
  #     title: "Beispiel-Team"
  #     sourcePageType: character-profile
  #     sourceNote: "Datafield" # als KLARTEXT anzeigen, ohne URL
  #     snapshotDate: "2026-10-16"
  #     referenceWeaponId: "1046"
  #     referenceRank: 4
  #     comparisonConditions: "Genaues Datafield-Team, Modell, Referenz und noch unbestätigte Annahmen"
  #     entries:
  #       - { weaponId: "1046", rank: 4, performancePercent: 100.0 }
  #       - { weaponId: "1046", rank: 9, performancePercent: 112.1 }
  # Datafield-Quelle erscheint nur als kleine Fußnote unter dem Vergleich,\n  # Modell-/Rotationsbedingungen bleiben intern als Metadaten gespeichert.
  generalNotes: ""

# 5. AUSRÜSTUNG
equipment:
  builds: []
  # - id: standard
  #   title: "Standard-Build"
  #   role: main-dps # main-dps | support | hybrid | sub-dps | control | other
  #   meta: true # optional; nur Meta-Builds werden oberhalb des Finders als kompakte Cards gezeigt
  #   metaSummary: "Kurze, aussagekräftige Empfehlung für den Meta-Build (max. 280 Zeichen)."
  #   metaTag: balanced # optional: balanced (Cyan), max-dmg (Magenta), max-buffs (neutral), early-access (warm)
  #   # metaSummary ist bei meta: true verpflichtend. Sonst fehlen lassen.
  #   # Detailtexte und alle nicht als Meta markierten Builds erscheinen weiterhin im Build-Finder.
  #   items: ["1246", "1245", "1244", "1243"] # Beispiel-IDs, KEINE Build-Empfehlung. EXAKT 4
  #   availableFromLevel: 70 # optional: 10/20/28/36/50/60/70, offizielles Gear-Level wird zusätzlich geprüft
  #   # Höchste benötigte Komponente (Amethyst → Pyrrolit) wird automatisch aus vier SKPORT-Standardrezepten ermittelt.
  #   storyUnlock: "Optionaler redaktioneller Hinweis zu Story und Facilities; keine Freischaltberechtigung"
  #   # Der Finder prüft ausgewählte Region/Gebiete und den Blaupausenbesitz ALLER vier Teile.
  #   # Ein Text allein markiert keine Blaupause automatisch als erhalten.
  #   teamContext: "Für Teams mit diesem Operator als Main DPS"
  #   evaluation: |
  #     Bewertung der Ausrüstung und ihrer Synergien.
  #   craftingNotes: ""
  #   setBonusNotes: ""
  progression: []
  # - stage: early # early | mid | late | endgame
  #   note: "Frühe Übergangsausrüstung und Freischaltung"
  generalNotes: "" # zusätzlicher eigener Hinweis; Standard-Disclaimer ist bereits eingebaut
  matrix:
    enabled: false
    metrics: []
    rows: []

# 6. POTENZIALE
potentials:
  entries: []
  # - level: 1 # P1 bis P5, jeweils nur einmal
  #   evaluation: |
  #     Zusätzlicher Nutzen und praktische Einordnung.
  #   increaseOverPreviousPercent: 0 # optional; nur mit Belegen
  #   # Kumulatives Potenzial vs. P0 gibt es im Framework bewusst nicht.
  #   comparisonConditions: "Datafield-Charakterprofil; Gewinn gegenüber der vorherigen Stufe; Modellannahmen intern"
  #   sourceNote: "Datafield" # Pflicht sobald einer der Prozentwerte befüllt ist, nur Klartext (kein Link)
  # Bei Potentials (DPS Increase) der Datafield-Charakterseite:
  # nur increaseOverPreviousPercent verwenden, WENN die Quelle
  # ausdrücklich einen Vergleich zur jeweiligen Vorstufe nennt.
  # KEINE kumulativen vs.-P0-Prozente im Framework anzeigen!
  # Bei zwei alternativen Datafield-Rechnungen (z. B. mit/ohne Ultimate-Energiebedarf):
  # comparisons:
  #   - id: ohne-extra-energie
  #     title: "Teams ohne zusätzliche Ultimate-Energie"
  #     sourceNote: "Datafield"
  #     snapshotDate: "2026-10-16"
  #     comparisonConditions: "Konkret benanntes, geprüfte Datafield-Tab/Team-Modell"
  #     entries: [
  #       { level: 1, increaseOverPreviousPercent: 0.0 },
  #       { level: 2, increaseOverPreviousPercent: 0.0 },
  #       { level: 3, increaseOverPreviousPercent: 0.0 },
  #       { level: 4, increaseOverPreviousPercent: 0.0 },
  #       { level: 5, increaseOverPreviousPercent: 0.0 }
  #     ]
  # OBIGE NULLEN SIND NUR SYNTAXBEISPIELE, KEINE Daten!
  # Eine einzige subtile Quellenfußnote unter der gesamten Potenzialvergleichstabelle.
  # Pull-Empfehlungen ausschließlich im Fazit: conclusion.pullAdvice.

# 7. TEAMS
teams:
  introduction: "" # Teambauprinzipien und mögliche Rollen
  roles: [] # mögliche Rollen: main-dps, support, hybrid, sub-dps, control, other
  # Für reine Support-Operatoren z. B. [support].
  # meta: enthält beliebige zwei oder mehr BESTÄTIGTE Meta-Teams;
  # more: weitere Teams. Main-DPS-/Support-Split nicht erzwingen.
  # Teammitglieder als Slugs (zhuang-fangyi etc.) speichern; im UI Klarnamen zeigen.
  meta: []
  # - id: meta-team-1
  #   title: "Meta-Team 1"
  #   role: main-dps
  #   members: [neuer-operator, operator-b, operator-c, operator-d] # genau 4
  #   buildId: standard # verweist auf equipment.builds[].id
  #   # Optional, nur exakt aus eigenem Guide/gesicherter Quelle geprüfte Teammate-Gear:
  #   # memberGear:
  #   #   - member: operator-b
  #   #     weaponId: "1175" # ID ist NUR EIN BEISPIEL, nicht generische Empfehlung
  #   #     weaponRank: 4 # optional und nur bei belegtem Rang
  #   #     weaponAlternatives: ["1044"] # nur weitere belegte Waffen-IDs
  #   #     items: ["1239", "1238", "1240", "365"] # genau 4 echte Gear-IDs
  #   #     note: "Konkreter Teamkontext und die redaktionelle Begründung"
  #   #     alternatives: # jede Bedingung als eigenes, zugeklapptes Vierer-Setup
  #   #       - title: "Nur ohne Xiranit-Nutzer im Team"
  #   #         items: ["1134", "1138", "337", "365"]
  #   #         note: "Wann dieses alternative Set tatsächlich passt"
  #   evaluation: |
  #     Kurze Begründung der Synergien, ohne ausführliche Rotation.
  more: []
  # - id: alternative-1
  #   title: "Alternative Teamkombination"
  #   role: support
  #   members: [neuer-operator, operator-e, operator-f, operator-g]
  #   buildId: standard
  #   note: "Optionale Ein-Satz-Notiz"

# 8. GAMEPLAY
gameplay:
  pending: false # true = FOLGT-Ecklabel, keine fiktiven Vorschau-Runs; bis echte Videos vorliegen
  showcases: []
  # - id: trial-run
  #   title: "Operator-Probe"
  #   type: trial # trial | boss | speedrun | other
  #   url: "https://www.youtube.com/watch?v=VIDEO_ID"
  #   featured: true
  #   description: "Was zeigt dieser Run?"
  #   rotationAndTips: |
  #     Kurzer Hinweis zur Rotation, nur wenn erforderlich.

# 9. FAZIT
conclusion:
  verdict: "" # vor Veröffentlichung ausfüllen
  # recommendation: conditional # recommended | conditional | optional
  pullAdvice: ""
  recommendedFor: []
  skipIf: []
  closingNote: ""

---

<!-- Zusätzlicher Markdown-Text wird vor den beiden finalen Zielgruppen-Cards im Fazit gerendert.
     Hauptinhalt und alle neun Guide-Abschnitte werden aus dem YAML-Block oben erzeugt. -->

