import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  JarvisState,
  LiveConnectionStatus,
  TranscriptMessage,
  ScheduleItem,
  AccountabilityData,
  JarvisSettings,
  SourceCitation,
} from './types/jarvis';
import { HUDHeader } from './components/HUDHeader';
import { LiveTranscript } from './components/LiveTranscript';
import { QuickActions } from './components/QuickActions';
import { ScheduleDrawer } from './components/ScheduleDrawer';
import { AccountabilityModal } from './components/AccountabilityModal';
import { SettingsDrawer } from './components/SettingsDrawer';
import { VisionModal } from './components/VisionModal';
import { SummarizeModal } from './components/SummarizeModal';
import { LiveAudioPlayer, LiveMicCapture, playHudSound } from './utils/audio';

const STORAGE_KEYS = {
  SETTINGS: 'jarvis_settings_v3',
  MESSAGES: 'jarvis_messages_v3',
  LAST_BRIEFED_DATE: 'jarvis_last_briefed_date',
  LAST_CHECKIN_PREFIX: 'jarvis_checkin_',
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

  const [jarvisState, setJarvisState] = useState<JarvisState>('idle');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<LiveConnectionStatus>('connected');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [livePartialText, setLivePartialText] = useState<string>('');

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
  const [isVisionOpen, setIsVisionOpen] = useState<boolean>(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState<boolean>(false);
  const [isVisionLoading, setIsVisionLoading] = useState<boolean>(false);

  // Audio references
  const audioPlayerRef = useRef<LiveAudioPlayer | null>(null);
  const micCaptureRef = useRef<LiveMicCapture | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const hasBriefedThisSessionRef = useRef<boolean>(false);
  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  // Save Settings & Messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (_) {}
  }, [settings]);

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

      // Fetch today's schedule items
      let todaySchedule: any[] = [];
      try {
        const schedRes = await fetch('/api/jarvis/schedule');
        if (schedRes.ok) {
          const schedJson = await schedRes.json();
          todaySchedule = (schedJson.items || []).filter(
            (it: any) => it.date === todayStr || it.date === 'today'
          );
        }
      } catch (_) {}

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let briefingText = '';
      if (todaySchedule.length > 0) {
        const itemsList = todaySchedule
          .map((i: any) => `• ${i.time ? i.time + ' - ' : ''}${i.title}`)
          .join('\n');
        briefingText = `Good morning, ${settings.addressUserAs}. It is ${timeStr}. Here is your daily briefing for today:\n\n${itemsList}\n\nLet's lock in your non-negotiable execution. What is our first action?`;
      } else {
        briefingText = `Good morning, ${settings.addressUserAs}. It is ${timeStr}. Your schedule is clear for today. What are your Top 3 priorities to conquer?`;
      }

      const briefingMsg: TranscriptMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: briefingText,
        timestamp: timeStr,
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
  }, [refreshSchedule, settings.addressUserAs, speakText]);

  // Initial load: refresh schedule & accountability
  useEffect(() => {
    refreshSchedule();
    refreshAccountability();
  }, [refreshSchedule, refreshAccountability]);

  // Accountability Check-In Ticker (Morning, Midday, Evening)
  useEffect(() => {
    if (!settings.enableProactiveCheckIns) return;

    const interval = setInterval(() => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const currentHM = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

      const morningTime = settings.morningCheckInTime || '08:30';
      const middayTime = settings.middayCheckInTime || '13:00';
      const eveningTime = settings.eveningCheckInTime || '20:00';

      const checkInSlots = [
        {
          type: 'morning',
          time: morningTime,
          key: `${STORAGE_KEYS.LAST_CHECKIN_PREFIX}morning_${todayStr}`,
          prompt: `Good morning, ${settings.addressUserAs}. It is ${currentHM} — time for your morning check-in. What are your Top 3 non-negotiable commitments for today?`,
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
          prompt: `Good evening, ${settings.addressUserAs} (${currentHM}). It is time for your evening review. Let us audit what got completed, mark items done, and reschedule missed ones.`,
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
          };
          setMessages((prev) => [...prev, checkInMsg]);
          speakText(slot.prompt);
          if (settings.enableAudioSoundEffects) playHudSound('ping');
          break;
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [settings, speakText]);

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
    if (settings.enableAudioSoundEffects) playHudSound('command');

    try {
      // Clean conversation history without duplicating current prompt
      const conversationHistory = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          addressAs: settings.addressUserAs,
          apiKey: settings.apiKey,
          conversationHistory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || `Acknowledged, ${settings.addressUserAs}.`;

        const assistantMessage: TranscriptMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          role: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: data.sources || [],
        };

        setMessages((prev) => [...prev, assistantMessage]);
        speakText(replyText);

        // If tools updated schedule or accountability, refresh
        if (data.functionCalls && data.functionCalls.length > 0) {
          for (const call of data.functionCalls) {
            if (call.name === 'manage_schedule') refreshSchedule();
            if (call.name === 'manage_accountability') refreshAccountability();
          }
        }
      } else {
        const errorMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: `I encountered a momentary communication glitch, ${settings.addressUserAs}. Ready for your next directive.`,
          timestamp: timeStr,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const errorMsg: TranscriptMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: `Network interruption detected, ${settings.addressUserAs}. Continuing in local standby mode.`,
        timestamp: timeStr,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setJarvisState('idle');
    }
  };

  // Schedule Drawer Actions
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
          const warningText = `Attention ${settings.addressUserAs}: "${updated.title}" has now been postponed 3 or more times. Break it into an immediate 5-minute action or commit to an exact non-negotiable time right now.`;
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

  // Accountability Check-In Trigger
  const handleTriggerCheckIn = (type: 'morning' | 'midday' | 'evening') => {
    setIsAccountabilityOpen(false);
    if (type === 'morning') {
      handleSendMessage('JARVIS, start my morning check-in.');
    } else if (type === 'midday') {
      handleSendMessage('JARVIS, start my midday check-in.');
    } else {
      handleSendMessage('JARVIS, start my evening review.');
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

    handleSendMessage(
      `Evening review locked in, ${settings.addressUserAs}: ${reviewData.completedIds.length} completed, ${reviewData.rescheduledItems.length} rescheduled. Streak: ${newStreak} days. Rate: ${rate}%.`
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
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || 'Visual target analyzed.';
        const assistantMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: `[Optical Intelligence Scan]:\n${replyText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
  const handleSummarizeContent = async (content: string, isUrl: boolean) => {
    setJarvisState('thinking');
    try {
      const res = await fetch('/api/jarvis/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isUrl, addressAs: settings.addressUserAs }),
      });
      if (res.ok) {
        const data = await res.json();
        const summaryMsg: TranscriptMessage = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          text: data.summary || 'Summary completed.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, summaryMsg]);
        speakText(data.summary);
      }
    } catch (_) {
    } finally {
      setJarvisState('idle');
    }
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
    } else {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
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
        micCaptureRef.current.start().catch(() => {});
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
            };
            setMessages((prev) => [...prev, assistantMsg]);
          } else if (msg.type === 'audio' && msg.data && audioPlayerRef.current && !isMuted) {
            audioPlayerRef.current.playChunkBase64(msg.data);
          }
        } catch (_) {}
      };

      ws.onclose = () => {
        setIsLiveActive(false);
        micCaptureRef.current?.stop();
      };
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayItems = scheduleItems.filter((i) => i.date === todayStr || i.date === 'today');

  return (
    <div className="flex flex-col h-screen w-full bg-[#06140F] text-[#ECFDF5] overflow-x-hidden font-sans select-none">
      {/* Top Header */}
      <HUDHeader
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenVision={() => setIsVisionOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        connectionStatus={connectionStatus}
        streak={accountability.streak || 0}
        completionRate={accountability.weeklyStats?.rate || 0}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenAccountability={() => setIsAccountabilityOpen(true)}
      />

      {/* Main Single-Column Chat Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col min-h-0 overflow-hidden px-2 sm:px-4 py-2">
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <LiveTranscript
            messages={messages}
            livePartialText={livePartialText}
            isThinking={jarvisState === 'thinking'}
            onSpeakText={speakText}
            onClearHistory={() => setMessages([])}
          />
        </div>

        {/* Sticky Input Command Console */}
        <div className="w-full pt-2 shrink-0">
          <QuickActions
            onSendMessage={handleSendMessage}
            onOpenVision={() => setIsVisionOpen(true)}
            onQuickSummarize={() => setIsSummarizeOpen(true)}
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onOpenFileUpload={() => setIsScheduleOpen(true)}
            isLiveActive={isLiveActive}
            onToggleVoice={toggleLiveVoice}
            isThinking={jarvisState === 'thinking'}
          />
        </div>
      </main>

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
