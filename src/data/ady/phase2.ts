import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase2: Phase = {
  n: 2,
  name: 'Momentum',
  subtitle: 'more volume, longer walks, optional light jog',
  days: [
    day(31, 'Core + Walk', [
      t('Wonder Core ×4: 25 crunch / 20 twist per side / 16 push-up', 'core', 'wonder-core-crunch'),
      t('3×45s plank', 'floor', 'plank'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(32, 'Walk intervals', [
      t('30 min: 3 min brisk / 2 min faster power walk', 'cardio', 'power-walk'),
      t('3×20 bicycle crunch per side', 'floor', 'bicycle-crunch'),
      t('3×30s side plank per side', 'floor', 'side-plank'),
    ]),
    day(33, 'Core focus', [
      t('Wonder Core ×4: 25 crunch / 20 twist per side / 16 low crunch', 'core', 'wonder-core-crunch'),
      t('3×18 leg raise', 'floor', 'leg-raises'),
      t('3×50s plank', 'floor', 'plank'),
      t('3×25 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(34, 'Recovery walk', [
      t('30 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(35, 'Core + Walk', [
      t('Wonder Core ×4: 28 crunch / 22 twist per side / 16 push-up', 'core', 'wonder-core-crunch'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('3×50s plank', 'floor', 'plank'),
    ]),
    day(36, 'Longer walk', [
      t('35 min brisk walk with 5×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×45s plank', 'floor', 'plank'),
    ]),
    day(37, 'Rest', [
      t('Full rest or gentle walk + stretch', 'rest'),
    ], true),
    day(38, 'Core + Walk', [
      t('Wonder Core ×4: 28 crunch / 22 twist per side / 18 push-up', 'core', 'wonder-core-crunch'),
      t('3×50s plank', 'floor', 'plank'),
      t('32 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(39, 'Intervals', [
      t('32 min: 3 min power walk / 1 min light jog (or all walk)', 'cardio', 'power-walk'),
      t('3×22 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×35s side plank per side', 'floor', 'side-plank'),
      t('3×18 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(40, 'Core focus', [
      t('Wonder Core ×4–5: 28 crunch / 22 twist per side / 18 low crunch', 'core', 'wonder-core-crunch'),
      t('3×20 leg raise', 'floor', 'leg-raises'),
      t('3×55s plank', 'floor', 'plank'),
      t('3×28 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(41, 'Recovery walk', [
      t('32 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(42, 'Core + Walk', [
      t('Wonder Core ×5: 30 crunch / 24 twist per side / 18 push-up', 'core', 'wonder-core-crunch'),
      t('32 min brisk walk', 'cardio', 'power-walk'),
      t('3×50s plank', 'floor', 'plank'),
    ]),
    day(43, 'Longer walk / intervals', [
      t('36 min brisk walk with 6×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×50s plank', 'floor', 'plank'),
      t('3×18 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(44, 'Rest', [
      t('Full rest', 'rest'),
    ], true),
    day(45, 'Core + Walk', [
      t('Wonder Core ×5: 30 crunch / 24 twist per side / 20 push-up', 'core', 'wonder-core-crunch'),
      t('3×55s plank', 'floor', 'plank'),
      t('34 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(46, 'Intervals', [
      t('34 min: 3 min power walk / 1–2 min light jog', 'cardio', 'power-walk'),
      t('3×24 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×40s side plank per side', 'floor', 'side-plank'),
      t('3×20 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(47, 'Core focus', [
      t('Wonder Core ×5: 30 crunch / 24 twist per side / 20 low crunch', 'core', 'wonder-core-crunch'),
      t('3×22 leg raise', 'floor', 'leg-raises'),
      t('3×60s plank', 'floor', 'plank'),
      t('3×30 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(48, 'Recovery walk', [
      t('34 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(49, 'Core + Walk', [
      t('Wonder Core ×5: 32 crunch / 25 twist per side / 20 push-up', 'core', 'wonder-core-crunch'),
      t('34 min brisk walk', 'cardio', 'power-walk'),
      t('3×55s plank', 'floor', 'plank'),
    ]),
    day(50, 'Longer walk / intervals', [
      t('38 min brisk walk with 6×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×55s plank', 'floor', 'plank'),
      t('3×20 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(51, 'Rest', [
      t('Full rest or gentle walk', 'rest'),
    ], true),
    day(52, 'Core + Walk', [
      t('Wonder Core ×5: 32 crunch / 26 twist per side / 22 push-up', 'core', 'wonder-core-crunch'),
      t('3×60s plank', 'floor', 'plank'),
      t('35 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(53, 'Intervals', [
      t('35 min: 3 min power walk / 2 min light jog (or all walk)', 'cardio', 'power-walk'),
      t('3×25 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×40s side plank per side', 'floor', 'side-plank'),
      t('3×22 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(54, 'Core focus', [
      t('Wonder Core ×5: 34 crunch / 26 twist per side / 22 low crunch', 'core', 'wonder-core-crunch'),
      t('3×24 leg raise', 'floor', 'leg-raises'),
      t('3×60s plank', 'floor', 'plank'),
      t('3×32 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(55, 'Recovery walk', [
      t('35 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(56, 'Core + Walk', [
      t('Wonder Core ×5: 35 crunch / 28 twist per side / 22 push-up', 'core', 'wonder-core-crunch'),
      t('35 min brisk walk', 'cardio', 'power-walk'),
      t('3×60s plank', 'floor', 'plank'),
    ]),
    day(57, 'Long walk', [
      t('40 min brisk walk with 6×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×60s plank', 'floor', 'plank'),
    ]),
    day(58, 'Rest', [
      t('Full rest', 'rest'),
    ], true),
    day(59, 'Full core circuit', [
      t('5 min walk', 'cardio', 'power-walk'),
      t('4 rounds: 25 crunch / 18 twist per side / 18 bicycle per side / 45s plank / 15 leg raise / 12 push-up', 'core'),
      t('25 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(60, 'Test day + check-in', [
      t('Compare to Day 30: longest plank hold & max crunches in 60s (write them down!)', 'other'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('Stretch + massager', 'other'),
      t('Progress photo 🎉', 'other'),
    ]),
  ],
};
