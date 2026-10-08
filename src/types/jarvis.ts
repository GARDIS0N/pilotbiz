export type JarvisState = 'idle' | 'listening' | 'thinking' | 'speaking';
export type LiveConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error';

export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskCategory = 'work' | 'personal' | 'study' | 'skills' | 'business' | 'general';
export type GoalPriorityTier = 'MUST_WIN' | 'SHOULD_ADVANCE' | 'MAINTAIN' | 'PAUSE';

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  createdAt: string;
  dueTime?: string;
  dueDate?: string;
  estimatedMinutes?: number;
  slipCount: number;
  isTop3?: boolean;
  goalId?: string;
  completedAt?: string;
}

export interface GoalItem {
  id: string;
  title: string;
  category: TaskCategory;
  longTermGoal?: string;
  milestones?: string[];
  monthlyObjectives?: string[];
  weeklyTarget?: string;
  dailyAction?: string;
  metrics?: string;
  targetDate?: string;
  progress: number;
  priorityTier?: GoalPriorityTier;
  notes?: string;
}

export interface CommitmentItem {
  id: string;
  commitment: string;
  deadline: string;
  whyItMatters: string;
  status: 'pending' | 'completed' | 'failed';
  resultNotes?: string;
  createdAt: string;
}

export interface DailyLogItem {
  id: string;
  date: string; // YYYY-MM-DD
  mission?: string;
  definitionOfVictory?: string;
  executionScore: number; // score out of 10
  completedTasksCount: number;
  top3Completed: boolean;
  wins: string[];
  misses: string[];
  failureClassification?: string; // Procrastination, Poor planning, Distraction, etc.
  notes?: string;
  tomorrowTop3: string[];
  tomorrowNumberOnePriority?: string;
  createdAt: string;
}

export interface WeeklyScorecardRow {
  goal: string;
  target: string;
  actual: string;
  status: 'ACHIEVED' | 'ON TRACK' | 'BEHIND' | 'FAILED';
  nextAction: string;
}

export interface WeeklyReviewReport {
  id: string;
  weekTitle: string;
  scorecard: WeeklyScorecardRow[];
  whatWorked: string[];
  whatFailed: string[];
  whyItFailed: string[];
  stopDoing: string[];
  continueDoing: string[];
  startDoing: string[];
  nextWeekPriorities: string[];
  createdAt: string;
}

export interface IdeaBacklogItem {
  id: string;
  idea: string;
  strategicValue?: string;
  costInTime?: string;
  status: 'parked' | 'backlog' | 'promoted';
  createdAt: string;
}

export interface TimetableRoutine {
  classSchedule: string;
  studyBlocks: string;
  routineNotes: string;
  hasConfigured: boolean;
}

export interface FullBriefingReport {
  type: 'daily_briefing' | 'evening_review' | 'weekly_scorecard' | 'audit' | 'neglect_analysis' | 'goal_breakdown';
  title: string;
  summarySpoken: string;
  contentMarkdown: string;
  createdAt: string;
  data?: any;
}

export interface FocusSession {
  isActive: boolean;
  phase: 'focus' | 'rule_5min' | 'break' | 'idle';
  taskId?: string;
  taskTitle?: string;
  totalSeconds: number;
  remainingSeconds: number;
  cycleCount: number;
}

export interface NoteItem {
  id: string;
  topic: string;
  content: string;
  createdAt: string;
}

export interface ActiveTimer {
  id: string;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  createdAt: number;
}

export interface SourceCitation {
  title: string;
  url: string;
}

export interface ToolActionLog {
  tool: string;
  description: string;
  status: 'executing' | 'completed' | 'failed';
  result?: any;
  timestamp: string;
}

export type InfoSourceType =
  | 'PERSONAL_MEMORY'
  | 'PROJECT_MEMORY'
  | 'GOOGLE_DRIVE'
  | 'WEB_RESEARCH'
  | 'CURRENT_CONVERSATION'
  | 'SYSTEM_INFO';

export interface SourceAttribution {
  type: InfoSourceType;
  label: string;
  detail?: string;
  url?: string;
}

export type PermissionLevel = 'READ' | 'SUGGEST' | 'EXECUTE' | 'CONFIRM' | 'BLOCKED';

export interface PendingConfirmationAction {
  id: string;
  actionType: string;
  description: string;
  permission: PermissionLevel;
  payload: any;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface TaskExecutionStep {
  step: string;
  status: 'pending' | 'running' | 'success' | 'error';
  detail?: string;
  tool?: string;
}

export interface TranscriptMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  senderName?: string;
  sources?: SourceCitation[];
  attributions?: SourceAttribution[];
  pendingConfirmation?: PendingConfirmationAction;
  taskSteps?: TaskExecutionStep[];
  toolAction?: ToolActionLog;
  audioUrl?: string;
  report?: FullBriefingReport;
}

export type MemoryCategory = 'preference' | 'habit' | 'instruction' | 'fact' | 'person' | 'goal' | 'general';
export type MemorySource = 'USER_EXPLICIT' | 'CONVERSATION_INFERRED' | 'SYSTEM' | 'GOOGLE_DRIVE';
export type MemoryImportance = 'high' | 'medium' | 'low';

export interface MemoryItem {
  id: string;
  content: string;
  category: MemoryCategory;
  source: MemorySource;
  importance: MemoryImportance;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

export type ProjectStatus = 'ACTIVE' | 'PLANNING' | 'PAUSED' | 'COMPLETED';

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  due?: string;
}

export interface ProjectDecision {
  id: string;
  title: string;
  date: string;
  rationale?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  goals: string[];
  tasks: ProjectTask[];
  decisions: ProjectDecision[];
  importantFiles?: string[];
  technologies?: string[];
  knownProblems?: string[];
  nextActions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM
  category: 'work' | 'personal' | 'study' | 'meeting' | 'health' | 'general';
  completed: boolean;
  slipCount: number; // number of times postponed (>=3 triggers callout)
  notes?: string;
  createdAt?: string;
}

export interface AccountabilityData {
  streak: number;
  lastStreakDate: string;
  lastBriefedDate: string;
  morningCheckInTime: string; // e.g. "08:30"
  middayCheckInTime: string;  // e.g. "13:00"
  eveningCheckInTime: string; // e.g. "20:00"
  lastMorningCheckInDate?: string;
  lastMiddayCheckInDate?: string;
  lastEveningCheckInDate?: string;
  weeklyStats: {
    completed: number;
    total: number;
    rate: number;
  };
}

export interface ManagerMemory {
  goals: string[];
  wins: string[];
  struggles: string[];
  preferences: string[];
}

export type ChatMode = 'jarvis' | 'manager';

export type MicState = 'idle' | 'listening' | 'processing' | 'error';

export interface JarvisSettings {
  addressUserAs: string;
  voiceName: 'Zephyr' | 'Fenrir' | 'Puck' | 'Charon' | 'Kore';
  enableAudioSoundEffects: boolean;
  sensitivity: number;
  apiKey?: string;
  checkInIntervalMinutes: number; // default: 45
  enableProactiveCheckIns: boolean; // default: true
  enableDueTimeAlerts: boolean; // default: true
  morningCheckInTime?: string; // default: "08:30"
  middayCheckInTime?: string;  // default: "13:00"
  eveningCheckInTime?: string; // default: "20:00"
  managerName?: string; // default: "Coach"
  chatMode?: ChatMode;
  voiceLanguage?: string; // default: "en-US"
  autoSendVoice?: boolean; // default: true
}

