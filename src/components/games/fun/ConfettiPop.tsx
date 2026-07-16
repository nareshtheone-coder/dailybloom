import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getConfettiStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface ConfettiPopProps {
  onBack: () => void
}

export default function ConfettiPop({ onBack }: ConfettiPopProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('confetti-pop')
  const config = getConfettiStage(stageIndex)

  const [pops, setPops] = useState(0)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    setPops(0)
    setBurst(false)
  }, [stageIndex])

  const fire = () => {
    if (stageComplete) return
    const next = pops + 1
    setPops(next)
    setBurst(true)
    celebrate('light')
    setTimeout(() => setBurst(false), 300)
    if (next >= config.popsNeeded) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Confetti Cannon"
      emoji="🎊"
      score={pops}
      subtitle={`${pops}/${config.popsNeeded} blasts`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setPops(0)
      }}
      onBack={onBack}
      gradient="from-pink-400 via-red-400 to-orange-400"
    >
      <button
        onClick={fire}
        disabled={stageComplete}
        className={`text-8xl md:text-9xl transition-transform ${burst ? 'scale-150' : 'hover:scale-110 active:scale-95'}`}
      >
        🎉
      </button>
      <p className="text-white text-xl font-bold mt-8">Tap the cannon — make it rain confetti!</p>
    </FunGameShell>
  )
}
