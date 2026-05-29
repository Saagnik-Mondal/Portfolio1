import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { RevealLine } from './Reveal'
import Marquee from './Marquee'
import Magnetic from './Magnetic'

const socials = [
  { name: 'GitHub', handle: '@Saagnik-Mondal', href: 'https://github.com/Saagnik-Mondal' },
  { name: 'LinkedIn', handle: 'Saagnik Mondal', href: 'https://www.linkedin.com/in/saagnik-mondal/' },
  { name: 'Email', handle: 'saagnikmondal@gmail.com', href: 'mailto:saagnikmondal@gmail.com' },
]

export default function Contact() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden px-5 pt-20 md:px-10 md:pt-28">
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

        <div className="mt-12 grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            I'm actively looking for AI/ML engineering roles where I can ship production models and
            grow with a strong team. If you're building something intelligent, let's talk.
          </p>
          <Magnetic strength={0.25}>
            <a
              href="mailto:saagnikmondal@gmail.com"
              data-cursor-label="Email"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-lg font-semibold text-paper transition-colors hover:bg-accent"
            >
              Say hello
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
              </svg>
            </a>
          </Magnetic>
        </div>

        {/* social links */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target={s.name !== 'Email' ? '_blank' : undefined}
              rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
              data-cursor="hover"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-center justify-between bg-paper p-6 transition-colors hover:bg-paper-2"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">{s.name}</p>
                <p className="mt-1 font-medium text-ink transition-colors group-hover:text-accent">{s.handle}</p>
              </div>
              <svg className="h-4 w-4 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M17 7H7m10 0v10" />
              </svg>
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
