import { useState, useMemo } from 'react'
import { celebrate } from '../../utils/celebrations'
import { EARLY_PUZZLES } from '../../data/gamesLibrary'

interface AisForPuzzleProps {
  onBack: () => void
}

export default function AisForPuzzle({ onBack }: AisForPuzzleProps) {
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [matched, setMatched] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const currentPuzzle = EARLY_PUZZLES[puzzleIndex]

  const emojiPieces = useMemo(() => {
    const distractorEmoji =
      EARLY_PUZZLES[(puzzleIndex + 1) % EARLY_PUZZLES.length].emoji
    return [currentPuzzle.emoji, distractorEmoji].sort(() => Math.random() - 0.5)
  }, [puzzleIndex, currentPuzzle.emoji])

  const handleEmojiTap = (emoji: string) => {
    if (matched) return
    setSelectedEmoji(emoji)
  }

  const handleLetterSlotTap = () => {
    if (!selectedEmoji || matched) return

    if (selectedEmoji === currentPuzzle.emoji) {
      setMatched(true)
      celebrate('medium')
      const newScore = score + 1
      setScore(newScore)

      if (puzzleIndex < EARLY_PUZZLES.length - 1) {
        setTimeout(() => {
          setPuzzleIndex((prev) => prev + 1)
          setMatched(false)
          setSelectedEmoji(null)
        }, 1000)
      } else {
        celebrate('full')
        setCompleted(true)
      }
    } else {
      setSelectedEmoji(null)
    }
  }

  const handleDrop = (emoji: string) => {
    if (matched) return
    setSelectedEmoji(emoji)
    if (emoji === currentPuzzle.emoji) {
      setMatched(true)
      celebrate('medium')
      const newScore = score + 1
      setScore(newScore)

      if (puzzleIndex < EARLY_PUZZLES.length - 1) {
        setTimeout(() => {
          setPuzzleIndex((prev) => prev + 1)
          setMatched(false)
          setSelectedEmoji(null)
        }, 1000)
      } else {
        celebrate('full')
        setCompleted(true)
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-red-300 via-pink-300 to-rose-400 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          🧩 A is for Apple
        </h1>
        <p className="text-white text-lg drop-shadow">
          {completed
            ? 'All puzzles done!'
            : `Puzzle ${puzzleIndex + 1}/${EARLY_PUZZLES.length} · Score: ${score}`}
        </p>
      </div>

      {/* Letter slot */}
      <div className="mb-8 text-center">
        <p className="text-white text-lg drop-shadow mb-3">Match the letter!</p>
        <div
          onClick={handleLetterSlotTap}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleDrop(e.dataTransfer.getData('emoji'))
          }}
          className={`w-40 h-40 md:w-52 md:h-52 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center transition-all shadow-2xl ${
            matched
              ? 'bg-green-400 border-green-600 scale-110'
              : selectedEmoji
                ? 'bg-white/60 border-white scale-105'
                : 'bg-white/30 border-white/80'
          }`}
        >
          <div className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
            {currentPuzzle.letter}
          </div>
          {matched && (
            <div className="text-5xl md:text-6xl mt-1">{currentPuzzle.emoji}</div>
          )}
        </div>
      </div>

      {/* Emoji pieces */}
      {!completed && (
        <div className="mb-8">
          <p className="text-white text-lg drop-shadow mb-4 text-center">
            👉 Tap or drag the matching picture!
          </p>
          <div className="flex gap-6 justify-center">
            {emojiPieces.map((emoji, i) => (
              <div
                key={i}
                draggable={!matched}
                onDragStart={(e) => e.dataTransfer.setData('emoji', emoji)}
                onClick={() => handleEmojiTap(emoji)}
                className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-all shadow-xl ${
                  selectedEmoji === emoji
                    ? 'bg-yellow-300 scale-110 ring-4 ring-white'
                    : 'bg-white/80 hover:scale-105'
                } ${matched && emoji === currentPuzzle.emoji ? 'opacity-50' : ''}`}
              >
                <span className="text-6xl md:text-7xl">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex gap-3 mb-8">
        {EARLY_PUZZLES.map((puzzle, i) => (
          <div
            key={i}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
              i < puzzleIndex || (i === puzzleIndex && matched)
                ? 'bg-white text-red-500 shadow-lg scale-110'
                : i === puzzleIndex
                  ? 'bg-white/50 text-white ring-2 ring-white'
                  : 'bg-white/30 text-white/60'
            }`}
          >
            {puzzle.letter}
          </div>
        ))}
      </div>

      {completed && (
        <div className="text-center mb-8 animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-white text-2xl font-bold drop-shadow">Great matching!</p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        className="mt-auto mb-6 px-8 py-3 md:px-12 md:py-4 bg-white/90 hover:bg-white text-red-600 font-bold rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all"
      >
        ← Back
      </button>
    </div>
  )
}
