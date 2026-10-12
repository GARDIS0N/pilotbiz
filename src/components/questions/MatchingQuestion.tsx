import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, QuestionMatchingPair } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { getShuffledMatchingRightPairs } from '../../utils/optionShuffler.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';
import { Language, getSavedLanguage } from '../../utils/i18n.js';

interface Props {
  question: Question;
  selectedAnswer: { leftId: string; rightId: string }[] | null;
  onSelectAnswer: (answer: { leftId: string; rightId: string }[]) => void;
  disabled?: boolean;
  attemptId?: string;
  language?: Language;
}

export const MatchingQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled = false,
  attemptId,
  language = getSavedLanguage()
}) => {
  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  // Robust pair resolution supporting camelCase matchingPairs, snake_case matching_pairs, or pairs
  const rawPairs: QuestionMatchingPair[] = useMemo(() => {
    const list = question.matchingPairs || (question as any).matching_pairs || (question as any).pairs || [];
    if (!Array.isArray(list)) return [];
    return list.map((p: any, idx: number) => ({
      leftId: p.leftId || p.left || `pair-${idx + 1}-l`,
      leftText: p.leftText || p.left || `Item ${idx + 1}`,
      rightId: p.rightId || p.right || `pair-${idx + 1}-r`,
      rightText: p.rightText || p.right || `Description ${idx + 1}`
    }));
  }, [question]);

  const [localAttemptId] = useState(() => `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const effectiveAttemptId = attemptId || localAttemptId;

  // Right column seeded shuffle so pairs never horizontally align 1-to-1
  const shuffledRightPairs = useMemo(() => {
    return getShuffledMatchingRightPairs(
      rawPairs,
      `${effectiveAttemptId}_${question.id}`
    );
  }, [rawPairs, effectiveAttemptId, question.id]);

  // Track matched (disappeared) item IDs
  const [matchedLeftIds, setMatchedLeftIds] = useState<Set<string>>(() => new Set());
  const [matchedRightIds, setMatchedRightIds] = useState<Set<string>>(() => new Set());

  // Current active selections and temporary states
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [correctingPair, setCorrectingPair] = useState<{ leftId: string; rightId: string } | null>(null);
  const [shakingPair, setShakingPair] = useState<{ leftId: string; rightId: string } | null>(null);

  // Track completed match pairs for final answer submission
  const [completedMatches, setCompletedMatches] = useState<{ leftId: string; rightId: string }[]>(() => {
    return selectedAnswer || [];
  });

  const handleLeftClick = (leftId: string) => {
    if (disabled || matchedLeftIds.has(leftId) || shakingPair !== null || correctingPair !== null) return;
    sound.playClick();

    if (selectedLeft === leftId) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftId);
    }
  };

  const handleRightClick = (rightId: string) => {
    if (disabled || matchedRightIds.has(rightId) || shakingPair !== null || correctingPair !== null) return;
    sound.playClick();

    if (!selectedLeft) {
      // Learner tapped right without a left item selected: briefly prompt left tap
      setSelectedRight(rightId);
      setTimeout(() => setSelectedRight(null), 800);
      return;
    }

    const currentLeft = selectedLeft;
    setSelectedRight(rightId);

    // Verify whether (currentLeft, rightId) is a correct pair
    const isCorrectPair = rawPairs.some(
      p => p.leftId === currentLeft && p.rightId === rightId
    );

    if (isCorrectPair) {
      sound.playCorrect();
      setCorrectingPair({ leftId: currentLeft, rightId });

      const newMatches = [...completedMatches.filter(m => m.leftId !== currentLeft), { leftId: currentLeft, rightId }];
      setCompletedMatches(newMatches);
      onSelectAnswer(newMatches);

      // Flash green, then disappear after 550ms
      setTimeout(() => {
        setMatchedLeftIds(prev => new Set([...prev, currentLeft]));
        setMatchedRightIds(prev => new Set([...prev, rightId]));
        setCorrectingPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 550);
    } else {
      sound.playIncorrect();
      setShakingPair({ leftId: currentLeft, rightId });

      // Shake and reset after 650ms
      setTimeout(() => {
        setShakingPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 650);
    }
  };

  const allMatched = rawPairs.length > 0 && matchedLeftIds.size === rawPairs.length;

  return (
    <div className="w-full space-y-4">
      {/* Scenario / Story Context */}
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3.5 text-sm text-amber-200/90 flex items-start gap-2.5 shadow-inner">
          <span className="text-lg">📖</span>
          <span className="leading-relaxed">{question.storyScenario}</span>
        </div>
      )}

      {/* Question Prompt */}
      <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
        <VocabularyExplainer text={question.prompt} />
      </h3>

      {/* Interactive Helper Banner */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold px-1">
        <p className="text-emerald-300 flex items-center gap-1.5">
          <span>👉</span>
          <span>
            {allMatched
              ? (language === 'sw' ? 'Hongera! Umeoanisha zote!' : 'Excellent! All pairs matched!')
              : (language === 'sw'
                ? 'Gusa neno upande wa kushoto, kisha gusa maelezo yanayolingana upande wa kulia!'
                : 'Tap a tile on the left, then tap its matching tile on the right!')}
          </span>
        </p>
        <span className="text-gray-400 font-extrabold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
          {matchedLeftIds.size}/{rawPairs.length}
        </span>
      </div>

      {/* Two Columns of Large Tiles */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-1">
        {/* Left Column (Terms) */}
        <div className="space-y-2.5">
          <div className="text-[11px] sm:text-xs uppercase font-black text-gray-300 tracking-wider px-1">
            {isKiswahili ? 'Mada (Kushoto)' : 'Terms (Left)'}
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {rawPairs.map(pair => {
                const isMatched = matchedLeftIds.has(pair.leftId);
                const isSelected = selectedLeft === pair.leftId;
                const isCorrect = correctingPair?.leftId === pair.leftId;
                const isShaking = shakingPair?.leftId === pair.leftId;

                if (isMatched) return null;

                return (
                  <motion.button
                    key={pair.leftId}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: isShaking ? [1, 0.96, 1.04, 0.96, 1] : 1,
                      x: isShaking ? [-6, 6, -5, 5, 0] : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -8 }}
                    transition={{ duration: 0.25 }}
                    disabled={disabled || isCorrect || isShaking}
                    onClick={() => handleLeftClick(pair.leftId)}
                    className={`w-full p-2.5 sm:p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between min-h-[56px] cursor-pointer shadow-md active:scale-98 select-none ${
                      isCorrect
                        ? 'border-emerald-400 bg-emerald-950 text-white ring-4 ring-emerald-400/80 shadow-emerald-950/80'
                        : isShaking
                        ? 'border-rose-500 bg-rose-950/80 text-rose-100 ring-2 ring-rose-500 shadow-rose-950/80'
                        : isSelected
                        ? 'border-amber-400 bg-amber-950/80 text-amber-100 ring-4 ring-amber-400/70 shadow-amber-950/80'
                        : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs sm:text-base font-black leading-snug">
                      <VocabularyExplainer text={pair.leftText} />
                    </span>
                    {isCorrect ? (
                      <span className="text-emerald-400 text-base sm:text-lg font-black animate-bounce ml-1 shrink-0">✓</span>
                    ) : isSelected ? (
                      <span className="text-amber-300 text-[10px] uppercase font-black bg-amber-900/80 px-1.5 py-0.5 rounded border border-amber-500/40 ml-1 shrink-0 hidden xs:inline">
                        ●
                      </span>
                    ) : null}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (Descriptions) */}
        <div className="space-y-2.5">
          <div className="text-[11px] sm:text-xs uppercase font-black text-gray-300 tracking-wider px-1">
            {isKiswahili ? 'Maelezo (Kulia)' : 'Descriptions (Right)'}
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {shuffledRightPairs.map(pair => {
                const isMatched = matchedRightIds.has(pair.rightId);
                const isSelected = selectedRight === pair.rightId;
                const isCorrect = correctingPair?.rightId === pair.rightId;
                const isShaking = shakingPair?.rightId === pair.rightId;

                if (isMatched) return null;

                return (
                  <motion.button
                    key={pair.rightId}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: isShaking ? [1, 0.96, 1.04, 0.96, 1] : 1,
                      x: isShaking ? [-6, 6, -5, 5, 0] : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -8 }}
                    transition={{ duration: 0.25 }}
                    disabled={disabled || isCorrect || isShaking}
                    onClick={() => handleRightClick(pair.rightId)}
                    className={`w-full p-2.5 sm:p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between min-h-[56px] cursor-pointer shadow-md active:scale-98 select-none ${
                      isCorrect
                        ? 'border-emerald-400 bg-emerald-950 text-white ring-4 ring-emerald-400/80 shadow-emerald-950/80'
                        : isShaking
                        ? 'border-rose-500 bg-rose-950/80 text-rose-100 ring-2 ring-rose-500 shadow-rose-950/80'
                        : isSelected && !selectedLeft
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : selectedLeft
                        ? 'border-dashed border-slate-600 hover:border-emerald-400 bg-slate-900/95 text-white hover:bg-slate-850'
                        : 'border-slate-700 bg-slate-900/95 text-white hover:border-emerald-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs sm:text-base font-medium leading-snug">
                      <VocabularyExplainer text={pair.rightText} />
                    </span>
                    {isCorrect ? (
                      <span className="text-emerald-400 text-base sm:text-lg font-black animate-bounce ml-1 shrink-0">✓</span>
                    ) : null}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {allMatched && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 text-center space-y-1 shadow-xl"
        >
          <div className="text-2xl">🎉</div>
          <p className="text-emerald-200 font-black text-base">
            {language === 'sw' ? 'Hongera! Umeoanisha vizuri!' : 'All pairs matched successfully!'}
          </p>
          <p className="text-emerald-300/80 text-xs font-bold">
            {language === 'sw' ? 'Bonyeza ENDELEA hapa chini' : 'Tap CHECK ANSWER or CONTINUE below'}
          </p>
        </motion.div>
      )}
    </div>
  );
};
