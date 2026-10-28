import { Heart, Play } from 'lucide-react'

import { SpaceArt } from '@/components/app/SpaceArt'
import { MOOD_LABELS, type Space } from '@/lib/data'
import { haptic } from '@/lib/haptics'
import { usePlayer } from '@/lib/player'
import { cn } from '@/lib/utils'

export function SpaceCard({ space, className }: { space: Space; className?: string }) {
  const { play, likes, toggleLike, settings } = usePlayer()
  const liked = likes.includes(space.id)

  return (
    <article className={cn('group relative', className)}>
      <button
        type="button"
        onClick={() => {
          play(space)
          void haptic(settings.haptics)
        }}
        className="block w-full rounded-3xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label={`Lire ${space.title}`}
      >
        <div className="relative overflow-hidden rounded-3xl">
          <SpaceArt
            space={space}
            className="aspect-square w-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
          />
          <span className="glass absolute right-3 bottom-3 grid size-9 translate-y-1 place-items-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <Play className="size-3.5 fill-foreground text-foreground" />
          </span>
        </div>
        <div className="mt-3 pr-9">
          <h3 className="truncate text-[15px] font-medium tracking-[-0.01em]">{space.title}</h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {space.minutes} min · {MOOD_LABELS[space.mood]}
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => {
          toggleLike(space.id)
          void haptic(settings.haptics)
        }}
        aria-label={liked ? `Retirer ${space.title} des favoris` : `Ajouter ${space.title} aux favoris`}
        aria-pressed={liked}
        className={cn(
          'absolute top-2.5 right-2.5 z-20 grid size-8 place-items-center rounded-full border border-white/10 bg-black/25 backdrop-blur-xl transition-all hover:bg-black/45',
          liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
        )}
      >
        <Heart className={cn('size-3.5', liked ? 'fill-primary text-primary' : 'text-white/80')} />
      </button>
    </article>
  )
}
