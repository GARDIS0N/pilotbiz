import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  StudentProfile,
  GameWorld,
  Mission,
  Grade,
  LearningArea,
  Strand,
  SubStrand,
  Lesson,
  Achievement
} from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { getAvatar } from '../../utils/avatars.js';
import { WorldMap } from '../game/WorldMap.js';
import { ShopModal } from '../game/ShopModal.js';
import { AITutorModal } from '../tutor/AITutorModal.js';
import { AnimatedCounter } from '../common/AnimatedCounter.js';
import { HeartHUD } from '../common/HeartHUD.js';
import { OutOfHeartsModal } from '../common/OutOfHeartsModal.js';
import { StreakFlame } from '../common/StreakFlame.js';
import { HeroQuestCard } from './HeroQuestCard.js';
import { DashboardSkeleton } from '../common/SkeletonLoader.js';
import {
  useReducedMotionPreference,
  setReducedMotionPreference,
  springTransition
} from '../../utils/motion.js';

interface Props {
  student: StudentProfile;
  grades: Grade[];
  onStartMission: (missionId: string) => void;
  onStudentUpdated: (student: StudentProfile) => void;
}

type TabMode = 'WORLD_MAP' | 'CURRICULUM' | 'ACHIEVEMENTS' | 'DAILY_CHALLENGE';

export const StudentDashboard: React.FC<Props> = ({
  student,
  grades,
  onStartMission,
  onStudentUpdated
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [tab, setTab] = useState<TabMode>('WORLD_MAP');
  const [isLoading, setIsLoading] = useState(true);
  const [worlds, setWorlds] = useState<GameWorld[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [achievements, setAchievements] = useState<(Achievement & { isUnlocked: boolean })[]>([]);
  const [learningAreas, setLearningAreas] = useState<LearningArea[]>([]);
  const [selectedLearningArea, setSelectedLearningArea] = useState<LearningArea | null>(null);
  const [strands, setStrands] = useState<Strand[]>([]);
  const [subStrands, setSubStrands] = useState<SubStrand[]>([]);
  const [selectedSubStrand, setSelectedSubStrand] = useState<SubStrand | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Modals
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isOutOfHeartsOpen, setIsOutOfHeartsOpen] = useState(false);

  const avatarInfo = getAvatar(student.avatar);
  const currentGrade = grades.find(g => g.id === student.gradeId) || grades[1] || grades[0];

  useEffect(() => {
    loadDashboardData();
  }, [student.id, student.gradeId]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [wRes, mRes, sRes, laRes] = await Promise.all([
        cbeApi.getWorlds(),
        cbeApi.getMissions(),
        cbeApi.getStudentStats(student.id),
        cbeApi.getLearningAreas(student.gradeId)
      ]);

      setWorlds(wRes.worlds);
      setMissions(mRes.missions);
      setAchievements(sRes.achievements);
      setLearningAreas(laRes.learningAreas);
      if (laRes.learningAreas.length > 0) {
        handleSelectLearningArea(laRes.learningAreas[0]);
      }
    } catch (err) {
      console.error('Failed to load student dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLearningArea = async (la: LearningArea) => {
    setSelectedLearningArea(la);
    try {
      const stRes = await cbeApi.getStrands(la.id);
      setStrands(stRes.strands);

      if (stRes.strands.length > 0) {
        const ssRes = await cbeApi.getSubStrands(stRes.strands[0].id);
        setSubStrands(ssRes.subStrands);
        if (ssRes.subStrands.length > 0) {
          handleSelectSubStrand(ssRes.subStrands[0]);
        }
      } else {
        setSubStrands([]);
        setLessons([]);
      }
    } catch (err) {
      console.error('Error fetching strands:', err);
    }
  };

  const handleSelectSubStrand = async (ss: SubStrand) => {
    setSelectedSubStrand(ss);
    try {
      const lesRes = await cbeApi.getLessons(ss.id);
      setLessons(lesRes.lessons);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  // Determine active/recommended next mission
  const activeMission = missions.find(m => !student.completedMissionIds.includes(m.id)) || missions[0];

  const handleQuickPractice = () => {
    // Starts the first foundational mission for practice to restore a heart
    sound.playClick();
    onStartMission(missions[0]?.id || 'mission-01-seedlings');
  };

  if (isLoading && worlds.length === 0) {
    return <DashboardSkeleton />;
  }

  const tabList: { key: TabMode; label: string; icon: string }[] = [
    { key: 'WORLD_MAP', label: 'Jifuno World', icon: '🗺️' },
    { key: 'CURRICULUM', label: 'Curriculum Strands', icon: '📚' },
    { key: 'ACHIEVEMENTS', label: 'Badges & Honors', icon: '🏅' },
    { key: 'DAILY_CHALLENGE', label: 'Daily Challenge', icon: '🎯' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Gamification Status Bar */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : springTransition}
        className="bg-slate-950/80 border border-emerald-900/60 rounded-3xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl"
      >
        {/* Left: Avatar & Profile summary */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${avatarInfo.bgGradient} p-0.5 shadow-lg flex items-center justify-center text-3xl shrink-0`}
          >
            {avatarInfo.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-white text-base md:text-lg">{student.fullName}</h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                {currentGrade?.name || 'Grade 4'}
              </span>
            </div>
            <p className="text-xs text-emerald-400/90 font-medium">
              {student.equippedTitle} • {student.schoolName} ({student.county})
            </p>
          </div>
        </div>

        {/* Right: Game Vitals (Hearts, Streak, Coins, Level/XP, Dukani, Motion Toggle) */}
        <div className="flex items-center gap-2.5 md:gap-3 flex-wrap">
          {/* Hearts with Cracked Loss & Countdown */}
          <HeartHUD
            hearts={student.hearts}
            maxHearts={student.maxHearts}
            onOpenOutOfHearts={() => setIsOutOfHeartsOpen(true)}
            onQuickPractice={handleQuickPractice}
          />

          {/* Daily Streak Flame with Tiers & Week Calendar */}
          <StreakFlame
            streakDays={student.streakDays}
            streakFrozen={student.streakFrozen}
          />

          {/* Coins with Animated Count-up and Flying deltas */}
          <div className="flex items-center gap-1.5 bg-yellow-950/40 border border-yellow-500/50 px-3 py-1.5 rounded-2xl text-xs font-black text-yellow-300">
            <span>🪙</span>
            <AnimatedCounter
              value={student.coins}
              badgeColor="bg-amber-400 text-slate-950"
            />
          </div>

          {/* Level & XP with Animated Counter */}
          <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/40 px-3 py-1.5 rounded-2xl text-xs font-black text-emerald-300">
            <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-lg text-[10px] font-black">
              LVL {student.level}
            </span>
            <AnimatedCounter
              value={student.xp}
              suffix=" XP"
              badgeColor="bg-emerald-400 text-slate-950"
            />
          </div>

          {/* Dukani Shop Button */}
          <motion.button
            type="button"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            onClick={() => {
              sound.playClick();
              setIsShopOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
          >
            <span>🏬</span>
            <span className="hidden sm:inline">Dukani</span>
          </motion.button>

          {/* In-App Reduce Motion Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setReducedMotionPreference(!reducedMotion);
            }}
            title={reducedMotion ? 'Enable animations' : 'Reduce motion for low-end phones'}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors cursor-pointer ${
              reducedMotion
                ? 'bg-amber-950/80 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-white'
            }`}
            aria-label="Toggle reduced motion"
          >
            {reducedMotion ? '⚡' : '🍃'}
          </button>
        </div>
      </motion.div>

      {/* Hero Quest Card with Illustrated Kenyan Market Scene & Stepped Progress */}
      {activeMission && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { ...springTransition, delay: 0.05 }}
        >
          <HeroQuestCard
            mission={activeMission}
            onStartMission={onStartMission}
            currentStep={3}
            totalSteps={5}
          />
        </motion.div>
      )}

      {/* Navigation Tabs with Animated Sliding Underline */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { delay: 0.1 }}
        className="flex items-center justify-between border-b border-emerald-900/60 pb-1"
      >
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar relative">
          {tabList.map(item => {
            const isActive = tab === item.key;

            return (
              <motion.button
                key={item.key}
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
                onClick={() => {
                  sound.playClick();
                  setTab(item.key);
                }}
                className={`relative px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive ? 'text-white font-black' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>

                {/* Animated sliding underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    transition={reducedMotion ? { duration: 0 } : springTransition}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* AI Tutor Launcher */}
        <div className="shrink-0 pl-2">
          <motion.button
            type="button"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            onClick={() => setIsTutorOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/60 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>🦉</span>
            <span>AI Tutor Rafiki</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tab 1: World Map */}
      {tab === 'WORLD_MAP' && (
        <motion.div
          key="world-map"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : springTransition}
        >
          <WorldMap
            worlds={worlds}
            missions={missions}
            student={student}
            onSelectMission={onStartMission}
          />
        </motion.div>
      )}

      {/* Tab 2: Structured Curriculum Explorer */}
      {tab === 'CURRICULUM' && (
        <motion.div
          key="curriculum"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : springTransition}
          className="space-y-6"
        >
          {/* Learning Areas Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {learningAreas.map(la => {
              const isSelected = selectedLearningArea?.id === la.id;

              return (
                <button
                  key={la.id}
                  type="button"
                  onClick={() => handleSelectLearningArea(la)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950 text-white shadow-lg shadow-emerald-950/50'
                      : 'border-emerald-900/60 bg-emerald-950/30 text-gray-300 hover:border-emerald-700'
                  }`}
                >
                  <span className="text-2xl">
                    {la.icon === 'calculator'
                      ? '🧮'
                      : la.icon === 'microscope'
                      ? '🔬'
                      : la.icon === 'book-open'
                      ? '📖'
                      : la.icon === 'feather'
                      ? '🪶'
                      : la.icon === 'sprout'
                      ? '🌱'
                      : '🧭'}
                  </span>
                  <span className="text-xs font-bold block truncate w-full">{la.name}</span>
                  <span className="text-[10px] text-emerald-400/80 block truncate w-full">
                    {la.swahiliName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Learning Area Strands & Lessons */}
          {selectedLearningArea && (
            <div className="bg-slate-950/80 border border-emerald-900/60 rounded-3xl p-6 space-y-6">
              <div className="border-b border-emerald-900/60 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">{selectedLearningArea.name}</h3>
                  <p className="text-xs text-gray-400">{selectedLearningArea.description}</p>
                </div>
                <span className="text-xs text-emerald-400 font-bold">
                  {strands.length} Strands Available
                </span>
              </div>

              {/* Strands List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strands.map(str => (
                  <div
                    key={str.id}
                    className="p-4 rounded-2xl border border-emerald-800/60 bg-emerald-950/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-emerald-200">{str.title}</h4>
                      <span className="text-[10px] text-amber-400 font-mono">{str.code}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{str.description}</p>

                    {/* Sub-strands under this strand */}
                    <div className="pt-2 border-t border-emerald-900/60 space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        CBE Sub-strands & Practical Lessons:
                      </span>
                      {subStrands
                        .filter(ss => ss.strandId === str.id)
                        .map(ss => (
                          <div
                            key={ss.id}
                            className="bg-slate-950/80 p-3 rounded-xl border border-emerald-900/60 flex items-center justify-between gap-3"
                          >
                            <div>
                              <h5 className="text-xs font-bold text-white">{ss.title}</h5>
                              <p className="text-[10px] text-emerald-400">{ss.cbeCompetency}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                const m = missions.find(item => item.subStrandId === ss.id);
                                if (m) {
                                  onStartMission(m.id);
                                } else {
                                  onStartMission(missions[0].id);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
                            >
                              Practice ➔
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tab 3: Badges & Achievements */}
      {tab === 'ACHIEVEMENTS' && (
        <motion.div
          key="achievements"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : springTransition}
          className="space-y-6"
        >
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black text-white">Safari Badges & Honors</h3>
            <p className="text-xs text-gray-400">
              Master competencies, maintain streaks, and collect all Kenya CBE honors!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  ach.isUnlocked
                    ? 'border-amber-400/70 bg-gradient-to-br from-amber-950/40 to-emerald-950/40 shadow-lg'
                    : 'border-slate-800 bg-slate-950/50 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    ach.isUnlocked
                      ? 'bg-amber-400/20 border border-amber-400'
                      : 'bg-slate-800 text-gray-500'
                  }`}
                >
                  {ach.icon === 'sprout'
                    ? '🌱'
                    : ach.icon === 'coins'
                    ? '🪙'
                    : ach.icon === 'pie-chart'
                    ? '🫓'
                    : ach.icon === 'truck'
                    ? '🚐'
                    : ach.icon === 'trophy'
                    ? '🏆'
                    : ach.icon === 'flame'
                    ? '🔥'
                    : '🏅'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs md:text-sm font-bold text-white">{ach.title}</h4>
                    {ach.isUnlocked && (
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 leading-snug">{ach.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold pt-1">
                    <span>+{ach.xpReward} XP ⚡</span>
                    <span>+{ach.coinReward} Coins 🪙</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 4: Daily Challenge */}
      {tab === 'DAILY_CHALLENGE' && (
        <motion.div
          key="daily-challenge"
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : springTransition}
          className="bg-gradient-to-br from-amber-950/60 via-slate-900 to-emerald-950/60 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 text-center max-w-xl mx-auto shadow-2xl"
        >
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg">
            🎯
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Today's Kenyan CBE Challenge
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              The Great Market Shopper Challenge
            </h3>
            <p className="text-xs md:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Solve 3 real-world Kenyan currency transactions without using a calculator to keep your daily streak alive and earn double coins!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 flex items-center justify-around text-xs font-bold text-amber-300">
            <div>
              <span className="text-gray-400 block text-[10px]">REWARD</span>
              <span>+60 XP ⚡</span>
            </div>
            <div className="h-6 w-[1px] bg-amber-500/30" />
            <div>
              <span className="text-gray-400 block text-[10px]">BONUS</span>
              <span>+40 Coins 🪙</span>
            </div>
            <div className="h-6 w-[1px] bg-amber-500/30" />
            <div>
              <span className="text-gray-400 block text-[10px]">STREAK</span>
              <span>+1 Day 🔥</span>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={reducedMotion ? {} : { scale: 1.03 }}
            whileTap={reducedMotion ? {} : { scale: 0.96 }}
            onClick={() => {
              sound.playClick();
              onStartMission('mission-02-market-shillings');
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-base shadow-xl transition-all cursor-pointer"
          >
            START DAILY CHALLENGE 🚀
          </motion.button>
        </motion.div>
      )}

      {/* Power-up Shop Modal */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        student={student}
        onStudentUpdated={onStudentUpdated}
      />

      {/* Friendly Out of Hearts Modal */}
      <OutOfHeartsModal
        isOpen={isOutOfHeartsOpen}
        onClose={() => setIsOutOfHeartsOpen(false)}
        onQuickPractice={handleQuickPractice}
        onOpenShop={() => setIsShopOpen(true)}
        coins={student.coins}
      />

      {/* Floating AI Tutor Modal */}
      <AITutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        studentName={student.fullName}
        gradeName={currentGrade?.name}
      />
    </div>
  );
};
