import { useCallback, useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'dailybloom-pwa-install-dismissed'

function isIosSafari(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua)
  return isIOS && isSafari
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY) === '1') return

    if (isIosSafari()) {
      setShowIosHint(true)
      setVisible(true)
      return
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
    setDeferredPrompt(null)
    setShowIosHint(false)
  }, [])

  const install = useCallback(async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      dismiss()
    }
    setDeferredPrompt(null)
  }, [deferredPrompt, dismiss])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Install DailyBloom"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex w-full max-w-lg items-start gap-3 rounded-2xl border border-white/30 bg-white/95 p-4 text-gray-800 shadow-xl backdrop-blur-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF6B9D] text-2xl text-white">
          🌸
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-gray-900">Install DailyBloom</p>
          {showIosHint ? (
            <p className="mt-1 text-sm leading-snug text-gray-600">
              Tap the Share button{' '}
              <span aria-hidden="true" className="inline-block px-1">
                ⎋
              </span>{' '}
              then choose <strong>Add to Home Screen</strong> for quick access and offline play.
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-600">
              Add DailyBloom to your home screen for faster launches and offline games.
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {!showIosHint && deferredPrompt && (
              <button
                type="button"
                onClick={install}
                className="min-h-0 rounded-xl bg-[#FF6B9D] px-4 py-2 text-sm font-semibold text-white"
              >
                Install
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="min-h-0 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
