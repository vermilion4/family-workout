export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function diffDays(aISO: string, bISO: string): number {
  const MS = 24 * 60 * 60 * 1000;
  return Math.round((parseISO(bISO).getTime() - parseISO(aISO).getTime()) / MS);
}

export function dateForDay(startISO: string, n: number): string {
  return addDays(startISO, n - 1);
}

export function dayForDate(startISO: string, iso: string, totalDays: number): number | null {
  const n = diffDays(startISO, iso) + 1;
  return n >= 1 && n <= totalDays ? n : null;
}

export type DayStatus = 'done' | 'today' | 'missed' | 'upcoming';

export function dayStatus(a: {
  n: number;
  startISO: string;
  todayISO: string;
  totalDays: number;
  isDone: boolean;
}): DayStatus {
  if (a.isDone) return 'done';
  const dayDate = dateForDay(a.startISO, a.n);
  const delta = diffDays(a.todayISO, dayDate); // dayDate - today
  if (delta === 0) return 'today';
  return delta < 0 ? 'missed' : 'upcoming';
}
