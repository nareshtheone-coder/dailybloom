import type { ReactNode } from 'react'
import AnimatedScene from '../ui/AnimatedScene'
import PremiumHUD from '../ui/PremiumHUD'
import GameViewport from '../ui/GameViewport'

interface PremiumLearningFrameProps {
  title: string
  emoji?: string
  score?: number
  extra?: string
  onBack: () => void
  children: ReactNode
  scene?: 'sky' | 'sunset' | 'night' | 'meadow'
  framed?: boolean
}

/** Premium shell for learning games that don't use staged headers yet */
export default function PremiumLearningFrame({
  title,
  emoji,
  score,
  extra,
  onBack,
  children,
  scene = 'meadow',
  framed = true,
}: PremiumLearningFrameProps) {
  return (
    <AnimatedScene variant={scene} className="flex flex-col">
      <PremiumHUD title={title} emoji={emoji} score={score} extra={extra} onBack={onBack} />
      {framed ? <GameViewport>{children}</GameViewport> : (
        <div className="flex-1 min-h-0 overflow-hidden relative">{children}</div>
      )}
    </AnimatedScene>
  )
}
