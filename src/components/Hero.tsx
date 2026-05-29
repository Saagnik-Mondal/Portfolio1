import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { useSmoothScroll } from '../lib/smooth-scroll'

const FOCUS = ['Deep Learning', 'Computer Vision', 'NLP', 'PyTorch']

const rise = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={fade} custom={0} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur border border-ink/8 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-semibold text-ink-soft">Open to AI/ML engineering roles</span>
        </motion.div>

        {/* Oversized editorial name */}
        <h1 className="font-black tracking-tighter leading-[0.85] text-ink text-[clamp(3.5rem,13vw,11rem)]">
          <span className="block overflow-hidden">
            <motion.span className="block" variants={rise} custom={0} initial="hidden" animate="visible">
              Saagnik
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-accent" variants={rise} custom={1} initial="hidden" animate="visible">
              Mondal
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <motion.p
            variants={fade} custom={1} initial="hidden" animate="visible"
            className="text-ink-soft text-lg md:text-xl max-w-xl leading-relaxed"
          >
            <span className="text-ink font-semibold">AI / ML Engineer.</span> I build deep-learning
            systems for computer vision, NLP, and healthcare — turning research ideas into models
            that solve real problems.
          </motion.p>

          <motion.div
            variants={fade} custom={2} initial="hidden" animate="visible"
            className="flex flex-wrap gap-2 md:justify-end"
          >
            {FOCUS.map((f) => (
              <span key={f} className="px-3 py-1 rounded-full text-xs font-semibold text-ink-soft bg-white/70 backdrop-blur border border-ink/8">
                {f}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fade} custom={3} initial="hidden" animate="visible"
          className="flex flex-wrap gap-3 mt-10"
        >
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo('#projects')}
              className="px-7 py-3.5 rounded-full font-semibold text-white wheel-bg shadow-lg shadow-accent/20"
            >
              View Projects
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="https://github.com/Saagnik-Mondal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full font-semibold text-ink bg-white/70 backdrop-blur border border-ink/15 hover:border-ink/30 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 text-ink-soft hover:text-ink transition-colors"
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold">Scroll to explore</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
