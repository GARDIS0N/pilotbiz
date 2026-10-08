import React, { useState, useEffect } from 'react';
import { User, StudentProfile, Grade } from './types/cbe.js';
import { cbeApi } from './services/cbeApi.js';
import { sound } from './utils/soundEffects.js';
import { StudentDashboard } from './components/student/StudentDashboard.js';
import { ParentDashboard } from './components/parent/ParentDashboard.js';
import { TeacherDashboard } from './components/teacher/TeacherDashboard.js';
import { AdminDashboard } from './components/admin/AdminDashboard.js';
import { LearningSessionModal } from './components/session/LearningSessionModal.js';
import { AuthModal } from './components/auth/AuthModal.js';
import { AITutorModal } from './components/tutor/AITutorModal.js';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-4');
  const [loading, setLoading] = useState(true);

  // Sound mute state
  const [isMuted, setIsMuted] = useState(false);

  // Active Mission Session Modal
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);

  // Auth / Role modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Global AI Tutor Modal
  const [isGlobalTutorOpen, setIsGlobalTutorOpen] = useState(false);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      setLoading(true);
      const [authRes, gRes] = await Promise.all([
        cbeApi.getMe(),
        cbeApi.getGrades()
      ]);

      setCurrentUser(authRes.user);
      if (authRes.studentProfile) {
        setStudentProfile(authRes.studentProfile);
        setSelectedGradeId(authRes.studentProfile.gradeId);
      }
      setGrades(gRes.grades);
    } catch (err) {
      console.error('Failed to initialize Jifuno app:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const handleGradeChange = (newGradeId: string) => {
    sound.playClick();
    setSelectedGradeId(newGradeId);
    if (studentProfile) {
      const updated = { ...studentProfile, gradeId: newGradeId };
      setStudentProfile(updated);
    }
  };

  const handleMissionCompleted = () => {
    // Refresh student data
    if (studentProfile) {
      cbeApi.getStudentStats(studentProfile.id).then(res => {
        setStudentProfile(res.student);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4 text-emerald-400">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <h1 className="text-xl font-black text-white">Jifuno</h1>
          <p className="text-xs text-emerald-300">Learn. Play. Level Up.</p>
        </div>
      </div>
    );
  }

  const currentGrade = grades.find(g => g.id === selectedGradeId) || grades[1] || grades[0];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/60 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/60">
            🇰🇪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-black tracking-tight text-white">
                Jifuno
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                CBC
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-medium hidden sm:block">
              Learn. Play. Level Up.
            </p>
          </div>
        </div>

        {/* Center: Grade Selector */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-emerald-900/60 p-1 rounded-2xl">
          {grades.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => handleGradeChange(g.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                g.id === selectedGradeId
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Right Controls: Role Switcher & Sound Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-700 text-gray-300 flex items-center justify-center text-sm cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {/* Socratic Tutor Floating Companion Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsGlobalTutorOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-300 font-bold text-xs cursor-pointer"
          >
            <span>🦉</span>
            <span>Rafiki AI</span>
          </button>

          {/* Role Pill Switcher */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsAuthModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-900/70 to-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
          >
            <span>
              {currentUser?.role === 'STUDENT'
                ? '🎓'
                : currentUser?.role === 'PARENT'
                ? '👨‍👩‍👧'
                : currentUser?.role === 'TEACHER'
                ? '👨‍🏫'
                : '⚙️'}
            </span>
            <span className="hidden xs:inline">
              {currentUser?.role === 'STUDENT'
                ? 'Student'
                : currentUser?.role === 'PARENT'
                ? 'Parent'
                : currentUser?.role === 'TEACHER'
                ? 'Teacher'
                : 'Admin'}
            </span>
            <span className="text-[10px] text-emerald-400">▼</span>
          </button>
        </div>
      </header>

      {/* Main View Router based on active role */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        {currentUser?.role === 'STUDENT' && studentProfile ? (
          <StudentDashboard
            student={studentProfile}
            grades={grades}
            onStartMission={(mId) => {
              setActiveMissionId(mId);
            }}
            onStudentUpdated={(st) => setStudentProfile(st)}
          />
        ) : currentUser?.role === 'PARENT' ? (
          <ParentDashboard />
        ) : currentUser?.role === 'TEACHER' ? (
          <TeacherDashboard />
        ) : currentUser?.role === 'ADMIN' ? (
          <AdminDashboard />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">Please log in or select a demo account.</p>
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-emerald-950 bg-slate-950/80 px-4 py-4 text-center text-xs text-gray-500 space-y-1">
        <p>
          🇰🇪 <strong className="text-gray-400">Jifuno</strong> • Learn. Play. Level Up. • Designed for Kenyan Competency-Based Education (CBE / CBC).
        </p>
        <p className="text-[11px] text-gray-600">
          Curriculum-aligned practice for Mathematics, Science & Tech, Kiswahili, and English. Content is strictly designed for educational practice and child safety.
        </p>
      </footer>

      {/* Learning Session Modal */}
      {activeMissionId && studentProfile && (
        <LearningSessionModal
          isOpen={Boolean(activeMissionId)}
          missionId={activeMissionId}
          studentId={studentProfile.id}
          studentName={studentProfile.fullName}
          gradeName={currentGrade?.name}
          onClose={() => setActiveMissionId(null)}
          onMissionCompleted={handleMissionCompleted}
        />
      )}

      {/* Auth / Role Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        grades={grades}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          initApp();
        }}
      />

      {/* Global Socratic AI Tutor Modal */}
      <AITutorModal
        isOpen={isGlobalTutorOpen}
        onClose={() => setIsGlobalTutorOpen(false)}
        studentName={studentProfile?.fullName || 'Learner'}
        gradeName={currentGrade?.name}
      />
    </div>
  );
}
export default App;
