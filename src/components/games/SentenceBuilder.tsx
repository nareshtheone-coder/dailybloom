import { useState, useEffect } from 'react'
import { celebrate } from '../../utils/celebrations'
import { SENTENCE_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface SentenceBuilderProps {
  onBack: () => void
}

const TOTAL_STAGES = SENTENCE_STAGES.length

export default function SentenceBuilder({ onBack }: SentenceBuilderProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('simple-sentences', TOTAL_STAGES)

  const stageSentences = SENTENCE_STAGES[stageIndex]
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [shuffled, setShuffled] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const current = stageSentences[sentenceIndex]

  useEffect(() => {
    setSentenceIndex(0)
    setScore(0)
    setSelected([])
  }, [stageIndex])

  useEffect(() => {
    setShuffled([...current.words].sort(() => Math.random() - 0.5))
    setSelected([])
  }, [stageIndex, sentenceIndex, current.words])

  const handleWordSelect = (word: string) => {
    const newSelected = [...selected, word]
    setSelected(newSelected)

    if (newSelected.length === current.words.length) {
      if (newSelected.join(' ') === current.sentence) {
        celebrate('medium')
        setScore((s) => s + 1)

        setTimeout(() => {
          if (sentenceIndex < stageSentences.length - 1) {
            setSentenceIndex(sentenceIndex + 1)
            setSelected([])
          } else {
            celebrate('full')
            finishStage()
          }
        }, 1000)
      }
    }
  }

  const handleUndo = () => {
    setSelected(selected.slice(0, -1))
  }

  const isWordUsed = (word: string, idx: number) => {
    const priorSame = shuffled.slice(0, idx).filter((w) => w === word).length
    const selectedSame = selected.filter((w) => w === word).length
    return priorSame < selectedSame
  }

  const handleReplay = () => {
    replayStage()
    setSentenceIndex(0)
    setScore(0)
    setSelected([])
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-300 via-green-300 to-teal-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title="📖 Sentence Builder"
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        score={score}
        extra={`${sentenceIndex + 1}/${stageSentences.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-6">
        <div className="bg-white/90 px-6 py-4 rounded-2xl text-center w-full max-w-2xl">
          <p className="text-gray-600 text-lg mb-2">Build the sentence:</p>
          <div className="flex flex-wrap gap-2 justify-center min-h-12">
            {selected.length > 0 ? (
              selected.map((word, i) => (
                <span key={i} className="text-2xl md:text-3xl font-bold text-emerald-700">
                  {word}
                </span>
              ))
            ) : (
              <span className="text-xl text-gray-400">Tap words below...</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
          {shuffled.map((word, idx) => {
            const isUsed = isWordUsed(word, idx)
            return (
              <button
                key={idx}
                onClick={() => !isUsed && handleWordSelect(word)}
                disabled={isUsed || selected.length >= current.words.length}
                className={`px-6 py-4 rounded-xl font-bold text-xl md:text-2xl transition-all active:scale-95 ${
                  isUsed
                    ? 'bg-gray-300 opacity-50'
                    : 'bg-white/80 hover:bg-white text-gray-800 shadow-lg'
                }`}
              >
                {word}
              </button>
            )
          })}
        </div>

        {selected.length > 0 && (
          <button
            onClick={handleUndo}
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full font-bold text-lg transition-all active:scale-95"
          >
            ↶ Undo
          </button>
        )}
      </div>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={TOTAL_STAGES}
        allDone={allComplete}
        onNext={() => nextStage()}
        onReplay={handleReplay}
        onBack={onBack}
      />
    </div>
  )
}
