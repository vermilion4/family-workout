# Task 14 & 15 Report: TodayView + CalendarView/DayCell

Status: DONE

## What was implemented

### Task 14: TodayView
- `src/components/TodayView.tsx` — `TodayView({ plan, progress, todayISO, onToggleTask, onOpenCalendar })`:
  - Computes `n = dayForDate(progress.startDateISO, todayISO, plan.totalDays)`.
  - Returns `null` if `progress.startDateISO` is falsy (guard; parent gates via StartDatePicker).
  - If `n === null` and `todayISO < start` → "Get ready" / "Your plan starts on <date>" message.
  - If `n === null` and today is past day 90 → "Plan complete! 🎉" message with a "See your calendar" button calling `onOpenCalendar`.
  - Else renders `<DayView day={getDay(plan, n)} progress={progress} onToggleTask={onToggleTask} phaseName={phaseNameForDay(plan, n)} />` under a pretty-printed date line.
  - Named export `phaseNameForDay(plan, n): string | undefined` — finds the phase containing day `n`.
- `src/styles/TodayView.css` — styles for `.today`, `.today--msg`, `.today__date`, `.today__btn`.
- `src/components/TodayView.test.tsx` — 3 tests: today-in-range renders day 1 "Core + Walk" + "Day 1 · Foundation"; before-start shows "plan starts" message; after-day-90 shows "plan complete" message. All written before implementation (TDD), confirmed failing (module not found) then passing.

### Task 15: CalendarView + DayCell
- `src/components/DayCell.tsx` — `DayCell({ n, dateISO, status, isRest, onPick })`: a `<button>` with `data-status={status}`, `data-rest` when resting, `aria-label="Day {n}, {status}"`, calling `onPick(n)` on click.
- `src/components/CalendarView.tsx` — `CalendarView({ plan, progress, todayISO, onPickDay })`:
  - Guards on missing `progress.startDateISO` with a "Pick a start date to see your calendar." note.
  - Summary strip showing current day (`Day X of 90` or fallback `90-day plan`), percent complete, and count of done days (singular/plural "day/days").
  - Renders each `Phase` as a labeled `<section>` with heading + subtitle, and a `cal__grid` of `DayCell`s (CSS grid, 7 columns) computed via `dayStatus(...)` per real date (`dateForDay`).
- `src/styles/Calendar.css` — `.cal`, `.cal__summary`, `.cal__phase`, `.cal__phasehead`, `.cal__grid` (7-col grid), `.cal__cell` with status-colored variants (`done`, `today`, `missed`) and a rest-day dot marker.
- `src/components/CalendarView.test.tsx` — 2 tests: renders phase headings (Foundation/Momentum/Peak) + a "done" day-1 cell + summary text; clicking a day cell fires `onPickDay` with the right day number. TDD: confirmed failing (module not found) before implementation, passing after.

## Verification

- `npm test` — **16 test files, 45 tests passed** (40 pre-existing + 3 TodayView + 2 CalendarView).
- `npm run build` — `tsc -b && vite build` completed cleanly, no type errors under strict mode / `noUnusedLocals` / `noUnusedParameters`. Output: `dist/index.html`, `dist/assets/index-*.css`, `dist/assets/index-*.js`.
- All new and modified files staged via `git add -A` (commits disabled per standing rule; left in working tree for the user to commit later).

## Notes / concerns

- No deviations from the plan's verbatim code for Tasks 14/15 were necessary; all interfaces (`TodayView`, `phaseNameForDay`, `DayCell`, `CalendarView`) match the exact names/signatures specified and consumed only already-implemented modules (`getDay`, `dayForDate`, `dateForDay`, `parseISO`, `dayStatus`, `DayStatus`, `isDayDone`, `PersonProgress`, `DayView`, `Plan`).
- `DayCell`'s `dateISO` prop is accepted per the spec's exact signature but not read inside the component body (matches the plan verbatim); this did not trigger `noUnusedParameters`/`noUnusedLocals` since it's a destructured, still-referenced-in-type prop passed through from `CalendarView`, and `tsc -b` build succeeded with no warnings.
- Task 16 (full app wiring importing `phaseNameForDay` from `TodayView.tsx` and using `CalendarView`/`TodayView` together) is untouched — out of scope for this task pair.
