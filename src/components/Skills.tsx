import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { skills } from '../data/portfolio'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'

const EASE = [0.22, 1, 0.36, 1] as const

/** Per-category accent — tints the spotlight, watermark and active name. */
const ACCENTS = ['#3A2BFF', '#FF5A2C', '#6C5CFF']

const ALSO = [
  'Hugging Face', 'OpenCV', 'NLTK', 'spaCy', 'FastAPI', 'Flask',
  'Streamlit', 'Weights & Biases', 'Google Colab', 'Kaggle', 'CUDA',
  'Transformers', 'GANs', 'ResNet', 'YOLO',
]

/** level >= 88 reads as a primary, daily-driver tool. */
const isCore = (level: number) => level >= 88

const stage = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: EASE, staggerChildren: 0.05, delayChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}
const item = {
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function Skills() {
  const [active, setActive] = useState(0)
  const accent = ACCENTS[active]
  const cat = skills[active]
  const coreCount = cat.items.filter((i) => isCore(i.level)).length

  const mx = useMotionValue(320)
  const my = useMotionValue(160)
  const glow = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, ${accent}26, transparent 72%)`
  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section id="skills" className="relative px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(03)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Toolkit</span>
        </div>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-ink text-[clamp(2.5rem,8vw,7rem)]">
            <RevealLine>What I work</RevealLine>
            <RevealLine delay={0.08}><span className="text-gradient">with.</span></RevealLine>
          </h2>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            Core focus · hover to explore
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          {/* left: category selector */}
          <div className="flex flex-col justify-center border-t border-ink/12">
            {skills.map((s, i) => {
              const on = active === i
              return (
                <button
                  key={s.category}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className="group flex items-center gap-4 border-b border-ink/12 py-6 text-left md:gap-6 md:py-8"
                >
                  <span
                    className="font-mono text-sm transition-colors"
                    style={{ color: on ? accent : '#A7A294' }}
                  >
                    ({String(i + 1).padStart(2, '0')})
                  </span>
                  <h3
                    className="display flex-1 text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[0.95] transition-all duration-300"
                    style={{ color: on ? accent : '#15130F', transform: on ? 'translateX(8px)' : 'none' }}
                  >
                    {s.category}
                  </h3>
                  <motion.span
                    animate={{ opacity: on ? 1 : 0, x: on ? 0 : -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="hidden md:block"
                    style={{ color: accent }}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.span>
                </button>
              )
            })}
          </div>

          {/* right: cinematic stage */}
          <div
            onMouseMove={onMove}
            className="relative min-h-[440px] overflow-hidden rounded-3xl border border-ink/10 bg-paper-2/60 p-7 md:min-h-[480px] md:p-10"
          >
            <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0" />

            {/* giant ghost index */}
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.08, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="display pointer-events-none absolute -bottom-10 right-2 text-[14rem] leading-none md:text-[20rem]"
                style={{ color: accent }}
              >
                {String(active + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
                <span style={{ color: accent }}>{cat.category}</span>
                <span className="text-ink-faint">{cat.items.length} tools · {coreCount} core</span>
              </div>

              <div className="flex flex-1 items-center py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    variants={stage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-wrap items-baseline gap-x-7 gap-y-4"
                  >
                    {cat.items.map((t) => {
                      const core = isCore(t.level)
                      return (
                        <motion.span
                          key={t.name}
                          variants={item}
                          data-cursor="hover"
                          className={`relative font-display leading-none transition-colors duration-200 hover:!text-ink ${
                            core
                              ? 'text-[clamp(1.5rem,3.2vw,2.8rem)] font-semibold text-ink'
                              : 'text-[clamp(1.1rem,1.9vw,1.6rem)] font-medium text-ink-faint'
                          }`}
                        >
                          {core && (
                            <span
                              className="mr-2 inline-block h-2 w-2 -translate-y-1.5 rounded-full align-middle"
                              style={{ background: accent }}
                            />
                          )}
                          {t.name}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            Also familiar with
          </p>
          <Marquee reverse>
            {ALSO.map((tech) => (
              <span
                key={tech}
                className="mx-3 rounded-full border border-ink/12 px-5 py-2 text-sm font-medium text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
