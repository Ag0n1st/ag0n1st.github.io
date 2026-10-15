---
# GUIDE-TEMPLATE: Diese Datei wird von Astro wegen des führenden "_" ignoriert.
# Neuen Guide anlegen: _template.md kopieren, z.B. nach si.md, operator ändern.
# Der Operator-Slug muss zur Datei und später zum Import-Datensatz passen.
operator: neuer-operator
status: draft # erst nach dem Befüllen auf "published" ändern
# updatedAt: 2026-10-15

# 1. ÜBERSICHT
# Offizielle Klasse, Element, Waffentyp, Sterne, Skilltexte und Bilder NICHT
# doppelt eintragen – sie werden künftig aus den automatischen Spieldaten geladen.
guideVideo:
  title: ""
  # url: "https://www.youtube.com/watch?v=VIDEO_ID"

overview:
  summary: |
    Eine kurze Erklärung in ein bis drei Sätzen.
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
  playstyle: |
    Hier die Rolle, grundlegende Mechaniken und Spielweise erklären.
  progressionNotes: ""
  resourceNotes: "" # Fundorte / Story- und Fabrik-Freischaltungen kommentieren

# 3. FERTIGKEITEN
skills:
  # Später die wirkliche Priorität einstellen.
  # Vier Slots, genau drei Vergleichszeichen (">" oder ">=").
  priority:
    order: [battle, combo, ultimate, basic]
    comparisons: [">", ">=", ">"]
    targetLevels:
      basic: "9"
      battle: "M3"
      combo: "9"
      ultimate: "M1"
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
  # - weaponId: waffen-id
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
  #   items: [helm-id, brust-id, handschuhe-id, accessoire-id] # EXAKT 4
  #   availableFromLevel: 70 # nur 50, 60 oder 70
  #   factoryUnlock: "Benötigter Fabrikfortschritt"
  #   teamContext: "Für Teams mit diesem Operator als Main DPS"
  #   evaluation: |
  #     Bewertung der Ausrüstung und ihrer Synergien.
  #   craftingNotes: ""
  #   setBonusNotes: ""
  progression: []
  # - stage: early # early | mid | late | endgame
  #   note: "Frühe Übergangsausrüstung und Freischaltung"
  generalNotes: |
    Achtet bei der Ausrüstung grundsätzlich darauf, Ausrüstungsteile zu
    nutzen, die das Haupt- und Sekundärattribut des jeweiligen Operators erhöhen.

# 6. POTENZIALE
potentials:
  entries: []
  # - level: 1 # P1 bis P5, jeweils nur einmal
  #   evaluation: |
  #     Zusätzlicher Nutzen und praktische Einordnung.
  #   increaseOverPreviousPercent: 0 # optional; nur mit Belegen
  #   increaseOverP0Percent: 0        # optional; nur mit Belegen
  #   comparisonConditions: "Annahmen, Team, Ausrüstung ..."
  pullAdvice: |
    Potenziale sind nice to have, nicht notwendig. Hier ggf. Pull-Stopp empfehlen.

# 7. TEAMS
teams:
  introduction: |
    Was braucht der Operator in einem Team? Welche Rollen kann er ausfüllen?
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
  verdict: |
    Hier das kurze Gesamturteil eintragen.
  # recommendation: conditional # recommended | conditional | optional
  pullAdvice: ""
  recommendedFor: []
  skipIf: []
  closingNote: ""

---

<!-- Dieser Markdown-Teil ist für zusätzliche längere Erklärungen reserviert.
     Die neun standardisierten Guide-Bereiche stehen oben im YAML-Block.
     Der Markdown-Teil wird erst nach der späteren Template-Anbindung gerendert. -->

