import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const PWA_MANIFEST = {
  name: 'DailyBloom — Free Learning Games for Kids 2–6',
  short_name: 'DailyBloom',
  description:
    '31 free educational games for ages 2–6. ABCs, phonics, maths/math, colours/colors, sight words. Install on phone, tablet & PC. Works offline. For US, UK & India families.',
  lang: 'en',
  dir: 'ltr' as const,
  theme_color: '#FF6B9D',
  background_color: '#ffffff',
  display: 'standalone' as const,
  scope: '/',
  start_url: '/',
  orientation: 'portrait-primary' as const,
  categories: ['education', 'games', 'kids'],
  icons: [
    {
      src: '/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/icon-maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any',
    },
  ],
  screenshots: [],
  related_applications: [],
  prefer_related_applications: false,
}

function injectSeoPlugin() {
  return {
    name: 'dailybloom-inject-seo',
    transformIndexHtml(html: string) {
      const fragmentPath = resolve(__dirname, 'public/seo-head.fragment.html')
      if (!existsSync(fragmentPath)) {
        console.warn('[seo] Run npm run generate-seo before build')
        return html
      }
      const fragment = readFileSync(fragmentPath, 'utf-8')
      return html.replace('<!-- SEO_INJECT -->', fragment)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    injectSeoPlugin(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'icon.svg',
        'icon-192.svg',
        'icon-512.svg',
        'apple-touch-icon.png',
        'icon-192x192.png',
        'icon-512x512.png',
        'icon-maskable.png',
        'robots.txt',
        'sitemap.xml',
        'llms.txt',
        'discover.html',
      ],
      manifest: PWA_MANIFEST,
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,txt,xml}',
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/discover\.html$/],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
