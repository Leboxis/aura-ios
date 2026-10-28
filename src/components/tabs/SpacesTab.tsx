import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Search, Shuffle, X } from 'lucide-react'
import { MOODS, SPACES, type Space } from '../../lib/data'
import type { Player } from '../../lib/usePlayer'
import { cn } from '../../lib/utils'
import { GlassCard } from '../ui/glass-card'
import { SpaceCard } from '../SpaceCard'

type SpacesTabProps = {
  player: Player
  onStart: (space: Space) => void
  onShuffle: () => void
}

export function SpacesTab({ player, onStart, onShuffle }: SpacesTabProps) {
  const [mood, setMood] = useState<(typeof MOODS)[number]>('Tout')
  const [query, setQuery] = useState('')
  const reduce = useReducedMotion()

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return SPACES.filter((space) => {
      const matchesMood = mood === 'Tout' || space.mood === mood
      const matchesQuery =
        term.length === 0 ||
        space.name.toLowerCase().includes(term) ||
        space.place.toLowerCase().includes(term) ||
        space.mood.toLowerCase().includes(term)
      return matchesMood && matchesQuery
    })
  }, [mood, query])

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 md:max-w-[720px] md:px-8 lg:max-w-[880px]">
      <header className="pb-5">
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/45">
          Huit environnements
        </p>
        <h1 className="mt-2 font-display text-[36px] font-semibold tracking-[-0.038em] md:text-[44px]">
          Espaces
        </h1>
        <p className="mt-2 max-w-[320px] text-[12.5px] leading-relaxed text-white/50">
          Des lieux que l’on n’habite pas, mais qui nous calment.
        </p>
      </header>

      <button
        type="button"
        onClick={onShuffle}
        className="press glass relative flex w-full items-center gap-3 overflow-hidden rounded-[24px] p-3.5 text-left"
      >
        <span
          aria-hidden
          className="absolute -right-10 -top-12 size-32 rounded-full bg-[#8b7bff]/25 blur-2xl"
        />
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b9aaff] to-[#5ce1d3] text-black/80">
          <Shuffle aria-hidden className="size-[17px]" />
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="block text-[13px] font-medium">Surprends-moi</span>
          <span className="mt-0.5 block text-[10.5px] text-white/40">
            Une ambiance au hasard, tout de suite.
          </span>
        </span>
        <ArrowUpRight aria-hidden className="relative size-4 text-white/30" />
      </button>

      <div className="glass-soft mt-4 flex items-center gap-2.5 rounded-full px-4 py-3">
        <Search aria-hidden className="size-4 shrink-0 text-white/35" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une ambiance, un lieu…"
          aria-label="Rechercher une ambiance"
          enterKeyHint="search"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-white/30 focus:outline-none"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Effacer la recherche"
            className="press flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60"
          >
            <X aria-hidden className="size-3.5" />
          </button>
        )}
      </div>

      <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar md:-mx-8 md:px-8">
        {MOODS.map((option) => {
          const selected = option === mood
          return (
            <button
              key={option}
              type="button"
              onClick={() => setMood(option)}
              aria-pressed={selected}
              className={cn(
                'press shrink-0 rounded-full px-3.5 py-2 text-[11.5px] font-medium transition-colors duration-200',
                selected
                  ? 'bg-ink text-canvas'
                  : 'border border-white/10 bg-white/[0.04] text-white/60',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h2 className="text-[13px] font-medium text-white/55">
          {filtered.length} {filtered.length > 1 ? 'espaces' : 'espace'}
        </h2>
        {mood !== 'Tout' && (
          <button
            type="button"
            onClick={() => setMood('Tout')}
            className="press text-[11px] text-white/45 hover:text-white/70"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="mt-3 flex flex-col items-center rounded-[24px] px-6 py-12 text-center">
          <Search aria-hidden className="size-6 text-white/25" />
          <p className="mt-3 text-[13px] font-medium">Aucune ambiance trouvée</p>
          <p className="mt-1 text-[11px] text-white/45">
            Essayez « pluie », « nuit » ou un autre lieu.
          </p>
        </GlassCard>
      ) : (
        <motion.div
          key={`${mood}-${query}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onSelect={onStart}
              active={player.spaceId === space.id && player.started}
              playing={player.playing}
            />
          ))}
        </motion.div>
      )}

      <p className="mt-6 mb-2 text-center text-[10px] leading-relaxed text-white/30">
        Toutes les ambiances sont générées localement, sans publicité.
      </p>
    </div>
  )
}
