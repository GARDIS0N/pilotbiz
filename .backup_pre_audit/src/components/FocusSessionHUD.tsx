import React, { useEffect } from 'react';
import { FocusSession } from '../types/jarvis';
import { Brain, Coffee, Play, Pause, Square, CheckCircle, Zap, FastForward } from 'lucide-react';
import { playHudSound } from '../utils/audio';

interface FocusSessionHUDProps {
  session: FocusSession;
  onPauseToggle: () => void;
  onStop: () => void;
  onCompleteTask: (taskId?: string) => void;
  onUpdateRemaining: (seconds: number) => void;
  onSwitchPhase: (phase: 'focus' | 'rule_5min' | 'break') => void;
  onStart5MinRule: (taskTitle?: string) => void;
}

export const FocusSessionHUD: React.FC<FocusSessionHUDProps> = ({
  session,
  onPauseToggle,
  onStop,
  onCompleteTask,
  onUpdateRemaining,
  onSwitchPhase,
  onStart5MinRule,
}) => {
  useEffect(() => {
    if (!session.isActive) return;

    const interval = setInterval(() => {
      if (session.remainingSeconds > 0) {
        const nextVal = session.remainingSeconds - 1;
        onUpdateRemaining(nextVal);

        if (nextVal === 0) {
          playHudSound('alarm');
          if (session.phase === 'rule_5min') {
            // 5 min rule finished -> Prompt to keep going with full 25 min sprint!
            onSwitchPhase('focus');
          } else if (session.phase === 'focus') {
            onSwitchPhase('break');
          } else {
            onSwitchPhase('focus');
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, onUpdateRemaining, onSwitchPhase]);

  if (session.phase === 'idle') return null;

  const mins = Math.floor(session.remainingSeconds / 60);
  const secs = session.remainingSeconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const total = session.totalSeconds || 1500;
  const progress = Math.max(0, Math.min(100, ((total - session.remainingSeconds) / total) * 100));

  const is5MinRule = session.phase === 'rule_5min';
  const isFocus = session.phase === 'focus';
  const isBreak = session.phase === 'break';

  const phaseBadgeText = is5MinRule
    ? '⚡ 5-MINUTE RULE STARTER (BREAK RESISTANCE)'
    : isFocus
    ? 'FOCUS SPRINT (25M)'
    : 'TACTICAL BREAK (5M)';

  const cardBorderClass = is5MinRule
    ? 'bg-amber-950/80 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
    : isFocus
    ? 'bg-slate-950/90 border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
    : 'bg-emerald-950/80 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]';

  const timerColorClass = is5MinRule
    ? 'text-amber-300'
    : isFocus
    ? 'text-cyan-300 text-glow-cyan'
    : 'text-emerald-300';

  return (
    <div className="w-full max-w-xl mx-auto mb-2 px-2 animate-fade-in select-none">
      <div className={`relative overflow-hidden p-3 rounded-xl border backdrop-blur-md shadow-lg transition-all ${cardBorderClass}`}>
        <div className="flex items-center justify-between gap-3">
          {/* Phase Badge & Task Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-1.5 rounded-lg border flex items-center justify-center ${
                is5MinRule
                  ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                  : isFocus
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                  : 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
              }`}
            >
              {is5MinRule ? (
                <Zap className="w-4 h-4 animate-bounce text-amber-400" />
              ) : isFocus ? (
                <Brain className="w-4 h-4 animate-pulse" />
              ) : (
                <Coffee className="w-4 h-4" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-orbitron font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border ${
                    is5MinRule
                      ? 'bg-amber-950/90 border-amber-400/50 text-amber-300'
                      : isFocus
                      ? 'bg-cyan-950/80 border-cyan-400/40 text-cyan-300'
                      : 'bg-emerald-950/80 border-emerald-400/40 text-emerald-300'
                  }`}
                >
                  {phaseBadgeText}
                </span>
                {!is5MinRule && (
                  <span className="text-[10px] font-mono-tech text-cyan-400/60">
                    CYCLE #{session.cycleCount || 1}
                  </span>
                )}
              </div>
              <p className="text-xs font-rajdhani font-semibold text-white truncate mt-0.5 max-w-xs sm:max-w-md">
                {session.taskTitle || 'High-Priority Deep Work'}
              </p>
            </div>
          </div>

          {/* Timer Countdown & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className={`font-orbitron font-bold text-xl tracking-widest ${timerColorClass}`}>
                {formatted}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onPauseToggle}
                className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors"
                title={session.isActive ? 'Pause Session' : 'Resume Session'}
              >
                {session.isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {is5MinRule && (
                <button
                  onClick={() => onSwitchPhase('focus')}
                  className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400 transition-colors"
                  title="Friction Overcome: Extend to 25m Focus Sprint"
                >
                  <FastForward className="w-3.5 h-3.5" />
                </button>
              )}

              {session.taskId && (
                <button
                  onClick={() => onCompleteTask(session.taskId)}
                  className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-100 hover:border-emerald-400 transition-colors"
                  title="Mark Task Finished"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={onStop}
                className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:text-rose-100 hover:border-rose-400 transition-colors"
                title="End Focus Session"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800/80 rounded-full mt-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              is5MinRule ? 'bg-amber-400' : isFocus ? 'bg-cyan-400 glow-cyan-sm' : 'bg-emerald-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
