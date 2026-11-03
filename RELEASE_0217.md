# Gravel Outfit 0.21.7

- Tourdauer wird in Stunden angezeigt (0,5 bis 6 Stunden, 30-Minuten-Schritte).
- Geplante Startzeiten und Rückfahrtzeiten in 30-Minuten-Schritten.
- Hin- und Rückweg: geplante Rückfahrt direkt mit Datum und Uhrzeit auswählen. Aufenthalt wird daraus berechnet (bis 24 Stunden). Jetzt verwendet weiterhin den tatsächlichen Zeitpunkt; hier bleibt die Aufenthaltsdauer auswählbar.
- Bestehende gespeicherte Zwischenzeiten bleiben erhalten und werden als bisher gespeichert angeboten.
- Gute Sichtbarkeit bei allen Kleidungsarten auswählbar und in Eigenschaften sichtbar. Bei gleich geeigneten Teilen werden sichtbare äußere Teile bei schlechter Sicht bevorzugt. Baselayer werden dadurch nicht außen getragen. Die vorhandene Regel für die sichtbare Weste über den anderen Oberkörperschichten bleibt erhalten.
- IndexedDB-Daten, Kleidungsstücke, Fahrten und Learning bleiben erhalten; kein Zurücksetzen und keine Datenbankmigration erforderlich.

Prüfung: 306 automatisierte Tests erfolgreich, darunter sechs neue Fälle für Rückfahrtplanung, Datumswechsel, ungültige Rückfahrt, Altdaten und Sichtbarkeit. Sichtprüfung im interaktiven Browser in dieser Sitzung noch nicht erfolgt.
