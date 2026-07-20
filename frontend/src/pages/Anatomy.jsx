import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { AnatomyFront, AnatomyBack } from "@/components/AnatomyBody";
import ExerciseGrid from "@/components/ExerciseGrid";
import { muscleName, MUSCLE_GROUPS } from "@/data/muscles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TYPE_TABS = [
  { id: "all", label: "Tous" },
  { id: "poids-du-corps", label: "Poids du corps" },
  { id: "salle", label: "Salle" },
];

export default function Anatomy() {
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState(params.get("muscle") || null);
  const [type, setType] = useState("all");

  useEffect(() => {
    const m = params.get("muscle");
    if (m) setSelected(m);
  }, [params]);

  const onSelect = (id) => {
    setSelected(id);
    setParams({ muscle: id });
  };

  return (
    <div>
      <PageHeader label="Cible tes muscles" title="Anatomie interactive" subtitle="Clique sur un muscle de la silhouette pour afficher instantanément les exercices correspondants." />

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <Card className="border-border bg-card p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Face</p>
              <div className="h-[420px]"><AnatomyFront selected={selected} onSelect={onSelect} /></div>
            </div>
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Dos</p>
              <div className="h-[420px]"><AnatomyBack selected={selected} onSelect={onSelect} /></div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {MUSCLE_GROUPS.filter((m) => !["cardio", "mobilite"].includes(m.id)).map((m) => (
              <button
                key={m.id}
                data-testid={`anatomy-chip-${m.id}`}
                onClick={() => onSelect(m.id)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${selected === m.id ? "border-emerald-500 bg-emerald-500/15 text-emerald-300" : "border-border text-zinc-400 hover:border-emerald-500/50 hover:text-white"}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </Card>

        <div>
          {selected ? (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 data-testid="anatomy-selected-name" className="font-display text-2xl font-black">
                  Exercices : <span className="text-emerald-500">{muscleName(selected)}</span>
                </h2>
                <Tabs value={type} onValueChange={setType}>
                  <TabsList className="border border-border bg-secondary">
                    {TYPE_TABS.map((t) => (
                      <TabsTrigger key={t.id} value={t.id} data-testid={`anatomy-type-${t.id}`} className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <ExerciseGrid key={`${selected}-${type}`} lockMuscle={selected} baseType={type} />
            </>
          ) : (
            <div className="grain relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary/40">
              <p className="text-zinc-400">Sélectionne un muscle pour commencer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
