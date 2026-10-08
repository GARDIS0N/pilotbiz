import React, { useEffect, useState } from 'react';

interface CelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
  message?: string;
}

export const Celebration: React.FC<CelebrationProps> = ({ trigger, onComplete, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden animate-fade-in">
      {/* Subtle emerald radiant aura */}
      <div className="absolute inset-0 bg-[#10B981]/10 backdrop-blur-[1px] transition-opacity duration-1000 animate-pulse" />

      {/* Floating congratulatory toast */}
      <div className="relative px-6 py-3 rounded-2xl bg-[#091F16]/95 border border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center gap-3 animate-bounce">
        <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />
        <span className="text-sm font-bold text-[#ECFDF5] tracking-wide">
          {message || 'Task Conquered! Momentum Maintained.'}
        </span>
      </div>

      {/* Minimal confetti particles */}
      <div className="absolute inset-0 flex justify-around">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#10B981]"
            style={{
              position: 'absolute',
              top: '-10px',
              left: `${(i / 16) * 100}%`,
              animation: `fall ${1.5 + (i % 5) * 0.2}s ease-out forwards`,
              opacity: 0.8,
              transform: `scale(${0.6 + (i % 3) * 0.3})`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
