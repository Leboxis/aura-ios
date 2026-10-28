import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { MiniPlayer } from '@/components/app/MiniPlayer'
import { PlayerSheet } from '@/components/app/PlayerSheet'
import { TabBar } from '@/components/app/TabBar'
import { PlayerProvider } from '@/lib/player'
import type { TabId } from '@/lib/tabs'
import { ExploreScreen } from '@/screens/ExploreScreen'
import { HomeScreen } from '@/screens/HomeScreen'
import { LibraryScreen } from '@/screens/LibraryScreen'
import { ProfileScreen } from '@/screens/ProfileScreen'

export default function App() {
  return (
    <PlayerProvider>
      <Shell />
    </PlayerProvider>
  )
}

function Shell() {
  const [tab, setTab] = useState<TabId>('home')
  const [playerOpen, setPlayerOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [tab, reduce])

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <Ambient />

      <main className="relative z-10">
        <motion.div
          key={tab}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        >
          {tab === 'home' ? (
            <HomeScreen onNavigate={setTab} onOpenPlayer={() => setPlayerOpen(true)} />
          ) : null}
          {tab === 'explore' ? <ExploreScreen /> : null}
          {tab === 'library' ? <LibraryScreen onNavigate={setTab} /> : null}
          {tab === 'you' ? <ProfileScreen /> : null}
        </motion.div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),14px)]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/85 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-md flex-col gap-2">
          <MiniPlayer onOpen={() => setPlayerOpen(true)} />
          <TabBar active={tab} onChange={setTab} />
        </div>
      </div>

      <PlayerSheet open={playerOpen} onOpenChange={setPlayerOpen} />
    </div>
  )
}

function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_-10%,rgba(216,255,99,0.075),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(90%_65%_at_50%_0%,black,transparent_80%)]" />
      <div className="absolute -bottom-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#d8ff63]/[0.04] blur-[120px]" />
    </div>
  )
}
