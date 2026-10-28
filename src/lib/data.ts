export type Mood = 'pluie' | 'nuit' | 'feu' | 'focus' | 'nature'

export type Glyph = 'rain' | 'moon' | 'flame' | 'coffee' | 'ocean' | 'book' | 'train' | 'garden' | 'studio' | 'crossing'

export type Space = {
  id: string
  title: string
  subtitle: string
  mood: Mood
  minutes: number
  glyph: Glyph
  art: [string, string, string]
}

export const MOOD_LABELS: Record<Mood, string> = {
  pluie: 'Pluie',
  nuit: 'Nuit',
  feu: 'Feu',
  focus: 'Focus',
  nature: 'Nature',
}

export const MOODS: { value: Mood | 'tous'; label: string }[] = [
  { value: 'tous', label: 'Tout' },
  { value: 'pluie', label: 'Pluie' },
  { value: 'nuit', label: 'Nuit' },
  { value: 'feu', label: 'Feu' },
  { value: 'focus', label: 'Focus' },
  { value: 'nature', label: 'Nature' },
]

export const SPACES: Space[] = [
  {
    id: 'pluie-toit',
    title: 'Pluie sur le toit',
    subtitle: 'Gouttières, orage lointain',
    mood: 'pluie',
    minutes: 42,
    glyph: 'rain',
    art: ['#3d4b5c', '#0d1218', '#a8bccd'],
  },
  {
    id: 'nuit-boreale',
    title: 'Nuit boréale',
    subtitle: 'Drone froid, aigus lents',
    mood: 'nuit',
    minutes: 40,
    glyph: 'moon',
    art: ['#2b3454', '#0a0c15', '#aab7ff'],
  },
  {
    id: 'feu-bois',
    title: 'Feu de bois',
    subtitle: 'Bois qui craque, souffle',
    mood: 'feu',
    minutes: 35,
    glyph: 'flame',
    art: ['#5c3a26', '#160c07', '#ffb27a'],
  },
  {
    id: 'cafe-7h',
    title: 'Café à 7 h',
    subtitle: 'Tasse, rue encore vide',
    mood: 'focus',
    minutes: 25,
    glyph: 'coffee',
    art: ['#4b3a2b', '#130f0b', '#e2b78d'],
  },
  {
    id: 'ocean-lent',
    title: 'Océan lent',
    subtitle: 'Vagues longues, ressac',
    mood: 'nature',
    minutes: 48,
    glyph: 'ocean',
    art: ['#21404a', '#070f13', '#94d3d9'],
  },
  {
    id: 'bibliotheque',
    title: 'Bibliothèque',
    subtitle: 'Pages, silence, parquet',
    mood: 'focus',
    minutes: 50,
    glyph: 'book',
    art: ['#3d3c31', '#10100c', '#dbd5b3'],
  },
  {
    id: 'dernier-train',
    title: 'Dernier train',
    subtitle: 'Rail, souffle, portes',
    mood: 'nuit',
    minutes: 38,
    glyph: 'train',
    art: ['#2c313c', '#090b0f', '#a9b3c7'],
  },
  {
    id: 'jardin-mouille',
    title: 'Jardin mouillé',
    subtitle: 'Feuilles, averse fine',
    mood: 'nature',
    minutes: 28,
    glyph: 'garden',
    art: ['#303c2b', '#090f08', '#bcd69e'],
  },
  {
    id: 'studio-vide',
    title: 'Studio vide',
    subtitle: 'Room tone, ventilation',
    mood: 'focus',
    minutes: 20,
    glyph: 'studio',
    art: ['#35363c', '#0b0c0f', '#cbccd4'],
  },
  {
    id: 'traversee',
    title: 'Traversée',
    subtitle: 'Vent, cordages, nuit',
    mood: 'nature',
    minutes: 55,
    glyph: 'crossing',
    art: ['#3b3046', '#0e0a13', '#c9acdf'],
  },
]

export const WEEK = [
  { day: 'L', minutes: 38 },
  { day: 'M', minutes: 52 },
  { day: 'M', minutes: 24 },
  { day: 'J', minutes: 66 },
  { day: 'V', minutes: 45 },
  { day: 'S', minutes: 72 },
  { day: 'D', minutes: 31 },
]

export const WEEK_TOTAL = WEEK.reduce((total, entry) => total + entry.minutes, 0)

export const STATS = {
  streak: 9,
  sessions: 18,
  focusHours: 21.4,
}

export function spaceById(id: string) {
  return SPACES.find((space) => space.id === id) ?? SPACES[0]
}
