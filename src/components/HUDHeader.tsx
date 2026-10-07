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
  Cloud,
  CloudCheck,
  CloudAlert,
  CloudUpload,
  LogOut,
  RefreshCw,
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
  driveSyncStatus,
  driveSyncError,
  lastDriveSyncTime,
  userEmail,
  userPhotoUrl,
  onSignInGoogle,
  onSignOutGoogle,
  onManualSyncDrive,
  isGoogleSigningIn = false,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(92);
  const [isCharging, setIsCharging] = useState<boolean | null>(true);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Battery API check
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

    // Network status
    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  return (
    <header className="relative w-full border-b border-cyan-500/20 bg-black/60 backdrop-blur-md px-4 py-2.5 flex items-center justify-between z-30 select-none">
      {/* Left: Stark Brand & Protocol Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 glow-cyan-sm">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold tracking-widest text-cyan-400 text-sm sm:text-base text-glow-cyan">
                J.A.R.V.I.S.
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 font-mono-tech border border-cyan-500/30">
                MK-VII
              </span>
            </div>
            <p className="text-[10px] text-cyan-500/60 font-mono-tech tracking-wider hidden sm:block">
              NEURAL TACTICAL INTERFACE // ONLINE
            </p>
          </div>
        </div>
      </div>

      {/* Middle: System Time & Core Diagnostics */}
      <div className="hidden md:flex items-center gap-6">
        <div
          onClick={connectionStatus === 'error' ? onRetryConnection : undefined}
          className={`flex items-center gap-2 px-3 py-1 rounded bg-slate-950/60 border font-mono-tech text-xs transition-all ${
            connectionStatus === 'connected'
              ? 'border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : connectionStatus === 'connecting' || connectionStatus === 'reconnecting'
              ? 'border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : connectionStatus === 'error'
              ? 'border-rose-500/50 text-rose-300 cursor-pointer hover:bg-rose-950/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              : 'border-cyan-500/20 text-slate-400'
          }`}
          title={errorMessage || undefined}
        >
          {connectionStatus === 'connected' ? (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          ) : connectionStatus === 'connecting' ? (
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          ) : connectionStatus === 'reconnecting' ? (
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          ) : connectionStatus === 'error' ? (
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-slate-500" />
          )}

          <span>LINK:</span>
          <span className="font-semibold uppercase">
            {connectionStatus === 'connected'
              ? 'CONNECTED'
              : connectionStatus === 'connecting'
              ? 'CONNECTING TO LIVE API...'
              : connectionStatus === 'reconnecting'
              ? `RECONNECTING (ATTEMPT ${reconnectAttempt}/${maxReconnectAttempts})...`
              : connectionStatus === 'error'
              ? 'ERROR: CLICK TO RETRY'
              : 'STANDBY (DISCONNECTED)'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/30 border border-cyan-500/30 font-orbitron text-xs tracking-wider text-cyan-300 glow-cyan-sm">
          <span className="text-cyan-500 text-[10px]">LOCAL TIME:</span>
          <span className="font-semibold">{timeStr}</span>
        </div>
      </div>

      {/* Right: Telemetry Widgets & Google Drive Sync Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Google Drive Persistence / Sync Status Widget */}
        <div className="flex items-center">
          {driveSyncStatus === 'synced' ? (
            <button
              onClick={onManualSyncDrive}
              title={lastDriveSyncTime ? `Google Drive Synced (${lastDriveSyncTime}). Click to force sync.` : 'Google Drive Synced. Click to sync now.'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-mono-tech text-xs transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)]"
            >
              <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold tracking-wider">SYNCED</span>
            </button>
          ) : driveSyncStatus === 'syncing' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-300 font-mono-tech text-xs animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="tracking-wider">SYNCING...</span>
            </div>
          ) : driveSyncStatus === 'error' ? (
            <button
              onClick={onSignInGoogle}
              title={driveSyncError || 'Google Drive session expired or error. Click to re-authenticate.'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/60 hover:border-rose-400 text-rose-300 font-mono-tech text-xs transition-all shadow-[0_0_14px_rgba(244,63,94,0.35)] animate-pulse"
            >
              <CloudAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold tracking-wider">SYNC ERROR (RE-LOGIN)</span>
            </button>
          ) : (
            <GoogleSignInButton
              onClick={onSignInGoogle || (() => {})}
              isLoading={isGoogleSigningIn}
              className="py-1 px-2.5 text-xs shadow-none border border-cyan-500/30 hover:border-cyan-400"
            />
          )}

          {/* User Account Info & Disconnect if logged in */}
          {userEmail && (
            <div className="hidden xl:flex items-center gap-1.5 ml-2 pl-2 border-l border-cyan-500/20 text-[11px] font-mono-tech text-cyan-300/80">
              <span className="truncate max-w-[120px]">{userEmail}</span>
              {onSignOutGoogle && (
                <button
                  onClick={onSignOutGoogle}
                  title="Disconnect Google Drive"
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Battery widget */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/60 border border-cyan-500/20 font-mono-tech text-xs text-cyan-400">
          {isCharging ? (
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Battery className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span className="text-[11px]">{batteryLevel !== null ? `${batteryLevel}%` : 'PWR 100%'}</span>
        </div>

        {/* Network widget */}
        <div
          className={`hidden md:flex items-center gap-1 px-2 py-1 rounded bg-slate-900/60 border text-xs font-mono-tech ${
            isOnline ? 'border-cyan-500/20 text-cyan-400' : 'border-rose-500/40 text-rose-400'
          }`}
          title={isOnline ? 'Network synchronized' : 'Offline'}
        >
          <Wifi className="w-3.5 h-3.5" />
          <span className="text-[11px]">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </div>

        {/* Vision / Camera modal button */}
        <button
          onClick={onOpenVision}
          title="Optical Scanner / Vision Analysis"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all font-mono-tech text-xs"
        >
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">VISION</span>
        </button>

        {/* Audio Mute toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/20 text-cyan-400 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title="HUD Configurations"
          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 transition-all"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
