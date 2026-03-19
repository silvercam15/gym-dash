import React, { useState } from 'react'
import styles from './App.module.css'
import { DAYS } from './data'
import { useWorkoutLog } from './hooks/useWorkoutLog'
import StatsBar from './components/StatsBar'
import DayView from './components/DayView'
import Overview from './components/Overview'
import SkatingDash from './components/skating_components/SkatingDash'
import NewsFeed from './components/NewsFeed'
import WorkoutCalendar from './components/WorkoutCalendar'

const WORKOUT_TABS = [...DAYS.map(d => ({ id: d.id, label: d.label })), { id: 'overview', label: 'Overview' }]

const TOP_SECTIONS = [
  { id: 'workout', label: 'Fitness' },
  { id: 'skating', label: 'Figure Skating' },
  { id: 'news', label: 'Industry News' },
]
const allExerciseIds = DAYS.flatMap(d => d.exercises.map(e => e.id))

export default function App() {
  const [section, setSection] = useState('workout')
  const [activeTab, setActiveTab] = useState('day1')
  const { addEntry, deleteEntry, getEntries, getBest, stats } = useWorkoutLog()

  const currentDay = DAYS.find(d => d.id === activeTab)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Sil fitness tracker</h1>
        </div>
        <nav className={styles.topNav}>
          {TOP_SECTIONS.map(s => (
            <button
              key={s.id}
              className={`${styles.topTab} ${section === s.id ? styles.topTabActive : ''}`}
              onClick={() => setSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </header>

      {section === 'workout' && (
        <>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>workout tracker</span>
            <span className={styles.goal}>Goal: −10 lbs</span>
          </div>

          <StatsBar stats={stats} />
          <WorkoutCalendar exerciseIds={allExerciseIds} getEntries={getEntries} />

          <nav className={styles.tabs}>
            {WORKOUT_TABS.map(t => (
              <button
                key={t.id}
                className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <main className={styles.main}>
            {activeTab === 'overview' ? (
              <Overview getEntries={getEntries} getBest={getBest} />
            ) : (
              currentDay && (
                <>
                <DayView
                  day={currentDay}
                  getEntries={getEntries}
                  getBest={getBest}
                  onAdd={addEntry}
                  onDelete={deleteEntry}
                />
                </>
              )
            )}
          </main>
        </>
      )}

      {section === 'skating' && (
        <>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>skills tracker</span>
          </div>
          <SkatingDash />
        </>
      )}

      {section === 'news' && (
        <>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>industry news</span>
          </div>
          <NewsFeed />
        </>
      )}
    </div>
  )
}
