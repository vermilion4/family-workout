# Family Workout Tracker — Fix Round 1 Report

- **Date:** 2026-07-15
- **Scope:** Address findings in `.superpowers/sdd/final-review.md` (2 Important, 4 Minor).
- **Result:** DONE. `npm test` → 17 files, **50/50 passing** (47 original + 3 new). `npm run build` → **clean** (`tsc -b && vite build`, strict / noUnusedLocals+Params; PWA `sw.js` + `manifest.webmanifest` emitted). No `require(` in any source (verified). Changes staged (`git add -A`), not committed.

## Findings addressed

### I-1 (Important) — Editable start date — FIXED
- `StartDatePicker` now accepts optional `onCancel`, plus `title`/`confirmLabel` props, and disables confirm when the date is empty (also closes **M-4**).
- `Header` gained a discoverable **"📅 Start date"** affordance (`onEditStart`) rendered on both Today and Calendar.
- `App.tsx` adds `editingStart` state. Clicking the affordance re-opens `StartDatePicker` **pre-filled with the current `startDateISO`**, titled "Change start date". Confirm → `setStartDate(person.id, iso)` + `bump()` + close; Cancel → close with no change.
- **Test proof:** `App.integration.test.tsx` → "editing the start date after it is set changes which day is Today" (start today = Day 1 → edit to yesterday → Today resolves to **Day 2**). Plus a Cancel test proving the plan is unchanged.

### I-2 (Important) — Real month-style calendar — FIXED
- `CalendarView` rebuilt: the 90 program days are grouped by real calendar **month** (e.g. "June 2026", "July 2026", …) spanning first→last date.
- Each month is a true 7-column grid with a weekday header row (S M T W T F S) and **leading blank cells** (`parseISO(dateISO).getDay()`) so each date sits under its real weekday. A `DayCell` renders only for in-plan dates.
- `DayCell` now shows the real **day-of-month** (from `dateISO`; resolves **M-1** dead prop) as the visible number, while KEEPING `aria-label={`Day ${n}, ${status}`}`, `onClick={() => onPick(n)}`, and `data-status` exactly. Added `data-phase` tint and kept the rest-day dot.
- Summary strip preserved ("Day X of N · Y% · Z days done"). Legend renders status meanings **and** the three phase names (**Foundation / Momentum / Peak**, derived from `plan.phases`, each with a color swatch). Today's cell stays emphasized.
- **Signature (frontend-design):** a phase "heat ramp" — a quiet tinted bottom bar per cell, amber → coral → deep-red across Foundation/Momentum/Peak — so the plan visibly warms up as weeks progress, on the app's charcoal + coral identity. New `getAllByText(/2026/)` + Day-1-shows-"14" test locks in real dates.

### Minors
- **M-1** — Dead `dateISO` prop — FIXED (now rendered as day-of-month).
- **M-2** — "Day N of 90" in Today hero — FIXED. `DayView` takes optional `totalDays`; eyebrow reads "Day 1 of 90 · Foundation". `TodayView` and the calendar day-view pass `plan.totalDays`. Updated `TodayView.test.tsx` assertion intentionally to `/day 1 of 90 · foundation/i`.
- **M-3** — Misleading `void progressVersion;` — FIXED. Removed the line and dropped `progressVersion` from Shell's destructure; re-render is driven by the PersonContext value identity change on `bump()`. Corrected the comment.
- **M-4** — `StartDatePicker` empty-date — FIXED (confirm button `disabled` when empty).

## Files changed
- `src/components/CalendarView.tsx` (month rebuild), `src/components/DayCell.tsx` (day-of-month + data-phase), `src/components/StartDatePicker.tsx` (cancel/title/label/disabled), `src/components/Header.tsx` (edit affordance), `src/components/DayView.tsx` (totalDays), `src/components/TodayView.tsx` (pass totalDays), `src/App.tsx` (editingStart wiring, M-3).
- `src/styles/Calendar.css` (month grid, weekday header, blanks, phase ramp), `src/styles/Header.css` (settings button), `src/styles/StartDatePicker.css` (cancel + disabled).
- Tests: `src/components/CalendarView.test.tsx` (+real-month test), `src/components/TodayView.test.tsx` (updated copy), `src/App.integration.test.tsx` (+edit / +cancel tests).

## Verification
- `npm test` → **50/50 passing**.
- `npm run build` → clean; PWA artifacts emitted.
- Drove the running dev build headless (Chrome via DevTools Protocol), seeded Ady with a start date ~5 weeks back and Day 1 complete, and screenshotted the Calendar and edit flow.

### Screenshots
- `fix-round-1-shots/calendar.png` — real month calendar: June–September 2026 with weekday alignment, done (green ✓), today (coral ring), missed (dim strikethrough), upcoming, rest dots, phase heat-ramp bars, and the Foundation/Momentum/Peak legend.
- `fix-round-1-shots/edit-start.png` — "Change start date" pre-filled with the current start, with Save start date + Cancel.
- `fix-round-1-shots/today.png` — Today hero showing "Day N of 90".

## Concerns
- None blocking. The stub plans (Mummy/Grandma) render a full month calendar of upcoming cells if opened — matches existing "coming soon" behavior; not exercised by tests.
