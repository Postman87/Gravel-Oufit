# Testbericht · Gravel Outfit 0.6.0

Datum: 29. Oktober 2026

## Erfolgreich geprüft

12 automatisierte Tests mit Node.js:

- Gültiger leerer Startzustand und alle 19 Kleidungsfunktionen.
- Unterschiedliche Empfehlungen bei Wärme und Kälte.
- Regenausrüstung bei Dauerregen und Schauern.
- Ausschluss von Wäsche, nicht verfügbaren und archivierten Teilen.
- Vorrang passender Temperaturbereiche und Kennzeichnung unpassender Bereiche.
- Abweisung ungültiger Sicherungen, Temperaturspannen, doppelter IDs sowie ungültiger Pflege- und Fahrtdaten.
- JSON-Rundlauf mit Pflegehistorie und aktiver Fahrt.
- Migration des früheren Version-2-Sicherungsformats.

Interaktiv im integrierten Browser auf localhost unter einem Unterpfad `/package/`:

- Kleidungsstück anlegen, über Neuladen erhalten, bearbeiten und auf Wäsche setzen.
- Pflegeeintrag anlegen, Archivieren und Wiederherstellen.
- Wetter einstellen und verfügbares Trikot in Empfehlung auswählen.
- Fahrtstart, Neuladen während laufender Fahrt, Fahrtende mit Rückmeldung.
- Erfasste Kleidung wird beim Fahrtende in die Wäsche gelegt.
- JSON-Export heruntergeladen und Inhalt validiert: ein Kleidungsstück, ein Pflegeeintrag, eine abgeschlossene Fahrt und Wäsche-Status.
- Lokalen Webserver beendet: App konnte aus dem Service-Worker-Cache neu geladen werden.
- Ohne erreichbaren Webserver Kleidungsstück umbenannt; nach erneutem Laden blieb die Änderung erhalten.
- Serverstatus zeigt korrekt „Server nicht erreichbar · lokal nutzbar“.
- JSON-Sicherung offline importiert und vorherige Änderung damit erfolgreich ersetzt.
- Ungültiger JSON-Import wird mit Fehlermeldung ohne Ersetzung abgewiesen.
- Handyansicht bei 390 × 844 Pixeln: keine horizontale Überbreite, Darstellung visuell kontrolliert.

## Noch auf Zielgeräten prüfen

- Installation und Start auf einem echten iPhone über Safari / Home-Bildschirm.
- Deployment auf dem produktiven GitHub-Pages-Pfad und Wechsel vom dort installierten alten Service Worker.
- Echter Flugmodus auf dem iPhone; lokal wurde der Offline-Neustart durch Beenden des Webservers nachgewiesen.
- Dauerhafte Speicherung ist browserabhängig und kann abgelehnt werden.

Es wurde nichts ins GitHub-Repository hochgeladen oder veröffentlicht. Das ZIP enthält die vollständige lauffähige Anwendung sowie diese Dokumentation und die ausführbaren Logiktests.
