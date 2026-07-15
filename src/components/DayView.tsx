import type { Day } from '../data/types';
import type { PersonProgress } from '../state/progress';
import { isTaskChecked, dayCompletedCount, isDayDone } from '../state/progress';
import { TaskRow } from './TaskRow';
import { ProgressRing } from './ProgressRing';
import '../styles/DayView.css';

export function DayView({
  day,
  progress,
  onToggleTask,
  phaseName,
  totalDays,
}: {
  day: Day;
  progress: PersonProgress;
  onToggleTask: (taskId: string) => void;
  phaseName?: string;
  totalDays?: number;
}) {
  if (day.tasks.length === 0) {
    return (
      <section className="dayview dayview--empty">
        <p className="dayview__eyebrow">Day {day.n}</p>
        <h2>Coming soon</h2>
        <p className="dayview__soon">This workout isn't planned yet — check back soon.</p>
      </section>
    );
  }

  const done = dayCompletedCount(progress, day);
  const complete = isDayDone(progress, day);

  return (
    <section className="dayview">
      <div className="dayview__head">
        <div className="dayview__heading">
          {phaseName && (
            <p className="dayview__eyebrow">
              Day {day.n}{totalDays ? ` of ${totalDays}` : ''} · {phaseName}
            </p>
          )}
          <h2 className="dayview__title">{day.title}</h2>
        </div>
        <ProgressRing done={done} total={day.tasks.length} size={104} />
      </div>

      {complete && (
        <div className="dayview__done" data-testid="day-complete">Day complete! 🎉</div>
      )}

      <div className="dayview__tasks">
        {day.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            checked={isTaskChecked(progress, day.n, task.id)}
            onToggle={() => onToggleTask(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
