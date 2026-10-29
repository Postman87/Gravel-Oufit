# Fachliche Ausgangswerte · Version 0.9.0

Ausgewertet wurde `Radbekleidung_KI.xlsx` einschließlich aller vier Blätter, nicht leerer Zellen, Formatvorlagen und Zellfüllfarben. Originaldatei unverändert. Die vollständigen extrahierten Zellwerte, Farbzuordnungen und der SHA-256 stehen in `data/excel-source.json`; die ausführbaren Regeln in `excel-rules.js`.

## Temperatur und Kategorien

Führend: **Kategorien nach T.**, A7:F12. Kategorien: Baselayer, Midlayer (Oberkörper), Toplayer, Hose, Extras.

| Quellbereich | Baselayer | Midlayer | Toplayer | Hose | Extras |
|---|---|---|---|---|---|
| 16 bis über 20 °C | ärmellos | Kurzarmtrikot | keiner | kurze Radhose | UV-Schutz |
| 11–15 °C | Baselayer | Kurzarmtrikot | Windweste in der Tasche | lange Radhose | dünne Handschuhe bei Wind |
| 6–10 °C | Kurzarm-Baselayer | Langarm-/Thermotrikot | Windweste | winddichte Hose | Langfingerhandschuhe, Stirnband |
| 0–5 °C | langer Thermo-Baselayer | Langarm-Thermotrikot | Wind-/Thermojacke | Thermohose | Handschuhe, Überschuhe, Mütze |
| 0 °C und kälter | langer Thermo-Baselayer | Langarm-Thermotrikot | Thermojacke | Thermohose | Winterhandschuhe, Überschuhe, Mütze |

Der überlappende Nullpunkt wird vorsichtig der kälteren Stufe zugeordnet; praktisch gilt die vorletzte Stufe für ganze Werte 1–5 °C. Die obere Stufe reicht im neuen Bedienbereich bis +40 °C. Die Tabelle ist Ausgangspunkt, kein Nachweis ausreichenden Schutzes bei extremen Temperaturen. Die Produktbereiche im Blatt **Temperatur und Kleidung**, etwa Thermo-Tight 0–10 °C und Airblocc-Tight −5–8 °C, sind als Produktangaben erhalten, keine zusätzlichen pauschalen Wetterstufen.

## Bestand und Bewertungsfarben

**Allgemein inkl Bestand** und **Temperatur und Kleidung** enthalten die tatsächlichen Zuordnungen. Grün (`92D050`) bedeutet geeignet vorhanden, Gelb (`FFFF00`) Ersatz, Rot (`FF0000`) unzureichend. Leerzellen/Farben ohne Kleidungszuordnung erzeugen keine Kleidung.

Zuordnungen: GOREWEAR ärmelloser Baselayer; Pro-Function Baselayer; Wera Tool Rebel Trikot; GOREWEAR Shield Armlinge; Everyday Weste; Lupra 2.0 GORE-TEX Jacke; Lupra GORE-TEX Hose; RevolutionRace-Hose mit zwei Varianten; Shield Thermo-Überschuhe; WINDSTOPPER Thermo-Mütze; Halstuch; Ziener Dabbs WS Touch. Hersteller, konkrete Modelle und Materialkennwerte werden nur übernommen, soweit ausdrücklich bekannt. Pro-Function bleibt als Modellbezeichnung ohne erfundenen Hersteller. Die Excel-Datei enthält keine verlässlichen numerischen Isolations-/Atmungswerte.

### Abweichungen zwischen den Blättern

- Bei 6–10 °C ist Wera allein im Produktblatt rot; das allgemeine Blatt beschreibt Wera plus Armlinge als gelben Ersatz. Nur diese vollständige Kombination gilt als gelber Midlayer-Ersatz.
- Bei 1–5 °C ist Wera allein rot. Wera plus Armlinge plus Lupra wird als ausdrücklich beschriebene gelbe Ersatzkombination geführt. Wärme-/Winddefizite werden zusätzlich weiterhin geprüft.
- RevolutionRace plus Lupra-Hose ist bei 6–10 °C im allgemeinen Blatt gelb, im spezifischen Produktblatt rot. Die App zeigt diesen Widerspruch und wertet den Ersatz vorsichtig als unzureichend. Bei 1–5 °C und Frost bleiben diese Hosen rot.
- Die Thermo-Mütze ist bei 6–10 °C teils grün/gelb, Ziener bei 1–5 °C teils grün/gelb: vorsichtig gelb.
- Thermo-Überschuhe sind bei Frost teils grün/rot: vorsichtig rot.
- Pro-Function, Wera und die Lupra-/Westenlösung bleiben im Frostbereich rot. Hohe numerische Modellwerte oder persönliches Lernen können den roten Quellstatus nicht zu grün machen.

Die App zeigt diese Bewertung separat in „Excel-Bewertung der Ersatzlösungen“. Die grünen/gelben Aktionsfelder „Anziehen“/„Mitnehmen“ bezeichnen den Verwendungszeitpunkt, nicht die fachliche Qualität.

## Intensität und Lernen

**Temperatur und Intensität**, A8:D12, ist unverändert als 5 × 3 Originaltexte enthalten und in den Einstellungen einsehbar. Stütztemperaturen: 20, 15, 10, 5 und 0 °C; Intensitäten niedrig, mittel, hoch entsprechen Locker, Normal, Sportlich. Beispiel 15 °C: locker langer Midlayer und Weste, sportlich kurzer Midlayer ohne erforderliche Weste. Die ursprüngliche Tabelle wird nicht durch Lerndaten überschrieben.

Neue Rückmeldungen dieser Version verändern bei aktivierter Lernfunktion nur die persönliche Temperatureinschätzung: ±0,25 °C je passender Kalt-/Warm-Rückmeldung, höchstens ±2 °C, letzte zwölf passende Fahrten derselben Intensität und mit höchstens 5 °C Temperaturabstand. Alte Fahrten bleiben erhalten, werden aber ohne passende neue Modellkennzeichnung nicht nachträglich als Trainingsdaten interpretiert. Gespeicherte Wetterangaben bleiben unverändert; Anzeige weiterhin in ganzen Graden. Die separate rote Quellenbewertung richtet sich nach den tatsächlichen Außentemperaturen.

## Tourverlauf und Varianten

Start und Ende werden getrennt gerechnet. Physische Kleidungs-IDs dürfen nicht doppelt vorkommen. Zip-off: ein Datensatz, `variants: ["long", "short"]`, ausgewählte Variante in der Planung bzw. im unveränderlichen Fahrtsnapshot. Bei warmem Start und kaltem Ende werden Hosenbeine zum Ansetzen genannt, keine zweite physische Hose. Alte getrennte Lang-/Kurz-Einträge werden zum Schutz bestehender Historien nicht automatisch zusammengeführt.
