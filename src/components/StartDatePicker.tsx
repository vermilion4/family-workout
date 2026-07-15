import { useState } from 'react';
import '../styles/StartDatePicker.css';

export function StartDatePicker({
  defaultISO,
  onConfirm,
  onCancel,
  title = 'When did you start?',
  confirmLabel = 'Start my plan',
}: {
  defaultISO: string;
  onConfirm: (iso: string) => void;
  onCancel?: () => void;
  title?: string;
  confirmLabel?: string;
}) {
  const [iso, setIso] = useState(defaultISO);
  return (
    <div className="startdate">
      <h2 className="startdate__title">{title}</h2>
      <p className="startdate__sub">Day 1 lands on this date.</p>
      <label className="startdate__label">
        Start date
        <input type="date" value={iso} onChange={(e) => setIso(e.target.value)} />
      </label>
      <button className="startdate__go" onClick={() => onConfirm(iso)} disabled={!iso}>
        {confirmLabel}
      </button>
      {onCancel && (
        <button className="startdate__cancel" onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
