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
    return this.request<AuthMeResponse>('/api/auth/me');
  }

  public async switchRole(role: UserRole): Promise<{ success: boolean; user: User }> {
    return this.request('/api/auth/switch-role', {
      method: 'POST',
      body: JSON.stringify({ role })
    });
  }

  public async login(email: string): Promise<{ success: boolean; user: User }> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
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
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // --- Curriculum ---
  public async getGrades(): Promise<{ grades: Grade[] }> {
    return this.request('/api/curriculum/grades');
  }

  public async getLearningAreas(gradeId?: string): Promise<{ learningAreas: LearningArea[] }> {
    const query = gradeId ? `?gradeId=${encodeURIComponent(gradeId)}` : '';
    return this.request(`/api/curriculum/learning-areas${query}`);
  }

  public async getStrands(learningAreaId?: string): Promise<{ strands: Strand[] }> {
    const query = learningAreaId ? `?learningAreaId=${encodeURIComponent(learningAreaId)}` : '';
    return this.request(`/api/curriculum/strands${query}`);
  }

  public async getSubStrands(strandId?: string): Promise<{ subStrands: SubStrand[] }> {
    const query = strandId ? `?strandId=${encodeURIComponent(strandId)}` : '';
    return this.request(`/api/curriculum/sub-strands${query}`);
  }

  public async getLessons(subStrandId?: string): Promise<{ lessons: Lesson[] }> {
    const query = subStrandId ? `?subStrandId=${encodeURIComponent(subStrandId)}` : '';
    return this.request(`/api/curriculum/lessons${query}`);
  }

  public async getLesson(lessonId: string): Promise<{ lesson: Lesson }> {
    return this.request(`/api/curriculum/lesson/${encodeURIComponent(lessonId)}`);
  }

  // --- Game & Missions ---
  public async getWorlds(): Promise<{ worlds: GameWorld[] }> {
    return this.request('/api/game/worlds');
  }

  public async getMissions(worldId?: string): Promise<{ missions: Mission[] }> {
    const query = worldId ? `?worldId=${encodeURIComponent(worldId)}` : '';
    return this.request(`/api/game/missions${query}`);
  }

  public async getMissionDetails(missionId: string): Promise<MissionDetailsResponse> {
    return this.request(`/api/game/mission/${encodeURIComponent(missionId)}`);
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
    return this.request('/api/game/submit-session', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  public async getStudentStats(studentId: string): Promise<StudentStatsResponse> {
    return this.request(`/api/game/student/${encodeURIComponent(studentId)}/stats`);
  }

  public async buyShopItem(studentId: string, item: string): Promise<{ success: boolean; message: string; student: StudentProfile }> {
    return this.request('/api/game/shop/buy', {
      method: 'POST',
      body: JSON.stringify({ studentId, item })
    });
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
    return this.request('/api/tutor/chat', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
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
