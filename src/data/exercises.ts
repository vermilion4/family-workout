export interface Move { name: string; how: string }

export const EXERCISES: Record<string, Move> = {
  'wonder-core-crunch': { name: 'Wonder Core Crunch', how: 'Sit, feet flat. Press your lower back into the pad and curl up as you breathe out. Let the springs guide you back — don’t flop.' },
  'twist-crunch': { name: 'Twist Crunch', how: 'Same curl, but drive one shoulder toward the opposite hip. Alternate sides each rep — this hits your obliques (side abs).' },
  'pushup-handles': { name: 'Push-up (handles)', how: 'Grip the handles on the floor, body in a straight line. Lower your chest, push back up. On your knees is perfect to start.' },
  'low-crunch': { name: 'Low Crunch', how: 'Recline a little more and focus on drawing your knees / lower body up. Targets the lower belly. Small, controlled squeezes.' },
  'plank': { name: 'Plank', how: 'Forearms & toes, body one straight line — squeeze belly and glutes. Drop to knees if needed. Even 10 seconds counts.' },
  'side-plank': { name: 'Side Plank', how: 'On one forearm, body stacked and straight, hips lifted. Hold, then switch sides. Bend the bottom knee down to make it easier.' },
  'bicycle-crunch': { name: 'Bicycle Crunch', how: 'On your back, hands by ears. Bring one knee in and the opposite elbow toward it, then switch — like slow pedalling.' },
  'leg-raises': { name: 'Leg Raises', how: 'On your back, hands under your lower back. Lift legs up, lower slowly — stop before your back arches. Bend knees to ease it.' },
  'flutter-kicks': { name: 'Flutter Kicks', how: 'Legs straight and low off the floor, small quick alternating up-down kicks. Keep your lower back pressed down the whole time.' },
  'russian-twist': { name: 'Russian Twist', how: 'Sit, lean back slightly, knees bent. Clasp hands and rotate side to side, tapping near each hip. Keep the movement controlled.' },
  'mountain-climbers': { name: 'Mountain Climbers', how: 'Start in a plank. Drive one knee toward your chest, then switch quickly — like running in place. Go slower to make it gentler.' },
  'power-walk': { name: 'Power Walk', how: 'Walk fast enough that talking gets a little hard. Stand tall, pump your arms. This is your fat-burning zone — and easy on the knees.' },
  'comfortable-walk': { name: 'Comfortable Walk', how: 'Walk on the treadmill (no incline) at a steady, easy pace — you can still chat comfortably. Stand tall, relax your shoulders, land softly. Gentle on the knees.' },
  'march-in-place': { name: 'Gentle March', how: 'Stand tall and hold the treadmill rail or a wall if you like. Lift one knee to a comfortable height, lower it, then the other — a slow, soft march to warm up. No bouncing.' },
  'wall-pushup': { name: 'Wall Push-up', how: 'Stand about an arm’s length from a wall, hands flat on it at shoulder height. Bend your elbows to bring your chest toward the wall, then push back. Keep your body gently straight. Easy on wrists and knees.' },
  'heel-raises': { name: 'Heel Raises', how: 'Stand tall, holding a wall or rail for balance. Rise up onto your toes, then lower slowly under control. Great for calves and ankles.' },
  'side-leg-lift': { name: 'Standing Side-Leg Lift', how: 'Hold a wall or rail. Lift one leg out to the side a small, comfortable way, keeping it fairly straight, then lower slowly. Switch sides. Works the hips without bending the knees.' },
  'gentle-stretch': { name: 'Gentle Stretch', how: 'Slow, easy stretches for your legs, back, shoulders and neck. Never bounce and never stretch into pain — just an easy, comfortable pull, breathing throughout.' },
  'breathing': { name: 'Easy Breathing', how: 'Sit or stand tall. Breathe in slowly through your nose and feel your ribs widen; breathe out gently and slowly. A calm way to wake up your deep core with no strain at all.' },
  'gentle-crunch': { name: 'Gentle Assisted Crunch', how: 'Sit on the Wonder Core with your back fully supported and let the springs do the work. Curl up only a small, comfortable amount as you breathe out — slow and controlled. Keep it light, and STOP right away if you feel any tummy pain or pulling.' },
};

export function getMove(ref?: string): Move | undefined {
  return ref ? EXERCISES[ref] : undefined;
}
