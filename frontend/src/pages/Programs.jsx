import { useState } from "react";
import { Clock, Layers, Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import ProgramView from "@/components/ProgramView";
import { PREDEFINED_PROGRAMS } from "@/data/programs";
import { useFavoritePrograms } from "@/lib/storage";

export default function Programs() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const { isFav, toggle } = useFavoritePrograms();

  const openProg = (p) => { setSelected(p); setOpen(true); };

  return (
    <div>
      <PageHeader label="Prêts à l'emploi" title="Programmes prédéfinis" subtitle="Des routines complètes pour chaque objectif. Utilise-les tels quels ou personnalise-les dans le créateur." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PREDEFINED_PROGRAMS.map((p, i) => (
          <Card
            key={p.id}
            data-testid={`program-card-${p.id}`}
            onClick={() => openProg(p)}
            style={{ animationDelay: `${i * 40}ms` }}
            className="group animate-fade-up cursor-pointer overflow-hidden border-border bg-card p-0 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/50"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <button
                data-testid={`fav-program-card-${p.id}`}
                onClick={(e) => { e.stopPropagation(); toggle(p.id); }}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 backdrop-blur-md transition-transform hover:scale-110"
              >
                <Heart className={`h-[18px] w-[18px] ${isFav(p.id) ? "fill-emerald-500 text-emerald-500" : "text-white"}`} />
              </button>
              <h3 className="absolute bottom-3 left-4 font-display text-xl font-black">{p.name}</h3>
            </div>
            <div className="space-y-3 p-4">
              <p className="line-clamp-2 text-sm text-zinc-400">{p.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge level={p.level} />
                <Badge variant="outline" className="rounded-full border-emerald-500/40 text-emerald-300">{p.goal}</Badge>
                <span className="flex items-center gap-1 text-xs text-zinc-400"><Clock className="h-3.5 w-3.5" />{p.duration}m</span>
                <span className="flex items-center gap-1 text-xs text-zinc-400"><Layers className="h-3.5 w-3.5" />{p.exercises.length}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ProgramView program={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
