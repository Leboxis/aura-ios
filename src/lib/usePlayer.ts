import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Space } from './data'
import { hapticNotice, hapticTap } from './haptics'
import { clamp } from './utils'

export type Player = {
  space: Space | null
  spaceId: string | null
  playing: boolean
  started: boolean
  elapsed: number
  duration: number
  progress: number
  remaining: number
  start: (space: Space) => void
  toggle: () => void
  seek: (seconds: number) => void
  reset: () => void
}

export function usePlayer(): Player {
  const [spaceId, setSpaceId] = useState<string | null>(null)
  const [space, setSpace] = useState<Space | null>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const duration = (space?.minutes ?? 0) * 60
  const finished = useRef(false)
  const currentId = useRef<string | null>(null)

  useEffect(() => {
    if (!playing || !space) return

    const id = window.setInterval(() => {
      setElapsed((current) => {
        if (current + 1 >= duration) return duration
        return current + 1
      })
    }, 1000)

    return () => window.clearInterval(id)
  }, [playing, space, duration])

  // Completion is kept out of the state updater so it runs exactly once.
  useEffect(() => {
    if (!playing || !space || duration === 0) return
    if (elapsed < duration) {
      finished.current = false
      return
    }
    if (finished.current) return
    finished.current = true
    setPlaying(false)
    void hapticNotice('success')
  }, [elapsed, duration, playing, space])

  const start = useCallback((next: Space) => {
    if (currentId.current === next.id) {
      setPlaying((isPlaying) => !isPlaying)
      void hapticTap('light')
      return
    }

    currentId.current = next.id
    finished.current = false
    setSpaceId(next.id)
    setSpace(next)
    setElapsed(0)
    setStarted(true)
    setPlaying(true)
    void hapticTap('medium')
  }, [])

  const toggle = useCallback(() => {
    if (!space) return
    setPlaying((isPlaying) => !isPlaying)
    setStarted(true)
    void hapticTap('light')
  }, [space])

  const seek = useCallback(
    (seconds: number) => {
      if (!duration) return
      setElapsed(clamp(Math.round(seconds), 0, duration))
      finished.current = false
    },
    [duration],
  )

  const reset = useCallback(() => {
    setPlaying(false)
    currentId.current = null
    setSpaceId(null)
    setSpace(null)
    setStarted(false)
    setElapsed(0)
    finished.current = false
  }, [])

  const progress = useMemo(() => {
    if (!duration) return 0
    return clamp(elapsed / duration, 0, 1)
  }, [duration, elapsed])

  return {
    space,
    spaceId,
    playing,
    started,
    elapsed,
    duration,
    progress,
    remaining: Math.max(duration - elapsed, 0),
    start,
    toggle,
    seek,
    reset,
  }
}
