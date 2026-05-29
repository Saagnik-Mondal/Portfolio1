import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
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
          <Scene3D />
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
