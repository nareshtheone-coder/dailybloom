import { useEffect, useRef, useCallback } from 'react'
import type { CanvasSize } from './types'

export function useCanvasLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onFrame: (ctx: CanvasRenderingContext2D, size: CanvasSize, dt: number, time: number) => void,
  active = true,
) {
  const sizeRef = useRef<CanvasSize>({ width: 0, height: 0, dpr: 1 })
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = parent.clientWidth
    const height = parent.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    sizeRef.current = { width, height, dpr }
  }, [canvasRef])

  useEffect(() => {
    resize()
    const ro = new ResizeObserver(resize)
    const parent = canvasRef.current?.parentElement
    if (parent) ro.observe(parent)
    return () => ro.disconnect()
  }, [resize, canvasRef])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let last = performance.now()
    let time = 0

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt
      onFrameRef.current(ctx, sizeRef.current, dt, time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, canvasRef])

  return { resize }
}

export function hitCircle(px: number, py: number, cx: number, cy: number, r: number) {
  const dx = px - cx
  const dy = py - cy
  return dx * dx + dy * dy <= r * r
}
