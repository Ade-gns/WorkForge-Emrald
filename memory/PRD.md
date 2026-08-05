# WorkForge — Application de musculation (PWA)

## Problème initial
Application web moderne de fitness/musculation, sans compte ni backend. Consultation d'exercices, création de programmes, sauvegarde 100% locale (localStorage). PWA installable, hors ligne. UI française, mode sombre émeraude/jaune, sidebar gauche.

## Architecture
- **Frontend uniquement** : React 19 + React Router 7 + Tailwind + shadcn/ui + lucide-react + sonner.
- **AUCUN backend, AUCUNE base distante, AUCUNE auth.** Persistance via `localStorage` (clés `wf_*`).
- **PWA** : `public/manifest.json` + `public/sw.js` (service worker, cache offline-first) enregistré dans `index.js`. Icônes 192/512.
- Données statiques : `src/data/exercises.js` (126 exercices), `muscles.js` (15 groupes), `programs.js` (11 programmes).
- Logique générateur : `src/lib/generator.js`. Stockage/hooks : `src/lib/storage.js`.

## Personas
Pratiquant de musculation (débutant → avancé) souhaitant consulter des exercices, bâtir/générer des programmes et utiliser des outils fitness, sans créer de compte.

## Implémenté (juin 2026)
- Sidebar 11 items + layout responsive (sheet mobile).
- Accueil (hero, stats, accès rapide, groupes musculaires).
- Bibliothèque d'exercices + recherche instantanée + filtres (muscle/type/difficulté/matériel). Vues Poids du corps & Salle.
- Détail exercice (image, description, difficulté, matériel, repos, muscles principaux/secondaires, conseils, erreurs, variantes +/-).
- Anatomie interactive SVG face/dos cliquable + chips + filtre type → exercices filtrés.
- 11 programmes prédéfinis + détail + copie vers créateur.
- Créateur de programme (ajout/suppression/réordonnancement/séries/reps/repos/enregistrement/édition).
- Générateur intelligent (objectif/niveau/durée/séances/matériel) — logique locale équilibrée.
- Favoris (exercices + programmes) persistés localement.
- Outils : minuteur repos, chronomètre, IMC, calories (TDEE), BMR, 1RM.
- Paramètres : bip, repos par défaut, unité, export JSON, effacer données.
- Testé (frontend) : ~98% de réussite. Bug de state ExercisesPage corrigé (key). Testids anatomie mollets front/back dédupliqués.

## Backlog priorisé
- **P1** : ~~Vraies animations GIF/vidéo par exercice~~ **FAIT (août 2026)** — 115/126 exercices ont une animation 2 photos réelles (départ/fin, alternance en fondu CSS) sourcées de free-exercise-db (domaine public, Unlicense, aucune attribution requise). Assets bundlés localement dans `public/animations/{id}/{0,1}.jpg`, composant `AnimatedExerciseImage.jsx` (hover sur les cartes, auto dans la fiche détail). Pour les 11 exercices sans photo réelle correspondante dans la base libre (pike-pushups, curl-supin-elastique, suspension-barre, gainage-lateral, hollow-hold, shoulder-taps, bird-dog, nordic-curl, burpees, jumping-jacks, montees-genoux), léger "pouls" CSS (luminosité/opacité) sur l'image statique existante.
- **P1** : Migrer vers IndexedDB pour de gros volumes / synchro multi-onglets (storage events).
- **P2** : Drag-and-drop réel dans le créateur (actuellement boutons ↑/↓).
- **P2** : Mode chronométré de séance guidée (enchaînement exercices + repos auto).
- **P2** : Suivi de progression / historique des séances.
- **P3** : ~~Élargir la bibliothèque~~ **FAIT (août 2026)** — 97 → 126 exercices. +29 exercices ajoutés côté salle (crunch/curl/dips/développé/oiseau/shrugs à la machine, rowing Smith, tirage iso-latéral, leg curl debout, glute ham raise, leg extension unilatéral, mollets presse/haltères/barre, hyperextension inversée/partenaire, good morning assis, pull-through & kickback poulie, tirage menton poulie, curl poignet barre, extension poignet, finger curls, vélo elliptique, vélo de salle, tapis de course), comblant les groupes musculaires sous-représentés (mollets, trapèzes, avant-bras, lombaires, fessiers, ischio) et le matériel "Machine" (11 → 29 exercices). Toutes avec vraies photos free-exercise-db.

## Prochaines actions
Recueillir le retour utilisateur, puis prioriser animations d'exercices et/ou séance guidée chronométrée.
