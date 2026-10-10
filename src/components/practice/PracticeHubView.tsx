import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { cbeApi } from '../../services/cbeApi.js';

interface Props {
  student: StudentProfile;
  onStartPractice: (questId?: string) => void;
  language?: 'en' | 'sw';
}

export const PracticeHubView: React.FC<Props> = ({
  student,
  onStartPractice,
  language = 'en'
}) => {
  const [dueItems, setDueItems] = useState<any[]>([]);

  useEffect(() => {
    if (student?.id) {
      cbeApi.getReviewQueue(student.id)
        .then(items => setDueItems(items))
        .catch(() => setDueItems([]));
    }
  }, [student?.id]);
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left py-4 px-2 sm:px-0">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-emerald-950/60 border-2 border-emerald-500/50 shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-700/60">
            Mazoezi ya Kila Siku • Practice Hub
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            {language === 'sw' ? 'Jenga Umahiri Wako' : 'Strengthen Your Skills'}
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            {language === 'sw'
              ? 'Fanya mazoezi bila shinikizo la kupoteza pointi. Pata mioyo ukikamilisha!'
              : 'Targeted practice to restore hearts, review mistakes, and master CBC core competencies.'}
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-emerald-900/40 border border-emerald-500/60 flex items-center justify-center text-4xl shrink-0 shadow-inner">
          🎯
        </div>
      </div>

      {/* Practice Modes */}
      <div className="space-y-4">
        {/* Mode 1: Refill Hearts Practice */}
        <div className="p-5 rounded-3xl bg-slate-950 border-2 border-rose-900/60 hover:border-rose-500 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-500/50 flex items-center justify-center text-2xl shrink-0">
              ❤️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white">
                  {language === 'sw' ? 'Mazoezi ya Kupata Mioyo' : 'Heart Refill Practice'}
                </h4>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
                  +1 Heart ❤️
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === 'sw'
                  ? 'Kamilisha maswali 3 rahisi ya msingi kurejesha moyo 1 na kuendelea na masomo.'
                  : 'Answer 3 foundational questions correctly to restore 1 learning heart.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onStartPractice('quest-g4-math-place-value');
            }}
            className="px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs transition-all cursor-pointer shadow-md shrink-0 active:scale-95 text-center"
          >
            {language === 'sw' ? 'Anza Mazoezi' : 'Practise Now'} ➔
          </button>
        </div>

        {/* Mode 2: Mistake Review */}
        <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/70 hover:border-emerald-600 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/50 flex items-center justify-center text-2xl shrink-0">
              🔄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white">
                  {language === 'sw' ? 'Kurekebisha Makosa (Mistake Review)' : 'Mistake Review'}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  dueItems.length > 0
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {dueItems.length > 0
                    ? (language === 'sw' ? `${dueItems.length} za kurudia` : `${dueItems.length} due for review`)
                    : (language === 'sw' ? 'Hakuna makosa! 🎉' : 'All caught up! 🎉')}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === 'sw'
                  ? 'Rudia maswali uliyokosea kwa mfumo wa siku 1, 3, na 7 hadi ufikie umahiri kamili.'
                  : 'Scheduled reviews (+1, +3, +7 days) for mistakes until you reach full CBC mastery.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onStartPractice('quest-g4-math-market-money');
            }}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/60 text-amber-300 font-black text-xs transition-all cursor-pointer shadow-md shrink-0 active:scale-95 text-center min-h-[44px]"
          >
            {language === 'sw'
              ? (dueItems.length > 0 ? `Pitia Makosa (${dueItems.length}) ➔` : 'Mazoezi ya Kawaida ➔')
              : (dueItems.length > 0 ? `Review Mistakes (${dueItems.length}) ➔` : 'Practice Mode ➔')}
          </button>
        </div>

        {/* Mode 3: Daily CBC Challenge */}
        <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/70 hover:border-emerald-600 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-500/50 flex items-center justify-center text-2xl shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white">
                  {language === 'sw' ? 'Changamoto ya Siku' : 'Daily Savanna Challenge'}
                </h4>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  +25 XP • +10 Coins
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {language === 'sw'
                  ? 'Msururu wa haraka wa maswali ya hesabu na sayansi kwa kasi ya sekunde 60.'
                  : 'A rapid-fire mix of practical math and science questions to boost your reflexes.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onStartPractice('quest-g4-sci-matter');
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all cursor-pointer shadow-md shrink-0 active:scale-95 text-center"
          >
            {language === 'sw' ? 'Jaribu Sasa' : 'Start Challenge'} ➔
          </button>
        </div>
      </div>
    </div>
  );
};
