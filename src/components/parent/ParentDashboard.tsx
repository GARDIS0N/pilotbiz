import React, { useState, useEffect } from 'react';
import { ParentProfile, StudentProfile, StrandMastery, LearningSessionResult } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { getAvatar } from '../../utils/avatars.js';
import { ParentBillingSection } from './ParentBillingSection.js';
import { ShareableAchievementCard } from './ShareableAchievementCard.js';

export const ParentDashboard: React.FC = () => {
  const [parent, setParent] = useState<ParentProfile | null>(null);
  const [childrenData, setChildrenData] = useState<{
    student: StudentProfile;
    masteries: StrandMastery[];
    recentSessions: LearningSessionResult[];
    totalStudyMinutes: number;
  }[]>([]);
  const [selectedChildIdx, setSelectedChildIdx] = useState(0);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState<any>(null);
  const [parentTab, setParentTab] = useState<'PROGRESS' | 'BILLING' | 'CERTIFICATE'>('PROGRESS');

  useEffect(() => {
    loadParentData();
  }, []);

  const activeChild = childrenData[selectedChildIdx];

  useEffect(() => {
    if (activeChild?.student?.id) {
      cbeApi.getParentWeeklySummary(activeChild.student.id)
        .then(res => setWeeklySummary(res.summary))
        .catch(err => console.warn('Weekly summary fetch notice:', err));
    }
  }, [activeChild?.student?.id]);

  const loadParentData = async () => {
    try {
      setLoading(true);
      const res = await cbeApi.getParentChildren();
      setParent(res.parent);
      setChildrenData(res.children);
    } catch (err) {
      console.error('Failed to load parent data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNudge = () => {
    sound.playCorrect();
    setNudgeSent(true);
    setTimeout(() => setNudgeSent(false), 4000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-emerald-300">Loading parent insights...</p>
      </div>
    );
  }

  const currentChild = childrenData[selectedChildIdx];
  const avatar = currentChild ? getAvatar(currentChild.student.avatar) : getAvatar('cheetah');

  const proficientStrands = currentChild?.masteries.filter(
    m => m.status === 'EXCEEDING' || m.status === 'PROFICIENT'
  ) || [];

  const attentionStrands = currentChild?.masteries.filter(
    m => m.status === 'NEEDS_PRACTICE' || m.status === 'DEVELOPING'
  ) || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span>👨‍👩‍👧 Jifuno Parent Dashboard</span>
            <span>•</span>
            <span>Kenyan CBE Insights</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Karibu, {parent?.fullName || 'Mama Amina'}!
          </h2>
          <p className="text-xs md:text-sm text-emerald-200/90 max-w-xl">
            Track your child's Jifuno progress, celebrate achievements, and explore Jifuno learning activity recommendations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSendNudge}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs md:text-sm shadow-lg shadow-amber-950/60 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <span>{nudgeSent ? '❤️ Encouragement Sent!' : '🌟 Send High-Five Nudge'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setParentTab('PROGRESS');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            parentTab === 'PROGRESS'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>📊 Learner Progress & Mastery</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setParentTab('BILLING');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            parentTab === 'BILLING'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>💳 M-Pesa Subscription & Billing</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setParentTab('CERTIFICATE');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            parentTab === 'CERTIFICATE'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>🏆 Shareable Report Card</span>
        </button>
      </div>

      {/* Child Switcher & Summary Card */}
      {parentTab === 'PROGRESS' && currentChild && (
        <div className="bg-slate-950/80 border border-emerald-900/60 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${avatar.bgGradient} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                {avatar.emoji}
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{currentChild.student.fullName}</h3>
                <p className="text-xs text-emerald-400">
                  {currentChild.student.schoolName} • {currentChild.student.county} County
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center gap-3 md:gap-6 flex-wrap">
              <div className="text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Level</span>
                <span className="text-base font-black text-emerald-300">Lvl {currentChild.student.level}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Streak</span>
                <span className="text-base font-black text-amber-400">{currentChild.student.streakDays} Days 🔥</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Study Time</span>
                <span className="text-base font-black text-teal-300">{currentChild.totalStudyMinutes} mins</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Tokens</span>
                <span className="text-base font-black text-yellow-400">{currentChild.student.coins} 🪙</span>
              </div>
            </div>
          </div>

          {/* Automated Weekly Learning Summary Card (Step 6 Scheduled Job Integration) */}
          {weeklySummary && (
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/50 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📬</span>
                  <div>
                    <h4 className="text-sm font-black text-white">Weekly Learning Summary</h4>
                    <p className="text-[11px] text-emerald-400">
                      Report for {weeklySummary.week_start_date} to {weeklySummary.week_end_date}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  {weeklySummary.accuracy_percentage}% Weekly Accuracy
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
                  <span className="text-[10px] text-gray-400 block font-bold">Lessons Completed</span>
                  <span className="text-lg font-black text-white">{weeklySummary.lessons_completed}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
                  <span className="text-[10px] text-gray-400 block font-bold">Active Time</span>
                  <span className="text-lg font-black text-teal-300">{weeklySummary.total_time_minutes} min</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-emerald-900/60">
                  <span className="text-[10px] text-gray-400 block font-bold">Total Questions</span>
                  <span className="text-lg font-black text-emerald-300">{weeklySummary.total_attempts}</span>
                </div>
              </div>

              {/* Weak Topics and Strong Topics breakdown */}
              {Array.isArray(weeklySummary.weak_topics) && weeklySummary.weak_topics.length > 0 && (
                <div className="pt-2 border-t border-emerald-950/80">
                  <span className="text-xs font-bold text-amber-300 block mb-1">
                    🎯 Weekly Focus Topics (Needing Practice):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {weeklySummary.weak_topics.map((t: any, idx: number) => (
                      <span key={idx} className="text-[11px] bg-amber-950/60 text-amber-200 border border-amber-600/40 px-2 py-0.5 rounded-lg">
                        {t.topic}: {t.accuracy_pct}% ({t.attempts} attempts)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mastered vs Needing Attention Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proficient Concepts */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span>✅</span>
                  <span>Competencies Mastered</span>
                </h4>
                <span className="text-xs bg-emerald-800/60 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  {proficientStrands.length} Strands
                </span>
              </div>

              <div className="space-y-3">
                {proficientStrands.map(str => (
                  <div key={str.strandId} className="bg-slate-950/70 p-3.5 rounded-xl border border-emerald-900/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{str.strandTitle}</span>
                      <span className="text-emerald-400 font-black">{str.masteryPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${str.masteryPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 block">
                      {str.learningAreaName} • Status: {str.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Needing Attention Concepts */}
            <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <span>💡</span>
                  <span>Concepts Needing Practice</span>
                </h4>
                <span className="text-xs bg-amber-800/60 text-amber-200 px-2 py-0.5 rounded-full font-bold">
                  {attentionStrands.length} Strands
                </span>
              </div>

              <div className="space-y-3">
                {attentionStrands.map(str => (
                  <div key={str.strandId} className="bg-slate-950/70 p-3.5 rounded-xl border border-amber-900/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{str.strandTitle}</span>
                      <span className="text-amber-400 font-black">{str.masteryPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${str.masteryPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-amber-200/80 block">
                      {str.learningAreaName} • Status: {str.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Home Coaching Guidance */}
          <div className="bg-gradient-to-r from-amber-950/50 via-slate-950 to-emerald-950/50 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <span>🏠</span>
              <span>Parent Home Coaching Recommendations</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-emerald-900/40">
                <span className="font-bold text-emerald-400 block mb-1">Kiswahili Ngeli Practice:</span>
                Point to objects around the living room and kitchen (kiti, meza, vitabu) and encourage your child to identify their correct Swahili noun classes (KI-VI).
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-amber-900/40">
                <span className="font-bold text-amber-400 block mb-1">Market Math & Currency:</span>
                When buying sukuma wiki or milk at the neighbourhood kiosk, give your child the cash and ask them to calculate the expected change before the vendor hands it over.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BILLING TAB */}
      {parentTab === 'BILLING' && (
        <ParentBillingSection
          parentUserId={parent?.id}
          studentId={activeChild?.student?.id}
          onSubscriptionUpdated={loadParentData}
        />
      )}

      {/* CERTIFICATE / SHAREABLE MILESTONE TAB */}
      {parentTab === 'CERTIFICATE' && (
        <ShareableAchievementCard
          studentName={activeChild?.student?.fullName || 'Amina Muthoni'}
          gradeName="Grade 4"
          strandTitle={proficientStrands[0]?.strandTitle || 'Numbers & Operations'}
          accuracyPct={proficientStrands[0]?.masteryPercentage || 92}
          starsCount={Math.min(5, Math.max(1, Math.round(activeChild?.student?.level || 3)))}
          learningArea="Mathematics"
        />
      )}
    </div>
  );
};
