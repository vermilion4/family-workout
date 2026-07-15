import type { Day } from '../data/types';

export interface PersonProgress {
  startDateISO: string | null;
  checked: Record<number, string[]>;
}

const keyFor = (personId: string) => `fw:v1:progress:${personId}`;
const LAST_KEY = 'fw:v1:lastPerson';

function defaults(): PersonProgress {
  return { startDateISO: null, checked: {} };
}

export function loadProgress(personId: string): PersonProgress {
  try {
    const raw = localStorage.getItem(keyFor(personId));
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    return {
      startDateISO: typeof parsed.startDateISO === 'string' ? parsed.startDateISO : null,
      checked: parsed.checked && typeof parsed.checked === 'object' ? parsed.checked : {},
    };
  } catch {
    return defaults();
  }
}

export function saveProgress(personId: string, p: PersonProgress): void {
  localStorage.setItem(keyFor(personId), JSON.stringify(p));
}

export function setStartDate(personId: string, iso: string): PersonProgress {
  const p = loadProgress(personId);
  p.startDateISO = iso;
  saveProgress(personId, p);
  return p;
}

export function toggleTask(personId: string, dayN: number, taskId: string): PersonProgress {
  const p = loadProgress(personId);
  const list = p.checked[dayN] ?? [];
  p.checked[dayN] = list.includes(taskId)
    ? list.filter((id) => id !== taskId)
    : [...list, taskId];
  saveProgress(personId, p);
  return p;
}

export function isTaskChecked(p: PersonProgress, dayN: number, taskId: string): boolean {
  return (p.checked[dayN] ?? []).includes(taskId);
}

export function dayCompletedCount(p: PersonProgress, day: Day): number {
  const list = p.checked[day.n] ?? [];
  return day.tasks.filter((task) => list.includes(task.id)).length;
}

export function isDayDone(p: PersonProgress, day: Day): boolean {
  return day.tasks.length > 0 && dayCompletedCount(p, day) === day.tasks.length;
}

export function getLastPerson(): string | null {
  return localStorage.getItem(LAST_KEY);
}

export function setLastPerson(id: string): void {
  localStorage.setItem(LAST_KEY, id);
}
