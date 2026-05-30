import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'
import Magnetic from './Magnetic'

const EASE = [0.22, 1, 0.36, 1] as const
const EMAIL = 'saagnikmondal@gmail.com'

const socials = [
  { name: 'GitHub', handle: '@Saagnik-Mondal', href: 'https://github.com/Saagnik-Mondal' },
  { name: 'LinkedIn', handle: 'Saagnik Mondal', href: 'https://www.linkedin.com/in/saagnik-mondal/' },
  { name: 'Email', handle: EMAIL, href: `mailto:${EMAIL}` },
]

/** Live clock in my timezone — proves the page is alive, not a static brochure. */
function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/** Is it roughly working hours in IST? Tweaks the status copy so it feels real. */
function useAwake() {
  const [awake, setAwake] = useState(true)
  useEffect(() => {
    const check = () => {
      const h = Number(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
      setAwake(h >= 9 && h < 24)
    }
    check()
    const id = setInterval(check, 60000)
    return () => clearInterval(id)
  }, [])
  return awake
}

export default function Contact() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 })
  const time = useLocalTime()
  const awake = useAwake()
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      /* clipboard may be blocked — still flash feedback */
    }
    setCopied(true)
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1800)
  }

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current) }, [])

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden px-5 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">(04)</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft">Contact</span>
        </div>

        <h2 className="display text-ink text-[clamp(2.8rem,11vw,11rem)]">
          <RevealLine>Let's build</RevealLine>
          <RevealLine delay={0.08}>
            <span className="text-gradient">something.</span>
          </RevealLine>
        </h2>

        {/* live availability console — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-paper-2/70 backdrop-blur"
        >
          {/* status strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-ink/10 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] md:px-8">
            <span className="flex items-center gap-2.5 text-ink">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for AI / ML roles
            </span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-soft">
              {awake ? 'Online now' : 'Asleep — replies by morning'}
            </span>
            <span className="ml-auto flex items-center gap-2 text-ink-soft">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth={1.6} />
                <path strokeLinecap="round" strokeWidth={1.6} d="M12 7v5l3 2" />
              </svg>
              <span className="tabular-nums tracking-[0.12em]">{time || '--:--:--'}</span> IST
            </span>
          </div>

          {/* click-to-copy email — the star interaction */}
          <div className="flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
            <button
              onClick={copyEmail}
              data-cursor-label={copied ? 'Copied' : 'Copy'}
              className="group flex min-w-0 items-center gap-4 text-left"
            >
              <span className="display truncate text-[clamp(1.6rem,5.2vw,3.4rem)] leading-none text-ink transition-colors duration-300 group-hover:text-accent">
                {EMAIL}
              </span>
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-4 w-4 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth={1.7} />
                      <path strokeWidth={1.7} strokeLinecap="round" d="M5 15V5a2 2 0 012-2h10" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-600 sm:inline"
                  >
                    Copied to clipboard
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Magnetic strength={0.25}>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor-label="Email"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-semibold text-paper transition-colors hover:bg-accent"
              >
                Start a conversation
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
          I'm actively looking for AI/ML engineering roles where I can ship production models and
          grow with a strong team. If you're building something intelligent, let's talk.
        </p>

        {/* social links — interactive rows */}
        <div className="mt-16 border-t border-ink/12">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target={s.name !== 'Email' ? '_blank' : undefined}
              rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
              data-cursor="hover"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="group flex items-center justify-between gap-6 border-b border-ink/12 py-6 md:py-8"
            >
              <div className="flex min-w-0 items-baseline gap-4 md:gap-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  {s.name}
                </span>
                <span className="display truncate text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent">
                  {s.handle}
                </span>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 17L17 7M17 7H7m10 0v10" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
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
