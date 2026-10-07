import React, { useEffect, useRef } from 'react';
import { TranscriptMessage } from '../types/jarvis';
import {
  ExternalLink,
  Bot,
  User,
  Sparkles,
  Volume2,
  CheckCircle,
  Clock,
  Compass,
} from 'lucide-react';

interface LiveTranscriptProps {
  messages: TranscriptMessage[];
  livePartialText: string;
  isThinking: boolean;
  onPlayAudio?: (base64Audio: string) => void;
  onSpeakText?: (text: string) => void;
  onClearHistory?: () => void;
}

export const LiveTranscript: React.FC<LiveTranscriptProps> = ({
  messages,
  livePartialText,
  isThinking,
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

  return (
    <div className="flex flex-col h-full bg-[#06140F] border border-[#134E39] rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-3 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-xs tracking-wider text-[#ECFDF5]">
            TRANSMISSION LOG
          </span>
        </div>
        {messages.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-[11px] text-emerald-300/60 hover:text-emerald-200 transition-colors"
          >
            Clear Log
          </button>
        )}
      </div>

      {/* Message stream */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 text-sm font-sans"
      >
        {messages.length === 0 && !livePartialText && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-emerald-400/40 space-y-2">
            <Bot className="w-8 h-8 text-[#10B981]/50 animate-pulse" />
            <p className="text-[#ECFDF5] font-semibold text-xs tracking-wide">JARVIS SECURE CHANNEL READY</p>
            <p className="text-[11px] max-w-xs text-emerald-300/60 leading-relaxed">
              "At your service, boss. Ask for your schedule, accountability check-in, or search the live web."
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 mb-1 text-[10px] uppercase font-mono tracking-wider ${
                msg.role === 'user' ? 'text-[#10B981]' : 'text-emerald-300/80'
              }`}
            >
              {msg.role === 'user' ? (
                <>
                  <span>YOU</span>
                  <User className="w-3 h-3" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-[#10B981]" />
                  <span>JARVIS</span>
                </>
              )}
              <span className="text-emerald-500/50">[{msg.timestamp}]</span>
            </div>

            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 border leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-[#10B981] border-transparent text-white rounded-tr-sm font-medium'
                  : 'bg-[#0D281E] border-[#134E39] text-[#ECFDF5] rounded-tl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Tool Execution Badge */}
              {msg.toolAction && (
                <div className="mt-2 pt-2 border-t border-[#134E39] flex items-center gap-1.5 text-xs text-amber-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{msg.toolAction.description}</span>
                </div>
              )}

              {/* Grounding Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#134E39]">
                  <div className="text-[10px] font-mono text-[#10B981] mb-1 flex items-center gap-1 font-semibold">
                    <Compass className="w-3 h-3" />
                    <span>GROUNDING SOURCES:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#06140F] border border-[#134E39] text-[10px] text-[#10B981] hover:text-white hover:border-[#10B981] transition-all"
                      >
                        <span className="truncate max-w-[160px]">{src.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio playback button */}
              {msg.role === 'assistant' && (msg.audioUrl || onSpeakText) && (
                <button
                  onClick={() => {
                    if (msg.audioUrl && onPlayAudio) {
                      onPlayAudio(msg.audioUrl);
                    } else if (onSpeakText) {
                      onSpeakText(msg.text);
                    }
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-[#10B981] hover:text-emerald-200 transition-colors"
                  title="Speak or replay this message"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{msg.audioUrl ? 'REPLAY AUDIO' : 'SPEAK'}</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Live speech partial text in progress */}
        {livePartialText && (
          <div className="flex flex-col items-start animate-fade-in">
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#10B981]">
              <Bot className="w-3 h-3" />
              <span>JARVIS (SYNTHESIZING...)</span>
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm p-3.5 bg-[#0D281E] border border-[#10B981]/50 text-[#ECFDF5]">
              <p className="whitespace-pre-wrap">{livePartialText}</p>
            </div>
          </div>
        )}

        {/* Thinking Indicator */}
        {isThinking && !livePartialText && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#091F16] border border-[#134E39] text-[#10B981] text-xs font-mono">
            <Sparkles className="w-4 h-4 text-[#10B981] animate-spin" />
            <span>JARVIS PROCESSING DIRECTIVE...</span>
          </div>
        )}
      </div>
    </div>
  );
};
