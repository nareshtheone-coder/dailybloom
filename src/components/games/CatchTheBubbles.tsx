import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { getBubblePopStage, FUN_STAGE_COUNT } from '../../data/funGameStages'
import { useFunGameStages } from '../../hooks/useFunGameStages'
import FunGameShell from './fun/FunGameShell'

interface CatchTheBubblesProps {
  onBack: () => void
}

interface Bubble {
  id: number
  x: number
  y: number
  type: 'regular' | 'gold' | 'rainbow'
  popped: boolean
}

const BUBBLE_TYPES = {
  regular: { color: 'bg-blue-400', emoji: '🫧', score: 1 },
  gold: { color: 'bg-yellow-400', emoji: '✨', score: 2 },
  rainbow: { color: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400', emoji: '🌈', score: 3 },
}

export default function CatchTheBubbles({ onBack }: CatchTheBubblesProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('catch-the-bubbles')
  const config = getBubblePopStage(stageIndex)

  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)
  const [poppedCount, setPoppedCount] = useState(0)

  useEffect(() => {
    setBubbles([])
    setScore(0)
    setPoppedCount(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return
    const interval = setInterval(() => {
      const roll = Math.random()
      const type: Bubble['type'] =
        roll > 1 - config.specialRate
          ? roll > 1 - config.specialRate / 2
            ? 'rainbow'
            : 'gold'
          : 'regular'
      const newBubble: Bubble = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 20 - 20,
        type,
        popped: false,
      }
      setBubbles((prev) => [...prev, newBubble].slice(-config.maxOnScreen))
    }, config.spawnMs)
    return () => clearInterval(interval)
  }, [stageComplete, config])

  useEffect(() => {
    if (stageComplete) return
    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((b) => ({ ...b, y: b.y + config.speed })).filter((b) => b.y < 110 && !b.popped),
      )
    }, 50)
    return () => clearInterval(interval)
  }, [stageComplete, config.speed])

  const handleBubbleClick = (bubbleId: number) => {
    if (stageComplete) return
    const bubble = bubbles.find((b) => b.id === bubbleId)
    if (!bubble || bubble.popped) return

    setBubbles((prev) => prev.map((b) => (b.id === bubbleId ? { ...b, popped: true } : b)))
    const points = BUBBLE_TYPES[bubble.type].score
    const newScore = score + points
    const newCount = poppedCount + 1
    setScore(newScore)
    setPoppedCount(newCount)
    celebrate('light')

    if (newCount >= config.target) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Bubble Pop"
      emoji="🫧"
      score={score}
      subtitle={`${poppedCount}/${config.target} bubbles`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setBubbles([])
        setScore(0)
        setPoppedCount(0)
      }}
      onBack={onBack}
      gradient="from-sky-300 to-blue-400"
    >
      <div className="relative flex-1 w-full max-w-2xl bg-sky-200/30 rounded-3xl border-4 border-white/50 overflow-hidden min-h-[50vh]">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble.id)}
            disabled={bubble.popped}
            className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-all ${
              bubble.popped
                ? 'scale-0 opacity-0'
                : `${BUBBLE_TYPES[bubble.type].color} shadow-lg hover:scale-110 animate-pulse`
            }`}
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
          >
            {!bubble.popped && BUBBLE_TYPES[bubble.type].emoji}
          </button>
        ))}
      </div>
      <p className="text-white text-lg font-bold mt-4 animate-bounce">👉 Tap bubbles to pop! 💦</p>
    </FunGameShell>
  )
}
