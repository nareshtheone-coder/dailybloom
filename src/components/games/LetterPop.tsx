import { useState, useMemo, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { POP_BY_STAGE, LETTER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface LetterPopProps {
  onBack: () => void
}

interface PopBubble {
  id: number
  letter: string
  color: string
  emoji: string
  popped: boolean
  x: number
  y: number
}

export default function LetterPop({ onBack }: LetterPopProps) {
  const totalStages = LETTER_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('letter-pop', totalStages)

  const stageBubbles = useMemo(() => POP_BY_STAGE[stageIndex], [stageIndex])
  const stageMeta = LETTER_STAGES[stageIndex]

  const [bubbles, setBubbles] = useState<PopBubble[]>([])
  const [poppedCount, setPoppedCount] = useState(0)

  useEffect(() => {
    setBubbles(
      stageBubbles.map((b, i) => ({
        id: i,
        letter: b.letter,
        color: b.color,
        emoji: b.emoji,
        popped: false,
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
      })),
    )
    setPoppedCount(0)
  }, [stageIndex, stageBubbles])

  const handleBubblePop = (id: number) => {
    setBubbles((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)))
    const newCount = poppedCount + 1
    setPoppedCount(newCount)
    celebrate('light')

    if (newCount === stageBubbles.length) {
      celebrate('full')
      finishStage()
    }
  }

  const resetBubbles = () => {
    setBubbles(
      stageBubbles.map((b, i) => ({
        id: i,
        letter: b.letter,
        color: b.color,
        emoji: b.emoji,
        popped: false,
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
      })),
    )
    setPoppedCount(0)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-300 via-pink-300 to-purple-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="💥 Letter Pop"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        extra={`${poppedCount}/${stageBubbles.length} popped`}
        onBack={onBack}
      />

      <div className="relative flex-1 w-full max-w-2xl mx-auto bg-pink-200/30 rounded-3xl border-4 border-white/50 m-4 overflow-hidden">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => !bubble.popped && handleBubblePop(bubble.id)}
            disabled={bubble.popped}
            className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all ${
              bubble.popped ? 'scale-0 opacity-0' : `${bubble.color} shadow-lg hover:scale-110 animate-pulse`
            }`}
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
          >
            {!bubble.popped && (
              <>
                <div className="text-2xl">{bubble.emoji}</div>
                <div className="text-sm font-bold text-white drop-shadow">{bubble.letter}</div>
              </>
            )}
          </button>
        ))}
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={() => {
          if (nextStage()) resetBubbles()
        }}
        onReplay={() => {
          replayStage()
          resetBubbles()
        }}
        onBack={onBack}
      />
    </div>
  )
}
