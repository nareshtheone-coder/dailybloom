import type { ReactNode } from 'react'
import AnimatedScene from '../../../ui/AnimatedScene'
import PremiumHUD from '../../../ui/PremiumHUD'
import GameViewport from '../../../ui/GameViewport'
import StageCompleteOverlay from '../../StageCompleteOverlay'

interface FunGameShellProps {
  title: string
  emoji: string
  subtitle?: string
  score?: number
  onBack: () => void
  children: ReactNode
  gradient?: string
  scene?: 'sky' | 'sunset' | 'night' | 'meadow'
  stageIndex: number
  totalStages: number
  stageLabel?: string
  stageComplete: boolean
  allComplete: boolean
  onNextStage: () => void
  onReplayStage: () => void
  fullViewport?: boolean
}

export default function FunGameShell({
  title,
  emoji,
  subtitle,
  score,
  onBack,
  children,
  scene = 'sky',
  stageIndex,
  totalStages,
  stageLabel,
  stageComplete,
  allComplete,
  onNextStage,
  onReplayStage,
  fullViewport = false,
}: FunGameShellProps) {
  return (
    <AnimatedScene variant={scene} className="flex flex-col">
      <PremiumHUD
        title={title}
        emoji={emoji}
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageLabel}
        score={score}
        extra={subtitle}
        onBack={onBack}
      />
      {fullViewport ? (
        <GameViewport>{children}</GameViewport>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0 overflow-hidden relative">
          {children}
        </div>
      )}
      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={onNextStage}
        onReplay={onReplayStage}
        onBack={onBack}
      />
    </AnimatedScene>
  )
}
