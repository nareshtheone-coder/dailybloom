import { useState, useEffect, useCallback } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getSimonSaysStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

const COLORS = ['🔴', '🟢', '🔵', '🟡']

interface SimonSaysProps {
  onBack: () => void
}

function randomSequence(len: number): number[] {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 4))
}

export default function SimonSays({ onBack }: SimonSaysProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('simon-says')
  const config = getSimonSaysStage(stageIndex)

  const [sequence, setSequence] = useState<number[]>(() => randomSequence(config.sequenceLength))
  const [input, setInput] = useState<number[]>([])
  const [showing, setShowing] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)

  const flash = useCallback(
    async (idx: number) => {
      setShowing(idx)
      await new Promise((r) => setTimeout(r, config.flashMs))
      setShowing(null)
    },
    [config.flashMs],
  )

  const playSequence = useCallback(
    async (seq: number[]) => {
      setPlaying(true)
      for (const idx of seq) {
        await flash(idx)
        await new Promise((r) => setTimeout(r, 120))
      }
      setPlaying(false)
    },
    [flash],
  )

  useEffect(() => {
    const seq = randomSequence(config.sequenceLength)
    setSequence(seq)
    setInput([])
    setShowing(null)
    playSequence(seq)
  }, [stageIndex, config.sequenceLength, playSequence])

  const replay = () => {
    if (!playing) playSequence(sequence)
  }

  const tap = (idx: number) => {
    if (stageComplete || playing) return
    const next = [...input, idx]
    setInput(next)
    flash(idx)
    if (sequence[next.length - 1] !== idx) {
      setInput([])
      return
    }
    if (next.length === sequence.length) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Simon Says"
      emoji="🎮"
      subtitle={`Pattern of ${config.sequenceLength}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        const seq = randomSequence(config.sequenceLength)
        setSequence(seq)
        setInput([])
        playSequence(seq)
      }}
      onBack={onBack}
      gradient="from-cyan-400 to-blue-500"
    >
      <button onClick={replay} disabled={playing} className="mb-4 px-4 py-2 bg-white/80 rounded-full font-bold text-sm">
        🔊 Replay pattern
      </button>
      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((c, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            disabled={stageComplete || playing}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl text-6xl flex items-center justify-center transition-all ${
              showing === i ? 'bg-white scale-110 ring-4 ring-white' : 'bg-white/50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </FunGameShell>
  )
}
