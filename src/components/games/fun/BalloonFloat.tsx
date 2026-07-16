import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getBalloonPopStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface Balloon {
  id: number
  x: number
  y: number
  color: string
  emoji: string
}

const COLORS = [
  { color: 'bg-red-400', emoji: '🎈' },
  { color: 'bg-yellow-400', emoji: '🎈' },
  { color: 'bg-blue-400', emoji: '🎈' },
  { color: 'bg-pink-400', emoji: '🎈' },
]

interface BalloonFloatProps {
  onBack: () => void
}

export default function BalloonFloat({ onBack }: BalloonFloatProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('balloon-float')
  const config = getBalloonPopStage(stageIndex)

  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    setBalloons([])
    setScore(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return
    const spawn = setInterval(() => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      setBalloons((prev) =>
        [...prev, { id: Date.now() + Math.random(), x: Math.random() * 85 + 5, y: 100, ...c }].slice(
          -config.maxOnScreen,
        ),
      )
    }, config.spawnMs)
    return () => clearInterval(spawn)
  }, [stageComplete, config.spawnMs, config.maxOnScreen])

  useEffect(() => {
    if (stageComplete) return
    const move = setInterval(() => {
      setBalloons((prev) => prev.map((b) => ({ ...b, y: b.y - config.riseSpeed })).filter((b) => b.y > -15))
    }, 50)
    return () => clearInterval(move)
  }, [stageComplete, config.riseSpeed])

  const pop = (id: number) => {
    if (stageComplete) return
    setBalloons((prev) => prev.filter((b) => b.id !== id))
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
      title="Balloon Pop"
      emoji="🎈"
      score={score}
      subtitle={`${score}/${config.target} pops`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setBalloons([])
        setScore(0)
      }}
      onBack={onBack}
      gradient="from-rose-300 to-orange-300"
    >
      <div className="relative w-full h-full max-w-2xl">
        {balloons.map((b) => (
          <button
            key={b.id}
            onClick={() => pop(b.id)}
            className={`absolute text-5xl w-16 h-20 ${b.color} rounded-full shadow-lg hover:scale-110`}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            {b.emoji}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-4">Pop balloons before they float away!</p>
    </FunGameShell>
  )
}
