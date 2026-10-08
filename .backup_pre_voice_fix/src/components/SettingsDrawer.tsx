import React from 'react';
import { JarvisSettings } from '../types/jarvis';
import {
  X,
  Sliders,
  Volume2,
  ShieldCheck,
  UserCheck,
  Cloud,
  CloudCheck,
  CloudAlert,
  RefreshCw,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { DriveSyncStatus } from './HUDHeader';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: JarvisSettings;
  onUpdateSettings: (newSettings: Partial<JarvisSettings>) => void;
  driveSyncStatus?: DriveSyncStatus;
  driveSyncError?: string | null;
  lastDriveSyncTime?: string | null;
  userEmail?: string | null;
  onSignInGoogle?: () => void;
  onSignOutGoogle?: () => void;
  onManualSyncDrive?: () => void;
  isGoogleSigningIn?: boolean;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  driveSyncStatus = 'not_authenticated',
  driveSyncError,
  lastDriveSyncTime,
  userEmail,
  onSignInGoogle,
  onSignOutGoogle,
  onManualSyncDrive,
  isGoogleSigningIn = false,
}) => {
  if (!isOpen) return null;

  const voices: { name: JarvisSettings['voiceName']; desc: string }[] = [
    { name: 'Zephyr', desc: 'Calm, refined, articulate English persona (Recommended)' },
    { name: 'Fenrir', desc: 'Deep, authoritative, tactical timbre' },
    { name: 'Puck', desc: 'Alert, agile, witty conversational tone' },
    { name: 'Charon', desc: 'Grounded, resonant, steady frequency' },
    { name: 'Kore', desc: 'Clear, melodious, precise delivery' },
  ];

  const presetSalutations = ['boss', 'sir', 'Tony', 'Captain', 'Doctor'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md h-full bg-[#06140F] border-l border-[#134E39] flex flex-col p-6 overflow-y-auto text-[#ECFDF5] shadow-[-10px_0_40px_rgba(16,185,129,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#134E39]">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-bold text-sm tracking-wide text-[#ECFDF5]">
              JARVIS SETTINGS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-6 space-y-6">
          {/* Personal Manager Settings */}
          <div className="p-4 rounded-xl bg-[#091F16] border border-[#134E39] space-y-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#ECFDF5] tracking-wide">
                PERSONAL MANAGER
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Name of your personal manager and coach persona (default: "Coach"):
            </p>
            <div className="pt-1">
              <input
                type="text"
                value={settings.managerName || 'Coach'}
                onChange={(e) => onUpdateSettings({ managerName: e.target.value })}
                placeholder="e.g. Coach, Marcus, Sarah..."
                className="w-full bg-[#06140F] border border-[#134E39] rounded-lg px-3 py-2 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* User Salutation Config */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>Address Protocol (Salutation)</span>
            </label>
            <p className="text-xs text-emerald-400/80">
              How JARVIS should address you during briefings and voice interactions:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {presetSalutations.map((sal) => (
                <button
                  key={sal}
                  onClick={() => onUpdateSettings({ addressUserAs: sal })}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    settings.addressUserAs.toLowerCase() === sal.toLowerCase()
                      ? 'bg-[#10B981] text-white font-semibold shadow'
                      : 'bg-[#091F16] border border-[#134E39] text-emerald-300 hover:border-[#10B981]'
                  }`}
                >
                  "{sal}" {sal === 'boss' ? '(Default)' : ''}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <input
                type="text"
                value={settings.addressUserAs}
                onChange={(e) => onUpdateSettings({ addressUserAs: e.target.value })}
                placeholder="Or enter custom salutation..."
                className="w-full bg-[#091F16] border border-[#134E39] rounded-lg px-3 py-1.5 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Voice Model Selection */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-[#10B981]" />
              <span>Synthetic Voice Model</span>
            </label>
            <div className="space-y-2">
              {voices.map((v) => (
                <button
                  key={v.name}
                  onClick={() => onUpdateSettings({ voiceName: v.name })}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    settings.voiceName === v.name
                      ? 'bg-[#091F16] border-[#10B981] text-[#ECFDF5]'
                      : 'bg-[#06140F] border-[#134E39] hover:border-emerald-600 text-emerald-300/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs tracking-wider">
                      {v.name}
                    </span>
                    {settings.voiceName === v.name && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981] text-white font-semibold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-emerald-400/80 leading-relaxed">
                    {v.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Accountability Check-In Schedule */}
          <div className="p-4 rounded-xl bg-[#091F16] border border-[#134E39] space-y-3">
            <span className="text-xs font-semibold text-emerald-300 tracking-wide block">
              DAILY ACCOUNTABILITY CHECK-IN TIMES
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-emerald-400/80 block mb-1">Morning</label>
                <input
                  type="time"
                  value={settings.morningCheckInTime || '08:30'}
                  onChange={(e) => onUpdateSettings({ morningCheckInTime: e.target.value })}
                  className="w-full px-2 py-1 bg-[#06140F] border border-[#134E39] rounded text-xs text-[#ECFDF5] focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] text-emerald-400/80 block mb-1">Midday</label>
                <input
                  type="time"
                  value={settings.middayCheckInTime || '13:00'}
                  onChange={(e) => onUpdateSettings({ middayCheckInTime: e.target.value })}
                  className="w-full px-2 py-1 bg-[#06140F] border border-[#134E39] rounded text-xs text-[#ECFDF5] focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] text-emerald-400/80 block mb-1">Evening</label>
                <input
                  type="time"
                  value={settings.eveningCheckInTime || '20:00'}
                  onChange={(e) => onUpdateSettings({ eveningCheckInTime: e.target.value })}
                  className="w-full px-2 py-1 bg-[#06140F] border border-[#134E39] rounded text-xs text-[#ECFDF5] focus:outline-none focus:border-[#10B981]"
                />
              </div>
            </div>
          </div>

          {/* Proactive Check-In Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#091F16] border border-[#134E39]">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-[#ECFDF5]">
                Proactive Check-Ins
              </span>
              <p className="text-[11px] text-emerald-400/80">
                Check in if idle to review task status.
              </p>
            </div>
            <button
              onClick={() =>
                onUpdateSettings({
                  enableProactiveCheckIns: !settings.enableProactiveCheckIns,
                })
              }
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.enableProactiveCheckIns ? 'bg-[#10B981]' : 'bg-[#06140F] border border-[#134E39]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.enableProactiveCheckIns ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Google Drive Cloud Persistence Card */}
          <div className="p-4 rounded-xl bg-[#091F16] border border-[#134E39] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-semibold text-[#ECFDF5]">
                  GOOGLE DRIVE SYNC
                </span>
              </div>
              {driveSyncStatus === 'synced' ? (
                <span className="flex items-center gap-1 text-[10px] text-emerald-300 bg-[#134E39] px-2 py-0.5 rounded border border-[#10B981]">
                  <CloudCheck className="w-3 h-3" /> SYNCED
                </span>
              ) : driveSyncStatus === 'syncing' ? (
                <span className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  <RefreshCw className="w-3 h-3 animate-spin" /> SYNCING
                </span>
              ) : driveSyncStatus === 'error' ? (
                <span className="flex items-center gap-1 text-[10px] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40">
                  <CloudAlert className="w-3 h-3" /> ERROR
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400/60 bg-[#06140F] px-2 py-0.5 rounded border border-[#134E39]">
                  NOT LINKED
                </span>
              )}
            </div>

            <p className="text-[11px] text-emerald-300/80 leading-relaxed">
              Persists tasks, commitments, and logs to your Google Drive.
            </p>

            {userEmail ? (
              <div className="pt-2 border-t border-[#134E39] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400/80">Account:</span>
                  <span className="text-[#ECFDF5] font-semibold">{userEmail}</span>
                </div>
                {lastDriveSyncTime && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400/70">Last Sync:</span>
                    <span className="text-[#10B981]">{lastDriveSyncTime}</span>
                  </div>
                )}
                {driveSyncError && (
                  <p className="text-[11px] text-rose-300 p-2 rounded bg-rose-950/40 border border-rose-500/30">
                    {driveSyncError}
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  {onManualSyncDrive && (
                    <button
                      onClick={onManualSyncDrive}
                      className="flex-1 py-1.5 rounded-lg bg-[#134E39] hover:bg-[#10B981] text-[#ECFDF5] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Sync Now</span>
                    </button>
                  )}
                  {onSignOutGoogle && (
                    <button
                      onClick={onSignOutGoogle}
                      className="px-3 py-1.5 rounded-lg bg-[#06140F] hover:bg-rose-950/60 border border-[#134E39] hover:border-rose-500 text-emerald-400 hover:text-rose-300 text-xs flex items-center gap-1 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#134E39] flex flex-col gap-2">
                {onSignInGoogle && (
                  <GoogleSignInButton
                    onClick={onSignInGoogle}
                    isLoading={isGoogleSigningIn}
                    className="w-full justify-center py-2"
                  />
                )}
                {driveSyncError && (
                  <p className="text-[11px] text-rose-300 p-2 rounded bg-rose-950/40 border border-rose-500/30">
                    {driveSyncError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Gemini API Key Configuration */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Gemini API Key</span>
            </label>
            <p className="text-[11px] text-emerald-400/80">
              Optional if configured in .env. Enter below for direct client uplink:
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateSettings({ apiKey: val });
                  fetch('/api/jarvis/set-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ apiKey: val }),
                  }).catch(() => {});
                }}
                placeholder="AIzaSy... (Gemini API Key)"
                className="flex-1 bg-[#06140F] border border-[#134E39] rounded-lg px-3 py-1.5 text-xs text-[#ECFDF5] placeholder-emerald-600 font-mono focus:outline-none focus:border-[#10B981]"
              />
            </div>
            {settings.apiKey && (
              <span className="text-[10px] text-[#10B981] flex items-center gap-1">
                ✓ Neural Key Active
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#134E39] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-medium text-xs transition-all shadow"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
