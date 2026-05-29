import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const WORDS = ['DEEP LEARNING', 'COMPUTER VISION', 'NLP', 'PYTORCH']

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  // Drive the counter 0 -> 100 with timers (works even when the tab is
  // backgrounded, where rAF is throttled). StrictMode-safe via cancel flag.
  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    let current = 0
    const tick = () => {
      if (cancelled) return
      const step = current < 65 ? 4 : current < 90 ? 2 : 1
      current = Math.min(100, current + step)
      setCount(current)
      if (current < 100) timer = setTimeout(tick, current < 65 ? 36 : 60)
    }
    timer = setTimeout(tick, 160)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  // Once we hit 100, hold briefly then wipe away.
  useEffect(() => {
    if (count < 100) return
    const t = setTimeout(() => setExiting(true), 450)
    return () => clearTimeout(t)
  }, [count])

  const wordIndex = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length))

  const finish = () => {
    if (exiting && !doneRef.current) {
      doneRef.current = true
      onDone()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col justify-between bg-paper px-6 py-8 md:px-12 md:py-12"
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={finish}
    >
      {/* top row */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
        <span>Saagnik Mondal</span>
        <span>© 2026</span>
      </div>

      {/* center: rotating focus word */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-ink/15" />
        <div className="mask">
          <motion.span
            key={wordIndex}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </div>
        <span className="h-px flex-1 bg-ink/15" />
      </div>

      {/* bottom: giant counter */}
      <div className="flex items-end justify-between">
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display block text-[24vw] leading-[0.8] text-ink tabular-nums md:text-[18vw]"
          >
            {count}
          </motion.span>
        </div>
        <span className="display mb-3 text-3xl text-accent md:text-5xl">%</span>
      </div>
    </motion.div>
  )
}
