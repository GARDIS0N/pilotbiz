import React, { useState, useEffect } from 'react';
import { Mission, Lesson, Question, LearningSessionResult } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';
import { MultipleChoiceQuestion } from '../questions/MultipleChoiceQuestion.js';
import { TrueFalseQuestion } from '../questions/TrueFalseQuestion.js';
import { MatchingQuestion } from '../questions/MatchingQuestion.js';
import { OrderingQuestion } from '../questions/OrderingQuestion.js';
import { FillBlankQuestion } from '../questions/FillBlankQuestion.js';
import { ScenarioQuestion } from '../questions/ScenarioQuestion.js';
import { AITutorModal } from '../tutor/AITutorModal.js';
import { CelebrationModal } from '../common/CelebrationModal.js';

interface Props {
  isOpen: boolean;
  missionId: string | null;
  studentId: string;
  studentName?: string;
  gradeName?: string;
  onClose: () => void;
  onMissionCompleted: (result: LearningSessionResult) => void;
}

type SessionStage = 'INTRO' | 'PLAYING' | 'FEEDBACK' | 'SUMMARY';

export const LearningSessionModal: React.FC<Props> = ({
  isOpen,
  missionId,
  studentId,
  studentName = 'Amina',
  gradeName = 'Grade 4',
  onClose,
  onMissionCompleted
}) => {
  const [stage, setStage] = useState<SessionStage>('INTRO');
  const [loading, setLoading] = useState(true);
  const [mission, setMission] = useState<Mission | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // User input tracking
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [answersList, setAnswersList] = useState<{
    questionId: string;
    selectedAnswer: any;
    timeSpentSeconds: number;
    usedHint: boolean;
  }[]>([]);

  // Feedback state for current question
  const [lastFeedback, setLastFeedback] = useState<{
    isCorrect?: boolean;
    explanation?: string;
    socraticHint?: string;
  } | null>(null);

  // Completed session result
  const [sessionResult, setSessionResult] = useState<LearningSessionResult | null>(null);
  const [questionReviews, setQuestionReviews] = useState<any[]>([]);

  // Socratic Tutor Modal
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  useEffect(() => {
    if (isOpen && missionId) {
      loadMissionData(missionId);
    }
  }, [isOpen, missionId]);

  const loadMissionData = async (mId: string) => {
    setLoading(true);
    setStage('INTRO');
    setCurrentIdx(0);
    setCurrentAnswer(null);
    setAnswersList([]);
    setLastFeedback(null);
    setSessionResult(null);

    try {
      const data = await cbeApi.getMissionDetails(mId);
      setMission(data.mission);
      setLesson(data.lesson || null);
      setQuestions(data.questions);
    } catch (err) {
      console.error('Failed to load mission details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !missionId) return null;

  const currentQ = questions[currentIdx];

  const handleStartQuestions = () => {
    sound.playClick();
    setStage('PLAYING');
  };

  const handleCheckAnswer = () => {
    if (currentAnswer === null || currentAnswer === undefined || currentAnswer === '') return;
    sound.playClick();

    // Record answer
    const newAnswers = [
      ...answersList,
      {
        questionId: currentQ.id,
        selectedAnswer: currentAnswer,
        timeSpentSeconds: 15,
        usedHint: false
      }
    ];
    setAnswersList(newAnswers);

    // Provide friendly in-session feedback
    setLastFeedback({
      explanation: currentQ.explanation,
      socraticHint: currentQ.socraticHint
    });
    setStage('FEEDBACK');
  };

  const handleNextQuestion = async () => {
    sound.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setCurrentAnswer(null);
      setLastFeedback(null);
      setStage('PLAYING');
    } else {
      // Completed all questions -> submit session to server!
      setLoading(true);
      try {
        const submission = await cbeApi.submitSession({
          studentId,
          missionId: mission!.id,
          answers: answersList
        });

        if (submission.result.leveledUp) {
          sound.playLevelUp();
        } else if (submission.result.scorePercentage >= 60) {
          sound.playCorrect();
        } else {
          sound.playIncorrect();
        }

        if (submission.result.scorePercentage >= 60 || submission.result.leveledUp) {
          setIsCelebrationOpen(true);
        }

        setSessionResult(submission.result);
        setQuestionReviews(submission.questionReviews);
        setStage('SUMMARY');
        onMissionCompleted(submission.result);
      } catch (err) {
        console.error('Session submission error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-2xl min-h-[520px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Navigation HUD */}
        <div className="bg-slate-950/90 border-b border-emerald-900/60 p-3.5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="text-gray-400 hover:text-white text-sm font-bold flex items-center gap-1"
            >
              ✕ Exit
            </button>
            <div className="h-4 w-[1px] bg-emerald-900/80" />
            <span className="text-xs md:text-sm font-bold text-emerald-200 truncate max-w-[200px]">
              {mission?.title || 'Learning Mission'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {stage === 'PLAYING' && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                <span>Q {currentIdx + 1} of {questions.length}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsTutorOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-amber-500/20 border border-amber-500/60 hover:bg-amber-500/30 text-amber-300 font-bold px-3 py-1 rounded-full transition-all cursor-pointer"
            >
              <span>🦉</span>
              <span className="hidden sm:inline">Ask Mwalimu</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-emerald-300">Loading your adventure...</p>
            </div>
          ) : stage === 'INTRO' && mission ? (
            /* STAGE 1: INTRO & CONCEPT LEARN */
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-4 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-md shrink-0">
                  {mission.characterAvatar === 'cheetah' ? '🐆' : mission.characterAvatar === 'lion' ? '🦁' : '🦉'}
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    Mission Briefing with {mission.characterName}
                  </div>
                  <h2 className="text-xl font-black text-white">{mission.title}</h2>
                  <p className="text-xs text-emerald-300/80 italic">{mission.swahiliTitle}</p>
                </div>
              </div>

              {/* Story Context */}
              <div className="bg-slate-950/80 border border-emerald-900/60 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  🌱 Story Context
                </h4>
                <p className="text-sm text-emerald-100 leading-relaxed">
                  {mission.storyContext}
                </p>
                {lesson?.conceptIntro && (
                  <p className="text-sm text-gray-300 leading-relaxed border-t border-emerald-900/40 pt-2">
                    {lesson.conceptIntro}
                  </p>
                )}
              </div>

              {/* Kenyan Context & Vocabulary */}
              {lesson?.didYouKnowKenyanFact && (
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-200">
                  <span className="text-lg">🇰🇪</span>
                  <div>
                    <span className="font-bold">Kenyan CBE Insight: </span>
                    {lesson.didYouKnowKenyanFact}
                  </div>
                </div>
              )}

              {/* Rewards Preview */}
              <div className="flex items-center justify-between p-3.5 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-xs font-bold">
                <span className="text-gray-300">Mission Rewards:</span>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-300">+{mission.xpReward} XP ⚡</span>
                  <span className="text-amber-400">+{mission.coinReward} Coins 🪙</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartQuestions}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-lg tracking-wide shadow-xl shadow-emerald-950/80 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>LET'S PLAY!</span>
                <span>🚀</span>
              </button>
            </div>
          ) : (stage === 'PLAYING' || stage === 'FEEDBACK') && currentQ ? (
            /* STAGE 2: QUESTION CHALLENGE & FEEDBACK */
            <div className="space-y-6 animate-fade-in">
              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-emerald-900/60">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Renderer */}
              {currentQ.type === 'MULTIPLE_CHOICE' && (
                <MultipleChoiceQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}
              {currentQ.type === 'TRUE_FALSE' && (
                <TrueFalseQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}
              {currentQ.type === 'MATCHING' && (
                <MatchingQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}
              {currentQ.type === 'ORDERING' && (
                <OrderingQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}
              {currentQ.type === 'FILL_BLANK' && (
                <FillBlankQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}
              {currentQ.type === 'SCENARIO' && (
                <ScenarioQuestion
                  question={currentQ}
                  selectedAnswer={currentAnswer}
                  onSelectAnswer={setCurrentAnswer}
                  disabled={stage === 'FEEDBACK'}
                />
              )}

              {/* Feedback Drawer */}
              {stage === 'FEEDBACK' && lastFeedback && (
                <div className="bg-emerald-950/80 border-2 border-emerald-500/60 rounded-2xl p-4 space-y-2 animate-fade-in shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <span className="text-lg">💡</span>
                    <span>Explanation & CBE Learning Concept:</span>
                  </div>
                  <p className="text-xs md:text-sm text-emerald-100 leading-relaxed">
                    {lastFeedback.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : stage === 'SUMMARY' && sessionResult ? (
            /* STAGE 3: SUMMARY & REWARD SCREEN */
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-xl shadow-amber-950/60">
                {sessionResult.scorePercentage >= 80 ? '🏆' : '🌟'}
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {sessionResult.scorePercentage >= 80 ? 'Hongera Sana! Great Job!' : 'Mission Completed!'}
                </h2>
                <p className="text-sm text-emerald-300 font-medium mt-1">
                  You scored {sessionResult.scorePercentage}% ({sessionResult.correctAnswersCount}/{sessionResult.totalQuestions} correct)
                </p>
              </div>

              {/* Level Up Banner */}
              {sessionResult.leveledUp && (
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-black p-3.5 rounded-2xl shadow-xl animate-pulse text-sm md:text-base">
                  🎉 LEVEL UP! You reached Level {sessionResult.newLevel}!
                </div>
              )}

              {/* Stats Rewards */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-emerald-950/60 border border-emerald-700/60 rounded-2xl p-4">
                  <span className="text-xs text-gray-400 uppercase font-bold">XP Earned</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    +{sessionResult.xpEarned} ⚡
                  </div>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-700/60 rounded-2xl p-4">
                  <span className="text-xs text-gray-400 uppercase font-bold">Coins Earned</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    +{sessionResult.coinsEarned} 🪙
                  </div>
                </div>
              </div>

              {/* Newly Unlocked Achievements */}
              {sessionResult.unlockedAchievements.length > 0 && (
                <div className="bg-slate-950/80 border border-amber-500/40 rounded-2xl p-4 text-left space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    🎖️ New Achievement Unlocked!
                  </span>
                  {sessionResult.unlockedAchievements.map(ach => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <span className="text-2xl">🏅</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        <p className="text-xs text-gray-300">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Questions Review Accordion */}
              <div className="text-left bg-slate-950/60 border border-emerald-900/60 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Review & Competency Feedback ({questionReviews.length} questions)
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {questionReviews.map((rev, idx) => (
                    <div
                      key={rev.questionId}
                      className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                        rev.isCorrect
                          ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-200'
                          : 'border-amber-800/80 bg-amber-950/40 text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <span>{rev.isCorrect ? '✅ Question ' + (idx + 1) + ' Correct' : '💡 Question ' + (idx + 1) + ' Review'}</span>
                      </div>
                      <p>{rev.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl transition-all cursor-pointer"
              >
                RETURN TO WORLD MAP 🗺️
              </button>
            </div>
          ) : null}
        </div>

        {/* Bottom Action Footer for Question Playing */}
        {(stage === 'PLAYING' || stage === 'FEEDBACK') && (
          <div className="bg-slate-950 border-t border-emerald-900/60 p-4 px-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsTutorOpen(true)}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>💡 Need a hint? Ask Mwalimu</span>
            </button>

            {stage === 'PLAYING' ? (
              <button
                type="button"
                disabled={currentAnswer === null || currentAnswer === undefined || currentAnswer === ''}
                onClick={handleCheckAnswer}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                CHECK ANSWER
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{currentIdx + 1 < questions.length ? 'NEXT QUESTION' : 'SEE RESULTS'}</span>
                <span>➔</span>
              </button>
            )}
          </div>
        )}

        {/* Embedded Socratic AI Tutor Modal */}
        <AITutorModal
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          studentName={studentName}
          gradeName={gradeName}
          activeQuestion={stage === 'PLAYING' || stage === 'FEEDBACK' ? currentQ : null}
          activeTopic={mission?.title}
        />

        {/* Quest Completion & Level-Up Confetti Celebration Modal */}
        {sessionResult && (
          <CelebrationModal
            isOpen={isCelebrationOpen}
            onClose={() => setIsCelebrationOpen(false)}
            title={sessionResult.leveledUp ? 'Hongera Sana! Level Up!' : 'Hongera Sana! Quest Cleared!'}
            subtitle={`You earned +${sessionResult.xpEarned} XP and +${sessionResult.coinsEarned} Shilingi Coins!`}
            xpEarned={sessionResult.xpEarned}
            coinsEarned={sessionResult.coinsEarned}
            currentXp={420 + sessionResult.xpEarned}
            currentLevel={sessionResult.newLevel || 3}
            leveledUp={sessionResult.leveledUp}
          />
        )}
      </div>
    </div>
  );
};
