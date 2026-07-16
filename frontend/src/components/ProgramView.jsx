import { useNavigate } from "react-router-dom";
import { Clock, Layers, Copy, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { getExercise } from "@/data/exercises";
import { muscleName } from "@/data/muscles";
import { useCustomPrograms, useFavoritePrograms } from "@/lib/storage";
import { toast } from "sonner";

export default function ProgramView({ program, open, onOpenChange, isCustom = false }) {
  const navigate = useNavigate();
  const { save } = useCustomPrograms();
  const { isFav, toggle } = useFavoritePrograms();
  if (!program) return null;

  const copyToBuilder = () => {
    const copy = {
      id: "prog-" + Date.now(),
      name: program.name + (isCustom ? " (copie)" : ""),
      description: program.description || "",
      goal: program.goal,
      level: program.level,
      duration: program.duration,
      exercises: program.exercises,
      custom: true,
    };
    save(copy);
    toast.success("Programme copié dans le créateur");
    onOpenChange(false);
    navigate(`/creer/${copy.id}`);
  };

  const totalSets = program.exercises.reduce((s, e) => s + (e.sets || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="program-detail-dialog" className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card">
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {program.level && <DifficultyBadge level={program.level} />}
            {program.goal && <Badge variant="outline" className="rounded-full border-emerald-500/40 text-emerald-300">{program.goal}</Badge>}
          </div>
          <DialogTitle className="font-display text-2xl font-black">{program.name}</DialogTitle>
        </DialogHeader>

        {program.description && <p className="text-sm text-zinc-400">{program.description}</p>}

        <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
          {program.duration && <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-yellow-300" />{program.duration} min</span>}
          <span className="flex items-center gap-1.5"><Layers className="h-4 w-4 text-emerald-400" />{program.exercises.length} exercices · {totalSets} séries</span>
        </div>

        <div className="space-y-2">
          {program.exercises.map((item, i) => {
            const ex = getExercise(item.id);
            if (!ex) return null;
            return (
              <div key={i} data-testid={`program-exercise-${i}`} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3">
                <img src={ex.image} alt={ex.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{ex.name}</p>
                  <p className="text-xs text-zinc-400">{muscleName(ex.group)}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-display font-bold text-emerald-400">{item.sets} × {item.reps}</p>
                  <p className="text-xs text-zinc-500">repos {item.rest}s</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button data-testid="copy-program-btn" onClick={copyToBuilder} className="rounded-full bg-emerald-500 text-black hover:bg-emerald-400">
            <Copy className="mr-2 h-4 w-4" />{isCustom ? "Dupliquer / Modifier" : "Utiliser ce programme"}
          </Button>
          {!isCustom && (
            <Button
              data-testid="fav-program-btn"
              variant="outline"
              onClick={() => toggle(program.id)}
              className={`rounded-full ${isFav(program.id) ? "border-emerald-500 text-emerald-400" : "border-border"}`}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFav(program.id) ? "fill-emerald-500 text-emerald-500" : ""}`} />
              {isFav(program.id) ? "Favori" : "Favori"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
