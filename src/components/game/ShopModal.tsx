import React, { useState } from 'react';
import { StudentProfile } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onStudentUpdated: (student: StudentProfile) => void;
}

export const ShopModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  onStudentUpdated
}) => {
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const items = [
    {
      id: 'HEARTS_REFILL',
      title: 'Full Hearts Refill',
      swahiliTitle: 'Rejesha Uhai Wote',
      cost: 40,
      icon: '❤️',
      description: 'Restores your hearts to maximum (5/5) so you can keep playing and exploring without pause!'
    },
    {
      id: 'STREAK_FREEZE',
      title: 'Streak Freeze Shield',
      swahiliTitle: 'Ngao ya Kulinda Mfululizo',
      cost: 60,
      icon: '🛡️',
      description: 'Protects your active daily streak from resetting if you miss practice for a busy school day.'
    },
    {
      id: 'HINT_OWL',
      title: 'Hint Owl Feather',
      swahiliTitle: 'Bundi wa Mashauri',
      cost: 25,
      icon: '🦉',
      description: 'Summons Mwalimu Rafiki for instant Socratic guidance on challenging CBE questions.'
    }
  ];

  const handleBuy = async (item: any) => {
    if (student.coins < item.cost) {
      sound.playIncorrect();
      setToastMessage('Not enough coins! Complete more missions to earn coins.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setLoadingItem(item.id);
    try {
      const res = await cbeApi.buyShopItem(student.id, item.id);
      sound.playCoin();
      setToastMessage(res.message);
      onStudentUpdated(res.student);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      sound.playIncorrect();
      setToastMessage(err.message || 'Purchase failed');
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden space-y-4 p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏬</span>
            <div>
              <h3 className="text-lg font-black text-white">Dukani Safari Shop</h3>
              <p className="text-xs text-amber-300">Spend your hard-earned Kenyan coins on power-ups!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-950/80 border border-amber-500/60 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <span>{student.coins} 🪙</span>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="text-gray-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-bold text-center animate-fade-in">
            {toastMessage}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          {items.map(item => {
            const canAfford = student.coins >= item.cost;

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl border-2 border-emerald-950 bg-slate-950/70 hover:border-amber-500/50 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-amber-400 font-medium">({item.swahiliTitle})</span>
                    </h4>
                    <p className="text-xs text-gray-300 leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loadingItem === item.id || !canAfford}
                  onClick={() => handleBuy(item)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                    canAfford
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-950/60'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  {loadingItem === item.id ? '...' : `${item.cost} 🪙`}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-xs text-gray-400 hover:text-white font-semibold"
          >
            Back to Adventure
          </button>
        </div>
      </div>
    </div>
  );
};
