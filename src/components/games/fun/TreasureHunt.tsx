import { useState, useEffect, useMemo } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getTreasureHuntStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

const PRIZES = ['⭐', '💎', '🍭', '🎁', '🌟']

interface TreasureHuntProps {
  onBack: () => void
}

export default function TreasureHunt({ onBack }: TreasureHuntProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('treasure-hunt')
  const config = getTreasureHuntStage(stageIndex)

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const treasureIndex = useMemo(() => Math.floor(Math.random() * config.choices), [round, config.choices])

  useEffect(() => {
    setRound(0)
    setScore(0)
    setPicked(null)
  }, [stageIndex])

  const pick = (i: number) => {
    if (picked !== null || stageComplete) return
    setPicked(i)
    if (i === treasureIndex) {
      celebrate('medium')
      const next = score + 1
      setScore(next)
      if (next >= config.findsNeeded) {
        celebrate('full')
        finishStage()
      }
    }
    setTimeout(() => {
      setPicked(null)
      setRound((r) => r + 1)
    }, 900)
  }

  const cols = config.choices <= 4 ? 2 : 3

  return (
    <FunGameShell
      title="Treasure Hunt"
      emoji="🗺️"
      score={score}
      subtitle={`${score}/${config.findsNeeded} treasures`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setRound(0)
        setScore(0)
        setPicked(null)
      }}
      onBack={onBack}
      gradient="from-amber-300 to-yellow-400"
    >
      <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: config.choices }).map((_, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl text-5xl flex items-center justify-center ${
              picked === i ? (i === treasureIndex ? 'bg-green-400' : 'bg-gray-300') : 'bg-white/80 hover:scale-105'
            }`}
          >
            {picked === i ? (i === treasureIndex ? PRIZES[round % PRIZES.length] : '❌') : '🪨'}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-6">Which rock hides the treasure?</p>
    </FunGameShell>
  )
}
