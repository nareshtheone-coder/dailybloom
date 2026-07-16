import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getDancePartyStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

const BEATS = ['🔴', '🔵', '🟡', '🟢']

interface DancePartyProps {
  onBack: () => void
}

export default function DanceParty({ onBack }: DancePartyProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('dance-party')
  const config = getDancePartyStage(stageIndex)

  const [active, setActive] = useState(0)
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(0)

  useEffect(() => {
    setActive(0)
    setScore(0)
    setTarget(0)
  }, [stageIndex])

  useEffect(() => {
    if (stageComplete) return
    const beat = setInterval(() => {
      setActive((a) => (a + 1) % BEATS.length)
      setTarget(Math.floor(Math.random() * BEATS.length))
    }, config.beatMs)
    return () => clearInterval(beat)
  }, [stageComplete, config.beatMs])

  const tap = (i: number) => {
    if (stageComplete || i !== target) return
    const next = score + 1
    setScore(next)
    celebrate('light')
    if (next >= config.tapsNeeded) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Dance Party"
      emoji="💃"
      score={score}
      subtitle={`${score}/${config.tapsNeeded} beats`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setScore(0)
      }}
      onBack={onBack}
      gradient="from-violet-400 to-pink-500"
    >
      <p className="text-white text-xl font-bold mb-6">Tap the glowing color!</p>
      <div className="grid grid-cols-2 gap-6">
        {BEATS.map((emoji, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl text-6xl flex items-center justify-center transition-all ${
              i === target ? 'bg-white scale-110 ring-4 ring-yellow-300 animate-pulse' : 'bg-white/40'
            } ${i === active ? 'rotate-3' : ''}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </FunGameShell>
  )
}
