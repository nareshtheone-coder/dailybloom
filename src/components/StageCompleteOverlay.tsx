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
  if (!show) return null

  const hasNext = stageIndex < totalStages - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="text-5xl mb-3">{allDone ? '🏆' : '🎉'}</div>
        <h2 className="text-2xl font-bold text-purple-800 mb-2">
          {allDone ? 'All Stages Complete!' : 'Stage Complete!'}
        </h2>
        <p className="text-gray-600 mb-6">
          {allDone
            ? `You finished all ${totalStages} stages! Play again anytime.`
            : `Great job on Stage ${stageIndex + 1}! Ready for the next challenge?`}
        </p>
        <div className="flex flex-col gap-3">
          {hasNext && !allDone && (
            <button
              onClick={onNext}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg"
            >
              Next Stage →
            </button>
          )}
          <button
            onClick={onReplay}
            className="w-full py-3 rounded-full bg-blue-100 text-blue-800 font-bold"
          >
            Play Again
          </button>
          <button onClick={onBack} className="w-full py-2 text-gray-500 font-medium">
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  )
}
