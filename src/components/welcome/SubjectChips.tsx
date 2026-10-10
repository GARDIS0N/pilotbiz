import React from 'react';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';

interface Props {
  language: Language;
}

export const SubjectChips: React.FC<Props> = ({ language }) => {
  const subjects = [
    { id: 'math', icon: '🧮', nameEn: 'Mathematics', nameSw: 'Hisabati', color: '#10B981' },
    { id: 'sci', icon: '🔬', nameEn: 'Science & Tech', nameSw: 'Sayansi na Teknolojia', color: '#06B6D4' },
    { id: 'swa', icon: '🦁', nameEn: 'Kiswahili', nameSw: 'Kiswahili', color: '#F59E0B' },
    { id: 'eng', icon: '🦉', nameEn: 'English Language', nameSw: 'Lugha ya Kiingereza', color: '#6366F1' },
    { id: 'agri', icon: '🌱', nameEn: 'Agriculture & Nutrition', nameSw: 'Kilimo na Lishe', color: '#84CC16' },
    { id: 'arts', icon: '🎨', nameEn: 'Creative Arts', nameSw: 'Sanaa za Ubunifu', color: '#EC4899' }
  ];

  return (
    <div className="space-y-3.5">
      {/* Official CBC Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-sm">
        <span className="text-sm">🇰🇪</span>
        <span>
          {language === 'sw'
            ? 'Kulingana na Mtaala wa Umilisi (CBC) wa KICD • Darasa la 3–6'
            : 'Aligned to Kenya’s KICD CBC Curriculum • Grades 3–6'}
        </span>
      </div>

      {/* Chips Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        {subjects.map(s => (
          <div
            key={s.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-500/80 text-xs font-bold text-gray-200 transition-all hover:scale-105 select-none shadow-sm cursor-default"
          >
            <span className="text-base">{s.icon}</span>
            <span>{language === 'sw' ? s.nameSw : s.nameEn}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
