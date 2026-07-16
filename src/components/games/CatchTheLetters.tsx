import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import {
  LETTER_RACE_STAGES,
  LETTER_STAGES,
  CATCH_TARGETS_BY_STAGE,
} from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface CatchTheLettersProps {
  onBack: () => void
}

interface FallingLetter {
  id: number
  letter: string
  x: number
  y: number
  caught: boolean
}

export default function CatchTheLetters({ onBack }: CatchTheLettersProps) {
  const totalStages = LETTER_RACE_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('catch-the-letters', totalStages)

  const letterPool = LETTER_RACE_STAGES[stageIndex]
  const stageMeta = LETTER_STAGES[stageIndex]
  const targetCatches = CATCH_TARGETS_BY_STAGE[stageIndex]

  const [letters, setLetters] = useState<FallingLetter[]>([])
  const [score, setScore] = useState(0)
  const [caughtCount, setCaughtCount] = useState(0)

  useEffect(() => {
    setLetters([])
    setScore(0)
    setCaughtCount(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return

    const interval = setInterval(() => {
      const newLetter: FallingLetter = {
        id: Date.now(),
        letter: letterPool[Math.floor(Math.random() * letterPool.length)],
        x: Math.random() * 80 + 10,
        y: -10,
        caught: false,
      }
      setLetters((prev) => [...prev, newLetter].slice(-20))
    }, 400)

    return () => clearInterval(interval)
  }, [stageComplete, letterPool])

  useEffect(() => {
    if (stageComplete) return

    const interval = setInterval(() => {
      setLetters((prev) =>
        prev
          .map((l) => ({ ...l, y: l.y + 2 }))
          .filter((l) => l.y < 110 && !l.caught),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [stageComplete])

  const resetGame = () => {
    setLetters([])
    setScore(0)
    setCaughtCount(0)
  }

  const handleLetterCatch = (letterId: number) => {
    if (stageComplete) return

    setLetters((prev) => prev.map((l) => (l.id === letterId ? { ...l, caught: true } : l)))

    const newCount = caughtCount + 1
    setScore((s) => s + 1)
    setCaughtCount(newCount)
    celebrate('light')

    if (newCount === targetCatches) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-300 to-cyan-400 flex flex-col overflow-hidden">
      <GameStageHeader
        title="⚡ Catch the Letters!"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        score={score}
        extra={`Caught ${caughtCount}/${targetCatches}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center p-4 overflow-hidden relative">
        <div className="relative flex-1 w-full max-w-2xl bg-sky-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleLetterCatch(letter.id)}
              disabled={letter.caught}
              className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl cursor-pointer transition-all transform font-bold text-white ${
                letter.caught
                  ? 'scale-0 opacity-0'
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg hover:scale-110 animate-bounce'
              }`}
              style={{
                left: `${letter.x}%`,
                top: `${letter.y}%`,
                borderRadius: '50%',
              }}
            >
              {!letter.caught && letter.letter}
            </button>
          ))}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-8 bg-orange-400 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
            <span className="text-2xl">🧺</span>
          </div>
        </div>

        {!stageComplete && (
          <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce mb-4">
            👉 Catch falling letters! 📨
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
