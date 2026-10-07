import React from 'react';
import { JarvisSettings } from '../types/jarvis';
import {
  X,
  Sliders,
  Volume2,
  ShieldCheck,
  UserCheck,
  Mic,
  Sparkles,
  Cloud,
  CloudCheck,
  CloudAlert,
  RefreshCw,
  LogOut,
  FolderSync,
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
      <div className="relative w-full max-w-md h-full bg-slate-950 border-l border-cyan-500/30 flex flex-col p-6 overflow-y-auto hud-grid shadow-[-10px_0_40px_rgba(0,240,255,0.15)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/25">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-sm tracking-wider text-cyan-300">
              JARVIS HUD CONFIGURATION
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-6 space-y-6">
          {/* Google Drive Cloud Persistence Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-400" />
                <span className="font-orbitron text-xs text-cyan-200 tracking-wider">
                  GOOGLE DRIVE CLOUD SYNC
                </span>
              </div>
              {driveSyncStatus === 'synced' ? (
                <span className="flex items-center gap-1 text-[10px] font-mono-tech text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                  <CloudCheck className="w-3 h-3" /> SYNCED
                </span>
              ) : driveSyncStatus === 'syncing' ? (
                <span className="flex items-center gap-1 text-[10px] font-mono-tech text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  <RefreshCw className="w-3 h-3 animate-spin" /> SYNCING
                </span>
              ) : driveSyncStatus === 'error' ? (
                <span className="flex items-center gap-1 text-[10px] font-mono-tech text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40">
                  <CloudAlert className="w-3 h-3" /> ERROR
                </span>
              ) : (
                <span className="text-[10px] font-mono-tech text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  NOT LINKED
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-300 font-rajdhani leading-relaxed">
              Persists tasks, goals, commitments, daily logs, and scorecards to a dedicated <strong className="text-cyan-300">"JARVIS"</strong> folder in your Google Drive (least-privilege <code className="text-cyan-400">drive.file</code> scope). LocalStorage acts as an offline cache.
            </p>

            {userEmail ? (
              <div className="pt-2 border-t border-cyan-500/15 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-slate-400">ACCOUNT:</span>
                  <span className="text-cyan-300 font-semibold">{userEmail}</span>
                </div>
                {lastDriveSyncTime && (
                  <div className="flex items-center justify-between text-[11px] font-mono-tech">
                    <span className="text-slate-500">LAST SYNC:</span>
                    <span className="text-emerald-400">{lastDriveSyncTime}</span>
                  </div>
                )}
                {driveSyncError && (
                  <p className="text-[11px] text-rose-300 font-mono-tech p-2 rounded bg-rose-950/40 border border-rose-500/30">
                    {driveSyncError}
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  {onManualSyncDrive && (
                    <button
                      onClick={onManualSyncDrive}
                      className="flex-1 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-200 text-xs font-mono-tech flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>SYNC NOW</span>
                    </button>
                  )}
                  {onSignOutGoogle && (
                    <button
                      onClick={onSignOutGoogle}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 text-xs font-mono-tech flex items-center gap-1 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>DISCONNECT</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-cyan-500/15 flex flex-col gap-2">
                {onSignInGoogle && (
                  <GoogleSignInButton
                    onClick={onSignInGoogle}
                    isLoading={isGoogleSigningIn}
                    className="w-full justify-center py-2"
                  />
                )}
                {driveSyncError && (
                  <p className="text-[11px] text-rose-300 font-mono-tech p-2 rounded bg-rose-950/40 border border-rose-500/30">
                    {driveSyncError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* User Salutation Config */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-orbitron text-cyan-300 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Address Protocol (Salutation)</span>
            </label>
            <p className="text-xs text-cyan-500/70 font-rajdhani">
              How JARVIS should address you during briefings and voice interactions (default: "boss"):
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {presetSalutations.map((sal) => (
                <button
                  key={sal}
                  onClick={() => onUpdateSettings({ addressUserAs: sal })}
                  className={`px-3 py-1 rounded text-xs font-mono-tech transition-all ${
                    settings.addressUserAs.toLowerCase() === sal.toLowerCase()
                      ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400 glow-cyan-sm font-semibold'
                      : 'bg-slate-900 border border-cyan-500/20 text-cyan-400/80 hover:border-cyan-500/50'
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
                className="w-full bg-black/60 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-xs text-cyan-100 placeholder-cyan-600/50 font-rajdhani focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Voice Model Selection */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-orbitron text-cyan-300 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Synthetic Voice Matrix (Gemini Live)</span>
            </label>
            <div className="space-y-2">
              {voices.map((v) => (
                <button
                  key={v.name}
                  onClick={() => onUpdateSettings({ voiceName: v.name })}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    settings.voiceName === v.name
                      ? 'bg-cyan-950/60 border-cyan-400 glow-cyan-sm text-cyan-100'
                      : 'bg-slate-900/40 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron font-semibold text-xs tracking-wider">
                      {v.name}
                    </span>
                    {settings.voiceName === v.name && (
                      <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-rajdhani mt-1 text-cyan-500/80 leading-relaxed">
                    {v.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Manager Accountability & Proactive Check-Ins */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-cyan-500/20">
              <div className="space-y-0.5">
                <span className="font-orbitron text-xs text-cyan-300 tracking-wider">
                  Proactive Manager Check-Ins
                </span>
                <p className="text-[11px] font-rajdhani text-cyan-500/70">
                  JARVIS speaks up if you are idle to ask for task status.
                </p>
              </div>
              <button
                onClick={() =>
                  onUpdateSettings({
                    enableProactiveCheckIns: !settings.enableProactiveCheckIns,
                  })
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.enableProactiveCheckIns ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
                    settings.enableProactiveCheckIns ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {settings.enableProactiveCheckIns && (
              <div className="p-3 rounded-xl bg-slate-900/30 border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-cyan-300">IDLE INTERVAL BEFORE CHECK-IN:</span>
                  <span className="text-cyan-100 font-bold">{settings.checkInIntervalMinutes || 45} MIN</span>
                </div>
                <div className="flex gap-1.5">
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => onUpdateSettings({ checkInIntervalMinutes: mins })}
                      className={`flex-1 py-1 rounded text-xs font-mono-tech border transition-all ${
                        (settings.checkInIntervalMinutes || 45) === mins
                          ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 font-bold'
                          : 'bg-slate-900 border-cyan-500/20 text-cyan-400/70 hover:border-cyan-400/40'
                      }`}
                    >
                      {mins}m {mins === 45 ? '(Def)' : ''}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-cyan-500/20 space-y-2">
                  <div className="text-[11px] font-mono-tech text-cyan-300 font-bold uppercase">
                    DAILY ACCOUNTABILITY CHECK-IN SCHEDULE:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-cyan-400/80 block mb-0.5">Morning</label>
                      <input
                        type="time"
                        value={settings.morningCheckInTime || '08:30'}
                        onChange={(e) => onUpdateSettings({ morningCheckInTime: e.target.value })}
                        className="w-full px-2 py-1 bg-black/60 border border-cyan-500/30 rounded text-xs text-cyan-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-cyan-400/80 block mb-0.5">Midday</label>
                      <input
                        type="time"
                        value={settings.middayCheckInTime || '13:00'}
                        onChange={(e) => onUpdateSettings({ middayCheckInTime: e.target.value })}
                        className="w-full px-2 py-1 bg-black/60 border border-cyan-500/30 rounded text-xs text-cyan-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-cyan-400/80 block mb-0.5">Evening</label>
                      <input
                        type="time"
                        value={settings.eveningCheckInTime || '20:00'}
                        onChange={(e) => onUpdateSettings({ eveningCheckInTime: e.target.value })}
                        className="w-full px-2 py-1 bg-black/60 border border-cyan-500/30 rounded text-xs text-cyan-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-cyan-500/20">
              <div className="space-y-0.5">
                <span className="font-orbitron text-xs text-cyan-300 tracking-wider">
                  Due Time Voice Reminders
                </span>
                <p className="text-[11px] font-rajdhani text-cyan-500/70">
                  JARVIS speaks alerts when task due times arrive.
                </p>
              </div>
              <button
                onClick={() =>
                  onUpdateSettings({
                    enableDueTimeAlerts: !settings.enableDueTimeAlerts,
                  })
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.enableDueTimeAlerts ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
                    settings.enableDueTimeAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Audio Feedback Sound Effects */}
          <div className="pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-cyan-500/20">
              <div className="space-y-0.5">
                <span className="font-orbitron text-xs text-cyan-300 tracking-wider">
                  HUD Sound Synthesis
                </span>
                <p className="text-[11px] font-rajdhani text-cyan-500/70">
                  Play futuristic startup chirps, interruption cues, and alarms.
                </p>
              </div>
              <button
                onClick={() =>
                  onUpdateSettings({
                    enableAudioSoundEffects: !settings.enableAudioSoundEffects,
                  })
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.enableAudioSoundEffects ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
                    settings.enableAudioSoundEffects ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Gemini API Key Configuration */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs font-orbitron text-cyan-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Gemini Neural API Key</span>
            </label>
            <p className="text-[11px] font-rajdhani text-cyan-500/70">
              Optional if configured in AI Studio Secrets. Enter below for direct neural uplink:
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
                className="flex-1 bg-black/60 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-xs text-cyan-100 placeholder-cyan-600/50 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            {settings.apiKey && (
              <span className="text-[10px] font-mono-tech text-emerald-400 flex items-center gap-1">
                ✓ CUSTOM NEURAL KEY ACTIVE
              </span>
            )}
          </div>

          {/* System Security Enclave */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SERVER NEURAL ENCLAVE: ACTIVE</span>
            </div>
            <p className="text-[11px] font-rajdhani text-cyan-400/80 leading-relaxed">
              When an API key is attached, Gemini Live 2.5 Flash and two-way voice streaming are fully active. Without a key, JARVIS operates on localized tactical heuristics.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-orbitron text-xs tracking-wider transition-all"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
