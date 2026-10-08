import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Camera,
  Paperclip,
  Loader2,
  AlertCircle,
  X,
  Terminal,
  Square,
  Volume2,
  Radio,
} from 'lucide-react';
import { ChatMode, MicState } from '../types/jarvis';
import {
  JarvisVoiceController,
  detectBrowserCapabilities,
  VoiceMode,
} from '../utils/speechRecognition';

interface QuickActionsProps {
  onSendMessage: (text: string) => void;
  onOpenVision: () => void;
  onQuickSummarize: () => void;
  onOpenSchedule?: () => void;
  onOpenFileUpload?: () => void;
  onOpenProjects?: () => void;
  onOpenMemory?: () => void;
  isLiveActive?: boolean;
  onToggleVoice?: () => void;
  isThinking: boolean;
  isSpeaking?: boolean;
  chatMode?: ChatMode;
  onSelectChatMode?: (mode: ChatMode) => void;
  managerName?: string;
  voiceLanguage?: string;
  autoSendVoice?: boolean;
  onStopAudioPlayback?: () => void;
  isConversationMode?: boolean;
  onToggleConversationMode?: (enabled: boolean) => void;
}

interface B30Command {
  cmd: string;
  label: string;
  desc: string;
  category: 'Daily' | 'Execution' | 'Intelligence' | 'Strategy';
}

const B30_COMMANDS: B30Command[] = [
  // Daily & Review
  { cmd: '/today', label: '/today', desc: "Today's plan, Top 3 & score", category: 'Daily' },
  { cmd: '/plan', label: '/plan', desc: 'Plan tomorrow or upcoming week', category: 'Daily' },
  { cmd: '/review', label: '/review', desc: 'Evening accountability review', category: 'Daily' },
  { cmd: '/score', label: '/score', desc: 'Daily productivity score (B11 formula)', category: 'Daily' },
  { cmd: '/week', label: '/week', desc: 'Weekly review & next-week setup', category: 'Daily' },
  { cmd: '/month', label: '/month', desc: 'Monthly schedule master overview (B5)', category: 'Daily' },
  { cmd: '/reset', label: '/reset', desc: 'Emergency reset protocol', category: 'Daily' },
  // Execution & Focus
  { cmd: '/focus', label: '/focus', desc: 'Lock into 50-minute deep execution', category: 'Execution' },
  { cmd: '/tasks', label: '/tasks', desc: 'View active task pipeline', category: 'Execution' },
  { cmd: '/priorities', label: '/priorities', desc: 'Force-rank Top 3 priorities', category: 'Execution' },
  { cmd: '/projects', label: '/projects', desc: 'Active projects & stages', category: 'Execution' },
  { cmd: '/habits', label: '/habits', desc: 'Habit tracker & consistency', category: 'Execution' },
  // Intelligence & Opportunities (Part C)
  { cmd: '/brief', label: '/brief', desc: 'Daily intelligence briefing', category: 'Intelligence' },
  { cmd: '/scan', label: '/scan', desc: 'Web search opportunity engine', category: 'Intelligence' },
  { cmd: '/radar', label: '/radar', desc: 'View active opportunity radar', category: 'Intelligence' },
  { cmd: '/tracker', label: '/tracker', desc: 'Application pipeline tracker', category: 'Intelligence' },
  { cmd: '/apply', label: '/apply', desc: 'Application readiness audit', category: 'Intelligence' },
  // Strategy & Learning
  { cmd: '/goals', label: '/goals', desc: 'View & assess active goals', category: 'Strategy' },
  { cmd: '/strategy', label: '/strategy', desc: 'Strategic alignment check', category: 'Strategy' },
  { cmd: '/study', label: '/study', desc: 'Study session setup & active recall', category: 'Strategy' },
  { cmd: '/learn', label: '/learn', desc: 'Log learning & key takeaways', category: 'Strategy' },
  { cmd: '/memory', label: '/memory', desc: 'Long-term personal memory bank', category: 'Strategy' },
];

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSendMessage,
  onOpenVision,
  onOpenFileUpload,
  onOpenProjects,
  onOpenMemory,
  isThinking,
  isSpeaking = false,
  voiceLanguage = 'en-US',
  autoSendVoice = true,
  onStopAudioPlayback,
  isConversationMode = false,
  onToggleConversationMode,
}) => {
  const [inputText, setInputText] = useState('');
  const [micState, setMicState] = useState<MicState>('idle');
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [commandCategory, setCommandCategory] = useState<'All' | 'Daily' | 'Execution' | 'Intelligence' | 'Strategy'>('All');
  const [isPushToTalkActive, setIsPushToTalkActive] = useState<boolean>(false);

  const voiceControllerRef = useRef<JarvisVoiceController | null>(null);
  const autoSendRef = useRef<boolean>(autoSendVoice);
  const isThinkingRef = useRef<boolean>(isThinking);
  const isSpeakingRef = useRef<boolean>(isSpeaking);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const holdTimerRef = useRef<any>(null);
  const isHoldingRef = useRef<boolean>(false);

  autoSendRef.current = autoSendVoice;
  isThinkingRef.current = isThinking;
  isSpeakingRef.current = isSpeaking;

  // Initialize Speech Recognition Controller
  useEffect(() => {
    const controller = new JarvisVoiceController({
      lang: voiceLanguage,
      autoSend: autoSendVoice,
      mode: isConversationMode ? 'conversation' : 'single_command',
      onStateChange: (state, message) => {
        setMicState(state);
        if (state === 'error' && message) {
          setMicErrorMessage(message);
        } else if (state === 'listening') {
          setMicErrorMessage(null);
        }
      },
      onInterimTranscript: (text) => {
        setInputText(text);
      },
      onFinalTranscript: (text) => {
        const clean = text.trim();
        if (!clean) return;

        setInputText(clean);

        if (autoSendRef.current && !isThinkingRef.current) {
          setTimeout(() => {
            onSendMessage(clean);
            setInputText('');
          }, 350);
        }
      },
      onError: (errMsg) => {
        setMicErrorMessage(errMsg);
        setMicState('error');
      },
      onStopAudioPlayback: () => {
        if (onStopAudioPlayback) {
          onStopAudioPlayback();
        }
      },
      onInterruption: () => {
        setInputText('');
        if (onStopAudioPlayback) {
          onStopAudioPlayback();
        }
      },
    });

    voiceControllerRef.current = controller;

    return () => {
      controller.destroy();
      voiceControllerRef.current = null;
    };
  }, [voiceLanguage, onSendMessage, onStopAudioPlayback]);

  // Sync conversation mode setting
  useEffect(() => {
    if (voiceControllerRef.current) {
      voiceControllerRef.current.setConversationMode(isConversationMode);
      if (isConversationMode && !voiceControllerRef.current.getIsListening() && !isSpeaking && !isThinking) {
        voiceControllerRef.current.start('conversation');
      }
    }
  }, [isConversationMode]);

  // Pause / Resume listener in Conversation Mode when assistant speaks or thinks
  useEffect(() => {
    if (!voiceControllerRef.current) return;
    if (isSpeaking || isThinking) {
      voiceControllerRef.current.pauseForAssistantSpeaking();
    } else if (isConversationMode) {
      voiceControllerRef.current.resumeAfterAssistantSpeaking();
    }
  }, [isSpeaking, isThinking, isConversationMode]);

  // Update language/options if settings change
  useEffect(() => {
    if (voiceControllerRef.current) {
      voiceControllerRef.current.updateOptions({
        lang: voiceLanguage,
        autoSend: autoSendVoice,
        mode: isConversationMode ? 'conversation' : 'single_command',
      });
    }
  }, [voiceLanguage, autoSendVoice, isConversationMode]);

  // Close command menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsCommandMenuOpen(false);
      }
    };
    if (isCommandMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isCommandMenuOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    if (voiceControllerRef.current?.getIsListening()) {
      voiceControllerRef.current.stop();
    }

    onSendMessage(inputText.trim());
    setInputText('');
    setIsCommandMenuOpen(false);
  };

  const handleExecuteCommand = (cmd: string) => {
    setIsCommandMenuOpen(false);
    if (cmd === '/projects' && onOpenProjects) {
      onOpenProjects();
    } else if (cmd === '/memory' && onOpenMemory) {
      onOpenMemory();
    }
    onSendMessage(cmd);
    setInputText('');
  };

  const handleToggleVoiceInput = async () => {
    if (micState === 'processing') return;

    if (micState === 'listening' || voiceControllerRef.current?.getIsListening()) {
      voiceControllerRef.current?.stop();
      setMicState('idle');
      return;
    }

    if (onStopAudioPlayback) {
      onStopAudioPlayback();
    }

    setMicErrorMessage(null);

    const caps = detectBrowserCapabilities();
    if (!caps.isSecureContext) {
      setMicErrorMessage('Microphone requires a secure connection (HTTPS or localhost).');
      setMicState('error');
      return;
    }

    try {
      const mode: VoiceMode = isConversationMode ? 'conversation' : 'single_command';
      await voiceControllerRef.current?.start(mode);
    } catch (err: any) {
      setMicErrorMessage(err?.message || 'Could not start voice recognition.');
      setMicState('error');
    }
  };

  // Push-to-Talk handlers (Press and Hold to talk continuously)
  const handleMicMouseDown = async (e: React.MouseEvent | React.TouchEvent) => {
    // If conversation mode is already managing voice, regular toggle handles it
    if (isConversationMode) return;

    isHoldingRef.current = false;
    holdTimerRef.current = setTimeout(async () => {
      isHoldingRef.current = true;
      setIsPushToTalkActive(true);
      if (onStopAudioPlayback) onStopAudioPlayback();
      await voiceControllerRef.current?.startPushToTalk();
    }, 220);
  };

  const handleMicMouseUp = () => {
    if (isConversationMode) return;

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (isHoldingRef.current) {
      isHoldingRef.current = false;
      setIsPushToTalkActive(false);
      voiceControllerRef.current?.stopPushToTalk();
    }
  };

  const handleStopAll = () => {
    if (onStopAudioPlayback) {
      onStopAudioPlayback();
    }
    if (voiceControllerRef.current) {
      voiceControllerRef.current.stop();
    }
    setMicState('idle');
  };

  const filteredCommands =
    commandCategory === 'All'
      ? B30_COMMANDS
      : B30_COMMANDS.filter((c) => c.category === commandCategory);

  // Compute Voice Status Pill state
  const isListeningNow = micState === 'listening' || isPushToTalkActive;
  const isProcessingNow = isThinking || micState === 'processing';
  const isSpeakingNow = isSpeaking;

  return (
    <div
      className="w-full flex flex-col gap-2 z-20 select-none relative max-w-full"
      data-testid="quick-actions-container"
    >
      {/* Friendly Error Banner if Microphone has an error */}
      {micState === 'error' && micErrorMessage && (
        <div
          data-testid="mic-error-banner"
          className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs animate-fade-in shadow-md"
        >
          <div className="flex items-center gap-2 min-w-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="truncate">{micErrorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setMicErrorMessage(null);
              setMicState('idle');
            }}
            className="p-1 rounded-md text-rose-300 hover:text-white hover:bg-rose-900/50 transition-colors shrink-0"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Voice Controls Bar: Conversation Mode Toggle, 4-State Pill & [STOP] Button */}
      <div className="flex items-center justify-between gap-2 px-1">
        {/* Mode 2: Conversation Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (onToggleConversationMode) {
                onToggleConversationMode(!isConversationMode);
              }
            }}
            data-testid="conversation-mode-toggle"
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              isConversationMode
                ? 'bg-[#10B981]/25 border-[#10B981] text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                : 'bg-[#091F16] border-[#134E39] text-emerald-400/80 hover:text-white hover:border-[#10B981]'
            }`}
            title="Toggle Continuous Conversation Mode (Automatic Listen -> Speak -> Re-listen loop)"
          >
            <Radio className={`w-3.5 h-3.5 ${isConversationMode ? 'animate-pulse text-[#10B981]' : ''}`} />
            <span>🎙 Conversation Mode</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                isConversationMode ? 'bg-[#10B981] text-white' : 'bg-[#06140F] text-emerald-500'
              }`}
            >
              {isConversationMode ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Real-Time Voice State Pill (🔴 LISTENING, 🟡 PROCESSING, 🔵 JARVIS SPEAKING, ⚪ IDLE) */}
        <div className="flex items-center gap-2">
          <div
            data-testid="voice-state-pill"
            className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
              isListeningNow
                ? 'bg-rose-950/40 border-rose-500/80 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.3)] animate-pulse'
                : isProcessingNow
                ? 'bg-amber-950/40 border-amber-500/80 text-amber-300'
                : isSpeakingNow
                ? 'bg-blue-950/40 border-blue-500/80 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                : 'bg-[#06140F] border-[#134E39]/60 text-emerald-500/70'
            }`}
          >
            {isListeningNow ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>🔴 LISTENING</span>
              </>
            ) : isProcessingNow ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                <span>🟡 PROCESSING</span>
              </>
            ) : isSpeakingNow ? (
              <>
                <Volume2 className="w-3 h-3 text-blue-400 animate-pulse" />
                <span>🔵 JARVIS SPEAKING</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-700" />
                <span>⚪ IDLE</span>
              </>
            )}
          </div>

          {/* Prominent Visible [ STOP ] Button: active during speech, processing, or listening */}
          {(isListeningNow || isProcessingNow || isSpeakingNow) && (
            <button
              type="button"
              onClick={handleStopAll}
              data-testid="voice-stop-button"
              className="px-2.5 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-mono font-bold flex items-center gap-1 shadow-md transition-all animate-fade-in"
              title="Interrupt speech and halt recording (or say 'JARVIS, stop')"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>STOP</span>
            </button>
          )}
        </div>
      </div>

      {/* Push-to-Talk hint banner when holding */}
      {isPushToTalkActive && (
        <div className="flex items-center justify-center px-3 py-1 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-mono font-bold animate-pulse">
          <span>HOLDING TO TALK — Release button when finished</span>
        </div>
      )}

      {/* Tucked B30 Command Menu (Floating Drawer / Palette) */}
      {isCommandMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-full mb-2 left-0 right-0 bg-[#091F16] border border-[#134E39] rounded-2xl p-3 shadow-2xl z-50 animate-fade-in max-h-80 flex flex-col"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#134E39] mb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#ECFDF5] tracking-wider uppercase">
                B30 Commands
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCommandMenuOpen(false)}
              className="p-1 rounded-lg text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none shrink-0">
            {(['All', 'Daily', 'Execution', 'Intelligence', 'Strategy'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCommandCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 ${
                  commandCategory === cat
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#06140F] border border-[#134E39] text-emerald-300/80 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Command List */}
          <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredCommands.map((item) => (
              <button
                key={item.cmd}
                type="button"
                onClick={() => handleExecuteCommand(item.cmd)}
                className="w-full text-left px-3 py-2 rounded-xl bg-[#06140F]/80 hover:bg-[#134E39]/70 border border-[#134E39]/40 hover:border-[#10B981]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-mono font-bold text-[#10B981] group-hover:text-emerald-300">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-emerald-200/70 truncate">
                    {item.desc}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091F16] border border-[#134E39] text-emerald-400/80 shrink-0 uppercase">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Primary Input Command Console */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2 max-w-full">
        <div
          className={`relative flex-1 flex items-center bg-[#091F16] border rounded-2xl px-2.5 sm:px-3 py-2 transition-all min-w-0 ${
            isListeningNow
              ? 'border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'border-[#134E39] focus-within:border-[#10B981]'
          }`}
        >
          {/* Tucked B30 Command Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsCommandMenuOpen(!isCommandMenuOpen)}
            title="B30 Commands Menu (/)"
            className={`p-1.5 rounded-lg transition-colors mr-1 shrink-0 flex items-center gap-1 ${
              isCommandMenuOpen
                ? 'bg-[#10B981] text-white'
                : 'text-emerald-400 hover:text-white hover:bg-[#134E39]'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* File upload shortcut button */}
          {onOpenFileUpload && (
            <button
              type="button"
              onClick={onOpenFileUpload}
              title="Upload Monthly Schedule (.json, .csv, .ics, .txt)"
              className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors mr-1 shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          )}

          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              const val = e.target.value;
              setInputText(val);
              if (val === '/') {
                setIsCommandMenuOpen(true);
              }
            }}
            disabled={isThinking}
            placeholder={
              isListeningNow
                ? 'Listening to your voice...'
                : 'Type directive, schedule item, or / for commands...'
            }
            className="flex-1 bg-transparent text-sm text-[#ECFDF5] placeholder-emerald-600 focus:outline-none disabled:opacity-50 min-w-0"
          />

          {/* Quick Vision / Camera Trigger inside input */}
          <button
            type="button"
            onClick={onOpenVision}
            title="Scan Image / Webcam Target"
            className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors mr-1 shrink-0"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="p-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white transition-all disabled:opacity-30 disabled:pointer-events-none min-w-[36px] min-h-[36px] flex items-center justify-center shadow shrink-0"
            title="Send directive"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Dual-Mode Live Mic Button (Click for single / Hold for Push-to-Talk) */}
        <button
          type="button"
          onClick={handleToggleVoiceInput}
          onMouseDown={handleMicMouseDown}
          onMouseUp={handleMicMouseUp}
          onTouchStart={handleMicMouseDown}
          onTouchEnd={handleMicMouseUp}
          data-testid="mic-button"
          data-mic-state={micState}
          title={
            isPushToTalkActive
              ? 'Holding to talk... Release to execute'
              : isListeningNow
              ? 'Listening... Click to stop'
              : isProcessingNow
              ? 'Transcribing audio...'
              : micState === 'error'
              ? `Microphone error: ${micErrorMessage || 'Click to retry'}`
              : 'Press to talk (or press and hold for Push-to-Talk)'
          }
          className={`shrink-0 p-2.5 sm:p-3 rounded-2xl border transition-all active:scale-95 flex items-center justify-center min-w-[42px] min-h-[42px] sm:min-w-[44px] sm:min-h-[44px] ${
            isPushToTalkActive
              ? 'bg-rose-900/60 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
              : isListeningNow
              ? 'bg-[#10B981]/25 border-[#10B981] text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse'
              : isProcessingNow
              ? 'bg-amber-950/50 border-amber-500/80 text-amber-400'
              : micState === 'error'
              ? 'bg-rose-950/60 border-rose-500/80 text-rose-400 hover:border-rose-400'
              : 'bg-[#091F16] border-[#134E39] hover:border-[#10B981] text-[#10B981]'
          }`}
        >
          {isPushToTalkActive ? (
            <Mic className="w-5 h-5 text-rose-400" />
          ) : isListeningNow ? (
            <Mic className="w-5 h-5 text-[#10B981]" />
          ) : isProcessingNow ? (
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
          ) : micState === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};
