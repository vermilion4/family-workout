import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase1: Phase = {
  n: 1,
  name: 'Foundation',
  subtitle: 'habit & form, keep it doable',
  days: [
    day(1, 'Core + Walk', [
      t('Warm-up 5 min', 'other'),
      t('Wonder Core ×2: 12 crunch / 8 twist per side / 8 push-up', 'core', 'wonder-core-crunch'),
      t('3×15s plank', 'floor', 'plank'),
      t('15 min brisk walk', 'cardio', 'power-walk'),
      t('Stretch + massager', 'other'),
    ]),
    day(2, 'Walk + light core', [
      t('20 min brisk walk', 'cardio', 'power-walk'),
      t('3×12 bicycle crunch per side', 'floor', 'bicycle-crunch'),
      t('3×15s side plank per side', 'floor', 'side-plank'),
      t('Massager', 'other'),
    ]),
    day(3, 'Core focus', [
      t('5 min warm-up', 'other'),
      t('Wonder Core ×2: 12 crunch / 10 twist per side / 8 low crunch', 'core', 'wonder-core-crunch'),
      t('3×10 leg raise', 'floor', 'leg-raises'),
      t('3×20s plank', 'floor', 'plank'),
    ]),
    day(4, 'Recovery walk', [
      t('20 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('10 min massager', 'other'),
    ]),
    day(5, 'Core + Walk', [
      t('Wonder Core ×2: 15 crunch / 10 twist per side / 10 push-up', 'core', 'wonder-core-crunch'),
      t('20 min brisk walk', 'cardio', 'power-walk'),
      t('2×20s plank', 'floor', 'plank'),
    ]),
    day(6, 'Longer walk', [
      t('25 min brisk walk (steady comfortable-hard)', 'cardio', 'power-walk'),
      t('3×20s plank', 'floor', 'plank'),
      t('Massager', 'other'),
    ]),
    day(7, 'Rest', [
      t('Full rest, or a gentle 15 min stroll + stretch', 'rest'),
    ], true),
    day(8, 'Core + Walk', [
      t('Wonder Core ×2–3: 15 crunch / 12 twist per side / 10 push-up', 'core', 'wonder-core-crunch'),
      t('3×25s plank', 'floor', 'plank'),
      t('22 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(9, 'Walk intervals', [
      t('25 min: alternate 3 min brisk / 2 min faster power walk', 'cardio', 'power-walk'),
      t('3×15 bicycle crunch per side', 'floor', 'bicycle-crunch'),
      t('3×20s side plank per side', 'floor', 'side-plank'),
    ]),
    day(10, 'Core focus', [
      t('Wonder Core ×3: 15 crunch / 12 twist per side / 10 low crunch', 'core', 'wonder-core-crunch'),
      t('3×12 leg raise', 'floor', 'leg-raises'),
      t('3×30s plank', 'floor', 'plank'),
      t('3×15 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(11, 'Recovery walk', [
      t('25 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(12, 'Core + Walk', [
      t('Wonder Core ×3: 18 crunch / 12 twist per side / 12 push-up', 'core', 'wonder-core-crunch'),
      t('25 min brisk walk', 'cardio', 'power-walk'),
      t('3×25s plank', 'floor', 'plank'),
    ]),
    day(13, 'Longer walk', [
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('3×30s plank', 'floor', 'plank'),
    ]),
    day(14, 'Rest', [
      t('Full rest or gentle walk + stretch', 'rest'),
    ], true),
    day(15, 'Core + Walk', [
      t('Wonder Core ×3: 18 crunch / 15 twist per side / 12 push-up (short rests)', 'core', 'wonder-core-crunch'),
      t('3×35s plank', 'floor', 'plank'),
      t('28 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(16, 'Intervals', [
      t('28 min: 3 min power walk / 1 min light jog (or all walk — fine!)', 'cardio', 'power-walk'),
      t('3×18 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×25s side plank per side', 'floor', 'side-plank'),
      t('3×12 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(17, 'Core focus', [
      t('Wonder Core ×3–4: 18 crunch / 15 twist per side / 12 low crunch', 'core', 'wonder-core-crunch'),
      t('3×15 leg raise', 'floor', 'leg-raises'),
      t('3×35s plank', 'floor', 'plank'),
      t('3×20 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(18, 'Recovery walk', [
      t('30 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(19, 'Core + Walk', [
      t('Wonder Core ×4: 20 crunch / 15 twist per side / 12 push-up', 'core', 'wonder-core-crunch'),
      t('28 min brisk walk', 'cardio', 'power-walk'),
      t('3×35s plank', 'floor', 'plank'),
    ]),
    day(20, 'Longer walk / intervals', [
      t('32 min brisk walk with 4×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×40s plank', 'floor', 'plank'),
      t('3×15 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(21, 'Rest', [
      t('Full rest or gentle walk', 'rest'),
    ], true),
    day(22, 'Core + Walk', [
      t('Wonder Core ×4: 20 crunch / 18 twist per side / 15 push-up', 'core', 'wonder-core-crunch'),
      t('3×45s plank', 'floor', 'plank'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(23, 'Intervals', [
      t('30 min: 3 min power walk / 1–2 min light jog (or all walk)', 'cardio', 'power-walk'),
      t('3×20 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×30s side plank per side', 'floor', 'side-plank'),
      t('3×18 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(24, 'Core focus', [
      t('Wonder Core ×4: 22 crunch / 18 twist per side / 15 low crunch', 'core', 'wonder-core-crunch'),
      t('3×18 leg raise', 'floor', 'leg-raises'),
      t('3×45s plank', 'floor', 'plank'),
      t('3×25 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(25, 'Recovery walk', [
      t('30 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(26, 'Core + Walk', [
      t('Wonder Core ×4: 25 crunch / 20 twist per side / 15 push-up', 'core', 'wonder-core-crunch'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('3×45s plank', 'floor', 'plank'),
    ]),
    day(27, 'Long walk', [
      t('35 min brisk walk with 5×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×45s plank', 'floor', 'plank'),
    ]),
    day(28, 'Rest', [
      t('Full rest', 'rest'),
    ], true),
    day(29, 'Full core circuit', [
      t('5 min walk', 'cardio', 'power-walk'),
      t('3 rounds: 20 crunch / 15 twist per side / 15 bicycle per side / 30s plank / 12 leg raise / 10 push-up', 'core'),
      t('20 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(30, 'Test day + celebrate', [
      t('Compare to Day 1: longest plank hold & max crunches in 60s (write them down!)', 'other'),
      t('25 min brisk walk', 'cardio', 'power-walk'),
      t('Stretch + massager', 'other'),
      t('Day-30 progress photo 🎉', 'other'),
    ]),
  ],
};
