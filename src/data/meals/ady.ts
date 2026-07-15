import type { MealPlan } from './types';

const FASTING_NOTE =
  'Fasting-friendly — skip breakfast, hydrate with water / unsweetened tea / zobo, and eat lunch & supper. Optional; never force it.';

export const adyMeals: MealPlan = {
  personId: 'ady',
  intro:
    'Fat-loss focused. Tuesday and Friday are optional "fasting-friendly" days — skip breakfast if it suits you and eat within lunch–supper. Never force it, and drink plenty of water.',
  week: [
    {
      day: 'Monday',
      breakfast: [
        'Greek yogurt + pawpaw + a little oats & groundnut',
        'Akara (little oil) + pap',
        'Boiled yam + garden-egg & egg sauce',
      ],
      lunch: [
        'Veg-loaded jollof rice + grilled chicken',
        'Beans + baked plantain',
        'Amala + efo riro + fish',
      ],
      supper: [
        'Catfish pepper soup',
        'Garden-egg & cucumber salad + tuna',
        'Grilled fish + steamed veg',
      ],
    },
    {
      day: 'Tuesday',
      fasting: FASTING_NOTE,
      lunch: [
        'Brown rice + tomato stew + fish + steamed veg',
        'Beans porridge + veg',
        'Ofada rice + sauce + fish',
      ],
      supper: [
        'Efo riro + small eba',
        'Greek yogurt + fruit',
        'Boiled plantain + garden-egg sauce + fish',
      ],
    },
    {
      day: 'Wednesday',
      breakfast: [
        'Oats + banana + groundnut',
        'Moi moi + pap',
        'Wholemeal bread + veg omelette + unsweetened tea',
      ],
      lunch: [
        'White rice + stew + grilled chicken + veg',
        'Yam porridge (asaro) + fish',
        'Small eba + edikaikong + fish',
      ],
      supper: [
        'Grilled fish + salad',
        'Chicken pepper soup',
        'Moi moi + pap',
      ],
    },
    {
      day: 'Thursday',
      breakfast: [
        'Greek yogurt + pineapple + oats',
        'Boiled plantain + egg sauce',
        'Sweet potato + egg sauce',
      ],
      lunch: [
        'Jollof spaghetti + veg + egg',
        'Beans + baked plantain',
        'Rice + fish stew + garden egg',
      ],
      supper: [
        'Okra soup + small swallow + fish',
        'Cucumber-carrot-cabbage salad + sardine',
        'Boiled fish + steamed veg',
      ],
    },
    {
      day: 'Friday',
      fasting: FASTING_NOTE,
      lunch: [
        'Amala + ewedu & gbegiri + lean beef or fish',
        'Brown rice + stew + chicken + veg',
        'Beans + small garri',
      ],
      supper: [
        'Fish pepper soup',
        'Greek yogurt + fruit',
        'Grilled fish + steamed veg',
      ],
    },
    {
      day: 'Saturday',
      breakfast: [
        'Akara + pap',
        'Wholemeal bread + boiled eggs + unsweetened tea',
        'Greek yogurt + fruit + groundnut',
      ],
      lunch: [
        'Ofada rice + sauce + fish',
        'Veg-loaded jollof rice + chicken',
        'Wheat + vegetable soup + fish',
      ],
      supper: [
        'Roasted plantain (boli) + fish + pepper sauce',
        'Vegetable soup + small eba',
        'Salad + tuna',
      ],
    },
    {
      day: 'Sunday',
      breakfast: [
        'Moi moi + pap',
        'Boiled yam + egg sauce',
        'Oats + Greek yogurt + banana',
      ],
      lunch: [
        'Rice + stew + chicken + moi moi + veg',
        'Small fufu + native vegetable soup + fish',
        'Beans + boiled plantain',
      ],
      supper: [
        'Lean goat pepper soup',
        'Grilled fish + salad',
        'Greek yogurt + fruit',
      ],
    },
  ],
};
