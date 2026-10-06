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
    <div className="flex flex-col h-full bg-slate-950/80 border border-cyan-500/25 rounded-xl hud-corner-box overflow-hidden backdrop-blur-md shadow-[0_4px_24px_rgba(0,240,255,0.06)]">
      {/* Header */}
      <div className="p-3 border-b border-cyan-500/20 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-orbitron font-semibold text-xs tracking-wider text-cyan-300">
            TRANSMISSION LOG
          </span>
        </div>
        {messages.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-[10px] font-mono-tech text-cyan-500/60 hover:text-cyan-400 transition-colors"
          >
            PURGE LOG
          </button>
        )}
      </div>

      {/* Message stream */}
      <div
        ref={scrollRef}
        className="flex-1 p-3.5 overflow-y-auto space-y-3 font-rajdhani text-sm"
      >
        {messages.length === 0 && !livePartialText && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-cyan-500/40 font-mono-tech text-xs space-y-2">
            <Bot className="w-8 h-8 opacity-40 animate-pulse" />
            <p className="text-cyan-400 font-semibold">NEURAL COMMS READY</p>
            <p className="text-[11px] max-w-xs">
              "At your service, sir. Speak via microphone or type below. Ask for weather, tasks, timers, or web intelligence."
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
              className={`flex items-center gap-1.5 mb-1 text-[10px] font-mono-tech uppercase tracking-wider ${
                msg.role === 'user' ? 'text-cyan-400/70' : 'text-emerald-400/80'
              }`}
            >
              {msg.role === 'user' ? (
                <>
                  <span>YOU</span>
                  <User className="w-3 h-3" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3" />
                  <span>J.A.R.V.I.S.</span>
                </>
              )}
              <span className="text-slate-500">[{msg.timestamp}]</span>
            </div>

            <div
              className={`max-w-[92%] rounded-xl p-3 border leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-tr-none'
                  : 'bg-slate-900/70 border-emerald-500/25 text-emerald-100/95 rounded-tl-none glow-cyan-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Tool Execution Badge */}
              {msg.toolAction && (
                <div className="mt-2 pt-2 border-t border-cyan-500/20 flex items-center gap-1.5 text-xs font-mono-tech text-amber-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{msg.toolAction.description}</span>
                </div>
              )}

              {/* Grounding Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-cyan-500/20">
                  <div className="text-[10px] font-mono-tech text-cyan-400 mb-1 flex items-center gap-1">
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
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] text-cyan-300 hover:text-cyan-100 hover:border-cyan-300 transition-all"
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
                  className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono-tech text-cyan-400/80 hover:text-cyan-200 hover:underline transition-colors"
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
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono-tech text-emerald-400">
              <Bot className="w-3 h-3" />
              <span>J.A.R.V.I.S. (SYNTHESIZING...)</span>
            </div>
            <div className="max-w-[90%] rounded-xl rounded-tl-none p-3 bg-slate-900/80 border border-cyan-400/50 text-cyan-200">
              <p className="whitespace-pre-wrap">{livePartialText}</p>
            </div>
          </div>
        )}

        {/* Thinking Indicator */}
        {isThinking && !livePartialText && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono-tech">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>NEURAL REASONING CORES ENGAGED...</span>
          </div>
        )}
      </div>
    </div>
  );
};
