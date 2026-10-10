import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';
import { RafikiWavingMascot } from './RafikiWavingMascot.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onStartDemo: () => void;
}

export const MeetRafikiModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onStartDemo
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const handleSpeakGreeting = () => {
    sound.playClick();
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const text =
      language === 'sw'
        ? 'Jambo mwanafunzi! Mimi ni Rafiki, mkufunzi wako wa AI katika Jifuno. Nitakusaidia kuelewa Hisabati na Sayansi kwa njia rahisi!'
        : 'Jambo! I am Rafiki, your AI learning companion on Jifuno. I am here to guide you through exciting CBC quests with fun Kenyan stories!';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'sw' ? 'sw' : 'en-GB';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-left">
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-800 text-gray-400 hover:text-white flex items-center justify-center font-bold cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Mascot & Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
            <RafikiWavingMascot size={76} />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              {language === 'sw' ? 'Mkufunzi wa AI' : 'Socratic AI Tutor'}
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              {language === 'sw' ? 'Kutana na Rafiki AI' : 'Meet Rafiki AI'}
            </h3>
            <p className="text-xs text-emerald-300 font-medium">
              {language === 'sw'
                ? 'Rafiki Yako wa Kujifunzia Mtaala wa CBC'
                : 'Your Friendly Kenyan CBC Learning Companion'}
            </p>
          </div>
        </div>

        {/* Explainer Body */}
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-emerald-900/60 text-xs md:text-sm text-gray-200 leading-relaxed">
          <p>
            {language === 'sw'
              ? 'Rafiki si roboti ya kutoa majibu ya mkato. Yeye hutoa vidokezo vya Kisokrati vinavyomwezesha mtoto kufikiri mwenyewe kwa kutumia mifano ya kila siku ya Kenya — kama kugawana chapati kuelewa sehemu, au kuhesabu sarafu za Shilingi!'
              : 'Rafiki never gives away answers outright. Instead, he asks gentle Socratic questions that guide children to think for themselves using everyday Kenyan analogies — like dividing chapatis to master fractions, or calculating change at the local duka!'}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-bold text-emerald-300">
            <div className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>100% Child-Safe AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🇰🇪</span>
              <span>KICD CBC Aligned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🦉</span>
              <span>Socratic Hinting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🗣️</span>
              <span>English & Kiswahili</span>
            </div>
          </div>
        </div>

        {/* Audio greeting button */}
        {'speechSynthesis' in window && (
          <button
            type="button"
            onClick={handleSpeakGreeting}
            className={`w-full py-2.5 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
              isPlayingAudio
                ? 'border-amber-400 bg-amber-400/20 text-amber-300 animate-pulse'
                : 'border-slate-700 bg-slate-950 text-gray-300 hover:text-white hover:border-emerald-500'
            }`}
          >
            <span>{isPlayingAudio ? '🔊' : '🗣️'}</span>
            <span>
              {isPlayingAudio
                ? language === 'sw'
                  ? 'Rafiki anaongea...'
                  : 'Rafiki is speaking...'
                : language === 'sw'
                ? 'Sikiliza Salamu ya Rafiki (Listen to Rafiki)'
                : 'Listen to Rafiki’s Voice Greeting'}
            </span>
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-emerald-900/60">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
          >
            {language === 'sw' ? 'Funga' : 'Close'}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
              onStartDemo();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <span>{language === 'sw' ? 'Jaribu na Rafiki' : 'Try Demo with Rafiki'}</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
