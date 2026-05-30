import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'

const EASE = [0.22, 1, 0.36, 1] as const
const EMAIL = 'saagnikmondal@gmail.com'

const GitHubIcon = (p: { className?: string }) => (
  <svg className={p.className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const LinkedInIcon = (p: { className?: string }) => (
  <svg className={p.className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)
const MailIcon = (p: { className?: string }) => (
  <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" strokeWidth={1.6} />
    <path strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
  </svg>
)

type Channel = {
  name: string
  handle: string
  meta: string
  href: string
  color: string
  Icon: (p: { className?: string }) => JSX.Element
  copy?: boolean
}

const channels: Channel[] = [
  {
    name: 'GitHub',
    handle: '@Saagnik-Mondal',
    meta: '21 repositories · open source',
    href: 'https://github.com/Saagnik-Mondal',
    color: '#1F1B17',
    Icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    handle: 'Saagnik Mondal',
    meta: "Let's connect professionally",
    href: 'https://www.linkedin.com/in/saagnik-mondal/',
    color: '#0A66C2',
    Icon: LinkedInIcon,
  },
  {
    name: 'Email',
    handle: EMAIL,
    meta: 'Fastest way to reach me',
    href: `mailto:${EMAIL}`,
    color: '#FF5A2C',
    Icon: MailIcon,
    copy: true,
  },
]

function Panel({
  ch,
  index,
  active,
  dim,
  onEnter,
  onLeave,
}: {
  ch: Channel
  index: number
  active: boolean
  dim: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try { await navigator.clipboard.writeText(EMAIL) } catch { /* ignore */ }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <a
      href={ch.href}
      target={ch.copy ? undefined : '_blank'}
      rel={ch.copy ? undefined : 'noopener noreferrer'}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{
        flexGrow: active ? 2.4 : dim ? 0.78 : 1,
        background: active ? ch.color : undefined,
      }}
      className={`group relative flex h-[168px] flex-col justify-between overflow-hidden rounded-[26px] border border-ink/10 p-6 transition-[flex-grow,background-color,border-color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[440px] md:p-8 ${
        active ? 'border-transparent' : 'bg-paper-2/70'
      }`}
    >
      {/* watermark icon */}
      <ch.Icon
        className={`pointer-events-none absolute -bottom-8 -right-6 h-44 w-44 transition-all duration-[600ms] ${
          active ? 'text-white/12 opacity-100' : 'text-ink/[0.05] opacity-100 md:opacity-100'
        }`}
      />

      {/* top row */}
      <div className="relative flex items-center justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
            active ? 'text-white/70' : 'text-ink-faint'
          }`}
        >
          ({String(index + 1).padStart(2, '0')})
        </span>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
            active ? 'bg-white/15 text-white' : 'bg-ink/[0.06] text-ink'
          }`}
        >
          <ch.Icon className="h-5 w-5" />
        </span>
      </div>

      {/* bottom content */}
      <div className="relative">
        <h3
          className={`display text-[clamp(1.6rem,3vw,2.4rem)] leading-[0.95] transition-colors duration-300 ${
            active ? 'text-white' : 'text-ink'
          }`}
        >
          {ch.name}
        </h3>

        {/* reveal details: always on mobile, on hover on desktop */}
        <div className="mt-2 overflow-hidden transition-all duration-[600ms] md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100">
          <p className={`truncate text-sm transition-colors duration-300 ${active ? 'text-white/90' : 'text-ink-soft'}`}>
            {ch.handle}
          </p>
          <p className={`mt-0.5 text-xs transition-colors duration-300 ${active ? 'text-white/60' : 'text-ink-faint'}`}>
            {ch.meta}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                active ? 'text-white' : 'text-ink'
              }`}
            >
              {ch.copy ? 'Open mail' : 'Visit'}
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
              </svg>
            </span>
            {ch.copy && (
              <button
                onClick={copy}
                data-cursor-label={copied ? 'Copied' : 'Copy'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-ink/[0.06] text-ink hover:bg-ink/10'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'done' : 'copy'}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Contact() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 })
  const [active, setActive] = useState<number | null>(null)

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden px-5 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(04)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Contact</span>
        </div>

        <h2 className="display text-ink text-[clamp(2.5rem,7vw,6rem)]">
          <RevealLine>Let's build</RevealLine>
          <RevealLine delay={0.08}>
            <span className="text-gradient">something.</span>
          </RevealLine>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          I'm actively looking for AI/ML engineering roles where I can ship production models and
          grow with a strong team. Pick a channel — hover to open it up.
        </p>

        {/* expanding channel gallery */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-12 flex flex-col gap-4 md:flex-row"
        >
          {channels.map((ch, i) => (
            <Panel
              key={ch.name}
              ch={ch}
              index={i}
              active={active === i}
              dim={active !== null && active !== i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* giant marquee footer */}
      <div className="mt-20 border-t border-ink/12 py-8">
        <Marquee>
          <span className="display flex items-center text-[12vw] leading-none text-ink/10">
            <span className="mx-8">Saagnik Mondal</span>
            <span className="mx-8 text-accent/20">—</span>
            <span className="mx-8">AI / ML Engineer</span>
            <span className="mx-8 text-accent/20">—</span>
          </span>
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 pb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft sm:flex-row">
        <span>© {new Date().getFullYear()} Saagnik Mondal</span>
        <span>Built with React · Three.js · Framer Motion</span>
      </div>
    </footer>
  )
}
