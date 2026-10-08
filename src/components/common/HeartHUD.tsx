import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  hearts: number;
  maxHearts?: number;
  onOpenOutOfHearts?: () => void;
  onQuickPractice?: () => void;
}

export const HeartHUD: React.FC<Props> = ({
  hearts,
  maxHearts = 5,
  onOpenOutOfHearts,
  onQuickPractice
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [secondsUntilNext, setSecondsUntilNext] = useState(15 * 60); // 15 min countdown
  const [justLostIndex, setJustLostIndex] = useState<number | null>(null);
  const prevHeartsRef = React.useRef(hearts);

  useEffect(() => {
    if (hearts < prevHeartsRef.current) {
      // Just lost a heart!
      setJustLostIndex(hearts); // index of lost heart
      setTimeout(() => setJustLostIndex(null), 1200);
    }
    prevHeartsRef.current = hearts;
  }, [hearts]);

  // Countdown timer for next heart
  useEffect(() => {
    if (hearts >= maxHearts) return;
    const interval = setInterval(() => {
      setSecondsUntilNext(sec => (sec > 0 ? sec - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [hearts, maxHearts]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isLowOrEmpty = hearts <= 1;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          if (hearts <= 0 && onOpenOutOfHearts) {
            onOpenOutOfHearts();
          }
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border transition-all text-xs font-black cursor-pointer ${
          isLowOrEmpty
            ? 'bg-rose-950/80 border-rose-500/80 text-rose-200 shadow-md shadow-rose-950/50 animate-pulse'
            : 'bg-emerald-950/60 border-emerald-800/80 text-rose-300 hover:border-rose-400/50'
        }`}
        aria-label={`${hearts} of ${maxHearts} hearts remaining`}
      >
        {/* Render heart pips */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: maxHearts }).map((_, idx) => {
            const hasHeart = idx < hearts;
            const isCracked = idx === justLostIndex;

            return (
              <motion.span
                key={idx}
                animate={
                  isCracked && !reducedMotion
                    ? {
                        scale: [1, 1.4, 0.8, 1],
                        rotate: [0, -15, 15, -10, 0],
                        opacity: [1, 0.6, 0.3, 0.4]
                      }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.8 }}
                className="inline-block text-sm"
              >
                {hasHeart ? '❤️' : isCracked ? '💔' : '🖤'}
              </motion.span>
            );
          })}
        </div>

        <span className="ml-1">
          {hearts}/{maxHearts}
        </span>
      </button>

      {/* Hover/Tap detail popover card */}
      <div className="hidden group-hover:block sm:group-hover:block absolute top-full left-0 mt-2 z-40 w-60 p-3 bg-slate-900 border-2 border-emerald-800/80 rounded-2xl shadow-2xl text-xs space-y-2 pointer-events-auto animate-fade-in">
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-1.5">
          <span className="font-bold text-white flex items-center gap-1">
            <span>❤️</span>
            <span>Jifuno Hearts</span>
          </span>
          {hearts < maxHearts ? (
            <span className="text-[10px] text-amber-300 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded">
              +1 in {formatTimer(secondsUntilNext)}
            </span>
          ) : (
            <span className="text-[10px] text-emerald-400 font-bold">FULL</span>
          )}
        </div>

        <p className="text-[11px] text-gray-300 leading-snug">
          Hearts allow you to explore lessons. They regenerate naturally over time, or you can practice a mistake to earn one back instantly!
        </p>

        {hearts < maxHearts && onQuickPractice && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onQuickPractice();
            }}
            className="w-full py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[11px] shadow-sm transition-all"
          >
            🌱 Practise for +1 Heart
          </button>
        )}
      </div>
    </div>
  );
};
