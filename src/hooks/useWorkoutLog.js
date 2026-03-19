import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY, ALL_EXERCISES } from '../data'

function loadLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useWorkoutLog() {
  const [log, setLog] = useState(loadLog)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log))
    } catch {}
  }, [log])

  const addEntry = useCallback((exId, weight, reps) => {
    if (!weight) return false
    const entry = {
      ts: Date.now(),
      date: new Date().toISOString(),
      weight: parseFloat(weight),
      reps: reps ? parseInt(reps) : null,
    }
    setLog(prev => ({ ...prev, [exId]: [...(prev[exId] || []), entry] }))
    return true
  }, [])

  const deleteEntry = useCallback((exId, index) => {
    setLog(prev => {
      const arr = [...(prev[exId] || [])]
      arr.splice(index, 1)
      return { ...prev, [exId]: arr }
    })
  }, [])

  const getEntries = useCallback(
    (exId) => (log[exId] || []).slice().sort((a, b) => a.ts - b.ts),
    [log]
  )

  const getBest = useCallback(
    (exId) => {
      const entries = log[exId]
      if (!entries || entries.length === 0) return null
      return Math.max(...entries.map(e => e.weight || 0))
    },
    [log]
  )

  const stats = (() => {
    const totalSets = Object.values(log).reduce((s, arr) => s + arr.length, 0)
    const trackedCount = ALL_EXERCISES.filter(e => log[e.id]?.length > 0).length

    let latestTs = 0
    let latestDay = '—'
    Object.entries(log).forEach(([exId, entries]) => {
      entries.forEach(e => {
        if (e.ts > latestTs) {
          latestTs = e.ts
          const ex = ALL_EXERCISES.find(x => x.id === exId)
          latestDay = ex ? ex.dayTitle : '—'
        }
      })
    })

    return { totalSets, trackedCount, latestDay }
  })()

  return { log, addEntry, deleteEntry, getEntries, getBest, stats }
}
