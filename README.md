========================================================
 WORKFORGE — Application de Musculation & Fitness (PWA)
========================================================

Application web moderne dediee au fitness et a la musculation.
Site de consultation : decouvrir des exercices, creer ses propres
programmes et les conserver LOCALEMENT sur son appareil.

100% hors ligne apres installation - Aucun compte, aucune
connexion, aucune donnee envoyee sur Internet.


--------------------------------------------------------
 FONCTIONNALITES
--------------------------------------------------------

- Bibliotheque de 97 exercices classes par 15 groupes
  musculaires (pectoraux, dos, epaules, trapezes, biceps,
  triceps, avant-bras, abdominaux, lombaires, fessiers,
  quadriceps, ischio-jambiers, mollets, cardio, mobilite).

- Chaque exercice : image sur-mesure, description, difficulte,
  materiel, temps de repos, conseils, erreurs frequentes,
  muscles principaux et secondaires, variantes plus faciles
  et plus difficiles.

- Vues dediees : Exercices poids du corps / Exercices salle.

- Anatomie interactive : silhouette cliquable (face et dos).
  Un clic sur un muscle affiche les exercices correspondants,
  avec filtre poids du corps / salle.

- 11 programmes predefinis : Debutant, Full Body, Prise de
  masse, Seche, Force, Push Pull Legs, Upper Lower,
  Calisthenics, Street Workout, HIIT, Remise en forme.

- Createur de programme : ajouter / supprimer des exercices,
  modifier l'ordre, choisir series, repetitions et repos,
  enregistrer localement et modifier plus tard.

- Generateur intelligent : cree automatiquement un programme
  coherent selon l'objectif, le niveau, la duree, le nombre de
  seances par semaine et le materiel disponible.

- Recherche instantanee (nom, groupe musculaire, materiel,
  difficulte, type).

- Favoris (exercices + programmes) sauvegardes localement.

- Outils : minuteur de repos, chronometre, calculateur d'IMC,
  calories journalieres (TDEE), metabolisme de base (BMR),
  estimation du 1RM (repetition maximale).

- Parametres : bip de fin de repos, repos par defaut, unite,
  export des donnees (JSON) et effacement des donnees locales.

- PWA installable : ajout a l'ecran d'accueil, fonctionne
  hors ligne (Service Worker + Manifest).


--------------------------------------------------------
 TECHNOLOGIES
--------------------------------------------------------

- React 19 (Create React App / CRACO)
- React Router 7
- Tailwind CSS 3 + composants shadcn/ui
- lucide-react (icones)
- sonner (notifications)
- Progressive Web App : Service Worker + Manifest
- Persistance locale : LocalStorage
- Aucun backend requis (application 100% cote client)

Design : mode sombre, couleurs vert emeraude (#10b981) et
jaune (#facc15), polices Poppins (titres) et Inter (texte).


--------------------------------------------------------
 STRUCTURE DU PROJET
--------------------------------------------------------

frontend/
  public/
    index.html          Page HTML principale
    manifest.json       Manifeste PWA
    sw.js               Service Worker (mode hors ligne)
    icon-192.png        Icones de l'application
    icon-512.png
  src/
    data/
      exercises.js       Les 97 exercices
      exerciseImages.js  Images sur-mesure (1 par exercice)
      muscles.js         Groupes musculaires
      programs.js        Programmes predefinis
    lib/
      storage.js         Persistance LocalStorage + hooks
      generator.js       Logique du generateur intelligent
    components/
      Sidebar.jsx        Barre laterale de navigation
      Layout.jsx         Mise en page + menu mobile
      ExerciseCard.jsx   Carte d'exercice
      ExerciseDetail.jsx Fiche detaillee (modale)
      ExerciseGrid.jsx   Grille + recherche + filtres
      AnatomyBody.jsx    Silhouette anatomique SVG
      ProgramView.jsx    Detail d'un programme
      PageHeader.jsx     En-tete de page
      DifficultyBadge.jsx
    pages/
      Home.jsx           Accueil
      ExercisesPage.jsx  Exercices (tous / poids du corps / salle)
      Programs.jsx       Programmes predefinis
      CreateProgram.jsx  Createur de programme
      Generator.jsx      Generateur intelligent
      Favorites.jsx      Favoris
      Anatomy.jsx        Anatomie interactive
      Tools.jsx          Outils (minuteur, IMC, BMR, 1RM...)
      Settings.jsx       Parametres
    App.js               Routes de l'application
    index.js             Point d'entree + enregistrement du SW
    index.css            Styles globaux + theme
  package.json
  tailwind.config.js
  craco.config.js


--------------------------------------------------------
 INSTALLATION ET LANCEMENT
--------------------------------------------------------

Prerequis : Node.js 18+ et Yarn (ou npm).

1) Installer les dependances :

     cd frontend
     yarn install        (ou : npm install)

2) Lancer en developpement :

     yarn start          (ou : npm start)

   L'application s'ouvre sur http://localhost:3000

3) Construire la version de production :

     yarn build          (ou : npm run build)

   Le dossier "build/" contient l'application prete a etre
   deployee sur n'importe quel hebergement statique
   (Netlify, Vercel, GitHub Pages, serveur web, etc.).


--------------------------------------------------------
 INSTALLER COMME APPLICATION (PWA)
--------------------------------------------------------

Une fois le site ouvert dans le navigateur :

- Sur mobile : menu du navigateur > "Ajouter a l'ecran
  d'accueil".
- Sur ordinateur (Chrome/Edge) : icone d'installation dans la
  barre d'adresse.

L'application fonctionne alors hors ligne.


--------------------------------------------------------
 DONNEES ET VIE PRIVEE
--------------------------------------------------------

Toutes les donnees (favoris, programmes crees, preferences)
sont stockees UNIQUEMENT dans le navigateur via LocalStorage.
Aucune donnee n'est envoyee sur un serveur. Aucun compte
utilisateur n'est requis.

Vous pouvez exporter vos donnees en JSON ou tout effacer
depuis la page Parametres.
