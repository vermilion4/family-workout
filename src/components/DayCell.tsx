import type { DayStatus } from '../state/dates';
import { parseISO } from '../state/dates';

export function DayCell({
  n,
  dateISO,
  status,
  isRest,
  phase,
  onPick,
}: {
  n: number;
  dateISO: string;
  status: DayStatus;
  isRest: boolean;
  phase: 1 | 2 | 3;
  onPick: (n: number) => void;
}) {
  const dayOfMonth = parseISO(dateISO).getDate();
  return (
    <button
      className="cal__cell"
      data-status={status}
      data-rest={isRest || undefined}
      data-phase={phase}
      aria-label={`Day ${n}, ${status}`}
      onClick={() => onPick(n)}
    >
      <span className="cal__n num">{dayOfMonth}</span>
    </button>
  );
}
