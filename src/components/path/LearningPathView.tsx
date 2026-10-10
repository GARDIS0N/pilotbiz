import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import {
  getCurriculumGrade,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest
} from '../../data/curriculum/index.js';
import { sound } from '../../utils/soundEffects.js';
import { CurriculumIcon } from '../common/CurriculumIcon.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import { recommendNextLesson } from '../../utils/learningEngine.js';

interface Props {
  student: StudentProfile;
  gradeId: string;
  onStartQuest: (questId: string) => void;
  language?: 'en' | 'sw';
}

// Friendly speech bubble generation from Rafiki the Owl Mascot
function getRafikiSpeech(
  studentName: string,
  subjectTitle: string,
  isSwahili: boolean,
  questTitle: string
): string {
  const firstName = studentName.split(' ')[0] || 'Learner';
  if (isSwahili) {
    return `Jambo ${firstName}! Karibu kwenye ${subjectTitle}. Leo tutajifunza "${questTitle}". Uko tayari kushinda?`;
  }
  return `Jambo ${firstName}! Ready for ${subjectTitle}? Let's explore "${questTitle}" together!`;
}

export const LearningPathView: React.FC<Props> = ({
  student,
  gradeId,
  onStartQuest,
  language = 'en'
}) => {
  const reducedMotion = useReducedMotionPreference();
  const grade = useMemo(() => {
    return getCurriculumGrade(gradeId) || getCurriculumGrade('grade-4')!;
  }, [gradeId]);

  // Subject selection: default to first subject (e.g. Mathematics)
  const subjects = grade.subjects;
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    return subjects[0]?.id || 'g4-math';
  });

  const activeSubject = useMemo(() => {
    return subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  }, [subjects, selectedSubjectId]);

  // Flatten all quests in the active subject to calculate next uncompleted quest
  const subjectQuests = useMemo(() => {
    const list: {
      quest: CurriculumQuest;
      strand: CurriculumStrand;
      subStrand: CurriculumSubStrand;
      isCompleted: boolean;
      stars: number;
    }[] = [];

    activeSubject?.strands.forEach(strand => {
      strand.subStrands.forEach(subStrand => {
        subStrand.quests.forEach(quest => {
          const isCompleted = Boolean(student.completedMissionIds?.includes(quest.id));
          list.push({
            quest,
            strand,
            subStrand,
            isCompleted,
            stars: isCompleted ? 3 : 0
          });
        });
      });
    });

    return list;
  }, [activeSubject, student.completedMissionIds]);

  // Learning Engine: Authoritative Next Lesson Recommendation
  const recommendedResult = useMemo(() => {
    return recommendNextLesson({
      gradeId,
      completedLessonIds: student.completedMissionIds,
      preferredSubjectId: selectedSubjectId
    });
  }, [gradeId, student.completedMissionIds, selectedSubjectId]);

  // Find the authoritative NEXT lesson node (highlighted on the learning path)
  const nextLessonItem = useMemo(() => {
    const matched = subjectQuests.find(q => q.quest.id === recommendedResult.questId);
    if (matched) return matched;
    const uncompleted = subjectQuests.find(q => !q.isCompleted);
    return uncompleted || subjectQuests[0] || null;
  }, [subjectQuests, recommendedResult.questId]);

  // Selected or active strand (unit) for the short lesson path
  const [selectedStrandId, setSelectedStrandId] = useState<string | null>(null);

  const activeStrand = useMemo(() => {
    if (selectedStrandId) {
      const found = activeSubject?.strands.find(s => s.id === selectedStrandId);
      if (found) return found;
    }
    return nextLessonItem?.strand || activeSubject?.strands[0];
  }, [activeSubject, selectedStrandId, nextLessonItem]);

  // Short path nodes (3-5 nodes for the active strand)
  const strandQuests = useMemo(() => {
    if (!activeStrand) return [];
    const list: {
      quest: CurriculumQuest;
      subStrand: CurriculumSubStrand;
      isCompleted: boolean;
      isNext: boolean;
    }[] = [];

    activeStrand.subStrands.forEach(subStrand => {
      subStrand.quests.forEach(quest => {
        const isCompleted = Boolean(student.completedMissionIds?.includes(quest.id));
        const isNext = nextLessonItem?.quest.id === quest.id;
        list.push({
          quest,
          subStrand,
          isCompleted,
          isNext
        });
      });
    });

    return list;
  }, [activeStrand, student.completedMissionIds, nextLessonItem]);

  const handleSelectSubject = (subjId: string) => {
    sound.playClick();
    setSelectedSubjectId(subjId);
    setSelectedStrandId(null);
  };

  const handlePrimaryContinue = () => {
    if (nextLessonItem) {
      sound.playClick();
      onStartQuest(nextLessonItem.quest.id);
    }
  };

  // Sine wave offsets for the short winding node path
  const OFFSETS = [0, -36, 36, -20, 20];

  const nextQuestTitle = activeSubject?.id?.includes('kisw')
    ? nextLessonItem?.quest.title.sw || 'Kujifunza'
    : nextLessonItem?.quest.title.en || 'Learning';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-left py-2 px-3 sm:px-0">
      {/* 1. Large Subject Icon Tiles (Mathematics, English, Kiswahili, Science) */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
          {language === 'sw' ? 'Chagua Somo' : 'Learning Areas'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {subjects.map(subj => {
            const isSelected = subj.id === selectedSubjectId;

            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => handleSelectSubject(subj.id)}
                className={`p-3.5 sm:p-4 rounded-3xl border-2 flex flex-col items-center justify-center text-center gap-2.5 transition-all cursor-pointer min-h-[86px] active:scale-95 shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'bg-slate-900 shadow-xl scale-[1.02] ring-2 ring-emerald-400/80 border-emerald-400'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                }`}
                style={{
                  borderColor: isSelected ? subj.color : undefined,
                  backgroundColor: isSelected ? `${subj.color}25` : undefined
                }}
                aria-pressed={isSelected}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0"
                  style={{
                    backgroundColor: `${subj.color}30`,
                    color: subj.color
                  }}
                >
                  <CurriculumIcon name={subj.icon} size={24} />
                </div>
                <span className="text-xs sm:text-sm font-black text-white leading-tight">
                  {language === 'sw' ? subj.title.sw : subj.title.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Rafiki Owl Mascot Guide (Speech Bubble Instead of Badges) */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="flex items-center gap-3.5 p-4 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-3xl shrink-0 shadow-lg select-none animate-pulse">
          🦉
        </div>
        <div className="relative flex-1 bg-slate-950 border border-amber-400/40 rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm text-amber-100 font-medium shadow-inner">
          {/* Arrow pointing to Rafiki */}
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 border-r-slate-950" />
          <p className="leading-snug">
            "{getRafikiSpeech(
              student.fullName,
              language === 'sw' ? activeSubject?.title.sw : activeSubject?.title.en,
              language === 'sw',
              nextQuestTitle
            )}"
          </p>
        </div>
      </motion.div>

      {/* 3. ONE PRIMARY ACTION: Single Large Continue Button */}
      {nextLessonItem && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrimaryContinue}
          className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base sm:text-lg shadow-2xl shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-between gap-4 min-h-[60px] border-2 border-emerald-300/40"
        >
          <div className="flex items-center gap-3.5 text-left min-w-0">
            <span className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center text-xl shrink-0">
              ▶
            </span>
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-wider font-extrabold opacity-85 block truncate">
                {language === 'sw' ? 'ENDELEA NA SOMO' : 'CONTINUE LESSON'}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-950 block truncate">
                {nextQuestTitle}
              </span>
            </div>
          </div>
          <span className="text-2xl font-black shrink-0">➔</span>
        </motion.button>
      )}

      {/* 4. Unit Selector (Tabs for the Strands if more than one exists) */}
      {activeSubject && activeSubject.strands.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {activeSubject.strands.map((strand, sIdx) => {
            const isCur = strand.id === activeStrand?.id;
            return (
              <button
                key={strand.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedStrandId(strand.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  isCur
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                Unit {sIdx + 1}: {language === 'sw' ? strand.title.sw : strand.title.en}
              </button>
            );
          })}
        </div>
      )}

      {/* 5. Short Focused Path of Lesson Nodes (Active Unit: 3-5 Nodes) */}
      {activeStrand && (
        <div className="space-y-4 pt-2">
          {/* Unit Header Card */}
          <div
            className="p-4 sm:p-5 rounded-3xl border-2 shadow-xl flex items-center justify-between gap-4"
            style={{
              backgroundColor: '#020617',
              borderColor: `${activeSubject.color}80`,
              backgroundImage: `radial-gradient(ellipse at top left, ${activeSubject.color}20, transparent 70%)`
            }}
          >
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-slate-950 inline-block"
                style={{ backgroundColor: activeSubject.color }}
              >
                {language === 'sw' ? 'KITENGO' : 'UNIT'}{' '}
                {activeSubject.strands.findIndex(s => s.id === activeStrand.id) + 1}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {language === 'sw' ? activeStrand.title.sw : activeStrand.title.en}
              </h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                {language === 'sw' ? activeStrand.description.sw : activeStrand.description.en}
              </p>
            </div>

            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border"
              style={{
                backgroundColor: `${activeSubject.color}25`,
                borderColor: activeSubject.color
              }}
            >
              <CurriculumIcon name={activeStrand.icon} size={24} />
            </div>
          </div>

          {/* Short Path Nodes Column */}
          <div className="relative py-4 flex flex-col items-center">
            {strandQuests.map((item, idx) => {
              const { quest, isCompleted, isNext } = item;
              const isAvailable = isCompleted || isNext;
              const offsetPx = OFFSETS[idx % OFFSETS.length];

              return (
                <div
                  key={quest.id}
                  className="relative my-3 flex flex-col items-center"
                  style={{ transform: `translateX(${offsetPx}px)` }}
                >
                  {/* Interactive Node Button */}
                  <button
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      sound.playClick();
                      onStartQuest(quest.id);
                    }}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center text-2xl font-black transition-all cursor-pointer shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 active:scale-95 ${
                      isCompleted
                        ? 'bg-amber-400 text-slate-950 border-4 border-amber-300 shadow-amber-500/25 hover:scale-105'
                        : isNext
                        ? 'bg-emerald-500 text-slate-950 border-4 border-emerald-300 shadow-emerald-500/40 animate-pulse hover:scale-105'
                        : 'bg-slate-800 text-gray-500 border-4 border-slate-700 cursor-not-allowed opacity-60'
                    }`}
                    aria-label={`${quest.title.en} - ${isCompleted ? 'Completed' : isNext ? 'Current' : 'Locked'}`}
                  >
                    {isCompleted ? (
                      <span className="text-xl">⭐</span>
                    ) : isNext ? (
                      <span className="text-xl">▶</span>
                    ) : (
                      <span className="text-base">🔒</span>
                    )}

                    {/* Star badge for completed nodes */}
                    {isCompleted && (
                      <div className="absolute -bottom-2 flex items-center justify-center gap-0.5 bg-slate-900 border border-amber-400 rounded-full px-1.5 py-0.5 shadow-sm">
                        <span className="text-[9px] text-amber-400">⭐⭐⭐</span>
                      </div>
                    )}
                  </button>

                  {/* Clean Single-Language Node Label */}
                  <div className="text-center mt-2 max-w-[130px]">
                    <span className="text-[11px] font-bold text-gray-200 line-clamp-1 block">
                      {activeSubject?.id?.includes('kisw') ? quest.title.sw : quest.title.en}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* End of Unit Milestone Chest */}
            <div className="relative my-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-3xl shadow-lg">
                🏆
              </div>
              <span className="text-[10px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
                {language === 'sw' ? 'Taji la Kitengo' : 'Unit Milestone'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Savanna Quest (Positioned BELOW the Lesson Path) */}
      <div className="p-5 rounded-3xl bg-slate-950 border-2 border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🦁</span>
            <div>
              <h4 className="text-sm font-black text-amber-300">
                {language === 'sw' ? 'Safari ya Savanna: Safari ya Baraka' : 'Savanna Quest: Baraka in Kongowea'}
              </h4>
              <p className="text-xs text-gray-300">
                {language === 'sw' ? 'Changamoto ya Bonasi ya Kenya' : 'Kenyan Real-World Practice Challenge'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded-lg border border-amber-600/50">
            Bonus
          </span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {language === 'sw'
            ? 'Tumia ujuzi uliyojifunza kumsaidia Baraka kwenye soko la Kongowea kupima bidhaa na kupata sarafu za bonasi!'
            : "Put your skills to work helping Baraka measure fresh produce at Kongowea Market and earn bonus Shilingi coins!"}
        </p>

        <button
          type="button"
          onClick={handlePrimaryContinue}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-md min-h-[50px] flex items-center justify-center gap-2 active:scale-98"
        >
          <span>{language === 'sw' ? 'ANZA SAFARI YA SAVANNA' : 'START SAVANNA QUEST'}</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
};
