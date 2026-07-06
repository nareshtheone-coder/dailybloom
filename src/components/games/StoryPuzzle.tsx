import { useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { STORY_PUZZLES } from '../../data/gamesLibrary'

interface StoryPuzzleProps {
  onBack: () => void
}

export default function StoryPuzzle({ onBack }: StoryPuzzleProps) {
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const current = STORY_PUZZLES[puzzleIndex]

  const isWordUsed = (word: string, idx: number) => {
    const priorSame = current.shuffled.slice(0, idx).filter((w) => w === word).length
    const selectedSame = selected.filter((w) => w === word).length
    return priorSame < selectedSame
  }

  const handleWordSelect = (word: string) => {
    const newSelected = [...selected, word]
    setSelected(newSelected)

    if (newSelected.length === current.correct.length) {
      if (newSelected.every((w, i) => w === current.correct[i])) {
        celebrate('medium')
        setScore((s) => s + 1)

        setTimeout(() => {
          if (puzzleIndex < STORY_PUZZLES.length - 1) {
            setPuzzleIndex(puzzleIndex + 1)
            setSelected([])
          } else {
            celebrate('full')
            setCompleted(true)
          }
        }, 1000)
      }
    }
  }

  const handleUndo = () => {
    setSelected(selected.slice(0, -1))
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">📖 Story Puzzle</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6">
        <div className="bg-white/90 px-6 py-4 rounded-2xl text-center w-full max-w-2xl">
          <p className="text-gray-600 text-lg mb-2">Hint: {current.hint}</p>
          <div className="flex flex-wrap gap-2 justify-center min-h-12">
            {selected.length > 0 ? (
              selected.map((word, i) => (
                <span key={i} className="text-2xl md:text-3xl font-bold text-indigo-700">
                  {word}
                </span>
              ))
            ) : (
              <span className="text-xl text-gray-400">Arrange the words...</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
          {current.shuffled.map((word, idx) => {
            const isUsed = isWordUsed(word, idx)
            return (
              <button
                key={idx}
                onClick={() => !isUsed && handleWordSelect(word)}
                disabled={isUsed || selected.length >= current.correct.length}
                className={`px-6 py-4 rounded-xl font-bold text-xl md:text-2xl transition-all active:scale-95 ${
                  isUsed
                    ? 'bg-gray-300 opacity-50'
                    : 'bg-white/80 hover:bg-white text-gray-800 shadow-lg'
                }`}
              >
                {word}
              </button>
            )
          })}
        </div>

        {selected.length > 0 && (
          <button
            onClick={handleUndo}
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full font-bold text-lg transition-all active:scale-95"
          >
            ↶ Undo
          </button>
        )}

        {completed && (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-white text-2xl font-bold drop-shadow">Story Complete!</p>
          </div>
        )}

        <div className="text-white text-lg md:text-xl font-bold">
          {puzzleIndex + 1} / {STORY_PUZZLES.length}
        </div>
      </div>
    </div>
  )
}
