import express, { Request, Response } from 'express';
import { cbeDb } from './cbeDb.js';
import { gameEngine } from './gameEngine.js';
import { tutorEngine } from './tutorEngine.js';
import { UserRole, Question, ContentStatus } from '../src/types/cbe.js';

export const apiRouter = express.Router();

// Active demo user in memory for seamless pairing / testing
let currentUserId = 'user-student-amina';

// -------------------------------------------------------------
// Authentication & Roles
// -------------------------------------------------------------
apiRouter.get('/auth/me', (_req: Request, res: Response) => {
  const user = cbeDb.findUserById(currentUserId) || cbeDb.getUsers()[0];
  let studentProfile = user.studentProfileId ? cbeDb.getStudentProfile(user.studentProfileId) : undefined;
  let parentProfile = user.parentProfileId ? cbeDb.getParentProfile(user.id) : undefined;
  let teacherProfile = user.teacherProfileId ? cbeDb.getTeacherProfile(user.id) : undefined;

  // Fallback defaults for testing
  if (user.role === 'STUDENT' && !studentProfile) {
    studentProfile = cbeDb.getAllStudents()[0];
  }

  res.json({
    user,
    studentProfile,
    parentProfile,
    teacherProfile
  });
});

apiRouter.post('/auth/switch-role', (req: Request, res: Response) => {
  const { role } = req.body as { role: UserRole };
  const targetUser = cbeDb.getUsers().find(u => u.role === role);
  if (targetUser) {
    currentUserId = targetUser.id;
    return res.json({ success: true, user: targetUser });
  }
  return res.status(404).json({ error: `User with role ${role} not found` });
});

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email } = req.body as { email: string };
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const user = cbeDb.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'User not found. Use a demo account or sign up!' });
  }
  currentUserId = user.id;
  return res.json({ success: true, user });
});

apiRouter.post('/auth/register', (req: Request, res: Response) => {
  const { name, email, role = 'STUDENT', gradeId = 'grade-4', county = 'Nairobi', schoolName = 'Starehe Primary', avatar = 'cheetah' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const existing = cbeDb.findUserByEmail(email);
  if (existing) {
    currentUserId = existing.id;
    return res.json({ success: true, user: existing, message: 'Account already exists, logged in!' });
  }

  const newUserId = `user-${Date.now()}`;
  const newStudentId = `student-${Date.now()}`;

  const newUser = {
    id: newUserId,
    name,
    email,
    role: role as UserRole,
    avatar,
    createdAt: new Date().toISOString(),
    studentProfileId: role === 'STUDENT' ? newStudentId : undefined
  };

  cbeDb.createUser(newUser);

  if (role === 'STUDENT') {
    const newStudent = {
      id: newStudentId,
      userId: newUserId,
      fullName: name,
      gradeId,
      schoolName,
      county,
      avatar,
      level: 1,
      xp: 50,
      coins: 50,
      hearts: 5,
      maxHearts: 5,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      streakFrozen: false,
      unlockedWorldIds: ['world-math-kingdom'],
      completedMissionIds: [],
      badges: [],
      equippedTitle: 'Safari Scout'
    };
    cbeDb.createStudent(newStudent);
  }

  currentUserId = newUserId;
  return res.json({ success: true, user: newUser });
});

// -------------------------------------------------------------
// Curriculum Hierarchy
// -------------------------------------------------------------
apiRouter.get('/curriculum/grades', (_req: Request, res: Response) => {
  res.json({ grades: cbeDb.getGrades() });
});

apiRouter.get('/curriculum/learning-areas', (req: Request, res: Response) => {
  const gradeId = req.query.gradeId as string | undefined;
  res.json({ learningAreas: cbeDb.getLearningAreas(gradeId) });
});

apiRouter.get('/curriculum/strands', (req: Request, res: Response) => {
  const learningAreaId = req.query.learningAreaId as string | undefined;
  res.json({ strands: cbeDb.getStrands(learningAreaId) });
});

apiRouter.get('/curriculum/sub-strands', (req: Request, res: Response) => {
  const strandId = req.query.strandId as string | undefined;
  res.json({ subStrands: cbeDb.getSubStrands(strandId) });
});

apiRouter.get('/curriculum/lessons', (req: Request, res: Response) => {
  const subStrandId = req.query.subStrandId as string | undefined;
  res.json({ lessons: cbeDb.getLessons(subStrandId) });
});

apiRouter.get('/curriculum/lesson/:id', (req: Request, res: Response) => {
  const lesson = cbeDb.getLessonById(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json({ lesson });
});

// -------------------------------------------------------------
// Game World & Missions
// -------------------------------------------------------------
apiRouter.get('/game/worlds', (_req: Request, res: Response) => {
  res.json({ worlds: cbeDb.getGameWorlds() });
});

apiRouter.get('/game/missions', (req: Request, res: Response) => {
  const worldId = req.query.worldId as string | undefined;
  res.json({ missions: cbeDb.getMissions(worldId) });
});

apiRouter.get('/game/mission/:id', (req: Request, res: Response) => {
  const mission = cbeDb.getMissionById(req.params.id);
  if (!mission) return res.status(404).json({ error: 'Mission not found' });

  // Get sanitized questions (omit direct answers for MCQ to prevent DevTools cheating)
  const rawQuestions = cbeDb.getQuestionsForMission(mission.id);
  const clientSafeQuestions = rawQuestions.map(q => {
    const { correctOptionId, correctBoolean, correctOrderIds, fillBlankAnswers, ...safe } = q;
    return safe;
  });

  const lesson = cbeDb.getLessonById(mission.lessonId);

  res.json({
    mission,
    lesson,
    questions: clientSafeQuestions
  });
});

apiRouter.post('/game/submit-session', (req: Request, res: Response) => {
  try {
    const { studentId, missionId, answers } = req.body;
    if (!studentId || !missionId || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid submission payload' });
    }

    const { result, student, questionReviews } = gameEngine.processSessionSubmission({
      studentId,
      missionId,
      answers
    });

    return res.json({
      success: true,
      result,
      student,
      questionReviews
    });
  } catch (error: any) {
    console.error('[Session Submission Error]:', error);
    return res.status(500).json({ error: error.message || 'Submission failed' });
  }
});

apiRouter.get('/game/student/:id/stats', (req: Request, res: Response) => {
  const student = cbeDb.getStudentProfile(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const masteries = cbeDb.getMasteriesForStudent(student.id);
  const achievements = cbeDb.getAchievements().map(ach => ({
    ...ach,
    isUnlocked: student.badges.includes(ach.id)
  }));
  const recentSessions = cbeDb.getSessionResultsForStudent(student.id).slice(-5);

  res.json({
    student,
    masteries,
    achievements,
    recentSessions
  });
});

// Power-up Shop
apiRouter.post('/game/shop/buy', (req: Request, res: Response) => {
  const { studentId, item } = req.body;
  const student = cbeDb.getStudentProfile(studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  let cost = 0;
  let success = false;
  let message = '';

  if (item === 'HEARTS_REFILL') {
    cost = 40;
    if (student.coins >= cost) {
      student.coins -= cost;
      student.hearts = student.maxHearts;
      success = true;
      message = 'Hearts fully restored! (5/5 ❤️)';
    }
  } else if (item === 'STREAK_FREEZE') {
    cost = 60;
    if (student.coins >= cost) {
      student.coins -= cost;
      student.streakFrozen = true;
      success = true;
      message = 'Streak Freeze equipped! Your streak is protected tomorrow! 🛡️';
    }
  } else if (item === 'HINT_OWL') {
    cost = 25;
    if (student.coins >= cost) {
      student.coins -= cost;
      success = true;
      message = 'Hint Owl purchased! Extra Socratic guidance unlocked 🦉';
    }
  }

  if (success) {
    cbeDb.updateStudent(student.id, student);
    cbeDb.recordCoinTransaction(student.id, -cost, `Purchased ${item} in dukani`);
    return res.json({ success: true, message, student });
  } else {
    return res.status(400).json({ success: false, error: 'Not enough coins or invalid item!' });
  }
});

// -------------------------------------------------------------
// AI Tutor ("Mwalimu Rafiki")
// -------------------------------------------------------------
apiRouter.post('/tutor/chat', async (req: Request, res: Response) => {
  try {
    const { message, studentName = 'Learner', gradeName = 'Grade 4', topic, questionId } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    let currentQuestion: Question | undefined;
    if (questionId) {
      currentQuestion = cbeDb.getQuestionById(questionId);
    }

    const tutorResult = await tutorEngine.askTutor(message, {
      studentName,
      gradeName,
      topic,
      currentQuestion
    });

    res.json({
      success: true,
      tutorResponse: tutorResult.response,
      source: tutorResult.source
    });
  } catch (error: any) {
    console.error('[Tutor Endpoint Error]:', error);
    res.status(500).json({ error: 'Tutor service error' });
  }
});

// -------------------------------------------------------------
// Parent Dashboard
// -------------------------------------------------------------
apiRouter.get('/parent/children', (req: Request, res: Response) => {
  const user = cbeDb.findUserById(currentUserId);
  const parent = user?.parentProfileId ? cbeDb.getParentProfile(user.id) : cbeDb.getParentProfile('user-parent-mama');

  const childrenIds = parent?.childrenStudentIds || ['student-amina-01'];
  const children = childrenIds.map(id => {
    const student = cbeDb.getStudentProfile(id);
    if (!student) return null;
    const masteries = cbeDb.getMasteriesForStudent(student.id);
    const sessions = cbeDb.getSessionResultsForStudent(student.id);
    return {
      student,
      masteries,
      recentSessions: sessions.slice(-5),
      totalStudyMinutes: sessions.length * 15 + 45
    };
  }).filter(Boolean);

  res.json({
    parent,
    children
  });
});

// -------------------------------------------------------------
// Teacher Dashboard
// -------------------------------------------------------------
apiRouter.get('/teacher/classes', (_req: Request, res: Response) => {
  const classes = cbeDb.getAllClasses();
  const enhancedClasses = classes.map(cls => {
    const students = cls.studentIds.map(id => cbeDb.getStudentProfile(id)).filter(Boolean);
    const assignedMissions = cls.assignedMissionIds.map(id => cbeDb.getMissionById(id)).filter(Boolean);
    return {
      ...cls,
      students,
      assignedMissions
    };
  });
  res.json({ classes: enhancedClasses });
});

apiRouter.post('/teacher/classes', (req: Request, res: Response) => {
  const { name, gradeId } = req.body;
  if (!name) return res.status(400).json({ error: 'Class name is required' });

  const newClass = {
    id: `class-${Date.now()}`,
    name,
    gradeId: gradeId || 'grade-4',
    teacherId: 'teacher-ochieng-01',
    code: name.slice(0, 3).toUpperCase() + Math.floor(10 + Math.random() * 90),
    studentIds: ['student-amina-01'],
    assignedMissionIds: ['mission-01-seedlings'],
    createdAt: new Date().toISOString()
  };

  cbeDb.createClass(newClass);
  res.json({ success: true, class: newClass });
});

apiRouter.post('/teacher/assign', (req: Request, res: Response) => {
  const { classId, missionId } = req.body;
  if (!classId || !missionId) return res.status(400).json({ error: 'Class ID and Mission ID are required' });
  const ok = cbeDb.assignMissionToClass(classId, missionId);
  res.json({ success: ok });
});

// -------------------------------------------------------------
// Content Management & Admin
// -------------------------------------------------------------
apiRouter.get('/admin/questions', (_req: Request, res: Response) => {
  res.json({ questions: cbeDb.getAllQuestions() });
});

apiRouter.post('/admin/questions', (req: Request, res: Response) => {
  const newQ = req.body as Question;
  if (!newQ.prompt || !newQ.subStrandId) {
    return res.status(400).json({ error: 'Prompt and SubStrand are required' });
  }
  newQ.id = `q-custom-${Date.now()}`;
  newQ.contentStatus = newQ.contentStatus || 'DRAFT';
  cbeDb.addQuestion(newQ);
  res.json({ success: true, question: newQ });
});

apiRouter.put('/admin/questions/:id/status', (req: Request, res: Response) => {
  const { status } = req.body as { status: ContentStatus };
  const updated = cbeDb.updateQuestion(req.params.id, { contentStatus: status });
  if (!updated) return res.status(404).json({ error: 'Question not found' });
  res.json({ success: true, question: updated });
});

// -------------------------------------------------------------
// Analytics Telemetry
// -------------------------------------------------------------
apiRouter.get('/analytics/events', (_req: Request, res: Response) => {
  res.json({ events: cbeDb.getAnalyticsEvents(50) });
});
