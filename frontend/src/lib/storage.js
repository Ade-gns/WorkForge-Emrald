// Persistance 100% locale via LocalStorage + hooks React.
import { useState, useEffect, useCallback } from "react";

const KEYS = {
  favEx: "wf_fav_exercises",
  favProg: "wf_fav_programs",
  programs: "wf_custom_programs",
  settings: "wf_settings",
};

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Hook générique synchronisé avec localStorage + événement inter-composants.
function useLocalStore(key, fallback) {
  const [state, setState] = useState(() => read(key, fallback));

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.key === key) setState(read(key, fallback));
    };
    window.addEventListener("wf-store", handler);
    return () => window.removeEventListener("wf-store", handler);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = useCallback(
    (value) => {
      const next = typeof value === "function" ? value(read(key, fallback)) : value;
      write(key, next);
      setState(next);
      window.dispatchEvent(new CustomEvent("wf-store", { detail: { key } }));
    },
    [key] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return [state, update];
}

export function useFavoriteExercises() {
  const [ids, setIds] = useLocalStore(KEYS.favEx, []);
  const toggle = (id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const isFav = (id) => ids.includes(id);
  return { ids, toggle, isFav };
}

export function useFavoritePrograms() {
  const [ids, setIds] = useLocalStore(KEYS.favProg, []);
  const toggle = (id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const isFav = (id) => ids.includes(id);
  return { ids, toggle, isFav };
}

export function useCustomPrograms() {
  const [programs, setPrograms] = useLocalStore(KEYS.programs, []);
  const save = (program) =>
    setPrograms((cur) => {
      const idx = cur.findIndex((p) => p.id === program.id);
      if (idx >= 0) {
        const copy = [...cur];
        copy[idx] = program;
        return copy;
      }
      return [...cur, program];
    });
  const remove = (id) => setPrograms((cur) => cur.filter((p) => p.id !== id));
  const get = (id) => programs.find((p) => p.id === id);
  return { programs, save, remove, get };
}

const DEFAULT_SETTINGS = { restBeep: true, defaultRest: 60, weightUnit: "kg" };
export function useSettings() {
  const [settings, setSettings] = useLocalStore(KEYS.settings, DEFAULT_SETTINGS);
  const update = (patch) => setSettings((cur) => ({ ...cur, ...patch }));
  return { settings: { ...DEFAULT_SETTINGS, ...settings }, update };
}

export function exportAllData() {
  return {
    favExercises: read(KEYS.favEx, []),
    favPrograms: read(KEYS.favProg, []),
    customPrograms: read(KEYS.programs, []),
    settings: read(KEYS.settings, DEFAULT_SETTINGS),
  };
}

export function clearAllData() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  Object.values(KEYS).forEach((k) => window.dispatchEvent(new CustomEvent("wf-store", { detail: { key: k } })));
}
