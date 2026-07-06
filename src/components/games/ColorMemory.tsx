import { useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { MEMORY_COLORS } from '../../data/gamesLibrary'

interface ColorMemoryProps {
  onBack: () => void
}

interface Card {
  id: number
  colorId: number
  isFlipped: boolean
}

export default function ColorMemory({ onBack }: ColorMemoryProps) {
  const [cards, setCards] = useState<Card[]>(shuffleCards())
  const [matched, setMatched] = useState<number[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)

  function shuffleCards(): Card[] {
    const cardArray: Card[] = []
    MEMORY_COLORS.forEach((color) => {
      cardArray.push(
        { id: color.id * 2, colorId: color.id, isFlipped: false },
        { id: color.id * 2 + 1, colorId: color.id, isFlipped: false },
      )
    })
    return cardArray.sort(() => Math.random() - 0.5)
  }

  const handleCardClick = (cardId: number) => {
    if (selectedCards.includes(cardId) || matched.includes(cardId) || selectedCards.length >= 2) {
      return
    }

    const newSelectedCards = [...selectedCards, cardId]
    setSelectedCards(newSelectedCards)

    if (newSelectedCards.length === 2) {
      const card1 = cards.find((c) => c.id === newSelectedCards[0])!
      const card2 = cards.find((c) => c.id === newSelectedCards[1])!

      if (card1.colorId === card2.colorId) {
        // Match found!
        const newMatched = [...matched, newSelectedCards[0], newSelectedCards[1]]
        setMatched(newMatched)
        setScore(score + 1)
        celebrate('medium')
        setSelectedCards([])

        if (newMatched.length === cards.length) {
          celebrate('full')
          setTimeout(() => {
            setCards(shuffleCards())
            setMatched([])
            setScore(0)
          }, 2000)
        }
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([])
        }, 500)
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🎯 Color Memory
        </h1>
        <p className="text-white text-lg drop-shadow">
          Matched: {matched.length / 2} / {cards.length / 2}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-5 mb-8 max-w-2xl">
        {cards.map((card) => {
          const color = MEMORY_COLORS.find((c) => c.id === card.colorId)
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl font-bold transition-all transform ${
                matched.includes(card.id)
                  ? 'bg-green-400 scale-110 shadow-lg'
                  : selectedCards.includes(card.id)
                    ? `${color?.color} shadow-xl scale-95 animate-pulse`
                    : `${color?.color} hover:scale-105 shadow-lg`
              }`}
              disabled={matched.includes(card.id)}
            >
              {selectedCards.includes(card.id) || matched.includes(card.id) ? (
                <span className="text-2xl">🌈</span>
              ) : (
                '?'
              )}
            </button>
          )
        })}
      </div>

      {/* Score Display */}
      <div className="text-white text-2xl md:text-3xl font-bold drop-shadow mb-8">
        ⭐ Score: {score}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-purple-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
