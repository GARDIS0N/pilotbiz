import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import {
  getOnboardingState,
  setOnboardingStep,
  setOnboardingGrade,
  setOnboardingInterests,
  setOnboardingGoal,
  recordPlacementResult,
  recordFirstLessonCompletion,
  setParentContactInfo,
  mergeGuestProgressIntoProfile,
  markOnboardingCompleted,
  OnboardingStep
} from '../../services/onboardingStorage.js';
import {
  ONBOARDING_STEPS_CONFIG,
  INTEREST_SUBJECTS,
  DAILY_GOAL_OPTIONS,
  OnboardingStepId
} from '../../config/onboardingConfig.js';
import { getPlacementQuestionsForGrade } from '../../services/placementQuestions.js';
import { trackEvent } from '../../services/analytics.js';
import { evaluateAnswer } from '../../utils/answerValidation.js';
import { Question, User, StudentProfile, LearningSessionResult } from '../../types/cbe.js';
import { getRecommendedNextQuest } from '../../data/curriculum/index.js';
import { cbeApi } from '../../services/cbeApi.js';

const DuolingoLessonModal = React.lazy(() =>
  import('../session/DuolingoLessonModal.js').then(m => ({ default: m.DuolingoLessonModal }))
);

interface Props {
  onCompleteOnboarding: (user: User, studentProfile: StudentProfile) => void;
  onOpenLogin: () => void;
  language?: 'en' | 'sw';
  onNavigateLegal?: (doc: 'privacy' | 'terms') => void;
}

const GRADES = [
  {
    id: 'grade-3',
    name: 'Grade 3',
    ageRange: 'Age 8–9',
    levelGroup: 'Lower Primary',
    icon: '🌱',
    descEn: 'Foundational Math, Literacy & Environment',
    descSw: 'Hesabu za Msingi, Kusoma na Mazingira'
  },
  {
    id: 'grade-4',
    name: 'Grade 4',
    ageRange: 'Age 9–10',
    levelGroup: 'Upper Primary',
    icon: '🐆',
    descEn: 'Multiplication arrays, Science & Agriculture',
    descSw: 'Kuzidisha, Sayansi na Kilimo'
  },
  {
    id: 'grade-5',
    name: 'Grade 5',
    ageRange: 'Age 10–11',
    levelGroup: 'Upper Primary',
    icon: '🌾',
    descEn: 'Fractions, Decimals & Intermediate Tech',
    descSw: 'Sehemu, Desimali na Teknolojia'
  },
  {
    id: 'grade-6',
    name: 'Grade 6',
    ageRange: 'Age 11–12',
    levelGroup: 'Upper Primary',
    icon: '🏆',
    descEn: 'Algebra, Geometry & CBC Assessment',
    descSw: 'Aljebra, Jiometria na Maandalizi ya CBC'
  }
];

export const OnboardingFlow: React.FC<Props> = ({
  onCompleteOnboarding,
  onOpenLogin,
  language = 'en',
  onNavigateLegal
}) => {
  const reducedMotion = useReducedMotionPreference();

  // Load existing or resumed state
  const persistedState = useMemo(() => getOnboardingState(), []);
  const [currentStep, setCurrentStep] = useState<OnboardingStepId>(() => {
    const s = persistedState.step;
    const validSteps: OnboardingStepId[] = [
      'WELCOME', 'GRADE', 'INTERESTS', 'LEVEL_CHECK',
      'FIRST_LESSON', 'DAILY_GOAL', 'SAVE_PROGRESS', 'PARENT_STEP', 'HOME'
    ];
    if (validSteps.includes(s as OnboardingStepId)) {
      return s as OnboardingStepId;
    }
    return 'WELCOME';
  });

  const [selectedGradeId, setSelectedGradeId] = useState<string>(persistedState.gradeId || 'grade-4');
  const [selectedInterests, setSelectedInterestsState] = useState<string[]>(
    persistedState.selectedInterests?.length ? persistedState.selectedInterests : ['math', 'science']
  );
  const [selectedGoal, setSelectedGoal] = useState<number>(persistedState.dailyGoalMinutes || 10);

  // Level check diagnostic state
  const [placementQuestions, setPlacementQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean | null>(null);
  const [placementScore, setPlacementScore] = useState(0);

  // Parent guardian handoff state
  const [learnerName, setLearnerName] = useState(persistedState.guestProgress?.learnerName || '');
  const [parentPhone, setParentPhone] = useState(persistedState.guestProgress?.parentPhone || '');
  const [parentPin, setParentPin] = useState(persistedState.guestProgress?.parentPin || '');
  const [hasParentConsent, setHasParentConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentStepError, setParentStepError] = useState<string | null>(null);

  // Track lesson duration
  const lessonStartTimeRef = useRef<number>(Date.now());
  const completedRef = useRef<boolean>(false);

  // Top interest determines level check and first quest
  const topInterest = selectedInterests[0] || 'math';

  // Determine real first curriculum quest for chosen grade and interest
  const firstQuest = useMemo(() => {
    return getRecommendedNextQuest(selectedGradeId, [], [], topInterest);
  }, [selectedGradeId, topInterest]);

  // Load level check questions when grade or interest changes
  useEffect(() => {
    const questions = getPlacementQuestionsForGrade(selectedGradeId, topInterest);
    setPlacementQuestions(questions);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsOptionCorrect(null);
  }, [selectedGradeId, topInterest]);

  // Track abandonment on unload if onboarding not completed
  useEffect(() => {
    const handleUnload = () => {
      if (!completedRef.current && currentStep !== 'HOME') {
        trackEvent('onboarding_abandoned', { step: currentStep, gradeId: selectedGradeId });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [currentStep, selectedGradeId]);

  // Config-driven enabled steps list
  const enabledSteps = useMemo(
    () => ONBOARDING_STEPS_CONFIG.filter(s => s.enabled),
    []
  );

  const getNextStepId = (fromStep: OnboardingStepId): OnboardingStepId => {
    const currentIndex = enabledSteps.findIndex(s => s.id === fromStep);
    if (currentIndex !== -1 && currentIndex + 1 < enabledSteps.length) {
      return enabledSteps[currentIndex + 1].id;
    }
    return 'HOME';
  };

  const getPrevStepId = (fromStep: OnboardingStepId): OnboardingStepId | null => {
    const currentIndex = enabledSteps.findIndex(s => s.id === fromStep);
    if (currentIndex > 0) {
      return enabledSteps[currentIndex - 1].id;
    }
    return null;
  };

  // Step progression helper
  const goToStep = (nextStep: OnboardingStepId) => {
    sound.playClick();
    setCurrentStep(nextStep);
    setOnboardingStep(nextStep);
  };

  // Step 1: Start -> Grade Picker
  const handleStart = () => {
    trackEvent('onboarding_started');
    goToStep(getNextStepId('WELCOME'));
  };

  // Step 2: Choose Grade -> Interests
  const handleSelectGrade = (gradeId: string) => {
    sound.playClick();
    setSelectedGradeId(gradeId);
    setOnboardingGrade(gradeId);
    trackEvent('grade_selected', { gradeId });
    goToStep(getNextStepId('GRADE'));
  };

  // Step 3: Toggle Interests -> Level Check
  const handleToggleInterest = (id: string) => {
    sound.playClick();
    setSelectedInterestsState(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) return [...prev.slice(1), id]; // Max 3
        return [...prev, id];
      }
    });
  };

  const handleConfirmInterests = () => {
    setOnboardingInterests(selectedInterests);
    trackEvent('interests_selected', {
      interests: selectedInterests,
      topInterest: selectedInterests[0]
    });
    goToStep(getNextStepId('INTERESTS'));
  };

  // Step 4: Level Check Quiz
  const handleSelectLevelOption = (optionId: string) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedOption(optionId);
  };

  const handleCheckLevelAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;
    const currentQ = placementQuestions[currentQIndex];
    if (!currentQ) return;

    const isCorrect = evaluateAnswer(currentQ, selectedOption);
    setIsOptionCorrect(isCorrect);
    setIsAnswerChecked(true);

    if (isCorrect) {
      sound.playCorrect();
      setPlacementScore(prev => prev + 1);
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextLevelQuestion = () => {
    sound.playClick();
    if (currentQIndex + 1 < placementQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsOptionCorrect(null);
    } else {
      finishLevelCheck(placementScore + (isOptionCorrect ? 1 : 0), false);
    }
  };

  const finishLevelCheck = (finalScore: number, skipped: boolean) => {
    recordPlacementResult(finalScore);
    trackEvent('level_check_completed', {
      score: finalScore,
      total: placementQuestions.length,
      skipped
    });
    lessonStartTimeRef.current = Date.now();
    trackEvent('first_lesson_started', {
      questId: firstQuest.id,
      gradeId: selectedGradeId,
      topInterest
    });
    goToStep(getNextStepId('LEVEL_CHECK'));
  };

  const handleSkipLevelCheck = () => {
    sound.playClick();
    finishLevelCheck(0, true);
  };

  // Step 5: First Lesson Modal Handlers
  const handleFirstLessonCompleted = (result: LearningSessionResult) => {
    const duration = Math.round((Date.now() - lessonStartTimeRef.current) / 1000);
    recordFirstLessonCompletion(firstQuest.id, result.xpEarned || 25, result.coinsEarned || 10);
    trackEvent('first_lesson_completed', {
      questId: firstQuest.id,
      earnedXp: result.xpEarned || 25,
      earnedCoins: result.coinsEarned || 10,
      durationSeconds: duration
    });
  };

  const handleFirstLessonClose = () => {
    // Once child closes celebration modal, advance to next step in config
    goToStep(getNextStepId('FIRST_LESSON'));
  };

  // Step 6: Daily Goal -> Save Progress Prompt
  const handleSelectGoal = (minutes: number) => {
    sound.playClick();
    setSelectedGoal(minutes);
    setOnboardingGoal(minutes);
    trackEvent('daily_goal_set', { dailyGoalMinutes: minutes });
    const nextStep = getNextStepId('DAILY_GOAL');
    if (nextStep === 'SAVE_PROGRESS') {
      trackEvent('save_progress_shown');
    }
    if (nextStep === 'HOME') {
      finishOnboardingAsGuest();
    } else {
      goToStep(nextStep);
    }
  };

  // Step 7: Save Progress Prompt Choice
  const handleAcceptSaveProgress = () => {
    sound.playClick();
    const nextStep = getNextStepId('SAVE_PROGRESS');
    if (nextStep === 'HOME') {
      finishOnboardingAsGuest();
    } else {
      goToStep(nextStep);
    }
  };

  const handleSkipSaveProgress = () => {
    sound.playClick();
    trackEvent('save_progress_skipped');
    finishOnboardingAsGuest();
  };

  // Step 8: Parent Guardian Step Submission
  const handleParentSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim()) {
      setParentStepError(language === 'sw' ? 'Tafadhali ingiza jina la mwanafunzi' : "Please enter the child's name or nickname");
      return;
    }

    const cleanPhone = parentPhone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setParentStepError(language === 'sw' ? 'Tafadhali ingiza nambari sahihi ya simu (mfano 0712...)' : 'Please enter a valid Kenyan phone number (e.g. 0712...)');
      return;
    }

    if (!parentPin || parentPin.length < 4) {
      setParentStepError(language === 'sw' ? 'Tafadhali chagua PIN ya tarakimu 4' : 'Please enter a 4-digit Parent PIN');
      return;
    }

    if (!hasParentConsent) {
      setParentStepError(language === 'sw' ? 'Tafadhali kubali idhini ya mlezi kuhifadhi matokeo' : 'Please check the parent/guardian permission box');
      return;
    }

    setIsSubmitting(true);
    setParentStepError(null);

    try {
      setParentContactInfo(cleanPhone, parentPin, learnerName.trim());

      // Attempt registration with local CBE API
      const fakeEmail = `${cleanPhone.replace(/[^0-9]/g, '')}@parent.jifuno.ke`;
      const regRes = await cbeApi.register({
        name: learnerName.trim(),
        email: fakeEmail,
        role: 'STUDENT',
        gradeId: selectedGradeId,
        consentAgreedAt: new Date().toISOString(),
        consentVersion: '2026-v1-kenya-dpa'
      });

      trackEvent('save_progress_completed', {
        hasPhone: true,
        hasPin: true
      });

      completedRef.current = true;
      markOnboardingCompleted();

      const baseStudent: StudentProfile = {
        id: `student-${Date.now()}`,
        userId: regRes.user.id,
        fullName: learnerName.trim(),
        gradeId: selectedGradeId,
        schoolName: 'Simba Primary Academy',
        county: 'Nairobi',
        avatar: 'cheetah',
        level: 1,
        xp: 25,
        coins: 10,
        hearts: 5,
        maxHearts: 5,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        streakFrozen: false,
        unlockedWorldIds: ['world-math-kingdom'],
        completedMissionIds: [firstQuest.id],
        badges: ['badge-seedling-starter'],
        equippedTitle: 'CBC Explorer'
      };

      const mergedProfile = mergeGuestProgressIntoProfile(baseStudent);
      onCompleteOnboarding(regRes.user, mergedProfile);
    } catch (err: any) {
      console.warn('[ParentSave] Fallback to guest progress merge:', err);
      finishOnboardingAsGuest();
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishOnboardingAsGuest = () => {
    completedRef.current = true;
    markOnboardingCompleted();

    const guestUser: User = {
      id: `user-guest-${Date.now()}`,
      name: learnerName.trim() || 'Safari Explorer',
      email: 'guest@jifuno.ke',
      role: 'STUDENT',
      avatar: 'cheetah',
      createdAt: new Date().toISOString()
    };

    const baseStudent: StudentProfile = {
      id: `student-guest-${Date.now()}`,
      userId: guestUser.id,
      fullName: learnerName.trim() || 'Safari Explorer',
      gradeId: selectedGradeId,
      schoolName: 'Jifuno Learning Lab',
      county: 'Kenya',
      avatar: 'cheetah',
      level: 1,
      xp: 25,
      coins: 10,
      hearts: 5,
      maxHearts: 5,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      streakFrozen: false,
      unlockedWorldIds: ['world-math-kingdom'],
      completedMissionIds: [firstQuest.id],
      badges: ['badge-seedling-starter'],
      equippedTitle: 'CBC Explorer'
    };

    const merged = mergeGuestProgressIntoProfile(baseStudent);
    onCompleteOnboarding(guestUser, merged);
  };

  // Back button navigation (config-driven)
  const handleBack = () => {
    sound.playClick();
    const prev = getPrevStepId(currentStep);
    if (prev) {
      goToStep(prev);
    }
  };

  // Calculate step progress percentage based on enabled steps
  const progressIndex = enabledSteps.findIndex(s => s.id === currentStep);
  const maxStepIndex = Math.max(1, enabledSteps.length - 2); // Exclude HOME and 0-index offset
  const progressPercent = Math.min(100, Math.round((Math.max(0, progressIndex) / maxStepIndex) * 100));

  // Current step config
  const stepConfig = ONBOARDING_STEPS_CONFIG.find(s => s.id === currentStep);

  // If in FIRST_LESSON step, render DuolingoLessonModal full screen
  if (currentStep === 'FIRST_LESSON') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between">
        <React.Suspense
          fallback={
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4 text-emerald-400">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-center">
                <h2 className="text-lg font-bold text-white">Loading your first quest...</h2>
                <p className="text-xs text-emerald-300">Rafiki is preparing your questions</p>
              </div>
            </div>
          }
        >
          <DuolingoLessonModal
            isOpen={true}
            missionId={firstQuest.id}
            studentId="guest-learner"
            studentName={learnerName || 'Learner'}
            initialHearts={5}
            onClose={handleFirstLessonClose}
            onMissionCompleted={handleFirstLessonCompleted}
            language={language}
          />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto select-none safe-area-pt safe-area-pb">
      {/* 1. Header with Back Button and Progress Bar */}
      <header className="flex items-center justify-between gap-3 pt-2 pb-3">
        {stepConfig?.allowBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 hover:text-white flex items-center justify-center text-xl cursor-pointer transition-all active:scale-95 shadow-sm"
            aria-label="Back"
          >
            ←
          </button>
        ) : (
          <div className="w-11 h-11" />
        )}

        {/* Progress Bar */}
        {stepConfig?.showProgressBar ? (
          <div className="flex-1 max-w-[220px] mx-2">
            <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full shadow-sm shadow-emerald-500/30"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Top Right Skip Button (for skippable steps) */}
        {stepConfig?.skippable ? (
          <button
            type="button"
            onClick={() => {
              if (currentStep === 'LEVEL_CHECK') handleSkipLevelCheck();
              else if (currentStep === 'SAVE_PROGRESS' || currentStep === 'PARENT_STEP') handleSkipSaveProgress();
            }}
            className="text-xs font-black tracking-wide text-amber-400 hover:text-amber-300 hover:underline cursor-pointer py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/20 active:scale-95 transition-all"
          >
            {language === 'sw' ? 'Ruka' : 'Skip'}
          </button>
        ) : (
          <div className="w-11 h-11" />
        )}
      </header>

      {/* 2. Main Step Screen Container */}
      <main className="flex-1 flex flex-col justify-center py-2">
        <AnimatePresence mode="wait">
          {/* STEP 1: WELCOME */}
          {currentStep === 'WELCOME' && (
            <motion.div
              key="welcome-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="text-center space-y-6 max-w-sm mx-auto"
            >
              <div className="relative w-36 h-36 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/25 via-emerald-500/20 to-teal-500/25 border-2 border-emerald-400/50 flex items-center justify-center text-7xl shadow-2xl shadow-emerald-500/10">
                <span className="animate-bounce">🦉</span>
                <span className="absolute -bottom-2.5 bg-slate-900 border-2 border-emerald-400 text-emerald-300 text-xs font-black px-3 py-0.5 rounded-full shadow-md">
                  Rafiki
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black text-white leading-tight">
                  {language === 'sw' ? 'Jambo! Mimi ni Rafiki.' : "Hi! I'm Rafiki."}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                  {language === 'sw'
                    ? 'Jifunze masomo ya CBC ya Kenya kwa michezo na changamoto za kila siku!'
                    : "Learn Kenya's CBC curriculum through fun games and daily quests!"}
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-lg tracking-wide uppercase shadow-lg shadow-emerald-500/25 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{language === 'sw' ? 'Anza Safari' : 'Start Learning'}</span>
                  <span className="text-xl">➔</span>
                </button>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-xs sm:text-sm font-bold text-gray-400 hover:text-emerald-400 transition-colors py-2 px-4 rounded-xl cursor-pointer"
                  >
                    {language === 'sw'
                      ? 'Tayari una akaunti? Ingia hapa'
                      : 'Already have an account? Log in'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GRADE PICKER */}
          {currentStep === 'GRADE' && (
            <motion.div
              key="grade-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white">
                  {language === 'sw' ? 'Uko gredi gani?' : 'Which grade are you in?'}
                </h2>
                <p className="text-xs text-gray-400">
                  {language === 'sw'
                    ? 'Chagua gredi yako kulingana na mtaala wa CBC'
                    : 'Choose your grade to get CBC curriculum quests'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {GRADES.map(g => {
                  const isSelected = selectedGradeId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelectGrade(g.id)}
                      className={`w-full min-h-[64px] p-4 rounded-2xl border-2 text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-400 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                          {g.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-white">{g.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-gray-300">
                              {g.ageRange}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {language === 'sw' ? g.descSw : g.descEn}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg text-emerald-400 font-bold">➔</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: INTEREST PICKER */}
          {currentStep === 'INTERESTS' && (
            <motion.div
              key="interests-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white">
                  {language === 'sw' ? 'Unapenda kujifunza nini?' : 'What do you love exploring?'}
                </h2>
                <p className="text-xs text-gray-400">
                  {language === 'sw'
                    ? 'Chagua masomo unayopenda zaidi (1 hadi 3)'
                    : 'Pick 1 to 3 subjects you enjoy most'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {INTEREST_SUBJECTS.map(subj => {
                  const isSelected = selectedInterests.includes(subj.id);
                  return (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => handleToggleInterest(subj.id)}
                      className={`w-full min-h-[58px] p-3.5 rounded-2xl border-2 text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? `${subj.bgClass} ${subj.borderClass} ring-1 ring-emerald-400/40`
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subj.icon}</span>
                        <div>
                          <div className="font-black text-sm text-white">
                            {language === 'sw' ? subj.nameSw : subj.nameEn}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {language === 'sw' ? subj.taglineSw : subj.taglineEn}
                          </div>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 text-xs font-black'
                          : 'border-slate-700 bg-slate-950'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleConfirmInterests}
                  disabled={selectedInterests.length === 0}
                  className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>{language === 'sw' ? 'Endelea' : 'Continue'}</span>
                  <span>➔</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: QUICK LEVEL CHECK */}
          {currentStep === 'LEVEL_CHECK' && (
            <motion.div
              key="level-check-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦉</span>
                  <span className="text-xs font-bold text-emerald-400">
                    {language === 'sw'
                      ? `Swali la ${currentQIndex + 1} kati ya ${placementQuestions.length}`
                      : `Question ${currentQIndex + 1} of ${placementQuestions.length}`}
                  </span>
                </div>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {language === 'sw' ? 'Uhakiki wa Haraka' : 'Quick Level Check'}
                </span>
              </div>

              {placementQuestions[currentQIndex] ? (
                <div className="space-y-4">
                  {/* Question Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                    <p className="text-base sm:text-lg font-bold text-white leading-snug">
                      {language === 'sw' && placementQuestions[currentQIndex].swahiliPrompt
                        ? placementQuestions[currentQIndex].swahiliPrompt
                        : placementQuestions[currentQIndex].prompt}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {placementQuestions[currentQIndex].options?.map(opt => {
                      const isSelected = selectedOption === opt.id;
                      let btnStyle = 'bg-slate-900/90 border-slate-800 text-gray-200 hover:border-slate-700';

                      if (isAnswerChecked) {
                        const isThisCorrect = opt.id === placementQuestions[currentQIndex].correctOptionId;
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-black';
                        } else if (isSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectLevelOption(opt.id)}
                          className={`w-full min-h-[56px] p-3.5 rounded-2xl border-2 text-left text-sm sm:text-base font-semibold transition-all active:scale-98 cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt.text}</span>
                          {isAnswerChecked && opt.id === placementQuestions[currentQIndex].correctOptionId && (
                            <span className="text-emerald-400 font-black">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2">
                    {!isAnswerChecked ? (
                      <button
                        type="button"
                        onClick={handleCheckLevelAnswer}
                        disabled={!selectedOption}
                        className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {language === 'sw' ? 'Kagua Jibu' : 'Check Answer'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextLevelQuestion}
                        className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>{language === 'sw' ? 'Endelea' : 'Continue'}</span>
                        <span>➔</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">Loading diagnostic questions...</p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 6: DAILY GOAL & STREAK START */}
          {currentStep === 'DAILY_GOAL' && (
            <motion.div
              key="daily-goal-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4"
            >
              {/* Celebration Banner from Lesson */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl animate-bounce">🔥</span>
                  <span className="text-base font-black text-amber-300">
                    {language === 'sw' ? 'Mfululizo wa Siku 1 Umeanza!' : '1-Day Streak Started!'}
                  </span>
                </div>
                <p className="text-xs text-gray-300">
                  {language === 'sw'
                    ? 'Umepata +25 XP! Chagua lengo la kila siku ili kuendeleza ushindi.'
                    : 'You earned +25 XP! Pick your daily goal to keep the flame alive.'}
                </p>
              </div>

              <div className="text-center space-y-1 pt-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'sw' ? 'Chagua lengo lako la kila siku' : 'Pick your daily learning target'}
                </h2>
                <p className="text-xs text-gray-400">
                  {language === 'sw'
                    ? 'Unaweza kubadilisha lengo hili wakati wowote'
                    : 'You can adjust this anytime in your profile'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {DAILY_GOAL_OPTIONS.map(g => {
                  const isSelected = selectedGoal === g.minutes;
                  return (
                    <button
                      key={g.minutes}
                      type="button"
                      onClick={() => handleSelectGoal(g.minutes)}
                      className={`w-full min-h-[60px] p-4 rounded-2xl border-2 text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-950/70 border-emerald-400 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl">{g.icon}</span>
                        <div>
                          <div className="font-black text-sm sm:text-base text-white">
                            {language === 'sw' ? g.labelSw : g.labelEn}
                          </div>
                          <div className="text-xs text-emerald-400 font-semibold">
                            {language === 'sw' ? g.tierSw : g.tierEn} • {g.xpExpected} XP / day
                          </div>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-black text-base">➔</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 7: SAVE PROGRESS PROMPT (DELAYED SIGN-UP) */}
          {currentStep === 'SAVE_PROGRESS' && (
            <motion.div
              key="save-progress-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="text-center space-y-6 max-w-sm mx-auto"
            >
              <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/60 flex items-center justify-center text-5xl shadow-2xl shadow-emerald-500/10">
                <span>🛡️</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'sw' ? 'Hifadhi Maendeleo Yako!' : 'Save Your Progress!'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                  {language === 'sw'
                    ? 'Umepata XP na kuanza mfululizo. Mwombe mzazi au mlezi akusaidie kuhifadhi ushindi wako ili usipotee.'
                    : "You've earned XP and started your streak! Ask a parent or guardian to help save your progress so it's never lost."}
                </p>
              </div>

              {/* Progress Summary Pill */}
              <div className="flex items-center justify-center gap-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
                <span className="text-emerald-400">⚡ 25 XP</span>
                <span className="text-amber-400">🪙 10 Shilingi</span>
                <span className="text-rose-400">🔥 1-Day Streak</span>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleAcceptSaveProgress}
                  className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{language === 'sw' ? 'Hifadhi na Mzazi' : 'Save with Parent'}</span>
                  <span>➔</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkipSaveProgress}
                  className="w-full py-3 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {language === 'sw' ? 'Baadaye (Gundua kama Mgeni)' : 'Later (Explore as Guest)'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: PARENT / GUARDIAN HANDOFF */}
          {currentStep === 'PARENT_STEP' && (
            <motion.div
              key="parent-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
                  <span>👨‍👩‍👧</span>
                  <span>{language === 'sw' ? 'Sehemu ya Mzazi / Mlezi' : 'Parent / Guardian Zone'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'sw' ? 'Hifadhi Akaunti ya Mwanafunzi' : 'Lock in Learner Progress'}
                </h2>
                <p className="text-xs text-gray-400">
                  {language === 'sw'
                    ? 'Weka nambari ya simu na PIN ya tarakimu 4 kulinda akaunti'
                    : 'Enter your phone number & a 4-digit PIN to secure this account'}
                </p>
              </div>

              {parentStepError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{parentStepError}</span>
                </div>
              )}

              <form onSubmit={handleParentSave} className="space-y-3 pt-1">
                {/* Child Name / Nickname */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {language === 'sw' ? 'Jina la Kwanza la Mwanafunzi' : "Child's First Name or Nickname"}
                  </label>
                  <input
                    type="text"
                    value={learnerName}
                    onChange={e => setLearnerName(e.target.value)}
                    placeholder={language === 'sw' ? 'Mfano: Amina' : 'e.g. Amina'}
                    className="w-full min-h-[50px] px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    maxLength={30}
                    required
                  />
                </div>

                {/* Parent Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {language === 'sw' ? 'Nambari ya Simu ya Mzazi (Kenya)' : 'Parent Phone Number (Kenya)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      🇰🇪 +254
                    </span>
                    <input
                      type="tel"
                      value={parentPhone}
                      onChange={e => setParentPhone(e.target.value)}
                      placeholder="0712 345 678"
                      className="w-full min-h-[50px] pl-20 pr-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* 4-digit PIN */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {language === 'sw' ? 'PIN Rahisi ya Mzazi (Tarakimu 4)' : 'Parent 4-Digit PIN'}
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={parentPin}
                    onChange={e => setParentPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="1234"
                    className="w-full min-h-[50px] px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-gray-500 text-sm tracking-widest text-center font-mono focus:outline-none focus:border-emerald-400 transition-colors"
                    required
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    {language === 'sw'
                      ? 'PIN hii itatumika kurejesha au kuingia kwenye simu nyingine'
                      : 'Used to sign in or recover progress on other devices'}
                  </p>
                </div>

                {/* Child Safety & Consent Box */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasParentConsent}
                      onChange={e => setHasParentConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                    />
                    <span className="text-xs text-gray-300 leading-tight">
                      {language === 'sw'
                        ? 'Mimi ni mzazi/mlezi na ninakubali kuhifadhi matokeo ya mwanafunzi kulingana na sheria ya Kenya DPA (2019).'
                        : 'I am a parent or guardian and give permission to save learning progress under the Kenya Data Protection Act.'}
                    </span>
                  </label>
                  <p className="text-[10px] text-emerald-400/80">
                    🛡️ {language === 'sw' ? 'Hakuna matangazo au uuzaji wa data.' : 'Zero ads. Minimum data. Progress only.'}
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{language === 'sw' ? 'Inahifadhi...' : 'Saving...'}</span>
                    ) : (
                      <>
                        <span>{language === 'sw' ? 'Hifadhi na Anza Masomo' : 'Save & Start Learning'}</span>
                        <span>➔</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={finishOnboardingAsGuest}
                    className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {language === 'sw' ? 'Ruka kwa sasa (Endelea kama mgeni)' : 'Skip for now (Continue as guest)'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer Privacy Note */}
      <footer className="pt-3 text-center border-t border-slate-900/80">
        <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 font-medium">
          <span>Jifuno CBC © 2026</span>
          {onNavigateLegal && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateLegal('privacy')}
                className="hover:text-gray-300 underline cursor-pointer"
              >
                Privacy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigateLegal('terms')}
                className="hover:text-gray-300 underline cursor-pointer"
              >
                Terms
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};
