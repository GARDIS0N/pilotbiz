import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const JifunoLogo: React.FC<Props> = ({
  size = 'md',
  showText = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 32, text: 'text-sm' },
    md: { box: 'w-10 h-10', svg: 40, text: 'text-base' },
    lg: { box: 'w-12 h-12', svg: 48, text: 'text-lg' },
    xl: { box: 'w-16 h-16', svg: 64, text: 'text-2xl' }
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${current.box} rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-950/60 flex items-center justify-center shrink-0 group transform transition-transform hover:scale-105`}
        aria-label="Jifuno Logo"
      >
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden relative">
          {/* Savanna Sunburst Backdrop */}
          <div className="absolute inset-0 bg-radial from-amber-400/25 to-transparent pointer-events-none" />

          {/* Stylized J Glyph with Safari Sprout */}
          <svg
            width="75%"
            height="75%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-2"
          >
            {/* Sunburst Crest */}
            <circle cx="50" cy="22" r="12" fill="#F59E0B" />
            <path
              d="M50 4L50 10M68 22L62 22M32 22L38 22M63 9L58 14M37 9L42 14"
              stroke="#FBBF24"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Stylized "J" Stem & Curve in Emerald */}
            <path
              d="M55 24V64C55 76 43 84 31 82C22 80 18 72 20 64"
              stroke="#10B981"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Sprout Leaf Branching Out */}
            <path
              d="M55 42C68 36 78 44 76 56C64 56 56 48 55 42Z"
              fill="#34D399"
            />
            {/* Golden Star Core */}
            <circle cx="34" cy="68" r="4" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`font-black text-white tracking-tight ${current.text}`}>
              Jifuno
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-black px-1.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
              CBC
            </span>
          </div>
          <span className="text-[10px] text-emerald-400/90 font-medium block">
            Learn. Play. Level Up.
          </span>
        </div>
      )}
    </div>
  );
};
