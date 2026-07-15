# Tasks 10, 11 — Report

Plan: `docs/superpowers/plans/2026-07-14-family-workout-tracker.md`
Environment note: commits are DISABLED on this device. All work staged via `git add -A`, left in the working tree for the user to commit later.

## Task 10: App shell, person context, view routing + PersonPicker

Files created/modified (verbatim per plan):
- `src/components/PersonPicker.test.tsx` — written first, confirmed FAIL (`Failed to resolve import "./PersonPicker"`).
- `src/components/PersonPicker.tsx` — `PersonPicker({ people, onPick })`, three big buttons (avatar + display name), calls `onPick(p.id)`.
- `src/styles/PersonPicker.css` — bold, big-tap-target grid styling using existing theme tokens (`--accent`, `--surface`, `--text`, `--line`, `--radius`), no new tokens needed.
- `src/state/PersonContext.tsx` — `PersonProvider` + `usePerson()` returning `{ person, selectPerson, clearPerson, progressVersion, bump }`; re-exports `PEOPLE`. `personId` seeded from `getLastPerson()`; `selectPerson` calls `setLastPerson(id)` then sets state.
- `src/App.tsx` — rewritten to the Task-10 placeholder shell: `App` wraps `Shell` in `PersonProvider`; `Shell` renders `<PersonPicker>` when no person, else a minimal `<main>` with a "Switch person" button and the person's name (workout sub-views deferred to later tasks, as specified).
- `src/App.test.tsx` — updated to the Task-10 test: asserts the picker heading, clicks "Ady", asserts the `Ady` heading appears and `localStorage['fw:v1:lastPerson'] === 'ady'`.

Confirmed `npm test -- PersonPicker App` → PASS (2/2) after implementation.

## Task 11: Header (person switcher + nav) + Start-date gate

Files created (verbatim per plan):
- `src/components/StartDatePicker.test.tsx` — written first, confirmed FAIL (`Failed to resolve import "./StartDatePicker"`).
- `src/components/StartDatePicker.tsx` — `StartDatePicker({ defaultISO, onConfirm })`, native `<input type="date">` (labelled "Start date"), "Start my plan" button calling `onConfirm(iso)`.
- `src/components/Header.tsx` — `Header({ name, view, onNav, onSwitch })`, switch button (`aria-label="Switch person"`) plus Today/Calendar nav buttons with `is-active` class on the current view.
- `src/styles/Header.css`, `src/styles/StartDatePicker.css` — sticky/blurred header bar and centered date-gate card, all referencing existing theme tokens (`--line`, `--text`, `--text-dim`, `--surface`, `--accent`, `--tap`, `--radius`, `--radius-sm`); no missing tokens.

Confirmed `npm test -- StartDatePicker` → PASS (1/1) after implementation.

## TDD process

For each of the two components (PersonPicker, StartDatePicker): wrote the test file exactly as specified, ran the scoped `npm test -- <name>` to confirm a genuine failure (module-not-found, not a typo/false-fail), then wrote the implementation files exactly as specified, then reran the scoped test to confirm PASS, before moving on. `Header.tsx`/CSS have no dedicated test per the plan (exercised later via `App.test.tsx`/integration tests in Task 16) but were reviewed against the spec's exact prop/behavior contract.

## Full suite result

```
Test Files  11 passed (11)
     Tests  33 passed (33)
```
(31 pre-existing + 1 PersonPicker + 1 StartDatePicker = 33; `App.test.tsx` was updated in place, so its count stays at 1.)

## Build verification

`npm run build` (`tsc -b && vite build`) completed clean — no type errors under strict mode / `noUnusedLocals`, output emitted to `dist/`. This also resolves the `noUnusedLocals` flag raised in the Tasks 7/8/9 report (`src/state/progress.test.ts`'s unused `saveProgress` import) — no new issue was introduced by Tasks 10/11, and the existing suite + build are both green together.

## Interfaces confirmed for later tasks

- `PersonProvider`, `usePerson()` → `{ person, selectPerson, clearPerson, progressVersion, bump }`, and `PEOPLE` re-export, all from `src/state/PersonContext.tsx`.
- `PersonPicker({ people, onPick })` from `src/components/PersonPicker.tsx`.
- `Header({ name, view, onNav, onSwitch })` (`view: 'today' | 'calendar'`) from `src/components/Header.tsx`.
- `StartDatePicker({ defaultISO, onConfirm })` from `src/components/StartDatePicker.tsx`.
- `App.tsx` remains the intermediate placeholder shell (picker → minimal person-name `<main>`); it is expected to be fully rewritten in a later task to wire in `Header`, `StartDatePicker`, and the `today`/`calendar`/`day` sub-views.

## Staging

All new/changed files staged via `git add -A` (commits disabled per standing rule). No commits were made.
