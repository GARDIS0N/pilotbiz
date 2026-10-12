import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  X,
  Play,
  Calendar,
  Layers,
  Code2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ProjectItem, ProjectStatus } from '../types/jarvis';

interface ProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onCreateProject: (project: Partial<ProjectItem>) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
  onToggleTask: (projectId: string, taskId: string) => void;
  onAddTask: (projectId: string, title: string) => void;
  onAddDecision: (projectId: string, title: string, rationale?: string) => void;
  onSelectProjectForWork: (projectName: string) => void;
}

export const ProjectsDrawer: React.FC<ProjectsDrawerProps> = ({
  isOpen,
  onClose,
  projects,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onToggleTask,
  onAddTask,
  onAddDecision,
  onSelectProjectForWork,
}) => {
  const [filter, setFilter] = useState<'ALL' | ProjectStatus>('ALL');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // New project form state
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newNextAction, setNewNextAction] = useState('');
  const [newStatus, setNewStatus] = useState<ProjectStatus>('ACTIVE');

  // Per-project task input state
  const [newTaskTitle, setNewTaskTitle] = useState<{ [key: string]: string }>({});

  // Per-project decision input state
  const [decisionTitle, setDecisionTitle] = useState<{ [key: string]: string }>({});
  const [decisionRationale, setDecisionRationale] = useState<{ [key: string]: string }>({});
  const [addingDecisionFor, setAddingDecisionFor] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onCreateProject({
      name: newName.trim(),
      description: newDescription.trim(),
      status: newStatus,
      goals: newGoal.trim() ? [newGoal.trim()] : [],
      nextActions: newNextAction.trim() ? [newNextAction.trim()] : [],
      tasks: [],
      decisions: [],
      technologies: [],
      importantFiles: [],
    });

    setNewName('');
    setNewDescription('');
    setNewGoal('');
    setNewNextAction('');
    setIsCreating(false);
  };

  const handleAddTaskSubmit = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    const title = newTaskTitle[projectId];
    if (title && title.trim()) {
      onAddTask(projectId, title.trim());
      setNewTaskTitle((prev) => ({ ...prev, [projectId]: '' }));
    }
  };

  const handleAddDecisionSubmit = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    const title = decisionTitle[projectId];
    const rationale = decisionRationale[projectId];
    if (title && title.trim()) {
      onAddDecision(projectId, title.trim(), rationale?.trim());
      setDecisionTitle((prev) => ({ ...prev, [projectId]: '' }));
      setDecisionRationale((prev) => ({ ...prev, [projectId]: '' }));
      setAddingDecisionFor(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-full bg-[#06140F] border-l border-[#134E39] text-[#ECFDF5] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#134E39] bg-[#091F16] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#06140F] border border-[#134E39] text-[#10B981]">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-white">
                Projects Intelligence Hub
              </h2>
              <p className="text-[11px] text-emerald-300/70 font-mono">
                {projects.length} Initiatives • Long-Term Project Memory
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="px-2.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isCreating ? 'Cancel' : 'New Project'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-[#134E39] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-[#134E39] bg-[#06140F] flex items-center gap-2 text-xs overflow-x-auto">
          {(['ALL', 'ACTIVE', 'PLANNING', 'PAUSED', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all shrink-0 ${
                filter === status
                  ? 'bg-[#10B981] text-white font-bold shadow-sm'
                  : 'bg-[#091F16] text-emerald-300/80 hover:text-white border border-[#134E39]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Create Project Modal / Inline Form */}
          {isCreating && (
            <form
              onSubmit={handleCreateSubmit}
              className="p-4 rounded-xl bg-[#091F16] border border-[#10B981]/50 space-y-3 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#10B981]">
                  Initialize New Venture
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Phase 1 Architecture</span>
              </div>
              <div>
                <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Portfolio Website, AI Agent"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="High-level purpose and scope"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                    Primary Goal
                  </label>
                  <input
                    type="text"
                    placeholder="Key deliverable or outcome"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PLANNING">PLANNING</option>
                    <option value="PAUSED">PAUSED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-mono text-emerald-300/80 block mb-1">
                  Immediate Next Action
                </label>
                <input
                  type="text"
                  placeholder="Single concrete next physical step"
                  value={newNextAction}
                  onChange={(e) => setNewNextAction(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-xs text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-emerald-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-[#10B981] text-white text-xs font-bold hover:bg-[#059669] transition-all"
                >
                  Save Project
                </button>
              </div>
            </form>
          )}

          {/* Project List */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-emerald-300/60 font-mono text-xs">
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((p) => {
              const isExpanded = expandedProjectId === p.id;
              const completedTasksCount = (p.tasks || []).filter((t) => t.completed).length;
              const totalTasksCount = (p.tasks || []).length;
              const progressPct = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

              return (
                <div
                  key={p.id}
                  className="rounded-xl bg-[#091F16] border border-[#134E39] hover:border-[#10B981]/60 transition-all overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-3.5 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-sm text-white">{p.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            p.status === 'ACTIVE'
                              ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                              : p.status === 'PLANNING'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : p.status === 'PAUSED'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/80 leading-relaxed mb-2">
                        {p.description}
                      </p>

                      {/* Progress bar */}
                      {totalTasksCount > 0 && (
                        <div className="space-y-1 mb-2">
                          <div className="flex justify-between text-[10px] font-mono text-emerald-300/70">
                            <span>Tasks Progress</span>
                            <span>{completedTasksCount}/{totalTasksCount} ({progressPct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#06140F] rounded-full overflow-hidden border border-[#134E39]/50">
                            <div
                              className="h-full bg-[#10B981] rounded-full transition-all"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Immediate Next Action Pill */}
                      {p.nextActions && p.nextActions.length > 0 && (
                        <div className="p-2 rounded-lg bg-[#06140F] border border-[#134E39] flex items-center justify-between gap-2 mt-2">
                          <div className="text-[11px] truncate">
                            <span className="text-amber-400 font-mono font-bold mr-1">NEXT:</span>
                            <span className="text-[#ECFDF5]">{p.nextActions[0]}</span>
                          </div>
                          <button
                            onClick={() => {
                              onSelectProjectForWork(p.name);
                              onClose();
                            }}
                            title="Instruct JARVIS to focus on this action"
                            className="p-1 rounded bg-[#10B981] hover:bg-[#059669] text-white shrink-0"
                          >
                            <Play className="w-3 h-3 fill-white" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                        className="p-1.5 rounded-lg bg-[#06140F] border border-[#134E39] text-emerald-300 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
                      >
                        <span>{isExpanded ? 'Less' : 'Details'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details Section */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-[#134E39] bg-[#06140F]/60 space-y-3 animate-fade-in text-xs">
                      {/* Goals List */}
                      {p.goals && p.goals.length > 0 && (
                        <div>
                          <div className="text-[10px] font-mono text-[#10B981] font-bold uppercase mb-1">
                            Goals & Milestones
                          </div>
                          <ul className="space-y-1 text-emerald-100/90 text-xs">
                            {p.goals.map((g, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#10B981]">•</span>
                                <span>{g}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tasks Checkbox List */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#10B981] font-bold uppercase mb-1.5">
                          <span>Execution Tasks</span>
                          <span>{completedTasksCount}/{totalTasksCount}</span>
                        </div>
                        <div className="space-y-1.5 mb-2">
                          {(p.tasks || []).map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#091F16] border border-[#134E39]/60"
                            >
                              <button
                                onClick={() => onToggleTask(p.id, task.id)}
                                className="flex items-center gap-2 text-left flex-1"
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-emerald-400/60 shrink-0" />
                                )}
                                <span
                                  className={`text-xs ${
                                    task.completed ? 'line-through text-emerald-400/50' : 'text-[#ECFDF5]'
                                  }`}
                                >
                                  {task.title}
                                </span>
                              </button>
                              {task.due && (
                                <span className="text-[10px] font-mono text-emerald-400/70 shrink-0">
                                  {task.due}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Quick Task Add Input */}
                        <form
                          onSubmit={(e) => handleAddTaskSubmit(p.id, e)}
                          className="flex gap-2"
                        >
                          <input
                            type="text"
                            placeholder="+ Add task to project..."
                            value={newTaskTitle[p.id] || ''}
                            onChange={(e) =>
                              setNewTaskTitle((prev) => ({ ...prev, [p.id]: e.target.value }))
                            }
                            className="flex-1 px-2.5 py-1 rounded-lg bg-[#091F16] border border-[#134E39] text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-[#10B981]"
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1 rounded-lg bg-[#10B981] text-white text-xs font-semibold hover:bg-[#059669]"
                          >
                            Add
                          </button>
                        </form>
                      </div>

                      {/* Decisions Log */}
                      {p.decisions && p.decisions.length > 0 && (
                        <div>
                          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
                            Decisions Log
                          </div>
                          <div className="space-y-1.5">
                            {p.decisions.map((dec) => (
                              <div
                                key={dec.id}
                                className="p-2 rounded-lg bg-[#091F16] border border-[#134E39] text-[11px]"
                              >
                                <div className="flex justify-between font-bold text-white mb-0.5">
                                  <span>{dec.title}</span>
                                  <span className="text-emerald-400/60 font-mono text-[10px]">{dec.date}</span>
                                </div>
                                {dec.rationale && (
                                  <p className="text-emerald-300/70 italic text-[10px]">{dec.rationale}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech stack & files */}
                      {(p.technologies?.length || p.importantFiles?.length) && (
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          {p.technologies?.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#091F16] border border-[#134E39] text-[10px] font-mono text-emerald-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {p.importantFiles?.map((f, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#091F16] border border-[#134E39] text-[10px] font-mono text-amber-300"
                            >
                              📄 {f}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Card Footer Actions */}
                      <div className="pt-2 border-t border-[#134E39] flex items-center justify-between">
                        <button
                          onClick={() => {
                            if (window.confirm(`Permanently delete project "${p.name}"?`)) {
                              onDeleteProject(p.id);
                            }
                          }}
                          className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Project</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectProjectForWork(p.name);
                            onClose();
                          }}
                          className="px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Focus On This Now</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
