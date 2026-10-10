import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  JarvisState,
  LiveConnectionStatus,
  TranscriptMessage,
  ScheduleItem,
  AccountabilityData,
  JarvisSettings,
  ChatMode,
  ProjectItem,
  MemoryItem,
  PendingConfirmationAction,
} from './types/jarvis';
import { HUDHeader, DriveSyncStatus } from './components/HUDHeader';
import { LiveTranscript } from './components/LiveTranscript';
import { QuickActions } from './components/QuickActions';
import { ScheduleDrawer } from './components/ScheduleDrawer';
import { ProjectsDrawer } from './components/ProjectsDrawer';
import { MemoryDrawer } from './components/MemoryDrawer';
import { AccountabilityModal } from './components/AccountabilityModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { VisionModal } from './components/VisionModal';
import { SummarizeModal } from './components/SummarizeModal';
import { TodayCard } from './components/TodayCard';
import { Celebration } from './components/Celebration';
import { LiveAudioPlayer, LiveMicCapture, playHudSound } from './utils/audio';
import { initAuth, googleSignIn, logoutGoogle } from './services/googleAuth';
import { searchMyFiles, saveJarvisDataToDrive } from './services/googleDrive';

const STORAGE_KEYS = {
  SETTINGS: 'jarvis_settings_v3',
  MESSAGES: 'jarvis_messages_v3',
  LAST_BRIEFED_DATE: 'jarvis_last_briefed_date',
  LAST_CHECKIN_PREFIX: 'jarvis_checkin_',
  CHAT_MODE: 'jarvis_chat_mode',
};

const DEFAULT_SETTINGS: JarvisSettings = {
  addressUserAs: 'boss',
  voiceName: 'Zephyr',
  enableAudioSoundEffects: true,
  sensitivity: 1.0,
  checkInIntervalMinutes: 45,
  enableProactiveCheckIns: true,
  enableDueTimeAlerts: true,
  morningCheckInTime: '08:30',
  middayCheckInTime: '13:00',
  eveningCheckInTime: '20:00',
  managerName: 'Coach',
  chatMode: 'jarvis',
  voiceLanguage: 'en-US',
  autoSendVoice: true,
};

export default function App() {
  // Settings & Core State
  const [settings, setSettings] = useState<JarvisSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (_) {}
    return DEFAULT_SETTINGS;
  });

  const [chatMode, setChatMode] = useState<ChatMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_MODE);
      if (saved === 'manager' || saved === 'jarvis') return saved;
    } catch (_) {}
    return 'jarvis';
  });

  const [jarvisState, setJarvisState] = useState<JarvisState>('idle');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<LiveConnectionStatus>('connected');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false);
  const [livePartialText, setLivePartialText] = useState<string>('');

  // Celebration state
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string>('');

  // Messages
  const [messages, setMessages] = useState<TranscriptMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  // Persistent Schedule & Accountability
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [accountability, setAccountability] = useState<AccountabilityData>({
    streak: 0,
    lastStreakDate: '',
    lastBriefedDate: '',
    morningCheckInTime: '08:30',
    middayCheckInTime: '13:00',
    eveningCheckInTime: '20:00',
    weeklyStats: { completed: 0, total: 0, rate: 0 },
  });

  // Modals & Drawers
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isAccountabilityOpen, setIsAccountabilityOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState<boolean>(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState<boolean>(false);
  const [isVisionOpen, setIsVisionOpen] = useState<boolean>(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState<boolean>(false);
  const [isVisionLoading, setIsVisionLoading] = useState<boolean>(false);
  const [showTodayCard, setShowTodayCard] = useState<boolean>(false);

  // Phase 1 Multi-Tier Memory & Projects Store
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [memories, setMemories] = useState<MemoryItem[]>([]);

  // Google Drive Knowledge & Sync State
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [driveSyncStatus, setDriveSyncStatus] = useState<DriveSyncStatus>('disconnected');
  const [driveSyncError, setDriveSyncError] = useState<string | null>(null);
  const [lastDriveSyncTime, setLastDriveSyncTime] = useState<string>('');
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState<boolean>(false);

  // Audio references & Greeting tracking
  const audioPlayerRef = useRef<LiveAudioPlayer | null>(null);
  const micCaptureRef = useRef<LiveMicCapture | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const hasBriefedThisSessionRef = useRef<boolean>(false);
  const hasGreetedSessionRef = useRef<boolean>(false);

  // Initialize Firebase Google Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        setDriveSyncStatus('synced');
        setDriveSyncError(null);
      },
      (errorMsg) => {
        if (errorMsg) {
          setDriveSyncStatus('error');
          setDriveSyncError(errorMsg);
        } else {
          setGoogleUser(null);
          setGoogleToken(null);
          setDriveSyncStatus('disconnected');
        }
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleSignInGoogle = async () => {
    try {
      setIsGoogleSigningIn(true);
      setDriveSyncStatus('syncing');
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        setDriveSyncStatus('synced');
        setDriveSyncError(null);
        setLastDriveSyncTime(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      setDriveSyncStatus('error');
      setDriveSyncError(err?.message || 'Google authentication failed');
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleSignOutGoogle = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
      setGoogleToken(null);
      setDriveSyncStatus('disconnected');
    } catch (err: any) {
      console.warn('Sign out notice:', err);
    }
  };

  const handleManualSyncDrive = async () => {
    if (!googleToken) {
      await handleSignInGoogle();
      return;
    }
    try {
      setDriveSyncStatus('syncing');
      await saveJarvisDataToDrive(googleToken, {
        tasks: scheduleItems,
        goals: [],
        commitments: [],
        dailyLogs: [],
        weeklyScorecard: null,
        ideaBacklog: [],
        timetable: {},
        todayMission: '',
        definitionOfVictory: '',
        notes: memories,
        streakCount: accountability.streak,
      });
      setDriveSyncStatus('synced');
      setLastDriveSyncTime(new Date().toLocaleTimeString());
    } catch (err: any) {
      setDriveSyncStatus('error');
      setDriveSyncError(err?.message || 'Sync failed');
    }
  };

  // Save Settings, ChatMode & Messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (_) {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_MODE, chatMode);
    } catch (_) {}
  }, [chatMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages.slice(-50)));
    } catch (_) {}
  }, [messages]);

  // Init Audio Player
  useEffect(() => {
    audioPlayerRef.current = new LiveAudioPlayer();
    return () => {
      audioPlayerRef.current?.stop();
    };
  }, []);

  // Fetch Schedule Data from persistent store
  const refreshSchedule = useCallback(async () => {
    try {
      const res = await fetch('/api/jarvis/schedule');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          setScheduleItems(data.items);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch schedule:', err);
    }
  }, []);

  // Fetch Accountability Data from persistent store
  const refreshAccountability = useCallback(async () => {
    try {
      const res = await fetch('/api/jarvis/accountability');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setAccountability((prev) => ({
            ...prev,
            ...data,
            morningCheckInTime: data.checkIns?.morning || prev.morningCheckInTime,
            middayCheckInTime: data.checkIns?.midday || prev.middayCheckInTime,
            eveningCheckInTime: data.checkIns?.evening || prev.eveningCheckInTime,
          }));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch accountability:', err);
    }
  }, []);

  // Fetch Projects Data from persistent store (Phase 1 Project Memory Architecture)
  const refreshProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/jarvis/projects');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch projects:', err);
    }
  }, []);

  // Fetch Memories Data from persistent store (Phase 1 Personal Memory Architecture)
  const refreshMemories = useCallback(async () => {
    try {
      const res = await fetch('/api/jarvis/memories');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.memories)) {
          setMemories(data.memories);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch memories:', err);
    }
  }, []);

  // Speech helper
  const speakText = useCallback(
    async (text: string) => {
      if (isMuted || !text) return;

      setJarvisState('speaking');
      try {
        const res = await fetch('/api/jarvis/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voiceName: settings.voiceName }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audioBase64 && audioPlayerRef.current) {
            audioPlayerRef.current.playWavBase64(data.audioBase64);
            setTimeout(() => setJarvisState('idle'), (data.audioBase64.length / 8000) * 1000);
            return;
          }
        }
      } catch (_) {}

      // Fallback: Web Speech API synthesis
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 0.95;
        utterance.onend = () => setJarvisState('idle');
        utterance.onerror = () => setJarvisState('idle');
        window.speechSynthesis.speak(utterance);
      } else {
        setJarvisState('idle');
      }
    },
    [isMuted, settings.voiceName]
  );

  // Daily Briefing on First Open of Day
  useEffect(() => {
    const checkAndTriggerDailyBriefing = async () => {
      if (hasBriefedThisSessionRef.current) return;
      hasBriefedThisSessionRef.current = true;

      const todayStr = new Date().toISOString().split('T')[0];
      const localLastBriefed = localStorage.getItem(STORAGE_KEYS.LAST_BRIEFED_DATE);

      // Fetch latest schedule & accountability
      await refreshSchedule();
      let accData = null;
      try {
        const accRes = await fetch('/api/jarvis/accountability');
        if (accRes.ok) accData = await accRes.json();
      } catch (_) {}

      const serverLastBriefed = accData?.lastBriefedDate || '';

      // If already briefed today either on server or locally, do NOT re-brief!
      if (localLastBriefed === todayStr || serverLastBriefed === todayStr) {
        return;
      }

      // Fetch all schedule items and break down overdue, today, and upcoming 3 days
      const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
      let overdueItems: any[] = [];
      let todaySchedule: any[] = [];
      let upcomingItems: any[] = [];

      try {
        const schedRes = await fetch('/api/jarvis/schedule');
        if (schedRes.ok) {
          const schedJson = await schedRes.json();
          const items: any[] = Array.isArray(schedJson.items) ? schedJson.items : [];
          overdueItems = items.filter((it: any) => it.date < todayStr && !it.completed);
          todaySchedule = items.filter((it: any) => it.date === todayStr || it.date === 'today');
          upcomingItems = items.filter((it: any) => it.date > todayStr && it.date <= threeDaysLater && !it.completed);
        }
      } catch (_) {}

      const now = new Date();
      const currentHour = now.getHours();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Real time of day greeting
      const timeGreeting =
        currentHour < 12
          ? 'Good morning'
          : currentHour < 17
          ? 'Good afternoon'
          : 'Good evening';

      // Skip greeting if already greeted in this session
      const greetingPrefix = hasGreetedSessionRef.current
        ? `It is ${timeStr}. Here is your daily briefing for today:`
        : `${timeGreeting}, ${settings.addressUserAs}. It is ${timeStr}. Here is your daily briefing for today:`;

      hasGreetedSessionRef.current = true;

      const sections: string[] = [];

      if (overdueItems.length > 0) {
        sections.push(`⚠️ OVERDUE ITEMS (${overdueItems.length}):\n` + overdueItems.map((i: any) => `• [${i.date}] ${i.title}${i.slipCount >= 3 ? ' (⚠️ Postponed ' + i.slipCount + 'x)' : ''}`).join('\n'));
      }

      if (todaySchedule.length > 0) {
        sections.push(`📅 TODAY'S AGENDA (${todaySchedule.length}):\n` + todaySchedule.map((i: any) => `• ${i.time ? i.time + ' - ' : ''}${i.title}${i.completed ? ' (Done)' : ''}`).join('\n'));
      } else {
        sections.push(`📅 TODAY'S AGENDA:\n• Your schedule is clear for today.`);
      }

      if (upcomingItems.length > 0) {
        sections.push(`⏳ UPCOMING DEADLINES (NEXT 3 DAYS):\n` + upcomingItems.map((i: any) => `• [${i.date}${i.time ? ' ' + i.time : ''}] ${i.title}`).join('\n'));
      }

      const briefingText = `${greetingPrefix}\n\n${sections.join('\n\n')}\n\nLet's lock in your non-negotiable execution. What is our first action?`;

      const briefingMsg: TranscriptMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: briefingText,
        timestamp: timeStr,
        senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
      };

      setMessages((prev) => [...prev, briefingMsg]);
      speakText(briefingText);

      // Record lastBriefedDate to prevent repeating today
      localStorage.setItem(STORAGE_KEYS.LAST_BRIEFED_DATE, todayStr);
      try {
        await fetch('/api/jarvis/accountability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastBriefedDate: todayStr }),
        });
      } catch (_) {}
    };

    checkAndTriggerDailyBriefing();
  }, [refreshSchedule, settings.addressUserAs, settings.managerName, chatMode, speakText]);

  // Initial load: refresh schedule, accountability, projects & memories
  useEffect(() => {
    refreshSchedule();
    refreshAccountability();
    refreshProjects();
    refreshMemories();
  }, [refreshSchedule, refreshAccountability, refreshProjects, refreshMemories]);

  // Accountability Check-In Ticker (Morning, Midday, Evening)
  useEffect(() => {
    if (!settings.enableProactiveCheckIns) return;

    const interval = setInterval(() => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const currentHM = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
      const currentHour = now.getHours();

      const morningTime = settings.morningCheckInTime || '08:30';
      const middayTime = settings.middayCheckInTime || '13:00';
      const eveningTime = settings.eveningCheckInTime || '20:00';

      const timeGreeting =
        currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

      const checkInSlots = [
        {
          type: 'morning',
          time: morningTime,
          key: `${STORAGE_KEYS.LAST_CHECKIN_PREFIX}morning_${todayStr}`,
          prompt: `${timeGreeting}, ${settings.addressUserAs}. It is ${currentHM} — time for your morning check-in. What are your Top 3 non-negotiable commitments for today?`,
        },
        {
          type: 'midday',
          time: middayTime,
          key: `${STORAGE_KEYS.LAST_CHECKIN_PREFIX}midday_${todayStr}`,
          prompt: `Midday check-in, ${settings.addressUserAs} (${currentHM}). What have you knocked out so far? Are any priorities stalling?`,
        },
        {
          type: 'evening',
          time: eveningTime,
          key: `${STORAGE_KEYS.LAST_CHECKIN_PREFIX}evening_${todayStr}`,
          prompt: `${timeGreeting}, ${settings.addressUserAs} (${currentHM}). It is time for your evening review. Let us audit what got completed, mark items done, and reschedule missed ones.`,
        },
      ];

      for (const slot of checkInSlots) {
        if (currentHM === slot.time && !localStorage.getItem(slot.key)) {
          localStorage.setItem(slot.key, 'true');
          const checkInMsg: TranscriptMessage = {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            text: slot.prompt,
            timestamp: currentHM,
            senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
          };
          setMessages((prev) => [...prev, checkInMsg]);
          speakText(slot.prompt);
          if (settings.enableAudioSoundEffects) playHudSound('ping');
          break;
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [settings, chatMode, speakText]);

  // Handle Send Text Message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || jarvisState === 'thinking') return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: TranscriptMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setJarvisState('thinking');
    if (settings.enableAudioSoundEffects) playHudSound('click');

    const activeManagerName = settings.managerName || 'Coach';

    try {
      // Clean conversation history without duplicating current prompt
      const conversationHistory = messages.slice(-8).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      // Google Drive Knowledge Layer Query Interception
      let driveContext: { fileName: string; content?: string; mimeType?: string } | undefined = undefined;
      const lowerText = text.toLowerCase();
      const isDriveQuery = lowerText.includes('drive') || lowerText.includes('google drive');

      if (
        isDriveQuery &&
        (lowerText.includes('search') ||
          lowerText.includes('find') ||
          lowerText.includes('check') ||
          lowerText.includes('look') ||
          lowerText.includes('summarize') ||
          lowerText.startsWith('/drive'))
      ) {
        if (!googleToken) {
          const noAuthMsg: TranscriptMessage = {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            text: `Google Drive is currently not linked, ${settings.addressUserAs}. Please connect your Google account via the DRIVE button in the header or in Settings to search your Drive documents.`,
            timestamp: timeStr,
            senderName: chatMode === 'manager' ? activeManagerName : 'JARVIS',
            attributions: [
              {
                type: 'SYSTEM_INFO',
                label: 'Google Drive Knowledge Layer',
                detail: 'Authentication Required',
              },
            ],
          };
          setMessages((prev) => [...prev, noAuthMsg]);
          speakText(noAuthMsg.text);
          setJarvisState('idle');
          return;
        }

        try {
          const cleanSearchTerm = text
            .replace(/(?:jarvis|coach|please|can you|could you|search|find|look for|my|in|google|drive|for)/gi, '')
            .trim();
          const driveRes = await searchMyFiles(googleToken, cleanSearchTerm || 'transcript');
          if (driveRes.selectedFile) {
            driveContext = {
              fileName: driveRes.selectedFile.name,
              mimeType: driveRes.selectedFile.mimeType,
              content:
                driveRes.content ||
                `File "${driveRes.selectedFile.name}" (${driveRes.selectedFile.mimeType}) located in Google Drive.`,
            };
          } else {
            driveContext = {
              fileName: cleanSearchTerm || 'Search Query',
              content: `No matching files for "${cleanSearchTerm}" were found in your Google Drive.`,
            };
          }
        } catch (dErr: any) {
          console.warn('Google Drive search notice:', dErr);
        }
      }

      const res = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          addressAs: settings.addressUserAs,
          apiKey: settings.apiKey,
          mode: chatMode,
          managerName: activeManagerName,
          hasGreeted: hasGreetedSessionRef.current,
          conversationHistory,
          driveContext,
        }),
      });

      hasGreetedSessionRef.current = true;

      if (res.ok) {
        const data = await res.json();
        const replyText =
          data.reply ||
          (chatMode === 'manager'
            ? `I hear you, ${settings.addressUserAs}. Let's take this one step at a time.`
            : `Acknowledged, ${settings.addressUserAs}.`);

        // Check if user completed a goal/task to celebrate
        if (
          data.celebrate ||
          text.toLowerCase().includes('done') ||
          text.toLowerCase().includes('completed') ||
          text.toLowerCase().includes('finished')
        ) {
          setShowCelebration(true);
          setCelebrationMessage(
            chatMode === 'manager'
              ? `Solid execution! Celebrate the win with ${activeManagerName}.`
              : 'Task finished! Streak momentum protected.'
          );
        }

        const assistantMessage: TranscriptMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          role: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: chatMode === 'manager' ? activeManagerName : 'JARVIS',
          sources: data.sources || [],
          attributions: data.attributions || [],
          taskSteps: data.taskSteps || [],
          pendingConfirmation: data.pendingConfirmation || undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        speakText(replyText);

        // If tools updated schedule, accountability, projects, or memories, refresh
        if (data.functionCalls && data.functionCalls.length > 0) {
          for (const call of data.functionCalls) {
            if (call.name === 'manage_schedule') refreshSchedule();
            if (call.name === 'manage_accountability') refreshAccountability();
            if (call.name === 'manage_projects') refreshProjects();
            if (call.name === 'manage_memories') refreshMemories();
          }
        }
      } else {
        const fallbackName = chatMode === 'manager' ? activeManagerName : 'JARVIS';
        const errorMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: `I had a quick glitch connecting, ${settings.addressUserAs}. What were we focusing on?`,
          timestamp: timeStr,
          senderName: fallbackName,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const fallbackName = chatMode === 'manager' ? activeManagerName : 'JARVIS';
      const errorMsg: TranscriptMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: `Network interruption detected, ${settings.addressUserAs}. I'm right here with you in local mode.`,
        timestamp: timeStr,
        senderName: fallbackName,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setJarvisState('idle');
    }
  };

  // Schedule Actions
  const handleAddScheduleItem = async (item: {
    title: string;
    date: string;
    time?: string;
    category: ScheduleItem['category'];
  }) => {
    try {
      const res = await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', item }),
      });
      if (res.ok) {
        await refreshSchedule();
        if (settings.enableAudioSoundEffects) playHudSound('startup');
      }
    } catch (_) {}
  };

  const handleUpdateScheduleItem = async (item: ScheduleItem) => {
    try {
      const res = await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', item }),
      });
      if (res.ok) await refreshSchedule();
    } catch (_) {}
  };

  const handleDeleteScheduleItem = async (id: string) => {
    try {
      const res = await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) await refreshSchedule();
    } catch (_) {}
  };

  const handleRescheduleItem = async (id: string, newDate: string, newTime?: string) => {
    try {
      const res = await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reschedule', id, newDate, newTime }),
      });
      if (res.ok) {
        await refreshSchedule();
        const updated = scheduleItems.find((i) => i.id === id);
        if (updated && (updated.slipCount || 0) + 1 >= 3) {
          const warningText =
            chatMode === 'manager'
              ? `${settings.addressUserAs}, "${updated.title}" has been pushed 3 times now. Let's be honest about why. Can we break off a tiny 2-minute chunk right now?`
              : `Attention ${settings.addressUserAs}: "${updated.title}" has now been postponed 3 or more times. Break it into an immediate 5-minute action or commit to an exact non-negotiable time right now.`;
          handleSendMessage(warningText);
        }
      }
    } catch (_) {}
  };

  const handleToggleComplete = async (id: string) => {
    const item = scheduleItems.find((i) => i.id === id);
    if (!item) return;

    try {
      if (!item.completed) {
        await fetch('/api/jarvis/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'complete', id }),
        });

        // Trigger celebratory win animation and glow
        setCelebrationMessage(`Win locked in: "${item.title}"`);
        setShowCelebration(true);

        // Increment streak if not incremented today
        const todayStr = new Date().toISOString().split('T')[0];
        if (accountability.lastStreakDate !== todayStr) {
          const newStreak = (accountability.streak || 0) + 1;
          await fetch('/api/jarvis/accountability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ streak: newStreak, lastStreakDate: todayStr }),
          });
        }
        if (settings.enableAudioSoundEffects) playHudSound('startup');
      } else {
        await fetch('/api/jarvis/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update', item: { ...item, completed: false } }),
        });
      }
      await refreshSchedule();
      await refreshAccountability();
    } catch (_) {}
  };

  const handleBatchUploadSchedule = async (items: any[]) => {
    try {
      const res = await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'batch_upload', items }),
      });
      if (res.ok) {
        await refreshSchedule();
        handleSendMessage(`I have uploaded my monthly schedule (${items.length} items). Please confirm.`);
      }
    } catch (_) {}
  };

  // Phase 1 Projects Actions (Project Memory Architecture)
  const handleCreateProject = async (project: Partial<ProjectItem>) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', project }),
      });
      if (res.ok) {
        await refreshProjects();
        if (settings.enableAudioSoundEffects) playHudSound('startup');
      }
    } catch (_) {}
  };

  const handleUpdateProject = async (project: ProjectItem) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', project }),
      });
      if (res.ok) await refreshProjects();
    } catch (_) {}
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) await refreshProjects();
    } catch (_) {}
  };

  const handleToggleProjectTask = async (projectId: string, taskId: string) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_task', id: projectId, taskId }),
      });
      if (res.ok) await refreshProjects();
    } catch (_) {}
  };

  const handleAddProjectTask = async (projectId: string, taskTitle: string) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_task', id: projectId, taskTitle }),
      });
      if (res.ok) await refreshProjects();
    } catch (_) {}
  };

  const handleAddProjectDecision = async (projectId: string, title: string, rationale?: string) => {
    try {
      const res = await fetch('/api/jarvis/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_decision', id: projectId, decision: { title, rationale } }),
      });
      if (res.ok) await refreshProjects();
    } catch (_) {}
  };

  // Phase 1 Personal Memories Actions
  const handleAddMemory = async (content: string, category: any, importance: any) => {
    try {
      const res = await fetch('/api/jarvis/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', content, category, importance }),
      });
      if (res.ok) {
        await refreshMemories();
        if (settings.enableAudioSoundEffects) playHudSound('startup');
      }
    } catch (_) {}
  };

  const handleDeleteMemory = async (id: string) => {
    try {
      const res = await fetch('/api/jarvis/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) await refreshMemories();
    } catch (_) {}
  };

  // Phase 1 Confirmation Protocol Handler (5-Tier Permission Protocol)
  const handleConfirmAction = async (pendingAction: PendingConfirmationAction, approved: boolean) => {
    try {
      const res = await fetch('/api/jarvis/confirm-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionId: pendingAction.id,
          approved,
          actionType: pendingAction.actionType,
          payload: pendingAction.payload,
        }),
      });

      // Update message state with resolved confirmation
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.pendingConfirmation?.id === pendingAction.id) {
            return {
              ...msg,
              pendingConfirmation: {
                ...msg.pendingConfirmation,
                status: approved ? 'approved' : 'rejected',
              },
            };
          }
          return msg;
        })
      );

      if (res.ok) {
        const data = await res.json();
        const ackMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: approved
            ? `Protocol executed, ${settings.addressUserAs}: ${data.message || 'Action executed successfully.'}`
            : `Protocol cancelled, ${settings.addressUserAs}. Operation was denied.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
        };
        setMessages((prev) => [...prev, ackMsg]);
        speakText(ackMsg.text);

        if (approved) {
          await refreshProjects();
          await refreshMemories();
        }
      }
    } catch (_) {}
  };

  // Accountability Check-In Trigger
  const handleTriggerCheckIn = (type: 'morning' | 'midday' | 'evening') => {
    setIsAccountabilityOpen(false);
    if (type === 'morning') {
      handleSendMessage('Start my morning check-in.');
    } else if (type === 'midday') {
      handleSendMessage('Start my midday check-in.');
    } else {
      handleSendMessage('Start my evening review.');
    }
  };

  // Evening Review Completion
  const handleCompleteEveningReview = async (reviewData: {
    completedIds: string[];
    rescheduledItems: { id: string; newDate: string; newTime?: string }[];
  }) => {
    for (const id of reviewData.completedIds) {
      await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'complete', id }),
      });
    }

    for (const item of reviewData.rescheduledItems) {
      await fetch('/api/jarvis/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reschedule',
          id: item.id,
          newDate: item.newDate,
          newTime: item.newTime,
        }),
      });
    }

    // Update streak & completion rate
    const totalToday = reviewData.completedIds.length + reviewData.rescheduledItems.length;
    const rate = totalToday > 0 ? Math.round((reviewData.completedIds.length / totalToday) * 100) : 100;
    const todayStr = new Date().toISOString().split('T')[0];
    const newStreak = (accountability.streak || 0) + 1;

    await fetch('/api/jarvis/accountability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        streak: newStreak,
        lastStreakDate: todayStr,
        weeklyStats: {
          completed: (accountability.weeklyStats?.completed || 0) + reviewData.completedIds.length,
          total: (accountability.weeklyStats?.total || 0) + totalToday,
          rate,
        },
      }),
    });

    await refreshSchedule();
    await refreshAccountability();

    if (reviewData.completedIds.length > 0) {
      setCelebrationMessage(`${reviewData.completedIds.length} tasks completed today! Streak: ${newStreak} days.`);
      setShowCelebration(true);
    }

    handleSendMessage(
      `Evening review locked in: ${reviewData.completedIds.length} completed, ${reviewData.rescheduledItems.length} rescheduled. Streak: ${newStreak} days. Rate: ${rate}%.`
    );
  };

  // Vision Modal Handler
  const handleAnalyzeImage = async (base64Image: string, prompt: string) => {
    setIsVisionLoading(true);
    setJarvisState('thinking');
    try {
      const res = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'Analyze this camera target, please.',
          imageBase64: base64Image,
          addressAs: settings.addressUserAs,
          apiKey: settings.apiKey,
          mode: chatMode,
          managerName: settings.managerName || 'Coach',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || 'Visual target analyzed.';
        const assistantMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: `[Optical Scan]:\n${replyText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
        };
        setMessages((prev) => [...prev, assistantMsg]);
        speakText(replyText);
        setIsVisionOpen(false);
      }
    } catch (_) {
    } finally {
      setIsVisionLoading(false);
      setJarvisState('idle');
    }
  };

  // Summarize Modal Handler
  const handleSummarizeContent = async (content: string, isUrl: boolean): Promise<string> => {
    setJarvisState('thinking');
    try {
      const res = await fetch('/api/jarvis/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isUrl, addressAs: settings.addressUserAs }),
      });
      if (res.ok) {
        const data = await res.json();
        const summaryText = data.summary || 'Summary completed.';
        const summaryMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: summaryText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
        };
        setMessages((prev) => [...prev, summaryMsg]);
        speakText(summaryText);
        return summaryText;
      }
      return 'Failed to generate summary.';
    } catch (err: any) {
      return 'Error generating summary: ' + (err.message || 'Operation failed');
    } finally {
      setJarvisState('idle');
    }
  };

  // File Upload Reference & Handlers
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAttachmentPicker = () => {
    fileInputRef.current?.click();
  };

  const handleAttachmentFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(fileName);
    const isSchedule = /\.(json|csv|ics)$/i.test(fileName);
    const isText = /\.(txt|md)$/i.test(fileName);

    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        handleAnalyzeImage(base64, 'Analyze this attached image, please.');
      };
      reader.onerror = () => {
        handleSendMessage('I attempted to upload an image but encountered a read error.');
      };
      reader.readAsDataURL(file);
    } else if (isSchedule || isText) {
      const reader = new FileReader();
      reader.onload = async () => {
        const textContent = reader.result as string;
        if (fileName.endsWith('.json')) {
          try {
            const parsed = JSON.parse(textContent);
            const items = Array.isArray(parsed) ? parsed : parsed.items || [];
            if (items.length > 0) {
              await handleBatchUploadSchedule(items);
              return;
            }
          } catch (_) {}
        }
        handleSendMessage(`[Attached Document: "${file.name}"]:\n\n${textContent.slice(0, 1500)}`);
      };
      reader.onerror = () => {
        handleSendMessage(`Failed to read file ${file.name}.`);
      };
      reader.readAsText(file);
    } else {
      handleSendMessage(`Attached file "${file.name}" format is not supported. Please upload an image, schedule (.json, .csv, .ics), or text file.`);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Toggle Live Voice (WebSocket real-time streaming)
  const toggleLiveVoice = () => {
    if (isLiveActive) {
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ type: 'close' }));
        wsRef.current.close();
        wsRef.current = null;
      }
      micCaptureRef.current?.stop();
      setIsLiveActive(false);
      setJarvisState('idle');
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('connecting');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsLiveActive(true);
        setConnectionStatus('connected');
        ws.send(
          JSON.stringify({
            type: 'init',
            voiceName: settings.voiceName,
            addressAs: settings.addressUserAs,
            apiKey: settings.apiKey,
          })
        );
        // Start Mic Capture
        micCaptureRef.current = new LiveMicCapture((base64PCM) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'audio', data: base64PCM }));
          }
        });
        const micResult = await micCaptureRef.current.start();
        if (!micResult.success) {
          setIsLiveActive(false);
          setConnectionStatus('error');
          if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
          }
          const warningText = micResult.isPermissionDenied
            ? 'Microphone permission was denied by browser settings. Please enable microphone access to use voice input.'
            : 'Audio device unavailable: ' + (micResult.error || 'Please check microphone connection.');

          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              text: warningText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
            },
          ]);
          setTimeout(() => setConnectionStatus('connected'), 4000);
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'transcript') {
            setLivePartialText('');
            const assistantMsg: TranscriptMessage = {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              text: msg.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderName: chatMode === 'manager' ? (settings.managerName || 'Coach') : 'JARVIS',
            };
            setMessages((prev) => [...prev, assistantMsg]);
          } else if (msg.type === 'audio' && msg.data && audioPlayerRef.current && !isMuted) {
            audioPlayerRef.current.playChunkBase64(msg.data);
          }
        } catch (_) {}
      };

      ws.onerror = () => {
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        setIsLiveActive(false);
        micCaptureRef.current?.stop();
        setConnectionStatus('connected');
      };
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayItems = scheduleItems.filter((i) => i.date === todayStr || i.date === 'today');

  return (
    <div className="flex flex-col h-screen w-full bg-[#06140F] text-[#ECFDF5] overflow-x-hidden font-sans select-none">
      {/* Hidden File Picker Input for Attachments */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.json,.csv,.ics,.txt,.md"
        onChange={handleAttachmentFileSelected}
        className="hidden"
      />

      {/* Subtle Confetti and Glow Celebration Component */}
      <Celebration
        trigger={showCelebration}
        message={celebrationMessage}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Top Header */}
      <HUDHeader
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenVision={() => setIsVisionOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        connectionStatus={connectionStatus}
        driveSyncStatus={driveSyncStatus}
        userEmail={googleUser?.email}
        streak={accountability.streak || 0}
        completionRate={accountability.weeklyStats?.rate || 0}
        chatMode={chatMode}
        onToggleChatMode={() => setChatMode((prev) => (prev === 'jarvis' ? 'manager' : 'jarvis'))}
        managerName={settings.managerName || 'Coach'}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenAccountability={() => setIsAccountabilityOpen(true)}
        onOpenProjects={() => setIsProjectsOpen(true)}
        onOpenMemory={() => setIsMemoryOpen(true)}
        onToggleTodayCard={() => setShowTodayCard((prev) => !prev)}
        showTodayCard={showTodayCard}
      />

      {/* Main Single-Column Chat Area */}
      <main className="flex-1 w-full max-w-4xl sm:max-w-5xl mx-auto flex flex-col min-h-0 overflow-hidden px-2 sm:px-4 py-2">
        {/* Collapsible Today Card with Progress Bar (Tucked away by default) */}
        {showTodayCard && (
          <TodayCard
            items={todayItems}
            onToggleComplete={handleToggleComplete}
            onOpenSchedule={() => setIsScheduleOpen(true)}
          />
        )}

        {/* Main Chat Stream (The Transmission Log) */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <LiveTranscript
            messages={messages}
            livePartialText={livePartialText}
            isThinking={jarvisState === 'thinking'}
            isSpeaking={jarvisState === 'speaking'}
            isConversationMode={isConversationMode}
            onToggleConversationMode={(enabled) => setIsConversationMode(enabled)}
            chatMode={chatMode}
            managerName={settings.managerName || 'Coach'}
            onSpeakText={speakText}
            onClearHistory={() => setMessages([])}
            onConfirmAction={handleConfirmAction}
          />
        </div>

        {/* Sticky Input Command Console */}
        <div className="w-full pt-2 shrink-0">
          <QuickActions
            onSendMessage={handleSendMessage}
            onOpenVision={() => setIsVisionOpen(true)}
            onQuickSummarize={() => setIsSummarizeOpen(true)}
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onOpenFileUpload={handleOpenAttachmentPicker}
            onOpenProjects={() => setIsProjectsOpen(true)}
            onOpenMemory={() => setIsMemoryOpen(true)}
            isLiveActive={isLiveActive}
            onToggleVoice={toggleLiveVoice}
            isThinking={jarvisState === 'thinking'}
            chatMode={chatMode}
            onSelectChatMode={(mode) => setChatMode(mode)}
            managerName={settings.managerName || 'Coach'}
            voiceLanguage={settings.voiceLanguage || 'en-US'}
            autoSendVoice={settings.autoSendVoice ?? true}
            onStopAudioPlayback={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              audioPlayerRef.current?.stop();
              setJarvisState('idle');
            }}
          />
        </div>
      </main>

      {/* Projects Intelligence Hub Drawer (Phase 1 Project Memory Architecture) */}
      <ProjectsDrawer
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        projects={projects}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onToggleTask={handleToggleProjectTask}
        onAddTask={handleAddProjectTask}
        onAddDecision={handleAddProjectDecision}
        onSelectProjectForWork={(projectName) =>
          handleSendMessage(`Let's focus on project ${projectName}. What is our immediate next action?`)
        }
      />

      {/* Long-Term Memory Bank Drawer (Phase 1 Personal Memory Architecture) */}
      <MemoryDrawer
        isOpen={isMemoryOpen}
        onClose={() => setIsMemoryOpen(false)}
        memories={memories}
        onAddMemory={handleAddMemory}
        onDeleteMemory={handleDeleteMemory}
      />

      {/* Monthly Schedule Drawer */}
      <ScheduleDrawer
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        scheduleItems={scheduleItems}
        onAddItem={handleAddScheduleItem}
        onUpdateItem={handleUpdateScheduleItem}
        onDeleteItem={handleDeleteScheduleItem}
        onRescheduleItem={handleRescheduleItem}
        onToggleComplete={handleToggleComplete}
        onBatchUpload={handleBatchUploadSchedule}
      />

      {/* Accountability Radar & Evening Review Modal */}
      <AccountabilityModal
        isOpen={isAccountabilityOpen}
        onClose={() => setIsAccountabilityOpen(false)}
        data={accountability}
        todayItems={todayItems}
        onTriggerCheckIn={handleTriggerCheckIn}
        onCompleteEveningReview={handleCompleteEveningReview}
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
        onSignInGoogle={handleSignInGoogle}
        onSignOutGoogle={handleSignOutGoogle}
        userEmail={googleUser?.email}
        driveSyncStatus={driveSyncStatus}
        lastDriveSyncTime={lastDriveSyncTime}
        driveSyncError={driveSyncError}
        onManualSyncDrive={handleManualSyncDrive}
        isGoogleSigningIn={isGoogleSigningIn}
      />

      {/* Vision Modal */}
      <VisionModal
        isOpen={isVisionOpen}
        onClose={() => setIsVisionOpen(false)}
        onAnalyzeImage={handleAnalyzeImage}
        isLoading={isVisionLoading}
      />

      {/* Summarize Modal */}
      <SummarizeModal
        isOpen={isSummarizeOpen}
        onClose={() => setIsSummarizeOpen(false)}
        onSummarize={handleSummarizeContent}
      />
    </div>
  );
}
