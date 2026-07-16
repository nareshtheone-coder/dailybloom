import { useState, useEffect } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getSillyFacesStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

const FACES = ['😂', '🤪', '😜', '🥳', '🤡', '👻', '🦄', '🐸']

interface SillyFacesProps {
  onBack: () => void
}

export default function SillyFaces({ onBack }: SillyFacesProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('silly-faces')
  const config = getSillyFacesStage(stageIndex)

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    setIndex(0)
    setScore(0)
    setBounce(false)
  }, [stageIndex])

  const tap = () => {
    if (stageComplete) return
    setIndex((i) => (i + 1) % FACES.length)
    const next = score + 1
    setScore(next)
    setBounce(true)
    celebrate('light')
    setTimeout(() => setBounce(false), 200)
    if (next >= config.tapsNeeded) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Silly Faces"
      emoji="🤪"
      score={score}
      subtitle={`${score}/${config.tapsNeeded} taps`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        setIndex(0)
        setScore(0)
      }}
      onBack={onBack}
    >
      <button
        onClick={tap}
        disabled={stageComplete}
        className={`text-[8rem] md:text-[10rem] transition-transform ${bounce ? 'scale-125 rotate-6' : 'hover:scale-110'}`}
      >
        {FACES[index]}
      </button>
      <p className="text-white text-xl font-bold mt-8 animate-bounce">Tap for a silly surprise!</p>
    </FunGameShell>
  )
}
