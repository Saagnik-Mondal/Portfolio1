import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Reveal, RevealLine } from './Reveal'

const highlights = [
  { target: 21, suffix: '+', label: 'Repositories' },
  { target: 50, suffix: '★', label: 'Stars · best project' },
  { target: 4, suffix: '', label: 'AI/ML case studies' },
  { target: 3, suffix: '+', label: 'Years building ML' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const duration = 1500
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  return (
    <span className="display block text-5xl text-ink tabular-nums md:text-6xl">
      {value}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

const traits = [
  'Deep Learning', 'Computer Vision', 'NLP', 'PyTorch', 'TensorFlow',
  'scikit-learn', 'Python', 'Medical AI', 'Game AI',
]

export default function About() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(01)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">About</span>
        </div>

        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
          {/* big editorial statement */}
          <div>
            <h2 className="display text-ink text-[clamp(2rem,5vw,4rem)]">
              <RevealLine>I turn deep-learning</RevealLine>
              <RevealLine delay={0.08}>
                <span className="text-gradient">research</span> into models
              </RevealLine>
              <RevealLine delay={0.16}>that work in the</RevealLine>
              <RevealLine delay={0.24}>real world.</RevealLine>
            </h2>

            <div className="mt-10 max-w-lg space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <Reveal delay={0.1}>
                <p>
                  I'm an AI/ML engineer focused on intelligent systems where research meets
                  practical engineering — medical imaging that detects pneumonia, offline AI
                  assistants that widen access, and game engines that learn strategy.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  I'm looking for a full-time role on a team shipping production-grade AI. Below is
                  a snapshot of what I work with and what I've built.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
              <>
                {traits.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/12 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </>
            </Reveal>
          </div>

          {/* stat stack */}
          <div className="md:sticky md:top-28 md:h-fit">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-paper p-6 md:p-7"
                >
                  <CountUp target={h.target} suffix={h.suffix} active={inView} />
                  <p className="mt-2 text-xs font-medium text-ink-soft">{h.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-px flex items-center gap-3 rounded-3xl border border-ink/10 bg-ink p-6 text-paper"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
              </span>
              <div>
                <p className="text-sm font-semibold">Open to opportunities</p>
                <p className="mt-0.5 text-xs text-paper/60">
                  Full-time AI/ML roles — remote or on-site
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
