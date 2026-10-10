import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any; // optionId
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

export const ReadingComprehensionQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  return (
    <div className="space-y-6">
      {/* Story Reading Passage */}
      {question.readingPassage && (
        <div className="p-4 md:p-5 rounded-3xl bg-slate-900 border border-violet-900/60 space-y-2 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <span>📖</span>
            <span>Reading Passage (Kifungu cha Kusoma)</span>
          </div>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-serif italic">
            "{question.readingPassage}"
          </p>
          {question.swahiliReadingPassage && (
            <p className="text-xs text-violet-300/80 leading-relaxed pt-1 border-t border-violet-950/60 font-serif">
              "{question.swahiliReadingPassage}"
            </p>
          )}
        </div>
      )}

      {/* Prompt */}
      <div className="space-y-1.5">
        <h3 className="text-base md:text-lg font-black text-white leading-snug">
          {question.prompt}
        </h3>
        {question.swahiliPrompt && (
          <p className="text-xs text-violet-400 font-medium">
            {question.swahiliPrompt}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options?.map(opt => {
          const isSelected = selectedAnswer === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                sound.playClick();
                onSelectAnswer(opt.id);
              }}
              className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between min-h-[48px] ${
                isSelected
                  ? 'border-violet-400 bg-violet-950/70 text-white shadow-lg ring-2 ring-violet-400/30'
                  : 'border-slate-800 bg-slate-950 hover:border-violet-700 text-gray-200'
              } disabled:opacity-50`}
            >
              <span>{opt.text}</span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                  isSelected
                    ? 'border-violet-300 bg-violet-400 text-slate-950 font-black'
                    : 'border-gray-700 bg-slate-900 text-gray-500'
                }`}
              >
                {isSelected ? '✓' : ''}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
