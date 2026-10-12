import { Question, QuestionOption, QuestionMatchingPair, QuestionType, DifficultyLevel } from '../../types/cbe.js';

/**
 * Universal content question adapter for Jifuno.
 * Transforms raw content-JSON questions (snake_case types, `answer` field, localized objects)
 * into the standardized application `Question` domain model.
 */
export function normalizeContentQuestion(raw: any, defaultSubStrandId = 'substrand-general'): Question {
  if (!raw) {
    throw new Error('Cannot normalize null or undefined question.');
  }

  // 1. Map type: Convert snake_case or legacy strings to QuestionType
  let type: QuestionType = 'MULTIPLE_CHOICE';
  const rawType = String(raw.type || '').toLowerCase();

  switch (rawType) {
    case 'true_false':
    case 'truefalse':
    case 'tf':
      type = 'TRUE_FALSE';
      break;

    case 'multiple_choice':
    case 'mcq':
      type = 'MULTIPLE_CHOICE';
      break;

    case 'listen_pick':
    case 'listen_choose':
      type = 'LISTEN_CHOOSE';
      break;

    case 'number_input':
    case 'number_entry':
      type = 'NUMBER_ENTRY';
      break;

    case 'money_make':
    case 'kenyan_money':
      type = 'KENYAN_MONEY';
      break;

    case 'fill_blank':
    case 'fillblank':
      type = 'FILL_BLANK';
      break;

    case 'order_steps':
    case 'ordering':
      type = 'ORDERING';
      break;

    case 'match_pairs':
    case 'matching':
      type = 'MATCHING';
      break;

    case 'scenario':
      type = 'SCENARIO';
      break;

    case 'image_label':
      type = 'IMAGE_LABEL';
      break;

    default:
      if (raw.type && typeof raw.type === 'string') {
        type = raw.type as QuestionType;
      }
      break;
  }

  // 2. Extract prompt & story scenario
  const prompt = typeof raw.prompt === 'object' && raw.prompt !== null
    ? (raw.prompt.en || raw.prompt.sw || '')
    : String(raw.prompt || raw.text || '');

  const swahiliPrompt = typeof raw.prompt === 'object' && raw.prompt !== null
    ? raw.prompt.sw
    : undefined;

  const storyScenario = typeof raw.storyScenario === 'object' && raw.storyScenario !== null
    ? (raw.storyScenario.en || raw.storyScenario.sw)
    : (raw.storyScenario || raw.story_scenario);

  const swahiliStoryScenario = typeof raw.storyScenario === 'object' && raw.storyScenario !== null
    ? raw.storyScenario.sw
    : (raw.swahiliStoryScenario || raw.swahili_story_scenario);

  // 3. Extract explanation & socratic hint
  const explanation = typeof raw.explanation === 'object' && raw.explanation !== null
    ? (raw.explanation.en || raw.explanation.sw || '')
    : String(raw.explanation || '');

  const swahiliExplanation = typeof raw.explanation === 'object' && raw.explanation !== null
    ? raw.explanation.sw
    : raw.swahiliExplanation;

  const hintObj = raw.hint || raw.socraticHint || raw.socratic_hint;
  const socraticHint = typeof hintObj === 'object' && hintObj !== null
    ? (hintObj.en || hintObj.sw || 'Think carefully about the clues.')
    : String(hintObj || 'Think carefully about the clues.');

  const swahiliSocraticHint = typeof hintObj === 'object' && hintObj !== null
    ? hintObj.sw
    : raw.swahiliSocraticHint;

  // 4. Map difficulty
  let difficulty: DifficultyLevel = 'BEGINNER';
  const rawDiff = raw.difficulty;
  if (rawDiff === 'easy' || rawDiff === 1) difficulty = 'BEGINNER';
  else if (rawDiff === 'medium' || rawDiff === 2) difficulty = 'EASY';
  else if (rawDiff === 'hard' || rawDiff === 3) difficulty = 'MEDIUM';
  else if (typeof rawDiff === 'string' && ['BEGINNER', 'EASY', 'MEDIUM', 'ADVANCED', 'MASTERY'].includes(rawDiff)) {
    difficulty = rawDiff as DifficultyLevel;
  }

  // 5. Type-specific Answer Key and Structure normalization
  let correctBoolean: boolean | undefined = undefined;
  let correctOptionId: string | undefined = undefined;
  let numericAnswer: { value: number; tolerance?: number; unit?: string } | undefined = undefined;
  let fillBlankAnswers: string[] | undefined = undefined;
  let matchingPairs: QuestionMatchingPair[] | undefined = undefined;
  let correctOrderIds: string[] | undefined = undefined;
  let options: QuestionOption[] | undefined = undefined;

  // --- TRUE_FALSE ---
  if (type === 'TRUE_FALSE') {
    if (typeof raw.correctBoolean === 'boolean') {
      correctBoolean = raw.correctBoolean;
    } else if (typeof raw.answer === 'boolean') {
      correctBoolean = raw.answer;
    } else if (typeof raw.correctAnswer === 'boolean') {
      correctBoolean = raw.correctAnswer;
    } else {
      const candidateStr = String(raw.answer ?? raw.correctAnswer ?? '').trim().toLowerCase();
      if (candidateStr === 'true' || candidateStr === 'kweli' || candidateStr === 'yes' || candidateStr === 'ndiyo') {
        correctBoolean = true;
      } else if (candidateStr === 'false' || candidateStr === 'si kweli' || candidateStr === 'hapana' || candidateStr === 'no') {
        correctBoolean = false;
      }
    }

    options = [
      { id: 'opt-true', text: 'True' },
      { id: 'opt-false', text: 'False' }
    ];
  }

  // --- MULTIPLE_CHOICE, LISTEN_CHOOSE, SCENARIO, IMAGE_LABEL ---
  if (type === 'MULTIPLE_CHOICE' || type === 'LISTEN_CHOOSE' || type === 'SCENARIO' || type === 'IMAGE_LABEL') {
    const rawAnswer = raw.correctOptionId ?? raw.answer ?? raw.correctAnswer ?? raw.answerKey;
    if (rawAnswer !== undefined && rawAnswer !== null) {
      correctOptionId = String(rawAnswer).trim();
    }

    if (Array.isArray(raw.options)) {
      options = raw.options.map((opt: any, idx: number) => {
        let optText = '';
        if (typeof opt === 'string') {
          optText = opt;
        } else if (typeof opt.text === 'object' && opt.text !== null) {
          optText = opt.text.en || opt.text.sw || String(opt.text);
        } else {
          optText = String(opt.text || opt.label || `Option ${String.fromCharCode(65 + idx)}`);
        }

        let optExplanation: string | undefined = undefined;
        if (opt.why_wrong) {
          optExplanation = typeof opt.why_wrong === 'object' ? opt.why_wrong.en : String(opt.why_wrong);
        } else if (opt.explanation) {
          optExplanation = typeof opt.explanation === 'object' ? opt.explanation.en : String(opt.explanation);
        }

        return {
          id: String(opt.id || `opt-${idx + 1}`),
          text: optText,
          explanation: optExplanation
        };
      });
    }
  }

  // --- NUMBER_ENTRY, KENYAN_MONEY ---
  if (type === 'NUMBER_ENTRY' || type === 'KENYAN_MONEY') {
    if (raw.numericAnswer && typeof raw.numericAnswer.value === 'number') {
      numericAnswer = raw.numericAnswer;
    } else {
      const rawTarget = raw.target_ksh ?? raw.targetKsh ?? raw.target ?? raw.answer;
      const numVal = rawTarget !== undefined ? Number(rawTarget) : (raw.accepted ? Number(raw.accepted[0]) : NaN);
      if (!isNaN(numVal)) {
        numericAnswer = {
          value: numVal,
          unit: raw.unit || (type === 'KENYAN_MONEY' ? 'KES' : '')
        };
      }
    }

    const rawTarget = raw.target_ksh ?? raw.targetKsh ?? raw.target ?? raw.answer;
    const acceptedList: any[] = raw.accepted || (rawTarget !== undefined ? [rawTarget] : []);
    fillBlankAnswers = acceptedList.map(String).filter(Boolean);
  }

  // --- FILL_BLANK ---
  if (type === 'FILL_BLANK') {
    const rawAnswers = [
      ...(Array.isArray(raw.fillBlankAnswers) ? raw.fillBlankAnswers : []),
      ...(Array.isArray(raw.accepted) ? raw.accepted : []),
      raw.answer,
      raw.correctAnswer
    ].filter(v => v !== undefined && v !== null && String(v).trim().length > 0);

    const unique = Array.from(new Set(rawAnswers.map(v => String(v).trim())));
    if (unique.length > 0) {
      fillBlankAnswers = unique;
    }
  }

  // --- MATCHING ---
  if (type === 'MATCHING') {
    const rawPairs = raw.matchingPairs || raw.matching_pairs;
    if (Array.isArray(rawPairs)) {
      matchingPairs = rawPairs;
    } else if (Array.isArray(raw.pairs)) {
      matchingPairs = raw.pairs.map((p: any, idx: number) => ({
        leftId: String(p.leftId || `left-${idx + 1}`),
        leftText: typeof p.left === 'object' ? (p.left.en || p.left.sw) : String(p.leftText || p.left || ''),
        rightId: String(p.rightId || `right-${idx + 1}`),
        rightText: typeof p.right === 'object' ? (p.right.en || p.right.sw) : String(p.rightText || p.right || '')
      }));
    }
  }

  // --- ORDERING ---
  if (type === 'ORDERING') {
    const rawOrdered = raw.orderedItems || raw.orderingItems || raw.items;
    if (Array.isArray(raw.options)) {
      options = raw.options;
    } else if (Array.isArray(rawOrdered)) {
      options = rawOrdered.map((it: any, idx: number) => ({
        id: String(it.id || `ord-${idx + 1}`),
        text: typeof it === 'object' && it !== null && it.text ? (it.text.en || it.text.sw || it.text) : String(it)
      }));
    }

    if (Array.isArray(raw.correctOrderIds)) {
      correctOrderIds = raw.correctOrderIds;
    } else if (Array.isArray(raw.answer)) {
      correctOrderIds = raw.answer.map(String);
    } else if (Array.isArray(raw.correctOrder)) {
      correctOrderIds = raw.correctOrder.map(String);
    } else if (typeof raw.correctAnswer === 'string' && raw.correctAnswer.includes(',') && Array.isArray(options)) {
      const parts = raw.correctAnswer.split(',').map((s: string) => s.trim().toLowerCase());
      correctOrderIds = parts.map((p: string) => {
        const found = options?.find(o => o.text.trim().toLowerCase() === p);
        return found ? found.id : p;
      });
    } else if (Array.isArray(options) && options.length > 0) {
      correctOrderIds = options.map(o => o.id);
    }
  }

  // Audio speech prompt for listen & choose
  let audioSpeechPrompt = raw.audioSpeechPrompt;
  if (!audioSpeechPrompt && raw.audio_text) {
    audioSpeechPrompt = {
      textToSpeak: typeof raw.audio_text === 'object' ? (raw.audio_text.en || raw.audio_text.sw) : String(raw.audio_text),
      language: 'en'
    };
  }

  const normalized: Question = {
    id: String(raw.id || `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
    subStrandId: String(raw.subStrandId || defaultSubStrandId),
    type,
    prompt,
    swahiliPrompt,
    storyScenario,
    swahiliStoryScenario,
    difficulty,
    options,
    correctOptionId,
    correctBoolean,
    matchingPairs,
    correctOrderIds,
    fillBlankAnswers,
    blankTemplate: typeof raw.blankTemplate === 'object' ? raw.blankTemplate.en : raw.blankTemplate,
    numericAnswer,
    imageLabelData: raw.imageLabelData,
    audioSpeechPrompt,
    readingPassage: typeof raw.readingPassage === 'object' ? raw.readingPassage.en : raw.readingPassage,
    swahiliReadingPassage: typeof raw.readingPassage === 'object' ? raw.readingPassage.sw : raw.swahiliReadingPassage,
    wordBuilderTokens: raw.wordBuilderTokens,
    explanation,
    swahiliExplanation,
    socraticHint,
    swahiliSocraticHint,
    hint: socraticHint,
    kenyanCulturalContext: raw.kenyanCulturalContext || 'Authentic Kenyan CBC Inquiry Activity',
    sourceType: raw.sourceType || 'CURRICULUM_ALIGNED',
    contentStatus: 'APPROVED',
    orderedItems: raw.orderedItems
  } as any;

  return normalized;
}

/**
 * Strict check ensuring that a question has a valid, non-null, usable answer key
 * corresponding to its question type.
 */
export function hasUsableAnswerKey(q: Question): boolean {
  if (!q) return false;

  switch (q.type) {
    case 'TRUE_FALSE':
      return typeof q.correctBoolean === 'boolean';

    case 'MULTIPLE_CHOICE':
    case 'SCENARIO':
    case 'IMAGE_LABEL':
    case 'LISTEN_CHOOSE':
      return Boolean(
        q.correctOptionId &&
        String(q.correctOptionId).trim().length > 0 &&
        (!Array.isArray(q.options) || q.options.some(opt => opt.id === q.correctOptionId))
      );

    case 'NUMBER_ENTRY':
    case 'KENYAN_MONEY':
      return (
        q.numericAnswer?.value !== undefined &&
        !isNaN(Number(q.numericAnswer.value))
      );

    case 'FILL_BLANK':
      return Boolean(
        Array.isArray(q.fillBlankAnswers) &&
        q.fillBlankAnswers.length > 0 &&
        q.fillBlankAnswers.some(ans => String(ans).trim().length > 0)
      );

    case 'ORDERING':
      return Boolean(
        Array.isArray(q.correctOrderIds) &&
        q.correctOrderIds.length >= 2
      );

    case 'MATCHING':
      return Boolean(
        Array.isArray(q.matchingPairs) &&
        q.matchingPairs.length >= 2 &&
        q.matchingPairs.every(p => Boolean(p.leftText && p.rightText))
      );

    default:
      return Boolean(q.correctOptionId || typeof q.correctBoolean === 'boolean');
  }
}
