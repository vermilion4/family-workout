import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase3: Phase = {
  n: 3,
  name: 'Strong & Steady',
  subtitle: 'active, steady & independent',
  days: [
    day(61, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×13', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(62, 'Walk + core', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 15 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×12 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(63, 'Walk + balance', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 30s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 24 steps', 'balance', 'balance-work'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(64, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(65, 'Walk + strength', [
      t('28 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×14', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×13', 'strength', 'wall-pushup'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(66, 'Longer walk', [
      t('30 min walk with 5×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(67, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(68, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×14', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×13', 'strength', 'wall-pushup'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(69, 'Walk + core', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×3: 12 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×12 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(70, 'Walk + balance', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 30s each side, eyes closed if steady (hold chair)', 'balance', 'balance-work'),
      t('Heel-to-toe walk 24 steps', 'balance', 'balance-work'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(71, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(72, 'Walk + strength', [
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×15', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×14', 'strength', 'wall-pushup'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(73, 'Longer walk', [
      t('32 min walk with 5×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(74, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(75, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×15', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×14', 'strength', 'wall-pushup'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(76, 'Walk + core', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×3: 12 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×14 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(77, 'Walk + balance', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 30s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 26 steps', 'balance', 'balance-work'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(78, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 7 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(79, 'Walk + strength', [
      t('32 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×15', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×15', 'strength', 'wall-pushup'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(80, 'Longer walk', [
      t('34 min walk with 6×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(81, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(82, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×15', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×15', 'strength', 'wall-pushup'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(83, 'Walk + core', [
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×3: 14 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×14 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(84, 'Walk + balance', [
      t('32 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 30s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 28 steps', 'balance', 'balance-work'),
      t('Heel raises 3×20', 'strength', 'heel-raises'),
    ]),
    day(85, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 8 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(86, 'Walk + strength', [
      t('32 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×16', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×15', 'strength', 'wall-pushup'),
      t('Heel raises 3×22', 'strength', 'heel-raises'),
    ]),
    day(87, 'Longer walk', [
      t('35 min walk with 6×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(88, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(89, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×15', 'strength', 'sit-to-stand'),
      t('Wonder Core ×3: 14 crunch', 'core', 'wonder-core-crunch'),
      t('Balance work: one-foot holds 30s each side', 'balance', 'balance-work'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(90, 'Celebrate 90 days', [
      t('35 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t('Look back at Day 1 — stronger, steadier and proud 💪🎉', 'other'),
    ]),
  ],
};
