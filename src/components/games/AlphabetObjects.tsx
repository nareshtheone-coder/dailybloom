import { useState, useEffect } from 'react'
import { ALPHABET_DATA } from '../../data/gamesLibrary'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface AlphabetObjectsProps {
  onBack: () => void
}

export default function AlphabetObjects({ onBack }: AlphabetObjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(false)
  const [score, setScore] = useState(0)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])

  useEffect(() => {
    addCelebrationStyles()
    shuffleWords()
  }, [])

  useEffect(() => {
    shuffleWords()
  }, [currentIndex])

  const shuffleWords = () => {
    const all = ALPHABET_DATA[currentIndex].words
    const shuffled = [...all].sort(() => Math.random() - 0.5)
    setShuffledWords(shuffled)
    setSelected(false)
  }

  const current = ALPHABET_DATA[currentIndex]
  const correctWord = current.words[0]

  const handleSelectWord = (word: string) => {
    setSelected(true)
    if (word === correctWord) {
      celebrate('medium')
      setScore(s => s + 1)
      setTimeout(() => {
        if (currentIndex < ALPHABET_DATA.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          celebrate('full')
        }
      }, 1500)
    } else {
      setTimeout(() => {
        setSelected(false)
      }, 800)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-300 via-pink-300 to-purple-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">{current.letter} for</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        {/* Large Letter & Emoji */}
        <div className="text-center mb-4 md:mb-8">
          <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
            {current.letter}
          </div>
          <div className="text-7xl md:text-9xl">{current.emoji}</div>
        </div>

        {/* Question */}
        <div className="bg-white/90 px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl text-xl md:text-2xl font-bold text-gray-800">
          Tap "{correctWord}"
        </div>

        {/* Word Options */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
          {shuffledWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => !selected && handleSelectWord(word)}
              disabled={selected}
              className={`p-6 md:p-8 rounded-2xl md:rounded-3xl font-bold text-lg md:text-2xl transition-all active:scale-95 ${
                selected
                  ? word === correctWord
                    ? 'bg-green-400'
                    : 'bg-red-400'
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="text-white text-lg md:text-xl font-bold">
          {currentIndex + 1} / {ALPHABET_DATA.length}
        </div>
      </div>
    </div>
  )
}
