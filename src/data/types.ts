export type TaskKind = 'core' | 'floor' | 'cardio' | 'strength' | 'balance' | 'rest' | 'other';

export interface Task {
  id: string;
  label: string;
  kind: TaskKind;
  moveRef?: string;
}

export interface Day {
  n: number;
  title: string;
  isRest: boolean;
  tasks: Task[];
}

export interface Phase {
  n: 1 | 2 | 3;
  name: string;
  subtitle: string;
  days: Day[];
}

export interface Plan {
  personId: string;
  totalDays: number;
  phases: Phase[];
  authored: boolean;
}
