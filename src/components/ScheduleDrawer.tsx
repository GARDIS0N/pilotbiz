import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  AlertTriangle,
  Upload,
  X,
  CalendarCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { ScheduleItem } from '../types/jarvis';

interface ScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleItems: ScheduleItem[];
  onAddItem: (item: { title: string; date: string; time?: string; category: ScheduleItem['category'] }) => void;
  onUpdateItem: (item: ScheduleItem) => void;
  onDeleteItem: (id: string) => void;
  onRescheduleItem: (id: string, newDate: string, newTime?: string) => void;
  onToggleComplete: (id: string) => void;
  onBatchUpload: (items: any[]) => void;
}

export const ScheduleDrawer: React.FC<ScheduleDrawerProps> = ({
  isOpen,
  onClose,
  scheduleItems,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onRescheduleItem,
  onToggleComplete,
  onBatchUpload,
}) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('');
  const [newCategory, setNewCategory] = useState<ScheduleItem['category']>('work');

  // Reschedule state
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // File upload state
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredItems = scheduleItems.filter((item) => {
    if (filter === 'today') return item.date === todayStr || item.date === 'today';
    if (filter === 'completed') return item.completed;
    if (filter === 'upcoming') return !item.completed && item.date >= todayStr;
    return true;
  }).sort((a, b) => {
    const da = `${a.date} ${a.time || '00:00'}`;
    const db = `${b.date} ${b.time || '00:00'}`;
    return da.localeCompare(db);
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddItem({
      title: newTitle.trim(),
      date: newDate || todayStr,
      time: newTime || undefined,
      category: newCategory,
    });
    setNewTitle('');
    setNewTime('');
    setIsAdding(false);
  };

  const handleConfirmReschedule = (id: string) => {
    if (!rescheduleDate) return;
    onRescheduleItem(id, rescheduleDate, rescheduleTime || undefined);
    setReschedulingId(null);
    setRescheduleDate('');
    setRescheduleTime('');
  };

  // Parse uploaded files (.json, .csv, .ics, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(`Parsing ${file.name}...`);
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsedItems: any[] = [];

      try {
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(content);
          const rawItems = Array.isArray(json) ? json : json.items || [];
          for (const it of rawItems) {
            if (it.title) {
              parsedItems.push({
                id: `sch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                title: it.title,
                date: it.date || todayStr,
                time: it.time || '',
                category: it.category || 'work',
                completed: false,
                slipCount: 0,
                createdAt: new Date().toISOString(),
              });
            }
          }
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
          // Check for header
          const hasHeader = lines[0].toLowerCase().includes('title');
          const dataLines = hasHeader ? lines.slice(1) : lines;

          for (const line of dataLines) {
            const parts = line.split(',').map((p) => p.trim().replace(/^["']|["']$/g, ''));
            if (parts.length > 0 && parts[0]) {
              parsedItems.push({
                id: `sch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                title: parts[0],
                date: parts[1] && parts[1].match(/^\d{4}-\d{2}-\d{2}$/) ? parts[1] : todayStr,
                time: parts[2] || '',
                category: parts[3] || 'work',
                completed: false,
                slipCount: 0,
                createdAt: new Date().toISOString(),
              });
            }
          }
        } else if (file.name.endsWith('.ics')) {
          // Basic iCalendar parsing
          const events = content.split('BEGIN:VEVENT');
          for (let i = 1; i < events.length; i++) {
            const ev = events[i];
            const summaryMatch = ev.match(/SUMMARY:(.*?)(?:\r?\n)/);
            const dtStartMatch = ev.match(/DTSTART(?:;[^:]+)?:(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2}))?/);
            if (summaryMatch) {
              const title = summaryMatch[1].trim();
              let date = todayStr;
              let time = '';
              if (dtStartMatch) {
                date = `${dtStartMatch[1]}-${dtStartMatch[2]}-${dtStartMatch[3]}`;
                if (dtStartMatch[4]) {
                  time = `${dtStartMatch[4]}:${dtStartMatch[5]}`;
                }
              }
              parsedItems.push({
                id: `sch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                title,
                date,
                time,
                category: 'work',
                completed: false,
                slipCount: 0,
                createdAt: new Date().toISOString(),
              });
            }
          }
        } else {
          // Plain text lines: "2026-10-15 14:00 Team sync" or simply "Team sync"
          const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
          for (const line of lines) {
            const dateMatch = line.match(/^(\d{4}-\d{2}-\d{2})\s*(?:(\d{1,2}:\d{2})\s*)?(.*)$/);
            if (dateMatch) {
              parsedItems.push({
                id: `sch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                date: dateMatch[1],
                time: dateMatch[2] || '',
                title: dateMatch[3].trim() || 'Scheduled Item',
                category: 'work',
                completed: false,
                slipCount: 0,
                createdAt: new Date().toISOString(),
              });
            } else {
              parsedItems.push({
                id: `sch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                title: line.trim(),
                date: todayStr,
                time: '',
                category: 'work',
                completed: false,
                slipCount: 0,
                createdAt: new Date().toISOString(),
              });
            }
          }
        }

        if (parsedItems.length > 0) {
          onBatchUpload(parsedItems);
          setUploadStatus(`Successfully imported ${parsedItems.length} schedule item(s)!`);
          setTimeout(() => setUploadStatus(null), 4000);
        } else {
          setUploadStatus('Could not find valid schedule items in file.');
          setTimeout(() => setUploadStatus(null), 4000);
        }
      } catch (err: any) {
        setUploadStatus(`Error parsing file: ${err?.message || 'Invalid format'}`);
        setTimeout(() => setUploadStatus(null), 4000);
      }
    };

    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg h-full bg-[#06140F] border-l border-[#134E39] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#10B981]" />
            <h2 className="text-sm sm:text-base font-bold text-[#ECFDF5] tracking-wide">
              MONTHLY SCHEDULE & DIRECTIVES
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#ECFDF5] hover:bg-[#134E39] transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Controls: Filter tabs & Add / Upload actions */}
        <div className="p-4 border-b border-[#134E39] bg-[#06140F] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-[#091F16] p-1 rounded-xl border border-[#134E39]">
              {(['all', 'today', 'upcoming', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-2.5 py-1 text-xs rounded-lg capitalize font-medium transition-all ${
                    filter === tab
                      ? 'bg-[#10B981] text-white shadow'
                      : 'text-emerald-200/70 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.ics,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Upload schedule file (.json, .csv, .ics, .txt)"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-xs text-[#10B981] font-medium transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>

              <button
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-xs text-white font-semibold shadow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {uploadStatus && (
            <div className="p-2.5 rounded-lg bg-[#0D281E] border border-[#10B981]/40 text-xs text-[#ECFDF5] flex items-center gap-2 animate-fade-in">
              <Calendar className="w-4 h-4 text-[#10B981]" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Add Item Inline Form */}
          {isAdding && (
            <form onSubmit={handleCreateItem} className="p-3 rounded-xl bg-[#091F16] border border-[#134E39] space-y-2.5 animate-fade-in">
              <div>
                <label className="text-[11px] font-semibold text-emerald-300 block mb-1">EVENT TITLE</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Clinical Chemistry Exam Review"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5] focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-emerald-300 block mb-1">DATE</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5] focus:border-[#10B981] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-emerald-300 block mb-1">TIME (OPTIONAL)</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5] focus:border-[#10B981] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="px-2 py-1 rounded bg-[#06140F] border border-[#134E39] text-xs text-[#ECFDF5] focus:outline-none"
                >
                  <option value="work">Work / Business</option>
                  <option value="study">Study / Academic</option>
                  <option value="meeting">Meeting / Call</option>
                  <option value="health">Health / Gym</option>
                  <option value="personal">Personal</option>
                  <option value="general">General</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-xs font-semibold text-white"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Schedule List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-emerald-300/50 space-y-2">
              <Calendar className="w-10 h-10 text-[#10B981]/40" />
              <p className="text-sm font-semibold text-[#ECFDF5]">No schedule items found</p>
              <p className="text-xs text-emerald-400/60 max-w-xs">
                Upload a monthly schedule file or add items by chatting with JARVIS.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isToday = item.date === todayStr || item.date === 'today';
              const isSevereSlip = (item.slipCount || 0) >= 3;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all ${
                    item.completed
                      ? 'bg-[#091F16]/50 border-[#134E39]/40 opacity-60'
                      : isSevereSlip
                      ? 'bg-[#451A03]/40 border-[#92400E] shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                      : isToday
                      ? 'bg-[#0D281E] border-[#10B981]/50'
                      : 'bg-[#091F16] border-[#134E39]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => onToggleComplete(item.id)}
                      className="mt-0.5 text-[#10B981] hover:text-[#059669] shrink-0"
                      title={item.completed ? 'Mark incomplete' : 'Mark done'}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4 fill-[#10B981] text-white" />
                      ) : (
                        <Circle className="w-4 h-4 text-emerald-500/60" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold leading-snug ${
                            item.completed ? 'line-through text-slate-400' : 'text-[#ECFDF5]'
                          }`}
                        >
                          {item.title}
                        </span>

                        {isToday && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                            TODAY
                          </span>
                        )}

                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#134E39]/40 text-emerald-300 capitalize">
                          {item.category}
                        </span>
                      </div>

                      {/* Date & Time display */}
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-emerald-300/70 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#10B981]" />
                          {item.date}
                        </span>
                        {item.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#10B981]" />
                            {item.time}
                          </span>
                        )}
                      </div>

                      {/* Slip count callout */}
                      {isSevereSlip && !item.completed && (
                        <div className="mt-2 p-2 rounded-lg bg-[#92400E]/30 border border-[#F59E0B]/50 flex items-center gap-2 text-xs text-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                          <div>
                            <span className="font-bold">POSTPONED {item.slipCount} TIMES:</span> Break it down or commit to a specific time right now!
                          </div>
                        </div>
                      )}

                      {/* Reschedule inline drawer if open */}
                      {reschedulingId === item.id && (
                        <div className="mt-2.5 p-2.5 rounded-lg bg-[#06140F] border border-[#134E39] space-y-2">
                          <div className="text-[11px] font-semibold text-emerald-300">Reschedule To:</div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="date"
                              required
                              value={rescheduleDate}
                              onChange={(e) => setRescheduleDate(e.target.value)}
                              className="px-2 py-1 rounded bg-[#091F16] border border-[#134E39] text-xs text-[#ECFDF5]"
                            />
                            <input
                              type="time"
                              value={rescheduleTime}
                              onChange={(e) => setRescheduleTime(e.target.value)}
                              className="px-2 py-1 rounded bg-[#091F16] border border-[#134E39] text-xs text-[#ECFDF5]"
                            />
                          </div>
                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setReschedulingId(null)}
                              className="px-2 py-0.5 text-xs text-slate-400"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConfirmReschedule(item.id)}
                              className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-xs font-semibold text-white"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!item.completed && reschedulingId !== item.id && (
                        <button
                          onClick={() => {
                            setReschedulingId(item.id);
                            setRescheduleDate(item.date);
                            setRescheduleTime(item.time || '');
                          }}
                          className="px-2 py-1 rounded text-[11px] bg-[#091F16] hover:bg-[#134E39] text-[#10B981] border border-[#134E39] transition-all"
                          title="Reschedule item"
                        >
                          Reschedule
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-[#06140F] transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-[#134E39] bg-[#091F16] text-[11px] text-emerald-300/60 flex items-center justify-between">
          <span>Total items: {scheduleItems.length}</span>
          <span>Today: {scheduleItems.filter((i) => i.date === todayStr).length}</span>
        </div>
      </div>
    </div>
  );
};
