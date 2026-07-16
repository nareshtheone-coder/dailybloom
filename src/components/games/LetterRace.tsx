import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { LETTER_RACE_STAGES, LETTER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface LetterRaceProps {
  onBack: () => void
}

export default function LetterRace({ onBack }: LetterRaceProps) {
  const totalStages = LETTER_RACE_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('letter-race', totalStages)

  const targetLetters = LETTER_RACE_STAGES[stageIndex]
  const stageMeta = LETTER_STAGES[stageIndex]
  const totalLetters = targetLetters.length

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const progressPercent = ((currentIndex + 1) / totalLetters) * 100

  useEffect(() => {
    setCurrentIndex(0)
    setIsRunning(false)
  }, [stageIndex])

  const resetRace = () => {
    setCurrentIndex(0)
    setIsRunning(false)
  }

  const handleLetterTap = () => {
    if (stageComplete || isRunning) return

    setIsRunning(true)

    setTimeout(() => {
      if (currentIndex < totalLetters - 1) {
        setCurrentIndex(currentIndex + 1)
        celebrate('light')
        setIsRunning(false)
      } else {
        celebrate('full')
        finishStage()
        setIsRunning(false)
      }
    }, 600)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-300 via-yellow-300 to-orange-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🏃 Letter Race"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        extra={`${currentIndex + 1}/${totalLetters}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Race Track */}
        <div className="w-full max-w-4xl mb-8">
          <div className="mb-4 px-4">
            <div className="relative w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-lg">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="relative h-32 md:h-40 bg-white/20 rounded-2xl border-4 border-white shadow-lg overflow-hidden mb-6">
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-yellow-400 to-yellow-300 z-10">
              <div className="h-full flex flex-col gap-1 p-1">
                <div className="flex-1 bg-black"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-black"></div>
              </div>
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 z-20"
              style={{ left: `${(currentIndex / totalLetters) * 85}%` }}
            >
              <div className="text-5xl md:text-6xl animate-bounce">🏃</div>
            </div>

            <div className="absolute inset-0 flex items-center px-4 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1 h-1 bg-white/30 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Letter Display */}
        {!stageComplete && (
          <>
            <div className="mb-8 text-center">
              <p className="text-white text-lg mb-4 drop-shadow font-semibold">Next letter to tap:</p>
              <div className="text-8xl md:text-9xl font-bold text-white drop-shadow-xl">
                {targetLetters[currentIndex]}
              </div>
            </div>

            <div className="mb-8">
              <div className="grid grid-cols-6 md:grid-cols-7 gap-2 md:gap-3">
                {targetLetters.map((letter, i) => (
                  <button
                    key={i}
                    onClick={() => i === currentIndex && handleLetterTap()}
                    disabled={i !== currentIndex || stageComplete}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-bold text-xl md:text-2xl transition-all transform ${
                      i < currentIndex
                        ? 'bg-green-400 text-white shadow-lg scale-95'
                        : i === currentIndex
                          ? 'bg-yellow-300 text-black hover:scale-110 shadow-xl animate-pulse'
                          : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={() => {
          if (nextStage()) resetRace()
        }}
        onReplay={() => {
          replayStage()
          resetRace()
        }}
        onBack={onBack}
      />
    </div>
  )
}
