import type { Phase } from '../types';
import { t, day } from '../helpers';

export const phase3: Phase = {
  n: 3,
  name: 'Peak',
  subtitle: 'your strongest month — circuits & test days',
  days: [
    day(61, 'Core + Walk', [
      t('Wonder Core ×5: 35 crunch / 28 twist per side / 24 push-up', 'core', 'wonder-core-crunch'),
      t('3×60s plank', 'floor', 'plank'),
      t('36 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(62, 'Intervals', [
      t('36 min: 3 min power walk / 2 min light jog', 'cardio', 'power-walk'),
      t('3×26 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×45s side plank per side', 'floor', 'side-plank'),
      t('3×24 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(63, 'Core focus', [
      t('Wonder Core ×5–6: 35 crunch / 28 twist per side / 24 low crunch', 'core', 'wonder-core-crunch'),
      t('3×26 leg raise', 'floor', 'leg-raises'),
      t('3×65s plank', 'floor', 'plank'),
      t('3×34 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(64, 'Recovery walk', [
      t('36 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(65, 'Core + Walk', [
      t('Wonder Core ×6: 38 crunch / 30 twist per side / 24 push-up', 'core', 'wonder-core-crunch'),
      t('36 min brisk walk', 'cardio', 'power-walk'),
      t('3×65s plank', 'floor', 'plank'),
    ]),
    day(66, 'Longer walk / intervals', [
      t('40 min brisk walk with 7×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×60s plank', 'floor', 'plank'),
      t('3×24 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(67, 'Rest', [
      t('Full rest or gentle walk + stretch', 'rest'),
    ], true),
    day(68, 'Core + Walk', [
      t('Wonder Core ×6: 38 crunch / 30 twist per side / 26 push-up', 'core', 'wonder-core-crunch'),
      t('3×65s plank', 'floor', 'plank'),
      t('38 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(69, 'Intervals', [
      t('38 min: 2 min power walk / 2 min light jog', 'cardio', 'power-walk'),
      t('3×28 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×45s side plank per side', 'floor', 'side-plank'),
      t('3×26 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(70, 'Core focus', [
      t('Wonder Core ×6: 38 crunch / 30 twist per side / 26 low crunch', 'core', 'wonder-core-crunch'),
      t('3×28 leg raise', 'floor', 'leg-raises'),
      t('3×70s plank', 'floor', 'plank'),
      t('3×36 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(71, 'Recovery walk', [
      t('38 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(72, 'Core + Walk', [
      t('Wonder Core ×6: 40 crunch / 32 twist per side / 26 push-up', 'core', 'wonder-core-crunch'),
      t('38 min brisk walk', 'cardio', 'power-walk'),
      t('3×65s plank', 'floor', 'plank'),
    ]),
    day(73, 'Longer walk / intervals', [
      t('42 min brisk walk with 7×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×65s plank', 'floor', 'plank'),
      t('3×26 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(74, 'Rest', [
      t('Full rest', 'rest'),
    ], true),
    day(75, 'Core + Walk', [
      t('Wonder Core ×6: 40 crunch / 32 twist per side / 28 push-up', 'core', 'wonder-core-crunch'),
      t('3×70s plank', 'floor', 'plank'),
      t('40 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(76, 'Intervals', [
      t('40 min: 2 min power walk / 2–3 min light jog', 'cardio', 'power-walk'),
      t('3×30 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×50s side plank per side', 'floor', 'side-plank'),
      t('3×28 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(77, 'Core focus', [
      t('Wonder Core ×6: 40 crunch / 32 twist per side / 28 low crunch', 'core', 'wonder-core-crunch'),
      t('3×30 leg raise', 'floor', 'leg-raises'),
      t('3×75s plank', 'floor', 'plank'),
      t('3×40 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(78, 'Recovery walk', [
      t('40 min easy walk', 'cardio', 'power-walk'),
      t('Full stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(79, 'Core + Walk', [
      t('Wonder Core ×6: 42 crunch / 34 twist per side / 28 push-up', 'core', 'wonder-core-crunch'),
      t('40 min brisk walk', 'cardio', 'power-walk'),
      t('3×70s plank', 'floor', 'plank'),
    ]),
    day(80, 'Longer walk / intervals', [
      t('44 min brisk walk with 8×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×70s plank', 'floor', 'plank'),
      t('3×28 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(81, 'Rest', [
      t('Full rest or gentle walk', 'rest'),
    ], true),
    day(82, 'Core + Walk', [
      t('Wonder Core ×6: 42 crunch / 34 twist per side / 30 push-up', 'core', 'wonder-core-crunch'),
      t('3×75s plank', 'floor', 'plank'),
      t('42 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(83, 'Intervals', [
      t('42 min: 2 min power walk / 3 min light jog (or all walk)', 'cardio', 'power-walk'),
      t('3×32 bicycle per side', 'floor', 'bicycle-crunch'),
      t('3×50s side plank per side', 'floor', 'side-plank'),
      t('3×30 Russian twist per side', 'floor', 'russian-twist'),
    ]),
    day(84, 'Core focus', [
      t('Wonder Core ×6: 44 crunch / 36 twist per side / 30 low crunch', 'core', 'wonder-core-crunch'),
      t('3×32 leg raise', 'floor', 'leg-raises'),
      t('3×80s plank', 'floor', 'plank'),
      t('3×42 flutter kicks', 'floor', 'flutter-kicks'),
    ]),
    day(85, 'Recovery walk', [
      t('42 min easy walk', 'cardio', 'power-walk'),
      t('Stretch', 'other'),
      t('Massager', 'other'),
    ]),
    day(86, 'Core + Walk', [
      t('Wonder Core ×6: 45 crunch / 36 twist per side / 30 push-up', 'core', 'wonder-core-crunch'),
      t('42 min brisk walk', 'cardio', 'power-walk'),
      t('3×75s plank', 'floor', 'plank'),
    ]),
    day(87, 'Long walk', [
      t('45 min brisk walk with 8×1 min faster pushes', 'cardio', 'power-walk'),
      t('3×75s plank', 'floor', 'plank'),
    ]),
    day(88, 'Rest', [
      t('Full rest', 'rest'),
    ], true),
    day(89, 'Full core circuit', [
      t('5 min walk', 'cardio', 'power-walk'),
      t('4 rounds: 30 crunch / 22 twist per side / 22 bicycle per side / 60s plank / 18 leg raise / 15 push-up', 'core'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
    ]),
    day(90, 'Final test day + celebrate', [
      t('Compare to Day 1 & Day 30: longest plank hold & max crunches in 60s', 'other'),
      t('30 min brisk walk', 'cardio', 'power-walk'),
      t('Full stretch + massager', 'other'),
      t('Final progress photo 🎉', 'other'),
    ]),
  ],
};
