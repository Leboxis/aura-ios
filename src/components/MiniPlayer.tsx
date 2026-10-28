import { motion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import type { Player } from '../lib/usePlayer'
import { formatClock } from '../lib/utils'
import { Equalizer } from './ui/equalizer'
import { SpaceArt } from './SpaceArt'

type MiniPlayerProps = {
  player: Player
  onOpen: () => void
  hidden: boolean
}

export function MiniPlayer({ player, onOpen, hidden }: MiniPlayerProps) {
  if (!player.space || !player.started || hidden) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.9rem+env(safe-area-inset-bottom))] z-30 flex justify-center px-4">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
        className="glass-strong specular pointer-events-auto flex w-full max-w-[430px] items-center gap-2.5 rounded-[21px] p-2 pr-2"
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label="Ouvrir le lecteur"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
        >
          <SpaceArt
            variant="thumb"
            space={player.space}
            className="size-9 shrink-0 rounded-[11px] border border-white/10"
          />
          <span className="min-w-0">
            <span className="block truncate text-[12.5px] font-medium leading-tight">
              {player.space.name}
            </span>
            <span className="mt-0.5 block truncate text-[10.5px] text-white/55">
              {player.playing ? 'En lecture' : 'En pause'} · {formatClock(player.remaining)}
            </span>
          </span>
        </button>

        <Equalizer active={player.playing} className="mr-0.5 text-white/45" />

        <button
          type="button"
          onClick={player.toggle}
          aria-label={player.playing ? 'Mettre en pause' : 'Reprendre la lecture'}
          className="press flex size-9 items-center justify-center rounded-full bg-white/90 text-black"
        >
          {player.playing ? (
            <Pause aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play aria-hidden className="ml-0.5 size-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>

        <div aria-hidden className="absolute inset-x-3 bottom-[3px] h-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#b9aaff] to-[#5ce1d3]"
            style={{ width: `${Math.max(player.progress * 100, 1.5)}%` }}
          />
        </div>
      </motion.div>
    </div>
  )
}
