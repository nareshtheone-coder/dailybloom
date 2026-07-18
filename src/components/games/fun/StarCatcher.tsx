import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getStarCatcherStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop, hitCircle } from '../../../engine/canvas/useCanvasLoop'
import { drawStar } from '../../../engine/canvas/draw'
import { spawnBurst, updateParticles, drawParticles } from '../../../engine/canvas/particles'
import type { Particle } from '../../../engine/canvas/types'

interface Star {
  id: number
  x: number
  y: number
  size: number
  rot: number
  vy: number
}

export default function StarCatcher({ onBack }: { onBack: () => void }) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('star-catcher')
  const config = getStarCatcherStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const caughtRef = useRef(0)
  const spawnRef = useRef(0)
  const idRef = useRef(0)
  const doneRef = useRef(false)
  const [score, setScore] = useState(0)

  const reset = useCallback(() => {
    starsRef.current = []
    particlesRef.current = []
    caughtRef.current = 0
    doneRef.current = false
    setScore(0)
  }, [])

  useEffect(() => reset(), [stageIndex, reset])

  useCanvasLoop(canvasRef, (ctx, size, dt, time) => {
    if (!size.width) return
    const g = ctx.createLinearGradient(0, 0, 0, size.height)
    g.addColorStop(0, '#1A237E')
    g.addColorStop(1, '#3949AB')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size.width, size.height)
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 97) % size.width)
      const sy = ((i * 53 + time * 20) % size.height)
      ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 5) * 0.1})`
      ctx.fillRect(sx, sy, 2, 2)
    }

    if (!doneRef.current && !stageComplete) {
      spawnRef.current += dt * 1000
      if (spawnRef.current >= config.spawnMs && starsRef.current.length < config.maxOnScreen) {
        spawnRef.current = 0
        starsRef.current.push({
          id: idRef.current++,
          x: 30 + Math.random() * (size.width - 60),
          y: -20,
          size: 18 + Math.random() * 10,
          rot: Math.random() * Math.PI,
          vy: config.fallSpeed * 45,
        })
      }
      for (const s of starsRef.current) {
        s.y += s.vy * dt
        s.rot += dt * 2
      }
      starsRef.current = starsRef.current.filter((s) => s.y < size.height + 30)
    }

    updateParticles(particlesRef.current, dt)
    for (const s of starsRef.current) drawStar(ctx, s.x, s.y, s.size, s.rot)
    drawParticles(ctx, particlesRef.current)

    ctx.font = '48px serif'
    ctx.textAlign = 'center'
    ctx.fillText('🧺', size.width / 2, size.height - 24)
  })

  const onTap = (cx: number, cy: number) => {
    const canvas = canvasRef.current
    if (!canvas || doneRef.current) return
    const rect = canvas.getBoundingClientRect()
    const x = cx - rect.left
    const y = cy - rect.top
    for (const s of [...starsRef.current].reverse()) {
      if (hitCircle(x, y, s.x, s.y, s.size + 8)) {
        starsRef.current = starsRef.current.filter((st) => st.id !== s.id)
        spawnBurst(particlesRef.current, s.x, s.y, 10, 48, 4)
        const next = caughtRef.current + 1
        caughtRef.current = next
        setScore(next)
        celebrate('light')
        if (next >= config.target) {
          doneRef.current = true
          celebrate('full')
          finishStage()
        }
        break
      }
    }
  }

  return (
    <FunGameShell
      title="Star Catcher"
      emoji="⭐"
      score={score}
      subtitle={`${score}/${config.target}`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => { replayStage(); reset() }}
      onBack={onBack}
      scene="night"
      fullViewport
    >
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={(e) => onTap(e.clientX, e.clientY)} />
    </FunGameShell>
  )
}
