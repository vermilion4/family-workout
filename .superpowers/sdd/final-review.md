# Family Workout Tracker — Final Whole-App Review

- **Date:** 2026-07-15
- **Reviewer:** Claude (final adversarial whole-app review)
- **Verdict:** FIX-FIRST (soft) — no correctness/data bugs; two named spec requirements unimplemented.
- **Build/test observed:** `npm test` → 17 files, **47/47 passing**; `npm run build` → clean (`tsc -b && vite build`, PWA sw.js + manifest emitted). Both re-run and confirmed by me.

## Verification performed

- Ran the full test suite and production build myself (results above).
- Traced the full happy path through source: `PersonPicker.onPick` → `selectPerson`/`setLastPerson` → `Shell` re-reads `loadProgress` → `!startDateISO` gate → `StartDatePicker.onConfirm` → `setStartDate` + `bump()` → `TodayView` computes `n = dayForDate(start, today)` → `DayView`/`TaskRow` toggle → `toggleTask` persists + `bump()` re-reads → `isDayDone` true → celebration banner (`data-testid="day-complete"`, CSS `@keyframes celebrate`) → `CalendarView` `dayStatus(...)` renders the cell as `done`. Flow is correct end-to-end.
- Confirmed **no `require(`** anywhere under `src/`, `scripts/`, or `vite.config.ts` (grep clean; ESM throughout).
- Confirmed per-person isolation: storage keyed `fw:v1:progress:<personId>`, loaded fresh per person; no shared mutable reference; no bleed.
- Date math audited for off-by-one and timezone: all comparisons are on local date-only ISO strings; `diffDays` uses `Math.round` so DST 23h/25h days don't shift a day. No off-by-one in `dateForDay`/`dayForDate`/`dayStatus`.

## Findings

### Important

**I-1 — Start date can never be edited after first set (spec §6.2 / §6.3).**
`src/App.tsx:29-36` — `StartDatePicker` renders only while `!progress.startDateISO`, and `setStartDate` is called only from that gate (confirmed: grep shows the sole call site is App.tsx:33). There is no settings/menu affordance to re-open it. The person switcher (`clearPerson`) returns to the picker, but re-selecting the same person skips the date prompt because `startDateISO` is already set.
- **Failure scenario:** A user fat-fingers the start date (e.g. picks last month instead of today). Every program day↔date mapping, and thus every calendar status (today/missed/upcoming), is now permanently offset. The only recovery is manually clearing `localStorage`. Spec §6.2 explicitly promises "Editable later from a small settings/menu affordance."
- **Suggested fix:** Add a small "Change start date" affordance (Header menu or Today footer) that re-renders `StartDatePicker` (seeded with the current `startDateISO`) and calls `setStartDate(person.id, iso)` + `bump()`.

**I-2 — Calendar is not the specified month-style, real-date, Phase+Week calendar (spec §6.4).**
`src/components/CalendarView.tsx:47-72`, `src/components/DayCell.tsx` — The calendar is a flat 7-wide grid of **program-day numbers** (1–30 per phase) grouped by Phase only. There are **no week labels/grouping**, no weekday-column alignment, no month structure, and the cells show the program day number `n` rather than the real calendar date. `dateForDay(start, d.n)` is computed and passed to `DayCell` as `dateISO` but never rendered.
- **Gap/scenario:** Spec §6.4 asks for a "month-style calendar spanning the plan's real-date range (~3 months), grouped and labeled by **Phase and Week** to echo the PDF," with each cell being a real workout date. A user looking for "which actual date is Day 42?" cannot see it on the calendar. (Note: the §11.4 acceptance subset — done/today/missed/upcoming correctness + tap-to-backfill — IS met; this is the design-level shortfall.)
- **Suggested fix:** Render the real date (or month/week separators with weekday alignment) on/around cells, add Week labels, or formally descope this in the spec.

### Minor

**M-1 — Dead prop `dateISO` on `DayCell` (`src/components/DayCell.tsx:10`, passed at `CalendarView.tsx:61`).**
Declared in the prop type and passed in, but never used in the component body. Dead code corroborating I-2. Fix: use it (render the date) or remove it.

**M-2 — Today hero omits "Day N of 90" (spec §6.3).**
`src/components/TodayView.tsx` + `DayView.tsx:36` show "Day N · <Phase>" and the pretty date, but not the "of 90" total that §6.3 calls for in the hero. (`CalendarView` does show "Day N of 90".) Minor copy gap. Fix: include total in the Today eyebrow/hero.

**M-3 — `void progressVersion;` is a misleading smell (`src/App.tsx:24-25`).**
The comment implies this statement is what forces the re-read. It isn't: re-render is already guaranteed because `bump()` changes `progressVersion`, which is a `useMemo` dependency in `PersonContext.tsx:25`, changing the context value's identity. The `void` line only silences unused-var lint and could be deleted without behavior change. Harmless but misleading. Fix: drop the statement or correct the comment.

**M-4 — `StartDatePicker` accepts an empty date (`src/components/StartDatePicker.tsx:18-20`, `App.tsx:33`).**
Clearing the native date input yields `""`; "Start my plan" then calls `setStartDate(person.id, "")`, which saves `""` and immediately re-shows the picker (self-recovers, no crash, because `""` is falsy at the gate). Fix: disable the confirm button when `iso` is empty. Low priority.

## Confirmed-correct (no action needed)

- **No `require(`** in any ESM source (verified).
- **Per-person isolation (requirement B):** distinct `localStorage` keys per person; loaded fresh; no cross-person bleed. Integration test `App.integration.test.tsx` covers the switch-people-keeps-progress-separate case.
- **Progress re-read after writes:** `toggleTask`/`setStartDate` persist then `bump()`; `Shell` re-reads `loadProgress` on the resulting re-render. Correct.
- **Date/status logic (`src/state/dates.ts`):** `dateForDay`/`dayForDate` inverse pair is off-by-one-clean; `dayStatus` today/missed/upcoming/done classification matches §5; `diffDays` `Math.round` neutralizes DST. Back-filling a past day from the calendar works (`onPickDay(n)` → `DayView` toggles day `n` directly).
- **Corrupt/missing storage:** `loadProgress` try/catch + type guards fall back to defaults without crashing.
- **Stubs:** Mummy/Grandma use `stubPlan` (`authored:false`, empty task days); `DayView` renders "Coming soon"; `isDayDone` returns false for zero-task days so stub cells never count as done. Matches §8.2.
- **Content:** Ady phases 1/2/3 each have exactly 30 days, n-ranges 1–30 / 31–60 / 61–90 (90 total). Task ids positional (`d{n}-t{i+1}`); `dayCompletedCount` filters by existing ids, so stale checked ids self-heal after content edits.
- **PWA/Netlify:** `vite-plugin-pwa` manifest (name/icons/theme/standalone/start_url), offline-generated PNG icons, `netlify.toml` SPA redirect + build/publish. Build emits `sw.js` + `manifest.webmanifest`.
- **Motion/a11y:** `@media (prefers-reduced-motion: reduce)` disables all animation/transition globally (`theme.css:74`); celebration `@keyframes celebrate` present; checkbox roles/aria-checked/aria-label on tasks and cells.

## Verdict rationale

All seven §11 v1 success criteria are met and both gates (test + build) are green, with no correctness, data-integrity, or crash defects found. The FIX-FIRST call rests solely on two explicitly-specified requirements that are unimplemented: start-date editability (I-1, which also has *no recovery path* from a mistake) and the month-style/Week calendar form (I-2). Address I-1 at minimum before shipping; I-2 can be a fast-follow or a documented spec descope.
