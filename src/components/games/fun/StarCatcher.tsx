import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getStarCatcherStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface Star {
  id: number
  x: number
  y: number
}

interface StarCatcherProps {
  onBack: () => void
}

export default function StarCatcher({ onBack }: StarCatcherProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('star-catcher')
  const config = getStarCatcherStage(stageIndex)

  const [stars, setStars] = useState<Star[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    setStars([])
    setScore(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return
    const spawn = setInterval(() => {
      setStars((prev) =>
        [...prev, { id: Date.now() + Math.random(), x: Math.random() * 85 + 5, y: -5 }].slice(-config.maxOnScreen),
      )
    }, config.spawnMs)
    return () => clearInterval(spawn)
  }, [stageComplete, config.spawnMs, config.maxOnScreen])

  useEffect(() => {
    if (stageComplete) return
    const fall = setInterval(() => {
      setStars((prev) => prev.map((s) => ({ ...s, y: s.y + config.fallSpeed })).filter((s) => s.y < 105))
    }, 50)
    return () => clearInterval(fall)
  }, [stageComplete, config.fallSpeed])

  const catchStar = (id: number) => {
    if (stageComplete) return
    setStars((prev) => prev.filter((s) => s.id !== id))
    const next = score + 1
    setScore(next)
    celebrate('light')
    if (next >= config.target) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Star Catcher"
      emoji="⭐"
      score={score}
      subtitle={`${score}/${config.target}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setStars([])
        setScore(0)
      }}
      onBack={onBack}
      gradient="from-indigo-400 to-purple-500"
    >
      <div className="relative w-full h-full max-w-2xl bg-indigo-900/20 rounded-3xl border-4 border-white/30">
        {stars.map((s) => (
          <button
            key={s.id}
            onClick={() => catchStar(s.id)}
            className="absolute text-4xl animate-pulse"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            ⭐
          </button>
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl">🧺</div>
      </div>
    </FunGameShell>
  )
}
