import React from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { Language, t } from '../../utils/i18n.js';
import { RafikiWavingMascot } from './RafikiWavingMascot.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';

interface Props {
  language: Language;
  onStartPlaying: () => void;
  onTryGuestQuest: () => void;
}

export const WelcomeHero: React.FC<Props> = ({
  language,
  onStartPlaying,
  onTryGuestQuest
}) => {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div className="relative pt-6 pb-8 md:pt-12 md:pb-14 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
      {/* Animated Rafiki Mascot */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reducedMotion ? { duration: 0 } : springTransition}
        className="relative"
      >
        <RafikiWavingMascot size={160} />
      </motion.div>

      {/* Main Headline & Subline */}
      <div className="space-y-3 px-4">
        <motion.h1
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight"
        >
          {language === 'sw' ? 'Jifunze. Cheza. Shinda.' : 'Learn. Play. Level Up.'}
        </motion.h1>

        <motion.p
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl font-bold text-emerald-300 max-w-2xl mx-auto"
        >
          {language === 'sw'
            ? 'Mchezo wa Kujifunzia Mtaala wa Umilisi (CBC) Kenya kwa Darasa la 3–6'
            : 'Kenya’s Gamified CBC Learning Adventure for Grades 3–6'}
        </motion.p>

        <motion.p
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.2 }}
          className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          {language === 'sw'
            ? 'Kuwa mahiri katika Hisabati, Sayansi, Kiswahili, na Kiingereza kupitia hadithi za kusisimua za Kenya, marafiki wa wanyama, na usaidizi wa papo hapo.'
            : 'Master Mathematics, Science & Tech, Kiswahili, and English through thrilling local quests, friendly animal companions, and instant feedback.'}
        </motion.p>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md px-4"
      >
        {/* Large "Start Playing" with Gentle Pulse */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onStartPlaying();
          }}
          className={`w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            reducedMotion ? '' : 'animate-[pulse_3s_ease-in-out_infinite]'
          }`}
        >
          <span>{language === 'sw' ? 'Anza Kucheza Bure' : 'Start Playing Free'}</span>
          <span className="text-lg">🚀</span>
        </button>

        {/* Guest Quest Button (1-Quest Tryout) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onTryGuestQuest();
          }}
          className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-900/90 border border-emerald-900/80 hover:border-emerald-500 text-emerald-200 hover:text-white font-black text-xs md:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>🌱</span>
          <span>{language === 'sw' ? 'Jaribu Safari 1 Kwanza' : 'Try 1 Quest (No Account)'}</span>
        </button>
      </motion.div>
    </div>
  );
};
