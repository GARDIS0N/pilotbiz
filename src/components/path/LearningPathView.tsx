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
import { getOnboardingState } from '../../services/onboardingStorage.js';

interface Props {
  student: StudentProfile;
  gradeId: string;
  onStartQuest: (questId: string) => void;
  language?: 'en' | 'sw';
}

function getLocalized(val: any, lang: 'en' | 'sw' = 'en'): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    if (lang === 'sw') return val.sw || val.en || '';
    return val.en || val.sw || '';
  }
  return String(val);
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

  const religiousStream = student.religiousStream || 'CRE';

  // 1. Filter subjects strictly for learner's grade and family's chosen Religious Education stream
  const filteredSubjects = useMemo(() => {
    return grade.subjects
      .filter(subj => {
        // Exclude optional subjects by default so learner focuses on core CBC
        if (subj.isOptional) return false;

        // If subject has an explicit religious stream, filter to match family choice
        if (subj.religiousEducationStream) {
          return subj.religiousEducationStream === religiousStream;
        }

        return true;
      })
      .map(subj => {
        // Customize Religious Education subject to reflect family choice (Christian, Islamic, Hindu)
        const isRE =
          subj.id.includes('-re-') ||
          subj.id.startsWith('re-') ||
          subj.title.en.toLowerCase().includes('religious education');

        if (isRE) {
          if (religiousStream === 'CRE') {
            return {
              ...subj,
              title: { en: 'Christian Religious Education', sw: 'Elimu ya Dini ya Kikristo' },
              icon: 'Church',
              color: '#3b82f6'
            };
          }
          if (religiousStream === 'IRE') {
            return {
              ...subj,
              title: { en: 'Islamic Religious Education', sw: 'Elimu ya Dini ya Kiislamu' },
              icon: 'Moon',
              color: '#059669'
            };
          }
          if (religiousStream === 'HRE') {
            return {
              ...subj,
              title: { en: 'Hindu Religious Education', sw: 'Elimu ya Dini ya Kihindu' },
              icon: 'Scroll',
              color: '#d97706'
            };
          }
        }
        return subj;
      });
  }, [grade.subjects, religiousStream]);

  // Subject selection: default to learner's top interest from onboarding or first subject
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    try {
      const obState = getOnboardingState();
      const topInterest = obState.selectedInterests?.[0]?.toLowerCase();
      if (topInterest) {
        const matched = filteredSubjects.find(s => {
          const sId = s.id.toLowerCase();
          const sTitle = (s.title.en || '').toLowerCase();
          if (topInterest === 'math') return sId.includes('math') || sTitle.includes('math') || sTitle.includes('hisabati');
          if (topInterest === 'english') return sId.includes('eng') || sTitle.includes('english') || sTitle.includes('kiingereza');
          if (topInterest === 'kiswahili') return sId.includes('kisw') || sTitle.includes('kiswahili');
          if (topInterest === 'science') return sId.includes('sci') || sId.includes('env') || sTitle.includes('science') || sTitle.includes('sayansi') || sTitle.includes('mazingira');
          if (topInterest === 'social') return sId.includes('soc') || sId.includes('agri') || sTitle.includes('social') || sTitle.includes('jamii') || sTitle.includes('kilimo');
          return sId.includes(topInterest) || sTitle.includes(topInterest);
        });
        if (matched) return matched.id;
      }
    } catch (_) {}
    return filteredSubjects[0]?.id || grade.subjects[0]?.id || 'la-math-g4';
  });

  const activeSubject = useMemo(() => {
    return filteredSubjects.find(s => s.id === selectedSubjectId) || filteredSubjects[0] || grade.subjects[0];
  }, [filteredSubjects, selectedSubjectId, grade.subjects]);

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
      preferredSubjectId: activeSubject?.id || selectedSubjectId
    });
  }, [gradeId, student.completedMissionIds, activeSubject?.id, selectedSubjectId]);

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

  // Sine wave offsets for the zig-zag node path
  const OFFSETS = [0, -36, 36, -20, 20];

  const nextQuestTitle = activeSubject?.id?.includes('kisw')
    ? getLocalized(nextLessonItem?.quest.title, 'sw') || 'Kujifunza'
    : getLocalized(nextLessonItem?.quest.title, 'en') || 'Learning';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-left py-2 px-3 sm:px-0">
      {/* =========================================================================
          1. ONE LARGE CONTINUE CARD DIRECTLY UNDER TOP BAR
          Merges Rafiki mascot into the card with short speech bubble and big START button.
          ========================================================================= */}
      {nextLessonItem && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="w-full p-5 sm:p-6 rounded-3xl bg-slate-900/95 border-2 border-emerald-500/50 shadow-2xl space-y-4"
        >
          {/* Top Line: Subject Badge + Next Up Tag */}
          <div className="flex items-center justify-between gap-3">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 shadow-sm"
              style={{ backgroundColor: activeSubject?.color || '#10b981' }}
            >
              <CurriculumIcon name={activeSubject?.icon || 'Calculator'} size={15} />
              <span>{getLocalized(activeSubject?.title, language)}</span>
            </span>

            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
              {language === 'sw' ? 'Somo Lifuatalo' : 'Next Up'}
            </span>
          </div>

          {/* Lesson Title & Unit Context */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {nextQuestTitle}
            </h2>
            <p className="text-xs text-emerald-300 font-bold mt-1 line-clamp-1">
              {activeStrand ? getLocalized(activeStrand.title, language) : ''}
            </p>
          </div>

          {/* Merged Rafiki Avatar + Speech Bubble Inside Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 shadow-inner">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 shadow-md">
              🦉
            </div>
            <p className="text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
              "{language === 'sw' ? `Hebu tutatue "${nextQuestTitle}"!` : `Let's solve "${nextQuestTitle}"!`}"
            </p>
          </div>

          {/* Big START Button (56px+ height, prominent, inviting) */}
          <button
            type="button"
            onClick={handlePrimaryContinue}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-lg shadow-xl shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-3 min-h-[56px] active:scale-98"
          >
            <span className="text-xl">▶</span>
            <span>{language === 'sw' ? 'ANZA SOMO' : 'START LESSON'}</span>
            <span className="text-xl">➔</span>
          </button>
        </motion.div>
      )}

      {/* =========================================================================
          2. COMPACT HORIZONTAL SUBJECT SWITCHER
          Small round icons with labels, distinct icon and color per subject.
          ========================================================================= */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {language === 'sw' ? 'Masomo ya Darasa' : 'Subjects'}
          </span>
          <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/60">
            {getLocalized(grade.name, language)}
          </span>
        </div>

        {/* Compact Horizontal Scroll Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none px-1">
          {filteredSubjects.map(subj => {
            const isSelected = subj.id === selectedSubjectId;

            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => handleSelectSubject(subj.id)}
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
                aria-pressed={isSelected}
              >
                {/* Small Round Icon (52px diameter) */}
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl transition-all shadow-md ${
                    isSelected
                      ? 'ring-4 scale-105 shadow-lg'
                      : 'bg-slate-900 border-2 border-slate-800 hover:border-slate-700 opacity-80 group-hover:opacity-100 group-hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${subj.color}35` : undefined,
                    borderColor: isSelected ? subj.color : undefined,
                    color: isSelected ? subj.color : '#94a3b8',
                    boxShadow: isSelected ? `0 0 16px ${subj.color}40` : undefined
                  }}
                >
                  <CurriculumIcon name={subj.icon} size={22} />
                </div>

                {/* Small Clean Label */}
                <span
                  className={`text-[11px] font-bold text-center max-w-[76px] truncate leading-tight ${
                    isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                >
                  {getLocalized(subj.title, language)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. UNIT SELECTOR TABS (If multiple units exist in active subject)
          ========================================================================= */}
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
                Unit {sIdx + 1}: {getLocalized(strand.title, language)}
              </button>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          4. LESSON PATH: ZIG-ZAG NODES GROUPED BY UNIT
          Node states: locked (grey), current (large pulsing with START), completed (gold with stars).
          Unit milestone trophy at the end.
          ========================================================================= */}
      {activeStrand && (
        <div className="space-y-4 pt-2">
          {/* Unit Banner Header Card */}
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
                {getLocalized(activeStrand.title, language)}
              </h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                {getLocalized(activeStrand.description, language)}
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

          {/* Zig-Zag Lesson Nodes Column */}
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
                  {/* Interactive Node Button with Distinct Visual States */}
                  <button
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      sound.playClick();
                      onStartQuest(quest.id);
                    }}
                    className={`relative rounded-full flex flex-col items-center justify-center font-black transition-all cursor-pointer shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 active:scale-95 ${
                      isCompleted
                        ? 'w-16 h-16 sm:w-18 sm:h-18 bg-amber-400 text-slate-950 border-4 border-amber-300 shadow-amber-500/25 hover:scale-105'
                        : isNext
                        ? 'w-18 h-18 sm:w-20 sm:h-20 bg-emerald-500 text-slate-950 border-4 border-emerald-300 shadow-emerald-500/50 animate-pulse hover:scale-105 ring-4 ring-emerald-400/30'
                        : 'w-16 h-16 sm:w-18 sm:h-18 bg-slate-800 text-gray-500 border-4 border-slate-700 cursor-not-allowed opacity-60'
                    }`}
                    aria-label={`${getLocalized(quest.title, 'en')} - ${isCompleted ? 'Completed' : isNext ? 'Current' : 'Locked'}`}
                  >
                    {isCompleted ? (
                      <span className="text-xl">⭐</span>
                    ) : isNext ? (
                      <div className="flex flex-col items-center">
                        <span className="text-xl">▶</span>
                        <span className="text-[9px] font-black tracking-wider uppercase bg-slate-950 text-emerald-300 px-1.5 py-0.5 rounded-full mt-0.5 border border-emerald-400/60 shadow">
                          {language === 'sw' ? 'ANZA' : 'START'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base">🔒</span>
                    )}

                    {/* Gold stars badge for completed nodes */}
                    {isCompleted && (
                      <div className="absolute -bottom-2 flex items-center justify-center gap-0.5 bg-slate-900 border border-amber-400 rounded-full px-1.5 py-0.5 shadow-sm">
                        <span className="text-[9px] text-amber-400">⭐⭐⭐</span>
                      </div>
                    )}
                  </button>

                  {/* Clean Node Label */}
                  <div className="text-center mt-2 max-w-[130px]">
                    <span className="text-[11px] font-bold text-gray-200 line-clamp-1 block">
                      {getLocalized(quest.title, activeSubject?.id?.includes('kisw') ? 'sw' : 'en')}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Unit Milestone Trophy at End of Unit */}
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

      {/* =========================================================================
          5. SAVANNA QUEST (Below the Lesson Path)
          Real-world Kenyan practice challenge.
          ========================================================================= */}
      <div className="p-5 rounded-3xl bg-slate-950 border-2 border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🦁</span>
            <div>
              <h4 className="text-sm font-black text-amber-300">
                {language === 'sw' ? 'Safari ya Savanna: Baraka Kongowea' : 'Savanna Quest: Baraka in Kongowea'}
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
            : 'Put your skills to work helping Baraka measure fresh produce at Kongowea Market and earn bonus Shilingi coins!'}
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
