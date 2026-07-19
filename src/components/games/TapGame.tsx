import { useRef, useEffect, useCallback, useState } from 'react'
import PremiumLearningFrame from '../PremiumLearningFrame'
import { useCanvasLoop, hitCircle } from '../../engine/canvas/useCanvasLoop'
import { drawSky } from '../../engine/canvas/draw'
import { spawnBurst, updateParticles, drawParticles } from '../../engine/canvas/particles'
import type { Particle } from '../../engine/canvas/types'

interface TapObj {
  id: number
  x: number
  y: number
  emoji: string
  r: number
  hue: number
}

const EMOJIS = ['🎈', '🌟', '🎀', '🎉', '🎁', '🌸', '🦋', '🍎']

export default function TapGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const objectsRef = useRef<TapObj[]>([])
  const particlesRef = useRef<Particle[]>([])
  const idRef = useRef(0)
  const [score, setScore] = useState(0)

  const spawn = useCallback((w: number, h: number) => {
    objectsRef.current.push({
      id: idRef.current++,
      x: 60 + Math.random() * (w - 120),
      y: 60 + Math.random() * (h - 120),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      r: 36,
      hue: Math.random() * 360,
    })
    if (objectsRef.current.length > 6) objectsRef.current.shift()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      const canvas = canvasRef.current
      if (canvas?.parentElement) {
        for (let i = 0; i < 4; i++) spawn(canvas.clientWidth, canvas.clientHeight)
      }
    }, 100)
    return () => clearTimeout(t)
  }, [spawn])

  useCanvasLoop(canvasRef, (ctx, size, dt, time) => {
    if (!size.width) return
    drawSky(ctx, size.width, size.height, '#CE93D8', '#AB47BC', time)
    updateParticles(particlesRef.current, dt)
    for (const o of objectsRef.current) {
      const bob = Math.sin(time * 2 + o.id) * 6
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.2)'
      ctx.shadowBlur = 12
      ctx.font = `${o.r * 1.4}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(o.emoji, o.x, o.y + bob)
      ctx.restore()
    }
    drawParticles(ctx, particlesRef.current)
  })

  const onTap = (cx: number, cy: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = cx - rect.left
    const y = cy - rect.top
    for (const o of [...objectsRef.current].reverse()) {
      if (hitCircle(x, y, o.x, o.y, o.r)) {
        objectsRef.current = objectsRef.current.filter((obj) => obj.id !== o.id)
        spawnBurst(particlesRef.current, o.x, o.y, 10, o.hue, 4)
        setScore((s) => s + 1)
        spawn(rect.width, rect.height)
        break
      }
    }
  }

  return (
    <PremiumLearningFrame title="Tap Game" emoji="👆" score={score} onBack={onBack} scene="sky">
      <canvas ref={canvasRef} className="w-full h-full touch-none" onPointerDown={(e) => onTap(e.clientX, e.clientY)} />
    </PremiumLearningFrame>
  )
}
