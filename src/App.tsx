import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  JarvisState,
  TaskItem,
  GoalItem,
  DailyLogItem,
  FocusSession,
  NoteItem,
  ActiveTimer,
  TranscriptMessage,
  JarvisSettings,
  SourceCitation,
  TaskPriority,
  TaskCategory,
  CommitmentItem,
  WeeklyReviewReport,
  IdeaBacklogItem,
  TimetableRoutine,
  FullBriefingReport,
} from './types/jarvis';
import { ArcReactor } from './components/ArcReactor';
import { HUDHeader } from './components/HUDHeader';
import { TasksPanel } from './components/TasksPanel';
import { LiveTranscript } from './components/LiveTranscript';
import { QuickActions } from './components/QuickActions';
import { FocusSessionHUD } from './components/FocusSessionHUD';
import { VisionModal } from './components/VisionModal';
import { SummarizeModal } from './components/SummarizeModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { TimerHUD } from './components/TimerHUD';
import { LiveAudioPlayer, LiveMicCapture, playHudSound } from './utils/audio';
import { LiveConnectionStatus } from './components/HUDHeader';
import { AlertTriangle, PanelLeftClose, PanelRightClose, PanelLeft, PanelRight, RefreshCw, X } from 'lucide-react';

const STORAGE_KEYS = {
  TASKS: 'jarvis_tasks_v2',
  GOALS: 'jarvis_goals_v2',
  COMMITMENTS: 'jarvis_commitments_v2',
  DAILY_LOGS: 'jarvis_daily_logs_v2',
  WEEKLY_SCORECARD: 'jarvis_weekly_scorecard_v2',
  IDEAS: 'jarvis_ideas_v2',
  TIMETABLE: 'jarvis_timetable_v2',
  NOTES: 'jarvis_notes_v2',
  SETTINGS: 'jarvis_settings_v2',
  MESSAGES: 'jarvis_messages_v2',
  STREAK: 'jarvis_streak_v2',
};

const DEFAULT_SETTINGS: JarvisSettings = {
  addressUserAs: 'boss',
  voiceName: 'Zephyr',
  enableAudioSoundEffects: true,
  sensitivity: 1.0,
  checkInIntervalMinutes: 45,
  enableProactiveCheckIns: true,
  enableDueTimeAlerts: true,
};

export default function App() {
  // Primary States
  const [jarvisState, setJarvisState] = useState<JarvisState>('idle');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<LiveConnectionStatus>('disconnected');
  const [reconnectAttempt, setReconnectAttempt] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [speakerEnergy, setSpeakerEnergy] = useState<number>(0);
  const [livePartialText, setLivePartialText] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Responsive UI panel collapse states
  const [showLeftPanel, setShowLeftPanel] = useState<boolean>(true);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isVisionOpen, setIsVisionOpen] = useState<boolean>(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState<boolean>(false);
  const [isVisionLoading, setIsVisionLoading] = useState<boolean>(false);

  // Focus Session State (Pomodoro: 25m Focus / 5m Break)
  const [focusSession, setFocusSession] = useState<FocusSession>({
    isActive: false,
    phase: 'idle',
    taskTitle: 'NestList Core Marketplace Flow',
    totalSeconds: 1500,
    remainingSeconds: 1500,
    cycleCount: 1,
  });

  // Stored Manager Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 't-1',
        title: 'NestList landlord onboarding & verification pipeline',
        completed: false,
        priority: 'HIGH' as TaskPriority,
        category: 'nestlist' as TaskCategory,
        createdAt: '08:00 AM',
        dueTime: '11:30',
        estimatedMinutes: 45,
        slipCount: 0,
        isTop3: true,
      },
      {
        id: 't-2',
        title: 'Medical Laboratory Science Hematology lecture review',
        completed: false,
        priority: 'HIGH' as TaskPriority,
        category: 'studies' as TaskCategory,
        createdAt: '08:30 AM',
        dueTime: '15:00',
        estimatedMinutes: 60,
        slipCount: 0,
        isTop3: true,
      },
      {
        id: 't-3',
        title: 'Security officer shift schedule briefing & post prep',
        completed: false,
        priority: 'HIGH' as TaskPriority,
        category: 'work_shift' as TaskCategory,
        createdAt: '09:00 AM',
        dueTime: '19:30',
        estimatedMinutes: 30,
        slipCount: 0,
        isTop3: true,
      },
      {
        id: 't-4',
        title: 'Draft Kenyan rental market tenant rights explainer for TikTok/X',
        completed: false,
        priority: 'MEDIUM' as TaskPriority,
        category: 'content_marketing' as TaskCategory,
        createdAt: '09:30 AM',
        estimatedMinutes: 30,
        slipCount: 0,
        isTop3: false,
      },
    ];
  });

  // Stored Long-Term Goals
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'g-1',
        title: 'Launch NestList with 100 Verified Listings in Nairobi',
        category: 'nestlist',
        targetDate: 'Nov 2026',
        progress: 45,
        notes: 'Focus on caretaker relationships and digital verification.',
      },
      {
        id: 'g-2',
        title: 'Score Distinction in 2nd-Year Medical Lab Science Semester Exams',
        category: 'studies',
        targetDate: 'Dec 2026',
        progress: 60,
        notes: 'Prioritize Clinical Chemistry & Hematology modules.',
      },
      {
        id: 'g-3',
        title: 'Flawless Security Shift Record & Incident Response Cert',
        category: 'work_shift',
        targetDate: 'Oct 2026',
        progress: 80,
      },
      {
        id: 'g-4',
        title: 'Grow NestList Social Reach to 10k Active Renters',
        category: 'content_marketing',
        targetDate: 'Jan 2027',
        progress: 25,
      },
    ];
  });

  // Stored Daily Logs & Reviews
  const [dailyLogs, setDailyLogs] = useState<DailyLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'log-prev',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        completedTasksCount: 4,
        top3Completed: true,
        executionScore: 8,
        wins: ['Validated NestList tenant inquiry flow', 'Completed Parasitology lab test'],
        misses: ['Postponed content draft due to evening guard shift'],
        tomorrowTop3: [
          'NestList landlord onboarding pipeline',
          'MLS Hematology chapter review',
          'Security shift preparation',
        ],
        createdAt: new Date(Date.now() - 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  // Streak Count
  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (saved) return parseInt(saved, 10);
    } catch (_) {}
    return 3;
  });

  // Mem-Core Notes
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'n-1',
        topic: 'NestList Mission',
        content: 'Kenya property rental marketplace connecting landlords, tenants, caretakers, and verified agents.',
        createdAt: 'Oct 6, 2026',
      },
      {
        id: 'n-2',
        topic: 'MLS Lab Hours',
        content: 'Clinical Chemistry practicals are held Tuesdays and Thursdays at 14:00.',
        createdAt: 'Oct 6, 2026',
      },
    ];
  });

  const [timers, setTimers] = useState<ActiveTimer[]>([]);

  // Stored Commitments (Accountability Tracker)
  const [commitments, setCommitments] = useState<CommitmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMITMENTS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'c-1',
        commitment: 'Deploy NestList landlord verification API and test live',
        deadline: 'Today 18:00',
        whyItMatters: 'Enables 10 landlords to list rentals securely without manual friction.',
        status: 'pending',
        createdAt: 'Oct 6, 2026',
      },
      {
        id: 'c-2',
        commitment: 'Review 40 Clinical Hematology slide pathologies before evening shift',
        deadline: 'Today 15:30',
        whyItMatters: 'Semester distinction milestone for Medical Laboratory Science degree.',
        status: 'pending',
        createdAt: 'Oct 6, 2026',
      },
    ];
  });

  // Stored Weekly Scorecard
  const [weeklyScorecard, setWeeklyScorecard] = useState<WeeklyReviewReport | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEEKLY_SCORECARD);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      id: 'w-1',
      weekTitle: 'Week 41 Execution Audit',
      scorecard: [
        { goal: 'NestList MVP Flow', target: '3 landlord interviews', actual: '3 interviews completed', status: 'ACHIEVED', nextAction: 'Automate verification email' },
        { goal: 'MLS Coursework', target: '10 hrs deep study', actual: '8.5 hrs study logged', status: 'ON TRACK', nextAction: 'Saturday morning biochemistry block' },
        { goal: 'Guard Shift Duties', target: '100% on-time patrols', actual: '100% completed', status: 'ACHIEVED', nextAction: 'Maintain alertness routine' },
        { goal: 'TikTok / X Content', target: '3 rental tips videos', actual: '1 video posted', status: 'BEHIND', nextAction: 'Batch 2 scripts Thursday afternoon' },
      ],
      whatWorked: ['Starting day with explicit Top 3 priorities', '25m focus sprints for code commits'],
      whatFailed: ['Content creation skipped when fatigued after night shifts'],
      whyItFailed: ['Did not block specific protected 45m window before shift'],
      stopDoing: ['Doomscrolling before starting lecture reviews'],
      continueDoing: ['Immediate task scheduling & accountability check-ins'],
      startDoing: ['5-minute start rule whenever resistance hits'],
      nextWeekPriorities: [
        'NestList caretaker onboarding portal MVP',
        'Clinical Chemistry lab practical exam prep',
        'Batch 3 rental tips videos for social reach',
      ],
      createdAt: 'Sunday Review',
    };
  });

  // Idea Parking Lot (Distraction Control)
  const [ideaBacklog, setIdeaBacklog] = useState<IdeaBacklogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'idea-1',
        idea: 'M-Pesa automated rent escrow for Kenyan tenant security deposits',
        strategicValue: 'High revenue potential; defer until core verified listings reach 100 properties',
        status: 'parked',
        createdAt: 'Oct 6, 2026',
      },
      {
        id: 'idea-2',
        idea: 'AI blood smear anomaly detector as MLS final-year project',
        strategicValue: 'Bridges tech and medical degree; schedule research for semester break',
        status: 'parked',
        createdAt: 'Oct 6, 2026',
      },
    ];
  });

  // Timetable Routine
  const [timetable, setTimetable] = useState<TimetableRoutine>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      classSchedule: 'Mon-Thu: 08:30 - 13:00 (Medical Laboratory Science lectures & practicals)',
      studyBlocks: 'Daily Deep Work: 14:00 - 16:30 (Coursework & NestList dev)',
      routineNotes: 'Security Shifts: Rotating night shifts (19:00 - 06:00) / Rest window: 06:30 - 11:30',
      hasConfigured: true,
    };
  });

  // Today's Mission & Definition of Victory
  const [todayMission, setTodayMission] = useState<string>('Advance NestList verification & master MLS Hematology module');
  const [definitionOfVictory, setDefinitionOfVictory] = useState<string>('NestList landlord flow tested live + 60m MLS deep study completed + 0 security patrol slips');

  // Active Long-Format Dossier / Report
  const [activeReport, setActiveReport] = useState<FullBriefingReport | null>({
    type: 'daily_briefing',
    title: 'JARVIS DAILY BRIEFING — TACTICAL DOSSIER',
    summarySpoken: 'Good morning, boss. Mission for today: advance NestList landlord onboarding and lock down your Medical Laboratory Science Hematology review before your evening security shift.',
    contentMarkdown: `### TODAY'S MISSION
Advance NestList core landlord verification pipeline and secure distinction-level mastery on Hematology lectures.

### TOP 3 PRIORITIES (NON-NEGOTIABLE)
1. **NestList**: Onboarding & caretaker verification pipeline (Due 11:30 | High Urgency & Impact)
2. **MLS Studies**: Hematology lecture review & practical slide questions (Due 15:00 | 60 min Deep Work)
3. **Work Shift**: Security officer shift briefing & equipment readiness (Due 19:30)

### TIME BLOCKS & SCHEDULE
- **08:30 - 11:30**: NestList Engineering Sprint (Deep Work)
- **12:00 - 13:30**: Class practicals & student clinic discussion
- **14:00 - 15:30**: Medical Laboratory Science Hematology review
- **16:00 - 17:00**: Content / Kenyan rental market post draft
- **19:00 - Late**: Security shift patrol operations

### DERAGULATION WARNING
Fatigue after lectures may tempt you to postpone MLS study to scroll on social media. Apply the 5-Minute Rule immediately at 14:00.

### DEFINITION OF VICTORY
All 3 Top Priorities marked complete, zero unhandled tenant inquiries, and solid shift execution.`,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const [messages, setMessages] = useState<TranscriptMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'm-init',
        role: 'assistant',
        text: 'At your command, boss. Chief of staff subroutines synchronized. NestList, MLS coursework, and security shifts tracked. Say "Start my day" for your morning briefing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [settings, setSettings] = useState<JarvisSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.addressUserAs === 'sir') {
          parsed.addressUserAs = 'boss';
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (_) {}
    return DEFAULT_SETTINGS;
  });

  // Persistent references
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<LiveAudioPlayer | null>(null);
  const micCaptureRef = useRef<LiveMicCapture | null>(null);
  const tasksRef = useRef(tasks);
  const goalsRef = useRef(goals);
  const notesRef = useRef(notes);
  const settingsRef = useRef(settings);
  const messagesRef = useRef(messages);
  const focusSessionRef = useRef(focusSession);

  // Proactivity & Idle Check-in Tracking
  const lastUserActivityRef = useRef<number>(Date.now());
  const lastCheckInAlertTimeRef = useRef<number>(0);
  const alertedDueTimesRef = useRef<Set<string>>(new Set());

  // Auto-Restart & Session Resumption Tracking
  const userInitiatedDisconnectRef = useRef<boolean>(false);
  const reconnectAttemptRef = useRef<number>(0);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionResumptionHandleRef = useRef<string | null>(null);
  const lastServerMessageTimeRef = useRef<number>(Date.now());
  const lastUserSpeechTimeRef = useRef<number>(0);
  const isConnectingRef = useRef<boolean>(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    tasksRef.current = tasks;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    goalsRef.current = goals;
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMITMENTS, JSON.stringify(commitments));
  }, [commitments]);

  useEffect(() => {
    if (weeklyScorecard) {
      localStorage.setItem(STORAGE_KEYS.WEEKLY_SCORECARD, JSON.stringify(weeklyScorecard));
    }
  }, [weeklyScorecard]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideaBacklog));
  }, [ideaBacklog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    notesRef.current = notes;
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    settingsRef.current = settings;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK, streakCount.toString());
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  useEffect(() => {
    focusSessionRef.current = focusSession;
  }, [focusSession]);

  // Touch user activity to reset idle timer
  const recordUserActivity = useCallback(() => {
    lastUserActivityRef.current = Date.now();
  }, []);

  // Audio energy ticker for visualizer animation
  useEffect(() => {
    let animId: number;
    const tick = () => {
      if (audioPlayerRef.current) {
        const energy = audioPlayerRef.current.getEnergyLevel();
        setSpeakerEnergy(energy);
        if (audioPlayerRef.current.isPlaying) {
          setJarvisState((prev) => (prev !== 'speaking' ? 'speaking' : prev));
        }
      }
      if (micCaptureRef.current) {
        const vol = micCaptureRef.current.getVolumeLevel();
        setMicVolume(vol);
        if (vol > 0.08) {
          recordUserActivity();
        }
        // If user talks with significant volume while assistant is speaking, trigger interruption
        if (vol > 0.25 && audioPlayerRef.current?.isPlaying) {
          handleInterruption();
        }
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [recordUserActivity]);

  // Helper to add transcript message
  const appendMessage = useCallback(
    (
      role: 'user' | 'assistant' | 'system',
      text: string,
      sources?: SourceCitation[],
      toolAction?: any,
      audioUrl?: string
    ) => {
      const newMsg: TranscriptMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        role,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources,
        toolAction,
        audioUrl,
      };
      setMessages((prev) => [...prev, newMsg]);
    },
    []
  );

  // Play audio response from TTS with seamless Web Speech API fallback
  const speakText = useCallback(
    async (text: string) => {
      if (isMuted || !text.trim()) return;

      // Clean markdown tags and formatting symbols for intelligible speech
      const cleanText = text
        .replace(/[*#_`~>\[\]\(\)]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!cleanText) return;

      const speakWithBrowserSynthesis = () => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
          setJarvisState('idle');
          return;
        }
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'en-GB';
          utterance.rate = 1.05;
          utterance.pitch = 0.95;

          const voices = window.speechSynthesis.getVoices();
          const britishVoice = voices.find(
            (v) =>
              v.lang === 'en-GB' ||
              v.lang.startsWith('en-GB') ||
              v.name.toLowerCase().includes('british') ||
              v.name.toLowerCase().includes('uk') ||
              v.name.toLowerCase().includes('english')
          );
          if (britishVoice) {
            utterance.voice = britishVoice;
          }

          utterance.onstart = () => setJarvisState('speaking');
          utterance.onend = () => setJarvisState('idle');
          utterance.onerror = () => setJarvisState('idle');

          window.speechSynthesis.speak(utterance);
        } catch (e) {
          console.warn('Browser speech synthesis notice:', e);
          setJarvisState('idle');
        }
      };

      try {
        setJarvisState('speaking');
        const res = await fetch('/api/jarvis/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText.slice(0, 400),
            voiceName: settingsRef.current.voiceName,
          }),
        });

        if (!res.ok) {
          speakWithBrowserSynthesis();
          return;
        }

        const data = await res.json();
        if (data.audioBase64) {
          if (!audioPlayerRef.current) {
            audioPlayerRef.current = new LiveAudioPlayer();
          }
          audioPlayerRef.current.playWavBase64(data.audioBase64, () => {
            setJarvisState('idle');
          });
        } else {
          // Use client browser synthesis (e.g. Free Tier quota exhausted or model busy)
          speakWithBrowserSynthesis();
        }
      } catch (_) {
        speakWithBrowserSynthesis();
      }
    },
    [isMuted]
  );

  // Interruption logic: cuts JARVIS off mid-sentence
  const handleInterruption = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioPlayerRef.current?.isPlaying) {
      audioPlayerRef.current.stop();
      if (settingsRef.current.enableAudioSoundEffects) {
        playHudSound('interrupted');
      }
      setJarvisState('listening');
    }
  }, []);

  // Dispatch Function Call requested by model
  const executeToolCall = useCallback(
    (name: string, args: any) => {
      const addressAs = settingsRef.current.addressUserAs;
      recordUserActivity();

      if (name === 'manage_tasks') {
        const { action, title, id, priority, category, dueTime, estimatedMinutes, isTop3 } = args;

        if (action === 'add' && title) {
          const newTask: TaskItem = {
            id: `task-${Date.now()}`,
            title,
            completed: false,
            priority: (priority?.toUpperCase() as TaskPriority) || 'HIGH',
            category: (category as TaskCategory) || 'general',
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            dueTime,
            estimatedMinutes: estimatedMinutes || 30,
            slipCount: 0,
            isTop3: isTop3 || false,
          };
          setTasks((prev) => [newTask, ...prev]);
          if (settingsRef.current.enableAudioSoundEffects) playHudSound('ping');
          appendMessage(
            'assistant',
            `Logged and prioritized directive, ${addressAs}: "${title}".`,
            undefined,
            { tool: 'manage_tasks', description: `Directive Added: "${title}"`, status: 'completed', timestamp: '' }
          );
        } else if (action === 'complete') {
          setTasks((prev) =>
            prev.map((t) => {
              if (t.id === id || (title && t.title.toLowerCase().includes(title.toLowerCase()))) {
                return { ...t, completed: true, completedAt: new Date().toISOString() };
              }
              return t;
            })
          );
          if (settingsRef.current.enableAudioSoundEffects) playHudSound('ping');
          appendMessage('assistant', `Marked directive complete, ${addressAs}.`);
        } else if (action === 'delete') {
          setTasks((prev) => prev.filter((t) => t.id !== id));
        } else if (action === 'reschedule') {
          setTasks((prev) =>
            prev.map((t) => {
              if (t.id === id || (title && t.title.toLowerCase().includes(title.toLowerCase()))) {
                const nextSlip = t.slipCount + 1;
                return { ...t, slipCount: nextSlip, dueTime: dueTime || t.dueTime };
              }
              return t;
            })
          );
          appendMessage('assistant', `Rescheduled directive, ${addressAs}. Slip count recorded.`);
        } else if (action === 'set_top3') {
          setTasks((prev) =>
            prev.map((t) => {
              if (t.id === id || (title && t.title.toLowerCase().includes(title.toLowerCase()))) {
                return { ...t, isTop3: isTop3 !== undefined ? isTop3 : true };
              }
              return t;
            })
          );
        }
      } else if (name === 'manage_goals') {
        const { action, id, title, category, progress, targetDate } = args;
        if (action === 'add' && title) {
          const newGoal: GoalItem = {
            id: `goal-${Date.now()}`,
            title,
            category: (category as TaskCategory) || 'nestlist',
            targetDate,
            progress: progress || 0,
          };
          setGoals((prev) => [...prev, newGoal]);
          appendMessage('assistant', `Milestone archived: "${title}".`);
        } else if (action === 'update_progress') {
          setGoals((prev) =>
            prev.map((g) => (g.id === id || g.title.toLowerCase().includes(title?.toLowerCase() || '') ? { ...g, progress } : g))
          );
        } else if (action === 'delete') {
          setGoals((prev) => prev.filter((g) => g.id !== id));
        }
      } else if (name === 'manage_focus_session') {
        const { action, durationMinutes = 25, breakMinutes = 5, taskTitle } = args;
        if (action === 'start') {
          const durSec = (durationMinutes || 25) * 60;
          setFocusSession({
            isActive: true,
            phase: 'focus',
            totalSeconds: durSec,
            remainingSeconds: durSec,
            taskTitle: taskTitle || 'High-Priority Focus Session',
            cycleCount: 1,
          });
          if (settingsRef.current.enableAudioSoundEffects) playHudSound('startup');
          appendMessage(
            'assistant',
            `Focus session initiated, ${addressAs}. 25-minute sprint running on your HUD.`,
            undefined,
            { tool: 'manage_focus_session', description: `25m Focus Sprint Started`, status: 'completed', timestamp: '' }
          );
        } else if (action === 'stop') {
          setFocusSession((prev) => ({ ...prev, isActive: false, phase: 'idle' }));
        } else if (action === 'pause') {
          setFocusSession((prev) => ({ ...prev, isActive: !prev.isActive }));
        }
      } else if (name === 'manage_daily_log') {
        const { wins, misses, tomorrowTop3, notes: reviewNotes, executionScore } = args;
        const newLog: DailyLogItem = {
          id: `log-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          completedTasksCount: tasksRef.current.filter((t) => t.completed).length,
          top3Completed: tasksRef.current.filter((t) => t.isTop3 && t.completed).length >= 3,
          executionScore: typeof executionScore === 'number' ? executionScore : 8,
          wins: wins || ['Advanced NestList and studies'],
          misses: misses || [],
          tomorrowTop3: tomorrowTop3 || ['NestList priority', 'MLS coursework', 'Security shift'],
          notes: reviewNotes,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setDailyLogs((prev) => [newLog, ...prev]);
        appendMessage('assistant', `Daily review archived to localStorage, ${addressAs}.`);
      } else if (name === 'manage_notes') {
        const { action, topic, content } = args;
        if (action === 'save' && (content || topic)) {
          const newNote: NoteItem = {
            id: `note-${Date.now()}`,
            topic: topic || 'Manager Memo',
            content: content || topic,
            createdAt: new Date().toLocaleDateString(),
          };
          setNotes((prev) => [newNote, ...prev]);
          if (settingsRef.current.enableAudioSoundEffects) playHudSound('ping');
          appendMessage(
            'assistant',
            `Committed to neural archive under "${newNote.topic}", ${addressAs}.`,
            undefined,
            { tool: 'manage_notes', description: `Memory Saved: [${newNote.topic}]`, status: 'completed', timestamp: '' }
          );
        }
      } else if (name === 'set_timer') {
        const { durationSeconds, label } = args;
        const total = Number(durationSeconds) || 60;
        const newTimer: ActiveTimer = {
          id: `timer-${Date.now()}`,
          label: label || `Timer (${Math.round(total / 60)}m)`,
          totalSeconds: total,
          remainingSeconds: total,
          isRunning: true,
          createdAt: Date.now(),
        };
        setTimers((prev) => [...prev, newTimer]);
        if (settingsRef.current.enableAudioSoundEffects) playHudSound('startup');
        appendMessage(
          'assistant',
          `Timer set for ${Math.round(total / 60)} minute${total >= 120 ? 's' : ''}, ${addressAs}.`,
          undefined,
          { tool: 'set_timer', description: `Timer Deployed: ${total}s`, status: 'completed', timestamp: '' }
        );
      } else if (name === 'open_link') {
        const { targetType, queryOrUrl } = args;
        let url = queryOrUrl;
        if (targetType === 'youtube') {
          url = `https://www.youtube.com/results?search_query=${encodeURIComponent(queryOrUrl)}`;
        } else if (targetType === 'maps') {
          url = `https://www.google.com/maps/search/${encodeURIComponent(queryOrUrl)}`;
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = `https://${url}`;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
        appendMessage('assistant', `Opening external resource, ${addressAs}.`);
      }
    },
    [appendMessage, recordUserActivity]
  );

  // -----------------------------------------------------------------
  // Manager Proactive Check-In Watchdog (Idle timer check)
  // -----------------------------------------------------------------
  useEffect(() => {
    const checkInInterval = setInterval(() => {
      if (!settings.enableProactiveCheckIns) return;

      const idleLimitMs = (settings.checkInIntervalMinutes || 45) * 60 * 1000;
      const now = Date.now();
      const timeSinceLastActivity = now - lastUserActivityRef.current;
      const timeSinceLastAlert = now - lastCheckInAlertTimeRef.current;

      // If idle for configured interval and haven't alerted in the last 10 minutes
      if (timeSinceLastActivity >= idleLimitMs && timeSinceLastAlert >= 600000) {
        lastCheckInAlertTimeRef.current = now;
        const addressAs = settings.addressUserAs || 'boss';

        // Find highest priority active task
        const activeTop3 = tasksRef.current.find((t) => t.isTop3 && !t.completed);
        const activeTask = activeTop3 || tasksRef.current.find((t) => !t.completed);

        if (activeTask) {
          const checkInPrompt = `${addressAs}, what's your status on "${activeTask.title}"?`;
          appendMessage('assistant', checkInPrompt);
          speakText(checkInPrompt);
        } else {
          const checkInPrompt = `${addressAs}, you've been idle for a while. Shall we set tomorrow's top 3 or start a study block?`;
          appendMessage('assistant', checkInPrompt);
          speakText(checkInPrompt);
        }
      }
    }, 15000);

    return () => clearInterval(checkInInterval);
  }, [settings.enableProactiveCheckIns, settings.checkInIntervalMinutes, settings.addressUserAs, appendMessage, speakText]);

  // -----------------------------------------------------------------
  // Manager Due-Time Vocal Reminder Alerts
  // -----------------------------------------------------------------
  useEffect(() => {
    const dueTimeInterval = setInterval(() => {
      if (!settings.enableDueTimeAlerts) return;

      const now = new Date();
      const currentHHMM = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const current12Hour = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

      tasksRef.current.forEach((task) => {
        if (!task.completed && task.dueTime) {
          const dueClean = task.dueTime.trim().toLowerCase();
          const matches =
            dueClean === currentHHMM ||
            dueClean === current12Hour ||
            dueClean.replace(/\s+/g, '') === current12Hour.replace(/\s+/g, '');

          const alertKey = `${task.id}-${currentHHMM}`;
          if (matches && !alertedDueTimesRef.current.has(alertKey)) {
            alertedDueTimesRef.current.add(alertKey);
            const alertText = `${settings.addressUserAs || 'boss'}, reminder: "${task.title}" is due right now.`;
            appendMessage('assistant', alertText);
            speakText(alertText);
          }
        }
      });
    }, 15000);

    return () => clearInterval(dueTimeInterval);
  }, [settings.enableDueTimeAlerts, settings.addressUserAs, appendMessage, speakText]);

  // -----------------------------------------------------------------
  // Streak Auto-Detection
  // -----------------------------------------------------------------
  useEffect(() => {
    const top3 = tasks.filter((t) => t.isTop3);
    if (top3.length >= 3 && top3.every((t) => t.completed)) {
      const todayStr = new Date().toISOString().split('T')[0];
      const lastRecorded = localStorage.getItem('jarvis_last_streak_date');
      if (lastRecorded !== todayStr) {
        localStorage.setItem('jarvis_last_streak_date', todayStr);
        setStreakCount((prev) => prev + 1);
        if (settings.enableAudioSoundEffects) playHudSound('startup');
        appendMessage(
          'assistant',
          `Outstanding work, ${settings.addressUserAs || 'boss'}. All Top 3 priorities cleared for today! Streak increased to ${streakCount + 1} days.`
        );
      }
    }
  }, [tasks, settings.addressUserAs, settings.enableAudioSoundEffects, streakCount, appendMessage]);

  // -----------------------------------------------------------------
  // Live WebSocket Voice Session with Auto-Restart, Resumption & Watchdog
  // -----------------------------------------------------------------
  const triggerAutoReconnect = useCallback((reason: string) => {
    if (userInitiatedDisconnectRef.current) return;

    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    if (reconnectAttemptRef.current >= 5) {
      setConnectionStatus('error');
      setErrorMessage('Neural uplink lost after 5 attempts. Click RETRY to reconnect.');
      setIsLiveActive(false);
      setJarvisState('idle');
      return;
    }

    reconnectAttemptRef.current += 1;
    const attempt = reconnectAttemptRef.current;
    setReconnectAttempt(attempt);
    setConnectionStatus('reconnecting');
    setErrorMessage(`Neural uplink interrupted. Reconnecting (attempt ${attempt}/5)...`);

    const delay = Math.min(10000, 500 * Math.pow(2, attempt - 1));
    reconnectTimerRef.current = setTimeout(() => {
      if (!userInitiatedDisconnectRef.current) {
        startVoiceSession(true);
      }
    }, delay);
  }, []);

  const startVoiceSession = useCallback(
    async (isReconnect: boolean = false) => {
      if (isConnectingRef.current) return;
      isConnectingRef.current = true;

      if (!isReconnect) {
        userInitiatedDisconnectRef.current = false;
        reconnectAttemptRef.current = 0;
        setReconnectAttempt(0);
        setConnectionStatus('connecting');
        setErrorMessage(null);
      } else {
        setConnectionStatus('reconnecting');
        setReconnectAttempt(reconnectAttemptRef.current);
      }

      try {
        if (!audioPlayerRef.current) {
          audioPlayerRef.current = new LiveAudioPlayer();
        }

        if (!micCaptureRef.current) {
          const mic = new LiveMicCapture((base64PCM) => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({ type: 'audio', data: base64PCM }));
            }
          });

          const micRes = await mic.start();
          if (micRes.success) {
            micCaptureRef.current = mic;
          } else {
            const notice = micRes.isPermissionDenied
              ? 'Microphone permission denied. Directives can be transmitted via Text Input below.'
              : `Microphone unavailable (${micRes.error}). Directives can be typed below.`;
            setErrorMessage(notice);
          }
        }

        if (wsRef.current) {
          try {
            wsRef.current.onopen = null;
            wsRef.current.onmessage = null;
            wsRef.current.onerror = null;
            wsRef.current.onclose = null;
            wsRef.current.close();
          } catch (_) {}
          wsRef.current = null;
        }

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/api/live`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          isConnectingRef.current = false;
          lastServerMessageTimeRef.current = Date.now();

          const recentHistory = messagesRef.current
            .slice(-6)
            .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
            .join('\n');

          const managerContext = `
Active Tasks: ${JSON.stringify(tasksRef.current.map((t) => ({ title: t.title, priority: t.priority, category: t.category, isTop3: t.isTop3, slipCount: t.slipCount })))}
Top 3 Goals: ${JSON.stringify(goalsRef.current.map((g) => ({ title: g.title, progress: g.progress })))}
Current Streak: ${streakCount} days
`;

          ws.send(
            JSON.stringify({
              type: 'init',
              voiceName: settingsRef.current.voiceName,
              addressAs: settingsRef.current.addressUserAs,
              apiKey: settingsRef.current.apiKey,
              resumptionHandle: sessionResumptionHandleRef.current || undefined,
              conversationContext: `${managerContext}\n${recentHistory}`,
            })
          );
        };

        ws.onmessage = (event) => {
          lastServerMessageTimeRef.current = Date.now();
          try {
            const msg = JSON.parse(event.data);

            if (msg.type === 'connected') {
              reconnectAttemptRef.current = 0;
              setReconnectAttempt(0);
              setConnectionStatus('connected');
              setIsLiveActive(true);
              setJarvisState('listening');
              setErrorMessage(null);
              if (settingsRef.current.enableAudioSoundEffects) playHudSound('startup');
            } else if (msg.type === 'session_resumption') {
              sessionResumptionHandleRef.current = msg.handle;
            } else if (msg.type === 'go_away') {
              triggerAutoReconnect('Server GoAway rotation');
            } else if (msg.type === 'unexpected_close' || msg.type === 'unexpected_error') {
              triggerAutoReconnect(msg.message || 'Stream interrupted');
            } else if (msg.type === 'connecting') {
              if (!isReconnect) setConnectionStatus('connecting');
            } else if (msg.type === 'warning' || msg.type === 'error') {
              setErrorMessage(msg.message || 'Live API notice.');
            } else if (msg.type === 'interrupted') {
              handleInterruption();
            } else if (msg.type === 'audio' && msg.data) {
              if (!isMuted && audioPlayerRef.current) {
                setJarvisState('speaking');
                audioPlayerRef.current.enqueueChunk(msg.data);
              }
            } else if (msg.type === 'user_transcript' && msg.text) {
              appendMessage('user', msg.text);
              recordUserActivity();
            } else if (msg.type === 'transcript') {
              if (msg.text) {
                setLivePartialText((prev) => prev + msg.text);
              }
            } else if (msg.type === 'tool_call') {
              executeToolCall(msg.name, msg.args);
            } else if (msg.type === 'turn_complete') {
              setLivePartialText((fullText) => {
                if (fullText.trim()) {
                  appendMessage('assistant', fullText.trim());
                }
                return '';
              });
              setJarvisState('listening');
            } else if (msg.type === 'closed') {
              if (!userInitiatedDisconnectRef.current) {
                triggerAutoReconnect('Remote close');
              } else {
                setConnectionStatus('disconnected');
                setIsLiveActive(false);
                setJarvisState('idle');
              }
            }
          } catch (err) {
            console.warn('Voice parse notice:', err);
          }
        };

        ws.onerror = () => {
          isConnectingRef.current = false;
          if (!userInitiatedDisconnectRef.current) {
            triggerAutoReconnect('Network error');
          } else {
            setConnectionStatus('disconnected');
          }
        };

        ws.onclose = () => {
          isConnectingRef.current = false;
          if (!userInitiatedDisconnectRef.current) {
            triggerAutoReconnect('WebSocket closed');
          } else {
            setConnectionStatus('disconnected');
            setIsLiveActive(false);
            setJarvisState('idle');
          }
        };
      } catch (err: any) {
        isConnectingRef.current = false;
        if (!userInitiatedDisconnectRef.current) {
          triggerAutoReconnect('Setup error');
        } else {
          setConnectionStatus('disconnected');
          setIsLiveActive(false);
          setJarvisState('idle');
        }
      }
    },
    [isMuted, streakCount, executeToolCall, appendMessage, handleInterruption, triggerAutoReconnect, speakText, recordUserActivity]
  );

  // Watchdog: 30s silence while speaking reconnects
  useEffect(() => {
    const watchdogInterval = setInterval(() => {
      if (
        isLiveActive &&
        connectionStatus === 'connected' &&
        !userInitiatedDisconnectRef.current &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        const currentVol = micCaptureRef.current ? micCaptureRef.current.getVolumeLevel() : 0;
        if (currentVol > 0.05) {
          lastUserSpeechTimeRef.current = Date.now();
        }

        const now = Date.now();
        const timeSinceLastServerMsg = now - lastServerMessageTimeRef.current;
        const timeSinceLastUserSpeech = now - lastUserSpeechTimeRef.current;

        if (lastUserSpeechTimeRef.current > 0 && timeSinceLastUserSpeech < 30000 && timeSinceLastServerMsg >= 30000) {
          lastServerMessageTimeRef.current = now;
          if (wsRef.current) {
            try { wsRef.current.close(); } catch (_) {}
          }
          triggerAutoReconnect('Watchdog detected 30s silence');
        }
      }
    }, 2000);

    return () => clearInterval(watchdogInterval);
  }, [isLiveActive, connectionStatus, triggerAutoReconnect]);

  // User manual toggle (start / stop)
  const toggleLiveVoice = async () => {
    recordUserActivity();
    setErrorMessage(null);

    if (
      isLiveActive ||
      connectionStatus === 'connected' ||
      connectionStatus === 'connecting' ||
      connectionStatus === 'reconnecting'
    ) {
      userInitiatedDisconnectRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      reconnectAttemptRef.current = 0;
      setReconnectAttempt(0);

      if (wsRef.current) {
        try {
          wsRef.current.send(JSON.stringify({ type: 'close' }));
          wsRef.current.close();
        } catch (_) {}
        wsRef.current = null;
      }
      if (micCaptureRef.current) {
        micCaptureRef.current.stop();
        micCaptureRef.current = null;
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.stop();
      }
      setIsLiveActive(false);
      setConnectionStatus('disconnected');
      setJarvisState('idle');
      if (settingsRef.current.enableAudioSoundEffects) playHudSound('ping');
      return;
    }

    userInitiatedDisconnectRef.current = false;
    reconnectAttemptRef.current = 0;
    setReconnectAttempt(0);
    sessionResumptionHandleRef.current = null;
    await startVoiceSession(false);
  };

  const handleManualRetry = () => {
    userInitiatedDisconnectRef.current = false;
    reconnectAttemptRef.current = 0;
    setReconnectAttempt(0);
    sessionResumptionHandleRef.current = null;
    startVoiceSession(false);
  };

  // Text message / Directives handler
  const handleSendTextMessage = async (text: string) => {
    recordUserActivity();
    appendMessage('user', text);
    setJarvisState('thinking');

    if (isLiveActive && wsRef.current && wsRef.current.readyState === WebSocket.OPEN && connectionStatus === 'connected') {
      wsRef.current.send(JSON.stringify({ type: 'text', text }));
      return;
    }

    try {
      const res = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          addressAs: settingsRef.current.addressUserAs,
          apiKey: settingsRef.current.apiKey,
          tasks: tasksRef.current,
          goals: goalsRef.current,
          notes: notesRef.current,
          conversationHistory: messages.slice(-5),
        }),
      });

      const data = await res.json();
      const reply = data.reply || `At your service, ${settingsRef.current.addressUserAs}.`;

      if (data.functionCalls && data.functionCalls.length > 0) {
        for (const call of data.functionCalls) {
          executeToolCall(call.name, call.args);
        }
      }

      appendMessage('assistant', reply, data.sources);
      speakText(reply);
    } catch (err: any) {
      appendMessage('assistant', `Apologies, ${settingsRef.current.addressUserAs}. Connection notice: ${err?.message || 'Re-establishing'}`);
      setJarvisState('idle');
    }
  };

  // Optical Vision
  const handleAnalyzeImage = async (base64Image: string, promptText: string) => {
    recordUserActivity();
    setIsVisionLoading(true);
    setJarvisState('thinking');
    appendMessage('user', `[Optical Image Transmitted]: ${promptText}`);

    try {
      const res = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          imageBase64: base64Image,
          imageMimeType: 'image/jpeg',
          addressAs: settings.addressUserAs,
          tasks: tasksRef.current,
          notes: notesRef.current,
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Analysis complete.';
      appendMessage('assistant', reply, data.sources);
      speakText(reply);
    } catch (err: any) {
      appendMessage('assistant', `Unable to resolve optical spectrum, ${settings.addressUserAs}.`);
      setJarvisState('idle');
    } finally {
      setIsVisionLoading(false);
    }
  };

  // Summarize
  const handleSummarizeContent = async (content: string, isUrl: boolean): Promise<string> => {
    recordUserActivity();
    const res = await fetch('/api/jarvis/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        isUrl,
        addressAs: settings.addressUserAs,
      }),
    });
    const data = await res.json();
    if (data.summary) {
      appendMessage('assistant', data.summary);
      speakText(`Here is the distilled briefing, ${settings.addressUserAs}.`);
    }
    return data.summary || 'Summary unavailable.';
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black text-cyan-400 font-rajdhani overflow-hidden hud-grid select-none">
      {/* Background Holographic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,120,255,0.18),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 pointer-events-none hud-scanlines opacity-40" />

      {/* Visible Telemetry Alert Banner */}
      {errorMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-rose-950/95 border border-rose-500/60 text-rose-200 text-xs font-mono-tech shadow-[0_0_25px_rgba(244,63,94,0.5)] max-w-xl animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
          <div className="flex-1">
            <span className="font-semibold text-rose-300 uppercase">TELEMETRY NOTICE: </span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => handleManualRetry()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-900/80 hover:bg-rose-800 border border-rose-500/50 text-[11px] text-white transition-all font-semibold"
            title="Retry Connection"
          >
            <RefreshCw className="w-3 h-3" />
            RETRY
          </button>
          <button
            onClick={() => setErrorMessage(null)}
            className="p-1 rounded text-rose-400 hover:text-white transition-colors"
            title="Dismiss Alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top HUD Header Banner */}
      <HUDHeader
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenVision={() => setIsVisionOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        connectionStatus={connectionStatus}
        errorMessage={errorMessage}
        onRetryConnection={handleManualRetry}
        reconnectAttempt={reconnectAttempt}
        maxReconnectAttempts={5}
      />

      {/* Main Tactical Grid Viewport */}
      <main className="relative flex-1 flex overflow-hidden p-2 sm:p-4 gap-3 sm:gap-4">
        {/* Left Panel: Directives, Today, Goals & Reviews */}
        <aside
          className={`transition-all duration-300 ease-in-out ${
            showLeftPanel
              ? 'w-80 sm:w-92 md:w-96 xl:w-[410px] flex shrink-0'
              : 'hidden'
          }`}
        >
          <TasksPanel
            tasks={tasks}
            goals={goals}
            commitments={commitments}
            dailyLogs={dailyLogs}
            weeklyScorecard={weeklyScorecard}
            ideaBacklog={ideaBacklog}
            timetable={timetable}
            notes={notes}
            streakCount={streakCount}
            todayMission={todayMission}
            definitionOfVictory={definitionOfVictory}
            activeReport={activeReport}
            onAddTask={(taskData) => {
              recordUserActivity();
              const newTask: TaskItem = {
                id: `task-${Date.now()}`,
                title: taskData.title,
                completed: false,
                priority: taskData.priority,
                category: taskData.category,
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                dueTime: taskData.dueTime,
                estimatedMinutes: taskData.estimatedMinutes,
                slipCount: 0,
                isTop3: taskData.isTop3,
                goalId: taskData.goalId,
              };
              setTasks((prev) => [newTask, ...prev]);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onToggleTask={(id) => {
              recordUserActivity();
              setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t))
              );
              if (settings.enableAudioSoundEffects) playHudSound('click');
            }}
            onDeleteTask={(id) => {
              recordUserActivity();
              setTasks((prev) => prev.filter((t) => t.id !== id));
            }}
            onRescheduleTask={(id) => {
              recordUserActivity();
              setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, slipCount: t.slipCount + 1 } : t))
              );
            }}
            onToggleTop3={(id) => {
              recordUserActivity();
              setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, isTop3: !t.isTop3 } : t))
              );
            }}
            onStartFocusOnTask={(task) => {
              recordUserActivity();
              setFocusSession({
                isActive: true,
                phase: 'focus',
                taskId: task.id,
                taskTitle: task.title,
                totalSeconds: (task.estimatedMinutes || 25) * 60,
                remainingSeconds: (task.estimatedMinutes || 25) * 60,
                cycleCount: 1,
              });
              if (settings.enableAudioSoundEffects) playHudSound('startup');
            }}
            onStart5MinRuleOnTask={(task) => {
              recordUserActivity();
              setFocusSession({
                isActive: true,
                phase: 'rule_5min',
                taskId: task.id,
                taskTitle: task.title,
                totalSeconds: 300,
                remainingSeconds: 300,
                cycleCount: 1,
              });
              if (settings.enableAudioSoundEffects) playHudSound('startup');
            }}
            onAddGoal={(goalData) => {
              recordUserActivity();
              const newGoal: GoalItem = {
                id: `goal-${Date.now()}`,
                title: goalData.title || 'Untitled Goal',
                category: goalData.category || 'general',
                targetDate: goalData.targetDate,
                progress: goalData.progress || 0,
                notes: goalData.notes,
                milestones: goalData.milestones,
                monthlyObjectives: goalData.monthlyObjectives,
                weeklyTarget: goalData.weeklyTarget,
                dailyAction: goalData.dailyAction,
                metrics: goalData.metrics,
                priorityTier: goalData.priorityTier,
              };
              setGoals((prev) => [...prev, newGoal]);
            }}
            onUpdateGoalProgress={(id, progress) => {
              recordUserActivity();
              setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, progress } : g))
              );
            }}
            onDeleteGoal={(id) => {
              recordUserActivity();
              setGoals((prev) => prev.filter((g) => g.id !== id));
            }}
            onAddCommitment={(comm) => {
              recordUserActivity();
              const newComm: CommitmentItem = {
                id: `comm-${Date.now()}`,
                commitment: comm.commitment,
                deadline: comm.deadline,
                whyItMatters: comm.whyItMatters,
                status: 'pending',
                createdAt: new Date().toLocaleDateString(),
              };
              setCommitments((prev) => [newComm, ...prev]);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onToggleCommitment={(id, status) => {
              recordUserActivity();
              setCommitments((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status } : c))
              );
            }}
            onDeleteCommitment={(id) => {
              recordUserActivity();
              setCommitments((prev) => prev.filter((c) => c.id !== id));
            }}
            onSaveDailyLog={(logData) => {
              recordUserActivity();
              const newLog: DailyLogItem = {
                id: `log-${Date.now()}`,
                date: logData.date || new Date().toISOString().split('T')[0],
                mission: logData.mission || todayMission,
                definitionOfVictory: logData.definitionOfVictory || definitionOfVictory,
                executionScore: typeof logData.executionScore === 'number' ? logData.executionScore : 8,
                completedTasksCount: tasks.filter((t) => t.completed).length,
                top3Completed: tasks.filter((t) => t.isTop3 && t.completed).length >= 3,
                wins: logData.wins || [],
                misses: logData.misses || [],
                tomorrowTop3: logData.tomorrowTop3 || [],
                notes: logData.notes,
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };
              setDailyLogs((prev) => [newLog, ...prev]);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onParkIdea={(idea, strategicValue) => {
              recordUserActivity();
              const newIdea: IdeaBacklogItem = {
                id: `idea-${Date.now()}`,
                idea,
                strategicValue,
                status: 'parked',
                createdAt: new Date().toLocaleDateString(),
              };
              setIdeaBacklog((prev) => [newIdea, ...prev]);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onDeleteIdea={(id) => {
              recordUserActivity();
              setIdeaBacklog((prev) => prev.filter((i) => i.id !== id));
            }}
            onPromoteIdeaToTask={(id) => {
              recordUserActivity();
              const found = ideaBacklog.find((i) => i.id === id);
              if (found) {
                const newTask: TaskItem = {
                  id: `task-${Date.now()}`,
                  title: found.idea,
                  completed: false,
                  priority: 'MEDIUM',
                  category: 'general',
                  createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  estimatedMinutes: 30,
                  slipCount: 0,
                  isTop3: false,
                };
                setTasks((prev) => [newTask, ...prev]);
                setIdeaBacklog((prev) => prev.filter((i) => i.id !== id));
                if (settings.enableAudioSoundEffects) playHudSound('startup');
              }
            }}
            onSaveTimetable={(routine) => {
              recordUserActivity();
              setTimetable(routine);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onAddNote={(topic, content) => {
              recordUserActivity();
              const newNote: NoteItem = {
                id: `note-${Date.now()}`,
                topic,
                content,
                createdAt: new Date().toLocaleDateString(),
              };
              setNotes((prev) => [newNote, ...prev]);
              if (settings.enableAudioSoundEffects) playHudSound('ping');
            }}
            onDeleteNote={(id) => {
              recordUserActivity();
              setNotes((prev) => prev.filter((n) => n.id !== id));
            }}
            onTriggerCommand={(command) => handleSendTextMessage(command)}
            onOpenReportModal={() => setShowReportModal(true)}
          />
        </aside>

        {/* Center: Holographic Arc Reactor Stage & Manager HUD */}
        <section className="flex-1 flex flex-col justify-between items-center relative overflow-hidden">
          {/* Panel toggles for mobile & compact screens */}
          <div className="w-full flex items-center justify-between px-2 pt-1 z-20">
            <button
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="p-1.5 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-cyan-400 hover:text-cyan-200 hover:border-cyan-400 text-xs font-mono-tech flex items-center gap-1 transition-all"
              title="Toggle Left Directives Panel"
            >
              {showLeftPanel ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
              <span className="hidden sm:inline">MANAGER</span>
            </button>

            <div className="flex items-center gap-2 font-mono-tech text-[10px] text-cyan-500/70 uppercase tracking-widest">
              <span>CHIEF OF STAFF // ALL CIRCUITS NOMINAL</span>
            </div>

            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="p-1.5 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-cyan-400 hover:text-cyan-200 hover:border-cyan-400 text-xs font-mono-tech flex items-center gap-1 transition-all"
              title="Toggle Right Comms Panel"
            >
              <span className="hidden sm:inline">COMMS</span>
              {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Focus Session HUD Bar (When active or paused) */}
          <FocusSessionHUD
            session={focusSession}
            onPauseToggle={() => setFocusSession((prev) => ({ ...prev, isActive: !prev.isActive }))}
            onStop={() => setFocusSession((prev) => ({ ...prev, isActive: false, phase: 'idle' }))}
            onCompleteTask={(taskId) => {
              if (taskId) {
                setTasks((prev) =>
                  prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
                );
              }
              setFocusSession((prev) => ({ ...prev, phase: 'break', remainingSeconds: 300, totalSeconds: 300 }));
            }}
            onUpdateRemaining={(remaining) =>
              setFocusSession((prev) => ({ ...prev, remainingSeconds: remaining }))
            }
            onSwitchPhase={(nextPhase) => {
              const nextTotal = nextPhase === 'focus' ? 1500 : 300;
              setFocusSession((prev) => ({
                ...prev,
                phase: nextPhase,
                totalSeconds: nextTotal,
                remainingSeconds: nextTotal,
                cycleCount: nextPhase === 'focus' ? prev.cycleCount + 1 : prev.cycleCount,
              }));
            }}
            onStart5MinRule={(taskTitle) => {
              setFocusSession({
                isActive: true,
                phase: 'rule_5min',
                taskTitle: taskTitle || 'Quick 5-Minute Sprint',
                totalSeconds: 300,
                remainingSeconds: 300,
                cycleCount: 1,
              });
              if (settings.enableAudioSoundEffects) playHudSound('startup');
            }}
          />

          {/* Central Reactor Orb */}
          <div className="flex-1 flex items-center justify-center">
            <ArcReactor
              state={jarvisState}
              micVolume={micVolume}
              speakerEnergy={speakerEnergy}
              isLiveActive={isLiveActive}
              connectionStatus={connectionStatus}
              onToggleVoice={toggleLiveVoice}
              reconnectAttempt={reconnectAttempt}
              maxReconnectAttempts={5}
            />
          </div>

          {/* Bottom Command Center */}
          <div className="w-full max-w-2xl px-2 pb-2">
            <QuickActions
              onSendMessage={handleSendTextMessage}
              onOpenVision={() => setIsVisionOpen(true)}
              onQuickSummarize={() => setIsSummarizeOpen(true)}
              isLiveActive={isLiveActive}
              onToggleVoice={toggleLiveVoice}
              isThinking={jarvisState === 'thinking'}
            />
          </div>
        </section>

        {/* Right Panel: Live Transmission Log & Intelligence */}
        <aside
          className={`transition-all duration-300 ease-in-out ${
            showRightPanel
              ? 'w-72 sm:w-80 md:w-88 xl:w-96 flex shrink-0'
              : 'hidden'
          }`}
        >
          <LiveTranscript
            messages={messages}
            livePartialText={livePartialText}
            isThinking={jarvisState === 'thinking'}
            onPlayAudio={(audioUrl) => {
              if (audioPlayerRef.current) {
                audioPlayerRef.current.playWavBase64(audioUrl);
              }
            }}
            onSpeakText={speakText}
            onClearHistory={() => setMessages([])}
          />
        </aside>
      </main>

      {/* Floating Active Timers HUD */}
      <TimerHUD
        timers={timers}
        onDismissTimer={(id) => setTimers((prev) => prev.filter((t) => t.id !== id))}
        onUpdateTimerRemaining={(id, remaining) =>
          setTimers((prev) =>
            prev.map((t) => (t.id === id ? { ...t, remainingSeconds: remaining } : t))
          )
        }
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) =>
          setSettings((prev) => ({ ...prev, ...newSettings }))
        }
      />

      {/* Vision & Camera Analyzer Modal */}
      <VisionModal
        isOpen={isVisionOpen}
        onClose={() => setIsVisionOpen(false)}
        onAnalyzeImage={handleAnalyzeImage}
        isLoading={isVisionLoading}
      />

      {/* Document / URL Summarize Modal */}
      <SummarizeModal
        isOpen={isSummarizeOpen}
        onClose={() => setIsSummarizeOpen(false)}
        onSummarize={handleSummarizeContent}
      />

      {/* Full Strategic Dossier & Briefing Report Modal */}
      {showReportModal && activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {activeReport.type.replace('_', ' ')}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-cyan-200 tracking-wide">
                  {activeReport.title}
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spoken Alert Box */}
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-mono-tech flex items-start gap-2">
              <span className="text-cyan-400 font-bold shrink-0">JARVIS:</span>
              <p className="italic leading-relaxed">{activeReport.summarySpoken}</p>
            </div>

            {/* Markdown Content scroll area */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
              {activeReport.contentMarkdown.split('\n\n').map((block, idx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-xs font-mono-tech uppercase text-cyan-400 font-bold tracking-wider pt-2 border-b border-cyan-500/10 pb-1">
                      {block.replace('### ', '')}
                    </h4>
                  );
                }
                if (block.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                      {block.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.match(/^\d+\. /)) {
                  return (
                    <ol key={idx} className="list-decimal pl-5 space-y-1 text-xs text-slate-300">
                      {block.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="text-xs text-slate-300">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 mt-3 border-t border-cyan-500/20 flex items-center justify-between">
              <span className="text-[10px] font-mono-tech text-slate-500">
                GENERATED: {activeReport.createdAt}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    handleSendTextMessage(`Brief me further on: ${activeReport.title}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-500/40 border border-cyan-500/40 text-cyan-200 text-xs font-mono-tech transition-all"
                >
                  DISCUSS WITH JARVIS
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-tech transition-all"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
