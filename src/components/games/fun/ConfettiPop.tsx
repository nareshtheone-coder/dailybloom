import { useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import FunGameShell from './FunGameShell'

interface ConfettiPopProps {
  onBack: () => void
}

export default function ConfettiPop({ onBack }: ConfettiPopProps) {
  const [pops, setPops] = useState(0)
  const [burst, setBurst] = useState(false)

  const fire = () => {
    setPops((p) => p + 1)
    setBurst(true)
    celebrate('medium')
    setTimeout(() => setBurst(false), 300)
  }

  return (
    <FunGameShell title="Confetti Cannon" emoji="🎊" score={pops} onBack={onBack} gradient="from-pink-400 via-red-400 to-orange-400">
      <button
        onClick={fire}
        className={`text-8xl md:text-9xl transition-transform ${burst ? 'scale-150' : 'hover:scale-110 active:scale-95'}`}
      >
        🎉
      </button>
      <p className="text-white text-xl font-bold mt-8">Tap the cannon — make it rain confetti!</p>
    </FunGameShell>
  )
}
