import { Heart, Clock, Dumbbell, Lightbulb, AlertTriangle, TrendingDown, TrendingUp, Target } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { muscleName } from "@/data/muscles";
import { useFavoriteExercises } from "@/lib/storage";

const Section = ({ icon: Icon, title, color, children }) => (
  <div className="rounded-xl border border-border bg-secondary/50 p-4">
    <div className="mb-2 flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">{title}</h4>
    </div>
    {children}
  </div>
);

const List = ({ items }) => (
  <ul className="space-y-1.5 text-sm text-zinc-300">
    {items.map((t, i) => (
      <li key={i} className="flex gap-2"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />{t}</li>
    ))}
  </ul>
);

export default function ExerciseDetail({ exercise, open, onOpenChange }) {
  const { isFav, toggle } = useFavoriteExercises();
  if (!exercise) return null;
  const fav = isFav(exercise.id);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="exercise-detail-dialog"
        className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card p-0"
      >
        <div className="relative h-56 w-full overflow-hidden">
          <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge className="rounded-full border-none bg-emerald-500 text-black">{muscleName(exercise.group)}</Badge>
              <DifficultyBadge level={exercise.difficulty} />
            </div>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black sm:text-3xl">{exercise.name}</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-zinc-300"><Dumbbell className="h-4 w-4 text-emerald-400" />{exercise.equipment}</span>
            {exercise.rest > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-zinc-300"><Clock className="h-4 w-4 text-yellow-300" />Repos {exercise.rest}s</span>
            )}
            <Button
              data-testid="detail-fav-btn"
              variant="outline"
              size="sm"
              onClick={() => toggle(exercise.id)}
              className={`ml-auto rounded-full ${fav ? "border-emerald-500 text-emerald-400" : "border-border"}`}
            >
              <Heart className={`mr-1.5 h-4 w-4 ${fav ? "fill-emerald-500 text-emerald-500" : ""}`} />
              {fav ? "Favori" : "Ajouter"}
            </Button>
          </div>

          <p className="text-sm leading-relaxed text-zinc-300">{exercise.description}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Section icon={Target} title="Muscles principaux" color="text-emerald-400">
              <div className="flex flex-wrap gap-1.5">
                {exercise.primary.map((m) => (
                  <Badge key={m} variant="outline" className="rounded-full border-emerald-500/40 text-emerald-300">{muscleName(m)}</Badge>
                ))}
              </div>
            </Section>
            <Section icon={Target} title="Muscles secondaires" color="text-yellow-300">
              <div className="flex flex-wrap gap-1.5">
                {exercise.secondary.length ? exercise.secondary.map((m) => (
                  <Badge key={m} variant="outline" className="rounded-full border-yellow-400/40 text-yellow-200">{muscleName(m)}</Badge>
                )) : <span className="text-sm text-zinc-500">—</span>}
              </div>
            </Section>
          </div>

          {exercise.tips.length > 0 && (
            <Section icon={Lightbulb} title="Conseils" color="text-emerald-400"><List items={exercise.tips} /></Section>
          )}
          {exercise.mistakes.length > 0 && (
            <Section icon={AlertTriangle} title="Erreurs fréquentes" color="text-rose-400"><List items={exercise.mistakes} /></Section>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {exercise.easier.length > 0 && (
              <Section icon={TrendingDown} title="Variantes plus faciles" color="text-emerald-400"><List items={exercise.easier} /></Section>
            )}
            {exercise.harder.length > 0 && (
              <Section icon={TrendingUp} title="Variantes plus difficiles" color="text-yellow-300"><List items={exercise.harder} /></Section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
