import React, { useEffect } from 'react';
import { ActiveTimer } from '../types/jarvis';
import { Timer, X, BellRing, Play, Pause } from 'lucide-react';
import { playHudSound } from '../utils/audio';

interface TimerHUDProps {
  timers: ActiveTimer[];
  onDismissTimer: (id: string) => void;
  onUpdateTimerRemaining: (id: string, remaining: number) => void;
}

export const TimerHUD: React.FC<TimerHUDProps> = ({
  timers,
  onDismissTimer,
  onUpdateTimerRemaining,
}) => {
  useEffect(() => {
    if (timers.length === 0) return;

    const interval = setInterval(() => {
      timers.forEach((t) => {
        if (t.isRunning && t.remainingSeconds > 0) {
          const nextVal = t.remainingSeconds - 1;
          onUpdateTimerRemaining(t.id, nextVal);
          if (nextVal === 0) {
            playHudSound('alarm');
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, onUpdateTimerRemaining]);

  if (timers.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-40 flex flex-col gap-2 max-w-xs w-full pointer-events-auto">
      {timers.map((t) => {
        const isFinished = t.remainingSeconds <= 0;
        const progress = Math.max(0, Math.min(100, (t.remainingSeconds / t.totalSeconds) * 100));
        const mins = Math.floor(t.remainingSeconds / 60);
        const secs = t.remainingSeconds % 60;
        const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        return (
          <div
            key={t.id}
            className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
              isFinished
                ? 'bg-rose-950/80 border-rose-400 text-rose-200 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                : 'bg-slate-950/90 border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                {isFinished ? (
                  <BellRing className="w-4 h-4 text-rose-400 animate-bounce" />
                ) : (
                  <Timer className="w-4 h-4 text-cyan-400 animate-spin" />
                )}
                <span className="font-orbitron text-xs font-semibold tracking-wider uppercase truncate max-w-[140px]">
                  {t.label || 'DIRECTIVE COUNTDOWN'}
                </span>
              </div>
              <button
                onClick={() => onDismissTimer(t.id)}
                className="p-1 rounded text-cyan-400 hover:text-cyan-200 hover:bg-cyan-900/40 transition-colors"
                title="Dismiss timer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <span className="font-orbitron font-bold text-2xl tracking-widest text-glow-cyan">
                {isFinished ? '00:00 [ALARM]' : formatted}
              </span>
              <span className="font-mono-tech text-[10px] text-cyan-500/60">
                {t.totalSeconds} SEC TOTAL
              </span>
            </div>

            {/* Countdown bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  isFinished ? 'bg-rose-500' : 'bg-cyan-400 glow-cyan-sm'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
