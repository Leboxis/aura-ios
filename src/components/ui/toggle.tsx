import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'

type ToggleProps = {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  className?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, className, disabled }: ToggleProps) {
  const reduce = useReducedMotion()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-[31px] w-[51px] shrink-0 rounded-full border transition-colors duration-300 disabled:opacity-40',
        checked
          ? 'border-white/20 bg-[#32d74b] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]'
          : 'border-white/12 bg-white/14',
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="absolute left-[2px] top-1/2 size-[25px] -translate-y-1/2 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        animate={{ x: checked ? 20 : 0, scale: checked ? 1 : 0.96 }}
        transition={
          reduce ? { duration: 0.15 } : { type: 'spring', bounce: 0.18, duration: 0.32 }
        }
      />
    </button>
  )
}
