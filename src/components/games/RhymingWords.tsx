import { useState, useEffect } from 'react'
import { RHYME_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'
import { celebrate } from '../../utils/celebrations'

interface RhymingWordsProps {
  onBack: () => void
}

const TOTAL_STAGES = RHYME_STAGES.length

export default function RhymingWords({ onBack }: RhymingWordsProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('rhyming-words', TOTAL_STAGES)

  const stagePairs = RHYME_STAGES[stageIndex]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [answered, setAnswered] = useState(false)

  const current = stagePairs[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setAnswered(false)
  }, [stageIndex])

  useEffect(() => {
    const wrongOptions = stagePairs
      .filter((_, i) => i !== currentIndex)
      .map((p) => p.rhyme)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)

    const opts = [current.rhyme, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(opts)
    setAnswered(false)
  }, [stageIndex, currentIndex, current.rhyme, stagePairs])

  const handleSelect = (word: string) => {
    if (answered) return
    setAnswered(true)

    if (word === current.rhyme) {
      celebrate('medium')
      setScore((s) => s + 1)

      setTimeout(() => {
        if (currentIndex < stagePairs.length - 1) {
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
    setAnswered(false)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-fuchsia-300 via-pink-300 to-purple-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🎵 Rhyme Time"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        score={score}
        extra={`${currentIndex + 1}/${stagePairs.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        <div className="text-8xl md:text-9xl">{current.emoji}</div>

        <div className="bg-white/90 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-center">
          <p className="text-lg md:text-xl text-gray-600 mb-2">What rhymes with</p>
          <p className="text-4xl md:text-5xl font-bold text-fuchsia-600">{current.word}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          {options.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(word)}
              disabled={answered}
              className={`p-6 md:p-8 rounded-2xl md:rounded-3xl font-bold text-2xl md:text-3xl transition-all active:scale-95 ${
                answered
                  ? word === current.rhyme
                    ? 'bg-green-400 text-white'
                    : 'bg-red-300 text-white opacity-70'
                  : 'bg-white/80 hover:bg-white text-gray-800'
              }`}
            >
              {word}
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
