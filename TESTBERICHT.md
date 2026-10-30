# Prüfung Gravel Outfit 0.12.0

- 174 automatisierte Tests erfolgreich: bestehende Bekleidungs-, Lern-, Daten- und Wettertests sowie 26 neue GPX-/Planungstests.
- Zusätzlicher DOM-Integrationstest mit der tatsächlichen HTML-/JS-Anwendung und simuliertem IndexedDB: geplantes Datum bleibt nach Darstellungswechsel erhalten; Abruf verwendet den gewählten Zeitpunkt; Standortanzeige; GPX-Import ohne automatischen Upload; Hin-/Rückfahrt mit Aufenthalt; unterschiedliche Fahrtdauern; veraltete Prognose nach Planänderung.
- Live-Abruf bei Open-Meteo mit öffentlichen Berliner Testkoordinaten erfolgreich: mehrere Orte, 60 Minuten Hinfahrt, 45 Minuten Aufenthalt, 90 Minuten Rückfahrt; 150 Minuten Fahrzeit / 195 Minuten Gesamtzeit. Keine persönlichen Standort- oder Routendaten verwendet.
- Dauern: 30 bis 360 Minuten in 30-Minuten-Schritten, getrennt für Hin-/Rückfahrt. Ungültige Werte werden abgewiesen; alte Werte nicht umgeschrieben.
- GPX: Namespaces, Tracks/Routen, XML-Entities und CDATA, doppelte Punkte, Datumsgrenze, große Dateien, unverbundene Segmente und unzulässige XML-Strukturen geprüft.
- Datenerhalt: JSON-Rundlauf einschließlich Route, Planung und Prognose; bestehende Bekleidung und Lernhistorie durch Regressionstests abgedeckt. IndexedDB bleibt Version 6, Datenschema 7.
- Fehlerfälle: fehlende Wetterpunkte, Netzwerkfehler, veränderte Planung und fehlende Standortangabe alter Prognosen. Keine Teilprognose wird übernommen.
- Service-Worker-Dateiliste einschließlich route.js und planning.js auf vorhandene Dateien geprüft; bestehender Offlinebetrieb erhalten. Neue Wetterdaten benötigen Internet.

Grenzen: Kein Test auf einem physischen iPhone und kein neuer visueller Bildschirmtest. DOM-Tests ersetzen keinen Safari-Gerätetest. Keine Bildschirmaufnahme verwendet. Die veröffentlichte Hauptversion wird nicht automatisch geändert.
