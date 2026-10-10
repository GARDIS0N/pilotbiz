import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: { leftId: string; rightId: string }[] | null;
  onSelectAnswer: (answer: { leftId: string; rightId: string }[]) => void;
  disabled?: boolean;
}

export const MatchingQuestion: React.FC<Props> = ({
  question,
  selectedAnswer = [],
  onSelectAnswer,
  disabled
}) => {
  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );
  const pairs = question.matchingPairs || [];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const currentMatches = selectedAnswer || [];

  const handleLeftClick = (leftId: string) => {
    if (disabled) return;
    sound.playClick();
    if (selectedLeft === leftId) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftId);
    }
  };

  const handleRightClick = (rightId: string) => {
    if (disabled || !selectedLeft) return;
    sound.playClick();

    // Remove existing match for this left or right
    const filtered = currentMatches.filter(
      m => m.leftId !== selectedLeft && m.rightId !== rightId
    );

    const updated = [...filtered, { leftId: selectedLeft, rightId }];
    onSelectAnswer(updated);
    setSelectedLeft(null);
  };

  const removeMatch = (leftId: string) => {
    if (disabled) return;
    sound.playClick();
    onSelectAnswer(currentMatches.filter(m => m.leftId !== leftId));
  };

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
      <p className="text-xs text-emerald-300 font-bold">
        {isKiswahili
          ? '👉 Bonyeza neno upande wa kushoto, kisha bonyeza maelezo yanayolingana upande wa kulia!'
          : '👉 Tap an item on the left, then tap its matching pair on the right!'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Left column */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-black text-gray-300 tracking-wider">
            {isKiswahili ? 'Mada' : 'Terms'}
          </div>
          {pairs.map(pair => {
            const isMatch = currentMatches.find(m => m.leftId === pair.leftId);
            const isHighlighted = selectedLeft === pair.leftId;

            return (
              <button
                key={pair.leftId}
                type="button"
                disabled={disabled}
                onClick={() => handleLeftClick(pair.leftId)}
                className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between min-h-[56px] ${
                  isHighlighted
                    ? 'border-amber-400 bg-amber-950 text-white ring-2 ring-amber-400 shadow-lg'
                    : isMatch
                    ? 'border-emerald-500 bg-emerald-950 text-white'
                    : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
                } ${disabled ? 'opacity-70' : 'cursor-pointer'}`}
              >
                <span className="text-lg font-bold leading-snug">{pair.leftText}</span>
                {isMatch && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMatch(pair.leftId);
                    }}
                    className="text-xs bg-emerald-800 text-white font-bold px-2.5 py-1 rounded-full hover:bg-rose-900"
                  >
                    Matched ✕
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-black text-gray-300 tracking-wider">
            {isKiswahili ? 'Maelezo' : 'Descriptions'}
          </div>
          {pairs.map(pair => {
            const matchedLeft = currentMatches.find(m => m.rightId === pair.rightId);

            return (
              <button
                key={pair.rightId}
                type="button"
                disabled={disabled}
                onClick={() => handleRightClick(pair.rightId)}
                className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between min-h-[56px] ${
                  matchedLeft
                    ? 'border-emerald-500 bg-emerald-950 text-white'
                    : selectedLeft
                    ? 'border-dashed border-amber-400 bg-amber-950/40 text-amber-200 hover:bg-amber-950/70'
                    : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
                } ${disabled ? 'opacity-70' : 'cursor-pointer'}`}
              >
                <span className="text-lg font-bold leading-snug">{pair.rightText}</span>
                {matchedLeft && (
                  <span className="text-sm text-emerald-400 font-black">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
