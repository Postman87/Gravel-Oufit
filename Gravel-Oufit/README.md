# Gravel Outfit — Entwicklungsabschnitt 1

Neustart der iPhone-PWA mit HTML, CSS, JavaScript-Modulen und IndexedDB. **Dies ist ein Grundgerüst**, noch keine Outfit-App mit Empfehlungen.

## Bereitstellen

1. Alten Repository-Inhalt bei Bedarf über Git-Historie sichern; die Dateien dieses Pakets in das Stammverzeichnis von `postman87/Gravel-Oufit` übernehmen. **Achtung: Überschreibt bestehende gleichnamige Dateien.**
2. GitHub Pages auf Branch `main` und Ordner `/ (root)` konfigurieren.
3. `https://postman87.github.io/Gravel-Oufit/` in Safari öffnen. Für Installation: Teilen → Zum Home-Bildschirm.
4. Einstellungen → **Speicherung testen**. Es wird nur ein temporärer Eintrag geschrieben, gelesen und gelöscht.
5. App einmal online vollständig laden, danach Flugmodus aktivieren und App erneut öffnen. Offline-Nutzung hängt davon ab, dass der Service Worker erfolgreich installiert wurde.

## Technische Hinweise

- Service Worker cached das App-Grundgerüst. **Für spätere Releases** CACHE-Version und SHELL-Liste aktualisieren; bei zusätzlichen Modulen die Dateien ergänzen.
- IndexedDB v1 erstellt: wardrobe, care, rides, feedback, learning, settings, products, meta. Künftige Schemaänderungen benötigen Migrationen.
- Testdaten werden **nicht automatisch angelegt**. Die Testtaste arbeitet nur im `meta`-Store.
- Kein Cloud-Sync und keine automatische Datensicherung. Browserdaten können verloren gehen. Export/Import wird in späteren Abschnitten ergänzt.
- Noch nicht enthalten: echte Kleiderschrankverwaltung, Wetter, Touren, Outfitlogik, Feedback und Lernen.
- Die App wurde als Dateien erstellt und syntaktisch geprüft; ein echter Safari-/GitHub-Pages-Test muss noch durchgeführt werden.

## Prüfungen

- Navigation zwischen drei Tabs
- Hell-/Dunkelmodus via Systemeinstellung
- IndexedDB-Schreib-/Lese-/Löschtest
- Service-Worker-Registrierung und Offline-Start nach vorherigem Online-Aufruf
- Home-Bildschirm-Installation auf iPhone
