# Gravel Outfit 0.22.0

- Die automatische Empfehlung verwendet die neuen Tourregeln, den verfügbaren Bestand und die persönlichen Temperaturbereiche. Die Excel-Kategorien bleiben als Stammdaten für ältere Bestände und Fahrten verfügbar.
- Die App unterscheidet Anziehen, Mitnehmen und Wechsel am Aufenthalt. Sie prüft gemeinsame Baselayer und Handschuhe. Regen im angrenzenden Wetterintervall wird als Reserve berücksichtigt. Schnee und Regenanteil werden getrennt ausgewertet.
- Die Bewertung speichert je Fahrabschnitt die bestätigte Trageauswahl, Wärme und Nässe nach Körperzone. Der Aufenthalt zwischen bestätigtem Hin- und Rückweg zählt nicht zur Fahrbewertung.
- Nach drei vergleichbaren Rückmeldungen kann die App einen gelernten Bereich um bis zu 2 °C gegenüber der eingestellten Grenze anpassen. Die persönliche Einstellung bleibt gespeichert. Rückmeldungen werden für die relative Übertragung ausgehend vom damaligen Bereich ausgewertet.
- Der JSON-Export enthält die gespeicherte ursprüngliche Empfehlung, die bestätigte Trageauswahl, die damaligen Temperaturbereiche, vorhandene Wetterdaten und Rückmeldungen. `seasonIndex` verweist auf Fahrten und Bewertungsstatus. Fahrten aus älteren Versionen enthalten die ursprünglich erfassten Angaben.
- Wiederholt gemeldetes Schwitzen und Bewertungen an Anstiegen oder Abfahrten liefern Hinweise. Die App verwendet dafür die Wetterdaten des bewerteten Fahrabschnitts. Ein genauer Zeitpunkt des einzelnen Anstiegs oder der Abfahrt wird nicht erfasst.

## Prüfstand

Automatisierte Tests einschließlich 12 → 5 °C und 14 → 10 °C mit Aufenthalt, geringem Temperaturwechsel ohne Aufenthalt, warmem Nebel, Regenpuffer, Schnee, Learning und JSON-Rundlauf. Die Windschwellen und Temperaturtoleranzen sind Startwerte für die Erprobung. Tests am iPhone und mit dem eigenen Kleiderschrank stehen aus.

## Installation

Die Dateien des ZIP-Archivs in das Stammverzeichnis des bestehenden GitHub-Pages-Projekts übernehmen. Bei derselben Adresse und im selben Browser verwendet die App weiterhin die bestehende IndexedDB. Wetterdaten können bei bestehender Internetverbindung aktualisiert werden. Nach dem ersten vollständigen Laden steht die App auch offline bereit.
