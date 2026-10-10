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

  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  return (
    <div className="space-y-4">
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
              : 'border-amber-500 bg-amber-950/80 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-black">
            <span className="text-xl">{isCorrect ? '🎉' : '💭'}</span>
            <span>{isCorrect ? 'Hongera! Nicely done!' : 'Almost! Try again:'}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
            {isKiswahili && question.swahiliExplanation ? question.swahiliExplanation : question.explanation}
          </p>

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
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
          >
            <span>{isKiswahili ? 'WASILISHA JIBU' : 'CHECK ANSWER'}</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
};
