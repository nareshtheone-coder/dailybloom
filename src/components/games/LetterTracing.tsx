import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { celebrate } from '../../utils/celebrations'
import { LETTER_STAGES } from '../../data/contentStages'
import { getLetterTraceDef } from '../../data/letterTracePaths'
import { useStagedGame } from '../../hooks/useStagedGame'
import { useCanvasLoop } from '../../engine/canvas/useCanvasLoop'
import {
  createTraceState,
  processTraceInput,
  toNorm,
  type TraceState,
} from '../../engine/tracing/traceEngine'
import { drawTracingScene, drawLetterCompleteBurst } from '../../engine/tracing/traceRenderer'
import { spawnBurst, updateParticles, drawParticles } from '../../engine/canvas/particles'
import type { Particle } from '../../engine/canvas/types'
import AnimatedScene from '../../ui/AnimatedScene'
import PremiumHUD from '../../ui/PremiumHUD'
import GameViewport from '../../ui/GameViewport'
import StageCompleteOverlay from '../StageCompleteOverlay'

interface LetterTracingProps {
  onBack: () => void
}

function speakLetter(letter: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(letter)
  u.rate = 0.75
  u.pitch = 1.15
  window.speechSynthesis.speak(u)
}

export default function LetterTracing({ onBack }: LetterTracingProps) {
  const totalStages = LETTER_STAGES.length
  const { stageIndex, stageComplete, allComplete, finishStage, nextStage, replayStage } =
    useStagedGame('letter-tracing', totalStages)

  const stageMeta = LETTER_STAGES[stageIndex]
  const letters = stageMeta.items

  const [letterIndex, setLetterIndex] = useState(0)
  const [traceState, setTraceState] = useState<TraceState>(createTraceState)
  const [burstTime, setBurstTime] = useState<number | null>(null)
  const [showWordReveal, setShowWordReveal] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const traceRef = useRef<TraceState>(createTraceState())
  const particlesRef = useRef<Particle[]>([])
  const drawingRef = useRef(false)
  const burstRef = useRef<number | null>(null)
  const completingRef = useRef(false)
  const letterDef = getLetterTraceDef(letters[letterIndex]?.letter ?? 'A')

  const resetLetter = useCallback(() => {
    const fresh = createTraceState()
    traceRef.current = fresh
    setTraceState(fresh)
    burstRef.current = null
    completingRef.current = false
    setBurstTime(null)
    setShowWordReveal(false)
  }, [])

  useEffect(() => {
    setLetterIndex(0)
    resetLetter()
  }, [stageIndex, resetLetter])

  useEffect(() => {
    resetLetter()
    speakLetter(letterDef.letter)
  }, [letterIndex, letterDef.letter, resetLetter])

  const onLetterComplete = useCallback(() => {
    if (completingRef.current) return
    completingRef.current = true
    celebrate('medium')
    setShowWordReveal(true)
    burstRef.current = 0
    setBurstTime(0)
    const canvas = canvasRef.current
    if (canvas) {
      spawnBurst(particlesRef.current, canvas.clientWidth / 2, canvas.clientHeight / 2, 30, letterDef.hue, 7)
    }
    setTimeout(() => {
      setShowWordReveal(false)
      if (letterIndex < letters.length - 1) {
        setLetterIndex((i) => i + 1)
      } else {
        celebrate('full')
        finishStage()
      }
    }, 1400)
  }, [letterIndex, letters.length, letterDef.hue, finishStage])

  useEffect(() => {
    if (traceState.done && !stageComplete) {
      onLetterComplete()
    }
  }, [traceState.done, stageComplete, onLetterComplete])

  useCanvasLoop(
    canvasRef,
    (ctx, size, dt, time) => {
      if (size.width === 0) return

      if (burstRef.current !== null) {
        burstRef.current += dt
        setBurstTime(burstRef.current)
      }

      drawTracingScene(
        ctx,
        size.width,
        size.height,
        time,
        letterDef.letter,
        letterDef.strokes,
        traceRef.current,
        letterDef.hue,
        letterDef.emoji,
        letterDef.word,
      )

      updateParticles(particlesRef.current, dt)
      drawParticles(ctx, particlesRef.current)

      if (burstRef.current !== null && burstRef.current < 1.2) {
        drawLetterCompleteBurst(ctx, size.width, size.height, burstRef.current, letterDef.letter, letterDef.hue)
      }
    },
    !stageComplete,
  )

  const handlePointer = (clientX: number, clientY: number, down: boolean) => {
    if (stageComplete || traceRef.current.done || burstRef.current !== null) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const px = clientX - rect.left
    const py = clientY - rect.top
    const cardSize = Math.min(rect.width, rect.height) * 0.72
    const cx = rect.width / 2
    const cy = rect.height * 0.48
    const norm = toNorm(px, py, cx, cy, cardSize)
    const tolerance = Math.max(12, cardSize * 0.045)

    if (down) drawingRef.current = true
    if (!drawingRef.current) return

    const prevStroke = traceRef.current.strokeIndex
    const next = processTraceInput(traceRef.current, letterDef.strokes, norm, tolerance)
    if (next.strokeIndex > prevStroke && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30)
    }
    traceRef.current = next
    setTraceState({ ...next })
  }

  return (
    <AnimatedScene variant="sky" className="flex flex-col">
      <PremiumHUD
        title="Magic Letter Trace"
        emoji="✏️"
        stageIndex={stageIndex}
        totalStages={totalStages}
        stageLabel={stageMeta.label}
        extra={`Letter ${letterIndex + 1}/${letters.length}`}
        onBack={onBack}
      />
      <GameViewport>
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            handlePointer(e.clientX, e.clientY, true)
          }}
          onPointerMove={(e) => handlePointer(e.clientX, e.clientY, true)}
          onPointerUp={() => {
            drawingRef.current = false
            traceRef.current = { ...traceRef.current, trail: [] }
            setTraceState({ ...traceRef.current })
          }}
          onPointerLeave={() => {
            drawingRef.current = false
          }}
        />
      </GameViewport>

      <AnimatePresence>
        {showWordReveal && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 bg-white/95 rounded-3xl px-8 py-4 shadow-2xl border-4 border-yellow-300"
          >
            <p className="font-display text-3xl font-bold text-purple-700 text-center">
              {letterDef.emoji} {letterDef.word}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-white/90 font-semibold text-sm pb-3 drop-shadow">
        {burstTime !== null ? 'Amazing!' : 'Use your finger to follow the glowing path ✨'}
      </p>

      <StageCompleteOverlay
        show={stageComplete}
        stageIndex={stageIndex}
        totalStages={totalStages}
        allDone={allComplete}
        onNext={nextStage}
        onReplay={() => {
          replayStage()
          setLetterIndex(0)
          resetLetter()
        }}
        onBack={onBack}
      />
    </AnimatedScene>
  )
}
