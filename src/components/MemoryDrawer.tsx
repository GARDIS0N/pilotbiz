import React, { useState } from 'react';
import {
  Brain,
  Plus,
  Trash2,
  Search,
  X,
  Tag,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { MemoryItem, MemoryCategory } from '../types/jarvis';

interface MemoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memories: MemoryItem[];
  onAddMemory: (content: string, category: MemoryCategory, importance: 'high' | 'medium' | 'low') => void;
  onDeleteMemory: (id: string) => void;
}

export const MemoryDrawer: React.FC<MemoryDrawerProps> = ({
  isOpen,
  onClose,
  memories,
  onAddMemory,
  onDeleteMemory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAdding, setIsAdding] = useState(false);

  // New Memory Form
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('preference');
  const [newImportance, setNewImportance] = useState<'high' | 'medium' | 'low'>('high');

  if (!isOpen) return null;

  const filteredMemories = memories.filter((m) => {
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch =
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.tags && m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    onAddMemory(newContent.trim(), newCategory, newImportance);
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg h-full bg-[#06140F] border-l border-[#134E39] text-[#ECFDF5] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#06140F] border border-[#134E39] text-[#10B981]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-white">
                Long-Term Memory Bank
              </h2>
              <p className="text-[11px] text-emerald-300/70 font-mono">
                {memories.length} Stored Profile Directives & Preferences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-2.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAdding ? 'Cancel' : 'Add Memory'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-[#134E39] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-[#134E39] bg-[#06140F] space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search persistent memories by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#091F16] border border-[#134E39] text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-[#10B981]"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
            {['ALL', 'preference', 'instruction', 'goal', 'habit', 'fact'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#10B981] text-white font-bold'
                    : 'bg-[#091F16] text-emerald-300/70 hover:text-white border border-[#134E39]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Add Memory Inline Form */}
          {isAdding && (
            <form
              onSubmit={handleAddSubmit}
              className="p-3.5 rounded-xl bg-[#091F16] border border-[#10B981]/50 space-y-3 animate-fade-in"
            >
              <div className="text-xs font-bold uppercase text-[#10B981]">
                Record Direct User Instruction
              </div>
              <div>
                <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                  Memory Content *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. User prefers concise answers, never use corporate jargon, always prioritize high-yield study topics..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                  >
                    <option value="preference">Preference</option>
                    <option value="instruction">Instruction</option>
                    <option value="goal">Goal</option>
                    <option value="habit">Habit</option>
                    <option value="fact">Fact</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                    Importance
                  </label>
                  <select
                    value={newImportance}
                    onChange={(e) => setNewImportance(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 rounded-lg text-xs text-emerald-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-[#10B981] text-white text-xs font-bold hover:bg-[#059669]"
                >
                  Commit to Memory
                </button>
              </div>
            </form>
          )}

          {/* Memories List */}
          {filteredMemories.length === 0 ? (
            <div className="text-center py-12 text-emerald-300/60 font-mono text-xs">
              No memories match your query.
            </div>
          ) : (
            filteredMemories.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-[#091F16] border border-[#134E39] hover:border-[#10B981]/50 transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs text-[#ECFDF5] leading-relaxed flex-1 whitespace-pre-wrap">
                    {m.content}
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Forget and prune this memory from persistent storage?')) {
                        onDeleteMemory(m.id);
                      }
                    }}
                    title="Prune memory"
                    className="opacity-40 group-hover:opacity-100 p-1 rounded hover:bg-rose-900/30 text-rose-400 transition-all shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Metadata Tags */}
                <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[#134E39]/50">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded bg-[#06140F] border border-[#134E39] text-[#10B981] font-bold uppercase">
                      {m.category}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#06140F] border border-[#134E39] text-emerald-400">
                      {m.source}
                    </span>
                    {m.importance === 'high' && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">
                        PRIORITY
                      </span>
                    )}
                  </div>
                  <span className="text-emerald-400/50">
                    {new Date(m.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
