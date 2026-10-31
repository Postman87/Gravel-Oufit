# Gravel Outfit 0.18.1

Offlinefähige PWA mit HTML, CSS, Vanilla JavaScript und IndexedDB für das bestehende Repository postman87/Gravel-Oufit.

## Neue Empfehlungsgrundlage

Ausschließliche Excel-Regelquelle ist die korrigierte Radbekleidung_KI_2.xlsx vom 31.10.2026. Der Quelldatensatz mit Zelladressen, Texten und Farben liegt unter data/excel-source.json. Frühere Excel-Regeln und produktspezifische Farburteile werden nicht mehr zur Berechnung verwendet.

| Temperatur | Basisschicht | Midlayer | Toplayer | Hose |
|---|---|---|---|---|
| ab 16 °C | ärmellos | Kurzarm | kein zusätzlicher Toplayer | kurz |
| 11–15 °C | Kurzarm | Kurzarm | Windweste | lang |
| 6–10 °C | Kurzarm | Langarm-/Thermotrikot; Kurzarm plus Armlinge nur als Ersatz | Windweste | winddicht |
| 1–5 °C | Thermo-Langarm | Thermo-Langarm | Wind- oder Thermojacke | Thermo |
| 0 °C und kälter | Thermo-Langarm | Thermo-Langarm | Thermojacke | Thermo |

Die Quelle überlappt bei 0 °C; dort gilt die kältere Stufe. Die Tabelle ist ein Richtwert. Geänderte persönliche Temperaturbereiche und Zonenlearning können die Wahl verschieben. Die Intensitätseinstellung bleibt erhalten; sie verschiebt die Richtwerte leicht, ohne die frühere Excel-Intensitätstabelle zu verwenden.

Grün bedeutet laut Quelle vorhanden, Rot bezeichnet noch fehlende Zielteile, Gelb die vorgesehenen Ersatzkombinationen. Die tatsächliche Empfehlung verwendet ausschließlich aktive, verfügbare Kleidungsstücke des Nutzers. Die Kategorienliste erzeugt keine Kleidungsstücke. Der bisherige Import alter Excel-Produkte entfällt.

Vorgesehene Ersatzkombinationen: kurzer Baselayer mit Armlingen, Kurzarm-Trikot mit Armlingen, Windweste plus Regenjacke und lange Hose plus Regenhose. Gemeinsame Armlinge werden nur einmal getragen. Regenkleidung ist eine äußere Schutzschicht über dem Toplayer; bei Regen greift sie in allen Temperaturstufen. Bei unzureichender Kombination wird verfügbare Regenkleidung zusätzlich als Windbarriere geprüft. Sie wird nicht als Thermokleidung gezählt. Verbleibende Wärme- oder Schutzdefizite bleiben sichtbar.

Bei 6–10 °C wird ein verfügbares Stirnband bevorzugt. Ohne verfügbares Stirnband wird eine vorhandene Mütze als Alternative geprüft. Ein Stirnband kann nun als eigene Art erfasst werden.

## Zwischenbewertung

Für eine geplante Hin- und Rücktour mit Aufenthalt erscheint während der Tour „Hinweg bewerten“. Kleidung und gegebenenfalls Zip-off-Variante bestätigen, Komfort/Zonen bewerten und „Hinweg speichern und Aufenthalt beginnen“ wählen. Die Tour bleibt aktiv, Kleidung wird nicht in die Wäsche gelegt. „Rückfahrt starten“ erfasst das tatsächliche Ende des Aufenthalts. Die abschließende Bewertung betrifft den Rückweg.

Hin- und Rückmeldung bleiben in einer Tour gespeichert. Das Learning berücksichtigt beide separat, ohne den Hinweg doppelt zu zählen. Wetter und nachträglicher Abgleich verwenden die tatsächlichen Teilzeiten. Der Aufenthalt ist von beiden Fahrbewertungen ausgeklammert. Ohne zeitlichen Wetterverlauf werden die manuellen Temperaturangaben näherungsweise verwendet. Eine Zwischenbewertung ist optional; ohne sie funktioniert das bisherige Tourende weiter.

## Daten und Installation

Bestehende Kleidung, IDs, persönliche Temperaturbereiche, Pflege, Einstellungen und Fahrtrückmeldungen bleiben erhalten. Die Datenbank wird nicht gelöscht oder zurückgesetzt. Zusätzliche Bewertungsfelder sind rückwärtskompatibel ergänzt; IndexedDB-Version 6 und Datenschema 7 bleiben bestehen. Bei Regenjacken wird nur die Anzeige der Kategorie auf „Nässe-/Windschutz“ aktualisiert. Historische Empfehlungen bleiben als damalige Snapshots erhalten.

Vor dem Aktualisieren JSON exportieren. ZIP entpacken und Inhalte auf derselben Repository-Ebene wie bisher übernehmen; index.html liegt direkt im Projektordner. Nach GitHub-Pages-Veröffentlichung alle App-Tabs schließen und die gewohnte Adresse erneut online öffnen. Einstellungen müssen Version 0.18.1 zeigen. Danach sind Kleiderschrank, Planung mit manuellem Wetter und Rückmeldungen offline nutzbar. Wetterabfragen benötigen Internet.

Kein automatisches Deployment. Details zu Prüfungen in TESTBERICHT.md.

## Korrektur 0.18.1
Nach persönlicher Präzisierung vom 31.10.2026: winddichte Armlinge belegen keine ausreichende Isolierung. Bei 6–10 °C gelten Kurzarmtrikot und Armlinge ohne hinterlegte ausreichende Wärmeleistung als eingeschränkter Ersatz. Eine verfügbare windschützende Regenjacke wird zusätzlich eingeplant. Die Wärmeleistung der Regenjacke bleibt gering; ein Hinweis auf unbestätigte Arm-Isolierung bleibt sichtbar. Ausreichend isolierende Armlinge oder eine geeignete lange Trikotschicht lösen keine pauschale Regenjackenpflicht aus. Vorhandene Temperaturbereiche und Materialangaben werden nicht verändert. Der Rohdatensatz der Excel-Datei bleibt unverändert; diese Präzisierung ist eine zusätzliche Nutzerregel.
