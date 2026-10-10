import React from 'react';
import { Question } from '../../types/cbe.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const FillBlankQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled
}) => {
  const template = question.blankTemplate || question.prompt;
  const parts = template.split('[BLANK]');

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

      <div className="bg-slate-900/95 border-2 border-slate-700 rounded-3xl p-6 text-center space-y-4 shadow-xl">
        <div className="text-lg md:text-xl text-white leading-relaxed font-bold">
          {parts[0]}
          <span className="inline-block mx-2">
            <input
              type="text"
              disabled={disabled}
              value={selectedAnswer || ''}
              onChange={(e) => onSelectAnswer(e.target.value)}
              placeholder="type here..."
              className="bg-slate-950 border-2 border-emerald-400 focus:border-amber-400 focus:outline-none rounded-2xl px-4 py-3 text-center text-white font-black text-lg w-52 shadow-inner min-h-[56px]"
            />
          </span>
          {parts[1] || ''}
        </div>

        <p className="text-xs text-gray-300 font-medium">
          💡 Enter your answer in the box above.
        </p>
      </div>
    </div>
  );
};
