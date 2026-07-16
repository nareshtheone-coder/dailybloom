import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getEmojiMazeStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface EmojiMazeProps {
  onBack: () => void
}

export default function EmojiMaze({ onBack }: EmojiMazeProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('emoji-maze')
  const config = getEmojiMazeStage(stageIndex)

  const [step, setStep] = useState(0)
  const [pos, setPos] = useState(config.start)

  useEffect(() => {
    setStep(0)
    setPos(config.start)
  }, [stageIndex, config.start])

  const expected = config.steps[step]

  const move = (dir: string) => {
    if (stageComplete) return
    if (dir !== expected) {
      setStep(0)
      setPos(config.start)
      return
    }
    const next = step + 1
    setPos((p) => ({
      x: Math.min(4, Math.max(0, p.x + (dir === '➡️' ? 1 : dir === '⬅️' ? -1 : 0))),
      y: Math.min(4, Math.max(0, p.y + (dir === '⬆️' ? -1 : dir === '⬇️' ? 1 : 0))),
    }))
    if (next >= config.steps.length) {
      celebrate('full')
      finishStage()
    } else {
      setStep(next)
      celebrate('light')
    }
  }

  return (
    <FunGameShell
      title="Emoji Maze"
      emoji="🗺️"
      subtitle={`Step ${step + 1}/${config.steps.length}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setStep(0)
        setPos(config.start)
      }}
      onBack={onBack}
      gradient="from-emerald-500 to-teal-600"
    >
      <div className="grid grid-cols-5 gap-1 mb-6 bg-black/20 p-2 rounded-xl">
        {Array.from({ length: 25 }).map((_, i) => {
          const x = i % 5
          const y = Math.floor(i / 5)
          const isPlayer = x === pos.x && y === pos.y
          const isGoal = x === config.goalPos.x && y === config.goalPos.y
          return (
            <div key={i} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl bg-white/20 rounded">
              {isPlayer ? '🐰' : isGoal ? config.goal : ''}
            </div>
          )
        })}
      </div>
      <p className="text-white mb-3">Follow the path: {expected}</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {['⬅️', '➡️', '⬆️', '⬇️'].map((d) => (
          <button key={d} onClick={() => move(d)} className="text-4xl w-16 h-16 bg-white/80 rounded-xl hover:scale-105">
            {d}
          </button>
        ))}
      </div>
    </FunGameShell>
  )
}
