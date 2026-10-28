import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full min-w-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus-visible:border-white/20 focus-visible:ring-[3px] focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
