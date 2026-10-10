import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { Language } from '../../utils/i18n.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';

interface Props {
  onSelectDemo: (role: UserRole) => void;
  loading?: boolean;
  language: Language;
}

interface DemoOption {
  role: UserRole;
  name: string;
  avatar: string;
  gradeBadge: string;
  roleBadge: string;
  descriptionEn: string;
  descriptionSw: string;
  stats: string;
  borderColor: string;
  glowColor: string;
}

export const DemoAccountPicker: React.FC<Props> = ({
  onSelectDemo,
  loading = false,
  language
}) => {
  const reducedMotion = useReducedMotionPreference();

  const demoAccounts: DemoOption[] = [
    {
      role: 'STUDENT',
      name: 'Amina Kiprono',
      avatar: '🐆',
      gradeBadge: 'Grade 4 • Nakuru',
      roleBadge: language === 'sw' ? 'Mwanafunzi' : 'Learner',
      descriptionEn: 'Explore Math Seedlings, Fractions & Animals',
      descriptionSw: 'Gundua Miche ya Hesabu, Sehemu & Wanyama',
      stats: '⚡ Level 3 • 420 XP • 5 ❤️',
      borderColor: 'border-emerald-500/70 hover:border-emerald-400',
      glowColor: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      role: 'STUDENT',
      name: 'Brian Mwangi',
      avatar: '🦁',
      gradeBadge: 'Grade 5 • Nairobi',
      roleBadge: language === 'sw' ? 'Mwanafunzi' : 'Learner',
      descriptionEn: 'Hands-on Science, Technology & Clean Energy',
      descriptionSw: 'Sayansi Vitendo, Teknolojia & Nishati Safi',
      stats: '⚡ Level 4 • 650 XP • 5 ❤️',
      borderColor: 'border-amber-500/70 hover:border-amber-400',
      glowColor: 'from-amber-500/20 to-orange-500/10'
    },
    {
      role: 'PARENT',
      name: 'Mama Amina (Grace)',
      avatar: '👨‍👩‍👧',
      gradeBadge: language === 'sw' ? 'Mzazi wa Amina' : 'Amina’s Parent',
      roleBadge: language === 'sw' ? 'Mzazi' : 'Parent',
      descriptionEn: 'Weekly CBC Competency Rubrics & Screen Time',
      descriptionSw: 'Ripoti ya Umilisi wa CBC & Muda wa Skrini',
      stats: '📊 92% Homework • 4/4 Strands',
      borderColor: 'border-purple-500/70 hover:border-purple-400',
      glowColor: 'from-purple-500/20 to-indigo-500/10'
    },
    {
      role: 'TEACHER',
      name: 'Mwalimu Ochieng',
      avatar: '👨‍🏫',
      gradeBadge: 'Grade 4 • Simba Academy',
      roleBadge: language === 'sw' ? 'Mwalimu' : 'Teacher',
      descriptionEn: 'Assign CBC Quests & Monitor Class Mastery',
      descriptionSw: 'Toa Safari za Mtaala & Fuatilia Umahiri',
      stats: '🏫 34 Learners • 88% Mastery',
      borderColor: 'border-blue-500/70 hover:border-blue-400',
      glowColor: 'from-blue-500/20 to-cyan-500/10'
    }
  ];

  return (
    <div className="space-y-4 text-center max-w-4xl mx-auto">
      <div>
        <h3 className="text-lg md:text-xl font-black text-white">
          {language === 'sw'
            ? '⚡ Ingia Papo Hapo na Wasifu wa Majaribio (Bofya 1)'
            : '⚡ One-Tap Demo Experience (No Password Required)'}
        </h3>
        <p className="text-xs text-emerald-300/90 mt-1">
          {language === 'sw'
            ? 'Chagua wasifu hapa chini kuona safari halisi za masomo, nishani na sarafu:'
            : 'Pick an avatar below to instantly preview real CBC quests, badges, and rewards:'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        {demoAccounts.map((demo, idx) => (
          <motion.button
            key={`${demo.name}-${idx}`}
            type="button"
            disabled={loading}
            initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : { ...springTransition, delay: idx * 0.08 }
            }
            whileHover={reducedMotion ? {} : { scale: 1.03, y: -3 }}
            whileTap={reducedMotion ? {} : { scale: 0.96 }}
            onClick={() => {
              sound.playClick();
              onSelectDemo(demo.role);
            }}
            className={`p-4 rounded-3xl border-2 bg-gradient-to-b ${demo.glowColor} to-slate-950/90 ${demo.borderColor} text-left transition-all shadow-xl shadow-slate-950/80 cursor-pointer flex flex-col justify-between gap-3 group min-h-[170px] relative overflow-hidden`}
          >
            {/* Top Row: Avatar + Badges */}
            <div className="flex items-start justify-between gap-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform shrink-0">
                {demo.avatar}
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-white px-2 py-0.5 rounded-full border border-slate-700">
                  {demo.roleBadge}
                </span>
                <span className="text-[10px] font-bold text-emerald-400">
                  {demo.gradeBadge}
                </span>
              </div>
            </div>

            {/* Middle: Name & Description */}
            <div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors truncate">
                {demo.name}
              </h4>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed line-clamp-2">
                {language === 'sw' ? demo.descriptionSw : demo.descriptionEn}
              </p>
            </div>

            {/* Bottom: Stats & Tap Prompt */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="font-mono text-gray-400 truncate max-w-[120px]">
                {demo.stats}
              </span>
              <span className="font-black text-emerald-400 group-hover:translate-x-1 transition-transform">
                {language === 'sw' ? 'Jaribu ➔' : 'Try ➔'}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
