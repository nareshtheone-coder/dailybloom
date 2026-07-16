import type { ReactNode } from 'react'
import GameStageHeader from '../../GameStageHeader'
import StageCompleteOverlay from '../../StageCompleteOverlay'

interface FunGameShellProps {
  title: string
  emoji: string
  subtitle?: string
  score?: number
  onBack: () => void
  children: ReactNode
  gradient?: string
  stageIndex: number
  totalStages: number
  stageLabel?: string
  stageComplete: boolean
  allComplete: boolean
  onNextStage: () => void
  onReplayStage: () => void
}

export default function FunGameShell({
  title,
  emoji,
  subtitle,
  score,
  onBack,
  children,
  gradient = 'from-fuchsia-300 via-pink-300 to-orange-300',
  stageIndex,
  totalStages,
  stageLabel,
  stageComplete,
  allComplete,
  onNextStage,
  onReplayStage,
}: FunGameShellProps) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col overflow-hidden`}>
      <GameStageHeader
        title={`${emoji} ${title}`}
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageLabel}
        score={score}
        extra={subtitle}
        onBack={onBack}
      />
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <span className="absolute top-2 right-4 text-xs bg-white/30 text-white px-2 py-0.5 rounded-full font-bold">
          🎉 Just for fun!
        </span>
        {children}
      </div>
      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={onNextStage}
        onReplay={onReplayStage}
        onBack={onBack}
      />
    </div>
  )
}
