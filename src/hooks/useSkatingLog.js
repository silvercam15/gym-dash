import { useState, useEffect, useCallback } from 'react'
import { SKATING_STORAGE_KEY, ALL_SKILLS, STATUS } from '../skatingData'

function load() {
  try {
    const raw = localStorage.getItem(SKATING_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function useSkatingLog() {
  const [log, setLog] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(SKATING_STORAGE_KEY, JSON.stringify(log)) } catch {}
  }, [log])

  const setStatus = useCallback((skillId, status) => {
    setLog(prev => ({
      ...prev,
      [skillId]: {
        ...(prev[skillId] || {}),
        status,
        updatedAt: new Date().toISOString(),
      },
    }))
  }, [])

  const addNote = useCallback((skillId, note) => {
    if (!note.trim()) return
    setLog(prev => ({
      ...prev,
      [skillId]: {
        ...(prev[skillId] || {}),
        notes: [...((prev[skillId]?.notes) || []), { text: note, ts: Date.now() }],
      },
    }))
  }, [])

  const deleteNote = useCallback((skillId, idx) => {
    setLog(prev => {
      const notes = [...(prev[skillId]?.notes || [])]
      notes.splice(idx, 1)
      return { ...prev, [skillId]: { ...prev[skillId], notes } }
    })
  }, [])

  const getSkill = useCallback((skillId) => log[skillId] || {}, [log])

  const stats = (() => {
    const total = ALL_SKILLS.length
    const mastered = ALL_SKILLS.filter(s => log[s.id]?.status === 'mastered').length
    const inProgress = ALL_SKILLS.filter(s =>
      log[s.id]?.status === 'learning' || log[s.id]?.status === 'practicing'
    ).length
    const pct = Math.round((mastered / total) * 100)
    return { total, mastered, inProgress, pct }
  })()

  return { log, setStatus, addNote, deleteNote, getSkill, stats }
}
