# Silvia — Workout Tracker

A React app to track your 4-day workout plan with progressive overload charts.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Features

- 4-day workout plan (Lower Body, Upper Push, Upper Pull, Full Body HIIT)
- Log weight + reps per exercise per session
- Progressive overload line chart per exercise (appears after 2+ sessions)
- Overview tab with exercise selector and all-time PR board
- Data persists in localStorage
- Delete individual entries

## Stack

- React 18 + Vite
- Recharts for charts
- CSS Modules
- localStorage for persistence
