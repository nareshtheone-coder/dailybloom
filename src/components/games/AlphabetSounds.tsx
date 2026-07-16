import { useState, useEffect, useMemo } from 'react'
import { celebrate, addCelebrationStyles } from '../../utils/celebrations'
import { LETTER_STAGES } from '../../data/contentStages'
import { useStagedGame } from '../../hooks/useStagedGame'
import GameStageHeader from '../GameStageHeader'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface AlphabetSoundsProps {
  onBack: () => void
  ageGroup?: '4-5' | '5-6'
}

const FREQUENCIES: Record<string, number> = {
  A: 440, B: 494, C: 523, D: 587, E: 659, F: 698, G: 784,
  H: 880, I: 988, J: 1047, K: 1175, L: 1319, M: 1397,
  N: 1568, O: 1760, P: 1976, Q: 2093, R: 2349, S: 2637,
  T: 2960, U: 3136, V: 3520, W: 3951, X: 4186, Y: 4699, Z: 5274,
}

export default function AlphabetSounds({ onBack, ageGroup = '4-5' }: AlphabetSoundsProps) {
  const gameId = ageGroup === '5-6' ? 'full-alphabet' : 'alphabet-sounds'
  const totalStages = LETTER_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame(gameId, totalStages)

  const [letterIndex, setLetterIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const stageMeta = LETTER_STAGES[stageIndex]
  const stageLetters = useMemo(
    () =>
      stageMeta.items.map((item) => ({
        letter: item.letter,
        words: item.words,
        emoji: item.emoji,
      })),
    [stageMeta],
  )
  const current = stageLetters[letterIndex]

  useEffect(() => {
    addCelebrationStyles()
  }, [])

  useEffect(() => {
    setLetterIndex(0)
    setSelectedWord(null)
  }, [stageIndex])

  const speakLetter = () => {
    if (!current) return
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const now = audioContext.currentTime
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.frequency.value = FREQUENCIES[current.letter] || 440
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
    osc.start(now)
    osc.stop(now + 0.8)
  }

  const handleWordSelect = (word: string) => {
    setSelectedWord(word)
    celebrate('medium')
    setScore((s) => s + 1)

    setTimeout(() => {
      if (letterIndex < stageLetters.length - 1) {
        setLetterIndex(letterIndex + 1)
        setSelectedWord(null)
      } else {
        celebrate('full')
        finishStage()
      }
    }, 1200)
  }

  if (!current) return null

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 flex flex-col overflow-hidden">
      <GameStageHeader
        title={ageGroup === '5-6' ? '🔤 Full ABC' : '🔤 ABC Quest'}
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        score={score}
        extra={`Letter ${letterIndex + 1}/${stageLetters.length}`}
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6 overflow-y-auto">
        <div className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">{current.letter}</div>

        <button
          onClick={speakLetter}
          className="px-8 py-4 bg-white/90 hover:bg-white text-2xl font-bold rounded-full shadow-lg"
        >
          🔊 Say Letter
        </button>

        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {current.words.map((word) => (
            <button
              key={word}
              onClick={() => handleWordSelect(word)}
              disabled={selectedWord !== null}
              className={`p-4 rounded-2xl font-bold text-xl ${
                selectedWord === word ? 'bg-green-400' : 'bg-white/80 hover:bg-white'
              }`}
            >
              <div className="text-4xl mb-1">{current.emoji}</div>
              {word}
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
          if (nextStage()) setLetterIndex(0)
        }}
        onReplay={() => {
          replayStage()
          setLetterIndex(0)
          setSelectedWord(null)
        }}
        onBack={onBack}
      />
    </div>
  )
}
