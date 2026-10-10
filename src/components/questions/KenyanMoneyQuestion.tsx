import React, { useState, useEffect } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any;
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

interface Denomination {
  value: number;
  label: string;
  type: 'COIN' | 'NOTE';
  color: string;
  textColor: string;
  borderColor: string;
  icon: string;
}

const DENOMINATIONS: Denomination[] = [
  { value: 1, label: 'KES 1', type: 'COIN', color: 'bg-amber-900/60', textColor: 'text-amber-200', borderColor: 'border-amber-700', icon: '🪙' },
  { value: 5, label: 'KES 5', type: 'COIN', color: 'bg-yellow-900/60', textColor: 'text-yellow-200', borderColor: 'border-yellow-600', icon: '🪙' },
  { value: 10, label: 'KES 10', type: 'COIN', color: 'bg-emerald-950', textColor: 'text-emerald-300', borderColor: 'border-emerald-600', icon: '🪙' },
  { value: 20, label: 'KES 20', type: 'COIN', color: 'bg-teal-950', textColor: 'text-teal-200', borderColor: 'border-teal-500', icon: '🪙' },
  { value: 50, label: 'KES 50', type: 'NOTE', color: 'bg-emerald-900/80', textColor: 'text-emerald-200', borderColor: 'border-emerald-400', icon: '💵' },
  { value: 100, label: 'KES 100', type: 'NOTE', color: 'bg-purple-900/80', textColor: 'text-purple-200', borderColor: 'border-purple-400', icon: '💵' },
  { value: 200, label: 'KES 200', type: 'NOTE', color: 'bg-sky-900/80', textColor: 'text-sky-200', borderColor: 'border-sky-400', icon: '💵' },
  { value: 500, label: 'KES 500', type: 'NOTE', color: 'bg-green-950', textColor: 'text-green-200', borderColor: 'border-green-400', icon: '💵' }
];

export const KenyanMoneyQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  // Determine target amount from question data
  const targetAmount: number = (() => {
    if (typeof question.numericAnswer?.value === 'number') {
      return question.numericAnswer.value;
    }
    // Attempt parse from prompt or explanation
    const match = question.prompt.match(/(?:KES|KSh|shilingi|Kshs\.?)\s*([0-9,]+)/i);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 45; // Default standard amount
  })();

  const [tappedItems, setTappedItems] = useState<number[]>(() => {
    if (Array.isArray(selectedAnswer)) return selectedAnswer;
    return [];
  });

  const currentTotal = tappedItems.reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    // Notify parent of current total
    onSelectAnswer(currentTotal > 0 ? currentTotal : null);
  }, [currentTotal]);

  const handleAddMoney = (value: number) => {
    if (disabled) return;
    sound.playClick();
    const updated = [...tappedItems, value];
    setTappedItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    if (disabled) return;
    sound.playClick();
    const updated = tappedItems.filter((_, i) => i !== index);
    setTappedItems(updated);
  };

  const handleClear = () => {
    if (disabled) return;
    sound.playClick();
    setTappedItems([]);
  };

  const isExactMatch = currentTotal === targetAmount;
  const isOver = currentTotal > targetAmount;

  return (
    <div className="space-y-6 text-left">
      {/* Prompt */}
      <div className="space-y-2">
        {question.storyScenario && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 text-xs text-emerald-300 leading-relaxed flex items-start gap-2.5">
            <span className="text-base shrink-0">🛒</span>
            <p>{question.storyScenario}</p>
          </div>
        )}
        <h3 className="text-lg md:text-xl font-black text-white leading-snug">
          {question.prompt}
        </h3>
        {question.swahiliPrompt && (
          <p className="text-sm text-emerald-400 font-medium italic">
            {question.swahiliPrompt}
          </p>
        )}
      </div>

      {/* Target Amount vs Current Amount Display */}
      <div className="grid grid-cols-2 gap-3 p-4 rounded-3xl bg-slate-900 border-2 border-emerald-900/80 shadow-inner">
        <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-800/60 text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
            Target Amount / Lengo
          </span>
          <span className="text-2xl md:text-3xl font-black text-amber-400 mt-1 block">
            KES {targetAmount}
          </span>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center transition-all ${
            isExactMatch
              ? 'bg-emerald-950 border-emerald-400 shadow-md ring-2 ring-emerald-400'
              : isOver
              ? 'bg-rose-950 border-rose-500 ring-2 ring-rose-400'
              : 'bg-slate-950 border-emerald-900/60'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
            Your Total / Jumla Yako
          </span>
          <span
            className={`text-2xl md:text-3xl font-black mt-1 block ${
              isExactMatch
                ? 'text-emerald-400'
                : isOver
                ? 'text-rose-400'
                : 'text-white'
            }`}
          >
            KES {currentTotal}
          </span>
        </div>
      </div>

      {/* Tapped Items Receipt / Breakdown */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300">
            Money Added ({tappedItems.length} {tappedItems.length === 1 ? 'item' : 'items'}):
          </span>
          {tappedItems.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer"
            >
              Clear All / Futa
            </button>
          )}
        </div>

        {tappedItems.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-2">
            Tap coins or notes below to add Kenyan Shillings to your payment.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {tappedItems.map((val, idx) => (
              <button
                key={`${val}-${idx}`}
                type="button"
                disabled={disabled}
                onClick={() => handleRemoveItem(idx)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-xs font-bold text-white hover:border-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer group"
                title="Tap to remove"
              >
                <span>{val >= 50 ? '💵' : '🪙'}</span>
                <span>KES {val}</span>
                <span className="text-gray-400 group-hover:text-rose-400 text-[10px]">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Denominations Touch Grid */}
      <div className="space-y-2">
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">
          Tap Money to Add (Sarafu na Noti za Kenya):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DENOMINATIONS.map(denom => (
            <button
              key={denom.value}
              type="button"
              disabled={disabled}
              onClick={() => handleAddMoney(denom.value)}
              className={`p-3.5 rounded-2xl border-2 ${denom.borderColor} ${denom.color} flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 hover:brightness-110 min-h-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
            >
              <span className="text-2xl">{denom.icon}</span>
              <span className={`text-sm font-black ${denom.textColor}`}>
                {denom.label}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
                {denom.type === 'COIN' ? 'Coin' : 'Note'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
