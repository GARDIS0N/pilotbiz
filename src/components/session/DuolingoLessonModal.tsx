import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, LearningSessionResult } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { QuestionRenderer } from '../questions/QuestionRenderer.js';

interface Props {
  isOpen: boolean;
  missionId: string | null;
  studentId: string;
  studentName?: string;
  initialHearts?: number;
  onClose: () => void;
  onMissionCompleted: (result: LearningSessionResult) => void;
  onOpenPractice?: () => void;
  language?: 'en' | 'sw';
}

export const DuolingoLessonModal: React.FC<Props> = ({
  isOpen,
  missionId,
  studentId,
  studentName = 'Amina',
  initialHearts = 5,
  onClose,
  onMissionCompleted,
  onOpenPractice,
  language = 'en'
}) => {
  const [loading, setLoading] = useState(true);
  const [questTitle, setQuestTitle] = useState('Learning Mission');
  const [questSwahiliTitle, setQuestSwahiliTitle] = useState('');
  const [xpReward, setXpReward] = useState(25);
  const [coinReward, setCoinReward] = useState(10);

  // Question Queue (re-queues questions answered incorrectly)
  const [queue, setQueue] = useState<Question[]>([]);
  const [totalInitialCount, setTotalInitialCount] = useState(1);
  const [solvedCount, setSolvedCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);

  // Current answering state
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  // Hearts tracking
  const [hearts, setHearts] = useState(initialHearts);
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);

  // End of session summary state
  const [isComplete, setIsComplete] = useState(false);
  const [earnedStars, setEarnedStars] = useState(3);

  // Teach cards phase (for lessons with direct concept instructions)
  const [teachCards, setTeachCards] = useState<any[]>([]);
  const [currentTeachCardIdx, setCurrentTeachCardIdx] = useState(0);
  const [isTeaching, setIsTeaching] = useState(false);

  useEffect(() => {
    if (isOpen && missionId) {
      loadQuestData(missionId);
    }
  }, [isOpen, missionId]);

  const loadQuestData = async (mId: string) => {
    setLoading(true);
    setAnswerSubmitted(false);
    setIsCurrentCorrect(null);
    setActiveHint(null);
    setIsComplete(false);
    setSolvedCount(0);
    setMistakesCount(0);
    setHearts(initialHearts);
    setIsOutOfHearts(false);
    setCurrentTeachCardIdx(0);

    try {
      const data = await cbeApi.getMissionDetails(mId);
      setQuestTitle(data.mission.title);
      setQuestSwahiliTitle(data.mission.swahiliTitle || '');
      setXpReward(data.mission.xpReward || 25);
      setCoinReward(data.mission.coinReward || 10);
      setQueue(data.questions);
      setTotalInitialCount(data.questions.length);

      if (data.lesson?.teachCards && data.lesson.teachCards.length > 0) {
        setTeachCards(data.lesson.teachCards);
        setIsTeaching(true);
      } else {
        setTeachCards([]);
        setIsTeaching(false);
      }
    } catch (err) {
      console.error('Failed to load quest questions:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !missionId) return null;

  const currentQ = queue[0];

  // Helper to validate current answer correctness
  const checkIsCorrect = (q: Question, ans: any): boolean => {
    if (!q || ans === null || ans === undefined) return false;

    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE') {
      return ans === q.correctOptionId;
    }

    if (q.type === 'TRUE_FALSE') {
      return ans === q.correctBoolean;
    }

    if (q.type === 'NUMBER_ENTRY' || q.type === 'KENYAN_MONEY') {
      if (typeof q.numericAnswer?.value === 'number') {
        const tol = q.numericAnswer.tolerance || 0;
        return Math.abs(Number(ans) - q.numericAnswer.value) <= tol;
      }
      return false;
    }

    if (q.type === 'FILL_BLANK') {
      if (q.fillBlankAnswers && q.fillBlankAnswers.length > 0) {
        return q.fillBlankAnswers.some(
          a => a.toLowerCase().trim() === String(ans).toLowerCase().trim()
        );
      }
      return typeof ans === 'string' && ans.trim().length > 0;
    }

    if (q.type === 'ORDERING') {
      if (q.correctOrderIds && Array.isArray(ans)) {
        return JSON.stringify(ans) === JSON.stringify(q.correctOrderIds);
      }
      return Array.isArray(ans) && ans.length > 0;
    }

    if (q.type === 'MATCHING') {
      if (Array.isArray(ans) && q.matchingPairs && q.matchingPairs.length > 0) {
        if (ans.length !== q.matchingPairs.length) return false;
        return ans.every((m: any) => m.leftId === m.rightId);
      }
      return typeof ans === 'object' && ans !== null && Object.keys(ans).length > 0;
    }

    return true;
  };

  // Human readable correct answer snippet
  const getCorrectAnswerLabel = (q: Question): string => {
    if (!q) return '';
    if (q.type === 'MULTIPLE_CHOICE' || q.type === 'IMAGE_LABEL' || q.type === 'LISTEN_CHOOSE') {
      const correct = q.options?.find(o => o.id === q.correctOptionId);
      return correct?.text || 'Correct option';
    }
    if (q.type === 'TRUE_FALSE') {
      return q.correctBoolean ? 'True (Kweli)' : 'False (Si Kweli)';
    }
    if (q.type === 'NUMBER_ENTRY' || q.type === 'KENYAN_MONEY') {
      return `${q.numericAnswer?.value || ''} ${q.numericAnswer?.unit || ''}`.trim();
    }
    if (q.type === 'FILL_BLANK' && q.fillBlankAnswers) {
      return q.fillBlankAnswers.join(', ');
    }
    return 'Correct answer';
  };

  const handleCheckAnswer = () => {
    if (!currentQ || currentAnswer === null || currentAnswer === undefined || currentAnswer === '') return;
    sound.playClick();

    const correct = checkIsCorrect(currentQ, currentAnswer);
    setIsCurrentCorrect(correct);
    setAnswerSubmitted(true);

    if (correct) {
      sound.playCorrect();
      setSolvedCount(prev => prev + 1);
    } else {
      sound.playIncorrect();
      setMistakesCount(prev => prev + 1);
      const nextHearts = Math.max(0, hearts - 1);
      setHearts(nextHearts);

      if (nextHearts === 0) {
        setIsOutOfHearts(true);
      }
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setAnswerSubmitted(false);
    setActiveHint(null);
    setCurrentAnswer(null);

    if (isCurrentCorrect) {
      // Dequeue finished question
      const remaining = queue.slice(1);
      if (remaining.length === 0) {
        // All questions completed!
        finishSession();
      } else {
        setQueue(remaining);
      }
    } else {
      // Re-queue the missed question at the end for mastery
      const reordered = [...queue.slice(1), currentQ];
      setQueue(reordered);
    }
    setIsCurrentCorrect(null);
  };

  const handleUseHint = () => {
    if (!currentQ) return;
    sound.playClick();
    const hintText = currentQ.socraticHint || 'Think about the problem step by step: read carefully and break it down.';
    setActiveHint(hintText);
  };

  const finishSession = () => {
    sound.playLevelUp();
    const stars = mistakesCount === 0 ? 3 : mistakesCount <= 2 ? 2 : 1;
    setEarnedStars(stars);
    setIsComplete(true);

    const result: LearningSessionResult = {
      sessionId: `session-${Date.now()}`,
      studentId,
      missionId: missionId!,
      scorePercentage: Math.max(70, Math.round(((totalInitialCount) / (totalInitialCount + mistakesCount)) * 100)),
      correctAnswersCount: totalInitialCount,
      totalQuestions: totalInitialCount,
      xpEarned: xpReward,
      coinsEarned: coinReward,
      heartsRemaining: hearts,
      streakMaintained: true,
      leveledUp: false,
      unlockedAchievements: [],
      completedAt: new Date().toISOString()
    };

    onMissionCompleted(result);
  };

  const progressPercent = Math.min(100, Math.round((solvedCount / Math.max(1, totalInitialCount)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none animate-fade-in overflow-hidden">
      {/* 1. Full-Screen Focus Top Bar */}
      <div className="px-4 md:px-8 py-3.5 border-b border-emerald-900/60 bg-slate-950/90 flex items-center justify-between gap-4 shrink-0">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (confirm(language === 'sw' ? 'Ungependa kutoka? Utapoteza maendeleo ya sasa.' : 'Quit session? You will lose current progress.')) {
              onClose();
            }
          }}
          className="text-gray-400 hover:text-white text-xl font-black p-1.5 rounded-xl hover:bg-slate-900 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Exit Lesson"
        >
          ✕
        </button>

        {/* Smooth Animated Progress Bar */}
        <div className="flex-1 max-w-xl mx-2 bg-slate-900 rounded-full h-3.5 overflow-hidden border border-emerald-950 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          />
        </div>

        {/* Hearts HUD */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-rose-950/40 border border-rose-700/60 font-black text-rose-400 text-sm">
          <span>❤️</span>
          <span>{hearts}</span>
        </div>
      </div>

      {/* 2. Main Question Body (One question per screen, big tap targets) */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-emerald-300">
                {language === 'sw' ? 'Inapakia somo la CBC...' : 'Preparing CBC Quest...'}
              </p>
            </div>
          ) : isComplete ? (
            /* 3. End of Lesson Celebration Screen */
            <div className="text-center space-y-6 py-6 animate-fade-in max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-6xl shadow-2xl shadow-amber-500/20 animate-bounce">
                🏆
              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  {language === 'sw' ? 'Hongera Sana!' : 'Lesson Complete!'}
                </h2>
                <p className="text-sm text-emerald-300 font-bold mt-1">
                  {questTitle}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 text-3xl">
                {[1, 2, 3].map(st => (
                  <span key={st} className={st <= earnedStars ? 'text-amber-400' : 'text-gray-700'}>
                    ⭐
                  </span>
                ))}
              </div>

              {/* Rewards Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Total XP</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">+{xpReward} ⚡</span>
                </div>
                <div className="p-4 rounded-2xl bg-yellow-950/60 border border-yellow-600/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Coins Earned</span>
                  <span className="text-2xl font-black text-yellow-400 mt-1 block">+{coinReward} 🪙</span>
                </div>
              </div>

              {/* Rafiki Praise Dialogue */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/50 flex items-center gap-3.5 text-left">
                <span className="text-3xl shrink-0">🦉</span>
                <p className="text-xs text-amber-200 font-medium leading-relaxed">
                  "Safi sana, {studentName}! Every step on the savanna builds your confidence. Keep your streak flame burning!"
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-lg shadow-xl cursor-pointer active:scale-98 transition-all min-h-[56px]"
              >
                {language === 'sw' ? 'ENDELEA' : 'CONTINUE'} ➔
              </button>
            </div>
          ) : isTeaching && teachCards.length > 0 ? (
            /* Teach Card Intro Phase */
            <div className="space-y-6 animate-fade-in max-w-xl mx-auto py-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800">
                  {language === 'sw' ? 'Dokezo la Somo' : 'Lesson Concept'} • {currentTeachCardIdx + 1} / {teachCards.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsTeaching(false)}
                  className="text-xs font-bold text-gray-400 hover:text-white underline cursor-pointer"
                >
                  {language === 'sw' ? 'Ruka kwa maswali ➔' : 'Skip to questions ➔'}
                </button>
              </div>

              {/* Teach Card Content */}
              <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-2xl shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {teachCards[currentTeachCardIdx]?.heading?.[language] || teachCards[currentTeachCardIdx]?.heading?.en}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold">
                      {questTitle}
                    </p>
                  </div>
                </div>

                <p className="text-base text-gray-200 leading-relaxed font-medium">
                  {teachCards[currentTeachCardIdx]?.body?.[language] || teachCards[currentTeachCardIdx]?.body?.en}
                </p>

                {/* Worked Example */}
                {teachCards[currentTeachCardIdx]?.workedExample && (
                  <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span>📝</span>
                      <span>{language === 'sw' ? 'Mfano Uliofanywa' : 'Worked Example'}</span>
                    </span>
                    <p className="text-sm font-mono text-emerald-200 leading-relaxed">
                      {teachCards[currentTeachCardIdx]?.workedExample?.[language] || teachCards[currentTeachCardIdx]?.workedExample?.en}
                    </p>
                  </div>
                )}

                {/* Illustration Context Prompt */}
                {teachCards[currentTeachCardIdx]?.imagePrompt && (
                  <div className="bg-amber-950/30 border border-amber-600/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
                    <span className="text-base shrink-0">🎨</span>
                    <span>{teachCards[currentTeachCardIdx]?.imagePrompt}</span>
                  </div>
                )}
              </div>

              {/* Progress & Next/Start Button */}
              <div className="flex items-center gap-3 pt-2">
                {currentTeachCardIdx < teachCards.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCurrentTeachCardIdx(prev => prev + 1);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl cursor-pointer active:scale-98 transition-all min-h-[56px]"
                  >
                    {language === 'sw' ? 'DOKEZO LIFUATALO' : 'NEXT TIP'} ➔
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsTeaching(false);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl cursor-pointer active:scale-98 transition-all min-h-[56px]"
                  >
                    {language === 'sw' ? 'ANZA MAZOEZI' : 'START PRACTICE'} ➔
                  </button>
                )}
              </div>
            </div>
          ) : currentQ ? (
            /* Active Question Challenge */
            <div className="space-y-6 animate-fade-in pb-24">
              {/* Question Header & Hint Trigger */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-800">
                  Question {solvedCount + 1} of {totalInitialCount}
                </span>

                <button
                  type="button"
                  onClick={handleUseHint}
                  disabled={answerSubmitted}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-950/40 border border-yellow-500/60 text-yellow-300 font-black text-xs hover:bg-yellow-950/80 transition-all cursor-pointer"
                  title="Spend 1 Coin for a hint"
                >
                  <span>💡</span>
                  <span>Hint (1 🪙)</span>
                </button>
              </div>

              {/* Hint Drawer */}
              {activeHint && (
                <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/60 text-xs text-amber-200 leading-relaxed flex items-start gap-2.5 animate-fade-in">
                  <span className="text-base shrink-0">🦉</span>
                  <div>
                    <span className="font-bold block">Rafiki's Worked Hint:</span>
                    <p className="mt-0.5">{activeHint}</p>
                  </div>
                </div>
              )}

              {/* Question Renderer Engine */}
              <QuestionRenderer
                question={currentQ}
                selectedAnswer={currentAnswer}
                onSelectAnswer={setCurrentAnswer}
                disabled={answerSubmitted}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* 4. Bottom Action & Feedback Drawer (Duolingo Style: Green for Correct, Red for Wrong) */}
      {!isComplete && !loading && !isTeaching && (
        <div
          className={`shrink-0 border-t-4 px-4 sm:px-8 py-4 sm:py-5 transition-all ${
            answerSubmitted
              ? isCurrentCorrect
                ? 'bg-emerald-950/95 border-emerald-400 shadow-2xl'
                : 'bg-rose-950/95 border-rose-500 shadow-2xl'
              : 'bg-slate-950 border-slate-900'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Feedback Message */}
            {answerSubmitted ? (
              <div className="flex items-start gap-3 w-full sm:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ${
                    isCurrentCorrect ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {isCurrentCorrect ? '✓' : '✕'}
                </div>
                <div className="text-left space-y-0.5">
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {isCurrentCorrect
                      ? (language === 'sw' ? 'Safi Sana! / Correct!' : 'Nicely Done!')
                      : (language === 'sw' ? 'Si Sahihi (Jaribu Tena)' : 'Not quite!')}
                  </h4>
                  {!isCurrentCorrect && (
                    <>
                      <p className="text-xs text-rose-200 font-bold">
                        Correct Answer: {getCorrectAnswerLabel(currentQ)}
                      </p>
                      <p className="text-xs text-gray-300 leading-snug line-clamp-2">
                        {currentQ.explanation || 'Review the clue and try again at the end of the lesson.'}
                      </p>
                    </>
                  )}
                  {isCurrentCorrect && (
                    <p className="text-xs text-emerald-300 font-bold">
                      +10 XP ⚡
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs text-gray-400 font-medium">
                {language === 'sw' ? 'Chagua jibu kisha bonyeza Kagua' : 'Select an answer to continue'}
              </div>
            )}

            {/* Main Action Button (Min 56px height) */}
            <div className="w-full sm:w-auto shrink-0">
              {answerSubmitted ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className={`w-full sm:w-48 py-4 px-6 rounded-2xl font-black text-base shadow-xl transition-all cursor-pointer active:scale-95 min-h-[56px] ${
                    isCurrentCorrect
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/30'
                      : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30'
                  }`}
                >
                  {language === 'sw' ? 'ENDELEA' : 'CONTINUE'} ➔
                </button>
              ) : (
                <button
                  type="button"
                  disabled={currentAnswer === null || currentAnswer === undefined || currentAnswer === ''}
                  onClick={handleCheckAnswer}
                  className={`w-full sm:w-48 py-4 px-6 rounded-2xl font-black text-base transition-all min-h-[56px] ${
                    currentAnswer !== null && currentAnswer !== undefined && currentAnswer !== ''
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  {language === 'sw' ? 'KAGUA JIBU' : 'CHECK ANSWER'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Out of Hearts Emergency Sheet */}
      <AnimatePresence>
        {isOutOfHearts && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-18 h-18 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-4xl shadow-lg">
                💔
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  {language === 'sw' ? 'Mioyo Imeisha!' : 'Out of Hearts!'}
                </h3>
                <p className="text-xs text-rose-300 font-bold mt-1">
                  Don't worry, mistakes help our brains grow!
                </p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Practise foundational questions to earn hearts back, or refill instantly in Dukani.
              </p>
              <div className="space-y-2 pt-2">
                {onOpenPractice && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPractice();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm cursor-pointer shadow-md"
                  >
                    PRACTICE TO EARN HEARTS 🎯
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs cursor-pointer"
                >
                  RETURN TO HOME 🏠
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
