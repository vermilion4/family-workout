import '../styles/Header.css';

export function Header({
  name,
  view,
  onNav,
  onSwitch,
  onEditStart,
}: {
  name: string;
  view: 'today' | 'calendar';
  onNav: (v: 'today' | 'calendar') => void;
  onSwitch: () => void;
  onEditStart: () => void;
}) {
  return (
    <header className="hdr">
      <button className="hdr__switch" onClick={onSwitch} aria-label="Switch person">
        {name} ▾
      </button>
      <div className="hdr__right">
        <nav className="hdr__nav">
          <button className={view === 'today' ? 'is-active' : ''} onClick={() => onNav('today')}>
            Today
          </button>
          <button className={view === 'calendar' ? 'is-active' : ''} onClick={() => onNav('calendar')}>
            Calendar
          </button>
        </nav>
        <button className="hdr__settings" onClick={onEditStart} title="Change start date">
          <span aria-hidden>📅</span> Start date
        </button>
      </div>
    </header>
  );
}
