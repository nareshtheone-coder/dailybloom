import { motion } from 'framer-motion'

interface PremiumGameCardProps {
  emoji: string
  name: string
  description?: string
  badge?: string
  accent: string
  onClick: () => void
  index?: number
}

export default function PremiumGameCard({
  emoji,
  name,
  description,
  badge,
  accent,
  onClick,
  index = 0,
}: PremiumGameCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 22 }}
      whileTap={{ scale: 0.95, y: 4 }}
      onClick={onClick}
      title={description}
      className="relative group text-left w-full"
    >
      <div
        className="absolute inset-0 rounded-3xl translate-y-2 opacity-60"
        style={{ background: accent, filter: 'brightness(0.7)' }}
      />
      <div
        className="relative rounded-3xl p-4 md:p-5 h-36 md:h-40 flex flex-col items-center justify-center gap-2 border-2 border-white/30 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${accent}ee 0%, ${accent} 100%)`,
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/15" />
        {badge && (
          <span className="absolute top-2 right-2 text-[10px] md:text-xs bg-white text-purple-700 px-2 py-0.5 rounded-full font-bold shadow">
            {badge}
          </span>
        )}
        <motion.span
          className="text-5xl md:text-6xl drop-shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
        >
          {emoji}
        </motion.span>
        <span className="font-display font-bold text-white text-sm md:text-base text-center drop-shadow-md leading-tight">
          {name}
        </span>
      </div>
    </motion.button>
  )
}
