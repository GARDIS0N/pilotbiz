import React from 'react';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onQuickPractice: () => void;
  onOpenShop: () => void;
  coins: number;
}

export const OutOfHeartsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onQuickPractice,
  onOpenShop,
  coins
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl w-full max-w-md p-6 text-center shadow-2xl space-y-5">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-4xl shadow-inner">
          💖
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
            Take a Breather
          </span>
          <h3 className="text-xl font-black text-white">
            You're Out of Hearts for Now
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            Mistakes are proof that you are learning and stretching your brain! Let's get you back into the game:
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Option 1: Quick Review Refill */}
          <button
            type="button"
            onClick={() => {
              sound.playLevelUp();
              try {
                localStorage.setItem('jifuno_hearts', '5');
              } catch (e) {}
              onQuickPractice();
              onClose();
            }}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>✨</span>
            <span>Quick Review to Refill (+5 ❤️)</span>
          </button>

          {/* Option 2: Buy hearts in shop */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenShop();
              onClose();
            }}
            className="w-full p-3 rounded-2xl bg-slate-950/80 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🪙</span>
            <span>Refill All Hearts in Dukani (40 Coins)</span>
          </button>

          {/* Option 3: Wait / Close */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2 text-xs text-gray-400 hover:text-white font-medium"
          >
            I'll rest for a few minutes (auto-refill) ➔
          </button>
        </div>
      </div>
    </div>
  );
};
