import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

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

      <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
        <VocabularyExplainer text={question.prompt} />
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
              className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left font-medium transition-all transform active:scale-98 min-h-[56px] ${
                isSelected
                  ? 'border-amber-400 bg-amber-950 text-white shadow-xl shadow-amber-950/80 ring-2 ring-amber-400'
                  : 'border-slate-700 bg-slate-900/95 text-white hover:border-amber-400 hover:bg-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 border border-slate-600 text-amber-300'
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
