import { useState, useEffect } from 'react'
import { RHYMING_PAIRS } from '../../data/gamesLibrary'
import { celebrate } from '../../utils/celebrations'

interface RhymingWordsProps {
  onBack: () => void
}

export default function RhymingWords({ onBack }: RhymingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [answered, setAnswered] = useState(false)
  const [completed, setCompleted] = useState(false)

  const current = RHYMING_PAIRS[currentIndex]

  useEffect(() => {
    const wrongOptions = RHYMING_PAIRS
      .filter((_, i) => i !== currentIndex)
      .map((p) => p.rhyme)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)

    const opts = [current.rhyme, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(opts)
    setAnswered(false)
  }, [currentIndex, current.rhyme])

  const handleSelect = (word: string) => {
    if (answered) return
    setAnswered(true)

    if (word === current.rhyme) {
      celebrate('medium')
      setScore((s) => s + 1)

      setTimeout(() => {
        if (currentIndex < RHYMING_PAIRS.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          celebrate('full')
          setCompleted(true)
        }
      }, 1200)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-fuchsia-300 via-pink-300 to-purple-300 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">🎵 Rhyme Time</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

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

        {completed && (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-white text-2xl font-bold drop-shadow">Rhyme Master!</p>
          </div>
        )}

        <div className="text-white text-lg md:text-xl font-bold">
          {currentIndex + 1} / {RHYMING_PAIRS.length}
        </div>
      </div>
    </div>
  )
}
