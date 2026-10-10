import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import {
  getCurriculumGrade,
  getRecommendedNextQuest,
  CurriculumSubject,
  CurriculumStrand,
  CurriculumSubStrand,
  CurriculumQuest
} from '../../data/curriculum/index.js';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import { CurriculumIcon } from '../common/CurriculumIcon';

interface Props {
  gradeId: string;
  student: StudentProfile;
  onStartQuest: (questId: string) => void;
}

type RubricLevel = 'ALL' | 'BEGINNING' | 'DEVELOPING' | 'PROFICIENT' | 'EXCEEDING';

interface StrandMastery {
  strandId: string;
  strandTitle: { en: string; sw: string };
  strandCode?: string;
  subjectTitle: { en: string; sw: string };
  subjectIcon: string;
  colorTheme: string;
  totalQuests: number;
  completedQuests: number;
  scorePercentage: number;
  rubric: 'BEGINNING' | 'DEVELOPING' | 'PROFICIENT' | 'EXCEEDING';
  rubricLabel: string;
  rubricSwahili: string;
  rubricColor: string;
  firstQuestId: string;
  values: string[];
  competencies: string[];
}

export const CurriculumStrandsTab: React.FC<Props> = ({
  gradeId,
  student,
  onStartQuest
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [selectedRubric, setSelectedRubric] = useState<RubricLevel>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');

  const grade = useMemo(() => {
    return getCurriculumGrade(gradeId) || getCurriculumGrade('grade-4')!;
  }, [gradeId]);

  // Compute mastery per strand using CBC 4-level rubric
  const strandsMasteryList = useMemo(() => {
    const list: StrandMastery[] = [];

    grade.subjects.forEach((subject: CurriculumSubject) => {
      subject.strands.forEach((strand: CurriculumStrand) => {
        let total = 0;
        let completed = 0;
        let firstQ = '';
        const valuesSet = new Set<string>();
        const compSet = new Set<string>();

        strand.subStrands.forEach((sub: CurriculumSubStrand) => {
          sub.quests.forEach((q: CurriculumQuest) => {
            total += 1;
            if (!firstQ) firstQ = q.id;
            if (student.completedMissionIds?.includes(q.id)) {
              completed += 1;
            }
            q.cbeValues?.forEach((v: string) => valuesSet.add(v));
            q.cbeCompetencies?.forEach((c: string) => compSet.add(c));
          });
        });

        const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

        let rubric: 'BEGINNING' | 'DEVELOPING' | 'PROFICIENT' | 'EXCEEDING';
        let rubricLabel: string;
        let rubricSwahili: string;
        let rubricColor: string;

        if (pct >= 85) {
          rubric = 'EXCEEDING';
          rubricLabel = 'Exceeding Expectations';
          rubricSwahili = 'Bora Sana';
          rubricColor = 'text-amber-300 bg-amber-400/20 border-amber-400';
        } else if (pct >= 65) {
          rubric = 'PROFICIENT';
          rubricLabel = 'Proficient / Meeting';
          rubricSwahili = 'Mahiri';
          rubricColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-500';
        } else if (pct >= 40) {
          rubric = 'DEVELOPING';
          rubricLabel = 'Developing / Approaching';
          rubricSwahili = 'Anayeendelea';
          rubricColor = 'text-blue-300 bg-blue-500/20 border-blue-500';
        } else {
          rubric = 'BEGINNING';
          rubricLabel = 'Beginning / Below';
          rubricSwahili = 'Mwanzo';
          rubricColor = 'text-rose-300 bg-rose-500/20 border-rose-500';
        }

        list.push({
          strandId: strand.id,
          strandTitle: strand.title,
          strandCode: strand.code,
          subjectTitle: subject.title,
          subjectIcon: subject.icon,
          colorTheme: subject.color,
          totalQuests: total,
          completedQuests: completed,
          scorePercentage: pct,
          rubric,
          rubricLabel,
          rubricSwahili,
          rubricColor,
          firstQuestId: firstQ,
          values: Array.from(valuesSet),
          competencies: Array.from(compSet)
        });
      });
    });

    return list;
  }, [grade, student.completedMissionIds]);

  // Recommended next quest
  const recommended = useMemo(() => {
    return getRecommendedNextQuest(grade.id, student.completedMissionIds || []);
  }, [grade.id, student.completedMissionIds]);

  // Filtered list
  const filteredStrands = useMemo(() => {
    return strandsMasteryList.filter(item => {
      if (selectedRubric !== 'ALL' && item.rubric !== selectedRubric) return false;
      if (subjectFilter !== 'ALL' && item.subjectTitle.en !== subjectFilter) return false;
      return true;
    });
  }, [strandsMasteryList, selectedRubric, subjectFilter]);

  return (
    <div className="space-y-6 text-left">
      {/* CBC Rubric Banner */}
      <div className="bg-slate-950/80 border border-emerald-900/60 rounded-3xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-900/60 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🇰🇪</span>
              <h3 className="text-lg font-black text-white">
                Kenya CBC Competency Rubric ({grade.name.en})
              </h3>
            </div>
            <p className="text-xs text-emerald-300">
              Kiwango cha Umahiri cha Mtaala wa CBC kulingana na KICD
            </p>
          </div>

          {recommended && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onStartQuest(recommended.id);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>🌱 Practice Weakest Strand</span>
              <span>➔</span>
            </button>
          )}
        </div>

        {/* 4 Rubric Pill Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedRubric(selectedRubric === 'BEGINNING' ? 'ALL' : 'BEGINNING');
            }}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedRubric === 'BEGINNING'
                ? 'border-rose-400 bg-rose-950/60 shadow-md ring-1 ring-rose-400'
                : 'border-rose-900/60 bg-rose-950/20 hover:border-rose-700'
            }`}
          >
            <div className="text-[10px] uppercase font-black text-rose-400">Level 1 • Mwanzo</div>
            <div className="text-sm font-bold text-white">Beginning</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {(() => {
                const count = strandsMasteryList.filter(s => s.rubric === 'BEGINNING').length;
                return `${count} ${count === 1 ? 'Strand' : 'Strands'} (0–39%)`;
              })()}
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedRubric(selectedRubric === 'DEVELOPING' ? 'ALL' : 'DEVELOPING');
            }}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedRubric === 'DEVELOPING'
                ? 'border-blue-400 bg-blue-950/60 shadow-md ring-1 ring-blue-400'
                : 'border-blue-900/60 bg-blue-950/20 hover:border-blue-700'
            }`}
          >
            <div className="text-[10px] uppercase font-black text-blue-400">Level 2 • Anayeendelea</div>
            <div className="text-sm font-bold text-white">Developing</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {(() => {
                const count = strandsMasteryList.filter(s => s.rubric === 'DEVELOPING').length;
                return `${count} ${count === 1 ? 'Strand' : 'Strands'} (40–64%)`;
              })()}
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedRubric(selectedRubric === 'PROFICIENT' ? 'ALL' : 'PROFICIENT');
            }}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedRubric === 'PROFICIENT'
                ? 'border-emerald-400 bg-emerald-950/60 shadow-md ring-1 ring-emerald-400'
                : 'border-emerald-900/60 bg-emerald-950/20 hover:border-emerald-700'
            }`}
          >
            <div className="text-[10px] uppercase font-black text-emerald-400">Level 3 • Mahiri</div>
            <div className="text-sm font-bold text-white">Proficient</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {(() => {
                const count = strandsMasteryList.filter(s => s.rubric === 'PROFICIENT').length;
                return `${count} ${count === 1 ? 'Strand' : 'Strands'} (65–84%)`;
              })()}
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedRubric(selectedRubric === 'EXCEEDING' ? 'ALL' : 'EXCEEDING');
            }}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedRubric === 'EXCEEDING'
                ? 'border-amber-400 bg-amber-950/60 shadow-md ring-1 ring-amber-400'
                : 'border-amber-900/60 bg-amber-950/20 hover:border-amber-700'
            }`}
          >
            <div className="text-[10px] uppercase font-black text-amber-400">Level 4 • Bora Sana</div>
            <div className="text-sm font-bold text-white">Exceeding</div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {(() => {
                const count = strandsMasteryList.filter(s => s.rubric === 'EXCEEDING').length;
                return `${count} ${count === 1 ? 'Strand' : 'Strands'} (85–100%)`;
              })()}
            </div>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-gray-400 font-bold">
          Showing {filteredStrands.length} of {strandsMasteryList.length} {strandsMasteryList.length === 1 ? 'Strand' : 'Strands'}
        </span>

        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="bg-slate-950 border border-emerald-900/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
        >
          <option value="ALL">All CBC Subjects</option>
          {grade.subjects.map((s: CurriculumSubject) => (
            <option key={s.id} value={s.title.en}>
              {s.title.en}
            </option>
          ))}
        </select>
      </div>

      {/* Strands Mastery List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStrands.map(item => (
          <motion.div
            key={item.strandId}
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : springTransition}
            className="p-5 rounded-3xl border border-emerald-900/60 bg-slate-950/80 shadow-md flex flex-col justify-between gap-4"
          >
            <div>
              {/* Header with subject badge + rubric pill */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-emerald-800/60 flex items-center justify-center shrink-0 text-emerald-400">
                    <CurriculumIcon name={item.subjectIcon} size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {item.subjectTitle.en}
                    </span>
                    <h4 className="text-sm font-black text-white">{item.strandTitle.en}</h4>
                    <p className="text-xs text-emerald-400/80 italic">{item.strandTitle.sw}</p>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded-full border text-[11px] font-black shrink-0 ${item.rubricColor}`}>
                  {item.rubricSwahili} ({item.scorePercentage}%)
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 space-y-1">
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-emerald-950">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${item.scorePercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span>
                    {item.completedQuests} of {item.totalQuests} {item.totalQuests === 1 ? 'Quest' : 'Quests'} Completed
                  </span>
                  <span>{item.rubricLabel}</span>
                </div>
              </div>

              {/* Core Values / Competencies */}
              {(item.competencies.length > 0 || item.values.length > 0) && (
                <div className="mt-3 pt-2 border-t border-emerald-950 flex flex-wrap gap-1.5">
                  {item.competencies.slice(0, 2).map(c => (
                    <span
                      key={c}
                      className="text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-md font-bold"
                    >
                      🎯 {c}
                    </span>
                  ))}
                  {item.values.slice(0, 1).map(v => (
                    <span
                      key={v}
                      className="text-[9px] bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded-md font-bold"
                    >
                      ❤️ {v}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-emerald-950 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onStartQuest(item.firstQuestId);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 font-bold text-xs border border-emerald-800/80 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Practise Strand</span>
                <span>➔</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
