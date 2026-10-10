import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: any; // constructed string
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

export const WordBuilderQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  const tokens = question.wordBuilderTokens?.scrambledTokens || [];
  const [selectedTokens, setSelectedTokens] = useState<string[]>(
    selectedAnswer ? String(selectedAnswer).split(' ').filter(Boolean) : []
  );

  const handleAddToken = (token: string, idx: number) => {
    if (disabled) return;
    sound.playClick();
    const next = [...selectedTokens, token];
    setSelectedTokens(next);
    onSelectAnswer(next.join(' '));
  };

  const handleRemoveToken = (idxToRemove: number) => {
    if (disabled) return;
    sound.playClick();
    const next = selectedTokens.filter((_, idx) => idx !== idxToRemove);
    setSelectedTokens(next);
    onSelectAnswer(next.length > 0 ? next.join(' ') : null);
  };

  const handleReset = () => {
    if (disabled) return;
    sound.playClick();
    setSelectedTokens([]);
    onSelectAnswer(null);
  };

  // Count occurrences to disable already placed tokens
  const placedCountMap = selectedTokens.reduce((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  return (
    <div className="space-y-6">
      {/* Prompt */}
      <div className="space-y-1.5">
        <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
          <VocabularyExplainer text={question.prompt} />
        </h3>
      </div>

      {/* Target Construction Line */}
      <div className="p-4 md:p-5 rounded-3xl bg-slate-900 border-2 border-dashed border-emerald-500/50 min-h-[96px] flex flex-wrap items-center gap-2.5">
        {selectedTokens.length === 0 ? (
          <span className="text-sm text-gray-400 italic select-none">
            {isKiswahili ? 'Bonyeza maneno hapa chini kuunda sentensi' : 'Tap words below to build your sentence'}
          </span>
        ) : (
          selectedTokens.map((tok, idx) => (
            <button
              key={`${tok}-${idx}`}
              type="button"
              disabled={disabled}
              onClick={() => handleRemoveToken(idx)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-base shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              title="Tap to remove"
            >
              <span>{tok}</span>
              <span className="text-xs opacity-70">✕</span>
            </button>
          ))
        )}
      </div>

      {selectedTokens.length > 0 && !disabled && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer"
          >
            {isKiswahili ? 'Anza Upya ↺' : 'Clear ↺'}
          </button>
        </div>
      )}

      {/* Available Scrambled Tiles */}
      <div className="space-y-2">
        <span className="text-xs font-black text-gray-300 uppercase tracking-wider block">
          {isKiswahili ? 'Maneno Yanayopatikana:' : 'Available Words:'}
        </span>
        <div className="flex flex-wrap gap-3">
          {tokens.map((tok, idx) => {
            // Count how many times this token has been placed so far
            let countInTokens = 0;
            for (let i = 0; i <= idx; i++) {
              if (tokens[i] === tok) countInTokens++;
            }
            const isUsed = (placedCountMap[tok] || 0) >= countInTokens;

            return (
              <button
                key={`tok-${idx}`}
                type="button"
                disabled={disabled || isUsed}
                onClick={() => handleAddToken(tok, idx)}
                className={`px-5 py-3 rounded-2xl border-2 font-bold text-lg transition-all min-h-[56px] ${
                  isUsed
                    ? 'border-slate-800 bg-slate-950/40 text-gray-600 opacity-30 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-900/95 hover:border-emerald-400 hover:bg-slate-800 text-white shadow-md cursor-pointer active:scale-95'
                }`}
              >
                {tok}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
