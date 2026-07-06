import { useEffect, useState } from 'react'

export default function OfflineIndicator() {
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  )

  useEffect(() => {
    const goOffline = () => setOffline(true)
    const goOnline = () => setOffline(false)

    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  if (!offline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-3 z-50 -translate-x-1/2 rounded-full bg-gray-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
      style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}
    >
      Offline
    </div>
  )
}
