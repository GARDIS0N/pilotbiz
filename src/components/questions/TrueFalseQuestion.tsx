import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

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
  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  return (
    <div className="w-full space-y-4">
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-200/90 flex items-start gap-2">
          <span className="text-base">📖</span>
          <span>{question.storyScenario}</span>
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
        <VocabularyExplainer text={question.prompt} />
      </h3>

      <div className="grid grid-cols-2 gap-4 pt-4">
        {/* TRUE / KWELI Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            sound.playClick();
            onSelectAnswer(true);
          }}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all transform active:scale-98 min-h-[96px] ${
            selectedAnswer === true
              ? 'border-emerald-400 bg-emerald-900 text-white shadow-xl shadow-emerald-950/80 ring-2 ring-emerald-400'
              : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
          } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-3xl mb-1.5">✅</span>
          <span className="text-xl font-black tracking-wide">
            {isKiswahili ? 'KWELI' : 'TRUE'}
          </span>
        </button>

        {/* FALSE / SI KWELI Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            sound.playClick();
            onSelectAnswer(false);
          }}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all transform active:scale-98 min-h-[96px] ${
            selectedAnswer === false
              ? 'border-rose-400 bg-rose-950 text-white shadow-xl shadow-rose-950/80 ring-2 ring-rose-400'
              : 'border-slate-700 bg-slate-900/95 text-white hover:border-rose-400 hover:bg-slate-800'
          } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-3xl mb-1.5">❌</span>
          <span className="text-xl font-black tracking-wide">
            {isKiswahili ? 'SI KWELI' : 'FALSE'}
          </span>
        </button>
      </div>
    </div>
  );
};
