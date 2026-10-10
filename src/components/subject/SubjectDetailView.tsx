import React, { useState } from 'react';
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
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import { CurriculumIcon } from '../common/CurriculumIcon';

interface Props {
  subjectId: string;
  student: StudentProfile;
  onBack: () => void;
  onStartQuest: (questId: string) => void;
}

export const SubjectDetailView: React.FC<Props> = ({
  subjectId,
  student,
  onBack,
  onStartQuest
}) => {
  const reducedMotion = useReducedMotionPreference();
  const grade = getCurriculumGrade(student.gradeId) || getCurriculumGrade('grade-4')!;
  const subject: CurriculumSubject = grade.subjects.find((s: CurriculumSubject) => s.id === subjectId) || grade.subjects[0];

  const [expandedStrandIds, setExpandedStrandIds] = useState<string[]>([
    subject.strands[0]?.id || ''
  ]);

  const toggleStrand = (strandId: string) => {
    sound.playClick();
    setExpandedStrandIds(prev =>
      prev.includes(strandId) ? prev.filter(id => id !== strandId) : [...prev, strandId]
    );
  };

  const getMascotReaction = (sub: CurriculumSubject) => {
    if (sub.id.includes('math')) return { mascot: '🐆', quote: 'Twende Amina! Numbers make the world work. Piga hesabu!' };
    if (sub.id.includes('kiswahili')) return { mascot: '🦁', quote: 'Lugha yetu, fahari yetu! Karibu tusome Kiswahili kitukufu.' };
    if (sub.id.includes('english')) return { mascot: '🦉', quote: 'Words give us wings! Read stories, build fluency, and soar.' };
    if (sub.id.includes('science')) return { mascot: '🔬', quote: 'Young scientists! Observe nature, test experiments, and discover.' };
    if (sub.id.includes('agri')) return { mascot: '🌱', quote: 'Shamba letu! Learn to nurture seedlings and care for our soil.' };
    if (sub.id.includes('social')) return { mascot: '🧭', quote: 'Tembea Kenya! Explore our counties, history, and beautiful land.' };
    if (sub.id.includes('creative')) return { mascot: '🎨', quote: 'Sanaa na Muziki! Express rhythm, drawing, and vibrant colors.' };
    return { mascot: '🌟', quote: 'Every CBC quest brings you closer to your dreams. You can do this!' };
  };

  const mascotReaction = getMascotReaction(subject);

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-10">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-600 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          <span>←</span>
          <span>Back to Subject Hub / Nyuma</span>
        </button>

        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
          {grade.name.en} • {grade.name.sw}
        </span>
      </div>

      {/* Subject Hero Header */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : springTransition}
        className="rounded-3xl border-2 p-6 md:p-8 bg-slate-950 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          borderColor: `${subject.color}80`,
          backgroundImage: `radial-gradient(ellipse at top right, ${subject.color}15, transparent 60%)`
        }}
      >
        <div className="flex items-center gap-5">
          <div
            className="w-18 h-18 rounded-3xl flex items-center justify-center shadow-lg border-2 shrink-0"
            style={{
              backgroundColor: `${subject.color}25`,
              borderColor: subject.color
            }}
          >
            <CurriculumIcon name={subject.icon} size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-slate-950"
                style={{ backgroundColor: subject.color }}
              >
                KICD LEARNING AREA
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Order: #{subject.order}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              {subject.title.en}
            </h2>
            <p className="text-sm text-emerald-300 font-medium italic">
              {subject.title.sw}
            </p>
            <p className="text-xs text-gray-300 mt-2 max-w-xl leading-relaxed">
              {subject.description.en}
            </p>
          </div>
        </div>

        {/* Mascot Speech Bubble */}
        <div className="bg-slate-900/90 border border-emerald-900/80 rounded-2xl p-4 flex items-center gap-3.5 max-w-xs shrink-0 shadow-lg">
          <span className="text-3xl shrink-0">{mascotReaction.mascot}</span>
          <p className="text-xs text-emerald-200/90 font-medium leading-relaxed italic">
            "{mascotReaction.quote}"
          </p>
        </div>
      </motion.div>

      {/* Strands & Winding Sub-strand Quest Paths */}
      <div className="space-y-5">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <span>📚</span>
          <span>
            Curriculum Strands & Quests ({subject.strands.length} {subject.strands.length === 1 ? 'Strand' : 'Strands'})
          </span>
        </h3>

        {subject.strands.map((strand: CurriculumStrand, sIdx: number) => {
          const isExpanded = expandedStrandIds.includes(strand.id);

          return (
            <motion.div
              key={strand.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { delay: sIdx * 0.05 }}
              className="rounded-3xl border border-emerald-900/80 bg-slate-950 overflow-hidden shadow-lg"
            >
              {/* Strand Accordion Header */}
              <button
                type="button"
                onClick={() => toggleStrand(strand.id)}
                className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-300">
                    <CurriculumIcon name={strand.icon} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        Strand {sIdx + 1}
                      </span>
                      {strand.sourceStatus.includes('TODO') && (
                        <span className="text-[10px] bg-amber-950 border border-amber-600/60 text-amber-300 px-2 py-0.2 rounded-md font-bold">
                          KICD Draft
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-black text-white">{strand.title.en}</h4>
                    <p className="text-xs text-emerald-400/80 italic">{strand.title.sw}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {strand.subStrands.length} {strand.subStrands.length === 1 ? 'Sub-strand' : 'Sub-strands'}
                  </span>
                  <span className="text-base text-gray-400">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {/* Strand Details & Winding Node Trail */}
              {isExpanded && (
                <div className="p-4 md:p-6 border-t border-emerald-950 bg-slate-900/30 space-y-6 animate-fade-in">
                  <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                    {strand.description.en}
                  </p>

                  {/* Sub-strands List */}
                  {strand.subStrands.map((subStrand: CurriculumSubStrand, ssIdx: number) => (
                    <div
                      key={subStrand.id}
                      className="bg-slate-950/90 border border-emerald-900/60 rounded-2xl p-4 md:p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-950 pb-3">
                        <div>
                          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                            Sub-strand {sIdx + 1}.{ssIdx + 1}
                          </div>
                          <h5 className="text-sm font-bold text-white">
                            {subStrand.title.en}
                          </h5>
                          <p className="text-xs text-emerald-300/80 italic">
                            {subStrand.title.sw}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {subStrand.quests.length} {subStrand.quests.length === 1 ? 'Quest' : 'Quests'}
                        </span>
                      </div>

                      {/* Quests Winding Nodes Path */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                        {subStrand.quests.map((quest: CurriculumQuest, qIdx: number) => {
                          const isCompleted = student.completedMissionIds?.includes(quest.id);
                          const isFirst = qIdx === 0;
                          const prevQuest = qIdx > 0 ? subStrand.quests[qIdx - 1] : null;
                          const isUnlocked = isFirst || isCompleted || (prevQuest && student.completedMissionIds?.includes(prevQuest.id));

                          return (
                            <div
                              key={quest.id}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                                isCompleted
                                  ? 'border-amber-500/70 bg-amber-950/20 text-white shadow-md shadow-amber-950/30'
                                  : isUnlocked
                                  ? 'border-emerald-500/80 bg-emerald-950/30 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                                  : 'border-slate-800 bg-slate-950/40 text-gray-500 opacity-60'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  {/* Node status avatar */}
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${
                                      isCompleted
                                        ? 'bg-amber-400 text-slate-950'
                                        : isUnlocked
                                        ? 'bg-emerald-500 text-slate-950 animate-pulse'
                                        : 'bg-slate-800 text-gray-500'
                                    }`}
                                  >
                                    {isCompleted ? '⭐' : isUnlocked ? '▶' : '🔒'}
                                  </div>
                                  <div>
                                    <h6 className="text-xs font-black text-white">
                                      {quest.title.en}
                                    </h6>
                                    <p className="text-[11px] text-emerald-300/80 italic">
                                      {quest.title.sw}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] font-bold shrink-0">
                                  <span className="text-emerald-400">⚡ +{quest.xpReward}</span>
                                  <span className="text-amber-400">🪙 +{quest.coinReward}</span>
                                </div>
                              </div>

                              <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">
                                {quest.storyContext.en}
                              </p>

                              {/* Competency & Action Footer */}
                              <div className="flex items-center justify-between pt-2 border-t border-emerald-950/80">
                                <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                                  🎯 {quest.cbeCompetencies[0] || 'Learning'}
                                </span>

                                <button
                                  type="button"
                                  disabled={!isUnlocked}
                                  onClick={() => {
                                    sound.playClick();
                                    onStartQuest(quest.id);
                                  }}
                                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                                    isCompleted
                                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                                      : isUnlocked
                                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                                      : 'bg-slate-800 text-gray-600 cursor-not-allowed'
                                  }`}
                                >
                                  {isCompleted ? 'Replay ↺' : isUnlocked ? 'Play Now ➔' : 'Locked 🔒'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
