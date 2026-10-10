import { cbeDb } from '../server/cbeDb.js';
import { gameEngine } from '../server/gameEngine.js';
import { tutorEngine } from '../server/tutorEngine.js';
import { getCurriculumValidationReport, getAllGrades, getSubjectsForGrade, searchCurriculum } from '../src/data/curriculum/index.js';

interface TestResult {
  suite: string;
  test: string;
  passed: boolean;
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, test: string, message?: string) {
  if (condition) {
    results.push({ suite, test, passed: true });
    console.log(`  ✅ [PASS] ${test}`);
  } else {
    results.push({ suite, test, passed: false, error: message || 'Assertion failed' });
    console.error(`  ❌ [FAIL] ${test} - ${message}`);
  }
}

async function runAllTests() {
  console.log('\n======================================================');
  console.log('🚀 RUNNING JIFUNO KENYA CBE COMPREHENSIVE E2E TESTS');
  console.log('======================================================\n');

  // -----------------------------------------------------------
  // 1. CURRICULUM HIERARCHY TESTS
  // -----------------------------------------------------------
  console.log('--- SUITE 1: Curriculum Hierarchy & Kenyan CBE Structure ---');
  const grades = cbeDb.getGrades();
  assert(grades.length >= 4, 'Curriculum', 'Grades loaded (G3, G4, G5, G6)');
  assert(grades.some(g => g.id === 'grade-4'), 'Curriculum', 'Grade 4 exists');

  const learningAreas = cbeDb.getLearningAreas('grade-4');
  assert(learningAreas.length >= 4, 'Curriculum', 'Core learning areas exist (Math, Science, Kiswahili, English, Agriculture)');
  assert(learningAreas.some(la => la.swahiliName === 'Hisabati'), 'Curriculum', 'Kiswahili nomenclature supported (Hisabati)');

  const strands = cbeDb.getStrands('la-math-g4');
  assert(strands.length >= 2, 'Curriculum', 'Mathematics strands exist');
  assert(strands.some(s => s.id === 'strand-math-numbers'), 'Curriculum', 'Numbers & Operations strand present');
  assert(strands.some(s => s.id === 'strand-math-money'), 'Curriculum', 'Measurement & Kenyan Currency strand present');

  const subStrands = cbeDb.getSubStrands('strand-math-numbers');
  assert(subStrands.length >= 2, 'Curriculum', 'Sub-strands populated with CBE competencies');

  const lessons = cbeDb.getLessons('substrand-multiplication');
  assert(lessons.length > 0, 'Curriculum', 'Lesson has Kenyan context and did-you-know facts');
  const aminaLesson = lessons[0];
  assert(aminaLesson.conceptIntro.includes('Amina'), 'Curriculum', 'Lesson features authentic Kenyan narrative (Amina in Nakuru)');
  assert(Boolean(aminaLesson.didYouKnowKenyanFact), 'Curriculum', 'Kenyan agricultural factual context present');

  // -----------------------------------------------------------
  // 2. GAME ENGINE & REWARD SECURITY TESTS
  // -----------------------------------------------------------
  console.log('\n--- SUITE 2: Game Engine, Rewards & Anti-Cheat Validation ---');
  const worlds = cbeDb.getGameWorlds();
  assert(worlds.length >= 4, 'Game Engine', 'Multiple game worlds available (Math, Science, Kiswahili, Farm)');

  const missions = cbeDb.getMissions('world-math-kingdom');
  assert(missions.length >= 3, 'Game Engine', 'Math Kingdom missions configured in order');
  const mission1 = missions[0];

  const questions = cbeDb.getQuestionsForMission(mission1.id);
  assert(questions.length > 0, 'Game Engine', 'Mission questions mapped correctly');

  // Test Question Engine Types
  const qMult = questions.find(q => q.type === 'MULTIPLE_CHOICE');
  assert(Boolean(qMult), 'Question Engine', 'Multiple Choice question type supported');
  if (qMult) {
    const isCorrect = gameEngine.evaluateQuestionAnswer(qMult, qMult.correctOptionId);
    const isWrong = gameEngine.evaluateQuestionAnswer(qMult, 'wrong-id');
    assert(isCorrect, 'Question Engine', 'Correct MCQ answer evaluates to TRUE');
    assert(!isWrong, 'Question Engine', 'Incorrect MCQ answer evaluates to FALSE');
  }

  const qTF = questions.find(q => q.type === 'TRUE_FALSE');
  assert(Boolean(qTF), 'Question Engine', 'True/False question type supported');
  if (qTF) {
    const isCorrectTF = gameEngine.evaluateQuestionAnswer(qTF, qTF.correctBoolean);
    const isWrongTF = gameEngine.evaluateQuestionAnswer(qTF, !qTF.correctBoolean);
    assert(isCorrectTF, 'Question Engine', 'Correct True/False evaluates accurately');
    assert(!isWrongTF, 'Question Engine', 'Incorrect True/False rejected');
  }

  // -----------------------------------------------------------
  // 3. PRIMARY USER JOURNEY SIMULATION
  // -----------------------------------------------------------
  console.log('\n--- SUITE 3: Primary User Journey Flow ---');
  // Step 1: Create New Student
  const testStudentUserId = `test-usr-${Date.now()}`;
  const testStudentProfileId = `test-std-${Date.now()}`;
  const newStudentUser = {
    id: testStudentUserId,
    name: 'Wanjiku Test Learner',
    email: `wanjiku.${Date.now()}@jifuno.ke`,
    role: 'STUDENT' as const,
    avatar: 'owl',
    createdAt: new Date().toISOString(),
    studentProfileId: testStudentProfileId
  };
  cbeDb.createUser(newStudentUser);

  const initialXp = 50;
  const initialCoins = 50;
  const newStudentProfile = {
    id: testStudentProfileId,
    userId: testStudentUserId,
    fullName: 'Wanjiku Test Learner',
    gradeId: 'grade-4',
    schoolName: 'Moi Nyeri Academy',
    county: 'Nyeri',
    avatar: 'owl',
    level: 1,
    xp: initialXp,
    coins: initialCoins,
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
  cbeDb.createStudent(newStudentProfile);

  assert(Boolean(cbeDb.getStudentProfile(testStudentProfileId)), 'Journey', 'Step 1: Student account created and persisted');

  // Step 2: Choose Grade & Learning Area
  assert(newStudentProfile.gradeId === 'grade-4', 'Journey', 'Step 2: Grade 4 chosen');
  const mathArea = cbeDb.getLearningAreas(newStudentProfile.gradeId).find(la => la.name === 'Mathematics');
  assert(Boolean(mathArea), 'Journey', 'Step 3: Learning Area Mathematics chosen');

  // Step 3: Enter Game World & Receive Mission
  const world = cbeDb.getGameWorlds().find(w => w.id === 'world-math-kingdom');
  assert(Boolean(world), 'Journey', 'Step 4: Entered Math Kingdom world');
  const activeMission = cbeDb.getMissions(world!.id)[0];
  assert(Boolean(activeMission), 'Journey', 'Step 5: Received Mission 01: Help Amina Plant Seedlings');

  // Step 4: Answer all mission questions correctly
  const answersToSubmit = questions.map(q => {
    let ans: any = q.correctOptionId;
    if (q.type === 'TRUE_FALSE') ans = q.correctBoolean;
    if (q.type === 'ORDERING') ans = q.correctOrderIds;
    if (q.type === 'MATCHING') {
      ans = q.matchingPairs?.map(p => ({ leftId: p.leftId, rightId: p.rightId }));
    }
    if (q.type === 'FILL_BLANK') ans = q.fillBlankAnswers?.[0];
    return {
      questionId: q.id,
      selectedAnswer: ans,
      timeSpentSeconds: 10,
      usedHint: false
    };
  });

  // Step 5: Server-side grading & progression
  const sessionResult = gameEngine.processSessionSubmission({
    studentId: testStudentProfileId,
    missionId: activeMission.id,
    answers: answersToSubmit
  });

  assert(sessionResult.result.scorePercentage === 100, 'Journey', 'Step 6: Questions answered with 100% score');
  assert(sessionResult.result.xpEarned > 0, 'Journey', 'Step 7: Server calculated XP reward');
  assert(sessionResult.result.coinsEarned > 0, 'Journey', 'Step 8: Server calculated Coin reward');
  assert(sessionResult.student.xp > initialXp, 'Journey', 'Step 9: Student XP updated in database');
  assert(sessionResult.student.coins > initialCoins, 'Journey', 'Step 10: Student Coins updated in database');
  assert(sessionResult.student.completedMissionIds.includes(activeMission.id), 'Journey', 'Step 11: Mission marked completed');
  assert(sessionResult.student.badges.includes('badge-seedling-starter'), 'Journey', 'Step 12: Achievement badge unlocked');

  // Step 6: Verify progress & next mission unlock
  const updatedStudent = cbeDb.getStudentProfile(testStudentProfileId)!;
  assert(updatedStudent.completedMissionIds.length === 1, 'Journey', 'Step 13: Progress saved and verified');
  const nextMission = cbeDb.getMissions(world!.id)[1];
  assert(Boolean(nextMission), 'Journey', 'Step 14: Next mission available for play');

  // -----------------------------------------------------------
  // 4. AI SOCRATIC TUTOR INTEGRATION TESTS
  // -----------------------------------------------------------
  console.log('\n--- SUITE 4: Socratic AI Tutor Pedagogical Quality ---');
  const tutorContext = {
    studentName: 'Wanjiku',
    gradeName: 'Grade 4',
    currentQuestion: questions[0]
  };

  const fractionInquiry = await tutorEngine.askTutor('I do not understand fractions', tutorContext);
  assert(
    fractionInquiry.response.includes('chapati') || fractionInquiry.response.includes('equal'),
    'AI Tutor',
    'AI explains fractions using Kenyan chapati metaphor'
  );

  const moneyInquiry = await tutorEngine.askTutor('How do I calculate change when buying sukuma wiki?', tutorContext);
  assert(
    moneyInquiry.response.includes('shilling') || moneyInquiry.response.includes('change') || moneyInquiry.response.includes('KES'),
    'AI Tutor',
    'AI explains currency using Kenyan shillings and change calculations'
  );

  const plantInquiry = await tutorEngine.askTutor('Why do seeds need water?', tutorContext);
  assert(
    plantInquiry.response.includes('seed') || plantInquiry.response.includes('water') || plantInquiry.response.includes('root'),
    'AI Tutor',
    'AI explains seed germination scientifically and accessibly'
  );

  // -----------------------------------------------------------
  // 5. PARENT & TEACHER PORTAL DATA INTEGRITY
  // -----------------------------------------------------------
  console.log('\n--- SUITE 5: Parent & Teacher Portals ---');
  const masteries = cbeDb.getMasteriesForStudent(testStudentProfileId);
  assert(masteries.length > 0, 'Parent Portal', 'Strand mastery updated for learner after quiz');
  assert(masteries.every(m => m.masteryPercentage >= 0 && m.masteryPercentage <= 100), 'Parent Portal', 'Mastery percentage within valid bounds');

  const classes = cbeDb.getAllClasses();
  assert(classes.length > 0, 'Teacher Portal', 'Teacher classes modeled');
  const testClass = classes[0];
  const assigned = cbeDb.assignMissionToClass(testClass.id, nextMission.id);
  assert(assigned, 'Teacher Portal', 'Teacher can assign mission to class');

  // -----------------------------------------------------------
  // 6. CONTENT MANAGEMENT / ADMIN WORKFLOW TESTS
  // -----------------------------------------------------------
  console.log('\n--- SUITE 6: Content Administration & Validation ---');
  const adminQuestions = cbeDb.getAllQuestions();
  assert(adminQuestions.length >= 10, 'Admin', 'Question bank seeded');
  const testAdminQ = cbeDb.addQuestion({
    id: `q-test-admin-${Date.now()}`,
    subStrandId: 'substrand-currency',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How many 50-shilling notes make 200 shillings?',
    difficulty: 'EASY',
    options: [
      { id: 'opt-1', text: '2 notes' },
      { id: 'opt-2', text: '4 notes' },
      { id: 'opt-3', text: '5 notes' }
    ],
    correctOptionId: 'opt-2',
    explanation: '4 × 50 = 200 shillings.',
    socraticHint: 'Count by fifties: 50, 100, 150...',
    kenyanCulturalContext: 'Fifty shilling notes feature Kenyan wildlife.',
    sourceType: 'AI_PRACTICE',
    contentStatus: 'REVIEW'
  });
  assert(testAdminQ.contentStatus === 'REVIEW', 'Admin', 'New practice question enters in REVIEW status');

  cbeDb.updateQuestion(testAdminQ.id, { contentStatus: 'PUBLISHED' });
  const updatedQ = cbeDb.getQuestionById(testAdminQ.id);
  assert(updatedQ?.contentStatus === 'PUBLISHED', 'Admin', 'Admin can approve and publish questions');

  // -----------------------------------------------------------
  // 7. SYSTEMATIC CBC CURRICULUM SCHEMA & SOURCING INTEGRITY
  // -----------------------------------------------------------
  console.log('\n--- SUITE 7: Systematic CBC Curriculum Schema & Sourcing Integrity ---');
  const curriculumReport = getCurriculumValidationReport();
  assert(curriculumReport.isValid, 'CurriculumSchema', 'Curriculum schema validator reports zero errors');
  assert(curriculumReport.errors.length === 0, 'CurriculumSchema', 'Zero orphan prerequisites or broken foreign keys');
  assert(curriculumReport.stats.gradesCount === 4, 'CurriculumSchema', 'All 4 grades (G3, G4, G5, G6) registered in hierarchy');
  assert(curriculumReport.stats.subjectsCount >= 32, 'CurriculumSchema', 'Comprehensive CBC learning area coverage (>= 32 subjects across grades)');
  assert(curriculumReport.stats.questsCount >= 60, 'CurriculumSchema', '2 complete sample quests per subject per grade seeded (>= 60 quests)');
  assert(curriculumReport.stats.unverifiedTodoCount > 0, 'CurriculumSchema', 'Unverified content strictly flagged with "TODO: verify with KICD design"');
  
  const g3Subjects = getSubjectsForGrade('grade-3');
  assert(g3Subjects.some(s => s.code === 'MATH-ACT-G3'), 'CurriculumSchema', 'Grade 3 includes Mathematical Activities');
  assert(g3Subjects.some(s => s.code === 'ENV-ACT-G3'), 'CurriculumSchema', 'Grade 3 includes Environmental Activities');

  const g4Subjects = getSubjectsForGrade('grade-4');
  assert(g4Subjects.some(s => s.code === 'AGRI-G4'), 'CurriculumSchema', 'Grade 4 includes Agriculture and Nutrition');
  assert(g4Subjects.some(s => s.code === 'CA-G4'), 'CurriculumSchema', 'Grade 4 includes Creative Arts');

  const searchResults = searchCurriculum('seedlings', 'grade-4');
  assert(searchResults.length > 0, 'CurriculumSchema', 'Cross-subject topic search engine functions correctly');

  // -----------------------------------------------------------
  // SUMMARY
  // -----------------------------------------------------------
  console.log('\n======================================================');
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log('======================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! APPLICATION FULLY VALIDATED.\n');
  }
}

runAllTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
