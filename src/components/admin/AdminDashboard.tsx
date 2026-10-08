import React, { useState, useEffect } from 'react';
import { Question, ContentStatus, QuestionType, DifficultyLevel } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';

export const AdminDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // New Question Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [newScenario, setNewScenario] = useState('');
  const [newType, setNewType] = useState<QuestionType>('MULTIPLE_CHOICE');
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>('EASY');
  const [newHint, setNewHint] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newStatus, setNewStatus] = useState<ContentStatus>('REVIEW');
  const [newOptionsText, setNewOptionsText] = useState('Option 1, Option 2, Option 3, Option 4');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const res = await cbeApi.getAdminQuestions();
      setQuestions(res.questions);
    } catch (err) {
      console.error('Failed to load admin questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (qId: string, status: ContentStatus) => {
    try {
      sound.playClick();
      await cbeApi.updateQuestionStatus(qId, status);
      setQuestions(prev => prev.map(q => q.id === qId ? { ...q, contentStatus: status } : q));
    } catch (err) {
      console.error('Error changing question status:', err);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sound.playClick();
      const opts = newOptionsText.split(',').map((t, idx) => ({
        id: `opt-${idx + 1}`,
        text: t.trim()
      }));

      await cbeApi.createAdminQuestion({
        prompt: newPrompt.trim(),
        storyScenario: newScenario.trim(),
        type: newType,
        difficulty: newDifficulty,
        subStrandId: 'substrand-multiplication',
        options: opts,
        correctOptionId: 'opt-2',
        socraticHint: newHint.trim(),
        explanation: newExplanation.trim(),
        kenyanCulturalContext: newContext.trim(),
        sourceType: 'AI_PRACTICE',
        contentStatus: newStatus
      });

      sound.playCorrect();
      setIsCreateOpen(false);
      resetForm();
      loadQuestions();
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  const resetForm = () => {
    setNewPrompt('');
    setNewScenario('');
    setNewHint('');
    setNewExplanation('');
    setNewContext('');
  };

  const filteredQuestions = statusFilter === 'ALL'
    ? questions
    : questions.filter(q => q.contentStatus === statusFilter);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 border-2 border-purple-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            <span>⚙️ Jifuno Administration</span>
            <span>•</span>
            <span>Kenyan CBE Repository</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Jifuno Content Management
          </h2>
          <p className="text-xs md:text-sm text-purple-100/90 max-w-xl">
            Review AI practice questions, approve Jifuno Curriculum items, and curate culturally grounded questions for learners.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsCreateOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-xs md:text-sm shadow-lg cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <span>+ Add Curriculum Question</span>
        </button>
      </div>

      {/* Pipeline Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
            statusFilter === 'ALL' ? 'border-purple-400 bg-purple-950/60' : 'border-slate-800 bg-slate-950/60'
          }`}
        >
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Questions</span>
          <span className="text-2xl font-black text-white mt-1">{questions.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('PUBLISHED')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
            statusFilter === 'PUBLISHED' ? 'border-emerald-400 bg-emerald-950/60' : 'border-slate-800 bg-slate-950/60'
          }`}
        >
          <span className="text-[10px] text-emerald-400 font-bold uppercase block">Published Live</span>
          <span className="text-2xl font-black text-emerald-300 mt-1">
            {questions.filter(q => q.contentStatus === 'PUBLISHED').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('REVIEW')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
            statusFilter === 'REVIEW' ? 'border-amber-400 bg-amber-950/60' : 'border-slate-800 bg-slate-950/60'
          }`}
        >
          <span className="text-[10px] text-amber-400 font-bold uppercase block">In Review / AI Drafts</span>
          <span className="text-2xl font-black text-amber-300 mt-1">
            {questions.filter(q => q.contentStatus === 'REVIEW' || q.contentStatus === 'DRAFT').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('APPROVED')}
          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
            statusFilter === 'APPROVED' ? 'border-blue-400 bg-blue-950/60' : 'border-slate-800 bg-slate-950/60'
          }`}
        >
          <span className="text-[10px] text-blue-400 font-bold uppercase block">Approved</span>
          <span className="text-2xl font-black text-blue-300 mt-1">
            {questions.filter(q => q.contentStatus === 'APPROVED').length}
          </span>
        </button>
      </div>

      {/* Questions Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span>📚</span>
            <span>Question Bank & Validation Workflow ({filteredQuestions.length})</span>
          </h3>
          <span className="text-xs text-gray-400 font-medium">Filter: {statusFilter}</span>
        </div>

        {loading ? (
          <p className="text-xs text-gray-400 py-8 text-center">Loading questions...</p>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map(q => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-800 text-gray-300 px-2 py-0.5 rounded font-mono">
                      {q.type}
                    </span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-bold">
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Source: {q.sourceType}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={q.contentStatus}
                    onChange={(e) => handleStatusChange(q.id, e.target.value as ContentStatus)}
                    className="bg-slate-950 border border-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <h4 className="text-sm font-bold text-white">{q.prompt}</h4>
                {q.storyScenario && (
                  <p className="text-xs text-amber-200/90 italic">"{q.storyScenario}"</p>
                )}

                <div className="text-[11px] text-gray-400 space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-emerald-400 font-bold">Socratic Hint: </span>
                    {q.socraticHint}
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold">Explanation: </span>
                    {q.explanation}
                  </div>
                  <div>
                    <span className="text-blue-400 font-bold">Kenyan Cultural Context: </span>
                    {q.kenyanCulturalContext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create Question */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <form
            onSubmit={handleCreateQuestion}
            className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-4 my-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Create New Curriculum Question</h3>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as QuestionType)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="SCENARIO">Kenyan Scenario</option>
                  <option value="TRUE_FALSE">True / False</option>
                  <option value="FILL_BLANK">Fill In The Blank</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-300 font-bold block mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="ADVANCED">ADVANCED</option>
                  <option value="MASTERY">MASTERY</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Question Prompt</label>
              <textarea
                required
                rows={2}
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="e.g. Amina has 4 rows of 5 seedlings..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Story Scenario (Kenyan context)</label>
              <input
                type="text"
                value={newScenario}
                onChange={(e) => setNewScenario(e.target.value)}
                placeholder="e.g. In Nakuru County, Amina prepares the shamba bed before the rains."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Options (Comma-separated)</label>
              <input
                type="text"
                value={newOptionsText}
                onChange={(e) => setNewOptionsText(e.target.value)}
                placeholder="Option A, Option B, Option C, Option D"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Socratic Hint (Guidance)</label>
              <input
                type="text"
                required
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                placeholder="e.g. Think of 4 groups of 5. Skip count by 5!"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Explanation</label>
              <input
                type="text"
                required
                value={newExplanation}
                onChange={(e) => setNewExplanation(e.target.value)}
                placeholder="e.g. 4 rows multiplied by 5 seedlings equals 20 seedlings in total."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">Kenyan Cultural Context</label>
              <input
                type="text"
                value={newContext}
                onChange={(e) => setNewContext(e.target.value)}
                placeholder="e.g. Sukuma wiki is grown widely across all 47 counties."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs cursor-pointer"
              >
                Save & Add to Pipeline
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
