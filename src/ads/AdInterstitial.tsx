import { useEffect, useState } from 'react'
import { AD_CONFIG, isAdDemoMode } from '../config/ads'
import { useAdManager } from './AdManagerProvider'

export interface AdInterstitialProps {
  isOpen: boolean
  onClose: () => void
}

const COUNTDOWN_SECONDS = 3

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdInterstitial({ isOpen, onClose }: AdInterstitialProps) {
  const { prefersReducedMotion } = useAdManager()
  const [secondsRemaining, setSecondsRemaining] = useState(COUNTDOWN_SECONDS)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(COUNTDOWN_SECONDS)
      setCanClose(false)
      return
    }

    if (prefersReducedMotion) {
      setCanClose(true)
      setSecondsRemaining(0)
      return
    }

    setSecondsRemaining(COUNTDOWN_SECONDS)
    setCanClose(false)

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId)
          setCanClose(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isOpen, prefersReducedMotion])

  useEffect(() => {
    if (!isOpen || !AD_CONFIG.enabled || isAdDemoMode) {
      return
    }

    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense may be unavailable in dev or offline
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Between games message"
    >
      <div className="relative flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-2xl transition-opacity duration-200">
        {AD_CONFIG.enabled && !isAdDemoMode ? (
          <div
            id="dailybloom-ad-interstitial"
            className="adsbygoogle min-h-[120px] w-full"
            data-ad-slot={AD_CONFIG.interstitialSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-4 py-8 text-center">
            <p className="text-3xl">💛</p>
            <p className="text-xl font-bold text-purple-800">Thanks for playing!</p>
          </div>
        )}

        {!canClose ? (
          <p className="text-sm font-medium text-gray-600" aria-live="polite">
            Continue in {secondsRemaining}...
          </p>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg ${
              prefersReducedMotion ? '' : 'transition-transform hover:scale-105 active:scale-95'
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
