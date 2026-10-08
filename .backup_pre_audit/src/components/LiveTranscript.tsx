import React, { useEffect, useRef } from 'react';
import { TranscriptMessage, ChatMode } from '../types/jarvis';
import {
  ExternalLink,
  Bot,
  User,
  Volume2,
  CheckCircle,
  Compass,
  UserCheck,
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
            Chat
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

                {/* Tool Execution Badge */}
                {msg.toolAction && (
                  <div className="mt-2 pt-2 border-t border-[#134E39] flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{msg.toolAction.description}</span>
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
