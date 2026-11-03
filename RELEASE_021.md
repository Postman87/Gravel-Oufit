# Gravel Outfit 0.21.0

- Wetter aktualisieren behält die aktive GPX-Route und deren Zeitplanung. Nach Abschluss wird die Route unter completedRoute bewahrt und Standortwetter gewählt; Entfernen der GPX stellt ebenfalls Standortwetter her.
- Bewertungsbaum mit Passt als Grundzustand; Start, Ende, gesamte Tour, Anstiege und Abfahrten mit unabhängigen Körperzonen. Mehrere Kontexte werden separat gespeichert. Dasselbe Formular gilt für nachgetragene Touren und Zwischenbewertungen.
- Kontext-Learning: Start und Ende bleiben zeitbezogen. Anstiege und Abfahrten beeinflussen getrennte Hinweise, statt pauschal die allgemeine Temperaturempfehlung zu ändern. Ohne präzisen Abschnittszeitpunkt wird das Wetter des bewerteten Fahrtabschnitts als Näherung verwendet.
- Optionale Kleidungsgrößen M–XXL, numerische und schlanke Langgrößen, sowie Saison. Größen und Körpermaße haben keinen Einfluss auf den Schutzbedarf.
- Körpermaße mit Messdatum einschließlich Kopf- und Handumfang lokal gespeichert und im JSON-Export enthalten.
- Kleiderschrank nach Oberkörper/Schichten, Beine, Kopf, Arme, Hände, Füße, Gesicht, Hals gruppiert; zusätzlich nach Saison. Ohne eigene Saison wird diese aus dem persönlichen Temperaturbereich grob abgeleitet.
- Wärmer-starten-Heuristik nur bei zusammenhängenden Touren mit maximal 3 °C Differenz; bei Hin-/Rückfahrt mit Aufenthalt deaktiviert. Funktionale Eignung wird weiterhin geprüft.
- Optionale Luftfeuchtigkeit in neuen Prognosen und Wetterdetails. Kein automatischer Regenschutz nur aufgrund hoher Luftfeuchtigkeit. Ältere Prognosen bleiben verwendbar.

## Prüfung
295 automatisierte Tests erfolgreich. Browser: Größenmenü, Körpermaße, Reihenfolge und Saison, gemischte Bewertung gespeichert, Historie geprüft. Bestehende IndexedDB bleibt erhalten, keine Versionsänderung der Datenbank erforderlich. Neue Felder sind optional. Testfahrten wurden ausschließlich in einer getrennten lokalen Testumgebung angelegt.

Keine Veröffentlichung auf GitHub vorgenommen. Die Browseransicht ist eine lokale Vorschau; ein echter iPhone-/Safari-Gerätetest bleibt sinnvoll.
