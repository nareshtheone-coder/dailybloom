import { useState, useEffect } from 'react'
import { WORD_STAGES_3, WORD_STAGES_4 } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface SpellingGameProps {
  onBack: () => void
}

const SPELLING_STAGES = [...WORD_STAGES_3, ...WORD_STAGES_4]
const TOTAL_STAGES = SPELLING_STAGES.length

type StageWord = (typeof SPELLING_STAGES)[number][number]

function getWordLetters(word: StageWord): string[] {
  if ('letters' in word && Array.isArray(word.letters)) {
    return [...word.letters]
  }
  return word.word.split('')
}

export default function SpellingGame({ onBack }: SpellingGameProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('spelling-words', TOTAL_STAGES)

  const stageWords = SPELLING_STAGES[stageIndex]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([])

  const resetWord = () => {
    const letters = getWordLetters(stageWords[currentIndex])
    setShuffledLetters([...letters].sort(() => Math.random() - 0.5))
    setSelectedLetters([])
  }

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedLetters([])
  }, [stageIndex])

  useEffect(() => {
    resetWord()
  }, [stageIndex, currentIndex])

  const current = stageWords[currentIndex]
  const wordLetters = getWordLetters(current)

  const handleSelectLetter = (letter: string) => {
    const newSelected = [...selectedLetters, letter]
    setSelectedLetters(newSelected)

    if (newSelected.length === current.word.length) {
      if (newSelected.join('') === current.word) {
        celebrate('medium')
        setScore((s) => s + 1)
        setTimeout(() => {
          if (currentIndex < stageWords.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else {
            celebrate('full')
            finishStage()
          }
        }, 1500)
      }
    }
  }

  const handleUndo = () => {
    setSelectedLetters(selectedLetters.slice(0, -1))
  }

  const handleReplay = () => {
    replayStage()
    setCurrentIndex(0)
    setScore(0)
    setSelectedLetters([])
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-lime-300 via-green-300 to-emerald-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="✍️ Spell It"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        score={score}
        extra={`${currentIndex + 1}/${stageWords.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        <div className="text-8xl md:text-9xl">{current.emoji}</div>

        <div className="flex gap-2 md:gap-4 mb-4">
          {current.word.split('').map((_, idx) => (
            <div
              key={idx}
              className="w-16 h-16 md:w-20 md:h-20 bg-white/80 rounded-lg md:rounded-xl flex items-center justify-center text-2xl md:text-4xl font-bold text-center border-2 border-white"
            >
              {selectedLetters[idx] || '?'}
            </div>
          ))}
        </div>

        <div className="bg-white/90 px-8 md:px-12 py-3 md:py-4 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-bold text-gray-800 h-16 md:h-20 flex items-center justify-center">
          {selectedLetters.join('') || 'Spell the word!'}
        </div>

        <div className={`grid gap-3 md:gap-4 max-w-xl ${wordLetters.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {shuffledLetters.map((letter, idx) => {
            const isUsed = idx < selectedLetters.length
            return (
              <button
                key={idx}
                onClick={() => !isUsed && handleSelectLetter(letter)}
                disabled={isUsed}
                className={`px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-2xl md:text-3xl transition-all active:scale-95 ${
                  isUsed ? 'bg-gray-300 opacity-50' : 'bg-white/80 hover:bg-white'
                }`}
              >
                {letter}
              </button>
            )
          })}
        </div>

        {selectedLetters.length > 0 && (
          <button
            onClick={handleUndo}
            className="mt-4 md:mt-6 px-8 md:px-12 py-3 md:py-4 bg-yellow-400 hover:bg-yellow-500 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            ↶ Undo
          </button>
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
