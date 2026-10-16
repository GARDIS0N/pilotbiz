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

---

## Duolingo-Style Onboarding Architecture

Jifuno implements a **value first, commitment second, account last** onboarding flow designed specifically for Kenyan children aged 8–12 on shared or entry-level Android smartphones with patchy connectivity. A child enters an interactive CBC lesson within ~60 seconds of opening the application, without encountering an upfront email or password wall.

### The 9-Step Sequence

```
[1. Welcome] ➔ [2. Grade] ➔ [3. Interests] ➔ [4. Level Check] ➔ [5. First Lesson] ➔ [6. Daily Goal] ➔ [7. Save Progress] ➔ [8. Parent Step] ➔ [9. Home Path]
```

1. **Welcome (`WELCOME`)**:
   - Mascot greeting from **Rafiki the Owl** (`🦉`).
   - Value statement: *"Learn Kenya's CBC curriculum through fun games and daily quests!"* (*"Jifunze masomo ya CBC ya Kenya kwa michezo na changamoto!"*).
   - Single large green action: `[ START LEARNING / ANZA SAFARI ➔ ]` (min 56px touch target).
   - Zero upfront sign-in wall. Secondary link for returning learners: *"Already have an account? Log in"*.
2. **Grade Picker (`GRADE`)**:
   - Large tappable cards for **Grade 3**, **Grade 4**, **Grade 5**, and **Grade 6** with age ranges and KICD strand previews.
   - Tap selects grade, persists to local storage, and advances immediately.
3. **Interest Picker (`INTERESTS`)**:
   - Child-friendly subject options (select 1–3):
     - 🔢 **Numbers & Puzzles** (*Hesabu na Mafumbo* / Mathematics)
     - 📖 **Stories & Words** (*Hadithi na Maneno* / English)
     - 🇰🇪 **Kiswahili Fasaha** (*Lugha yetu ya Kiswahili*)
     - 🔬 **Science & Discovery** (*Sayansi na Ugunduzi* / Science & Tech)
     - 🌍 **Our Community** (*Jamii Yetu* / Social Studies & Agriculture)
   - The top interest personalizes the Level Check and First Lesson.
4. **Quick Level Check (`LEVEL_CHECK`)**:
   - 3–4 foundational questions from the learner's chosen grade and top subject.
   - Questions prioritized for high confidence (*"nearly impossible to fail"*) to deliver an instant "I can do this!" feeling.
   - Prominent skip link: *"Skip level check / Ruka"*.
5. **First Lesson (`FIRST_LESSON`)**:
   - Short, real CBC curriculum lesson (5 questions) corresponding to the chosen grade & top interest.
   - Immediate feedback, sound effects via native Web Audio API synthesis, and celebration modal.
   - Awards XP (⚡ +25) and Coins (🪙 +10), creating the memorable "aha" moment.
6. **Daily Goal & Streak Start (`DAILY_GOAL`)**:
   - Child selects their daily commitment:
     - 🟢 **Easy (Rahisi)** — 5 min / day (25 XP)
     - 🟡 **Regular (Kawaida)** — 10 min / day (50 XP)
     - 🔴 **Serious (Makini)** — 15 min / day (80 XP)
   - Introduces the **Streak Flame 🔥** concept and starts the streak at Day 1 immediately after the lesson.
7. **Save Progress Prompt (`SAVE_PROGRESS`)**:
   - Delayed sign-up prompt shown only after real value has been experienced:
     - *"You earned 25 XP and started a 1-day streak! Ask a parent or guardian to help save your account."*
   - Fully skippable:
     - Primary: `[ SAVE WITH PARENT ➔ ]`
     - Secondary: `[ Later (Explore as Guest) / Baadaye ]`
8. **Parent / Guardian Step (`PARENT_STEP`)**:
   - Single clean screen with transparent, honest wording (COPPA & Kenya Data Protection Act 2019 compliant):
     - Child's First Name / Nickname (no full personal names requested from the child).
     - Parent Kenyan Phone Number (`07xx`, `01xx`, or `+254...`).
     - Simple 4-digit Parent PIN (convenient for shared family mobile devices).
     - Parent consent checkbox.
     - Clear privacy statement: *"Zero ads. Minimum data. Progress only."*
   - Seamlessly merges all guest XP, coins, streak, and completed quests into the profile with zero data loss.
9. **Home (`HOME`)**:
   - Lands on the student learning path (`LearningPathView`) with the next quest highlighted.

---

## Configuration & Experimentation (`src/config/`)

### 1. Step Order & Copy Configuration (`src/config/onboardingConfig.ts`)
The entire flow is powered by an experiment-ready configuration array:
- `id`: Step identifier (`WELCOME`, `GRADE`, `INTERESTS`, `LEVEL_CHECK`, `FIRST_LESSON`, `DAILY_GOAL`, `SAVE_PROGRESS`, `PARENT_STEP`, `HOME`).
- `enabled`: Toggle step on/off for A/B testing.
- `skippable`: Whether the step displays a skip link.
- `allowBack`: Enables top back arrow `←`.
- `title` & `subtitle`: Dual English and Swahili copy.

To test placing the Daily Goal before the First Lesson, simply change the array ordering in `src/config/onboardingConfig.ts` without modifying React components.

### 2. Progressive Feature Disclosure (`src/config/progressiveUnlock.ts`)
To prevent sensory overload for young learners on Day 1, non-essential features are progressively unlocked:
- **Day 1**: Only **Learn** (`LEARN`) and **Profile** (`ME`) are unlocked.
- **Day 2+ or 2 Quests Completed**: **Practice Hub** (`PRACTICE`) unlocks.
- **Day 2+ or 3 Quests Completed**: **Dukani Shop** (`SHOP`) unlocks.
- **Day 3+ or 5 Quests Completed**: **Leaderboards** unlock.
- Locked tabs display a subtle lock badge (`🔒`) and show a friendly requirement notice when tapped.

---

## Analytics Telemetry & Derived Metrics (`src/services/analytics.ts`)

The analytics dispatcher is offline-first, persisting events into `localStorage ('jifuno_analytics_events')` and streaming to `/api/analytics` when an internet connection is present.

### Instrumented Events

| Event Name | Trigger Point | Payload Properties |
| :--- | :--- | :--- |
| `onboarding_started` | Child taps "Start Learning" on Welcome screen | `anonymousUserId` |
| `grade_selected` | Child selects Grade 3, 4, 5, or 6 | `gradeId` |
| `interests_selected` | Child confirms 1–3 subject interests | `interests: string[]`, `topInterest: string` |
| `level_check_completed` | Child completes or skips level check | `score: number`, `total: number`, `skipped: boolean` |
| `first_lesson_started` | Lesson modal opens for the first quest | `questId`, `gradeId`, `topInterest` |
| `first_lesson_completed` | Child completes the 5-question lesson | `questId`, `earnedXp`, `earnedCoins`, `durationSeconds` |
| `daily_goal_set` | Child selects 5, 10, or 15 minutes/day | `dailyGoalMinutes: number` |
| `save_progress_shown` | Delayed sign-up prompt is displayed | `streakDays`, `xp` |
| `save_progress_completed` | Parent registers phone & 4-digit PIN | `hasPhone: boolean`, `hasPin: boolean` |
| `save_progress_skipped` | Child taps "Later / Explore as Guest" | `step: 'SAVE_PROGRESS'` |
| `onboarding_abandoned` | User closes window/tab before completing flow | `step: string`, `gradeId: string` |

### Derived Metrics (Computed via `deriveOnboardingMetrics()`)
- **Time to First Completed Lesson**: Computed from `first_lesson_completed.epochMs - onboarding_started.epochMs` in seconds. Target: `< 180s`.
- **Onboarding Completion Rate**: `(completedOnboarding / totalStarted) * 100`.
- **Drop-Off per Step**: Histogram of drop-off counts by step name (`dropOffCounts[stepName]`).
- **Day-1 Return Rate**: Derivable by comparing returning user timestamps against `guestProgress.startedAt`.

---

## QA Test Checklist

Use this checklist to verify the onboarding experience across different device and network conditions:

- [ ] **1. Fresh Install / First Launch**:
  - Open app with clean storage (`localStorage.clear()`, `sessionStorage.clear()`).
  - Verify app immediately loads the **Welcome** screen with Rafiki mascot (`🦉`) and no sign-in gate.
  - Verify tapping *"Start Learning"* navigates to Grade Picker.
- [ ] **2. Quit Mid-Flow and Resume**:
  - Progress to the **Interest Picker** or **Level Check** step.
  - Refresh or close and reopen the browser.
  - Verify app resumes at the exact step without asking previously saved answers.
- [ ] **3. Skip Sign-Up Prompt (Guest Mode)**:
  - Complete the first lesson and reach the **Save Your Progress** screen.
  - Tap *"Later (Explore as Guest)"*.
  - Verify learner lands on the **Home Path** with the first quest marked completed, streak set to 1, and 25 XP awarded.
- [ ] **4. Guest-to-Account Merge**:
  - In the parent step, enter a child nickname (e.g. *"Amina"*), Kenyan phone number (`0712345678`), and 4-digit PIN (`1234`).
  - Submit the form.
  - Verify the newly created profile retains all 25 XP, 10 coins, and 1-day streak.
  - Verify subsequent visits bypass onboarding directly to the student dashboard.
- [ ] **5. Offline Start**:
  - Disable network (Chrome DevTools: *Offline* mode).
  - Open the application.
  - Verify all 9 steps, curriculum questions, and audio sound effects function smoothly without network latency.
- [ ] **6. Progressive Disclosure**:
  - On Day 1 with 1 completed lesson, verify only **Learn** and **Me** tabs are active.
  - Verify tapping **Dukani** or **Practice** displays the locked milestone notice (*"Complete 2 quests to unlock!"*).

