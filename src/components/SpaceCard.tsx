import { useRef, type PointerEvent } from 'react'
import { Pause, Play } from 'lucide-react'
import type { Space } from '../lib/data'
import { cn } from '../lib/utils'
import { SpaceArt } from './SpaceArt'

type SpaceCardProps = {
  space: Space
  onSelect: (space: Space) => void
  active?: boolean
  playing?: boolean
  className?: string
}

export function SpaceCard({ space, onSelect, active, playing, className }: SpaceCardProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (event: PointerEvent<HTMLButtonElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <button
      ref={ref}
      type="button"
      onPointerMove={handleMove}
      onClick={() => onSelect(space)}
      aria-label={`${space.name} — ${space.minutes} minutes`}
      aria-pressed={active}
      className={cn(
        'press group relative block w-full overflow-hidden rounded-[24px] text-left',
        active && 'ring-2 ring-white/40',
        className,
      )}
      style={
        active
          ? { boxShadow: `0 22px 60px -28px ${space.glow}` }
          : { boxShadow: '0 18px 44px -30px rgba(0,0,0,0.9)' }
      }
    >
      <SpaceArt space={space} className="aspect-[4/5] w-full rounded-[24px]" />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[24px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.20), transparent 70%)',
        }}
      />

      <span className="absolute right-2.5 top-2.5 z-20 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md">
        {active && playing ? (
          <Pause aria-hidden className="size-3" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play aria-hidden className="ml-0.5 size-3" fill="currentColor" strokeWidth={0} />
        )}
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 block p-3.5">
        <span className="block text-[13px] font-medium leading-tight tracking-[-0.01em]">
          {space.name}
        </span>
        <span className="mt-1 block text-[10.5px] text-white/55">
          {space.minutes} min · {space.mood}
        </span>
      </span>
    </button>
  )
}
