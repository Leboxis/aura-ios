import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type SpotlightProps = {
  children: ReactNode
  className?: string
  size?: number
  color?: string
}

/**
 * Aceternity-inspired pointer spotlight. Writes pointer position straight to
 * CSS custom properties so following the cursor never triggers a re-render.
 */
export function Spotlight({
  children,
  className,
  size = 440,
  color = 'rgba(139, 123, 255, 0.22)',
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={handleMove} className={cn('group relative', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${color}, transparent 72%)`,
        }}
      />
      {children}
    </div>
  )
}

type CardSpotlightProps = {
  children: ReactNode
  className?: string
  radius?: number
}

/** A tighter, whiter spotlight used on artwork cards. */
export function CardSpotlight({ children, className, radius = 260 }: CardSpotlightProps) {
  return (
    <Spotlight
      size={radius}
      color="rgba(255, 255, 255, 0.18)"
      className={className}
    >
      {children}
    </Spotlight>
  )
}
