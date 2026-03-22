export const DAYS = [
    {
      id: 'mon', label: 'Mon', title: 'Lower Body', type: 'training',
      calories: 1650, protein: 135,
      meals: [
        { slot: 'Breakfast', name: 'Protein oats', desc: '½ cup oats, 1 scoop protein powder, almond milk, mixed berries', cal: 370, protein: 32 },
        { slot: 'Lunch',     name: 'Salmon rice bowl', desc: 'Salmon, white rice, edamame, cucumber, soy/sesame dressing', cal: 460, protein: 38 },
        { slot: 'Pre-WO',   name: 'Apple + almond butter', desc: '1 apple, 1 tbsp almond butter', cal: 180, protein: 4 },
        { slot: 'Post-WO',  name: 'Whey shake', desc: '1 scoop whey in water or almond milk', cal: 130, protein: 25 },
        { slot: 'Dinner',   name: 'Chicken + rice + veg', desc: 'Chicken breast, white rice, roasted broccoli + bell pepper, olive oil', cal: 480, protein: 42 },
      ],
    },
    {
      id: 'tue', label: 'Tue', title: 'Upper Push', type: 'training',
      calories: 1650, protein: 135,
      meals: [
        { slot: 'Breakfast', name: 'Oikos yogurt bowl', desc: 'Oikos protein yogurt, protein granola, sliced banana', cal: 350, protein: 28 },
        { slot: 'Lunch',     name: 'Chicken rice bowl', desc: 'Chicken breast, white rice, roasted zucchini + cherry tomatoes, olive oil', cal: 450, protein: 40 },
        { slot: 'Pre-WO',   name: 'Banana + string cheese', desc: '1 banana, 1 string cheese', cal: 175, protein: 9 },
        { slot: 'Post-WO',  name: 'Whey shake', desc: '1 scoop whey in water or almond milk', cal: 130, protein: 25 },
        { slot: 'Dinner',   name: 'Shrimp stir fry + rice', desc: 'Shrimp, broccoli, snap peas, soy sauce, white rice', cal: 460, protein: 38 },
      ],
    },
    {
      id: 'wed', label: 'Wed', title: 'Rest Day', type: 'rest',
      calories: 1400, protein: 125,
      meals: [
        { slot: 'Breakfast', name: 'Eggs + toast', desc: '2 eggs + 2 whites, sautéed spinach, whole grain toast', cal: 360, protein: 30 },
        { slot: 'Lunch',     name: 'Salmon rice bowl', desc: 'Salmon, white rice, edamame, cucumber, soy/sesame dressing', cal: 460, protein: 38 },
        { slot: 'Snack',     name: 'Oikos yogurt + berries', desc: 'Oikos protein yogurt, handful of berries', cal: 160, protein: 18 },
        { slot: 'Dinner',    name: 'Ground turkey + rice + veg', desc: 'Lean ground turkey, white rice, roasted zucchini + bell pepper', cal: 450, protein: 40 },
      ],
    },
    {
      id: 'thu', label: 'Thu', title: 'Upper Pull', type: 'training',
      calories: 1650, protein: 135,
      meals: [
        { slot: 'Breakfast', name: 'Protein oats', desc: '½ cup oats, 1 scoop protein powder, almond milk, mixed berries', cal: 370, protein: 32 },
        { slot: 'Lunch',     name: 'Tuna wrap', desc: 'Canned tuna, avocado, spinach, whole wheat tortilla', cal: 400, protein: 36 },
        { slot: 'Pre-WO',   name: 'Apple + almond butter', desc: '1 apple, 1 tbsp almond butter', cal: 180, protein: 4 },
        { slot: 'Post-WO',  name: 'Whey shake', desc: '1 scoop whey in water or almond milk', cal: 130, protein: 25 },
        { slot: 'Dinner',   name: 'Chicken + rice + veg', desc: 'Chicken breast, white rice, roasted broccoli + bell pepper, olive oil', cal: 480, protein: 42 },
      ],
    },
    {
      id: 'fri', label: 'Fri', title: 'HIIT Day', type: 'training',
      calories: 1650, protein: 135,
      meals: [
        { slot: 'Breakfast', name: 'Oikos yogurt bowl', desc: 'Oikos protein yogurt, protein granola, sliced banana', cal: 350, protein: 28 },
        { slot: 'Lunch',     name: 'Chicken rice bowl', desc: 'Chicken breast, white rice, roasted zucchini + cherry tomatoes, olive oil', cal: 450, protein: 40 },
        { slot: 'Pre-WO',   name: 'Banana + string cheese', desc: '1 banana, 1 string cheese', cal: 175, protein: 9 },
        { slot: 'Post-WO',  name: 'Whey shake', desc: '1 scoop whey in water or almond milk', cal: 130, protein: 25 },
        { slot: 'Dinner',   name: 'Shrimp stir fry + rice', desc: 'Shrimp, broccoli, snap peas, soy sauce, white rice', cal: 460, protein: 38 },
      ],
    },
    {
      id: 'sat', label: 'Sat', title: 'Rest Day', type: 'rest',
      calories: 1400, protein: 125,
      meals: [
        { slot: 'Breakfast', name: 'Eggs + toast', desc: '2 eggs + 2 whites, sautéed spinach, whole grain toast', cal: 360, protein: 30 },
        { slot: 'Lunch',     name: 'Salmon rice bowl', desc: 'Salmon, white rice, edamame, cucumber, soy/sesame dressing', cal: 460, protein: 38 },
        { slot: 'Snack',     name: 'Oikos yogurt + berries', desc: 'Oikos protein yogurt, handful of berries', cal: 160, protein: 18 },
        { slot: 'Dinner',    name: 'Ground turkey + rice + veg', desc: 'Lean ground turkey, white rice, roasted zucchini + bell pepper', cal: 450, protein: 40 },
      ],
    },
    {
      id: 'sun', label: 'Sun', title: 'Rest Day', type: 'rest',
      calories: 1400, protein: 125,
      meals: [
        { slot: 'Breakfast', name: 'Protein oats', desc: '½ cup oats, 1 scoop protein powder, almond milk, mixed berries', cal: 370, protein: 32 },
        { slot: 'Lunch',     name: 'Tuna wrap', desc: 'Canned tuna, avocado, spinach, whole wheat tortilla', cal: 400, protein: 36 },
        { slot: 'Snack',     name: 'Apple + almond butter', desc: '1 apple, 1 tbsp almond butter', cal: 180, protein: 4 },
        { slot: 'Dinner',    name: 'Chicken + rice + veg', desc: 'Chicken breast, white rice, roasted broccoli + bell pepper, olive oil', cal: 480, protein: 42 },
      ],
    },
  ]
  
  export const GROCERY = [
    {
      category: 'Proteins',
      items: [
        'Salmon fillets',
        'Chicken breast',
        'Lean ground turkey',
        'Shrimp',
        'Canned tuna (3–4 cans)',
        'Eggs (1 dozen)',
        'Oikos protein yogurt (6–7)',
        'String cheese',
        'Whey protein powder',
      ],
    },
    {
      category: 'Produce',
      items: [
        'Spinach',
        'Broccoli',
        'Zucchini',
        'Bell peppers',
        'Snap peas',
        'Cherry tomatoes',
        'Cucumber',
        'Avocado (2)',
        'Banana (5)',
        'Apple (3)',
        'Mixed berries',
      ],
    },
    {
      category: 'Grains & Carbs',
      items: [
        'White rice',
        'Oats (protein oats)',
        'Protein granola',
        'Whole wheat tortillas',
        'Whole grain bread',
        'Edamame (frozen)',
      ],
    },
    {
      category: 'Pantry',
      items: [
        'Olive oil',
        'Almond butter',
        'Almond milk',
        'Soy sauce',
        'Sesame dressing',
        'Protein powder',
      ],
    },
  ]
  