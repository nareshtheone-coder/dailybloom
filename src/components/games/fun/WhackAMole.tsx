import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getWhackAMoleStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop } from '../../../engine/canvas/useCanvasLoop'
import { drawMole } from '../../../engine/canvas/draw'
import { spawnBurst, updateParticles, drawParticles } from '../../../engine/canvas/particles'
import type { Particle } from '../../../engine/canvas/types'

interface MoleSlot {
  x: number
  y: number
  pop: number
  up: boolean
  timer: number
}

export default function WhackAMole({ onBack }: { onBack: () => void }) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('whack-a-mole')
  const config = getWhackAMoleStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const molesRef = useRef<MoleSlot[]>([])
  const particlesRef = useRef<Particle[]>([])
  const scoreRef = useRef(0)
  const timeRef = useRef(config.durationSec)
  const popTimerRef = useRef(0)
  const activeHoleRef = useRef(-1)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(config.durationSec)

  const layoutMoles = useCallback((w: number, h: number) => {
    const cols = config.holes <= 4 ? 2 : 3
    const rows = Math.ceil(config.holes / cols)
    const slots: MoleSlot[] = []
    for (let i = 0; i < config.holes; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      slots.push({
        x: (col + 0.5) * (w / cols),
        y: (row + 0.55) * (h / (rows + 0.3)),
        pop: 0,
        up: false,
        timer: 0,
      })
    }
    molesRef.current = slots
  }, [config.holes])

  const reset = useCallback(() => {
    particlesRef.current = []
    scoreRef.current = 0
    timeRef.current = config.durationSec
    popTimerRef.current = 0
    activeHoleRef.current = -1
    setScore(0)
    setTimeLeft(config.durationSec)
  }, [config.durationSec])

  useEffect(() => reset(), [stageIndex, reset])

  const whack = (hole: number) => {
    const m = molesRef.current[hole]
    if (!m?.up || stageComplete) return
    m.up = false
    m.pop = 0
    activeHoleRef.current = -1
    spawnBurst(particlesRef.current, m.x, m.y - 20, 12, 30, 5)
    const next = scoreRef.current + 1
    scoreRef.current = next
    setScore(next)
    celebrate('light')
    if (next >= config.targetScore) {
      celebrate('full')
      finishStage()
    }
  }

  const onPointer = (cx: number, cy: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = cx - rect.left
    const y = cy - rect.top
    molesRef.current.forEach((m, i) => {
      const dx = x - m.x
      const dy = y - (m.y - 20)
      if (dx * dx + dy * dy < 55 * 55) whack(i)
    })
  }

  useCanvasLoop(canvasRef, (ctx, size, dt) => {
    if (!size.width) return
    const g = ctx.createLinearGradient(0, 0, 0, size.height)
    g.addColorStop(0, '#81C784')
    g.addColorStop(1, '#388E3C')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size.width, size.height)

    if (molesRef.current.length !== config.holes) layoutMoles(size.width, size.height)

    if (!stageComplete && scoreRef.current < config.targetScore) {
      timeRef.current -= dt
      if (timeRef.current <= 0) timeRef.current = 0
      if (Math.floor(timeRef.current) !== timeLeft) setTimeLeft(Math.ceil(timeRef.current))

      popTimerRef.current += dt * 1000
      if (popTimerRef.current >= config.popIntervalMs) {
        popTimerRef.current = 0
        if (activeHoleRef.current >= 0) {
          molesRef.current[activeHoleRef.current].up = false
        }
        activeHoleRef.current = Math.floor(Math.random() * config.holes)
        const m = molesRef.current[activeHoleRef.current]
        m.up = true
        m.timer = config.visibleMs
      }

      for (const m of molesRef.current) {
        if (m.up) {
          m.timer -= dt * 1000
          m.pop = Math.min(1, m.pop + dt * 6)
          if (m.timer <= 0) {
            m.up = false
          }
        } else {
          m.pop = Math.max(0, m.pop - dt * 8)
        }
      }
    }

    updateParticles(particlesRef.current, dt)
    for (const m of molesRef.current) drawMole(ctx, m.x, m.y, 1, m.pop)
    drawParticles(ctx, particlesRef.current)
  })

  return (
    <FunGameShell
      title="Whack-a-Mole"
      emoji="🔨"
      score={score}
      subtitle={`${score}/${config.targetScore} · ${timeLeft}s`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => { replayStage(); reset() }}
      onBack={onBack}
      scene="meadow"
      fullViewport
    >
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={(e) => onPointer(e.clientX, e.clientY)} />
    </FunGameShell>
  )
}
