import React from 'react'
import styles from './StatsBar.module.css'
import { ALL_EXERCISES } from '../data'

export default function StatsBar({ stats }) {
  const { totalSets, trackedCount, latestDay } = stats

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>Total sets logged</div>
        <div className={styles.value}>{totalSets}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Exercises tracked</div>
        <div className={styles.value}>
          {trackedCount}
          <span className={styles.total}> / {ALL_EXERCISES.length}</span>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Last session</div>
        <div className={styles.value} style={{ fontSize: '1rem' }}>{latestDay}</div>
      </div>
    </div>
  )
}
