import { motion, useReducedMotion } from 'motion/react'
import {
  ChevronRight,
  Flame,
  Headphones,
  Pause,
  Play,
  Sparkles,
  Timer,
} from 'lucide-react'
import {
  LISTENING_STATS,
  NIGHTLY_SESSION,
  SPACES,
  WEEK,
  type Space,
  type TabId,
} from '../../lib/data'
import type { Player } from '../../lib/usePlayer'
import { cn, formatClock, formatMinutes } from '../../lib/utils'
import { BackgroundBeams } from '../aceternity/background-beams'
import { Spotlight } from '../aceternity/spotlight'
import { Button } from '../ui/button'
import { Equalizer } from '../ui/equalizer'
import { GlassCard } from '../ui/glass-card'
import { FocusRing } from '../FocusRing'
import { SpaceCard } from '../SpaceCard'

type TodayTabProps = {
  player: Player
  onStart: (space: Space) => void
  onOpenPlayer: () => void
  onNavigate: (tab: TabId) => void
}

const dateLabel = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())

const hour = new Date().getHours()
const greeting = hour >= 18 || hour < 5 ? 'Bonsoir' : 'Bonjour'

const stats = [
  { icon: Timer, value: String(LISTENING_STATS.minutesToday), unit: 'min', label: "Aujourd'hui" },
  { icon: Flame, value: String(LISTENING_STATS.streak), unit: 'j', label: 'De série' },
  { icon: Headphones, value: String(LISTENING_STATS.sessions), unit: '', label: 'Sessions' },
]

const suggestions = SPACES.filter((space) => ['rain', 'forest', 'night'].includes(space.id))
const maxWeek = Math.max(...WEEK.map((day) => day.minutes))

export function TodayTab({ player, onStart, onOpenPlayer, onNavigate }: TodayTabProps) {
  const reduce = useReducedMotion()
  const active = Boolean(player.space && player.started)
  const display = active && player.space ? player.space : NIGHTLY_SESSION
  const progress = active ? player.progress : 0
  const time = active ? formatClock(player.remaining) : formatClock(NIGHTLY_SESSION.minutes * 60)
  const hint = active
    ? player.playing
      ? 'En cours'
      : 'En pause'
    : 'Prêt quand vous l’êtes'
  const ctaLabel = active ? (player.playing ? 'Pause' : 'Reprendre') : 'Commencer'

  const enter = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
          },
        }

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 md:max-w-[720px] md:px-8 lg:max-w-[880px]">
      <header className="pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.38em] text-white/55">
            Aura
          </span>
          <button
            type="button"
            onClick={() => onNavigate('you')}
            aria-label="Ouvrir votre profil"
            className="press relative flex size-9 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-[#8b7bff] to-[#5ce1d3] text-[11px] font-semibold text-black/80"
          >
            LM
          </button>
        </div>

        <p className="mt-7 text-[10.5px] uppercase tracking-[0.22em] text-white/45 first-letter:uppercase">
          {dateLabel}
        </p>
        <h1 className="mt-2.5 font-display text-[38px] font-semibold leading-[1.02] tracking-[-0.038em] md:text-[46px]">
          {greeting},
          <br />
          <span className="text-white/38">on ralentit&nbsp;?</span>
        </h1>
      </header>

      <motion.div {...enter(0.02)}>
        <Spotlight className="rounded-[32px]" size={520}>
          <GlassCard className="rounded-[32px] p-5 md:p-7">
            <BackgroundBeams className="opacity-60" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-start justify-between gap-4 lg:flex-1 lg:flex-col">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/10 px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.16em] text-white/70">
                    <span
                      className={cn(
                        'size-1.5 rounded-full',
                        active && player.playing
                          ? 'bg-[#5ce1d3] shadow-[0_0_8px_#5ce1d3]'
                          : 'bg-white/40',
                      )}
                    />
                    {active ? 'Session en cours' : 'Séance du soir'}
                  </span>
                  <h2 className="mt-3.5 font-display text-[26px] font-semibold leading-tight tracking-[-0.025em] md:text-[30px]">
                    {display.name}
                  </h2>
                  <p className="mt-1.5 text-[12.5px] text-white/45">
                    {display.minutes} min · {display.place}
                  </p>
                  <p className="mt-3 hidden max-w-[280px] text-[12.5px] leading-relaxed text-white/50 md:block">
                    {display.description}
                  </p>
                </div>
                <Equalizer
                  active={active && player.playing}
                  className="mt-1 text-[#a99bff] lg:mt-6"
                />
              </div>

              <div className="flex flex-col items-center lg:flex-1">
                <FocusRing
                  progress={progress}
                  time={time}
                  label={active ? 'Restant' : 'Session'}
                  hint={hint}
                  size={190}
                />

                <Button
                  onClick={() => (active ? player.toggle() : onStart(NIGHTLY_SESSION))}
                  size="lg"
                  className="mt-4 w-full text-[15px] font-semibold lg:w-[280px]"
                >
                  {active && player.playing ? (
                    <Pause aria-hidden className="size-4" fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Play
                      aria-hidden
                      className="size-4"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}
                  {ctaLabel}
                </Button>

                {active ? (
                  <button
                    type="button"
                    onClick={onOpenPlayer}
                    className="press mt-2.5 flex items-center gap-1 text-[11.5px] font-medium text-white/45 hover:text-white/80"
                  >
                    Ouvrir le lecteur
                    <ChevronRight aria-hidden className="size-3.5" />
                  </button>
                ) : (
                  <p className="mt-2.5 text-[10.5px] text-white/40">
                    {formatMinutes(NIGHTLY_SESSION.minutes)} · pluie douce
                  </p>
                )}
              </div>
            </div>
          </GlassCard>
        </Spotlight>
      </motion.div>

      <motion.div {...enter(0.08)} className="mt-3 grid grid-cols-3 gap-2.5">
        {stats.map(({ icon: Icon, value, unit, label }) => (
          <div key={label} className="glass-soft rounded-[20px] px-3.5 py-3.5">
            <Icon aria-hidden className="size-3.5 text-white/45" strokeWidth={1.8} />
            <p className="mt-2.5 font-display text-[20px] font-semibold leading-none tracking-[-0.02em]">
              {value}
              {unit && <span className="ml-1 text-[10px] font-normal text-white/45">{unit}</span>}
            </p>
            <p className="mt-1.5 text-[9.5px] text-white/45">{label}</p>
          </div>
        ))}
      </motion.div>

      <motion.section {...enter(0.14)} className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[14px] font-medium tracking-[-0.01em]">Pour vous ce soir</h2>
          <button
            type="button"
            onClick={() => onNavigate('spaces')}
            className="press flex items-center gap-0.5 text-[11px] text-white/45 hover:text-white/70"
          >
            Tout voir
            <ChevronRight aria-hidden className="size-3.5" />
          </button>
        </div>

        <div className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 no-scrollbar md:-mx-8 md:px-8">
          {suggestions.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onSelect={onStart}
              active={player.spaceId === space.id && player.started}
              playing={player.playing}
              className="w-[150px] shrink-0 snap-start md:w-[168px]"
            />
          ))}
          <button
            type="button"
            onClick={() => onNavigate('spaces')}
            className="press flex w-[150px] shrink-0 snap-start flex-col items-center justify-center gap-2.5 rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] text-white/35 md:w-[168px]"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]">
              <Sparkles aria-hidden className="size-4" />
            </span>
            <span className="text-[11px]">Tous les espaces</span>
          </button>
        </div>
      </motion.section>

      <motion.section {...enter(0.2)} className="mt-8">
        <GlassCard className="rounded-[26px] p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[13px] font-medium">Votre semaine</p>
              <p className="mt-0.5 text-[10.5px] text-white/45">Temps d’écoute</p>
            </div>
            <p className="font-display text-[19px] font-semibold tracking-[-0.02em]">
              {formatMinutes(LISTENING_STATS.minutesWeek)}
            </p>
          </div>

          <div className="mt-5 flex h-[100px] items-end gap-2">
            {WEEK.map((day, index) => (
              <div key={index} className="flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(8, (day.minutes / maxWeek) * 100)}%` }}
                    transition={{
                      duration: 0.7,
                      delay: 0.32 + index * 0.05,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className={cn(
                      'w-full rounded-full',
                      index === WEEK.length - 1
                        ? 'bg-gradient-to-t from-[#7b68f0] to-[#5ce1d3]'
                        : 'bg-white/12',
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-[9px]',
                    index === WEEK.length - 1 ? 'text-white/70' : 'text-white/38',
                  )}
                >
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      <motion.section {...enter(0.26)} className="mt-8 mb-2">
        <div className="rounded-[26px] border border-white/8 bg-white/[0.025] px-6 py-7 text-center">
          <p className="font-display text-[16px] leading-snug tracking-[-0.01em] text-white/65">
            « Le calme n’est pas un endroit.
            <br />
            C’est une pratique. »
          </p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-white/35">Aura Daily</p>
        </div>
      </motion.section>
    </div>
  )
}
