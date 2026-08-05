import { EXERCISE_ANIMATIONS } from "@/data/exerciseAnimations";

// Anime la démo en alternant 2 photos réelles (départ/fin du mouvement) en fondu.
// mode="hover" : ne joue qu'au survol (cartes en grille). mode="auto" : joue en continu (fiche détail).
export default function AnimatedExerciseImage({ exercise, className = "", mode = "hover", loading = "lazy" }) {
  const frames = EXERCISE_ANIMATIONS[exercise.id];

  if (!frames) {
    // Pas de 2e photo réelle disponible : léger pouls CSS pour garder une carte "vivante".
    return (
      <img
        src={exercise.image}
        alt={exercise.name}
        loading={loading}
        className={`${className} wf-css-motion ${mode === "hover" ? "wf-anim-hover" : ""}`}
      />
    );
  }

  const [frame0, frame1] = frames;

  return (
    <>
      <img src={frame0} alt={exercise.name} loading={loading} className={className} />
      <img
        src={frame1}
        alt=""
        aria-hidden="true"
        loading={loading}
        className={`${className} absolute inset-0 wf-anim-frame ${mode === "hover" ? "wf-anim-hover" : ""}`}
      />
    </>
  );
}
