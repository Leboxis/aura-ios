import { Pause, Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { SpaceArt } from '@/components/app/SpaceArt'
import { haptic } from '@/lib/haptics'
import { usePlayer } from '@/lib/player'

export function MiniPlayer({ onOpen }: { onOpen: () => void }) {
  const { current, playing, elapsed, duration, toggle, settings } = usePlayer()
  const reduce = useReducedMotion()
  const progress = Math.min(100, (elapsed / duration) * 100)

  return (
    <motion.div
      initial={reduce ? false : { y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="glass relative flex items-center gap-3 overflow-hidden rounded-3xl p-2 pr-2.5"
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl pr-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label="Ouvrir le lecteur"
      >
        <SpaceArt space={current} className="size-11 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium tracking-[-0.01em]">{current.title}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {playing ? 'En cours' : 'En pause'} · {current.minutes} min
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => {
          toggle()
          void haptic(settings.haptics)
        }}
        aria-label={playing ? 'Mettre en pause' : 'Reprendre la lecture'}
        className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-foreground transition-colors hover:bg-white/15 active:scale-95"
      >
        {playing ? (
          <Pause className="size-4 fill-current" />
        ) : (
          <Play className="size-4 translate-x-px fill-current" />
        )}
      </button>

      <div aria-hidden className="absolute inset-x-3 bottom-1 h-px overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-primary/80 transition-[width] duration-500 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
