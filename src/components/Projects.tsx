import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'
import { RevealLine } from './Reveal'

type Project = typeof projects[0]

const EASE = [0.22, 1, 0.36, 1] as const

function ProjectRow({
  project,
  index,
  onOpen,
  hovered,
  setHovered,
}: {
  project: Project
  index: number
  onOpen: () => void
  hovered: number | null
  setHovered: (i: number | null) => void
}) {
  const isHovered = hovered === index
  const dim = hovered !== null && !isHovered

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      data-cursor-label="Open"
      className="group relative block w-full border-t border-ink/12 py-7 text-left transition-opacity duration-300 last:border-b"
      style={{ opacity: dim ? 0.4 : 1 }}
    >
      <div className="flex items-center gap-5 md:gap-8">
        <span className="w-10 shrink-0 font-mono text-sm text-ink-faint">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-ink-faint">· {project.year}</span>
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

          <h3
            className="display text-[clamp(1.6rem,4.5vw,3.4rem)] leading-[0.95] text-ink transition-transform duration-500 group-hover:translate-x-2"
            style={{ color: isHovered ? '#3A2BFF' : undefined }}
          >
            {project.title}
          </h3>

          <div className="mt-2 hidden flex-wrap items-center gap-x-2 md:flex">
            {project.tech.slice(0, 5).map((t, i) => (
              <span key={t} className="flex items-center gap-x-2 font-mono text-[11px] text-ink-soft">
                {i > 0 && <span className="text-ink-faint">/</span>}
                {t}
              </span>
            ))}
          </div>
        </div>

        <motion.span
          animate={{ rotate: isHovered ? 0 : -45, scale: isHovered ? 1 : 0.85 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink md:flex"
          style={{ background: isHovered ? '#3A2BFF' : 'transparent', borderColor: isHovered ? '#3A2BFF' : undefined, color: isHovered ? '#fff' : undefined }}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
          </svg>
        </motion.span>
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
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="projects" ref={ref} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(02)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Selected work</span>
        </div>

        <h2 className="display mb-4 text-ink text-[clamp(2.5rem,8vw,7rem)]">
          <RevealLine>Things I've</RevealLine>
          <RevealLine delay={0.08}><span className="text-gradient">built.</span></RevealLine>
        </h2>
        <p className="mb-10 max-w-md text-ink-soft">
          Click any project to read the full case study — the problem, my approach, and what shipped.
        </p>

        <div onMouseLeave={() => setHovered(null)}>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setActive(project)}
              hovered={hovered}
              setHovered={setHovered}
            />
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
          className="mt-10 inline-flex items-center gap-2 font-semibold text-ink-soft transition-colors hover:text-accent"
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
