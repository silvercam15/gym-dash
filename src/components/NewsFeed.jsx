import React from 'react'
import styles from './NewsFeed.module.css'
import { useNewsFeed } from '../hooks/useNewsFeed'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return 'just now'
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}

function domain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch { return '' }
}

function NewsItem({ item }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemMeta}>
        <span className={styles.source}>{item.source}</span>
        {item.tag && <span className={styles.tag}>{item.tag}</span>}
        <span className={styles.time}>{timeAgo(item.time)}</span>
      </div>
      <a
        className={styles.itemTitle}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
      <div className={styles.itemFooter}>
        <span className={styles.domain}>{domain(item.url)}</span>
        <div className={styles.itemStats}>
          {item.score != null && (
            <span className={styles.stat}>▲ {item.score}</span>
          )}
          {item.comments != null && (
            <span className={styles.stat}>💬 {item.comments}</span>
          )}
          {item.hnUrl && (
            <a
              className={styles.hnLink}
              href={item.hnUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              discuss
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NewsFeed() {
  const {
    feeds,
    activeCategory,
    setActiveCategory,
    items,
    loading,
    error,
    lastFetched,
    refresh,
  } = useNewsFeed()

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <nav className={styles.cats}>
          {Object.entries(feeds).map(([id, feed]) => (
            <button
              key={id}
              className={`${styles.cat} ${activeCategory === id ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(id)}
            >
              {feed.label}
            </button>
          ))}
        </nav>
        <div className={styles.toolbarRight}>
          {lastFetched && (
            <span className={styles.fetchedAt}>
              updated {timeAgo(lastFetched)}
            </span>
          )}
          <button
            className={`${styles.refreshBtn} ${loading ? styles.spinning : ''}`}
            onClick={refresh}
            disabled={loading}
            title="Refresh"
          >
            ↻
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading && items.length === 0 ? (
        <div className={styles.loadingGrid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.feed}>
          {items.length === 0 && !loading && (
            <div className={styles.empty}>No stories found</div>
          )}
          {items.map(item => (
            <NewsItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
