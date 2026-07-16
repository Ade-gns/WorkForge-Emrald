import { Link } from "react-router-dom";
import { Dumbbell, PersonStanding, Building2, Sparkles, Activity, ListChecks, PlusSquare, Timer, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MUSCLE_GROUPS } from "@/data/muscles";
import { EXERCISES } from "@/data/exercises";
import { PREDEFINED_PROGRAMS } from "@/data/programs";

const quick = [
  { to: "/exercices", label: "Bibliothèque", desc: "Tous les exercices", icon: Dumbbell },
  { to: "/exercices/poids-du-corps", label: "Poids du corps", desc: "Sans matériel", icon: PersonStanding },
  { to: "/exercices/salle", label: "Salle de sport", desc: "Machines & charges", icon: Building2 },
  { to: "/generateur", label: "Générateur", desc: "Programme sur-mesure", icon: Sparkles },
  { to: "/anatomie", label: "Anatomie", desc: "Cible un muscle", icon: Activity },
  { to: "/outils", label: "Outils", desc: "Minuteur, IMC, 1RM…", icon: Timer },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="grain relative overflow-hidden rounded-3xl border border-border">
        <img
          src="https://images.pexels.com/photos/5327478/pexels-photo-5327478.jpeg?w=1400"
          alt="Musculation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="relative z-10 max-w-2xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500 animate-fade-up">Ton coach de poche · 100% hors ligne</p>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl animate-fade-up" style={{ animationDelay: "80ms" }}>
            Forge ton corps,<br /><span className="text-emerald-500">à ta façon</span>.
          </h1>
          <p className="mt-5 max-w-lg text-zinc-300 animate-fade-up" style={{ animationDelay: "160ms" }}>
            Découvre {EXERCISES.length}+ exercices détaillés, crée tes programmes et garde tout sur ton appareil. Aucun compte, aucune connexion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link data-testid="hero-explore-btn" to="/exercices" className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black transition-transform duration-200 hover:-translate-y-1 glow-emerald">
              Explorer les exercices <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link data-testid="hero-generator-btn" to="/generateur" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/40 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-emerald-500">
              <Sparkles className="h-4 w-4 text-yellow-300" /> Générer un programme
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: `${EXERCISES.length}+`, l: "Exercices" },
          { n: MUSCLE_GROUPS.length, l: "Groupes musculaires" },
          { n: PREDEFINED_PROGRAMS.length, l: "Programmes prêts" },
          { n: "6", l: "Outils fitness" },
        ].map((s, i) => (
          <Card key={i} className="animate-fade-up border-border bg-card p-5" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="font-display text-3xl font-black text-emerald-500">{s.n}</p>
            <p className="mt-1 text-sm text-zinc-400">{s.l}</p>
          </Card>
        ))}
      </section>

      {/* QUICK ACCESS */}
      <section>
        <h2 className="mb-5 font-display text-2xl font-black">Accès rapide</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quick.map((q, i) => {
            const Icon = q.icon;
            return (
              <Link key={q.to} to={q.to} data-testid={`quick-${q.to}`} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <Card className="group flex items-center gap-4 border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-emerald-500/50">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-black">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold">{q.label}</p>
                    <p className="text-sm text-zinc-400">{q.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* MUSCLE GROUPS */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-black">Par groupe musculaire</h2>
          <Link to="/anatomie" className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">Anatomie <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {MUSCLE_GROUPS.map((m, i) => (
            <Link key={m.id} to={`/anatomie?muscle=${m.id}`} data-testid={`home-muscle-${m.id}`} className="animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
              <Card className="group relative h-28 overflow-hidden border-border p-0">
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute bottom-2 left-3 font-display text-sm font-bold">{m.name}</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
