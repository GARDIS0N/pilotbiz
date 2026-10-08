import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled
}) => {
  const options = question.options || [];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {options.map((opt, idx) => {
          const isSelected = selectedAnswer === opt.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                sound.playClick();
                onSelectAnswer(opt.id);
              }}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-medium transition-all transform active:scale-98 ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950/80 text-emerald-100 shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400/40'
                  : 'border-emerald-900/60 bg-emerald-950/30 text-gray-200 hover:border-emerald-600/60 hover:bg-emerald-900/30'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-400 text-gray-950 font-black'
                    : 'bg-emerald-900/60 text-emerald-300'
                }`}
              >
                {letter}
              </div>
              <div className="flex-1">
                <span className="text-base">{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
