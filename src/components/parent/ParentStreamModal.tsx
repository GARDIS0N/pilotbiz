import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects.js';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (prefs: StreamPreferences) => void;
}

export interface StreamPreferences {
  religiousStream: 'CRE' | 'IRE' | 'HRE';
  indigenousLanguage: string;
}

const STORAGE_KEY = 'jifuno_parent_stream_prefs';

export function getStreamPreferences(): StreamPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallback
  }
  return {
    religiousStream: 'CRE',
    indigenousLanguage: 'none'
  };
}

export const ParentStreamModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [religiousStream, setReligiousStream] = useState<'CRE' | 'IRE' | 'HRE'>('CRE');
  const [indigenousLanguage, setIndigenousLanguage] = useState<string>('none');

  useEffect(() => {
    if (isOpen) {
      const prefs = getStreamPreferences();
      setReligiousStream(prefs.religiousStream);
      setIndigenousLanguage(prefs.indigenousLanguage);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playClick();
    const prefs: StreamPreferences = { religiousStream, indigenousLanguage };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    if (onSave) onSave(prefs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👨‍👩‍👧</span>
            <div>
              <h3 className="text-lg font-black text-white">Parent Curriculum Stream Settings</h3>
              <p className="text-xs text-emerald-300">Mipangilio ya Mzazi: Chagua Maadili & Lugha ya Asili</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-gray-400 hover:text-white flex items-center justify-center font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Religious Education Choice */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            1. Religious Education Stream / Elimu ya Dini
          </label>
          <p className="text-xs text-gray-400">
            Kenya's CBC allows parents to choose their child's specific faith curriculum strand.
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setReligiousStream('CRE');
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                religiousStream === 'CRE'
                  ? 'border-emerald-400 bg-emerald-950/80 text-white shadow-md'
                  : 'border-slate-800 bg-slate-950/60 text-gray-400 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">✝️</div>
              <div className="text-xs font-black">CRE</div>
              <div className="text-[10px] text-emerald-300">Christian</div>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setReligiousStream('IRE');
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                religiousStream === 'IRE'
                  ? 'border-emerald-400 bg-emerald-950/80 text-white shadow-md'
                  : 'border-slate-800 bg-slate-950/60 text-gray-400 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">☪️</div>
              <div className="text-xs font-black">IRE</div>
              <div className="text-[10px] text-emerald-300">Islamic</div>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setReligiousStream('HRE');
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                religiousStream === 'HRE'
                  ? 'border-emerald-400 bg-emerald-950/80 text-white shadow-md'
                  : 'border-slate-800 bg-slate-950/60 text-gray-400 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">🕉️</div>
              <div className="text-xs font-black">HRE</div>
              <div className="text-[10px] text-emerald-300">Hindu</div>
            </button>
          </div>
        </div>

        {/* Section 2: Optional Indigenous Language */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            2. Optional Indigenous Language / Lugha ya Asili (KICD Elective)
          </label>
          <select
            value={indigenousLanguage}
            onChange={(e) => setIndigenousLanguage(e.target.value)}
            className="w-full bg-slate-950 border border-emerald-900/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="none">None / Hakuna (Standard CBC Track)</option>
            <option value="kikuyu">Gĩkũyũ (Central Kenya)</option>
            <option value="dholuo">Dholuo (Lake Region)</option>
            <option value="luhya">Luluhya (Western Kenya)</option>
            <option value="kalenjin">Kalenjin (Rift Valley)</option>
            <option value="kamba">Kĩkamba (Eastern Kenya)</option>
            <option value="maa">Kimaasai (Rift Valley / Southern)</option>
            <option value="mijikenda">Kimiijikenda (Coast Region)</option>
          </select>
          <p className="text-[11px] text-gray-400">
            * Indigenous Language is an optional KICD strand. Learning modules will be populated as community designs are approved.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-emerald-900/60">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
          >
            Cancel / Ghairi
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Hifadhi Mipangilio (Save Settings)
          </button>
        </div>
      </div>
    </div>
  );
};
