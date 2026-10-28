import { useMemo } from 'react'

import { cn } from '@/lib/utils'

export function Meteors({ number = 10, className }: { number?: number; className?: string }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, index) => ({
        left: (index * 37 + 11) % 100,
        delay: ((index * 13) % 50) / 10,
        duration: 5 + ((index * 7) % 45) / 10,
      })),
    [number],
  )

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {meteors.map((meteor) => (
        <span
          key={`${meteor.left}-${meteor.delay}`}
          className="absolute top-1/2 size-1 rotate-[215deg] animate-meteor rounded-full bg-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08)] before:absolute before:top-1/2 before:h-px before:w-[70px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-primary before:to-transparent before:content-['']"
          style={{
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
