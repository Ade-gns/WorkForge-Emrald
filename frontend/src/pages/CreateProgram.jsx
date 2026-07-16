import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Search, GripVertical } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { EXERCISES, getExercise } from "@/data/exercises";
import { muscleName } from "@/data/muscles";
import { useCustomPrograms, useSettings } from "@/lib/storage";
import { toast } from "sonner";

export default function CreateProgram() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, save } = useCustomPrograms();
  const { settings } = useSettings();
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (id) {
      const existing = get(id);
      if (existing) { setName(existing.name); setItems(existing.exercises); }
    }
  }, [id]); // eslint-disable-line

  const addExercise = (ex) => {
    setItems((cur) => [...cur, { id: ex.id, sets: 3, reps: 12, rest: settings.defaultRest }]);
    setPickerOpen(false);
    setQuery("");
  };
  const removeItem = (i) => setItems((cur) => cur.filter((_, idx) => idx !== i));
  const move = (i, dir) => setItems((cur) => {
    const j = i + dir;
    if (j < 0 || j >= cur.length) return cur;
    const copy = [...cur];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
  });
  const update = (i, field, value) => setItems((cur) => cur.map((it, idx) => idx === i ? { ...it, [field]: value } : it));

  const handleSave = () => {
    if (!name.trim()) { toast.error("Donne un nom à ton programme"); return; }
    if (items.length === 0) { toast.error("Ajoute au moins un exercice"); return; }
    const program = {
      id: id || "prog-" + Date.now(),
      name: name.trim(),
      description: "Programme personnalisé",
      exercises: items,
      custom: true,
    };
    save(program);
    toast.success("Programme enregistré localement");
    navigate("/favoris");
  };

  const filtered = EXERCISES.filter((ex) => {
    const q = query.toLowerCase();
    return !q || ex.name.toLowerCase().includes(q) || muscleName(ex.group).toLowerCase().includes(q);
  });

  return (
    <div>
      <PageHeader
        label={id ? "Modifier" : "Créateur"}
        title={id ? "Modifier le programme" : "Créer un programme"}
        subtitle="Ajoute des exercices, ajuste séries, répétitions et repos, puis enregistre sur ton appareil."
        action={
          <Button data-testid="save-program-btn" onClick={handleSave} className="rounded-full bg-emerald-500 font-bold text-black hover:bg-emerald-400">
            <Save className="mr-2 h-4 w-4" /> Enregistrer
          </Button>
        }
      />

      <Card className="mb-6 border-border bg-card p-5">
        <Label className="mb-2 block text-sm font-semibold">Nom du programme</Label>
        <Input data-testid="program-name-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Mon PPL du lundi" className="h-12 border-border bg-secondary text-base" />
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-400">{items.length} exercice{items.length > 1 ? "s" : ""}</p>
        <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-exercise-btn" variant="outline" className="rounded-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
              <Plus className="mr-2 h-4 w-4" /> Ajouter un exercice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] max-w-lg overflow-hidden border-border bg-card">
            <DialogHeader><DialogTitle className="font-display">Ajouter un exercice</DialogTitle></DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input data-testid="picker-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." className="border-border bg-secondary pl-9" autoFocus />
            </div>
            <div className="max-h-[55vh] space-y-2 overflow-y-auto pr-1">
              {filtered.map((ex) => (
                <button key={ex.id} data-testid={`picker-item-${ex.id}`} onClick={() => addExercise(ex)} className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary/50 p-2.5 text-left transition-colors hover:border-emerald-500/50">
                  <img src={ex.image} alt={ex.name} className="h-11 w-11 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{ex.name}</p>
                    <p className="text-xs text-zinc-500">{muscleName(ex.group)} · {ex.equipment}</p>
                  </div>
                  <Plus className="h-4 w-4 text-emerald-400" />
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <div className="grain relative overflow-hidden rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center">
          <p className="text-zinc-400">Aucun exercice pour l'instant. Clique sur « Ajouter un exercice ».</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => {
            const ex = getExercise(item.id);
            if (!ex) return null;
            return (
              <Card key={i} data-testid={`builder-item-${i}`} className="flex flex-col gap-4 border-border bg-card p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 shrink-0 text-zinc-600" />
                  <img src={ex.image} alt={ex.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="font-semibold">{ex.name}</p>
                    <Badge variant="outline" className="mt-1 rounded-full border-emerald-500/40 text-xs text-emerald-300">{muscleName(ex.group)}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-end gap-3 sm:ml-auto">
                  {[
                    { f: "sets", l: "Séries", min: 1 },
                    { f: "reps", l: "Reps", min: 1 },
                    { f: "rest", l: "Repos (s)", min: 0 },
                  ].map(({ f, l, min }) => (
                    <div key={f} className="w-20">
                      <Label className="mb-1 block text-[10px] uppercase tracking-wide text-zinc-500">{l}</Label>
                      <Input
                        data-testid={`item-${i}-${f}`}
                        type="number"
                        min={min}
                        value={item[f]}
                        onChange={(e) => update(i, f, parseInt(e.target.value, 10) || 0)}
                        className="h-10 border-border bg-secondary text-center"
                      />
                    </div>
                  ))}
                  <div className="flex gap-1">
                    <Button data-testid={`move-up-${i}`} variant="outline" size="icon" onClick={() => move(i, -1)} disabled={i === 0} className="h-10 w-10 rounded-lg border-border"><ArrowUp className="h-4 w-4" /></Button>
                    <Button data-testid={`move-down-${i}`} variant="outline" size="icon" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="h-10 w-10 rounded-lg border-border"><ArrowDown className="h-4 w-4" /></Button>
                    <Button data-testid={`remove-item-${i}`} variant="outline" size="icon" onClick={() => removeItem(i)} className="h-10 w-10 rounded-lg border-rose-500/40 text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
