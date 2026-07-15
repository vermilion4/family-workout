import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase3: Phase = {
  n: 3,
  name: 'Steady & Strong',
  subtitle: 'a routine to keep for good',
  days: [
    day(61, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Heel raises 3×15', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(62, 'Gentle walk + mobility', [
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(63, 'Walk + gentle core', [
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×7 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(64, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(65, 'Walk + strength', [
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×11', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×10 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(66, 'Longer walk', [
      t('28 min comfortable walk (a touch brisker if it feels good)', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(67, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(68, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×11', 'strength', 'wall-pushup'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(69, 'Gentle walk + mobility', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(70, 'Walk + gentle core', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×8 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(71, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(72, 'Walk + strength', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×12 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(73, 'Longer walk', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(74, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(75, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(76, 'Gentle walk + mobility', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(77, 'Walk + gentle core', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×8 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(78, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(79, 'Walk + strength', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×12 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(80, 'Longer walk', [
      t('32 min comfortable walk (a touch brisker if it feels good)', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(81, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(82, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(83, 'Gentle walk + mobility', [
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(84, 'Walk + gentle core', [
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×10 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(85, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(86, 'Walk + strength', [
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×12 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(87, 'Longer walk', [
      t('34 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(88, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(89, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Gentle assisted Wonder Core crunch 2×10 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(90, 'Celebrate 90 days', [
      t('35 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t("Look back at Week 1 and be proud of how far you've come 🎉", 'other'),
    ]),
  ],
};
