import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

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
  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  return (
    <div className="space-y-6">
      {/* Story Reading Passage */}
      {question.readingPassage && (
        <div className="p-4 md:p-5 rounded-3xl bg-slate-900 border border-violet-900/60 space-y-2 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
            <span>📖</span>
            <span>{isKiswahili ? 'Kifungu cha Kusoma' : 'Reading Passage'}</span>
          </div>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-serif italic">
            "{question.readingPassage}"
          </p>
        </div>
      )}

      {/* Prompt */}
      <div className="space-y-1.5">
        <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
          <VocabularyExplainer text={question.prompt} />
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
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
              className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all cursor-pointer flex items-center justify-between min-h-[56px] ${
                isSelected
                  ? 'border-violet-400 bg-violet-950 text-white shadow-xl shadow-violet-950/80 ring-2 ring-violet-400'
                  : 'border-slate-700 bg-slate-900/95 text-white hover:border-violet-400 hover:bg-slate-800'
              } disabled:opacity-50`}
            >
              <span className="text-lg font-bold text-white leading-snug">{opt.text}</span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border shrink-0 ${
                  isSelected
                    ? 'border-violet-300 bg-violet-400 text-slate-950 font-black'
                    : 'border-slate-600 bg-slate-800 text-slate-400'
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
