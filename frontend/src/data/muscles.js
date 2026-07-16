// Groupes musculaires + métadonnées (images de couverture, vue anatomique)
export const MUSCLE_GROUPS = [
  { id: "pectoraux", name: "Pectoraux", view: "front", image: "https://images.unsplash.com/photo-1692369608023-a3822e070ee9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "dos", name: "Dos", view: "back", image: "https://images.unsplash.com/photo-1611841315886-a8ad8d02f179?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "epaules", name: "Épaules", view: "front", image: "https://images.unsplash.com/photo-1532384661798-58b53a4fbe37?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "trapezes", name: "Trapèzes", view: "back", image: "https://images.unsplash.com/photo-1611841315886-a8ad8d02f179?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "biceps", name: "Biceps", view: "front", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "triceps", name: "Triceps", view: "back", image: "https://images.pexels.com/photos/4803875/pexels-photo-4803875.jpeg?auto=compress&w=800" },
  { id: "avant-bras", name: "Avant-bras", view: "front", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "abdominaux", name: "Abdominaux", view: "front", image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "lombaires", name: "Lombaires", view: "back", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "fessiers", name: "Fessiers", view: "back", image: "https://images.unsplash.com/photo-1649887974297-4be052375a67?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "quadriceps", name: "Quadriceps", view: "front", image: "https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "ischio", name: "Ischio-jambiers", view: "back", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "mollets", name: "Mollets", view: "back", image: "https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "cardio", name: "Cardio", view: "front", image: "https://images.unsplash.com/photo-1638183395699-2c0db5b6afbb?w=800" },
  { id: "mobilite", name: "Mobilité", view: "front", image: "https://images.pexels.com/photos/10086629/pexels-photo-10086629.jpeg?w=800" },
];

export const muscleName = (id) => MUSCLE_GROUPS.find((m) => m.id === id)?.name || id;

export const DIFFICULTIES = ["Débutant", "Intermédiaire", "Avancé"];
export const EQUIPMENTS = ["Aucun", "Haltères", "Barre", "Machine", "Poulie", "Élastique", "Kettlebell", "Banc"];
export const TYPES = [
  { id: "poids-du-corps", name: "Poids du corps" },
  { id: "salle", name: "Salle de sport" },
];
