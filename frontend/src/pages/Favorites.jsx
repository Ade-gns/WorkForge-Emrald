import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Pencil, Trash2, Dumbbell, ListChecks } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExerciseCard from "@/components/ExerciseCard";
import ExerciseDetail from "@/components/ExerciseDetail";
import ProgramView from "@/components/ProgramView";
import { EXERCISES } from "@/data/exercises";
import { PREDEFINED_PROGRAMS } from "@/data/programs";
import { useFavoriteExercises, useFavoritePrograms, useCustomPrograms } from "@/lib/storage";
import { toast } from "sonner";

const Empty = ({ text }) => (
  <div className="grain relative overflow-hidden rounded-2xl border border-dashed border-border bg-secondary/30 py-20 text-center">
    <Heart className="mx-auto mb-3 h-8 w-8 text-zinc-600" />
    <p className="text-zinc-400">{text}</p>
  </div>
);

export default function Favorites() {
  const navigate = useNavigate();
  const { ids: favEx } = useFavoriteExercises();
  const { ids: favProg } = useFavoritePrograms();
  const { programs, remove } = useCustomPrograms();
  const [selEx, setSelEx] = useState(null);
  const [openEx, setOpenEx] = useState(false);
  const [selProg, setSelProg] = useState(null);
  const [openProg, setOpenProg] = useState(false);

  const favExercises = EXERCISES.filter((e) => favEx.includes(e.id));
  const favPrograms = PREDEFINED_PROGRAMS.filter((p) => favProg.includes(p.id));

  const openExercise = (ex) => { setSelEx(ex); setOpenEx(true); };
  const openProgram = (p, custom) => { setSelProg({ ...p, _custom: custom }); setOpenProg(true); };

  return (
    <div>
      <PageHeader label="Ma bibliothèque" title="Favoris" subtitle="Tes exercices et programmes enregistrés localement sur cet appareil." />

      <Tabs defaultValue="exercices">
        <TabsList className="mb-6 border border-border bg-secondary">
          <TabsTrigger value="exercices" data-testid="tab-fav-exercices" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            <Dumbbell className="mr-2 h-4 w-4" /> Exercices ({favExercises.length})
          </TabsTrigger>
          <TabsTrigger value="programmes" data-testid="tab-fav-programmes" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            <ListChecks className="mr-2 h-4 w-4" /> Programmes ({favPrograms.length + programs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exercices">
          {favExercises.length === 0 ? (
            <Empty text="Aucun exercice favori. Touche le ❤ sur un exercice pour l'ajouter." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favExercises.map((ex, i) => <ExerciseCard key={ex.id} exercise={ex} onOpen={openExercise} index={i} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="programmes" className="space-y-8">
          <div>
            <h3 className="mb-4 font-display text-lg font-bold">Mes programmes créés</h3>
            {programs.length === 0 ? (
              <Empty text="Aucun programme créé. Va dans « Créer un programme » ou « Générateur »." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((p) => (
                  <Card key={p.id} data-testid={`custom-program-${p.id}`} className="border-border bg-card p-5">
                    <div onClick={() => openProgram(p, true)} className="cursor-pointer">
                      <p className="font-display text-lg font-bold">{p.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{p.exercises.length} exercices</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button data-testid={`edit-program-${p.id}`} variant="outline" size="sm" onClick={() => navigate(`/creer/${p.id}`)} className="rounded-full border-border">
                        <Pencil className="mr-1.5 h-3.5 w-3.5" /> Modifier
                      </Button>
                      <Button data-testid={`delete-program-${p.id}`} variant="outline" size="sm" onClick={() => { remove(p.id); toast.success("Programme supprimé"); }} className="rounded-full border-rose-500/40 text-rose-400 hover:bg-rose-500/10">
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Supprimer
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold">Programmes prédéfinis favoris</h3>
            {favPrograms.length === 0 ? (
              <Empty text="Aucun programme prédéfini en favori." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favPrograms.map((p) => (
                  <Card key={p.id} data-testid={`fav-predefined-${p.id}`} onClick={() => openProgram(p, false)} className="cursor-pointer overflow-hidden border-border bg-card p-0 transition-transform hover:-translate-y-1">
                    <div className="relative h-32 overflow-hidden">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      <p className="absolute bottom-3 left-4 font-display text-lg font-black">{p.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <ExerciseDetail exercise={selEx} open={openEx} onOpenChange={setOpenEx} />
      <ProgramView program={selProg} open={openProg} onOpenChange={setOpenProg} isCustom={selProg?._custom} />
    </div>
  );
}
