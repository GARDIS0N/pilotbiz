import React, { useState } from 'react';
import { Question } from '../../types/cbe.js';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.js';
import { TrueFalseQuestion } from './TrueFalseQuestion.js';
import { MatchingQuestion } from './MatchingQuestion.js';
import { OrderingQuestion } from './OrderingQuestion.js';
import { FillBlankQuestion } from './FillBlankQuestion.js';
import { ScenarioQuestion } from './ScenarioQuestion.js';
import { NumberEntryQuestion } from './NumberEntryQuestion.js';
import { ImageLabelQuestion } from './ImageLabelQuestion.js';
import { ListenChooseQuestion } from './ListenChooseQuestion.js';
import { ReadingComprehensionQuestion } from './ReadingComprehensionQuestion.js';
import { WordBuilderQuestion } from './WordBuilderQuestion.js';
import { KenyanMoneyQuestion } from './KenyanMoneyQuestion.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  question: Question;
  selectedAnswer: any;
  onSelectAnswer: (ans: any) => void;
  onSubmitAnswer?: () => void;
  disabled?: boolean;
  showExplanation?: boolean;
  isCorrect?: boolean;
}

export const QuestionRenderer: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  disabled = false,
  showExplanation = false,
  isCorrect
}) => {
  const [showHint, setShowHint] = useState(false);

  const renderQuestionType = () => {
    switch (question.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'TRUE_FALSE':
        return (
          <TrueFalseQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'MATCHING':
        return (
          <MatchingQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'ORDERING':
        return (
          <OrderingQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'FILL_BLANK':
        return (
          <FillBlankQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'SCENARIO':
        return (
          <ScenarioQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'NUMBER_ENTRY':
        return (
          <NumberEntryQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'IMAGE_LABEL':
        return (
          <ImageLabelQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'LISTEN_CHOOSE':
        return (
          <ListenChooseQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'READING_COMPREHENSION':
        return (
          <ReadingComprehensionQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'WORD_BUILDER':
        return (
          <WordBuilderQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      case 'KENYAN_MONEY':
        return (
          <KenyanMoneyQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
      default:
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            disabled={disabled}
          />
        );
    }
  };

  const hasAnswer = selectedAnswer !== null && selectedAnswer !== undefined && selectedAnswer !== '';

  return (
    <div className="space-y-6">
      {/* Top Helper Bar: Socratic Hint Toggle & Context Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
            {question.type.replace('_', ' ')}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {question.difficulty === 'BEGINNER' ? '★ Level 1' : question.difficulty === 'EASY' ? '★★ Level 2' : '★★★ Level 3'}
          </span>
        </div>

        {question.socraticHint && (
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all cursor-pointer"
          >
            <span>💡</span>
            <span>{showHint ? 'Ficha Kidokezo' : 'Kidokezo (Hint)'}</span>
          </button>
        )}
      </div>

      {/* Socratic Hint Panel */}
      {showHint && question.socraticHint && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400">
            <span>🦉 Rafiki’s Guiding Hint:</span>
          </div>
          <p className="text-xs text-amber-100 leading-relaxed">
            {question.socraticHint}
          </p>
          {question.swahiliSocraticHint && (
            <p className="text-xs text-amber-300/80 leading-relaxed pt-1 border-t border-amber-900/60">
              {question.swahiliSocraticHint}
            </p>
          )}
        </div>
      )}

      {/* Primary Question Content */}
      <div className="py-1">
        {renderQuestionType()}
      </div>

      {/* Post-Answer Feedback & Explanation */}
      {showExplanation && (
        <div
          className={`p-4 md:p-5 rounded-3xl border-2 space-y-2.5 animate-fadeIn ${
            isCorrect
              ? 'border-emerald-500 bg-emerald-950/80 text-white'
              : 'border-rose-500 bg-rose-950/80 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-black">
            <span className="text-xl">{isCorrect ? '🎉' : '💭'}</span>
            <span>{isCorrect ? 'Hongera! Excellent work!' : 'Jaribu tena! Let’s review together:'}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
            {question.explanation}
          </p>
          {question.swahiliExplanation && (
            <p className="text-xs text-emerald-300/90 leading-relaxed pt-1.5 border-t border-emerald-900/60">
              {question.swahiliExplanation}
            </p>
          )}

          {question.kenyanCulturalContext && (
            <div className="pt-2 text-[11px] text-gray-400 flex items-center gap-1.5">
              <span>🇰🇪</span>
              <span><strong>Kenyan CBC Context:</strong> {question.kenyanCulturalContext}</span>
            </div>
          )}
        </div>
      )}

      {/* Submit Action */}
      {!showExplanation && onSubmitAnswer && (
        <div className="pt-2">
          <button
            type="button"
            disabled={disabled || !hasAnswer}
            onClick={() => {
              sound.playClick();
              onSubmitAnswer();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>SUBMIT ANSWER / WASILISHA JIBU</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
};
