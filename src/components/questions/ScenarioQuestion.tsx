import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const ScenarioQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled
}) => {
  const options = question.options || [];

  return (
    <div className="w-full space-y-4">
      {/* Rich Kenyan Scenario Hero Card */}
      <div className="bg-gradient-to-br from-amber-950/70 via-emerald-950/60 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <span className="text-base">🇰🇪</span>
          <span>Kenyan Real-Life Scenario Challenge</span>
        </div>
        {question.storyScenario && (
          <p className="text-sm md:text-base text-amber-100 font-medium leading-relaxed italic">
            "{question.storyScenario}"
          </p>
        )}
        <div className="border-t border-amber-500/20 pt-2 text-xs text-amber-300/80">
          📍 Context: {question.kenyanCulturalContext}
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-emerald-100 leading-snug">
        {question.prompt}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {options.map((opt, idx) => {
          const isSelected = selectedAnswer === opt.id;
          const letter = String.fromCharCode(65 + idx);

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
                  ? 'border-amber-400 bg-amber-950/80 text-amber-100 shadow-lg shadow-amber-950/50 ring-2 ring-amber-400/40'
                  : 'border-emerald-900/60 bg-emerald-950/30 text-gray-200 hover:border-amber-600/60 hover:bg-emerald-900/30'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-gray-950 font-black'
                    : 'bg-emerald-900/60 text-amber-300'
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
