import { useState, useEffect } from 'react'
import { NUMBER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface NumberRecognitionProps {
  onBack: () => void
  maxNumber?: number
}

const TOTAL_STAGES = NUMBER_STAGES.length

export default function NumberRecognition({ onBack }: NumberRecognitionProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('number-recognition', TOTAL_STAGES)

  const stage = NUMBER_STAGES[stageIndex]
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(false)
  const [itemCount, setItemCount] = useState(1)
  const [options, setOptions] = useState<number[]>([])

  const generateRound = () => {
    const count = Math.floor(Math.random() * (stage.max - stage.min + 1)) + stage.min
    setItemCount(count)
    setOptions(generateOptions(count, stage.max))
    setSelected(false)
  }

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  useEffect(() => {
    setRound(1)
    setScore(0)
    generateRound()
  }, [stageIndex])

  function generateOptions(correctNumber: number, maxNum: number): number[] {
    const opts = [correctNumber]
    while (opts.length < 3) {
      const random = Math.floor(Math.random() * maxNum) + 1
      if (!opts.includes(random)) {
        opts.push(random)
      }
    }
    return opts.sort(() => Math.random() - 0.5)
  }

  const handleSelect = (num: number) => {
    setSelected(true)
    if (num === itemCount) {
      celebrate('medium')
      setScore((s) => s + 1)
      setTimeout(() => {
        if (round >= stage.rounds) {
          celebrate('full')
          finishStage()
        } else {
          setRound(round + 1)
          generateRound()
        }
      }, 1500)
    } else {
      setTimeout(() => setSelected(false), 800)
    }
  }

  const handleReplay = () => {
    replayStage()
    setRound(1)
    setScore(0)
    generateRound()
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-300 via-yellow-300 to-amber-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="Number Parade"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        stageLabel={stage.label}
        score={score}
        extra={`Round ${round}/${stage.rounds}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center max-w-2xl">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className="text-5xl md:text-7xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              ⭐
            </div>
          ))}
        </div>

        <div className="bg-white/90 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-bold text-gray-800">
          How many?
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
          {options.map((num, idx) => (
            <button
              key={idx}
              onClick={() => !selected && handleSelect(num)}
              disabled={selected}
              className={`p-6 md:p-8 rounded-2xl md:rounded-3xl font-bold text-3xl md:text-5xl transition-all active:scale-95 ${
                selected
                  ? num === itemCount
                    ? 'bg-green-400'
                    : 'bg-red-400'
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              {num}
            </button>
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
