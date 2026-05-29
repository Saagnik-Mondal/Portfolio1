import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/portfolio'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'

const EASE = [0.22, 1, 0.36, 1] as const

const ALSO = [
  'Hugging Face', 'OpenCV', 'NLTK', 'spaCy', 'FastAPI', 'Flask',
  'Streamlit', 'Weights & Biases', 'Google Colab', 'Kaggle', 'CUDA',
  'Transformers', 'GANs', 'ResNet', 'YOLO',
]

export default function Skills() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section id="skills" ref={ref} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(03)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Toolkit</span>
        </div>

        <h2 className="display mb-16 text-ink text-[clamp(2.5rem,8vw,7rem)]">
          <RevealLine>What I work</RevealLine>
          <RevealLine delay={0.08}><span className="text-gradient">with.</span></RevealLine>
        </h2>

        <div className="grid gap-x-14 gap-y-12 md:grid-cols-3">
          {skills.map((cat, ci) => (
            <div key={cat.category}>
              <div className="mb-6 flex items-center gap-2.5 border-b border-ink/12 pb-3">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {cat.category}
                </h3>
              </div>

              <ul className="space-y-4">
                {cat.items.map((item, i) => (
                  <li key={item.name} className="group">
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-[15px] font-medium text-ink transition-colors group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-ink-faint">
                        {item.level}
                      </span>
                    </div>
                    <div className="h-px w-full bg-ink/12">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: item.level / 100 } : {}}
                        transition={{ duration: 1.1, delay: 0.2 + ci * 0.1 + i * 0.05, ease: EASE }}
                        style={{ transformOrigin: 'left' }}
                        className="h-px accent-fill"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20">
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
