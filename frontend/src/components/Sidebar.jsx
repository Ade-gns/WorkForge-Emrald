import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Dumbbell, PersonStanding, Building2, ListChecks, PlusSquare,
  Sparkles, Heart, Activity, Settings as SettingsIcon, Timer, X,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Accueil", icon: Home, testid: "nav-accueil", end: true },
  { to: "/exercices", label: "Exercices", icon: Dumbbell, testid: "nav-exercices" },
  { to: "/exercices/poids-du-corps", label: "Poids du corps", icon: PersonStanding, testid: "nav-poids-du-corps" },
  { to: "/exercices/salle", label: "Exercices salle", icon: Building2, testid: "nav-salle" },
  { to: "/programmes", label: "Programmes prédéfinis", icon: ListChecks, testid: "nav-programmes" },
  { to: "/creer", label: "Créer un programme", icon: PlusSquare, testid: "nav-creer" },
  { to: "/generateur", label: "Générateur intelligent", icon: Sparkles, testid: "nav-generateur" },
  { to: "/favoris", label: "Favoris", icon: Heart, testid: "nav-favoris" },
  { to: "/anatomie", label: "Anatomie interactive", icon: Activity, testid: "nav-anatomie" },
  { to: "/outils", label: "Outils", icon: Timer, testid: "nav-outils" },
  { to: "/parametres", label: "Paramètres", icon: SettingsIcon, testid: "nav-parametres" },
];

export default function Sidebar({ onNavigate, mobile }) {
  const location = useLocation();
  return (
    <div className="flex h-full flex-col bg-[#080808]">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-black">
            <Dumbbell className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-black tracking-tight">
              WORK<span className="text-emerald-500">FORGE</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Musculation</p>
          </div>
        </div>
        {mobile && (
          <button data-testid="close-sidebar-btn" onClick={onNavigate} className="text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.end
            ? location.pathname === item.to
            : location.pathname === item.to ||
              (item.to !== "/exercices" && location.pathname.startsWith(item.to)) ||
              (item.to === "/exercices" && location.pathname === "/exercices");
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-testid={item.testid}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm transition-transform duration-200 hover:translate-x-1 ${
                  (item.end ? isActive : active)
                    ? "border-emerald-500 bg-emerald-900/20 text-white"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-4 text-[11px] text-zinc-600">
        <p>100% hors ligne · Aucune donnée envoyée</p>
      </div>
    </div>
  );
}
