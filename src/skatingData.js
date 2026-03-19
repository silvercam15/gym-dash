export const SKATING_STORAGE_KEY = 'qm-skating-log-v1'

export const LEVELS = [
  {
    id: 'basic1',
    label: 'Basic 1',
    color: 'blue',
    skills: [
      { id: 'march', name: 'Marching in place' },
      { id: 'two_foot_glide', name: 'Two-foot glide' },
      { id: 'dip', name: 'Dip' },
      { id: 'forward_swizzles', name: 'Forward swizzles (6)' },
      { id: 'backward_wiggles', name: 'Backward wiggles (6)' },
      { id: 'snowplow_stop', name: 'Snowplow stop (one foot)' },
    ],
  },
  {
    id: 'basic2',
    label: 'Basic 2',
    color: 'teal',
    skills: [
      { id: 'forward_glide_one', name: 'Forward one-foot glide' },
      { id: 'backward_two_foot', name: 'Backward two-foot glide' },
      { id: 'backward_swizzles', name: 'Backward swizzles (6)' },
      { id: 'two_foot_turn', name: 'Two-foot turn (fwd to bwd)' },
      { id: 'forward_stroking', name: 'Forward stroking' },
    ],
  },
  {
    id: 'basic3',
    label: 'Basic 3',
    color: 'purple',
    skills: [
      { id: 'forward_crossovers', name: 'Forward crossovers' },
      { id: 'backward_one_foot', name: 'Backward one-foot glide' },
      { id: 'moving_snowplow', name: 'Moving snowplow stop' },
      { id: 'hockey_stop', name: 'Beginning hockey stop' },
    ],
  },
  {
    id: 'basic4',
    label: 'Basic 4',
    color: 'amber',
    skills: [
      { id: 'backward_crossovers', name: 'Backward crossovers' },
      { id: 'forward_outside_edge', name: 'Forward outside edge' },
      { id: 'forward_inside_edge', name: 'Forward inside edge' },
      { id: 't_stop', name: 'T-stop' },
    ],
  },
  {
    id: 'basic5',
    label: 'Basic 5',
    color: 'coral',
    skills: [
      { id: 'three_turn_fwd', name: 'Forward outside 3-turn' },
      { id: 'mohawk', name: 'Open mohawk' },
      { id: 'backward_outside_edge', name: 'Backward outside edge' },
      { id: 'beginning_spin', name: 'Beginning two-foot spin' },
    ],
  },
  {
    id: 'basic6',
    label: 'Basic 6',
    color: 'green',
    skills: [
      { id: 'waltz_jump', name: 'Waltz jump' },
      { id: 'toe_loop', name: 'Toe loop' },
      { id: 'one_foot_spin', name: 'One-foot upright spin' },
      { id: 'lunge', name: 'Lunge' },
      { id: 'spiral', name: 'Spiral' },
    ],
  },
  {
    id: 'freestyle1',
    label: 'Freestyle 1',
    color: 'pink',
    skills: [
      { id: 'salchow', name: 'Salchow' },
      { id: 'half_flip', name: 'Half flip' },
      { id: 'scratch_spin', name: 'Scratch spin (3 rev)' },
      { id: 'sit_spin', name: 'Beginning sit spin' },
    ],
  },
]

export const STATUS = {
  not_started: { label: 'Not started', color: 'dim' },
  learning: { label: 'Learning', color: 'amber' },
  practicing: { label: 'Practicing', color: 'blue' },
  mastered: { label: 'Mastered', color: 'accent' },
}

export const ALL_SKILLS = LEVELS.flatMap(l =>
  l.skills.map(s => ({ ...s, levelId: l.id, levelLabel: l.label }))
)
