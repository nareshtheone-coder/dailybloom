import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { RACING_NUMBERS_5_6 } from '../../data/gamesLibrary'

interface NumberSequenceProps {
  onBack: () => void
}

export default function NumberSequence({ onBack }: NumberSequenceProps) {
  const [nextExpected, setNextExpected] = useState(1)
  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([])
  const [completed, setCompleted] = useState(false)
  const [wrongTap, setWrongTap] = useState<number | null>(null)

  const totalNumbers = RACING_NUMBERS_5_6.length

  useEffect(() => {
    setShuffledNumbers([...RACING_NUMBERS_5_6].sort(() => Math.random() - 0.5))
  }, [])

  const handleNumberTap = (num: number) => {
    if (completed || num < nextExpected) return

    if (num === nextExpected) {
      celebrate('light')

      if (nextExpected === totalNumbers) {
        celebrate('full')
        setCompleted(true)
      } else {
        setNextExpected(nextExpected + 1)
      }
    } else {
      setWrongTap(num)
      setTimeout(() => setWrongTap(null), 500)
    }
  }

  const progressPercent = ((nextExpected - 1) / totalNumbers) * 100

  return (
    <div className="w-full h-full bg-gradient-to-br from-rose-300 via-pink-300 to-red-300 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">1️⃣ Number Jump</div>
          <div className="text-sm md:text-lg text-white/90">
            Tap in order: {nextExpected > totalNumbers ? totalNumbers : nextExpected}
          </div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6">
        <div className="w-full max-w-2xl px-4">
          <div className="relative w-full h-4 bg-white/50 rounded-full overflow-hidden shadow-lg">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-white text-center font-bold mt-2 drop-shadow">
            {Math.min(nextExpected - 1, totalNumbers)} / {totalNumbers}
          </p>
        </div>

        <div className="bg-white/90 px-8 py-4 rounded-2xl text-center">
          <p className="text-gray-600 text-lg">Find number</p>
          <p className="text-6xl md:text-7xl font-bold text-rose-600">
            {completed ? '🎉' : nextExpected}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-3 md:gap-4 max-w-2xl w-full">
          {shuffledNumbers.map((num) => {
            const isDone = num < nextExpected
            const isNext = num === nextExpected && !completed
            const isWrong = wrongTap === num

            return (
              <button
                key={num}
                onClick={() => handleNumberTap(num)}
                disabled={isDone || completed}
                className={`w-full aspect-square rounded-xl md:rounded-2xl font-bold text-xl md:text-2xl transition-all active:scale-95 ${
                  isDone
                    ? 'bg-green-400 text-white opacity-60 scale-95'
                    : isWrong
                      ? 'bg-red-400 text-white'
                      : isNext
                        ? 'bg-yellow-300 text-black ring-4 ring-white animate-pulse shadow-xl'
                        : 'bg-white/80 hover:bg-white text-gray-800'
                }`}
              >
                {num}
              </button>
            )
          })}
        </div>

        {completed && (
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🏆</div>
            <p className="text-white text-2xl font-bold drop-shadow">Sequence Complete!</p>
          </div>
        )}
      </div>
    </div>
  )
}
