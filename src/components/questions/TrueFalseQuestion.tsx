import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: boolean | null;
  onSelectAnswer: (answer: boolean) => void;
  disabled?: boolean;
}

export const TrueFalseQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled
}) => {
  return (
    <div className="w-full space-y-4">
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-200/90 flex items-start gap-2">
          <span className="text-base">📖</span>
          <span>{question.storyScenario}</span>
        </div>
      )}

      <h3 className="text-lg md:text-xl font-bold text-emerald-100 leading-snug">
        {question.prompt}
      </h3>

      <div className="grid grid-cols-2 gap-4 pt-4">
        {/* TRUE Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            sound.playClick();
            onSelectAnswer(true);
          }}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all transform active:scale-98 ${
            selectedAnswer === true
              ? 'border-emerald-400 bg-emerald-900/70 text-white shadow-xl shadow-emerald-900/50 ring-2 ring-emerald-400/50'
              : 'border-emerald-900/60 bg-emerald-950/40 text-emerald-200 hover:border-emerald-600/70 hover:bg-emerald-900/30'
          } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-3xl mb-2">✅</span>
          <span className="text-lg font-black tracking-wide">TRUE</span>
          <span className="text-xs text-emerald-400/80 font-medium">(Ndiyo / Kweli)</span>
        </button>

        {/* FALSE Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            sound.playClick();
            onSelectAnswer(false);
          }}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all transform active:scale-98 ${
            selectedAnswer === false
              ? 'border-rose-400 bg-rose-950/70 text-white shadow-xl shadow-rose-950/50 ring-2 ring-rose-400/50'
              : 'border-emerald-900/60 bg-emerald-950/40 text-emerald-200 hover:border-rose-700/60 hover:bg-rose-950/30'
          } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-3xl mb-2">❌</span>
          <span className="text-lg font-black tracking-wide">FALSE</span>
          <span className="text-xs text-rose-300/80 font-medium">(Hapana / Si Kweli)</span>
        </button>
      </div>
    </div>
  );
};
