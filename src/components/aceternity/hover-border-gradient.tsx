import * as React from 'react'

import { cn } from '@/lib/utils'

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<'button'> & { containerClassName?: string }) {
  return (
    <button
      type="button"
      className={cn(
        'group relative overflow-hidden rounded-full p-px text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.985]',
        containerClassName,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-[-120%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#d8ff63_332deg,transparent_360deg)] opacity-55 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        className={cn(
          'relative flex h-full w-full items-center justify-center gap-2.5 rounded-full bg-[#0a0c0e]/95 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-xl',
          className,
        )}
      >
        {children}
      </span>
    </button>
  )
}
