import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { StreakFlame } from '../common/StreakFlame.js';

interface Props {
  student: StudentProfile;
  onOpenShop?: () => void;
  onOpenPractice?: () => void;
}

type ExplainerMetric = 'STREAK' | 'COINS' | 'HEARTS' | 'XP' | null;

export const TopGameHUD: React.FC<Props> = ({
  student,
  onOpenShop,
  onOpenPractice
}) => {
  const [activeExplainer, setActiveExplainer] = useState<ExplainerMetric>(null);

  const handleMetricClick = (metric: ExplainerMetric) => {
    sound.playClick();
    setActiveExplainer(activeExplainer === metric ? null : metric);
  };

  return (
    <>
      {/* Top Strip HUD */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-emerald-900/60 px-3 sm:px-6 py-2.5 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Streak Flame */}
          <button
            type="button"
            onClick={() => handleMetricClick('STREAK')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-amber-950/40 border border-amber-600/50 hover:border-amber-400 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group active:scale-95"
            aria-label={`Streak: ${student.streakDays} days. Tap for info.`}
          >
            <StreakFlame streakDays={student.streakDays} streakFrozen={student.streakFrozen} />
            <span className="text-xs sm:text-sm font-black text-amber-400 group-hover:text-amber-300">
              {student.streakDays}
            </span>
          </button>

          {/* Shilingi Coins */}
          <button
            type="button"
            onClick={() => handleMetricClick('COINS')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-yellow-950/40 border border-yellow-600/50 hover:border-yellow-400 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 group active:scale-95"
            aria-label={`Coins: ${student.coins}. Tap for info.`}
          >
            <span className="text-sm sm:text-base select-none">🪙</span>
            <span className="text-xs sm:text-sm font-black text-yellow-400 group-hover:text-yellow-300">
              {student.coins}
            </span>
          </button>

          {/* Hearts */}
          <button
            type="button"
            onClick={() => handleMetricClick('HEARTS')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 group active:scale-95 ${
              student.hearts <= 1
                ? 'bg-rose-950/60 border-rose-500 animate-pulse'
                : 'bg-rose-950/30 border-rose-700/50 hover:border-rose-400'
            }`}
            aria-label={`Hearts: ${student.hearts} of ${student.maxHearts}. Tap for info.`}
          >
            <span className="text-sm sm:text-base select-none">❤️</span>
            <span className="text-xs sm:text-sm font-black text-rose-400 group-hover:text-rose-300">
              {student.hearts}/{student.maxHearts}
            </span>
          </button>

          {/* XP */}
          <button
            type="button"
            onClick={() => handleMetricClick('XP')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-emerald-950/40 border border-emerald-600/50 hover:border-emerald-400 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group active:scale-95"
            aria-label={`XP: ${student.xp}. Tap for info.`}
          >
            <span className="text-sm sm:text-base select-none">⚡</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 group-hover:text-emerald-300">
              {student.xp}
            </span>
          </button>
        </div>
      </header>

      {/* Explainer Bottom Sheet / Modal */}
      <AnimatePresence>
        {activeExplainer && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setActiveExplainer(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full sm:max-w-md bg-slate-900 border-t sm:border-2 border-emerald-500/50 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            >
              {activeExplainer === 'STREAK' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg">
                    🔥
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {student.streakDays}-Day Learning Streak!
                    </h3>
                    <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                      {student.streakDays > 0 ? 'Mfululizo wa Masomo' : 'Anza Mfululizo'}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Practise every day to keep your streak flame burning strong! Complete at least one quest daily. Protect your streak in Dukani with a Streak Freeze.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveExplainer(null)}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-md min-h-[48px]"
                  >
                    KEEP IT GOING ➔
                  </button>
                </>
              )}

              {activeExplainer === 'COINS' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-4xl shadow-lg">
                    🪙
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {student.coins} Shilingi Coins
                    </h3>
                    <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mt-0.5">
                      Sarafu za Dukani
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Earn coins by answering questions correctly and mastering CBC strands. Spend your coins on lesson hints (1 coin each) or visit Dukani to refill hearts!
                  </p>
                  <div className="flex gap-2">
                    {onOpenShop && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveExplainer(null);
                          onOpenShop();
                        }}
                        className="flex-1 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-md"
                      >
                        ENDA DUKANI 🏬
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveExplainer(null)}
                      className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all cursor-pointer"
                    >
                      SAWA (OK)
                    </button>
                  </div>
                </>
              )}

              {activeExplainer === 'HEARTS' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-4xl shadow-lg">
                    ❤️
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {student.hearts} of {student.maxHearts} Hearts Remaining
                    </h3>
                    <p className="text-xs text-rose-400 font-bold uppercase tracking-wider mt-0.5">
                      Nishati ya Kujifunza
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Hearts give you energy to play lessons. Each wrong answer costs 1 heart. If you run out, do a quick practice round to earn hearts back or refill in Dukani!
                  </p>
                  <div className="flex flex-col gap-2">
                    {onOpenPractice && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveExplainer(null);
                          onOpenPractice();
                        }}
                        className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span>PRACTICE TO EARN HEARTS</span>
                        <span>🎯</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveExplainer(null)}
                      className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      FUNGA (CLOSE)
                    </button>
                  </div>
                </>
              )}

              {activeExplainer === 'XP' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-lg">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {student.xp} Total Experience Points
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mt-0.5">
                      Pointi za Umilisi (Level {student.level})
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    XP shows your progress across all CBC learning areas! Earn XP by completing lessons, daily quests, and topic reviews to level up your savanna rank.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveExplainer(null)}
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-md min-h-[48px]"
                  >
                    LEVEL UP ➔
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
