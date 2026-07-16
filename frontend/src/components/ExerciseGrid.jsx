import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExerciseCard from "@/components/ExerciseCard";
import ExerciseDetail from "@/components/ExerciseDetail";
import { EXERCISES } from "@/data/exercises";
import { MUSCLE_GROUPS, DIFFICULTIES, EQUIPMENTS, muscleName } from "@/data/muscles";

export default function ExerciseGrid({ baseType = "all", lockMuscle = null }) {
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState(lockMuscle || "all");
  const [difficulty, setDifficulty] = useState("all");
  const [equipment, setEquipment] = useState("all");
  const [type, setType] = useState(baseType);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXERCISES.filter((ex) => {
      if (type !== "all" && ex.type !== type) return false;
      if (muscle !== "all" && ex.group !== muscle) return false;
      if (difficulty !== "all" && ex.difficulty !== difficulty) return false;
      if (equipment !== "all" && ex.equipment !== equipment) return false;
      if (q) {
        const hay = `${ex.name} ${muscleName(ex.group)} ${ex.equipment} ${ex.difficulty}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, muscle, difficulty, equipment, type]);

  const openEx = (ex) => { setSelected(ex); setOpen(true); };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            data-testid="exercise-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un exercice, muscle, matériel..."
            className="h-12 rounded-xl border-border bg-secondary pl-10 text-base"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
          {!lockMuscle && (
            <Select value={muscle} onValueChange={setMuscle}>
              <SelectTrigger data-testid="filter-muscle" className="h-9 w-auto min-w-[130px] rounded-full border-border bg-secondary text-sm"><SelectValue placeholder="Muscle" /></SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="all">Tous les muscles</SelectItem>
                {MUSCLE_GROUPS.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {baseType === "all" && !lockMuscle && (
            <Select value={type} onValueChange={setType}>
              <SelectTrigger data-testid="filter-type" className="h-9 w-auto min-w-[120px] rounded-full border-border bg-secondary text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="border-border bg-popover">
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="poids-du-corps">Poids du corps</SelectItem>
                <SelectItem value="salle">Salle</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger data-testid="filter-difficulty" className="h-9 w-auto min-w-[120px] rounded-full border-border bg-secondary text-sm"><SelectValue placeholder="Difficulté" /></SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all">Toutes difficultés</SelectItem>
              {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={equipment} onValueChange={setEquipment}>
            <SelectTrigger data-testid="filter-equipment" className="h-9 w-auto min-w-[120px] rounded-full border-border bg-secondary text-sm"><SelectValue placeholder="Matériel" /></SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all">Tout matériel</SelectItem>
              {EQUIPMENTS.map((eq) => <SelectItem key={eq} value={eq}>{eq}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p data-testid="results-count" className="text-sm text-zinc-500">{results.length} exercice{results.length > 1 ? "s" : ""}</p>

      {results.length === 0 ? (
        <div className="grain relative overflow-hidden rounded-2xl border border-border bg-secondary/40 py-20 text-center">
          <p className="text-zinc-400">Aucun exercice ne correspond à ces filtres.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((ex, i) => <ExerciseCard key={ex.id} exercise={ex} onOpen={openEx} index={i} />)}
        </div>
      )}

      <ExerciseDetail exercise={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
