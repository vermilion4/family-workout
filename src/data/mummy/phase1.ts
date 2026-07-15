import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase1: Phase = {
  n: 1,
  name: 'Gentle Start',
  subtitle: 'build a walking habit, no strain',
  days: [
    day(1, 'Ease in', [
      t('2 min gentle march', 'other', 'march-in-place'),
      t('8 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(2, 'Gentle walk', [
      t('10 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(3, 'Walk + gentle strength', [
      t('2 min gentle march', 'other', 'march-in-place'),
      t('10 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×5', 'strength', 'wall-pushup'),
      t('Heel raises 2×8', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(4, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 3 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(5, 'Walk + gentle strength', [
      t('10 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×6', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 2×6 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 2×8', 'strength', 'heel-raises'),
    ]),
    day(6, 'Longer easy walk', [
      t('12 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(7, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(8, 'Walk + stretch', [
      t('2 min gentle march', 'other', 'march-in-place'),
      t('12 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(9, 'Gentle walk', [
      t('12 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(10, 'Walk + gentle strength', [
      t('12 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×6', 'strength', 'wall-pushup'),
      t('Heel raises 2×10', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(11, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(12, 'Walk + gentle strength', [
      t('12 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×7', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 2×8 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 2×10', 'strength', 'heel-raises'),
    ]),
    day(13, 'Longer easy walk', [
      t('14 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(14, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(15, 'Walk + stretch', [
      t('2 min gentle march', 'other', 'march-in-place'),
      t('14 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(16, 'Gentle walk', [
      t('14 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 3 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(17, 'Walk + gentle strength', [
      t('14 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×7', 'strength', 'wall-pushup'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(18, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(19, 'Walk + gentle strength', [
      t('14 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×8', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 2×8 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
    ]),
    day(20, 'Longer easy walk', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(21, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(22, 'Walk + stretch', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(23, 'Gentle walk', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(24, 'Walk + gentle strength', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×6', 'strength', 'wall-pushup'),
      t('Heel raises 3×10', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(25, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(26, 'Walk + gentle strength', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×7', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×8 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×10', 'strength', 'heel-raises'),
    ]),
    day(27, 'Longer easy walk', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(28, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(29, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 2×8', 'strength', 'wall-pushup'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(30, 'Check-in + celebrate', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t("Notice how much easier Week 1's walk feels now 🎉", 'other'),
    ]),
  ],
};
