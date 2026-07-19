import { motion, AnimatePresence } from 'framer-motion'
import PremiumButton from '../ui/PremiumButton'

interface StageCompleteOverlayProps {
  show: boolean
  stageIndex: number
  totalStages: number
  allDone: boolean
  onNext: () => void
  onReplay: () => void
  onBack: () => void
}

export default function StageCompleteOverlay({
  show,
  stageIndex,
  totalStages,
  allDone,
  onNext,
  onReplay,
  onBack,
}: StageCompleteOverlayProps) {
  const hasNext = stageIndex < totalStages - 1

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 40, rotate: -3 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="bg-gradient-to-b from-white to-purple-50 rounded-[2rem] p-6 md:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-white"
          >
            <motion.div
              className="text-6xl mb-3"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              {allDone ? '🏆' : '🎉'}
            </motion.div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-purple-800 mb-2">
              {allDone ? 'Champion!' : 'Level Complete!'}
            </h2>
            <p className="text-gray-600 mb-6 font-medium">
              {allDone
                ? `You conquered all ${totalStages} stages!`
                : `Amazing work on Stage ${stageIndex + 1}!`}
            </p>
            <div className="flex flex-col gap-3">
              {hasNext && !allDone && (
                <PremiumButton onClick={onNext} size="lg" className="w-full">
                  Next Level →
                </PremiumButton>
              )}
              <PremiumButton onClick={onReplay} variant="secondary" size="md" className="w-full">
                Play Again
              </PremiumButton>
              <button onClick={onBack} className="w-full py-2 text-gray-500 font-semibold">
                Back to Menu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
