import {
  BookOpen,
  CloudRain,
  Coffee,
  Flame,
  MoonStar,
  Speaker,
  TrainFront,
  Trees,
  Waves,
  Wind,
  type LucideIcon,
} from 'lucide-react'

import type { Glyph, Space } from '@/lib/data'
import { cn } from '@/lib/utils'

const GLYPHS: Record<Glyph, LucideIcon> = {
  rain: CloudRain,
  moon: MoonStar,
  flame: Flame,
  coffee: Coffee,
  ocean: Waves,
  book: BookOpen,
  train: TrainFront,
  garden: Trees,
  studio: Speaker,
  crossing: Wind,
}

export function SpaceArt({
  space,
  className,
  size = 'tile',
}: {
  space: Space
  className?: string
  size?: 'tile' | 'hero'
}) {
  const Icon = GLYPHS[space.glyph]
  const [from, , tint] = space.art

  return (
    <div
      className={cn('grain relative isolate overflow-hidden', className)}
      style={{ background: `linear-gradient(155deg, ${from} 0%, #0a0c0e 72%)` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `repeating-linear-gradient(112deg, ${tint} 0px, ${tint} 1px, transparent 1px, transparent 46px)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -top-1/3 -right-1/4 size-[90%] rounded-full border opacity-20"
        style={{ borderColor: tint }}
      />
      <div
        aria-hidden
        className="absolute -right-[6%] -bottom-[26%] size-[66%] rounded-full border opacity-15"
        style={{ borderColor: tint }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 18% 100%, ${tint}26, transparent 62%)`,
        }}
      />
      <Icon
        className={cn(
          'absolute z-10 text-white/80',
          size === 'hero' ? 'top-6 left-6 size-8' : 'top-3.5 left-3.5 size-5',
        )}
        strokeWidth={1.3}
      />
      {size === 'hero' ? (
        <span className="absolute right-6 bottom-5 z-10 font-mono text-[10px] tracking-[0.32em] text-white/50 uppercase">
          Aura
        </span>
      ) : null}
    </div>
  )
}
