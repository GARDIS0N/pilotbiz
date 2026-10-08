import React from 'react';
import { motion } from 'motion/react';
import { Mission } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  mission: Mission;
  onStartMission: (missionId: string) => void;
  currentStep?: number;
  totalSteps?: number;
}

export const HeroQuestCard: React.FC<Props> = ({
  mission,
  onStartMission,
  currentStep = 3,
  totalSteps = 5
}) => {
  const reducedMotion = useReducedMotionPreference();
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-400/50 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 p-6 md:p-8 shadow-2xl">
      {/* Background Illustrated Kenyan Market Scene with subtle depth/parallax */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <svg
          viewBox="0 0 800 400"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Warm Kenyan sky sunrise gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="canopyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          <rect width="800" height="400" fill="url(#skyGrad)" />

          {/* Mount Kenya silhouette in distant background */}
          <path d="M480,260 L570,140 L620,190 L680,120 L760,260 Z" fill="#064E3B" opacity="0.4" />

          {/* Market Stalls Canopy (Kongowea / Gikomba Style) */}
          <path
            d="M500,210 Q580,170 660,210 L680,240 L480,240 Z"
            fill="url(#canopyGrad)"
            opacity="0.6"
          />
          {/* Canopy Stripes */}
          <line x1="530" y1="200" x2="520" y2="240" stroke="#FFFFFF" strokeWidth="4" opacity="0.3" />
          <line x1="580" y1="185" x2="580" y2="240" stroke="#FFFFFF" strokeWidth="4" opacity="0.3" />
          <line x1="630" y1="200" x2="640" y2="240" stroke="#FFFFFF" strokeWidth="4" opacity="0.3" />

          {/* Market Fruit Baskets / Kiondo Bags */}
          <ellipse cx="540" cy="260" rx="22" ry="14" fill="#92400E" opacity="0.8" />
          <circle cx="536" cy="254" r="5" fill="#F59E0B" /> {/* Mangoes */}
          <circle cx="544" cy="254" r="5" fill="#EF4444" />
          <circle cx="540" cy="248" r="5" fill="#10B981" />

          <ellipse cx="610" cy="265" rx="28" ry="16" fill="#B45309" opacity="0.8" />
          <circle cx="600" cy="258" r="6" fill="#10B981" /> {/* Sukuma greens */}
          <circle cx="612" cy="258" r="6" fill="#F59E0B" />
          <circle cx="622" cy="260" r="5" fill="#EF4444" />

          {/* Acacias in foreground */}
          <path
            d="M720,270 L720,200 Q700,180 670,185 Q710,165 745,180 Q760,160 780,185 Q750,210 720,200"
            fill="#065F46"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Information Section */}
        <div className="space-y-3 max-w-xl">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
              <span>🌟</span>
              <span>Active CBC Quest</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-700/60">
              <span>⏱️</span>
              <span>About 5 min</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 text-gray-300 text-xs font-medium border border-emerald-900/40">
              <span>📍</span>
              <span>{mission.characterName}’s Mission</span>
            </span>
          </div>

          {/* Quest Title & Story Context */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {mission.title}
            </h3>
            {mission.swahiliTitle && (
              <p className="text-xs text-emerald-300/80 italic mt-0.5">
                {mission.swahiliTitle}
              </p>
            )}
          </div>

          <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
            {mission.storyContext}
          </p>

          {/* Stepped Progress Bar */}
          <div className="pt-1 space-y-1.5 max-w-sm">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-300">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-amber-400">{progressPercent}% Complete</span>
            </div>
            <div className="w-full bg-slate-950/80 rounded-full h-2.5 overflow-hidden border border-emerald-900/80">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Reward Preview */}
          <div className="flex items-center gap-3 text-xs font-bold pt-1">
            <span className="text-gray-400">Quest Reward:</span>
            <span className="text-emerald-300">+{mission.xpReward} XP ⚡</span>
            <span className="text-amber-400">+{mission.coinReward} Coins 🪙</span>
          </div>
        </div>

        {/* Right CTA Button with Shimmer and Pulse */}
        <div className="flex flex-col items-center md:items-end justify-center shrink-0">
          <motion.button
            type="button"
            onClick={() => {
              sound.playClick();
              onStartMission(mission.id);
            }}
            whileHover={reducedMotion ? {} : { scale: 1.04 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-base md:text-lg tracking-wide shadow-xl shadow-amber-950/80 cursor-pointer flex items-center gap-2.5 transition-all"
          >
            {/* Shimmer Sweep Animation */}
            {!reducedMotion && (
              <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            )}

            <span>CONTINUE MISSION</span>
            <span className="group-hover:translate-x-1 transition-transform">🚀</span>
          </motion.button>
          <span className="text-[11px] text-emerald-400/80 font-medium mt-2">
            Pick up right where you left off!
          </span>
        </div>
      </div>
    </div>
  );
};
