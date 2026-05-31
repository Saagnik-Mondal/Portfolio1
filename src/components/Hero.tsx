import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { useSmoothScroll } from '../lib/smooth-scroll'

const EASE = [0.22, 1, 0.36, 1] as const

const rise = {
  hidden: { y: '118%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 1, delay: 0.35 + i * 0.09, ease: EASE },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.7 + i * 0.1, ease: EASE },
  }),
}

const FOCUS = ['Deep Learning', 'Computer Vision', 'NLP', 'Medical AI', 'PyTorch', 'TensorFlow']

export default function Hero() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-28 md:px-10 md:pb-10">
      {/* top meta row */}
      <motion.div
        variants={fade}
        custom={0}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-[1400px] items-start justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
      >
        <span className="max-w-[12rem] leading-relaxed">
          AI / ML Engineer
          <br />
          Based in India
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          Open to roles — 2026
        </span>
      </motion.div>

      {/* center: giant name */}
      <div className="mx-auto w-full max-w-[1400px]">
        <h1 className="display text-ink text-[clamp(3.6rem,15vw,15rem)]">
          <span className="mask">
            <motion.span className="block" variants={rise} custom={0} initial="hidden" animate="visible">
              Saagnik
            </motion.span>
          </span>
          <span className="mask">
            <motion.span
              className="block text-gradient"
              variants={rise}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              Mondal
            </motion.span>
          </span>
        </h1>

        <div className="mt-7 grid items-end gap-8 md:grid-cols-[1.1fr_auto]">
          <motion.p
            variants={fade}
            custom={1}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            I build deep-learning systems for{' '}
            <span className="font-medium text-ink">computer vision, NLP, and healthcare</span> —
            turning research ideas into models that solve real problems.
          </motion.p>

          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            animate="visible"
            className="flex gap-3 md:justify-end"
          >
            <Magnetic strength={0.25}>
              <button
                onClick={() => scrollTo('#projects')}
                data-cursor="hover"
                className="rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-accent"
              >
                View work
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="https://github.com/Saagnik-Mondal"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 font-semibold text-ink transition-colors hover:border-ink/45"
              >
                GitHub
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* bottom: editorial baseline — focus · scroll cue · next section */}
      <motion.div
        variants={fade}
        custom={3}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-[1400px] border-t border-ink/12 pt-5"
      >
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-6 md:grid-cols-3">
          {/* left: focus areas */}
          <div className="order-2 md:order-1">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">Focus</p>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              {FOCUS.map((f, i) => (
                <li key={f} className="flex items-center gap-3">
                  {i > 0 && <span className="text-ember/50" aria-hidden>/</span>}
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* center: rotating scroll badge with a down arrow */}
          <div className="order-1 col-span-2 flex justify-center md:order-2 md:col-span-1">
            <button
              onClick={() => scrollTo('#about')}
              data-cursor="hover"
              aria-label="Scroll to explore"
              className="group relative flex h-[88px] w-[88px] items-center justify-center"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
              >
                <defs>
                  <path id="scrollRing" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text
                  className="fill-ink-soft"
                  fontFamily="'JetBrains Mono', monospace"
                  style={{ fontSize: '7.5px', letterSpacing: '0.1em' }}
                >
                  <textPath href="#scrollRing" startOffset="0">
                    SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                  </textPath>
                </text>
              </motion.svg>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 group-hover:bg-accent">
                <motion.svg
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.9} d="M12 5v14M19 12l-7 7-7-7" />
                </motion.svg>
              </span>
            </button>
          </div>

          {/* right: next section hint — ties hero to the page */}
          <div className="order-3 text-right md:order-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">Next</p>
            <button
              onClick={() => scrollTo('#about')}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
            >
              <span className="text-ink-faint group-hover:text-accent">(01)</span>
              About
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 14l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
