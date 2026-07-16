import { useState, useEffect, useMemo } from 'react'
import { celebrate } from '../../utils/celebrations'
import { NUMBER_STAGES, NUMBER_WORDS } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface CountToTenProps {
  onBack: () => void
}

const TOTAL_STAGES = NUMBER_STAGES.length

export default function CountToTen({ onBack }: CountToTenProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('number-counting-10', TOTAL_STAGES)

  const stage = NUMBER_STAGES[stageIndex]
  const numbersInStage = useMemo(
    () => Array.from({ length: stage.max - stage.min + 1 }, (_, i) => stage.min + i),
    [stage.min, stage.max],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)

  const currentNumber = numbersInStage[currentIndex]
  const options = useMemo(
    () => generateOptions(currentNumber, stage.max),
    [currentNumber, stage.max],
  )

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setSelected(false)
  }, [stageIndex])

  function generateOptions(correctNumber: number, max: number): number[] {
    const opts = new Set<number>([correctNumber])
    while (opts.size < 4) {
      const random = Math.floor(Math.random() * max) + 1
      opts.add(random)
    }
    return Array.from(opts).sort(() => Math.random() - 0.5)
  }

  const handleSelect = (num: number) => {
    if (selected) return
    setSelected(true)

    if (num === currentNumber) {
      celebrate('medium')
      setScore((s) => s + 1)

      if (currentIndex < numbersInStage.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1)
          setSelected(false)
        }, 1200)
      } else {
        celebrate('full')
        finishStage()
      }
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  const handleReplay = () => {
    replayStage()
    setCurrentIndex(0)
    setScore(0)
    setSelected(false)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-300 via-cyan-300 to-blue-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🔟 Count to 10"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        stageLabel={stage.label}
        score={score}
        extra={`${currentIndex + 1}/${numbersInStage.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-6">
          <p className="text-white text-lg drop-shadow mb-4 text-center">How many do you see?</p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-2xl bg-white/20 rounded-3xl px-6 py-6 shadow-xl">
            {Array.from({ length: currentNumber }).map((_, i) => (
              <div
                key={i}
                className="text-5xl md:text-6xl animate-bounce"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                ⭐
              </div>
            ))}
          </div>
          <p className="text-white/80 text-sm text-center mt-2 drop-shadow">
            {NUMBER_WORDS[currentNumber]}
          </p>
        </div>

        {!stageComplete && (
          <div className="mb-8">
            <p className="text-white text-lg drop-shadow mb-4 text-center animate-bounce">
              👉 Tap the right number!
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md">
              {options.map((num, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(num)}
                  disabled={selected}
                  className={`min-w-[80px] min-h-[80px] w-28 h-28 md:w-32 md:h-32 rounded-3xl font-bold text-4xl md:text-5xl transition-all shadow-xl ${
                    selected
                      ? num === currentNumber
                        ? 'bg-green-400 text-white scale-110'
                        : 'bg-red-300/80 text-white'
                      : 'bg-white/90 text-teal-700 hover:scale-105 hover:bg-white active:scale-95'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-1 mb-8 flex-wrap justify-center max-w-lg">
          {numbersInStage.map((n, i) => (
            <div
              key={n}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all ${
                i < currentIndex
                  ? 'bg-white text-teal-600 shadow-lg scale-110'
                  : i === currentIndex
                    ? 'bg-white/70 text-teal-700 ring-2 ring-white'
                    : 'bg-white/30 text-white/70'
              }`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        allDone={allComplete}
        onNext={() => nextStage()}
        onReplay={handleReplay}
        onBack={onBack}
      />
    </div>
  )
}
