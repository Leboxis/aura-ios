import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'

const BEAMS = [
  'M-40 320C 40 250 120 330 200 240C 290 140 370 210 470 90',
  'M-40 360C 60 300 150 370 230 280C 330 170 400 250 500 120',
  'M-20 260C 80 220 140 280 220 200C 310 110 380 160 480 60',
  'M-60 400C 60 320 170 390 260 300C 360 200 440 260 520 150',
  'M0 220C 90 190 160 240 240 170C 330 90 420 140 500 30',
]

export function BackgroundBeams({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox="0 0 500 420"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <defs>
        {BEAMS.map((_, index) => (
          <linearGradient key={index} id={`beam-${index}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b7bff" stopOpacity="0" />
            <stop offset="45%" stopColor="#b9aaff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5ce1d3" stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {BEAMS.map((path, index) =>
        reduce ? (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={`url(#beam-${index})`}
            strokeWidth="0.9"
            opacity="0.35"
          />
        ) : (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke={`url(#beam-${index})`}
            strokeWidth="0.9"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.75, 0] }}
            transition={{
              duration: 9 + index * 1.6,
              repeat: Infinity,
              repeatDelay: index * 0.7,
              delay: index * 1.1,
              ease: 'easeInOut',
            }}
          />
        ),
      )}
    </svg>
  )
}
