import type { Plan } from '../data/types';
import type { PersonProgress } from '../state/progress';
import type { DayStatus } from '../state/dates';
import { isDayDone } from '../state/progress';
import { dayStatus, dateForDay, dayForDate, parseISO } from '../state/dates';
import { DayCell } from './DayCell';
import '../styles/Calendar.css';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalCell {
  n: number;
  dateISO: string;
  isRest: boolean;
  phase: 1 | 2 | 3;
  status: DayStatus;
}

interface CalMonth {
  key: string;
  label: string;
  cells: CalCell[];
}

function buildMonths(plan: Plan, progress: PersonProgress, start: string, todayISO: string): CalMonth[] {
  const months: CalMonth[] = [];
  for (const ph of plan.phases) {
    for (const d of ph.days) {
      const dateISO = dateForDay(start, d.n);
      const cell: CalCell = {
        n: d.n,
        dateISO,
        isRest: d.isRest,
        phase: ph.n,
        status: dayStatus({
          n: d.n, startISO: start, todayISO,
          totalDays: plan.totalDays, isDone: isDayDone(progress, d),
        }),
      };
      const key = dateISO.slice(0, 7); // YYYY-MM — days are contiguous, so grouping runs stay adjacent
      let month = months[months.length - 1];
      if (!month || month.key !== key) {
        month = {
          key,
          label: parseISO(dateISO).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
          cells: [],
        };
        months.push(month);
      }
      month.cells.push(cell);
    }
  }
  return months;
}

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
  const months = buildMonths(plan, progress, start, todayISO);

  return (
    <div className="cal">
      <div className="cal__summary">
        <div className="cal__summaryrow">
          <strong>{currentN ? `Day ${currentN} of ${plan.totalDays}` : `${plan.totalDays}-day plan`}</strong>
          <span className="num">{pct}% · {doneCount} day{doneCount === 1 ? '' : 's'} done</span>
        </div>
        <div className="cal__bar" aria-hidden>
          <div className="cal__barfill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="cal__legend" aria-label="Calendar key">
        <li className="cal__key cal__key--done"><span className="cal__keymark" aria-hidden>✓</span>Done</li>
        <li className="cal__key cal__key--today"><span className="cal__keymark" aria-hidden></span>Today</li>
        <li className="cal__key cal__key--upcoming"><span className="cal__keymark" aria-hidden></span>Upcoming</li>
        <li className="cal__key cal__key--missed"><span className="cal__keymark" aria-hidden></span>Missed</li>
        <li className="cal__key cal__key--rest"><span className="cal__keymark" aria-hidden>·</span>Rest</li>
      </ul>

      <ul className="cal__legend cal__legend--phases" aria-label="Phases">
        {plan.phases.map((ph) => (
          <li key={ph.n} className="cal__key cal__phasekey" data-phase={ph.n}>
            <span className="cal__swatch" aria-hidden></span>{ph.name}
          </li>
        ))}
      </ul>

      {months.map((month) => {
        const lead = parseISO(month.cells[0].dateISO).getDay(); // 0=Sun
        return (
          <section key={month.key} className="cal__month">
            <h3 className="cal__monthlabel">{month.label}</h3>
            <div className="cal__weekdays" aria-hidden>
              {WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}
            </div>
            <div className="cal__grid">
              {Array.from({ length: lead }, (_, i) => (
                <span key={`blank-${i}`} className="cal__blank" aria-hidden></span>
              ))}
              {month.cells.map((c) => (
                <DayCell
                  key={c.n}
                  n={c.n}
                  dateISO={c.dateISO}
                  isRest={c.isRest}
                  phase={c.phase}
                  status={c.status}
                  onPick={onPickDay}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
