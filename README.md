# Gravel Outfit · Version 0.7.1

Fortführung der bestehenden Version 0.7 mit HTML, CSS, Vanilla JavaScript, IndexedDB und Service Worker. Kein Framework, kein Build. Outfit, Kleiderschrank und Einstellungen bleiben erhalten.

## Hochladen und Aktualisieren

ZIP entpacken und den Inhalt direkt ins Hauptverzeichnis von `postman87/Gravel-Oufit` hochladen; Dateien gleichen Namens ersetzen. GitHub Pages bleibt auf `main` / `/ (root)`. `.nojekyll` mit übernehmen. Die alten Ordner `js`, `css` und `assets` können bestehen bleiben, werden aber von dieser Version nicht geladen.

Nach dem Deployment alle Gravel-Outfit-Tabs und installierten App-Fenster schließen und erneut öffnen. Falls noch die alte Version erscheint: einmal online öffnen, wieder alle Fenster schließen und neu starten. Danach muss „Testversion 0.7.1“ angezeigt werden. Keine Browserdaten oder IndexedDB löschen. Die Anwendung bleibt unter https://postman87.github.io/Gravel-Oufit/ erreichbar, sobald die Dateien dort veröffentlicht wurden.

## Temperaturen ohne Datenverlust

Alle Temperaturanzeigen und Regler verwenden ganze Celsiusgrade. Schrittweite: 1 °C, Bereich −25 bis 50 °C. Die Grenzwerte passen sich beim Überschneiden an.

Alte Dezimalwerte bleiben in der Datenbank, in Fahrten und im JSON-Export exakt erhalten. Für die Oberfläche werden sie lediglich gerundet dargestellt. Auch das erneute Speichern des Wetters ohne Reglerbewegung oder das Bearbeiten anderer Kleidungseigenschaften rundet diese Daten nicht. Erst wenn ein bestimmter Regler bewegt wird, wird dessen Wert ausdrücklich neu gesetzt. Muss dadurch die andere Grenze angepasst werden, wird auch diese angepasst. Ein unverändert gebliebener anderer Grenzwert bleibt intern unverändert. Die Berechnung verwendet weiterhin die unveränderten gespeicherten Wetterwerte.

Wetter mit „Empfehlung aktualisieren“ übernehmen; Kleidung mit „Speichern“. Bei neuen Kleidungsstücken gelten ganzzahlige Standardwerte.

## Kleidungsarten und Längen

Art und Länge bleiben unabhängige Datenfelder. Hosen einschließlich der Kategorie Außenhose für RevolutionRace können „Lang“ oder „Kurz“ sein. Oberbekleidung zeigt „Langarm“, „Kurzarm“ und, soweit sinnvoll, „Ärmellos“. Zubehör besitzt keine Ärmel- oder Beinlänge.

Für Westen ist ärmelloser Schnitt vorgesehen, für Thermojacken Langarm, für Regenjacken und Thermotrikots Kurzarm oder Langarm. Baselayer und normale Trikots erlauben alle drei Schnitte. „Nicht angegeben“ bleibt möglich und wird nicht als garantierte lange Bedeckung bewertet.

Alte unpassende Kombinationen werden nicht umgeschrieben oder gelöscht. Ein zusätzlicher Prüfhinweis kennzeichnet sie. Bis zur Korrektur werden sie nicht automatisch eingeplant; im Editor kann eine passende Länge gewählt werden. Das Bearbeiten anderer Felder lässt die alte Angabe zunächst erhalten. Nach bewusster Korrektur entfällt der Prüfhinweis.

## Modulare Berechnung

Es gibt keinen virtuellen Kleiderschrank und keine erfundenen idealen Kleidungsstücke mehr. Aus dem Wetter werden zuerst funktionale Anforderungen abgeleitet: Wärmeisolierung, Bedeckung, Windschutz, Nässeschutz und Atmungsaktivität. Die Oberfläche zeigt diese Anforderungen ausdrücklich als Funktionen an.

Danach werden tatsächlich vorhandene, verfügbare und nicht archivierte Kleidungsstücke als Kombinationen bewertet: eine Basisschicht, eine Trikotschicht, passende Armlinge, isolierende Oberbekleidung, Wind- oder Nässeschutz sowie passende Beinschichten. Die Suche bevorzugt strukturell tragbare Kombinationen. Innerhalb dieser Kombinationen bewertet sie verbleibende Schutzlücken, gesamte Wärmeisolierung, Überwärmung, Atmungsaktivität und die Anzahl der Teile. Temperaturbereiche sind Orientierung, keine harten Ausschlussgrenzen für einzelne Schichten.

Wasserabweisend ist begrenzter Schauerschutz und bleibt getrennt von wasserdicht. Winddichte Regenkleidung kann Windschutz liefern, besitzt im Modell aber nur geringe Isolierung. Bei zu wenig Wärme werden vorhandene kompatible Zusatzschichten kombiniert. Ein Regenmantel wird dadurch nicht zur Thermojacke. Bei vergleichbaren Eigenschaften werden bei Kälte längere Ärmel und Beine bevorzugt.

Nicht kombiniert werden doppelte Funktionsschichten, redundante Windweste und Regenjacke, zwei Sitzpolster oder Armlinge zusätzlich zu bereits langen darunterliegenden Ärmeln. Armlinge ergänzen ein kurzärmeliges Trikot; sie werden nicht als Ersatz für die Schulterbedeckung eines ärmellosen Trikots behandelt. Die Funktionsart Thermo-Radhose wird als eigenständig gepolsterte Radhose bewertet.

Die Anziehreihenfolge bleibt funktional: Baselayer und Unterhose, Armlinge, Trikot, Hose, isolierende Jacke, äußere Wind- und Regenschichten. Bei deutlicher Temperaturspanne kann eine verfügbare zusätzliche Windschicht zum Mitnehmen vorgeschlagen werden, ohne ein Kleidungsstück doppelt zu verwenden. Ablegehinweise dürfen keine bloße Unterwäsche als verbleibende Oberbekleidung hinterlassen.

Fehlt Schutz, wird er als Funktion benannt, beispielsweise „Zusätzliche Wärmeisolierung für den Oberkörper erforderlich.“ Gibt es nur einen ärmellosen Baselayer, wird ausdrücklich eine unvollständige Grundlage angezeigt. Der automatische Fahrtstart ist dann gesperrt. Aus diesem Bestand lässt sich kein vollständiges Outfit erzeugen, ohne Kleidung zu erfinden. Besteht eine tragbare Grundkombination, aber reicht ihre Wärme nicht, bleibt diese mit deutlichen Einschränkungen sichtbar.

Die eigene Auswahl bleibt unabhängig und bewusst manuell steuerbar. Umschalten und Neuladen erhalten sie. Beim Fahrtstart bleiben tatsächliche Kleidung und ursprüngliche automatische Empfehlung getrennt gespeichert. Ältere Fahrten und deren historische Informationen werden nicht nachträglich umgedeutet. Neue Empfehlungen speichern funktionale Anforderungen zusätzlich zum tatsächlichen Vergleichsoutfit.

## Bewertung bleibt ein Regelmodell

Wärme und Atmungsaktivität sind aus Funktion, Schnitt und Angaben abgeleitete Modellwerte, keine Messwerte der Textilien. Für große Bestände werden identische Profile zusammengefasst und bis zu fünf Kandidaten pro Schichtfunktion kombiniert. Dies hält die Berechnung auf Mobilgeräten nutzbar und garantiert keine mathematisch globale Optimierung. Individuelles Empfinden, Pausen, Helm, Schuhe und sichere Beweglichkeit bleiben selbst zu prüfen.

Die Temperaturanzeige verwendet °C. Zahlen in der Schichtbewertung sind relative Isolierungswerte ohne Celsius-Einheit und dürfen dort Nachkommastellen besitzen.

## Datenmigration und Sicherung

Der Datenbankname bleibt `gravel-outfit`. IndexedDB wird auf Version 4 erweitert, das Datenformat auf `schemaVersion: 5`. Vorhandene Stores bleiben erhalten. Vor der Migration wird eine unveränderte Kopie des bisherigen Zustands unter `migrationBackups` / `before-0.7.1` gespeichert. Kopie und Migration erfolgen atomar im Upgrade. Der frühere Snapshot `before-0.7` bleibt ebenfalls erhalten.

Aus 0.7 wird kein bestehender Temperatur-, Längen- oder Historienwert verändert. Falls nötig, kommt nur eine Prüfmarkierung für eine unpassende alte Länge hinzu. Aus 0.6 werden fehlende Eigenschaften wie bisher ergänzt; vorhandene Werte, IDs, Namen, Archiv, Pflege, Fahrten, aktive Fahrt und Planungen bleiben erhalten. JSON-Sicherungen der Datenformate 3 und 4 sowie ältere Sicherungen mit `version: 2` bleiben importierbar. Neue Exporte enthalten alle aktuellen Nutzerdaten, einschließlich unveränderter alter Dezimalwerte. Die internen Migrationskopien sind nicht Teil des normalen Exports.

Kleiderschrankbearbeitung, Verfügbarkeit, Archivierung, Pflegehistorie, Fahrtstart und Fahrtende mit Rückmeldung sowie JSON-Sicherung bleiben verfügbar. Import ersetzt Daten erst nach Prüfung und Bestätigung. Schreibvorgänge werden nacheinander ausgeführt, mit zusätzlicher Tab-Koordination über Web Locks, soweit vom Browser unterstützt.

## Offline und Zielgeräte

Einmal online vollständig laden und unter Einstellungen den Offline-Status prüfen. Danach funktionieren Bestand, Planung, Fahrtverwaltung und Sicherung ohne Internet. Der Verbindungsstatus prüft den Server außerhalb des Offline-Caches. Erreichbares WLAN bei nicht erreichbarem Server erscheint als „Server nicht erreichbar · lokal nutzbar“.

Mac: im entpackten Ordner `python3 -m http.server 8080` starten, dann `http://localhost:8080/` öffnen. Für iPhone Safari die bereitgestellte HTTPS-Adresse verwenden und über Teilen → Zum Home-Bildschirm installieren. Nach dem Update alte App-Fenster schließen. Ein physischer iPhone-Test steht weiterhin aus; die mobile Browseransicht wurde bei 390 Pixeln Breite geprüft.

Regelmäßig JSON sichern. Browser können lokale Daten entfernen; dauerhafte Speicherung kann unter Einstellungen angefragt werden. Keine Cloud-Synchronisierung, automatische Wetterabfrage oder GPS-Aufzeichnung.

## Tests

`node --test tests/core.test.cjs` mit Node.js 20 oder neuer; keine zusätzlichen Pakete. Node ist nicht zum Betrieb der PWA erforderlich. Alle 51 Tests bestehen, einschließlich der sechs ausdrücklich angeforderten Fälle. Details und Browserprüfungen stehen in `TESTBERICHT.md`.

`tests/migration-fixture.html` ist ein optionaler Migrationstest für einen neuen isolierten lokalen Testport. Er legt erfundene Daten an und überschreibt keinen vorhandenen Bestand. Nach dem Öffnen der App vor weiteren Bearbeitungen zur Testseite zurückkehren und „Datenerhalt prüfen“ ausführen.
