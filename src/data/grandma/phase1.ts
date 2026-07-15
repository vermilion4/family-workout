import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase1: Phase = {
  n: 1,
  name: 'Find Your Feet',
  subtitle: 'ease into a steady routine',
  days: [
    day(1, 'Ease in', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('15 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(2, 'Walk + light core', [
      t('15 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×1: 8 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 2×8 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(3, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('15 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 2×8', 'strength', 'sit-to-stand'),
      t('Wall push-ups 2×6', 'strength', 'wall-pushup'),
      t('Heel raises 2×10', 'strength', 'heel-raises'),
    ]),
    day(4, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(5, 'Walk + balance', [
      t('15 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 10s each side', 'balance', 'balance-work'),
      t('Heel raises 2×10', 'strength', 'heel-raises'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(6, 'Longer walk', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(7, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(8, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 2×9', 'strength', 'sit-to-stand'),
      t('Wall push-ups 2×7', 'strength', 'wall-pushup'),
      t('Heel raises 2×10', 'strength', 'heel-raises'),
    ]),
    day(9, 'Walk + light core', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×1: 10 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 2×9 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(10, 'Walk + balance', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 12s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 10 steps', 'balance', 'balance-work'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(11, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 4 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(12, 'Walk + strength', [
      t('16 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 2×10', 'strength', 'sit-to-stand'),
      t('Wall push-ups 2×8', 'strength', 'wall-pushup'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
    ]),
    day(13, 'Longer walk', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(14, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(15, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 2×10', 'strength', 'sit-to-stand'),
      t('Wall push-ups 2×8', 'strength', 'wall-pushup'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
    ]),
    day(16, 'Walk + core', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 8 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 2×10 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(17, 'Walk + balance', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 15s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 12 steps', 'balance', 'balance-work'),
      t('Heel raises 2×12', 'strength', 'heel-raises'),
    ]),
    day(18, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(19, 'Walk + strength', [
      t('18 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×8', 'strength', 'sit-to-stand'),
      t('Wall push-ups 2×9', 'strength', 'wall-pushup'),
      t('Heel raises 3×10', 'strength', 'heel-raises'),
    ]),
    day(20, 'Longer walk', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(21, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(22, 'Walk + strength', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×9', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×8', 'strength', 'wall-pushup'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
    ]),
    day(23, 'Walk + core', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Wonder Core ×2: 10 crunch', 'core', 'wonder-core-crunch'),
      t('Standing twists 2×10 per side', 'core', 'standing-twist'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
    ]),
    day(24, 'Walk + balance', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Balance work: one-foot holds 15s each side', 'balance', 'balance-work'),
      t('Heel-to-toe walk 14 steps', 'balance', 'balance-work'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
    ]),
    day(25, 'Recovery', [
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Easy breathing 5 min', 'other', 'breathing'),
      t('Massager', 'other'),
    ]),
    day(26, 'Walk + strength', [
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×10', 'strength', 'sit-to-stand'),
      t('Wall push-ups 3×9', 'strength', 'wall-pushup'),
      t('Heel raises 3×12', 'strength', 'heel-raises'),
    ]),
    day(27, 'Longer walk', [
      t('22 min comfortable walk (a little brisker if it feels good)', 'cardio', 'comfortable-walk'),
      t('Gentle stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
    ]),
    day(28, 'Rest', [
      t('Full rest — rest days are part of the plan', 'rest'),
    ], true),
    day(29, 'Feel-good session', [
      t('3 min gentle march', 'other', 'march-in-place'),
      t('20 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Sit-to-stands 3×10', 'strength', 'sit-to-stand'),
      t('Wonder Core ×2: 10 crunch', 'core', 'wonder-core-crunch'),
      t('Balance work: one-foot holds 15s each side', 'balance', 'balance-work'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
    ]),
    day(30, 'Check-in + celebrate', [
      t('22 min comfortable walk', 'cardio', 'comfortable-walk'),
      t('Gentle full stretch', 'other', 'gentle-stretch'),
      t('Massager', 'other'),
      t('Notice how much steadier and stronger you feel already 🎉', 'other'),
    ]),
  ],
};
