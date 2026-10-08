import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  streakDays: number;
  streakFrozen?: boolean;
}

export function getStreakTier(days: number): {
  tierName: string;
  swahiliTitle: string;
  flameIcon: string;
  badgeClass: string;
  glowColor: string;
} {
  if (days >= 100) {
    return {
      tierName: 'CBE Legend',
      swahiliTitle: 'Gwiji la Elimu',
      flameIcon: '💎',
      badgeClass: 'bg-cyan-950 border-cyan-400 text-cyan-200',
      glowColor: 'rgba(6, 182, 212, 0.4)'
    };
  }
  if (days >= 30) {
    return {
      tierName: 'Mara Pathfinder',
      swahiliTitle: 'Shujaa wa Mfululizo',
      flameIcon: '⚡',
      badgeClass: 'bg-purple-950 border-purple-400 text-purple-200',
      glowColor: 'rgba(168, 85, 247, 0.4)'
    };
  }
  if (days >= 7) {
    return {
      tierName: 'Simba Flame',
      swahiliTitle: 'Moto wa Simba',
      flameIcon: '🔥',
      badgeClass: 'bg-amber-950 border-amber-400 text-amber-200',
      glowColor: 'rgba(251, 191, 36, 0.4)'
    };
  }
  if (days >= 3) {
    return {
      tierName: 'Rising Spark',
      swahiliTitle: 'Cheche Inayowaka',
      flameIcon: '🔥',
      badgeClass: 'bg-orange-950 border-orange-400 text-orange-200',
      glowColor: 'rgba(249, 115, 22, 0.3)'
    };
  }
  return {
    tierName: 'Safari Starter',
    swahiliTitle: 'Mwanzo wa Safari',
    flameIcon: '🔥',
    badgeClass: 'bg-amber-950/60 border-amber-600/50 text-amber-300',
    glowColor: 'rgba(245, 158, 11, 0.2)'
  };
}

export const StreakFlame: React.FC<Props> = ({ streakDays, streakFrozen = false }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const tier = getStreakTier(streakDays);

  const daysOfWeek = [
    { label: 'M', name: 'Mon', completed: streakDays >= 5 },
    { label: 'T', name: 'Tue', completed: streakDays >= 4 },
    { label: 'W', name: 'Wed', completed: streakDays >= 3 },
    { label: 'T', name: 'Thu', completed: streakDays >= 2 },
    { label: 'F', name: 'Fri', completed: streakDays >= 1 },
    { label: 'S', name: 'Sat', completed: false },
    { label: 'S', name: 'Sun', completed: false }
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          setShowCalendar(prev => !prev);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all text-xs font-black cursor-pointer ${tier.badgeClass}`}
        aria-label={`${streakDays} day streak`}
      >
        {/* Animated flickering flame */}
        <motion.span
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1, 1.15, 0.95, 1.08, 1],
                  rotate: [0, -3, 3, -1, 0]
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="inline-block text-sm"
        >
          {tier.flameIcon}
        </motion.span>

        <span>{streakDays} Day Streak</span>

        {streakFrozen && <span title="Streak Freeze Active">🛡️</span>}
      </button>

      {/* Week Calendar Popover */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 z-50 w-72 p-4 bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  {tier.swahiliTitle}
                </span>
                <h4 className="text-sm font-black text-white flex items-center gap-1">
                  <span>{tier.flameIcon}</span>
                  <span>{streakDays} Days on Fire!</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* 7-day week calendar row */}
            <div className="grid grid-cols-7 gap-1.5 pt-1 text-center">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-400">{day.label}</span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black border transition-all ${
                      day.completed
                        ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-md shadow-amber-950/60'
                        : 'bg-slate-950 border-slate-800 text-gray-600'
                    }`}
                  >
                    {day.completed ? '🔥' : '·'}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-300 leading-snug">
              Complete at least 1 CBC quest each day to keep your flame blazing and earn weekly bonus coins!
            </p>

            {streakFrozen ? (
              <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-400/50 text-[11px] text-cyan-200 font-bold flex items-center gap-2">
                <span>🛡️</span>
                <span>Streak Freeze equipped for tomorrow!</span>
              </div>
            ) : (
              <div className="text-[10px] text-amber-400/80 font-medium text-center">
                Tip: Equip a Streak Freeze in Dukani to protect your streak!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
