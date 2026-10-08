import React, { useState } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Camera,
  Calendar,
  Paperclip,
  Search,
} from 'lucide-react';

import { ChatMode } from '../types/jarvis';

interface QuickActionsProps {
  onSendMessage: (text: string) => void;
  onOpenVision: () => void;
  onQuickSummarize: () => void;
  onOpenSchedule?: () => void;
  onOpenFileUpload?: () => void;
  isLiveActive: boolean;
  onToggleVoice: () => void;
  isThinking: boolean;
  chatMode?: ChatMode;
  onSelectChatMode?: (mode: ChatMode) => void;
  managerName?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSendMessage,
  onOpenVision,
  onQuickSummarize,
  onOpenSchedule,
  onOpenFileUpload,
  isLiveActive,
  onToggleVoice,
  isThinking,
  chatMode = 'jarvis',
  onSelectChatMode,
  managerName = 'Coach',
}) => {
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { id: 'briefing', label: 'Briefing', query: 'JARVIS, give me my daily briefing' },
    { id: 'schedule', label: 'Schedule', action: 'schedule' },
    { id: 'checkin', label: 'Check-In', query: "Let's do my check-in" },
    { id: 'search', label: 'Search', query: 'Search the web for latest updates' },
    { id: 'manager', label: 'Manager', action: 'manager' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleActionClick = (action: typeof quickActions[number]) => {
    if (action.action === 'schedule') {
      if (onOpenSchedule) {
        onOpenSchedule();
      } else {
        onSendMessage('What is on my schedule today?');
      }
    } else if (action.action === 'manager') {
      if (onSelectChatMode) {
        onSelectChatMode('manager');
      } else {
        onSendMessage(`Talk to ${managerName}`);
      }
    } else if (action.query) {
      onSendMessage(action.query);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 z-20 select-none">
      {/* Quick Action Chips Horizontal Single Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 scrollbar-none whitespace-nowrap">
        {quickActions.map((action) => {
          const isActive = action.id === 'manager' && chatMode === 'manager';
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm'
                  : 'bg-[#091F16] hover:bg-[#134E39] border-[#134E39] text-[#10B981] hover:text-white'
              }`}
            >
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Primary Input Command Console */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1 flex items-center bg-[#091F16] border border-[#134E39] rounded-2xl px-3 py-2.5 focus-within:border-[#10B981] transition-all">
          {/* File upload shortcut button */}
          {onOpenFileUpload && (
            <button
              type="button"
              onClick={onOpenFileUpload}
              title="Upload Monthly Schedule (.json, .csv, .ics, .txt)"
              className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors mr-1"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          )}

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
            placeholder="Type directive, schedule item, or web query..."
            className="flex-1 bg-transparent text-sm text-[#ECFDF5] placeholder-emerald-600 focus:outline-none disabled:opacity-50 min-w-0"
          />

          {/* Quick Vision / Camera Trigger inside input */}
          <button
            type="button"
            onClick={onOpenVision}
            title="Scan Image / Webcam Target"
            className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors mr-1"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className="p-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white transition-all disabled:opacity-30 disabled:pointer-events-none min-w-[36px] min-h-[36px] flex items-center justify-center shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Live Mic Toggle Button */}
        <button
          type="button"
          onClick={onToggleVoice}
          title={isLiveActive ? 'Disconnect Live Audio Link' : 'Engage Real-Time Voice Uplink'}
          className={`shrink-0 p-3 rounded-2xl border transition-all active:scale-95 flex items-center justify-center min-w-[44px] min-h-[44px] ${
            isLiveActive
              ? 'bg-rose-950/80 border-rose-500/80 text-rose-400 animate-pulse'
              : 'bg-[#091F16] border-[#134E39] hover:border-[#10B981] text-[#10B981]'
          }`}
        >
          {isLiveActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
