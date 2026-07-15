# Family Workout Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, installable (PWA) workout-tracking website where Ady, Mummy, and Grandma each pick who they are, tick off each exercise in their day's workout, and watch a real-date calendar fill in — all saved in the browser, no login, deployable to Netlify.

**Architecture:** Static single-page React app. Two separated data concerns: fixed **plan content** authored in the repo (`src/data/*`) and mutable **per-person progress** persisted to `localStorage` (`src/state/progress.ts`). Pure date/status math lives in `src/state/dates.ts`. UI is prop-driven, reusable components composed by `App.tsx` via a small person/view context.

**Tech Stack:** Vite + React + TypeScript, hand-written CSS (design tokens in `theme.css`), Vitest + React Testing Library + jsdom for tests, `vite-plugin-pwa` for installability, Netlify for hosting.

## Global Constraints

- **Node 18+**, **React 18+**, **TypeScript strict mode** on.
- Everything is client-side — no backend, no network calls, no auth.
- All persistence goes through `src/state/progress.ts`; no other module touches `localStorage`.
- All `localStorage` keys are namespaced `fw:v1:...`.
- Date logic compares **local calendar dates** (no time-of-day); pure functions take `todayISO` as an argument so they are deterministic in tests. Only `todayISO()` (one impure helper) reads the clock.
- Display names are exactly: **Ady**, **Mummy**, **Grandma**. Person ids are `ady`, `mummy`, `grandma`.
- Plan length is **90 days** for every person (3 phases × 30 days). Ady is fully authored; Mummy & Grandma are stubs (`authored: false`).
- Visual direction: **Bold & energetic** — deep charcoal background, one vivid coral/orange accent, success green for done. Big text, ≥44px tap targets, respects `prefers-reduced-motion`.
- **Commits on this device are disabled by a standing rule.** Where a step says "commit", run the `git add` to stage, then continue — the user commits later. A blocked commit is **not** a failure.
- Test commands: `npm test` runs Vitest once (CI mode); `npm run test:watch` for watch. Dev server: `npm run dev`. Build: `npm run build`.

---

## File Structure

```
family-workout/
  index.html
  package.json
  tsconfig.json
  vite.config.ts                 vite + vitest config (jsdom)
  netlify.toml                   build + SPA settings
  public/
    icons/ (pwa icons)
  src/
    main.tsx                     entry
    App.tsx                      shell: person context + view routing
    test/setup.ts                jest-dom + localStorage reset
    data/
      types.ts                   Task/Day/Phase/Plan types + TaskKind
      helpers.ts                 t() and day() content builders
      exercises.ts               "how to do each move" library
      ady/
        phase1.ts                Foundation, days 1-30 (from PDF)
        phase2.ts                Momentum, days 31-60 (authored)
        phase3.ts                Peak, days 61-90 (authored)
        index.ts                 adyPlan
      stubs.ts                   stubPlan() -> Mummy/Grandma placeholder plans
      people.ts                  PEOPLE registry + getPerson()
    state/
      dates.ts                   date<->day mapping + status (pure) + todayISO()
      progress.ts                localStorage-backed per-person progress
      PersonContext.tsx          current person + progress + refresh
    components/
      PersonPicker.tsx           "Who are you?" landing
      Header.tsx                 person switcher + nav
      StartDatePicker.tsx        first-entry start-date gate
      ProgressRing.tsx           animated completion ring (SVG)
      TaskRow.tsx                one tappable task checkbox
      ExerciseInfo.tsx           "how to do this move" sheet
      DayView.tsx                a day's checklist + ring + celebration
      TodayView.tsx              today's workout + empty/rest/finished states
      CalendarView.tsx           90-day month-style calendar
      DayCell.tsx                one calendar date (status-colored)
    styles/
      theme.css                  design tokens (colors, type, spacing)
      *.css                      per-component styles
```

---

### Task 1: Project scaffold + test harness + design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`, `src/styles/theme.css`, `.gitignore`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: a running Vite app rendering `<App />`; `npm test` runs Vitest with jsdom + jest-dom; CSS variables in `theme.css` available app-wide.

- [ ] **Step 1: Scaffold Vite React-TS in the current directory**

Run:
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install vite-plugin-pwa
```
If prompted about the non-empty directory, choose "Ignore files and continue" (the `docs/` folder must be preserved).

- [ ] **Step 2: Configure Vitest in `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
```

- [ ] **Step 3: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  localStorage.clear();
});
```

- [ ] **Step 4: Add scripts to `package.json`**

Ensure the `scripts` block contains:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 5: Create `src/styles/theme.css` (design tokens)**

```css
:root {
  --bg: #14161b;
  --surface: #1c1f27;
  --surface-2: #242833;
  --line: #2e3340;
  --text: #f4f5f7;
  --text-dim: #a3a9b8;
  --accent: #ff5a36;      /* coral */
  --accent-soft: #ff7a5c;
  --success: #34d399;     /* done green */
  --core: #ff5a36;
  --floor: #6ea8fe;
  --cardio: #ffb020;
  --radius: 16px;
  --radius-sm: 10px;
  --tap: 48px;
  --font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
* { box-sizing: border-box; }
html, body, #root { height: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
}
button { font-family: inherit; }
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 6: Replace `src/App.tsx` with a minimal shell and import the theme**

```tsx
import './styles/theme.css';

export default function App() {
  return <h1>Family Workout</h1>;
}
```

Also ensure `src/main.tsx` renders `<App />` into `#root` (Vite default already does; keep it).

- [ ] **Step 7: Write the failing test `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /family workout/i })).toBeInTheDocument();
});
```

- [ ] **Step 8: Run the test and the dev server**

Run: `npm test`
Expected: PASS (1 test).
Run: `npm run dev` and confirm the page loads without console errors, then stop it.

- [ ] **Step 9: Stage/commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React-TS app with Vitest and design tokens"
```

---

### Task 2: Content types + builder helpers

**Files:**
- Create: `src/data/types.ts`, `src/data/helpers.ts`
- Test: `src/data/helpers.test.ts`

**Interfaces:**
- Produces:
  - `type TaskKind = 'core' | 'floor' | 'cardio' | 'rest' | 'other'`
  - `interface Task { id: string; label: string; kind: TaskKind; moveRef?: string }`
  - `interface Day { n: number; title: string; isRest: boolean; tasks: Task[] }`
  - `interface Phase { n: 1 | 2 | 3; name: string; subtitle: string; days: Day[] }`
  - `interface Plan { personId: string; totalDays: number; phases: Phase[]; authored: boolean }`
  - `t(label, kind?, moveRef?): Omit<Task,'id'>`
  - `day(n, title, tasks, isRest?): Day` — assigns ids `d<n>-t<i>` (1-based).

- [ ] **Step 1: Write `src/data/types.ts`**

```ts
export type TaskKind = 'core' | 'floor' | 'cardio' | 'rest' | 'other';

export interface Task {
  id: string;
  label: string;
  kind: TaskKind;
  moveRef?: string;
}

export interface Day {
  n: number;
  title: string;
  isRest: boolean;
  tasks: Task[];
}

export interface Phase {
  n: 1 | 2 | 3;
  name: string;
  subtitle: string;
  days: Day[];
}

export interface Plan {
  personId: string;
  totalDays: number;
  phases: Phase[];
  authored: boolean;
}
```

- [ ] **Step 2: Write the failing test `src/data/helpers.test.ts`**

```ts
import { t, day } from './helpers';

test('t() builds a task without an id and defaults kind to other', () => {
  expect(t('Stretch')).toEqual({ label: 'Stretch', kind: 'other' });
  expect(t('3×20s plank', 'floor', 'plank')).toEqual({
    label: '3×20s plank', kind: 'floor', moveRef: 'plank',
  });
});

test('day() assigns 1-based ids and preserves order', () => {
  const d = day(8, 'Core + Walk', [t('A', 'core'), t('B', 'cardio')]);
  expect(d.n).toBe(8);
  expect(d.title).toBe('Core + Walk');
  expect(d.isRest).toBe(false);
  expect(d.tasks.map((x) => x.id)).toEqual(['d8-t1', 'd8-t2']);
  expect(d.tasks[0].label).toBe('A');
});

test('day() supports rest days', () => {
  const d = day(7, 'Rest', [t('Full rest', 'rest')], true);
  expect(d.isRest).toBe(true);
  expect(d.tasks).toHaveLength(1);
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- helpers`
Expected: FAIL (cannot find module `./helpers`).

- [ ] **Step 4: Write `src/data/helpers.ts`**

```ts
import type { Task, TaskKind, Day } from './types';

export function t(label: string, kind: TaskKind = 'other', moveRef?: string): Omit<Task, 'id'> {
  return moveRef ? { label, kind, moveRef } : { label, kind };
}

export function day(
  n: number,
  title: string,
  tasks: Array<Omit<Task, 'id'>>,
  isRest = false,
): Day {
  return {
    n,
    title,
    isRest,
    tasks: tasks.map((task, i) => ({ ...task, id: `d${n}-t${i + 1}` })),
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- helpers`
Expected: PASS.

- [ ] **Step 6: Stage/commit**

```bash
git add src/data/types.ts src/data/helpers.ts src/data/helpers.test.ts
git commit -m "feat: add content types and day/task builder helpers"
```

---

### Task 3: Exercise "how to" library

**Files:**
- Create: `src/data/exercises.ts`
- Test: `src/data/exercises.test.ts`

**Interfaces:**
- Produces: `interface Move { name: string; how: string }` and `const EXERCISES: Record<string, Move>` keyed by the moveRef slugs used in content: `wonder-core-crunch`, `twist-crunch`, `pushup-handles`, `low-crunch`, `plank`, `side-plank`, `bicycle-crunch`, `leg-raises`, `flutter-kicks`, `russian-twist`, `mountain-climbers`, `power-walk`. Also `getMove(ref?: string): Move | undefined`.

- [ ] **Step 1: Write the failing test `src/data/exercises.test.ts`**

```ts
import { EXERCISES, getMove } from './exercises';

const REQUIRED = [
  'wonder-core-crunch', 'twist-crunch', 'pushup-handles', 'low-crunch',
  'plank', 'side-plank', 'bicycle-crunch', 'leg-raises', 'flutter-kicks',
  'russian-twist', 'mountain-climbers', 'power-walk',
];

test('all required moves exist with name + how text', () => {
  for (const ref of REQUIRED) {
    expect(EXERCISES[ref]).toBeDefined();
    expect(EXERCISES[ref].name.length).toBeGreaterThan(0);
    expect(EXERCISES[ref].how.length).toBeGreaterThan(10);
  }
});

test('getMove returns undefined for unknown ref', () => {
  expect(getMove('nope')).toBeUndefined();
  expect(getMove(undefined)).toBeUndefined();
  expect(getMove('plank')?.name).toBe('Plank');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- exercises`
Expected: FAIL (module not found).

- [ ] **Step 3: Write `src/data/exercises.ts`** (text transcribed from the PDF "How to do each move")

```ts
export interface Move { name: string; how: string }

export const EXERCISES: Record<string, Move> = {
  'wonder-core-crunch': { name: 'Wonder Core Crunch', how: 'Sit, feet flat. Press your lower back into the pad and curl up as you breathe out. Let the springs guide you back — don’t flop.' },
  'twist-crunch': { name: 'Twist Crunch', how: 'Same curl, but drive one shoulder toward the opposite hip. Alternate sides each rep — this hits your obliques (side abs).' },
  'pushup-handles': { name: 'Push-up (handles)', how: 'Grip the handles on the floor, body in a straight line. Lower your chest, push back up. On your knees is perfect to start.' },
  'low-crunch': { name: 'Low Crunch', how: 'Recline a little more and focus on drawing your knees / lower body up. Targets the lower belly. Small, controlled squeezes.' },
  'plank': { name: 'Plank', how: 'Forearms & toes, body one straight line — squeeze belly and glutes. Drop to knees if needed. Even 10 seconds counts.' },
  'side-plank': { name: 'Side Plank', how: 'On one forearm, body stacked and straight, hips lifted. Hold, then switch sides. Bend the bottom knee down to make it easier.' },
  'bicycle-crunch': { name: 'Bicycle Crunch', how: 'On your back, hands by ears. Bring one knee in and the opposite elbow toward it, then switch — like slow pedalling.' },
  'leg-raises': { name: 'Leg Raises', how: 'On your back, hands under your lower back. Lift legs up, lower slowly — stop before your back arches. Bend knees to ease it.' },
  'flutter-kicks': { name: 'Flutter Kicks', how: 'Legs straight and low off the floor, small quick alternating up-down kicks. Keep your lower back pressed down the whole time.' },
  'russian-twist': { name: 'Russian Twist', how: 'Sit, lean back slightly, knees bent. Clasp hands and rotate side to side, tapping near each hip. Keep the movement controlled.' },
  'mountain-climbers': { name: 'Mountain Climbers', how: 'Start in a plank. Drive one knee toward your chest, then switch quickly — like running in place. Go slower to make it gentler.' },
  'power-walk': { name: 'Power Walk', how: 'Walk fast enough that talking gets a little hard. Stand tall, pump your arms. This is your fat-burning zone — and easy on the knees.' },
};

export function getMove(ref?: string): Move | undefined {
  return ref ? EXERCISES[ref] : undefined;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- exercises`
Expected: PASS.

- [ ] **Step 5: Stage/commit**

```bash
git add src/data/exercises.ts src/data/exercises.test.ts
git commit -m "feat: add exercise how-to library from PDF"
```

---

### Task 4: Ady Phase 1 content (Foundation, days 1–30)

**Files:**
- Create: `src/data/ady/phase1.ts`
- Test: `src/data/ady/phase1.test.ts`

**Interfaces:**
- Consumes: `t`, `day` from `../helpers`.
- Produces: `export const phase1: Phase` with `n: 1`, `name: 'Foundation'`, `subtitle: 'habit & form, keep it doable'`, `days`: 30 `Day`s (n 1–30) built from **Appendix A.1**.

**Content conversion rules (apply to Appendix A tables in Tasks 4–6):**
- Split each day's workout on `·` into one task per segment; keep the segment text as the task `label` verbatim (including `×`, `/`, `–`).
- Assign `kind` + `moveRef` by keyword (first match wins):
  - contains "Wonder Core" → `('core', 'wonder-core-crunch')`
  - contains "low crunch" (standalone line) → `('core', 'low-crunch')`
  - "side plank" → `('floor', 'side-plank')`; else "plank" → `('floor', 'plank')`
  - "bicycle" → `('floor', 'bicycle-crunch')`
  - "leg raise" → `('floor', 'leg-raises')`
  - "flutter" → `('floor', 'flutter-kicks')`
  - "Russian twist" → `('floor', 'russian-twist')`
  - "mountain climber" → `('floor', 'mountain-climbers')`
  - contains "walk" or "jog" or starts with a duration + "min" cardio → `('cardio', 'power-walk')`
  - "warm-up", "stretch", "massager" → `('other')` (no moveRef)
  - "Full core circuit" rounds line → `('core')` (no moveRef; mixed)
  - Rest-day single segment → `('rest')`, and pass `isRest = true` to `day()`.
- Rest days call `day(n, title, [t('<segment>', 'rest')], true)`.

- [ ] **Step 1: Write the failing validation test `src/data/ady/phase1.test.ts`**

```ts
import { phase1 } from './phase1';
import { EXERCISES } from '../exercises';

test('phase1 has 30 days numbered 1..30', () => {
  expect(phase1.days).toHaveLength(30);
  expect(phase1.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 1),
  );
});

test('phase1 metadata', () => {
  expect(phase1.n).toBe(1);
  expect(phase1.name).toBe('Foundation');
});

test('every day has tasks; rest days have exactly one rest task', () => {
  for (const d of phase1.days) {
    expect(d.tasks.length).toBeGreaterThan(0);
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length); // unique ids
    if (d.isRest) {
      expect(d.tasks).toHaveLength(1);
      expect(d.tasks[0].kind).toBe('rest');
    } else {
      expect(d.tasks.length).toBeGreaterThanOrEqual(2);
    }
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});

test('specific transcription: day 1', () => {
  const d1 = phase1.days[0];
  expect(d1.title).toBe('Core + Walk');
  expect(d1.tasks[0].label).toMatch(/warm-up 5 min/i);
  expect(d1.tasks.some((x) => x.kind === 'cardio')).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- phase1`
Expected: FAIL (module not found).

- [ ] **Step 3: Write `src/data/ady/phase1.ts`**

Header + first three days shown as the exact pattern; author days 4–30 the same way from **Appendix A.1**:

```ts
import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase1: Phase = {
  n: 1,
  name: 'Foundation',
  subtitle: 'habit & form, keep it doable',
  days: [
    day(1, 'Core + Walk', [
      t('Warm-up 5 min', 'other'),
      t('Wonder Core ×2: 12 crunch / 8 twist per side / 8 push-up', 'core', 'wonder-core-crunch'),
      t('3×15s plank', 'floor', 'plank'),
      t('15 min brisk walk', 'cardio', 'power-walk'),
      t('Stretch + massager', 'other'),
    ]),
    day(2, 'Walk + light core', [
      t('20 min brisk walk', 'cardio', 'power-walk'),
      t('3×12 bicycle crunch per side', 'floor', 'bicycle-crunch'),
      t('3×15s side plank per side', 'floor', 'side-plank'),
      t('Massager', 'other'),
    ]),
    day(3, 'Core focus', [
      t('5 min warm-up', 'other'),
      t('Wonder Core ×2: 12 crunch / 10 twist per side / 8 low crunch', 'core', 'wonder-core-crunch'),
      t('3×10 leg raise', 'floor', 'leg-raises'),
      t('3×20s plank', 'floor', 'plank'),
    ]),
    // ... days 4–30 from Appendix A.1, same pattern.
    // Rest days (7, 14, 21, 28) use: day(n, 'Rest', [t('<text>', 'rest')], true)
  ],
};
```

- [ ] **Step 4: Complete days 4–30 from Appendix A.1, then run the test**

Run: `npm test -- phase1`
Expected: PASS (all 4 tests).

- [ ] **Step 5: Stage/commit**

```bash
git add src/data/ady/phase1.ts src/data/ady/phase1.test.ts
git commit -m "feat: add Ady Phase 1 (Foundation) content from PDF"
```

---

### Task 5: Ady Phase 2 content (Momentum, days 31–60)

**Files:**
- Create: `src/data/ady/phase2.ts`
- Test: `src/data/ady/phase2.test.ts`

**Interfaces:**
- Produces: `export const phase2: Phase` with `n: 2`, `name: 'Momentum'`, `subtitle: 'more volume, longer walks, optional light jog'`, `days`: 30 `Day`s (n 31–60) from **Appendix A.2**.

- [ ] **Step 1: Write the failing validation test `src/data/ady/phase2.test.ts`**

```ts
import { phase2 } from './phase2';
import { EXERCISES } from '../exercises';

test('phase2 has 30 days numbered 31..60', () => {
  expect(phase2.days).toHaveLength(30);
  expect(phase2.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 31),
  );
});

test('phase2 metadata + integrity', () => {
  expect(phase2.n).toBe(2);
  expect(phase2.name).toBe('Momentum');
  for (const d of phase2.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(d.tasks.length).toBeGreaterThan(0);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- phase2` → FAIL.

- [ ] **Step 3: Write `src/data/ady/phase2.ts`** using the same pattern as Task 4, authoring all 30 days from **Appendix A.2**. Rest days: 37, 44, 51, 58.

- [ ] **Step 4: Run test to verify it passes** — Run: `npm test -- phase2` → PASS.

- [ ] **Step 5: Stage/commit**

```bash
git add src/data/ady/phase2.ts src/data/ady/phase2.test.ts
git commit -m "feat: add Ady Phase 2 (Momentum) content"
```

---

### Task 6: Ady Phase 3 content (Peak, days 61–90)

**Files:**
- Create: `src/data/ady/phase3.ts`
- Test: `src/data/ady/phase3.test.ts`

**Interfaces:**
- Produces: `export const phase3: Phase` with `n: 3`, `name: 'Peak'`, `subtitle: 'your strongest month — circuits & test days'`, `days`: 30 `Day`s (n 61–90) from **Appendix A.3**.

- [ ] **Step 1: Write the failing validation test `src/data/ady/phase3.test.ts`**

```ts
import { phase3 } from './phase3';
import { EXERCISES } from '../exercises';

test('phase3 has 30 days numbered 61..90', () => {
  expect(phase3.days).toHaveLength(30);
  expect(phase3.days.map((d) => d.n)).toEqual(
    Array.from({ length: 30 }, (_, i) => i + 61),
  );
});

test('phase3 metadata + integrity', () => {
  expect(phase3.n).toBe(3);
  expect(phase3.name).toBe('Peak');
  for (const d of phase3.days) {
    const ids = d.tasks.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    if (d.isRest) expect(d.tasks[0].kind).toBe('rest');
    for (const task of d.tasks) {
      if (task.moveRef) expect(EXERCISES[task.moveRef]).toBeDefined();
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- phase3` → FAIL.

- [ ] **Step 3: Write `src/data/ady/phase3.ts`** using the same pattern, authoring all 30 days from **Appendix A.3**. Rest days: 67, 74, 81, 88.

- [ ] **Step 4: Run test to verify it passes** — Run: `npm test -- phase3` → PASS.

- [ ] **Step 5: Stage/commit**

```bash
git add src/data/ady/phase3.ts src/data/ady/phase3.test.ts
git commit -m "feat: add Ady Phase 3 (Peak) content"
```

---

### Task 7: Assemble plans + people registry

**Files:**
- Create: `src/data/ady/index.ts`, `src/data/stubs.ts`, `src/data/people.ts`
- Test: `src/data/people.test.ts`

**Interfaces:**
- Consumes: `phase1/2/3`, `Plan`, `Phase`.
- Produces:
  - `adyPlan: Plan` (`personId: 'ady'`, `totalDays: 90`, `authored: true`, phases 1–3).
  - `stubPlan(personId: string): Plan` — `authored: false`, `totalDays: 90`, 3 phases × 30 days; each day is `day(n, 'Coming soon', [], false)` (empty tasks; never completable).
  - `interface Person { id: string; displayName: string; plan: Plan }`
  - `PEOPLE: Person[]` in order `[ady, mummy, grandma]`.
  - `getPerson(id: string): Person | undefined`
  - `getDay(plan: Plan, n: number): Day | undefined` (searches phases).

- [ ] **Step 1: Write the failing test `src/data/people.test.ts`**

```ts
import { PEOPLE, getPerson, getDay } from './people';

test('three people in order with correct names/ids', () => {
  expect(PEOPLE.map((p) => p.id)).toEqual(['ady', 'mummy', 'grandma']);
  expect(PEOPLE.map((p) => p.displayName)).toEqual(['Ady', 'Mummy', 'Grandma']);
});

test('Ady plan is authored with 90 days across 3 phases', () => {
  const ady = getPerson('ady')!;
  expect(ady.plan.authored).toBe(true);
  expect(ady.plan.totalDays).toBe(90);
  const totalDays = ady.plan.phases.reduce((s, ph) => s + ph.days.length, 0);
  expect(totalDays).toBe(90);
});

test('stub plans are unauthored but still 90 days for the calendar', () => {
  const mummy = getPerson('mummy')!;
  expect(mummy.plan.authored).toBe(false);
  expect(mummy.plan.phases.reduce((s, ph) => s + ph.days.length, 0)).toBe(90);
});

test('getDay finds a day across phases', () => {
  const ady = getPerson('ady')!;
  expect(getDay(ady.plan, 1)?.n).toBe(1);
  expect(getDay(ady.plan, 45)?.n).toBe(45);
  expect(getDay(ady.plan, 90)?.n).toBe(90);
  expect(getDay(ady.plan, 91)).toBeUndefined();
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- people` → FAIL.

- [ ] **Step 3: Write `src/data/ady/index.ts`**

```ts
import type { Plan } from '../types';
import { phase1 } from './phase1';
import { phase2 } from './phase2';
import { phase3 } from './phase3';

export const adyPlan: Plan = {
  personId: 'ady',
  totalDays: 90,
  authored: true,
  phases: [phase1, phase2, phase3],
};
```

- [ ] **Step 4: Write `src/data/stubs.ts`**

```ts
import type { Plan, Phase } from './types';
import { day } from './helpers';

const NAMES: Record<1 | 2 | 3, string> = { 1: 'Phase 1', 2: 'Phase 2', 3: 'Phase 3' };

function stubPhase(n: 1 | 2 | 3): Phase {
  const start = (n - 1) * 30 + 1;
  return {
    n,
    name: NAMES[n],
    subtitle: 'coming soon',
    days: Array.from({ length: 30 }, (_, i) => day(start + i, 'Coming soon', [], false)),
  };
}

export function stubPlan(personId: string): Plan {
  return {
    personId,
    totalDays: 90,
    authored: false,
    phases: [stubPhase(1), stubPhase(2), stubPhase(3)],
  };
}
```

- [ ] **Step 5: Write `src/data/people.ts`**

```ts
import type { Plan, Day } from './types';
import { adyPlan } from './ady';
import { stubPlan } from './stubs';

export interface Person {
  id: string;
  displayName: string;
  plan: Plan;
}

export const PEOPLE: Person[] = [
  { id: 'ady', displayName: 'Ady', plan: adyPlan },
  { id: 'mummy', displayName: 'Mummy', plan: stubPlan('mummy') },
  { id: 'grandma', displayName: 'Grandma', plan: stubPlan('grandma') },
];

export function getPerson(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getDay(plan: Plan, n: number): Day | undefined {
  for (const phase of plan.phases) {
    const found = phase.days.find((d) => d.n === n);
    if (found) return found;
  }
  return undefined;
}
```

- [ ] **Step 6: Run test to verify it passes** — Run: `npm test -- people` → PASS.

- [ ] **Step 7: Stage/commit**

```bash
git add src/data/ady/index.ts src/data/stubs.ts src/data/people.ts src/data/people.test.ts
git commit -m "feat: assemble Ady plan, stub plans, and people registry"
```

---

### Task 8: Date & status logic

**Files:**
- Create: `src/state/dates.ts`
- Test: `src/state/dates.test.ts`

**Interfaces:**
- Produces:
  - `toISODate(d: Date): string` — local `YYYY-MM-DD`.
  - `parseISO(iso: string): Date` — local midnight.
  - `todayISO(): string` — local today (the only clock-reading function).
  - `addDays(iso: string, n: number): string`
  - `diffDays(aISO: string, bISO: string): number` — `b - a` in whole days.
  - `dateForDay(startISO: string, n: number): string` — n ≥ 1.
  - `dayForDate(startISO: string, iso: string, totalDays: number): number | null`
  - `type DayStatus = 'done' | 'today' | 'missed' | 'upcoming'`
  - `dayStatus(a: { n: number; startISO: string; todayISO: string; totalDays: number; isDone: boolean }): DayStatus`

- [ ] **Step 1: Write the failing test `src/state/dates.test.ts`**

```ts
import { addDays, diffDays, dateForDay, dayForDate, dayStatus } from './dates';

test('addDays and diffDays are inverses across month boundaries', () => {
  expect(addDays('2026-01-30', 3)).toBe('2026-02-02');
  expect(diffDays('2026-01-30', '2026-02-02')).toBe(3);
  expect(diffDays('2026-02-02', '2026-01-30')).toBe(-3);
});

test('dateForDay pins day 1 to start', () => {
  expect(dateForDay('2026-07-14', 1)).toBe('2026-07-14');
  expect(dateForDay('2026-07-14', 8)).toBe('2026-07-21');
});

test('dayForDate is the inverse within range', () => {
  expect(dayForDate('2026-07-14', '2026-07-14', 90)).toBe(1);
  expect(dayForDate('2026-07-14', '2026-07-21', 90)).toBe(8);
  expect(dayForDate('2026-07-14', '2026-07-13', 90)).toBeNull(); // before start
  expect(dayForDate('2026-07-14', '2027-01-01', 90)).toBeNull(); // past day 90
});

test('dayStatus classifies done/today/missed/upcoming', () => {
  const base = { startISO: '2026-07-14', totalDays: 90 };
  expect(dayStatus({ ...base, n: 5, todayISO: '2026-07-20', isDone: true })).toBe('done');
  // day 7 date = 2026-07-20 => today
  expect(dayStatus({ ...base, n: 7, todayISO: '2026-07-20', isDone: false })).toBe('today');
  // day 3 date = 2026-07-16, today later, not done => missed
  expect(dayStatus({ ...base, n: 3, todayISO: '2026-07-20', isDone: false })).toBe('missed');
  // day 10 date = 2026-07-23, today earlier => upcoming
  expect(dayStatus({ ...base, n: 10, todayISO: '2026-07-20', isDone: false })).toBe('upcoming');
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- dates` → FAIL.

- [ ] **Step 3: Write `src/state/dates.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes** — Run: `npm test -- dates` → PASS.

- [ ] **Step 5: Stage/commit**

```bash
git add src/state/dates.ts src/state/dates.test.ts
git commit -m "feat: add pure date mapping and day-status logic"
```

---

### Task 9: Per-person progress persistence

**Files:**
- Create: `src/state/progress.ts`
- Test: `src/state/progress.test.ts`

**Interfaces:**
- Consumes: `Day` from `../data/types`.
- Produces:
  - `interface PersonProgress { startDateISO: string | null; checked: Record<number, string[]> }`
  - `loadProgress(personId: string): PersonProgress` — defaults on missing/corrupt.
  - `saveProgress(personId: string, p: PersonProgress): void`
  - `setStartDate(personId: string, iso: string): PersonProgress`
  - `toggleTask(personId: string, dayN: number, taskId: string): PersonProgress`
  - `isTaskChecked(p: PersonProgress, dayN: number, taskId: string): boolean`
  - `isDayDone(p: PersonProgress, day: Day): boolean`
  - `dayCompletedCount(p: PersonProgress, day: Day): number`
  - `getLastPerson(): string | null` / `setLastPerson(id: string): void`

- [ ] **Step 1: Write the failing test `src/state/progress.test.ts`**

```ts
import {
  loadProgress, saveProgress, setStartDate, toggleTask,
  isTaskChecked, isDayDone, getLastPerson, setLastPerson,
} from './progress';
import { day, t } from '../data/helpers';

test('load defaults when nothing stored', () => {
  const p = loadProgress('ady');
  expect(p.startDateISO).toBeNull();
  expect(p.checked).toEqual({});
});

test('corrupt storage falls back to defaults', () => {
  localStorage.setItem('fw:v1:progress:ady', '{not json');
  expect(loadProgress('ady').startDateISO).toBeNull();
});

test('setStartDate persists and reloads', () => {
  setStartDate('ady', '2026-07-14');
  expect(loadProgress('ady').startDateISO).toBe('2026-07-14');
});

test('toggleTask adds then removes a task id', () => {
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('ady'), 1, 'd1-t1')).toBe(true);
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('ady'), 1, 'd1-t1')).toBe(false);
});

test('isDayDone true only when all tasks checked', () => {
  const d = day(1, 'X', [t('a'), t('b')]);
  toggleTask('ady', 1, 'd1-t1');
  expect(isDayDone(loadProgress('ady'), d)).toBe(false);
  toggleTask('ady', 1, 'd1-t2');
  expect(isDayDone(loadProgress('ady'), d)).toBe(true);
});

test('empty-task day is never done', () => {
  const d = day(1, 'Coming soon', []);
  expect(isDayDone(loadProgress('ady'), d)).toBe(false);
});

test('progress is isolated per person', () => {
  toggleTask('ady', 1, 'd1-t1');
  expect(isTaskChecked(loadProgress('mummy'), 1, 'd1-t1')).toBe(false);
});

test('last person round-trips', () => {
  expect(getLastPerson()).toBeNull();
  setLastPerson('grandma');
  expect(getLastPerson()).toBe('grandma');
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- progress` → FAIL.

- [ ] **Step 3: Write `src/state/progress.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes** — Run: `npm test -- progress` → PASS.

- [ ] **Step 5: Stage/commit**

```bash
git add src/state/progress.ts src/state/progress.test.ts
git commit -m "feat: add per-person progress persistence in localStorage"
```

---

### Task 10: App shell, person context, view routing + PersonPicker

**Files:**
- Create: `src/state/PersonContext.tsx`, `src/components/PersonPicker.tsx`, `src/styles/PersonPicker.css`
- Modify: `src/App.tsx`
- Test: `src/components/PersonPicker.test.tsx`, `src/App.test.tsx` (update)

**Interfaces:**
- Consumes: `PEOPLE`, `getPerson`, `getLastPerson/setLastPerson`, `loadProgress`.
- Produces:
  - `PersonProvider` + `usePerson(): { person: Person | null; selectPerson(id): void; clearPerson(): void; progressVersion: number; bump(): void }` — `progressVersion` increments via `bump()` after any progress write so views re-read `localStorage`.
  - `App` view machine: `view ∈ { 'pick', 'app' }` at the top level; when no `person`, render `<PersonPicker/>`; else render the in-app shell (Header + current sub-view). Sub-views (`today` | `calendar` | `day`) are added in later tasks; for now render a placeholder `<main>` showing the person's name.
  - `PersonPicker({ people, onPick })` — three big buttons; calls `onPick(id)`.

- [ ] **Step 1: Write the failing test `src/components/PersonPicker.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonPicker } from './PersonPicker';
import { PEOPLE } from '../data/people';

test('shows all three people and fires onPick', async () => {
  const onPick = vi.fn();
  render(<PersonPicker people={PEOPLE} onPick={onPick} />);
  expect(screen.getByRole('button', { name: /ady/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /mummy/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /grandma/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /grandma/i }));
  expect(onPick).toHaveBeenCalledWith('grandma');
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- PersonPicker` → FAIL.

- [ ] **Step 3: Write `src/components/PersonPicker.tsx`**

```tsx
import type { Person } from '../data/people';
import '../styles/PersonPicker.css';

export function PersonPicker({
  people,
  onPick,
}: {
  people: Person[];
  onPick: (id: string) => void;
}) {
  return (
    <div className="picker">
      <header className="picker__head">
        <p className="picker__eyebrow">Family Workout</p>
        <h1 className="picker__title">Who's working out?</h1>
      </header>
      <div className="picker__grid">
        {people.map((p) => (
          <button key={p.id} className="picker__card" onClick={() => onPick(p.id)}>
            <span className="picker__avatar">{p.displayName[0]}</span>
            <span className="picker__name">{p.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/styles/PersonPicker.css`** (bold, big tap targets)

```css
.picker { min-height: 100%; display: flex; flex-direction: column; justify-content: center;
  gap: 40px; padding: 32px 20px; max-width: 720px; margin: 0 auto; }
.picker__eyebrow { color: var(--accent); letter-spacing: .18em; text-transform: uppercase;
  font-weight: 700; font-size: .8rem; margin: 0 0 8px; }
.picker__title { font-size: clamp(1.8rem, 6vw, 2.6rem); margin: 0; }
.picker__grid { display: grid; gap: 16px; }
.picker__card { display: flex; align-items: center; gap: 18px; min-height: 88px;
  padding: 0 22px; background: var(--surface); color: var(--text); border: 1px solid var(--line);
  border-radius: var(--radius); font-size: 1.4rem; font-weight: 600; cursor: pointer;
  transition: transform .12s ease, border-color .12s ease; }
.picker__card:hover { transform: translateY(-2px); border-color: var(--accent); }
.picker__avatar { display: grid; place-items: center; width: 56px; height: 56px;
  border-radius: 50%; background: var(--accent); color: #1a0d08; font-weight: 800; font-size: 1.5rem; }
```

- [ ] **Step 5: Write `src/state/PersonContext.tsx`**

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { PEOPLE, getPerson, type Person } from '../data/people';
import { getLastPerson, setLastPerson } from './progress';

interface Ctx {
  person: Person | null;
  selectPerson: (id: string) => void;
  clearPerson: () => void;
  progressVersion: number;
  bump: () => void;
}

const PersonCtx = createContext<Ctx | null>(null);

export function PersonProvider({ children }: { children: ReactNode }) {
  const [personId, setPersonId] = useState<string | null>(() => getLastPerson());
  const [progressVersion, setVersion] = useState(0);

  const value = useMemo<Ctx>(() => ({
    person: personId ? getPerson(personId) ?? null : null,
    selectPerson: (id: string) => { setLastPerson(id); setPersonId(id); },
    clearPerson: () => setPersonId(null),
    progressVersion,
    bump: () => setVersion((v) => v + 1),
  }), [personId, progressVersion]);

  return <PersonCtx.Provider value={value}>{children}</PersonCtx.Provider>;
}

export function usePerson(): Ctx {
  const ctx = useContext(PersonCtx);
  if (!ctx) throw new Error('usePerson must be used within PersonProvider');
  return ctx;
}

export { PEOPLE };
```

- [ ] **Step 6: Rewrite `src/App.tsx`** (placeholder in-app shell for now)

```tsx
import './styles/theme.css';
import { PersonProvider, usePerson, PEOPLE } from './state/PersonContext';
import { PersonPicker } from './components/PersonPicker';

function Shell() {
  const { person, selectPerson, clearPerson } = usePerson();
  if (!person) return <PersonPicker people={PEOPLE} onPick={selectPerson} />;
  return (
    <main style={{ padding: 24 }}>
      <button onClick={clearPerson}>← Switch person</button>
      <h1>{person.displayName}</h1>
      <p>Workout views coming in the next tasks.</p>
    </main>
  );
}

export default function App() {
  return (
    <PersonProvider>
      <Shell />
    </PersonProvider>
  );
}
```

- [ ] **Step 7: Update `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('starts on the person picker and enters a person', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /who's working out/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /ady/i }));
  expect(screen.getByRole('heading', { name: 'Ady' })).toBeInTheDocument();
  expect(localStorage.getItem('fw:v1:lastPerson')).toBe('ady');
});
```

- [ ] **Step 8: Run tests** — Run: `npm test -- PersonPicker App` → PASS. Run `npm run dev` and click through once.

- [ ] **Step 9: Stage/commit**

```bash
git add src/state/PersonContext.tsx src/components/PersonPicker.tsx src/styles/PersonPicker.css src/App.tsx src/App.test.tsx src/components/PersonPicker.test.tsx
git commit -m "feat: person context, view shell, and Who's-working-out picker"
```

---

### Task 11: Header (person switcher + nav) + Start-date gate

**Files:**
- Create: `src/components/Header.tsx`, `src/components/StartDatePicker.tsx`, `src/styles/Header.css`, `src/styles/StartDatePicker.css`
- Test: `src/components/StartDatePicker.test.tsx`

**Interfaces:**
- Consumes: `usePerson`, `loadProgress`, `setStartDate`, `todayISO`.
- Produces:
  - `Header({ name, view, onNav, onSwitch })` — shows name, two nav buttons (`Today`, `Calendar`) with the active one highlighted, and a "Switch" button calling `onSwitch`. `view: 'today' | 'calendar'`, `onNav(view)`.
  - `StartDatePicker({ defaultISO, onConfirm })` — native `<input type="date">` defaulting to `defaultISO`; confirm button calls `onConfirm(iso)`.

- [ ] **Step 1: Write the failing test `src/components/StartDatePicker.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartDatePicker } from './StartDatePicker';

test('confirms the chosen start date', async () => {
  const onConfirm = vi.fn();
  render(<StartDatePicker defaultISO="2026-07-14" onConfirm={onConfirm} />);
  const input = screen.getByLabelText(/start date/i) as HTMLInputElement;
  expect(input.value).toBe('2026-07-14');
  await userEvent.clear(input);
  await userEvent.type(input, '2026-07-20');
  await userEvent.click(screen.getByRole('button', { name: /start my plan/i }));
  expect(onConfirm).toHaveBeenCalledWith('2026-07-20');
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- StartDatePicker` → FAIL.

- [ ] **Step 3: Write `src/components/StartDatePicker.tsx`**

```tsx
import { useState } from 'react';
import '../styles/StartDatePicker.css';

export function StartDatePicker({
  defaultISO,
  onConfirm,
}: {
  defaultISO: string;
  onConfirm: (iso: string) => void;
}) {
  const [iso, setIso] = useState(defaultISO);
  return (
    <div className="startdate">
      <h2 className="startdate__title">When did you start?</h2>
      <p className="startdate__sub">Day 1 lands on this date. Defaults to today.</p>
      <label className="startdate__label">
        Start date
        <input type="date" value={iso} onChange={(e) => setIso(e.target.value)} />
      </label>
      <button className="startdate__go" onClick={() => onConfirm(iso)}>
        Start my plan
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/Header.tsx`**

```tsx
import '../styles/Header.css';

export function Header({
  name,
  view,
  onNav,
  onSwitch,
}: {
  name: string;
  view: 'today' | 'calendar';
  onNav: (v: 'today' | 'calendar') => void;
  onSwitch: () => void;
}) {
  return (
    <header className="hdr">
      <button className="hdr__switch" onClick={onSwitch} aria-label="Switch person">
        {name} ▾
      </button>
      <nav className="hdr__nav">
        <button className={view === 'today' ? 'is-active' : ''} onClick={() => onNav('today')}>
          Today
        </button>
        <button className={view === 'calendar' ? 'is-active' : ''} onClick={() => onNav('calendar')}>
          Calendar
        </button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 5: Write `src/styles/Header.css` and `src/styles/StartDatePicker.css`**

```css
/* Header.css */
.hdr { position: sticky; top: 0; z-index: 10; display: flex; align-items: center;
  justify-content: space-between; gap: 12px; padding: 12px 16px;
  background: rgba(20,22,27,.85); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.hdr__switch { background: none; border: none; color: var(--text); font-size: 1.15rem; font-weight: 700; cursor: pointer; }
.hdr__nav { display: flex; gap: 6px; }
.hdr__nav button { min-height: 40px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line);
  background: var(--surface); color: var(--text-dim); font-weight: 600; cursor: pointer; }
.hdr__nav button.is-active { background: var(--accent); color: #1a0d08; border-color: var(--accent); }
```

```css
/* StartDatePicker.css */
.startdate { max-width: 420px; margin: 0 auto; padding: 48px 20px; text-align: center; }
.startdate__title { font-size: 1.8rem; margin: 0 0 8px; }
.startdate__sub { color: var(--text-dim); margin: 0 0 28px; }
.startdate__label { display: flex; flex-direction: column; gap: 8px; text-align: left;
  font-weight: 600; color: var(--text-dim); }
.startdate__label input { min-height: var(--tap); font-size: 1.1rem; padding: 0 14px;
  border-radius: var(--radius-sm); border: 1px solid var(--line); background: var(--surface); color: var(--text); }
.startdate__go { margin-top: 24px; width: 100%; min-height: var(--tap); border: none;
  border-radius: var(--radius); background: var(--accent); color: #1a0d08; font-size: 1.15rem; font-weight: 800; cursor: pointer; }
```

- [ ] **Step 6: Run test to verify it passes** — Run: `npm test -- StartDatePicker` → PASS.

- [ ] **Step 7: Stage/commit**

```bash
git add src/components/Header.tsx src/components/StartDatePicker.tsx src/styles/Header.css src/styles/StartDatePicker.css src/components/StartDatePicker.test.tsx
git commit -m "feat: header switcher/nav and start-date gate"
```

---

### Task 12: ProgressRing, TaskRow, ExerciseInfo

**Files:**
- Create: `src/components/ProgressRing.tsx`, `src/components/TaskRow.tsx`, `src/components/ExerciseInfo.tsx`, `src/styles/ProgressRing.css`, `src/styles/TaskRow.css`, `src/styles/ExerciseInfo.css`
- Test: `src/components/ProgressRing.test.tsx`, `src/components/TaskRow.test.tsx`

**Interfaces:**
- Consumes: `getMove` from `../data/exercises`, `Task`, `TaskKind`.
- Produces:
  - `ProgressRing({ done, total, size? })` — SVG ring; `role="img"` with `aria-label` like `"3 of 5 done"`; label text shows `done/total`.
  - `TaskRow({ task, checked, onToggle })` — a `role="checkbox"` `aria-checked` control; a colored kind tag; an info button opening `ExerciseInfo` if `task.moveRef` resolves.
  - `ExerciseInfo({ move, onClose })` — a simple sheet/popover showing `move.name` + `move.how`.
  - `const KIND_LABEL: Record<TaskKind,string>` = core→'Core', floor→'Floor', cardio→'Cardio', rest→'Rest', other→'Prep'.

- [ ] **Step 1: Write the failing tests**

`src/components/ProgressRing.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

test('announces progress accessibly', () => {
  render(<ProgressRing done={3} total={5} />);
  expect(screen.getByRole('img', { name: /3 of 5/i })).toBeInTheDocument();
  expect(screen.getByText('3/5')).toBeInTheDocument();
});
```

`src/components/TaskRow.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskRow } from './TaskRow';

const task = { id: 'd1-t2', label: '3×15s plank', kind: 'floor' as const, moveRef: 'plank' };

test('renders label + kind tag and toggles', async () => {
  const onToggle = vi.fn();
  render(<TaskRow task={task} checked={false} onToggle={onToggle} />);
  const box = screen.getByRole('checkbox', { name: /3×15s plank/i });
  expect(box).toHaveAttribute('aria-checked', 'false');
  await userEvent.click(box);
  expect(onToggle).toHaveBeenCalled();
});

test('opens exercise info when a move exists', async () => {
  render(<TaskRow task={task} checked={false} onToggle={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: /how to do plank/i }));
  expect(screen.getByText(/forearms & toes/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail** — Run: `npm test -- ProgressRing TaskRow` → FAIL.

- [ ] **Step 3: Write `src/components/ProgressRing.tsx`**

```tsx
import '../styles/ProgressRing.css';

export function ProgressRing({ done, total, size = 72 }: { done: number; total: number; size?: number }) {
  const pct = total > 0 ? done / total : 0;
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const complete = total > 0 && done === total;
  return (
    <div className="ring" role="img" aria-label={`${done} of ${total} done`}>
      <svg width={size} height={size}>
        <circle className="ring__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={6} fill="none" />
        <circle
          className={`ring__fill${complete ? ' is-complete' : ''}`}
          cx={size / 2} cy={size / 2} r={r} strokeWidth={6} fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring__label">{done}/{total}</span>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/ExerciseInfo.tsx`**

```tsx
import type { Move } from '../data/exercises';
import '../styles/ExerciseInfo.css';

export function ExerciseInfo({ move, onClose }: { move: Move; onClose: () => void }) {
  return (
    <div className="einfo" role="dialog" aria-label={move.name}>
      <div className="einfo__card">
        <h3>{move.name}</h3>
        <p>{move.how}</p>
        <button onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write `src/components/TaskRow.tsx`**

```tsx
import { useState } from 'react';
import type { Task, TaskKind } from '../data/types';
import { getMove } from '../data/exercises';
import { ExerciseInfo } from './ExerciseInfo';
import '../styles/TaskRow.css';

export const KIND_LABEL: Record<TaskKind, string> = {
  core: 'Core', floor: 'Floor', cardio: 'Cardio', rest: 'Rest', other: 'Prep',
};

export function TaskRow({
  task,
  checked,
  onToggle,
}: {
  task: Task;
  checked: boolean;
  onToggle: () => void;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const move = getMove(task.moveRef);
  return (
    <div className={`task task--${task.kind}${checked ? ' is-done' : ''}`}>
      <button
        className="task__box"
        role="checkbox"
        aria-checked={checked}
        aria-label={task.label}
        onClick={onToggle}
      >
        <span className="task__check" aria-hidden>{checked ? '✓' : ''}</span>
        <span className="task__text">
          <span className={`task__tag task__tag--${task.kind}`}>{KIND_LABEL[task.kind]}</span>
          <span className="task__label">{task.label}</span>
        </span>
      </button>
      {move && (
        <button className="task__info" aria-label={`How to do ${move.name}`} onClick={() => setShowInfo(true)}>
          ?
        </button>
      )}
      {showInfo && move && <ExerciseInfo move={move} onClose={() => setShowInfo(false)} />}
    </div>
  );
}
```

- [ ] **Step 6: Write the three CSS files** (`ProgressRing.css`, `TaskRow.css`, `ExerciseInfo.css`)

```css
/* ProgressRing.css */
.ring { position: relative; display: inline-grid; place-items: center; }
.ring svg { display: block; }
.ring__track { stroke: var(--line); }
.ring__fill { stroke: var(--accent); transition: stroke-dashoffset .5s ease; }
.ring__fill.is-complete { stroke: var(--success); }
.ring__label { position: absolute; font-weight: 800; font-size: .95rem; }
```

```css
/* TaskRow.css */
.task { display: flex; align-items: stretch; gap: 8px; }
.task__box { flex: 1; display: flex; align-items: center; gap: 14px; min-height: var(--tap);
  padding: 12px 14px; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius-sm); color: var(--text); text-align: left; cursor: pointer; }
.task.is-done .task__box { border-color: var(--success); background: color-mix(in srgb, var(--success) 12%, var(--surface)); }
.task__check { display: grid; place-items: center; width: 28px; height: 28px; flex: none;
  border-radius: 8px; border: 2px solid var(--line); color: #082018; font-weight: 900; }
.task.is-done .task__check { background: var(--success); border-color: var(--success); }
.task__text { display: flex; flex-direction: column; gap: 4px; }
.task__tag { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 800; }
.task__tag--core { color: var(--core); } .task__tag--floor { color: var(--floor); }
.task__tag--cardio { color: var(--cardio); } .task__tag--other, .task__tag--rest { color: var(--text-dim); }
.task__label { font-size: 1.02rem; font-weight: 600; }
.task.is-done .task__label { text-decoration: line-through; color: var(--text-dim); }
.task__info { flex: none; width: 44px; border-radius: var(--radius-sm); border: 1px solid var(--line);
  background: var(--surface); color: var(--text-dim); font-weight: 800; cursor: pointer; }
```

```css
/* ExerciseInfo.css */
.einfo { position: fixed; inset: 0; background: rgba(0,0,0,.6); display: grid; place-items: end center; z-index: 50; }
.einfo__card { width: 100%; max-width: 520px; margin: 0 12px 12px; background: var(--surface-2);
  border: 1px solid var(--line); border-radius: var(--radius); padding: 22px; }
.einfo__card h3 { margin: 0 0 8px; color: var(--accent); }
.einfo__card p { margin: 0 0 18px; line-height: 1.5; }
.einfo__card button { width: 100%; min-height: var(--tap); border: none; border-radius: var(--radius);
  background: var(--accent); color: #1a0d08; font-weight: 800; cursor: pointer; }
```

- [ ] **Step 7: Run tests to verify they pass** — Run: `npm test -- ProgressRing TaskRow` → PASS.

- [ ] **Step 8: Stage/commit**

```bash
git add src/components/ProgressRing.tsx src/components/TaskRow.tsx src/components/ExerciseInfo.tsx src/styles/ProgressRing.css src/styles/TaskRow.css src/styles/ExerciseInfo.css src/components/ProgressRing.test.tsx src/components/TaskRow.test.tsx
git commit -m "feat: progress ring, task row, and exercise info sheet"
```

---

### Task 13: DayView (checklist + ring + completion)

**Files:**
- Create: `src/components/DayView.tsx`, `src/styles/DayView.css`
- Test: `src/components/DayView.test.tsx`

**Interfaces:**
- Consumes: `Day`, `PersonProgress`, `TaskRow`, `ProgressRing`, `isTaskChecked`, `dayCompletedCount`, `isDayDone`.
- Produces:
  - `DayView({ day, progress, onToggleTask, phaseName? })` — renders the day title, phase name, `ProgressRing`, and a `TaskRow` per task. Shows a `"Day complete! 🎉"` banner (`data-testid="day-complete"`) when `isDayDone`. If `day.tasks.length === 0`, render a "Workout not planned yet — coming soon" empty state instead of a checklist. `onToggleTask(taskId: string)`.

- [ ] **Step 1: Write the failing test `src/components/DayView.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DayView } from './DayView';
import { day, t } from '../data/helpers';
import type { PersonProgress } from '../state/progress';

const d = day(1, 'Core + Walk', [t('Warm-up', 'other'), t('15 min walk', 'cardio', 'power-walk')]);

function setup(checkedIds: string[]) {
  const progress: PersonProgress = { startDateISO: '2026-07-14', checked: { 1: checkedIds } };
  const onToggleTask = vi.fn();
  render(<DayView day={d} progress={progress} onToggleTask={onToggleTask} phaseName="Foundation" />);
  return { onToggleTask };
}

test('shows all tasks and the ring count', () => {
  setup([]);
  expect(screen.getByText('Core + Walk')).toBeInTheDocument();
  expect(screen.getByText('0/2')).toBeInTheDocument();
  expect(screen.getAllByRole('checkbox')).toHaveLength(2);
});

test('toggling a task calls back with its id', async () => {
  const { onToggleTask } = setup([]);
  await userEvent.click(screen.getByRole('checkbox', { name: /warm-up/i }));
  expect(onToggleTask).toHaveBeenCalledWith('d1-t1');
});

test('shows completion banner when all done', () => {
  setup(['d1-t1', 'd1-t2']);
  expect(screen.getByTestId('day-complete')).toBeInTheDocument();
  expect(screen.getByText('2/2')).toBeInTheDocument();
});

test('empty (unplanned) day shows coming-soon state', () => {
  const empty = day(31, 'Coming soon', []);
  render(<DayView day={empty} progress={{ startDateISO: null, checked: {} }} onToggleTask={() => {}} />);
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- DayView` → FAIL.

- [ ] **Step 3: Write `src/components/DayView.tsx`**

```tsx
import type { Day } from '../data/types';
import type { PersonProgress } from '../state/progress';
import { isTaskChecked, dayCompletedCount, isDayDone } from '../state/progress';
import { TaskRow } from './TaskRow';
import { ProgressRing } from './ProgressRing';
import '../styles/DayView.css';

export function DayView({
  day,
  progress,
  onToggleTask,
  phaseName,
}: {
  day: Day;
  progress: PersonProgress;
  onToggleTask: (taskId: string) => void;
  phaseName?: string;
}) {
  if (day.tasks.length === 0) {
    return (
      <section className="dayview dayview--empty">
        <p className="dayview__eyebrow">Day {day.n}</p>
        <h2>Coming soon</h2>
        <p className="dayview__soon">This workout isn't planned yet — check back soon.</p>
      </section>
    );
  }

  const done = dayCompletedCount(progress, day);
  const complete = isDayDone(progress, day);

  return (
    <section className="dayview">
      <div className="dayview__head">
        <div>
          {phaseName && <p className="dayview__eyebrow">Day {day.n} · {phaseName}</p>}
          <h2 className="dayview__title">{day.title}</h2>
        </div>
        <ProgressRing done={done} total={day.tasks.length} />
      </div>

      {complete && (
        <div className="dayview__done" data-testid="day-complete">Day complete! 🎉</div>
      )}

      <div className="dayview__tasks">
        {day.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            checked={isTaskChecked(progress, day.n, task.id)}
            onToggle={() => onToggleTask(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/styles/DayView.css`**

```css
.dayview { max-width: 620px; margin: 0 auto; padding: 20px 16px 48px; }
.dayview__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
.dayview__eyebrow { color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: .12em; font-size: .78rem; margin: 0 0 4px; }
.dayview__title { font-size: 1.7rem; margin: 0; }
.dayview__done { margin-bottom: 16px; padding: 14px; border-radius: var(--radius); text-align: center;
  font-weight: 800; color: #082018; background: var(--success); animation: pop .35s ease; }
.dayview__tasks { display: flex; flex-direction: column; gap: 10px; }
.dayview--empty { text-align: center; padding-top: 64px; }
.dayview__soon { color: var(--text-dim); }
@keyframes pop { from { transform: scale(.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
```

- [ ] **Step 5: Run test to verify it passes** — Run: `npm test -- DayView` → PASS.

- [ ] **Step 6: Stage/commit**

```bash
git add src/components/DayView.tsx src/styles/DayView.css src/components/DayView.test.tsx
git commit -m "feat: day view with checklist, progress ring, and completion banner"
```

---

### Task 14: TodayView (select today + empty states)

**Files:**
- Create: `src/components/TodayView.tsx`, `src/styles/TodayView.css`
- Test: `src/components/TodayView.test.tsx`

**Interfaces:**
- Consumes: `Plan`, `getDay`, `dayForDate`, `DayView`, `PersonProgress`.
- Produces:
  - `TodayView({ plan, progress, todayISO, onToggleTask, onOpenCalendar })`:
    - Compute `n = dayForDate(progress.startDateISO, todayISO, plan.totalDays)`.
    - If `progress.startDateISO` is null → nothing (parent shows StartDatePicker; guard anyway).
    - If `n` is null and today is before start → "Your plan starts on <date>" message.
    - If `n` is null and today is after day 90 → "Plan complete! 🎉 90 days done" + button to open calendar.
    - Else render `<DayView day={getDay(plan,n)} .../>` with the phase name for `n`.
  - Helper `phaseNameForDay(plan, n): string | undefined`.

- [ ] **Step 1: Write the failing test `src/components/TodayView.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { TodayView } from './TodayView';
import { getPerson } from '../data/people';

const plan = getPerson('ady')!.plan;

test('shows today\'s workout when within range', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: {} }}
      todayISO="2026-07-14"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText('Core + Walk')).toBeInTheDocument(); // day 1 title
  expect(screen.getByText(/day 1 · foundation/i)).toBeInTheDocument();
});

test('before start shows upcoming message', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-07-20', checked: {} }}
      todayISO="2026-07-14"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText(/plan starts/i)).toBeInTheDocument();
});

test('after day 90 shows finished message', () => {
  render(
    <TodayView
      plan={plan}
      progress={{ startDateISO: '2026-01-01', checked: {} }}
      todayISO="2026-12-31"
      onToggleTask={() => {}}
      onOpenCalendar={() => {}}
    />,
  );
  expect(screen.getByText(/plan complete/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- TodayView` → FAIL.

- [ ] **Step 3: Write `src/components/TodayView.tsx`**

```tsx
import type { Plan } from '../data/types';
import type { PersonProgress } from '../state/progress';
import { getDay } from '../data/people';
import { dayForDate, dateForDay, parseISO } from '../state/dates';
import { DayView } from './DayView';
import '../styles/TodayView.css';

export function phaseNameForDay(plan: Plan, n: number): string | undefined {
  return plan.phases.find((ph) => ph.days.some((d) => d.n === n))?.name;
}

function pretty(iso: string): string {
  return parseISO(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

export function TodayView({
  plan,
  progress,
  todayISO,
  onToggleTask,
  onOpenCalendar,
}: {
  plan: Plan;
  progress: PersonProgress;
  todayISO: string;
  onToggleTask: (taskId: string) => void;
  onOpenCalendar: () => void;
}) {
  const start = progress.startDateISO;
  if (!start) return null;

  const n = dayForDate(start, todayISO, plan.totalDays);

  if (n === null) {
    const beforeStart = todayISO < start;
    if (beforeStart) {
      return (
        <div className="today today--msg">
          <h2>Get ready 💪</h2>
          <p>Your plan starts on {pretty(start)}.</p>
        </div>
      );
    }
    return (
      <div className="today today--msg">
        <h2>Plan complete! 🎉</h2>
        <p>You finished all 90 days. Amazing.</p>
        <button className="today__btn" onClick={onOpenCalendar}>See your calendar</button>
      </div>
    );
  }

  const day = getDay(plan, n)!;
  return (
    <div className="today">
      <p className="today__date">{pretty(dateForDay(start, n))}</p>
      <DayView day={day} progress={progress} onToggleTask={onToggleTask} phaseName={phaseNameForDay(plan, n)} />
    </div>
  );
}
```

- [ ] **Step 4: Write `src/styles/TodayView.css`**

```css
.today__date { text-align: center; color: var(--text-dim); font-weight: 600; margin: 16px 0 -4px; }
.today--msg { max-width: 520px; margin: 0 auto; padding: 64px 20px; text-align: center; }
.today--msg h2 { font-size: 2rem; margin: 0 0 10px; }
.today--msg p { color: var(--text-dim); font-size: 1.1rem; }
.today__btn { margin-top: 22px; min-height: var(--tap); padding: 0 22px; border: none;
  border-radius: var(--radius); background: var(--accent); color: #1a0d08; font-weight: 800; cursor: pointer; }
```

- [ ] **Step 5: Run test to verify it passes** — Run: `npm test -- TodayView` → PASS.

- [ ] **Step 6: Stage/commit**

```bash
git add src/components/TodayView.tsx src/styles/TodayView.css src/components/TodayView.test.tsx
git commit -m "feat: today view with date-aware workout selection and empty states"
```

---

### Task 15: CalendarView + DayCell

**Files:**
- Create: `src/components/CalendarView.tsx`, `src/components/DayCell.tsx`, `src/styles/Calendar.css`
- Test: `src/components/CalendarView.test.tsx`

**Interfaces:**
- Consumes: `Plan`, `PersonProgress`, `getDay`, `dayStatus`, `isDayDone`, `dateForDay`, `parseISO`.
- Produces:
  - `DayCell({ n, dateISO, status, isRest, onPick })` — a button labeled with the day number; `data-status` = status; `aria-label` includes day number + status; calls `onPick(n)`.
  - `CalendarView({ plan, progress, todayISO, onPickDay })`:
    - A summary strip: `"Day X of 90 · Y% · Z days done"` where X = current day number (or clamped), Z = count of done days, Y = round(Z/90*100).
    - The plan grouped by **phase**, each phase a labeled block; within it, days rendered as a grid of `DayCell`s (7 per row to read like weeks). Each cell gets `dayStatus(...)` and its real date.
    - If `progress.startDateISO` is null, show a note "Pick a start date to see your calendar" (guard; parent gates this).

- [ ] **Step 1: Write the failing test `src/components/CalendarView.test.tsx`**

```tsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarView } from './CalendarView';
import { getPerson } from '../data/people';

const plan = getPerson('ady')!.plan;

test('renders 90 day cells grouped by phase and reports summary', () => {
  render(
    <CalendarView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: { 1: ['d1-t1','d1-t2','d1-t3','d1-t4','d1-t5'] } }}
      todayISO="2026-07-15"
      onPickDay={() => {}}
    />,
  );
  // Phase headings
  expect(screen.getByText('Foundation')).toBeInTheDocument();
  expect(screen.getByText('Momentum')).toBeInTheDocument();
  expect(screen.getByText('Peak')).toBeInTheDocument();
  // Day 1 fully checked => a done cell exists
  expect(screen.getByRole('button', { name: /day 1,.*done/i })).toBeInTheDocument();
  // Summary shows 1 day done
  expect(screen.getByText(/1 day.* done/i)).toBeInTheDocument();
});

test('picking a day fires onPickDay', async () => {
  const onPickDay = vi.fn();
  render(
    <CalendarView
      plan={plan}
      progress={{ startDateISO: '2026-07-14', checked: {} }}
      todayISO="2026-07-14"
      onPickDay={onPickDay}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: /day 5,/i }));
  expect(onPickDay).toHaveBeenCalledWith(5);
});
```

- [ ] **Step 2: Run test to verify it fails** — Run: `npm test -- CalendarView` → FAIL.

- [ ] **Step 3: Write `src/components/DayCell.tsx`**

```tsx
import type { DayStatus } from '../state/dates';

export function DayCell({
  n,
  status,
  isRest,
  onPick,
}: {
  n: number;
  dateISO: string;
  status: DayStatus;
  isRest: boolean;
  onPick: (n: number) => void;
}) {
  return (
    <button
      className="cal__cell"
      data-status={status}
      data-rest={isRest || undefined}
      aria-label={`Day ${n}, ${status}`}
      onClick={() => onPick(n)}
    >
      <span className="cal__n">{n}</span>
    </button>
  );
}
```

- [ ] **Step 4: Write `src/components/CalendarView.tsx`**

```tsx
import type { Plan } from '../data/types';
import type { PersonProgress } from '../state/progress';
import { isDayDone } from '../state/progress';
import { dayStatus, dateForDay, dayForDate } from '../state/dates';
import { DayCell } from './DayCell';
import '../styles/Calendar.css';

export function CalendarView({
  plan,
  progress,
  todayISO,
  onPickDay,
}: {
  plan: Plan;
  progress: PersonProgress;
  todayISO: string;
  onPickDay: (n: number) => void;
}) {
  const start = progress.startDateISO;
  if (!start) return <p className="cal__note">Pick a start date to see your calendar.</p>;

  const allDays = plan.phases.flatMap((ph) => ph.days);
  const doneCount = allDays.filter((d) => isDayDone(progress, d)).length;
  const pct = Math.round((doneCount / plan.totalDays) * 100);
  const currentN = dayForDate(start, todayISO, plan.totalDays);

  return (
    <div className="cal">
      <div className="cal__summary">
        <strong>{currentN ? `Day ${currentN} of ${plan.totalDays}` : `${plan.totalDays}-day plan`}</strong>
        <span>{pct}% · {doneCount} day{doneCount === 1 ? '' : 's'} done</span>
      </div>

      {plan.phases.map((ph) => (
        <section key={ph.n} className="cal__phase">
          <header className="cal__phasehead">
            <h3>{ph.name}</h3>
            <span>{ph.subtitle}</span>
          </header>
          <div className="cal__grid">
            {ph.days.map((d) => (
              <DayCell
                key={d.n}
                n={d.n}
                dateISO={dateForDay(start, d.n)}
                isRest={d.isRest}
                status={dayStatus({
                  n: d.n, startISO: start, todayISO,
                  totalDays: plan.totalDays, isDone: isDayDone(progress, d),
                })}
                onPick={onPickDay}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Write `src/styles/Calendar.css`**

```css
.cal { max-width: 640px; margin: 0 auto; padding: 16px; }
.cal__summary { display: flex; align-items: baseline; justify-content: space-between;
  padding: 14px 16px; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); margin-bottom: 20px; }
.cal__summary strong { font-size: 1.2rem; }
.cal__summary span { color: var(--text-dim); }
.cal__phase { margin-bottom: 24px; }
.cal__phasehead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px; }
.cal__phasehead h3 { margin: 0; color: var(--accent); }
.cal__phasehead span { color: var(--text-dim); font-size: .85rem; }
.cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
.cal__cell { aspect-ratio: 1; display: grid; place-items: center; border-radius: var(--radius-sm);
  border: 1px solid var(--line); background: var(--surface); color: var(--text-dim);
  font-weight: 700; cursor: pointer; }
.cal__cell[data-status="done"] { background: var(--success); color: #082018; border-color: var(--success); }
.cal__cell[data-status="today"] { border-color: var(--accent); color: var(--text); box-shadow: 0 0 0 2px var(--accent) inset; }
.cal__cell[data-status="missed"] { opacity: .55; }
.cal__cell[data-rest] .cal__n::after { content: '·'; }
```

- [ ] **Step 6: Run test to verify it passes** — Run: `npm test -- CalendarView` → PASS.

- [ ] **Step 7: Stage/commit**

```bash
git add src/components/CalendarView.tsx src/components/DayCell.tsx src/styles/Calendar.css src/components/CalendarView.test.tsx
git commit -m "feat: 90-day calendar grouped by phase with status colors"
```

---

### Task 16: Full app wiring + integration test

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.integration.test.tsx`

**Interfaces:**
- Consumes: everything above.
- Produces: the complete flow. `App`'s in-app shell manages `view: 'today' | 'calendar' | 'day'`, plus `selectedDay: number | null` for calendar-opened days. It reads `loadProgress(person.id)` (re-read whenever `progressVersion` changes), gates on `startDateISO` (renders `StartDatePicker`), and wires `onToggleTask` → `toggleTask(...)` + `bump()`.

- [ ] **Step 1: Rewrite `src/App.tsx` to wire the full flow**

```tsx
import { useState } from 'react';
import './styles/theme.css';
import { PersonProvider, usePerson, PEOPLE } from './state/PersonContext';
import { PersonPicker } from './components/PersonPicker';
import { Header } from './components/Header';
import { StartDatePicker } from './components/StartDatePicker';
import { TodayView } from './components/TodayView';
import { CalendarView } from './components/CalendarView';
import { DayView } from './components/DayView';
import { phaseNameForDay } from './components/TodayView';
import { getDay } from './data/people';
import { loadProgress, setStartDate, toggleTask } from './state/progress';
import { todayISO } from './state/dates';

type View = 'today' | 'calendar' | 'day';

function Shell() {
  const { person, selectPerson, clearPerson, progressVersion, bump } = usePerson();
  const [view, setView] = useState<View>('today');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!person) return <PersonPicker people={PEOPLE} onPick={(id) => { setView('today'); selectPerson(id); }} />;

  // Re-read on every progress change (progressVersion referenced to force recompute).
  void progressVersion;
  const progress = loadProgress(person.id);
  const today = todayISO();

  if (!progress.startDateISO) {
    return (
      <StartDatePicker
        defaultISO={today}
        onConfirm={(iso) => { setStartDate(person.id, iso); bump(); }}
      />
    );
  }

  const onToggleTask = (dayN: number) => (taskId: string) => {
    toggleTask(person.id, dayN, taskId);
    bump();
  };

  const navView: 'today' | 'calendar' = view === 'calendar' ? 'calendar' : 'today';

  return (
    <div>
      <Header
        name={person.displayName}
        view={navView}
        onNav={(v) => { setSelectedDay(null); setView(v); }}
        onSwitch={clearPerson}
      />
      {view === 'today' && (
        <TodayView
          plan={person.plan}
          progress={progress}
          todayISO={today}
          onToggleTask={(taskId) => {
            const n = require('./state/dates').dayForDate(progress.startDateISO!, today, person.plan.totalDays);
            if (n) onToggleTask(n)(taskId);
          }}
          onOpenCalendar={() => setView('calendar')}
        />
      )}
      {view === 'calendar' && (
        <CalendarView
          plan={person.plan}
          progress={progress}
          todayISO={today}
          onPickDay={(n) => { setSelectedDay(n); setView('day'); }}
        />
      )}
      {view === 'day' && selectedDay !== null && (
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '8px 16px' }}>
          <button className="today__btn" onClick={() => setView('calendar')}>← Back to calendar</button>
          <DayView
            day={getDay(person.plan, selectedDay)!}
            progress={progress}
            onToggleTask={onToggleTask(selectedDay)}
            phaseName={phaseNameForDay(person.plan, selectedDay)}
          />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PersonProvider>
      <Shell />
    </PersonProvider>
  );
}
```

> Note: replace the `require(...)` call with a top-of-file `import { dayForDate } from './state/dates';` and use `dayForDate(...)` directly — shown inline here only to flag the dependency. Do not ship `require` in an ESM/Vite file.

- [ ] **Step 2: Fix the import** — add `dayForDate` to the `./state/dates` import and use it directly in the `TodayView` `onToggleTask` handler:

```tsx
import { todayISO, dayForDate } from './state/dates';
// ...
onToggleTask={(taskId) => {
  const n = dayForDate(progress.startDateISO!, today, person.plan.totalDays);
  if (n) onToggleTask(n)(taskId);
}}
```

- [ ] **Step 3: Write the integration test `src/App.integration.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { todayISO } from './state/dates';

test('pick Ady, start today, complete day 1, see it done on the calendar', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Pick Ady
  await user.click(screen.getByRole('button', { name: /ady/i }));

  // Start date defaults to today -> confirm
  await user.click(screen.getByRole('button', { name: /start my plan/i }));

  // Today = Day 1 "Core + Walk"; tick every task
  expect(screen.getByText('Core + Walk')).toBeInTheDocument();
  const boxes = screen.getAllByRole('checkbox');
  for (const box of boxes) await user.click(box);
  expect(screen.getByTestId('day-complete')).toBeInTheDocument();

  // Calendar shows day 1 done
  await user.click(screen.getByRole('button', { name: /calendar/i }));
  expect(screen.getByRole('button', { name: /day 1,.*done/i })).toBeInTheDocument();

  // Persistence: same person id keyed data present
  expect(localStorage.getItem('fw:v1:lastPerson')).toBe('ady');
  // touch todayISO to keep import used
  expect(typeof todayISO()).toBe('string');
});

test('switching people keeps progress separate', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /mummy/i }));
  await user.click(screen.getByRole('button', { name: /start my plan/i }));
  // Mummy is a stub -> coming soon state, no checkboxes
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
});
```

- [ ] **Step 4: Run the full test suite** — Run: `npm test` → all PASS. Then `npm run dev` and click through the whole flow manually once.

- [ ] **Step 5: Stage/commit**

```bash
git add src/App.tsx src/App.integration.test.tsx
git commit -m "feat: wire full app flow (today/calendar/day) with integration tests"
```

---

### Task 17: PWA (installable) + Netlify config + production build

**Files:**
- Modify: `vite.config.ts`, `index.html`
- Create: `netlify.toml`, `public/icons/icon-192.png`, `public/icons/icon-512.png`, `public/icons/maskable-512.png`
- Test: manual build verification (no unit test).

**Interfaces:**
- Produces: an installable PWA (manifest + service worker) and a Netlify deploy config.

- [ ] **Step 1: Add icons** — Create three PNGs in `public/icons/` on the charcoal/coral theme: `icon-192.png` (192×192), `icon-512.png` (512×512), `maskable-512.png` (512×512, safe-zone padded). A simple coral dumbbell/monogram on `#14161b` is fine. (Generate with any tool; commit the files.)

- [ ] **Step 2: Configure `vite-plugin-pwa` in `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Family Workout',
        short_name: 'Workout',
        description: 'Track your daily workout plan',
        theme_color: '#14161b',
        background_color: '#14161b',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
```

- [ ] **Step 3: Set theme color + title in `index.html`**

Inside `<head>`: set `<title>Family Workout</title>` and add `<meta name="theme-color" content="#14161b" />` and `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`.

- [ ] **Step 4: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 5: Build and preview**

Run: `npm run build`
Expected: type-checks and builds to `dist/` with a generated service worker + manifest, no errors.
Run: `npm run preview` and confirm the app loads and the browser offers "Install".

- [ ] **Step 6: Stage/commit**

```bash
git add vite.config.ts index.html netlify.toml public/icons
git commit -m "feat: make app an installable PWA and add Netlify config"
```

---

### Task 18: Visual polish, accessibility & responsive pass

**Files:**
- Modify: `src/styles/*.css`, component files as needed
- Test: `npm test` (regression) + manual

**Interfaces:** No new interfaces — refinement only.

> Use the **frontend-design** skill for this task to push the "bold & energetic" look further while keeping it legible for all three generations.

- [ ] **Step 1: Add a subtle app-wide background treatment** — In `theme.css`, add a faint coral radial glow behind the app (e.g. `body::before` fixed gradient at low opacity) so the dark UI isn't flat. Keep contrast intact.

- [ ] **Step 2: Polish the TodayView hero** — Make the day title large and confident; show the phase as a colored pill; ensure the progress ring reads at a glance. Add a gentle check "pop" animation on `.task.is-done .task__check` (respecting `prefers-reduced-motion`, already globally disabled).

- [ ] **Step 3: Responsive checks** — Verify at 320px, 390px, and desktop widths: no horizontal scroll; calendar grid stays 7-wide and tappable; header nav wraps gracefully. Confirm all interactive controls are ≥44px.

- [ ] **Step 4: Accessibility sweep** — Confirm: person cards, task checkboxes, calendar cells all have discernible names (run the existing tests, which assert roles/labels); focus outlines are visible on dark bg (add `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`); color is never the only signal (done cells also show ✓ via the task check and the ring turns green).

- [ ] **Step 5: Run the full suite and build** — Run: `npm test` → all PASS. Run: `npm run build` → success.

- [ ] **Step 6: Stage/commit**

```bash
git add -A
git commit -m "polish: bold visual pass, focus states, and responsive/a11y fixes"
```

---

## Self-Review (completed against the spec)

- **Spec coverage:** Platform PWA → Task 17. Netlify → Task 17. Per-person separate storage (req. B) → Task 9 + Task 10 (keyed by id) + integration test Task 16. Real-date calendar → Tasks 8 + 15. Start-date pick → Task 11 + gate in Task 16. 90-day / 3-phase, Ady authored → Tasks 4–7 + Appendix A; stubs → Task 7. Per-exercise checkboxes + auto-complete + celebration → Tasks 12–13. Calendar statuses done/today/missed/upcoming + back-fill → Tasks 8, 15, 16. "How to do each move" → Tasks 3, 12. Bold visual direction + a11y → Task 1 tokens + Task 18. Persistence across reload → Task 9 (localStorage). All covered.
- **Placeholder scan:** The only "…" is in Tasks 4–6 where the full content lives in **Appendix A** (actual data, not a placeholder) with explicit conversion rules and two–three fully-worked example days. No "TBD/handle edge cases/write tests for the above" left.
- **Type consistency:** `Task/Day/Phase/Plan` (Task 2) used unchanged throughout. `PersonProgress`, `isDayDone`, `toggleTask`, `dayCompletedCount` (Task 9) match their uses in Tasks 13–16. `dayStatus`, `dayForDate`, `dateForDay` (Task 8) match Tasks 14–16. `usePerson`/`bump`/`progressVersion` (Task 10) match Task 16. `phaseNameForDay` exported from TodayView (Task 14) and imported in Task 16.

---

## Appendix A — Ady's 90-day content (authoritative)

Convert each row to a `day(n, title, [tasks...], isRest?)` call using the **conversion rules** in Task 4. Segments are separated by `·`; author each as one task with the mapped `kind`/`moveRef`. Rest rows set `isRest = true` and a single `('...', 'rest')` task.

### A.1 — Phase 1 · Foundation (Days 1–30) — verbatim from the PDF

| Day | Title | Workout (segments split by ·) |
|----|----|----|
| 1 | Core + Walk | Warm-up 5 min · Wonder Core ×2: 12 crunch / 8 twist per side / 8 push-up · 3×15s plank · 15 min brisk walk · Stretch + massager |
| 2 | Walk + light core | 20 min brisk walk · 3×12 bicycle crunch per side · 3×15s side plank per side · Massager |
| 3 | Core focus | 5 min warm-up · Wonder Core ×2: 12 crunch / 10 twist per side / 8 low crunch · 3×10 leg raise · 3×20s plank |
| 4 | Recovery walk | 20 min easy walk · Full stretch · 10 min massager |
| 5 | Core + Walk | Wonder Core ×2: 15 crunch / 10 twist per side / 10 push-up · 20 min brisk walk · 2×20s plank |
| 6 | Longer walk | 25 min brisk walk (steady comfortable-hard) · 3×20s plank · Massager |
| 7 | Rest | Full rest, or a gentle 15 min stroll + stretch |
| 8 | Core + Walk | Wonder Core ×2–3: 15 crunch / 12 twist per side / 10 push-up · 3×25s plank · 22 min brisk walk |
| 9 | Walk intervals | 25 min: alternate 3 min brisk / 2 min faster power walk · 3×15 bicycle crunch per side · 3×20s side plank per side |
| 10 | Core focus | Wonder Core ×3: 15 crunch / 12 twist per side / 10 low crunch · 3×12 leg raise · 3×30s plank · 3×15 flutter kicks |
| 11 | Recovery walk | 25 min easy walk · Stretch · Massager |
| 12 | Core + Walk | Wonder Core ×3: 18 crunch / 12 twist per side / 12 push-up · 25 min brisk walk · 3×25s plank |
| 13 | Longer walk | 30 min brisk walk · 3×30s plank |
| 14 | Rest | Full rest or gentle walk + stretch |
| 15 | Core + Walk | Wonder Core ×3: 18 crunch / 15 twist per side / 12 push-up (short rests) · 3×35s plank · 28 min brisk walk |
| 16 | Intervals | 28 min: 3 min power walk / 1 min light jog (or all walk — fine!) · 3×18 bicycle per side · 3×25s side plank per side · 3×12 Russian twist per side |
| 17 | Core focus | Wonder Core ×3–4: 18 crunch / 15 twist per side / 12 low crunch · 3×15 leg raise · 3×35s plank · 3×20 flutter kicks |
| 18 | Recovery walk | 30 min easy walk · Full stretch · Massager |
| 19 | Core + Walk | Wonder Core ×4: 20 crunch / 15 twist per side / 12 push-up · 28 min brisk walk · 3×35s plank |
| 20 | Longer walk / intervals | 32 min brisk walk with 4×1 min faster pushes · 3×40s plank · 3×15 Russian twist per side |
| 21 | Rest | Full rest or gentle walk |
| 22 | Core + Walk | Wonder Core ×4: 20 crunch / 18 twist per side / 15 push-up · 3×45s plank · 30 min brisk walk |
| 23 | Intervals | 30 min: 3 min power walk / 1–2 min light jog (or all walk) · 3×20 bicycle per side · 3×30s side plank per side · 3×18 Russian twist per side |
| 24 | Core focus | Wonder Core ×4: 22 crunch / 18 twist per side / 15 low crunch · 3×18 leg raise · 3×45s plank · 3×25 flutter kicks |
| 25 | Recovery walk | 30 min easy walk · Stretch · Massager |
| 26 | Core + Walk | Wonder Core ×4: 25 crunch / 20 twist per side / 15 push-up · 30 min brisk walk · 3×45s plank |
| 27 | Long walk | 35 min brisk walk with 5×1 min faster pushes · 3×45s plank |
| 28 | Rest | Full rest |
| 29 | Full core circuit | 5 min walk · 3 rounds: 20 crunch / 15 twist per side / 15 bicycle per side / 30s plank / 12 leg raise / 10 push-up · 20 min brisk walk |
| 30 | Test day + celebrate | Compare to Day 1: longest plank hold & max crunches in 60s (write them down!) · 25 min brisk walk · Stretch + massager · Day-30 progress photo 🎉 |

### A.2 — Phase 2 · Momentum (Days 31–60) — authored continuation

| Day | Title | Workout (segments split by ·) |
|----|----|----|
| 31 | Core + Walk | Wonder Core ×4: 25 crunch / 20 twist per side / 16 push-up · 3×45s plank · 30 min brisk walk |
| 32 | Walk intervals | 30 min: 3 min brisk / 2 min faster power walk · 3×20 bicycle crunch per side · 3×30s side plank per side |
| 33 | Core focus | Wonder Core ×4: 25 crunch / 20 twist per side / 16 low crunch · 3×18 leg raise · 3×50s plank · 3×25 flutter kicks |
| 34 | Recovery walk | 30 min easy walk · Full stretch · Massager |
| 35 | Core + Walk | Wonder Core ×4: 28 crunch / 22 twist per side / 16 push-up · 30 min brisk walk · 3×50s plank |
| 36 | Longer walk | 35 min brisk walk with 5×1 min faster pushes · 3×45s plank |
| 37 | Rest | Full rest or gentle walk + stretch |
| 38 | Core + Walk | Wonder Core ×4: 28 crunch / 22 twist per side / 18 push-up · 3×50s plank · 32 min brisk walk |
| 39 | Intervals | 32 min: 3 min power walk / 1 min light jog (or all walk) · 3×22 bicycle per side · 3×35s side plank per side · 3×18 Russian twist per side |
| 40 | Core focus | Wonder Core ×4–5: 28 crunch / 22 twist per side / 18 low crunch · 3×20 leg raise · 3×55s plank · 3×28 flutter kicks |
| 41 | Recovery walk | 32 min easy walk · Stretch · Massager |
| 42 | Core + Walk | Wonder Core ×5: 30 crunch / 24 twist per side / 18 push-up · 32 min brisk walk · 3×50s plank |
| 43 | Longer walk / intervals | 36 min brisk walk with 6×1 min faster pushes · 3×50s plank · 3×18 Russian twist per side |
| 44 | Rest | Full rest |
| 45 | Core + Walk | Wonder Core ×5: 30 crunch / 24 twist per side / 20 push-up · 3×55s plank · 34 min brisk walk |
| 46 | Intervals | 34 min: 3 min power walk / 1–2 min light jog · 3×24 bicycle per side · 3×40s side plank per side · 3×20 Russian twist per side |
| 47 | Core focus | Wonder Core ×5: 30 crunch / 24 twist per side / 20 low crunch · 3×22 leg raise · 3×60s plank · 3×30 flutter kicks |
| 48 | Recovery walk | 34 min easy walk · Full stretch · Massager |
| 49 | Core + Walk | Wonder Core ×5: 32 crunch / 25 twist per side / 20 push-up · 34 min brisk walk · 3×55s plank |
| 50 | Longer walk / intervals | 38 min brisk walk with 6×1 min faster pushes · 3×55s plank · 3×20 Russian twist per side |
| 51 | Rest | Full rest or gentle walk |
| 52 | Core + Walk | Wonder Core ×5: 32 crunch / 26 twist per side / 22 push-up · 3×60s plank · 35 min brisk walk |
| 53 | Intervals | 35 min: 3 min power walk / 2 min light jog (or all walk) · 3×25 bicycle per side · 3×40s side plank per side · 3×22 Russian twist per side |
| 54 | Core focus | Wonder Core ×5: 34 crunch / 26 twist per side / 22 low crunch · 3×24 leg raise · 3×60s plank · 3×32 flutter kicks |
| 55 | Recovery walk | 35 min easy walk · Stretch · Massager |
| 56 | Core + Walk | Wonder Core ×5: 35 crunch / 28 twist per side / 22 push-up · 35 min brisk walk · 3×60s plank |
| 57 | Long walk | 40 min brisk walk with 6×1 min faster pushes · 3×60s plank |
| 58 | Rest | Full rest |
| 59 | Full core circuit | 5 min walk · 4 rounds: 25 crunch / 18 twist per side / 18 bicycle per side / 45s plank / 15 leg raise / 12 push-up · 25 min brisk walk |
| 60 | Test day + check-in | Compare to Day 30: longest plank hold & max crunches in 60s (write them down!) · 30 min brisk walk · Stretch + massager · Progress photo 🎉 |

### A.3 — Phase 3 · Peak (Days 61–90) — authored continuation

| Day | Title | Workout (segments split by ·) |
|----|----|----|
| 61 | Core + Walk | Wonder Core ×5: 35 crunch / 28 twist per side / 24 push-up · 3×60s plank · 36 min brisk walk |
| 62 | Intervals | 36 min: 3 min power walk / 2 min light jog · 3×26 bicycle per side · 3×45s side plank per side · 3×24 Russian twist per side |
| 63 | Core focus | Wonder Core ×5–6: 35 crunch / 28 twist per side / 24 low crunch · 3×26 leg raise · 3×65s plank · 3×34 flutter kicks |
| 64 | Recovery walk | 36 min easy walk · Full stretch · Massager |
| 65 | Core + Walk | Wonder Core ×6: 38 crunch / 30 twist per side / 24 push-up · 36 min brisk walk · 3×65s plank |
| 66 | Longer walk / intervals | 40 min brisk walk with 7×1 min faster pushes · 3×60s plank · 3×24 Russian twist per side |
| 67 | Rest | Full rest or gentle walk + stretch |
| 68 | Core + Walk | Wonder Core ×6: 38 crunch / 30 twist per side / 26 push-up · 3×65s plank · 38 min brisk walk |
| 69 | Intervals | 38 min: 2 min power walk / 2 min light jog · 3×28 bicycle per side · 3×45s side plank per side · 3×26 Russian twist per side |
| 70 | Core focus | Wonder Core ×6: 38 crunch / 30 twist per side / 26 low crunch · 3×28 leg raise · 3×70s plank · 3×36 flutter kicks |
| 71 | Recovery walk | 38 min easy walk · Stretch · Massager |
| 72 | Core + Walk | Wonder Core ×6: 40 crunch / 32 twist per side / 26 push-up · 38 min brisk walk · 3×65s plank |
| 73 | Longer walk / intervals | 42 min brisk walk with 7×1 min faster pushes · 3×65s plank · 3×26 Russian twist per side |
| 74 | Rest | Full rest |
| 75 | Core + Walk | Wonder Core ×6: 40 crunch / 32 twist per side / 28 push-up · 3×70s plank · 40 min brisk walk |
| 76 | Intervals | 40 min: 2 min power walk / 2–3 min light jog · 3×30 bicycle per side · 3×50s side plank per side · 3×28 Russian twist per side |
| 77 | Core focus | Wonder Core ×6: 40 crunch / 32 twist per side / 28 low crunch · 3×30 leg raise · 3×75s plank · 3×40 flutter kicks |
| 78 | Recovery walk | 40 min easy walk · Full stretch · Massager |
| 79 | Core + Walk | Wonder Core ×6: 42 crunch / 34 twist per side / 28 push-up · 40 min brisk walk · 3×70s plank |
| 80 | Longer walk / intervals | 44 min brisk walk with 8×1 min faster pushes · 3×70s plank · 3×28 Russian twist per side |
| 81 | Rest | Full rest or gentle walk |
| 82 | Core + Walk | Wonder Core ×6: 42 crunch / 34 twist per side / 30 push-up · 3×75s plank · 42 min brisk walk |
| 83 | Intervals | 42 min: 2 min power walk / 3 min light jog (or all walk) · 3×32 bicycle per side · 3×50s side plank per side · 3×30 Russian twist per side |
| 84 | Core focus | Wonder Core ×6: 44 crunch / 36 twist per side / 30 low crunch · 3×32 leg raise · 3×80s plank · 3×42 flutter kicks |
| 85 | Recovery walk | 42 min easy walk · Stretch · Massager |
| 86 | Core + Walk | Wonder Core ×6: 45 crunch / 36 twist per side / 30 push-up · 42 min brisk walk · 3×75s plank |
| 87 | Long walk | 45 min brisk walk with 8×1 min faster pushes · 3×75s plank |
| 88 | Rest | Full rest |
| 89 | Full core circuit | 5 min walk · 4 rounds: 30 crunch / 22 twist per side / 22 bicycle per side / 60s plank / 18 leg raise / 15 push-up · 30 min brisk walk |
| 90 | Final test day + celebrate | Compare to Day 1 & Day 30: longest plank hold & max crunches in 60s · 30 min brisk walk · Full stretch + massager · Final progress photo 🎉 |
