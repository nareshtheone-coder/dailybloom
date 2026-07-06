export const AD_CONFIG = {
  enabled: import.meta.env.VITE_ADS_ENABLED === 'true',
  bannerSlotId: import.meta.env.VITE_AD_BANNER_SLOT || 'demo-banner',
  interstitialSlotId: import.meta.env.VITE_AD_INTERSTITIAL_SLOT || 'demo-interstitial',
  interstitialMinIntervalMs: 90000, // 90 seconds between interstitials
  gamesBetweenInterstitials: 3,
} as const

export const isAdDemoMode =
  !AD_CONFIG.enabled ||
  AD_CONFIG.bannerSlotId === 'demo-banner' ||
  AD_CONFIG.interstitialSlotId === 'demo-interstitial'
