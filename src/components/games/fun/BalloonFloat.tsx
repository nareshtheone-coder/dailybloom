import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getBalloonPopStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop, hitCircle } from '../../../engine/canvas/useCanvasLoop'
import { drawSky, drawBalloon } from '../../../engine/canvas/draw'
import { spawnBurst, updateParticles, drawParticles } from '../../../engine/canvas/particles'
import type { Particle } from '../../../engine/canvas/types'

interface Balloon {
  id: number
  x: number
  y: number
  r: number
  hue: number
  vy: number
}

interface BalloonFloatProps {
  onBack: () => void
}

export default function BalloonFloat({ onBack }: BalloonFloatProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('balloon-float')
  const config = getBalloonPopStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const balloonsRef = useRef<Balloon[]>([])
  const particlesRef = useRef<Particle[]>([])
  const poppedRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const idRef = useRef(0)
  const doneRef = useRef(false)
  const [score, setScore] = useState(0)

  const reset = useCallback(() => {
    balloonsRef.current = []
    particlesRef.current = []
    poppedRef.current = 0
    spawnTimerRef.current = 0
    doneRef.current = false
    setScore(0)
  }, [])

  useEffect(() => reset(), [stageIndex, reset])

  const pop = useCallback(
    (b: Balloon) => {
      if (doneRef.current) return
      balloonsRef.current = balloonsRef.current.filter((x) => x.id !== b.id)
      spawnBurst(particlesRef.current, b.x, b.y, 12, b.hue, 4)
      const next = poppedRef.current + 1
      poppedRef.current = next
      setScore(next)
      celebrate('light')
      if (next >= config.target) {
        doneRef.current = true
        celebrate('full')
        finishStage()
      }
    },
    [config.target, finishStage],
  )

  const onPointer = useCallback(
    (cx: number, cy: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = cx - rect.left
      const y = cy - rect.top
      for (const b of [...balloonsRef.current].reverse()) {
        if (hitCircle(x, y, b.x, b.y, b.r)) {
          pop(b)
          break
        }
      }
    },
    [pop],
  )

  useCanvasLoop(canvasRef, (ctx, size, dt, time) => {
    if (!size.width) return
    drawSky(ctx, size.width, size.height, '#FF8A80', '#FF5252', time)
    if (!doneRef.current && !stageComplete) {
      spawnTimerRef.current += dt * 1000
      if (spawnTimerRef.current >= config.spawnMs && balloonsRef.current.length < config.maxOnScreen) {
        spawnTimerRef.current = 0
        balloonsRef.current.push({
          id: idRef.current++,
          x: 50 + Math.random() * (size.width - 100),
          y: size.height + 50,
          r: 32 + Math.random() * 12,
          hue: Math.random() * 360,
          vy: config.riseSpeed * 55,
        })
      }
      for (const b of balloonsRef.current) b.y -= b.vy * dt
      balloonsRef.current = balloonsRef.current.filter((b) => b.y > -80)
    }
    updateParticles(particlesRef.current, dt)
    for (const b of balloonsRef.current) drawBalloon(ctx, b.x, b.y, b.r, b.hue)
    drawParticles(ctx, particlesRef.current)
  })

  return (
    <FunGameShell
      title="Balloon Pop"
      emoji="🎈"
      score={score}
      subtitle={`${score}/${config.target} pops`}
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
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={(e) => onPointer(e.clientX, e.clientY)} />
    </FunGameShell>
  )
}
