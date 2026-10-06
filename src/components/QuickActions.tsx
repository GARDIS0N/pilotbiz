import React, { useState } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  FileText,
  Clock,
  Search,
  Activity,
  Compass,
  Camera,
} from 'lucide-react';

interface QuickActionsProps {
  onSendMessage: (text: string) => void;
  onOpenVision: () => void;
  onQuickSummarize: () => void;
  isLiveActive: boolean;
  onToggleVoice: () => void;
  isThinking: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSendMessage,
  onOpenVision,
  onQuickSummarize,
  isLiveActive,
  onToggleVoice,
  isThinking,
}) => {
  const [inputText, setInputText] = useState('');

  const quickChips = [
    { label: 'JARVIS, brief me', query: 'JARVIS, brief me' },
    { label: 'what next?', query: 'what next?' },
    { label: 'plan my day', query: 'plan my day' },
    { label: 'review my day', query: 'review my day' },
    { label: 'review my week', query: 'review my week' },
    { label: "I'm procrastinating", query: "I'm procrastinating" },
    { label: 'prioritize', query: 'prioritize' },
    { label: 'update my goals', query: 'update my goals' },
    { label: 'audit me', query: 'audit me' },
    { label: 'what am I neglecting?', query: 'what am I neglecting?' },
    { label: 'reset', query: 'reset' },
    { label: 'Summarize text / URL', action: 'summarize' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (chip: any) => {
    if (chip.action === 'summarize') {
      onQuickSummarize();
    } else if (chip.query) {
      onSendMessage(chip.query);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 z-20 select-none">
      {/* Quick Action Chips Horizontal Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 scrollbar-none">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 hover:bg-cyan-950/60 border border-cyan-500/25 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 text-xs font-mono-tech transition-all glow-cyan-sm active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Primary Input Command Console */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1 flex items-center bg-slate-950/90 border border-cyan-500/35 rounded-xl px-3 py-2 focus-within:border-cyan-400 focus-within:glow-cyan-md transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
            placeholder="Type directive for JARVIS (or press mic for real-time voice)..."
            className="flex-1 bg-transparent text-sm text-cyan-100 placeholder-cyan-600/50 font-rajdhani focus:outline-none disabled:opacity-50"
          />

          {/* Quick Vision / Camera Trigger inside input */}
          <button
            type="button"
            onClick={onOpenVision}
            title="Scan Image / Webcam Target"
            className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-200 hover:bg-cyan-900/40 transition-colors mr-1"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-300 hover:text-cyan-100 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Live Mic Toggle Button */}
        <button
          type="button"
          onClick={onToggleVoice}
          title={isLiveActive ? 'Disconnect Live Audio Link' : 'Engage Gemini Live Voice Uplink'}
          className={`shrink-0 p-3 rounded-xl border transition-all active:scale-95 flex items-center justify-center ${
            isLiveActive
              ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse'
              : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400 text-cyan-300 glow-cyan-sm'
          }`}
        >
          {isLiveActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
