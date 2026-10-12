import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: any; // hotspotId or optionId
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

export const ImageLabelQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  const data = question.imageLabelData;
  const hotspots = data?.hotspots || [];
  const hasRealImage = Boolean(data?.imageUrl && !data.imageUrl.includes('placeholder'));

  // If no diagram asset exists, fall back to a clean text-based multiple-choice list
  const optionsToRender = hotspots.length > 0
    ? hotspots.map((spot: any, idx) => {
        let labelText = '';
        if (typeof spot.label === 'object' && spot.label !== null) {
          labelText = spot.label.en || spot.label.sw || String(spot.label);
        } else {
          labelText = String(spot.label || `Option ${String.fromCharCode(65 + idx)}`);
        }
        // Strip raw IDs like [spot-leaf]
        labelText = labelText.replace(/\[spot-[^\]]+\]/g, '').trim();
        return {
          id: spot.id || `opt-${idx + 1}`,
          text: labelText
        };
      })
    : (question.options || []).map((opt: any, idx) => ({
        id: opt.id || `opt-${idx + 1}`,
        text: String(opt.text || opt).replace(/\[spot-[^\]]+\]/g, '').trim()
      }));

  return (
    <div className="w-full space-y-4">
      {/* Scenario Context */}
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-200/90 flex items-start gap-2">
          <span className="text-base">🔬</span>
          <span>{question.storyScenario}</span>
        </div>
      )}

      {/* Prompt */}
      <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
        <VocabularyExplainer text={question.prompt} />
      </h3>

      {/* Only show diagram if a real image asset exists */}
      {hasRealImage && data?.imageUrl && (
        <div className="relative w-full max-h-64 rounded-2xl bg-slate-950 border border-emerald-900/60 overflow-hidden flex items-center justify-center p-2">
          <img
            src={data.imageUrl}
            alt={question.prompt}
            className="w-full h-auto max-h-60 object-contain rounded-xl"
          />
        </div>
      )}

      {/* Clean Option Buttons (No raw IDs like [spot-leaf], min-height 56px, clear tap targets) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {optionsToRender.map((opt, idx) => {
          const isSelected = selectedAnswer === opt.id || selectedAnswer === opt.text;
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
                <span className="text-lg font-bold text-white leading-snug">{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
