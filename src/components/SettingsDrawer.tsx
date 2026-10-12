import React, { useState, useEffect } from 'react';
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
  Mic,
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

  const [persona, setPersona] = useState({
    name: settings.managerName || 'Coach',
    title: 'Personal AI Manager & Executive Chief of Staff',
    tone: 'Direct, supportive, calm, high-accountability, and strategic',
    directnessLevel: 4,
    corePhilosophy: 'Action creates motivation, never the reverse. Consistency compounds exponentially. Protect momentum.',
    customDirectives: '',
  });
  const [isSavingPersona, setIsSavingPersona] = useState(false);
  const [personaSavedNotice, setPersonaSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/jarvis/persona')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setPersona({
              name: settings.managerName || data.name || 'Coach',
              title: data.title || 'Personal AI Manager & Executive Chief of Staff',
              tone: data.tone || 'Direct, supportive, calm, high-accountability, and strategic',
              directnessLevel: typeof data.directnessLevel === 'number' ? data.directnessLevel : 4,
              corePhilosophy: data.corePhilosophy || 'Action creates motivation, never the reverse.',
              customDirectives: data.customDirectives || '',
            });
          }
        })
        .catch(() => {});
    }
  }, [isOpen, settings.managerName]);

  const handleSavePersona = async () => {
    setIsSavingPersona(true);
    try {
      const res = await fetch('/api/jarvis/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona),
      });
      if (res.ok) {
        onUpdateSettings({ managerName: persona.name });
        setPersonaSavedNotice(true);
        setTimeout(() => setPersonaSavedNotice(false), 2500);
      }
    } catch (_) {}
    setIsSavingPersona(false);
  };

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
          {/* Personal Manager Persona Editor (Milestone 2) */}
          <div className="p-4 rounded-xl bg-[#091F16] border border-[#134E39] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-semibold text-[#ECFDF5] tracking-wide">
                  PERSONAL MANAGER PERSONA
                </span>
              </div>
              {personaSavedNotice && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold animate-pulse">
                  ✓ SAVED
                </span>
              )}
            </div>

            {/* Persona Name */}
            <div className="space-y-1">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Coach / Assistant Name
              </label>
              <input
                type="text"
                value={persona.name}
                onChange={(e) => setPersona({ ...persona, name: e.target.value })}
                placeholder="e.g. Coach, Friday, Marcus, Sarah..."
                className="w-full bg-[#06140F] border border-[#134E39] rounded-lg px-3 py-2 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Directness & Accountability Level */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Directness & Accountability Level
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { level: 2, label: 'Gentle Mentor', desc: 'Patient & reflective' },
                  { level: 3, label: 'Balanced Partner', desc: 'Supportive & structured' },
                  { level: 4, label: 'Tactical Coach', desc: 'Direct & actionable' },
                  { level: 5, label: 'Chief of Staff', desc: 'High directness, zero fluff' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setPersona({ ...persona, directnessLevel: item.level })}
                    className={`p-2 rounded-lg text-left border transition-all ${
                      persona.directnessLevel === item.level
                        ? 'bg-[#10B981]/15 border-[#10B981] text-[#ECFDF5]'
                        : 'bg-[#06140F] border-[#134E39] text-emerald-400/80 hover:border-emerald-600'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-emerald-500/80">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Rules & Directives */}
            <div className="space-y-1">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Custom Personal Directives
              </label>
              <textarea
                value={persona.customDirectives}
                onChange={(e) => setPersona({ ...persona, customDirectives: e.target.value })}
                placeholder="e.g. Keep replies under 30 words. Always call out task delays. Never flatter."
                rows={2}
                className="w-full bg-[#06140F] border border-[#134E39] rounded-lg px-3 py-2 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981] resize-none"
              />
            </div>

            {/* Save Persona Button */}
            <button
              type="button"
              onClick={handleSavePersona}
              disabled={isSavingPersona}
              className="w-full py-2 bg-[#10B981] hover:bg-emerald-600 text-black font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isSavingPersona ? 'Saving...' : 'Save Persona Directives'}
            </button>
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

          {/* Voice Input & Recognition Settings */}
          <div className="p-4 rounded-xl bg-[#091F16] border border-[#134E39] space-y-4">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#ECFDF5] tracking-wide">
                VOICE INPUT & RECOGNITION
              </span>
            </div>

            {/* Speech Language */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Recognition Language
              </label>
              <select
                value={settings.voiceLanguage || 'en-US'}
                onChange={(e) => onUpdateSettings({ voiceLanguage: e.target.value })}
                className="w-full px-3 py-2 bg-[#06140F] border border-[#134E39] rounded-lg text-xs text-[#ECFDF5] focus:outline-none focus:border-[#10B981]"
              >
                <option value="en-US">English (United States) - en-US</option>
                <option value="en-GB">English (United Kingdom) - en-GB</option>
                <option value="en-AU">English (Australia) - en-AU</option>
                <option value="en-IN">English (India) - en-IN</option>
                <option value="es-ES">Spanish (Spain) - es-ES</option>
                <option value="fr-FR">French (France) - fr-FR</option>
                <option value="de-DE">German (Germany) - de-DE</option>
                <option value="ja-JP">Japanese - ja-JP</option>
                <option value="zh-CN">Chinese (Simplified) - zh-CN</option>
              </select>
            </div>

            {/* Auto-Send Voice Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-medium text-[#ECFDF5]">
                  Auto-Send Voice Directive
                </span>
                <p className="text-[10px] text-emerald-400/80 leading-relaxed">
                  Automatically send message when you stop speaking. Turn off to review transcript before sending.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({
                    autoSendVoice: settings.autoSendVoice !== undefined ? !settings.autoSendVoice : false,
                  })
                }
                className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                  settings.autoSendVoice ?? true ? 'bg-[#10B981]' : 'bg-[#06140F] border border-[#134E39]'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.autoSendVoice ?? true ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Continuous Wake-Word Detection Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-[#134E39]/50">
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-medium text-[#ECFDF5]">
                  Continuous Wake-Word ("Hey Jarvis")
                </span>
                <p className="text-[10px] text-emerald-400/80 leading-relaxed">
                  Continuously listen for wake phrase and execute spoken commands without manual clicks.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({
                    enableWakeWord: settings.enableWakeWord !== undefined ? !settings.enableWakeWord : false,
                  })
                }
                data-testid="wake-word-toggle"
                className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                  settings.enableWakeWord ?? true ? 'bg-[#10B981]' : 'bg-[#06140F] border border-[#134E39]'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.enableWakeWord ?? true ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Configurable Wake Phrases */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Configured Wake Phrases (comma separated)
              </label>
              <input
                type="text"
                value={(settings.wakePhrases || ['hey jarvis', 'jarvis']).join(', ')}
                onChange={(e) => {
                  const phrases = e.target.value
                    .split(',')
                    .map((s) => s.trim().toLowerCase())
                    .filter(Boolean);
                  onUpdateSettings({ wakePhrases: phrases.length > 0 ? phrases : ['hey jarvis', 'jarvis'] });
                }}
                placeholder="e.g. hey jarvis, jarvis, computer"
                className="w-full bg-[#06140F] border border-[#134E39] rounded-lg px-3 py-2 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {/* Speech Pause Detection Threshold */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] text-emerald-300 font-medium block">
                Speech Pause Threshold (Silence Cutoff)
              </label>
              <select
                value={String(settings.silenceTimeoutMs || 2200)}
                onChange={(e) => onUpdateSettings({ silenceTimeoutMs: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#06140F] border border-[#134E39] rounded-lg text-xs text-[#ECFDF5] focus:outline-none focus:border-[#10B981]"
              >
                <option value="1500">1.5 seconds (Quick)</option>
                <option value="2000">2.0 seconds</option>
                <option value="2200">2.2 seconds (Recommended)</option>
                <option value="2500">2.5 seconds (Relaxed)</option>
                <option value="3000">3.0 seconds (Long pause)</option>
              </select>
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
