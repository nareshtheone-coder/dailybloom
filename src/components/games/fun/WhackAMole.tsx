import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getWhackAMoleStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface Mole {
  id: number
  hole: number
  up: boolean
}

interface WhackAMoleProps {
  onBack: () => void
}

export default function WhackAMole({ onBack }: WhackAMoleProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('whack-a-mole')
  const config = getWhackAMoleStage(stageIndex)

  const [moles, setMoles] = useState<Mole[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(config.durationSec)

  useEffect(() => {
    setMoles([])
    setScore(0)
    setTimeLeft(config.durationSec)
  }, [stageIndex, config.durationSec])

  useEffect(() => {
    if (stageComplete || timeLeft === 0) return
    const t = setInterval(() => setTimeLeft((x) => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [timeLeft, stageComplete])

  useEffect(() => {
    if (stageComplete || timeLeft === 0) return
    const pop = setInterval(() => {
      const hole = Math.floor(Math.random() * config.holes)
      setMoles([{ id: Date.now(), hole, up: true }])
      setTimeout(() => setMoles([]), config.visibleMs)
    }, config.popIntervalMs)
    return () => clearInterval(pop)
  }, [timeLeft, stageComplete, config])

  const whack = (hole: number) => {
    if (stageComplete) return
    const hit = moles.find((m) => m.hole === hole && m.up)
    if (!hit) return
    setMoles([])
    const next = score + 1
    setScore(next)
    celebrate('light')
    if (next >= config.targetScore) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Whack-a-Mole"
      emoji="🔨"
      score={score}
      subtitle={`${score}/${config.targetScore} · ${timeLeft}s`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setMoles([])
        setScore(0)
        setTimeLeft(config.durationSec)
      }}
      onBack={onBack}
      gradient="from-green-300 to-lime-400"
    >
      <div className={`grid gap-4 w-full max-w-md ${config.holes <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {Array.from({ length: config.holes }).map((_, hole) => {
          const up = moles.some((m) => m.hole === hole && m.up)
          return (
            <button
              key={hole}
              onClick={() => whack(hole)}
              className="h-24 md:h-28 bg-amber-800/40 rounded-full border-4 border-amber-900/50 flex items-end justify-center overflow-hidden"
            >
              <span className={`text-5xl transition-all ${up ? 'translate-y-0' : 'translate-y-full'}`}>🐹</span>
            </button>
          )
        })}
      </div>
      {timeLeft === 0 && score < config.targetScore && (
        <p className="text-white font-bold mt-4">Time! Try again — need {config.targetScore} whacks.</p>
      )}
    </FunGameShell>
  )
}
