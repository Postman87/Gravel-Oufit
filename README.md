# Gravel Outfit · Testversion 0.6.0

Offlinefähige PWA für das Repository `postman87/Gravel-Oufit` und GitHub Pages. Keine Installation von Paketen, kein Build und kein Server-Backend erforderlich.

## Hochladen

1. ZIP auf dem Mac entpacken.
2. Im bestehenden Repository die Dateien aus dem entpackten Ordner direkt ins Hauptverzeichnis hochladen. `index.html`, `sw.js` und `manifest.webmanifest` ersetzen. Kein zusätzlicher übergeordneter Ordner!
3. Auch die neuen Dateien `app.js`, `core.js`, `style.css`, `version.json`, Icons und `.nojekyll` übernehmen. Versteckte Dateien zeigt der Finder mit Cmd + Shift + Punkt. Die Tests und Dokumentation dürfen mit hochgeladen werden.
4. GitHub → Settings → Pages: „Deploy from a branch“, Branch `main`, Ordner `/ (root)` einstellen bzw. bestehende Einstellung beibehalten. Nach dem Deployment: https://postman87.github.io/Gravel-Oufit/
5. Alle bisher geöffneten App-Fenster und Tabs schließen und die App erneut öffnen, damit der neue Service Worker aktiviert wird. Einmal online laden, unter Einstellungen den Offline-Status prüfen. Danach offline nutzbar.

Die bisherigen Ordner `js/`, `css/` und `assets/` können bestehen bleiben; diese Version lädt ihre Dateien direkt aus dem Hauptverzeichnis. Keine GitHub-Anmeldedaten oder API-Schlüssel notwendig.

## Erste Verwendung

- Unter Kleiderschrank eigene Kleidungsstücke mit Funktion und Temperaturbereich anlegen. Neue Installationen starten bewusst ohne fiktiven Bestand.
- Verfügbarkeit: „Verfügbar“, „In Wäsche“ oder „Nicht verfügbar“. Archivierte Teile bleiben erhalten und können wiederhergestellt werden.
- Pflegehistorie über „Gewaschen“, „Imprägniert“ oder „Repariert“ führen; diese Aktionen setzen das Teil wieder auf verfügbar.
- Unter Outfit Wetter manuell eingeben und Empfehlung aktualisieren. Fehlende Teile werden angezeigt. Nur verfügbare, nicht archivierte Kleidungsstücke werden ausgewählt.
- Fahrt starten speichert Wetter und verfügbare ausgewählte Teile, einschließlich mitgenommener Kleidung. Eine laufende Fahrt bleibt über Neuladen und App-Schließen erhalten.
- Fahrt beenden mit Rückmeldung „Zu kalt“, „Genau richtig“ oder „Zu warm“ und optionaler Notiz. Der aktivierte Wäsche-Haken setzt alle erfassten Teile auf „In Wäsche“; bei Bedarf abwählen und Teile einzeln bearbeiten.
- Einstellungen → JSON exportieren. Import ersetzt den aktuellen Datenstand erst nach Validierung und ausdrücklicher Bestätigung. Auch aktive Fahrten und Pflegehistorien sind enthalten.

## Daten und Updates

IndexedDB `gravel-outfit`, Datenbankversion 2, zusätzlicher Object Store `state`. Die Speicherbereiche des bisherigen Grundgerüsts bleiben erhalten. Die dortigen Kleiderschrank- und Sicherungsmodule waren zum Abrufzeitpunkt noch Platzhalter. Es erfolgt keine Interpretation unbekannter Datensätze in diesen Bereichen.

Falls aus einer älteren App vorhanden, werden LocalStorage-Schlüssel `gravel-v4-clothes`, `gravel-v4-settings` und `gravel-v5-properties` beim erstmaligen Anlegen des neuen Datenstands übernommen. Alte LocalStorage-Daten werden nicht gelöscht. JSON-Sicherungen mit `version: 2` werden ebenfalls importiert. Die aktuelle Sicherung verwendet `schemaVersion: 3`.

Datenschreibvorgänge sind atomare IndexedDB-Transaktionen. In Browsern mit Web Locks werden parallele Änderungen zwischen Tabs zusätzlich serialisiert. Bei Browsern ohne Web Locks nur ein App-Fenster zum Bearbeiten verwenden. Wird auf einem anderen Tab geändert, aktualisiert sich die Ansicht beim erneuten Aktivieren.

Der Service Worker speichert alle App-Dateien lokal; keine externen Bibliotheken oder Schriftarten. Die Verbindungskontrolle fragt `version.json` ohne Offline-Cache ab. „Online“ bedeutet, dass der Server bei der Prüfung erreichbar war, „Offline“ folgt dem Browserstatus, „Server nicht erreichbar“ deckt beispielsweise fehlenden Internetzugang trotz WLAN ab. Prüfung bei Start, Netzwerkwechsel und Rückkehr zur App.

Für zukünftige Veröffentlichungen den Cache-Namen in `sw.js` ändern und `version.json` aktualisieren. Kein `skipWaiting`: ein Update wartet, bis alte App-Fenster geschlossen sind, damit laufende Bearbeitungen erhalten bleiben.

## Grenzen der Testversion

Keine automatische Wetterabfrage, GPS-Aufzeichnung, Cloud-Synchronisierung oder lernende Anpassung. Die Empfehlung nutzt die niedrigste Temperatur, Wind, Niederschlag, Intensität, Dauer und Kälteempfinden. Passende Funktionskategorien werden ausgewählt und Kandidaten nach Temperaturbereich sowie Wetterschutz bewertet. Außerhalb des Bereichs liegende Teile werden gekennzeichnet. Rückmeldungen werden gespeichert und nicht automatisch in die Regeln eingerechnet. Die letzten 20 abgeschlossenen Fahrten erscheinen in der Oberfläche; alle bleiben in der Sicherung enthalten.

Browser können lokale Daten entfernen. Regelmäßig JSON sichern. Dauerhafte Speicherung kann unter Einstellungen angefragt werden, ist aber vom Browser abhängig. Offlinebetrieb erst nach erfolgreichem ersten Laden über HTTPS oder localhost. Direktes Öffnen der HTML-Datei im Finder unterstützt keinen verlässlichen PWA-Betrieb.

## Lokal testen

Mit Python 3 im entpackten Ordner: `python3 -m http.server 8080`. Danach `http://localhost:8080/` öffnen.

Automatisierte Logiktests mit Node.js 20 oder neuer: `node --test tests/core.test.cjs`. Node wird ausschließlich für diese Tests benötigt, nicht für die App.

Siehe `TESTBERICHT.md` für durchgeführte Prüfungen und zusätzliche Gerätetests.
