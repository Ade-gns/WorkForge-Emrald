import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, RefreshCw, Save } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getExercise } from "@/data/exercises";
import { muscleName } from "@/data/muscles";
import { generateProgram, GOALS, LEVELS, DURATIONS, EQUIPMENT_OPTIONS } from "@/lib/generator";
import { useCustomPrograms } from "@/lib/storage";
import { toast } from "sonner";

const Chip = ({ active, onClick, children, testid }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-emerald-500 bg-emerald-500 text-black" : "border-border bg-secondary text-zinc-300 hover:border-emerald-500/50"}`}
  >
    {children}
  </button>
);

export default function Generator() {
  const navigate = useNavigate();
  const { save } = useCustomPrograms();
  const [goal, setGoal] = useState("prise-masse");
  const [level, setLevel] = useState("debutant");
  const [duration, setDuration] = useState(45);
  const [sessions, setSessions] = useState(3);
  const [equipment, setEquipment] = useState(["poids-du-corps"]);
  const [result, setResult] = useState(null);

  const toggleEquip = (id) =>
    setEquipment((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const handleGenerate = () => {
    if (equipment.length === 0) { toast.error("Choisis au moins un type de matériel"); return; }
    const prog = generateProgram({ goal, level, duration, sessions, equipment });
    setResult(prog);
    toast.success("Programme généré !");
  };

  const handleSave = () => {
    const toSave = { ...result, custom: true };
    save(toSave);
    toast.success("Enregistré ! Ouverture du créateur...");
    navigate(`/creer/${toSave.id}`);
  };

  return (
    <div>
      <PageHeader label="Sur-mesure" title="Générateur intelligent" subtitle="Réponds à quelques questions, l'algorithme construit un programme équilibré et cohérent." />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-6 border-border bg-card p-6">
          <div>
            <Label className="mb-3 block text-sm font-semibold">Objectif</Label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => <Chip key={g.id} testid={`goal-${g.id}`} active={goal === g.id} onClick={() => setGoal(g.id)}>{g.name}</Chip>)}
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-sm font-semibold">Niveau</Label>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => <Chip key={l.id} testid={`level-${l.id}`} active={level === l.id} onClick={() => setLevel(l.id)}>{l.name}</Chip>)}
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-sm font-semibold">Durée par séance</Label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => <Chip key={d} testid={`duration-${d}`} active={duration === d} onClick={() => setDuration(d)}>{d} min</Chip>)}
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label className="text-sm font-semibold">Séances par semaine</Label>
              <span data-testid="sessions-value" className="font-display text-lg font-black text-emerald-500">{sessions}</span>
            </div>
            <Slider data-testid="sessions-slider" value={[sessions]} onValueChange={(v) => setSessions(v[0])} min={1} max={7} step={1} />
          </div>
          <div>
            <Label className="mb-3 block text-sm font-semibold">Matériel disponible</Label>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map((eq) => <Chip key={eq.id} testid={`equip-${eq.id}`} active={equipment.includes(eq.id)} onClick={() => toggleEquip(eq.id)}>{eq.name}</Chip>)}
            </div>
          </div>
          <Button data-testid="generate-btn" onClick={handleGenerate} className="w-full rounded-full bg-emerald-500 py-6 text-base font-bold text-black hover:bg-emerald-400 glow-emerald">
            <Sparkles className="mr-2 h-5 w-5" /> Générer mon programme
          </Button>
        </Card>

        <Card className="border-border bg-card p-6">
          {result ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 data-testid="generated-name" className="font-display text-xl font-black">{result.name}</h3>
                  <p className="text-sm text-zinc-400">{result.exercises.length} exercices · {result.duration} min</p>
                </div>
                <Button data-testid="regenerate-btn" variant="outline" size="icon" onClick={handleGenerate} className="rounded-full border-border">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {result.exercises.map((item, i) => {
                  const ex = getExercise(item.id);
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-2.5">
                      <img src={ex.image} alt={ex.name} className="h-11 w-11 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{ex.name}</p>
                        <p className="text-xs text-zinc-500">{muscleName(ex.group)}</p>
                      </div>
                      <span className="font-display text-sm font-bold text-emerald-400">{item.sets}×{item.reps}</span>
                    </div>
                  );
                })}
              </div>
              <Button data-testid="save-generated-btn" onClick={handleSave} className="w-full rounded-full bg-yellow-400 py-5 font-bold text-black hover:bg-yellow-300">
                <Save className="mr-2 h-4 w-4" /> Enregistrer & personnaliser
              </Button>
            </div>
          ) : (
            <div className="grain relative flex h-full min-h-[300px] flex-col items-center justify-center gap-3 overflow-hidden text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <p className="text-zinc-400">Ton programme apparaîtra ici.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
