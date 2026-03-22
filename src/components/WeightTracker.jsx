import React, { useState, useEffect } from 'react'
import styles from './WeightTracker.module.css'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts'

const STORAGE_KEY = 'weight_log'
const GOALS_KEY = 'weight_goals'

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? null }
  catch { return null }
}

function fmt(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function delta(entries, key) {
  const vals = entries.filter(e => e[key] != null)
  if (vals.length < 2) return null
  return (vals.at(-1)[key] - vals[0][key]).toFixed(1)
}

function pct(current, start, goal) {
  if (current == null || start == null || goal == null) return null
  if (start === goal) return 100
  const progress = ((current - start) / (goal - start)) * 100
  return Math.min(100, Math.max(0, Math.round(progress)))
}

const METRICS = [
  { id: 'weight',  label: 'Weight',    unit: 'lbs', color: 'var(--accent)',  goalDir: 'down' },
  { id: 'bodyfat', label: 'Body Fat',  unit: '%',   color: '#ff6b6b',        goalDir: 'down' },
  { id: 'muscle',  label: 'Muscle',    unit: 'lbs', color: '#4fc3f7',        goalDir: 'up'   },
]

const CustomTooltip = ({ active, payload, label, unit, goal }) => {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipDate}>{label}</p>
      <p className={styles.tooltipVal} style={{ color: payload[0]?.color }}>
        {val}{unit}
      </p>
      {goal != null && val != null && (
        <p className={styles.tooltipGoal}>{Math.abs(val - goal).toFixed(1)}{unit} {val > goal ? 'above' : 'from'} goal</p>
      )}
    </div>
  )
}

function MetricChart({ entries, metric, goal }) {
  const data = entries
    .filter(e => e[metric.id] != null)
    .map(e => ({ date: fmt(e.ts), value: e[metric.id] }))

  if (data.length < 2) return (
    <p className={styles.empty}>Log at least 2 entries to see the chart</p>
  )

  const values = data.map(d => d.value)
  const min = Math.min(...values, goal ?? Infinity)
  const max = Math.max(...values, goal ?? -Infinity)
  const pad = (max - min) * 0.15 || 2
  const domain = [Math.floor(min - pad), Math.ceil(max + pad)]

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--dim)', fontFamily: 'DM Mono' }} />
        <YAxis domain={domain} tick={{ fontSize: 10, fill: 'var(--dim)', fontFamily: 'DM Mono' }} />
        <Tooltip content={<CustomTooltip unit={metric.unit} goal={goal} />} />
        {goal != null && (
          <ReferenceLine
            y={goal}
            stroke={metric.color}
            strokeDasharray="5 4"
            strokeOpacity={0.6}
            label={{ value: `Goal: ${goal}${metric.unit}`, position: 'insideTopRight', fontSize: 10, fill: metric.color, fontFamily: 'DM Mono' }}
          />
        )}
        <Line
          type="monotone" dataKey="value" name={metric.label}
          stroke={metric.color} strokeWidth={2}
          dot={{ r: 3, fill: metric.color, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function GoalBar({ current, start, goal, metric }) {
  const p = pct(current, start, goal)
  if (p === null) return null
  const good = metric.goalDir === 'down' ? current <= goal : current >= goal
  return (
    <div className={styles.goalBar}>
      <div className={styles.goalBarTrack}>
        <div
          className={styles.goalBarFill}
          style={{ width: `${p}%`, background: good ? metric.color : 'var(--muted)' }}
        />
      </div>
      <span className={styles.goalBarLabel}>
        {p}% {good ? '✓ goal reached' : `${Math.abs(current - goal).toFixed(1)}${metric.unit} to go`}
      </span>
    </div>
  )
}

export default function WeightTracker() {
  const [entries, setEntries] = useState(() => load(STORAGE_KEY) ?? [])
  const [goals, setGoals] = useState(() => load(GOALS_KEY) ?? { weight: '', bodyfat: '', muscle: '' })
  const [tab, setTab] = useState('weight')
  const [showGoalEdit, setShowGoalEdit] = useState(false)
  const [goalDraft, setGoalDraft] = useState({ weight: '', bodyfat: '', muscle: '' })

  // Log form
  const [weight, setWeight] = useState('')
  const [bodyfat, setBodyfat] = useState('')
  const [muscle, setMuscle] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)) }, [entries])
  useEffect(() => { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)) }, [goals])

  const handleLog = () => {
    const w = parseFloat(weight) || null
    const bf = parseFloat(bodyfat) || null
    const mm = parseFloat(muscle) || null
    if (!w && !bf && !mm) return
    setEntries(prev => [...prev, { weight: w, bodyfat: bf, muscle: mm, ts: Date.now() }])
    setWeight(''); setBodyfat(''); setMuscle('')
  }

  const handleDelete = (i) => setEntries(prev => prev.filter((_, idx) => idx !== i))

  const openGoalEdit = () => {
    setGoalDraft({ weight: goals.weight ?? '', bodyfat: goals.bodyfat ?? '', muscle: goals.muscle ?? '' })
    setShowGoalEdit(true)
  }

  const saveGoals = () => {
    setGoals({
      weight:  parseFloat(goalDraft.weight)  || null,
      bodyfat: parseFloat(goalDraft.bodyfat) || null,
      muscle:  parseFloat(goalDraft.muscle)  || null,
    })
    setShowGoalEdit(false)
  }

  const getLatest = (key) => entries.filter(e => e[key] != null).at(-1)?.[key] ?? null
  const getFirst  = (key) => entries.find(e => e[key] != null)?.[key] ?? null

  const activeMetric = METRICS.find(m => m.id === tab)
  const currentVal = getLatest(tab)
  const startVal = getFirst(tab)
  const goalVal = goals[tab] ?? null

  return (
    <div className={styles.wrapper}>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>body composition</span>
        <button className={styles.goalEditBtn} onClick={openGoalEdit}>
          {Object.values(goals).some(v => v) ? '✎ goals' : '+ set goals'}
        </button>
      </div>

      {/* Goal edit panel */}
      {showGoalEdit && (
        <div className={styles.goalPanel}>
          <p className={styles.goalPanelTitle}>Set your goals</p>
          <div className={styles.goalInputs}>
            {METRICS.map(m => (
              <div key={m.id} className={styles.inputGroup}>
                <label className={styles.inputLabel} style={{ color: m.color }}>{m.label} ({m.unit})</label>
                <input
                  className={styles.input}
                  type="number" min="0"
                  placeholder={m.id === 'weight' ? '165' : m.id === 'bodyfat' ? '15' : '150'}
                  value={goalDraft[m.id]}
                  onChange={e => setGoalDraft(p => ({ ...p, [m.id]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className={styles.goalActions}>
            <button className={styles.saveGoalBtn} onClick={saveGoals}>Save</button>
            <button className={styles.cancelBtn} onClick={() => setShowGoalEdit(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className={styles.statCards}>
        {METRICS.map(m => {
          const latest = getLatest(m.id)
          const diff = delta(entries, m.id)
          const isGood = diff === null ? null
            : m.goalDir === 'down' ? parseFloat(diff) <= 0
            : parseFloat(diff) >= 0
          return (
            <button
              key={m.id}
              className={`${styles.statCard} ${tab === m.id ? styles.statCardActive : ''}`}
              style={{ '--card-color': m.color }}
              onClick={() => setTab(m.id)}
            >
              <span className={styles.statCardLabel}>{m.label}</span>
              <span className={styles.statCardVal} style={{ color: m.color }}>
                {latest ?? '—'}{latest ? <span className={styles.statCardUnit}> {m.unit}</span> : ''}
              </span>
              {diff !== null && (
                <span className={`${styles.statCardDiff} ${isGood ? styles.diffGood : styles.diffBad}`}>
                  {parseFloat(diff) > 0 ? '+' : ''}{diff}{m.unit}
                </span>
              )}
              {goals[m.id] && latest && (
                <div className={styles.miniBar}>
                  <div
                    className={styles.miniBarFill}
                    style={{
                      width: `${pct(latest, getFirst(m.id), goals[m.id])}%`,
                      background: m.color,
                    }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Chart + goal progress */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <span className={styles.chartTitle} style={{ color: activeMetric.color }}>
            {activeMetric.label} over time
          </span>
          {goalVal && <span className={styles.chartGoalTag} style={{ borderColor: activeMetric.color, color: activeMetric.color }}>
            goal: {goalVal}{activeMetric.unit}
          </span>}
        </div>

        <MetricChart entries={entries} metric={activeMetric} goal={goalVal} />

        {goalVal && currentVal && (
          <GoalBar current={currentVal} start={startVal} goal={goalVal} metric={activeMetric} />
        )}
      </div>

      {/* Log form */}
      <div className={styles.logSection}>
        <span className={styles.logSectionLabel}>log entry</span>
        <div className={styles.logForm}>
          {METRICS.map((m, i) => {
            const vals = [weight, bodyfat, muscle]
            const setters = [setWeight, setBodyfat, setMuscle]
            const placeholders = ['175', '18', '140']
            return (
              <div key={m.id} className={styles.inputGroup}>
                <label className={styles.inputLabel}>{m.label} ({m.unit})</label>
                <input
                  className={styles.input}
                  type="number" min="0"
                  placeholder={placeholders[i]}
                  value={vals[i]}
                  onChange={e => setters[i](e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLog()}
                />
              </div>
            )
          })}
          <button className={styles.logBtn} onClick={handleLog}>Log</button>
        </div>
      </div>

      {/* History */}
      {entries.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr><th>Date</th><th>Weight</th><th>BF%</th><th>Muscle</th><th></th></tr>
          </thead>
          <tbody>
            {[...entries].reverse().map((e, i) => (
              <tr key={i}>
                <td className={styles.tdDate}>{fmt(e.ts)}</td>
                <td className={styles.tdWeight}>{e.weight ? `${e.weight} lbs` : '—'}</td>
                <td className={styles.tdBf}>{e.bodyfat ? `${e.bodyfat}%` : '—'}</td>
                <td className={styles.tdMuscle}>{e.muscle ? `${e.muscle} lbs` : '—'}</td>
                <td>
                  <button className={styles.del}
                    onClick={() => handleDelete(entries.length - 1 - i)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {entries.length === 0 && (
        <p className={styles.empty}>No entries yet — log your first weigh-in above</p>
      )}
    </div>
  )
}
