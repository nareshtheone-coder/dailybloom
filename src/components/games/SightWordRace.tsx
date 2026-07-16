import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { SIGHT_RACE_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface SightWordRaceProps {
  onBack: () => void
}

interface FallingWord {
  id: number
  word: string
  x: number
  y: number
  caught: boolean
}

const TARGET_CATCHES = 10

export default function SightWordRace({ onBack }: SightWordRaceProps) {
  const totalStages = SIGHT_RACE_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('sight-word-race', totalStages)

  const stageWords = SIGHT_RACE_STAGES[stageIndex]

  const [words, setWords] = useState<FallingWord[]>([])
  const [score, setScore] = useState(0)
  const [caughtCount, setCaughtCount] = useState(0)

  useEffect(() => {
    setWords([])
    setScore(0)
    setCaughtCount(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return

    const interval = setInterval(() => {
      const newWord: FallingWord = {
        id: Date.now() + Math.random(),
        word: stageWords[Math.floor(Math.random() * stageWords.length)],
        x: Math.random() * 70 + 5,
        y: -10,
        caught: false,
      }
      setWords((prev) => [...prev, newWord].slice(-15))
    }, 600)

    return () => clearInterval(interval)
  }, [stageComplete, stageWords])

  useEffect(() => {
    if (stageComplete) return

    const interval = setInterval(() => {
      setWords((prev) =>
        prev
          .map((w) => ({ ...w, y: w.y + 1.5 }))
          .filter((w) => w.y < 110 && !w.caught),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [stageComplete])

  const resetGame = () => {
    setWords([])
    setScore(0)
    setCaughtCount(0)
  }

  const handleWordCatch = (wordId: number) => {
    if (stageComplete) return

    setWords((prev) => prev.map((w) => (w.id === wordId ? { ...w, caught: true } : w)))

    const newCount = caughtCount + 1
    setScore((s) => s + 1)
    setCaughtCount(newCount)
    celebrate('light')

    if (newCount === TARGET_CATCHES) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-pink-300 to-rose-400 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🎪 Sight Word Race"
        stageIndex={stageIndex}
        totalStages={totalStages}
        score={score}
        extra={`Caught ${caughtCount}/${TARGET_CATCHES}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center p-4 overflow-hidden relative">
        <div className="relative flex-1 w-full max-w-2xl bg-pink-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
          {words.map((item) => (
            <button
              key={item.id}
              onClick={() => handleWordCatch(item.id)}
              disabled={item.caught}
              className={`absolute px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center text-lg md:text-xl cursor-pointer transition-all transform font-bold text-white ${
                item.caught
                  ? 'scale-0 opacity-0'
                  : 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg hover:scale-110'
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {!item.caught && item.word}
            </button>
          ))}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-8 bg-orange-400 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
            <span className="text-2xl">🧺</span>
          </div>
        </div>

        {!stageComplete && (
          <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce mb-4">
            👉 Catch falling sight words! 📖
          </p>
        )}
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={() => {
          if (nextStage()) resetGame()
        }}
        onReplay={() => {
          replayStage()
          resetGame()
        }}
        onBack={onBack}
      />
    </div>
  )
}
