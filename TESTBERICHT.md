# Abschlussrunde 0.20.0 – 31.10.2026

287 automatisierte Tests bestanden (0 Fehler), einschließlich bisheriger Regressionstests, Fahrwetter/Aufenthalt, Regen-Sicherheitspuffer, Dauerregen, Altprognosen, präzisierter Bestandsmeldungen, Archivlöschung, Fahrtenlöschung und Learning, JSON-Erhalt sowie Offline-Dateikonsistenz.

30-Tage-Simulation mit Nutzersicherung und bereits geladenen Open-Meteo-Archivdaten für Wulften am Harz 01.–30.10.2026 wiederholt: 30 Durchläufe erfolgreich; nur aktive verfügbare Teile, keine doppelten Kleidungsstücke, zulässige Schichten, Sichtbarkeitsweste außen, keine Speicherung oder simulierten Rückmeldungen. Mitnahme an 16 statt zuvor 18 Tagen. Ein Tag mit optionalem Regen nur im Aufenthalt und ein Tag mit zusätzlichem Regenpuffer-Hinweis. Rohdaten unverändert.

Die App wurde lokal im Browser geladen. Kein physischer iPhone-Gerätetest und keine Veröffentlichung. Die Sicht- und Alltagsprüfung auf dem iPhone steht aus; Anleitung in IPHONE_TEST.md.

Grenzen: stündliche Ortsdaten / GPX-Stichproben sind kein lückenloses Wetter. Ältere gespeicherte Prognosen ohne Wetterwerte pro Zeitabschnitt werden konservativ weiter genutzt und zeigen einen Aktualisierungshinweis. Ein nachträglicher Datenabruf wird nicht stillschweigend durchgeführt.
