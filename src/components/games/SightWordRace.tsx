import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { RACING_SIGHT_WORDS } from '../../data/gamesLibrary'

interface SightWordRaceProps {
  onBack: () => void
}

interface FallingWord {
  id: number
  word: string
  x: number
  y: number
  caught: boolean
}

export default function SightWordRace({ onBack }: SightWordRaceProps) {
  const [words, setWords] = useState<FallingWord[]>([])
  const [score, setScore] = useState(0)
  const [caughtCount, setCaughtCount] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const TARGET_CATCHES = 10

  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      const newWord: FallingWord = {
        id: Date.now() + Math.random(),
        word: RACING_SIGHT_WORDS[Math.floor(Math.random() * RACING_SIGHT_WORDS.length)],
        x: Math.random() * 70 + 5,
        y: -10,
        caught: false,
      }
      setWords((prev) => [...prev, newWord].slice(-15))
    }, 600)

    return () => clearInterval(interval)
  }, [gameComplete])

  useEffect(() => {
    if (gameComplete) return

    const interval = setInterval(() => {
      setWords((prev) =>
        prev
          .map((w) => ({ ...w, y: w.y + 1.5 }))
          .filter((w) => w.y < 110 && !w.caught),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [gameComplete])

  const handleWordCatch = (wordId: number) => {
    setWords((prev) => prev.map((w) => (w.id === wordId ? { ...w, caught: true } : w)))

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
    <div className="w-full h-screen bg-gradient-to-b from-pink-300 to-rose-400 flex flex-col items-center justify-start p-4 overflow-hidden relative">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <button
          onClick={onBack}
          className="text-3xl md:text-4xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            🎪 Sight Word Race
          </h1>
          <p className="text-white text-sm md:text-base drop-shadow">
            Catch {caughtCount}/{TARGET_CATCHES} words!
          </p>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex gap-4 md:gap-8 mb-4 justify-center">
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Score</p>
          <p className="text-2xl md:text-3xl font-bold text-rose-600">{score}</p>
        </div>
        <div className="bg-white/80 px-6 py-3 rounded-full text-center shadow-lg">
          <p className="text-gray-600 text-xs md:text-sm font-semibold">Caught</p>
          <p className="text-2xl md:text-3xl font-bold text-rose-600">{caughtCount}</p>
        </div>
      </div>

      <div className="relative flex-1 w-full max-w-2xl bg-pink-200/30 rounded-3xl border-4 border-white/50 mb-4 overflow-hidden">
        {words.map((item) => (
          <button
            key={item.id}
            onClick={() => handleWordCatch(item.id)}
            disabled={item.caught}
            className={`absolute px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center text-lg md:text-xl cursor-pointer transition-all transform font-bold text-white ${
              item.caught
                ? 'scale-0 opacity-0'
                : 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg hover:scale-110'
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {!item.caught && item.word}
          </button>
        ))}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-8 bg-orange-400 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
          <span className="text-2xl">🧺</span>
        </div>
      </div>

      {gameComplete && (
        <div className="text-center mb-4 animate-bounce">
          <div className="text-5xl md:text-6xl mb-2">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Word Catcher!
          </h2>
          <p className="text-white drop-shadow text-lg font-semibold mt-2">Score: {score}</p>
        </div>
      )}

      {!gameComplete && (
        <p className="text-white text-lg md:text-xl font-bold drop-shadow animate-bounce mb-4">
          👉 Catch falling sight words! 📖
        </p>
      )}
    </div>
  )
}
