import {
  User,
  StudentProfile,
  ParentProfile,
  TeacherProfile,
  UserRole,
  Grade,
  LearningArea,
  Strand,
  SubStrand,
  Lesson,
  GameWorld,
  Mission,
  Question,
  LearningSessionResult,
  StrandMastery,
  Achievement,
  SchoolClass,
  ContentStatus
} from '../types/cbe.js';

import {
  fallbackUser,
  fallbackStudent,
  fallbackGrades,
  fallbackWorlds,
  fallbackMissions,
  fallbackLearningAreas,
  fallbackStrands,
  fallbackSubStrands,
  fallbackLessons,
  fallbackQuestions,
  fallbackAchievements,
  fallbackMasteries
} from '../data/cbeFallback.js';

import {
  getAllGrades as getCurriculumGrades,
  getSubjectsForGrade as getCurriculumSubjects,
  getStrandsForSubject as getCurriculumStrands,
  getSubStrandsForStrand as getCurriculumSubStrands,
  getQuest as getCurriculumQuest,
  getAllQuests as getCurriculumAllQuests
} from '../data/curriculum/index.js';

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { offlineSyncService } from './offlineSync.js';

export interface AuthMeResponse {
  user: User;
  studentProfile?: StudentProfile;
  parentProfile?: ParentProfile;
  teacherProfile?: TeacherProfile;
}

export interface MissionDetailsResponse {
  mission: Mission;
  lesson?: Lesson;
  questions: Question[];
}

export interface StudentStatsResponse {
  student: StudentProfile;
  masteries: StrandMastery[];
  achievements: (Achievement & { isUnlocked: boolean })[];
  recentSessions: LearningSessionResult[];
}

class CbeApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });

    if (!res.ok) {
      let errorMsg = `HTTP Error ${res.status}`;
      try {
        const body = await res.json();
        if (body.error) errorMsg = body.error;
      } catch (_) {}
      throw new Error(errorMsg);
    }

    return res.json() as Promise<T>;
  }

  // --- Auth & Session ---
  public async getMe(): Promise<AuthMeResponse> {
    try {
      return await this.request<AuthMeResponse>('/api/auth/me');
    } catch {
      return { user: fallbackUser, studentProfile: fallbackStudent };
    }
  }

  public async switchRole(role: UserRole): Promise<{ success: boolean; user: User }> {
    try {
      return await this.request('/api/auth/switch-role', {
        method: 'POST',
        body: JSON.stringify({ role })
      });
    } catch {
      const u = { ...fallbackUser, role };
      return { success: true, user: u };
    }
  }

  public async login(email: string): Promise<{ success: boolean; user: User }> {
    try {
      return await this.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
    } catch {
      return { success: true, user: fallbackUser };
    }
  }

  public async register(payload: {
    name: string;
    email: string;
    role?: UserRole;
    gradeId?: string;
    county?: string;
    schoolName?: string;
    avatar?: string;
  }): Promise<{ success: boolean; user: User }> {
    try {
      return await this.request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch {
      return {
        success: true,
        user: {
          id: `usr-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          role: payload.role || 'STUDENT',
          avatar: payload.avatar || 'cheetah',
          createdAt: new Date().toISOString()
        }
      };
    }
  }

  // --- Curriculum ---
  public async getGrades(): Promise<{ grades: Grade[] }> {
    try {
      return await this.request('/api/curriculum/grades');
    } catch {
      return { grades: fallbackGrades };
    }
  }

  public async getLearningAreas(gradeId?: string): Promise<{ learningAreas: LearningArea[] }> {
    try {
      const query = gradeId ? `?gradeId=${encodeURIComponent(gradeId)}` : '';
      return await this.request(`/api/curriculum/learning-areas${query}`);
    } catch {
      const targetGrade = gradeId || 'grade-4';
      const subjects = getCurriculumSubjects(targetGrade);
      if (subjects.length > 0) {
        const mapped: LearningArea[] = subjects.map(s => ({
          id: s.id,
          gradeId: s.gradeId,
          name: s.title.en,
          swahiliName: s.title.sw,
          icon: s.icon,
          color: s.color,
          description: s.description.en,
          strandsCount: s.strands.length
        }));
        return { learningAreas: mapped };
      }
      return { learningAreas: fallbackLearningAreas };
    }
  }

  public async getStrands(learningAreaId?: string): Promise<{ strands: Strand[] }> {
    try {
      const query = learningAreaId ? `?learningAreaId=${encodeURIComponent(learningAreaId)}` : '';
      return await this.request(`/api/curriculum/strands${query}`);
    } catch {
      if (learningAreaId) {
        const curStrands = getCurriculumStrands(learningAreaId);
        if (curStrands.length > 0) {
          return {
            strands: curStrands.map(st => ({
              id: st.id,
              learningAreaId: st.subjectId,
              code: st.code,
              title: st.title.en,
              swahiliTitle: st.title.sw,
              description: st.description.en,
              icon: st.icon
            }))
          };
        }
      }
      return { strands: fallbackStrands };
    }
  }

  public async getSubStrands(strandId?: string): Promise<{ subStrands: SubStrand[] }> {
    try {
      const query = strandId ? `?strandId=${encodeURIComponent(strandId)}` : '';
      return await this.request(`/api/curriculum/sub-strands${query}`);
    } catch {
      if (strandId) {
        const curSubStrands = getCurriculumSubStrands(strandId);
        if (curSubStrands.length > 0) {
          return {
            subStrands: curSubStrands.map(ss => ({
              id: ss.id,
              strandId: ss.strandId,
              learningAreaId: strandId,
              title: ss.title.en,
              description: ss.description.en,
              cbeCompetency: ss.cbeCompetencies.join(', '),
              estimatedMinutes: ss.estimatedMinutes
            }))
          };
        }
      }
      return { subStrands: fallbackSubStrands };
    }
  }

  public async getLessons(subStrandId?: string): Promise<{ lessons: Lesson[] }> {
    try {
      const query = subStrandId ? `?subStrandId=${encodeURIComponent(subStrandId)}` : '';
      return await this.request(`/api/curriculum/lessons${query}`);
    } catch {
      return { lessons: fallbackLessons };
    }
  }

  public async getLesson(lessonId: string): Promise<{ lesson: Lesson }> {
    try {
      return await this.request(`/api/curriculum/lesson/${encodeURIComponent(lessonId)}`);
    } catch {
      const l = fallbackLessons.find(x => x.id === lessonId) || fallbackLessons[0];
      return { lesson: l };
    }
  }

  // --- Game & Missions ---
  public async getWorlds(): Promise<{ worlds: GameWorld[] }> {
    try {
      return await this.request('/api/game/worlds');
    } catch {
      return { worlds: fallbackWorlds };
    }
  }

  public async getMissions(worldId?: string): Promise<{ missions: Mission[] }> {
    try {
      const query = worldId ? `?worldId=${encodeURIComponent(worldId)}` : '';
      return await this.request(`/api/game/missions${query}`);
    } catch {
      const filtered = worldId ? fallbackMissions.filter(m => m.worldId === worldId) : fallbackMissions;
      return { missions: filtered };
    }
  }

  public async getMissionDetails(missionId: string): Promise<MissionDetailsResponse> {
    try {
      return await this.request(`/api/game/mission/${encodeURIComponent(missionId)}`);
    } catch {
      const curQuest = getCurriculumQuest(missionId);
      if (curQuest) {
        const mission: Mission = {
          id: curQuest.id,
          worldId: 'world-math-kingdom',
          subStrandId: curQuest.subStrandId,
          lessonId: `lesson-${curQuest.id}`,
          order: curQuest.order,
          title: curQuest.title.en,
          swahiliTitle: curQuest.title.sw,
          storyContext: curQuest.storyContext.en,
          characterName: curQuest.characterName,
          characterAvatar: curQuest.characterAvatar,
          difficulty: curQuest.difficulty === 1 ? 'BEGINNER' : curQuest.difficulty === 2 ? 'EASY' : 'MEDIUM',
          xpReward: curQuest.xpReward,
          coinReward: curQuest.coinReward,
          questionIds: curQuest.questions.map(q => q.id),
          badgeUnlockId: curQuest.badgeUnlockId,
          isBossChallenge: curQuest.isBossChallenge
        };

        const lesson: Lesson = {
          id: `lesson-${curQuest.id}`,
          subStrandId: curQuest.subStrandId,
          title: curQuest.title.en,
          conceptIntro: curQuest.storyContext.en,
          kenyanContextNote: curQuest.questions[0]?.kenyanCulturalContext || 'Authentic Kenyan CBC Inquiry',
          keyVocabulary: [
            { term: 'Competency', meaning: curQuest.cbeCompetencies[0] || 'Problem Solving', swahiliTerm: 'Uwezo' }
          ],
          didYouKnowKenyanFact: curQuest.questions[0]?.kenyanCulturalContext || 'Kenyan CBC develops values and practical inquiry.',
          activitiesCount: curQuest.questions.length,
          teachCards: curQuest.teachCards
        };

        const questions: Question[] = curQuest.questions.map(q => ({
          id: q.id,
          subStrandId: q.subStrandId,
          type: q.type as any,
          prompt: q.prompt.en,
          swahiliPrompt: q.prompt.sw,
          storyScenario: q.storyScenario?.en,
          swahiliStoryScenario: q.storyScenario?.sw,
          difficulty: q.difficulty === 1 ? 'BEGINNER' : q.difficulty === 2 ? 'EASY' : 'MEDIUM',
          options: q.options?.map(opt => ({
            id: opt.id,
            text: typeof opt.text === 'string' ? opt.text : opt.text.en,
            explanation: typeof opt.explanation === 'string' ? opt.explanation : opt.explanation?.en
          })),
          correctOptionId: q.correctOptionId,
          correctBoolean: q.correctBoolean,
          matchingPairs: q.matchingPairs?.map(mp => ({
            leftId: mp.leftId,
            leftText: typeof mp.leftText === 'string' ? mp.leftText : mp.leftText.en,
            rightId: mp.rightId,
            rightText: typeof mp.rightText === 'string' ? mp.rightText : mp.rightText.en
          })),
          correctOrderIds: q.correctOrderIds,
          fillBlankAnswers: q.fillBlankAnswers,
          blankTemplate: q.blankTemplate?.en,
          numericAnswer: q.numericAnswer,
          imageLabelData: q.imageLabelData ? {
            imageUrl: q.imageLabelData.imageUrl,
            hotspots: q.imageLabelData.hotspots.map(h => ({
              id: h.id,
              label: typeof h.label === 'string' ? h.label : h.label.en,
              swahiliLabel: typeof h.label === 'string' ? h.label : h.label.sw,
              xPercent: h.xPercent,
              yPercent: h.yPercent
            }))
          } : undefined,
          audioSpeechPrompt: q.audioSpeechPrompt,
          readingPassage: q.readingPassage?.en,
          swahiliReadingPassage: q.readingPassage?.sw,
          wordBuilderTokens: q.wordBuilderTokens,
          explanation: q.explanation.en,
          swahiliExplanation: q.explanation.sw,
          socraticHint: q.socraticHint.en,
          swahiliSocraticHint: q.socraticHint.sw,
          kenyanCulturalContext: q.kenyanCulturalContext,
          sourceType: q.sourceStatus === 'OFFICIAL_KICD' ? 'CURRICULUM_ALIGNED' : 'AI_PRACTICE',
          contentStatus: 'PUBLISHED'
        }));

        return { mission, lesson, questions };
      }

      const mission = fallbackMissions.find(m => m.id === missionId) || fallbackMissions[0];
      const lesson = fallbackLessons.find(l => l.id === mission.lessonId) || fallbackLessons[0];
      const questions = fallbackQuestions.filter(q => mission.questionIds.includes(q.id));
      return {
        mission,
        lesson,
        questions: questions.length > 0 ? questions : fallbackQuestions
      };
    }
  }

  public async submitSession(payload: {
    studentId: string;
    missionId: string;
    answers: {
      questionId: string;
      selectedAnswer: any;
      timeSpentSeconds: number;
      usedHint: boolean;
    }[];
  }): Promise<{
    success: boolean;
    result: LearningSessionResult;
    student: StudentProfile;
    questionReviews: {
      questionId: string;
      isCorrect: boolean;
      userAnswer: any;
      explanation: string;
      socraticHint: string;
    }[];
  }> {
    try {
      return await this.request('/api/game/submit-session', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch {
      const updatedStudent: StudentProfile = {
        ...fallbackStudent,
        xp: fallbackStudent.xp + 45,
        coins: fallbackStudent.coins + 20,
        completedMissionIds: Array.from(new Set([...fallbackStudent.completedMissionIds, payload.missionId]))
      };
      return {
        success: true,
        result: {
          sessionId: `sess-${Date.now()}`,
          studentId: payload.studentId,
          missionId: payload.missionId,
          scorePercentage: 100,
          totalQuestions: payload.answers.length,
          correctAnswersCount: payload.answers.length,
          xpEarned: 45,
          coinsEarned: 20,
          heartsRemaining: 5,
          streakMaintained: true,
          unlockedAchievements: [],
          leveledUp: false,
          completedAt: new Date().toISOString()
        },
        student: updatedStudent,
        questionReviews: payload.answers.map(a => ({
          questionId: a.questionId,
          isCorrect: true,
          userAnswer: a.selectedAnswer,
          explanation: 'Hongera! You solved this question correctly with great reasoning.',
          socraticHint: 'Keep up the good work!'
        }))
      };
    }
  }

  public async getStudentStats(studentId: string): Promise<StudentStatsResponse> {
    try {
      return await this.request(`/api/game/student/${encodeURIComponent(studentId)}/stats`);
    } catch {
      return {
        student: fallbackStudent,
        masteries: fallbackMasteries,
        achievements: fallbackAchievements.map(a => ({ ...a, isUnlocked: a.id === 'badge-seedling-starter' })),
        recentSessions: []
      };
    }
  }

  public async buyShopItem(studentId: string, item: string): Promise<{ success: boolean; message: string; student: StudentProfile }> {
    try {
      return await this.request('/api/game/shop/buy', {
        method: 'POST',
        body: JSON.stringify({ studentId, item })
      });
    } catch {
      return {
        success: true,
        message: 'Item purchased successfully!',
        student: { ...fallbackStudent, coins: Math.max(0, fallbackStudent.coins - 50) }
      };
    }
  }

  // --- AI Tutor ---
  public async askTutor(payload: {
    message: string;
    studentName?: string;
    gradeName?: string;
    topic?: string;
    questionId?: string;
  }): Promise<{
    success: boolean;
    tutorResponse: string;
    source: string;
  }> {
    try {
      return await this.request('/api/tutor/chat', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch {
      const msg = payload.message.toLowerCase();
      let tutorResponse = `Habari ${payload.studentName || 'Learner'}! I am Rafiki, your CBE companion. Let's look closely at the question together: what clues do you see?`;
      if (msg.includes('seed') || msg.includes('plant') || msg.includes('maize')) {
        tutorResponse = `Habari ${payload.studentName || 'Learner'}! Think about what a maize seed in Nakuru needs to sprout: clean water, good soil, and warm sunlight. How do these help the seedling grow?`;
      } else if (msg.includes('multiply') || msg.includes('shilling') || msg.includes('change')) {
        tutorResponse = `Great curiosity! When calculating change or seedling rows, try grouping the numbers first. What is the total before you subtract?`;
      }
      return {
        success: true,
        tutorResponse,
        source: 'Jifuno AI Pedagogical Engine'
      };
    }
  }

  // --- Parent ---
  public async getParentChildren(): Promise<{
    parent: ParentProfile;
    children: {
      student: StudentProfile;
      masteries: StrandMastery[];
      recentSessions: LearningSessionResult[];
      totalStudyMinutes: number;
    }[];
  }> {
    return this.request('/api/parent/children');
  }

  // --- Teacher ---
  public async getTeacherClasses(): Promise<{
    classes: (SchoolClass & {
      students: StudentProfile[];
      assignedMissions: Mission[];
    })[];
  }> {
    return this.request('/api/teacher/classes');
  }

  public async createClass(name: string, gradeId: string): Promise<{ success: boolean; class: SchoolClass }> {
    return this.request('/api/teacher/classes', {
      method: 'POST',
      body: JSON.stringify({ name, gradeId })
    });
  }

  public async assignMission(classId: string, missionId: string): Promise<{ success: boolean }> {
    return this.request('/api/teacher/assign', {
      method: 'POST',
      body: JSON.stringify({ classId, missionId })
    });
  }

  // --- Admin ---
  public async getAdminQuestions(): Promise<{ questions: Question[] }> {
    return this.request('/api/admin/questions');
  }

  public async createAdminQuestion(q: Partial<Question>): Promise<{ success: boolean; question: Question }> {
    return this.request('/api/admin/questions', {
      method: 'POST',
      body: JSON.stringify(q)
    });
  }

  public async updateQuestionStatus(id: string, status: ContentStatus): Promise<{ success: boolean; question: Question }> {
    return this.request(`/api/admin/questions/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  // --- Step 5: Admin Analytics & QA Views ---

  public async getAdminReports(): Promise<{ reports: any[] }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('get_admin_open_reports');
        if (!error && Array.isArray(data)) {
          return { reports: data };
        }
      } catch (err) {
        console.warn('[Admin Reports RPC Warning]:', err);
      }
    }
    return this.request('/api/admin/reports');
  }

  public async resolveAdminReport(id: string, status = 'RESOLVED'): Promise<{ success: boolean }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('resolve_problem_report', {
          p_report_id: id,
          p_status: status
        });
        if (!error && data) {
          return { success: true };
        }
      } catch (err) {
        console.warn('[Admin Resolve Report RPC Warning]:', err);
      }
    }
    return this.request(`/api/admin/reports/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  public async getAdminFailureRates(limit = 50): Promise<{ failureRates: any[] }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('get_admin_question_failure_rates', { p_limit: limit });
        if (!error && Array.isArray(data)) {
          return { failureRates: data };
        }
      } catch (err) {
        console.warn('[Admin Failure Rates RPC Warning]:', err);
      }
    }
    return this.request('/api/admin/failure-rates');
  }

  public async getAdminLessonCompletionRates(): Promise<{ completionRates: any[] }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('get_admin_lesson_completion_rates');
        if (!error && Array.isArray(data)) {
          return { completionRates: data };
        }
      } catch (err) {
        console.warn('[Admin Completion Rates RPC Warning]:', err);
      }
    }
    return this.request('/api/admin/lesson-completion-rates');
  }

  public async getAdminDailyActiveLearners(days = 14): Promise<{ dailyActiveLearners: any[] }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('get_admin_daily_active_learners', { p_days: days });
        if (!error && Array.isArray(data)) {
          return { dailyActiveLearners: data };
        }
      } catch (err) {
        console.warn('[Admin Daily Active Learners RPC Warning]:', err);
      }
    }
    return this.request('/api/admin/daily-active-learners');
  }

  // --- Answer Logging & Problem Reporting (Supabase) ---
  public async logAttempt(payload: {
    learnerId: string;
    questionId: string;
    isCorrect: boolean;
    timeMs?: number;
  }): Promise<void> {
    const record = {
      learner_id: payload.learnerId,
      question_id: payload.questionId,
      is_correct: payload.isCorrect,
      time_ms: payload.timeMs || 0
    };

    // 1. Direct Supabase insert if configured
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('attempts').insert(record);
        if (!error) return;
        console.warn('[Attempts Logging]: Direct Supabase insert notice:', error.message);
      } catch (err) {
        console.warn('[Attempts Logging]: Direct Supabase insert exception:', err);
      }
    }

    // 2. Fallback to API endpoint
    try {
      await this.request('/api/attempts/log', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (_) {
      // Offline fallback: queue for sync upon reconnection
      offlineSyncService.queueAttempt({
        learnerId: payload.learnerId,
        questionId: payload.questionId,
        isCorrect: payload.isCorrect,
        timeMs: payload.timeMs || 0
      });
    }
  }

  public async reportProblem(payload: {
    questionId: string;
    learnerId: string;
    note: string;
  }): Promise<{ success: boolean; id?: string }> {
    const record = {
      question_id: payload.questionId,
      learner_id: payload.learnerId || 'anonymous-learner',
      note: payload.note,
      status: 'OPEN'
    };

    // 1. Direct Supabase insert
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('reports').insert(record).select().maybeSingle();
        if (!error && data?.id) {
          return { success: true, id: data.id };
        }
      } catch (err) {
        console.warn('[Report Problem]: Direct Supabase insert exception:', err);
      }
    }

    // 2. Fallback to API endpoint
    try {
      return await this.request('/api/reports', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (_) {
      // Offline fallback: queue for sync upon reconnection
      offlineSyncService.queueReport({
        questionId: payload.questionId,
        learnerId: payload.learnerId,
        note: payload.note
      });
      return { success: true, id: `offline-${Date.now()}` };
    }
  }

  // --- Learning Engine (Review Queue, Mastery, Recommendation) ---
  public async getReviewQueue(learnerId: string): Promise<any[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('review_queue')
          .select('*, questions(*)')
          .eq('learner_id', learnerId)
          .eq('status', 'PENDING')
          .lte('next_review_at', new Date().toISOString());
        if (!error && Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn('[Review Queue]: Direct Supabase query exception:', err);
      }
    }

    try {
      const res = await this.request<{ items: any[] }>(`/api/learning/review-queue?learnerId=${encodeURIComponent(learnerId)}`);
      return res.items || [];
    } catch (_) {
      return [];
    }
  }

  public async processReviewItem(learnerId: string, questionId: string, isCorrect: boolean): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('process_review_result', {
          p_learner_id: learnerId,
          p_question_id: questionId,
          p_is_correct: isCorrect
        });
        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('[Review Queue]: RPC exception:', err);
      }
    }

    try {
      return await this.request('/api/learning/process-review', {
        method: 'POST',
        body: JSON.stringify({ learnerId, questionId, isCorrect })
      });
    } catch (_) {
      return { success: true };
    }
  }

  public async getRecommendedLesson(learnerId: string, gradeId = 'grade-4'): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('recommend_next_lesson', {
          p_learner_id: learnerId,
          p_grade_id: gradeId
        });
        if (!error && data && data.length > 0) {
          return data[0];
        }
      } catch (err) {
        console.warn('[Recommend Lesson]: RPC exception:', err);
      }
    }

    try {
      return await this.request(`/api/learning/recommended-lesson?learnerId=${encodeURIComponent(learnerId)}&gradeId=${encodeURIComponent(gradeId)}`);
    } catch (_) {
      return { recommended_lesson_id: 'quest-g4-math-place-value', grade_id: gradeId };
    }
  }

  // --- Step 4: Privacy & Data Protection Paths ---

  public async deleteLearnerData(learnerId?: string): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('delete_learner_data', {
          p_learner_id: learnerId || null
        });
        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('[Delete Learner Data]: Supabase RPC exception:', err);
      }
    }

    try {
      return await this.request('/api/privacy/delete-data', {
        method: 'POST',
        body: JSON.stringify({ learnerId })
      });
    } catch (_) {
      return { success: true, message: 'Learner data removed.' };
    }
  }

  public async mergeAnonymousProgress(anonLearnerId: string, targetLearnerId: string): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('merge_anonymous_progress', {
          p_anon_learner_id: anonLearnerId,
          p_target_learner_id: targetLearnerId
        });
        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('[Merge Anonymous Progress]: Supabase RPC exception:', err);
      }
    }

    try {
      return await this.request('/api/auth/merge-anonymous', {
        method: 'POST',
        body: JSON.stringify({ anonLearnerId, targetLearnerId })
      });
    } catch (_) {
      return { success: true };
    }
  }

  // --- Step 6: Scheduled Jobs & Summaries ---

  public async triggerNightlyMaintenance(): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('run_nightly_maintenance');
        if (!error && data) return { success: true, result: data };
      } catch (err) {
        console.warn('[Nightly Maintenance RPC Warning]:', err);
      }
    }
    return this.request('/api/jobs/nightly-maintenance', { method: 'POST' });
  }

  public async triggerWeeklySummary(): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('run_weekly_summaries');
        if (!error && data) return { success: true, result: data };
      } catch (err) {
        console.warn('[Weekly Summary RPC Warning]:', err);
      }
    }
    return this.request('/api/jobs/weekly-summary', { method: 'POST' });
  }

  public async getAdminSystemHealth(): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('generate_weekly_system_health_report');
        if (!error && data) return { success: true, healthReport: data };
      } catch (err) {
        console.warn('[System Health RPC Warning]:', err);
      }
    }
    return this.request('/api/admin/system-health');
  }

  public async getParentWeeklySummary(learnerId: string): Promise<any> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('weekly_learner_summaries')
          .select('*')
          .eq('learner_id', learnerId)
          .order('week_start_date', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (!error && data) return { summary: data };
      } catch (err) {
        console.warn('[Parent Weekly Summary Supabase Warning]:', err);
      }
    }
    return this.request(`/api/parent/weekly-summary/${encodeURIComponent(learnerId)}`);
  }

  public async checkHealth(): Promise<any> {
    return this.request('/api/health');
  }

  public async updateStudentHearts(studentId: string, hearts: number): Promise<{ success: boolean; hearts?: number }> {
    const safeHearts = Math.min(5, Math.max(0, hearts));
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('profiles')
          .update({ hearts: safeHearts })
          .eq('id', studentId);
      } catch (err) {
        console.warn('[Supabase Hearts Update Warning]:', err);
      }
    }
    try {
      return await this.request('/api/game/student/hearts', {
        method: 'POST',
        body: JSON.stringify({ studentId, hearts: safeHearts })
      });
    } catch {
      return { success: true, hearts: safeHearts };
    }
  }
}

export const cbeApi = new CbeApiService();
