import React from 'react';
import { Question } from '../../types/cbe.js';

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

      <h3 className="text-lg md:text-xl font-bold text-emerald-100 leading-snug">
        {question.prompt}
      </h3>

      <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-6 text-center space-y-4">
        <div className="text-base md:text-lg text-emerald-200 leading-relaxed font-medium">
          {parts[0]}
          <span className="inline-block mx-2">
            <input
              type="text"
              disabled={disabled}
              value={selectedAnswer || ''}
              onChange={(e) => onSelectAnswer(e.target.value)}
              placeholder="type your answer..."
              className="bg-emerald-900/80 border-2 border-emerald-400 focus:border-amber-400 focus:outline-none rounded-xl px-3 py-1.5 text-center text-white font-bold w-44 shadow-inner"
            />
          </span>
          {parts[1] || ''}
        </div>

        <p className="text-xs text-gray-400">
          💡 Enter your calculation or term in the box above.
        </p>
      </div>
    </div>
  );
};
