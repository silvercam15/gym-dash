import React, { useState } from 'react'
import styles from './MealPlan.module.css'
import { DAYS, GROCERY } from './mealPlan'

const SLOT_COLORS = {
  'Breakfast': 'var(--accent)',
  'Lunch':     '#4fc3f7',
  'Pre-WO':    '#ffd54f',
  'Post-WO':   '#81c784',
  'Dinner':    '#ce93d8',
  'Snack':     '#ffb74d',
}

export default function MealPlan() {
  const today = new Date().getDay() // 0=Sun
  const dayMap = [6, 0, 1, 2, 3, 4, 5] // map JS day to our DAYS index
  const [activeDay, setActiveDay] = useState(dayMap[today] ?? 0)
  const [view, setView] = useState('meals') // 'meals' | 'grocery'
  const [checked, setChecked] = useState({})

  const day = DAYS[activeDay]
  const totalChecked = Object.values(checked).filter(Boolean).length
  const totalItems = GROCERY.reduce((s, g) => s + g.items.length, 0)

  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }))
  const clearAll = () => setChecked({})

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.label}>meal plan</span>
          <div className={styles.macroTarget}>
            <span className={styles.macroChip}>{day.calories} kcal</span>
            <span className={styles.macroChip}>{day.protein}g protein</span>
          </div>
        </div>
        <div className={styles.viewToggle}>
          <button className={`${styles.viewBtn} ${view === 'meals' ? styles.viewBtnActive : ''}`} onClick={() => setView('meals')}>Meals</button>
          <button className={`${styles.viewBtn} ${view === 'grocery' ? styles.viewBtnActive : ''}`} onClick={() => setView('grocery')}>
            Grocery {totalChecked > 0 && <span className={styles.checkedBadge}>{totalChecked}/{totalItems}</span>}
          </button>
        </div>
      </div>

      {view === 'meals' && (
        <>
          {/* Day tabs */}
          <div className={styles.dayTabs}>
            {DAYS.map((d, i) => (
              <button
                key={d.id}
                className={`${styles.dayTab} ${activeDay === i ? styles.dayTabActive : ''} ${d.type === 'rest' ? styles.dayTabRest : ''}`}
                onClick={() => setActiveDay(i)}
              >
                <span className={styles.dayTabLabel}>{d.label}</span>
                <span className={styles.dayTabType}>{d.type === 'rest' ? 'rest' : '⚡'}</span>
              </button>
            ))}
          </div>

          {/* Day title */}
          <div className={styles.dayHeader}>
            <span className={styles.dayTitle}>{day.title}</span>
            <span className={`${styles.dayBadge} ${day.type === 'rest' ? styles.dayBadgeRest : styles.dayBadgeTrain}`}>
              {day.type === 'rest' ? 'Rest Day' : 'Training'}
            </span>
          </div>

          {/* Meals */}
          <div className={styles.meals}>
            {day.meals.map((m, i) => (
              <div key={i} className={styles.mealRow}>
                <div className={styles.mealSlot} style={{ color: SLOT_COLORS[m.slot] ?? 'var(--muted)' }}>
                  {m.slot}
                </div>
                <div className={styles.mealBody}>
                  <span className={styles.mealName}>{m.name}</span>
                  <span className={styles.mealDesc}>{m.desc}</span>
                </div>
                <div className={styles.mealMacros}>
                  <span className={styles.mealCal}>{m.cal}</span>
                  <span className={styles.mealCalUnit}>kcal</span>
                  <span className={styles.mealProt}>{m.protein}g</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'grocery' && (
        <div className={styles.grocery}>
          <div className={styles.groceryHeader}>
            <span className={styles.groceryProgress}>{totalChecked} of {totalItems} items</span>
            {totalChecked > 0 && (
              <button className={styles.clearBtn} onClick={clearAll}>clear all</button>
            )}
          </div>
          <div className={styles.groceryProgressBar}>
            <div className={styles.groceryProgressFill} style={{ width: `${(totalChecked / totalItems) * 100}%` }} />
          </div>

          {GROCERY.map(group => (
            <div key={group.category} className={styles.groceryGroup}>
              <span className={styles.groceryCat}>{group.category}</span>
              <div className={styles.groceryItems}>
                {group.items.map(item => {
                  const key = `${group.category}-${item}`
                  const done = !!checked[key]
                  return (
                    <button
                      key={item}
                      className={`${styles.groceryItem} ${done ? styles.groceryItemDone : ''}`}
                      onClick={() => toggle(key)}
                    >
                      <span className={`${styles.groceryCheck} ${done ? styles.groceryCheckDone : ''}`}>
                        {done ? '✓' : ''}
                      </span>
                      <span className={styles.groceryItemName}>{item}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
