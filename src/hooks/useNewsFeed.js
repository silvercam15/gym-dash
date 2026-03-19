import { useState, useEffect, useCallback } from 'react'

const FEEDS = {
  ai: {
    label: 'AI',
    sources: [
      { type: 'devto', tag: 'ai', label: 'dev.to' },
      { type: 'devto', tag: 'machinelearning', label: 'dev.to' },
      { type: 'hn', query: 'AI LLM', label: 'HN' },
    ],
  },
  react: {
    label: 'React',
    sources: [
      { type: 'devto', tag: 'react', label: 'dev.to' },
      { type: 'devto', tag: 'reactnative', label: 'dev.to' },
      { type: 'hn', query: 'React', label: 'HN' },
    ],
  },
  webdev: {
    label: 'Web Dev',
    sources: [
      { type: 'devto', tag: 'webdev', label: 'dev.to' },
      { type: 'devto', tag: 'javascript', label: 'dev.to' },
      { type: 'devto', tag: 'typescript', label: 'dev.to' },
    ],
  },
  hn: {
    label: 'Hacker News',
    sources: [
      { type: 'hn_top', label: 'HN Top' },
    ],
  },
}

async function fetchDevTo(tag, perPage = 10) {
  const res = await fetch(
    `https://dev.to/api/articles?tag=${tag}&per_page=${perPage}&top=7`
  )
  if (!res.ok) throw new Error('dev.to fetch failed')
  const data = await res.json()
  return data.map(a => ({
    id: `devto-${a.id}`,
    title: a.title,
    url: a.url,
    source: 'dev.to',
    tag: a.tag_list?.[0] || tag,
    author: a.user?.name,
    score: a.positive_reactions_count,
    comments: a.comments_count,
    time: new Date(a.published_at).getTime(),
  }))
}

async function fetchHNTop(n = 30) {
  const idsRes = await fetch('https://hacker-news.firebaseio.com/v1/topstories.json')
  const ids = await idsRes.json()
  const top = ids.slice(0, n)
  const stories = await Promise.all(
    top.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v1/item/${id}.json`).then(r => r.json())
    )
  )
  return stories
    .filter(s => s && s.url && s.title)
    .map(s => ({
      id: `hn-${s.id}`,
      title: s.title,
      url: s.url,
      source: 'Hacker News',
      author: s.by,
      score: s.score,
      comments: s.descendants || 0,
      hnUrl: `https://news.ycombinator.com/item?id=${s.id}`,
      time: s.time * 1000,
    }))
}

async function fetchHNFiltered(query, n = 60) {
  const all = await fetchHNTop(n)
  const q = query.toLowerCase().split(' ')
  return all.filter(s =>
    q.some(word => s.title.toLowerCase().includes(word))
  )
}

export function useNewsFeed() {
  const [activeCategory, setActiveCategory] = useState('ai')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  const fetch = useCallback(async (category) => {
    setLoading(true)
    setError(null)
    try {
      const feed = FEEDS[category]
      const results = await Promise.allSettled(
        feed.sources.map(src => {
          if (src.type === 'devto') return fetchDevTo(src.tag)
          if (src.type === 'hn') return fetchHNFiltered(src.query)
          if (src.type === 'hn_top') return fetchHNTop(30)
          return Promise.resolve([])
        })
      )
      const merged = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value)

      // dedupe by title similarity
      const seen = new Set()
      const deduped = merged.filter(item => {
        const key = item.title.slice(0, 40).toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

      deduped.sort((a, b) => b.time - a.time)
      setItems(deduped.slice(0, 40))
      setLastFetched(Date.now())
    } catch (e) {
      setError('Failed to load feed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch(activeCategory)
  }, [activeCategory, fetch])

  const refresh = useCallback(() => fetch(activeCategory), [activeCategory, fetch])

  return {
    feeds: FEEDS,
    activeCategory,
    setActiveCategory,
    items,
    loading,
    error,
    lastFetched,
    refresh,
  }
}
