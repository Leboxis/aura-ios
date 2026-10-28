import { Flame, Heart, RotateCcw, Timer, type LucideIcon } from 'lucide-react'

import { Meteors } from '@/components/aceternity/meteors'
import { PageHeader, Screen, SectionTitle } from '@/components/app/Screen'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { STATS, WEEK, WEEK_TOTAL } from '@/lib/data'
import { usePlayer } from '@/lib/player'
import { cn } from '@/lib/utils'

const MAX_DAY = Math.max(...WEEK.map((entry) => entry.minutes))
const TODAY_INDEX = (new Date().getDay() + 6) % 7

export function ProfileScreen() {
  const { likes, settings, setSetting, resetLikes } = usePlayer()
  const weeklyGoal = settings.dailyGoal * 7
  const weeklyPercent = Math.min(100, Math.round((WEEK_TOTAL / weeklyGoal) * 100))
  const today = WEEK[TODAY_INDEX].minutes

  return (
    <Screen>
      <PageHeader
        kicker="Vous"
        title="Ton espace."
        description="Réglages, chiffres, favoris. Tout reste sur cet iPhone."
      />

      <div className="mt-7 flex items-center gap-4 rounded-3xl border border-white/8 bg-white/[0.025] p-4">
        <Avatar className="size-14 border border-white/10">
          <AvatarFallback className="bg-primary/12 font-mono text-sm text-primary">FK</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium">Fontaine</p>
          <p className="text-xs text-muted-foreground">Membre depuis octobre 2026</p>
        </div>
        <Badge variant="secondary">
          <Heart className="size-3" />
          {likes.length}
        </Badge>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-white/8 bg-[#0a0c0e] p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <Meteors number={7} />
        </div>
        <div className="relative z-10">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Cette semaine
          </p>
          <p className="mt-3 font-display text-5xl tracking-[-0.05em] tabular-nums">
            {WEEK_TOTAL}
            <span className="ml-2 text-base font-normal tracking-normal text-muted-foreground">
              min
            </span>
          </p>
          <Progress value={weeklyPercent} className="mt-5" />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>Objectif {(weeklyGoal / 60).toLocaleString('fr-FR')} h</span>
            <span className="font-mono tabular-nums">{weeklyPercent} %</span>
          </div>
        </div>
      </div>

      <SectionTitle>Rythme</SectionTitle>
      <div className="glass rounded-3xl p-5">
        <div aria-hidden className="flex h-24 items-end gap-2">
          {WEEK.map((entry, index) => (
            <div key={`${entry.day}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div className="relative w-full flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 rounded-full',
                    index === TODAY_INDEX ? 'bg-primary/85' : 'bg-white/18',
                  )}
                  style={{ height: `${Math.max(6, (entry.minutes / MAX_DAY) * 100)}%` }}
                />
              </div>
              <span
                className={cn(
                  'text-center font-mono text-[9px] uppercase',
                  index === TODAY_INDEX ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {entry.day}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/8 pt-5">
          <Metric icon={Flame} label="Série" value={`${STATS.streak} j`} />
          <Metric icon={Timer} label="Aujourd'hui" value={`${today} min`} />
          <Metric icon={Heart} label="Séances" value={`${STATS.sessions}`} />
        </div>
      </div>

      <SectionTitle>Réglages</SectionTitle>
      <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025]">
        <SettingRow
          title="Haptiques"
          description="Un retour physique sur chaque geste"
          checked={settings.haptics}
          onChange={(value) => setSetting('haptics', value)}
        />
        <Separator />
        <SettingRow
          title="Lecture automatique"
          description="Enchaîner l'ambiance suivante"
          checked={settings.autoplay}
          onChange={(value) => setSetting('autoplay', value)}
        />
        <Separator />
        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Objectif quotidien</p>
              <p className="mt-0.5 text-xs text-muted-foreground">La cible de tes statistiques</p>
            </div>
            <span className="font-mono text-xs text-primary tabular-nums">
              {settings.dailyGoal} min
            </span>
          </div>
          <Slider
            className="mt-5"
            min={15}
            max={180}
            step={15}
            value={[settings.dailyGoal]}
            onValueChange={([value]) => setSetting('dailyGoal', value)}
            aria-label="Objectif quotidien en minutes"
          />
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={resetLikes}
        disabled={likes.length === 0}
      >
        <RotateCcw className="size-4" />
        Réinitialiser les favoris
      </Button>

      <p className="mt-10 text-center font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
        Aura · iOS 15+ · arm64
      </p>
    </Screen>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div>
      <Icon className="size-4 text-muted-foreground" strokeWidth={1.7} />
      <p className="mt-2 font-mono text-sm tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

function SettingRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
    </div>
  )
}
