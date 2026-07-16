import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getSpeedTapStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface SpeedTapProps {
  onBack: () => void
}

export default function SpeedTap({ onBack }: SpeedTapProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('speed-tap')
  const config = getSpeedTapStage(stageIndex)

  const [timeLeft, setTimeLeft] = useState(config.durationSec)
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [running, setRunning] = useState(true)

  useEffect(() => {
    setTimeLeft(config.durationSec)
    setScore(0)
    setPos({ x: 50, y: 50 })
    setRunning(true)
  }, [stageIndex, config.durationSec])

  useEffect(() => {
    if (!running || stageComplete) return
    const t = setInterval(() => {
      setTimeLeft((x) => {
        if (x <= 1) {
          setRunning(false)
          return 0
        }
        return x - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [running, stageComplete])

  useEffect(() => {
    if (!running && score >= config.target && !stageComplete) {
      celebrate('full')
      finishStage()
    }
  }, [running, score, config.target, finishStage, stageComplete])

  const tap = () => {
    if (!running || stageComplete) return
    const next = score + 1
    setScore(next)
    setPos({ x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 })
    celebrate('light')
    if (next >= config.target) {
      setRunning(false)
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Speed Tap"
      emoji="⚡"
      score={score}
      subtitle={`${score}/${config.target} · ${timeLeft}s`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setTimeLeft(config.durationSec)
        setScore(0)
        setRunning(true)
      }}
      onBack={onBack}
      gradient="from-yellow-400 to-orange-500"
    >
      <div className="relative w-full h-full max-w-2xl">
        {running && (
          <button
            onClick={tap}
            className="absolute bg-red-500 rounded-full text-4xl shadow-xl animate-pulse hover:scale-110 flex items-center justify-center"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: config.buttonSize, height: config.buttonSize }}
          >
            👆
          </button>
        )}
      </div>
      {!running && score < config.target && (
        <p className="text-white text-xl font-bold">Need {config.target} taps — try again!</p>
      )}
    </FunGameShell>
  )
}
