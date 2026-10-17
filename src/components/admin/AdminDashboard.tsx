import React, { useState, useEffect } from 'react';
import { Question, ContentStatus, QuestionType, DifficultyLevel, User } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { AnalyticsDashboard } from './AnalyticsDashboard.js';
import { BulkContentImportModal } from './BulkContentImportModal.js';

interface Props {
  currentUser?: User | null;
}

export type AdminTab = 'REPORTS' | 'FAILURES' | 'COMPLETIONS' | 'DAILY_ACTIVE' | 'QUESTIONS' | 'ANALYTICS';

interface ProblemReportItem {
  report_id: string;
  question_id: string;
  prompt: string;
  question_type?: string;
  sub_strand_id?: string;
  learner_id: string;
  note: string;
  status: 'OPEN' | 'RESOLVED' | 'DISMISSED';
  created_at: string;
}

interface FailureRateItem {
  question_id: string;
  prompt: string;
  question_type: string;
  sub_strand_id: string;
  difficulty: string;
  total_attempts: number;
  failed_attempts: number;
  failure_rate_pct: number;
  avg_time_ms: number;
}

interface LessonCompletionItem {
  lesson_id: string;
  total_learners: number;
  completed_count: number;
  completion_rate_pct: number;
  avg_score_pct: number;
  avg_stars: number;
}

interface DailyActiveItem {
  activity_date: string;
  active_learners_count: number;
  total_attempts: number;
  success_rate_pct: number;
}

export const AdminDashboard: React.FC<Props> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('REPORTS');

  // Tab 1: Problem Reports
  const [reports, setReports] = useState<ProblemReportItem[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportFilter, setReportFilter] = useState<'OPEN' | 'RESOLVED' | 'ALL'>('OPEN');

  // Tab 2: Failure Rates
  const [failureRates, setFailureRates] = useState<FailureRateItem[]>([]);
  const [loadingFailures, setLoadingFailures] = useState(false);

  // Tab 3: Lesson Completion
  const [completionRates, setCompletionRates] = useState<LessonCompletionItem[]>([]);
  const [loadingCompletions, setLoadingCompletions] = useState(false);

  // Tab 4: Daily Active Learners
  const [dailyActive, setDailyActive] = useState<DailyActiveItem[]>([]);
  const [loadingDaily, setLoadingDaily] = useState(false);

  // Tab 5: Question Pipeline (Existing)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // New Question Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [newScenario, setNewScenario] = useState('');
  const [newType, setNewType] = useState<QuestionType>('MULTIPLE_CHOICE');
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>('EASY');
  const [newHint, setNewHint] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newStatus, setNewStatus] = useState<ContentStatus>('REVIEW');
  const [newOptionsText, setNewOptionsText] = useState('Option 1, Option 2, Option 3, Option 4');

  // Role Security Guard: If role is present and not ADMIN, block access
  const isUnauthorized = currentUser && currentUser.role !== 'ADMIN';

  useEffect(() => {
    loadReports();
    loadFailureRates();
    loadCompletionRates();
    loadDailyActive();
    loadQuestions();
  }, []);

  const loadReports = async () => {
    try {
      setLoadingReports(true);
      const res = await cbeApi.getAdminReports();
      setReports(res.reports || []);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoadingReports(false);
    }
  };

  const loadFailureRates = async () => {
    try {
      setLoadingFailures(true);
      const res = await cbeApi.getAdminFailureRates();
      setFailureRates(res.failureRates || []);
    } catch (err) {
      console.error('Failed to load failure rates:', err);
    } finally {
      setLoadingFailures(false);
    }
  };

  const loadCompletionRates = async () => {
    try {
      setLoadingCompletions(true);
      const res = await cbeApi.getAdminLessonCompletionRates();
      setCompletionRates(res.completionRates || []);
    } catch (err) {
      console.error('Failed to load completion rates:', err);
    } finally {
      setLoadingCompletions(false);
    }
  };

  const loadDailyActive = async () => {
    try {
      setLoadingDaily(true);
      const res = await cbeApi.getAdminDailyActiveLearners();
      setDailyActive(res.dailyActiveLearners || []);
    } catch (err) {
      console.error('Failed to load daily active learners:', err);
    } finally {
      setLoadingDaily(false);
    }
  };

  const loadQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const res = await cbeApi.getAdminQuestions();
      setQuestions(res.questions || []);
    } catch (err) {
      console.error('Failed to load admin questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleResolveReport = async (reportId: string, status: 'RESOLVED' | 'DISMISSED') => {
    try {
      sound.playClick();
      await cbeApi.resolveAdminReport(reportId, status);
      setReports(prev => prev.map(r => r.report_id === reportId ? { ...r, status } : r));
    } catch (err) {
      console.error('Error resolving report:', err);
    }
  };

  const handleStatusChange = async (qId: string, status: ContentStatus) => {
    try {
      sound.playClick();
      await cbeApi.updateQuestionStatus(qId, status);
      setQuestions(prev => prev.map(q => q.id === qId ? { ...q, contentStatus: status } : q));
    } catch (err) {
      console.error('Error changing question status:', err);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sound.playClick();
      const opts = newOptionsText.split(',').map((t, idx) => ({
        id: `opt-${idx + 1}`,
        text: t.trim()
      }));

      await cbeApi.createAdminQuestion({
        prompt: newPrompt.trim(),
        storyScenario: newScenario.trim(),
        type: newType,
        difficulty: newDifficulty,
        subStrandId: 'substrand-multiplication',
        options: opts,
        correctOptionId: 'opt-2',
        socraticHint: newHint.trim(),
        explanation: newExplanation.trim(),
        kenyanCulturalContext: newContext.trim(),
        sourceType: 'AI_PRACTICE',
        contentStatus: newStatus
      });

      sound.playCorrect();
      setIsCreateOpen(false);
      resetForm();
      loadQuestions();
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  const resetForm = () => {
    setNewPrompt('');
    setNewScenario('');
    setNewHint('');
    setNewExplanation('');
    setNewContext('');
  };

  if (isUnauthorized) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-slate-950 border-2 border-rose-500/50 text-center space-y-4 my-12 shadow-2xl">
        <span className="text-4xl block">⛔</span>
        <h2 className="text-xl font-black text-rose-300">Access Restricted: Admin Role Required</h2>
        <p className="text-xs text-gray-300">
          This management console and analytical telemetries are strictly reserved for Content Administrators.
          Learner and Guardian accounts cannot view or query administrative records.
        </p>
      </div>
    );
  }

  const openReportsCount = reports.filter(r => r.status === 'OPEN').length;
  const filteredReports = reportFilter === 'ALL'
    ? reports
    : reports.filter(r => r.status === reportFilter);

  const highestFailureRate = failureRates.length > 0 ? failureRates[0].failure_rate_pct : 0;
  const avgCompletionPct = completionRates.length > 0
    ? Math.round(completionRates.reduce((acc, c) => acc + c.completion_rate_pct, 0) / completionRates.length)
    : 0;
  const latestDau = dailyActive.length > 0 ? dailyActive[0].active_learners_count : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in text-left">
      {/* 1. Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-2 border-purple-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            <span>⚙️ Jifuno Administration</span>
            <span>•</span>
            <span>Quality Assurance & Telemetry</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Administrative Control Center
          </h2>
          <p className="text-xs md:text-sm text-purple-100/90 max-w-2xl">
            Monitor real-time learner failure rates, triage open content reports, inspect lesson completion funnels, and curate Kenyan curriculum questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsImportOpen(true);
            }}
            className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/40 font-black text-xs md:text-sm shadow cursor-pointer whitespace-nowrap flex items-center gap-1.5 transition-all"
          >
            <span>📥 Bulk Import</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsCreateOpen(true);
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-xs md:text-sm shadow-lg cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>+ Add Curriculum Question</span>
          </button>
        </div>
      </div>

      {/* 2. Key Administrative Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/40 shadow text-center space-y-1">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wide block">Open Problem Reports</span>
          <span className="text-2xl font-black text-white">{openReportsCount}</span>
          <span className="text-[10px] text-gray-400 block">Needs triage</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 shadow text-center space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block">Max Question Failure</span>
          <span className="text-2xl font-black text-white">{highestFailureRate}%</span>
          <span className="text-[10px] text-gray-400 block">High friction item</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 shadow text-center space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">Avg Lesson Completion</span>
          <span className="text-2xl font-black text-white">{avgCompletionPct}%</span>
          <span className="text-[10px] text-gray-400 block">Across all quests</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/40 shadow text-center space-y-1">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide block">Daily Active Learners</span>
          <span className="text-2xl font-black text-white">{latestDau}</span>
          <span className="text-[10px] text-gray-400 block">Active today</span>
        </div>
      </div>

      {/* 3. Primary Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('REPORTS');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'REPORTS'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>🚩 Problem Reports</span>
          {openReportsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
              {openReportsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('FAILURES');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'FAILURES'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>📉 High Failure Rates</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('COMPLETIONS');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'COMPLETIONS'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>📊 Lesson Completion Rates</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('DAILY_ACTIVE');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'DAILY_ACTIVE'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>👥 Daily Active Learners</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('QUESTIONS');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'QUESTIONS'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>📚 Question Bank ({questions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('ANALYTICS');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'ANALYTICS'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>📈 Executive Analytics</span>
        </button>
      </div>

      {/* 4. Tab Views */}

      {/* VIEW 1: OPEN PROBLEM REPORTS */}
      {activeTab === 'REPORTS' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>🚩</span>
                <span>Learner Problem Reports ({filteredReports.length})</span>
              </h3>
              <p className="text-xs text-gray-400">
                Issues flagged by students in the lesson runner ("Report a problem" button).
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['OPEN', 'RESOLVED', 'ALL'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setReportFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reportFilter === f ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loadingReports ? (
            <p className="text-xs text-gray-400 py-8 text-center">Loading problem reports...</p>
          ) : filteredReports.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl block">🎉</span>
              <p className="text-sm font-bold text-emerald-400">No open problem reports!</p>
              <p className="text-xs text-gray-400">All questions are in good standing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReports.map(rep => (
                <div
                  key={rep.report_id}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        rep.status === 'OPEN' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {rep.status}
                      </span>
                      <span className="text-xs font-mono text-purple-300 font-bold">
                        {rep.question_id}
                      </span>
                      {rep.question_type && (
                        <span className="text-[10px] bg-slate-800 text-gray-300 px-2 py-0.5 rounded">
                          {rep.question_type}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-gray-400">
                      Reported: {new Date(rep.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-300">Prompt:</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">{rep.prompt}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-950 text-xs text-rose-200">
                    <span className="font-bold text-rose-400 block mb-0.5">Learner Note:</span>
                    "{rep.note}"
                  </div>

                  {rep.status === 'OPEN' && (
                    <div className="flex gap-2 pt-1 justify-end">
                      <button
                        type="button"
                        onClick={() => handleResolveReport(rep.report_id, 'RESOLVED')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow transition-all"
                      >
                        ✓ Mark Resolved
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveReport(rep.report_id, 'DISMISSED')}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs cursor-pointer transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: QUESTIONS WITH HIGHEST FAILURE RATE */}
      {activeTab === 'FAILURES' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>📉</span>
              <span>Questions with Highest Failure Rate</span>
            </h3>
            <p className="text-xs text-gray-400">
              Aggregated from the <code>attempts</code> table to pinpoint ambiguous prompts, tricky answer keys, or missing prerequisites.
            </p>
          </div>

          {loadingFailures ? (
            <p className="text-xs text-gray-400 py-8 text-center">Calculating failure rates...</p>
          ) : failureRates.length === 0 ? (
            <p className="text-xs text-gray-400 py-8 text-center">No failure data recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {failureRates.map((f, idx) => (
                <div
                  key={f.question_id}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-gray-300 text-[10px] font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-purple-300 font-bold">{f.question_id}</span>
                      <span className="text-[10px] bg-slate-800 text-gray-300 px-2 py-0.5 rounded">
                        {f.question_type}
                      </span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-bold">
                        {f.difficulty}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white">{f.prompt}</p>

                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <span>Total Attempts: <strong>{f.total_attempts}</strong></span>
                      <span>Failed: <strong>{f.failed_attempts}</strong></span>
                      <span>Avg Time: <strong>{Math.round(f.avg_time_ms / 1000)}s</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <div className="text-right">
                      <span className={`text-2xl font-black ${
                        f.failure_rate_pct >= 50 ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {f.failure_rate_pct}%
                      </span>
                      <span className="text-[10px] text-gray-400 block">Failure Rate</span>
                    </div>

                    {f.failure_rate_pct >= 50 && (
                      <span className="mt-1 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold">
                        ⚠️ High Friction
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: LESSON COMPLETION RATES */}
      {activeTab === 'COMPLETIONS' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>📊</span>
              <span>Lesson Completion Rates & Progression Funnel</span>
            </h3>
            <p className="text-xs text-gray-400">
              Monitored via <code>lesson_progress</code> to analyze curriculum retention and identify drop-off checkpoints.
            </p>
          </div>

          {loadingCompletions ? (
            <p className="text-xs text-gray-400 py-8 text-center">Loading completion rates...</p>
          ) : (
            <div className="space-y-3">
              {completionRates.map(c => (
                <div
                  key={c.lesson_id}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-black text-white">{c.lesson_id}</span>
                    <span className="text-sm font-black text-emerald-400">
                      {c.completion_rate_pct}% Completed
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                      style={{ width: `${c.completion_rate_pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                    <span>
                      Enrolled: <strong>{c.total_learners}</strong> • Completed: <strong>{c.completed_count}</strong>
                    </span>
                    <span>
                      Avg Score: <strong>{c.avg_score_pct}%</strong> • Stars: <strong>⭐ {c.avg_stars}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: DAILY ACTIVE LEARNERS */}
      {activeTab === 'DAILY_ACTIVE' && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>👥</span>
              <span>Daily Active Learners & Platform Engagement</span>
            </h3>
            <p className="text-xs text-gray-400">
              Aggregated daily learner telemetry from <code>attempts</code> table over the last 14 days.
            </p>
          </div>

          {loadingDaily ? (
            <p className="text-xs text-gray-400 py-8 text-center">Loading active learner trends...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dailyActive.map(d => (
                <div
                  key={d.activity_date}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-300 font-mono">
                      {d.activity_date}
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      {d.success_rate_pct}% Success
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-2xl font-black text-white">{d.active_learners_count}</span>
                    <span className="text-[11px] text-gray-400 block">Active Learners</span>
                  </div>

                  <p className="text-[11px] text-gray-400 border-t border-slate-800/80 pt-1.5">
                    Total Attempts: <strong>{d.total_attempts}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 5: QUESTION PIPELINE (ORIGINAL CURATION WORKFLOW) */}
      {activeTab === 'QUESTIONS' && (
        <div className="space-y-4">
          {/* Pipeline Status Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                statusFilter === 'ALL' ? 'border-purple-400 bg-purple-950/60' : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Questions</span>
              <span className="text-2xl font-black text-white mt-1">{questions.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter('PUBLISHED')}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                statusFilter === 'PUBLISHED' ? 'border-emerald-400 bg-emerald-950/60' : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Published Live</span>
              <span className="text-2xl font-black text-emerald-300 mt-1">
                {questions.filter(q => q.contentStatus === 'PUBLISHED').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter('REVIEW')}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                statusFilter === 'REVIEW' ? 'border-amber-400 bg-amber-950/60' : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              <span className="text-[10px] text-amber-400 font-bold uppercase block">In Review / AI Drafts</span>
              <span className="text-2xl font-black text-amber-300 mt-1">
                {questions.filter(q => q.contentStatus === 'REVIEW' || q.contentStatus === 'DRAFT').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter('APPROVED')}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                statusFilter === 'APPROVED' ? 'border-blue-400 bg-blue-950/60' : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              <span className="text-[10px] text-blue-400 font-bold uppercase block">Approved</span>
              <span className="text-2xl font-black text-blue-300 mt-1">
                {questions.filter(q => q.contentStatus === 'APPROVED').length}
              </span>
            </button>
          </div>

          {/* Questions Table */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>📚</span>
                <span>Question Bank & Validation Workflow ({questions.length})</span>
              </h3>
              <span className="text-xs text-gray-400 font-medium">Filter: {statusFilter}</span>
            </div>

            {loadingQuestions ? (
              <p className="text-xs text-gray-400 py-8 text-center">Loading questions...</p>
            ) : (
              <div className="space-y-3">
                {questions
                  .filter(q => statusFilter === 'ALL' || q.contentStatus === statusFilter)
                  .map(q => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-800 text-gray-300 px-2 py-0.5 rounded font-mono">
                            {q.type}
                          </span>
                          <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-bold">
                            {q.difficulty}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            Source: {q.sourceType}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <select
                          value={q.contentStatus}
                          onChange={(e) => handleStatusChange(q.id, e.target.value as ContentStatus)}
                          className="bg-slate-950 border border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-purple-400"
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="REVIEW">REVIEW</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </div>

                      <h4 className="text-sm font-bold text-white">{q.prompt}</h4>
                      {q.storyScenario && (
                        <p className="text-xs text-amber-200/90 italic">"{q.storyScenario}"</p>
                      )}

                      <div className="text-[11px] text-gray-400 space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <div>
                          <span className="text-emerald-400 font-bold">Socratic Hint: </span>
                          {q.socraticHint}
                        </div>
                        <div>
                          <span className="text-amber-400 font-bold">Explanation: </span>
                          {q.explanation}
                        </div>
                        <div>
                          <span className="text-blue-400 font-bold">Kenyan Cultural Context: </span>
                          {q.kenyanCulturalContext}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 6: EXECUTIVE ANALYTICS DASHBOARD */}
      {activeTab === 'ANALYTICS' && (
        <AnalyticsDashboard />
      )}

      {/* Modal: Create Question */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <form
            onSubmit={handleCreateQuestion}
            className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-4 my-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Create New Curriculum Question</h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as QuestionType)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="SCENARIO">Kenyan Scenario</option>
                  <option value="TRUE_FALSE">True / False</option>
                  <option value="FILL_BLANK">Fill In The Blank</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="ADVANCED">ADVANCED</option>
                  <option value="MASTERY">MASTERY</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Question Prompt</label>
              <textarea
                required
                rows={2}
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="e.g. Amina has 4 rows of 5 seedlings..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Story Scenario (Kenyan context)</label>
              <input
                type="text"
                value={newScenario}
                onChange={(e) => setNewScenario(e.target.value)}
                placeholder="e.g. In Nakuru County, Amina prepares the shamba bed before the rains."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Options (Comma-separated)</label>
              <input
                type="text"
                value={newOptionsText}
                onChange={(e) => setNewOptionsText(e.target.value)}
                placeholder="Option A, Option B, Option C, Option D"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Socratic Hint (Guidance)</label>
              <input
                type="text"
                required
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                placeholder="e.g. Think of 4 groups of 5. Skip count by 5!"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Explanation</label>
              <input
                type="text"
                required
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                placeholder="e.g. 4 rows multiplied by 5 seedlings equals 20 seedlings in total."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Kenyan Cultural Context</label>
              <input
                type="text"
                value={newContext}
                onChange={(e) => setNewContext(e.target.value)}
                placeholder="e.g. Sukuma wiki is grown widely across all 47 counties."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs cursor-pointer"
              >
                Save & Add to Pipeline
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Bulk Content Import */}
      <BulkContentImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportSuccess={() => {
          loadQuestions();
        }}
      />
    </div>
  );
};
