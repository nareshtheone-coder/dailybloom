import { useState, useEffect } from 'react'
import { SIMPLE_WORDS } from '../../data/gamesLibrary'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface SpellingGameProps {
  onBack: () => void
}

export default function SpellingGame({ onBack }: SpellingGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    addCelebrationStyles()
    shuffleLetters()
  }, [currentIndex])

  const shuffleLetters = () => {
    const word = SIMPLE_WORDS[currentIndex].word
    const letters = word.split('').sort(() => Math.random() - 0.5)
    setShuffledLetters(letters)
    setSelectedLetters([])
  }

  const current = SIMPLE_WORDS[currentIndex]

  const handleSelectLetter = (letter: string) => {
    const newSelected = [...selectedLetters, letter]
    setSelectedLetters(newSelected)

    if (newSelected.length === current.word.length) {
      if (newSelected.join('') === current.word) {
        celebrate('medium')
        setScore((s) => s + 1)
        setTimeout(() => {
          if (currentIndex < SIMPLE_WORDS.length - 1) {
            setCurrentIndex(currentIndex + 1)
          } else {
            celebrate('full')
            setCompleted(true)
          }
        }, 1500)
      }
    }
  }

  const handleUndo = () => {
    setSelectedLetters(selectedLetters.slice(0, -1))
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-lime-300 via-green-300 to-emerald-300 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">✍️ Spell It</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

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

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xl">
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

        {completed && (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-white text-2xl font-bold drop-shadow">Spelling Star!</p>
          </div>
        )}

        <div className="text-white text-lg md:text-xl font-bold">
          {currentIndex + 1} / {SIMPLE_WORDS.length}
        </div>
      </div>
    </div>
  )
}
