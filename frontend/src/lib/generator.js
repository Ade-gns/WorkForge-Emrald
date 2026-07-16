// Générateur intelligent — logique locale à base de règles.
import { EXERCISES } from "@/data/exercises";

// Groupes prioritaires selon l'objectif.
const GOAL_PROFILE = {
  "prise-masse": { groups: ["pectoraux", "dos", "quadriceps", "epaules", "biceps", "triceps", "ischio"], setsReps: { sets: 4, reps: "8-12" }, rest: 90, cardio: 0 },
  "perte-poids": { groups: ["quadriceps", "dos", "pectoraux", "abdominaux", "cardio", "fessiers"], setsReps: { sets: 3, reps: "15-20" }, rest: 45, cardio: 2 },
  force: { groups: ["quadriceps", "pectoraux", "dos", "ischio", "epaules"], setsReps: { sets: 5, reps: "3-6" }, rest: 150, cardio: 0 },
  endurance: { groups: ["cardio", "quadriceps", "abdominaux", "dos", "pectoraux"], setsReps: { sets: 3, reps: "20+" }, rest: 30, cardio: 2 },
  "remise-forme": { groups: ["quadriceps", "dos", "pectoraux", "abdominaux", "fessiers", "mobilite"], setsReps: { sets: 3, reps: "12-15" }, rest: 60, cardio: 1 },
};

const LEVEL_ALLOWED = {
  debutant: ["Débutant"],
  intermediaire: ["Débutant", "Intermédiaire"],
  avance: ["Débutant", "Intermédiaire", "Avancé"],
};

// Matériel disponible -> équipements autorisés.
const EQUIP_MAP = {
  "poids-du-corps": ["Aucun"],
  halteres: ["Haltères", "Banc"],
  machines: ["Machine", "Poulie"],
  barre: ["Barre", "Banc"],
  elastiques: ["Élastique"],
};

// Nombre d'exercices selon la durée (minutes).
const durationToCount = (min) => {
  if (min <= 20) return 4;
  if (min <= 30) return 5;
  if (min <= 45) return 6;
  if (min <= 60) return 8;
  return 10;
};

export function generateProgram({ goal, level, duration, sessions, equipment }) {
  const profile = GOAL_PROFILE[goal] || GOAL_PROFILE["remise-forme"];
  const allowedDiff = LEVEL_ALLOWED[level] || LEVEL_ALLOWED.debutant;
  const allowedEquip = new Set(
    (equipment && equipment.length ? equipment : ["poids-du-corps"]).flatMap((k) => EQUIP_MAP[k] || [])
  );

  const pool = EXERCISES.filter(
    (ex) => allowedDiff.includes(ex.difficulty) && allowedEquip.has(ex.equipment)
  );

  const count = durationToCount(duration);
  const selected = [];
  const usedGroups = {};

  // 1) Un exercice par groupe prioritaire (équilibre).
  for (const g of profile.groups) {
    if (selected.length >= count) break;
    const candidates = pool.filter((ex) => ex.group === g && !selected.includes(ex));
    if (candidates.length) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      selected.push(pick);
      usedGroups[g] = 1;
    }
  }

  // 2) Compléter avec le reste du pool en variant les groupes.
  const rest = pool.filter((ex) => !selected.includes(ex)).sort(() => Math.random() - 0.5);
  for (const ex of rest) {
    if (selected.length >= count) break;
    selected.push(ex);
  }

  const [minRep] = profile.setsReps.reps.replace("+", "").split("-");
  const reps = parseInt(minRep, 10) || 12;

  const exercises = selected.slice(0, count).map((ex) => ({
    id: ex.id,
    sets: profile.setsReps.sets,
    reps,
    rest: Math.min(profile.rest, ex.group === "cardio" ? 30 : profile.rest),
  }));

  return {
    id: "gen-" + Date.now(),
    name: `Programme ${goalLabel(goal)} — ${sessions}x/sem · V${Math.floor(Math.random() * 90 + 10)}`,
    goal: goalLabel(goal),
    level,
    duration,
    sessions,
    generated: true,
    description: `Généré automatiquement : objectif ${goalLabel(goal)}, niveau ${level}, ${duration} min, ${sessions} séances/semaine.`,
    exercises,
  };
}

export const goalLabel = (g) =>
  ({ "prise-masse": "Prise de masse", "perte-poids": "Perte de poids", force: "Force", endurance: "Endurance", "remise-forme": "Remise en forme" }[g] || g);

export const GOALS = [
  { id: "prise-masse", name: "Prise de masse" },
  { id: "perte-poids", name: "Perte de poids" },
  { id: "force", name: "Force" },
  { id: "endurance", name: "Endurance" },
  { id: "remise-forme", name: "Remise en forme" },
];
export const LEVELS = [
  { id: "debutant", name: "Débutant" },
  { id: "intermediaire", name: "Intermédiaire" },
  { id: "avance", name: "Avancé" },
];
export const DURATIONS = [20, 30, 45, 60, 90];
export const EQUIPMENT_OPTIONS = [
  { id: "poids-du-corps", name: "Poids du corps" },
  { id: "halteres", name: "Haltères" },
  { id: "machines", name: "Machines" },
  { id: "barre", name: "Barre" },
  { id: "elastiques", name: "Élastiques" },
];
