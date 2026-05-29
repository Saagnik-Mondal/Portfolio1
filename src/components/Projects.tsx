import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'

type Project = typeof projects[0]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <motion.button
      variants={fadeUp}
      custom={index}
      onClick={onOpen}
      data-cursor="hover"
      className="glass-card rounded-2xl p-7 h-full flex flex-col text-left group hover:-translate-y-1 hover:border-accent/30 transition-all"
    >
      <div className="flex items-center justify-between mb-5 w-full">
        <span className="font-mono text-sm font-bold text-ink/25">0{index}</span>
        <div className="flex items-center gap-2">
          {project.featured && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-accent bg-accent-tint">
              Featured
            </span>
          )}
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-ink-soft text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {project.stars}
            </span>
          )}
        </div>
      </div>

      <span className="text-xs font-semibold text-ink-soft mb-2">{project.category}</span>

      <h3 className="text-xl font-bold text-ink mb-3 leading-snug group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="text-ink-soft text-sm leading-relaxed mb-5 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono text-ink-soft bg-cream-2 border border-ink/6">
            {t}
          </span>
        ))}
      </div>

      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent pt-4 border-t border-ink/8 w-full">
        Read case study
        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </motion.button>
  )
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl border border-ink/10 shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-7 pt-7 pb-4 bg-white/90 backdrop-blur border-b border-ink/8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-semibold text-accent">{project.category}</span>
              <span className="text-xs font-mono text-ink-soft">· {project.year}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-ink leading-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            data-cursor="hover"
            aria-label="Close"
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-cream-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-6 space-y-7">
          <Block label="The problem" body={project.problem} />
          <Block label="My approach" body={project.approach} />

          <div>
            <p className="text-xs uppercase tracking-widest font-mono font-semibold text-accent mb-3">Results</p>
            <ul className="space-y-2.5">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-ink-soft text-[15px] leading-relaxed">
                  <svg className="w-4 h-4 mt-1 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-mono font-semibold text-accent mb-3">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded text-xs font-mono text-ink-soft bg-cream-2 border border-ink/6">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white wheel-bg shadow-lg shadow-accent/20"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest font-mono font-semibold text-accent mb-2">{label}</p>
      <p className="text-ink-soft text-[15px] leading-relaxed">{body}</p>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.08 })
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" ref={ref} className="py-28 md:py-36 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-14">
          <p className="font-mono text-sm uppercase tracking-widest mb-3 font-semibold text-accent">02 · Projects</p>
          <h2 className="font-black tracking-tighter text-ink leading-[0.9] text-[clamp(2.5rem,7vw,5.5rem)]">
            Selected<br /><span className="text-accent">work.</span>
          </h2>
          <p className="text-ink-soft mt-5 max-w-md">
            Click any project to read the full case study — the problem, my approach, and what shipped.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} onOpen={() => setActive(project)} />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mt-10">
          <a
            href="https://github.com/Saagnik-Mondal?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-soft hover:text-accent font-semibold transition-colors"
          >
            See all 21 repositories on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
