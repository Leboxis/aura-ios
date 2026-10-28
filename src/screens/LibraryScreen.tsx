import { useState } from 'react'
import { Heart, Pause, Play, Shuffle } from 'lucide-react'

import { PageHeader, Screen } from '@/components/app/Screen'
import { SpaceArt } from '@/components/app/SpaceArt'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SPACES, spaceById, type Space } from '@/lib/data'
import { haptic } from '@/lib/haptics'
import { usePlayer } from '@/lib/player'
import type { TabId } from '@/lib/tabs'
import { cn } from '@/lib/utils'

export function LibraryScreen({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const { likes, recent, play } = usePlayer()
  const [tab, setTab] = useState('likes')

  const likedSpaces = SPACES.filter((space) => likes.includes(space.id))
  const recentSpaces = recent.map(spaceById)

  return (
    <Screen>
      <PageHeader
        kicker="Bibliothèque"
        title="Ce que tu gardes."
        description="Tes favoris, tes dernières écoutes et tout le catalogue."
        action={
          <Button
            variant="glass"
            size="icon"
            aria-label="Lancer une ambiance au hasard"
            onClick={() => play(SPACES[Math.floor(Math.random() * SPACES.length)])}
          >
            <Shuffle className="size-4" />
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="likes">Favoris</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="all">Tout</TabsTrigger>
        </TabsList>

        <TabsContent value="likes" className="mt-5">
          <Rows
            spaces={likedSpaces}
            emptyTitle="Aucun favori"
            emptyText="Touche le cœur sur une ambiance pour la retrouver ici."
            onExplore={() => onNavigate('explore')}
          />
        </TabsContent>
        <TabsContent value="recent" className="mt-5">
          <Rows
            spaces={recentSpaces}
            emptyTitle="Rien d'écouté"
            emptyText="Lance une ambiance : elle apparaîtra dans cette liste."
            onExplore={() => onNavigate('explore')}
          />
        </TabsContent>
        <TabsContent value="all" className="mt-5">
          <Rows spaces={SPACES} emptyTitle="Catalogue vide" emptyText="Aucune ambiance disponible." />
        </TabsContent>
      </Tabs>
    </Screen>
  )
}

function Rows({
  spaces,
  emptyTitle,
  emptyText,
  onExplore,
}: {
  spaces: Space[]
  emptyTitle: string
  emptyText: string
  onExplore?: () => void
}) {
  const { current, playing, play, likes, toggleLike, settings } = usePlayer()

  if (spaces.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center px-6 text-center">
        <div className="grid size-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
          <Heart className="size-6 text-muted-foreground" />
        </div>
        <h2 className="mt-4 font-display text-xl tracking-[-0.02em]">{emptyTitle}</h2>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">{emptyText}</p>
        {onExplore ? (
          <Button variant="outline" className="mt-6" onClick={onExplore}>
            Explorer les ambiances
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {spaces.map((space) => {
        const isCurrent = current.id === space.id
        const isPlaying = isCurrent && playing
        const liked = likes.includes(space.id)

        return (
          <div
            key={space.id}
            className={cn(
              'group flex items-center gap-3 rounded-2xl border p-2.5 transition-colors',
              isCurrent
                ? 'border-primary/25 bg-primary/[0.06]'
                : 'border-white/6 bg-white/[0.025] hover:bg-white/[0.05]',
            )}
          >
            <button
              type="button"
              onClick={() => {
                play(space)
                void haptic(settings.haptics)
              }}
              aria-label={`Lire ${space.title}`}
              className="relative shrink-0 overflow-hidden rounded-xl"
            >
              <SpaceArt space={space} className="size-14" />
              <span
                className={cn(
                  'absolute inset-0 grid place-items-center bg-black/35 transition-opacity',
                  isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                )}
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-white text-white" />
                ) : (
                  <Play className="size-4 translate-x-px fill-white text-white" />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => play(space)}
              className="min-w-0 flex-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <p className={cn('truncate text-sm font-medium', isCurrent && 'text-primary')}>
                {space.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {space.minutes} min · {space.subtitle}
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                toggleLike(space.id)
                void haptic(settings.haptics)
              }}
              aria-label={liked ? `Retirer ${space.title} des favoris` : `Ajouter ${space.title} aux favoris`}
              aria-pressed={liked}
              className="grid size-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/8"
            >
              <Heart
                className={cn('size-4', liked ? 'fill-primary text-primary' : 'text-muted-foreground')}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}
