import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-3xl px-5 pt-[max(env(safe-area-inset-top),30px)] pb-52',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-[0.34em] text-muted-foreground uppercase">
          {kicker}
        </p>
        <h1 className="mt-3 font-display text-[34px] leading-[1.02] tracking-[-0.04em]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </header>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mt-10 mb-4 flex items-end justify-between gap-4">
      <h2 className="font-display text-[17px] font-medium tracking-[-0.02em]">{children}</h2>
      {action}
    </div>
  )
}
