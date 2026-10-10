import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import {
  getCurriculumGrade,
  searchCurriculumTopics,
  getRecommendedNextQuestDetails,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest
} from '../../data/curriculum/index.js';
import { sound } from '../../utils/soundEffects.js';
import { ParentStreamModal, getStreamPreferences } from '../parent/ParentStreamModal.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import { CurriculumIcon } from '../common/CurriculumIcon.js';

interface Props {
  gradeId: string;
  student: StudentProfile;
  onSelectSubject: (subjectId: string) => void;
  onStartQuest: (questId: string) => void;
}

type FilterMode = 'ALL' | 'RECOMMENDED' | 'PRACTICE';

export const SubjectHub: React.FC<Props> = ({
  gradeId,
  student,
  onSelectSubject,
  onStartQuest
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [filter, setFilter] = useState<FilterMode>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [streamPrefs, setStreamPrefs] = useState(getStreamPreferences());

  const grade = useMemo(() => {
    return getCurriculumGrade(gradeId) || getCurriculumGrade('grade-4')!;
  }, [gradeId]);

  // Search results if query active
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCurriculumTopics(searchQuery, grade.id);
  }, [searchQuery, grade.id]);

  // Calculate subject progress stats
  const subjectStats = useMemo(() => {
    const map = new Map<string, { totalQuests: number; completedCount: number; nextQuest: CurriculumQuest | null }>();
    if (!grade) return map;

    grade.subjects.forEach((subject: CurriculumSubject) => {
      let total = 0;
      let completed = 0;
      let next: CurriculumQuest | null = null;

      subject.strands.forEach((strand: CurriculumStrand) => {
        strand.subStrands.forEach((sub: CurriculumSubStrand) => {
          sub.quests.forEach((quest: CurriculumQuest) => {
            total += 1;
            const isDone = student.completedMissionIds?.includes(quest.id);
            if (isDone) {
              completed += 1;
            } else if (!next) {
              next = quest;
            }
          });
        });
      });

      // Default next to first quest if all complete or none found
      if (!next && subject.strands[0]?.subStrands[0]?.quests[0]) {
        next = subject.strands[0].subStrands[0].quests[0];
      }

      map.set(subject.id, { totalQuests: total, completedCount: completed, nextQuest: next });
    });

    return map;
  }, [grade, student.completedMissionIds]);

  // Recommended quest from adaptive layer
  const recommendedQuest = useMemo(() => {
    return getRecommendedNextQuestDetails(grade.id, student.completedMissionIds || []);
  }, [grade.id, student.completedMissionIds]);

  // Filtered subjects
  const filteredSubjects = useMemo(() => {
    if (!grade) return [];

    let list: CurriculumSubject[] = grade.subjects;

    // Filter by Religious stream preferences
    list = list.filter((s: CurriculumSubject) => {
      if (s.id.includes('rel-') || s.religiousEducationStream) {
        if (streamPrefs.religiousStream === 'CRE' && !s.title.en.includes('Christian') && !s.id.includes('cre')) return false;
        if (streamPrefs.religiousStream === 'IRE' && !s.title.en.includes('Islamic') && !s.id.includes('ire')) return false;
        if (streamPrefs.religiousStream === 'HRE' && !s.title.en.includes('Hindu') && !s.id.includes('hre')) return false;
      }
      return true;
    });

    if (filter === 'RECOMMENDED') {
      if (recommendedQuest) {
        list = list.filter((s: CurriculumSubject) => s.id === recommendedQuest.subject.id);
      }
    } else if (filter === 'PRACTICE') {
      // Subjects with completion < 100%
      list = list.filter((s: CurriculumSubject) => {
        const stats = subjectStats.get(s.id);
        return stats && stats.completedCount < stats.totalQuests;
      });
    }

    return list;
  }, [grade, filter, recommendedQuest, subjectStats, streamPrefs]);

  const handleQuestStart = (qId: string) => {
    sound.playClick();
    onStartQuest(qId);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Controls: Search + Filters + Parent Settings */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search CBC topic, strand, or quest (e.g. Shillings, Seedlings, Fractions)..."
            className="w-full bg-slate-950/90 border border-emerald-900/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters & Parent Stream Button */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <div className="bg-slate-950/90 border border-emerald-900/80 p-1 rounded-2xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter('ALL');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'ALL'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Subjects ({grade.subjects.length})
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter('RECOMMENDED');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'RECOMMENDED'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎯 Recommended
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter('PRACTICE');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'PRACTICE'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🌱 Needs Practice
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsParentModalOpen(true);
            }}
            title="Parent Stream Settings (CRE/IRE/HRE)"
            className="p-2.5 rounded-2xl bg-slate-950/90 border border-emerald-900/80 hover:border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>👨‍👩‍👧</span>
            <span className="hidden sm:inline">Streams</span>
          </button>
        </div>
      </div>

      {/* Search Results Display */}
      {searchQuery.trim() && (
        <div className="bg-slate-950/90 border border-emerald-900/80 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold border-b border-emerald-900/60 pb-2">
            <span>Search Results for "{searchQuery}" ({searchResults.length} matches)</span>
            <span className="text-gray-400">Curriculum Grade: {grade.name.en}</span>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">
              No matching CBC quests or topics found. Try "Fractions", "Hali ya Hewa", or "Seedlings".
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {searchResults.map((result: any) => (
                <div
                  key={result.quest.id}
                  className="p-3 bg-slate-900/90 border border-emerald-900/60 hover:border-emerald-500/80 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="truncate">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                      <CurriculumIcon name={result.subject.icon} size={15} />
                      <span>{result.subject.title.en}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 truncate">{result.subStrand.title.en}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5 truncate">
                      {result.quest.title.en}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuestStart(result.quest.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 cursor-pointer"
                  >
                    Play ➔
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Adaptive Recommendation Banner if available */}
      {recommendedQuest && filter !== 'PRACTICE' && !searchQuery && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : springTransition}
          className="p-4 md:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-slate-950 border border-emerald-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-2xl shrink-0 text-amber-300">
              <CurriculumIcon name={recommendedQuest.subject.icon} size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                  Rafiki's Pick
                </span>
                <span className="text-xs text-emerald-300 font-bold">
                  {recommendedQuest.subject.title.en} • {recommendedQuest.strand.title.en}
                </span>
              </div>
              <h4 className="text-sm font-black text-white mt-0.5">
                {recommendedQuest.quest.title.en} ({recommendedQuest.quest.title.sw})
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-1">
                {recommendedQuest.quest.storyContext.en}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleQuestStart(recommendedQuest.quest.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs tracking-wide shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>CONTINUE QUEST</span>
            <span>🚀</span>
          </button>
        </motion.div>
      )}

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject: CurriculumSubject) => {
          const stats = subjectStats.get(subject.id) || { totalQuests: 1, completedCount: 0, nextQuest: null };
          const progressPercent = Math.min(100, Math.round((stats.completedCount / Math.max(1, stats.totalQuests)) * 100));
          const isOptional = subject.isOptional;
          const isPlaceholder = subject.id.includes('indigenous');

          return (
            <motion.div
              key={subject.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : springTransition}
              className={`rounded-3xl border-2 p-5 bg-slate-950/80 transition-all shadow-lg flex flex-col justify-between gap-4 relative overflow-hidden group ${
                isPlaceholder
                  ? 'border-dashed border-gray-700/80 opacity-75'
                  : 'border-emerald-900/60 hover:border-emerald-500/60 hover:shadow-emerald-950/40'
              }`}
            >
              {/* Subject Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border text-white"
                      style={{
                        backgroundColor: `${subject.color}20`,
                        borderColor: subject.color
                      }}
                    >
                      <CurriculumIcon name={subject.icon} size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                        {subject.title.en}
                      </h4>
                      <p className="text-xs text-emerald-400/80 font-medium">
                        {subject.title.sw}
                      </p>
                    </div>
                  </div>

                  {/* Circular progress ring */}
                  <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        style={{ color: subject.color }}
                        strokeDasharray={`${progressPercent}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-black text-white">
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-gray-400 mt-3 line-clamp-2 leading-relaxed">
                  {subject.description.en}
                </p>
              </div>

              {/* Status and Action Buttons */}
              <div className="space-y-3 pt-2 border-t border-emerald-950">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>
                    {subject.strands.length} {subject.strands.length === 1 ? 'Strand' : 'Strands'}
                  </span>
                  <span>
                    {stats.completedCount}/{stats.totalQuests} {stats.totalQuests === 1 ? 'Quest' : 'Quests'}
                  </span>
                  {isOptional && (
                    <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                      Optional
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectSubject(subject.id);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-emerald-800/80 hover:bg-emerald-950/60 text-emerald-200 font-bold text-xs transition-all cursor-pointer text-center"
                  >
                    View Strands 📖
                  </button>

                  <button
                    type="button"
                    disabled={isPlaceholder}
                    onClick={() => {
                      if (stats.nextQuest) {
                        handleQuestStart(stats.nextQuest.id);
                      } else {
                        onSelectSubject(subject.id);
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer text-center"
                  >
                    {isPlaceholder ? 'KICD Draft' : 'Continue ➔'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Parent Stream Modal */}
      <ParentStreamModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        onSave={prefs => setStreamPrefs(prefs)}
      />
    </div>
  );
};
