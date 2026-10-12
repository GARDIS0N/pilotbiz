import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { StreakFlame } from '../common/StreakFlame.js';

import { JifunoLogo } from '../common/JifunoLogo.js';

interface Props {
  student: StudentProfile;
  onOpenShop?: () => void;
  onOpenPractice?: () => void;
  language?: 'en' | 'sw';
}

type ExplainerMetric = 'STREAK' | 'HEARTS' | null;

export const TopGameHUD: React.FC<Props> = ({
  student,
  onOpenShop,
  onOpenPractice,
  language = 'en'
}) => {
  const [activeExplainer, setActiveExplainer] = useState<ExplainerMetric>(null);

  const handleMetricClick = (metric: ExplainerMetric) => {
    sound.playClick();
    setActiveExplainer(activeExplainer === metric ? null : metric);
  };

  return (
    <>
      {/* Top Strip HUD (Logo, Streak & Hearts Only - Nothing Else) */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-emerald-900/60 px-3 sm:px-6 py-2.5 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Jifuno Logo (Left) */}
          <div className="flex items-center gap-2 select-none shrink-0">
            <JifunoLogo size="sm" />
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-white">Jifuno</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30 hidden xs:inline-block">
                CBC
              </span>
            </div>
          </div>

          {/* Stats: Streak with Small Daily Goal Ring + Hearts HUD (Right) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Streak Flame + Daily Goal Ring */}
            <button
              type="button"
              onClick={() => handleMetricClick('STREAK')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-950/40 border border-amber-600/50 hover:border-amber-400 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group active:scale-95"
              aria-label={`Streak: ${student.streakDays} days. Daily goal: 70%. Tap for info.`}
            >
              <StreakFlame streakDays={student.streakDays} streakFrozen={student.streakFrozen} />
              <span className="text-xs sm:text-sm font-black text-amber-400 group-hover:text-amber-300">
                {student.streakDays}
              </span>

              {/* Small Circular Progress Ring for Daily Goal (Hidden as a small ring beside streak) */}
              <div className="relative w-5 h-5 shrink-0 ml-0.5" title="Daily Goal: 70%">
                <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400 transition-all duration-700"
                    strokeDasharray="70, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </button>

            {/* Hearts Energy */}
            <button
              type="button"
              onClick={() => handleMetricClick('HEARTS')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 group active:scale-95 ${
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
          </div>
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
                      {language === 'sw' ? 'Mfululizo wa Masomo' : 'Daily Practice Streak'}
                    </p>
                  </div>

                  {/* Daily Goal Mini Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-black text-xs">
                        70%
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {language === 'sw' ? 'Lengo la Kila Siku' : 'Daily Goal'}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {language === 'sw' ? 'Dakika 7 kati ya 10 zimekamilika' : '7 of 10 minutes completed'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      {language === 'sw' ? 'Dakika 3 zimesalia' : '3 min left'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {language === 'sw'
                      ? 'Fanya mazoezi kila siku ili kudumisha mwali wako wa mfululizo. Kamilisha angalau somo moja kila siku!'
                      : 'Practise every day to keep your streak flame burning strong! Complete at least one quest daily to stay sharp.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveExplainer(null)}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-md min-h-[48px]"
                  >
                    {language === 'sw' ? 'ENDELEA NA MAZOEZI' : 'KEEP IT GOING ➔'}
                  </button>
                </>
              )}

              {activeExplainer === 'HEARTS' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-4xl shadow-lg">
                    ❤️
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {student.hearts} / {student.maxHearts} {language === 'sw' ? 'Mioyo Imesalia' : 'Hearts Remaining'}
                    </h3>
                    <p className="text-xs text-rose-400 font-bold uppercase tracking-wider mt-0.5">
                      {language === 'sw' ? 'Nishati ya Kujifunza' : 'Learning Energy'}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {language === 'sw'
                      ? 'Mioyo inakupa nguvu ya kufanya masomo. Ukipoteza moyo, fanya zoezi la haraka au tembelea Dukani kujaza tena!'
                      : 'Hearts give you energy to play lessons. If you run low, do a quick review practice round to refill or visit Dukani!'}
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    {onOpenPractice && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveExplainer(null);
                          onOpenPractice();
                        }}
                        className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 min-h-[48px]"
                      >
                        <span>{language === 'sw' ? 'FANYA MAZOEZI KUJAZA MIOYO' : 'PRACTICE TO REFILL HEARTS'}</span>
                        <span>🎯</span>
                      </button>
                    )}
                    {onOpenShop && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveExplainer(null);
                          onOpenShop();
                        }}
                        className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-yellow-400 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>{language === 'sw' ? 'TEMBELEA DUKANI' : 'VISIT DUKANI'}</span>
                        <span>🏬</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveExplainer(null)}
                      className="w-full py-2.5 rounded-2xl bg-transparent hover:bg-slate-800 text-gray-400 hover:text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      {language === 'sw' ? 'FUNGA' : 'CLOSE'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
