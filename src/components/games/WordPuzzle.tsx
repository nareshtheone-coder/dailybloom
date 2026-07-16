import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PUZZLE_WORD_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface WordPuzzleProps {
  onBack: () => void
}

const TOTAL_STAGES = PUZZLE_WORD_STAGES.length

export default function WordPuzzle({ onBack }: WordPuzzleProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('word-puzzle', TOTAL_STAGES)

  const stageWords = PUZZLE_WORD_STAGES[stageIndex]
  const [wordIndex, setWordIndex] = useState(0)
  const [shuffled, setShuffled] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])

  const resetWord = (index: number) => {
    const word = stageWords[index]
    setShuffled([...word.letters].sort(() => Math.random() - 0.5))
    setSelected([])
  }

  useEffect(() => {
    setWordIndex(0)
  }, [stageIndex])

  useEffect(() => {
    resetWord(wordIndex)
  }, [stageIndex, wordIndex])

  const currentWord = stageWords[wordIndex]

  const handleLetterSelect = (letter: string) => {
    const newSelected = [...selected, letter]
    setSelected(newSelected)

    if (newSelected.join('') === currentWord.word) {
      celebrate('medium')

      if (wordIndex < stageWords.length - 1) {
        setTimeout(() => {
          setWordIndex(wordIndex + 1)
        }, 800)
      } else {
        celebrate('full')
        finishStage()
      }
    }
  }

  const handleUndo = () => {
    setSelected(selected.slice(0, -1))
  }

  const handleReplay = () => {
    replayStage()
    setWordIndex(0)
    setSelected([])
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 to-teal-400 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🧩 Word Puzzle"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        extra={`${wordIndex + 1}/${stageWords.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-7xl md:text-8xl mb-6">{currentWord.emoji}</div>

        <div className="mb-8">
          <div className="text-white text-lg drop-shadow mb-2 text-center">Your word:</div>
          <div className="flex gap-2 justify-center flex-wrap min-h-16">
            {currentWord.word.split('').map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 md:w-16 md:h-16 bg-white/30 border-2 border-white rounded-lg flex items-center justify-center text-3xl font-bold text-white"
              >
                {selected[i] || ''}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-3 flex-wrap justify-center max-w-2xl">
            {shuffled.map((letter, i) => (
              <button
                key={i}
                onClick={() => {
                  if (selected.length < currentWord.letters.length) {
                    handleLetterSelect(letter)
                  }
                }}
                disabled={selected.length >= currentWord.letters.length}
                className="w-14 h-14 md:w-16 md:h-16 rounded-lg font-bold text-2xl md:text-3xl transition-all bg-blue-400 text-white hover:scale-110 shadow-lg"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {selected.length > 0 && (
          <button
            onClick={handleUndo}
            className="mb-6 px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
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
