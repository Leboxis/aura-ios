import {
  CloudRain,
  Coffee,
  Compass,
  Flame,
  Library,
  MoonStar,
  Mountain,
  Sparkles,
  Sun,
  Trees,
  UserRound,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export type TabId = 'today' | 'spaces' | 'library' | 'you'

export type Space = {
  id: string
  name: string
  place: string
  mood: string
  minutes: number
  description: string
  icon: LucideIcon
  from: string
  via: string
  to: string
  glow: string
}

export const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'today', label: "Aujourd'hui", icon: Sparkles },
  { id: 'spaces', label: 'Espaces', icon: Compass },
  { id: 'library', label: 'Bibliothèque', icon: Library },
  { id: 'you', label: 'Vous', icon: UserRound },
]

export const SPACES: Space[] = [
  {
    id: 'rain',
    name: 'Pluie de minuit',
    place: 'Paris, France',
    mood: 'Pluie',
    minutes: 25,
    description: 'Une pluie fine sur les toits, sans orage. Juste assez pour couvrir la ville.',
    icon: CloudRain,
    from: '#0b1533',
    via: '#2f4a8c',
    to: '#04060f',
    glow: 'rgba(109, 140, 255, 0.55)',
  },
  {
    id: 'forest',
    name: "Forêt d'aube",
    place: 'Vosges, France',
    mood: 'Nature',
    minutes: 45,
    description: 'Feuilles hautes, oiseaux lointains, lumière qui traverse à peine.',
    icon: Trees,
    from: '#0a2018',
    via: '#2f6b4f',
    to: '#03100b',
    glow: 'rgba(95, 214, 164, 0.45)',
  },
  {
    id: 'ocean',
    name: 'Océan profond',
    place: 'Bretagne, France',
    mood: 'Vagues',
    minutes: 60,
    description: 'Ressac lent, écume, horizon ouvert. Le souffle long des grandes marées.',
    icon: Waves,
    from: '#031a26',
    via: '#176a83',
    to: '#020d13',
    glow: 'rgba(72, 214, 232, 0.45)',
  },
  {
    id: 'fire',
    name: 'Feu de bois',
    place: 'Chamonix, France',
    mood: 'Feu',
    minutes: 30,
    description: 'Bois qui craque, chaleur proche, pièce qui rétrécit doucement.',
    icon: Flame,
    from: '#2a1108',
    via: '#a44a18',
    to: '#120603',
    glow: 'rgba(255, 154, 92, 0.45)',
  },
  {
    id: 'cafe',
    name: 'Café parisien',
    place: 'Le Marais, Paris',
    mood: 'Ville',
    minutes: 20,
    description: 'Murmures, tasses posées, rue qui passe derrière la vitre.',
    icon: Coffee,
    from: '#221a12',
    via: '#7a5a38',
    to: '#0f0b07',
    glow: 'rgba(224, 185, 137, 0.42)',
  },
  {
    id: 'night',
    name: 'Nuit étoilée',
    place: 'Atacama, Chili',
    mood: 'Nuit',
    minutes: 50,
    description: 'Ciel dégagé, grillons, air sec. Le silence qui a une texture.',
    icon: MoonStar,
    from: '#12142e',
    via: '#453a7d',
    to: '#07070f',
    glow: 'rgba(167, 139, 250, 0.48)',
  },
  {
    id: 'wind',
    name: "Vent d'altitude",
    place: 'Alpes, Suisse',
    mood: 'Nature',
    minutes: 35,
    description: 'Souffle continu au-dessus des crêtes, sans aucune présence humaine.',
    icon: Wind,
    from: '#101f26',
    via: '#4a727d',
    to: '#050e12',
    glow: 'rgba(159, 214, 221, 0.4)',
  },
  {
    id: 'cave',
    name: 'Grotte de sel',
    place: 'Sicile, Italie',
    mood: 'Nature',
    minutes: 40,
    description: 'Résonance profonde, gouttes espacées, air minéral et immobile.',
    icon: Mountain,
    from: '#221526',
    via: '#5c3c5f',
    to: '#0f0812',
    glow: 'rgba(217, 166, 212, 0.42)',
  },
]

export const SPACE_BY_ID: Record<string, Space> = Object.fromEntries(
  SPACES.map((space) => [space.id, space]),
)

export const MOODS = ['Tout', 'Nature', 'Pluie', 'Nuit', 'Feu', 'Ville', 'Vagues'] as const

export const NIGHTLY_SESSION = SPACES[0]

export type Mix = {
  id: string
  name: string
  note: string
  minutes: number
  spaceIds: string[]
  icon: LucideIcon
  from: string
  to: string
}

export const MIXES: Mix[] = [
  {
    id: 'deep-work',
    name: 'Deep Work',
    note: '3 sons · sans voix',
    minutes: 90,
    spaceIds: ['rain', 'wind', 'cave'],
    icon: Zap,
    from: '#2b2a6e',
    to: '#0b0b1c',
  },
  {
    id: 'nuit-calme',
    name: 'Nuit calme',
    note: '2 sons · fondu lent',
    minutes: 45,
    spaceIds: ['night', 'rain'],
    icon: MoonStar,
    from: '#1c1a4a',
    to: '#08070f',
  },
  {
    id: 'matin-doux',
    name: 'Matin doux',
    note: '2 sons · réveil progressif',
    minutes: 20,
    spaceIds: ['forest', 'cafe'],
    icon: Sun,
    from: '#4a3520',
    to: '#150e08',
  },
  {
    id: 'pluie-pages',
    name: 'Pluie & pages',
    note: '2 sons · lecture longue',
    minutes: 60,
    spaceIds: ['rain', 'cafe'],
    icon: CloudRain,
    from: '#153a41',
    to: '#050f12',
  },
]

export type Recent = { spaceId: string; when: string }

export const RECENTS: Recent[] = [
  { spaceId: 'rain', when: "Aujourd'hui, 21:04" },
  { spaceId: 'forest', when: 'Hier, 07:32' },
  { spaceId: 'ocean', when: 'Dimanche, 18:20' },
  { spaceId: 'cafe', when: 'Vendredi, 09:15' },
]

export const WEEK = [
  { day: 'L', minutes: 35 },
  { day: 'M', minutes: 62 },
  { day: 'M', minutes: 48 },
  { day: 'J', minutes: 80 },
  { day: 'V', minutes: 54 },
  { day: 'S', minutes: 96 },
  { day: 'D', minutes: 42 },
]

export const LISTENING_STATS = {
  sessions: 128,
  streak: 6,
  minutesToday: 42,
  minutesWeek: WEEK.reduce((total, day) => total + day.minutes, 0),
  goalMinutes: 480,
}

export const PROFILE = {
  name: 'Léo Marchand',
  initials: 'LM',
  memberSince: 'Membre depuis 2024',
  plan: 'Aura Pro',
}
