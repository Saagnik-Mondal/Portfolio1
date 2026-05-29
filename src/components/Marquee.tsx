import type { ReactNode } from 'react'

export default function Marquee({
  children,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`relative flex w-full overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
        style={{ willChange: 'transform' }}
      >
        <span className="flex shrink-0 items-center">{children}</span>
        <span className="flex shrink-0 items-center" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  )
}
