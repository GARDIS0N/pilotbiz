import React from 'react';
import { sound } from '../../utils/soundEffects.js';

interface ShareableAchievementCardProps {
  studentName: string;
  gradeName: string;
  strandTitle: string;
  accuracyPct: number;
  starsCount: number;
  learningArea: string;
}

export const ShareableAchievementCard: React.FC<ShareableAchievementCardProps> = ({
  studentName,
  gradeName,
  strandTitle,
  accuracyPct,
  starsCount,
  learningArea
}) => {
  const shareText = encodeURIComponent(
    `🌟 Hongera sana! My child ${studentName} just completed ${strandTitle} (${learningArea}, ${gradeName}) on Jifuno with ${accuracyPct}% accuracy! 🇰🇪📚 Try Jifuno: https://jifuno.ke`
  );

  const handleShareWhatsApp = () => {
    sound.playCorrect();
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/20 via-slate-950 to-emerald-500/20 border-2 border-amber-400/50 rounded-3xl p-6 shadow-2xl space-y-4 text-center max-w-lg mx-auto">
      {/* Badge Header */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
        <span>🏆</span>
        <span>Kenyan CBC Certificate of Achievement</span>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-gray-400 uppercase font-semibold">Awarded To</p>
        <h3 className="text-2xl font-black text-white">{studentName}</h3>
        <p className="text-xs text-emerald-400 font-bold">{gradeName} • {learningArea}</p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <span className="text-[11px] text-gray-400 uppercase block">Competency Mastered</span>
        <h4 className="text-base font-black text-amber-300">{strandTitle}</h4>
        <div className="flex items-center justify-center gap-4 text-xs font-bold pt-1">
          <span className="text-emerald-400 font-black text-xl">{accuracyPct}% Accuracy</span>
          <span className="text-amber-400 text-base">{'⭐'.repeat(Math.min(5, Math.max(1, starsCount)))}</span>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 italic">
        "Kujifunza ni nguvu!" • Verified by Jifuno CBC Learning Engine
      </p>

      {/* Share Actions */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>💬</span>
          <span>Share on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🖨️</span>
          <span>Print Certificate</span>
        </button>
      </div>
    </div>
  );
};
