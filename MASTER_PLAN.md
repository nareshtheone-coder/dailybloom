# DailyBloom — Master Completion Plan

## Vision
A production-ready **PWA** for kids 2–6: installable on phone/tablet/desktop, works offline, 31 playable games, full alphabet coverage by age, and **non-intrusive ad slots** for revenue.

---

## Current Gaps (Audit)

### Critical bugs
- [ ] **Routing mismatch**: `GameMenu` passes kebab-case IDs (`tap-game`) but `App.tsx` expects camelCase (`tap`) — most games don't load
- [ ] **4 placeholder routes** reuse wrong components (AisForPuzzle, StoryPuzzle, SightWordRace, PatternRush)
- [ ] **PWA icons missing** — manifest references `icon-192x192.png` etc. that don't exist in `/public`
- [ ] **Duplicate SW** — manual `service-worker.js` + `vite-plugin-pwa` may conflict

### Missing game components (9)
| ID | Age | Component needed |
|----|-----|------------------|
| `pattern-match` | 3-4 | PatternMatch.tsx |
| `animal-sounds` | 3-4 | AnimalSounds.tsx |
| `rhyming-words` | 4-5 | RhymingWords.tsx |
| `number-counting-10` | 4-5 | CountToTen.tsx |
| `spelling-words` | 5-6 | SpellingGame.tsx |
| `number-sequence` | 5-6 | NumberSequence.tsx |
| `sight-words` | 5-6 | SightWords.tsx |
| `simple-sentences` | 5-6 | SentenceBuilder.tsx |
| `ais-for-puzzle` | 2-3 | AisForPuzzle.tsx (dedicated, not LetterPainter) |

### Placeholder games needing real implementations (3)
| ID | Age | Component needed |
|----|-----|------------------|
| `story-puzzle` | 5-6 | StoryPuzzle.tsx |
| `sight-word-race` | 5-6 | SightWordRace.tsx |
| `pattern-rush` | 5-6 | PatternRush.tsx |

### Partial alphabet / thin content
| Data | Current | Target |
|------|---------|--------|
| PAINTABLE_LETTERS / POP | A–E | A–E (OK for 2-3) |
| EARLY_PUZZLES | A, B, C | A–F |
| RACING_LETTERS_4_5 | A–M | A–M (OK) |
| FALLING_LETTERS | A–J | A–M |
| SIMPLE_WORDS | 8 | 20+ |
| PUZZLE_WORDS | 5 | 15+ |
| SIGHT_WORDS | 20 | 40+ |
| SIMPLE_SENTENCES | 4 | 10+ |
| STORY_PUZZLES | 4 | 10+ |

---

## Architecture Changes

### 1. Central Game Registry (`src/core/gameRegistry.tsx`)
Single source of truth mapping `gamesLibrary` IDs → React components.

```ts
// gamesLibrary id → lazy component
'tap-game' → TapGame
'color-match' → ColorMatch
...
```

`App.tsx` becomes thin: `const Game = GAME_REGISTRY[currentGameId]`.

### 2. Shared Game Shell (`src/components/GameShell.tsx`)
Consistent header (back, title, score), safe-area padding, ad-free gameplay zone.

### 3. Ad System (`src/ads/`)
- **Never during gameplay** — only menu + post-game transitions
- **Frequency cap** — max 1 interstitial per 3 games completed
- **Banner** — small fixed bottom on menu only (collapsible)
- **Config** — `VITE_ADS_ENABLED`, slot IDs via env
- **COPPA note** — contextual ads only; no behavioral tracking in kids mode
- **Placeholder mode** — styled "Ad" slots for dev until AdSense IDs added

### 4. PWA Hardening
- Generate SVG-based icons (192, 512, maskable, apple-touch)
- `vite-plugin-pwa` as sole SW source (remove duplicate manual SW)
- Install prompt component (beforeinstallprompt)
- Offline badge when `navigator.onLine === false`
- `viewport-fit=cover` + safe-area CSS
- Screenshots for install UI (optional SVG placeholders)

---

## Workstreams (Parallel)

| Stream | Owner | Files | Deliverable |
|--------|-------|-------|-------------|
| **A** | Agent: Core Router | `gameRegistry.tsx`, `App.tsx`, `GameShell.tsx` | All 31 games routable |
| **B** | Agent: Younger Games | PatternMatch, AnimalSounds, AisForPuzzle, CountToTen | 4 new components |
| **C** | Agent: Older Games | RhymingWords, SpellingGame, NumberSequence, SightWords, SentenceBuilder, StoryPuzzle, SightWordRace, PatternRush | 8 new components |
| **D** | Agent: PWA | icons, InstallPrompt, vite config, CSS safe areas | Installable everywhere |
| **E** | Agent: Ads | AdBanner, AdInterstitial, useAdManager, config | Revenue slots, UX-safe |
| **F** | Agent: Content | `gamesLibrary.ts` expansion | Full data coverage |

---

## Ad UX Rules (Non-Negotiable)

1. **Zero ads inside active game screens**
2. Banner ad: bottom of GameMenu only, max 50px, dismissible
3. Interstitial: only after game completion, min 90s between shows
4. No autoplay video/audio ads
5. Parent settings toggle (behind simple math gate): "Support DailyBloom"
6. `prefers-reduced-motion` respected for ad animations

---

## PWA Checklist

- [ ] Valid manifest with real icons
- [ ] Service worker caches all assets (workbox)
- [ ] Install prompt on supported browsers
- [ ] Works offline after first visit
- [ ] Portrait + landscape on tablet
- [ ] Touch targets ≥ 60px (already in CSS)
- [ ] Apple meta tags (already partial)
- [ ] Lighthouse PWA score target: 90+

---

## Success Criteria

- [ ] All 31 menu items open the correct game
- [ ] `npm run build` passes with no errors
- [ ] PWA installable on Chrome mobile + Safari iOS + desktop
- [ ] Offline play works after first load
- [ ] Ad slots visible in dev mode on menu + post-game only
- [ ] No placeholder components remain

---

## Implementation Order

```
Phase 1 (parallel):  A + B + C + D + E + F
Phase 2 (integrate): Wire registry, test all routes, fix lint/build
Phase 3 (polish):    E2E smoke test, README update, PR
```
