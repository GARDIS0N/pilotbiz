# MyCloset — Intelligent Digital Wardrobe & AI Stylist

**MyCloset** is a modern, responsive digital wardrobe and AI styling application built with React 19, TypeScript, Vite, Tailwind CSS, and Supabase. It allows users to digitize their actual clothing pieces, curate custom looks on an interactive flatlay canvas, schedule outfits onto a calendar, and receive intelligent daily styling recommendations based on weather, color harmony, and occasion.

---

## 🌟 Key Features

### 1. Curated Fashion Design & UX
- **Luxury Aesthetic**: Clean off-white/cream palette (`#FAF7F2`), rich charcoal typography (`#1C1917`), subtle forest-green accents (`#1E392A`), and gold highlights (`#C2A674`).
- **Responsive Layout**: Dedicated bottom navigation bar on mobile phones and structured sidebar on desktop.
- **Micro-Interactions**: Skeleton loaders, smooth modals, confirmation before deletions, and toast alerts.

### 2. User Accounts & Onboarding
- **Authentication**: Sign up, login, logout, password recovery, and secure sessions via Supabase Auth.
- **Local Persistent Mode**: Operates seamlessly in guest/demo mode without requiring third-party credentials or paid APIs; all data persists in browser IndexedDB.
- **5-Step Onboarding**: Guides new users through name setup, aesthetic styles, frequent occasions, color preferences, and optional starter capsule pre-load.
- **Private Wardrobes**: Full isolation so users only access their own private clothes.

### 3. Digital Wardrobe Management
- **Photography & Uploads**: Upload clothing photos from mobile cameras or desktop files. Uses canvas-based client-side compression for instant loading.
- **Rich Metadata**: Name, category, color, secondary color, brand, size, seasons, occasions, availability status (`clean`, `in_laundry`, `unavailable`), and styling notes.
- **Categorization**: 10 standard fashion categories + support for custom user-created categories.
- **Search & Filtering**: Real-time search, category pill tabs with item count badges, status filter, season filter, sort options (newest, most worn, name), and favorites toggle.
- **Wear Tracking**: Tracks wear counts and last worn dates whenever an outfit is logged.

### 4. Interactive Outfit Creator
- **Flatlay Canvas**: Assemble looks by slotting Tops, Bottoms, Footwear, Outerwear, and Accessories.
- **Real Wardrobe Garments**: Outfits use exclusively real photographed garments from the user's closet.
- **Outfit Metadata**: Name, description, occasion, style, season, and favorite heart toggle.

### 5. Intelligent Outfit Recommendation Engine
- **Algorithmic Styling**: Heuristic engine evaluating color coordination (complementary pairs, neutral anchors, monochrome harmony), silhouette balance, formality level, and weather suitability.
- **Weather Awareness**: Adapts dynamically to conditions (Warm & Sunny, Mild & Breezy, Cool & Crisp, Cold & Rainy, Freezing & Snow). Disallows shorts in winter and mandates outerwear for cold rain.
- **Clean Garment Integrity**: Exclusively selects garments marked `clean` (never recommends laundry items).
- **Custom Filters**: User can specify "Must Wear" pieces or items to avoid.
- **1-Click Actions**: "Wear Today" (schedules into calendar) or "Save as Outfit".

### 6. Outfit Calendar & Schedule
- **Calendar Views**: Interactive month, week, and day views.
- **Schedule Outfits**: Assign any saved outfit to a date with daily agenda notes.
- **Duplicate Prevention**: Detects if an outfit is already assigned to a date and confirms before duplicates.
- **Wear Tracking**: Mark outfits as worn today to update garment wear statistics.
- **Look History**: Archives past looks with date badges.

### 7. Personalized Dashboard
- **Contextual Greeting**: Time-aware greeting (`Good morning`, `Good afternoon`, `Good evening`).
- **Live Wardrobe Stats**: Total garments, clean pieces, laundry count, and saved looks.
- **Today's Look Card**: Instant view of today's scheduled outfit with 1-click worn logging.
- **Featured Recommendation**: Prominent daily recommendation tailored to the user's preferred style.
- **Recent Additions & Favorites**: Quick carousel previews.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Bundler & Build**: Vite 8, Rolldown
- **Styling**: Tailwind CSS 4, Google Fonts (*Playfair Display* & *Plus Jakarta Sans*)
- **Icons**: Lucide React
- **Database & Storage**:
  - **Cloud Mode**: Supabase (PostgreSQL, Row Level Security, Supabase Storage)
  - **Local Mode**: IndexedDB (`idb`) persistent storage adapter with client-side image compression
- **Deployment**: Vercel ready (`vercel.json`)

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

If you do not have Supabase credentials yet, **MyCloset will run automatically in Local Persistent Mode using IndexedDB**. All uploaded photos, garments, outfits, and calendar schedules will persist across browser reloads!

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Run Test Suite
```bash
npm test
```

---

## 🗄️ Supabase Cloud Database Setup

To enable Supabase Cloud synchronization:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20261018000000_mycloset_schema.sql` and run it.
4. Go to **Project Settings > API** and copy your `Project URL` and `anon public` key.
5. Add them to `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
6. Reload the app. The bottom indicator in the sidebar/settings will confirm **Supabase Cloud Synchronized**!

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. In Vercel, click **Add New Project** and select this repository.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will build using `vite build` and serve from `dist/` with full SPA rewrite routing handled by `vercel.json`.
