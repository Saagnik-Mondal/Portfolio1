import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf = 0

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      }
      const t = e.target as HTMLElement
      setHovering(!!t.closest('a, button, [data-cursor="hover"]'))
    }

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] -ml-1 -mt-1 w-1.5 h-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border transition-[width,height,margin,border-color,background-color] duration-200 ease-out"
        style={{
          width: hovering ? 48 : 30,
          height: hovering ? 48 : 30,
          marginLeft: hovering ? -24 : -15,
          marginTop: hovering ? -24 : -15,
          borderColor: hovering ? 'rgba(79,70,229,0.6)' : 'rgba(22,21,28,0.22)',
          backgroundColor: hovering ? 'rgba(79,70,229,0.06)' : 'transparent',
        }}
      />
    </>
  )
}
