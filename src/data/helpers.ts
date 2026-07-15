import type { Task, TaskKind, Day } from './types';

export function t(label: string, kind: TaskKind = 'other', moveRef?: string): Omit<Task, 'id'> {
  return moveRef ? { label, kind, moveRef } : { label, kind };
}

export function day(
  n: number,
  title: string,
  tasks: Array<Omit<Task, 'id'>>,
  isRest = false,
): Day {
  return {
    n,
    title,
    isRest,
    tasks: tasks.map((task, i) => ({ ...task, id: `d${n}-t${i + 1}` })),
  };
}
