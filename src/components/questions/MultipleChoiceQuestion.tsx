import React, { useMemo, useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { getShuffledOptions } from '../../utils/optionShuffler.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
  attemptId?: string;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled,
  attemptId
}) => {
  const [localAttemptId] = useState(() => `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const effectiveAttemptId = attemptId || localAttemptId;

  const displayOptions = useMemo(() => {
    return getShuffledOptions(
      question.options || [],
      `${effectiveAttemptId}_${question.id}`,
      question
    );
  }, [question.options, effectiveAttemptId, question.id, question.type]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {displayOptions.map((opt, idx) => {
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
              className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left font-medium transition-all transform active:scale-98 min-h-[56px] ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950 text-white shadow-xl shadow-emerald-950/80 ring-2 ring-emerald-400'
                  : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 border border-slate-600 text-emerald-300'
                }`}
              >
                {letter}
              </div>
              <div className="flex-1">
                <span className="text-lg font-bold text-white leading-snug">
                  <VocabularyExplainer text={opt.text} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
