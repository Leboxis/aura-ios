import {
  ArrowUpRight,
  Flame,
  Headphones,
  Play,
  Shuffle,
  Sparkles,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { CardSpotlight } from '@/components/aceternity/card-spotlight'
import { HoverBorderGradient } from '@/components/aceternity/hover-border-gradient'
import { Spotlight } from '@/components/aceternity/spotlight'
import { TextGenerate } from '@/components/aceternity/text-generate'
import { Screen, SectionTitle } from '@/components/app/Screen'
import { SpaceCard } from '@/components/app/SpaceCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MOODS, SPACES, STATS, WEEK, WEEK_TOTAL } from '@/lib/data'
import { usePlayer } from '@/lib/player'
import type { TabId } from '@/lib/tabs'
import { cn } from '@/lib/utils'

const PICKS = [SPACES[0], SPACES[4], SPACES[2], SPACES[9]]

export function HomeScreen({
  onNavigate,
  onOpenPlayer,
}: {
  onNavigate: (tab: TabId) => void
  onOpenPlayer: () => void
}) {
  const { play } = usePlayer()
  const featured = SPACES[1]

  const now = new Date()
  const date = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bel après-midi' : 'Bonsoir'

  return (
    <Screen>
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.34em] text-muted-foreground uppercase">
            Aura · {date}
          </p>
          <h1 className="mt-3 font-display text-[34px] leading-[1.02] tracking-[-0.04em]">
            {greeting},
            <br />
            pose-toi.
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('you')}
          aria-label="Ouvrir ton profil"
          className="glass grid size-11 shrink-0 place-items-center rounded-full text-xs font-medium tracking-[0.08em] text-foreground/80"
        >
          FK
        </button>
      </header>

      <CardSpotlight className="mt-8">
        <Spotlight className="-top-56 left-[70%]" color="rgba(216,255,99,0.22)" />
        <div className="relative z-10 flex flex-col gap-6 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div className="max-w-sm">
            <Badge>
              <Sparkles className="size-3" />
              Séance du soir
            </Badge>
            <TextGenerate
              text="Ralentis la nuit."
              className="mt-4 font-display text-[40px] leading-[0.96] tracking-[-0.045em] sm:text-[46px]"
            />
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
              {featured.title} · {featured.minutes} min. Un drone froid pour couper la journée net.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <HoverBorderGradient
                onClick={() => {
                  play(featured)
                  onOpenPlayer()
                }}
              >
                <Play className="size-4 fill-primary text-primary" />
                Démarrer {featured.minutes} min
              </HoverBorderGradient>
              <Button
                variant="glass"
                size="icon"
                aria-label="Lancer une ambiance au hasard"
                onClick={() => {
                  play(SPACES[Math.floor(Math.random() * SPACES.length)])
                  onOpenPlayer()
                }}
              >
                <Shuffle className="size-4" />
              </Button>
            </div>
          </div>
          <Dial minutes={featured.minutes} />
        </div>
      </CardSpotlight>

      <SectionTitle
        action={
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Tout voir <ArrowUpRight className="size-3.5" />
          </button>
        }
      >
        À écouter maintenant
      </SectionTitle>

      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4">
        {PICKS.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>

      <SectionTitle>Ta semaine</SectionTitle>
      <div className="glass rounded-3xl p-5">
        <div className="grid grid-cols-3 gap-3">
          <Stat icon={Flame} value={`${STATS.streak} j`} label="série" />
          <Stat icon={Headphones} value={`${WEEK_TOTAL} min`} label="écoutées" />
          <Stat icon={Timer} value={`${STATS.sessions}`} label="séances" />
        </div>
        <div aria-hidden className="mt-6 flex h-16 items-end gap-1.5">
          {WEEK.map((entry, index) => (
            <div
              key={`${entry.day}-${index}`}
              className="relative h-full flex-1 overflow-hidden rounded-full bg-white/[0.05]"
            >
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 rounded-full',
                  index === 5 ? 'bg-primary/85' : 'bg-white/20',
                )}
                style={{ height: `${(entry.minutes / 80) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex justify-between font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
          {WEEK.map((entry, index) => (
            <span key={`${entry.day}-label-${index}`} className="flex-1 text-center">
              {entry.day}
            </span>
          ))}
        </div>
      </div>

      <SectionTitle>Par humeur</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {MOODS.filter((mood) => mood.value !== 'tous').map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onNavigate('explore')}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
          >
            {mood.label}
          </button>
        ))}
      </div>
    </Screen>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Icon className="size-4 text-primary/80" strokeWidth={1.7} />
      <p className="font-mono text-lg leading-none tracking-[-0.02em] tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

function Dial({ minutes }: { minutes: number }) {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden
      className="relative grid size-28 shrink-0 place-items-center self-end sm:size-32"
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2.5"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="#d8ff63"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="326.7"
          initial={reduce ? { strokeDashoffset: 120 } : { strokeDashoffset: 326.7 }}
          animate={{ strokeDashoffset: 120 }}
          transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1], delay: 0.35 }}
        />
      </svg>
      <div className="text-center">
        <p className="font-mono text-[26px] leading-none tracking-[-0.03em] tabular-nums">
          {minutes}:00
        </p>
        <p className="mt-2 text-[9px] tracking-[0.26em] text-muted-foreground uppercase">boucle</p>
      </div>
    </div>
  )
}
