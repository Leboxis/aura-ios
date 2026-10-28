import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Clock3, Heart, Pause, Play } from 'lucide-react'
import {
  MIXES,
  RECENTS,
  SPACE_BY_ID,
  type Mix,
  type Space,
} from '../../lib/data'
import type { Player } from '../../lib/usePlayer'
import { cn, formatMinutes } from '../../lib/utils'
import { GlassCard } from '../ui/glass-card'
import { Segmented } from '../ui/segmented'
import { SpaceArt } from '../SpaceArt'

type LibraryView = 'favorites' | 'recent' | 'mixes'

const VIEWS = [
  { id: 'favorites' as const, label: 'Favoris' },
  { id: 'recent' as const, label: 'Récents' },
  { id: 'mixes' as const, label: 'Mixes' },
]

type LibraryTabProps = {
  player: Player
  saved: string[]
  onStart: (space: Space) => void
  onToggleSave: (id: string) => void
}

export function LibraryTab({ player, saved, onStart, onToggleSave }: LibraryTabProps) {
  const [view, setView] = useState<LibraryView>('favorites')
  const reduce = useReducedMotion()

  const favorites = useMemo(
    () => saved.map((id) => SPACE_BY_ID[id]).filter((space): space is Space => Boolean(space)),
    [saved],
  )

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 md:max-w-[720px] md:px-8 lg:max-w-[880px]">
      <header className="pb-5">
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/45">Votre collection</p>
        <h1 className="mt-2 font-display text-[36px] font-semibold tracking-[-0.038em] md:text-[44px]">
          Bibliothèque
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">
          Les sons que vous gardez sous la main.
        </p>
      </header>

      <Segmented
        options={VIEWS}
        value={view}
        onChange={(next) => setView(next)}
        label="Sections de la bibliothèque"
      />

      <motion.div
        key={view}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        className="mt-4"
      >
        {view === 'favorites' &&
          (favorites.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="space-y-2">
              {favorites.map((space) => (
                <li key={space.id}>
                  <SpaceRow
                    space={space}
                    subtitle={`${space.minutes} min · ${space.place}`}
                    saved
                    active={player.spaceId === space.id && player.started}
                    playing={player.playing}
                    onPlay={() => onStart(space)}
                    onToggleSave={() => onToggleSave(space.id)}
                  />
                </li>
              ))}
            </ul>
          ))}

        {view === 'recent' && (
          <ul className="space-y-2">
            {RECENTS.map((recent) => {
              const space = SPACE_BY_ID[recent.spaceId]
              if (!space) return null
              return (
                <li key={recent.spaceId}>
                  <SpaceRow
                    space={space}
                    subtitle={recent.when}
                    saved={saved.includes(space.id)}
                    active={player.spaceId === space.id && player.started}
                    playing={player.playing}
                    onPlay={() => onStart(space)}
                    onToggleSave={() => onToggleSave(space.id)}
                  />
                </li>
              )
            })}
          </ul>
        )}

        {view === 'mixes' && (
          <div className="grid grid-cols-2 gap-3">
            {MIXES.map((mix) => (
              <MixCard key={mix.id} mix={mix} onPlay={() => onStart(SPACE_BY_ID[mix.spaceIds[0]])} />
            ))}
          </div>
        )}
      </motion.div>

      <GlassCard tone="soft" className="mt-6 rounded-[22px] px-4 py-3.5">
        <p className="text-[10.5px] leading-relaxed text-white/45">
          Les favoris restent sur votre appareil. Aucun compte, aucun envoi vers un serveur.
        </p>
      </GlassCard>
    </div>
  )
}

function EmptyState() {
  return (
    <GlassCard className="flex flex-col items-center rounded-[24px] px-6 py-12 text-center">
      <Heart aria-hidden className="size-6 text-white/25" />
      <p className="mt-3 text-[13px] font-medium">Aucun favori pour l’instant</p>
      <p className="mt-1 max-w-[220px] text-[11px] leading-relaxed text-white/45">
        Touchez le cœur d’une ambiance pour la retrouver ici.
      </p>
    </GlassCard>
  )
}

type SpaceRowProps = {
  space: Space
  subtitle: string
  saved: boolean
  active: boolean
  playing: boolean
  onPlay: () => void
  onToggleSave: () => void
}

function SpaceRow({
  space,
  subtitle,
  saved,
  active,
  playing,
  onPlay,
  onToggleSave,
}: SpaceRowProps) {
  return (
    <div
      className={cn(
        'glass-soft flex items-center gap-3 rounded-[20px] p-2.5 transition-colors',
        active && 'border-white/20 bg-white/[0.07]',
      )}
    >
      <button
        type="button"
        onClick={onPlay}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <SpaceArt
          variant="thumb"
          space={space}
          className="size-[52px] shrink-0 rounded-[14px] border border-white/10"
        />
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">{space.name}</span>
          <span className="mt-0.5 block truncate text-[10.5px] text-white/50">{subtitle}</span>
        </span>
      </button>

      <button
        type="button"
        onClick={onToggleSave}
        aria-label={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        aria-pressed={saved}
        className="press flex size-8 shrink-0 items-center justify-center rounded-full text-white/30 hover:text-white/70"
      >
        <Heart
          aria-hidden
          className={cn('size-[15px]', saved && 'text-[#ff6482]')}
          fill={saved ? 'currentColor' : 'none'}
        />
      </button>

      <button
        type="button"
        onClick={onPlay}
        aria-label={active && playing ? `Mettre en pause ${space.name}` : `Lire ${space.name}`}
        className="press flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/85"
      >
        {active && playing ? (
          <Pause aria-hidden className="size-3.5" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play aria-hidden className="ml-0.5 size-3.5" fill="currentColor" strokeWidth={0} />
        )}
      </button>
    </div>
  )
}

function MixCard({ mix, onPlay }: { mix: Mix; onPlay: () => void }) {
  const Icon = mix.icon
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Lire le mix ${mix.name}`}
      className="press relative flex min-h-[172px] flex-col overflow-hidden rounded-[24px] border border-white/10 p-4 text-left"
      style={{ backgroundImage: `linear-gradient(155deg, ${mix.from}, ${mix.to})` }}
    >
      <span
        aria-hidden
        className="absolute -right-8 -top-10 size-28 rounded-full blur-2xl"
        style={{ background: 'rgba(255,255,255,0.18)' }}
      />
      <span className="relative flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80">
        <Icon aria-hidden className="size-4" />
      </span>
      <span className="relative mt-auto block pt-6">
        <span className="block text-[13.5px] font-medium leading-tight">{mix.name}</span>
        <span className="mt-1 block text-[10px] text-white/45">{mix.note}</span>
        <span className="mt-2 flex items-center gap-1 text-[10px] text-white/40">
          <Clock3 aria-hidden className="size-3" />
          {formatMinutes(mix.minutes)}
        </span>
      </span>
    </button>
  )
}
