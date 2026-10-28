import type { Space } from '../lib/data'
import { cn } from '../lib/utils'

type SpaceArtProps = {
  space: Space
  className?: string
  variant?: 'art' | 'thumb'
}

export function SpaceArt({ space, className, variant = 'art' }: SpaceArtProps) {
  const Icon = space.icon

  return (
    <div
      aria-hidden
      className={cn('grain relative overflow-hidden', className)}
      style={{
        backgroundImage: `radial-gradient(130% 110% at 16% -8%, ${space.from} 0%, ${space.via} 46%, ${space.to} 100%)`,
      }}
    >
      <div
        className="absolute -left-8 -top-12 size-[78%] rounded-full blur-2xl"
        style={{ background: space.glow }}
      />
      <div className="absolute -right-6 top-1/3 size-[52%] rounded-full bg-white/10 blur-2xl" />

      {variant === 'art' && (
        <>
          <svg
            viewBox="0 0 200 250"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-70"
          >
            <circle
              cx="168"
              cy="34"
              r="66"
              fill="none"
              stroke="white"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
            <circle
              cx="168"
              cy="34"
              r="96"
              fill="none"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </svg>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(155deg, rgba(255,255,255,0.18) 0%, transparent 34%, rgba(0,0,0,0.34) 100%)',
            }}
          />
          <Icon
            className="absolute -bottom-6 -right-5 size-36 text-white opacity-[0.18]"
            strokeWidth={0.9}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.62), transparent 60%)',
            }}
          />
        </>
      )}

      {variant === 'thumb' && <Icon className="absolute inset-0 m-auto size-6 text-white/85" strokeWidth={1.7} />}
    </div>
  )
}
