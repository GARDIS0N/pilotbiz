import React, { useEffect, useState } from 'react';
import { Question } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

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

  return (
    <div className="w-full space-y-4">
      {question.storyScenario && (
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-200/90 flex items-start gap-2">
          <span className="text-base">📖</span>
          <span>{question.storyScenario}</span>
        </div>
      )}

      <h3 className="text-lg md:text-xl font-bold text-emerald-100 leading-snug">
        {question.prompt}
      </h3>
      <p className="text-xs text-emerald-400 font-medium">
        👆 Use the up and down arrows to arrange these in the correct sequence!
      </p>

      <div className="space-y-2 pt-2">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 rounded-xl border-2 border-emerald-900/60 bg-emerald-950/40 transition-all text-gray-200 hover:border-emerald-600/60"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-800 text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm md:text-base font-medium">{item.text}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                disabled={disabled || idx === 0}
                onClick={() => moveItem(idx, 'UP')}
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-700 text-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm"
                title="Move up"
              >
                ▲
              </button>
              <button
                type="button"
                disabled={disabled || idx === items.length - 1}
                onClick={() => moveItem(idx, 'DOWN')}
                className="w-8 h-8 rounded-lg bg-emerald-900/80 hover:bg-emerald-700 text-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm"
                title="Move down"
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
