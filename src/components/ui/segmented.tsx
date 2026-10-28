import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'

type Option<T extends string> = { id: T; label: string }

type SegmentedProps<T extends string> = {
  options: readonly Option<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedProps<T>) {
  const id = useId()
  const reduce = useReducedMotion()

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn('glass-soft relative flex rounded-full p-1', className)}
    >
      {options.map((option) => {
        const selected = option.id === value
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className="relative flex-1 rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors duration-200"
          >
            {selected && (
              <motion.span
                aria-hidden
                layoutId={`segmented-${id}`}
                className="absolute inset-0 rounded-full border border-white/15 bg-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_6px_18px_-10px_rgba(0,0,0,0.9)]"
                transition={
                  reduce ? { duration: 0 } : { type: 'spring', bounce: 0.12, duration: 0.36 }
                }
              />
            )}
            <span className={cn('relative', selected ? 'text-white' : 'text-white/45')}>
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
