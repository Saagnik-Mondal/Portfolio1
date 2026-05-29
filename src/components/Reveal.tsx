import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  children: ReactNode
  /** delay in seconds */
  delay?: number
  /** travel distance in px */
  y?: number
  className?: string
}

/** Single-element scroll reveal: fade + rise. */
export function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Masked line reveal — text rises out from a clipped container. */
export function RevealLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <span className="mask">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '115%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}
