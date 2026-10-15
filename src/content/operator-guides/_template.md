---
# GUIDE-TEMPLATE: Diese Datei wird von Astro wegen des führenden "_" ignoriert.
# Neuen Guide anlegen: _template.md kopieren, z.B. nach si.md, operator ändern.
# Der Operator-Slug muss zur Datei und später zum Import-Datensatz passen.
operator: neuer-operator
# displayName: "Angezeigter Operatorname" # optional bis Spieldaten-Import
status: draft # draft = verborgen; preview = sichtbare Vorschau; published = fertiger Guide
# updatedAt: 2026-10-15

# 1. ÜBERSICHT
# Offizielle Klasse, Element, Waffentyp, Sterne, Skilltexte und Bilder NICHT
# doppelt eintragen – sie werden künftig aus den automatischen Spieldaten geladen.
guideVideo:
  title: ""
  # url: "https://www.youtube.com/watch?v=VIDEO_ID"

overview:
  summary: "" # vor Veröffentlichung ausfüllen
  strengths: []
  weaknesses: []
  ratings:
    # Skala jeweils 1 bis 5. Weglassen, solange keine Bewertung vorliegt.
    # difficulty: 3
    # flexibility: 4
    # accessibility: 2
  # featuredBuildId: standard
  partners: [] # Operator-IDs, z.B. [operator-a, operator-b]

# 2. OPERATOR KIT
operatorKit:
  playstyle: "" # Rolle, Kernmechaniken, Spielweise
  progressionNotes: ""
  resourceNotes: "" # Fundorte / Story- und Fabrik-Freischaltungen kommentieren

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
  # Dies ist nur ein STRUKTURBEISPIEL, KEINE tatsächliche Skill-Priorität.
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
  #   sourceNote: ""
  #   performancePercent: 100  # NUR bei tatsächlichem Test
  #   comparisonConditions: "Lv. 90, Veredelung 1, festes Team ..."
  generalNotes: ""

# 5. AUSRÜSTUNG
equipment:
  builds: []
  # - id: standard
  #   title: "Standard-Build"
  #   role: main-dps # main-dps | support | hybrid | sub-dps | control | other
  #   items: ["1246", "1245", "1244", "1243"] # Beispiel-IDs, KEINE Build-Empfehlung. EXAKT 4
  #   availableFromLevel: 70 # optional: 10/20/28/36/50/60/70, offizielles Gear-Level wird zusätzlich geprüft
  #   # Höchste benötigte Komponente (Amethyst → Pyrrolit) wird automatisch aus vier SKPORT-Standardrezepten ermittelt.
  #   storyUnlock: "Redaktionell überprüfte Story-/Facility-/Blaupausen-Freischaltung mit Beleg"
  #   # Ohne geprüfte Story-Freischaltung zeigt der Finder den Build nicht als verfügbar.
  #   teamContext: "Für Teams mit diesem Operator als Main DPS"
  #   evaluation: |
  #     Bewertung der Ausrüstung und ihrer Synergien.
  #   craftingNotes: ""
  #   setBonusNotes: ""
  progression: []
  # - stage: early # early | mid | late | endgame
  #   note: "Frühe Übergangsausrüstung und Freischaltung"
  generalNotes: "" # zusätzlicher eigener Hinweis; Standard-Disclaimer ist bereits eingebaut

# 6. POTENZIALE
potentials:
  entries: []
  # - level: 1 # P1 bis P5, jeweils nur einmal
  #   evaluation: |
  #     Zusätzlicher Nutzen und praktische Einordnung.
  #   increaseOverPreviousPercent: 0 # optional; nur mit Belegen
  #   increaseOverP0Percent: 0        # optional; nur mit Belegen
  #   comparisonConditions: "Annahmen, Team, Ausrüstung ..."
  pullAdvice: "" # persönlicher Stopp-Punkt; allgemeiner Disclaimer erscheint automatisch

# 7. TEAMS
teams:
  introduction: "" # Teambauprinzipien und mögliche Rollen
  roles: [] # mögliche Rollen: main-dps, support, hybrid, sub-dps, control, other
  meta: []
  # - id: meta-team-1
  #   title: "Meta-Team 1"
  #   role: main-dps
  #   members: [neuer-operator, operator-b, operator-c, operator-d] # genau 4
  #   buildId: standard # verweist auf equipment.builds[].id
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

<!-- Zusätzlicher Markdown-Text wird am Ende des Fazits gerendert.
     Hauptinhalt und alle neun Guide-Abschnitte werden aus dem YAML-Block oben erzeugt. -->

