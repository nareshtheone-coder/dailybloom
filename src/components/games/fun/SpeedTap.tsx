import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getSpeedTapStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop, hitCircle } from '../../../engine/canvas/useCanvasLoop'
import { drawSky, drawTapTarget } from '../../../engine/canvas/draw'

export default function SpeedTap({ onBack }: { onBack: () => void }) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('speed-tap')
  const config = getSpeedTapStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetRef = useRef({ x: 200, y: 200 })
  const scoreRef = useRef(0)
  const timeRef = useRef(config.durationSec)
  const pulseRef = useRef(0)
  const runningRef = useRef(true)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(config.durationSec)

  const reset = useCallback(() => {
    scoreRef.current = 0
    timeRef.current = config.durationSec
    runningRef.current = true
    setScore(0)
    setTimeLeft(config.durationSec)
  }, [config.durationSec])

  useEffect(() => reset(), [stageIndex, reset])

  useCanvasLoop(canvasRef, (ctx, size, dt, time) => {
    if (!size.width) return
    drawSky(ctx, size.width, size.height, '#FFB74D', '#FF7043', time)
    pulseRef.current = time * 5

    if (runningRef.current && !stageComplete) {
      timeRef.current -= dt
      if (timeRef.current <= 0) runningRef.current = false
      setTimeLeft(Math.ceil(Math.max(0, timeRef.current)))
    }

    if (runningRef.current) {
      drawTapTarget(ctx, targetRef.current.x, targetRef.current.y, config.buttonSize / 2, pulseRef.current)
    }
  })

  const tap = (cx: number, cy: number) => {
    if (!runningRef.current || stageComplete) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = cx - rect.left
    const y = cy - rect.top
    if (!hitCircle(x, y, targetRef.current.x, targetRef.current.y, config.buttonSize / 2)) return
    const next = scoreRef.current + 1
    scoreRef.current = next
    setScore(next)
    targetRef.current = {
      x: 60 + Math.random() * (rect.width - 120),
      y: 80 + Math.random() * (rect.height - 160),
    }
    celebrate('light')
    if (next >= config.target) {
      runningRef.current = false
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Speed Tap"
      emoji="⚡"
      score={score}
      subtitle={`${score}/${config.target} · ${timeLeft}s`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => { replayStage(); reset() }}
      onBack={onBack}
      scene="sunset"
      fullViewport
    >
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={(e) => tap(e.clientX, e.clientY)} />
    </FunGameShell>
  )
}
