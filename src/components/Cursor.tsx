import { useEffect, useRef, useState } from 'react'

type Mode = 'default' | 'hover' | 'label'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('default')
  const [label, setLabel] = useState('')

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
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }
      const t = e.target as HTMLElement
      const labelled = t.closest('[data-cursor-label]') as HTMLElement | null
      if (labelled) {
        setMode('label')
        setLabel(labelled.dataset.cursorLabel || '')
      } else if (t.closest('a, button, [data-cursor="hover"]')) {
        setMode('hover')
        setLabel('')
      } else {
        setMode('default')
        setLabel('')
      }
    }

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.16
      ring.y += (mouse.y - ring.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
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

  const size = mode === 'label' ? 76 : mode === 'hover' ? 52 : 34

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-ink"
        style={{ opacity: mode === 'default' ? 1 : 0, transition: 'opacity 0.2s' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[210] flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          mixBlendMode: mode === 'label' ? 'normal' : 'multiply',
          background:
            mode === 'label' ? '#3A2BFF' : mode === 'hover' ? 'rgba(58,43,255,0.10)' : 'transparent',
          border: mode === 'label' ? 'none' : '1px solid rgba(21,19,15,0.35)',
          transition:
            'width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), margin 0.3s cubic-bezier(0.22,1,0.36,1), background-color 0.3s, border-color 0.3s',
        }}
      >
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white"
          style={{ opacity: mode === 'label' ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          {label}
        </span>
      </div>
    </>
  )
}
