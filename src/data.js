export const DAYS = [
  {
    id: 'day1',
    label: 'Day 1',
    title: 'Lower Body',
    badge: 'Strength',
    badgeType: 'strength',
    finisher: '10 min incline treadmill walk',
    exercises: [
      { id: 'squat',   name: 'Barbell back squat', sets: '4 × 8'     },
      { id: 'rdl',     name: 'Romanian deadlift',  sets: '3 × 10'    },
      { id: 'legpress',name: 'Leg press',          sets: '3 × 12'    },
      { id: 'lunges',  name: 'Walking lunges',     sets: '3 × 12 ea' },
      { id: 'legcurl', name: 'Seated leg curl',    sets: '3 × 12'    },
      { id: 'calf',    name: 'Calf raises',        sets: '4 × 15'    },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    title: 'Upper Push',
    badge: 'Strength',
    badgeType: 'strength',
    finisher: '3 rounds: 15 push-ups + 20 jumping jacks',
    exercises: [
      { id: 'dbench',   name: 'Dumbbell bench press',   sets: '4 × 8'  },
      { id: 'ohp',      name: 'Overhead press',         sets: '3 × 10' },
      { id: 'incline',  name: 'Incline DB press',       sets: '3 × 10' },
      { id: 'lateral',  name: 'Cable lateral raise',    sets: '3 × 15' },
      { id: 'triceppush',name:'Tricep rope pushdown',   sets: '3 × 12' },
      { id: 'tricepext',name: 'Overhead tricep ext.',   sets: '3 × 12' },
    ],
  },
  {
    id: 'day3',
    label: 'Day 3',
    title: 'Upper Pull',
    badge: 'Strength',
    badgeType: 'strength',
    finisher: '15 min steady-state bike or row',
    exercises: [
      { id: 'latpull',  name: 'Lat pulldown',         sets: '4 × 10'    },
      { id: 'cablerow', name: 'Seated cable row',      sets: '3 × 10'    },
      { id: 'dbrow',    name: 'Single-arm DB row',     sets: '3 × 10 ea' },
      { id: 'facepull', name: 'Face pulls',            sets: '3 × 15'    },
      { id: 'curl',     name: 'Dumbbell curl',         sets: '3 × 12'    },
      { id: 'hammer',   name: 'Hammer curl',           sets: '3 × 12'    },
    ],
  },
  {
    id: 'day4',
    label: 'Day 4',
    title: 'Full Body HIIT',
    badge: 'Full Body',
    badgeType: 'hiit',
    finisher: '10 min HIIT — 30s on / 30s off (sprint or bike)',
    exercises: [
      { id: 'goblet',   name: 'Goblet squat',       sets: '3 × 15'    },
      { id: 'kbswing',  name: 'Kettlebell swing',   sets: '4 × 15'    },
      { id: 'thruster', name: 'Dumbbell thruster',  sets: '3 × 12'    },
      { id: 'stepup',   name: 'Box step-ups',       sets: '3 × 12 ea' },
      { id: 'plank',    name: 'Plank',              sets: '3 × 45s'   },
      { id: 'mountain', name: 'Mountain climbers',  sets: '3 × 30s'   },
    ],
  },
]

export const ALL_EXERCISES = DAYS.flatMap(d =>
  d.exercises.map(e => ({ ...e, dayId: d.id, dayTitle: d.title }))
)

export const STORAGE_KEY = 'qm-workout-log-v1'
