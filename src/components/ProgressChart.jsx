import React from 'react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import styles from './ProgressChart.module.css'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      <div className={styles.tooltipWeight}>{payload[0].value} lbs</div>
      {payload[0].payload.reps && (
        <div className={styles.tooltipReps}>{payload[0].payload.reps} reps</div>
      )}
    </div>
  )
}

export default function ProgressChart({ data, height = 200 }) {
  if (!data || data.length < 2) {
    return (
      <div className={styles.empty} style={{ height }}>
        Log at least 2 sessions to see the chart
      </div>
    )
  }

  const max = Math.max(...data.map(d => d.weight))
  const min = Math.min(...data.map(d => d.weight))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke="#1e1e1e" strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#555', fontSize: 10, fontFamily: 'DM Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#555', fontSize: 10, fontFamily: 'DM Mono' }}
          axisLine={false}
          tickLine={false}
          width={42}
          tickFormatter={v => `${v}lb`}
          domain={[Math.max(0, min - 10), max + 10]}
        />
        <Tooltip content={<CustomTooltip />} />
        {max > min && (
          <ReferenceLine y={max} stroke="rgba(200,245,90,0.15)" strokeDasharray="3 3" />
        )}
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#e24ab7"
          strokeWidth={2}
          dot={{ fill: '#e24ab7', r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#e24ab7', stroke: '#0c0c0c', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
