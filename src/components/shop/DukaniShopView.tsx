import React, { useState } from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  student: StudentProfile;
  onStudentUpdated: (student: StudentProfile) => void;
  language?: 'en' | 'sw';
}

interface ShopItem {
  id: string;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  icon: string;
  cost: number;
  category: 'HEARTS' | 'STREAK' | 'TITLE' | 'POWER';
  action: (current: StudentProfile) => Partial<StudentProfile>;
}

export const DukaniShopView: React.FC<Props> = ({
  student,
  onStudentUpdated,
  language = 'en'
}) => {
  const [purchaseMsg, setPurchaseMsg] = useState<string | null>(null);

  const ITEMS: ShopItem[] = [
    {
      id: 'item-heart-refill',
      titleEn: 'Full Heart Refill',
      titleSw: 'Jaza Nishati (Mioyo 5)',
      descriptionEn: 'Refill all 5 learning hearts instantly so you can keep practicing without waiting.',
      descriptionSw: 'Pata mioyo yote 5 mara moja uendelee na masomo bila kukwama.',
      icon: '❤️',
      cost: 20,
      category: 'HEARTS',
      action: () => ({ hearts: 5 })
    },
    {
      id: 'item-streak-freeze',
      titleEn: 'Streak Freeze',
      titleSw: 'Kizuia Mfululizo',
      descriptionEn: 'Protects your streak flame if you miss practice for one day.',
      descriptionSw: 'Inalinda moto wako wa mfululizo usizime ukikosa kusoma kwa siku moja.',
      icon: '❄️',
      cost: 50,
      category: 'STREAK',
      action: () => ({ streakFrozen: true })
    },
    {
      id: 'item-hints-bundle',
      titleEn: '5 Question Hints',
      titleSw: 'Vidokezo 5 vya Rafiki',
      descriptionEn: 'Ask Rafiki for worked steps whenever a question gets tricky.',
      descriptionSw: 'Pata vidokezo vya hatua za kufanya swali likiwa gumu.',
      icon: '💡',
      cost: 15,
      category: 'POWER',
      action: () => ({})
    },
    {
      id: 'item-title-savanna',
      titleEn: 'Savanna Champion Title',
      titleSw: 'Cheo cha Bingwa wa Savanna',
      descriptionEn: 'Display the legendary Savanna Champion badge on your profile.',
      descriptionSw: 'Onyesha beji ya hadhi ya Bingwa wa Savanna kwenye wasifu wako.',
      icon: '🦁',
      cost: 80,
      category: 'TITLE',
      action: () => ({ equippedTitle: 'Savanna Champion' })
    }
  ];

  const handleBuy = (item: ShopItem) => {
    if (student.coins < item.cost) {
      sound.playIncorrect();
      setPurchaseMsg(
        language === 'sw'
          ? `Huna sarafu za kutosha! Unahitaji KES ${item.cost}.`
          : `Not enough coins! You need ${item.cost} Shilingi coins.`
      );
      setTimeout(() => setPurchaseMsg(null), 3500);
      return;
    }

    sound.playLevelUp();
    const updates = item.action(student);
    const updatedStudent: StudentProfile = {
      ...student,
      ...updates,
      coins: student.coins - item.cost
    };
    onStudentUpdated(updatedStudent);

    setPurchaseMsg(
      language === 'sw'
        ? `Hongera! Umenunua ${item.titleSw}!`
        : `Awesome! You purchased ${item.titleEn}!`
    );
    setTimeout(() => setPurchaseMsg(null), 3500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left py-4 px-2 sm:px-0">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-yellow-950/60 via-slate-900 to-amber-950/60 border-2 border-yellow-500/50 shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded-md border border-yellow-700/60">
            Jifuno Dukani • Shop
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            {language === 'sw' ? 'Duka la Shilingi' : 'Shilingi Marketplace'}
          </h2>
          <p className="text-xs text-yellow-200/80 mt-1">
            {language === 'sw'
              ? 'Tumia sarafu ulizoshinda kununua nishati, vidokezo na tuzo.'
              : 'Use your hard-earned coins to refill hearts, get hints, and unlock savanna items.'}
          </p>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-yellow-500/60 text-center shrink-0 shadow-inner">
          <span className="text-[10px] text-gray-400 uppercase font-bold block">Your Balance</span>
          <div className="flex items-center gap-1.5 justify-center mt-0.5">
            <span className="text-xl">🪙</span>
            <span className="text-xl font-black text-yellow-400">{student.coins}</span>
          </div>
        </div>
      </div>

      {/* Purchase Feedback Banner */}
      {purchaseMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs text-center shadow-lg"
        >
          {purchaseMsg}
        </motion.div>
      )}

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map(item => {
          const canAfford = student.coins >= item.cost;
          const isFullHearts = item.category === 'HEARTS' && student.hearts >= student.maxHearts;
          const isStreakActive = item.category === 'STREAK' && student.streakFrozen;

          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-950 border border-emerald-900/70 hover:border-emerald-600 transition-all shadow-md flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-800/80 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {language === 'sw' ? item.titleSw : item.titleEn}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {language === 'sw' ? item.descriptionSw : item.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-950">
                <div className="flex items-center gap-1.5 text-xs font-black text-yellow-400">
                  <span>🪙</span>
                  <span>{item.cost} Coins</span>
                </div>

                <button
                  type="button"
                  disabled={!canAfford || isFullHearts || isStreakActive}
                  onClick={() => handleBuy(item)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isFullHearts
                      ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      : isStreakActive
                      ? 'bg-slate-800 text-cyan-400 cursor-not-allowed'
                      : canAfford
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-md active:scale-95'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isFullHearts
                    ? 'Full Hearts ❤️'
                    : isStreakActive
                    ? 'Protected ❄️'
                    : canAfford
                    ? (language === 'sw' ? 'Nunua' : 'Buy Now')
                    : 'Need Coins'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
