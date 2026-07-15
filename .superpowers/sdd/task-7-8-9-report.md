# Tasks 7, 8, 9 — Report

Plan: `docs/superpowers/plans/2026-07-14-family-workout-tracker.md`
Environment note: commits are DISABLED on this device. All work staged via `git add -A`, left in the working tree for the user to commit later.

## Task 7: Assemble plans + people registry

Files created (verbatim per plan):
- `src/data/ady/index.ts` — `adyPlan: Plan` assembling `phase1/2/3`.
- `src/data/stubs.ts` — `stubPlan(personId)` producing 90 unauthored "Coming soon" days across 3 phases.
- `src/data/people.ts` — `Person` interface, `PEOPLE` (`[ady, mummy, grandma]`), `getPerson(id)`, `getDay(plan, n)`.
- `src/data/people.test.ts` — test written first, confirmed FAIL (module not found), then implementation written, confirmed PASS (4/4).

## Task 8: Date & status logic

Files created (verbatim per plan):
- `src/state/dates.ts` — `toISODate`, `parseISO`, `todayISO`, `addDays`, `diffDays`, `dateForDay`, `dayForDate`, `type DayStatus`, `dayStatus`.
- `src/state/dates.test.ts` — written first, confirmed FAIL (module not found), then implementation, confirmed PASS (4/4).

`src/state/` directory did not previously exist; created it as part of this task.

## Task 9: Per-person progress persistence

Files created (verbatim per plan):
- `src/state/progress.ts` — `PersonProgress` interface, `loadProgress`, `saveProgress`, `setStartDate`, `toggleTask`, `isTaskChecked`, `isDayDone`, `dayCompletedCount`, `getLastPerson`, `setLastPerson`. Keys namespaced `fw:v1:progress:<personId>` and `fw:v1:lastPerson`, matching the global constraint.
- `src/state/progress.test.ts` — written first, confirmed FAIL (module not found), then implementation, confirmed PASS (8/8).

## TDD process

For each of the three tasks: wrote the test file exactly as specified, ran the scoped `npm test -- <name>` to confirm a genuine failure (module-not-found, not a typo/false-fail), then wrote the implementation file exactly as specified, then reran the scoped test to confirm PASS, before moving to the next task.

## Full suite result

```
Test Files  9 passed (9)
     Tests  30 passed (30)
```
(14 pre-existing + 4 people + 4 dates + 8 progress = 30.)

## Concern (non-blocking for `npm test`)

Ran `npx tsc -b --noEmit` as an extra strictness check beyond the required `npm test` gate (Global Constraints require TypeScript strict mode). One error surfaced, isolated entirely to the verbatim test code specified by the plan:

```
src/state/progress.test.ts(2,17): error TS6133: 'saveProgress' is declared but its value is never read.
```

`progress.test.ts` imports `saveProgress` (per the plan's exact test code) but no test in that file calls it directly — it's only exercised indirectly via `setStartDate`/`toggleTask` internally. Task 1's `tsconfig.app.json` sets `noUnusedLocals: true`, so `tsc -b` (used by `npm run build`) fails on this unused import, even though Vitest (which doesn't type-check) runs and passes fine. This is a pre-existing interaction between the plan's verbatim test file and Task 1's scaffold, not something introduced by deviating from spec. Did not alter the test file since the task explicitly requires verbatim code; flagging for whoever handles a later build-verification task (e.g. Task 17/18) to decide whether to add a `void saveProgress;`-style reference, drop `noUnusedLocals`, or accept it (the definition of done for this task was `npm test`, which passes fully).

## Staging

All new/changed files staged via `git add -A` (commits disabled per standing rule). No commits were made.
