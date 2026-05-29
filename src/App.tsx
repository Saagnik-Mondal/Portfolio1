import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-ink/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-ink-soft text-sm">© {new Date().getFullYear()} Saagnik Mondal</p>
        <p className="text-ink-soft text-sm">Built with React, Three.js &amp; Framer Motion</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Cursor />

      <SmoothScrollProvider>
        <div className="min-h-screen relative">
          <Scene3D />
          <Navbar />
          <main className="relative z-[2]">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <div className="relative z-[2]">
            <Footer />
          </div>
        </div>
      </SmoothScrollProvider>
    </>
  )
}
