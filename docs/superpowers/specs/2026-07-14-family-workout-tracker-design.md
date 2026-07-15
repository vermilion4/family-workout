# Family Workout Tracker — Design Spec

- **Date:** 2026-07-14
- **Status:** Approved (design), pending implementation plan
- **Owner:** Ady

## 1. Overview

A simple, good-looking workout-tracking web app for three family members —
**Ady**, **Mummy**, and **Grandma**. Each person has their own multi-phase
workout plan laid out day by day. A person opens the site, selects who they
are, sees their plan for the day, ticks off each exercise as they do it, and
watches a calendar fill in as they progress.

No login, no accounts, no backend. It is shared by sending a link. It is built
as a **PWA (installable website)** so each person can add it to their home
screen and it behaves like a native app.

### Goals

- Beautiful, energetic, workout-app feel — not plain.
- Dead simple to use for three generations, including Grandma: big text, big
  tap targets, obvious actions.
- Per-exercise checkboxes; the day auto-completes when all are ticked.
- A real-date calendar that tracks completed / missed / upcoming days.
- Zero-friction sharing: one link, no install required (installable if wanted).
- Per-person progress kept separate **even when a device is shared**.

### Non-goals (v1)

- No notifications/reminders (explicitly out of scope).
- No login, auth, accounts, or cloud sync.
- No cross-device sync — progress lives in the browser it was entered on.
- No Mummy/Grandma **content** yet — their plans are structural stubs to be
  authored in a later round. Ady's full 90-day plan is authored now.

## 2. Key decisions & rationale

| Decision | Choice | Why |
| --- | --- | --- |
| Platform | Website (PWA), not native app | A link works for everyone incl. Grandma; native needs app stores / TestFlight / APK sideloading. PWA gives an app-like installed experience. |
| Hosting | Netlify (static) | Free, one-command deploy, just share the URL. |
| Storage | Browser `localStorage`, keyed per person | No backend needed; supports separate progress per person on a shared device. |
| Device model | Shared-device supported (requirement "B") | Data namespaced by person, so three people can use one phone independently. |
| Date model | Real calendar dates from a per-person start date | User preference: each program day maps to an actual date on a month calendar. |
| Plan length | 90 days (3 phases) | User extended the 30-day PDF to a 3-month plan. |
| Missed days | Non-punishing; back-fillable | Any past/future day can be opened and ticked off. Motivating, not a streak-breaker. |
| Visual style | Bold & energetic: dark charcoal + coral/orange accent | User selection; matches the PDF's figures; premium fitness-app feel. |
| Stack | Vite + React + TypeScript, hand-written CSS | Clean reusable components across 3 people × 3 phases; bespoke (non-templated) look; simple static build. |

## 3. Architecture

Static single-page app. No server. Two clearly separated data concerns:

1. **Plan content** — fixed data authored in the repo. Read-only at runtime.
2. **Personal progress** — mutable per-person state persisted to `localStorage`.

```
src/
  main.tsx                 app entry
  App.tsx                  router/shell + current-person context
  data/
    types.ts               Plan/Phase/Day/Task TypeScript types
    ady.ts                 Ady's full 90-day plan (authored now)
    mummy.ts               Mummy's plan (stub, structure only)
    grandma.ts             Grandma's plan (stub, structure only)
    people.ts              person registry: id, displayName, plan, accentTweaks
    exercises.ts           "How to do each move" library (from PDF)
  state/
    progress.ts            localStorage read/write, keyed by personId
    dates.ts               day<->date mapping + status logic (pure functions)
  components/
    PersonPicker.tsx       "Who are you?" landing
    Header.tsx             person switcher + nav
    TodayView.tsx          today's workout (home once inside)
    DayView.tsx            a single day's checklist + progress ring
    TaskRow.tsx            one tappable task checkbox
    ProgressRing.tsx       animated completion ring
    CalendarView.tsx       month-style 90-day calendar
    DayCell.tsx            one calendar date (status-colored)
    ExerciseInfo.tsx       "how to do this move" popover/sheet
  styles/
    theme.css              CSS variables (colors, spacing, radius, type)
    *.css                  component styles
```

### Components as isolated units

Each component has one job and a small prop interface, so all three people and
all phases reuse the same code:

- `ProgressRing({ done, total })` → renders a ring; knows nothing about plans.
- `TaskRow({ task, checked, onToggle })` → one checkbox; owns no state.
- `DayView({ day, progress, onToggleTask })` → renders a day's checklist.
- `CalendarView({ plan, startDate, progress, onPickDay })` → the whole grid.
- `progress.ts` is the only module that touches `localStorage`.
- `dates.ts` holds all date math as pure, unit-testable functions.

## 4. Data model

### Plan content (static)

```ts
type TaskKind = 'core' | 'floor' | 'cardio' | 'rest' | 'other';

interface Task {
  id: string;          // stable within a day, e.g. "d8-t2"
  label: string;       // "3×25s plank"
  kind: TaskKind;      // drives the little colored tag/icon
  moveRef?: string;    // optional link to exercises.ts entry for "how to"
}

interface Day {
  n: number;           // 1..90 (program day number)
  title: string;       // "Core + Walk"
  isRest: boolean;
  tasks: Task[];       // one per PDF dot-segment; rest days have 1 task
}

interface Phase {
  n: 1 | 2 | 3;
  name: string;        // "Foundation" | "Momentum" | "Peak"
  subtitle: string;    // "habit & form, keep it doable"
  days: Day[];         // 30 days each
}

interface Plan {
  personId: string;
  totalDays: number;   // 90 (Ady); stubs may be shorter/empty
  phases: Phase[];
  authored: boolean;   // true for Ady, false for stubs
}
```

### Personal progress (localStorage)

- **Key:** `fw:v1:progress:<personId>`
- **Value:**

```ts
interface PersonProgress {
  startDateISO: string | null;         // set on first entry; null until chosen
  checked: Record<number, string[]>;   // dayN -> array of checked task ids
}
```

- Last selected person: `fw:v1:lastPerson` → `personId` (so they land straight in).
- All writes go through `state/progress.ts`. Corrupt/missing values fall back to
  sensible defaults (no crash).

## 5. Date & status logic (`state/dates.ts`)

Given a person's `startDateISO` and today's real date:

- `dateForDay(start, n)` = `start + (n - 1)` days.
- `dayForDate(start, date)` = inverse (which program day, if any, is that date).
- A day's **completion**: `checked[n].length === day.tasks.length` (all ticked).
- Per-date **status** (drives calendar color):
  - `done` — all tasks checked. ✅ green.
  - `today` — the day whose date === real today, not yet fully done. 🟠 coral.
  - `missed` — date < today and not done. ⚫ dim/outline.
  - `upcoming` — date > today and not done. ⚪ neutral.
- All functions are pure and unit-tested. Timezones handled by comparing local
  calendar dates (no time-of-day), so "today" is stable regardless of clock time.

## 6. Screens & flow

### 6.1 Who are you? (landing)

- Full-screen, dark, three big tap cards: **Ady · Mummy · Grandma**, each with a
  large label and a subtle accent. One tap enters that person.
- If `lastPerson` is set, skip the picker and route straight into that person.
  The picker stays reachable anytime via the header's person switcher, so
  changing who you are is always one tap away.

### 6.2 First entry for a person → start date

- If the person has no `startDateISO`, show a friendly "When did you start?
  (defaults to today)" date picker. Confirm → Day 1 pins to that date.
- Editable later from a small settings/menu affordance.

### 6.3 Today (home once inside)

- Header: person name + switcher, link to Calendar.
- Hero: **Day N of 90**, phase name, day title (e.g. "Core + Walk"), an animated
  **progress ring**.
- The day's **checklist** (see §7). Ticking the last task triggers a celebration
  and marks the day done.
- If today is a rest day: a calm "Rest day — you earned it" state with the single
  rest task.
- If today is before the start date or after day 90: a gentle empty/finished state.

### 6.4 Calendar / progress

- Month-style calendar spanning the plan's real-date range (~3 months), grouped
  and labeled by **Phase** and **Week** to echo the PDF.
- Each workout date is a `DayCell` colored by status (§5). Today is emphasized.
- Tapping any date opens that `DayView` — including past (back-fill a missed day)
  and future (preview / do early).
- A summary strip: "Day 12 of 90 · 40% · N days done".

## 7. Day view & checkbox interaction (core UX)

- Each PDF day line is split on the `·` separators into **individual tasks**.
  Example — Day 8 (`Wonder Core ×2–3: 15 crunch / 12 twist per side / 10 push-up
  · 3×25s plank · 22 min brisk walk`) becomes three tasks. Warm-ups, stretches,
  and "massager" segments are their own checkable tasks too.
- Each `TaskRow` is a large, easily-tapped control with a colored **kind tag**
  (Core / Floor / Cardio) and an optional "how?" affordance opening
  `ExerciseInfo` (the PDF's "How to do each move" text).
- Ticking updates the **progress ring** live. Ticking the final task:
  - marks the day complete, plays a brief celebration animation,
  - turns the date green on the calendar.
- Un-ticking is always allowed (no lock-in). State persists immediately.

## 8. Content plan

### 8.1 Ady — authored now (90 days, 3 phases)

- **Phase 1 · Foundation (Days 1–30):** taken verbatim from the PDF, split into
  tasks. "How to do each move" library also from the PDF.
- **Phase 2 · Momentum (Days 31–60):** authored as a natural continuation in the
  same style and equipment (Treadmill, Wonder Core, floor). Progression vs Phase 1:
  - Wonder Core: ~3–4 rounds, reps nudged up (e.g. crunch 20→25, twist 18→20).
  - Longer plank holds (up to ~50s), more leg raises / flutter kicks / Russian twists.
  - Walks 28–35 min; more frequent 1-min faster pushes; optional light jog intervals.
  - Same weekly rhythm: Core+Walk / intervals / Core focus / recovery / longer walk / rest.
- **Phase 3 · Peak (Days 61–90):** strongest phase — full core circuits, longest
  holds (~60s), 35–40 min cardio with more/longer jog intervals, a mid-phase and
  end "test day" echoing the PDF's Day 30 (max crunches in 60s, longest plank).
- **These Phase 2 & 3 drafts are reviewed and adjusted by Ady before lock-in.**

### 8.2 Mummy & Grandma — stubs now

- Same `Plan` shape with `authored: false`. Calendar and Today render, but days
  show a friendly "Workout not planned yet — coming soon" state instead of tasks.
- Adding their real plans later is **pure data** (fill `mummy.ts` / `grandma.ts`),
  no code changes.

## 9. Visual design direction

- **Mood:** Bold & energetic, premium fitness app (Nike Training / Fitbod feel).
- **Palette:** deep charcoal background (`~#14161B`), elevated dark cards, one
  vivid **coral/orange** accent (`~#FF5A36`) for progress, checks, and today.
  Success green for completed days. Muted grays for upcoming/missed.
- **Typography:** large, confident headings; big readable body; oversized day
  numbers. High contrast for legibility across generations.
- **Motion:** progress-ring fill, satisfying check animation, day-complete
  celebration. Tasteful, not distracting; respects `prefers-reduced-motion`.
- **Accessibility / shared-use:** minimum ~44px tap targets, strong contrast,
  works one-handed on a phone, scales up on a laptop. (Final palette + type scale
  refined during implementation with the frontend-design skill.)

## 10. PWA & deployment

- `manifest.webmanifest` (name, icons, theme color, standalone display) +
  service worker via `vite-plugin-pwa` for installable, offline-capable use.
- App icon + splash in the coral/charcoal theme.
- Build: `vite build` → static `dist/`. Deploy to **Netlify**; share the URL.
  Everything (content + logic) is client-side, so no server config.

## 11. Success criteria (v1 done when…)

1. Open the site → pick **Ady** → (first time) choose a start date.
2. **Today** shows the correct day's workout with per-exercise checkboxes.
3. Ticking each task fills the ring; the last tick completes the day with a
   celebration and greens the date on the calendar.
4. **Calendar** shows done / today / missed / upcoming correctly across 90 days;
   tapping a past date lets you back-fill it.
5. Switching to **Mummy** or **Grandma** shows their own separate progress and the
   "coming soon" content state — with no bleed between people on a shared device.
6. Reloading the browser preserves each person's start date and checkmarks.
7. Installable to the home screen and looks like a bold, polished workout app.

## 12. Open items / future

- Author Mummy's and Grandma's real 90-day plans (next round).
- Possible later: progress photos & measurements (PDF's Day-1/Day-30 compare),
  an export/backup of localStorage, optional streak stats. Not in v1.
