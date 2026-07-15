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
};

export function getMove(ref?: string): Move | undefined {
  return ref ? EXERCISES[ref] : undefined;
}
