import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/portfolio'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'

const EASE = [0.22, 1, 0.36, 1] as const

const ALSO = [
  'Hugging Face', 'OpenCV', 'NLTK', 'spaCy', 'FastAPI', 'Flask',
  'Streamlit', 'Weights & Biases', 'Google Colab', 'Kaggle', 'CUDA',
  'Transformers', 'GANs', 'ResNet', 'YOLO',
]

/** level >= 88 reads as a primary, daily-driver tool. */
const isCore = (level: number) => level >= 88

const panel = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.55, ease: EASE, when: 'beforeChildren', staggerChildren: 0.04 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.4, ease: EASE } },
}
const chip = {
  open: { y: 0, opacity: 1 },
  closed: { y: 12, opacity: 0 },
}

function CategoryRow({
  cat,
  index,
  active,
  onActivate,
}: {
  cat: typeof skills[0]
  index: number
  active: boolean
  onActivate: () => void
}) {
  const coreCount = cat.items.filter((i) => isCore(i.level)).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
      onMouseEnter={onActivate}
      className="border-b border-ink/12"
    >
      <button
        onClick={onActivate}
        data-cursor="hover"
        className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
      >
        <div className="flex min-w-0 items-baseline gap-4 md:gap-7">
          <span className="font-mono text-sm text-ink-faint">
            ({String(index + 1).padStart(2, '0')})
          </span>
          <h3
            className="display truncate text-[clamp(1.9rem,6vw,4.5rem)] leading-[0.9] transition-colors duration-300"
            style={{ color: active ? '#3A2BFF' : '#15130F' }}
          >
            {cat.category}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint sm:block">
            {cat.items.length} tools · {coreCount} core
          </span>
          <motion.span
            animate={{ rotate: active ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: active ? '#3A2BFF' : 'rgba(21,19,15,0.15)',
              background: active ? '#3A2BFF' : 'transparent',
              color: active ? '#fff' : '#15130F',
            }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
            </svg>
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="panel"
            variants={panel}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4 pb-9 pl-9 md:pl-[4.5rem]">
              {cat.items.map((item) => {
                const core = isCore(item.level)
                return (
                  <motion.span
                    key={item.name}
                    variants={chip}
                    data-cursor="hover"
                    className={`group/t relative font-display leading-none transition-colors duration-200 ${
                      core
                        ? 'text-[clamp(1.3rem,2.4vw,2.1rem)] font-semibold text-ink'
                        : 'text-[clamp(1.05rem,1.7vw,1.45rem)] font-medium text-ink-faint'
                    } hover:text-accent`}
                  >
                    {core && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-1.5 rounded-full bg-ember align-middle" />
                    )}
                    {item.name}
                  </motion.span>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(0)

  return (
    <section id="skills" className="relative px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(03)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Toolkit</span>
        </div>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-ink text-[clamp(2.5rem,8vw,7rem)]">
            <RevealLine>What I work</RevealLine>
            <RevealLine delay={0.08}><span className="text-gradient">with.</span></RevealLine>
          </h2>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            Core focus · hover to explore
          </p>
        </div>

        <div className="border-t border-ink/12">
          {skills.map((cat, i) => (
            <CategoryRow
              key={cat.category}
              cat={cat}
              index={i}
              active={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        <div className="mt-12">
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
