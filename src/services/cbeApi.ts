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
      return { learningAreas: fallbackLearningAreas };
    }
  }

  public async getStrands(learningAreaId?: string): Promise<{ strands: Strand[] }> {
    try {
      const query = learningAreaId ? `?learningAreaId=${encodeURIComponent(learningAreaId)}` : '';
      return await this.request(`/api/curriculum/strands${query}`);
    } catch {
      return { strands: fallbackStrands };
    }
  }

  public async getSubStrands(strandId?: string): Promise<{ subStrands: SubStrand[] }> {
    try {
      const query = strandId ? `?strandId=${encodeURIComponent(strandId)}` : '';
      return await this.request(`/api/curriculum/sub-strands${query}`);
    } catch {
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
}

export const cbeApi = new CbeApiService();
