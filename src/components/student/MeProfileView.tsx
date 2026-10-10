import React, { useState } from 'react';
import { StudentProfile, Grade, User } from '../../types/cbe.js';
import { getAvatar, AVATARS } from '../../utils/avatars.js';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference, setReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  student: StudentProfile;
  currentUser: User | null;
  grades: Grade[];
  onGradeChange: (gradeId: string) => void;
  language: 'en' | 'sw';
  onToggleLanguage: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onStudentUpdated: (student: StudentProfile) => void;
  onLogout: () => void;
  onOpenAuthModal: () => void;
}

export const MeProfileView: React.FC<Props> = ({
  student,
  currentUser,
  grades,
  onGradeChange,
  language,
  onToggleLanguage,
  isMuted,
  onToggleMute,
  onStudentUpdated,
  onLogout,
  onOpenAuthModal
}) => {
  const avatarInfo = getAvatar(student.avatar);
  const currentGrade = grades.find(g => g.id === student.gradeId) || grades[1] || grades[0];
  const reducedMotion = useReducedMotionPreference();
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);

  const handleSelectAvatar = (avatarId: string) => {
    sound.playClick();
    const updated = { ...student, avatar: avatarId };
    onStudentUpdated(updated);
    setIsChangingAvatar(false);
  };

  const handleGoalChange = (minutes: number) => {
    sound.playClick();
    setDailyGoalMinutes(minutes);
    try {
      localStorage.setItem('jifuno_daily_goal_minutes', String(minutes));
    } catch (_) {}
  };

  const handleToggleMotion = () => {
    sound.playClick();
    setReducedMotionPreference(!reducedMotion);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left py-4 px-2 sm:px-0">
      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-slate-950 border-2 border-emerald-500/60 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative group">
          <div
            className={`w-20 h-20 rounded-3xl bg-gradient-to-tr ${avatarInfo.bgGradient} flex items-center justify-center text-4xl shadow-xl ring-4 ring-emerald-500/30 shrink-0 cursor-pointer`}
            onClick={() => setIsChangingAvatar(!isChangingAvatar)}
            title="Tap to change avatar"
          >
            {avatarInfo.emoji}
          </div>
          <button
            type="button"
            onClick={() => setIsChangingAvatar(!isChangingAvatar)}
            className="absolute -bottom-2 -right-2 bg-slate-900 border border-emerald-400 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md"
          >
            ✏️ Edit
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h2 className="text-xl md:text-2xl font-black text-white">{student.fullName}</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              Level {student.level}
            </span>
          </div>

          <p className="text-xs text-amber-400 font-bold">
            🏅 {student.equippedTitle || 'Savanna Explorer'}
          </p>

          <p className="text-xs text-gray-400">
            🏫 {student.schoolName} • 📍 {student.county} County, Kenya
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 pt-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-emerald-950 text-center">
              <span className="text-[10px] text-gray-400 block">Streak</span>
              <span className="text-xs font-black text-amber-400">🔥 {student.streakDays}d</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-emerald-950 text-center">
              <span className="text-[10px] text-gray-400 block">XP</span>
              <span className="text-xs font-black text-emerald-400">⚡ {student.xp}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-emerald-950 text-center">
              <span className="text-[10px] text-gray-400 block">Coins</span>
              <span className="text-xs font-black text-yellow-400">🪙 {student.coins}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-emerald-950 text-center">
              <span className="text-[10px] text-gray-400 block">Hearts</span>
              <span className="text-xs font-black text-rose-400">❤️ {student.hearts}/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Picker Drawer */}
      {isChangingAvatar && (
        <div className="p-4 rounded-3xl bg-slate-900 border border-emerald-500/50 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {language === 'sw' ? 'Chagua Picha ya Mnyama:' : 'Choose Your Savanna Avatar:'}
            </span>
            <button
              type="button"
              onClick={() => setIsChangingAvatar(false)}
              className="text-xs text-gray-400 hover:text-white"
            >
              ✕ {language === 'sw' ? 'Funga' : 'Close'}
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {Object.values(AVATARS).map(av => (
              <button
                key={av.id}
                type="button"
                onClick={() => handleSelectAvatar(av.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  student.avatar === av.id
                    ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400'
                    : 'border-slate-800 bg-slate-950 hover:border-emerald-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${av.bgGradient} flex items-center justify-center text-xl shadow-md`}>
                  {av.emoji}
                </div>
                <span className="text-[10px] font-bold text-white mt-1 truncate max-w-[60px]">
                  {av.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Settings Section: Grade Switcher (Child's Grade is set here) */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/80 space-y-4">
        <div>
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <span>📚</span>
            <span>{language === 'sw' ? 'Darasa la Mwanafunzi' : 'CBC Grade Level'}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {language === 'sw'
              ? 'Chagua darasa lako ili kubadilisha masomo na majukumu ya KICD.'
              : 'Select your current school grade to adjust KICD curriculum subjects and quests.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {grades.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => onGradeChange(g.id)}
              className={`p-3.5 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                g.id === student.gradeId
                  ? 'border-emerald-400 bg-emerald-500 text-slate-950 shadow-md font-black scale-102'
                  : 'border-emerald-950 bg-slate-900 text-gray-300 hover:border-emerald-700 hover:text-white'
              }`}
            >
              <div className="text-sm font-black">{g.name}</div>
              <div className="text-[10px] font-medium opacity-80 mt-0.5">
                {g.levelGroup === 'LOWER_PRIMARY' ? 'Lower Primary' : 'Upper Primary'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Goal Picker */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/80 space-y-3">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <span>🎯</span>
          <span>{language === 'sw' ? 'Lengo la Kila Siku' : 'Daily Practice Goal'}</span>
        </h3>
        <p className="text-xs text-gray-400">
          {language === 'sw'
            ? 'Je, unakusudia kufanya mazoezi kwa dakika ngapi kila siku?'
            : 'How many minutes of learning do you aim to complete each day?'}
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          {[5, 10, 15].map(min => (
            <button
              key={min}
              type="button"
              onClick={() => handleGoalChange(min)}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                dailyGoalMinutes === min
                  ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-gray-400 hover:border-emerald-700'
              }`}
            >
              <div className="text-base font-black text-white">{min} Min</div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {language === 'sw'
                  ? (min === 5 ? 'Rahisi' : min === 10 ? 'Kawaida' : 'Makini')
                  : (min === 5 ? 'Easy' : min === 10 ? 'Regular' : 'Intense')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preferences Section: Language, Sound, Motion */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/80 space-y-4">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <span>⚙️</span>
          <span>{language === 'sw' ? 'Mipangilio ya Programu' : 'App Preferences'}</span>
        </h3>

        <div className="divide-y divide-emerald-950/60">
          {/* Language Toggle */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">
                {language === 'sw' ? 'Lugha ya Mfumo' : 'Interface Language'}
              </span>
              <span className="text-[11px] text-gray-400">
                {language === 'en' ? 'English (Default)' : 'Kiswahili'}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleLanguage}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-emerald-300 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              {language === 'en' ? 'Badili hadi Kiswahili (SW)' : 'Switch to English (EN)'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Sound Effects / Sauti</span>
              <span className="text-[11px] text-gray-400">
                {isMuted ? 'Sound is muted' : 'Sound effects enabled'}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleMute}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-gray-200 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Smooth Animations</span>
              <span className="text-[11px] text-gray-400">
                {reducedMotion ? 'Reduced for battery & performance' : 'Enabled'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleMotion}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-gray-200 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all"
            >
              {reducedMotion ? 'Enable Full' : 'Reduce Motion'}
            </button>
          </div>
        </div>
      </div>

      {/* Child Safety & Data Protection Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/60 text-xs text-gray-400 space-y-1 leading-relaxed">
        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Child Privacy & Kenya Data Protection Act</span>
        </span>
        <p>
          Jifuno protects children's personal data. No public chat, no tracking cookies, and all curriculum progress is stored securely under parent guardian consent.
        </p>
      </div>

      {/* Account Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenAuthModal}
          className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-800 text-gray-300 font-bold text-xs transition-all cursor-pointer text-center"
        >
          👨‍👩‍👧 Switch Role / Parent Zone
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex-1 py-3 rounded-2xl bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/80 text-rose-300 font-bold text-xs transition-all cursor-pointer text-center"
        >
          🚪 Sign Out / Ondoka
        </button>
      </div>
    </div>
  );
};
