# FridgeChef Frontend

FridgeChef ist eine Webanwendung zur Verwaltung eines Lebensmittelvorrats und von Rezepten.

Die Anwendung unterstützt Nutzer dabei, den eigenen Vorrat zu verwalten und passende Rezepte zu finden.

Ein besonderes Feature ist die Matching-Funktion. Dabei werden die Zutaten eines Rezeptes mit den vorhandenen Zutaten im Vorrat verglichen.

## Funktionen

Das Frontend bietet:

- Navigation zwischen den Bereichen
- Vorratsverwaltung
- Zutaten hinzufügen
- Zutaten anzeigen
- Zutaten bearbeiten
- Zutaten löschen
- Formularvalidierung
- Ablaufstatus für Lebensmittel
- Rezeptverwaltung
- Rezepte anlegen
- Rezepte anzeigen
- Rezepte bearbeiten
- Rezepte löschen
- Rezeptdetailseite
- Anzeige von Zutaten und Zubereitungsschritten
- Empfehlungsseite „Was kann ich kochen?“
- Match-Prozent
- Status:
  - kochbar
  - fast kochbar
  - nicht kochbar
- Anzeige fehlender Zutaten
- Filter für Rezeptempfehlungen
- Sortierung nach Match-Prozent
- Hinweis auf bald ablaufende Zutaten
- Responsive Design
- Loading States
- Empty States
- Fehlermeldungen
- Sicherheitsabfragen beim Löschen

## Technologien

Für das Frontend werden verwendet:

- Angular
- TypeScript
- HTML
- CSS
- Reactive Forms
- Angular Router
- Fetch API
- Git
- GitHub

## Voraussetzungen

Für die lokale Ausführung werden benötigt:

- Node.js
- npm
- Git
- laufendes FridgeChef-Backend

Das Backend muss standardmäßig unter folgender Adresse erreichbar sein:

```text
http://localhost:3000
```

## Installation

Repository klonen:

```bash
git clone https://github.com/Sabienas602518/fridgechef-frontend.git
```

In den Projektordner wechseln:

```bash
cd fridgechef-frontend
```

Abhängigkeiten installieren:

```bash
npm install
```

Frontend starten:

```bash
npm start
```

Alternativ:

```bash
ng serve
```

Anschließend ist die Anwendung erreichbar unter:

```text
http://localhost:4200
```

## Backend-Verbindung

Die Kommunikation mit dem Backend erfolgt über den `BackendService`.

Die Basisadresse lautet:

```text
http://localhost:3000/api
```

Beispiele:

```text
/api/ingredients
/api/recipes
/api/matching/:recipeId
```

## Seiten

### Home

Startseite der Anwendung.

```text
/
```

### Vorrat

Verwaltung der vorhandenen Lebensmittel.

```text
/vorrat
```

Funktionen:

- Zutaten anzeigen
- Zutat hinzufügen
- bearbeiten
- löschen
- Ablaufdatum auswerten

### Rezepte

Übersicht aller Rezepte.

```text
/rezepte
```

### Neues Rezept

```text
/rezepte/neu
```

### Rezeptdetails

```text
/rezepte/:id
```

Hier werden unter anderem Zutaten, Zubereitung und das Bearbeitungsformular angezeigt.

### Empfehlungen

```text
/empfehlungen
```

Auf dieser Seite werden Rezepte passend zum aktuellen Vorrat angezeigt.

Die Rezepte werden nach dem Match-Prozent sortiert.

Es stehen Filter zur Verfügung für:

- alle
- 100 % kochbar
- fast kochbar
- nicht kochbar

Fehlende Zutaten werden ebenfalls angezeigt.

## Matching

Das eigentliche Matching wird im Backend berechnet.

Das Frontend erhält ein Ergebnis wie:

```json
{
  "recipeName": "Tomatennudeln",
  "matchPercent": 100,
  "category": "kochbar"
}
```

Das Frontend nutzt diese Daten für:

- Sortierung
- Filter
- Statusanzeige
- Fortschrittsbalken
- Anzeige fehlender Zutaten

## Ablaufdatum

Lebensmittel können anhand ihres Ablaufdatums eingeteilt werden in:

```text
abgelaufen
bald ablaufend
haltbar
```

Bald ablaufende Zutaten können zusätzlich bei passenden Rezepten hervorgehoben werden.

Die gemeinsame Ablauf-Logik befindet sich im Shared-Bereich.

## Responsive Design

Die Anwendung wurde für verschiedene Bildschirmgrößen getestet.

Unter anderem:

```text
Smartphone
Tablet
Desktop
```

Über Media Queries werden Navigation, Cards, Tabellen und Formulare an kleinere Bildschirmgrößen angepasst.

## Fehlerbehandlung

Die Anwendung berücksichtigt unter anderem:

- Backend nicht erreichbar
- leere Listen
- ungültige Formulare
- fehlerhafte API-Anfragen
- Ladezustände
- Speicherzustände
- nicht vorhandene Daten

## Projektstruktur

```text
src/app
├── nav
├── pages
│   ├── home
│   ├── vorrat
│   ├── vorrat-detail
│   ├── rezepte
│   ├── rezept-create
│   ├── rezept-detail
│   └── empfehlungen
├── shared
│   ├── backend.ts
│   ├── ingredient.ts
│   ├── recipe.ts
│   ├── matching.ts
│   └── expiry.ts
└── app.routes.ts
```

## Screenshots

Hier können Screenshots der wichtigsten Seiten ergänzt werden.

### Vorrat

```text
[Screenshot Vorratsseite]
```

### Rezepte

```text
[Screenshot Rezeptübersicht]
```

### Empfehlungsseite

```text
[Screenshot „Was kann ich kochen?“]
```

### Responsive Ansicht

```text
[Screenshot Smartphone / Tablet]
```

## Tests

Folgende User-Flows wurden während der Entwicklung geprüft:

1. Zutat anlegen
2. Zutat anzeigen
3. Zutat bearbeiten
4. Zutat löschen
5. Rezept anlegen
6. Rezept anzeigen
7. Rezept bearbeiten
8. Rezept löschen
9. Rezeptdetails anzeigen
10. Empfehlungen laden
11. Matching berechnen
12. Filter anwenden
13. fehlende Zutaten anzeigen
14. Ablaufstatus anzeigen
15. Responsive Design prüfen
16. Backend-Ausfall behandeln
17. ungültige Formulare behandeln

## Installation von Null

Die Installation wurde zusätzlich in einem separaten Testordner geprüft.

Dabei wurden:

- Backend frisch von GitHub geklont
- `npm install` ausgeführt
- `.env` neu angelegt
- Seed-Skript ausgeführt
- Backend gestartet
- Frontend frisch von GitHub geklont
- `npm install` ausgeführt
- Angular gestartet
- wichtigste User-Flows getestet

Damit wurde geprüft, dass das Projekt auch außerhalb der ursprünglichen Entwicklungsumgebung gestartet werden kann.

## KI-Werkzeuge

Bei der Entwicklung wurde ChatGPT unterstützend verwendet.

Einsatzbereiche:

- Erklärung von Angular und TypeScript
- Unterstützung bei der Fehlersuche
- Erklärung von Compiler- und Runtime-Fehlern
- Vorschläge für REST- und Matching-Logik
- Unterstützung bei Responsive Design
- Refactoring
- Testplanung
- Dokumentation

Die Vorschläge wurden in das eigene Projekt integriert, angepasst und praktisch getestet.

## Backend

Das Backend befindet sich in einem separaten Repository:

```text
fridgechef-backend
```

## Autorin

WebTech-Semesterprojekt  
FridgeChef