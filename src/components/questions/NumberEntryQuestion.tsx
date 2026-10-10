import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any;
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

export const NumberEntryQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  const [val, setVal] = useState<string>(selectedAnswer !== undefined && selectedAnswer !== null ? String(selectedAnswer) : '');
  const unit = question.numericAnswer?.unit || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setVal(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      onSelectAnswer(parsed);
    } else {
      onSelectAnswer(null);
    }
  };

  const handleQuickKey = (num: string) => {
    if (disabled) return;
    sound.playClick();
    const next = val + num;
    setVal(next);
    const parsed = parseFloat(next);
    if (!isNaN(parsed)) {
      onSelectAnswer(parsed);
    }
  };

  const handleBackspace = () => {
    if (disabled || val.length === 0) return;
    sound.playClick();
    const next = val.slice(0, -1);
    setVal(next);
    const parsed = parseFloat(next);
    onSelectAnswer(!isNaN(parsed) && next.length > 0 ? parsed : null);
  };

  const handleClear = () => {
    if (disabled) return;
    sound.playClick();
    setVal('');
    onSelectAnswer(null);
  };

  return (
    <div className="space-y-6">
      {/* Question prompt & scenario */}
      <div className="space-y-2">
        {question.storyScenario && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 text-xs text-emerald-300 leading-relaxed flex items-start gap-2.5">
            <span className="text-base shrink-0">📖</span>
            <p>{question.storyScenario}</p>
          </div>
        )}
        <h3 className="text-base md:text-lg font-black text-white leading-snug">
          {question.prompt}
        </h3>
        {question.swahiliPrompt && (
          <p className="text-xs text-emerald-400 font-medium">
            {question.swahiliPrompt}
          </p>
        )}
      </div>

      {/* Number Display Input */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="relative w-full max-w-sm">
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={val}
            onChange={handleChange}
            disabled={disabled}
            placeholder="0"
            className="w-full text-center text-3xl font-black py-4 px-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 text-white outline-none tracking-wider placeholder:text-gray-700 transition-all shadow-inner"
          />
          {unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-800">
              {unit}
            </span>
          )}
        </div>

        {/* Friendly Kid On-Screen Numeric Keypad for low-end mobile touch */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(k => {
            const isAction = k === 'C' || k === '⌫';
            return (
              <button
                key={k}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (k === 'C') handleClear();
                  else if (k === '⌫') handleBackspace();
                  else handleQuickKey(k);
                }}
                className={`py-3.5 rounded-2xl font-black text-base transition-all select-none cursor-pointer active:scale-95 min-h-[48px] ${
                  isAction
                    ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700'
                    : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-white border border-emerald-800/60 shadow-sm'
                } disabled:opacity-50`}
                aria-label={k === 'C' ? 'Clear' : k === '⌫' ? 'Backspace' : `Number ${k}`}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
