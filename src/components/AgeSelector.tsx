import { motion } from 'framer-motion'
import AnimatedScene from '../ui/AnimatedScene'
import PremiumGameCard from '../ui/PremiumGameCard'

interface AgeSelectorProps {
  onSelectAge: (age: '2-3' | '3-4' | '4-5' | '5-6') => void
}

const ageGroups = [
  { label: '2–3 years', key: '2-3' as const, emoji: '🐣', accent: '#FF6B9D', desc: 'First taps & colours' },
  { label: '3–4 years', key: '3-4' as const, emoji: '🦊', accent: '#42A5F5', desc: 'Numbers & patterns' },
  { label: '4–5 years', key: '4-5' as const, emoji: '🦄', accent: '#AB47BC', desc: 'ABC & words' },
  { label: '5–6 years', key: '5-6' as const, emoji: '🚀', accent: '#66BB6A', desc: 'Reading & maths' },
]

export default function AgeSelector({ onSelectAge }: AgeSelectorProps) {
  return (
    <AnimatedScene variant="sky">
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center mb-10"
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌸
          </motion.div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white drop-shadow-lg">DailyBloom</h1>
          <p className="text-xl text-white/90 font-semibold mt-2">Pick your age to start playing!</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {ageGroups.map((age, i) => (
            <PremiumGameCard
              key={age.key}
              emoji={age.emoji}
              name={age.label}
              description={age.desc}
              accent={age.accent}
              onClick={() => onSelectAge(age.key)}
              index={i}
            />
          ))}
        </div>

        <p className="mt-10 text-white/70 text-sm text-center max-w-xs font-medium">
          Free learning games for little explorers. Works offline on phones & tablets.
        </p>
      </div>
    </AnimatedScene>
  )
}
