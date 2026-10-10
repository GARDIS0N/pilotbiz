import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CBE_VOCABULARY, lookupVocabulary, VocabularyTerm } from '../../utils/cbeVocabulary.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  text: string;
  className?: string;
}

export const VocabularyExplainer: React.FC<Props> = ({ text, className = '' }) => {
  const [activeTerm, setActiveTerm] = useState<VocabularyTerm | null>(null);

  if (!text) return null;

  // Split text into words and spaces/punctuation while preserving them
  const tokens = text.split(/(\s+|[.,!?;:()"])/);

  return (
    <>
      <span className={className}>
        {tokens.map((token, idx) => {
          // Check for vocabulary match on alphanumeric tokens
          const term = lookupVocabulary(token);

          if (term) {
            return (
              <span
                key={`${token}-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  setActiveTerm(term);
                }}
                className="relative inline-block cursor-pointer border-b-2 border-dotted border-amber-400 text-amber-300 font-bold hover:bg-amber-400/20 px-1 py-0.5 rounded transition-colors group"
                title={`Tap to learn about "${term.word}"`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTerm(term);
                  }
                }}
              >
                {token}
                <span className="hidden group-hover:inline-block ml-0.5 text-[10px] text-amber-400">
                  💡
                </span>
              </span>
            );
          }

          return <React.Fragment key={`${token}-${idx}`}>{token}</React.Fragment>;
        })}
      </span>

      {/* Child-Friendly Vocabulary Popup Sheet */}
      <AnimatePresence>
        {activeTerm && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveTerm(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm sm:max-w-md bg-slate-900 border-2 border-amber-500/70 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-left"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shadow-inner">
                    📖
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded-md border border-amber-700/60">
                      CBE Word Explorer
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      {activeTerm.word}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTerm(null)}
                  className="text-gray-400 hover:text-white text-lg font-black p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close explainer"
                >
                  ✕
                </button>
              </div>

              {/* Definition */}
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💡</span>
                  <span>What Does It Mean?</span>
                </h4>
                <p className="text-sm text-gray-100 leading-relaxed font-medium">
                  {activeTerm.definition}
                </p>
              </div>

              {/* Example */}
              {activeTerm.example && (
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    🌱 Real-Life Example:
                  </span>
                  <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                    {activeTerm.example}
                  </p>
                </div>
              )}

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTerm(null);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>Got It!</span>
                <span>👍</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
