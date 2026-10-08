import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

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

      <h3 className="text-lg md:text-xl font-bold text-emerald-100 leading-snug">
        {question.prompt}
      </h3>
      <p className="text-xs text-emerald-400 font-medium">
        👉 Tap an item on the left, then tap its matching pair on the right!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Left column */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Terms / Mada</div>
          {pairs.map(pair => {
            const isMatch = currentMatches.find(m => m.leftId === pair.leftId);
            const isHighlighted = selectedLeft === pair.leftId;

            return (
              <button
                key={pair.leftId}
                type="button"
                disabled={disabled}
                onClick={() => handleLeftClick(pair.leftId)}
                className={`w-full p-3.5 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-center justify-between ${
                  isHighlighted
                    ? 'border-amber-400 bg-amber-950/60 text-amber-100 ring-2 ring-amber-400/50'
                    : isMatch
                    ? 'border-emerald-500/70 bg-emerald-950/50 text-emerald-200'
                    : 'border-emerald-900/60 bg-emerald-950/30 text-gray-200 hover:border-emerald-600/60'
                } ${disabled ? 'opacity-70' : 'cursor-pointer'}`}
              >
                <span>{pair.leftText}</span>
                {isMatch && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMatch(pair.leftId);
                    }}
                    className="text-xs bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full hover:bg-rose-900 hover:text-white"
                  >
                    Matched ✕
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Meaning / Description</div>
          {pairs.map(pair => {
            const matchedLeft = currentMatches.find(m => m.rightId === pair.rightId);

            return (
              <button
                key={pair.rightId}
                type="button"
                disabled={disabled}
                onClick={() => handleRightClick(pair.rightId)}
                className={`w-full p-3.5 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-center justify-between ${
                  matchedLeft
                    ? 'border-emerald-500/70 bg-emerald-950/50 text-emerald-200'
                    : selectedLeft
                    ? 'border-dashed border-amber-500/60 bg-amber-950/20 text-gray-300 hover:bg-amber-950/40'
                    : 'border-emerald-900/60 bg-emerald-950/30 text-gray-200 hover:border-emerald-600/60'
                } ${disabled ? 'opacity-70' : 'cursor-pointer'}`}
              >
                <span>{pair.rightText}</span>
                {matchedLeft && (
                  <span className="text-xs text-emerald-400 font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
