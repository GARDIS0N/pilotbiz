import React, { useState, useEffect } from 'react';
import { SchoolClass, StudentProfile, Mission } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { getAvatar } from '../../utils/avatars.js';

export const TeacherDashboard: React.FC = () => {
  const [classes, setClasses] = useState<(SchoolClass & { students: StudentProfile[]; assignedMissions: Mission[] })[]>([]);
  const [selectedClassIdx, setSelectedClassIdx] = useState(0);
  const [allMissions, setAllMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedMissionToAssign, setSelectedMissionToAssign] = useState<string>('');
  const [assignSuccessToast, setAssignSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    loadTeacherData();
  }, []);

  const loadTeacherData = async () => {
    try {
      setLoading(true);
      const [cRes, mRes] = await Promise.all([
        cbeApi.getTeacherClasses(),
        cbeApi.getMissions()
      ]);
      setClasses(cRes.classes);
      setAllMissions(mRes.missions);
      if (mRes.missions.length > 0) {
        setSelectedMissionToAssign(mRes.missions[0].id);
      }
    } catch (err) {
      console.error('Failed to load teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    try {
      sound.playClick();
      await cbeApi.createClass(newClassName.trim(), 'grade-4');
      sound.playCorrect();
      setNewClassName('');
      setIsCreateClassOpen(false);
      loadTeacherData();
    } catch (err) {
      console.error('Error creating class:', err);
    }
  };

  const handleAssignMission = async () => {
    const activeClass = classes[selectedClassIdx];
    if (!activeClass || !selectedMissionToAssign) return;

    try {
      sound.playClick();
      await cbeApi.assignMission(activeClass.id, selectedMissionToAssign);
      sound.playCorrect();
      const m = allMissions.find(it => it.id === selectedMissionToAssign);
      setAssignSuccessToast(`Mission "${m?.title}" successfully assigned to ${activeClass.name}! 📚`);
      setIsAssignOpen(false);
      setTimeout(() => setAssignSuccessToast(null), 4000);
      loadTeacherData();
    } catch (err) {
      console.error('Error assigning mission:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-emerald-300">Loading teacher classroom portal...</p>
      </div>
    );
  }

  const activeClass = classes[selectedClassIdx];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Teacher Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
            <span>👨‍🏫 Jifuno Teacher Dashboard</span>
            <span>•</span>
            <span>Simba Primary Academy</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Mwalimu Ochieng's Classes
          </h2>
          <p className="text-xs md:text-sm text-blue-100/90 max-w-xl">
            Monitor Jifuno Class Progress, assign Jifuno missions, and support learners needing practice.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsCreateClassOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-blue-400/30 cursor-pointer"
          >
            + New Class
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsAssignOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer flex items-center gap-1.5"
          >
            <span>Assign a Jifuno Mission</span>
            <span>🎯</span>
          </button>
        </div>
      </div>

      {assignSuccessToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold text-center animate-fade-in">
          {assignSuccessToast}
        </div>
      )}

      {/* Class Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {classes.map((cls, idx) => (
          <button
            key={cls.id}
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedClassIdx(idx);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              idx === selectedClassIdx
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>🏫 {cls.name}</span>
            <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded text-blue-300 font-mono">
              Code: {cls.code}
            </span>
          </button>
        ))}
      </div>

      {activeClass && (
        <div className="space-y-6">
          {/* Class Analytics Overview Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-blue-900/60 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Enrolled Learners</span>
              <span className="text-2xl font-black text-white mt-1">{activeClass.students.length} Learners</span>
            </div>
            <div className="bg-slate-950/80 border border-blue-900/60 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Avg Mastery</span>
              <span className="text-2xl font-black text-emerald-400 mt-1">78%</span>
            </div>
            <div className="bg-slate-950/80 border border-blue-900/60 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Quests Assigned</span>
              <span className="text-2xl font-black text-amber-400 mt-1">{activeClass.assignedMissions.length}</span>
            </div>
            <div className="bg-slate-950/80 border border-blue-900/60 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Class Join Code</span>
              <span className="text-xl font-mono font-black text-blue-300 mt-1">{activeClass.code}</span>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="bg-slate-950/80 border border-emerald-900/60 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>📋</span>
                <span>Learner Roster & CBE Performance</span>
              </h3>
              <span className="text-xs text-emerald-400 font-bold">
                {activeClass.students.length} Registered
              </span>
            </div>

            <div className="space-y-3">
              {activeClass.students.map(st => {
                const av = getAvatar(st.avatar);

                return (
                  <div
                    key={st.id}
                    className="p-4 rounded-2xl border border-emerald-900/60 bg-emerald-950/30 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${av.bgGradient} flex items-center justify-center text-2xl shrink-0`}>
                        {av.emoji}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{st.fullName}</h4>
                        <p className="text-xs text-emerald-400">
                          Level {st.level} • {st.equippedTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                      <div className="text-center">
                        <span className="text-[10px] text-gray-400 uppercase block">XP</span>
                        <span className="text-emerald-300">{st.xp} ⚡</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-gray-400 uppercase block">Streak</span>
                        <span className="text-amber-400">{st.streakDays} Days 🔥</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-gray-400 uppercase block">Missions Done</span>
                        <span className="text-blue-300">{st.completedMissionIds.length} Cleared</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Quests List */}
          <div className="bg-slate-950/80 border border-blue-900/60 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>🎯</span>
              <span>Class Assigned Missions & Due Quests</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeClass.assignedMissions.map(m => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl border border-blue-800/60 bg-blue-950/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">
                      {m.difficulty} Challenge
                    </span>
                    <span className="text-xs text-amber-400 font-bold">+{m.xpReward} XP</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{m.title}</h4>
                  <p className="text-xs text-gray-300 leading-snug">{m.storyContext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Class */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleCreateClass}
            className="bg-slate-900 border-2 border-blue-500/50 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Create New CBE Class</h3>
              <button
                type="button"
                onClick={() => setIsCreateClassOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-1">
                Class Name (e.g., Grade 4 Chui, Grade 5 Simba)
              </label>
              <input
                type="text"
                required
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="e.g. Grade 4 Mara Stars"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateClassOpen(false)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                Create Class
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Assign Mission */}
      {isAssignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Assign Quest to {activeClass?.name}</h3>
              <button
                type="button"
                onClick={() => setIsAssignOpen(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-bold block mb-2">
                Select Curriculum Mission:
              </label>
              <select
                value={selectedMissionToAssign}
                onChange={(e) => setSelectedMissionToAssign(e.target.value)}
                className="w-full bg-slate-950 border border-emerald-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                {allMissions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.difficulty} - {m.xpReward} XP)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAssignOpen(false)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignMission}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
