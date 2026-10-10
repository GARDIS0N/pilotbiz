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

interface Props {
  student: StudentProfile;
  gradeId: string;
  onStartQuest: (questId: string) => void;
  language?: 'en' | 'sw';
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

  // Flatten all quests in the active subject to calculate sequence & next quest
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

  // Find the current NEXT lesson (first uncompleted or first available)
  const nextLessonItem = useMemo(() => {
    const uncompleted = subjectQuests.find(q => !q.isCompleted);
    return uncompleted || subjectQuests[0] || null;
  }, [subjectQuests]);

  const handleSelectSubject = (subjId: string) => {
    sound.playClick();
    setSelectedSubjectId(subjId);
  };

  const handlePrimaryContinue = () => {
    if (nextLessonItem) {
      sound.playClick();
      onStartQuest(nextLessonItem.quest.id);
    }
  };

  // Precomputed winding offset array in pixels (sine wave feel)
  const OFFSETS = [0, -42, -58, -25, 25, 58, 42, 0];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-left py-2 px-3 sm:px-0">
      {/* 1. Horizontal Subject Chip Bar */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max px-1">
          {subjects.map(subj => {
            const isSelected = subj.id === selectedSubjectId;

            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => handleSelectSubject(subj.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg scale-102'
                    : 'bg-slate-950/80 text-gray-400 hover:text-gray-200 hover:bg-slate-900 border-transparent'
                }`}
                style={{
                  borderColor: isSelected ? subj.color : 'transparent',
                  backgroundColor: isSelected ? `${subj.color}20` : undefined
                }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ color: subj.color }}
                >
                  <CurriculumIcon name={subj.icon} size={16} />
                </div>
                <span>{language === 'sw' ? subj.title.sw : subj.title.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ONE PRIMARY ACTION: Big Duolingo-Style Continue Button */}
      {nextLessonItem && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/60 shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                CURRENT GOAL • {activeSubject?.title.en}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                {activeSubject?.id?.includes('kisw')
                  ? nextLessonItem.quest.title.sw
                  : nextLessonItem.quest.title.en}
              </h2>
              <p className="text-xs text-emerald-300 font-medium">
                {activeSubject?.id?.includes('kisw')
                  ? nextLessonItem.strand.title.sw
                  : nextLessonItem.strand.title.en}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold shrink-0">
              <span className="text-emerald-400">⚡ +{nextLessonItem.quest.xpReward}</span>
              <span className="text-amber-400">🪙 +{nextLessonItem.quest.coinReward}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrimaryContinue}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base md:text-lg tracking-wide shadow-xl shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2.5 min-h-[56px]"
          >
            <span>{language === 'sw' ? 'ENDELEA NA SOMO' : 'CONTINUE LESSON'}</span>
            <span className="text-xl">➔</span>
          </button>
        </motion.div>
      )}

      {/* 3. Compact Widgets Strip: Daily Goal Ring + Active Quest Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Daily Goal Ring Widget */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 flex items-center gap-3.5 shadow-md">
          {/* Circular SVG Ring */}
          <div className="relative w-12 h-12 shrink-0">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000"
                strokeDasharray="75, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-emerald-300">
              75%
            </span>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
              Daily Goal
            </span>
            <span className="text-xs font-bold text-white">7 of 10 minutes completed</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">3 min to keep streak 🔥</span>
          </div>
        </div>

        {/* Compact Quest Snippet */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/60 flex items-center justify-between gap-3 shadow-md">
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block truncate">
              ⭐ Savanna Quest
            </span>
            <h5 className="text-xs font-bold text-white truncate">Baraka at Kongowea Market</h5>
            <div className="w-24 bg-slate-800 rounded-full h-1.5 mt-1.5">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <button
            type="button"
            onClick={handlePrimaryContinue}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 text-xs font-black border border-emerald-800 transition-all cursor-pointer shrink-0"
          >
            Play ➔
          </button>
        </div>
      </div>

      {/* 4. Vertical Winding Learning Path */}
      <div className="space-y-8 pt-4">
        {activeSubject?.strands.map((strand, strandIdx) => {
          let runningIndex = strandIdx * 3;

          return (
            <div key={strand.id} className="space-y-6">
              {/* Strand Unit Header (Duolingo Unit Header) */}
              <div
                className="p-4 sm:p-5 rounded-3xl border-2 shadow-xl flex items-center justify-between gap-4"
                style={{
                  backgroundColor: '#020617',
                  borderColor: `${activeSubject.color}90`,
                  backgroundImage: `radial-gradient(ellipse at top left, ${activeSubject.color}20, transparent 70%)`
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-slate-950"
                      style={{ backgroundColor: activeSubject.color }}
                    >
                      UNIT {strandIdx + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {strand.subStrands.length} Sub-strands
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    {strand.title.en}
                  </h3>
                  <p className="text-xs text-emerald-300/80 italic">{strand.title.sw}</p>
                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-1">
                    {strand.description.en}
                  </p>
                </div>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border"
                  style={{
                    backgroundColor: `${activeSubject.color}25`,
                    borderColor: activeSubject.color
                  }}
                >
                  <CurriculumIcon name={strand.icon} size={24} />
                </div>
              </div>

              {/* Winding Nodes Column */}
              <div className="relative py-4 flex flex-col items-center">
                {strand.subStrands.flatMap((subStrand, ssIdx) =>
                  subStrand.quests.map((quest, qIdx) => {
                    const isCompleted = Boolean(student.completedMissionIds?.includes(quest.id));
                    const isNext = nextLessonItem?.quest.id === quest.id;
                    const isAvailable = isCompleted || isNext;

                    // Calculate winding offset
                    const offsetIdx = runningIndex % OFFSETS.length;
                    const offsetPx = OFFSETS[offsetIdx];
                    runningIndex++;

                    return (
                      <div
                        key={quest.id}
                        className="relative my-3 flex flex-col items-center group"
                        style={{
                          transform: `translateX(${offsetPx}px)`
                        }}
                      >
                        {/* Start Here Floating Tooltip */}
                        {isNext && (
                          <div className="absolute -top-8 bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap animate-bounce z-10">
                            {language === 'sw' ? 'ANZA HAPA! ➔' : 'START HERE! ➔'}
                          </div>
                        )}

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
                              ? 'bg-amber-400 text-slate-950 border-4 border-amber-300 shadow-amber-500/20 hover:scale-105'
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

                          {/* Star rating indicators for completed quests */}
                          {isCompleted && (
                            <div className="absolute -bottom-2 flex items-center justify-center gap-0.5 bg-slate-900 border border-amber-400 rounded-full px-1.5 py-0.2 shadow-sm">
                              <span className="text-[9px] text-amber-400">⭐⭐⭐</span>
                            </div>
                          )}
                        </button>

                        {/* Node Label Below */}
                        <div className="text-center mt-2 max-w-[130px]">
                          <span className="text-[11px] font-bold text-gray-200 line-clamp-1 block">
                            {quest.title.en}
                          </span>
                          <span className="text-[9px] text-emerald-400/80 italic line-clamp-1 block">
                            {quest.title.sw}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
