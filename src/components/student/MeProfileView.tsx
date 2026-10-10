import React, { useState } from 'react';
import { StudentProfile, Grade, User } from '../../types/cbe.js';
import { getAvatar, AVATARS } from '../../utils/avatars.js';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference, setReducedMotionPreference } from '../../utils/motion.js';
import { CurriculumStrandsTab } from '../subject/CurriculumStrandsTab.js';

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
  onOpenTutor?: () => void;
  onStartMission?: (missionId: string) => void;
  onOpenShop?: () => void;
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
  onOpenAuthModal,
  onOpenTutor,
  onStartMission,
  onOpenShop
}) => {
  const avatarInfo = getAvatar(student.avatar);
  const currentGrade = grades.find(g => g.id === student.gradeId) || grades[1] || grades[0];
  const reducedMotion = useReducedMotionPreference();
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [showFullRubric, setShowFullRubric] = useState(false);

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
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left py-2 px-2 sm:px-0">
      {/* 1. Main Profile Card */}
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
            className="absolute -bottom-2 -right-2 bg-slate-900 border border-emerald-400 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md cursor-pointer"
          >
            ✏️ {language === 'sw' ? 'Badili' : 'Edit'}
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1.5">
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
        </div>
      </div>

      {/* 2. PROMINENT XP & COINS REWARDS SHOWCASE (Moved from Top HUD) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Experience Points (XP) */}
        <div className="p-4 rounded-3xl bg-emerald-950/40 border-2 border-emerald-600/50 shadow-lg text-center space-y-1">
          <span className="text-2xl block">⚡</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
            {student.xp}
          </span>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
            {language === 'sw' ? 'Jumla ya XP' : 'Total XP'}
          </span>
          <span className="text-[10px] text-emerald-300/80 block">
            Level {student.level} Rank
          </span>
        </div>

        {/* Shilingi Coins */}
        <div className="p-4 rounded-3xl bg-yellow-950/40 border-2 border-yellow-600/50 shadow-lg text-center space-y-1">
          <span className="text-2xl block">🪙</span>
          <span className="text-xl sm:text-2xl font-black text-yellow-400 block">
            {student.coins}
          </span>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
            {language === 'sw' ? 'Sarafu za Dukani' : 'Shilingi Coins'}
          </span>
          {onOpenShop && (
            <button
              type="button"
              onClick={onOpenShop}
              className="text-[10px] font-bold text-yellow-300 hover:text-white underline cursor-pointer"
            >
              {language === 'sw' ? 'Enda Dukani ➔' : 'Spend in Dukani ➔'}
            </button>
          )}
        </div>

        {/* Streak Days */}
        <div className="p-4 rounded-3xl bg-amber-950/40 border-2 border-amber-600/50 shadow-lg text-center space-y-1">
          <span className="text-2xl block">🔥</span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 block">
            {student.streakDays}d
          </span>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
            {language === 'sw' ? 'Mfululizo' : 'Daily Streak'}
          </span>
          <span className="text-[10px] text-amber-300/80 block">
            {student.streakDays > 0 ? 'Burning Bright' : 'Start Today!'}
          </span>
        </div>

        {/* Energy Hearts */}
        <div className="p-4 rounded-3xl bg-rose-950/40 border-2 border-rose-600/50 shadow-lg text-center space-y-1">
          <span className="text-2xl block">❤️</span>
          <span className="text-xl sm:text-2xl font-black text-rose-400 block">
            {student.hearts} / {student.maxHearts}
          </span>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
            {language === 'sw' ? 'Nishati ya Moyo' : 'Lesson Hearts'}
          </span>
          <span className="text-[10px] text-rose-300/80 block">
            {student.hearts === student.maxHearts ? 'Full Energy' : 'Refill in Shop'}
          </span>
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
              className="text-xs text-gray-400 hover:text-white cursor-pointer"
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

      {/* 3. Grade Selection */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/80 space-y-3">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <span>📚</span>
          <span>{language === 'sw' ? 'Darasa la Mtaala wa CBC' : 'CBC Grade Level'}</span>
        </h3>
        <p className="text-xs text-gray-300">
          {language === 'sw'
            ? 'Masomo, dhana na changamoto zimepangwa kulingana na muundo wa KICD.'
            : 'Curriculum strands, competencies, and quests are tailored for this grade level.'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {grades.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                sound.playClick();
                onGradeChange(g.id);
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer min-h-[56px] flex flex-col items-center justify-center ${
                student.gradeId === g.id
                  ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 ring-2 ring-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-gray-400 hover:border-emerald-700'
              }`}
            >
              <span className="text-sm font-black text-white">{g.name}</span>
              <span className="text-[10px] text-gray-400">{g.ageRange}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Daily Learning Goal */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/80 space-y-3">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <span>🎯</span>
          <span>{language === 'sw' ? 'Lengo la Kila Siku' : 'Daily Learning Goal'}</span>
        </h3>
        <p className="text-xs text-gray-300">
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
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer min-h-[52px] ${
                dailyGoalMinutes === min
                  ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 ring-1 ring-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-gray-400 hover:border-emerald-700'
              }`}
            >
              <div className="text-base font-black text-white">{min} Min</div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {min === 5 ? 'Easy' : min === 10 ? 'Regular' : 'Intense'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. PARENT & TEACHER ZONE (Moved Rubric & Sparkle Button here) */}
      <div className="p-5 rounded-3xl bg-slate-950 border-2 border-emerald-700/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div>
              <h3 className="text-sm font-black text-white">
                {language === 'sw' ? 'Eneo la Wazazi na Walimu' : 'Parent & Teacher Area'}
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                KICD Rubrics, Competency Breakdown & Pedagogy
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Toggle Full Strands Rubric */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowFullRubric(!showFullRubric);
            }}
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-emerald-600/60 text-left transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <span className="text-xs font-black text-white block group-hover:text-emerald-300">
                  {showFullRubric ? 'Hide Full Rubric' : 'Full Strands Rubric'}
                </span>
                <span className="text-[11px] text-gray-400">
                  View CBC mastery levels & competencies
                </span>
              </div>
            </div>
          </button>

          {/* Socratic AI Tutor Button (The Sparkle Companion) */}
          {onOpenTutor && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTutor();
              }}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-amber-500/60 text-left transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦉</span>
                <div>
                  <span className="text-xs font-black text-amber-300 block group-hover:text-amber-200">
                    Socratic AI Companion
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Consult Rafiki for pedagogical coaching
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Inline Rubric Viewer */}
        {showFullRubric && (
          <div className="pt-3 border-t border-emerald-900/60 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">
                CBC Grade Matrix: {currentGrade.name}
              </span>
              <button
                type="button"
                onClick={() => setShowFullRubric(false)}
                className="text-xs text-gray-400 hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <CurriculumStrandsTab
              gradeId={student.gradeId}
              student={student}
              onStartQuest={onStartMission || (() => {})}
              language={language}
            />
          </div>
        )}
      </div>

      {/* 6. Preferences: Language, Sound, Motion */}
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
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-emerald-300 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all min-h-[44px]"
            >
              {language === 'en' ? 'Switch to Kiswahili (SW)' : 'Badili hadi English (EN)'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Sound Effects</span>
              <span className="text-[11px] text-gray-400">
                {isMuted ? 'Muted' : 'Enabled'}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleMute}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-gray-200 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all flex items-center gap-1.5 min-h-[44px]"
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
                {reducedMotion ? 'Reduced for battery' : 'Full Motion'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleMotion}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/80 text-gray-200 font-bold text-xs hover:border-emerald-400 cursor-pointer transition-all min-h-[44px]"
            >
              {reducedMotion ? 'Enable Full' : 'Reduce Motion'}
            </button>
          </div>
        </div>
      </div>

      {/* 7. Child Safety & Data Protection Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/60 text-xs text-gray-400 space-y-1 leading-relaxed">
        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Child Privacy & Kenya Data Protection Act</span>
        </span>
        <p>
          Jifuno protects children's personal data. No public chat, no tracking cookies, and all curriculum progress is stored securely under parent guardian consent.
        </p>
      </div>

      {/* 8. Account Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenAuthModal}
          className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-800 text-gray-300 font-bold text-xs transition-all cursor-pointer text-center min-h-[48px]"
        >
          👨‍👩‍👧 Switch Role / Parent Zone
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex-1 py-3 rounded-2xl bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/80 text-rose-300 font-bold text-xs transition-all cursor-pointer text-center min-h-[48px]"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};
