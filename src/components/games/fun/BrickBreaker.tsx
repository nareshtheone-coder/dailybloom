import { useRef, useEffect, useCallback, useState } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getBrickBreakerStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'
import { useCanvasLoop } from '../../../engine/canvas/useCanvasLoop'
import { drawBrick, drawPaddle, drawBall } from '../../../engine/canvas/draw'

export default function BrickBreaker({ onBack }: { onBack: () => void }) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('brick-breaker')
  const config = getBrickBreakerStage(stageIndex)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paddleRef = useRef(0.5)
  const ballRef = useRef({ x: 0.5, y: 0.7, dx: 0.35, dy: -0.35 })
  const bricksRef = useRef<boolean[]>([])
  const scoreRef = useRef(0)
  const doneRef = useRef(false)
  const [score, setScore] = useState(0)

  const init = useCallback(() => {
    bricksRef.current = Array.from({ length: config.count }, () => true)
    paddleRef.current = 0.5
    ballRef.current = { x: 0.5, y: 0.7, dx: config.ballSpeed * 0.4, dy: -config.ballSpeed * 0.4 }
    scoreRef.current = 0
    doneRef.current = false
    setScore(0)
  }, [config])

  useEffect(() => init(), [stageIndex, init])

  useCanvasLoop(canvasRef, (ctx, size) => {
    if (!size.width) return
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, size.width, size.height)

    const pw = size.width * 0.22
    const px = paddleRef.current * size.width
    const py = size.height - 28
    const ball = ballRef.current
    const bx = ball.x * size.width
    const by = ball.y * size.height
    const br = 8

    if (!doneRef.current && !stageComplete) {
      ball.x += ball.dx * 0.016
      ball.y += ball.dy * 0.016
      if (ball.x < 0.05 || ball.x > 0.95) ball.dx *= -1
      if (ball.y < 0.08) ball.dy = Math.abs(ball.dy)
      if (ball.y > 0.92) {
        if (Math.abs(ball.x - paddleRef.current) < 0.12) {
          ball.dy = -Math.abs(ball.dy)
          celebrate('light')
        } else {
          ball.x = 0.5
          ball.y = 0.7
        }
      }

      const cols = config.cols
      const brickW = (size.width - 24) / cols
      const brickH = 28
      const top = 48
      if (ball.y < 0.45) {
        const col = Math.min(cols - 1, Math.max(0, Math.floor((bx - 12) / brickW)))
        const row = Math.min(config.rows - 1, Math.max(0, Math.floor((by - top) / (brickH + 6))))
        const idx = row * cols + col
        if (bricksRef.current[idx]) {
          bricksRef.current[idx] = false
          ball.dy = Math.abs(ball.dy)
          scoreRef.current++
          setScore(scoreRef.current)
          celebrate('light')
          if (bricksRef.current.every((b) => !b)) {
            doneRef.current = true
            celebrate('full')
            finishStage()
          }
        }
      }
    }

    const cols = config.cols
    const brickW = (size.width - 24) / cols
    bricksRef.current.forEach((alive, i) => {
      if (!alive) return
      const row = Math.floor(i / cols)
      const col = i % cols
      drawBrick(ctx, 12 + col * brickW, 48 + row * 34, brickW - 6, 28, 280 + col * 25 + row * 15)
    })
    drawPaddle(ctx, px, py, pw)
    drawBall(ctx, ball.x * size.width, ball.y * size.height, br)
  })

  const onMove = (cx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    paddleRef.current = Math.min(0.88, Math.max(0.12, (cx - rect.left) / rect.width))
  }

  return (
    <FunGameShell
      title="Brick Breaker"
      emoji="🧱"
      score={score}
      subtitle={`${score}/${config.count} bricks`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => { replayStage(); init() }}
      onBack={onBack}
      scene="night"
      fullViewport
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        onPointerMove={(e) => onMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && onMove(e.touches[0].clientX)}
      />
    </FunGameShell>
  )
}
