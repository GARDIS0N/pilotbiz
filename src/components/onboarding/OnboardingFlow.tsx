import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/soundEffects.js';
import { useReducedMotionPreference, springTransition } from '../../utils/motion.js';
import {
  getOnboardingState,
  setOnboardingStep,
  setOnboardingGrade,
  setOnboardingGoal,
  recordPlacementResult,
  recordFirstLessonCompletion,
  mergeGuestProgressIntoProfile,
  markOnboardingCompleted,
  OnboardingStep
} from '../../services/onboardingStorage.js';
import { getPlacementQuestionsForGrade } from '../../services/placementQuestions.js';
import { evaluateAnswer, resolveCorrectAnswerText } from '../../utils/answerValidation.js';
import { Question, User, StudentProfile, LearningSessionResult } from '../../types/cbe.js';
import { getRecommendedNextQuest } from '../../data/curriculum/index.js';
import { DuolingoLessonModal } from '../session/DuolingoLessonModal.js';
import { cbeApi } from '../../services/cbeApi.js';

interface Props {
  onCompleteOnboarding: (user: User, studentProfile: StudentProfile) => void;
  onOpenLogin: () => void;
  language?: 'en' | 'sw';
}

const GRADES = [
  {
    id: 'grade-3',
    name: 'Grade 3',
    ageRange: 'Age 8–9',
    levelGroup: 'Lower Primary',
    icon: '🌱',
    desc: 'Foundational Math, Literacy & Environment'
  },
  {
    id: 'grade-4',
    name: 'Grade 4',
    ageRange: 'Age 9–10',
    levelGroup: 'Upper Primary',
    icon: '🐆',
    desc: 'Multiplication arrays, Science & Agriculture'
  },
  {
    id: 'grade-5',
    name: 'Grade 5',
    ageRange: 'Age 10–11',
    levelGroup: 'Upper Primary',
    icon: '🌾',
    desc: 'Fractions, Decimals & Intermediate Tech'
  },
  {
    id: 'grade-6',
    name: 'Grade 6',
    ageRange: 'Age 11–12',
    levelGroup: 'Upper Primary',
    icon: '🏆',
    desc: 'Algebra, Geometry & CBC Assessment'
  }
];

const GOALS = [
  {
    minutes: 5,
    title: '5 min / day',
    labelEn: 'Easy',
    labelSw: 'Rahisi',
    icon: '⚡',
    desc: 'A quick, bite-sized daily habit'
  },
  {
    minutes: 10,
    title: '10 min / day',
    labelEn: 'Regular',
    labelSw: 'Kawaida',
    icon: '🌟',
    desc: 'Recommended for steady growth'
  },
  {
    minutes: 15,
    title: '15 min / day',
    labelEn: 'Intense',
    labelSw: 'Makini',
    icon: '🔥',
    desc: 'Master CBC strands faster'
  }
];

export const OnboardingFlow: React.FC<Props> = ({
  onCompleteOnboarding,
  onOpenLogin,
  language = 'en'
}) => {
  const reducedMotion = useReducedMotionPreference();

  // Load existing or resumed state
  const [persistedState, setPersistedState] = useState(getOnboardingState);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(() => {
    const s = persistedState.step;
    if (s === 'GRADE' || s === 'GOAL' || s === 'PLACEMENT' || s === 'FIRST_LESSON' || s === 'SIGNUP') {
      return s;
    }
    return 'WELCOME';
  });

  const [selectedGradeId, setSelectedGradeId] = useState<string>(persistedState.gradeId || 'grade-4');
  const [selectedGoal, setSelectedGoal] = useState<number>(persistedState.dailyGoalMinutes || 10);

  // Placement test state
  const [placementQuestions, setPlacementQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean | null>(null);
  const [placementScore, setPlacementScore] = useState(0);

  // Sign Up Form State (COPPA & Kenya Data Protection compliant)
  const [learnerName, setLearnerName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [hasParentConsent, setHasParentConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  // Determine real first curriculum quest for chosen grade
  const firstQuest = useMemo(() => {
    return getRecommendedNextQuest(selectedGradeId, []);
  }, [selectedGradeId]);

  // Load placement questions whenever grade changes
  useEffect(() => {
    const questions = getPlacementQuestionsForGrade(selectedGradeId);
    setPlacementQuestions(questions);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  }, [selectedGradeId]);

  // Screen 1 -> Screen 2
  const handleStartOnboarding = () => {
    sound.playClick();
    setOnboardingStep('GRADE');
    setCurrentStep('GRADE');
  };

  // Screen 2: Tap Grade -> Auto-advance to Screen 3
  const handleSelectGrade = (gradeId: string) => {
    sound.playClick();
    setSelectedGradeId(gradeId);
    setOnboardingGrade(gradeId);

    setTimeout(() => {
      setOnboardingStep('GOAL');
      setCurrentStep('GOAL');
    }, 200);
  };

  // Screen 3: Tap Goal -> Auto-advance to Screen 4 (Placement)
  const handleSelectGoal = (minutes: number) => {
    sound.playClick();
    setSelectedGoal(minutes);
    setOnboardingGoal(minutes);

    setTimeout(() => {
      setOnboardingStep('PLACEMENT');
      setCurrentStep('PLACEMENT');
    }, 200);
  };

  // Screen 4: Check placement question answer
  const handleCheckPlacementAnswer = () => {
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
      sound.playWrong();
    }
  };

  // Screen 4: Advance to next question or complete placement
  const handleNextPlacementQuestion = () => {
    sound.playClick();
    if (currentQIndex + 1 < placementQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsOptionCorrect(null);
    } else {
      finishPlacement(placementScore + (isOptionCorrect ? 1 : 0));
    }
  };

  // Finish placement and start Screen 5 (First Lesson)
  const finishPlacement = (finalScore: number) => {
    recordPlacementResult(finalScore);
    setOnboardingStep('FIRST_LESSON');
    setCurrentStep('FIRST_LESSON');
  };

  const handleSkipPlacement = () => {
    sound.playClick();
    finishPlacement(0);
  };

  // Screen 5 -> Screen 6 (Celebration to Sign-Up)
  const handleFirstLessonCompleted = (result: LearningSessionResult) => {
    // Record rewards into anonymous state
    recordFirstLessonCompletion(firstQuest.id, result.xpEarned || 25, result.coinsEarned || 10);
  };

  const handleFirstLessonModalClose = () => {
    // When learner clicks CONTINUE on the lesson celebration screen, advance to Sign-Up
    setOnboardingStep('SIGNUP');
    setCurrentStep('SIGNUP');
  };

  // Screen 6: Submit Sign-Up Form (COPPA / Kenya DPA compliant)
  const handleSaveProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim()) {
      setSignUpError(language === 'sw' ? 'Tafadhali ingiza jina lako la kwanza' : 'Please enter your first name');
      return;
    }
    if (!parentEmail.trim() || !parentEmail.includes('@')) {
      setSignUpError(language === 'sw' ? 'Tafadhali ingiza barua pepe sahihi ya mzazi/mlezi' : 'Please enter a valid parent or guardian email');
      return;
    }
    if (!hasParentConsent) {
      setSignUpError(language === 'sw' ? 'Tafadhali thibitisha idhini ya mzazi/mlezi' : 'Please check parent/guardian permission');
      return;
    }

    setIsSubmitting(true);
    setSignUpError(null);

    try {
      sound.playClick();
      const res = await cbeApi.register({
        name: learnerName.trim(),
        email: parentEmail.trim(),
        role: 'STUDENT',
        gradeId: selectedGradeId,
        county: 'Nairobi',
        schoolName: 'Primary School'
      });

      const baseStudent: StudentProfile = {
        id: res.user.studentProfileId || `student-${Date.now()}`,
        userId: res.user.id,
        fullName: learnerName.trim(),
        gradeId: selectedGradeId,
        schoolName: 'Primary School',
        county: 'Nairobi',
        avatar: 'cheetah',
        level: 1,
        xp: 0,
        coins: 0,
        hearts: 5,
        maxHearts: 5,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        streakFrozen: false,
        unlockedWorldIds: ['world-math-kingdom'],
        completedMissionIds: [],
        badges: ['badge-first-lesson'],
        equippedTitle: 'Savanna Explorer',
        parentUserId: res.user.id
      };

      const mergedProfile = mergeGuestProgressIntoProfile(baseStudent);
      onCompleteOnboarding(res.user, mergedProfile);
    } catch (err: any) {
      console.warn('[Onboarding] Registration error:', err);
      // Fallback guest creation if offline
      handleContinueAsGuest();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Screen 6: Skip / Play as Guest
  const handleContinueAsGuest = () => {
    sound.playClick();
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: learnerName.trim() || 'Learner',
      email: parentEmail.trim() || 'guest@jifuno.ke',
      role: 'STUDENT',
      avatar: 'cheetah',
      createdAt: new Date().toISOString()
    };

    const guestStudent: StudentProfile = {
      id: `student-guest-${Date.now()}`,
      userId: guestUser.id,
      fullName: learnerName.trim() || 'Learner',
      gradeId: selectedGradeId,
      schoolName: 'CBC Academy',
      county: 'Kenya',
      avatar: 'cheetah',
      level: 1,
      xp: 0,
      coins: 0,
      hearts: 5,
      maxHearts: 5,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      streakFrozen: false,
      unlockedWorldIds: ['world-math-kingdom'],
      completedMissionIds: [],
      badges: ['badge-first-lesson'],
      equippedTitle: 'Savanna Explorer'
    };

    const mergedProfile = mergeGuestProgressIntoProfile(guestStudent);
    onCompleteOnboarding(guestUser, mergedProfile);
  };

  // Back Navigation Helper
  const handleBack = () => {
    sound.playClick();
    if (currentStep === 'GRADE') {
      setOnboardingStep('WELCOME');
      setCurrentStep('WELCOME');
    } else if (currentStep === 'GOAL') {
      setOnboardingStep('GRADE');
      setCurrentStep('GRADE');
    } else if (currentStep === 'PLACEMENT') {
      setOnboardingStep('GOAL');
      setCurrentStep('GOAL');
    } else if (currentStep === 'SIGNUP') {
      setOnboardingStep('PLACEMENT');
      setCurrentStep('PLACEMENT');
    }
  };

  // Progress dot indicator (Steps 1 to 4)
  const stepIndex = currentStep === 'WELCOME' ? 1 : currentStep === 'GRADE' ? 2 : currentStep === 'GOAL' ? 3 : 4;

  const currentQ = placementQuestions[currentQIndex];

  // Screen 5: Full-Screen First Lesson Modal
  if (currentStep === 'FIRST_LESSON') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between">
        <DuolingoLessonModal
          isOpen={true}
          missionId={firstQuest.id}
          studentId="guest-student"
          studentName={learnerName || 'Learner'}
          initialHearts={5}
          onClose={handleFirstLessonModalClose}
          onMissionCompleted={handleFirstLessonCompleted}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto select-none safe-area-pt safe-area-pb">
      {/* 1. Header: Back Button + Progress Dots */}
      <header className="flex items-center justify-between gap-3 pt-2 pb-4">
        {currentStep !== 'WELCOME' && currentStep !== 'SIGNUP' ? (
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-300 hover:text-white flex items-center justify-center text-lg cursor-pointer transition-all active:scale-95 min-h-[44px]"
            aria-label="Back"
          >
            ←
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Progress Dots Indicator */}
        {currentStep !== 'SIGNUP' ? (
          <div
            className="flex items-center gap-2"
            role="progressbar"
            aria-valuenow={stepIndex}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-label={`Step ${stepIndex} of 4`}
          >
            {[1, 2, 3, 4].map(idx => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === stepIndex
                    ? 'w-8 bg-emerald-400 ring-2 ring-emerald-400/40 shadow-sm'
                    : idx < stepIndex
                    ? 'w-3 bg-emerald-600'
                    : 'w-2.5 bg-slate-800'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            <span>✨</span>
            <span>Final Step: Save Progress</span>
          </div>
        )}

        {/* Top Right Skip Link for Placement */}
        {currentStep === 'PLACEMENT' ? (
          <button
            type="button"
            onClick={handleSkipPlacement}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer py-1.5 px-2"
          >
            {language === 'sw' ? 'Ruka' : 'Skip'}
          </button>
        ) : (
          <div className="w-10" />
        )}
      </header>

      {/* 2. Main Animated Screen Body */}
      <main className="flex-1 flex flex-col justify-center py-2">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: WELCOME */}
          {currentStep === 'WELCOME' && (
            <motion.div
              key="welcome-screen"
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="text-center space-y-6 max-w-sm mx-auto"
            >
              <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 via-yellow-400/20 to-emerald-500/20 border-2 border-amber-400/60 flex items-center justify-center text-7xl shadow-2xl shadow-amber-500/10">
                <span className="animate-bounce">🦉</span>
                <span className="absolute -bottom-2.5 bg-slate-900 border border-amber-400 text-amber-300 text-[11px] font-black px-3 py-0.5 rounded-full shadow-md">
                  Rafiki
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {language === 'sw' ? 'Jambo! Mimi ni Rafiki.' : "Hi! I'm Rafiki."}
                </h2>
                <p className="text-base sm:text-lg font-bold text-emerald-400">
                  {language === 'sw' ? 'Tujifunze pamoja kwenye Jifuno!' : "Let's learn together!"}
                </p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed pt-1">
                  {language === 'sw'
                    ? 'Programu rasmi ya kujifunzia ya CBC Kenya kwa darasa la 3 hadi 6.'
                    : 'The authentic Kenyan CBC learning adventure for Grades 3 to 6.'}
                </p>
              </div>

              <div className="space-y-3 pt-6">
                <button
                  type="button"
                  onClick={handleStartOnboarding}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-lg tracking-wide shadow-xl shadow-emerald-500/30 transition-all cursor-pointer active:scale-98 min-h-[56px] flex items-center justify-center gap-2"
                >
                  <span>{language === 'sw' ? 'ANZA SASA' : 'GET STARTED'}</span>
                  <span>➔</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'sw' ? 'Tayari nina akaunti • Ingia' : 'I already have an account'}
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: CHOOSE GRADE */}
          {currentStep === 'GRADE' && (
            <motion.div
              key="grade-screen"
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="space-y-4 w-full"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'sw' ? 'Uko katika darasa gani?' : 'Which grade are you in?'}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === 'sw' ? 'Gusa darasa lako ili kuendelea' : 'Tap your grade to continue'}
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
                      className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all cursor-pointer min-h-[72px] active:scale-98 shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/60 shadow-emerald-500/20'
                          : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                        {g.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-white">{g.name}</span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                            {g.ageRange}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{g.desc}</p>
                      </div>

                      <span className="text-gray-500 text-lg font-bold">➔</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: DAILY GOAL */}
          {currentStep === 'GOAL' && (
            <motion.div
              key="goal-screen"
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="space-y-4 w-full"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'sw'
                    ? 'Ungependa kujifunza kwa muda gani kila siku?'
                    : 'What is your daily learning goal?'}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === 'sw'
                    ? 'Dakika chache kila siku hujenga umilisi dhabiti'
                    : 'A few focused minutes each day builds lasting skills'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {GOALS.map(goal => {
                  const isSelected = selectedGoal === goal.minutes;

                  return (
                    <button
                      key={goal.minutes}
                      type="button"
                      onClick={() => handleSelectGoal(goal.minutes)}
                      className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all cursor-pointer min-h-[76px] active:scale-98 shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/60 shadow-emerald-500/20'
                          : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                        {goal.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-white">{goal.title}</span>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/60">
                            {language === 'sw' ? goal.labelSw : goal.labelEn}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{goal.desc}</p>
                      </div>

                      <span className="text-gray-500 text-lg font-bold">➔</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: OPTIONAL PLACEMENT TEST */}
          {currentStep === 'PLACEMENT' && currentQ && (
            <motion.div
              key={`placement-q-${currentQIndex}`}
              initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={springTransition}
              className="space-y-4 w-full"
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 px-1">
                <span>
                  Question {currentQIndex + 1} of {placementQuestions.length}
                </span>
                <span className="text-amber-300">🦉 Diagnostic Check</span>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 shadow-xl space-y-2 text-left">
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  CBC DIAGNOSTIC
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {currentQ.prompt}
                </h4>
              </div>

              <div className="space-y-3 pt-2">
                {currentQ.type === 'TRUE_FALSE' ? (
                  <div className="grid grid-cols-2 gap-3">
                    {['True', 'False'].map(tf => {
                      const isSelected = selectedOption?.toLowerCase() === tf.toLowerCase();

                      return (
                        <button
                          key={tf}
                          type="button"
                          disabled={isAnswerChecked}
                          onClick={() => {
                            sound.playClick();
                            setSelectedOption(tf);
                          }}
                          className={`p-4 rounded-2xl border-2 font-black text-lg sm:text-xl transition-all cursor-pointer min-h-[56px] active:scale-95 text-center ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-950/80 text-white ring-2 ring-emerald-400'
                              : 'border-slate-800 bg-slate-900 text-gray-200 hover:border-slate-700'
                          }`}
                        >
                          {tf}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  currentQ.options?.map(opt => {
                    const isSelected = selectedOption === opt.id || selectedOption === opt.text;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => {
                          sound.playClick();
                          setSelectedOption(opt.id);
                        }}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-black text-base sm:text-lg transition-all cursor-pointer min-h-[56px] active:scale-98 flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/80 text-white ring-2 ring-emerald-400'
                            : 'border-slate-800 bg-slate-900 text-gray-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="leading-snug">{opt.text}</span>
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                            isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Instant feedback drawer */}
              {isAnswerChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border-2 space-y-1.5 text-left shadow-lg ${
                    isOptionCorrect
                      ? 'bg-emerald-950/95 border-emerald-400 text-emerald-200'
                      : 'bg-amber-950/95 border-amber-500 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{isOptionCorrect ? '🎉' : '💡'}</span>
                    <span className="font-black text-base text-white">
                      {isOptionCorrect ? 'Hongera! Correct!' : 'Almost! Try again later.'}
                    </span>
                  </div>
                  {!isOptionCorrect && (
                    <p className="text-xs font-bold text-amber-300">
                      Correct Answer: {resolveCorrectAnswerText(currentQ)}
                    </p>
                  )}
                  {currentQ.explanation && (
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {currentQ.explanation.split('.')[0]}.
                    </p>
                  )}
                </motion.div>
              )}

              <div className="pt-3">
                {!isAnswerChecked ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleCheckPlacementAnswer}
                    className={`w-full py-4 rounded-2xl font-black text-base transition-all min-h-[56px] shadow-lg ${
                      selectedOption
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 cursor-pointer active:scale-98'
                        : 'bg-slate-800 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    CHECK ANSWER
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextPlacementQuestion}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base transition-all min-h-[56px] shadow-xl cursor-pointer active:scale-98"
                  >
                    {currentQIndex + 1 < placementQuestions.length ? 'CONTINUE ➔' : 'START FIRST LESSON ➔'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: CELEBRATION & CHILD-SAFE SIGN-UP */}
          {currentStep === 'SIGNUP' && (
            <motion.div
              key="signup-screen"
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={springTransition}
              className="space-y-5 w-full text-left"
            >
              {/* Rewards Celebration Header */}
              <div className="p-4 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 shadow-xl flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl shrink-0 shadow-lg animate-bounce">
                  🏆
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {language === 'sw' ? 'Hongera Sana!' : 'Lesson Complete!'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs font-black">
                    <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                      ⚡ +25 XP
                    </span>
                    <span className="text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded-md border border-yellow-800">
                      🪙 +10 Coins
                    </span>
                    <span className="text-amber-400">⭐⭐⭐</span>
                  </div>
                </div>
              </div>

              {/* Rafiki Dialogue Bubble */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-xs text-amber-200">
                <span className="text-2xl shrink-0">🦉</span>
                <p className="leading-relaxed">
                  {language === 'sw'
                    ? '"Vizuri sana! Hifadhi maendeleo yako sasa ili usipoteze sarafu au mfululizo wako wa masomo."'
                    : '"Awesome work! Save your progress now so you never lose your coins, stars, or learning streak."'}
                </p>
              </div>

              {/* Child-Safe Sign Up Form (Under 13 COPPA & Kenya Data Protection Act) */}
              <form onSubmit={handleSaveProgress} className="space-y-3.5 pt-1">
                {signUpError && (
                  <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500 text-amber-200 text-xs font-medium">
                    ⚠️ {signUpError}
                  </div>
                )}

                {/* Field 1: Learner First Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 block">
                    {language === 'sw' ? 'Jina lako la Kwanza' : "Learner's First Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={learnerName}
                    onChange={e => setLearnerName(e.target.value)}
                    placeholder="e.g. Amina"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-800 focus:border-emerald-400 text-white font-medium text-base outline-none transition-all min-h-[50px]"
                  />
                </div>

                {/* Field 2: Parent / Guardian Email */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300">
                      {language === 'sw' ? 'Barua Pepe ya Mzazi / Mlezi' : "Parent or Guardian's Email"}
                    </label>
                    <span className="text-[10px] text-emerald-400 font-medium">Age &lt; 13 Safe</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={parentEmail}
                    onChange={e => setParentEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border-2 border-slate-800 focus:border-emerald-400 text-white font-medium text-base outline-none transition-all min-h-[50px]"
                  />
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {language === 'sw'
                      ? 'Mzazi wako atapokea ripoti za maendeleo ya masomo yako ya CBC.'
                      : 'Your parent or guardian will receive reports on your CBC learning progress.'}
                  </p>
                </div>

                {/* Field 3: Consent Checkbox */}
                <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 cursor-pointer text-xs text-gray-300 leading-relaxed hover:border-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasParentConsent}
                    onChange={e => setHasParentConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-950 border-slate-700 cursor-pointer shrink-0"
                  />
                  <span>
                    {language === 'sw'
                      ? 'Nina idhini kutoka kwa mzazi au mlezi wangu ya kujifunza kwenye Jifuno.'
                      : 'I have permission from my parent or guardian to learn on Jifuno.'}
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !learnerName || !parentEmail || !hasParentConsent}
                    className={`w-full py-4 rounded-2xl font-black text-base transition-all min-h-[56px] shadow-xl flex items-center justify-center gap-2 ${
                      learnerName && parentEmail && hasParentConsent && !isSubmitting
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/30 cursor-pointer active:scale-98'
                        : 'bg-slate-800 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>{isSubmitting ? 'SAVING...' : 'SAVE MY PROGRESS ➔'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleContinueAsGuest}
                    className="w-full py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    {language === 'sw' ? 'Cheza kama Mgeni kwa sasa' : 'Play as Guest for now'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
