import React, { useEffect, useRef } from 'react';
import { TranscriptMessage, ChatMode, PendingConfirmationAction } from '../types/jarvis';
import {
  ExternalLink,
  Bot,
  User,
  Volume2,
  CheckCircle,
  Compass,
  UserCheck,
  Brain,
  FolderKanban,
  FileText,
  Globe,
  ShieldAlert,
  AlertTriangle,
  Check,
  X,
  Terminal,
} from 'lucide-react';

interface LiveTranscriptProps {
  messages: TranscriptMessage[];
  livePartialText: string;
  isThinking: boolean;
  chatMode?: ChatMode;
  managerName?: string;
  onPlayAudio?: (base64Audio: string) => void;
  onSpeakText?: (text: string) => void;
  onClearHistory?: () => void;
  onConfirmAction?: (action: PendingConfirmationAction, approved: boolean) => void;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  messages,
  livePartialText,
  isThinking,
  chatMode = 'jarvis',
  managerName = 'Coach',
  onPlayAudio,
  onSpeakText,
  onClearHistory,
  onConfirmAction,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, livePartialText, isThinking]);

  const defaultAssistantName = chatMode === 'manager' ? (managerName || 'Coach') : 'JARVIS';

  return (
    <div className="flex flex-col h-full bg-[#06140F] border border-[#134E39] rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-3 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-xs tracking-wider text-[#ECFDF5] uppercase">
            Transmission Log
          </span>
        </div>
        {messages.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-[11px] text-emerald-300 hover:text-white transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Message stream */}
      <div
        ref={scrollRef}
        className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 text-sm font-sans"
      >
        {messages.length === 0 && !livePartialText && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-emerald-300/60 space-y-2 select-none">
            {chatMode === 'manager' ? (
              <UserCheck className="w-9 h-9 text-[#10B981] animate-pulse" />
            ) : (
              <Bot className="w-9 h-9 text-[#10B981] animate-pulse" />
            )}
            <p className="text-[#ECFDF5] font-bold text-sm tracking-wide">
              {chatMode === 'manager' ? `${managerName || 'Coach'} is Ready` : 'JARVIS Online'}
            </p>
            <p className="text-xs max-w-sm text-emerald-200/80 leading-relaxed">
              {chatMode === 'manager'
                ? "Talk through a goal, problem, or friction point. I'll listen, help you break it down, and hold you accountable."
                : 'Ask for your daily briefing, manage your schedule, or search the live web for facts.'}
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const assistantLabel = msg.senderName || defaultAssistantName;

          return (
            <div
              key={msg.id}
              className={`flex flex-col group ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* High-Contrast Metadata Header */}
              <div
                className={`flex items-center gap-1.5 mb-1 text-[11px] font-mono tracking-wider select-none ${
                  isUser ? 'text-[#10B981] font-bold' : 'text-emerald-300 font-semibold'
                }`}
              >
                {isUser ? (
                  <>
                    <span>YOU</span>
                    <User className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    {chatMode === 'manager' ? (
                      <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-[#10B981]" />
                    )}
                    <span className="text-[#ECFDF5] font-bold">{assistantLabel}</span>
                  </>
                )}
                <span className="text-emerald-400/80 font-normal">[{msg.timestamp}]</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`relative max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 border leading-relaxed shadow-sm transition-all ${
                  isUser
                    ? 'bg-[#10B981] border-transparent text-white rounded-tr-sm font-normal'
                    : 'bg-[#0D281E] border-[#134E39] text-[#ECFDF5] rounded-tl-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Task Execution Plan & Step-by-Step Tool Progress (Agent Pipeline) */}
                {msg.taskSteps && msg.taskSteps.length > 0 && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#06140F] border border-[#134E39] space-y-1.5 text-xs font-mono shadow-inner">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#134E39]/60 text-[11px] font-bold text-[#10B981]">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>AGENT EXECUTION PIPELINE</span>
                      </div>
                      <span className="text-[10px] text-emerald-400/80">
                        {msg.taskSteps.filter((s) => s.status === 'success').length}/{msg.taskSteps.length} COMPLETE
                      </span>
                    </div>
                    <div className="space-y-1 pt-1">
                      {msg.taskSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 py-0.5 text-[11px]">
                          {step.status === 'success' ? (
                            <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          ) : step.status === 'error' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 animate-spin shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-emerald-200">{step.step}</span>
                              {step.tool && (
                                <span className="px-1.5 py-0.2 rounded bg-[#091F16] border border-[#134E39] text-[10px] text-emerald-400">
                                  {step.tool}
                                </span>
                              )}
                            </div>
                            {step.detail && (
                              <p className="text-[10px] text-emerald-400/80 truncate">{step.detail}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tool Execution Badge */}
                {msg.toolAction && (
                  <div className="mt-2 pt-2 border-t border-[#134E39] flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{msg.toolAction.description}</span>
                  </div>
                )}

                {/* Source Attributions (Phase 1 Source Awareness Architecture) */}
                {msg.attributions && msg.attributions.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#134E39]/80 flex flex-wrap gap-1.5 items-center">
                    {msg.attributions.map((attr, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#06140F] border border-[#134E39] text-[10px] font-mono text-emerald-300 font-semibold"
                        title={attr.detail || attr.label}
                      >
                        {attr.type === 'PERSONAL_MEMORY' && <Brain className="w-3 h-3 text-[#10B981]" />}
                        {attr.type === 'PROJECT_MEMORY' && <FolderKanban className="w-3 h-3 text-cyan-400" />}
                        {attr.type === 'GOOGLE_DRIVE' && <FileText className="w-3 h-3 text-blue-400" />}
                        {attr.type === 'WEB_RESEARCH' && <Globe className="w-3 h-3 text-amber-400" />}
                        {attr.type === 'SYSTEM_INFO' && <ShieldAlert className="w-3 h-3 text-purple-400" />}
                        <span>{attr.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Interactive Confirmation Action Card (Phase 1 Permission System) */}
                {msg.pendingConfirmation && (
                  <div className="mt-3 p-3 rounded-xl bg-[#06140F] border border-amber-500/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold font-mono">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>PERMISSION CONFIRMATION REQUIRED</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                        {msg.pendingConfirmation.permission}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-100">
                      {msg.pendingConfirmation.description}
                    </p>
                    {msg.pendingConfirmation.status === 'pending' ? (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => onConfirmAction && onConfirmAction(msg.pendingConfirmation!, true)}
                          className="px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Authorize & Execute</span>
                        </button>
                        <button
                          onClick={() => onConfirmAction && onConfirmAction(msg.pendingConfirmation!, false)}
                          className="px-3 py-1 rounded-lg bg-rose-900/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Deny / Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] font-mono font-semibold pt-1">
                        Status:{' '}
                        <span
                          className={
                            msg.pendingConfirmation.status === 'approved'
                              ? 'text-[#10B981]'
                              : 'text-rose-400'
                          }
                        >
                          {msg.pendingConfirmation.status.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Grounding Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#134E39]">
                    <div className="text-[11px] font-mono text-[#10B981] mb-1.5 flex items-center gap-1 font-bold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>SOURCES:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#06140F] border border-[#134E39] text-[11px] text-[#10B981] hover:text-white hover:border-[#10B981] transition-all"
                        >
                          <span className="truncate max-w-[160px]">{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Speak Icon: Only visible on hover or tap */}
                {!isUser && (msg.audioUrl || onSpeakText) && (
                  <button
                    onClick={() => {
                      if (msg.audioUrl && onPlayAudio) {
                        onPlayAudio(msg.audioUrl);
                      } else if (onSpeakText) {
                        onSpeakText(msg.text);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100 transition-opacity mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-[#10B981] hover:text-white p-1 rounded hover:bg-[#134E39]/40"
                    title="Speak message aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Live speech partial text in progress */}
        {livePartialText && (
          <div className="flex flex-col items-start animate-fade-in">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-[#10B981] font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>{defaultAssistantName} (Synthesizing...)</span>
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm p-3.5 bg-[#0D281E] border border-[#10B981]/50 text-[#ECFDF5]">
              <p className="whitespace-pre-wrap">{livePartialText}</p>
            </div>
          </div>
        )}

        {/* Subtle typing indicator with three bouncing green dots */}
        {isThinking && !livePartialText && (
          <div className="flex flex-col items-start animate-fade-in">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-emerald-300 font-semibold select-none">
              {chatMode === 'manager' ? (
                <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-[#10B981]" />
              )}
              <span>{defaultAssistantName}</span>
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#0D281E] border border-[#134E39] flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
