import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let current = 0
    const tick = () => {
      const step = current < 70 ? 3 : current < 92 ? 2 : 1
      current = Math.min(100, current + step)
      setCount(current)
      if (current < 100) {
        setTimeout(tick, current < 70 ? 40 : 70)
      } else {
        setTimeout(() => setExiting(true), 350)
      }
    }
    const start = setTimeout(tick, 200)
    return () => clearTimeout(start)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => exiting && onDone()}
    >
      <div className="overflow-hidden">
        <motion.span
          className="block text-6xl md:text-7xl font-black tabular-nums text-ink"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {count}<span className="text-accent">%</span>
        </motion.span>
      </div>
      <div className="mt-6 w-48 h-px bg-ink/10 overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${count}%`, transition: 'width 0.12s linear' }} />
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft font-semibold">
        Saagnik Mondal
      </p>
    </motion.div>
  )
}
