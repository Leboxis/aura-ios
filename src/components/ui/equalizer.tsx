import { cn } from '../../lib/utils'

const BARS = [58, 100, 42, 78, 34]

export function Equalizer({ active, className }: { active: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn('flex h-4 items-end gap-[2px]', className)}>
      {BARS.map((height, index) => (
        <span
          key={index}
          className={cn('w-[2.5px] rounded-full bg-current', active ? 'eq-bar' : 'opacity-35')}
          style={{
            height: `${height}%`,
            animationDelay: `${index * 0.12}s`,
            animationDuration: `${1.05 + index * 0.14}s`,
          }}
        />
      ))}
    </div>
  )
}
