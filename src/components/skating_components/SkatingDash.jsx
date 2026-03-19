import React, { useState } from 'react'
import styles from './SkatingDash.module.css'
import { LEVELS, STATUS } from '../../skatingData'
import { useSkatingLog } from '../../hooks/useSkatingLog'

function fmt(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function SkillRow({ skill, data, onStatus, onAddNote, onDeleteNote }) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const status = data?.status || 'not_started'

  return (
    <div className={styles.skillWrapper}>
      <div
        className={`${styles.skillRow} ${open ? styles.skillOpen : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className={styles.skillLeft}>
          <span className={`${styles.dot} ${styles[`dot_${status}`]}`} />
          <span className={styles.skillName}>{skill.name}</span>
        </div>
        <div className={styles.skillRight} onClick={e => e.stopPropagation()}>
          <select
            className={styles.statusSelect}
            value={status}
            onChange={e => onStatus(skill.id, e.target.value)}
          >
            {Object.entries(STATUS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        </div>
      </div>

      {open && (
        <div className={styles.skillPanel} onClick={e => e.stopPropagation()}>
          <div className={styles.noteForm}>
            <input
              className={styles.noteInput}
              type="text"
              placeholder="Add a note (tip, coach feedback, milestone...)"
              value={note}
              onChange={e => setNote(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { onAddNote(skill.id, note); setNote('') } }}
            />
            <button
              className={styles.noteBtn}
              onClick={() => { onAddNote(skill.id, note); setNote('') }}
            >Add</button>
          </div>

          {data?.notes?.length > 0 ? (
            <div className={styles.notes}>
              {[...data.notes].reverse().map((n, i) => (
                <div key={i} className={styles.noteItem}>
                  <span className={styles.noteDate}>{fmt(n.ts)}</span>
                  <span className={styles.noteText}>{n.text}</span>
                  <button
                    className={styles.noteDel}
                    onClick={() => onDeleteNote(skill.id, data.notes.length - 1 - i)}
                  >✕</button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noNotes}>No notes yet</p>
          )}

          {data?.updatedAt && (
            <div className={styles.updatedAt}>
              Last updated {fmt(new Date(data.updatedAt).getTime())}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function LevelCard({ level, log, onStatus, onAddNote, onDeleteNote }) {
  const total = level.skills.length
  const mastered = level.skills.filter(s => log[s.id]?.status === 'mastered').length
  const pct = Math.round((mastered / total) * 100)
  const [collapsed, setCollapsed] = useState(mastered === total)

  return (
    <div className={styles.levelCard}>
      <div className={styles.levelHeader} onClick={() => setCollapsed(c => !c)}>
        <div className={styles.levelLeft}>
          <span className={`${styles.levelBadge} ${styles[`badge_${level.color}`]}`}>
            {level.label}
          </span>
          <div className={styles.progressBar}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.progressText}>{mastered}/{total}</span>
          </div>
        </div>
        <span className={`${styles.chevron} ${!collapsed ? styles.chevronOpen : ''}`}>›</span>
      </div>

      {!collapsed && (
        <div className={styles.skillList}>
          {level.skills.map(skill => (
            <SkillRow
              key={skill.id}
              skill={skill}
              data={log[skill.id]}
              onStatus={onStatus}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SkatingDash() {
  const { log, setStatus, addNote, deleteNote, stats } = useSkatingLog()

  return (
    <div className={styles.wrap}>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Overall progress</div>
          <div className={styles.statVal}>{stats.pct}%</div>
          <div className={styles.bigBar}>
            <div className={styles.bigBarFill} style={{ width: `${stats.pct}%` }} />
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Mastered</div>
          <div className={styles.statVal}>{stats.mastered}<span className={styles.statOf}> / {stats.total}</span></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>In progress</div>
          <div className={styles.statVal}>{stats.inProgress}</div>
        </div>
      </div>

      <div className={styles.levels}>
        {LEVELS.map(level => (
          <LevelCard
            key={level.id}
            level={level}
            log={log}
            onStatus={setStatus}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  )
}
