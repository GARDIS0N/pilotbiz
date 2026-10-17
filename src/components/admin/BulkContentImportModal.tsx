import React, { useState } from 'react';
import { cbeApi } from '../../services/cbeApi.js';
import { ContentStatus } from '../../types/cbe.js';
import { QualityChecklistResult } from '../../types/contentVersion.js';
import { sound } from '../../utils/soundEffects.js';

interface BulkContentImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

const SAMPLE_CSV = `id,grade,strand,sub_strand,learning_outcome,difficulty,question_type,prompt,prompt_sw,option_1,option_2,option_3,option_4,correct_option,explanation,explanation_sw,socratic_hint
q-g4-math-market-01,grade-4,Numbers,Multiplication,Multiply 2-digit numbers,EASY,MULTIPLE_CHOICE,At Karatina market Mama Njeri has 4 baskets each with 12 mangoes. How many mangoes does she have in total?,Kwenye soko la Karatina Mama Njeri ana vikapu 4 vyenye maembe 12 kila kimoja. Je ana maembe mangapi kwa jumla?,48 mangoes,44 mangoes,36 mangoes,52 mangoes,opt-1,4 baskets multiplied by 12 mangoes equals 48 mangoes.,Vikapu 4 vikizidishwa na maembe 12 ni sawa na maembe 48.,Multiply 4 by 10 then add 4 times 2!
q-g4-sci-plants-01,grade-4,Living Things,Plant Nutrition,Identify photosynthesis components,MEDIUM,MULTIPLE_CHOICE,Which gas do maize plants in Kitale absorb from the air during photosynthesis?,Je mimea ya mahindi kule Kitale hufyonza gesi gani hewani wakati wa usanisinuru?,Carbon dioxide,Oxygen,Nitrogen,Hydrogen,opt-1,Plants absorb carbon dioxide from the air and release oxygen.,Mimea hufyonza kaboni dioksidi na kutoa oksijeni.,Think about the gas animals breathe out that plants use!`;

const SAMPLE_JSON = JSON.stringify({
  schemaVersion: '1.2.0',
  curriculumVersion: 'CBC-KICD-2024',
  packageId: 'pkg-grade4-math-term1',
  title: 'Grade 4 Mathematics Multiplication & Plants',
  questions: [
    {
      id: 'q-g4-math-market-01',
      gradeId: 'grade-4',
      strandId: 'Numbers',
      subStrandId: 'Multiplication',
      learningOutcome: 'Multiply 2-digit numbers',
      difficulty: 'EASY',
      type: 'MULTIPLE_CHOICE',
      prompt: 'At Karatina market Mama Njeri has 4 baskets each with 12 mangoes. How many mangoes does she have in total?',
      localizedPrompt: {
        en: 'At Karatina market Mama Njeri has 4 baskets each with 12 mangoes. How many mangoes does she have in total?',
        sw: 'Kwenye soko la Karatina Mama Njeri ana vikapu 4 vyenye maembe 12 kila kimoja. Je ana maembe mangapi kwa jumla?'
      },
      options: [
        { id: 'opt-1', text: '48 mangoes' },
        { id: 'opt-2', text: '44 mangoes' },
        { id: 'opt-3', text: '36 mangoes' },
        { id: 'opt-4', text: '52 mangoes' }
      ],
      correctOptionId: 'opt-1',
      explanation: '4 baskets multiplied by 12 mangoes equals 48 mangoes.',
      localizedExplanation: {
        en: '4 baskets multiplied by 12 mangoes equals 48 mangoes.',
        sw: 'Vikapu 4 vikizidishwa na maembe 12 ni sawa na maembe 48.'
      },
      socraticHint: 'Multiply 4 by 10 then add 4 times 2!',
      kenyanCulturalContext: 'Karatina market in Nyeri County is one of the largest open-air markets in East Africa.'
    }
  ]
}, null, 2);

export const BulkContentImportModal: React.FC<BulkContentImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [content, setContent] = useState<string>('');
  const [targetStatus, setTargetStatus] = useState<ContentStatus>('PUBLISHED');
  const [isValidating, setIsValidating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    questionsCount: number;
    validCount: number;
    errorCount: number;
    warningCount: number;
    validationResults: QualityChecklistResult[];
    preview: any[];
  } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleLoadSample = () => {
    sound.playClick();
    setContent(format === 'csv' ? SAMPLE_CSV : SAMPLE_JSON);
    setValidationResult(null);
    setFeedbackMessage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
      setValidationResult(null);
      setFeedbackMessage(null);
      if (file.name.endsWith('.json')) {
        setFormat('json');
      } else if (file.name.endsWith('.csv')) {
        setFormat('csv');
      }
    };
    reader.readAsText(file);
  };

  const handleValidate = async () => {
    if (!content.trim()) {
      setFeedbackMessage({ type: 'error', text: 'Please paste or upload content before validating.' });
      return;
    }

    try {
      sound.playClick();
      setIsValidating(true);
      setFeedbackMessage(null);
      const res = await cbeApi.validateContentImport(format, content);
      setValidationResult(res);
      if (res.errorCount === 0) {
        setFeedbackMessage({
          type: 'success',
          text: `All ${res.questionsCount} question(s) passed quality validation! Ready to publish.`
        });
      } else {
        setFeedbackMessage({
          type: 'error',
          text: `Found ${res.errorCount} validation error(s). Please fix highlighted issues before importing.`
        });
      }
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: err.message || 'Validation failed' });
    } finally {
      setIsValidating(false);
    }
  };

  const handlePublish = async () => {
    if (!content.trim()) return;

    try {
      sound.playClick();
      setIsPublishing(true);
      setFeedbackMessage(null);
      const res = await cbeApi.publishContentBatch(format, content, targetStatus);
      if (res.success) {
        sound.playCorrect();
        setFeedbackMessage({
          type: 'success',
          text: `Successfully imported ${res.batchResult.importedQuestions.length} questions into curriculum bank!`
        });
        setTimeout(() => {
          onImportSuccess();
          onClose();
        }, 1200);
      } else {
        setFeedbackMessage({
          type: 'error',
          text: res.batchResult?.errors?.join(', ') || 'Import failed.'
        });
      }
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: err.message || 'Import publication failed.' });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 w-full max-w-4xl shadow-2xl space-y-4 my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>📥</span>
              <span>Bulk Content Import & Quality Engine</span>
            </h3>
            <p className="text-xs text-gray-400">
              Import Kenyan CBC curriculum questions via CSV or JSON with automated validation.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Toolbar: Format selector, sample loader, file picker */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold">Format:</span>
            <button
              type="button"
              onClick={() => { setFormat('csv'); setValidationResult(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                format === 'csv' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              CSV Spreadsheet
            </button>
            <button
              type="button"
              onClick={() => { setFormat('json'); setValidationResult(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                format === 'json' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              JSON Package
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-purple-300 hover:bg-slate-700 transition-all cursor-pointer"
            >
              📋 Load Sample Template
            </button>

            <label className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-emerald-300 hover:bg-slate-700 transition-all cursor-pointer">
              📁 Choose File
              <input
                type="file"
                accept=".csv,.json,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Editor / Text Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Payload Content ({format.toUpperCase()}):</span>
            <span>{content.length} characters</span>
          </div>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setValidationResult(null);
            }}
            placeholder={
              format === 'csv'
                ? 'Paste comma-separated questions here...\nid,grade,strand,sub_strand,learning_outcome,difficulty,question_type,prompt,...'
                : '{\n  "schemaVersion": "1.2.0",\n  "questions": [...]\n}'
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-purple-400 placeholder:text-gray-600 leading-relaxed"
          />
        </div>

        {/* Validation Overview Metrics (if validated) */}
        {validationResult && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Parsed Questions</span>
                <span className="text-xl font-black text-white">{validationResult.questionsCount}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-center">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">Valid Questions</span>
                <span className="text-xl font-black text-emerald-400">{validationResult.validCount}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/30 text-center">
                <span className="text-[10px] text-rose-400 uppercase font-bold block">Validation Errors</span>
                <span className="text-xl font-black text-rose-400">{validationResult.errorCount}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-center">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">Quality Warnings</span>
                <span className="text-xl font-black text-amber-400">{validationResult.warningCount}</span>
              </div>
            </div>

            {/* Checklist Issues List */}
            {validationResult.validationResults.some(r => !r.valid || r.warnings.length > 0) && (
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {validationResult.validationResults.map((r) => (
                  <div
                    key={r.questionId}
                    className={`p-2.5 rounded-xl border text-xs ${
                      !r.valid ? 'bg-rose-950/40 border-rose-800/80 text-rose-200' : 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span>{r.valid ? '⚠️' : '❌'}</span>
                      <span>{r.questionId}</span>
                    </div>
                    {r.errors.length > 0 && (
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-rose-300">
                        {r.errors.map((e: string, i: number) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    )}
                    {r.warnings.length > 0 && (
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-amber-300">
                        {r.warnings.map((w: string, i: number) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feedback Message Banner */}
        {feedbackMessage && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold border ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
            }`}
          >
            {feedbackMessage.text}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold">Target Status:</span>
            <select
              value={targetStatus}
              onChange={(e) => setTargetStatus(e.target.value as ContentStatus)}
              className="bg-slate-950 border border-slate-700 text-xs font-bold rounded-xl px-3 py-1.5 text-white focus:outline-none"
            >
              <option value="PUBLISHED">PUBLISHED (Active in Curriculum)</option>
              <option value="APPROVED">APPROVED (Staged for Release)</option>
              <option value="REVIEW">REVIEW (Pending Teacher Review)</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleValidate}
              disabled={isValidating || !content.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer disabled:opacity-50"
            >
              {isValidating ? 'Validating...' : '🔍 Validate Content'}
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={
                isPublishing ||
                !content.trim() ||
                (validationResult !== null && validationResult.errorCount > 0)
              }
              className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg transition-all cursor-pointer disabled:opacity-40"
            >
              {isPublishing ? 'Publishing...' : '🚀 Import to Question Bank'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
