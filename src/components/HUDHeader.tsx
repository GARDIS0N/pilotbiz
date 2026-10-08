import React, { useState } from 'react';
import {
  Flame,
  Sliders,
  MoreVertical,
  Volume2,
  VolumeX,
  Camera,
  Calendar,
  Target,
  UserCheck,
  Bot,
  FolderKanban,
  Brain,
  Cloud,
} from 'lucide-react';
import { ChatMode, LiveConnectionStatus } from '../types/jarvis';

export type { LiveConnectionStatus };
export type DriveSyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'disconnected';

interface HUDHeaderProps {
  onOpenSettings: () => void;
  onOpenVision: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  streak: number;
  completionRate?: number;
  chatMode: ChatMode;
  onToggleChatMode: () => void;
  managerName?: string;
  onOpenSchedule?: () => void;
  onOpenAccountability?: () => void;
  onOpenProjects?: () => void;
  onOpenMemory?: () => void;
  connectionStatus?: LiveConnectionStatus;
  driveSyncStatus?: DriveSyncStatus;
  userEmail?: string;
  onToggleTodayCard?: () => void;
  showTodayCard?: boolean;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({
  onOpenSettings,
  onOpenVision,
  isMuted,
  onToggleMute,
  streak = 0,
  completionRate,
  chatMode,
  onToggleChatMode,
  managerName = 'Coach',
  onOpenSchedule,
  onOpenAccountability,
  onOpenProjects,
  onOpenMemory,
  connectionStatus = 'connected',
  driveSyncStatus = 'disconnected',
  userEmail,
  onToggleTodayCard,
  showTodayCard = false,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header className="w-full bg-[#06140F]/95 backdrop-blur-md border-b border-[#134E39] px-3 sm:px-4 py-2.5 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left: Mode Toggle & Active Name */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#091F16] p-1 rounded-xl border border-[#134E39]">
          <button
            onClick={() => chatMode !== 'jarvis' && onToggleChatMode()}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              chatMode === 'jarvis'
                ? 'bg-[#10B981] text-white shadow'
                : 'text-emerald-300/70 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>JARVIS</span>
          </button>

          <button
            onClick={() => chatMode !== 'manager' && onToggleChatMode()}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              chatMode === 'manager'
                ? 'bg-[#10B981] text-white shadow'
                : 'text-emerald-300/70 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{managerName || 'Coach'}</span>
          </button>
        </div>
      </div>

      {/* Middle/Right: Status Indicator, Streak & Settings Button only */}
      <div className="flex items-center gap-2">
        {/* Real Live Status Indicator */}
        <div
          title={`Status: ${connectionStatus}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#091F16] border border-[#134E39] text-[10px] font-mono tracking-wider"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected'
                ? 'bg-[#10B981] animate-pulse'
                : connectionStatus === 'connecting' || connectionStatus === 'reconnecting'
                ? 'bg-amber-400 animate-pulse'
                : connectionStatus === 'error'
                ? 'bg-rose-500'
                : 'bg-slate-500'
            }`}
          />
          <span className="text-[#ECFDF5] font-semibold uppercase hidden sm:inline">
            {connectionStatus === 'connected'
              ? 'ONLINE'
              : connectionStatus === 'error'
              ? 'ERROR'
              : connectionStatus === 'connecting'
              ? 'LINKING'
              : 'OFFLINE'}
          </span>
        </div>

        {/* Google Drive Status Indicator */}
        <button
          onClick={onOpenSettings}
          title={
            driveSyncStatus === 'synced'
              ? `Google Drive Linked: ${userEmail || 'Active'}`
              : driveSyncStatus === 'syncing'
              ? 'Google Drive Syncing...'
              : 'Google Drive Disconnected (Click to configure)'
          }
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-mono tracking-wider transition-all ${
            driveSyncStatus === 'synced'
              ? 'bg-[#091F16] border-[#10B981] text-emerald-300 shadow-sm'
              : driveSyncStatus === 'syncing'
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-[#091F16] border-[#134E39] text-emerald-400/60 hover:text-emerald-300'
          }`}
        >
          <Cloud className={`w-3.5 h-3.5 ${driveSyncStatus === 'synced' ? 'text-[#10B981]' : driveSyncStatus === 'syncing' ? 'text-amber-400 animate-spin' : 'text-emerald-500/60'}`} />
          <span className="hidden sm:inline font-semibold">
            {driveSyncStatus === 'synced' ? 'DRIVE' : driveSyncStatus === 'syncing' ? 'SYNC' : 'DRIVE'}
          </span>
        </button>
        {/* Real Stored Streak & Weekly Completion Rate */}
        <div
          title={`Active Streak: ${streak} days | Completion Rate: ${completionRate || 0}%`}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#091F16] border border-[#134E39] text-xs font-semibold"
        >
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-amber-300 font-bold">{streak}d</span>
          {completionRate !== undefined && (
            <>
              <span className="text-[#134E39]">•</span>
              <span className="text-emerald-400 font-mono text-[11px]">{completionRate}%</span>
            </>
          )}
        </div>

        {/* Menu Dropdown Button for Secondary Controls */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            title="More Options"
            className="p-2 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-emerald-300 hover:text-white transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#091F16] border border-[#134E39] rounded-2xl shadow-2xl py-1.5 z-50 animate-fade-in">
              {onToggleTodayCard && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onToggleTodayCard();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#10B981]" />
                  <span>{showTodayCard ? 'Hide Today Plan' : 'Show Today Plan'}</span>
                </button>
              )}
              {onOpenSchedule && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenSchedule();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#10B981]" />
                  <span>Monthly Schedule</span>
                </button>
              )}

              {onOpenProjects && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenProjects();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
                >
                  <FolderKanban className="w-4 h-4 text-[#10B981]" />
                  <span>Projects Hub</span>
                </button>
              )}

              {onOpenMemory && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenMemory();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
                >
                  <Brain className="w-4 h-4 text-[#10B981]" />
                  <span>Memory Bank</span>
                </button>
              )}

              {onOpenAccountability && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenAccountability();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-[#10B981]" />
                  <span>Accountability Radar</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowMenu(false);
                  onOpenVision();
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-[#10B981]" />
                <span>Camera & Vision</span>
              </button>

              <button
                onClick={() => {
                  onToggleMute();
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#ECFDF5] hover:bg-[#134E39] flex items-center gap-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
                <span>{isMuted ? 'Unmute Audio' : 'Mute Audio'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title="Settings"
          className="p-2 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-emerald-300 hover:text-white transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
