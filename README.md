# Jifuno 🇰🇪
### Learn. Play. Level Up.
#### Gamified Kenyan Competency-Based Education (CBE / CBC) Learning Platform

Jifuno is a gamified educational learning platform designed for Kenyan primary learners (Grades 3–6) and the Kenyan Competency-Based Education (CBE) curriculum, combining Duolingo-style game mechanics with authentic Kenyan real-world context and Socratic AI tutoring.

---

## Phase 1 Components & Game-UX Architecture

### 1. New Components & Props

| Component | Path | Key Props | Description |
| :--- | :--- | :--- | :--- |
| `AnimatedCounter` | `src/components/common/AnimatedCounter.tsx` | `value: number`, `prefix?: string`, `suffix?: string`, `badgeColor?: string` | Smooth GPU-accelerated count-up animation for XP, coins, and levels, with ascending floating `+delta` pill animation. Instant fallback when reduced motion is enabled. |
| `HeartHUD` | `src/components/common/HeartHUD.tsx` | `hearts: number`, `maxHearts?: number`, `onOpenOutOfHearts?: () => void`, `onQuickPractice?: () => void` | Heart indicator with cracked shake animation on loss, refill countdown timer (`+1 in 14:59`), and popover quick-practice shortcut. |
| `OutOfHeartsModal` | `src/components/common/OutOfHeartsModal.tsx` | `isOpen: boolean`, `onClose: () => void`, `onQuickPractice: () => void`, `onOpenShop: () => void`, `coins: number` | Warm, child-friendly modal without shaming. Offers free practice to earn a heart back, Dukani coin refill, or a short rest. |
| `StreakFlame` | `src/components/common/StreakFlame.tsx` | `streakDays: number`, `streakFrozen?: boolean` | GPU-animated flicker flame with visual tiers (Tier 1: 1–2d, Tier 2: 3–6d, Tier 3: 7–29d, Tier 4: 30–99d, Tier 5: 100+d) and interactive 7-day week calendar popover. |
| `CelebrationModal` | `src/components/common/CelebrationModal.tsx` | `isOpen: boolean`, `onClose: () => void`, `xpEarned: number`, `coinsEarned: number`, `currentXp: number`, `nextLevelXp?: number`, `currentLevel: number`, `leveledUp?: boolean` | Celebratory modal triggered on quest completion and level-up. Emits canvas confetti in Kenyan colors (green, gold, red), breaks down rewards, and displays the next level goal progress bar. |
| `HeroQuestCard` | `src/components/student/HeroQuestCard.tsx` | `mission: Mission`, `onStartMission: (id) => void`, `currentStep?: number`, `totalSteps?: number` | Illustrated Kenyan open-air market scene (canopy stalls, mango/sukuma baskets, Mount Kenya skyline), stepped progress bar (`Step 3 of 5 • 60% Complete`), estimated time badge (`⏱️ About 5 min`), and pulsating shimmer CTA. |
| `DashboardSkeleton` | `src/components/common/SkeletonLoader.tsx` | *None* | Subtle shimmering skeleton placeholder for fast perceived loading states. |

### 2. Motion Preferences & Accessibility Utility

- **Path**: `src/utils/motion.ts`
- **Functions**:
  - `useReducedMotionPreference()`: React hook checking system `prefers-reduced-motion` and in-app override.
  - `setReducedMotionPreference(boolean)`: In-app toggle persisted to `localStorage ('jifuno_reduce_motion')`.
  - `springTransition`: Typed GPU spring animation configuration that gracefully collapses to `{ duration: 0 }` when reduced motion is active.

### 3. Dependencies Added

- `canvas-confetti` + `@types/canvas-confetti`: Ultra-lightweight canvas particle library (~6 KB gzipped) used for zero-asset confetti celebration bursts without heavy video or image files.

### 4. Performance & Bundle Size Impact

- **Production JS Chunk**: ~140 KB gzipped total.
- **Production CSS Chunk**: ~17 KB gzipped total.
- **Audio Assets**: 0 KB (100% generated via native Web Audio API synthesis in `src/utils/soundEffects.ts`).
- **GPU Friendliness**: All animations strictly bound to `transform` and `opacity` with hardware acceleration.

### 5. How to Swap in Final Lottie / Rive / Sound Assets

- **Lottie / Rive Mascot Art**: In Phase 2, placeholder SVG/CSS animated avatars in `src/utils/avatars.ts` and `src/components/mascot/Rafiki.tsx` can be swapped by replacing the render block with `@lottiefiles/react-lottie-player` or `@rive-app/react-canvas` referencing `.json` or `.riv` assets in `public/assets/`.
- **Sound Effects**: In `src/utils/soundEffects.ts`, each method (`playCorrect`, `playIncorrect`, `playLevelUp`, `playCoin`, `playClick`) can either retain the synthesized Web Audio oscillators or load custom lightweight `.mp3`/`.ogg` audio clips via `new Audio('/assets/sounds/correct.mp3').play()`.

---

## Quick Start (Local)

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run E2E Automated Tests**:
   ```bash
   npm test
   ```
3. **Start Development / Production Server**:
   ```bash
   npm start
   ```
4. Access Jifuno at `http://localhost:3000`.
