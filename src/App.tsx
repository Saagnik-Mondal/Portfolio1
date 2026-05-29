import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SmoothScrollProvider } from './lib/smooth-scroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left accent-fill"
    />
  )
}

/** The WebGL orb lives behind the hero, then fades as you scroll past it so
 *  the sections below sit clean on the paper canvas. */
function OrbLayer() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const opacity = useTransform(scrollY, [0, vh * 0.85], [1, 0])
  return (
    <motion.div style={{ opacity }} className="pointer-events-none fixed inset-0 z-0">
      <Scene3D />
    </motion.div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="grain" aria-hidden />
      <Cursor />
      <ScrollProgress />

      <SmoothScrollProvider>
        <div className="relative min-h-screen">
          <OrbLayer />
          <Navbar />
          <main className="relative z-[2]">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </div>
      </SmoothScrollProvider>
    </>
  )
}
