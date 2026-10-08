import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Clock, Plus, Calendar } from 'lucide-react';
import { ScheduleItem } from '../types/jarvis';

interface TodayCardProps {
  items: ScheduleItem[];
  onToggleComplete: (id: string) => void;
  onOpenSchedule: () => void;
}

export const TodayCard: React.FC<TodayCardProps> = ({ items, onToggleComplete, onOpenSchedule }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full bg-[#091F16]/90 border border-[#134E39] rounded-2xl mb-2 overflow-hidden transition-all shadow-md select-none">
      {/* Header bar (always visible) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#134E39]/30 transition-colors"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#ECFDF5] tracking-wide">Today</span>
            <span className="text-[11px] font-mono text-emerald-400">
              ({completedCount}/{totalCount})
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-xs h-1.5 rounded-full bg-[#06140F] border border-[#134E39] overflow-hidden ml-2">
            <div
              className="h-full bg-[#10B981] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-[11px] font-mono text-[#10B981] font-bold">
            {progressPercent}%
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="p-1 text-emerald-400 hover:text-white transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-3.5 pb-3 pt-1 border-t border-[#134E39]/60 space-y-2 animate-fade-in">
          {items.length === 0 ? (
            <div className="py-2 text-center text-xs text-emerald-400/60 flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>No scheduled tasks for today. Clean slate!</span>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                    item.completed
                      ? 'bg-[#06140F]/50 text-slate-400'
                      : 'bg-[#06140F] text-[#ECFDF5] border border-[#134E39]/50'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                    <button
                      onClick={() => onToggleComplete(item.id)}
                      className="text-[#10B981] hover:text-[#059669] shrink-0"
                      title={item.completed ? 'Mark incomplete' : 'Mark done'}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4 fill-[#10B981] text-white" />
                      ) : (
                        <Circle className="w-4 h-4 text-emerald-500/60" />
                      )}
                    </button>
                    <span className={`truncate ${item.completed ? 'line-through text-slate-500' : ''}`}>
                      {item.title}
                    </span>
                  </div>

                  {item.time && (
                    <span className="text-[10px] font-mono text-emerald-400/70 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-end pt-1">
            <button
              onClick={onOpenSchedule}
              className="text-[11px] text-[#10B981] hover:underline font-medium flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Manage Full Schedule</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
