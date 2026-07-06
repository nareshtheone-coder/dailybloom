import { useState, useEffect } from 'react'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'

interface CountingGameProps {
  onBack: () => void
  maxCount?: number
}

export default function CountingGame({ onBack, maxCount = 10 }: CountingGameProps) {
  const [itemCount, setItemCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    addCelebrationStyles()
    generateNewRound()
  }, [])

  const generateNewRound = () => {
    const newCount = Math.floor(Math.random() * maxCount) + 1
    setItemCount(newCount)
    setUserCount(0)
    setMessage('')
  }

  const handleItemClick = () => {
    setUserCount(userCount + 1)
  }

  const handleCheck = () => {
    if (userCount === itemCount) {
      celebrate('medium')
      setMessage('✅ Correct!')
      setScore(s => s + 1)
      setTimeout(() => {
        setRound(round + 1)
        generateNewRound()
      }, 1500)
    } else if (userCount < itemCount) {
      setMessage('❌ Count more!')
    } else {
      setMessage('❌ Too many!')
    }
  }

  const handleClear = () => {
    setUserCount(0)
    setMessage('')
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-teal-300 to-blue-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold text-white">Counting Stars</div>
          <div className="text-sm md:text-lg text-white/90">Score: {score} | Round: {round}</div>
        </div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6 md:gap-8">
        {/* Stars to Count */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center max-w-2xl mb-4 md:mb-8">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              onClick={handleItemClick}
              className="text-6xl md:text-8xl hover:scale-110 transition-all active:scale-95"
            >
              ⭐
            </button>
          ))}
        </div>

        {/* User Count Display */}
        <div className="bg-white/90 px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl text-2xl md:text-3xl font-bold text-gray-800">
          You counted: {userCount}
        </div>

        {/* Message */}
        {message && (
          <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 md:gap-6 mt-4 md:mt-8">
          <button
            onClick={handleClear}
            className="px-6 md:px-8 py-3 md:py-4 bg-yellow-400 hover:bg-yellow-500 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            🔄 Clear
          </button>
          <button
            onClick={handleCheck}
            className="px-8 md:px-12 py-3 md:py-4 bg-green-400 hover:bg-green-500 rounded-full font-bold text-lg md:text-xl transition-all active:scale-95"
          >
            ✓ Check
          </button>
        </div>
      </div>
    </div>
  )
}
