import { useSyncExternalStore } from "react";

export type Status = "pending" | "scanning" | "review" | "done" | "flagged";

export type Measurements = {
  shoulder: number;
  chest: number;
  waist: number;
  hip: number;
  sleeve: number;
  inseam: number;
};

export type Person = {
  id: string;
  employeeId: string;
  name: string;
  gender: "M" | "F" | "U";
  height: number; // cm
  department?: string;
  status: Status;
  confidence?: number; // 0-100
  measurements?: Measurements;
  scannedAt?: string;
  notes?: string;
};

const KEY = "fitscan.people.v1";

let people: Person[] = load();
const listeners = new Set<() => void>();

function load(): Person[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Person[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(people));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const store = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get() {
    return people;
  },
  setAll(next: Person[]) {
    people = next;
    emit();
  },
  add(rows: Omit<Person, "id" | "status">[]) {
    const next = rows.map((r) => ({
      ...r,
      id: crypto.randomUUID(),
      status: "pending" as Status,
    }));
    people = [...people, ...next];
    emit();
    return next.length;
  },
  update(id: string, patch: Partial<Person>) {
    people = people.map((p) => (p.id === id ? { ...p, ...patch } : p));
    emit();
  },
  remove(id: string) {
    people = people.filter((p) => p.id !== id);
    emit();
  },
  clear() {
    people = [];
    emit();
  },
};

export function usePeople() {
  return useSyncExternalStore(
    store.subscribe,
    store.get,
    () => [] as Person[],
  );
}

// Mock measurement generator — derives plausible values from height/gender
export function generateMockScan(p: Person): { measurements: Measurements; confidence: number } {
  const h = p.height || 170;
  const base = h / 170;
  const female = p.gender === "F";
  const jitter = (n: number, pct = 0.04) => +(n * (1 + (Math.random() - 0.5) * pct)).toFixed(1);

  const measurements: Measurements = {
    shoulder: jitter(female ? 40 * base : 46 * base),
    chest: jitter(female ? 92 * base : 100 * base),
    waist: jitter(female ? 74 * base : 84 * base),
    hip: jitter(female ? 100 * base : 102 * base),
    sleeve: jitter(60 * base),
    inseam: jitter(h * 0.45),
  };

  // Confidence: 70-99, with small chance of low score
  const roll = Math.random();
  const confidence = roll < 0.12 ? 60 + Math.floor(Math.random() * 12) : 85 + Math.floor(Math.random() * 14);
  return { measurements, confidence };
}
