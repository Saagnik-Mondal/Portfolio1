import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/portfolio'
import { useSmoothScroll } from '../lib/smooth-scroll'
import Magnetic from './Magnetic'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Magnetic strength={0.5}>
          <motion.button
            onClick={() => scrollTo(0)}
            className="w-10 h-10 rounded-full wheel-bg flex items-center justify-center cursor-pointer shadow-md"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-black text-sm">SM</span>
          </motion.button>
        </Magnetic>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-sm font-semibold transition-colors relative ${
                active === link.href ? 'text-spectrum-violet' : 'text-ink-soft hover:text-ink'
              }`}
              whileHover={{ y: -1 }}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full wheel-bg"
                />
              )}
            </motion.button>
          ))}
          <motion.a
            href="https://github.com/Saagnik-Mondal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold px-4 py-1.5 rounded-full text-ink spectrum-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub
          </motion.a>
        </div>

        <button
          className="md:hidden text-ink-soft hover:text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-ink/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-ink-soft hover:text-ink font-semibold transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://github.com/Saagnik-Mondal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-spectrum-violet font-bold"
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
