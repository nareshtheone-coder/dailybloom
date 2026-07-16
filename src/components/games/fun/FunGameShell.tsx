import type { ReactNode } from 'react'

interface FunGameShellProps {
  title: string
  emoji: string
  subtitle?: string
  score?: number
  onBack: () => void
  children: ReactNode
  gradient?: string
}

export default function FunGameShell({
  title,
  emoji,
  subtitle,
  score,
  onBack,
  children,
  gradient = 'from-fuchsia-300 via-pink-300 to-orange-300',
}: FunGameShellProps) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col overflow-hidden`}>
      <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-sm shrink-0">
        <button
          onClick={onBack}
          className="text-4xl bg-white/80 rounded-full p-2 hover:bg-white active:scale-95"
          aria-label="Back"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-white">
            {emoji} {title}
          </div>
          <div className="text-sm text-white/90">
            {subtitle}
            {score !== undefined ? ` · Score: ${score}` : ''}
          </div>
          <span className="inline-block mt-1 text-xs bg-white/30 text-white px-2 py-0.5 rounded-full">
            🎉 Just for fun!
          </span>
        </div>
        <div className="w-12" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {children}
      </div>
    </div>
  )
}
