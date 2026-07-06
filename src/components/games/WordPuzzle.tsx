import { useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PUZZLE_WORDS } from '../../data/gamesLibrary'

interface WordPuzzleProps {
  onBack: () => void
}

interface WordState {
  correct: string[]
  shuffled: string[]
  selected: string[]
  wordIndex: number
}

export default function WordPuzzle({ onBack }: WordPuzzleProps) {
  const [wordState, setWordState] = useState<WordState>({
    correct: PUZZLE_WORDS[0].letters,
    shuffled: PUZZLE_WORDS[0].letters.sort(() => Math.random() - 0.5),
    selected: [],
    wordIndex: 0,
  })
  const [completed, setCompleted] = useState(false)

  const currentWord = PUZZLE_WORDS[wordState.wordIndex]

  const handleLetterSelect = (letter: string) => {
    const newSelected = [...wordState.selected, letter]
    setWordState((prev) => ({ ...prev, selected: newSelected }))

    // Check if word is complete
    if (newSelected.join('') === currentWord.word) {
      celebrate('medium')

      if (wordState.wordIndex < PUZZLE_WORDS.length - 1) {
        setTimeout(() => {
          const nextIndex = wordState.wordIndex + 1
          const nextWord = PUZZLE_WORDS[nextIndex]
          setWordState({
            correct: nextWord.letters,
            shuffled: nextWord.letters.sort(() => Math.random() - 0.5),
            selected: [],
            wordIndex: nextIndex,
          })
        }, 800)
      } else {
        celebrate('full')
        setCompleted(true)
      }
    }
  }

  const handleUndo = () => {
    setWordState((prev) => ({ ...prev, selected: prev.selected.slice(0, -1) }))
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-300 to-teal-400 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🧩 Word Puzzle
        </h1>
        <p className="text-white text-lg drop-shadow">
          Spell: {completed ? 'Complete!' : `${wordState.wordIndex + 1}/${PUZZLE_WORDS.length}`}
        </p>
      </div>

      {/* Word Image */}
      <div className="text-7xl md:text-8xl mb-6">{currentWord.emoji}</div>

      {/* Current Word Display */}
      <div className="mb-8">
        <div className="text-white text-lg drop-shadow mb-2 text-center">Your word:</div>
        <div className="flex gap-2 justify-center flex-wrap min-h-16">
          {currentWord.word.split('').map((_, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-16 md:h-16 bg-white/30 border-2 border-white rounded-lg flex items-center justify-center text-3xl font-bold text-white"
            >
              {wordState.selected[i] || ''}
            </div>
          ))}
        </div>
      </div>

      {/* Letter Tiles */}
      <div className="mb-8">
        <div className="flex gap-3 flex-wrap justify-center max-w-2xl">
          {wordState.shuffled.map((letter, i) => {
            const isUsed = wordState.selected.includes(letter) && i < wordState.selected.length
            return (
              <button
                key={i}
                onClick={() => {
                  if (wordState.selected.length < currentWord.letters.length) {
                    handleLetterSelect(letter)
                  }
                }}
                disabled={wordState.selected.length >= currentWord.letters.length}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-lg font-bold text-2xl md:text-3xl transition-all ${
                  isUsed
                    ? 'bg-gray-400/50 text-gray-500 scale-90'
                    : 'bg-blue-400 text-white hover:scale-110 shadow-lg'
                }`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Undo Button */}
      {wordState.selected.length > 0 && (
        <button
          onClick={handleUndo}
          className="mb-6 px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          ↶ Undo
        </button>
      )}

      {/* Completion message */}
      {completed && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-white text-2xl font-bold drop-shadow">All Words Done!</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-green-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
