# 0.20.0 – Archivierte Kleidung löschen

Im Kleiderschrank den Filter „Archiviert“ wählen, ein Teil aufklappen und „Endgültig löschen“ wählen. Vor der Löschung erscheint eine Bestätigung. Aktive Teile müssen zuerst archiviert werden.

Die Löschung entfernt nur den Kleiderschrankeintrag und seine Verweise in der aktuellen Planung. Historische Fahrten, getragene Kleidung als vollständige Snapshots, Bewertungen, Wetterdaten und eine laufende Fahrt bleiben unverändert. Learning wird weiterhin aus diesen Fahrten berechnet, insbesondere das Zonen-Learning. Ein später neu angelegtes Teil erhält eine neue Identität; seine individuellen Temperaturbereiche werden nicht automatisch mit denen des gelöschten Teils gleichgesetzt.

Kein Datenbankschemawechsel. JSON-Sicherungen behalten die Fahrt- und Bewertungsdaten auch nach einer Löschung. 278 automatisierte Tests erfolgreich, darunter wirksames Learning vor/nach Löschung und JSON-Rundlauf. Es wurden keine echten Kleidungsstücke gelöscht. Keine Veröffentlichung vorgenommen.
