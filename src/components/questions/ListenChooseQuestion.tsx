import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any; // optionId
  onSelectAnswer: (ans: any) => void;
  disabled?: boolean;
}

export const ListenChooseQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioData = question.audioSpeechPrompt;

  const handlePlayAudio = () => {
    sound.playClick();
    if (!audioData?.textToSpeak) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(audioData.textToSpeak);
      utterance.rate = 0.9; // clear, gentle child pace
      utterance.pitch = 1.0;
      utterance.lang = audioData.language || 'en-KE';

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback alert / notification if speech synthesis is unsupported
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-black text-white leading-snug">
          {question.prompt}
        </h3>
        {question.swahiliPrompt && (
          <p className="text-xs text-amber-400 font-medium">
            {question.swahiliPrompt}
          </p>
        )}
      </div>

      {/* Audio Play Button Hero */}
      <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900 border border-amber-900/50 space-y-3 text-center">
        <button
          type="button"
          onClick={handlePlayAudio}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all cursor-pointer active:scale-95 ${
            isPlaying
              ? 'bg-amber-400 text-slate-950 ring-8 ring-amber-400/30 animate-pulse'
              : 'bg-gradient-to-tr from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/20'
          }`}
          aria-label="Play spoken sentence"
        >
          {isPlaying ? '🔊' : '▶️'}
        </button>
        <span className="text-xs font-bold text-amber-300">
          {isPlaying ? 'Sikiliza kwa makini... (Listening)' : 'Tap to Listen (Bonyeza Kusikiliza)'}
        </span>
        <span className="text-[10px] text-gray-400">
          Pronunciation speed tuned for CBC learners
        </span>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {question.options?.map(opt => {
          const isSelected = selectedAnswer === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                sound.playClick();
                onSelectAnswer(opt.id);
              }}
              className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all cursor-pointer flex items-center justify-between min-h-[48px] ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/70 text-white shadow-lg ring-2 ring-amber-400/30'
                  : 'border-slate-800 bg-slate-950 hover:border-amber-700 text-gray-200'
              } disabled:opacity-50`}
            >
              <span>{opt.text}</span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                  isSelected
                    ? 'border-amber-300 bg-amber-400 text-slate-950 font-black'
                    : 'border-gray-700 bg-slate-900 text-gray-500'
                }`}
              >
                {isSelected ? '✓' : ''}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
