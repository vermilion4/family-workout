# Family Workout Tracker — SDD Progress Ledger

Plan: docs/superpowers/plans/2026-07-14-family-workout-tracker.md
Environment note: commits are DISABLED on this device. Work stays in the
working tree (staged via `git add -A`). Test suites (Vitest) are the primary
per-task gate; milestone + final reviews cover quality.

## Dispatch map (batched tasks)
- D1: Task 1  — scaffold + Vitest harness + design tokens
- D2: Tasks 2,3 — content types/helpers + exercise library
- D3: Tasks 4,5,6 — Ady 90-day content (Phases 1-3)
- D4: Tasks 7,8,9 — people registry + dates + progress
- D5: Tasks 10,11 — person context/shell/picker + header/start-date
- D6: Tasks 12,13 — ring/taskrow/info + day view
- D7: Tasks 14,15 — today view + calendar
- D8: Task 16 — full wiring + integration test
- D9: Task 17 — PWA + Netlify
- D10: Task 18 — visual/a11y polish

## Status
- D1 (Task 1): complete — scaffold + Vitest + tokens, tests 1/1 green, strict mode on. (staged, no commit)
- D2 (Tasks 2,3): complete — types/helpers + exercises, tests 6/6 green. (staged)
- D3 (Tasks 4,5,6): complete — 90 days transcribed, verified 0 mismatches, tests 14/14. (staged)
- D4 (Tasks 7,8,9): complete — people registry, date/status math, per-person localStorage progress. Tests 30/30 green (14 prior + 16 new). (staged, no commit)
  - Controller fix: added saveProgress round-trip test (resolves noUnusedLocals build break). Milestone: 31/31 tests + `npm run build` clean.
- D5 (Tasks 10,11): complete — PersonContext, app shell, PersonPicker, Header, StartDatePicker. Tests 33/33, build clean. (staged)
- D6 (Tasks 12,13): complete — ProgressRing, TaskRow, ExerciseInfo, DayView. Tests 40/40, build clean. (staged)
- D7 (Tasks 14,15): complete — TodayView + phaseNameForDay, CalendarView + DayCell. Tests 45/45, build clean. (staged)
- D8 (Task 16): complete — full App wiring + integration test; require()->import fix applied (no require in App.tsx); stale App.test assertion updated. Tests 47/47, build clean. App functionally complete end-to-end. (staged)
- D9 (Task 17): complete — installable PWA (VitePWA), offline-generated PNG icons (scripts/gen-icons.mjs), netlify.toml. Build emits sw.js + manifest.webmanifest. Tests 47/47. (staged)
- D10 (Task 18): complete — bold visual + a11y polish (radial glow, hero ring, check-pop, calendar legend/progress bar, focus-visible); content retag of day 30/60/90 "Compare to..." notes -> kind other. Tests 47/47, build clean. (staged)
  - Known tradeoff: 7-wide calendar cells are ~40px at 320px width (45px at 390px), slightly under the 44px target only on the narrowest phones. Accepted.

## ALL 18 TASKS COMPLETE.
- Final review: 0 Critical, 2 Important, 4 Minor. Fix round 1 addressed ALL of them.
  - Editable start date (spec 6.2), real month-style calendar with dates (spec 6.4), Day N of 90 hero, dead-prop, etc.
- Final state: tests 50/50 green, `npm run build` clean, PWA emits sw.js + manifest, no require() in src.
- Live-verified via screenshots (.superpowers/sdd/*-shots): picker, today, month calendar, edit-start all render correctly and on-brand.
- Remaining: finish/handoff. (commits still disabled — user commits + deploys.)

## Minor findings (for final review / polish)
- Day 30/60/90 "test day" note segments (e.g. "Compare to Day 1: longest plank hold & max crunches...") mechanically got kind=floor/moveRef=plank via the keyword rule. They are notes, not exercises. Consider retagging those specific segments to kind 'other' (no moveRef) in D10 polish.
- `src/state/progress.test.ts` (written verbatim per plan) imports `saveProgress` without a direct call, which trips Task 1's `noUnusedLocals: true` under `tsc -b`/`npm run build` (does not affect `npm test`, which passes). Revisit at the build-verification task (17/18).
