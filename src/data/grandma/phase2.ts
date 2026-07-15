import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase2: Phase = {
  n: 2,
  name: 'Stronger Every Week',
  subtitle: 'build strength, balance & stamina',
  days: [
    day(31, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×10', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×9', 'strength', 'wall-pushup'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
    ]),
    day(32, 'Walk + core', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 12 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×10 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(33, 'Walk + balance', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 20s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 16 steps', 'balance', 'balance-work'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(34, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(35, 'Walk + strength', [
      t('22 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×11', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(36, 'Longer walk', [
      t('25 min comfortable walk with a few 1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(37, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(38, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×11', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×10', 'strength', 'wall-pushup'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(39, 'Walk + core', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 12 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×10 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(40, 'Walk + balance', [
      t('24 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 20s each side, eyes forward', 'balance', 'balance-work'),
      t('Heel-to-toe walk 18 steps', 'balance', 'balance-work'),
      t('Heel raises 3×14', 'strength', 'heel-raises'),
    ]),
    day(41, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(42, 'Walk + strength', [
      t('24 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×12', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×11', 'strength', 'wall-pushup'),
      t('Heel raises 3×15', 'strength', 'heel-raises'),
    ]),
    day(43, 'Longer walk', [
      t('26 min walk with 3×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(44, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(45, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×12', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×11', 'strength', 'wall-pushup'),
      t('Heel raises 3×15', 'strength', 'heel-raises'),
    ]),
    day(46, 'Walk + core', [
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 14 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×12 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(47, 'Walk + balance', [
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 25s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 20 steps', 'balance', 'balance-work'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(48, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(49, 'Walk + strength', [
      t('26 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×12', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(50, 'Longer walk', [
      t('28 min walk with 4×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(51, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(52, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×12', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(53, 'Walk + core', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 14 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 3×12 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(54, 'Walk + balance', [
      t('28 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 25s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 22 steps', 'balance', 'balance-work'),
      t('Heel raises 3×16', 'strength', 'heel-raises'),
    ]),
    day(55, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 6 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(56, 'Walk + strength', [
      t('28 min brisk walk', 'cardio', 'power-walk'),
      t('Sit-to-stands 3×13', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×12', 'strength', 'wall-pushup'),
      t('Heel raises 3×18', 'strength', 'heel-raises'),
    ]),
    day(57, 'Longer walk', [
      t('30 min walk with 4×1-min brisker pickups', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(58, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(59, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('26 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×12', 'strength', 'sit-to-stand'),
      t('Wonder Core ×2: 14 crunch', 'core', 'wonder-core-crunch'),
      t('Balance work: one-foot holds 25s each side', 'balance', 'balance-work'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(60, 'Check-in + celebrate', [
      t('30 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t("See how much stronger and steadier you've become 🎉", 'other'),
    ]),
  ],
};
