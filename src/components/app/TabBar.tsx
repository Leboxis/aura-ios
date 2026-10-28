import { Compass, House, Library, UserRound, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { haptic } from '@/lib/haptics'
import { usePlayer } from '@/lib/player'
import type { TabId } from '@/lib/tabs'
import { cn } from '@/lib/utils'

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: "Aujourd'hui", icon: House },
  { id: 'explore', label: 'Explorer', icon: Compass },
  { id: 'library', label: 'Bibliothèque', icon: Library },
  { id: 'you', label: 'Vous', icon: UserRound },
]

export function TabBar({
  active,
  onChange,
}: {
  active: TabId
  onChange: (tab: TabId) => void
}) {
  const reduce = useReducedMotion()
  const { settings } = usePlayer()

  return (
    <nav aria-label="Navigation principale" className="w-full">
      <div className="glass-strong flex items-center gap-1 rounded-[28px] p-1.5">
        {TABS.map((tab) => {
          const isActive = tab.id === active
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                onChange(tab.id)
                void haptic(settings.haptics)
              }}
              className="relative flex h-[52px] flex-1 flex-col items-center justify-center gap-1 rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {isActive ? (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-[22px] border border-white/8 bg-white/[0.08]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 36, mass: 0.7 }
                  }
                />
              ) : null}
              <Icon
                className={cn(
                  'relative size-[19px] transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
                strokeWidth={isActive ? 2.1 : 1.7}
              />
              <span
                className={cn(
                  'relative text-[10px] leading-none tracking-[0.01em] transition-colors',
                  isActive ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
