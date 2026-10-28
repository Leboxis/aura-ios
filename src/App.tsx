import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SPACES, type Space, type TabId } from './lib/data'
import { usePlayer } from './lib/usePlayer'
import { hapticTap, setHapticsEnabled } from './lib/haptics'
import { cn } from './lib/utils'
import { TabBar } from './components/TabBar'
import { MiniPlayer } from './components/MiniPlayer'
import { NowPlaying } from './components/NowPlaying'
import { TodayTab } from './components/tabs/TodayTab'
import { SpacesTab } from './components/tabs/SpacesTab'
import { LibraryTab } from './components/tabs/LibraryTab'
import { YouTab } from './components/tabs/YouTab'

export default function App() {
  const [tab, setTab] = useState<TabId>('today')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem('aura:favorites')
      if (stored) return JSON.parse(stored) as string[]
    } catch {
      // A private-mode storage failure must not break the app.
    }
    return ['rain', 'forest', 'ocean']
  })
  const [hapticsEnabled, setHaptics] = useState(true)
  const reduce = useReducedMotion()
  const player = usePlayer()

  useEffect(() => {
    setHapticsEnabled(hapticsEnabled)
  }, [hapticsEnabled])

  useEffect(() => {
    try {
      window.localStorage.setItem('aura:favorites', JSON.stringify(saved))
    } catch {
      // Storage is a nicety: playback never depends on it.
    }
  }, [saved])

  const changeTab = useCallback((next: TabId) => {
    setTab((current) => {
      if (current === next) return current
      void hapticTap('light')
      return next
    })
  }, [])

  const startSpace = useCallback(
    (space: Space) => {
      player.start(space)
    },
    [player],
  )

  const toggleSaved = useCallback((id: string) => {
    void hapticTap('light')
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }, [])

  const shuffle = useCallback(() => {
    const pool = SPACES.filter((space) => space.id !== player.spaceId)
    const next = pool[Math.floor(Math.random() * pool.length)]
    if (next) player.start(next)
  }, [player])

  const step = useCallback(
    (direction: 1 | -1) => {
      if (!player.spaceId) return
      const index = SPACES.findIndex((space) => space.id === player.spaceId)
      const next = SPACES[(index + direction + SPACES.length) % SPACES.length]
      if (next) player.start(next)
    },
    [player],
  )

  const openSheet = useCallback(() => {
    void hapticTap('light')
    setSheetOpen(true)
  }, [])

  const closeSheet = useCallback(() => setSheetOpen(false), [])
  const toggleHaptics = useCallback((value: boolean) => {
    setHaptics(value)
    if (value) void hapticTap('medium')
  }, [])

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-canvas">
      <Aurora />

      <div className="relative z-10 h-full">
        <motion.div
          key={tab}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            'app-top no-scrollbar h-full overflow-y-auto overflow-x-hidden',
            player.started ? 'app-bottom-raised' : 'app-bottom',
          )}
        >
          {tab === 'today' && (
            <TodayTab
              player={player}
              onStart={startSpace}
              onOpenPlayer={openSheet}
              onNavigate={changeTab}
            />
          )}
          {tab === 'spaces' && (
            <SpacesTab player={player} onStart={startSpace} onShuffle={shuffle} />
          )}
          {tab === 'library' && (
            <LibraryTab
              player={player}
              saved={saved}
              onStart={startSpace}
              onToggleSave={toggleSaved}
            />
          )}
          {tab === 'you' && (
            <YouTab
              savedCount={saved.length}
              hapticsEnabled={hapticsEnabled}
              onToggleHaptics={toggleHaptics}
            />
          )}
        </motion.div>
      </div>

      <MiniPlayer player={player} onOpen={openSheet} hidden={sheetOpen} />
      <TabBar tab={tab} onChange={changeTab} />

      <NowPlaying
        open={sheetOpen}
        onClose={closeSheet}
        player={player}
        saved={Boolean(player.spaceId && saved.includes(player.spaceId))}
        onToggleSave={() => player.spaceId && toggleSaved(player.spaceId)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onShuffle={shuffle}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-[env(safe-area-inset-top)] bg-gradient-to-b from-canvas to-transparent"
      />
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[35] opacity-[0.055]"
      />
    </div>
  )
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="aurora-a absolute -top-[20%] left-[-25%] size-[68vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(108,86,255,0.40),transparent_62%)] blur-[60px]" />
      <div className="aurora-b absolute right-[-28%] top-[4%] size-[62vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,190,200,0.22),transparent_62%)] blur-[70px]" />
      <div className="aurora-a absolute bottom-[-28%] left-[2%] size-[60vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,120,190,0.16),transparent_66%)] blur-[80px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,8,0.15),rgba(5,5,8,0.7)_58%,#050508)]" />
    </div>
  )
}
