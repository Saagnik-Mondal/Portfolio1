import { useState } from 'react'
import { motion } from 'framer-motion'
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

function CategoryRow({
  cat,
  index,
  hovered,
  setHovered,
}: {
  cat: typeof skills[0]
  index: number
  hovered: number | null
  setHovered: (i: number | null) => void
}) {
  const isHovered = hovered === index
  const dim = hovered !== null && !isHovered

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="border-t border-ink/12 py-9 transition-opacity duration-300 last:border-b md:py-12"
      style={{ opacity: dim ? 0.4 : 1 }}
    >
      <div className="grid gap-6 md:grid-cols-[300px_1fr] md:gap-12">
        {/* left: category meta */}
        <div className="flex items-start gap-4">
          <span className="mt-1.5 font-mono text-sm text-ink-faint">
            ({String(index + 1).padStart(2, '0')})
          </span>
          <div>
            <h3
              className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-[0.95] text-ink transition-colors"
              style={{ color: isHovered ? '#3A2BFF' : undefined }}
            >
              {cat.category}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              {cat.items.length} tools · {cat.items.filter((i) => isCore(i.level)).length} core
            </p>
          </div>
        </div>

        {/* right: tools as an editorial line, weighted by proficiency */}
        <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
          {cat.items.map((item) => {
            const core = isCore(item.level)
            return (
              <span
                key={item.name}
                data-cursor="hover"
                className={`group relative font-display leading-none transition-colors ${
                  core
                    ? 'text-[clamp(1.25rem,2vw,1.8rem)] font-semibold text-ink'
                    : 'text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium text-ink-faint'
                } hover:text-accent`}
              >
                {core && (
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-1 rounded-full bg-ember align-middle" />
                )}
                {item.name}
              </span>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="skills" className="relative px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-baseline gap-4">
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
            Core focus
          </p>
        </div>

        <div onMouseLeave={() => setHovered(null)}>
          {skills.map((cat, i) => (
            <CategoryRow
              key={cat.category}
              cat={cat}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
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
