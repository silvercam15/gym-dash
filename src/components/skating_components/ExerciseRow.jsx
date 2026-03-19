import React, { useState } from 'react'
import styles from './ExerciseRow.module.css'
import ProgressChart from './ProgressChart'

function fmt(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ExerciseRow({ exercise, entries, best, onAdd, onDelete }) {
  const [open, setOpen] = useState(false)
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')

  const chartData = entries.map((e, i) => ({
    session: i + 1,
    weight: e.weight,
    reps: e.reps,
    date: fmt(e.ts),
  }))

  const handleLog = (e) => {
    e.stopPropagation()
    const ok = onAdd(exercise.id, weight, reps)
    if (ok) { setWeight(''); setReps('') }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.row} ${open ? styles.rowOpen : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className={styles.left}>
          <span className={styles.name}>{exercise.name}</span>
          <span className={styles.sets}>{exercise.sets}</span>
        </div>
        <div className={styles.right}>
          {best !== null && (
            <span className={styles.pr}>{best} lb PR</span>
          )}
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        </div>
      </div>

      {open && (
        <div className={styles.panel}>
          <div className={styles.logForm} onClick={e => e.stopPropagation()}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Weight (lbs)</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                placeholder="95"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Reps</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                placeholder="8"
                value={reps}
                onChange={e => setReps(e.target.value)}
              />
            </div>
            <button className={styles.logBtn} onClick={handleLog}>
              Log set
            </button>
          </div>

          {entries.length === 0 ? (
            <p className={styles.empty}>No entries yet — log your first set above</p>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[...entries].reverse().map((e, i) => (
                    <tr key={i}>
                      <td className={styles.tdDate}>{fmt(e.ts)}</td>
                      <td className={styles.tdWeight}>{e.weight} lbs</td>
                      <td className={styles.tdReps}>{e.reps ?? '—'}</td>
                      <td>
                        <button
                          className={styles.del}
                          onClick={ev => { ev.stopPropagation(); onDelete(exercise.id, entries.length - 1 - i) }}
                          title="Delete"
                        >✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {entries.length >= 2 && (
                <div className={styles.chartWrap}>
                  <div className={styles.chartLabel}>Progressive overload</div>
                  <ProgressChart data={chartData} height={170} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
