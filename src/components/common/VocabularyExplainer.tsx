import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { lookupVocabulary, VocabularyTerm } from '../../utils/cbeVocabulary.js';
import { sound } from '../../utils/soundEffects.js';

// ============================================================================
// 1. SINGLETON STORE FOR WORD EXPLORER (LIFTED STATE TO ONE OWNER)
// ============================================================================

let currentTerm: VocabularyTerm | null = null;
const listeners = new Set<() => void>();

export const wordExplorerStore = {
  getTerm: (): VocabularyTerm | null => currentTerm,
  open: (term: VocabularyTerm) => {
    currentTerm = term;
    listeners.forEach((l) => l());
  },
  close: () => {
    if (currentTerm !== null) {
      currentTerm = null;
      listeners.forEach((l) => l());
    }
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useWordExplorer() {
  const activeTerm = useSyncExternalStore(
    wordExplorerStore.subscribe,
    wordExplorerStore.getTerm,
    () => null
  );

  return {
    activeTerm,
    openTerm: wordExplorerStore.open,
    closeTerm: wordExplorerStore.close
  };
}

// ============================================================================
// 2. SINGLE PORTAL MODAL AT document.body (CONSISTENT BOTTOM SHEET LAYOUT)
// ============================================================================

export const WordExplorerModal: React.FC = () => {
  const { activeTerm, closeTerm } = useWordExplorer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the bottom sheet is open
  useEffect(() => {
    if (!activeTerm) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTerm]);

  // Single unified close handler for X, "Got it!", backdrop, and Escape
  const handleClose = (e?: React.SyntheticEvent | Event) => {
    if (e) {
      e.stopPropagation();
      if ('preventDefault' in e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
    }
    sound.playClick();
    closeTerm();
  };

  const handleBackdropClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {activeTerm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="word-explorer-title"
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm select-none"
          onClick={handleBackdropClick}
          onTouchEnd={handleBackdropClick}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            className="w-full max-w-sm sm:max-w-md bg-slate-900 border-2 border-amber-500/70 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[70vh] text-left relative"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 20px))' }}
          >
            {/* 1. Header: Icon, CBE Word Explorer Badge, Title, and Close Button */}
            <div className="flex items-start justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  📖
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded-md border border-amber-700/60 inline-block">
                    CBE Word Explorer
                  </span>
                  <h3
                    id="word-explorer-title"
                    className="text-xl font-black text-white mt-0.5 truncate"
                  >
                    {activeTerm.word}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-white text-xl font-black p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                aria-label="Close word explorer"
              >
                ✕
              </button>
            </div>

            {/* 2. Scrollable Body: "What Does It Mean?" & "Real-Life Example" */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-3 -mr-1">
              {/* Definition Box */}
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💡</span>
                  <span>What Does It Mean?</span>
                </h4>
                <p className="text-sm text-gray-100 leading-relaxed font-medium">
                  {activeTerm.definition}
                </p>
              </div>

              {/* Real-Life Example Box */}
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
            </div>

            {/* 3. Action Footer: "Got It!" Button (52px touch target) */}
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer min-h-[52px] flex items-center justify-center gap-2 shrink-0"
            >
              <span>Got It!</span>
              <span>👍</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ============================================================================
// 3. INLINE VOCABULARY EXPLAINER TOKEN COMPONENT (NO NESTED MODALS OR BUTTONS)
// ============================================================================

interface Props {
  text: string;
  className?: string;
}

export const VocabularyExplainer: React.FC<Props> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split text into words and spaces/punctuation while preserving them
  const tokens = text.split(/(\s+|[.,!?;:()"])/);

  return (
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
                e.preventDefault();
                sound.playClick();
                wordExplorerStore.open(term);
              }}
              className="relative inline-block cursor-pointer border-b-2 border-dotted border-amber-400 text-amber-300 font-bold hover:bg-amber-400/20 px-1 py-0.5 rounded transition-colors group"
              title={`Tap to learn about "${term.word}"`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  sound.playClick();
                  wordExplorerStore.open(term);
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
  );
};
