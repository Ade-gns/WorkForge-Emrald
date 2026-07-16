# WorkForge — Application de musculation (PWA)

## Problème initial
Application web moderne de fitness/musculation, sans compte ni backend. Consultation d'exercices, création de programmes, sauvegarde 100% locale (localStorage). PWA installable, hors ligne. UI française, mode sombre émeraude/jaune, sidebar gauche.

## Architecture
- **Frontend uniquement** : React 19 + React Router 7 + Tailwind + shadcn/ui + lucide-react + sonner.
- **AUCUN backend, AUCUNE base distante, AUCUNE auth.** Persistance via `localStorage` (clés `wf_*`).
- **PWA** : `public/manifest.json` + `public/sw.js` (service worker, cache offline-first) enregistré dans `index.js`. Icônes 192/512.
- Données statiques : `src/data/exercises.js` (44 exercices), `muscles.js` (15 groupes), `programs.js` (11 programmes).
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
- **P1** : Vraies animations GIF/vidéo par exercice (actuellement images HQ statiques uniquement — MOCK d'animation).
- **P1** : Migrer vers IndexedDB pour de gros volumes / synchro multi-onglets (storage events).
- **P2** : Drag-and-drop réel dans le créateur (actuellement boutons ↑/↓).
- **P2** : Mode chronométré de séance guidée (enchaînement exercices + repos auto).
- **P2** : Suivi de progression / historique des séances.
- **P3** : Élargir la bibliothèque (plus d'exercices, plus d'images dédiées par exercice).

## Prochaines actions
Recueillir le retour utilisateur, puis prioriser animations d'exercices et/ou séance guidée chronométrée.
