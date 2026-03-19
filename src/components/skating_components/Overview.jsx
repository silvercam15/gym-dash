import React, { useState } from 'react'
import styles from './Overview.module.css'
import ProgressChart from './ProgressChart'
import { DAYS, ALL_EXERCISES } from '../data'

function fmt(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Overview({ getEntries, getBest }) {
  const [selectedId, setSelectedId] = useState(ALL_EXERCISES[0].id)

  const chartData = getEntries(selectedId).map((e, i) => ({
    session: i + 1,
    weight: e.weight,
    reps: e.reps,
    date: fmt(e.ts),
  }))

  const withData = ALL_EXERCISES.filter(e => getBest(e.id) !== null)

  return (
    <div className={styles.wrap}>
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Progressive overload</div>
        <div className={styles.sectionTitle}>Weight over time</div>

        <div className={styles.chartCard}>
          <label className={styles.selectLabel}>Select exercise</label>
          <select
            className={styles.select}
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            {DAYS.map(d => (
              <optgroup key={d.id} label={`${d.label} — ${d.title}`}>
                {d.exercises.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <ProgressChart data={chartData} height={230} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Personal records</div>
        <div className={styles.sectionTitle}>All-time bests</div>
        <div className={styles.prTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Day</th>
                <th>Best weight</th>
                <th>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {withData.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.noData}>
                    No data yet — start logging on the day tabs
                  </td>
                </tr>
              ) : (
                withData
                  .sort((a, b) => (getBest(b.id) || 0) - (getBest(a.id) || 0))
                  .map(ex => (
                    <tr key={ex.id}>
                      <td className={styles.tdName}>{ex.name}</td>
                      <td className={styles.tdDay}>{ex.dayTitle}</td>
                      <td className={styles.tdBest}>{getBest(ex.id)} lbs</td>
                      <td className={styles.tdSessions}>{getEntries(ex.id).length}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
