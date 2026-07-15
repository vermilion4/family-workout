import type { Person } from '../data/people';
import '../styles/PersonPicker.css';

export function PersonPicker({
  people,
  onPick,
}: {
  people: Person[];
  onPick: (id: string) => void;
}) {
  return (
    <div className="picker">
      <header className="picker__head">
        <p className="picker__eyebrow">Family Workout</p>
        <h1 className="picker__title">Who's working out?</h1>
        <p className="picker__sub">Pick your name to see today's plan.</p>
      </header>
      <div className="picker__grid">
        {people.map((p) => (
          <button key={p.id} className="picker__card" onClick={() => onPick(p.id)}>
            <span className="picker__avatar" aria-hidden>{p.displayName[0]}</span>
            <span className="picker__name">{p.displayName}</span>
            <span className="picker__go" aria-hidden>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
