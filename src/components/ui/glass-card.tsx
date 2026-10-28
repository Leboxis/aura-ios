import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: 'default' | 'strong' | 'soft'
  highlight?: boolean
}

export function GlassCard({
  className,
  tone = 'default',
  highlight = true,
  ...props
}: GlassCardProps) {
  const material = tone === 'strong' ? 'glass-strong' : tone === 'soft' ? 'glass-soft' : 'glass'
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px]',
        material,
        highlight && tone !== 'soft' && 'specular',
        className,
      )}
      {...props}
    />
  )
}
