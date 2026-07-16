import { useState, useEffect } from 'react'
import { NUMBER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface CountingGameProps {
  onBack: () => void
  maxCount?: number
}

const TOTAL_STAGES = NUMBER_STAGES.length

export default function CountingGame({ onBack }: CountingGameProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('counting-game', TOTAL_STAGES)

  const stage = NUMBER_STAGES[stageIndex]
  const [itemCount, setItemCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState('')

  const generateNewRound = () => {
    const newCount = Math.floor(Math.random() * (stage.max - stage.min + 1)) + stage.min
    setItemCount(newCount)
    setUserCount(0)
    setMessage('')
  }

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  useEffect(() => {
    setRound(1)
    setScore(0)
    generateNewRound()
  }, [stageIndex])

  const handleItemClick = () => {
    setUserCount(userCount + 1)
  }

  const handleCheck = () => {
    if (userCount === itemCount) {
      celebrate('medium')
      setMessage('✅ Correct!')
      setScore((s) => s + 1)
      setTimeout(() => {
        if (round >= stage.rounds) {
          celebrate('full')
          finishStage()
        } else {
          setRound(round + 1)
          generateNewRound()
        }
      }, 1500)
    } else if (userCount < itemCount) {
      setMessage('❌ Count more!')
    } else {
      setMessage('❌ Too many!')
    }
  }

  const handleClear = () => {
    setUserCount(0)
    setMessage('')
  }

  const handleReplay = () => {
    replayStage()
    setRound(1)
    setScore(0)
    generateNewRound()
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-teal-300 to-blue-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="Counting Stars"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        stageLabel={stage.label}
        score={score}
        extra={`Round ${round}/${stage.rounds}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center max-w-2xl mb-4 md:mb-8">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              onClick={handleItemClick}
              className="text-6xl md:text-8xl hover:scale-110 transition-all active:scale-95"
            >
              ⭐
            </button>
          ))}
        </div>

        <div className="bg-white/90 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-bold text-gray-800">
          You counted: {userCount}
        </div>

        {message && (
          <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {message}
          </div>
        )}

        <div className="flex gap-4 md:gap-6 mt-4 md:mt-8">
          <button
            onClick={handleClear}
            className="px-6 md:px-8 py-3 md:py-4 bg-yellow-400 hover:bg-yellow-500 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            🔄 Clear
          </button>
          <button
            onClick={handleCheck}
            className="px-8 md:px-12 py-3 md:py-4 bg-green-400 hover:bg-green-500 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            ✓ Check
          </button>
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
