import { useState, useMemo, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { PUZZLE_BY_STAGE, LETTER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface AisForPuzzleProps {
  onBack: () => void
}

export default function AisForPuzzle({ onBack }: AisForPuzzleProps) {
  const totalStages = LETTER_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('ais-for-puzzle', totalStages)

  const stagePuzzles = useMemo(() => PUZZLE_BY_STAGE[stageIndex], [stageIndex])
  const stageMeta = LETTER_STAGES[stageIndex]

  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [matched, setMatched] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  useEffect(() => {
    setPuzzleIndex(0)
    setMatched(false)
    setSelectedEmoji(null)
  }, [stageIndex])

  const currentPuzzle = stagePuzzles[puzzleIndex]

  const emojiPieces = useMemo(() => {
    if (!currentPuzzle) return []
    const distractor = stagePuzzles[(puzzleIndex + 1) % stagePuzzles.length]?.emoji ?? '🎈'
    return [currentPuzzle.emoji, distractor].sort(() => Math.random() - 0.5)
  }, [puzzleIndex, currentPuzzle, stagePuzzles])

  const tryMatch = (emoji: string) => {
    if (matched || !currentPuzzle) return
    if (emoji === currentPuzzle.emoji) {
      setMatched(true)
      celebrate('medium')
      setScore((s) => s + 1)

      if (puzzleIndex < stagePuzzles.length - 1) {
        setTimeout(() => {
          setPuzzleIndex((p) => p + 1)
          setMatched(false)
          setSelectedEmoji(null)
        }, 1000)
      } else {
        celebrate('full')
        finishStage()
      }
    } else {
      setSelectedEmoji(null)
    }
  }

  if (!currentPuzzle) return null

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-300 via-pink-300 to-rose-400 flex flex-col overflow-hidden">
      <GameStageHeader
        title="🧩 A is for Apple"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        score={score}
        extra={`Puzzle ${puzzleIndex + 1}/${stagePuzzles.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div
          onClick={() => selectedEmoji && tryMatch(selectedEmoji)}
          className={`w-36 h-36 md:w-48 md:h-48 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center mb-8 ${
            matched ? 'bg-green-400 border-green-600' : 'bg-white/30 border-white'
          }`}
        >
          <div className="text-6xl md:text-7xl font-bold text-white">{currentPuzzle.letter}</div>
          {matched && <div className="text-5xl">{currentPuzzle.emoji}</div>}
        </div>

        <div className="flex gap-4">
          {emojiPieces.map((emoji, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedEmoji(emoji)
                tryMatch(emoji)
              }}
              className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl text-5xl flex items-center justify-center ${
                selectedEmoji === emoji ? 'bg-yellow-300 scale-110' : 'bg-white/80'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={() => {
          if (nextStage()) {
            setPuzzleIndex(0)
            setMatched(false)
          }
        }}
        onReplay={() => {
          replayStage()
          setPuzzleIndex(0)
          setMatched(false)
        }}
        onBack={onBack}
      />
    </div>
  )
}
