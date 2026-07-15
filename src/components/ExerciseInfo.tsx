import type { Move } from '../data/exercises';
import '../styles/ExerciseInfo.css';

export function ExerciseInfo({ move, onClose }: { move: Move; onClose: () => void }) {
  return (
    <div className="einfo" role="dialog" aria-label={move.name}>
      <div className="einfo__card">
        <h3>{move.name}</h3>
        <p>{move.how}</p>
        <button onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
