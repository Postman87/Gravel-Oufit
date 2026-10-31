# Prüfung Gravel Outfit 0.18.0

## Quelle

Korrigierte Radbekleidung_KI_2.xlsx, ein Blatt „Kategorien nach T. (2)“, A–G. SHA-256: 37835bcc62c72729b5ca6bdc876ad2c1c1d3feff3a9768e6c8e1dc47acfe216f. Zelltexte, Farben und Quellenadressen wurden übernommen. Alte Excel-Produktbewertungen und Intensitätstexte wurden aus der Laufzeitberechnung entfernt. Frühere Fahrten/Kleidung bleiben Nutzerdaten, keine Regelquelle. Einige Regressionstests verwenden unveränderte Beispielprodukte als Testszenarien; diese sind nicht Teil der Laufzeitregeln.

## Automatisierte Prüfungen

238 Tests erfolgreich, keine Fehler. Die bisherigen Tests mit inzwischen ausdrücklich ersetzten Regeln wurden durch Prüfungen der neuen Quelle ersetzt; die Zahl ist deshalb nicht direkt mit früheren Versionen vergleichbar.

- Vollständige neue Temperaturstufen, Farben und Schutzspalte, überlappender Nullpunkt.
- Verfügbare Thermokleidung, vorübergehend nicht verfügbare Kleidung, fehlende Schutzkleidung.
- Kurzarm-Baselayer nach tiefster Tourtemperatur, keine erfundenen Teile.
- Regenjacke über Windweste oder Thermojacke; keine doppelte Nutzung, keine unvereinbaren Schichten.
- Regen- und Windschutz getrennt von Wärmeisolierung, Warnungen für verbleibende Lücken.
- Stirnband bei 7 °C bevorzugt; vorhandene Mütze bei nicht verfügbarem Stirnband.
- Zusätzliche Regenbarriere bei unzureichender Kombination, auch bei bereits winddicht erfasster Hose.
- Kurze/lange Zip-off-Variante, separate Hosenbeine, kleine Wetteränderungen ohne unnötiges Gepäck.
- Eine Matrix mit 1.497 Fällen von −10 bis +40 °C, drei Intensitäten, Wind/Regen und geänderten Bestandseigenschaften. Sie ist ein einzelner Test innerhalb der 238 Tests.
- Persönliche Kleidungsbereiche wirken sofort; Learning behält Kontext, Zonen, Intensität und Zeitraum.
- Zwischenbewertung: aktive Tour bleibt erhalten; getragene Kleidung erforderlich; keine Wäsche beim Zwischenstand; Pause, tatsächlicher Rückfahrtstart, getrennte final gespeicherte Bewertung.
- Hinweg-Learning sofort verfügbar, später nicht doppelt gezählt. Tatsächliche Teilzeiten für nachträgliches Streckenwetter. Aufenthalt bleibt aus der Auswertung ausgeschlossen.
- JSON erhält beide Teilbewertungen und Varianten. Löschen der Tour entfernt beide aus dem Learning.
- Bestehende Datenmigration, Pflege, Verfügbarkeit, Archivierung, GPX/Wetterplanung, Quellenwahl, Offline-/Cache-Konsistenz und Import/Export.

Zusätzliche DOM-Tests prüfen bearbeitete Kleider, Zip-off, Planung, Geolokalisierung mit kontrollierten Wetterantworten, Fehlersituationen, Hinweg-Zonenbewertung, Aufenthalt, Rückfahrtstart, Historie, nachträgliches Wetter und Tourlöschung.

## Browser

Getrennte lokale Testspeicher; echte vorhandene Nutzerdaten nicht für die Testfahrten verändert. iPhone-Layout 402 × 874 im Browser:

- 3 °C trocken: kurze Basis, Kurzarmtrikot plus Armlinge, Windweste und Lupra-Jacke sowie lange RR-Hose mit Lupra-Hose; Wärmelücken sichtbar.
- 25 °C mit Dauerregen: kurze Hose und verfügbare äußere Regenbekleidung an Oberkörper und Beinen.
- Tour starten, Hinweg als „Zu warm“ am Oberkörper bewerten, speichern, Seite neu laden: Tour und Zwischenstand erhalten.
- Rückfahrt starten, Rückweg „Genau richtig“ speichern: eine abgeschlossene Tour mit separater Hinwegbewertung und Rückwegbewertung.

Keine Prüfung auf einem physischen iPhone und kein Alltagstest mit echten Touren. Externe Wetteranbieter wurden bei diesen Browserprüfungen nicht mit einem echten Gerätestandort abgefragt. Die Isolierung der Teilzeiträume einschließlich einer heißen Pause wurde separat mit kontrollierten Wetterserien getestet.
