import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonStyles = cva(
  'press relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-canvas shadow-[0_18px_44px_-18px_rgba(255,255,255,0.55)] hover:bg-white',
        glass: 'glass-strong text-ink',
        tint: 'bg-[#8b7bff] text-white shadow-[0_18px_44px_-20px_rgba(139,123,255,0.95)] hover:bg-[#9d8eff]',
        ghost: 'text-white/55 hover:text-white',
      },
      size: {
        sm: 'h-9 rounded-full px-3.5 text-[13px]',
        md: 'h-11 rounded-full px-5 text-[14px]',
        lg: 'h-[52px] rounded-full px-6 text-[15px]',
        icon: 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />
}
