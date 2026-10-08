import React, { useEffect, useState } from 'react';
import { JarvisState } from '../types/jarvis';
import { Mic, MicOff, Radio, Cpu, Sparkles, Volume2, AlertCircle } from 'lucide-react';
import { LiveConnectionStatus } from './HUDHeader';

interface ArcReactorProps {
  state: JarvisState;
  micVolume: number; // 0 to 1
  speakerEnergy: number; // 0 to 1
  isLiveActive: boolean;
  connectionStatus?: LiveConnectionStatus;
  onToggleVoice: () => void;
  isLoading?: boolean;
  reconnectAttempt?: number;
  maxReconnectAttempts?: number;
}

export const ArcReactor: React.FC<ArcReactorProps> = ({
  state,
  micVolume,
  speakerEnergy,
  isLiveActive,
  connectionStatus = 'disconnected',
  onToggleVoice,
  isLoading = false,
  reconnectAttempt = 1,
  maxReconnectAttempts = 5,
}) => {
  const [pulsePhase, setPulsePhase] = useState(0);

  // Smooth local animation ticker
  useEffect(() => {
    let animId: number;
    const update = () => {
      setPulsePhase((prev) => (prev + 0.04) % (Math.PI * 2));
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate dynamic scale and glow based on state
  let dynamicScale = 1.0;
  let glowColor = 'rgba(0, 240, 255, 0.4)';
  let coreColor = '#00f0ff';
  let statusText = 'SYSTEM IDLE // STANDBY';
  let ringSpinClass = 'animate-[spin_24s_linear_infinite]';
  let innerSpinClass = 'animate-[spin_16s_linear_infinite_reverse]';

  if (connectionStatus === 'connecting') {
    dynamicScale = 1.0 + Math.sin(pulsePhase * 2) * 0.05;
    glowColor = 'rgba(245, 158, 11, 0.7)';
    coreColor = '#f59e0b';
    statusText = 'ESTABLISHING QUANTUM LIVE UPLINK...';
    ringSpinClass = 'animate-[spin_4s_linear_infinite]';
  } else if (connectionStatus === 'reconnecting') {
    dynamicScale = 1.0 + Math.sin(pulsePhase * 2.5) * 0.07;
    glowColor = 'rgba(245, 158, 11, 0.85)';
    coreColor = '#f59e0b';
    statusText = `RECONNECTING (ATTEMPT ${reconnectAttempt}/${maxReconnectAttempts})...`;
    ringSpinClass = 'animate-[spin_3s_linear_infinite]';
  } else if (connectionStatus === 'error') {
    glowColor = 'rgba(244, 63, 94, 0.7)';
    coreColor = '#f43f5e';
    statusText = 'NEURAL LINK OFFLINE // TAP TO RETRY';
  } else if (state === 'listening') {
    dynamicScale = 1.0 + Math.min(0.35, micVolume * 0.4);
    glowColor = 'rgba(0, 240, 255, 0.8)';
    coreColor = '#38bdf8';
    statusText = 'ACOUSTIC SENSORS ACTIVE // LISTENING';
    ringSpinClass = 'animate-[spin_10s_linear_infinite]';
    innerSpinClass = 'animate-[spin_6s_linear_infinite_reverse]';
  } else if (state === 'thinking') {
    dynamicScale = 1.0 + Math.sin(pulsePhase * 3) * 0.08;
    glowColor = 'rgba(255, 170, 0, 0.8)';
    coreColor = '#fbbf24';
    statusText = 'NEURAL COGNITION RUNNING // THINKING';
    ringSpinClass = 'animate-[spin_2s_linear_infinite]';
    innerSpinClass = 'animate-[spin_1.5s_linear_infinite_reverse]';
  } else if (state === 'speaking') {
    dynamicScale = 1.0 + Math.min(0.3, speakerEnergy * 0.35);
    glowColor = 'rgba(0, 255, 200, 0.85)';
    coreColor = '#2dd4bf';
    statusText = 'SYNTHETIC AUDIO TRANSMISSION // SPEAKING';
    ringSpinClass = 'animate-[spin_8s_linear_infinite]';
    innerSpinClass = 'animate-[spin_5s_linear_infinite_reverse]';
  } else if (connectionStatus === 'connected') {
    statusText = 'LIVE LINK SYNCHRONIZED // STANDBY';
  } else {
    // idle pulse
    dynamicScale = 1.0 + Math.sin(pulsePhase) * 0.03;
  }

  // 10 Segment coils around the reactor
  const coils = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i * 36) * (Math.PI / 180);
    const radius = 95;
    const x = 150 + radius * Math.cos(angle);
    const y = 150 + radius * Math.sin(angle);
    return { x, y, angle: i * 36 };
  });

  // Frequency bars for speaking state
  const frequencyBars = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 15) * (Math.PI / 180);
    const length = state === 'speaking' 
      ? 8 + Math.sin(pulsePhase * 4 + i) * (14 * Math.max(0.2, speakerEnergy))
      : 4;
    const rInner = 126;
    const x1 = 150 + rInner * Math.cos(angle);
    const y1 = 150 + rInner * Math.sin(angle);
    const x2 = 150 + (rInner + length) * Math.cos(angle);
    const y2 = 150 + (rInner + length) * Math.sin(angle);
    return { x1, y1, x2, y2 };
  });

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Outer ambient glow field */}
      <div
        className="absolute rounded-full transition-all duration-300 pointer-events-none"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(0, 240, 255, 0.08) 45%, transparent 70%)`,
          transform: `scale(${dynamicScale * 1.05})`,
          opacity: isLiveActive || state !== 'idle' ? 0.9 : 0.45,
        }}
      />

      {/* Acoustic wave rings when listening */}
      {state === 'listening' && (
        <>
          <div
            className="absolute rounded-full border border-cyan-400/40 animate-ping pointer-events-none"
            style={{
              width: `${260 + micVolume * 80}px`,
              height: `${260 + micVolume * 80}px`,
              animationDuration: '1.8s',
            }}
          />
          <div
            className="absolute rounded-full border border-cyan-400/20 animate-ping pointer-events-none"
            style={{
              width: `${300 + micVolume * 100}px`,
              height: `${300 + micVolume * 100}px`,
              animationDuration: '2.4s',
              animationDelay: '0.6s',
            }}
          />
        </>
      )}

      {/* Main SVG Arc Reactor */}
      <div
        className="relative z-10 transition-transform duration-150 ease-out select-none"
        style={{
          transform: `scale(${dynamicScale})`,
        }}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 filter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          <defs>
            <radialGradient id="reactorCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor={coreColor} stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </radialGradient>

            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Boundary Ring */}
          <circle
            cx="150"
            cy="150"
            r="142"
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.4"
          />

          {/* Frequency Bars around perimeter */}
          {frequencyBars.map((bar, i) => (
            <line
              key={`freq-${i}`}
              x1={bar.x1}
              y1={bar.y1}
              x2={bar.x2}
              y2={bar.y2}
              stroke={state === 'speaking' ? '#2dd4bf' : '#0284c7'}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={state === 'speaking' ? '0.9' : '0.3'}
            />
          ))}

          {/* Outer Segmented Rotating Ring */}
          <g className={`origin-center ${ringSpinClass}`}>
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="2.5"
              strokeDasharray="16 28 6 12 40 20"
              filter="url(#neonGlow)"
            />
            {/* Cardinal Tick Markers */}
            <circle cx="150" cy="30" r="3" fill="#00f0ff" />
            <circle cx="270" cy="150" r="3" fill="#00f0ff" />
            <circle cx="150" cy="270" r="3" fill="#00f0ff" />
            <circle cx="30" cy="150" r="3" fill="#00f0ff" />
          </g>

          {/* Counter-rotating Middle Ring */}
          <g className={`origin-center ${innerSpinClass}`}>
            <circle
              cx="150"
              cy="150"
              r="105"
              fill="none"
              stroke={state === 'thinking' ? '#fbbf24' : '#00f0ff'}
              strokeWidth="2"
              strokeDasharray="4 6 12 18"
              opacity="0.75"
            />
            {/* Triangle chevron guides */}
            <polygon
              points="150,47 145,55 155,55"
              fill="#00f0ff"
              opacity="0.8"
            />
            <polygon
              points="150,253 145,245 155,245"
              fill="#00f0ff"
              opacity="0.8"
            />
          </g>

          {/* 10 Power Coils (Stark Arc Reactor Capacitor blocks) */}
          <g>
            {coils.map((coil, idx) => (
              <g
                key={`coil-${idx}`}
                transform={`rotate(${coil.angle} 150 150)`}
              >
                <rect
                  x="143"
                  y="50"
                  width="14"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke={state === 'thinking' ? '#f59e0b' : '#00f0ff'}
                  strokeWidth="1.8"
                  opacity={state === 'thinking' && idx % 2 === 0 ? '1' : '0.75'}
                  filter="url(#neonGlow)"
                />
                <line
                  x1="147"
                  y1="56"
                  x2="153"
                  y2="56"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
              </g>
            ))}
          </g>

          {/* Inner Housing Ring */}
          <circle
            cx="150"
            cy="150"
            r="65"
            fill="#030b14"
            stroke="#0284c7"
            strokeWidth="3"
            opacity="0.9"
          />

          <circle
            cx="150"
            cy="150"
            r="56"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.6"
          />

          {/* Central Plasma Core (Glowing Energy Sphere) */}
          <circle
            cx="150"
            cy="150"
            r={state === 'listening' ? 44 + micVolume * 8 : state === 'speaking' ? 44 + speakerEnergy * 7 : 42}
            fill="url(#reactorCoreGrad)"
            filter="url(#neonGlow)"
          />

          {/* Tri-Sector Core Lattice */}
          <circle
            cx="150"
            cy="150"
            r="24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </svg>

        {/* Central Clickable Voice Trigger Overlay */}
        <button
          onClick={onToggleVoice}
          disabled={isLoading}
          title={isLiveActive ? 'Disconnect JARVIS Live Uplink' : 'Initialize JARVIS Live Voice Link'}
          className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group active:scale-95 focus:outline-none"
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiveActive
                ? state === 'listening'
                  ? 'bg-cyan-500/25 border-2 border-cyan-400 glow-cyan-lg'
                  : state === 'speaking'
                  ? 'bg-emerald-500/25 border-2 border-emerald-400 glow-cyan-lg'
                  : 'bg-amber-500/25 border-2 border-amber-400 glow-cyan-md'
                : 'bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/40 glow-cyan-sm'
            }`}
          >
            {isLoading ? (
              <Cpu className="w-8 h-8 text-amber-400 animate-spin" />
            ) : isLiveActive ? (
              state === 'listening' ? (
                <Radio className="w-8 h-8 text-cyan-300 animate-pulse" />
              ) : state === 'speaking' ? (
                <Volume2 className="w-8 h-8 text-emerald-300 animate-bounce" />
              ) : (
                <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
              )
            ) : (
              <Mic className="w-8 h-8 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
            )}
          </div>
        </button>
      </div>

      {/* State Badge & Prompt Label */}
      <div className="mt-6 flex flex-col items-center text-center space-y-1.5 z-20">
        <div
          className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-tech tracking-wider uppercase border transition-all ${
            isLiveActive
              ? state === 'listening'
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : state === 'speaking'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
              : 'bg-slate-900/80 border-slate-700 text-slate-400'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveActive
                ? state === 'listening'
                  ? 'bg-cyan-400 animate-ping'
                : state === 'speaking'
                ? 'bg-emerald-400 animate-pulse'
                : 'bg-amber-400 animate-ping'
                : 'bg-slate-500'
            }`}
          />
          {statusText}
        </div>

        <p className="text-xs text-cyan-500/70 font-rajdhani tracking-wide">
          {isLiveActive
            ? 'Voice uplink active • Tap reactor to terminate or speak anytime to interrupt'
            : 'Tap Arc Reactor or click microphone to initialize Live two-way voice channel'}
        </p>
      </div>
    </div>
  );
};
