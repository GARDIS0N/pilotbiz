import React from 'react';
import { sound } from '../../utils/soundEffects.js';
import { JifunoLogo } from '../common/JifunoLogo.js';

export type AppTab = 'LEARN' | 'PRACTICE' | 'SHOP' | 'ME';

interface Props {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  language?: 'en' | 'sw';
  isMuted?: boolean;
  onToggleMute?: () => void;
}

interface TabItem {
  id: AppTab;
  labelEn: string;
  labelSw: string;
  icon: string;
}

const TABS: TabItem[] = [
  { id: 'LEARN', labelEn: 'Learn', labelSw: 'Jifunze', icon: '🗺️' },
  { id: 'PRACTICE', labelEn: 'Practice', labelSw: 'Mazoezi', icon: '🎯' },
  { id: 'SHOP', labelEn: 'Dukani', labelSw: 'Dukani', icon: '🏬' },
  { id: 'ME', labelEn: 'Me', labelSw: 'Mimi', icon: '👤' }
];

export const AppNavigation: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  language = 'en',
  isMuted = false,
  onToggleMute
}) => {
  const handleTabClick = (tab: AppTab) => {
    sound.playClick();
    onSelectTab(tab);
  };

  return (
    <>
      {/* Desktop Left Sidebar (Duolingo Style: >= 768px) */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-slate-950/95 border-r border-emerald-900/60 p-5 min-h-screen fixed left-0 top-0 z-40 select-none">
        <div className="space-y-7">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 px-3 py-2">
            <JifunoLogo size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">Jifuno</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  CBC
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 font-medium">
                {language === 'sw' ? 'Jifunze. Cheza. Shinda.' : 'Learn. Play. Level Up.'}
              </p>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="space-y-2">
            {TABS.map(t => {
              const isActive = currentTab === t.id;
              const label = language === 'sw' ? t.labelSw : t.labelEn;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTabClick(t.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-sm transition-all cursor-pointer text-left border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'bg-emerald-950/50 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950/50 scale-[1.02]'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-2xl shrink-0">{t.icon}</span>
                  <span className="tracking-wide">{label.toUpperCase()}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="space-y-3 pt-4 border-t border-emerald-950">
          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-900/60 hover:border-emerald-700 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'Sound Off (Zima)' : 'Sound On (Sauti)'}</span>
            </button>
          )}

          <div className="px-2 text-[10px] text-gray-500 leading-tight">
            Kenya CBC Grades 3–6 • KICD Aligned
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar (< 768px) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-emerald-900/60 px-2 py-1.5 flex items-center justify-around select-none safe-area-pb"
        aria-label="Mobile Navigation"
      >
        {TABS.map(t => {
          const isActive = currentTab === t.id;
          const label = language === 'sw' ? t.labelSw : t.labelEn;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTabClick(t.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 min-h-[52px] ${
                isActive
                  ? 'text-emerald-400 font-black'
                  : 'text-gray-400 hover:text-gray-200 font-medium'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`w-9 h-8 rounded-xl flex items-center justify-center text-xl transition-all ${
                  isActive
                    ? 'bg-emerald-950 border border-emerald-500/80 -translate-y-0.5 shadow-sm'
                    : ''
                }`}
              >
                {t.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
