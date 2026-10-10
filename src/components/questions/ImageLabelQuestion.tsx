import React from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any; // hotspotId
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

  return (
    <div className="space-y-6">
      {/* Prompt */}
      <div className="space-y-2">
        {question.storyScenario && (
          <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-900/50 text-xs text-sky-300 flex items-start gap-2">
            <span>🔬</span>
            <p>{question.storyScenario}</p>
          </div>
        )}
        <h3 className="text-base md:text-lg font-black text-white leading-snug">
          {question.prompt}
        </h3>
        {question.swahiliPrompt && (
          <p className="text-xs text-sky-400 font-medium">
            {question.swahiliPrompt}
          </p>
        )}
      </div>

      {/* Interactive Diagram & Hotspots Area */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-sky-900/60 space-y-4">
        {/* Schematic Graphic representation */}
        <div className="relative w-full h-48 md:h-56 rounded-2xl bg-slate-950 border border-sky-950 flex items-center justify-center overflow-hidden">
          {/* Subtle SVG schematic backdrop */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sciGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="400" height="200" fill="url(#sciGrad)" />
            <circle cx="200" cy="90" r="45" fill="#0284c7" opacity="0.15" />
            <path d="M160,140 Q200,80 240,140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="text-4xl mb-1">🌿</span>
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
              Interactive Inquiry Diagram
            </span>
            <span className="text-[10px] text-gray-400">
              Tap the correct structure or label below
            </span>
          </div>
        </div>

        {/* Hotspot Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {hotspots.map(spot => {
            const isSelected = selectedAnswer === spot.id;

            return (
              <button
                key={spot.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  sound.playClick();
                  onSelectAnswer(spot.id);
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[48px] ${
                  isSelected
                    ? 'border-sky-400 bg-sky-950/80 text-white shadow-lg shadow-sky-950/60 ring-2 ring-sky-400/30'
                    : 'border-slate-800 bg-slate-950 hover:border-sky-700 text-gray-300'
                } disabled:opacity-50`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                      isSelected
                        ? 'border-sky-300 bg-sky-400 text-slate-950'
                        : 'border-gray-700 bg-slate-900 text-gray-400'
                    }`}
                  >
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-xs block">{spot.label}</span>
                    {spot.swahiliLabel && (
                      <span className="text-[10px] text-sky-400 block">{spot.swahiliLabel}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-500">[{spot.id}]</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
