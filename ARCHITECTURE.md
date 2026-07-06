# DailyBloom Architecture & Development Guide

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  App.tsx (Main Router)              │
│  - Age group state management                       │
│  - Game routing logic                               │
│  - Back navigation handling                         │
└────────────┬────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────────┐  ┌────▼──────────┐
│AgeSelector │  │GameMenu        │
│(Screen 1)  │  │(Age-filtered)  │
└────────────┘  └────┬───────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
  ┌─────▼──────┐         ┌────────▼────────┐
  │Age 2-3     │         │Age 4-5+         │
  │Games x4    │         │Games x5-10      │
  └─────┬──────┘         └────────┬────────┘
        │                         │
   ┌────▼────┐         ┌──────────▼─────────┐
   │ Basic   │         │Educational        │
   │Games    │         │Games               │
   └─────────┘         └────────────────────┘
```

## File Structure

### Core Components

```
src/
├── App.tsx
│   └── Main entry point with game routing
│       - Manages ageGroup state
│       - Handles game transitions
│       - Implements back button logic
│
├── components/
│   ├── AgeSelector.tsx
│   │   └── Age group selection screen
│   │       - 4 age group buttons (2-3, 3-4, 4-5, 5-6)
│   │       - Navigation to GameMenu
│   │
│   ├── GameMenu.tsx
│   │   └── Age-aware game menu
│   │       - Dynamic game grid (varies by age)
│   │       - Game descriptions & learning goals
│   │       - Change age button
│   │
│   └── games/ (13 game components)
│       ├── TapGame.tsx (Age 2-3)
│       ├── ColorMatch.tsx (Age 2-3)
│       ├── ShapeSort.tsx (Age 2-3)
│       ├── SoundExplorer.tsx (Age 2-3)
│       │
│       ├── NumberRecognition.tsx (Age 3-4) - Scales to 10 max
│       ├── CountingGame.tsx (Age 3-4) - Scales to 10 max
│       │ (PatternMatch.tsx - Reserved for future)
│       │ (AnimalSounds.tsx - Reserved for future)
│       │
│       ├── AlphabetSounds.tsx (Age 4-5 & 5-6)
│       │   └── Param: ageGroup determines A-M (4-5) or A-Z (5-6)
│       ├── AlphabetObjects.tsx (Age 4-5 & 5-6)
│       ├── SimpleWords.tsx (Age 4-5)
│       │ (RhymingWords.tsx - Reserved for future)
│       │
│       ├── FullAlphabet.tsx (Age 5-6 - Future)
│       ├── SpellingGame.tsx (Age 5-6 - Future)
│       ├── NumberSequence.tsx (Age 5-6 - Future)
│       ├── SightWords.tsx (Age 5-6 - Future)
│       └── SentenceBuilder.tsx (Age 5-6 - Future)
│
├── data/
│   └── gamesLibrary.ts
│       ├── GAMES_LIBRARY object
│       │   ├── age_2_3: 4 games
│       │   ├── age_3_4: 4 games
│       │   ├── age_4_5: 5 games
│       │   └── age_5_6: 5 games
│       │
│       ├── ALPHABET_DATA: 26 letters
│       │   └── Each: letter, words[], emoji, sound
│       │
│       ├── NUMBER_DATA: 1-10
│       ├── SIMPLE_WORDS: 8 words
│       ├── SIGHT_WORDS: 20 words
│       └── SIMPLE_SENTENCES: 4 templates
│
├── utils/
│   └── celebrations.ts
│       ├── playConfetti(count)
│       ├── playCelebrationSound(type)
│       ├── showCelebrationText(text)
│       ├── celebrate(intensity)
│       └── addCelebrationStyles()
│
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

## Data Flow

### Game Rendering Flow

```
User Selects Age Group
        │
        ▼
AgeSelector updates ageGroup state
        │
        ▼
Navigate to GameMenu
        │
        ▼
GameMenu filters GAMES_LIBRARY[`age_${ageGroup}`]
        │
        ▼
Display 4-5 game buttons
        │
        ▼
User selects game
        │
        ▼
App.tsx sets currentGame to game.id
        │
        ▼
renderGame() switch statement loads correct component
        │
        ▼
Game component mounts with onBack handler
```

### Answer Validation Flow

```
User interacts with game (taps, selects, etc.)
        │
        ▼
Check if answer is correct
        │
    ┌───┴───┐
    │       │
 YES│       │NO
    │       │
    ▼       ▼
celebrate() Show error/retry
    │       
    ├──▶ playCelebrationSound()
    ├──▶ showCelebrationText()
    └──▶ playConfetti()
         │
         ▼
     Score incremented
         │
         ▼
  Next round/level loaded
         │
         ▼
  Or game completed → Full celebration
```

---

## State Management Pattern

### App-level State
```typescript
const [currentGame, setCurrentGame] = useState<GameType>('ageSelector')
const [ageGroup, setAgeGroup] = useState<AgeGroup>('2-3')

// App controls:
// - Navigation between menus and games
// - Age group selection
// - Back button logic
```

### Game-level State
Each game component manages:
```typescript
// Common game patterns:
const [currentIndex, setCurrentIndex] = useState(0)      // Current level/letter
const [score, setScore] = useState(0)                    // Points earned
const [selected, setSelected] = useState(false)          // Animation state
const [selectedLetters, setSelectedLetters] = useState([])  // User input

// Effects:
useEffect(() => {
  addCelebrationStyles()  // Initialize celebration system once
}, [])
```

---

## Component Communication

### Parent to Child
```
App.tsx
  ├─ onBack prop: (() => void) - return to menu
  ├─ ageGroup prop: AgeGroup - affects max difficulty
  └─ onSelectGame prop: (id: string) => void - select game
```

### Child to Parent (Via Callbacks)
```
Game Component
  └─ onBack() ──────────▶ setCurrentGame('menu')
  
GameMenu
  └─ onSelectGame(id) ──▶ setCurrentGame(id)
  
AgeSelector
  └─ onSelectAge(age) ──▶ setAgeGroup(age) + setCurrentGame('menu')
```

---

## Adding New Games

### Step 1: Create Game Component
```typescript
// src/components/games/NewGame.tsx
interface NewGameProps {
  onBack: () => void
  ageGroup?: AgeGroup  // If needed
}

export default function NewGame({ onBack, ageGroup }: NewGameProps) {
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    addCelebrationStyles()
  }, [])
  
  // Game logic here
  
  return (
    <div className="w-full h-full bg-gradient-to-br ...">
      {/* Game UI */}
    </div>
  )
}
```

### Step 2: Add to Games Library
```typescript
// src/data/gamesLibrary.ts
age_5_6: [
  ...existing games,
  {
    id: 'new-game-id',
    name: 'Game Name',
    emoji: '🎮',
    color: 'from-blue-400 to-blue-500',
    description: 'What kids do',
    learningGoal: 'What they learn',
  }
]
```

### Step 3: Add to App Router
```typescript
// src/App.tsx
type GameType = '...' | 'newGameId'

case 'newGameId':
  return <NewGame onBack={() => setCurrentGame('menu')} ageGroup={ageGroup} />
```

---

## Celebration System

### How It Works

1. **Initialization** (on game load)
   ```typescript
   useEffect(() => {
     addCelebrationStyles()  // Inject CSS animations
   }, [])
   ```

2. **When Answer Correct**
   ```typescript
   celebrate('medium')  // or 'light' or 'full'
   ```

3. **What Happens**
   - Sound plays (synthesized via Web Audio API)
   - Message appears with animation (celebrationPop)
   - Confetti falls from top (fall animation)

4. **Sound Generation by Type**
   - **light**: Single 800Hz bell (0.5s)
   - **medium**: Ascending notes C-E-G (0.4s each)
   - **full**: Fanfare with 5 ascending notes (0.3s each)

---

## Responsive Design System

### Breakpoints (Tailwind)
- **Mobile**: < 768px (base)
- **Tablet**: 768px+ (md:)
- **Desktop**: 1024px+ (lg:)

### Key Adjustments
```
Component      Mobile    Tablet     Desktop
─────────────────────────────────────────────
Button text    text-lg   text-xl    text-2xl
Button size    w-24      w-28       w-32
Button padding p-4       p-6        p-8
Grid cols      grid-cols-2    grid-cols-3    grid-cols-4
Font sizes     Proportionally larger on mobile for touch
```

---

## Performance Optimizations

### Current
- ✓ Component-level code splitting (each game is separate)
- ✓ Effect cleanup (no memory leaks)
- ✓ Lazy loading via dynamic import potential
- ✓ Service worker caching

### Potential Improvements
- [ ] React.memo for non-changing components
- [ ] useCallback for event handlers
- [ ] Dynamic imports for games
- [ ] Image optimization (SVG instead of emojis?)
- [ ] Confetti particle optimization (reduce count on slow devices)

---

## Testing Checklist

### Before Deployment

- [ ] Age selector works (all 4 ages)
- [ ] Games appear correctly for each age
- [ ] Back button returns to menu
- [ ] Change age button works
- [ ] All games score correctly
- [ ] Celebrations trigger on success
- [ ] Confetti doesn't crash on old devices
- [ ] Sounds play without errors
- [ ] PWA installs on mobile & desktop
- [ ] Works offline after install
- [ ] Responsive on 5" phone to 27" monitor
- [ ] Touch works on tablets
- [ ] Mouse works on desktop
- [ ] No console errors
- [ ] TypeScript compiles cleanly

---

## Deployment

### Build
```bash
npm run build
```

### Output
- `dist/index.html` - Main page
- `dist/assets/*.js` - JavaScript bundles (React, Tailwind, games)
- `dist/assets/*.css` - Compiled styles
- `dist/sw.js` - Service worker
- `dist/manifest.webmanifest` - PWA manifest

### Host Options
- Vercel (recommended for Next.js, but works with Vite)
- Netlify
- GitHub Pages
- Any static host (Firebase, AWS S3, etc.)

### Key Files for PWA
- `manifest.json` in dist/
- `sw.js` service worker
- HTTPS required for production

---

## Browser Compatibility

### Required Features
- ES2020+ JavaScript
- CSS Grid & Flexbox
- Web Audio API (for sounds)
- Service Workers (for PWA)
- Local Storage (optional, not currently used)

### Tested On
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Samsung Internet 14+ ✓
- Opera 76+ ✓

---

## Accessibility (A11y) Implementation

### Touch Targets
```css
button {
  min-width: 60px;
  min-height: 60px;
  padding: 1rem;
}
```

### Focus Styles
```css
button:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}
```

### Color Contrast
- Primary text on colored backgrounds: 4.5:1+ ratio
- All buttons: high contrast with backgrounds
- Emoji support across browsers

### Keyboard Support
- Tab navigation through all buttons
- Enter to activate
- Escape to go back (future enhancement)

---

## Troubleshooting

### Sound not playing?
- Check browser Audio Context permissions
- Some browsers mute autoplay
- Sound requires user interaction first

### Confetti not showing?
- Old browser may not support animations
- High-end animation might be performance issue
- Check CSS animations are injected

### Game not loading?
- Check browser console for errors
- Verify game ID matches case-sensitively
- Clear cache and rebuild

### PWA not installing?
- Requires HTTPS (except localhost)
- Check manifest.json is valid
- Ensure service worker registered

---

## Future Roadmap

### Phase 2 (v1.1)
- [ ] Pattern matching game
- [ ] More animal sounds
- [ ] Rhyming words game
- [ ] Full alphabet for 5-6

### Phase 3 (v1.2)
- [ ] Parent progress dashboard
- [ ] Daily challenges
- [ ] Achievement badges
- [ ] Multilingual support

### Phase 4 (v2.0)
- [ ] Math games (addition, subtraction)
- [ ] Reading comprehension
- [ ] Letter writing/tracing
- [ ] Customizable difficulty
- [ ] Analytics (no personal data)

---

**Last Updated**: 2026-07-06  
**Maintainer**: DailyBloom Team
