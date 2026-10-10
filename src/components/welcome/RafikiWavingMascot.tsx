import React from 'react';
import { useReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  className?: string;
  size?: number;
}

export const RafikiWavingMascot: React.FC<Props> = ({
  className = '',
  size = 180
}) => {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Rafiki, your friendly CBC owl and bushbaby learning companion waving hello"
    >
      {/* Warm Ambient Glow Behind Mascot */}
      <div className="absolute inset-2 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

      {/* Pure SVG Animated Mascot */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform hover:scale-105"
      >
        {/* Shadow Grounding */}
        <ellipse cx="100" cy="180" rx="45" ry="10" fill="#000000" fillOpacity="0.4" />

        {/* Left Ear */}
        <g className={reducedMotion ? '' : 'origin-[65px_65px] animate-bounce-subtle'}>
          <path
            d="M50 70C35 45 45 20 70 35C75 48 70 65 50 70Z"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="3"
          />
          <path d="M54 62C45 48 52 32 66 42C68 50 64 58 54 62Z" fill="#FDE68A" />
        </g>

        {/* Right Ear */}
        <g className={reducedMotion ? '' : 'origin-[135px_65px] animate-bounce-subtle'}>
          <path
            d="M150 70C165 45 155 20 130 35C125 48 130 65 150 70Z"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="3"
          />
          <path d="M146 62C155 48 148 32 134 42C132 50 136 58 146 62Z" fill="#FDE68A" />
        </g>

        {/* Mascot Body */}
        <ellipse
          cx="100"
          cy="135"
          rx="52"
          ry="45"
          fill="#B45309"
          stroke="#78350F"
          strokeWidth="3"
        />
        {/* Soft Belly (Kenyan Savanna Khaki) */}
        <ellipse cx="100" cy="142" rx="36" ry="32" fill="#FEF3C7" />
        <path
          d="M85 135C90 145 110 145 115 135M88 150C92 158 108 158 112 150"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Head */}
        <ellipse
          cx="100"
          cy="92"
          rx="48"
          ry="44"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="3.5"
        />

        {/* Facial Fur Mask */}
        <path
          d="M62 82C62 65 80 58 100 70C120 58 138 65 138 82C138 105 125 118 100 118C75 118 62 105 62 82Z"
          fill="#FDE68A"
        />

        {/* Left Big Curious Eye */}
        <circle cx="82" cy="85" r="14" fill="#FFFFFF" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="84" cy="84" r="8" fill="#1E293B" />
        <circle cx="86" cy="81" r="3" fill="#FFFFFF" />
        <circle cx="81" cy="87" r="1.5" fill="#FFFFFF" />

        {/* Right Big Curious Eye */}
        <circle cx="118" cy="85" r="14" fill="#FFFFFF" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="116" cy="84" r="8" fill="#1E293B" />
        <circle cx="118" cy="81" r="3" fill="#FFFFFF" />
        <circle cx="113" cy="87" r="1.5" fill="#FFFFFF" />

        {/* Cute Beak/Nose */}
        <path
          d="M96 95L104 95L100 102Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="2"
        />

        {/* Friendly Smile */}
        <path
          d="M92 104C96 110 104 110 108 104"
          stroke="#92400E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Rosy Cheeks */}
        <ellipse cx="68" cy="98" rx="6" ry="4" fill="#F87171" fillOpacity="0.5" />
        <ellipse cx="132" cy="98" rx="6" ry="4" fill="#F87171" fillOpacity="0.5" />

        {/* Scholar / Scout Fez Cap with Sprout */}
        <path
          d="M82 52L118 52L112 40L88 40Z"
          fill="#059669"
          stroke="#047857"
          strokeWidth="2"
        />
        <circle cx="100" cy="38" r="4" fill="#FBBF24" />
        <path
          d="M102 36C108 28 116 32 114 38C108 38 104 36 102 36Z"
          fill="#34D399"
        />

        {/* Left Rest Arm */}
        <path
          d="M52 125C44 135 48 150 62 145"
          stroke="#92400E"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Animated Waving Right Hand / Wing */}
        <g
          className={
            reducedMotion
              ? ''
              : 'origin-[145px_130px] animate-[wave_1.4s_ease-in-out_infinite]'
          }
        >
          <path
            d="M145 130C165 120 180 100 174 85C168 78 156 86 148 105"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Friendly Waving Paw Pads */}
          <circle cx="172" cy="88" r="4.5" fill="#FDE68A" />
          <circle cx="166" cy="82" r="3" fill="#FDE68A" />
          <circle cx="178" cy="84" r="3" fill="#FDE68A" />
        </g>
      </svg>
    </div>
  );
};
