import React from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  onClick: () => void;
  language?: 'en' | 'sw';
}

export const RafikiFloatingButton: React.FC<Props> = ({ onClick, language = 'en' }) => {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 pointer-events-auto">
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          sound.playClick();
          onClick();
        }}
        className="group relative flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
        aria-label="Ask Rafiki AI Companion"
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />

        {/* Floating Bubble Badge */}
        <div className="absolute -top-7 right-0 bg-slate-900 border border-amber-400 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap animate-bounce">
          {language === 'sw' ? 'Uliza Rafiki! 🦉' : 'Ask Rafiki! 🦉'}
        </div>

        {/* Mascot Avatar Button */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 border-2 border-amber-200 shadow-2xl flex items-center justify-center text-3xl md:text-4xl text-slate-950 ring-4 ring-amber-500/20">
          🦉
        </div>
      </motion.button>
    </div>
  );
};
