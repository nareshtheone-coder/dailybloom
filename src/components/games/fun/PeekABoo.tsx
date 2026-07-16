import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getPeekABooStage } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import { FUN_STAGE_COUNT } from '../../../data/funGameStages'
import FunGameShell from './FunGameShell'

const HIDERS = ['☁️', '🌸', '🎁', '🪴']
const FRIENDS = ['🐻', '🐰', '🦊', '🐼', '🐨']

interface PeekABooProps {
  onBack: () => void
}

export default function PeekABoo({ onBack }: PeekABooProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('peek-a-boo')
  const config = getPeekABooStage(stageIndex)

  const [round, setRound] = useState(0)
  const [hidden, setHidden] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setRound(0)
    setHidden(true)
    setScore(0)
  }, [stageIndex])

  const reveal = () => {
    if (!hidden || stageComplete) return
    setHidden(false)
    celebrate('light')
    const nextScore = score + 1
    setScore(nextScore)
    setTimeout(() => {
      setHidden(true)
      setRound((r) => r + 1)
      if (nextScore >= config.findsNeeded) {
        celebrate('full')
        finishStage()
      }
    }, config.hideMs)
  }

  return (
    <FunGameShell
      title="Peek-a-Boo"
      emoji="👀"
      score={score}
      subtitle={`${score}/${config.findsNeeded} finds`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setRound(0)
        setHidden(true)
        setScore(0)
      }}
      onBack={onBack}
      gradient="from-sky-300 via-indigo-300 to-purple-300"
    >
      <button
        onClick={reveal}
        disabled={stageComplete}
        className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
      >
        <span className="text-8xl absolute transition-all">{HIDERS[round % HIDERS.length]}</span>
        <span
          className={`text-9xl transition-all duration-300 ${hidden ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        >
          {FRIENDS[round % FRIENDS.length]}
        </span>
      </button>
      <p className="text-white text-lg font-bold mt-6">Tap the cloud — who is hiding?</p>
    </FunGameShell>
  )
}
