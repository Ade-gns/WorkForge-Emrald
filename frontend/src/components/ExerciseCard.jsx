import { Heart, Clock, Dumbbell as DumbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { muscleName } from "@/data/muscles";
import { useFavoriteExercises } from "@/lib/storage";

export default function ExerciseCard({ exercise, onOpen, index = 0 }) {
  const { isFav, toggle } = useFavoriteExercises();
  const fav = isFav(exercise.id);
  return (
    <Card
      data-testid={`exercise-card-${exercise.id}`}
      onClick={() => onOpen(exercise)}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      className="group animate-fade-up cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-0 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/50"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={exercise.image}
          alt={exercise.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <button
          data-testid={`fav-exercise-btn-${exercise.id}`}
          onClick={(e) => { e.stopPropagation(); toggle(exercise.id); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 backdrop-blur-md transition-transform duration-200 hover:scale-110"
          aria-label="Favori"
        >
          <Heart className={`h-[18px] w-[18px] ${fav ? "fill-emerald-500 text-emerald-500" : "text-white"}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <Badge className="rounded-full border-none bg-emerald-500 text-black hover:bg-emerald-400">
            {muscleName(exercise.group)}
          </Badge>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="font-display text-lg font-bold leading-tight">{exercise.name}</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <DifficultyBadge level={exercise.difficulty} />
          <span className="flex items-center gap-1"><DumbIcon className="h-3.5 w-3.5" />{exercise.equipment}</span>
          {exercise.rest > 0 && (
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{exercise.rest}s repos</span>
          )}
        </div>
      </div>
    </Card>
  );
}
