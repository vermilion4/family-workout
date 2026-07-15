# Task 16 Report: Full app wiring + integration test

Status: DONE

## What was implemented

### `src/App.tsx` (rewritten per plan Step 1, with Step 2 fix applied)
- `Shell()` now owns `view: 'today' | 'calendar' | 'day'` and `selectedDay: number | null`.
- Gates: no `person` → `PersonPicker`; `person` but no `progress.startDateISO` → `StartDatePicker` (confirm calls `setStartDate(person.id, iso)` then `bump()`).
- Re-reads `loadProgress(person.id)` on every render; `progressVersion` from `usePerson()` is referenced (`void progressVersion;`) purely to force Shell to re-render/re-read after `bump()`.
- `onToggleTask = (dayN) => (taskId) => { toggleTask(person.id, dayN, taskId); bump(); }` — curried per-day toggle handler shared by `TodayView` and `DayView`.
- Renders `Header` (person switcher + Today/Calendar nav), then one of `TodayView` / `CalendarView` / `DayView` (with a "← Back to calendar" button) based on `view`.

### The `require(...)` → `import` fix (Step 2, mandatory)
The plan's Step 1 code block intentionally ships `require('./state/dates').dayForDate(...)` inside the `TodayView` `onToggleTask` prop, and Step 2 explicitly instructs replacing it. I applied the fix directly while writing the file (never let the `require(` form land on disk):
- Top-of-file import changed to `import { todayISO, dayForDate } from './state/dates';`
- Handler body: `const n = dayForDate(progress.startDateISO!, today, person.plan.totalDays); if (n) onToggleTask(n)(taskId);`

**Grep confirmation:**
```
$ grep -rn "require(" /Users/vermilion/Desktop/family-workout/src
(no matches)
```
`grep -n "require(" src/App.tsx` exits 1 (no match) — no `require(` anywhere in the file or the rest of `src/`.

### `src/App.integration.test.tsx` (created, verbatim per plan Step 3)
- Test 1: pick Ady → confirm default start date → today resolves to Day 1 "Core + Walk" → check every task checkbox → `day-complete` testid appears → switch to Calendar view → `Day 1, ... done` button (via `DayCell`'s `aria-label`) is present → `fw:v1:lastPerson` is `'ady'`.
- Test 2: pick Mummy (a stub plan, `authored: false`) → confirm start date → `DayView`'s empty-state "Coming soon" text renders, zero checkboxes.

### Deviation: `src/App.test.tsx` (Task 10) — one assertion updated
The Task 10 test asserted `screen.getByRole('heading', { name: 'Ady' })` immediately after picking Ady, which was valid against Task 10's placeholder shell (`<h1>{person.displayName}</h1>`). Task 16's real flow intentionally gates on `startDateISO` first (per the plan's own "Interfaces" note: "gates on `startDateISO` (renders `StartDatePicker`)"), so with fresh `localStorage` picking Ady now lands on `StartDatePicker` ("When did you start?"), not a bare "Ady" heading — confirmed by first running the suite unmodified and observing exactly this single failure (46/47 passing, only `App.test.tsx` red, with the DOM dump showing the `startdate` view).
I updated the one assertion (kept everything else, including the `fw:v1:lastPerson` check) to reflect the now-correct behavior:
```tsx
expect(screen.getByRole('heading', { name: /when did you start/i })).toBeInTheDocument();
```
This preserves the test's original intent ("starts on the person picker and enters a person") without weakening coverage — it still proves the picker → person flow works, just against the real post-Task-16 UI instead of the removed Task-10 stub. This file was not in Task 16's listed "Files" (only `App.tsx` modify + `App.integration.test.tsx` create were), but the task's definition of done required the pre-existing `App.test.tsx` to keep passing, and the plan's own rewritten `App.tsx` was what made the old assertion stale.

## Verification

- `npm test` — **17 test files, 47 tests passed** (45 pre-existing incl. the adjusted `App.test.tsx`, plus 2 new `App.integration.test.tsx` tests).
- `npm run build` — `tsc -b && vite build` completed cleanly (46 modules transformed, no type errors under strict mode).
- `grep -rn "require(" src/App.tsx` → no output (confirmed twice: narrow grep on `App.tsx` and a broader recursive grep across all of `src/`).
- All changed/created files staged via `git add -A` (commits disabled per standing rule; left in working tree for the user to commit later): `src/App.tsx`, `src/App.integration.test.tsx`, `src/App.test.tsx`.

## Notes / concerns

- The only deviation from "verbatim" is the one-line assertion swap in `src/App.test.tsx`, made necessary by Task 16's own spec (the start-date gate) contradicting an assertion written back in Task 10 before that gate existed. No production code deviates from the plan's Task 16 text beyond the mandatory Step-1→Step-2 `require`→`import` fix.
- Manual click-through (`npm run dev`) was not performed in this sandboxed session in favor of the automated integration tests, which already exercise the full picker → start-date → today-checklist → calendar flow end-to-end.
