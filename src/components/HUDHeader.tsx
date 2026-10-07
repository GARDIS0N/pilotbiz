import React, { useEffect, useState } from 'react';
import {
  Shield,
  Activity,
  BatteryCharging,
  Battery,
  Wifi,
  Sliders,
  Camera,
  Volume2,
  VolumeX,
  Flame,
  Target,
  Calendar,
  CloudCheck,
  CloudAlert,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { LiveConnectionStatus } from '../types/jarvis';
import { GoogleSignInButton } from './GoogleSignInButton';

export type { LiveConnectionStatus };
export type DriveSyncStatus = 'offline' | 'syncing' | 'synced' | 'error' | 'not_authenticated';

interface HUDHeaderProps {
  onOpenSettings: () => void;
  onOpenVision: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  connectionStatus: LiveConnectionStatus;
  errorMessage?: string | null;
  onRetryConnection?: () => void;
  reconnectAttempt?: number;
  maxReconnectAttempts?: number;
  // Accountability & Schedule props
  streak?: number;
  completionRate?: number;
  onOpenSchedule?: () => void;
  onOpenAccountability?: () => void;
  // Google Drive & Auth Props
  driveSyncStatus?: DriveSyncStatus;
  driveSyncError?: string | null;
  lastDriveSyncTime?: string | null;
  userEmail?: string | null;
  userPhotoUrl?: string | null;
  onSignInGoogle?: () => void;
  onSignOutGoogle?: () => void;
  onManualSyncDrive?: () => void;
  isGoogleSigningIn?: boolean;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({
  onOpenSettings,
  onOpenVision,
  isMuted,
  onToggleMute,
  connectionStatus,
  errorMessage,
  onRetryConnection,
  reconnectAttempt = 1,
  maxReconnectAttempts = 5,
  streak = 0,
  completionRate = 0,
  onOpenSchedule,
  onOpenAccountability,
  driveSyncStatus,
  driveSyncError,
  lastDriveSyncTime,
  userEmail,
  onSignInGoogle,
  onSignOutGoogle,
  onManualSyncDrive,
  isGoogleSigningIn = false,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(95);
  const [isCharging, setIsCharging] = useState<boolean | null>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && (navigator as any).getBattery) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
      }).catch(() => {});
    }
  }, []);

  return (
    <header className="w-full bg-[#06140F]/95 backdrop-blur-md border-b border-[#134E39] px-3 sm:px-4 py-2.5 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#091F16] border border-[#10B981]/40 shadow-sm">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-[#ECFDF5] text-sm sm:text-base font-sans">
                JARVIS
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-emerald-400/60 font-mono hidden md:block">
              EXECUTIVE AGENT & STRATEGIST
            </p>
          </div>
        </div>

        {/* Live status badge */}
        <div
          onClick={connectionStatus === 'error' ? onRetryConnection : undefined}
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
            connectionStatus === 'connected'
              ? 'border-[#10B981]/40 text-[#10B981] bg-[#091F16]'
              : connectionStatus === 'connecting' || connectionStatus === 'reconnecting'
              ? 'border-amber-500/40 text-amber-300 bg-amber-950/20'
              : connectionStatus === 'error'
              ? 'border-rose-500/40 text-rose-300 bg-rose-950/20 cursor-pointer'
              : 'border-[#134E39] text-emerald-500/70 bg-[#091F16]'
          }`}
          title={errorMessage || undefined}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected'
                ? 'bg-[#10B981] animate-pulse'
                : connectionStatus === 'error'
                ? 'bg-rose-500'
                : 'bg-emerald-400'
            }`}
          />
          <span className="text-[11px] font-semibold uppercase">
            {connectionStatus === 'connected' ? 'LIVE VOICE ONLINE' : 'READY'}
          </span>
        </div>
      </div>

      {/* Middle: Streak & Weekly Completion Rate Badges */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {onOpenAccountability && (
          <button
            onClick={onOpenAccountability}
            title="Open Accountability Radar"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-xs font-medium transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-300">{streak}</span>
            <span className="hidden sm:inline text-emerald-300/70 text-[11px]">streak</span>
          </button>
        )}

        {onOpenAccountability && (
          <button
            onClick={onOpenAccountability}
            title="Open Weekly Completion Rate"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-xs font-medium transition-all"
          >
            <Target className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="font-bold text-[#10B981]">{completionRate}%</span>
            <span className="hidden sm:inline text-emerald-300/70 text-[11px]">rate</span>
          </button>
        )}

        {onOpenSchedule && (
          <button
            onClick={onOpenSchedule}
            title="Open Monthly Schedule Drawer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-xs font-semibold text-[#10B981] hover:text-white transition-all shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Schedule</span>
          </button>
        )}
      </div>

      {/* Right: Controls & Diagnostics */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Optical Camera button */}
        <button
          onClick={onOpenVision}
          title="Camera & Vision Analysis"
          className="p-2 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-emerald-400 hover:text-white transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Audio Mute button */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-emerald-400 hover:text-white transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title="Settings & Check-In Intervals"
          className="p-2 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-emerald-400 hover:text-white transition-all min-w-[38px] min-h-[38px] flex items-center justify-center"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
