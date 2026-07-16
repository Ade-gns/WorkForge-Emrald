import { Download, Trash2, Shield, Bell, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSettings, exportAllData, clearAllData } from "@/lib/storage";
import { toast } from "sonner";

export default function Settings() {
  const { settings, update } = useSettings();

  const doExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "workforge-donnees.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Données exportées");
  };
  const doClear = () => { clearAllData(); toast.success("Toutes les données locales ont été effacées"); };

  const Row = ({ icon: Icon, title, desc, children }) => (
    <div className="flex items-center justify-between gap-4 border-b border-border py-5 last:border-0">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400"><Icon className="h-5 w-5" /></div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-zinc-400">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div>
      <PageHeader label="Configuration" title="Paramètres" subtitle="Préférences et gestion de tes données locales." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card px-6 py-2">
          <Row icon={Bell} title="Bip de fin de repos" desc="Signal sonore quand le minuteur se termine">
            <Switch data-testid="setting-beep" checked={settings.restBeep} onCheckedChange={(v) => update({ restBeep: v })} />
          </Row>
          <Row icon={Clock} title="Repos par défaut" desc="Durée pré-remplie des nouveaux exercices">
            <Input data-testid="setting-rest" type="number" value={settings.defaultRest} onChange={(e) => update({ defaultRest: +e.target.value })} className="h-10 w-24 border-border bg-secondary text-center" />
          </Row>
          <Row icon={Shield} title="Unité de poids" desc="Affichage dans les calculateurs">
            <Select value={settings.weightUnit} onValueChange={(v) => update({ weightUnit: v })}>
              <SelectTrigger data-testid="setting-unit" className="h-10 w-24 border-border bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="border-border bg-popover"><SelectItem value="kg">kg</SelectItem><SelectItem value="lb">lb</SelectItem></SelectContent>
            </Select>
          </Row>
        </Card>

        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Mes données</h3>
          <p className="mb-5 text-sm text-zinc-400">Toutes tes données (favoris, programmes, préférences) sont stockées uniquement sur cet appareil. Rien n'est envoyé sur Internet.</p>
          <div className="flex flex-wrap gap-3">
            <Button data-testid="export-data-btn" onClick={doExport} variant="outline" className="rounded-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
              <Download className="mr-2 h-4 w-4" /> Exporter (JSON)
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button data-testid="clear-data-btn" variant="outline" className="rounded-full border-rose-500/50 text-rose-400 hover:bg-rose-500/10">
                  <Trash2 className="mr-2 h-4 w-4" /> Tout effacer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-border bg-card">
                <AlertDialogHeader>
                  <AlertDialogTitle>Effacer toutes les données ?</AlertDialogTitle>
                  <AlertDialogDescription>Cette action supprimera définitivement tes favoris, programmes et préférences de cet appareil. Irréversible.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full border-border">Annuler</AlertDialogCancel>
                  <AlertDialogAction data-testid="confirm-clear-btn" onClick={doClear} className="rounded-full bg-rose-500 text-white hover:bg-rose-600">Effacer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>

      <p className="mt-8 text-center text-xs text-zinc-600">WorkForge · PWA installable · Aucun compte, aucune connexion requise.</p>
    </div>
  );
}
