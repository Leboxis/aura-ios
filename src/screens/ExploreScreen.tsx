import { useState } from 'react'
import { Search, SearchX } from 'lucide-react'

import { PageHeader, Screen } from '@/components/app/Screen'
import { SpaceCard } from '@/components/app/SpaceCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOODS, SPACES, type Mood } from '@/lib/data'

export function ExploreScreen() {
  const [query, setQuery] = useState('')
  const [mood, setMood] = useState<Mood | 'tous'>('tous')

  const needle = query.trim().toLowerCase()
  const results = SPACES.filter((space) => {
    const matchesMood = mood === 'tous' || space.mood === mood
    const matchesQuery =
      needle.length === 0 ||
      `${space.title} ${space.subtitle}`.toLowerCase().includes(needle)
    return matchesMood && matchesQuery
  })

  return (
    <Screen>
      <PageHeader
        kicker="Explorer"
        title="Trouve ton fond."
        description="Dix ambiances, cinq humeurs, aucune notification."
      />

      <div className="relative mt-7">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pluie, nuit, bibliothèque…"
          aria-label="Rechercher une ambiance"
          className="pl-11"
          type="search"
        />
      </div>

      <Tabs
        value={mood}
        onValueChange={(value) => setMood(value as Mood | 'tous')}
        className="mt-5"
      >
        <TabsList aria-label="Filtrer par humeur">
          {MOODS.map((entry) => (
            <TabsTrigger key={entry.value} value={entry.value}>
              {entry.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-7 flex items-baseline justify-between">
        <p className="text-sm text-muted-foreground">
          {results.length} ambiance{results.length > 1 ? 's' : ''}
        </p>
        {query.length > 0 ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-xs text-primary transition-opacity hover:opacity-70"
          >
            Effacer
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
          {results.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center px-6 text-center">
          <div className="grid size-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <SearchX className="size-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-display text-xl tracking-[-0.02em]">Rien ici.</h2>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Aucune ambiance ne correspond à «&nbsp;{query}&nbsp;» dans cette humeur.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setQuery('')
              setMood('tous')
            }}
          >
            Réinitialiser
          </Button>
        </div>
      )}
    </Screen>
  )
}
