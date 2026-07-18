import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../utils/celebrations'
import { getBubblePopStage, FUN_STAGE_COUNT } from '../../data/funGameStages'
import { useFunGameStages } from '../../hooks/useFunGameStages'
import FunGameShell from './fun/FunGameShell'
import { useCanvasLoop, hitCircle } from '../../engine/canvas/useCanvasLoop'
import { drawSky, drawBubble } from '../../engine/canvas/draw'
import type { Particle } from '../../engine/canvas/types'
import { spawnBurst, updateParticles, drawParticles } from '../../engine/canvas/particles'

interface CatchTheBubblesProps {
  onBack: () => void
}

interface Bubble {
  id: number
  x: number
  y: number
  r: number
  hue: number
  vy: number
  wobble: number
  points: number
}

export default function CatchTheBubbles({ onBack }: CatchTheBubblesProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('catch-the-bubbles')
  const config = getBubblePopStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const particlesRef = useRef<Particle[]>([])
  const scoreRef = useRef(0)
  const poppedRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const idRef = useRef(0)
  const completeRef = useRef(false)

  const [displayScore, setDisplayScore] = useState(0)
  const [displayPopped, setDisplayPopped] = useState(0)

  const resetStage = useCallback(() => {
    bubblesRef.current = []
    particlesRef.current = []
    scoreRef.current = 0
    poppedRef.current = 0
    spawnTimerRef.current = 0
    completeRef.current = false
    setDisplayScore(0)
    setDisplayPopped(0)
  }, [])

  useEffect(() => {
    resetStage()
  }, [stageIndex, resetStage])

  const popBubble = useCallback(
    (b: Bubble) => {
      if (completeRef.current || stageComplete) return
      bubblesRef.current = bubblesRef.current.filter((x) => x.id !== b.id)
      spawnBurst(particlesRef.current, b.x, b.y, 14, b.hue, 5)
      scoreRef.current += b.points
      poppedRef.current += 1
      setDisplayScore(scoreRef.current)
      setDisplayPopped(poppedRef.current)
      celebrate('light')
      if (poppedRef.current >= config.target) {
        completeRef.current = true
        celebrate('full')
        finishStage()
      }
    },
    [config.target, finishStage, stageComplete],
  )

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      for (const b of [...bubblesRef.current].reverse()) {
        if (hitCircle(x, y, b.x, b.y, b.r)) {
          popBubble(b)
          break
        }
      }
    },
    [popBubble],
  )

  useCanvasLoop(
    canvasRef,
    (ctx, size, dt, time) => {
      if (size.width === 0) return
      drawSky(ctx, size.width, size.height, '#4FC3F7', '#0288D1', time)

      if (!completeRef.current && !stageComplete) {
        spawnTimerRef.current += dt * 1000
        if (spawnTimerRef.current >= config.spawnMs) {
          spawnTimerRef.current = 0
          if (bubblesRef.current.length < config.maxOnScreen) {
            const special = Math.random() < config.specialRate
            bubblesRef.current.push({
              id: idRef.current++,
              x: 40 + Math.random() * (size.width - 80),
              y: size.height + 40,
              r: special ? 36 : 28 + Math.random() * 10,
              hue: special ? 45 + Math.random() * 30 : 190 + Math.random() * 50,
              vy: config.speed * (50 + Math.random() * 20),
              wobble: Math.random() * Math.PI * 2,
              points: special ? 3 : 1,
            })
          }
        }
        for (const b of bubblesRef.current) {
          b.y -= b.vy * dt
          b.wobble += dt * 4
          b.x += Math.sin(b.wobble) * 0.8
        }
        bubblesRef.current = bubblesRef.current.filter((b) => b.y > -60)
      }

      updateParticles(particlesRef.current, dt)
      for (const b of bubblesRef.current) {
        drawBubble(ctx, b.x, b.y, b.r, b.hue, b.wobble)
      }
      drawParticles(ctx, particlesRef.current)
    },
    !stageComplete,
  )

  return (
    <FunGameShell
      title="Bubble Pop"
      emoji="🫧"
      score={displayScore}
      subtitle={`${displayPopped}/${config.target} bubbles`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        resetStage()
      }}
      onBack={onBack}
      scene="sky"
      fullViewport
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none block"
        onPointerDown={(e) => handlePointer(e.clientX, e.clientY)}
      />
    </FunGameShell>
  )
}
