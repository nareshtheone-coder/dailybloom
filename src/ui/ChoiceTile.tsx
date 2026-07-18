import { motion } from 'framer-motion'

interface ChoiceTileProps {
  children: React.ReactNode
  onClick: () => void
  selected?: boolean
  correct?: boolean | null
  size?: 'md' | 'lg'
  disabled?: boolean
}

export default function ChoiceTile({
  children,
  onClick,
  selected,
  correct,
  size = 'md',
  disabled,
}: ChoiceTileProps) {
  let ring = 'ring-white/30'
  if (correct === true) ring = 'ring-green-400'
  else if (correct === false) ring = 'ring-red-400'
  else if (selected) ring = 'ring-yellow-300'

  return (
    <motion.button
      whileTap={{ scale: 0.92, y: 3 }}
      whileHover={disabled ? {} : { scale: 1.03 }}
      disabled={disabled}
      onClick={onClick}
      className={`relative font-display font-bold text-white rounded-2xl border-2 border-white/40 bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-sm shadow-[0_6px_0_rgba(0,0,0,0.2)] ring-4 ${ring} ${
        size === 'lg' ? 'p-6 text-3xl md:text-4xl min-h-[88px]' : 'p-4 text-xl md:text-2xl min-h-[72px]'
      } ${disabled ? 'opacity-60' : ''}`}
    >
      {children}
    </motion.button>
  )
}
