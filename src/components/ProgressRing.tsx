import '../styles/ProgressRing.css';

export function ProgressRing({ done, total, size = 72 }: { done: number; total: number; size?: number }) {
  const pct = total > 0 ? done / total : 0;
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const complete = total > 0 && done === total;
  return (
    <div className="ring" role="img" aria-label={`${done} of ${total} done`}>
      <svg width={size} height={size}>
        <circle className="ring__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={6} fill="none" />
        <circle
          className={`ring__fill${complete ? ' is-complete' : ''}`}
          cx={size / 2} cy={size / 2} r={r} strokeWidth={6} fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring__label">{done}/{total}</span>
    </div>
  );
}
