import { useState } from 'react';
import './styles/theme.css';
import { PersonProvider, usePerson, PEOPLE } from './state/PersonContext';
import { PersonPicker } from './components/PersonPicker';
import { Header } from './components/Header';
import { StartDatePicker } from './components/StartDatePicker';
import { TodayView } from './components/TodayView';
import { CalendarView } from './components/CalendarView';
import { DayView } from './components/DayView';
import { phaseNameForDay } from './components/TodayView';
import { getDay } from './data/people';
import { loadProgress, setStartDate, toggleTask } from './state/progress';
import { todayISO, dayForDate } from './state/dates';

type View = 'today' | 'calendar' | 'day';

function Shell() {
  const { person, selectPerson, clearPerson, bump } = usePerson();
  const [view, setView] = useState<View>('today');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [editingStart, setEditingStart] = useState(false);

  if (!person) return <PersonPicker people={PEOPLE} onPick={(id) => { setView('today'); selectPerson(id); }} />;

  // bump() changes the PersonContext value's identity, re-rendering Shell so this
  // re-reads the latest saved progress from localStorage.
  const progress = loadProgress(person.id);
  const today = todayISO();

  if (!progress.startDateISO) {
    return (
      <StartDatePicker
        defaultISO={today}
        onConfirm={(iso) => { setStartDate(person.id, iso); bump(); }}
      />
    );
  }

  if (editingStart) {
    return (
      <StartDatePicker
        defaultISO={progress.startDateISO}
        title="Change start date"
        confirmLabel="Save start date"
        onConfirm={(iso) => { setStartDate(person.id, iso); bump(); setEditingStart(false); }}
        onCancel={() => setEditingStart(false)}
      />
    );
  }

  const onToggleTask = (dayN: number) => (taskId: string) => {
    toggleTask(person.id, dayN, taskId);
    bump();
  };

  const navView: 'today' | 'calendar' = view === 'calendar' ? 'calendar' : 'today';

  return (
    <div>
      <Header
        name={person.displayName}
        view={navView}
        onNav={(v) => { setSelectedDay(null); setView(v); }}
        onSwitch={clearPerson}
        onEditStart={() => setEditingStart(true)}
      />
      {view === 'today' && (
        <TodayView
          plan={person.plan}
          progress={progress}
          todayISO={today}
          onToggleTask={(taskId) => {
            const n = dayForDate(progress.startDateISO!, today, person.plan.totalDays);
            if (n) onToggleTask(n)(taskId);
          }}
          onOpenCalendar={() => setView('calendar')}
        />
      )}
      {view === 'calendar' && (
        <CalendarView
          plan={person.plan}
          progress={progress}
          todayISO={today}
          onPickDay={(n) => { setSelectedDay(n); setView('day'); }}
        />
      )}
      {view === 'day' && selectedDay !== null && (
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '8px 16px' }}>
          <button className="today__btn today__btn--ghost" onClick={() => setView('calendar')}>← Back to calendar</button>
          <DayView
            day={getDay(person.plan, selectedDay)!}
            progress={progress}
            onToggleTask={onToggleTask(selectedDay)}
            phaseName={phaseNameForDay(person.plan, selectedDay)}
            totalDays={person.plan.totalDays}
          />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PersonProvider>
      <Shell />
    </PersonProvider>
  );
}
