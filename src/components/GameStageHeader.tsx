interface GameStageHeaderProps {
  title: string
  stageIndex: number
  totalStages: number
  stageLabel?: string
  score?: number
  extra?: string
  onBack: () => void
}

export default function GameStageHeader({
  title,
  stageIndex,
  totalStages,
  stageLabel,
  score,
  extra,
  onBack,
}: GameStageHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 md:p-6 bg-white/20 backdrop-blur-sm shrink-0">
      <button
        onClick={onBack}
        className="text-4xl md:text-5xl bg-white/80 rounded-full p-2 md:p-3 hover:bg-white transition-all active:scale-95"
        aria-label="Back to menu"
      >
        ←
      </button>
      <div className="text-center flex-1 px-2">
        <div className="text-xl md:text-3xl font-bold text-white">{title}</div>
        <div className="text-sm md:text-base text-white/90">
          Stage {stageIndex + 1}/{totalStages}
          {stageLabel ? ` · ${stageLabel}` : ''}
          {score !== undefined ? ` · Score: ${score}` : ''}
          {extra ? ` · ${extra}` : ''}
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {totalStages > 20 ? (
            <div className="w-full max-w-xs h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-300 rounded-full transition-all"
                style={{ width: `${((stageIndex + 1) / totalStages) * 100}%` }}
              />
            </div>
          ) : (
            Array.from({ length: totalStages }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-6 md:w-8 rounded-full transition-all ${
                  i < stageIndex ? 'bg-white' : i === stageIndex ? 'bg-yellow-300 scale-110' : 'bg-white/30'
                }`}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-12 md:w-16" />
    </div>
  )
}
