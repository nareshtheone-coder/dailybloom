import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const FACES = ['😂', '🤪', '😜', '🥳', '🤡', '👻', '🦄', '🐸']

interface SillyFacesProps {
  onBack: () => void
}

export default function SillyFaces({ onBack }: SillyFacesProps) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [bounce, setBounce] = useState(false)

  const tap = () => {
    setIndex((i) => (i + 1) % FACES.length)
    setScore((s) => s + 1)
    setBounce(true)
    celebrate('light')
    setTimeout(() => setBounce(false), 200)
  }

  return (
    <FunGameShell title="Silly Faces" emoji="🤪" score={score} onBack={onBack}>
      <button
        onClick={tap}
        className={`text-[8rem] md:text-[10rem] transition-transform ${bounce ? 'scale-125 rotate-6' : 'hover:scale-110'}`}
      >
        {FACES[index]}
      </button>
      <p className="text-white text-xl font-bold mt-8 animate-bounce">Tap for a silly surprise!</p>
    </FunGameShell>
  )
}
