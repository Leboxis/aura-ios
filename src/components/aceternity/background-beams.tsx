import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

const paths = Array.from({ length: 16 }, (_, index) => {
  const x = 70 + index * 72
  return `M${x},-90 C${x + 34},150 ${x - 46},330 ${x + 16},520 C${x + 62},670 ${x - 8},790 ${x + 34},920`
})

export function BackgroundBeams({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 820"
      fill="none"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <defs>
        <linearGradient id="beam-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8ff63" stopOpacity="0" />
          <stop offset="35%" stopColor="#d8ff63" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d8ff63" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke="url(#beam-stroke)"
          strokeWidth={0.7}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1, opacity: 0.18 } : { pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.18 }
              : { pathLength: [0, 1], opacity: [0, 0.65, 0] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 9 + (index % 5) * 1.7,
                  delay: (index % 7) * 0.8,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        />
      ))}
    </svg>
  )
}
