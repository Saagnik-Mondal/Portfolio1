import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/portfolio'

const HUBS = [
  { x: 22, y: 32 },
  { x: 50, y: 70 },
  { x: 78, y: 34 },
]

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

type Node = {
  key: string
  cat: number
  name: string
  level: number
  x: number
  y: number
  hub: { x: number; y: number }
}

export default function Skills() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 })
  const [hover, setHover] = useState<string | null>(null)

  const nodes = useMemo<Node[]>(() => {
    const out: Node[] = []
    skills.forEach((cat, ci) => {
      const hub = HUBS[ci]
      const n = cat.items.length
      cat.items.forEach((item, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2
        const rx = 16
        const ry = 21
        out.push({
          key: `${ci}-${item.name}`,
          cat: ci,
          name: item.name,
          level: item.level,
          x: clamp(hub.x + Math.cos(angle) * rx, 7, 93),
          y: clamp(hub.y + Math.sin(angle) * ry, 8, 92),
          hub,
        })
      })
    })
    return out
  }, [])

  return (
    <section id="skills" ref={ref} className="py-28 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm uppercase tracking-widest mb-3 font-semibold text-accent"
          >
            03 · Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-black tracking-tighter text-ink leading-[0.9] text-[clamp(2.5rem,7vw,5.5rem)]"
          >
            A connected<br /><span className="text-accent">toolkit.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-ink-soft mt-5 max-w-md"
          >
            Hover a node to explore. Node size reflects depth of experience across deep
            learning, data, and tooling.
          </motion.p>
        </div>

        {/* Constellation — desktop */}
        <div className="hidden md:block relative w-full h-[600px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.map((nd) => {
              const active = hover === null || hover === nd.key || hover.startsWith(`${nd.cat}-hub`)
              return (
                <line
                  key={`l-${nd.key}`}
                  x1={nd.hub.x} y1={nd.hub.y} x2={nd.x} y2={nd.y}
                  stroke="#4F46E5"
                  strokeOpacity={active ? 0.28 : 0.06}
                  strokeWidth={0.15}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: 'stroke-opacity 0.3s' }}
                />
              )
            })}
          </svg>

          {/* category hubs */}
          {skills.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHover(`${ci}-hub`)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
              style={{ left: `${HUBS[ci].x}%`, top: `${HUBS[ci].y}%` }}
            >
              <div className="w-16 h-16 rounded-2xl wheel-bg shadow-lg shadow-accent/25 flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-ink bg-white/80 backdrop-blur px-2 py-0.5 rounded-full border border-ink/8 whitespace-nowrap">
                {cat.category}
              </span>
            </motion.div>
          ))}

          {/* skill nodes */}
          {nodes.map((nd, i) => {
            const dim = hover !== null && hover !== nd.key && hover !== `${nd.cat}-hub`
            const size = 30 + (nd.level / 100) * 26
            return (
              <motion.div
                key={nd.key}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHover(nd.key)}
                onMouseLeave={() => setHover(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer z-20"
                style={{ left: `${nd.x}%`, top: `${nd.y}%` }}
                data-cursor="hover"
              >
                <div
                  className="rounded-full flex items-center justify-center border transition-all duration-300"
                  style={{
                    width: size,
                    height: size,
                    background: hover === nd.key ? '#4F46E5' : '#FFFFFF',
                    borderColor: hover === nd.key ? '#4F46E5' : 'rgba(79,70,229,0.4)',
                    opacity: dim ? 0.35 : 1,
                    transform: hover === nd.key ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: hover === nd.key ? '0 8px 24px -6px rgba(79,70,229,0.5)' : 'none',
                  }}
                >
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: hover === nd.key ? '#fff' : '#4F46E5' }}
                  >
                    {nd.level}
                  </span>
                </div>
                <span
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-ink whitespace-nowrap transition-opacity duration-300"
                  style={{ opacity: hover === nd.key ? 1 : dim ? 0.2 : 0.7 }}
                >
                  {nd.name}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Grouped list — mobile */}
        <div className="md:hidden space-y-6">
          {skills.map((cat) => (
            <div key={cat.category} className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-bold text-ink text-sm">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s.name} className="px-3 py-1.5 rounded-full text-sm font-medium text-ink-soft bg-cream-2 border border-ink/8">
                    {s.name} <span className="text-accent font-bold">{s.level}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-ink-soft text-xs uppercase tracking-widest font-mono font-semibold mb-4">Also familiar with</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Hugging Face', 'OpenCV', 'NLTK', 'spaCy', 'FastAPI', 'Flask',
              'Streamlit', 'Weights & Biases', 'Google Colab', 'Kaggle', 'CUDA',
              'Transformer Models', 'GANs', 'ResNet', 'YOLO',
            ].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full text-sm font-medium text-ink-soft bg-white/70 backdrop-blur border border-ink/8">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
