import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-pulse">
      {/* Top Status Bar Skeleton */}
      <div className="h-20 bg-slate-900/80 border border-emerald-950 rounded-3xl p-4 flex items-center justify-between" />

      {/* Hero Quest Card Skeleton */}
      <div className="h-56 bg-slate-900/60 border border-emerald-950 rounded-3xl p-6" />

      {/* Tabs Skeleton */}
      <div className="flex gap-3">
        <div className="h-10 w-28 bg-slate-900 rounded-xl" />
        <div className="h-10 w-36 bg-slate-900 rounded-xl" />
        <div className="h-10 w-32 bg-slate-900 rounded-xl" />
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-44 bg-slate-900/60 border border-emerald-950 rounded-2xl" />
        <div className="h-44 bg-slate-900/60 border border-emerald-950 rounded-2xl" />
      </div>
    </div>
  );
};
