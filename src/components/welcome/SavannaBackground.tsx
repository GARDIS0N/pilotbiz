import React from 'react';
import { useReducedMotionPreference } from '../../utils/motion.js';

export const SavannaBackground: React.FC = () => {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Deep Savanna Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-emerald-950/20" />

      {/* Savanna Warm Horizon Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl" />

      {/* SVG Savanna Hills & Acacia Silhouettes */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-48 md:h-64 opacity-25 object-cover"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Rolling Ridge 1 */}
        <path
          d="M0 240C240 180 480 270 720 220C960 170 1200 240 1440 210V320H0V240Z"
          fill="#064E3B"
          fillOpacity="0.4"
        />

        {/* Rolling Ridge 2 */}
        <path
          d="M0 260C300 220 600 290 900 250C1200 210 1350 270 1440 260V320H0V260Z"
          fill="#022C22"
          fillOpacity="0.7"
        />

        {/* Acacia Tree Silhouette Left */}
        <g transform="translate(140, 160) scale(0.65)" fill="#022C22">
          {/* Trunk */}
          <path d="M48 160L46 100L42 70L25 45L30 43L46 64L54 40L58 41L50 67L68 50L71 53L52 74L56 100L54 160Z" />
          {/* Flat Canopy */}
          <ellipse cx="28" cy="38" rx="36" ry="12" />
          <ellipse cx="60" cy="32" rx="42" ry="14" />
          <ellipse cx="80" cy="42" rx="28" ry="10" />
        </g>

        {/* Acacia Tree Silhouette Right */}
        <g transform="translate(1180, 175) scale(0.55)" fill="#022C22">
          {/* Trunk */}
          <path d="M48 160L46 100L42 70L25 45L30 43L46 64L54 40L58 41L50 67L68 50L71 53L52 74L56 100L54 160Z" />
          {/* Canopy */}
          <ellipse cx="28" cy="38" rx="36" ry="12" />
          <ellipse cx="60" cy="32" rx="42" ry="14" />
          <ellipse cx="80" cy="42" rx="28" ry="10" />
        </g>
      </svg>

      {/* Floating Savanna Fireflies / Embers (GPU-only opacity & transform) */}
      {!reducedMotion && (
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 rounded-full bg-amber-400/30 blur-xs top-1/4 left-1/5 animate-pulse" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/30 blur-xs top-1/3 right-1/4 animate-pulse delay-700" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-300/20 blur-xs top-2/3 left-1/3 animate-pulse delay-1000" />
          <div className="absolute w-1 h-1 rounded-full bg-emerald-300/40 blur-xs bottom-1/4 right-1/5 animate-pulse delay-300" />
        </div>
      )}
    </div>
  );
};
