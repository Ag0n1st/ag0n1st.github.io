# Ag0n1st Website

Die persönliche Website von Ag0n1st — Guides, Streams und Tools rund um Gacha Games, auf Deutsch.

## Tech Stack

- Astro
- HTML und CSS
- GitHub Pages via GitHub Actions

## Lokal starten

1. Node.js installieren
2. Im Projektordner ausführen:

```bash
npm install
npm run dev
```

Astro zeigt danach die lokale Entwicklungsadresse im Terminal an.

## Build testen

```bash
npm run build
npm run preview
```

## Deployment

Pushes auf den Branch `main` starten den Workflow unter `.github/workflows/deploy.yml`. In den Repository Settings unter **Pages** muss als Build-Quelle **GitHub Actions** ausgewählt sein.

## Sicherheit

Diese Website ist bewusst öffentlich. Keine Passwörter, privaten Tokens, API-Schlüssel oder sonstigen vertraulichen Daten in den Quellcode eintragen. Öffentliche Inhalte und öffentliche Links sind für dieses Projekt ausreichend.