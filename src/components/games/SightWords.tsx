import { useState, useEffect } from 'react'
import { SIGHT_WORD_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'
import { celebrate } from '../../utils/celebrations'

interface SightWordsProps {
  onBack: () => void
}

const TOTAL_STAGES = SIGHT_WORD_STAGES.length

export default function SightWords({ onBack }: SightWordsProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('sight-words', TOTAL_STAGES)

  const stageWords = SIGHT_WORD_STAGES[stageIndex]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [showWord, setShowWord] = useState(true)
  const [answered, setAnswered] = useState(false)

  const currentWord = stageWords[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setShowWord(true)
    setAnswered(false)
  }, [stageIndex])

  useEffect(() => {
    const wrongOptions = stageWords
      .filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    setOptions([currentWord, ...wrongOptions].sort(() => Math.random() - 0.5))
    setShowWord(true)
    setAnswered(false)

    const timer = setTimeout(() => setShowWord(false), 2000)
    return () => clearTimeout(timer)
  }, [stageIndex, currentIndex, currentWord, stageWords])

  const handleSelect = (word: string) => {
    if (answered) return
    setAnswered(true)

    if (word === currentWord) {
      celebrate('medium')
      setScore((s) => s + 1)

      setTimeout(() => {
        if (currentIndex < stageWords.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          celebrate('full')
          finishStage()
        }
      }, 1200)
    }
  }

  const handleReplay = () => {
    replayStage()
    setCurrentIndex(0)
    setScore(0)
    setShowWord(true)
    setAnswered(false)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="👀 Sight Words"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        score={score}
        extra={`${currentIndex + 1}/${stageWords.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        <div className="bg-white/90 px-12 md:px-16 py-8 md:py-12 rounded-3xl text-center min-h-40 flex items-center justify-center">
          {showWord ? (
            <p className="text-5xl md:text-7xl font-bold text-violet-600 animate-pulse">
              {currentWord}
            </p>
          ) : (
            <p className="text-2xl md:text-3xl text-gray-500">Which word was it?</p>
          )}
        </div>

        {!showWord && (
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {options.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(word)}
                disabled={answered}
                className={`p-6 md:p-8 rounded-2xl font-bold text-2xl md:text-3xl transition-all active:scale-95 ${
                  answered
                    ? word === currentWord
                      ? 'bg-green-400 text-white'
                      : 'bg-red-300 text-white opacity-70'
                    : 'bg-white/80 hover:bg-white text-gray-800'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        )}

        {showWord && (
          <p className="text-white text-lg font-bold drop-shadow animate-bounce">
            Remember this word!
          </p>
        )}
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
