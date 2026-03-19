import React from 'react'
import styles from './DayView.module.css'
import ExerciseRow from './ExerciseRow'

export default function DayView({ day, getEntries, getBest, onAdd, onDelete }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <div className={styles.dayLabel}>{day.label}</div>
          <div className={styles.title}>
            {day.title}
            <span className={`${styles.badge} ${styles[`badge_${day.badgeType}`]}`}>
              {day.badge}
            </span>
          </div>
          <div className={styles.sub}>Tap any exercise to log weight and view history</div>
        </div>
      </div>

      <div className={styles.exercises}>
        {day.exercises.map(ex => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            entries={getEntries(ex.id)}
            best={getBest(ex.id)}
            onAdd={onAdd}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className={styles.finisher}>
        <span className={styles.finisherLabel}>Finisher</span>
        {day.finisher}
      </div>
    </div>
  )
}
