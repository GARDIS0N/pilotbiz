import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';

interface Props {
  language: Language;
  onTryGuestQuest: () => void;
}

export const PreviewStrip: React.FC<Props> = ({ language, onTryGuestQuest }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const sampleQuestion = {
    titleEn: 'Sample Quest • Help Amina at Nakuru Farmers Market',
    titleSw: 'Safari ya Mfano • Msaidie Amina katika Soko la Nakuru',
    scenarioEn: 'Amina buys 3 tree seedlings at KES 20 each. How much change does she receive from a KES 100 note?',
    scenarioSw: 'Amina ananunua miche 3 ya miti kwa KES 20 kila mche. Anapokea chenji ya kiasi gani kutoka kwa noti ya KES 100?',
    options: [
      { id: 0, text: 'KES 20', isCorrect: false },
      { id: 1, text: 'KES 40', isCorrect: true },
      { id: 2, text: 'KES 60', isCorrect: false },
      { id: 3, text: 'KES 80', isCorrect: false }
    ],
    explanationEn: '3 seedlings × KES 20 = KES 60 spent. Then KES 100 − KES 60 = KES 40 change!',
    explanationSw: 'Miche 3 × KES 20 = KES 60 zilizotumika. Kisha KES 100 − KES 60 = KES 40 chenji!'
  };

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setShowExplanation(true);
    if (sampleQuestion.options[idx].isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-left">
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-black text-white">
          {language === 'sw'
            ? '🎮 Tazama Safari Halisi ya Jifuno (Majaribio Papo Hapo)'
            : '🎮 Interactive Quest Preview (Try Answering Below)'}
        </h3>
        <p className="text-xs text-emerald-300/90 mt-1">
          {language === 'sw'
            ? 'Maswali yote yamebuniwa kulingana na mazingira halisi ya Kenya na mtaala wa CBC:'
            : 'Every quest features real Kenyan cultural contexts, vibrant storytelling, and instant feedback:'}
        </p>
      </div>

      {/* Quest Preview Container */}
      <div className="p-5 md:p-6 rounded-3xl bg-slate-950/90 border-2 border-emerald-500/50 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Top Quest Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-2xl shadow-sm">
              🐆
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Grade 4 • Mathematics & Shamba
              </span>
              <h4 className="text-sm font-black text-white">
                {language === 'sw' ? sampleQuestion.titleSw : sampleQuestion.titleEn}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
              ⚡ +50 XP
            </span>
            <span className="text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
              🪙 +20 Coins
            </span>
          </div>
        </div>

        {/* Story Scenario Prompt */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/60">
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-medium">
            {language === 'sw' ? sampleQuestion.scenarioSw : sampleQuestion.scenarioEn}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {sampleQuestion.options.map(opt => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.isCorrect;

            let btnStyle = 'border-slate-800 bg-slate-900 text-gray-200 hover:border-emerald-500';
            if (showExplanation && isSelected) {
              btnStyle = isCorrect
                ? 'border-emerald-400 bg-emerald-950 text-white ring-2 ring-emerald-400'
                : 'border-rose-500 bg-rose-950 text-white ring-2 ring-rose-500';
            } else if (showExplanation && isCorrect) {
              btnStyle = 'border-emerald-400/70 bg-emerald-950/40 text-emerald-300';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`py-3 px-4 rounded-2xl border-2 text-center text-xs md:text-sm font-black transition-all cursor-pointer ${btnStyle}`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Explanation Box */}
        {showExplanation && (
          <div
            className={`p-4 rounded-2xl border-2 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              sampleQuestion.options[selectedOption!].isCorrect
                ? 'border-emerald-500 bg-emerald-950/80 text-white'
                : 'border-rose-500 bg-rose-950/80 text-white'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-black">
                <span>{sampleQuestion.options[selectedOption!].isCorrect ? '🎉 Hongera Sana!' : '💡 Jaribu Tena!'}</span>
                <span>•</span>
                <span>{language === 'sw' ? 'Mwalimu Rafiki Anafafanua:' : 'Rafiki AI Explains:'}</span>
              </div>
              <p className="text-xs text-gray-200 mt-1">
                {language === 'sw' ? sampleQuestion.explanationSw : sampleQuestion.explanationEn}
              </p>
            </div>

            <button
              type="button"
              onClick={onTryGuestQuest}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 cursor-pointer shadow-md"
            >
              {language === 'sw' ? 'Cheza Safari Nzima ➔' : 'Play Full Quest ➔'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
