import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, LearningSessionResult } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { QuestionRenderer } from '../questions/QuestionRenderer.js';
import { evaluateAnswer, resolveCorrectAnswerText, normalizeQuestion } from '../../utils/answerValidation.js';
import { validateQuestion } from '../../utils/questionValidator.js';
import { QuestionErrorBoundary } from '../common/QuestionErrorBoundary.js';

interface Props {
  isOpen: boolean;
  missionId: string | null;
  studentId: string;
  studentName?: string;
  initialHearts?: number;
  onHeartsChange?: (hearts: number) => void;
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
  onHeartsChange,
  onClose,
  onMissionCompleted,
  onOpenPractice,
  language = 'en'
}) => {
  const getInitialHearts = (): number => {
    try {
      const stored = localStorage.getItem('jifuno_hearts');
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 5) return parsed;
      }
    } catch (e) {}
    return initialHearts ?? 5;
  };

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Hearts tracking (persisted and strictly consistent)
  const [hearts, setHearts] = useState<number>(getInitialHearts);
  const [isOutOfHearts, setIsOutOfHearts] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

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
    const initH = getInitialHearts();
    setHearts(initH);
    if (onHeartsChange) onHeartsChange(initH);
    setIsOutOfHearts(initH === 0);
    setCurrentTeachCardIdx(0);

    try {
      const data = await cbeApi.getMissionDetails(mId);
      const isKisw = Boolean(mId.includes('kisw') || data.mission.subStrandId?.includes('kisw'));
      setQuestTitle(isKisw && data.mission.swahiliTitle ? data.mission.swahiliTitle : data.mission.title);
      setQuestSwahiliTitle('');
      setXpReward(data.mission.xpReward || 25);
      setCoinReward(data.mission.coinReward || 10);
      const normalizedQuestions = (data.questions || []).map(q => normalizeQuestion(q));
      setQueue(normalizedQuestions);
      setTotalInitialCount(normalizedQuestions.length);

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

  // Answer validation and human-readable answer label from universal evaluator
  const checkIsCorrect = (q: Question, ans: any): boolean => {
    return evaluateAnswer(q, ans);
  };

  const getCorrectAnswerLabel = (q: Question): string => {
    return resolveCorrectAnswerText(q);
  };

  const getFirstSentence = (text?: string): string => {
    if (!text) return '';
    const cleaned = text.trim();
    const match = cleaned.match(/^.*?[.!?](?:\s|$)/);
    return match ? match[0].trim() : cleaned;
  };

  const handleQuickRefill = () => {
    sound.playLevelUp();
    setHearts(5);
    try {
      localStorage.setItem('jifuno_hearts', '5');
    } catch (e) {}
    if (onHeartsChange) {
      onHeartsChange(5);
    }
    setIsOutOfHearts(false);
  };

  const handleCheckAnswer = () => {
    if (!currentQ || currentAnswer === null || currentAnswer === undefined || currentAnswer === '') return;
    sound.playClick();

    const correct = evaluateAnswer(currentQ, currentAnswer);
    setIsCurrentCorrect(correct);
    setAnswerSubmitted(true);

    if (correct) {
      sound.playCorrect();
      setSolvedCount(prev => prev + 1);
    } else {
      sound.playIncorrect();
      setMistakesCount(prev => prev + 1);

      // In Practice Mode, mistakes never cost hearts
      if (!isPracticeMode) {
        const nextHearts = Math.max(0, hearts - 1);
        setHearts(nextHearts);
        try {
          localStorage.setItem('jifuno_hearts', String(nextHearts));
        } catch (e) {}
        if (onHeartsChange) {
          onHeartsChange(nextHearts);
        }

        if (nextHearts === 0) {
          setIsOutOfHearts(true);
        }
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

  // Stop speech when question changes or modal unmounts
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [currentQ?.id, isOpen]);

  const handleReadAloud = () => {
    if (!currentQ || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    sound.playClick();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare text to read aloud: scenario, prompt, and options
    const parts: string[] = [];
    if (currentQ.storyScenario) {
      parts.push(currentQ.storyScenario);
    }
    parts.push(currentQ.prompt);

    if (currentQ.options && currentQ.options.length > 0) {
      currentQ.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        parts.push(`Option ${letter}: ${opt.text}`);
      });
    }

    const fullText = parts.join('. ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const isKisw = Boolean(
      currentQ.subStrandId?.includes('kisw') ||
      currentQ.id?.includes('-kisw-')
    );
    utterance.lang = isKisw ? 'sw' : 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleUseHint = () => {
    if (!currentQ || activeHint) return;
    sound.playClick();
    const isKisw = Boolean(
      currentQ.subStrandId?.includes('kisw') ||
      currentQ.id?.includes('-kisw-')
    );
    const hintText = (isKisw && currentQ.swahiliSocraticHint)
      ? currentQ.swahiliSocraticHint
      : (currentQ.socraticHint || 'Think carefully about the clues in the problem.');
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

  // Content Integrity: Handle invalid question skipping safely
  const [skippedNotice, setSkippedNotice] = useState<string | null>(null);

  const handleSkipInvalidQuestion = (qId: string, reason?: string) => {
    console.warn(`[Content Integrity] Skipping invalid question ${qId}: ${reason || 'unspecified'}`);
    const noticeText = language === 'sw' ? 'Hebu tujaribu swali lifuatalo' : "Let's try the next one";
    setSkippedNotice(noticeText);
    setTimeout(() => {
      setSkippedNotice(null);
    }, 3000);

    sound.playClick();
    setCurrentAnswer(null);
    setAnswerSubmitted(false);
    setIsCurrentCorrect(null);
    setActiveHint(null);

    setQueue(prev => {
      const remaining = prev.filter(q => q.id !== qId);
      if (remaining.length === 0) {
        finishSession();
      }
      return remaining;
    });
  };

  // Pre-validate current question: if invalid, automatically skip so learner is never stuck
  useEffect(() => {
    if (currentQ && !isComplete && !loading && !isTeaching) {
      const validationError = validateQuestion(currentQ);
      if (validationError) {
        handleSkipInvalidQuestion(currentQ.id, validationError);
      }
    }
  }, [currentQ?.id, isComplete, loading, isTeaching]);

  // Progress Bar: Fills smoothly as questions are answered and completed
  const completedQuestions = Math.max(
    0,
    totalInitialCount - queue.length + (answerSubmitted && isCurrentCorrect ? 1 : 0)
  );
  const progressPercent = Math.min(
    100,
    Math.max(8, Math.round((completedQuestions / Math.max(1, totalInitialCount)) * 100))
  );

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

        {/* Hearts HUD & Practice Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsPracticeMode(prev => !prev);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isPracticeMode
                ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40 shadow-sm'
                : 'bg-slate-900 border-slate-700 text-gray-300 hover:border-slate-500 hover:text-white'
            }`}
            title={isPracticeMode ? 'Practice Mode: Infinite Hearts' : 'Enable Practice Mode (No heart loss)'}
          >
            <span>🛡️</span>
            <span className="hidden sm:inline">{isPracticeMode ? 'Practice Mode' : 'Practice'}</span>
          </button>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border font-black text-sm transition-all ${
              isPracticeMode
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                : 'bg-rose-950/40 border-rose-700/60 text-rose-400'
            }`}
          >
            <span>❤️</span>
            <span>{isPracticeMode ? '∞' : hearts}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Question Body (One question per screen, big tap targets) */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pt-3 pb-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl mx-auto space-y-4">
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
            <div className="space-y-4 animate-fade-in pb-24 w-full">
              {/* Question Header: Read Aloud + Single Hint Button (No Stars, No Badges, No Question X of Y) */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReadAloud}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer min-h-[40px] ${
                    isSpeaking
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse ring-2 ring-emerald-400/50'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 hover:border-emerald-500'
                  }`}
                  title={language === 'sw' ? 'Soma swali kwa sauti' : 'Read question aloud'}
                  aria-label="Read question aloud"
                >
                  <span className="text-base">{isSpeaking ? '🔊' : '🔉'}</span>
                  <span>{isSpeaking ? (language === 'sw' ? 'Inasoma...' : 'Reading...') : (language === 'sw' ? 'Soma kwa Sauti' : 'Read Aloud')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleUseHint}
                  disabled={answerSubmitted || Boolean(activeHint)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-950/40 border-2 border-yellow-500/60 text-yellow-300 font-black text-xs hover:bg-yellow-950/80 transition-all cursor-pointer disabled:opacity-40 min-h-[40px]"
                  title="Spend 1 Coin for a hint"
                >
                  <span className="text-base">💡</span>
                  <span>{language === 'sw' ? 'Dokezo (1 🪙)' : 'Hint (1 🪙)'}</span>
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

              {/* Content Integrity: Notice if previous question was invalid and skipped */}
              {skippedNotice && (
                <div className="p-3.5 bg-amber-950/60 border border-amber-500/50 rounded-2xl flex items-center gap-3 text-amber-200 text-xs sm:text-sm font-bold animate-fade-in">
                  <span className="text-xl shrink-0">🦉</span>
                  <span>{skippedNotice}</span>
                </div>
              )}

              {/* Question Renderer Engine with Error Boundary */}
              <QuestionErrorBoundary
                key={currentQ.id}
                questionId={currentQ.id}
                language={language}
                onSkip={() => handleSkipInvalidQuestion(currentQ.id, 'Runtime rendering exception')}
              >
                <QuestionRenderer
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={answerSubmitted}
                />
              </QuestionErrorBoundary>
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
                : 'bg-amber-950/95 border-amber-500 shadow-2xl'
              : 'bg-slate-950 border-slate-900'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Feedback Message */}
            {answerSubmitted ? (
              <div className="flex items-start gap-3.5 w-full sm:w-auto">
                {isCurrentCorrect ? (
                  <motion.div
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: [0.5, 1.25, 1], rotate: [-20, 15, 0] }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg bg-emerald-400 text-slate-950 font-black relative overflow-hidden"
                  >
                    <span>✓</span>
                    <motion.span
                      animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.08, 1] }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg bg-amber-500 text-slate-950 font-black"
                  >
                    <span>💡</span>
                  </motion.div>
                )}

                <div className="text-left space-y-1">
                  {isCurrentCorrect ? (
                    <>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-black text-white">
                          Hongera!
                        </h4>
                        <span className="text-sm">🎉</span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-200 font-medium leading-snug">
                        {getFirstSentence(currentQ?.explanation) || (language === 'sw' ? 'Umefanya vizuri sana! Endelea hivi!' : 'Great job! You found the right solution!')}
                      </p>
                      <p className="text-xs text-emerald-400 font-bold">
                        +10 XP ⚡
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-base sm:text-lg font-black text-amber-300">
                        {language === 'sw' ? 'Karibu upate! Jaribu tena' : 'Almost! Try again'}
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-200 font-bold">
                        {language === 'sw' ? 'Jibu Sahihi' : 'Correct Answer'}: {getCorrectAnswerLabel(currentQ)}
                      </p>
                      <p className="text-xs text-slate-100 font-medium leading-relaxed max-w-md">
                        {getFirstSentence(currentQ?.explanation) || (language === 'sw' ? 'Kumbuka dokezo na jaribu tena mwishoni mwa somo.' : 'Think about the clues and try again at the end of the lesson.')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:block text-xs text-gray-400 font-medium">
                {language === 'sw' ? 'Chagua jibu kisha kagua' : 'Select an answer to continue'}
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
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
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

      {/* 5. Out of Hearts Emergency Sheet (With Refill & Practice Mode Options) */}
      <AnimatePresence>
        {isOutOfHearts && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            >
              <div className="w-18 h-18 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg">
                💖
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  {language === 'sw' ? 'Mioyo Imeisha!' : 'Out of Hearts!'}
                </h3>
                <p className="text-xs text-amber-300 font-bold mt-1">
                  Don't worry, mistakes help our brains grow!
                </p>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed">
                Refill your hearts instantly with a quick review, or continue in Practice Mode with infinite hearts.
              </p>
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleQuickRefill}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm cursor-pointer shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 min-h-[52px]"
                >
                  <span>✨</span>
                  <span>QUICK REVIEW TO REFILL (+5 ❤️)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsPracticeMode(true);
                    setIsOutOfHearts(false);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-emerald-500/60 text-emerald-300 font-black text-xs cursor-pointer shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>🛡️</span>
                  <span>CONTINUE IN PRACTICE MODE (∞ Hearts)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-2xl bg-transparent hover:bg-slate-800 text-gray-400 hover:text-white font-bold text-xs cursor-pointer transition-all"
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
