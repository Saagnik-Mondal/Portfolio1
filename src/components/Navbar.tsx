import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/portfolio'
import { useSmoothScroll } from '../lib/smooth-scroll'
import Magnetic from './Magnetic'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    scrollTo(href)
  }

  const openContactForm = () => {
    setMenuOpen(false)
    scrollTo('#contact')
    // let the scroll settle, then pop the in-page message form
    window.setTimeout(() => window.dispatchEvent(new Event('open-message-form')), 650)
  }

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-all duration-500 md:px-10 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Magnetic strength={0.4}>
          <button
            onClick={() => scrollTo(0)}
            data-cursor="hover"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full accent-fill text-[12px] font-black text-white shadow-lg shadow-accent/25 transition-transform duration-300 group-hover:rotate-[20deg]">
              SM
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:block">
              Saagnik / AI·ML
            </span>
          </button>
        </Magnetic>

        <div
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 md:flex ${
            scrolled ? 'panel shadow-sm' : ''
          }`}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              data-cursor="hover"
              className="group relative px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <span className="mr-1.5 font-mono text-[10px] text-ink-faint">
                0{i + 1}
              </span>
              {link.label}
            </button>
          ))}
        </div>

        <Magnetic strength={0.3}>
          <button
            onClick={openContactForm}
            data-cursor="hover"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent md:inline-flex"
          >
            Let's talk
          </button>
        </Magnetic>

        <button
          className="text-ink md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 7h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-5 panel overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col p-3">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-display text-2xl font-semibold text-ink transition-colors hover:bg-ink/5"
                >
                  <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                  {link.label}
                </button>
              ))}
              <button
                onClick={openContactForm}
                className="mt-1 rounded-xl bg-ink px-4 py-3 text-center font-semibold text-paper"
              >
                Let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
