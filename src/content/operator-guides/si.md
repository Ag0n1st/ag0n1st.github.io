---
operator: "si"
displayName: "Si"
status: "published"
updatedAt: "2026-10-16"
guideVideo:
  title: "Si – ausführlicher Videoguide in Vorbereitung"
overview:
  summary: "Si ist eine 6★-Kryo-Unterstützerin mit Großschwert, Intellekt als Haupt- und Stärke als Sekundärattribut. Ihr flexibles Kit erlaubt sie sowohl als Main DPS mit Fokus auf Kombofertigkeit und aufgezeichneten Schaden als auch als Sub DPS beziehungsweise Support für Kryo- und Hitze-Teams. Künstlerische Absicht erfasst Schaden am Ziel, ihre Tintenseele überträgt Treffer und Effekte auf den ursprünglichen Gegner, während die Ultimate das gesamte Team mit Kryo- und Hitze-Verstärkung unterstützt. Entscheidend sind Position 1, der Zeitpunkt der Combo-Auslösung und sorgfältiges FP-Management."
  traits: ["Amp", "Damage Dealer", "Cryo Infliction"]
  strengths:
    - "Ungewöhnlich vielfältig: eigener Kryo-Combo-Schaden, debuffende Bewegungsunfähigkeit, Schadenserfassung und teamweite Kryo-/Hitze-Verstärkung."
    - "Unterstützt zahlreiche im Pre-Guide dokumentierte Teams für Kryo, Hitze, physische Angreifer und ihre eigene Main-DPS-Rotation."
    - "Tintenseele überträgt eingehende Treffer und Effekte auf das Ursprungsziel. Besonders interessant gegen bewegliche Gegner, die ihre Position oft wechseln."
    - "Talent zur Abklingzeitverkürzung der Kombofertigkeit des Operators auf Teamposition 1 nach der Ultimate eröffnet zusätzliche Rotationsfenster."
    - "Kann abhängig vom Element auf Position 1 Kryo- oder Hitze-Kumulierung anbringen."
  weaknesses:
    - "Die Basismechanik ist zugänglich, aber optimale Doppel-Battle-Skill-Abfolge, Tintenseelen-Timing und die gespeicherte Schadensmenge brauchen Übung."
    - "Starkes Fine-Tuning erfordert FP-Planung: Initialer Pinselstrich kostet 15 FP und der nächste Combo-/Ultimate-Einsatz muss zur Teamrotation passen."
    - "Die Teamposition 1 beeinflusst Sis aufgetragene Kumulierung und den Talent-Cooldown-Bonus. Falsche Reihenfolge verändert ihren Nutzen deutlich."
    - "Spezialisierte Meta-Ausrüstung für Version 1.6 ist so neu, dass noch nicht alle numerischen SKPORT-IDs und Herstellungsdaten nachvollziehbar vorliegen."
    - "Keine eigene Heilung; je nach Team bleiben Defensive und FP-Versorgung anderen Operatoren überlassen."
  ratings:
    difficulty: 3
    flexibility: 5
  featuredBuildId: "si-main"
  partners: []
operatorKit:
  playstyle: "Si spielt um die Zustände Künstlerische Absicht und Tintenseele. Mit der ersten Kampffertigkeit belegst du einen Gegner mit Kryo-Schaden, Bewegungsunfähigkeit und einer Kumulierung; steht ein Hitze-Operator an Teamposition 1, wird daraus Hitze statt Kryo. Während Künstlerische Absicht aktiv ist, wird ein Anteil des erlittenen Schadens gespeichert. Nach Ablauf explodiert der Effekt und verursacht festen Schaden in Höhe des aufgezeichneten Wertes. Mit dem anschließenden Ersten Pinselstrich (15 FP) ziehst du eine Tintenseele aus dem Ziel: Angriffe und Effekte gegen diese Seele werden auf den ursprünglichen Gegner übertragen. Der Letzte Pinselstrich kostet keine FP und löst die Endexplosion vorzeitig aus. Der praktische Vorteil ist die Bündelung des Schadens auch dann, wenn sich der Gegner bewegt; das Timing entscheidet jedoch darüber, wie viel Schaden vorher aufgezeichnet wurde. Sis Kombofertigkeit Vision vor Auge wird ausgelöst, wenn ein Ziel Kryo- oder Hitze-Kumulierung verliert beziehungsweise diese absorbiert. Der beschworene Tinten-Lung verursacht Kryo-Schaden und profitiert davon, wie viele Kumulierungen von EINEM Ziel entfernt wurden. Das spricht für bewusst aufgebaute Reaktionsfenster statt ungeplanter Kombo-Aktivierung. Ihre Ultimate Spielverderber verboten verursacht Kryo-Schaden und stärkt gleichzeitig Kryo und Hitze für das ganze Team. Zusätzlich senkt Gönnerschaft der Proxy vorübergehend die Combo-Abklingzeit von Teamposition 1. Das macht sie vor allem in ihrer Support-Rolle flexibel. Als Main DPS steht die möglichst häufige und verstärkte Combo im Vordergrund; als Support möchte sie ihre Ultimate vor einem wichtigen Schadensfenster setzen. Bei der Rotation immer klären: Wer besetzt Position 1, welches Element wird aufgetragen, wie viele FP stehen für Initialer Pinselstrich zur Verfügung und wann wird die Tintenseele zurückgeschickt? Frühere Theorycrafting-Prognosen wurden mit den seit 15. Oktober zugänglichen offiziellen Grundeffekten abgeglichen; exakte Schadensvergleiche gelten nur für das jeweils ausdrücklich benannte Datafield-Modell."
skills:
  priority:
    order: ["combo", "battle", "ultimate", "basic"]
    comparisons: [">", ">", ">"]
    targetLevels: {}

  active:
    basic: "Schaffensdrang ist Sis fünfteiliger Kryo-Basisangriff mit 18 Taumelpunkten auf dem Abschlussangriff, wenn sie aktiv gesteuert wird. Er ist im Main-DPS-Build für Feldzeit und FP-Gewinn nützlich. Die Level-Priorität hängt aber davon ab, wie häufig du sie selbst steuerst: Für die Kernrotation sind Combo und Battle Skill zuerst entscheidend."
    battle: "Dimension der Pinselkunst ist das Kontroll- und Speicherwerkzeug ihres Kits. Es bringt Künstlerische Absicht und Kryo- bzw. bei einem Hitze-Operator auf Position 1 Hitze-Kumulierung an. Erster Pinselstrich kostet 15 FP und extrahiert die Tintenseele; Letzter Pinselstrich ist gratis und kann die Endexplosion vorzeitig auslösen. Lass dem Team genug Zeit, Schaden und Effekte auf Ziel und Seele zu übertragen, bevor du abschließt. Unter reinen Supportbedingungen nach der Ultimate besonders hoch priorisieren."
    combo: "Vision vor Auge ist im DPS-Theorycrafting die wichtigste Schadensquelle. Die Combo triggert beim Verbrauch oder Absorbieren von Kryo-/Hitze-Kumulierungen. Je mehr Stacks von EINEM Gegner entfernt werden, desto stärker trifft der Tinten-Lung. Die seit Release bekannten Daten bestätigen den Kern des Combo-Fokus. Für Main DPS ist dies meine erste Upgrade-Priorität; gleichzeitig Battle Skills anderer Teammitglieder auf den 3er-Type-50-Setbonus timen."
    ultimate: "Spielverderber verboten ruft den riesigen Tinten-Lung, verursacht Kryo-Schaden und gewährt dem Team gleichzeitig Kryo- und Hitze-Verstärkung. Gönnerschaft der Proxy reduziert danach die Cooldown-Dauer der Combo von Teamposition 1. Im Support-Fokus gilt redaktionell ULT > Battle > Combo > Basic; im DPS-Fokus Combo > Battle > ULT > Basic. Die Zahl der sinnvollen Ultimate-Nutzungen hängt von der eigenen Energieeffizienz und Kampfzeit ab."
  combatTalents:
    - talentId: "proxy-s-patronage"
      evaluation: "Zentrales Support-Talent: Nach Sis Ultimate verkürzt sich der Cooldown der Kombofertigkeit des Operators auf Teamposition 1 um 10 beziehungsweise 20 Sekunden. Entscheidend sind Teamreihenfolge und Einsatzzeitpunkt; kann auch Si selbst betreffen, wenn sie Position 1 besetzt."
    - talentId: "unsoiled-brush"
      evaluation: "Verschwindet eine Tintenseele, erhalten alle verbündeten Operatoren 15 beziehungsweise 30 % Hast für fünf Sekunden. Der kostenlose Letzte Pinselstrich ist damit nicht nur der Endburst, sondern zugleich ein wichtiges Team-Buff-Timing."
  shipTalents:
    - talentId: "ware-is-the-geist"
      evaluation: "Verbessert die Hinweisbeschaffung im Empfangsraum; hat keine direkte Bedeutung für Sis Kampfrotation. Spätere Stufen erhöhen die Effektivität weiter."
    - talentId: "ink-spirit-aide"
      evaluation: "Verlangsamt die Stimmungsabnahme von Operatoren im Empfangsraum. Es handelt sich um einen Basiseffekt, nicht um einen Kampf-Buff."
weapons:
  recommendations:
    - weaponId: "1280"
      category: "bis"
      evaluation: "Jadegefäß (Jade Vessel) ist als Signature-Waffe sowohl für Sis persönliche Kryo-/Combo-Schadensfenster als auch für die Kontrolle wertvoll. Nach Bewegungsunfähigkeit erhöht sie erlittenen Schaden am Ziel und stärkt anschließend die nächste Kombofertigkeit; dadurch passt sie direkt zum Pinselstrich-/Tintenseelen-Kit."
    - weaponId: "1281"
      category: "bp"
      evaluation: "Long Heritage ist die im persönlichen Pre-Guide genannte kostengünstigere Alternative mit passenden Intellekt-/Kryo-Werten. Seit Release ist sie als Protocol-Pass-Waffe eingeordnet, daher nicht pauschal als bedingungslos kostenlos ausgeben. Für konkrete Leistungsabstände zählt die Datafield-Modellreferenz."
    - weaponId: "70"
      category: "alternative"
      evaluation: "Khravengger ist eine von der offiziellen Wiki als passende Großschwertoption geführte Alternative und wird von Datafield in Si-Main-DPS-Simulationen ausgewiesen. Für die Ultimate-Verstärkung und die genaue Teamrolle ist Jadegefäß dennoch die spezifischere Empfehlung."
  comparisons:
    - id: "si-main-dps"
      title: "Main DPS · Datafield-Charakterprofil"
      sourcePageType: "character-profile"
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1280"
      referenceRank: 4
      comparisonConditions: "Öffentlich gerendertes Datafield-Charakterprofil Si, Reiter Main DPS, Stand 16.10.2026. Jade Vessel R4 = 100 % innerhalb dieses konkreten Modells. Es handelt sich nicht um universelle Spiel-DPS und das Original-Spreadsheet wurde nicht unabhängig nachgerechnet."
      entries:
        - weaponId: "1280"
          rank: 9
          performancePercent: 114.5
        - weaponId: "1280"
          rank: 4
          performancePercent: 100
        - weaponId: "70"
          rank: 9
          performancePercent: 96.1
        - weaponId: "70"
          rank: 4
          performancePercent: 91
        - weaponId: "1281"
          rank: 9
          performancePercent: 90.5
        - weaponId: "1281"
          rank: 4
          performancePercent: 86.8
  generalNotes: "Die redaktionelle Favoritenliste Jadegefäß und Long Heritage stammt aus meinem Mobalytics-Pre-Guide; Khravengger ist eine unabhängige, seit dem Release erkennbare Alternative. Die offizielle Waffenmatrix und Materialkosten kommen aus SKPORT. Datafield-Prozente gelten nur für das benannte Main-DPS-Szenario. Eine zweite, noch nicht eindeutig überprüfte Support-Modellreihe wird nicht fälschlich mit dem ersten Modell vermischt."
equipment:
  builds:
    - id: "si-main"
      title: "Meta – Type 50 Yinglung mit LYNX Slab"
      role: "main-dps"
      meta: true
      metaSummary: "Drei neue Type-50-Yinglung-Teile plus LYNX Slab als Off-Piece: meine Hauptempfehlung für Sis Combo-Damage im Cryo-Main-/Sub-DPS-Einsatz."
      items: ["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "365"]
      availableFromLevel: 70
      teamContext: "Main DPS und Sub DPS, besonders wenn andere Teammitglieder die nötigen Battle Skills für Yinglung's Edge einsetzen."
      evaluation: "Dies ist das bewusst gewählte Meta-Setup meines persönlichen Theorycraftings: neue Soft Armor und Gauntlets sowie der Beacon aktivieren den Dreier-Bonus; die LYNX Slab belegt den vierten Slot. Die inzwischen im Spiel sichtbare Setwirkung gibt ANG +15 %, und Battle Skills beliebiger Teammitglieder verleihen bis zu drei Yinglung's Edge-Stapel (je 20 % Schaden auf die nächste Combo). Das bestätigt den grundsätzlichen Fokus auf Sis Tinten-Lung, aber eine vollständige DPS-Rangliste gegen alle neuen Off-Pieces hängt vom Team und der benötigten Ultimate-Energie ab."
      setBonusNotes: "3× Type 50 Yinglung: ANG +15 %, je Battle Skill eines Teammitglieds ein Stapel Yinglung's Edge bis maximal drei; je Stapel +20 % Schaden auf Sis nächste Kombofertigkeit. LYNX Slab als Off-Piece."
      craftingNotes: "Die drei am 15.10. neu veröffentlichten Type-50-Teile haben noch keine eindeutig zugeordneten numerischen IDs in unserem aktuellen SKPORT-Katalog. Bilder/Namen sind aus der Community-Wiki; der Build-Finder kennzeichnet Herstellung und Blaupausen deshalb ausdrücklich als unbestätigt statt sie als verfügbar vorzutäuschen."
    - id: "si-energy"
      title: "Type 50 · Alternative mit Ultimate-Energie"
      role: "sub-dps"
      meta: false
      items: ["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "334"]
      availableFromLevel: 70
      teamContext: "Wenn die Ultimate in deiner tatsächlichen Rotation sonst nicht rechtzeitig für den Team-Buff zurückkehrt."
      evaluation: "Die drei Type-50-Teile bleiben für Combo-Schaden erhalten, ein Xiranit Power Core ersetzt das LYNX-Off-Piece als situationsabhängige Option. Nur nutzen, wenn dadurch ein relevanter Ultimate-Einsatz rechtzeitig möglich wird; sonst bleibt das LYNX-Standardsetup. Das ist keine Behauptung, diese Variante sei allgemein stärker."
      setBonusNotes: "3× Type 50 Yinglung bleibt aktiv; Eternal-Xiranite-Teil im Off-Slot aktiviert ohne weitere Teile keinen eigenen zweiten Setbonus."
      craftingNotes: "Type-50-Rezepte/Blueprint-IDs für die neuen Teile bis zur offiziellen SKPORT-Verifikation als unbestätigt behandeln."
    - id: "si-maximum-combo"
      title: "Combo-Fokus · zwei Type-50-Beacons"
      role: "main-dps"
      meta: false
      items: ["type-50-yinglung-soft-armor", "eternal-xiranite-channeling-gloves", "type-50-yinglung-beacon", "type-50-yinglung-beacon"]
      availableFromLevel: 70
      teamContext: "Experimentelle Maximierung des eigenen Tinten-Lung-Schadens nach bekannten Release-Werten; nicht das voreingestellte eigene Meta-Setup."
      evaluation: "Unabhängige frühe Berechnungen vergleichen den Combo-Bonus von zwei Type-50-Beacons mit einem Eternal-Xiranite-Channeling-Gloves-Off-Piece. Diese alternative Kombination ist vor allem für Main-DPS-Szenarien interessant, wenn alle drei Yinglung's Edge-Stapel vor der Combo verlässlich entstehen. Sie weicht ausdrücklich von meiner voreingestellten LYNX-Variante ab und ist keine nachträgliche Umschreibung des eigenen Pre-Guides."
      setBonusNotes: "Soft Armor + zwei Beacons = drei Type-50-Teile. Channeling Gloves bleiben ein einzelnes Off-Piece."
      craftingNotes: "Neue Wiki-Gegenstände ohne offiziell numerisch bestätigte SKPORT-IDs; der Finder prüft die Existenz der Blaupausen nicht automatisch."
    - id: "si-support-xiranite"
      title: "Support · Eternal Xiranite 1.6"
      role: "support"
      meta: true
      metaSummary: "Support-Alternative ohne weiteren Xiranit-Setträger: drei neue Xiranit-Teile plus Power Core für Team-Buffs und flexibles Ultimate-Timing."
      items: ["eternal-xiranite-overalls", "eternal-xiranite-channeling-gloves", "eternal-xiranite-rangefinder", "334"]
      availableFromLevel: 70
      teamContext: "Nur wenn kein anderer Operator bereits den relevanten Eternal-Xiranite-Setbonus bereitstellt."
      evaluation: "Für Si als Support kann statt der Type-50-DPS-Ausrüstung ein 1.6-Xiranit-Setup sinnvoll sein. Es unterstützt die Team-Buff-Rolle, wenn sonst kein Xiranit-Nutzer im Team vorhanden ist. Da die genaue Ultimate-Energieeffizienz unterschiedlich ausfallen kann, sollte die Off-Piece-Wahl nicht ohne eigene Rotation verallgemeinert werden. Dieses Setup ist eine bedingte Alternative aus dem eigenen Pre-Guide, keine absolute DPS-Empfehlung."
      setBonusNotes: "Der Xiranit-3er-Bonus kann in einem Team normalerweise nicht mehrfach sinnvoll gestapelt werden; zuerst die vorhandenen Support-Ausrüstungen prüfen."
      craftingNotes: "Neue 1.6-Xiranit-Items vorläufig mit Wiki-Namen und lokalem WebP. Offizielle Item-IDs/Blueprint-Erwerb separat nachtragen."
    - id: "si-level60"
      title: "Level 60 · AIC Fieldwork"
      role: "main-dps"
      meta: false
      items: ["1116", "1122", "1120", "1120"]
      availableFromLevel: 60
      teamContext: "Vorläufige Progressionskonfiguration, solange neue Level-70-Teile noch nicht vorhanden sind."
      evaluation: "Das AIC-Fieldwork-Set stellt frühzeitig Haupt- und Sekundärattribute sowie nutzbare allgemeine Werte bereit. Für Si stehen dabei Intellekt und Stärke im Vordergrund. Die beiden Ember-Kits unterstützen ein vorläufiges Setup; konkrete Skill- und Ultimate-Energie-Nutzung hängt von der verfügbaren Ausrüstung und der Combo-Rotation ab."
      setBonusNotes: "Übergang bis Type-50- beziehungsweise Xiranit-Ausrüstung; kein behaupteter Endgame-DPS-Vergleich."
  progression:
    - stage: "early"
      note: "Vor dem Endgame Ausrüstung mit Intellekt und Stärke wählen, verfügbare Blaupausen prüfen. Keine theoretischen 1.6-Endgame-Teile vorzeitig als verfügbar voraussetzen."
    - stage: "mid"
      note: "Level 60: bestehende AIC-Fieldwork-Teile mit Haupt- und Sekundärattribut verwenden, bis die neuen Type-50-Blueprints zuverlässig erreichbar sind."
    - stage: "late"
      note: "Ab Level 70: Type 50 Yinglung (Soft Armor, Gauntlets, Beacon) und LYNX Slab als Ziel, bei Ultimate-Energieproblemen bedingte Alternative. SKPORT-Item-IDs und Rezepte der neuen Stücke sind noch nicht im lokalen Katalog."
    - stage: "endgame"
      note: "Prüfe für Support-Teams, ob bereits ein anderer Eternal-Xiranite-Nutzer vorhanden ist, und teste Combo-Schadens- sowie Ultimate-Effizienz nach realen Timings."
  generalNotes: "Stand 16.10.2026: Die drei neuen Type-50-Teile und mehrere neue Xiranit-Teile sind in der aktuellen Talos-/Release-Wiki belegt, aber noch nicht eindeutig mit numerischen Item-IDs und Fertigungsrezepten im zuvor importierten SKPORT-Katalog verknüpft. Diese Builds sind echte redaktionelle Empfehlungen, keine als vollständig nachgewiesen bewerteten Blaupausen. Der Build-Finder gibt entsprechend Status „ungeprüft“ statt eine erfundene Freischaltung auszugeben."
potentials:
  entries:
    - level: 1
      evaluation: "Die verlängerte Bewegungsunfähigkeit und der höhere Schadensspeicherwert vergrößern Sis Kontroll- und Burstfenster. Bei beweglichen Zielen besonders nützlich, aber nicht nötig, damit die Tintenseele funktioniert."
      increaseOverPreviousPercent: 5.6
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 2
      evaluation: "Ein zusätzlicher ANG-Buff für Si nach der Kombo; die Höhe wächst mit verbrauchten oder absorbierten Kumulierungen eines einzelnen Ziels. Gerade für ihre eigene DPS-Rolle attraktiv."
      increaseOverPreviousPercent: 6.2
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 3
      evaluation: "Verstärkt Schaden UND Kryo-/Hitze-Verstärkung ihrer Ultimate auf das 1,2-Fache. Auch für Teamsupport relevant, nicht nur für persönliche DPS."
      increaseOverPreviousPercent: 3.6
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 4
      evaluation: "Die Ultimate kostet 15 % weniger Energie. Der Nutzen hängt entscheidend davon ab, ob du dadurch innerhalb der tatsächlichen Rotation einen früheren oder zusätzlichen Einsatz erreichst."
      increaseOverPreviousPercent: 2.8
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 5
      evaluation: "Die Combo erhält 15 % mehr Schaden, zwei Sekunden weniger Abklingzeit und zählt ein weiteres Infliction-Stack beim Auslösen. Dadurch verstärkt P5 auch den Bonus von P2; für Haupt-DPS besonders interessant."
      increaseOverPreviousPercent: 9.3
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
teams:
  introduction: "Si gehört sowohl in Kryo- als auch in Hitze-Teams und lässt sich in ihrem eigenen Team als Main DPS führen. Bei Laevatain an Teamposition 1 verursacht ihre erste Kampffertigkeit Hitze-Kumulierung; in den übrigen ausgewiesenen Cryo-/Neutral-Szenarien Kryo. Wichtig sind die spätere Absorption oder der Verbrauch dieser Stacks für die Combo, der Zeitpunkt der Tintenseelen-Rückkehr und ihr Ultimate-Buff. Die nachfolgenden sechs Meta-Teams und 37 alternativen Konstellationen entsprechen der detaillierten Theorycrafting-Aufstellung meines Mobalytics-Guides vom 16. Oktober. Meta bedeutet hier redaktionell hervorgehoben – nicht, dass schon zu jeder Kombination unabhängig vermessene optimale Rotationen vorliegen. Die Auswahl der übrigen Operatoren beeinflusst FP-Wirtschaft und Reaktionsketten deutlich."
  roles: ["support", "sub-dps", "main-dps"]
  meta:
    - id: "yvonne-1"
      title: "Yvonne · Tangtang · Xaihi"
      role: "support"
      members: ["yvonne", "tangtang", "xaihi", "si"]
      buildId: "si-main"
      evaluation: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Tangtang ergänzt die Kryo-Rotation. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
    - id: "last-rite-10"
      title: "Last Rite · Tangtang · Xaihi"
      role: "support"
      members: ["last-rite", "tangtang", "xaihi", "si"]
      buildId: "si-main"
      evaluation: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Tangtang ergänzt die Kryo-Rotation. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
    - id: "laevatain-16"
      title: "Laevatain · Wulfgard · Camille"
      role: "support"
      members: ["laevatain", "wulfgard", "camille", "si"]
      buildId: "si-support-xiranite"
      evaluation: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
    - id: "rossi-25"
      title: "Rossi · Mi Fu · Gilberta"
      role: "support"
      members: ["rossi", "mi-fu", "gilberta", "si"]
      buildId: "si-main"
      evaluation: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
    - id: "si-34"
      title: "Tangtang · Arcane · Xaihi"
      role: "main-dps"
      members: ["si", "tangtang", "arcane", "xaihi"]
      buildId: "si-main"
      evaluation: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
    - id: "si-35"
      title: "Tangtang · Arcane · Gilberta"
      role: "main-dps"
      members: ["si", "tangtang", "arcane", "gilberta"]
      buildId: "si-main"
      evaluation: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Als redaktionelles Meta-Team im Theorycrafting markiert; seit dem Release als Ausgangsbasis für weitere Optimierung."
  more:
    - id: "yvonne-2"
      title: "Yvonne · Arcane · Xaihi"
      role: "support"
      members: ["yvonne", "arcane", "xaihi", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-3"
      title: "Yvonne · Tangtang · Arcane"
      role: "support"
      members: ["yvonne", "tangtang", "arcane", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-4"
      title: "Yvonne · Snowshine · Alesh"
      role: "support"
      members: ["yvonne", "snowshine", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-5"
      title: "Yvonne · Perlica · Alesh"
      role: "support"
      members: ["yvonne", "perlica", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-6"
      title: "Yvonne · Snowshine · Perlica"
      role: "support"
      members: ["yvonne", "snowshine", "perlica", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-7"
      title: "Yvonne · Arcane · Fluorite"
      role: "support"
      members: ["yvonne", "arcane", "fluorite", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-8"
      title: "Yvonne · Arcane · Gilberta"
      role: "support"
      members: ["yvonne", "arcane", "gilberta", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "yvonne-9"
      title: "Yvonne · Arcane · Purrchena"
      role: "support"
      members: ["yvonne", "arcane", "purrchena", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "last-rite-11"
      title: "Last Rite · Arcane · Xaihi"
      role: "support"
      members: ["last-rite", "arcane", "xaihi", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "last-rite-12"
      title: "Last Rite · Tangtang · Arcane"
      role: "support"
      members: ["last-rite", "tangtang", "arcane", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "last-rite-13"
      title: "Last Rite · Snowshine · Alesh"
      role: "support"
      members: ["last-rite", "snowshine", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "last-rite-14"
      title: "Last Rite · Perlica · Alesh"
      role: "support"
      members: ["last-rite", "perlica", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "last-rite-15"
      title: "Last Rite · Snowshine · Perlica"
      role: "support"
      members: ["last-rite", "snowshine", "perlica", "si"]
      buildId: "si-main"
      note: "Kryo-Team aus dem Pre-Guide: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-17"
      title: "Laevatain · Akekuri · Camille"
      role: "support"
      members: ["laevatain", "akekuri", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-18"
      title: "Laevatain · Ardelia · Camille"
      role: "support"
      members: ["laevatain", "ardelia", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-19"
      title: "Laevatain · Antal · Camille"
      role: "support"
      members: ["laevatain", "antal", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-20"
      title: "Laevatain · Wulfgard · Akekuri"
      role: "support"
      members: ["laevatain", "wulfgard", "akekuri", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-21"
      title: "Laevatain · Antal · Akekuri"
      role: "support"
      members: ["laevatain", "antal", "akekuri", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-22"
      title: "Laevatain · Antal · Ardelia"
      role: "support"
      members: ["laevatain", "antal", "ardelia", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-23"
      title: "Laevatain · Wulfgard · Ardelia"
      role: "support"
      members: ["laevatain", "wulfgard", "ardelia", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "laevatain-24"
      title: "Laevatain · Wulfgard · Perlica"
      role: "support"
      members: ["laevatain", "wulfgard", "perlica", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-26"
      title: "Rossi · Mi Fu · Camille"
      role: "support"
      members: ["rossi", "mi-fu", "camille", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-27"
      title: "Rossi · Mi Fu · Pogranichnik"
      role: "support"
      members: ["rossi", "mi-fu", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-28"
      title: "Rossi · Endministrator · Gilberta"
      role: "support"
      members: ["rossi", "endministrator", "gilberta", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-29"
      title: "Rossi · Endministrator · Camille"
      role: "support"
      members: ["rossi", "endministrator", "camille", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-30"
      title: "Rossi · Endministrator · Pogranichnik"
      role: "support"
      members: ["rossi", "endministrator", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-31"
      title: "Rossi · Chen Qianyu · Pogranichnik"
      role: "support"
      members: ["rossi", "chen-qianyu", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-32"
      title: "Rossi · Lifeng · Pogranichnik"
      role: "support"
      members: ["rossi", "lifeng", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "rossi-33"
      title: "Rossi · Chen Qianyu · Lifeng"
      role: "support"
      members: ["rossi", "chen-qianyu", "lifeng", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung aus dem Pre-Guide: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-36"
      title: "Tangtang · Alesh · Xaihi"
      role: "main-dps"
      members: ["si", "tangtang", "alesh", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-37"
      title: "Tangtang · Perlica · Xaihi"
      role: "main-dps"
      members: ["si", "tangtang", "perlica", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-38"
      title: "Arcane · Alesh · Xaihi"
      role: "main-dps"
      members: ["si", "arcane", "alesh", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-39"
      title: "Arcane · Alesh · Gilberta"
      role: "main-dps"
      members: ["si", "arcane", "alesh", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-40"
      title: "Arcane · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "arcane", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-41"
      title: "Tangtang · Alesh · Gilberta"
      role: "main-dps"
      members: ["si", "tangtang", "alesh", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-42"
      title: "Tangtang · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "tangtang", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
    - id: "si-43"
      title: "Snowshine · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "snowshine", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Eine dokumentierte Team-Alternative aus dem Theorycrafting, nicht als bereits vermessene DPS-Rangliste zu verstehen."
gameplay:
  explanation: "Starte mit Si an Position 1, wenn du selbst ihren Kryo-DPS spielen möchtest; mit einer Hitze-Main-DPS auf Position 1 wird ihre Kumulierung zu Hitze. Kampffertigkeit Dimension der Pinselkunst auf das priorisierte Ziel setzen: Künstlerische Absicht, Bewegungsunfähigkeit und die passende Kumulierung werden angebracht. Der anschließende Erste Pinselstrich kostet 15 FP und erzeugt die Tintenseele; kontrolliere deshalb bereits vorher die Team-FP. Während der Debuff aktiv ist, können Angriffe, Reaktionen und Effekte auf der Tintenseele dem Wirt zugeführt werden und Schaden für die Festschaden-Explosion speichern. Der Letzte Pinselstrich ist kostenlos, beendet die Tintenseele aber auch vorzeitig: nur drücken, wenn genug Schaden gespeichert wurde oder das Team jetzt den Hast-Buff aus Blütenreiner Pinsel benötigt. Für Sis Combo Vision vor Auge gezielt Kryo- oder Hitze-Kumulierungen auf dem Hauptziel verbrauchen/absorbieren. Je mehr auf EINEM Ziel entfernt werden, desto besser die Tinten-Lung-Combo. Wenn Si Type 50 Yinglung trägt, idealerweise zuvor bis zu drei Battle Skills beliebiger Teammitglieder für Yinglung's Edge einsetzen. Ihre Ultimate Spielverderber verboten vor einem Kryo-/Hitze-Schadensfenster nutzen, um dem Team Amp zu geben und die Combo-Abklingzeit des Operators auf Teamposition 1 zu reduzieren. Dabei die beiden unterschiedlichen Prioritäten beachten: Als Main DPS zuerst Combo > Battle; als Support zuerst Ultimate > Battle. Das ist eine funktionsfähige Grundrotation aus dem eigenen Pre-Guide und den seit Release bestätigten Mechaniken, keine behauptete framegenaue, universell maximale Bossrotation. Konkrete Video-Showcases werden nach echten verifizierten Aufnahmen ergänzt."
  pending: true
  showcases: []
conclusion:
  verdict: "Si ist nach dem Release eine außergewöhnlich vielseitige Kryo-Unterstützerin mit dem Potenzial, selbst Main DPS oder Sub DPS zu spielen. Die von mir markierten Teams decken Yvonne, Last Rite, Laevatain, Rossi sowie Si-als-DPS ab. Ihre Stärke ist nicht nur persönlicher Kombofertigkeitsschaden, sondern die Kontrolle über Tintenseele und Künstlerische Absicht sowie der Buff für Kryo und Hitze. Die Mechaniken sind grundsätzlich gut zugänglich; erst FP-Timing, Reaktionsfenster und exakte Teamreihenfolge machen sie anspruchsvoller."
  recommendation: "recommended"
  pullAdvice: "Für Accounts mit Kryo- oder Hitze-Schwerpunkt ist Si eine besonders interessante Ergänzung. Dank hoher Flexibilität kann sie verschiedene Teamrollen füllen und auch eine eigene DPS-Aufstellung ermöglichen. Jadegefäß und Type-50-Set sind meine bevorzugte Investitionsrichtung, die neuen Item-IDs und die ersten unabhängigen Rotationsvergleiche sind aber kurz nach dem Release noch nicht vollständig bestätigt. Wer ausschließlich maximale eigene Burst-Zahlen verfolgt, sollte das finale Feintuning mit etablierten Rechnungen und der eigenen FP-Rotation vergleichen."
  recommendedFor:
    - "Yvonne- und Last-Rite-Teams, die zusätzliche Kryo-Kumulierung, Kontrolle und Kryo-Verstärkung nutzen."
    - "Laevatain-Teams, in denen Si bei einem Hitze-Operator auf Teamposition 1 Hitze statt Kryo auftragen kann."
    - "Spieler, die Si als Main DPS mit Combo-Fokus und passender Teamunterstützung ausbauen möchten."
    - "Accounts, die flexible Rollenkombinationen und experimentelles Team-Timing schätzen."
  skipIf:
    - "Du suchst ausschließlich einen völlig rotationsunabhängigen Support ohne FP-Management."
    - "Du hast keine Nutzung für Kryo-/Hitze-Verstärkung und möchtest das neue Ausrüstungs-Set nicht investieren."
    - "Du willst jede Optimierung unmittelbar als mathematisch endgültig bestätigt ansehen; die 1.6-Meta ist noch sehr frisch."
  closingNote: "Einsteigerfreundlichkeit 3/5: Grundmechaniken lassen sich recht schnell anwenden, das präzise Setup mit Künstlerischer Absicht, Tintenseele, Kombo und FP ist deutlich komplexer. Flexibilität 5/5: starke redaktionelle Vielfalt – insbesondere die sechs Meta-Aufstellungen aus meinem Mobalytics-Guide. Potenziale sind optionale Investitionen; die angegebenen Datafield-Prozente beziehen sich ausschließlich auf die unmittelbar vorherige Stufe und das veröffentlichte DPS-Simulationsmodell. Für konkrete Gameplay-Runs folgt nach dem Release ein eigener Si-Videoguide, statt hier fremde oder nicht existente Showcases vorzutäuschen."
---

Mit Si können unterschiedliche Teamkonzepte entstehen. Aktuelle offizielle SKPORT-Daten, eigene redaktionelle Empfehlungen und die simulationsabhängigen Datafield-Zahlen werden hier bewusst getrennt ausgewiesen. Stand: 16. Oktober 2026.
