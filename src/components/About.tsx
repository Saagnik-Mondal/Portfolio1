import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const highlights = [
  { target: 21, suffix: '+', label: 'Repositories' },
  { target: 50, suffix: '★', label: 'Stars on best project' },
  { target: 4, suffix: '+', label: 'AI/ML projects' },
  { target: 3, suffix: '+', label: 'Years learning ML' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const duration = 1400
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
    <div className="text-3xl font-black mb-1 tabular-nums text-accent">
      {value}{suffix}
    </div>
  )
}

const traits = [
  'Deep Learning', 'Computer Vision', 'NLP', 'PyTorch', 'TensorFlow',
  'scikit-learn', 'Python', 'Data Analysis', 'Medical AI', 'Game AI',
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-14">
          <p className="font-mono text-sm uppercase tracking-widest mb-3 font-semibold text-accent">01 · About</p>
          <h2 className="font-black tracking-tighter text-ink leading-[0.9] text-[clamp(2.5rem,7vw,5.5rem)]">
            Who I<br /><span className="text-accent">am.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            {[
              `I'm an AI/ML engineer focused on building intelligent systems that work in the real world — where deep-learning research meets practical engineering.`,
              `My projects span medical imaging that helps detect pneumonia, offline AI assistants that widen access to information, and game engines that learn strategy.`,
              `I'm looking for a full-time role on a team shipping production-grade AI. Below is a snapshot of what I work with and what I've built.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="text-ink-soft leading-relaxed mb-5 text-[15px]"
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-2 mt-6"
            >
              {traits.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-semibold text-ink-soft bg-cream-2 border border-ink/8"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass-card rounded-xl p-6"
              >
                <CountUp target={h.target} suffix={h.suffix} active={inView} />
                <div className="text-ink-soft text-xs font-medium">{h.label}</div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="col-span-2 glass-card rounded-xl p-5 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <div>
                <p className="text-ink font-semibold text-sm">Open to opportunities</p>
                <p className="text-ink-soft text-xs mt-0.5">
                  Full-time AI/ML engineering roles — remote or on-site
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
