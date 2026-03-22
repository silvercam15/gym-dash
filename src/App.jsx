import React, { useState } from 'react'
import styles from './App.module.css'
import { DAYS } from './data'
import { useWorkoutLog } from './hooks/useWorkoutLog'
import StatsBar from './components/StatsBar'
import DayView from './components/DayView'
import Overview from './components/Overview'
import WorkoutCalendar from './components/WorkoutCalendar'
import WeightTracker from './components/WeightTracker'
import MealPlan from './components/MealPlan'

const WORKOUT_TABS = [...DAYS.map(d => ({ id: d.id, label: d.label })), { id: 'overview', label: 'Overview' }]

const MIDDLE_SECTIONS = [
  {id: 'calendar', label: 'Calendar' },
  {id: 'stats', label: 'Stats'},
  {id: 'meal_plan', label: 'Meal Plan'}
]

const allExerciseIds = DAYS.flatMap(d => d.exercises.map(e => e.id))

export default function App() {
  const [section, setSection] = useState('workout')
  const [activeTab, setActiveTab] = useState('day1')
  const [calendarTab, setCalendarTab] = useState('calendar')
  const { addEntry, deleteEntry, getEntries, getBest, stats } = useWorkoutLog()

  const currentDay = DAYS.find(d => d.id === activeTab)
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Fitness tracker</h1>
        </div>
      </header>

      <StatsBar stats={stats} />
      <nav className={styles.tabs}>
        {MIDDLE_SECTIONS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${calendarTab === t.id ? styles.tabActive : ''}`}
              onClick={() => setCalendarTab(t.id)}
            >
              {t.label}
            </button>
          ))}
      </nav>
      <div>

        {calendarTab === 'calendar' ? (
          <WorkoutCalendar exerciseIds={allExerciseIds} getEntries={getEntries} />
        ) : calendarTab === 'stats' ? (
          <WeightTracker />
        ) : (
          <MealPlan />
        )}
      </div>

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
    </div>
  )
}
