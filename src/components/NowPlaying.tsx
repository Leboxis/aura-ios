import { useEffect, useRef } from 'react'
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from 'motion/react'
import {
  AudioLines,
  Heart,
  Pause,
  Play,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react'
import type { Space } from '../lib/data'
import type { Player } from '../lib/usePlayer'
import { cn, formatClock } from '../lib/utils'
import { hapticTap } from '../lib/haptics'
import { SpaceArt } from './SpaceArt'
import { Slider } from './ui/slider'

type NowPlayingProps = {
  open: boolean
  onClose: () => void
  player: Player
  saved: boolean
  onToggleSave: () => void
  onPrev: () => void
  onNext: () => void
  onShuffle: () => void
}

export function NowPlaying({
  open,
  onClose,
  player,
  saved,
  onToggleSave,
  onPrev,
  onNext,
  onShuffle,
}: NowPlayingProps) {
  const controls = useDragControls()
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const space: Space | null = player.space

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 420)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  const share = async () => {
    if (!space) return
    void hapticTap('light')
    const text = `${space.name} — ${space.place}, sur Aura.`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Aura', text })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
      }
    } catch {
      // The user dismissed the share sheet: nothing to report.
    }
  }

  return (
    <AnimatePresence>
      {open && space && (
        <motion.div
          key="now-playing"
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-[#040408]/72 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="now-playing-title"
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.02, bottom: 0.72 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 700) onClose()
            }}
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={
              reduce ? { duration: 0.2 } : { type: 'spring', bounce: 0, duration: 0.46 }
            }
            className="glass-strong relative z-10 max-h-[94dvh] w-full max-w-[520px] overflow-y-auto rounded-t-[40px] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2.5 no-scrollbar md:mb-5 md:rounded-[40px]"
          >
            <div
              onPointerDown={(event) => controls.start(event)}
              className="mx-auto flex h-7 w-full max-w-[140px] touch-none items-center justify-center"
            >
              <span className="h-[5px] w-10 rounded-full bg-white/25" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-white/40">
                En lecture
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={share}
                  aria-label="Partager cette ambiance"
                  className="press flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60"
                >
                  <Share2 aria-hidden className="size-[14px]" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer le lecteur"
                  className="press flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60"
                >
                  <X aria-hidden className="size-[15px]" />
                </button>
              </div>
            </div>

            <div className="relative mx-auto mt-4 w-full max-w-[288px]">
              <div
                aria-hidden
                className="absolute inset-8 rounded-[40px] opacity-70 blur-3xl"
                style={{ background: space.glow }}
              />
              <SpaceArt
                space={space}
                className="relative aspect-square w-full rounded-[30px] border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]"
              />
            </div>

            <div className="mt-6 min-w-0">
              <h2
                id="now-playing-title"
                className="font-display text-[24px] font-semibold leading-tight tracking-[-0.025em]"
              >
                {space.name}
              </h2>
              <p className="mt-1 truncate text-[12.5px] text-white/55">
                {space.place} · {space.minutes} min
              </p>
            </div>

            <p className="mt-3 text-[12.5px] leading-relaxed text-white/50">{space.description}</p>

            <div className="mt-6">
              <Slider
                value={player.elapsed}
                max={player.duration}
                onChange={player.seek}
                label="Position de lecture"
              />
              <div className="mt-0.5 flex justify-between text-[10.5px] tabular-nums text-white/45">
                <span>{formatClock(player.elapsed)}</span>
                <span>-{formatClock(player.remaining)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onShuffle}
                aria-label="Ambiance aléatoire"
                className="press flex size-10 items-center justify-center rounded-full text-white/45 hover:text-white"
              >
                <Shuffle aria-hidden className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Ambiance précédente"
                className="press flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/85"
              >
                <SkipBack aria-hidden className="size-[19px]" fill="currentColor" strokeWidth={0} />
              </button>
              <button
                type="button"
                onClick={player.toggle}
                aria-label={player.playing ? 'Mettre en pause' : 'Lire'}
                className="press flex size-[64px] items-center justify-center rounded-full bg-ink text-canvas shadow-[0_20px_50px_-18px_rgba(255,255,255,0.5)]"
              >
                {player.playing ? (
                  <Pause aria-hidden className="size-7" fill="currentColor" strokeWidth={0} />
                ) : (
                  <Play
                    aria-hidden
                    className="ml-1 size-7"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Ambiance suivante"
                className="press flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/85"
              >
                <SkipForward
                  aria-hidden
                  className="size-[19px]"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  void hapticTap('light')
                  onToggleSave()
                }}
                aria-label={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                aria-pressed={saved}
                className={cn(
                  'press flex size-10 items-center justify-center rounded-full',
                  saved ? 'text-[#ff6482]' : 'text-white/45 hover:text-white',
                )}
              >
                <Heart aria-hidden className="size-[18px]" fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3">
              <span className="flex items-center gap-2 text-[11px] text-white/45">
                <AudioLines aria-hidden className="size-[14px]" />
                Boucle douce · fondu de 8 s
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Généré</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
