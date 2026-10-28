import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export function Spotlight({
  className,
  color = 'rgba(216,255,99,0.32)',
}: {
  className?: string
  color?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        'pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-[110px]',
        className,
      )}
      style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 68%)` }}
    />
  )
}
