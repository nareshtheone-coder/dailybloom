import type { ReactNode } from 'react'

interface GameViewportProps {
  children: ReactNode
  className?: string
}

/** Bezel-framed play area like a mobile game screen */
export default function GameViewport({ children, className = '' }: GameViewportProps) {
  return (
    <div className={`flex-1 min-h-0 px-3 pb-3 md:px-4 md:pb-4 ${className}`}>
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{
          boxShadow:
            'inset 0 0 0 4px rgba(255,255,255,0.25), inset 0 8px 32px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.2)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
