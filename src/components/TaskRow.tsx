import { useState } from 'react';
import type { Task, TaskKind } from '../data/types';
import { getMove } from '../data/exercises';
import { ExerciseInfo } from './ExerciseInfo';
import '../styles/TaskRow.css';

export const KIND_LABEL: Record<TaskKind, string> = {
  core: 'Core', floor: 'Floor', cardio: 'Cardio', rest: 'Rest', other: 'Prep',
};

export function TaskRow({
  task,
  checked,
  onToggle,
}: {
  task: Task;
  checked: boolean;
  onToggle: () => void;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const move = getMove(task.moveRef);
  return (
    <div className={`task task--${task.kind}${checked ? ' is-done' : ''}`}>
      <button
        className="task__box"
        role="checkbox"
        aria-checked={checked}
        aria-label={task.label}
        onClick={onToggle}
      >
        <span className="task__check" aria-hidden>{checked ? '✓' : ''}</span>
        <span className="task__text">
          <span className={`task__tag task__tag--${task.kind}`}>{KIND_LABEL[task.kind]}</span>
          <span className="task__label">{task.label}</span>
        </span>
      </button>
      {move && (
        <button className="task__info" aria-label={`How to do ${move.name}`} onClick={() => setShowInfo(true)}>
          ?
        </button>
      )}
      {showInfo && move && <ExerciseInfo move={move} onClose={() => setShowInfo(false)} />}
    </div>
  );
}
