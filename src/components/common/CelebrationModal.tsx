import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference } from '../../utils/motion.js';
import { Language, getSavedLanguage } from '../../utils/i18n.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  xpEarned: number;
  coinsEarned: number;
  currentXp: number;
  nextLevelXp?: number;
  currentLevel: number;
  leveledUp?: boolean;
  language?: Language;
}

export const CelebrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title = 'Hongera Sana!',
  subtitle = 'Mission Conquered! You mastered new CBC skills.',
  xpEarned,
  coinsEarned,
  currentXp,
  nextLevelXp = 650,
  currentLevel,
  leveledUp = false,
  language = getSavedLanguage()
}) => {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (isOpen) {
      if (leveledUp) {
        sound.playLevelUp();
      } else {
        sound.playCorrect();
      }

      if (!reducedMotion) {
        // Trigger celebratory canvas confetti in Kenyan colors (Green, Gold, Red)
        try {
          confetti({
            particleCount: leveledUp ? 120 : 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#FFFFFF']
          });
        } catch (_) {}
      }
    }
  }, [isOpen, leveledUp, reducedMotion]);

  if (!isOpen) return null;

  const xpProgress = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));
  const xpNeeded = Math.max(0, nextLevelXp - currentXp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={reducedMotion ? {} : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-slate-900 border-2 border-emerald-400/80 rounded-3xl w-full max-w-md p-6 text-center shadow-2xl space-y-5"
      >
        {/* Mascot / Trophy Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-xl shadow-amber-950/60">
            {leveledUp ? '👑' : '🏆'}
          </div>
          {leveledUp && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg">
              LEVEL UP!
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-black text-white">{title}</h3>
          <p className="text-xs text-emerald-300 font-medium">{subtitle}</p>
        </div>

        {/* Level Up Banner */}
        {leveledUp && (
          <div className="p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/60 rounded-2xl text-xs font-bold text-amber-200">
            🎉 You advanced to <strong className="text-white">Level {currentLevel}</strong>! Keep up the brilliant momentum.
          </div>
        )}

        {/* Reward Pills */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="p-3 bg-emerald-950/70 border border-emerald-700/70 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">XP Earned</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">+{xpEarned} ⚡</span>
          </div>
          <div className="p-3 bg-amber-950/60 border border-amber-700/60 rounded-2xl">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Coins Earned</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">+{coinsEarned} 🪙</span>
          </div>
        </div>

        {/* Next Goal Progress */}
        <div className="bg-slate-950/80 border border-emerald-900/60 rounded-2xl p-4 text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-300">Next Goal: Level {currentLevel + 1}</span>
            <span className="text-emerald-400">{xpNeeded} XP to go</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-emerald-900/60">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-950/80 transition-all cursor-pointer min-h-[56px]"
        >
          {language === 'sw' ? 'ENDELEA' : 'CONTINUE'} ➔
        </button>
      </motion.div>
    </div>
  );
};
