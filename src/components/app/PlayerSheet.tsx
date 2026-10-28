import { ChevronDown, Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

import { BackgroundBeams } from '@/components/aceternity/background-beams'
import { SpaceArt } from '@/components/app/SpaceArt'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { haptic } from '@/lib/haptics'
import { usePlayer } from '@/lib/player'
import { cn, formatClock } from '@/lib/utils'

export function PlayerSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const {
    current,
    playing,
    elapsed,
    duration,
    queue,
    likes,
    settings,
    toggle,
    seek,
    next,
    previous,
    toggleLike,
    play,
  } = usePlayer()

  const liked = likes.includes(current.id)
  const index = queue.findIndex((space) => space.id === current.id)
  const upNext = [1, 2]
    .map((offset) => queue[(index + offset) % queue.length])
    .filter((space) => space.id !== current.id)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showClose={false}
        className="glass-strong h-[96dvh] max-h-[96dvh] rounded-t-[2.4rem] border-x-0 border-b-0 bg-[#0a0c0f]/72 p-0"
      >
        <div className="no-scrollbar relative flex h-full flex-col overflow-y-auto px-6 pt-3 pb-[max(env(safe-area-inset-bottom),26px)]">
          <BackgroundBeams className="opacity-30" />
          <div className="relative z-10 mx-auto h-1 w-10 shrink-0 rounded-full bg-white/20" />

          <SheetHeader className="relative z-10 mt-5 flex-row items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Aura · en lecture
              </p>
              <SheetTitle className="mt-1 text-base font-medium">Séance immersive</SheetTitle>
              <SheetDescription className="sr-only">
                Lecteur de l&apos;ambiance {current.title}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button
                variant="glass"
                size="icon-sm"
                aria-label="Réduire le lecteur"
                className="focus-visible:ring-1 focus-visible:ring-white/30"
              >
                <ChevronDown className="size-4" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <div className="relative z-10 mt-6 shrink-0">
            <SpaceArt
              space={current}
              size="hero"
              className="aspect-square w-full rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]"
            />
          </div>

          <div className="relative z-10 mt-7 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-[27px] leading-tight tracking-[-0.035em]">
                {current.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {current.subtitle} · {current.minutes} min
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                toggleLike(current.id)
                void haptic(settings.haptics)
              }}
              aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              aria-pressed={liked}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <Heart className={cn('size-[18px]', liked ? 'fill-primary text-primary' : 'text-muted-foreground')} />
            </button>
          </div>

          <div className="relative z-10 mt-6">
            <Slider
              min={0}
              max={duration}
              step={1}
              value={[elapsed]}
              onValueChange={([value]) => seek(value)}
              aria-label="Progression de la lecture"
              className="py-2"
            />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
              <span>{formatClock(elapsed)}</span>
              <span>-{formatClock(Math.max(0, duration - elapsed))}</span>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex items-center justify-center gap-7">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                previous()
                void haptic(settings.haptics)
              }}
              aria-label="Ambiance précédente"
            >
              <SkipBack className="size-5" />
            </Button>

            <button
              type="button"
              onClick={() => {
                toggle()
                void haptic(settings.haptics, 'medium')
              }}
              aria-label={playing ? 'Mettre en pause' : 'Lancer la lecture'}
              className="grid size-[72px] place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_22px_60px_-22px_rgba(216,255,99,0.9)] transition-transform active:scale-95"
            >
              {playing ? (
                <Pause className="size-6 fill-current" />
              ) : (
                <Play className="size-6 translate-x-0.5 fill-current" />
              )}
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                next()
                void haptic(settings.haptics)
              }}
              aria-label="Ambiance suivante"
            >
              <SkipForward className="size-5" />
            </Button>
          </div>

          <div className="relative z-10 mt-10">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Ensuite
            </p>
            <div className="mt-3 space-y-2">
              {upNext.map((space) => (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => play(space)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.03] p-2.5 text-left transition-colors hover:bg-white/[0.06] active:scale-[0.99]"
                >
                  <SpaceArt space={space} className="size-10 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{space.title}</p>
                    <p className="text-[11px] text-muted-foreground">{space.minutes} min</p>
                  </div>
                  <Play className="size-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
