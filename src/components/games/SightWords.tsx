import { useState, useEffect } from 'react'
import { SIGHT_WORDS } from '../../data/gamesLibrary'
import { celebrate } from '../../utils/celebrations'

interface SightWordsProps {
  onBack: () => void
}

export default function SightWords({ onBack }: SightWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [showWord, setShowWord] = useState(true)
  const [answered, setAnswered] = useState(false)
  const [completed, setCompleted] = useState(false)

  const currentWord = SIGHT_WORDS[currentIndex]

  useEffect(() => {
    const wrongOptions = SIGHT_WORDS.filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    setOptions([currentWord, ...wrongOptions].sort(() => Math.random() - 0.5))
    setShowWord(true)
    setAnswered(false)

    const timer = setTimeout(() => setShowWord(false), 2000)
    return () => clearTimeout(timer)
  }, [currentIndex, currentWord])

  const handleSelect = (word: string) => {
    if (answered) return
    setAnswered(true)

    if (word === currentWord) {
      celebrate('medium')
      setScore((s) => s + 1)

      setTimeout(() => {
        if (currentIndex < SIGHT_WORDS.length - 1) {
          setCurrentIndex(currentIndex + 1)
        } else {
          celebrate('full')
          setCompleted(true)
        }
      }, 1200)
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-300 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">👀 Sight Words</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

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

        {completed && (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-white text-2xl font-bold drop-shadow">Sight Word Pro!</p>
          </div>
        )}

        <div className="text-white text-lg md:text-xl font-bold">
          {currentIndex + 1} / {SIGHT_WORDS.length}
        </div>
      </div>
    </div>
  )
}
