import { Badge } from "@/components/ui/badge";

export const diffColor = (d) =>
  ({
    Débutant: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Intermédiaire: "bg-yellow-400/15 text-yellow-300 border-yellow-400/30",
    Avancé: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  }[d] || "bg-zinc-700/40 text-zinc-300 border-zinc-600/40");

export function DifficultyBadge({ level, testid }) {
  return (
    <Badge data-testid={testid} variant="outline" className={`rounded-full font-medium ${diffColor(level)}`}>
      {level}
    </Badge>
  );
}
