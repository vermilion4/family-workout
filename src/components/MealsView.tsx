import type { MealPlan, DayMeals } from '../data/meals/types';
import { FOOD_MATTERS, MEAL_PRINCIPLES, MEAL_DISCLAIMER } from '../data/meals/principles';
import '../styles/Meals.css';

const SLOT_HINT = 'Pick one — swap freely if it isn’t in the house.';

function MealSlot({ label, icon, options }: { label: string; icon: string; options: string[] }) {
  return (
    <div className={`meals__slot meals__slot--${label.toLowerCase()}`}>
      <h4 className="meals__slotlabel">
        <span className="meals__sloticon" aria-hidden>{icon}</span>
        {label}
      </h4>
      <p className="meals__hint">{SLOT_HINT}</p>
      <ul className="meals__options">
        {options.map((opt) => (
          <li key={opt} className="meals__chip">{opt}</li>
        ))}
      </ul>
    </div>
  );
}

function DayCard({ day, isToday }: { day: DayMeals; isToday: boolean }) {
  return (
    <section className={`meals__day${isToday ? ' meals__day--today' : ''}`} aria-labelledby={`meals-day-${day.day}`}>
      <div className="meals__daytop">
        <h3 className="meals__dayname" id={`meals-day-${day.day}`}>{day.day}</h3>
        {isToday && <span className="meals__todaybadge">Today</span>}
      </div>
      {day.fasting && (
        <div className="meals__fasting">
          <span className="meals__fastingbadge">Fasting-friendly</span>
          <p className="meals__fastingnote">{day.fasting}</p>
        </div>
      )}
      {day.breakfast && <MealSlot label="Breakfast" icon="🍳" options={day.breakfast} />}
      <MealSlot label="Lunch" icon="🍲" options={day.lunch} />
      <MealSlot label="Supper" icon="🌙" options={day.supper} />
    </section>
  );
}

export function MealsView({ plan, todayWeekday }: { plan: MealPlan; todayWeekday?: string }) {
  return (
    <div className="meals">
      <div className="meals__banner">
        <span className="meals__bannericon" aria-hidden>🥗</span>
        <p>{FOOD_MATTERS}</p>
      </div>

      <p className="meals__intro">{plan.intro}</p>

      <details className="meals__principles" open>
        <summary>Meal principles</summary>
        <ul>
          {MEAL_PRINCIPLES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </details>

      <div className="meals__week">
        {plan.week.map((day) => (
          <DayCard key={day.day} day={day} isToday={day.day === todayWeekday} />
        ))}
      </div>

      <p className="meals__disclaimer">{MEAL_DISCLAIMER}</p>
    </div>
  );
}
