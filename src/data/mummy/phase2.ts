import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase2: Phase = {
  n: 2,
  name: 'Building Up',
  subtitle: 'longer walks, gentle core introduced',
  days: [
    day(31, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×8', 'strength', 'wall-pushup'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(32, 'Gentle walk + mobility', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(33, 'Walk + first gentle core', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 1×5 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(34, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(35, 'Walk + strength', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×8', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×8 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
    ]),
    day(36, 'Longer walk', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(37, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(38, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×8', 'strength', 'wall-pushup'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(39, 'Gentle walk + mobility', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(40, 'Walk + gentle core', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 1×6 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(41, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(42, 'Walk + strength', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×9', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×9 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(43, 'Longer walk', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(44, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(45, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×9', 'strength', 'wall-pushup'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(46, 'Gentle walk + mobility', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(47, 'Walk + gentle core', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×5 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(48, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(49, 'Walk + strength', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×10 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(50, 'Longer walk', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(51, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(52, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Heel raises 3×15', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(53, 'Gentle walk + mobility', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(54, 'Walk + gentle core', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle assisted Wonder Core crunch 2×6 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(55, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(56, 'Walk + strength', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Standing side-leg lifts 3×10 per side', 'strength', 'side-leg-lift'),
      t('Heel raises 3×15', 'strength', 'heel-raises'),
    ]),
    day(57, 'Longer walk', [
      t('25 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(58, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(59, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Gentle assisted Wonder Core crunch 2×6 (stop if any tummy discomfort)', 'core', 'gentle-crunch'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(60, 'Check-in + celebrate', [
      t('25 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t("See how far you've come since Day 1 🎉", 'other'),
    ]),
  ],
};
