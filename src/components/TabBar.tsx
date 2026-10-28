import { motion, useReducedMotion } from 'motion/react'
import { TABS, type TabId } from '../lib/data'
import { cn } from '../lib/utils'

type TabBarProps = {
  tab: TabId
  onChange: (tab: TabId) => void
}

export function TabBar({ tab, onChange }: TabBarProps) {
  const reduce = useReducedMotion()

  return (
    <nav
      aria-label="Navigation principale"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))]"
    >
      <div className="glass-strong specular pointer-events-auto w-full max-w-[430px] rounded-[27px] p-1.5">
        <div className="grid grid-cols-4">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = id === tab
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                aria-current={active ? 'page' : undefined}
                className="press relative flex flex-col items-center justify-center gap-1 rounded-[21px] px-1 py-2"
              >
                {active && (
                  <motion.span
                    aria-hidden
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-[21px] border border-white/12 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                    transition={
                      reduce
                        ? { duration: 0.12 }
                        : { type: 'spring', bounce: 0.1, duration: 0.38 }
                    }
                  />
                )}
                <Icon
                  aria-hidden
                  className={cn(
                    'relative size-[21px] transition-colors duration-200',
                    active ? 'text-white' : 'text-white/52',
                  )}
                  strokeWidth={active ? 2.05 : 1.7}
                />
                <span
                  className={cn(
                    'relative max-w-full truncate text-[9.5px] font-medium tracking-[-0.01em] transition-colors duration-200',
                    active ? 'text-white' : 'text-white/52',
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
