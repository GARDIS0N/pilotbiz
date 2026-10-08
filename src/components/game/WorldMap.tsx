import React, { useState } from 'react';
import { GameWorld, Mission, StudentProfile } from '../../types/cbe.js';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  worlds: GameWorld[];
  missions: Mission[];
  student: StudentProfile;
  onSelectMission: (missionId: string) => void;
}

export const WorldMap: React.FC<Props> = ({
  worlds,
  missions,
  student,
  onSelectMission
}) => {
  const [activeWorldId, setActiveWorldId] = useState<string>(worlds[0]?.id || 'world-math-kingdom');
  const [selectedMissionPreview, setSelectedMissionPreview] = useState<Mission | null>(null);

  const activeWorld = worlds.find(w => w.id === activeWorldId) || worlds[0];
  const worldMissions = missions.filter(m => m.worldId === activeWorld?.id);

  const isWorldUnlocked = (world: GameWorld) => {
    return student.level >= world.requiredLevel || student.unlockedWorldIds.includes(world.id);
  };

  const isMissionUnlocked = (m: Mission, idx: number) => {
    if (!isWorldUnlocked(activeWorld)) return false;
    // First mission in unlocked world is always unlocked
    if (idx === 0) return true;
    // Otherwise previous mission must be completed
    const prevMission = worldMissions[idx - 1];
    return student.completedMissionIds.includes(prevMission.id);
  };

  return (
    <div className="w-full space-y-6">
      {/* World Tabs Selector */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {worlds.map(w => {
          const unlocked = isWorldUnlocked(w);
          const isSelected = w.id === activeWorldId;

          return (
            <button
              key={w.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveWorldId(w.id);
                setSelectedMissionPreview(null);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 font-bold text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40'
                  : unlocked
                  ? 'border-emerald-900/60 bg-emerald-950/30 text-gray-300 hover:border-emerald-600 hover:bg-emerald-900/40'
                  : 'border-slate-800 bg-slate-900/50 text-gray-500 opacity-60'
              }`}
            >
              <span className="text-base">
                {w.id.includes('math') ? '🏰' : w.id.includes('science') ? '🔬' : w.id.includes('word') ? '📖' : w.id.includes('farm') ? '🌱' : '🌍'}
              </span>
              <span>{w.title}</span>
              {!unlocked && (
                <span className="text-[10px] bg-slate-800 text-gray-400 px-1.5 py-0.5 rounded">
                  Lvl {w.requiredLevel} 🔒
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* World Hero Banner */}
      {activeWorld && (
        <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeWorld.bannerGradient} border border-emerald-500/30 shadow-xl text-white relative overflow-hidden`}>
          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
              <span>{activeWorld.swahiliTitle}</span>
              <span>•</span>
              <span>Level {activeWorld.requiredLevel}+ Required</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black">{activeWorld.title}</h2>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              {activeWorld.description}
            </p>
          </div>
          <div className="absolute right-4 bottom-2 text-7xl opacity-20 pointer-events-none">
            {activeWorld.id.includes('math') ? '🏰' : activeWorld.id.includes('science') ? '🔬' : '🌍'}
          </div>
        </div>
      )}

      {/* Journey Map Path */}
      <div className="bg-slate-950/70 border border-emerald-900/60 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden">
        <div className="text-center space-y-1">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Learning Trail & CBE Missions
          </h3>
          <p className="text-xs text-gray-400">
            Tap a mission node to begin your quest!
          </p>
        </div>

        {/* Nodes Journey Path */}
        <div className="flex flex-col items-center space-y-6 relative max-w-md mx-auto">
          {worldMissions.map((mission, idx) => {
            const isCompleted = student.completedMissionIds.includes(mission.id);
            const unlocked = isMissionUnlocked(mission, idx);
            const isBoss = mission.isBossChallenge;

            return (
              <div key={mission.id} className="flex flex-col items-center w-full">
                {/* Node Button */}
                <div className="relative flex flex-col items-center">
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMissionPreview(mission);
                    }}
                    className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center font-black text-2xl transition-all transform active:scale-95 shadow-xl relative cursor-pointer ${
                      isCompleted
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white ring-4 ring-emerald-400/50 shadow-emerald-900/50 hover:scale-105'
                        : unlocked
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 ring-4 ring-amber-300 animate-bounce shadow-amber-900/50 hover:scale-105'
                        : 'bg-slate-800/80 text-gray-500 border border-slate-700 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>
                      {isCompleted ? '✓' : isBoss ? '👑' : unlocked ? '⚡' : '🔒'}
                    </span>
                    <span className="text-[10px] font-bold tracking-tight mt-0.5">
                      {isCompleted ? 'CLEARED' : `M-0${idx + 1}`}
                    </span>
                  </button>

                  {/* Stars indicator if completed */}
                  {isCompleted && (
                    <div className="flex items-center gap-0.5 text-xs text-amber-400 mt-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  )}

                  {/* Mission Label */}
                  <div className="text-center mt-2 max-w-[200px]">
                    <span className="text-xs font-bold text-gray-200 block truncate">
                      {mission.title}
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      +{mission.xpReward} XP • +{mission.coinReward} 🪙
                    </span>
                  </div>
                </div>

                {/* Connecting Path line */}
                {idx < worldMissions.length - 1 && (
                  <div className="w-1.5 h-10 bg-emerald-900/60 rounded-full my-2 flex items-center justify-center">
                    <div className="w-1 h-3 bg-emerald-500/40 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Preview Sheet / Modal */}
      {selectedMissionPreview && (
        <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4 animate-fade-in max-w-lg mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-3xl">
                {selectedMissionPreview.characterAvatar === 'cheetah' ? '🐆' : selectedMissionPreview.characterAvatar === 'lion' ? '🦁' : '🦉'}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  CBE Challenge • {selectedMissionPreview.difficulty}
                </span>
                <h4 className="text-lg font-black text-white">{selectedMissionPreview.title}</h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMissionPreview(null)}
              className="text-gray-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-emerald-900/40">
            {selectedMissionPreview.storyContext}
          </p>

          <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
            <span>Rewards on Completion:</span>
            <div className="flex items-center gap-3">
              <span>+{selectedMissionPreview.xpReward} XP ⚡</span>
              <span className="text-amber-400">+{selectedMissionPreview.coinReward} Coins 🪙</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectMission(selectedMissionPreview.id);
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-lg cursor-pointer"
          >
            START MISSION NOW 🚀
          </button>
        </div>
      )}
    </div>
  );
};
