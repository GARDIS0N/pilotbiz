import React, { useState } from 'react';
import {
  TaskItem,
  GoalItem,
  CommitmentItem,
  DailyLogItem,
  WeeklyReviewReport,
  IdeaBacklogItem,
  TimetableRoutine,
  NoteItem,
  TaskPriority,
  TaskCategory,
  GoalPriorityTier,
  FullBriefingReport,
} from '../types/jarvis';
import {
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
  BookOpen,
  ListTodo,
  Calendar,
  AlertCircle,
  BookmarkCheck,
  Search,
  Flame,
  Star,
  Target,
  Brain,
  History,
  Clock,
  TrendingUp,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Handshake,
  Lightbulb,
  GraduationCap,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';

interface TasksPanelProps {
  tasks: TaskItem[];
  goals: GoalItem[];
  commitments: CommitmentItem[];
  dailyLogs: DailyLogItem[];
  weeklyScorecard: WeeklyReviewReport | null;
  ideaBacklog: IdeaBacklogItem[];
  timetable: TimetableRoutine;
  notes: NoteItem[];
  streakCount: number;
  todayMission: string;
  definitionOfVictory: string;
  activeReport: FullBriefingReport | null;
  onAddTask: (task: {
    title: string;
    priority: TaskPriority;
    category: TaskCategory;
    dueTime?: string;
    estimatedMinutes?: number;
    isTop3?: boolean;
    goalId?: string;
  }) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onRescheduleTask: (id: string, newTime?: string) => void;
  onToggleTop3: (id: string) => void;
  onStartFocusOnTask: (task: TaskItem) => void;
  onStart5MinRuleOnTask: (task: TaskItem) => void;
  onAddGoal: (goal: Partial<GoalItem>) => void;
  onUpdateGoalProgress: (id: string, progress: number) => void;
  onDeleteGoal: (id: string) => void;
  onAddCommitment: (comm: { commitment: string; deadline: string; whyItMatters: string }) => void;
  onToggleCommitment: (id: string, status: 'completed' | 'failed') => void;
  onDeleteCommitment: (id: string) => void;
  onSaveDailyLog: (log: Partial<DailyLogItem>) => void;
  onParkIdea: (idea: string, strategicValue?: string) => void;
  onDeleteIdea: (id: string) => void;
  onPromoteIdeaToTask: (id: string) => void;
  onSaveTimetable: (routine: TimetableRoutine) => void;
  onAddNote: (topic: string, content: string) => void;
  onDeleteNote: (id: string) => void;
  onTriggerCommand: (command: string) => void;
  onOpenReportModal: () => void;
}

export const TasksPanel: React.FC<TasksPanelProps> = ({
  tasks,
  goals,
  commitments,
  dailyLogs,
  weeklyScorecard,
  ideaBacklog,
  timetable,
  notes,
  streakCount,
  todayMission,
  definitionOfVictory,
  activeReport,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onRescheduleTask,
  onToggleTop3,
  onStartFocusOnTask,
  onStart5MinRuleOnTask,
  onAddGoal,
  onUpdateGoalProgress,
  onDeleteGoal,
  onAddCommitment,
  onToggleCommitment,
  onDeleteCommitment,
  onSaveDailyLog,
  onParkIdea,
  onDeleteIdea,
  onPromoteIdeaToTask,
  onSaveTimetable,
  onAddNote,
  onDeleteNote,
  onTriggerCommand,
  onOpenReportModal,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'tasks' | 'goals' | 'commitments' | 'reviews' | 'timetable' | 'backlog' | 'notes'>('today');

  // Task creation state
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('HIGH');
  const [newCategory, setNewCategory] = useState<TaskCategory>('nestlist');
  const [newDueTime, setNewDueTime] = useState('');
  const [newEstimatedMin, setNewEstimatedMin] = useState<number>(30);
  const [newIsTop3, setNewIsTop3] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<'all' | TaskCategory>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Goal creation state
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<TaskCategory>('nestlist');
  const [goalWeeklyTarget, setGoalWeeklyTarget] = useState('');
  const [goalDailyAction, setGoalDailyAction] = useState('');
  const [goalMetrics, setGoalMetrics] = useState('');
  const [goalTier, setGoalTier] = useState<GoalPriorityTier>('MUST_WIN');

  // Commitment form state
  const [commitText, setCommitText] = useState('');
  const [commitDeadline, setCommitDeadline] = useState('');
  const [commitWhy, setCommitWhy] = useState('');

  // Daily review form state
  const [reviewScore, setReviewScore] = useState<number>(8.5);
  const [reviewWins, setReviewWins] = useState('');
  const [reviewMisses, setReviewMisses] = useState('');
  const [reviewClassification, setReviewClassification] = useState('Procrastination');
  const [reviewTomorrowTop3, setReviewTomorrowTop3] = useState('');
  const [reviewTomorrowNumberOne, setReviewTomorrowNumberOne] = useState('');

  // Idea Backlog form state
  const [ideaText, setIdeaText] = useState('');
  const [ideaValue, setIdeaValue] = useState('');

  // Timetable form state
  const [editTimetableSchedule, setEditTimetableSchedule] = useState(timetable.classSchedule);
  const [editTimetableBlocks, setEditTimetableBlocks] = useState(timetable.studyBlocks);
  const [editTimetableNotes, setEditTimetableNotes] = useState(timetable.routineNotes);

  // Note state
  const [noteTopic, setNoteTopic] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteSearch, setNoteSearch] = useState('');

  // Calculations
  const top3Tasks = tasks.filter((t) => t.isTop3);
  const completedTop3 = top3Tasks.filter((t) => t.completed);
  const isTop3AllDone = top3Tasks.length > 0 && completedTop3.length === top3Tasks.length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask({
      title: newTitle.trim(),
      priority: newPriority,
      category: newCategory,
      dueTime: newDueTime.trim() || undefined,
      estimatedMinutes: newEstimatedMin || 30,
      isTop3: newIsTop3 || top3Tasks.length < 3,
    });
    setNewTitle('');
    setNewDueTime('');
    setNewIsTop3(false);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    onAddGoal({
      title: goalTitle.trim(),
      category: goalCategory,
      weeklyTarget: goalWeeklyTarget.trim() || undefined,
      dailyAction: goalDailyAction.trim() || undefined,
      metrics: goalMetrics.trim() || undefined,
      priorityTier: goalTier,
      progress: 0,
    });
    setGoalTitle('');
    setGoalWeeklyTarget('');
    setGoalDailyAction('');
    setGoalMetrics('');
  };

  const handleCreateCommitment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitText.trim()) return;
    onAddCommitment({
      commitment: commitText.trim(),
      deadline: commitDeadline.trim() || 'Today by 22:00',
      whyItMatters: commitWhy.trim() || 'Direct progress toward key objectives',
    });
    setCommitText('');
    setCommitDeadline('');
    setCommitWhy('');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    const winsArray = reviewWins.split('\n').map((s) => s.trim()).filter(Boolean);
    const missesArray = reviewMisses.split('\n').map((s) => s.trim()).filter(Boolean);
    const tomorrowArray = reviewTomorrowTop3.split('\n').map((s) => s.trim()).filter(Boolean);

    onSaveDailyLog({
      date: new Date().toISOString().split('T')[0],
      executionScore: reviewScore,
      wins: winsArray.length ? winsArray : ['Direct execution across key milestones'],
      misses: missesArray,
      failureClassification: reviewClassification,
      tomorrowTop3: tomorrowArray.length ? tomorrowArray : ['Deploy NestList feature', 'MLS revision block', 'Content batch'],
      tomorrowNumberOnePriority: reviewTomorrowNumberOne.trim() || tomorrowArray[0] || 'Deploy NestList pilot',
    });

    setReviewWins('');
    setReviewMisses('');
    setReviewTomorrowTop3('');
    setReviewTomorrowNumberOne('');
  };

  const handleParkIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;
    onParkIdea(ideaText.trim(), ideaValue.trim() || 'Unverified opportunity');
    setIdeaText('');
    setIdeaValue('');
  };

  const handleSaveTimetableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveTimetable({
      classSchedule: editTimetableSchedule,
      studyBlocks: editTimetableBlocks,
      routineNotes: editTimetableNotes,
      hasConfigured: true,
    });
  };

  const categoryLabels: Record<TaskCategory, { label: string; badge: string }> = {
    nestlist: { label: 'NestList (Rentals)', badge: 'bg-amber-950/70 border-amber-500/40 text-amber-300' },
    studies: { label: 'MLS (Murang\'a Univ)', badge: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' },
    skills: { label: 'Tech & AI Skills', badge: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300' },
    business: { label: 'Business & Income', badge: 'bg-blue-950/70 border-blue-500/40 text-blue-300' },
    content: { label: 'Content Creation', badge: 'bg-purple-950/70 border-purple-500/40 text-purple-300' },
    general: { label: 'General Responsibility', badge: 'bg-slate-900 border-slate-700 text-slate-300' },
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/90 border border-cyan-500/30 rounded-xl hud-corner-box overflow-hidden backdrop-blur-md shadow-[0_4px_30px_rgba(0,240,255,0.08)]">
      {/* Top Header Tabs */}
      <div className="p-1.5 border-b border-cyan-500/20 bg-slate-900/80 flex items-center gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'today'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          TODAY
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'tasks'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <ListTodo className="w-3.5 h-3.5" />
          TASKS ({tasks.filter((t) => !t.completed).length})
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'goals'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          GOALS ({goals.length})
        </button>

        <button
          onClick={() => setActiveTab('commitments')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'commitments'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <Handshake className="w-3.5 h-3.5 text-sky-400" />
          PROMISES
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <History className="w-3.5 h-3.5 text-purple-400" />
          REVIEWS
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'timetable'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
          ROUTINE
        </button>

        <button
          onClick={() => setActiveTab('backlog')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'backlog'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
          PARKED ({ideaBacklog.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 glow-cyan-sm font-bold'
              : 'text-cyan-500/60 hover:text-cyan-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          MEM-CORE
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. TODAY PANEL (Mission, Top 3, Definition of Victory, Progress) */}
      {/* ============================================================== */}
      {activeTab === 'today' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3 font-rajdhani">
          {/* Streak Counter Header */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/70 to-slate-950 border border-amber-500/40 flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/60 text-amber-400 animate-pulse">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-orbitron font-bold text-sm tracking-wider text-amber-300">
                    {streakCount}-DAY STREAK
                  </span>
                  {isTop3AllDone && (
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      VICTORY ACHIEVED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-amber-400/80 leading-tight">
                  Consecutive days top 3 priorities were cleared!
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-orbitron font-bold text-lg text-cyan-300">
                {completedTasks}/{totalTasks}
              </span>
              <span className="block text-[10px] font-mono-tech text-cyan-500/60 uppercase">
                Directives
              </span>
            </div>
          </div>

          {/* Today's Mission & Definition of Victory */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-2">
            <div>
              <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                🎯 TODAY'S MISSION
              </span>
              <p className="text-xs font-semibold text-white mt-0.5 leading-snug">
                {todayMission || 'Advance NestList core user acquisition flow & clear MLS Hematology module.'}
              </p>
            </div>

            <div className="pt-1 border-t border-cyan-500/20">
              <span className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-wider block">
                🏆 DEFINITION OF VICTORY
              </span>
              <p className="text-xs text-emerald-200 mt-0.5 leading-snug">
                {definitionOfVictory || 'All Top 3 priorities verified and completed before 22:00.'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                EXECUTION PROGRESS
              </span>
              <span className="font-bold text-cyan-300">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 border border-cyan-500/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-700 glow-cyan-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Manager Action Quick Chips */}
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => onTriggerCommand('JARVIS, brief me')}
              className="p-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-400/40 text-cyan-200 font-orbitron font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 glow-cyan-sm text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              BRIEF ME
            </button>
            <button
              onClick={() => onTriggerCommand('JARVIS, review my day')}
              className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 border border-purple-400/40 text-purple-200 font-orbitron font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 text-[11px]"
            >
              <History className="w-3 h-3 text-purple-400" />
              REVIEW DAY
            </button>
            <button
              onClick={onOpenReportModal}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 font-orbitron font-semibold flex items-center justify-center gap-1 transition-all text-[11px]"
            >
              <FileText className="w-3 h-3" />
              FULL REPORT
            </button>
          </div>

          {/* Top 3 Priorities Section */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h4 className="font-orbitron font-bold text-xs tracking-wider text-amber-300 uppercase">
                  TOP 3 PRIORITIES ({completedTop3.length}/3)
                </h4>
              </div>
              <span className="text-[10px] font-mono-tech text-cyan-500/60">
                1: NESTLIST &bull; 2: ACADEMICS &bull; 3: SKILLS
              </span>
            </div>

            {top3Tasks.length === 0 ? (
              <div className="p-3 rounded-lg border border-dashed border-cyan-500/30 text-center text-xs text-cyan-500/60">
                No Top 3 priorities designated. Star directives in the TASKS tab or ask JARVIS: "Plan my day."
              </div>
            ) : (
              <div className="space-y-2">
                {top3Tasks.slice(0, 3).map((task, idx) => {
                  const cat = categoryLabels[task.category] || categoryLabels.general;
                  const hasSlipped = task.slipCount >= 2;

                  return (
                    <div
                      key={task.id}
                      className={`p-2.5 rounded-xl border transition-all ${
                        task.completed
                          ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : hasSlipped
                          ? 'bg-rose-950/30 border-rose-500/60 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                          : 'bg-slate-900/60 border-cyan-500/40 hover:border-cyan-400 text-cyan-100'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-orbitron font-bold text-xs text-amber-400 mt-0.5">
                          #{idx + 1}
                        </span>

                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="mt-0.5 text-cyan-400 hover:text-cyan-200 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-cyan-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-semibold leading-snug ${
                              task.completed ? 'line-through text-slate-500' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px] font-mono-tech">
                            <span className={`px-1.5 py-0.2 rounded border ${cat.badge}`}>
                              {cat.label}
                            </span>

                            {task.dueTime && (
                              <span className="flex items-center gap-1 text-cyan-300 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">
                                <Clock className="w-3 h-3 text-cyan-400" />
                                {task.dueTime}
                              </span>
                            )}

                            {hasSlipped && (
                              <span className="flex items-center gap-1 text-rose-300 bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-500/50">
                                <AlertTriangle className="w-3 h-3 text-rose-400" />
                                Slipped {task.slipCount}x
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                          {!task.completed && (
                            <>
                              <button
                                onClick={() => onStart5MinRuleOnTask(task)}
                                title="Overcome Resistance: 5-Minute Rule Starter"
                                className="p-1 rounded bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/50 text-amber-300 transition-all"
                              >
                                <Zap className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => onStartFocusOnTask(task)}
                                title="25m Focus Sprint"
                                className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-300 transition-all"
                              >
                                <Play className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => onToggleTop3(task.id)}
                            title="Remove from Top 3"
                            className="p-1 text-amber-400 hover:text-slate-400 transition-colors"
                          >
                            <Star className="w-3 h-3 fill-amber-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TASKS TAB (Full Directives List, Categorized & Prioritized) */}
      {/* ============================================================== */}
      {activeTab === 'tasks' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden font-rajdhani">
          {/* Category filter pills */}
          <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 scrollbar-none text-[10px] font-mono-tech">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-2 py-0.5 rounded uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === 'all'
                  ? 'bg-cyan-500/30 text-cyan-100 border border-cyan-400/60 font-semibold'
                  : 'text-cyan-500/60 hover:text-cyan-300'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterCategory('nestlist')}
              className={`px-2 py-0.5 rounded uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === 'nestlist'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-400/60 font-semibold'
                  : 'text-amber-500/60 hover:text-amber-300'
              }`}
            >
              NESTLIST
            </button>
            <button
              onClick={() => setFilterCategory('studies')}
              className={`px-2 py-0.5 rounded uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === 'studies'
                  ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-400/60 font-semibold'
                  : 'text-emerald-500/60 hover:text-emerald-300'
              }`}
            >
              MLS STUDIES
            </button>
            <button
              onClick={() => setFilterCategory('skills')}
              className={`px-2 py-0.5 rounded uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === 'skills'
                  ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/60 font-semibold'
                  : 'text-cyan-500/60 hover:text-cyan-300'
              }`}
            >
              AI & SKILLS
            </button>
            <button
              onClick={() => setFilterCategory('content')}
              className={`px-2 py-0.5 rounded uppercase tracking-wider transition-all whitespace-nowrap ${
                filterCategory === 'content'
                  ? 'bg-purple-950/80 text-purple-200 border border-purple-400/60 font-semibold'
                  : 'text-purple-500/60 hover:text-purple-300'
              }`}
            >
              CONTENT
            </button>
          </div>

          {/* New Task Form */}
          <form onSubmit={handleCreateTask} className="mb-3 space-y-1.5">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-cyan-500/30 focus-within:border-cyan-400">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Assign new directive..."
                className="flex-1 bg-transparent px-2.5 py-1 text-xs text-cyan-100 placeholder-cyan-600/50 font-rajdhani focus:outline-none"
              />
              <button
                type="submit"
                className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 text-cyan-300 transition-colors"
                title="Add task"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[10px]">
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded px-1.5 py-1 focus:outline-none"
              >
                <option value="nestlist">NestList</option>
                <option value="studies">MLS Studies</option>
                <option value="skills">AI & Tech Skills</option>
                <option value="business">Business</option>
                <option value="content">Content</option>
                <option value="general">General</option>
              </select>

              <select
                value={newPriority}
                onChange={(e: any) => setNewPriority(e.target.value)}
                className="bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded px-1.5 py-1 focus:outline-none"
              >
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>

              <input
                type="text"
                value={newDueTime}
                onChange={(e) => setNewDueTime(e.target.value)}
                placeholder="Due time (14:30)"
                className="bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded px-1.5 py-1 focus:outline-none"
              />
            </div>
          </form>

          {/* Task Directives List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {tasks
              .filter((t) => (filterCategory === 'all' ? true : t.category === filterCategory))
              .map((task) => {
                const cat = categoryLabels[task.category] || categoryLabels.general;
                const hasSlippedTwice = task.slipCount >= 2;

                return (
                  <div
                    key={task.id}
                    className={`group relative p-2.5 rounded-lg border transition-all ${
                      task.completed
                        ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                        : hasSlippedTwice
                        ? 'bg-rose-950/20 border-rose-500/50 text-rose-200'
                        : 'bg-slate-900/40 border-cyan-500/25 hover:border-cyan-400/50 text-cyan-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 text-cyan-400 hover:text-cyan-200 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-cyan-500 hover:text-cyan-300" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-rajdhani font-semibold leading-tight ${
                            task.completed ? 'line-through text-slate-500' : 'text-cyan-100'
                          }`}
                        >
                          {task.title}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[10px] font-mono-tech">
                          <span className={`px-1.5 py-0.2 rounded border ${cat.badge}`}>
                            {cat.label}
                          </span>

                          <span
                            className={`px-1 rounded uppercase font-semibold ${
                              task.priority === 'HIGH'
                                ? 'text-rose-400 bg-rose-950/50 border border-rose-500/30'
                                : task.priority === 'MEDIUM'
                                ? 'text-amber-400 bg-amber-950/50 border border-amber-500/30'
                                : 'text-cyan-400 bg-cyan-950/50'
                            }`}
                          >
                            {task.priority}
                          </span>

                          {task.dueTime && (
                            <span className="flex items-center gap-1 text-cyan-300">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              {task.dueTime}
                            </span>
                          )}

                          {hasSlippedTwice && (
                            <span className="text-rose-300 bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-500/50 font-bold">
                              ⚠️ Slipped {task.slipCount}x
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onToggleTop3(task.id)}
                          title={task.isTop3 ? 'Remove from Top 3' : 'Assign to Top 3'}
                          className="p-1 text-amber-400 hover:text-amber-200"
                        >
                          <Star className={`w-3.5 h-3.5 ${task.isTop3 ? 'fill-amber-400' : ''}`} />
                        </button>

                        {!task.completed && (
                          <>
                            <button
                              onClick={() => onStart5MinRuleOnTask(task)}
                              title="Start 5-Minute Rule (Break Friction)"
                              className="p-1 text-amber-400 hover:text-amber-200"
                            >
                              <Zap className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onStartFocusOnTask(task)}
                              title="Start 25m Focus Sprint"
                              className="p-1 text-cyan-400 hover:text-cyan-200"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => onRescheduleTask(task.id)}
                          title="Reschedule (increment slip)"
                          className="p-1 text-amber-400 hover:text-amber-300"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteTask(task.id)}
                          title="Delete directive"
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. GOALS TAB (Tiered Goals: MUST WIN, SHOULD ADVANCE, etc.) */}
      {/* ============================================================== */}
      {activeTab === 'goals' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden font-rajdhani">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-orbitron font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              GOAL MANAGEMENT & TIERS
            </span>
            <span className="text-[10px] font-mono-tech text-cyan-500/60">
              GOALS → STRATEGY → SYSTEMS → EXECUTION
            </span>
          </div>

          {/* Add Goal Form */}
          <form onSubmit={handleCreateGoal} className="mb-3 space-y-1.5">
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              placeholder="Goal title (e.g. Master Clinical Chemistry, Scale NestList)..."
              className="w-full bg-black/60 border border-emerald-500/30 rounded-lg px-2.5 py-1 text-xs text-white placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400"
            />
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                value={goalWeeklyTarget}
                onChange={(e) => setGoalWeeklyTarget(e.target.value)}
                placeholder="Weekly Target (What must happen this week)"
                className="bg-black/60 border border-emerald-500/30 rounded px-2 py-1 text-[11px] text-emerald-200 placeholder-emerald-600/40 focus:outline-none"
              />
              <input
                type="text"
                value={goalDailyAction}
                onChange={(e) => setGoalDailyAction(e.target.value)}
                placeholder="Daily Action (What to do daily)"
                className="bg-black/60 border border-emerald-500/30 rounded px-2 py-1 text-[11px] text-emerald-200 placeholder-emerald-600/40 focus:outline-none"
              />
            </div>
            <div className="flex gap-1.5">
              <select
                value={goalCategory}
                onChange={(e: any) => setGoalCategory(e.target.value)}
                className="bg-slate-900 text-xs text-emerald-300 border border-emerald-500/30 rounded px-2 py-1 focus:outline-none"
              >
                <option value="nestlist">NestList Marketplace</option>
                <option value="studies">Murang'a MLS Studies</option>
                <option value="skills">Technical & AI Skills</option>
                <option value="business">Business & Income</option>
                <option value="content">Content & Brand</option>
              </select>
              <select
                value={goalTier}
                onChange={(e: any) => setGoalTier(e.target.value)}
                className="bg-slate-900 text-xs text-emerald-300 border border-emerald-500/30 rounded px-2 py-1 focus:outline-none"
              >
                <option value="MUST_WIN">MUST WIN</option>
                <option value="SHOULD_ADVANCE">SHOULD ADVANCE</option>
                <option value="MAINTAIN">MAINTAIN</option>
                <option value="PAUSE">PAUSE</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-400 text-emerald-300 text-xs font-orbitron font-semibold ml-auto"
              >
                ADD GOAL
              </button>
            </div>
          </form>

          {/* Goals List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {goals.map((goal) => {
              const cat = categoryLabels[goal.category] || categoryLabels.general;

              return (
                <div
                  key={goal.id}
                  className="p-3 rounded-xl bg-slate-900/50 border border-emerald-500/30 hover:border-emerald-400/50 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono-tech px-1.5 py-0.2 rounded border ${cat.badge}`}>
                          {cat.label}
                        </span>
                        <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          {goal.priorityTier || 'MUST_WIN'}
                        </span>
                      </div>
                      <h5 className="font-semibold text-xs text-white mt-1">
                        {goal.title}
                      </h5>
                    </div>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {goal.weeklyTarget && (
                    <div className="text-[11px] text-cyan-200">
                      <strong className="text-cyan-400 font-mono-tech">Weekly Target:</strong> {goal.weeklyTarget}
                    </div>
                  )}

                  {goal.dailyAction && (
                    <div className="text-[11px] text-emerald-200">
                      <strong className="text-emerald-400 font-mono-tech">Daily Action:</strong> {goal.dailyAction}
                    </div>
                  )}

                  {/* Progress Slider */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech">
                      <span className="text-emerald-400/80">PROGRESS:</span>
                      <span className="font-bold text-emerald-300">{goal.progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={goal.progress}
                      onChange={(e) => onUpdateGoalProgress(goal.id, parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. COMMITMENTS TAB (Promises, Deadlines, Accountability) */}
      {/* ============================================================== */}
      {activeTab === 'commitments' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden font-rajdhani">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-orbitron font-semibold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <Handshake className="w-4 h-4 text-sky-400" />
              COMMITMENTS & ACCOUNTABILITY
            </span>
          </div>

          {/* New Commitment Form */}
          <form onSubmit={handleCreateCommitment} className="mb-3 space-y-1.5">
            <input
              type="text"
              value={commitText}
              onChange={(e) => setCommitText(e.target.value)}
              placeholder="What are you committing to? (e.g. Finish 15 hematology practice questions)"
              className="w-full bg-black/60 border border-sky-500/30 rounded-lg px-2.5 py-1 text-xs text-white placeholder-sky-600/50 focus:outline-none focus:border-sky-400"
            />
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                value={commitDeadline}
                onChange={(e) => setCommitDeadline(e.target.value)}
                placeholder="Deadline (e.g. Today 18:00)"
                className="bg-black/60 border border-sky-500/30 rounded px-2 py-1 text-xs text-sky-200 placeholder-sky-600/40 focus:outline-none"
              />
              <input
                type="text"
                value={commitWhy}
                onChange={(e) => setCommitWhy(e.target.value)}
                placeholder="Why it matters"
                className="bg-black/60 border border-sky-500/30 rounded px-2 py-1 text-xs text-sky-200 placeholder-sky-600/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400 text-sky-200 text-xs font-orbitron font-semibold transition-all"
            >
              LOG COMMITMENT
            </button>
          </form>

          {/* Commitments List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {commitments.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-sky-500/40 font-mono-tech text-xs">
                <Handshake className="w-6 h-6 mb-2 opacity-50" />
                <p>No active commitments logged.</p>
                <p className="text-[10px]">When you promise something, log it here. JARVIS will hold you accountable.</p>
              </div>
            ) : (
              commitments.map((c) => (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-xl border transition-all text-xs space-y-1.5 ${
                    c.status === 'completed'
                      ? 'bg-slate-950/40 border-emerald-500/30 text-emerald-200'
                      : c.status === 'failed'
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900/60 border-sky-500/30 text-sky-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-white leading-snug">
                      "{c.commitment}"
                    </p>
                    <button
                      onClick={() => onDeleteCommitment(c.id)}
                      className="text-slate-500 hover:text-rose-400 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono-tech">
                    <span className="text-amber-400">DEADLINE: {c.deadline}</span>
                    <span className="text-sky-400/80">REASON: {c.whyItMatters}</span>
                  </div>

                  {c.status === 'pending' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => onToggleCommitment(c.id, 'completed')}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-mono-tech font-bold"
                      >
                        ✓ COMPLETED
                      </button>
                      <button
                        onClick={() => onToggleCommitment(c.id, 'failed')}
                        className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/50 text-rose-300 text-[10px] font-mono-tech font-bold"
                      >
                        ✕ MISSED (REFLECT)
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. REVIEWS TAB (Daily Evening Log & Sunday Scorecard Table) */}
      {/* ============================================================== */}
      {activeTab === 'reviews' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3 font-rajdhani">
          {/* Quick Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onTriggerCommand('JARVIS, review my day')}
              className="p-2 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs font-orbitron font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <History className="w-3.5 h-3.5 text-purple-400" />
              EVENING REVIEW
            </button>
            <button
              onClick={() => onTriggerCommand('JARVIS, review my week')}
              className="p-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-400/40 text-amber-200 text-xs font-orbitron font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              WEEKLY SCORECARD
            </button>
          </div>

          {/* Record Daily Review Form */}
          <form onSubmit={handleSaveReview} className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-xs tracking-wider text-cyan-300 uppercase">
                RECORD TODAY'S EXECUTION
              </span>
              <div className="flex items-center gap-1 text-xs font-mono-tech">
                <span className="text-amber-400">SCORE:</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={reviewScore}
                  onChange={(e) => setReviewScore(parseFloat(e.target.value) || 0)}
                  className="w-12 bg-black border border-cyan-500/40 rounded px-1 py-0.5 text-center text-amber-300 font-bold"
                />
                <span className="text-cyan-500">/10</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono-tech text-emerald-400 block mb-0.5">
                TODAY'S WINS (ONE PER LINE):
              </label>
              <textarea
                rows={2}
                value={reviewWins}
                onChange={(e) => setReviewWins(e.target.value)}
                placeholder="• Validated NestList caretaker signup flow&#10;• Completed 20 Hematology practice questions"
                className="w-full bg-black/60 border border-cyan-500/30 rounded p-1.5 text-xs text-cyan-100 placeholder-cyan-600/40 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono-tech text-rose-400 block mb-0.5">
                MISSES OR UNFINISHED TASKS:
              </label>
              <textarea
                rows={2}
                value={reviewMisses}
                onChange={(e) => setReviewMisses(e.target.value)}
                placeholder="• Missed recording rental tips TikTok video"
                className="w-full bg-black/60 border border-cyan-500/30 rounded p-1.5 text-xs text-cyan-100 placeholder-cyan-600/40 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-mono-tech text-cyan-400 block mb-0.5">
                  FAILURE CLASSIFICATION:
                </label>
                <select
                  value={reviewClassification}
                  onChange={(e) => setReviewClassification(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded p-1 text-xs text-cyan-300 focus:outline-none"
                >
                  <option value="Procrastination">Procrastination</option>
                  <option value="Poor planning">Poor planning</option>
                  <option value="Unexpected event">Unexpected event</option>
                  <option value="Lack of knowledge">Lack of knowledge</option>
                  <option value="Lack of energy">Lack of energy</option>
                  <option value="Distraction">Distraction</option>
                  <option value="External dependency">External dependency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech text-amber-400 block mb-0.5">
                  TOMORROW'S #1 PRIORITY:
                </label>
                <input
                  type="text"
                  value={reviewTomorrowNumberOne}
                  onChange={(e) => setReviewTomorrowNumberOne(e.target.value)}
                  placeholder="Single most critical action"
                  className="w-full bg-black/60 border border-cyan-500/30 rounded p-1 text-xs text-cyan-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-200 text-xs font-orbitron font-semibold transition-all"
            >
              ARCHIVE DAILY REVIEW (LOCALSTORAGE)
            </button>
          </form>

          {/* Historical Logs */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech text-cyan-500/70 uppercase tracking-widest block">
              LOG ARCHIVES ({dailyLogs.length})
            </span>

            {dailyLogs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/40 border border-cyan-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between font-mono-tech text-[10px] text-cyan-400">
                  <span>DATE: {log.date}</span>
                  <span className="text-amber-400 font-bold">SCORE: {log.executionScore}/10</span>
                </div>
                {log.wins?.length > 0 && (
                  <div className="text-emerald-300 text-[11px]">
                    <strong>Wins:</strong> {log.wins.join('; ')}
                  </div>
                )}
                {log.misses?.length > 0 && (
                  <div className="text-rose-300 text-[11px]">
                    <strong>Misses ({log.failureClassification || 'Uncategorized'}):</strong> {log.misses.join('; ')}
                  </div>
                )}
                {log.tomorrowNumberOnePriority && (
                  <div className="text-amber-300 text-[11px]">
                    <strong>Tomorrow #1:</strong> {log.tomorrowNumberOnePriority}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. TIMETABLE & ROUTINE TAB (Murang'a University Routine) */}
      {/* ============================================================== */}
      {activeTab === 'timetable' && (
        <div className="flex-1 flex flex-col p-3 overflow-y-auto space-y-3 font-rajdhani">
          <div className="flex items-center justify-between">
            <span className="text-xs font-orbitron font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              MURANG'A UNIVERSITY MLS ROUTINE
            </span>
          </div>

          <p className="text-[11px] text-cyan-400/80 leading-relaxed">
            JARVIS plans your daily priorities around your actual lectures and laboratory sessions at Murang'a University of Technology.
          </p>

          <form onSubmit={handleSaveTimetableSubmit} className="space-y-2.5">
            <div>
              <label className="text-[10px] font-mono-tech text-amber-400 block mb-0.5">
                CLASS TIMETABLE / LAB SESSIONS:
              </label>
              <textarea
                rows={3}
                value={editTimetableSchedule}
                onChange={(e) => setEditTimetableSchedule(e.target.value)}
                placeholder="• Mon: 8am-11am Clinical Chemistry&#10;• Tue: 2pm-5pm Hematology Lab&#10;• Wed: 9am-12pm Medical Microbiology"
                className="w-full bg-black/60 border border-cyan-500/30 rounded p-2 text-xs text-cyan-100 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono-tech text-emerald-400 block mb-0.5">
                DESIGNATED DAILY STUDY WINDOWS:
              </label>
              <textarea
                rows={2}
                value={editTimetableBlocks}
                onChange={(e) => setEditTimetableBlocks(e.target.value)}
                placeholder="• 06:00 - 07:30 Morning Revision&#10;• 19:30 - 21:00 Evening Study Block"
                className="w-full bg-black/60 border border-cyan-500/30 rounded p-2 text-xs text-cyan-100 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono-tech text-cyan-400 block mb-0.5">
                ROUTINE NOTES (SLEEP, MEALS, TRAVEL):
              </label>
              <textarea
                rows={2}
                value={editTimetableNotes}
                onChange={(e) => setEditTimetableNotes(e.target.value)}
                placeholder="Sleep by 23:00, wakeup at 05:30. Travel buffer 30 min to university lab."
                className="w-full bg-black/60 border border-cyan-500/30 rounded p-2 text-xs text-cyan-100 focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 text-xs font-orbitron font-semibold transition-all"
            >
              SAVE ROUTINE FOR JARVIS PLANNING
            </button>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. BACKLOG TAB (Parked Ideas) */}
      {/* ============================================================== */}
      {activeTab === 'backlog' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden font-rajdhani">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-orbitron font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              PARKED IDEAS (ANTI-DISTRACTION)
            </span>
          </div>

          <p className="text-[11px] text-cyan-500/80 mb-2 leading-tight">
            Do not let random ideas derail your current execution. Park them here.
          </p>

          <form onSubmit={handleParkIdea} className="mb-3 space-y-1.5">
            <input
              type="text"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="What is the random idea? (e.g. Add AI tenant credit scoring)"
              className="w-full bg-black/60 border border-amber-500/30 rounded px-2.5 py-1 text-xs text-cyan-100 focus:outline-none focus:border-amber-400"
            />
            <div className="flex gap-1.5">
              <input
                type="text"
                value={ideaValue}
                onChange={(e) => setIdeaValue(e.target.value)}
                placeholder="Strategic evaluation"
                className="flex-1 bg-black/60 border border-amber-500/30 rounded px-2 py-1 text-xs text-cyan-200 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-200 text-xs font-orbitron font-semibold"
              >
                PARK IT
              </button>
            </div>
          </form>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {ideaBacklog.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-cyan-500/40 font-mono-tech text-xs">
                <Lightbulb className="w-6 h-6 mb-2 opacity-50" />
                <p>No parked ideas.</p>
                <p className="text-[10px]">When inspiration strikes mid-work, park it here so you stay on task.</p>
              </div>
            ) : (
              ideaBacklog.map((idea) => (
                <div key={idea.id} className="p-2.5 rounded-lg bg-slate-900/50 border border-amber-500/30 text-xs space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-white leading-snug">
                      {idea.idea}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onPromoteIdeaToTask(idea.id)}
                        className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
                        title="Promote to active directive"
                      >
                        PROMOTE
                      </button>
                      <button
                        onClick={() => onDeleteIdea(idea.id)}
                        className="text-slate-500 hover:text-rose-400 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono-tech text-amber-400/80">
                    STATUS: {idea.status.toUpperCase()} &bull; {idea.createdAt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. NOTES TAB (MEM-CORE) */}
      {/* ============================================================== */}
      {activeTab === 'notes' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden font-rajdhani">
          <div className="flex items-center gap-1.5 px-2 py-1 mb-2.5 rounded bg-black/60 border border-cyan-500/25">
            <Search className="w-3.5 h-3.5 text-cyan-500" />
            <input
              type="text"
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Search memories..."
              className="flex-1 bg-transparent text-xs text-cyan-200 placeholder-cyan-600/50 font-rajdhani focus:outline-none"
            />
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (!noteTopic.trim() || !noteContent.trim()) return;
            onAddNote(noteTopic.trim(), noteContent.trim());
            setNoteTopic('');
            setNoteContent('');
          }} className="mb-3 space-y-1.5">
            <input
              type="text"
              value={noteTopic}
              onChange={(e) => setNoteTopic(e.target.value)}
              placeholder="Topic key..."
              className="w-full bg-black/60 border border-cyan-500/30 rounded px-2.5 py-1 text-xs text-cyan-100 placeholder-cyan-600/50 focus:outline-none"
            />
            <div className="flex gap-1.5">
              <input
                type="text"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Memory content..."
                className="flex-1 bg-black/60 border border-cyan-500/30 rounded px-2.5 py-1 text-xs text-cyan-100 placeholder-cyan-600/50 focus:outline-none"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 text-cyan-300 text-xs font-orbitron font-semibold"
              >
                SAVE
              </button>
            </div>
          </form>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {notes
              .filter(
                (n) =>
                  n.topic.toLowerCase().includes(noteSearch.toLowerCase()) ||
                  n.content.toLowerCase().includes(noteSearch.toLowerCase())
              )
              .map((note) => (
                <div
                  key={note.id}
                  className="group relative p-2.5 rounded-lg bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-orbitron font-semibold text-cyan-300 uppercase tracking-wider text-[11px]">
                      {note.topic}
                    </span>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-300 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-cyan-100/90 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
