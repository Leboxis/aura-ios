import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'

type SliderProps = {
  value: number
  max: number
  onChange: (value: number) => void
  label: string
  className?: string
  disabled?: boolean
}

export function Slider({ value, max, onChange, label, className, disabled }: SliderProps) {
  const safeMax = Math.max(max, 1)
  const fill = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <input
      type="range"
      min={0}
      max={safeMax}
      step={1}
      value={value}
      disabled={disabled}
      aria-label={label}
      onChange={(event) => onChange(Number(event.target.value))}
      className={cn('range', className)}
      style={{ '--fill': `${fill}%` } as CSSProperties}
    />
  )
}
