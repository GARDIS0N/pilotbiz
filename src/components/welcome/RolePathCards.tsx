import React from 'react';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';

interface Props {
  onSelectRole: (role: 'LEARNER' | 'PARENT' | 'TEACHER') => void;
  language: Language;
}

export const RolePathCards: React.FC<Props> = ({ onSelectRole, language }) => {
  const roles = [
    {
      id: 'LEARNER' as const,
      icon: '🎓',
      titleEn: 'I’m a Learner',
      titleSw: 'Mimi ni Mwanafunzi',
      sublineEn: 'Grades 3–6 (Ages 7–12)',
      sublineSw: 'Darasa la 3–6 (Umri 7–12)',
      descEn: 'Play quests, earn Shilingi coins & badges, and level up your animal avatar with Rafiki AI.',
      descSw: 'Cheza safari, jishindie sarafu na nishani za Shilingi, na ongeza kiwango cha mnyama wako.',
      buttonEn: 'Start My Journey 🚀',
      buttonSw: 'Anza Safari Yangu 🚀',
      themeBorder: 'border-emerald-500/60 hover:border-emerald-400 bg-emerald-950/20'
    },
    {
      id: 'PARENT' as const,
      icon: '👨‍👩‍👧',
      titleEn: 'I’m a Parent',
      titleSw: 'Mimi ni Mzazi',
      sublineEn: 'Child Safety & Consent',
      sublineSw: 'Usalama wa Mtoto & Idhini',
      descEn: 'Track your child’s CBC strand mastery, manage screen time, and receive weekly WhatsApp insights.',
      descSw: 'Fuatilia umilisi wa mwanao katika CBC, dhibiti muda wa skrini, na pokea ripoti kupitia WhatsApp.',
      buttonEn: 'Parent Portal 📊',
      buttonSw: 'Tovuti ya Mzazi 📊',
      themeBorder: 'border-purple-500/60 hover:border-purple-400 bg-purple-950/20'
    },
    {
      id: 'TEACHER' as const,
      icon: '👨‍🏫',
      titleEn: 'I’m a Teacher',
      titleSw: 'Mimi ni Mwalimu',
      sublineEn: 'Classroom & Homework',
      sublineSw: 'Darasa & Kazi ya Nyumbani',
      descEn: 'Assign curriculum missions aligned with KICD designs, review class rubrics, and save grading hours.',
      descSw: 'Toa safari za masomo kulingana na KICD, kagua viwango vya darasa, na kurahisisha usahihishaji.',
      buttonEn: 'Teacher Hub 🏫',
      buttonSw: 'Kituo cha Walimu 🏫',
      themeBorder: 'border-blue-500/60 hover:border-blue-400 bg-blue-950/20'
    }
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto text-left">
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-black text-white">
          {language === 'sw' ? '🧭 Chagua Njia Yako' : '🧭 Choose Your Path'}
        </h3>
        <p className="text-xs text-emerald-300/90 mt-1">
          {language === 'sw'
            ? 'Iwe wewe ni mwanafunzi, mzazi, au mwalimu — Jifuno ina kila kitu kwa ajili yako'
            : 'Whether you’re a child practicing for school, a caring parent, or a teacher in the classroom'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {roles.map(r => (
          <div
            key={r.id}
            className={`p-5 rounded-3xl border-2 ${r.themeBorder} bg-slate-950/80 shadow-xl flex flex-col justify-between gap-4 transition-all hover:scale-[1.02]`}
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h4 className="text-base font-black text-white">
                    {language === 'sw' ? r.titleSw : r.titleEn}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-400">
                    {language === 'sw' ? r.sublineSw : r.sublineEn}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                {language === 'sw' ? r.descSw : r.descEn}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onSelectRole(r.id);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-white font-black text-xs border border-emerald-800/80 transition-all cursor-pointer text-center shadow-md"
            >
              {language === 'sw' ? r.buttonSw : r.buttonEn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
