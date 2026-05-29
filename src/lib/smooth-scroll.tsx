import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { scrollStore } from './scroll-store'

type ScrollTo = (target: string | number | HTMLElement, opts?: { offset?: number }) => void

const LenisContext = createContext<{ lenis: Lenis | null; scrollTo: ScrollTo }>({
  lenis: null,
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = instance
    setLenis(instance)

    instance.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollStore.progress = e.progress
      scrollStore.velocity = e.velocity
    })

    let raf = 0
    const loop = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo: ScrollTo = (target, opts) => {
    lenisRef.current?.scrollTo(target, { offset: opts?.offset ?? -80, duration: 1.3 })
  }

  return <LenisContext.Provider value={{ lenis, scrollTo }}>{children}</LenisContext.Provider>
}
