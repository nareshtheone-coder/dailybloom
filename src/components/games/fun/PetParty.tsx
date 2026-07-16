import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

const FOODS = ['🍎', '🥕', '🍪', '🧀']
const PETS = ['🐶', '🐱', '🐰', '🐹']

interface PetPartyProps {
  onBack: () => void
}

export default function PetParty({ onBack }: PetPartyProps) {
  const [petIndex, setPetIndex] = useState(0)
  const [happy, setHappy] = useState(0)
  const [mood, setMood] = useState('😊')

  const feed = () => {
    setHappy((h) => h + 1)
    setMood(['😋', '🥳', '😍', '🤗'][happy % 4])
    celebrate('light')
    setTimeout(() => {
      setMood('😊')
      setPetIndex((p) => (p + 1) % PETS.length)
    }, 800)
  }

  return (
    <FunGameShell title="Pet Party" emoji="🐾" score={happy} onBack={onBack} gradient="from-teal-300 to-emerald-400">
      <div className="text-9xl mb-4">{mood}</div>
      <div className="text-8xl mb-8">{PETS[petIndex]}</div>
      <div className="flex gap-4 flex-wrap justify-center">
        {FOODS.map((f) => (
          <button key={f} onClick={feed} className="text-5xl w-20 h-20 bg-white/80 rounded-2xl hover:scale-110">
            {f}
          </button>
        ))}
      </div>
      <p className="text-white font-bold mt-6">Feed the pet yummy snacks!</p>
    </FunGameShell>
  )
}
