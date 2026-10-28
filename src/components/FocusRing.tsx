import { useId } from 'react'
import { clamp, cn } from '../lib/utils'

type FocusRingProps = {
  progress: number
  time: string
  label: string
  hint: string
  size?: number
  className?: string
}

export function FocusRing({
  progress,
  time,
  label,
  hint,
  size = 204,
  className,
}: FocusRingProps) {
  const gradientId = `ring-${useId().replace(/:/g, '')}`
  const stroke = 9
  const radius = (size - stroke) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamp(progress, 0, 1))
  const ticks = Array.from({ length: 60 }, (_, index) => {
    const angle = (index / 60) * Math.PI * 2
    const inner = radius - 16
    const outer = radius - 11
    return {
      x1: center + Math.cos(angle) * inner,
      y1: center + Math.sin(angle) * inner,
      x2: center + Math.cos(angle) * outer,
      y2: center + Math.sin(angle) * outer,
      major: index % 5 === 0,
    }
  })

  return (
    <div
      role="timer"
      aria-label={`${label} — ${time}`}
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden
        className="absolute inset-10 rounded-full opacity-70 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,123,255,0.55), transparent 70%)',
        }}
      />
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative -rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b9aaff" />
            <stop offset="55%" stopColor="#8b7bff" />
            <stop offset="100%" stopColor="#5ce1d3" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={stroke}
        />
        {ticks.map((tick, index) => (
          <line
            key={index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={tick.major ? 1.4 : 0.7}
            strokeLinecap="round"
          />
        ))}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          style={{ filter: 'drop-shadow(0 0 9px rgba(139,123,255,0.55))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/35">
          {label}
        </span>
        <span className="mt-1.5 font-display text-[36px] font-semibold leading-none tracking-[-0.035em] tabular-nums">
          {time}
        </span>
        <span className="mt-2 text-[10.5px] tracking-[0.01em] text-white/35">{hint}</span>
      </div>
    </div>
  )
}
