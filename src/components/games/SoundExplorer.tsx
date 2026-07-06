import { useState } from 'react'

interface SoundExplorerProps {
  onBack: () => void
}

const SOUNDS = [
  { emoji: '🔔', name: 'Bell', sound: '/sounds/bell.wav', label: 'Bell' },
  { emoji: '🎺', name: 'Trumpet', sound: '/sounds/trumpet.wav', label: 'Trumpet' },
  { emoji: '🎸', name: 'Guitar', sound: '/sounds/guitar.wav', label: 'Guitar' },
  { emoji: '🥁', name: 'Drum', sound: '/sounds/drum.wav', label: 'Drum' },
  { emoji: '🎹', name: 'Piano', sound: '/sounds/piano.wav', label: 'Piano' },
  { emoji: '🎵', name: 'Music', sound: '/sounds/music.wav', label: 'Music' },
]

// Create simple synthesized sounds using Web Audio API
const playSound = (type: string) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const now = audioContext.currentTime

  switch (type) {
    case 'bell': {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 800
      gain.gain.setValueAtTime(1, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1)
      osc.start(now)
      osc.stop(now + 1)
      break
    }
    case 'trumpet': {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.type = 'sawtooth'
      osc.frequency.value = 600
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
      osc.start(now)
      osc.stop(now + 0.5)
      break
    }
    case 'drum': {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.2)
      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
      break
    }
    case 'piano': {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 523 // C5
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
      osc.start(now)
      osc.stop(now + 0.8)
      break
    }
    case 'music': {
      const notes = [523, 587, 659, 784]
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.value = freq
        const startTime = now + i * 0.2
        gain.gain.setValueAtTime(0.2, startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
        osc.start(startTime)
        osc.stop(startTime + 0.3)
      })
      break
    }
    default:
      break
  }
}

export default function SoundExplorer({ onBack }: SoundExplorerProps) {
  const [activeId, setActiveId] = useState<number | null>(null)

  const handleSound = (id: number, soundType: string) => {
    playSound(soundType)
    setActiveId(id)
    setTimeout(() => setActiveId(null), 200)
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-teal-300 to-blue-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        >
          ←
        </button>
        <div className="text-2xl md:text-4xl font-bold text-white">🎵 Explore Sounds!</div>
        <div className="w-12 md:w-16"></div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-wrap items-center justify-center p-4 md:p-8 gap-4 md:gap-8 content-center">
        {SOUNDS.map((sound) => (
          <button
            key={sound.name}
            onClick={() => handleSound(Math.random(), sound.name.toLowerCase())}
            className={`flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/80 hover:bg-white transition-all active:scale-95 shadow-lg ${
              activeId === Math.random() ? 'scale-110' : ''
            }`}
          >
            <div className="text-5xl md:text-6xl">{sound.emoji}</div>
            <div className="text-sm md:text-lg font-bold text-gray-800">{sound.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
