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
      <DayView day={day} progress={progress} onToggleTask={onToggleTask} phaseName={phaseNameForDay(plan, n)} totalDays={plan.totalDays} />
    </div>
  );
}
