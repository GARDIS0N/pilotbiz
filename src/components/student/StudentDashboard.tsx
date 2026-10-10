import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile, Grade, User } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { TopGameHUD } from '../navigation/TopGameHUD.js';
import { AppNavigation, AppTab } from '../navigation/AppNavigation.js';
import { RafikiFloatingButton } from '../common/RafikiFloatingButton.js';
import { LearningPathView } from '../path/LearningPathView.js';
import { PracticeHubView } from '../practice/PracticeHubView.js';
import { DukaniShopView } from '../shop/DukaniShopView.js';
import { MeProfileView } from './MeProfileView.js';
import { CurriculumStrandsTab } from '../subject/CurriculumStrandsTab.js';
import { AITutorModal } from '../tutor/AITutorModal.js';

interface Props {
  student: StudentProfile;
  currentUser?: User | null;
  grades: Grade[];
  onStartMission: (missionId: string) => void;
  onStudentUpdated: (student: StudentProfile) => void;
  language?: 'en' | 'sw';
  onToggleLanguage?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onGradeChange?: (gradeId: string) => void;
  onLogout?: () => void;
  onOpenAuthModal?: () => void;
  onOpenTutor?: () => void;
}

export const StudentDashboard: React.FC<Props> = ({
  student,
  currentUser = null,
  grades,
  onStartMission,
  onStudentUpdated,
  language = 'en',
  onToggleLanguage,
  isMuted = false,
  onToggleMute,
  onGradeChange,
  onLogout,
  onOpenAuthModal,
  onOpenTutor
}) => {
  const [currentTab, setCurrentTab] = useState<AppTab>('LEARN');
  const [showFullMatrix, setShowFullMatrix] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const currentGrade = grades.find(g => g.id === student.gradeId) || grades[1] || grades[0];

  const handleOpenTutor = () => {
    if (onOpenTutor) {
      onOpenTutor();
    } else {
      setIsTutorOpen(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-gray-100 flex flex-col md:flex-row relative">
      {/* 1. Duolingo Navigation: Desktop Left Sidebar + Mobile Bottom Tab Bar */}
      <AppNavigation
        currentTab={currentTab}
        onSelectTab={tab => {
          setShowFullMatrix(false);
          setCurrentTab(tab);
        }}
        language={language}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />

      {/* 2. Main Content Canvas (offset by sidebar width on desktop) */}
      <div className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen pb-20 md:pb-8">
        {/* Top Strip HUD: Streak flame, Coins, Hearts, XP (Tap for explainers) */}
        <TopGameHUD
          student={student}
          onOpenShop={() => setCurrentTab('SHOP')}
          onOpenPractice={() => setCurrentTab('PRACTICE')}
        />

        {/* Tab View Container */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 pt-4">
          <AnimatePresence mode="wait">
            {currentTab === 'LEARN' && (
              <motion.div
                key="learn-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Secondary Toggle to View Full CBC Matrix / Rubric */}
                <div className="flex items-center justify-end px-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setShowFullMatrix(!showFullMatrix);
                    }}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-700 transition-all cursor-pointer"
                  >
                    <span>{showFullMatrix ? '🗺️ Winding Path' : '📊 Full Strands Rubric'}</span>
                  </button>
                </div>

                {showFullMatrix ? (
                  <CurriculumStrandsTab
                    gradeId={student.gradeId}
                    student={student}
                    onStartQuest={onStartMission}
                    language={language}
                  />
                ) : (
                  <LearningPathView
                    student={student}
                    gradeId={student.gradeId}
                    onStartQuest={onStartMission}
                    language={language}
                  />
                )}
              </motion.div>
            )}

            {currentTab === 'PRACTICE' && (
              <motion.div
                key="practice-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PracticeHubView
                  student={student}
                  onStartPractice={questId => onStartMission(questId || 'quest-g4-math-place-value')}
                  language={language}
                />
              </motion.div>
            )}

            {currentTab === 'SHOP' && (
              <motion.div
                key="shop-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DukaniShopView
                  student={student}
                  onStudentUpdated={onStudentUpdated}
                  language={language}
                />
              </motion.div>
            )}

            {currentTab === 'ME' && (
              <motion.div
                key="me-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <MeProfileView
                  student={student}
                  currentUser={currentUser}
                  grades={grades}
                  onGradeChange={newGradeId => {
                    if (onGradeChange) onGradeChange(newGradeId);
                  }}
                  language={language}
                  onToggleLanguage={onToggleLanguage || (() => {})}
                  isMuted={isMuted}
                  onToggleMute={onToggleMute || (() => {})}
                  onStudentUpdated={onStudentUpdated}
                  onLogout={onLogout || (() => {})}
                  onOpenAuthModal={onOpenAuthModal || (() => {})}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 3. Floating Rafiki AI Mascot Button (bottom right FAB) */}
      <RafikiFloatingButton
        onClick={handleOpenTutor}
        language={language}
      />

      {/* Internal AI Tutor Modal fallback */}
      <AITutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        studentName={student.fullName}
        gradeName={currentGrade.name}
      />
    </div>
  );
};
