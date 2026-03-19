import React, { useState, useMemo } from 'react'
import styles from './WorkoutCalendar.module.css'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Returns a "YYYY-MM-DD" key for a timestamp
function dayKey(ts) {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Returns a "YYYY-MM-DD" key for a Date object
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * WorkoutCalendar
 *
 * Props:
 *   exerciseIds  — array of all exercise id strings (e.g. from DAYS flatMap)
 *   getEntries   — (exerciseId) => Entry[]  where Entry = { ts, weight, reps }
 */
export default function WorkoutCalendar({ exerciseIds = [], getEntries }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0-indexed

  // Aggregate every logged date across every exercise
  const loggedDays = useMemo(() => {
    const set = new Set()
    for (const id of exerciseIds) {
      const entries = getEntries(id) ?? []
      for (const e of entries) {
        set.add(dayKey(e.ts))
      }
    }
    return set
  }, [exerciseIds, getEntries])

  // Count sets per day (for the tooltip / density dot)
  const setsPerDay = useMemo(() => {
    const map = {}
    for (const id of exerciseIds) {
      const entries = getEntries(id) ?? []
      for (const e of entries) {
        const k = dayKey(e.ts)
        map[k] = (map[k] ?? 0) + 1
      }
    }
    return map
  }, [exerciseIds, getEntries])

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  // Build the grid of days
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay() // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const grid = []

    // Leading empty cells
    for (let i = 0; i < firstDay; i++) grid.push(null)

    for (let d = 1; d <= daysInMonth; d++) {
      grid.push(new Date(year, month, d))
    }
    return grid
  }, [year, month])

  const todayKey = dateKey(today)
  const totalLogged = loggedDays.size

  return (
    <div className={styles.cal}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.calLabel}>workout calendar</span>
          <span className={styles.streakBadge}>{totalLogged} days logged</span>
        </div>
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">‹</button>
          <span className={styles.monthName}>{MONTHS[month]} {year}</span>
          <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">›</button>
        </div>
      </div>

      <div className={styles.grid}>
        {WEEKDAYS.map(d => (
          <span key={d} className={styles.weekday}>{d}</span>
        ))}

        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} className={styles.empty} />

          const key = dateKey(date)
          const isToday = key === todayKey
          const isLogged = loggedDays.has(key)
          const sets = setsPerDay[key] ?? 0

          return (
            <span
              key={key}
              className={[
                styles.day,
                isToday ? styles.today : '',
                isLogged ? styles.logged : '',
              ].join(' ')}
              title={isLogged ? `${sets} set${sets !== 1 ? 's' : ''} logged` : undefined}
            >
              <span className={styles.dayNum}>{date.getDate()}</span>
              {isLogged && (
                <span
                  className={styles.dot}
                  style={sets >= 6 ? { opacity: 1, transform: 'scale(1.3)' } : sets >= 3 ? { opacity: 0.85 } : {}}
                />
              )}
            </span>
          )
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} />
          logged
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendToday} />
          today
        </span>
      </div>
    </div>
  )
}