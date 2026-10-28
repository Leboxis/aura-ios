import * as React from 'react'

import { cn } from '@/lib/utils'

export function CardSpotlight({
  children,
  className,
  radius = 380,
}: {
  children: React.ReactNode
  className?: string
  radius?: number
}) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [active, setActive] = React.useState(false)

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.025]',
        className,
      )}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, rgba(216,255,99,0.14), transparent 62%)`,
        }}
      />
      {children}
    </div>
  )
}
