import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'
import { RevealLine } from './Reveal'

type Project = typeof projects[0]

const EASE = [0.22, 1, 0.36, 1] as const

/** Resting tilt per card, so the board reads like pinned sticky notes. */
const TILT = [-2.6, 1.8, -1.6, 2.4]

function StickyNote({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const rot = TILT[index % TILT.length]
  return (
    <motion.button
      onClick={onOpen}
      data-cursor-label="Open"
      initial={{ opacity: 0, y: 36, rotate: rot }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      whileHover={{ rotate: 0, y: -10, scale: 1.025 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
      className="group relative flex min-h-[300px] flex-col rounded-xl bg-[#FBF9F3] p-6 text-left shadow-[0_14px_34px_-16px_rgba(21,19,15,0.4)] ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_26px_50px_-18px_rgba(21,19,15,0.5)] md:p-7"
    >
      {/* tape strip */}
      <span
        className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 -rotate-2 rounded-[2px] backdrop-blur-sm"
        style={{ background: `${project.categoryColor}38`, boxShadow: `inset 0 0 0 1px ${project.categoryColor}55` }}
      />

      {/* meta row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-ink-faint">· {project.year}</span>
        </div>
        <span className="display text-2xl leading-none text-ink/12">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* title */}
      <h3 className="display mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[0.98] text-ink transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </h3>

      {/* note body */}
      <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-soft">
        {project.description}
      </p>

      {/* footer */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-accent">
          Read case study
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
          </svg>
        </span>
        <div className="flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-accent-tint px-2 py-0.5 text-[10px] font-semibold text-accent">
              Featured
            </span>
          )}
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {project.stars}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{label}</p>
      <p className="text-[15px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[150] flex items-end justify-center bg-ink/30 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-ink/10 bg-paper shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/10 bg-paper/90 px-7 pb-4 pt-7 backdrop-blur">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px]">
              <span className="font-semibold uppercase tracking-[0.18em] text-accent">{project.category}</span>
              <span className="text-ink-faint">· {project.year}</span>
            </div>
            <h3 className="display text-3xl leading-tight text-ink">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            data-cursor="hover"
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-7 px-7 py-7">
          <Block label="The problem" body={project.problem} />
          <Block label="My approach" body={project.approach} />
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Results</p>
            <ul className="space-y-2.5">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-soft">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="rounded-md border border-ink/10 px-2.5 py-1 font-mono text-xs text-ink-soft">
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
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-accent"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.04 })
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" ref={ref} className="relative px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(02)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Selected work</span>
        </div>

        <h2 className="display mb-4 text-ink text-[clamp(2.5rem,8vw,7rem)]">
          <RevealLine>Things I've</RevealLine>
          <RevealLine delay={0.08}><span className="text-gradient">built.</span></RevealLine>
        </h2>
        <p className="mb-12 max-w-md text-ink-soft">
          Pinned notes from the lab — tap any to read the full case study: the problem, my
          approach, and what shipped.
        </p>

        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <StickyNote key={project.id} project={project} index={i} onOpen={() => setActive(project)} />
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="https://github.com/Saagnik-Mondal?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="mt-12 inline-flex items-center gap-2 font-semibold text-ink-soft transition-colors hover:text-accent"
        >
          See all 21 repositories on GitHub
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
          </svg>
        </motion.a>
      </div>

      <AnimatePresence>
        {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
