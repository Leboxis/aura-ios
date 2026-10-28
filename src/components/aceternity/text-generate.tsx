import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export function TextGenerate({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <motion.h1
      className={cn('text-balance', className)}
      initial={reduce ? false : 'hidden'}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } } }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.h1>
  )
}
