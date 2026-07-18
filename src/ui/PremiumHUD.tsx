import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import PremiumButton from './PremiumButton'

interface PremiumHUDProps {
  title: string
  emoji?: string
  stageIndex?: number
  totalStages?: number
  stageLabel?: string
  score?: number
  extra?: string
  onBack: () => void
  children?: ReactNode
}

export default function PremiumHUD({
  title,
  emoji,
  stageIndex,
  totalStages,
  stageLabel,
  score,
  extra,
  onBack,
  children,
}: PremiumHUDProps) {
  const showStage = stageIndex !== undefined && totalStages !== undefined

  return (
    <div className="shrink-0 px-3 pt-3 pb-2 md:px-4">
      <div className="flex items-center gap-2 md:gap-3">
        <PremiumButton variant="back" size="sm" onClick={onBack} className="!p-3 !rounded-2xl text-2xl">
          ←
        </PremiumButton>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-white text-lg md:text-2xl truncate drop-shadow-md">
            {emoji && <span className="mr-1">{emoji}</span>}
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/90 font-semibold">
            {showStage && (
              <span className="bg-black/20 px-2 py-0.5 rounded-full">
                Stage {stageIndex! + 1}/{totalStages}
              </span>
            )}
            {stageLabel && <span className="text-white/80">{stageLabel}</span>}
            {score !== undefined && (
              <span className="bg-amber-400/90 text-amber-950 px-2 py-0.5 rounded-full">⭐ {score}</span>
            )}
            {extra && <span>{extra}</span>}
          </div>
          {showStage && totalStages! > 1 && (
            <div className="mt-2 h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full"
                initial={false}
                animate={{ width: `${((stageIndex! + 1) / totalStages!) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120 }}
              />
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
