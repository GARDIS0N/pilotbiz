import React, { useState } from 'react';
import {
  Flame,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  ArrowRight,
  ShieldAlert,
  Calendar,
} from 'lucide-react';
import { AccountabilityData, ScheduleItem } from '../types/jarvis';

interface AccountabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AccountabilityData;
  todayItems: ScheduleItem[];
  onTriggerCheckIn: (type: 'morning' | 'midday' | 'evening') => void;
  onCompleteEveningReview: (reviewData: {
    completedIds: string[];
    rescheduledItems: { id: string; newDate: string; newTime?: string }[];
  }) => void;
}

export const AccountabilityModal: React.FC<AccountabilityModalProps> = ({
  isOpen,
  onClose,
  data,
  todayItems,
  onTriggerCheckIn,
  onCompleteEveningReview,
}) => {
  const [reviewStep, setReviewStep] = useState<'overview' | 'reviewing'>('overview');
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    todayItems.filter((it) => it.completed).map((it) => it.id)
  );
  const [rescheduledMap, setRescheduledMap] = useState<
    Record<string, { newDate: string; newTime?: string }>
  >({});

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleToggleCompleted = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSetReschedule = (id: string, newDate: string, newTime?: string) => {
    setRescheduledMap((prev) => ({
      ...prev,
      [id]: { newDate, newTime },
    }));
  };

  const handleFinishReview = () => {
    const rescheduledItems = Object.entries(rescheduledMap).map(([id, val]) => ({
      id,
      newDate: val.newDate,
      newTime: val.newTime,
    }));
    onCompleteEveningReview({ completedIds, rescheduledItems });
    setReviewStep('overview');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#06140F] border border-[#134E39] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-[#ECFDF5] tracking-wide">
              ACCOUNTABILITY & DISCIPLINE RADAR
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#134E39] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {reviewStep === 'overview' ? (
            <>
              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#091F16] border border-[#134E39] flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-300/70 font-semibold uppercase">CURRENT STREAK</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-300">
                      {data.streak || 0} <span className="text-xs font-normal text-emerald-200">days</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#091F16] border border-[#134E39] flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-300/70 font-semibold uppercase">WEEKLY COMPLETION</div>
                    <div className="text-xl sm:text-2xl font-black text-[#10B981]">
                      {data.weeklyStats?.rate || 0}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-In Timetable Status */}
              <div className="p-3.5 rounded-xl bg-[#091F16] border border-[#134E39] space-y-2.5">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                  <span>DAILY CHECK-IN INTERVALS</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#06140F] border border-[#134E39]">
                    <span className="text-[10px] text-emerald-400 font-semibold block">MORNING</span>
                    <span className="font-mono text-[#ECFDF5] font-bold block my-1">
                      {data.morningCheckInTime || '08:30'}
                    </span>
                    <button
                      onClick={() => onTriggerCheckIn('morning')}
                      className="w-full mt-1 px-2 py-1 rounded bg-[#10B981]/20 hover:bg-[#10B981]/40 text-[#10B981] text-[10px] font-semibold transition-all"
                    >
                      Check In
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#06140F] border border-[#134E39]">
                    <span className="text-[10px] text-emerald-400 font-semibold block">MIDDAY</span>
                    <span className="font-mono text-[#ECFDF5] font-bold block my-1">
                      {data.middayCheckInTime || '13:00'}
                    </span>
                    <button
                      onClick={() => onTriggerCheckIn('midday')}
                      className="w-full mt-1 px-2 py-1 rounded bg-[#10B981]/20 hover:bg-[#10B981]/40 text-[#10B981] text-[10px] font-semibold transition-all"
                    >
                      Check In
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#06140F] border border-[#134E39]">
                    <span className="text-[10px] text-emerald-400 font-semibold block">EVENING</span>
                    <span className="font-mono text-[#ECFDF5] font-bold block my-1">
                      {data.eveningCheckInTime || '20:00'}
                    </span>
                    <button
                      onClick={() => setReviewStep('reviewing')}
                      className="w-full mt-1 px-2 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white text-[10px] font-semibold shadow transition-all"
                    >
                      Start Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Tasks with 3+ slips highlight banner */}
              {todayItems.some((it) => (it.slipCount || 0) >= 3 && !it.completed) && (
                <div className="p-3.5 rounded-xl bg-[#451A03]/50 border border-[#92400E] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>CHRONIC PROCRASTINATION WARNING</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    You have task(s) postponed 3 or more times. JARVIS does not accept vague intentions. Break them into concrete 5-minute actions or commit to an exact time right now.
                  </p>
                </div>
              )}

              {/* Direct Encouragement */}
              <div className="p-3 rounded-xl bg-[#0D281E] border border-[#134E39] text-xs text-emerald-200/90 leading-relaxed italic">
                "Discipline is choosing between what you want now and what you want most. Let's finish today strong."
              </div>
            </>
          ) : (
            /* Evening Review Flow */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#091F16] border border-[#134E39]">
                <h3 className="text-xs font-bold text-[#ECFDF5] mb-1">EVENING REVIEW // TODAY'S AUDIT</h3>
                <p className="text-xs text-emerald-300/70">
                  Select what you finished today. Any unfinished items must be rescheduled to a specific date & time.
                </p>
              </div>

              {todayItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-emerald-400/60">
                  No scheduled items recorded for today. Great clean slate!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {todayItems.map((item) => {
                    const isDone = completedIds.includes(item.id);
                    const isSlipDanger = (item.slipCount || 0) >= 3;

                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-[#091F16]/40 border-[#134E39]/40 opacity-70'
                            : isSlipDanger
                            ? 'bg-[#451A03]/40 border-[#92400E]'
                            : 'bg-[#091F16] border-[#134E39]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button
                            onClick={() => handleToggleCompleted(item.id)}
                            className="mt-0.5 text-[#10B981] shrink-0"
                          >
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 fill-[#10B981] text-white" />
                            ) : (
                              <XCircle className="w-4 h-4 text-slate-500 hover:text-emerald-400" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <span
                              className={`text-xs font-semibold block ${
                                isDone ? 'line-through text-slate-400' : 'text-[#ECFDF5]'
                              }`}
                            >
                              {item.title}
                            </span>

                            {isSlipDanger && !isDone && (
                              <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                <span>Postponed {item.slipCount} times! Must commit to specific time:</span>
                              </div>
                            )}

                            {/* Reschedule input for incomplete tasks */}
                            {!isDone && (
                              <div className="mt-2 grid grid-cols-2 gap-2 pt-1">
                                <div>
                                  <label className="text-[10px] text-emerald-300/80 block">Reschedule Date:</label>
                                  <input
                                    type="date"
                                    defaultValue={tomorrowStr}
                                    onChange={(e) =>
                                      handleSetReschedule(
                                        item.id,
                                        e.target.value,
                                        rescheduledMap[item.id]?.newTime
                                      )
                                    }
                                    className="w-full px-2 py-1 rounded bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-emerald-300/80 block">Specific Time:</label>
                                  <input
                                    type="time"
                                    defaultValue="09:00"
                                    onChange={(e) =>
                                      handleSetReschedule(
                                        item.id,
                                        rescheduledMap[item.id]?.newDate || tomorrowStr,
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-2 py-1 rounded bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5]"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#134E39]">
                <button
                  type="button"
                  onClick={() => setReviewStep('overview')}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Back to Overview
                </button>
                <button
                  type="button"
                  onClick={handleFinishReview}
                  className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white shadow-lg flex items-center gap-1.5"
                >
                  <span>Complete Review & Lock In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
