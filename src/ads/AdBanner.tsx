import { useEffect } from 'react'
import { AD_CONFIG, isAdDemoMode } from '../config/ads'

export interface AdBannerProps {
  className?: string
  onDismiss?: () => void
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdBanner({ className = '', onDismiss }: AdBannerProps) {
  useEffect(() => {
    if (!AD_CONFIG.enabled || isAdDemoMode) {
      return
    }

    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense may be unavailable in dev or offline
    }
  }, [])

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-40 flex max-h-[50px] items-center justify-center border-t border-white/20 bg-white/95 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] ${className}`}
      role="complementary"
      aria-label="Support DailyBloom"
    >
      {AD_CONFIG.enabled && !isAdDemoMode ? (
        <div
          id="dailybloom-ad-banner"
          className="adsbygoogle h-full w-full max-h-[50px] overflow-hidden"
          data-ad-slot={AD_CONFIG.bannerSlotId}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-purple-200/80 via-pink-200/80 to-blue-200/80 px-10">
          <p className="truncate text-xs font-medium text-purple-900/80 md:text-sm">
            Support DailyBloom
          </p>
        </div>
      )}

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-1 top-1/2 flex h-8 w-8 min-h-0 min-w-0 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-purple-700 shadow-sm transition-colors hover:bg-white"
          aria-label="Dismiss banner"
        >
          ×
        </button>
      )}
    </aside>
  )
}
