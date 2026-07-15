import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { PEOPLE, getPerson, type Person } from '../data/people';
import { getLastPerson, setLastPerson } from './progress';

interface Ctx {
  person: Person | null;
  selectPerson: (id: string) => void;
  clearPerson: () => void;
  progressVersion: number;
  bump: () => void;
}

const PersonCtx = createContext<Ctx | null>(null);

export function PersonProvider({ children }: { children: ReactNode }) {
  const [personId, setPersonId] = useState<string | null>(() => getLastPerson());
  const [progressVersion, setVersion] = useState(0);

  const value = useMemo<Ctx>(() => ({
    person: personId ? getPerson(personId) ?? null : null,
    selectPerson: (id: string) => { setLastPerson(id); setPersonId(id); },
    clearPerson: () => setPersonId(null),
    progressVersion,
    bump: () => setVersion((v) => v + 1),
  }), [personId, progressVersion]);

  return <PersonCtx.Provider value={value}>{children}</PersonCtx.Provider>;
}

export function usePerson(): Ctx {
  const ctx = useContext(PersonCtx);
  if (!ctx) throw new Error('usePerson must be used within PersonProvider');
  return ctx;
}

export { PEOPLE };
