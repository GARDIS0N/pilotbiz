import React, { useState, useEffect } from 'react';
import { User, StudentProfile, Grade } from './types/cbe.js';
import { cbeApi } from './services/cbeApi.js';
import { sound } from './utils/soundEffects.js';
import { StudentDashboard } from './components/student/StudentDashboard.js';
import { ParentDashboard } from './components/parent/ParentDashboard.js';
import { TeacherDashboard } from './components/teacher/TeacherDashboard.js';
import { AdminDashboard } from './components/admin/AdminDashboard.js';
import { DuolingoLessonModal } from './components/session/DuolingoLessonModal.js';
import { AuthModal } from './components/auth/AuthModal.js';
import { AITutorModal } from './components/tutor/AITutorModal.js';
import { LoginPage } from './components/auth/LoginPage.js';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow.js';
import {
  isReturningUser,
  getPersistedUserProfile,
  savePersistedUserProfile,
  clearPersistedUserProfile,
  markOnboardingCompleted
} from './services/onboardingStorage.js';

const getPersistedHearts = (fallback = 5): number => {
  try {
    const val = localStorage.getItem('jifuno_hearts');
    if (val !== null) {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 5) return parsed;
    }
  } catch (e) {}
  return fallback;
};

const DEFAULT_STUDENT_USER: User = {
  id: 'user-student-amina',
  name: 'Amina Kiprono',
  email: 'amina@jifuno.ke',
  role: 'STUDENT',
  avatar: 'cheetah',
  createdAt: '2026-09-01T08:00:00Z',
  studentProfileId: 'student-amina-01'
};

const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'student-amina-01',
  userId: 'user-student-amina',
  fullName: 'Amina Kiprono',
  gradeId: 'grade-4',
  schoolName: 'Simba Primary Academy',
  county: 'Nakuru',
  avatar: 'cheetah',
  level: 3,
  xp: 420,
  coins: 185,
  hearts: getPersistedHearts(5),
  maxHearts: 5,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakFrozen: false,
  unlockedWorldIds: ['world-math-kingdom', 'world-science-lab', 'world-word-quest'],
  completedMissionIds: ['mission-01-seedlings'],
  badges: ['badge-seedling-starter'],
  equippedTitle: 'Savanna Explorer',
  parentUserId: 'user-parent-mama',
  classId: 'class-g4-simba'
};

const DEFAULT_GRADES: Grade[] = [
  { id: 'grade-3', code: 'G3', name: 'Grade 3', levelGroup: 'LOWER_PRIMARY', description: 'Foundational literacy, numeracy and environmental awareness.' },
  { id: 'grade-4', code: 'G4', name: 'Grade 4', levelGroup: 'UPPER_PRIMARY', description: 'Upper primary transition focusing on core CBE competencies and practical inquiry.' },
  { id: 'grade-5', code: 'G5', name: 'Grade 5', levelGroup: 'UPPER_PRIMARY', description: 'Intermediate problem-solving, science, technology, agriculture, and languages.' },
  { id: 'grade-6', code: 'G6', name: 'Grade 6', levelGroup: 'UPPER_PRIMARY', description: 'Preparation for Junior School assessment with advanced competency mastery.' }
];

export function App() {
  const [currentView, setCurrentView] = useState<'DASHBOARD' | 'LOGIN' | 'ONBOARDING'>(() => {
    return isReturningUser() ? 'DASHBOARD' : 'ONBOARDING';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (isReturningUser()) {
      const persisted = getPersistedUserProfile();
      return persisted.user || DEFAULT_STUDENT_USER;
    }
    return null;
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    if (isReturningUser()) {
      const persisted = getPersistedUserProfile();
      return persisted.studentProfile || DEFAULT_STUDENT_PROFILE;
    }
    return null;
  });

  const [grades, setGrades] = useState<Grade[]>(DEFAULT_GRADES);
  const [selectedGradeId, setSelectedGradeId] = useState<string>(() => {
    if (isReturningUser()) {
      const persisted = getPersistedUserProfile();
      return persisted.studentProfile?.gradeId || 'grade-4';
    }
    return 'grade-4';
  });
  const [loading, setLoading] = useState(false);

  // Sound mute state
  const [isMuted, setIsMuted] = useState(false);

  // Persistent Interface Language state (Default: 'en' English)
  const [uiLanguage, setUiLanguage] = useState<'en' | 'sw'>(() => {
    try {
      const stored = localStorage.getItem('jifuno_ui_lang');
      if (stored === 'en' || stored === 'sw') return stored;
    } catch {}
    return 'en';
  });

  const handleToggleLanguage = () => {
    const next = uiLanguage === 'en' ? 'sw' : 'en';
    setUiLanguage(next);
    try {
      localStorage.setItem('jifuno_ui_lang', next);
    } catch {}
  };

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

      if (isReturningUser()) {
        const persisted = getPersistedUserProfile();
        const activeUser = persisted.user || authRes.user;
        const activeStudent = persisted.studentProfile || authRes.studentProfile;

        setCurrentUser(activeUser);
        if (activeStudent) {
          const hearts = getPersistedHearts(activeStudent.hearts ?? 5);
          const fullStudent = { ...activeStudent, hearts };
          setStudentProfile(fullStudent);
          setSelectedGradeId(fullStudent.gradeId);
        }
      } else {
        // First-time or midway visitor: Keep on OnboardingFlow
        setCurrentUser(null);
        setStudentProfile(null);
        setCurrentView('ONBOARDING');
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
      if (currentUser) {
        savePersistedUserProfile(currentUser, updated);
      }
    }
  };

  const handleCompleteOnboarding = (user: User, profile: StudentProfile) => {
    setCurrentUser(user);
    setStudentProfile(profile);
    setSelectedGradeId(profile.gradeId);
    savePersistedUserProfile(user, profile);
    markOnboardingCompleted();
    setCurrentView('DASHBOARD');
  };

  const handleMissionCompleted = (result?: any) => {
    if (studentProfile) {
      const missionId = result?.missionId || activeMissionId;
      const completedIds = studentProfile.completedMissionIds || [];
      const updatedMissions = missionId && !completedIds.includes(missionId)
        ? [...completedIds, missionId]
        : completedIds;

      const updatedStudent: StudentProfile = {
        ...studentProfile,
        xp: (studentProfile.xp || 0) + (result?.xpEarned || 25),
        coins: (studentProfile.coins || 0) + (result?.coinsEarned || 10),
        completedMissionIds: updatedMissions
      };

      setStudentProfile(updatedStudent);
      if (currentUser) {
        savePersistedUserProfile(currentUser, updatedStudent);
      }

      // Sync with API if possible
      cbeApi.getStudentStats(studentProfile.id).then(res => {
        if (res.student) {
          const hearts = getPersistedHearts(res.student.hearts ?? updatedStudent.hearts ?? 5);
          const syncedMissions = Array.from(new Set([...(res.student.completedMissionIds || []), ...updatedMissions]));
          const synced = { ...res.student, completedMissionIds: syncedMissions, hearts };
          setStudentProfile(synced);
          if (currentUser) {
            savePersistedUserProfile(currentUser, synced);
          }
        }
      }).catch(() => {});
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

  // 1. Full-screen Duolingo onboarding flow for new visitors or midway resumers
  if (currentView === 'ONBOARDING') {
    return (
      <OnboardingFlow
        onCompleteOnboarding={handleCompleteOnboarding}
        onOpenLogin={() => setCurrentView('LOGIN')}
        language={uiLanguage}
      />
    );
  }

  // 2. Full-screen login page
  if (currentView === 'LOGIN') {
    return (
      <LoginPage
        currentUser={currentUser}
        grades={grades}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          markOnboardingCompleted();
          if (user.studentProfileId) {
            cbeApi.getStudentStats(user.studentProfileId).then(res => {
              if (res.student) {
                setStudentProfile(res.student);
                setSelectedGradeId(res.student.gradeId);
                savePersistedUserProfile(user, res.student);
              }
            }).catch(() => {});
          }
          setCurrentView('DASHBOARD');
        }}
        onCancel={() => {
          if (isReturningUser()) {
            setCurrentView('DASHBOARD');
          } else {
            setCurrentView('ONBOARDING');
          }
        }}
      />
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

        {/* Center: Grade Selector (ONLY shown for adults managing multiple grades) */}
        {currentUser?.role !== 'STUDENT' && (
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
        )}

        {/* Right Controls */}
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

          {/* Role Access: Learner views NEVER show admin/teacher/parent pills */}
          {currentUser?.role === 'STUDENT' ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-600 text-gray-300 hover:text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
              title="Parent & Teacher Area"
            >
              <span>👨‍👩‍👧</span>
              <span className="hidden sm:inline">Parent Area</span>
            </button>
          ) : (
            <>
              {/* Log In Page Trigger Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCurrentView('LOGIN');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-500 text-gray-300 hover:text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
                title="Open Full Log In Page"
              >
                <span>🔑</span>
                <span className="hidden sm:inline">Log In</span>
              </button>

              {/* Adult Role Pill Switcher */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-900/70 to-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
              >
                <span>
                  {currentUser?.role === 'PARENT'
                    ? '👨‍👩‍👧'
                    : currentUser?.role === 'TEACHER'
                    ? '👨‍🏫'
                    : '⚙️'}
                </span>
                <span className="hidden xs:inline">
                  {currentUser?.role === 'PARENT'
                    ? 'Parent'
                    : currentUser?.role === 'TEACHER'
                    ? 'Teacher'
                    : 'Admin'}
                </span>
                <span className="text-[10px] text-emerald-400">▼</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main View Router based on active role */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
        {currentUser?.role === 'STUDENT' && studentProfile ? (
          <StudentDashboard
            student={studentProfile}
            currentUser={currentUser}
            grades={grades}
            onStartMission={(mId) => {
              setActiveMissionId(mId);
            }}
            onStudentUpdated={(st) => {
              setStudentProfile(st);
              if (currentUser) {
                savePersistedUserProfile(currentUser, st);
              }
            }}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onGradeChange={handleGradeChange}
            onLogout={() => {
              clearPersistedUserProfile();
              setCurrentUser(null);
              setStudentProfile(null);
              setCurrentView('LOGIN');
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenTutor={() => setIsGlobalTutorOpen(true)}
            language={uiLanguage}
            onToggleLanguage={handleToggleLanguage}
          />
        ) : currentUser?.role === 'PARENT' ? (
          <ParentDashboard />
        ) : currentUser?.role === 'TEACHER' ? (
          <TeacherDashboard />
        ) : currentUser?.role === 'ADMIN' ? (
          <AdminDashboard currentUser={currentUser} />
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

      {/* Duolingo Gamified CBE Lesson Modal */}
      {activeMissionId && studentProfile && (
        <DuolingoLessonModal
          isOpen={Boolean(activeMissionId)}
          missionId={activeMissionId}
          studentId={studentProfile.id}
          studentName={studentProfile.fullName}
          initialHearts={studentProfile.hearts ?? 5}
          onHeartsChange={(newHearts) => {
            setStudentProfile(prev => prev ? { ...prev, hearts: newHearts } : null);
          }}
          onClose={() => setActiveMissionId(null)}
          onMissionCompleted={handleMissionCompleted}
          language={uiLanguage}
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
          markOnboardingCompleted();
          initApp();
        }}
        onOpenLoginPage={() => setCurrentView('LOGIN')}
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
