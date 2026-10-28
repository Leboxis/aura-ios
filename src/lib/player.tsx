import * as React from 'react'

import { SPACES, type Space } from '@/lib/data'

type Settings = {
  haptics: boolean
  autoplay: boolean
  dailyGoal: number
}

type PlayerContextValue = {
  current: Space
  playing: boolean
  elapsed: number
  duration: number
  queue: Space[]
  likes: string[]
  recent: string[]
  settings: Settings
  play: (space: Space) => void
  toggle: () => void
  seek: (seconds: number) => void
  next: () => void
  previous: () => void
  toggleLike: (id: string) => void
  setSetting: <Key extends keyof Settings>(key: Key, value: Settings[Key]) => void
  resetLikes: () => void
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null)

const LIKES_KEY = 'aura.likes.v2'
const SETTINGS_KEY = 'aura.settings.v2'

const DEFAULT_SETTINGS: Settings = { haptics: true, autoplay: true, dailyGoal: 60 }

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<Space[]>(SPACES)
  const [index, setIndex] = React.useState(1)
  const [playing, setPlaying] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(0)
  const [likes, setLikes] = React.useState<string[]>(() => readStored(LIKES_KEY, []))
  const [recent, setRecent] = React.useState<string[]>([])
  const [settings, setSettings] = React.useState<Settings>(() =>
    readStored(SETTINGS_KEY, DEFAULT_SETTINGS),
  )

  const current = queue[index] ?? SPACES[0]
  const duration = current.minutes * 60

  React.useEffect(() => {
    try {
      window.localStorage.setItem(LIKES_KEY, JSON.stringify(likes))
    } catch {
      // Storage can be unavailable in private browsing; likes stay in memory.
    }
  }, [likes])

  React.useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // Same as above.
    }
  }, [settings])

  React.useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [playing])

  React.useEffect(() => {
    if (elapsed < duration) return

    if (!settings.autoplay) {
      setPlaying(false)
      setElapsed(duration)
      return
    }

    setIndex((value) => (value + 1) % queue.length)
    setElapsed(0)
  }, [elapsed, duration, queue.length, settings.autoplay])

  const play = React.useCallback(
    (space: Space) => {
      const found = queue.findIndex((entry) => entry.id === space.id)
      if (found >= 0) {
        setIndex(found)
      } else {
        setQueue((value) => [...value, space])
        setIndex(queue.length)
      }
      setElapsed(0)
      setPlaying(true)
      setRecent((value) => [space.id, ...value.filter((id) => id !== space.id)].slice(0, 6))
    },
    [queue],
  )

  const toggle = React.useCallback(() => setPlaying((value) => !value), [])

  const seek = React.useCallback(
    (seconds: number) => setElapsed(Math.min(duration, Math.max(0, Math.round(seconds)))),
    [duration],
  )

  const next = React.useCallback(() => {
    setIndex((value) => (value + 1) % queue.length)
    setElapsed(0)
  }, [queue.length])

  const previous = React.useCallback(() => {
    setElapsed((value) => {
      if (value > 6) return 0
      setIndex((currentIndex) => (currentIndex - 1 + queue.length) % queue.length)
      return 0
    })
  }, [queue.length])

  const toggleLike = React.useCallback((id: string) => {
    setLikes((value) => (value.includes(id) ? value.filter((entry) => entry !== id) : [id, ...value]))
  }, [])

  const setSetting = React.useCallback(
    <Key extends keyof Settings>(key: Key, value: Settings[Key]) => {
      setSettings((currentSettings) => ({ ...currentSettings, [key]: value }))
    },
    [],
  )

  const resetLikes = React.useCallback(() => setLikes([]), [])

  const value: PlayerContextValue = {
    current,
    playing,
    elapsed,
    duration,
    queue,
    likes,
    recent,
    settings,
    play,
    toggle,
    seek,
    next,
    previous,
    toggleLike,
    setSetting,
    resetLikes,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = React.useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used inside PlayerProvider')
  return context
}
