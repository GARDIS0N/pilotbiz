import React, { useEffect, useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';
import { VocabularyExplainer } from '../common/VocabularyExplainer.js';

interface Props {
  question: Question;
  selectedAnswer: string[] | null;
  onSelectAnswer: (orderIds: string[]) => void;
  disabled?: boolean;
}

export const OrderingQuestion: React.FC<Props> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  disabled
}) => {
  const options = question.options || [];
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    if (selectedAnswer && selectedAnswer.length > 0) {
      const reordered = selectedAnswer
        .map(id => options.find(o => o.id === id))
        .filter(Boolean) as { id: string; text: string }[];
      setItems(reordered);
    } else {
      // Shuffle or initial order
      setItems([...options]);
      onSelectAnswer(options.map(o => o.id));
    }
  }, [question.id]);

  const moveItem = (index: number, direction: 'UP' | 'DOWN') => {
    if (disabled) return;
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    sound.playClick();
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    setItems(newItems);
    onSelectAnswer(newItems.map(it => it.id));
  };

  const isKiswahili = Boolean(
    question.subStrandId?.includes('kisw') ||
    question.id?.includes('-kisw-')
  );

  return (
    <div className="w-full space-y-4">
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-200/90 flex items-start gap-2">
          <span className="text-base">📖</span>
          <span>{question.storyScenario}</span>
        </div>
      )}

      <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
        <VocabularyExplainer text={question.prompt} />
      </h3>
      <p className="text-xs text-emerald-300 font-bold">
        {isKiswahili
          ? '👆 Tumia mishale ya juu na chini kupanga hivi kwa mtiririko sahihi!'
          : '👆 Use the up and down arrows to arrange these in the correct sequence!'}
      </p>

      <div className="space-y-3 pt-2">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-700 bg-slate-900/95 transition-all text-white hover:border-emerald-400 min-h-[56px]"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-600 text-emerald-300 font-black text-sm flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-lg font-bold text-white leading-snug">{item.text}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={disabled || idx === 0}
                onClick={() => moveItem(idx, 'UP')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-black text-base cursor-pointer"
                title="Move up"
                aria-label="Move item up"
              >
                ▲
              </button>
              <button
                type="button"
                disabled={disabled || idx === items.length - 1}
                onClick={() => moveItem(idx, 'DOWN')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-black text-base cursor-pointer"
                title="Move down"
                aria-label="Move item down"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
