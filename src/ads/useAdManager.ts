import { useCallback, useEffect, useRef, useState } from 'react'
import { AD_CONFIG } from '../config/ads'

export type AdPlacement = 'menu' | 'game' | 'other'

export interface AdManagerState {
  placement: AdPlacement
  setPlacement: (placement: AdPlacement) => void
  shouldShowBanner: boolean
  bannerDismissed: boolean
  dismissBanner: () => void
  isInterstitialOpen: boolean
  closeInterstitial: () => void
  trackGameCompleted: () => void
  loadAdScript: () => void
  isDocumentHidden: boolean
  prefersReducedMotion: boolean
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

function useDocumentHidden(): boolean {
  const [isDocumentHidden, setIsDocumentHidden] = useState(() =>
    typeof document !== 'undefined' ? document.hidden : false,
  )

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isDocumentHidden
}

let adScriptRequested = false

export function loadAdScript(): void {
  if (!AD_CONFIG.enabled || adScriptRequested || typeof document === 'undefined') {
    return
  }

  const clientId = import.meta.env.VITE_AD_CLIENT
  if (!clientId) {
    return
  }

  if (document.getElementById('dailybloom-adsense-script')) {
    adScriptRequested = true
    return
  }

  const script = document.createElement('script')
  script.id = 'dailybloom-adsense-script'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
  document.head.appendChild(script)
  adScriptRequested = true
}

export function useAdManagerState(): AdManagerState {
  const [placement, setPlacement] = useState<AdPlacement>('other')
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false)
  const gamesCompletedRef = useRef(0)
  const lastInterstitialAtRef = useRef(0)

  const isDocumentHidden = useDocumentHidden()
  const prefersReducedMotion = usePrefersReducedMotion()

  const shouldShowBanner =
    placement === 'menu' && !bannerDismissed && !isDocumentHidden

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true)
  }, [])

  const closeInterstitial = useCallback(() => {
    setIsInterstitialOpen(false)
  }, [])

  const trackGameCompleted = useCallback(() => {
    if (isDocumentHidden) {
      return
    }

    gamesCompletedRef.current += 1
    const now = Date.now()
    const elapsed = now - lastInterstitialAtRef.current
    const shouldShow =
      gamesCompletedRef.current >= AD_CONFIG.gamesBetweenInterstitials &&
      (lastInterstitialAtRef.current === 0 ||
        elapsed >= AD_CONFIG.interstitialMinIntervalMs)

    if (shouldShow) {
      lastInterstitialAtRef.current = now
      gamesCompletedRef.current = 0
      setIsInterstitialOpen(true)
    }
  }, [isDocumentHidden])

  useEffect(() => {
    if (AD_CONFIG.enabled) {
      loadAdScript()
    }
  }, [])

  useEffect(() => {
    if (isDocumentHidden && isInterstitialOpen) {
      setIsInterstitialOpen(false)
    }
  }, [isDocumentHidden, isInterstitialOpen])

  return {
    placement,
    setPlacement,
    shouldShowBanner,
    bannerDismissed,
    dismissBanner,
    isInterstitialOpen,
    closeInterstitial,
    trackGameCompleted,
    loadAdScript,
    isDocumentHidden,
    prefersReducedMotion,
  }
}
