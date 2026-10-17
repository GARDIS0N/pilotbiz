/**
 * Jifuno Bulk Content Import & Versioning Engine
 * Parses JSON and CSV curriculum content packages, validates questions against quality rules,
 * and upserts them into the question bank without requiring code redeployments.
 */

import { VersionedQuestionItem, VersionedContentPackage } from '../types/contentVersion.js';
import { validateBulkContent } from './contentQualityValidator.js';
import { cbeDb } from '../../server/cbeDb.js';

export interface ImportResult {
  success: boolean;
  message: string;
  totalProcessed: number;
  createdCount: number;
  updatedCount: number;
  validation: ReturnType<typeof validateBulkContent>;
}

export function parseJsonContent(rawJson: string): VersionedQuestionItem[] {
  let parsed: any;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err: any) {
    throw new Error(`JSON Syntax Error: ${err.message}`);
  }

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && Array.isArray(parsed.questions)) {
    // VersionedContentPackage structure
    return parsed.questions.map((q: any) => ({
      ...q,
      gradeId: q.gradeId || parsed.gradeId,
      subjectId: q.subjectId || parsed.subjectId
    }));
  }

  throw new Error('Invalid JSON content: Expected an array of questions or a package with a "questions" array.');
}

/**
 * Parses CSV strings with support for quoted strings and commas.
 */
export function parseCsvContent(rawCsv: string): VersionedQuestionItem[] {
  const lines = rawCsv
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) {
    throw new Error('CSV must contain a header row and at least one data row.');
  }

  // Parse header and normalize to stripped lowercase
  const rawHeaders = parseCsvRow(lines[0]);
  const headers = rawHeaders.map(h => h.trim().toLowerCase().replace(/[-_\s]/g, ''));

  // Ensure minimum essential headers exist
  const hasId = headers.includes('id');
  const hasGrade = headers.includes('gradeid') || headers.includes('grade');
  const hasType = headers.includes('type') || headers.includes('questiontype');
  const hasPrompt = headers.includes('prompten') || headers.includes('prompt');

  if (!hasId || !hasGrade || !hasType || !hasPrompt) {
    throw new Error('CSV is missing required headers. Must include: id, grade, type, prompt.');
  }

  const questions: VersionedQuestionItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvRow(lines[i]);
    if (row.length === 0 || row.every(cell => !cell.trim())) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = row[idx] ? row[idx].trim() : '';
    });

    const optA = rowObj['optiona'] || rowObj['option1'];
    const optB = rowObj['optionb'] || rowObj['option2'];
    const optC = rowObj['optionc'] || rowObj['option3'];
    const optD = rowObj['optiond'] || rowObj['option4'];

    const options: { id: string; text: string }[] = [];
    if (optA) options.push({ id: 'opt-1', text: optA });
    if (optB) options.push({ id: 'opt-2', text: optB });
    if (optC) options.push({ id: 'opt-3', text: optC });
    if (optD) options.push({ id: 'opt-4', text: optD });

    let rawCorrect = rowObj['correctoptionid'] || rowObj['correctoption'];
    let correctOptionId: string | undefined = undefined;
    if (rawCorrect) {
      const lower = rawCorrect.toLowerCase().trim();
      if (lower === '1' || lower === 'a' || lower === 'opt-1' || lower === 'opt-a') correctOptionId = 'opt-1';
      else if (lower === '2' || lower === 'b' || lower === 'opt-2' || lower === 'opt-b') correctOptionId = 'opt-2';
      else if (lower === '3' || lower === 'c' || lower === 'opt-3' || lower === 'opt-c') correctOptionId = 'opt-3';
      else if (lower === '4' || lower === 'd' || lower === 'opt-4' || lower === 'opt-d') correctOptionId = 'opt-4';
      else correctOptionId = rawCorrect;
    }

    const question: VersionedQuestionItem = {
      id: rowObj['id'],
      gradeId: rowObj['gradeid'] || rowObj['grade'] || 'grade-4',
      subjectId: rowObj['subjectid'] || rowObj['subject'] || 'math',
      strandId: rowObj['strandid'] || rowObj['strand'] || 'strand-numbers',
      subStrandId: rowObj['substrandid'] || rowObj['substrand'] || 'substrand-operations',
      learningOutcomeId: rowObj['learningoutcomeid'] || rowObj['learningoutcome'] || undefined,
      type: (rowObj['type'] || rowObj['questiontype'] || 'MULTIPLE_CHOICE').toUpperCase() as any,
      difficulty: (rowObj['difficulty'] || 'EASY').toUpperCase() as any,
      prompt: {
        en: rowObj['prompten'] || rowObj['prompt'] || '',
        sw: rowObj['promptsw'] || undefined
      },
      options: options.length > 0 ? options : undefined,
      correctOptionId,
      correctBoolean: rowObj['correctboolean'] ? rowObj['correctboolean'].toLowerCase() === 'true' : undefined,
      explanation: {
        en: rowObj['explanationen'] || rowObj['explanation'] || '',
        sw: rowObj['explanationsw'] || undefined
      },
      socraticHint: {
        en: rowObj['socratichint'] || rowObj['hint'] || '',
        sw: rowObj['socratichintsw'] || undefined
      },
      kenyanCulturalContext: rowObj['kenyanculturalcontext'] || rowObj['culturalcontext'] || undefined,
      sourceStatus: 'OFFICIAL_KICD'
    };

    questions.push(question);
  }

  return questions;
}

function parseCsvRow(rowStr: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < rowStr.length; i++) {
    const char = rowStr[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function importContentBatch(
  questions: VersionedQuestionItem[],
  options: { allowUpdates?: boolean; dryRun?: boolean } = {}
): ImportResult {
  const existingQuestions = cbeDb.getAllQuestions().map(q => ({
    ...q,
    gradeId: (q as any).gradeId || 'grade-4',
    subjectId: (q as any).subjectId || 'math',
    strandId: (q as any).strandId || 'strand-numbers'
  }));

  const validation = validateBulkContent(questions, options.allowUpdates ? [] : existingQuestions);

  if (!validation.isValid && !options.dryRun) {
    return {
      success: false,
      message: `Content validation failed with ${validation.invalidCount} error(s).`,
      totalProcessed: questions.length,
      createdCount: 0,
      updatedCount: 0,
      validation
    };
  }

  if (options.dryRun) {
    return {
      success: validation.isValid,
      message: validation.isValid
        ? `Pre-validation passed successfully (${questions.length} questions ready to import).`
        : `Validation detected ${validation.invalidCount} errors and ${validation.warningCount} warnings.`,
      totalProcessed: questions.length,
      createdCount: 0,
      updatedCount: 0,
      validation
    };
  }

  let createdCount = 0;
  let updatedCount = 0;

  for (const q of questions) {
    const exists = cbeDb.getQuestionById(q.id);
    if (exists) {
      updatedCount++;
    } else {
      createdCount++;
    }

    const cbeQuestion: any = {
      id: q.id,
      subStrandId: q.subStrandId,
      type: q.type,
      prompt: typeof q.prompt === 'string' ? q.prompt : q.prompt.en,
      storyScenario: typeof q.storyScenario === 'string' ? q.storyScenario : q.storyScenario?.en,
      difficulty: q.difficulty,
      options: q.options?.map(o => ({
        id: o.id,
        text: typeof o.text === 'string' ? o.text : o.text.en
      })),
      correctOptionId: q.correctOptionId,
      correctBoolean: q.correctBoolean,
      matchingPairs: q.matchingPairs,
      explanation: typeof q.explanation === 'string' ? q.explanation : q.explanation?.en || '',
      socraticHint: typeof q.socraticHint === 'string' ? q.socraticHint : q.socraticHint?.en || '',
      kenyanCulturalContext: q.kenyanCulturalContext,
      status: 'PUBLISHED'
    };

    cbeDb.upsertQuestion(cbeQuestion);
  }

  return {
    success: true,
    message: `Successfully imported ${createdCount} new questions and updated ${updatedCount} existing questions.`,
    totalProcessed: questions.length,
    createdCount,
    updatedCount,
    validation
  };
}
