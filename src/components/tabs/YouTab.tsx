import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Flame, Heart, Headphones, Moon, Smartphone, Timer } from 'lucide-react'
import { LISTENING_STATS, PROFILE } from '../../lib/data'
import { formatMinutes } from '../../lib/utils'
import { GlassCard } from '../ui/glass-card'
import { Toggle } from '../ui/toggle'

type YouTabProps = {
  savedCount: number
  hapticsEnabled: boolean
  onToggleHaptics: (value: boolean) => void
}

const goalPercent = Math.min(
  100,
  Math.round((LISTENING_STATS.minutesWeek / LISTENING_STATS.goalMinutes) * 100),
)

export function YouTab({ savedCount, hapticsEnabled, onToggleHaptics }: YouTabProps) {
  const [smartTimer, setSmartTimer] = useState(true)
  const [eveningReminder, setEveningReminder] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 md:max-w-[720px] md:px-8 lg:max-w-[880px]">
      <header className="pb-5">
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/45">Votre espace</p>
        <h1 className="mt-2 font-display text-[36px] font-semibold tracking-[-0.038em] md:text-[44px]">
          Vous
        </h1>
      </header>

      <GlassCard className="rounded-[26px] p-5">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#8b7bff]/45 blur-xl"
            />
            <div className="relative flex size-[58px] items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-[#b9aaff] to-[#5ce1d3] font-display text-[18px] font-semibold text-black/80">
              {PROFILE.initials}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate font-display text-[18px] font-medium tracking-[-0.015em]">
                {PROFILE.name}
              </p>
              <span className="shrink-0 rounded-full border border-[#b9aaff]/30 bg-[#8b7bff]/15 px-2 py-[2px] text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#cfc7ff]">
                {PROFILE.plan}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-white/50">{PROFILE.memberSince}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-3 rounded-[26px] p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.22em] text-white/45">
              Objectif d’écoute
            </p>
            <p className="mt-2 font-display text-[28px] font-semibold leading-none tracking-[-0.035em]">
              {formatMinutes(LISTENING_STATS.minutesWeek)}
            </p>
            <p className="mt-1.5 text-[10.5px] text-white/45">
              sur {formatMinutes(LISTENING_STATS.goalMinutes)} cette semaine
            </p>
          </div>
          <span className="text-[11px] font-medium text-white/50">{goalPercent}%</span>
        </div>

        <div className="mt-4 h-[7px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: reduce ? `${goalPercent}%` : 0 }}
            animate={{ width: `${goalPercent}%` }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
            className="h-full rounded-full bg-gradient-to-r from-[#8b7bff] via-[#a78bfa] to-[#5ce1d3]"
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
          <Metric icon={Headphones} value={String(LISTENING_STATS.sessions)} label="Sessions" />
          <Metric icon={Flame} value={`${LISTENING_STATS.streak} j`} label="De série" />
          <Metric icon={Heart} value={String(savedCount)} label="Favoris" />
        </div>
      </GlassCard>

      <GlassCard className="mt-6 divide-y divide-white/[0.055] rounded-[24px] p-0">
        <SettingRow
          icon={Smartphone}
          title="Retour haptique"
          description="Une vibration discrète sur chaque commande."
          control={
            <Toggle
              checked={hapticsEnabled}
              onChange={onToggleHaptics}
              label="Retour haptique"
            />
          }
        />
        <SettingRow
          icon={Timer}
          title="Minuteur intelligent"
          description="La session s’éteint quand vous vous endormez."
          control={
            <Toggle
              checked={smartTimer}
              onChange={setSmartTimer}
              label="Minuteur intelligent"
            />
          }
        />
        <SettingRow
          icon={Moon}
          title="Rappel du soir"
          description="Une invitation douce à décrocher, à 21 h 30."
          control={
            <Toggle
              checked={eveningReminder}
              onChange={setEveningReminder}
              label="Rappel du soir"
            />
          }
        />
      </GlassCard>

      <div className="mt-6 mb-2 flex flex-col items-center gap-2 py-2">
        <div
          aria-hidden
          className="size-6 rounded-full bg-[radial-gradient(circle_at_32%_28%,#c9c0ff,#5ce1d3)] opacity-80"
        />
        <p className="text-[10px] tracking-[0.02em] text-white/35">Aura 1.0 · Conçu à Paris</p>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Headphones
  value: string
  label: string
}) {
  return (
    <div>
      <Icon aria-hidden className="size-3.5 text-white/30" strokeWidth={1.8} />
      <p className="mt-2 font-display text-[17px] font-semibold leading-none tracking-[-0.02em]">
        {value}
      </p>
      <p className="mt-1.5 text-[9.5px] text-white/45">{label}</p>
    </div>
  )
}

function SettingRow({
  icon: Icon,
  title,
  description,
  control,
}: {
  icon: typeof Smartphone
  title: string
  description: string
  control: ReactNode
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/8 bg-white/[0.05] text-white/55">
        <Icon aria-hidden className="size-[15px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium">{title}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-white/45">{description}</p>
      </div>
      {control}
    </div>
  )
}
