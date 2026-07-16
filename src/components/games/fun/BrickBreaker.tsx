import { useState, useEffect, useRef } from 'react'
import { celebrate } from '../../../utils/celebrations'
import { getBrickBreakerStage, FUN_STAGE_COUNT } from '../../../data/funGameStages'
import { useFunGameStages } from '../../../hooks/useFunGameStages'
import FunGameShell from './FunGameShell'

interface BrickBreakerProps {
  onBack: () => void
}

export default function BrickBreaker({ onBack }: BrickBreakerProps) {
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useFunGameStages('brick-breaker')
  const config = getBrickBreakerStage(stageIndex)

  const [paddle, setPaddle] = useState(50)
  const [ball, setBall] = useState({ x: 50, y: 70, dx: config.ballSpeed, dy: -config.ballSpeed })
  const [bricks, setBricks] = useState(() =>
    Array.from({ length: config.count }, (_, i) => ({ id: i, alive: true })),
  )
  const [score, setScore] = useState(0)
  const areaRef = useRef<HTMLDivElement>(null)
  const finishedRef = useRef(false)

  useEffect(() => {
    finishedRef.current = false
    setPaddle(50)
    setBall({ x: 50, y: 70, dx: config.ballSpeed, dy: -config.ballSpeed })
    setBricks(Array.from({ length: config.count }, (_, i) => ({ id: i, alive: true })))
    setScore(0)
  }, [stageIndex, config.count, config.ballSpeed])

  useEffect(() => {
    if (stageComplete) return
    const loop = setInterval(() => {
      setBall((b) => {
        let { x, y, dx, dy } = b
        x += dx
        y += dy
        if (x <= 5 || x >= 95) dx *= -1
        if (y <= 10) dy *= -1
        if (y >= 85) {
          if (Math.abs(x - paddle) < 12) {
            dy = -Math.abs(dy)
            celebrate('light')
          } else {
            return { x: 50, y: 70, dx: config.ballSpeed, dy: -config.ballSpeed }
          }
        }
        const brickTop = 8
        const brickRowH = 10
        if (y < brickTop + config.rows * brickRowH) {
          const col = Math.min(config.cols - 1, Math.floor((x / 100) * config.cols))
          const row = Math.min(config.rows - 1, Math.floor((y - brickTop) / brickRowH))
          const idx = row * config.cols + col
          setBricks((prev) => {
            if (prev[idx]?.alive) {
              const next = [...prev]
              next[idx] = { ...next[idx], alive: false }
              setScore((s) => s + 1)
              celebrate('light')
              return next
            }
            return prev
          })
          dy = Math.abs(dy)
        }
        return { x, y, dx, dy }
      })
    }, 40)
    return () => clearInterval(loop)
  }, [paddle, stageComplete, config])

  const alive = bricks.filter((b) => b.alive).length
  useEffect(() => {
    if (alive === 0 && !finishedRef.current && !stageComplete) {
      finishedRef.current = true
      celebrate('full')
      finishStage()
    }
  }, [alive, finishStage, stageComplete])

  return (
    <FunGameShell
      title="Brick Breaker"
      emoji="🧱"
      score={score}
      subtitle={`${config.count - alive}/${config.count} bricks`}
      stageIndex={stageIndex}
      totalStages={FUN_STAGE_COUNT}
      stageLabel={config.label}
      stageComplete={stageComplete}
      allComplete={allComplete}
      onNextStage={nextStage}
      onReplayStage={() => {
        replayStage()
        finishedRef.current = false
        setPaddle(50)
        setBall({ x: 50, y: 70, dx: config.ballSpeed, dy: -config.ballSpeed })
        setBricks(Array.from({ length: config.count }, (_, i) => ({ id: i, alive: true })))
        setScore(0)
      }}
      onBack={onBack}
      gradient="from-slate-600 to-indigo-700"
    >
      <div
        ref={areaRef}
        className="relative w-full max-w-lg h-80 bg-black/30 rounded-xl border-4 border-white/20 touch-none"
        onPointerMove={(e) => {
          const rect = areaRef.current?.getBoundingClientRect()
          if (!rect) return
          setPaddle(((e.clientX - rect.left) / rect.width) * 100)
        }}
        onTouchMove={(e) => {
          const rect = areaRef.current?.getBoundingClientRect()
          if (!rect || !e.touches[0]) return
          setPaddle(((e.touches[0].clientX - rect.left) / rect.width) * 100)
        }}
      >
        {bricks.map((b, i) => {
          if (!b.alive) return null
          const row = Math.floor(i / config.cols)
          const col = i % config.cols
          const colW = 100 / config.cols
          return (
            <div
              key={b.id}
              className="absolute h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded"
              style={{ left: `${col * colW + 1}%`, top: `${row * 10 + 8}%`, width: `${colW - 2}%` }}
            />
          )
        })}
        <div className="absolute w-4 h-4 bg-white rounded-full" style={{ left: `${ball.x}%`, top: `${ball.y}%` }} />
        <div className="absolute w-20 h-3 bg-yellow-400 rounded-full bottom-4" style={{ left: `${paddle - 10}%` }} />
      </div>
    </FunGameShell>
  )
}
