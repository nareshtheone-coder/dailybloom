import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { FALLING_LETTERS } from '../../data/gamesLibrary'

interface CatchTheLettersProps {
  onBack: () => void
}

interface FallingLetter {
  id: number
  letter: string
  x: number
  y: number
  caught: boolean
}

export default function CatchTheLetters({ onBack }: CatchTheLettersProps) {
  const [letters, setLetters] = useState<FallingLetter[]>([])
  const [score, setScore] = useState(0)
  const [caughtCount, setCaughtCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const TARGET_CATCHES = 15

  // Generate falling letters
  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      const newLetter: FallingLetter = {
        id: Date.now(),
        letter: FALLING_LETTERS[Math.floor(Math.random() * FALLING_LETTERS.length)],
        x: Math.random() * 80 + 10,
        y: -10,
        caught: false,
      }
      setLetters((prev) => [...prev, newLetter].slice(-20))
    }, 400)

    return () => clearInterval(interval)
  }, [gameComplete])

  // Move letters and remove out of bounds
  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      setLetters((prev) =>
        prev
          .map((l) => ({ ...l, y: l.y + 2 }))
          .filter((l) => l.y < 110 && !l.caught),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [gameComplete])

  const handleLetterCatch = (letterId: number) => {
    setLetters((prev) => prev.map((l) => (l.id === letterId ? { ...l, caught: true } : l)))

    const newCount = caughtCount + 1
    setScore(score + 1)
    setCaughtCount(newCount)
    celebrate('light')

    if (newCount === TARGET_CATCHES) {
      celebrate('full')
      setGameComplete(true)
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-cyan-400 flex flex-col items-center justify-start p-4 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          ⚡ Catch the Letters!
        </h1>
        <p className="text-white text-sm md:text-base drop-shadow">
          Catch {caughtCount}/{TARGET_CATCHES} letters!
        </p>
      </div>

      {/* Score Display */}
      <div className="flex gap-4 md:gap-8 mb-4 justify-center">
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Score</p>
          <p className="text-2xl md:text-3xl font-bold text-cyan-600">{score}</p>
        </div>
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Caught</p>
          <p className="text-2xl md:text-3xl font-bold text-cyan-600">{caughtCount}</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative flex-1 w-full max-w-2xl bg-sky-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
        {/* Falling Letters */}
        {letters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleLetterCatch(letter.id)}
            disabled={letter.caught}
            className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl cursor-pointer transition-all transform font-bold text-white ${
              letter.caught
                ? 'scale-0 opacity-0'
                : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg hover:scale-110 animate-bounce'
            }`}
            style={{
              left: `${letter.x}%`,
              top: `${letter.y}%`,
              borderRadius: '50%',
            }}
          >
            {!letter.caught && letter.letter}
          </button>
        ))}

        {/* Catcher Zone */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-8 bg-orange-400 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
          <span className="text-2xl">🧺</span>
        </div>
      </div>

      {/* Game Complete Message */}
      {gameComplete && (
        <div className="text-center mb-4 animate-bounce">
          <div className="text-5xl md:text-6xl mb-2">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Letter Catcher!
          </h2>
          <p className="text-white drop-shadow text-lg font-semibold mt-2">Score: {score}</p>
        </div>
      )}

      {/* Instructions */}
      {!gameComplete && (
        <div className="text-center mb-4">
          <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce">
            👉 Catch falling letters! 📨
          </p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-cyan-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
