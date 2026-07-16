import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer as TimerIcon, Gauge, Scale, Flame, Activity, Dumbbell } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/lib/storage";

const beep = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880; osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.stop(ctx.currentTime + 0.6);
  } catch { /* audio non dispo */ }
};

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function RestTimer() {
  const { settings } = useSettings();
  const [total, setTotal] = useState(settings.defaultRest);
  const [left, setLeft] = useState(settings.defaultRest);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setLeft((l) => {
          if (l <= 1) { clearInterval(ref.current); setRunning(false); if (settings.restBeep) beep(); return 0; }
          return l - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [running]); // eslint-disable-line

  const set = (v) => { setTotal(v); setLeft(v); setRunning(false); };
  const pct = total ? (left / total) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative grid h-56 w-56 place-items-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - pct / 100)} style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <span data-testid="rest-timer-display" className="font-display text-5xl font-black">{fmt(left)}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[30, 45, 60, 90, 120, 180].map((v) => (
          <Button key={v} data-testid={`rest-preset-${v}`} variant="outline" size="sm" onClick={() => set(v)} className={`rounded-full ${total === v ? "border-emerald-500 text-emerald-400" : "border-border"}`}>{v}s</Button>
        ))}
      </div>
      <div className="flex gap-3">
        <Button data-testid="rest-toggle-btn" onClick={() => setRunning((r) => !r)} className="rounded-full bg-emerald-500 px-8 font-bold text-black hover:bg-emerald-400">
          {running ? <><Pause className="mr-2 h-4 w-4" /> Pause</> : <><Play className="mr-2 h-4 w-4" /> Démarrer</>}
        </Button>
        <Button data-testid="rest-reset-btn" variant="outline" onClick={() => set(total)} className="rounded-full border-border"><RotateCcw className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running) { const start = Date.now() - ms; ref.current = setInterval(() => setMs(Date.now() - start), 50); }
    return () => clearInterval(ref.current);
  }, [running]); // eslint-disable-line
  const cs = Math.floor((ms % 1000) / 10);
  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <span data-testid="stopwatch-display" className="font-display text-6xl font-black tabular-nums">
        {fmt(Math.floor(ms / 1000))}<span className="text-3xl text-emerald-500">.{String(cs).padStart(2, "0")}</span>
      </span>
      <div className="flex gap-3">
        <Button data-testid="stopwatch-toggle-btn" onClick={() => setRunning((r) => !r)} className="rounded-full bg-emerald-500 px-8 font-bold text-black hover:bg-emerald-400">
          {running ? <><Pause className="mr-2 h-4 w-4" /> Pause</> : <><Play className="mr-2 h-4 w-4" /> Démarrer</>}
        </Button>
        <Button data-testid="stopwatch-reset-btn" variant="outline" onClick={() => { setMs(0); setRunning(false); }} className="rounded-full border-border"><RotateCcw className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

const Field = ({ label, ...props }) => (
  <div>
    <Label className="mb-1.5 block text-sm">{label}</Label>
    <Input className="h-11 border-border bg-secondary" type="number" {...props} />
  </div>
);
const ResultBox = ({ value, unit, note, testid }) => (
  <Card className="border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
    <p data-testid={testid} className="font-display text-4xl font-black text-emerald-400">{value} <span className="text-lg text-zinc-400">{unit}</span></p>
    {note && <p className="mt-2 text-sm text-zinc-300">{note}</p>}
  </Card>
);

function BMI() {
  const [w, setW] = useState(70); const [h, setH] = useState(175);
  const bmi = h ? (w / Math.pow(h / 100, 2)) : 0;
  const cat = bmi < 18.5 ? "Insuffisant" : bmi < 25 ? "Normal" : bmi < 30 ? "Surpoids" : "Obésité";
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-4">
        <Field label="Poids (kg)" data-testid="bmi-weight" value={w} onChange={(e) => setW(+e.target.value)} />
        <Field label="Taille (cm)" data-testid="bmi-height" value={h} onChange={(e) => setH(+e.target.value)} />
      </div>
      <ResultBox testid="bmi-result" value={bmi.toFixed(1)} unit="IMC" note={`Catégorie : ${cat}`} />
    </div>
  );
}

function BMR() {
  const [sex, setSex] = useState("homme"); const [age, setAge] = useState(30); const [w, setW] = useState(70); const [h, setH] = useState(175);
  const bmr = Math.round(10 * w + 6.25 * h - 5 * age + (sex === "homme" ? 5 : -161));
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label className="mb-1.5 block text-sm">Sexe</Label>
          <Select value={sex} onValueChange={setSex}>
            <SelectTrigger data-testid="bmr-sex" className="h-11 border-border bg-secondary"><SelectValue /></SelectTrigger>
            <SelectContent className="border-border bg-popover"><SelectItem value="homme">Homme</SelectItem><SelectItem value="femme">Femme</SelectItem></SelectContent>
          </Select>
        </div>
        <Field label="Âge" data-testid="bmr-age" value={age} onChange={(e) => setAge(+e.target.value)} />
        <Field label="Poids (kg)" data-testid="bmr-weight" value={w} onChange={(e) => setW(+e.target.value)} />
        <Field label="Taille (cm)" data-testid="bmr-height" value={h} onChange={(e) => setH(+e.target.value)} />
      </div>
      <ResultBox testid="bmr-result" value={bmr} unit="kcal/j" note="Métabolisme de base (au repos)" />
    </div>
  );
}

function Calories() {
  const [sex, setSex] = useState("homme"); const [age, setAge] = useState(30); const [w, setW] = useState(70); const [h, setH] = useState(175); const [act, setAct] = useState("1.55");
  const bmr = 10 * w + 6.25 * h - 5 * age + (sex === "homme" ? 5 : -161);
  const tdee = Math.round(bmr * parseFloat(act));
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label className="mb-1.5 block text-sm">Sexe</Label>
          <Select value={sex} onValueChange={setSex}>
            <SelectTrigger data-testid="cal-sex" className="h-11 border-border bg-secondary"><SelectValue /></SelectTrigger>
            <SelectContent className="border-border bg-popover"><SelectItem value="homme">Homme</SelectItem><SelectItem value="femme">Femme</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Âge" data-testid="cal-age" value={age} onChange={(e) => setAge(+e.target.value)} />
          <Field label="Poids" data-testid="cal-weight" value={w} onChange={(e) => setW(+e.target.value)} />
          <Field label="Taille" data-testid="cal-height" value={h} onChange={(e) => setH(+e.target.value)} />
        </div>
        <div>
          <Label className="mb-1.5 block text-sm">Activité</Label>
          <Select value={act} onValueChange={setAct}>
            <SelectTrigger data-testid="cal-activity" className="h-11 border-border bg-secondary"><SelectValue /></SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="1.2">Sédentaire</SelectItem>
              <SelectItem value="1.375">Légère (1-3 j/sem)</SelectItem>
              <SelectItem value="1.55">Modérée (3-5 j/sem)</SelectItem>
              <SelectItem value="1.725">Intense (6-7 j/sem)</SelectItem>
              <SelectItem value="1.9">Très intense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResultBox testid="cal-result" value={tdee} unit="kcal/j" note="Besoins journaliers (maintien)" />
    </div>
  );
}

function OneRM() {
  const [w, setW] = useState(80); const [reps, setReps] = useState(5);
  const rm = reps > 0 ? Math.round(w * (1 + reps / 30)) : 0;
  const pcts = [
    { p: 100, r: "1" }, { p: 95, r: "2-3" }, { p: 90, r: "4" }, { p: 85, r: "6" }, { p: 80, r: "8" }, { p: 70, r: "12" },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-4">
        <Field label="Charge (kg)" data-testid="rm-weight" value={w} onChange={(e) => setW(+e.target.value)} />
        <Field label="Répétitions" data-testid="rm-reps" value={reps} onChange={(e) => setReps(+e.target.value)} />
        <ResultBox testid="rm-result" value={rm} unit="kg" note="1RM estimé (formule d'Epley)" />
      </div>
      <Card className="border-border bg-card p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-300">Charges recommandées</p>
        <div className="space-y-1.5">
          {pcts.map((row) => (
            <div key={row.p} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm">
              <span className="text-zinc-400">{row.p}% · {row.r} reps</span>
              <span className="font-display font-bold text-emerald-400">{Math.round(rm * row.p / 100)} kg</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const TOOLS = [
  { id: "timer", label: "Minuteur", icon: TimerIcon, comp: RestTimer },
  { id: "chrono", label: "Chrono", icon: Gauge, comp: Stopwatch },
  { id: "imc", label: "IMC", icon: Scale, comp: BMI },
  { id: "calories", label: "Calories", icon: Flame, comp: Calories },
  { id: "bmr", label: "BMR", icon: Activity, comp: BMR },
  { id: "1rm", label: "1RM", icon: Dumbbell, comp: OneRM },
];

export default function Tools() {
  return (
    <div>
      <PageHeader label="Boîte à outils" title="Outils fitness" subtitle="Minuteur, chronomètre et calculateurs — tout fonctionne hors ligne." />
      <Tabs defaultValue="timer">
        <TabsList className="mb-8 flex h-auto flex-wrap justify-start gap-1 border border-border bg-secondary p-1">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <TabsTrigger key={t.id} value={t.id} data-testid={`tool-tab-${t.id}`} className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
                <Icon className="mr-1.5 h-4 w-4" /> {t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {TOOLS.map((t) => {
          const Comp = t.comp;
          return (
            <TabsContent key={t.id} value={t.id}>
              <Card className="border-border bg-card p-6 sm:p-8"><Comp /></Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
