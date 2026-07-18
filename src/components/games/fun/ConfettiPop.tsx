import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getConfettiStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop } from '../../../engine/canvas/useCanvasLoop'
import { spawnBurst, updateParticles, drawParticles } from '../../../engine/canvas/particles'
import type { Particle } from '../../../engine/canvas/types'

export default function ConfettiPop({ onBack }: { onBack: () => void }) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('confetti-pop')
  const config = getConfettiStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const popsRef = useRef(0)
  const cannonY = useRef(0)
  const [pops, setPops] = useState(0)

  const reset = useCallback(() => {
    particlesRef.current = []
    popsRef.current = 0
    setPops(0)
  }, [])

  useEffect(() => reset(), [stageIndex, reset])

  const fire = (w: number, h: number) => {
    if (stageComplete) return
    const cx = w / 2
    const cy = h * 0.75
    for (let i = 0; i < 24; i++) {
      spawnBurst(particlesRef.current, cx, cy, 1, Math.random() * 360, 6 + Math.random() * 4)
    }
  }

  useCanvasLoop(canvasRef, (ctx, size, dt, time) => {
    if (!size.width) return
    cannonY.current = size.height * 0.75
    const g = ctx.createLinearGradient(0, 0, 0, size.height)
    g.addColorStop(0, '#F48FB1')
    g.addColorStop(1, '#E91E63')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size.width, size.height)

    updateParticles(particlesRef.current, dt)
    drawParticles(ctx, particlesRef.current)

    // cannon
    ctx.fillStyle = '#455A64'
    ctx.fillRect(size.width / 2 - 50, cannonY.current - 20, 100, 40)
    ctx.beginPath()
    ctx.arc(size.width / 2, cannonY.current - 30, 28, 0, Math.PI * 2)
    ctx.fill()
    ctx.font = '40px serif'
    ctx.textAlign = 'center'
    ctx.fillText('🎉', size.width / 2, cannonY.current - 22 + Math.sin(time * 8) * 3)
  })

  const onTap = () => {
    const canvas = canvasRef.current
    if (!canvas || stageComplete) return
    fire(canvas.clientWidth, canvas.clientHeight)
    const next = popsRef.current + 1
    popsRef.current = next
    setPops(next)
    celebrate('light')
    if (next >= config.popsNeeded) {
      celebrate('full')
      finishStage()
    }
  }

  return (
    <FunGameShell
      title="Confetti Cannon"
      emoji="🎊"
      score={pops}
      subtitle={`${pops}/${config.popsNeeded} blasts`}
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
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={onTap} />
    </FunGameShell>
  )
}
